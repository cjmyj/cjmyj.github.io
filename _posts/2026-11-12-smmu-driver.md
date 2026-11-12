---
layout: post
title: "Linux SMMU 驱动学习入门"
date: 2026-11-12 10:00:00 +0800
categories: [ARM-SMMU]
tags: [Linux, ARM64, SMMU, IOMMU]
---

# SMMU 是什么？

SMMU（System Memory Management Unit）为设备 DMA 访问提供地址转换和访问控制。

## 学习路线

1. 理解 DMA 地址与 CPU 虚拟地址、物理地址的区别。
2. 阅读 Linux IOMMU 核心框架。
3. 分析 ARM SMMU 驱动的设备初始化与页表映射。

```c
/* 示例：为设备设置 DMA 地址掩码 */
int ret = dma_set_mask_and_coherent(dev, DMA_BIT_MASK(32));
```

> 这是一篇演示文章。发布正式内容时可直接替换。
