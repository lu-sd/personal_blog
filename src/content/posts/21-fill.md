---
title: "fill() in js"
publishedAt: 2024-02-07
description: "more details about the method"
slug: "20-fill"
isPublish: true
---

The fill() method in JavaScript is a versatile and powerful tool for initializing or modifying all elements of an array to a static value, from a start index (defaulting to 0) up to an end index (defaulting to the array's length).

### Basic Usage

```js
const array = [1, 2, 3, 4];
array.fill(0); // fill with 0 from start to end
console.log(array); // Output: [0, 0, 0, 0]
```

### Specifying Start and End

```js
const array = [1, 2, 3, 4];
array.fill(5, 1, 3); // fill with 5 from index 1 up to, but not including, index 3
console.log(array); // Output: [1, 5, 5, 4]
```

### Key Points

- Mutates the Original Array: The fill() method changes the original array and returns it, not a copy. This is important for understanding how it affects data.

- Uses the Same Object Reference: If you use fill() with an object (including arrays), each slot in the array will hold a reference to the same object. Modifying one element will affect all elements that reference the same object.

#### Examples

```js
let n = 3;
// Create an array of n empty arrays
let arrays = new Array(n).fill(null).map(() => []);

// Now you can safely use .push() on any of these arrays
arrays[0].push("Hello");

console.log(arrays); // Output: [["Hello"], [], []]
```

If you do like this:

```js
let n = 3;
let arrays = new Array(n).fill([]);

arrays[0].push("Hello");

console.log(arrays); // Output: [["Hello"], ["Hello"], ["Hello"]]
```

200:Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

```js
function numIslands(grid: string[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  const seen = Array.from({ length: m }, () => new Array(n).fill(false));
  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let res = 0;

  function dfs(r: number, c: number) {
    if (r < 0 || r >= m || c < 0 || c >= n) return;
    if (grid[r][c] === "0") return;
    if (seen[r][c]) return;

    seen[r][c] = true;
    for (const [x, y] of dir) {
      dfs(r + x, c + y);
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1" && seen[i][j] === false) {
        res++;
        dfs(i, j);
      }
    }
  }

  return res;
}
```
