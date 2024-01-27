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

    private heapifyUp(index: number) {
        if (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);

            if (this.heap[parentIndex] > this.heap[index]) {
               this.swap(parentIndex, index);
                this.heapifyUp(parentIndex);
            }
        }
    }

    public extractMin(): number | null {
        if (this.heap.length === 0) {
            return null;
        }

        const min = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.heapifyDown(0);
        return min;
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

        if (smallest !== index) {
            this.swap(index, smallest);
            this.heapifyDown(smallest);
        }
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
