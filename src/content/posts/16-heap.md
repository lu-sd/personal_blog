---
title: "Algorithm-about heap"
publishedAt: 2024-01-26
description: "Implement a Minheap"
slug: "16-heap"
isPublish: true
---

```js
class MinHeap {
    private heap: number[];

    constructor() {
        this.heap = [];
    }

    public insert(key: number) {
        this.heap.push(key);
        this.heapifyUp(this.heap.length - 1);
    }

    public delete(): number | null {
        if (this.heap.length === 0) return null;

        const min = this.heap[0];
        this.heap[0] = this.heap.pop()
        this.heapifyDown(0);
        return min;
    }

    private heapifyUp(index: number) {
        if (index === 0) return

        const parentIndex = Math.floor((index - 1) / 2);
        if (this.heap[parentIndex] > this.heap[index]) {
               this.swap(parentIndex, index);
                this.heapifyUp(parentIndex);
            }

    }
    private heapifyDown(index: number) {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let smallest = index;

        if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallest]) {
            smallest = leftChildIndex;
        }

        if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallest]) {
            smallest = rightChildIndex;
        }

        if (smallest === index) return
            this.swap(index, smallest);
            this.heapifyDown(smallest);

    }

    private swap(index1: number, index2: number) {
        const temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }
    public getMin(): number | null {
        return this.heap.length > 0 ? this.heap[0] : null;
    }
}

```

Find the kth smallest element in an unsorted array. Note that it is the kth smallest element in the sorted order, not necessarily the kth distinct element.

```js
function smallestK(arr: number[], k: number): number[] {
  const heap = new Minheap();
  for (const item of arr) {
    heap.insert(item);
  }

  const res: number[] = [];
  for (let i = 0; i < k; i++) {
    res.push(heap.delete());
  }

  return res;
}
```
