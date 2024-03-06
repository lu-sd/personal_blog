---
title: "Binary Tree Rigth Side View"
publishedAt: 2024-03-06
description: "DFS and BFS"
slug: "34-rightView"
isPublish: true
---

199:Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

```js
function rightSideView(root: TreeNode | null): number[] {
  const ans = [];

  function dfs(node: TreeNode, depth: number) {
    if (node === null) return;
    if (depth === ans.length) {
      ans.push(node.val);
    }
    dfs(node.right, depth + 1);
    dfs(node.left, depth + 1);
  }

  dfs(root, 0);

  return ans;
}
```

DFS use global value and traverse right firstly.

```js
function rightSideView(root: TreeNode | null): number[] {
  if (!root) return [];

  const queue = [root];
  const ans = [];

  while (queue.length > 0) {
    ans.push(queue[0].val);
    const n = queue.length;

    for (let i = 0; i < n; i++) {
      const node = queue.shift();
      for (const item of [node.right, node.left]) {
        if (item) {
          queue.push(item);
        }
      }
    }
  }

  return ans;
}
```
