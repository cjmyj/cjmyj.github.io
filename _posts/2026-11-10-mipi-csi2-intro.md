---
title: "MIPI CSI-2 接口入门"
date: 2026-11-10
category: camera-media
tags: [camera, MIPI, CSI-2, media]
description: "CSI-2 的 lane、虚通道、数据包类型与 V4L2 驱动中的对应关系。"
---

## 概述

MIPI CSI-2 是摄像头传感器与主控之间常用的高速串行接口，采用 D-PHY / C-PHY 物理层，支持多条 lane 传输像素流。在 Linux 中通常通过 V4L2 + Media Controller 框架暴露给用户空间。

## 关键概念

- **Lane**：数据通道，通常 1~4 条；时钟 lane 在 D-PHY 下可选。
- **虚通道（Virtual Channel, VC）**：同一接口复用多路流，用于多传感器或多分辨率。
- **数据类型（DT）**：标识数据包是 RAW8/10/12、YUV、嵌入数据还是帧头/帧尾。

## 典型链路

```
Sensor ──(CSI-2 D-PHY)──> CSI Receiver ──> ISP / DMA ──> V4L2 设备节点
```

## 驱动关注点

```c
// 在设备树中描述 lane 与端点
port {
    endpoint {
        remote-endpoint = &csi_in;
        data-lanes = <1 2>;   // 使用 lane 1、2
        clock-lanes = <0>;
    };
};
```

## 调试建议

1. 先用 `media-ctl` 打通链路拓扑，确认 entity 与 pad 连接。
2. 用 `v4l2-ctl` 抓一帧 RAW，检查分辨率、格式与 CRC 是否正常。
3. 信号异常时优先排查 lane 数、时序、MCLK 与电源上电顺序。
