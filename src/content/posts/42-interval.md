---
title: "Interval-56,57"
publishedAt: 2024-05-25
description: "merge and insert intervals are two kind of  classic aglo problems"
slug: "42-interval"
isPublish: true
---

Interval problems typically involve a list of intervals, each represented by a start and an end time/position, and the goal is typically to detect or merge overlapping intervals.

56:Merger Intervals

Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]

```js
function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0]);

  function isOverlap(inter1: number[], inter2: number[]): boolean {
    return !(inter1[1] < inter2[0] || inter1[0] > inter2[1]);
  }

  const res: number[][] = [];
  for (const inter of intervals) {
    if (res.length === 0 || !isOverlap(res[res.length - 1], inter)) {
      res.push(inter);
    } else {
      res[res.length - 1][1] = Math.max(res[res.length - 1][1], inter[1]);
    }
  }

  return res;
}
```

57:Insert Intervals

Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]

```js
function insert(intervals: number[][], newInterval: number[]): number[][] {
  function isOverlap(inter: number[], newIn: number[]) {
    return !(inter[1] < newIn[0] || inter[0] > newIn[1]);
  }

  intervals.push(newInterval);
  intervals.sort((a, b) => a[0] - b[0]);

  const res = [];
  for (const inter of intervals) {
    if (res.length === 0 || !isOverlap(res[res.length - 1], inter)) {
      res.push(inter);
    } else {
      res[res.length - 1][1] = Math.max(res[res.length - 1][1], inter[1]);
    }
  }

  return res;
}
```
