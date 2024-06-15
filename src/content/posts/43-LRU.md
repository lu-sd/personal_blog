---
title: "LRU Cache-146"
publishedAt: 2024-05-26
description: "design a LRU"
slug: "43-LRU"
isPublish: true
---

```js
class Node {
  key: number;
  val: number;
  pre: Node | null;
  next: Node | null;
  constructor(key = 0, val = 0) {
    this.key = key;
    this.val = val;
    this.pre = null;
    this.next = null;
  }
}
class LRUCache {
  capacity: number;
  map: Map<number, Node>;
  dummy: Node;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.dummy = new Node();
    this.dummy.pre = this.dummy;
    this.dummy.next = this.dummy;
    this.map = new Map();
  }

  getNode(key) {
    if (!this.map.has(key)) return null;

    const node = this.map.get(key);
    this.remove(node);
    this.pushTop(node);
    return node;
  }
  get(key: number): number {
    const node = this.getNode(key);
    return node ? node.val : -1;
  }

  put(key: number, value: number): void {
    let node = this.getNode(key);

    if (node) {
      node.val = value;
      return;
    }

    node = new Node(key, value);
    this.map.set(key, node);
    this.pushTop(node);

    if (this.map.size > this.capacity) {
      const last = this.dummy.pre;
      this.map.delete(last.key);
      this.remove(last);
    }
  }

  remove(x: Node) {
    x.pre.next = x.next;
    x.next.pre = x.pre;
  }
  pushTop(x: Node) {
    x.pre = this.dummy;
    x.next = this.dummy.next;
    x.pre.next = x;
    x.next.pre = x;
  }
}
```
