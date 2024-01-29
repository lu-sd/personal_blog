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
        if(this.heap.length === 1) return this.heap[0]

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

        // for(const item of [leftChildIndex,rightChildIndex]){
        //   if(item < this.heap.length && this.heap[item] < this.heap[smallest]){
        //     smallest = item
        //   }

        // }

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

973:K closest points to origin

Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).

```js
function kClosest(points: number[][], k: number): number[][] {
     const heap = new PointMinHeap();
    points.forEach(point => heap.insert(point));

    const result: number[][] = [];
    for (let i = 0; i < k; i++) {
        result.push(heap.delete());
    }

    return result;
};

class PointMinHeap {
    private heap: { dist: number, point: number[]}[];

    constructor() {
        this.heap = [];
    }

    public insert(point: number[]) {
        const dist = point[0] ** 2 + point[1] ** 2;
        this.heap.push({ dist, point });
        this.heapifyUp(this.heap.length - 1);
    }

    public delete(): number[] | null {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap[0].point;

        const min = this.heap[0].point;
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return min;
    }

   private heapifyUp(index: number) {
        if (index === 0) return

        const parentIndex = Math.floor((index - 1) / 2);
        if (this.heap[parentIndex].dist > this.heap[index].dist) {
               this.swap(parentIndex, index);
                this.heapifyUp(parentIndex);
            }

    }
    private heapifyDown(index: number) {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let smallest = index;

        // for(const item of [leftChildIndex,rightChildIndex]){
        //   if(item < this.heap.length && this.heap[item].dist < this.heap[smallest].dist){
        //     smallest = item
        //   }

        // }

        if (leftChildIndex < this.heap.length && this.heap[leftChildIndex].dist < this.heap[smallest].dist) {
            smallest = leftChildIndex;
        }

        if (rightChildIndex < this.heap.length && this.heap[rightChildIndex].dist < this.heap[smallest].dist) {
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


}

```

Specifically, since the MinHeap class is designed for numbers, and we are working with points in 2D space, we have to manage how we store these points and their distances in the heap. However, the provided MinHeap class would need further adaptation to directly handle objects or modify the function kClosest to use a structure that encapsulates both the distance and the points, which then can be sorted by the MinHeap.

To directly incorporate your MinHeap class for this problem, you'd need to extend its functionality to support key-value pairs (where the key is the distance, and the value is the point) or adapt the approach as shown above.

```js
function kClosest(points: number[][], k: number): number[][] {
  points.sort((a, b) => a[0] ** 2 + a[1] ** 2 - (b[0] ** 2 + b[1] ** 2));

  // Return the first k points from the sorted array
  return points.slice(0, k);
}
```

Given the complexity of modifying the MinHeap to support non-numeric types directly, the provided solution offers a simpler alternative while still efficiently solving the problem within the stated constraints.
