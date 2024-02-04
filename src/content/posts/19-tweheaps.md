---
title: "Find median using two heaps -295"
publishedAt: 2024-02-02
description: "minheap and maxheap"
slug: "19-twoheaps"
isPublish: true
---

295:Find Median from Data Stream

The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

For example, for arr = [2,3,4], the median is 3.
For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
Implement the MedianFinder class:

MedianFinder() initializes the MedianFinder object.
void addNum(int num) adds the integer num from the data stream to the data structure.
double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.

```js
class HeapItem {
  item: number;
  value: number;

  constructor(item: number, value = item) {
    this.item = item;
    this.value = value;
  }
}

class MinHeap {
  heap: HeapItem[];

  constructor() {
    this.heap = [];
  }

  insert(val: HeapItem) {
    this.heap.push(val);
    this.heapUp(this.heap.length - 1);
  }

  heapUp(idx: number) {
    if (idx === 0) return;

    const pIdx = Math.floor((idx - 1) / 2);
    if (
      this.heap[pIdx].value > this.heap[idx].value &&
      idx < this.heap.length
    ) {
      this.swap(pIdx, idx);
      this.heapUp(pIdx);
    }
  }

  delele() {
    const n = this.heap.length;
    if (n === 0) return null;
    if (n === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapDown(0);
    return min;
  }

  heapDown(idx: number) {
    const lIdx = 2 * idx + 1;
    const rIdx = 2 * idx + 2;
    let curIdx = idx;
    for (const i of [lIdx, rIdx]) {
      if (
        i < this.heap.length &&
        this.heap[curIdx].value > this.heap[i].value
      ) {
        curIdx = i;
      }
    }

    if (curIdx !== idx) {
      this.swap(curIdx, idx);
      this.heapDown(curIdx);
    }
  }
  swap(l: number, r: number) {
    const temp = this.heap[l];
    this.heap[l] = this.heap[r];
    this.heap[r] = temp;
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }
}
class MedianFinder {
  minheap: MinHeap;
  maxheap: MinHeap;

  constructor() {
    this.minheap = new MinHeap();
    this.maxheap = new MinHeap();
  }

  addNum(num: number): void {
    if (this.minheap.size() === 0 || num < this.minheap.peek().item) {
      this.maxheap.insert(new HeapItem(-num));
    } else {
      this.minheap.insert(new HeapItem(num));
    }
    this._balance();
  }

  _balance() {
    if (this.maxheap.size() < this.minheap.size()) {
      const val = this.minheap.delele().item;
      this.maxheap.insert(new HeapItem(-val));
    }
    if (this.maxheap.size() > this.minheap.size() + 1) {
      const val = this.maxheap.delele().item;
      this.minheap.insert(new HeapItem(-val));
    }
  }
  findMedian(): number {
    let median;
    if (this.maxheap.size() === this.minheap.size()) {
      return (-this.maxheap.peek().item + this.minheap.peek().item) / 2;
    } else {
      return -this.maxheap.peek().item;
    }
  }
}
```
