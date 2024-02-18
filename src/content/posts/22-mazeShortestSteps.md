---
title: "Template for finding shortest steps to exit in maze"
publishedAt: 2024-02-09
description: "BFS may be the best way"
slug: "22-mazeShortestSteps"
isPublish: true
---

A common way to find the shortest path or the shortest steps in a maze (which can be generalized to many grid-based problems) is to use the Breadth-First Search (BFS) algorithm. BFS is ideal for these types of problems because it explores all neighbors at the current depth before moving on to the nodes at the next depth level, thereby ensuring that the first time it reaches the target, it does so with the minimum number of steps possible.

### Maze Shortest Steps Template

```js
function nearestExit(maze: string[][], entrance: number[]): number {
  const dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const m = maze.length;
  const n = maze[0].length;
  const queue = [[entrance[0], entrance[1], 0]];
  // mark the entrance as visited
  maze[entrance[0]][entrance[1]] = "#";

  while (queue.length > 0) {
    // when you need the steps ,may be it is a clear way to use Destructuring Assignment
    const [curR, curC, d] = queue.shift();
    // Explore all possible directions
    for (const [r, c] of dir) {
      const nextR = curR + r;
      const nextC = curC + c;
      // Check whether the cell is walkable base on boundaries and other conditions(not visited or not a wall)
      if (
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        maze[nextR][nextC] === "."
      ) {
        //  this is for a exit check and return the steps
        if (nextR === 0 || nextR === m - 1 || nextC === 0 || nextC === n - 1) {
          // d + 1 not d
          return d + 1;
        }
        //  Mark the current cell as visited
        maze[nextR][nextC] = "#";
        queue.push([nextR, nextC, d + 1]);
      }
    }
  }
  // If the end is not reachable, return -1 or some indication of failure
  return -1;
}
```

1926:You are given an m x n matrix maze (0-indexed) with empty cells (represented as '.') and walls (represented as '+'). You are also given the entrance of the maze, where entrance = [entrancerow, entrancecol] denotes the row and column of the cell you are initially standing at.

In one step, you can move one cell up, down, left, or right. You cannot step into a cell with a wall, and you cannot step outside the maze. Your goal is to find the nearest exit from the entrance. An exit is defined as an empty cell that is at the border of the maze. The entrance does not count as an exit.

Return the number of steps in the shortest path from the entrance to the nearest exit, or -1 if no such path exists.
