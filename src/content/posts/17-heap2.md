---
title: "Algorithm-about heap-23"
publishedAt: 2024-01-30
description: "Implement a Minheap"
slug: "17-heap2"
isPublish: true
---

A Different Approach to Creating a Flexible MinHeap, Applicable in Various Situations.

```js
class HeapItem {
  item: ListNode;
  priority: number;

  constructor(item: ListNode, priority: number) {
    this.item = item;
    this.priority = priority;
  }
}

class MinHeap {
  heap: HeapItem[];

  constructor() {
    this.heap = [];
  }

  insert(item: HeapItem) {
    this.heap.push(item);
    this.heapUp(this.heap.length - 1);
  }

  delete() {
    const n = this.heap.length;
    if (n === 0) return null;
    if (n === 1) return this.heap.pop();

    let min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapDown(0);
    return min;
  }

  heapUp(idx: number) {
    if (idx === 0) return;

    const pIdx = Math.floor((idx - 1) / 2);
    if (this.heap[pIdx].priority > this.heap[idx].priority) {
      this.swap(pIdx, idx);
      this.heapUp(pIdx);
    }
  }

  heapDown(idx: number) {
    const lIdx = 2 * idx + 1;
    const rIdx = 2 * idx + 2;
    let curIdx = idx;

    for (const i of [lIdx, rIdx]) {
      if (
        i < this.heap.length &&
        this.heap[curIdx].priority > this.heap[i].priority
      ) {
        curIdx = i;
      }
    }

    if (curIdx === idx) return;
    this.swap(curIdx, idx);
    this.heapDown(curIdx);
  }

  swap(l: number, r: number) {
    let temp = this.heap[l];
    this.heap[l] = this.heap[r];
    this.heap[r] = temp;
  }

  size() {
    return this.heap.length;
  }
}
```

23:You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

```js
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  const minHeap = new MinHeap();

  for (const i of lists) {
    if (i !== null) {
      minHeap.insert(new HeapItem(i, i.val));
    }
  }

  const dummy = new ListNode();
  let cur = dummy;
  while (minHeap.size() > 0) {
    const minnode = minHeap.delete().item;
    if (minnode.next) {
      minHeap.insert(new HeapItem(minnode.next, minnode.next.val));
    }
    cur.next = minnode;
    cur = cur.next;
  }
  return dummy.next;
}
```
