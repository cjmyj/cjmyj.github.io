---
title: "SLUB 分配器学习笔记"
date: 2026-11-11
category: mm
tags: [Linux, kernel, memory, SLUB]
description: "理解 slab 对象缓存、per-CPU 空闲列表与 kmalloc 的关系。"
---

## SLUB 解决什么问题

内核中大量存在"同大小对象反复申请/释放"的场景（如 `task_struct`、`inode`、`file`）。直接走伙伴系统会带来内部碎片和初始化开销。SLUB 在 slab 基础上做了简化，通过 **对象缓存（kmem_cache）** 复用这些对象。

## 关键概念

- **kmem_cache**：一类对象的缓存，记录对象大小、构造函数等。
- **per-CPU 空闲列表**：每个 CPU 一条本地 freelist，分配优先从这里取，减少锁竞争。
- **slab 页**：缓存背后由若干连续页组成，页面被切成一个个对象。

## 典型用法

```c
// 定义一个结构体
struct my_obj {
    int id;
    char name[32];
};

// 创建缓存
struct kmem_cache *cache = kmem_cache_create(
    "my_obj_cache", sizeof(struct my_obj), 0, SLAB_PANIC, NULL);

// 分配 / 释放
struct my_obj *obj = kmem_cache_alloc(cache, GFP_KERNEL);
kmem_cache_free(cache, obj);
kmem_cache_destroy(cache);
```

## 观察缓存

```bash
# 查看系统中各类 slab 对象占用
cat /proc/slabinfo | less

# 简化视图
slabtop
```

> 注意：`kmalloc` 背后也是按大小对齐的通用 slab 缓存，而自定义结构体优先用专属 `kmem_cache`。
