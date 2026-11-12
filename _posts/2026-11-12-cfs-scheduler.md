---
title: "Linux CFS 调度器浅析"
date: 2026-11-12
category: scheduler
tags: [Linux, kernel, CFS, scheduler]
description: "从 vruntime、红黑树到负载均衡，梳理 CFS 的核心思路。"
---

## 什么是 CFS

CFS（Completely Fair Scheduler，完全公平调度器）是 Linux 内核默认的普通进程调度器。它的核心思想是：**用一棵红黑树按虚拟运行时间 `vruntime` 排序，总是让 vruntime 最小的进程先运行**，从而逼近"所有进程平分 CPU"的理想状态。

## 核心数据结构

```c
struct task_struct {
    struct sched_entity se;   // 调度实体
    /* ... */
};

struct sched_entity {
    u64 vruntime;             // 虚拟运行时间，越小越该先跑
    struct load_weight load;  // 负载权重
    /* ... */
};
```

## 调度流程

1. 进程被唤醒或入队时，把 `se` 挂进就绪队列的红黑树。
2. 调度时取最左侧（vruntime 最小）的任务运行。
3. 时间片耗尽后重新计算 vruntime，重新入队。

> 提示：权重越大（`nice` 值越小），单位真实时间内 vruntime 增长越慢，从而获得更多 CPU 时间。

## 与 EEVDF 的关系

| 项目 | CFS | EEVDF |
| --- | --- | --- |
| 排序依据 | vruntime | 虚拟截止时间 |
| 选队方式 | 红黑树最左节点 | 选最早到期任务 |
| 内核版本 | 长期使用 | 6.6 起逐步替代 |

## 调试命令

```bash
# 查看进程调度策略与优先级
ps -eo pid,comm,policy,pri,ni

# ftrace 跟踪调度切换
trace-cmd record -e sched_switch
```
