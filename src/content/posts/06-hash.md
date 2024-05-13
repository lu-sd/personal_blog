---
title: "Algorithm on hash-01,349,232"
publishedAt: 2023-11-27
description: " use map,set,array to solve hash problems"
slug: "06-hash"
isPublish: true
---

1,Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

```js
function twoSum(nums: number[], target: number): number[] {
  let nummap = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (nummap.has(diff)) {
      return [nummap.get(diff), i];
    }
    nummap.set(nums[i], i);
  }
  return [];
}
```

349:Given two integer arrays nums1 and nums2, return an array of their intersection.Each element in the result must be unique and you may return the result in any order.

Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]

```js
function intersection(nums1: number[], nums2: number[]): number[] {
  let set1 = new Set(nums1);
  return [...new Set(nums2)].filter((i) => set1.has(i));
}
```

```js
function intersection(nums1: number[], nums2: number[]): number[] {
  let res = [];
  for (const item of nums1) {
    if (nums2.includes(item)) {
      res.push(item);
    }
  }

  return Array.from(new Set(res));
}
```

```js
function intersection(nums1: number[], nums2: number[]): number[] {
  return Array.from(new Set(nums1.filter((i) => nums2.includes(i))));
}
```

```js
function intersection(nums1: number[], nums2: number[]): number[] {
  const res: Set<number> = new Set();
  const set = new Set(nums1);
  for (const item of nums2) {
    if (set.has(item)) {
      res.add(item);
    }
  }
  return Array.from(res);
}
```

```js
function intersection(nums1: number[], nums2: number[]): number[] {
  const res = [];
  const set = new Set(nums1);
  for (const item of nums2) {
    if (set.has(item)) {
      res.push(item);
      set.delete(item);
    }
  }
  return res;
}
```

232:Implement queue with stacks

```js
class MyQueue {
  stackIn: number[] = [];
  stackOut: number[] = [];
  constructor() {}

  push(x: number): void {
    this.stackIn.push(x);
  }

  pop(): number {
    if (this.stackOut.length === 0) {
      while (this.stackIn.length) {
        this.stackOut.push(this.stackIn.pop());
      }
    }
    const res = this.stackOut.pop();
    return res;
  }

  peek(): number {
    const res = this.pop();
    this.stackOut.push(res);
    return res;
  }

  empty(): boolean {
    return this.stackOut.length === 0 && this.stackIn.length === 0;
  }
}
```
