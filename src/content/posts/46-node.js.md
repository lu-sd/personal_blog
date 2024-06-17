---
title: "Node.js Tutorial"
publishedAt: 2024-06-16
description: "Disjoint Set Union is also called Union Find because of its two operations - union and find. "
slug: "46-node.js"
isPublish: true
---

## Node.js File System

The Node.js file system module allows you to work with the file system on your computer.

Common use for the File System module:

Read files
Create files
Update files
Delete files
Rename files

```js
import { fs } from "fs";

fs.appendFile("mynewfile1.txt", "Hello content!", function (err) {
  if (err) throw err;
  console.log("Saved!");
});
```
