---
title: "graid75-53,542,49,271,383,409,994,133,155,102,127,20"
publishedAt: 2024-05-22
description: "this is kind of classic aglo problems"
slug: "41-graid75"
isPublish: true
---

53:Given an integer array nums, find the subarray with the largest sum, and return its sum.

Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.

```js
function maxSubArray(nums: number[]): number {
  let sum = 0;
  let ans = nums[0];
  for (let r = 0; r < nums.length; r++) {
    if (sum > 0) {
      sum += nums[r];
    } else {
      sum = nums[r];
    }
    ans = Math.max(sum, ans);
  }

  return ans;
}
```

542:Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

The distance between two adjacent cells is 1.

```js
function updateMatrix(mat: number[][]): number[][] {
  const m = mat.length;
  const n = mat[0].length;
  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const queue = [];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 0) {
        queue.push([i, j]);
      } else {
        mat[i][j] = -1;
      }
    }
  }

  while (queue.length) {
    const [x, y] = queue.shift();
    for (const [r, c] of dir) {
      const nr = x + r;
      const nc = y + c;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && mat[nr][nc] === -1) {
        mat[nr][nc] = mat[x][y] + 1;
        queue.push([nr, nc]);
      }
    }
  }

  return mat;
}
```

49:Group anagtams

Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

```js
function groupAnagrams(strs: string[]): string[][] {
  const map: Map<string, Array<string>> = new Map();
  for (const i of strs) {
    let key = i.split("").sort().join("");

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(i);
  }
  return [...map.values()];
}
```

271:Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.

```js
/**
 * Encodes a list of strings to a single string.
 */
function encode(strs: string[]): string {
  let res = "";
  for (const s of strs) {
    res += `${s.length}#${s}`;
  }
  return res;
}

/**
 * Decodes a single string to a list of strings.
 */
function decode(s: string): string[] {
  const res = [];
  let i = 0;

  while (i < s.length) {
    let j = i;

    while (s[j] !== "#") {
      j++;
    }
    let len = parseInt(s.slice(i, j), 10);
    i = j + 1;
    j = i + len;
    res.push(s.slice(i, j));
    i = j;
  }
  return res;
}
```

383:Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

Each letter in magazine can only be used once in ransomNote.

```js
function canConstruct(ransomNote: string, magazine: string): boolean {
  for (const i of ransomNote) {
    if (!magazine.includes(i)) return false;
    magazine = magazine.replace(i, "");
  }

  return true;
}
// use map
function canConstruct(ransomNote: string, magazine: string): boolean {
    const map1 = new Map<string, number>();

    for (const c of magazine) {
        map1.set(c, 1 + ((map1.get(c)) ?? 0));
    }

    for (const c of ransomNote) {
        if (!map1.has(c)) {
            return false
        } else {
            map1.set(c, -1 + ((map1.get(c)) ?? 0));
            if (map1.get(c) < 0) return false;
        }
    }
    return true;

};
```

409: built longest palindrome

```js
function longestPalindrome(s: string): number {
  const set = new Set();
  let ans = 0;
  for (let l of s) {
    if (set.has(l)) {
      set.delete(l);
      ans += 2;
    } else {
      set.add(l);
    }
  }
  if (set.size > 0) ans += 1;
  return ans;
}
```

994:rotting oranges

```js
function orangesRotting(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  const dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const queue = [];
  let fresh = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) {
        queue.push([i, j]);
      }
      if (grid[i][j] === 1) {
        fresh++;
      }
    }
  }
  if (fresh === 0) return 0;

  let time = -1;
  while (queue.length > 0) {
    let len = queue.length;

    while (len--) {
      const [r, c] = queue.shift();
      for (const [dr, dc] of dir) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
          if (grid[nr][nc] === 1) {
            queue.push([nr, nc]);
            grid[nr][nc] = 2;
            fresh--;
          }
        }
      }
    }
    time++;
  }

  return fresh === 0 ? time : -1;
}
```

133:clone gragh

```js
function cloneGraph(node: _Node | null): _Node | null {
  const map = new Map();

  function dfs(root: _Node | null) {
    if (root === null) return;
    if (map.has(root)) {
      return map.get(root);
    }
    const clone = new _Node(root.val, []);
    map.set(root, clone);
    for (const n of root.neighbors) {
      clone.neighbors.push(dfs(n));
    }

    return clone;
  }

  return dfs(node);
}
```

155:Min Stack

```js
class MinStack {
  stack: number[][];
  constructor() {
    this.stack = [];
  }

  push(val: number): void {
    if (this.stack.length === 0) {
      this.stack.push([val, val]);
    } else
      this.stack.push([
        val,
        Math.min(val, this.stack[this.stack.length - 1][1]),
      ]);
  }

  pop(): void {
    this.stack.pop();
  }

  top(): number {
    return this.stack[this.stack.length - 1][0];
  }

  getMin(): number {
    return this.stack[this.stack.length - 1][1];
  }
}
```

105:Construct Binary Tree from Preorder and Inorder Traversal

```js
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  if (preorder.length) return null;

  const root = new TreeNode(preorder[0]);
  const midIdx = inorder.indexOf(preorder[0]);

  root.left = buildTree(
    preorder.slice(1, midIdx + 1),
    inorder.slice(0, midIdx)
  );
  root.right = buildTree(preorder.slice(midIdx + 1), inorder.slice(midIdx + 1));

  return root;
}
```

79:Word Search

```js
function exist(board: string[][], word: string): boolean {
  const m = board.length;
  const n = board[0].length;
  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const seen = Array.from({ length: m }, () => Array(n).fill(false));

  function dfs(x: number, y: number, idx: number) {
    if (x < 0 || x >= m || y < 0 || y >= n || seen[x][y]) {
      return false;
    }

    if (board[x][y] !== word[idx]) return false;

    if (idx == word.length - 1) return true;

    seen[x][y] = true;

    for (const [dx, dy] of dir) {
      if (dfs(x + dx, y + dy, idx + 1)) return true;
    }

    seen[x][y] = false;
    return false;
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }
  return false;
}
```

102:Binary Tree Level Order Traversal(use DFS)

```js
function levelOrder(root: TreeNode | null): number[][] {
  if (root == null) return [];

  const res = [];

  function dfs(node: TreeNode | null, level: number) {
    if (res.length == level) {
      res.push([]);
    }
    res[level].push(node.val);
    if (node.left !== null) dfs(node.left, level + 1);
    if (node.right !== null) dfs(node.right, level + 1);
  }

  dfs(root, 0);

  return res;
}
```

17:Letter Combinations of a Phone Number

```js
function letterCombinations(digits: string): string[] {
  if (digits.length === 0) return [];

  const dict = [
    "",
    "",
    "abc",
    "def",
    "ghi",
    "jkl",
    "mno",
    "pqrs",
    "tuv",
    "wxyz",
  ];
  const res = [];
  const path = [];

  function dfs() {
    if (path.length === digits.length) {
      res.push(path.join(""));
      return;
    }
    const num = digits[path.length];
    for (const ch of dict[num]) {
      path.push(ch);
      dfs();
      path.pop();
    }
  }
  dfs();
  return res;
}
```

127:Word Ladder

```js
function ladderLength(
  beginWord: string,
  endWord: string,
  wordList: string[]
): number {
  const set = new Set(wordList);
  const queue: [string, number][] = [[beginWord, 1]];
  const letters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(i + 97)
  );

  while (queue.length > 0) {
    const [word, step] = queue.shift();

    if (word === endWord) return step;

    for (let i = 0; i < beginWord.length; i++) {
      for (const l of letters) {
        const newWord = word.slice(0, i) + l + word.slice(i + 1);

        if (set.has(newWord)) {
          queue.push([newWord, step + 1]);
          set.delete(newWord);
        }
      }
    }
  }

  return 0;
}
```

20:Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

```js
function isValid(s: string): boolean {
  const dic = {
    "{": "}",
    "(": ")",
    "[": "]",
  };
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (dic[c]) {
      stack.push(c);
    } else {
      if (stack.length === 0 || dic[stack.pop()] !== c) return false;
    }
  }

  return stack.length === 0;
}
```

give a number x. check all the numbers from 1 to x and then sum up the number digits,how many number equals to y.

```js
function sumNumbersWithDigitSumEqualToY(x, y) {
  // Initialize sum to keep track of numbers whose digit sum equals y
  let sum = 0;

  // Helper function to calculate the sum of digits of a number
  function getDigitSum(n) {
    let digitSum = 0;
    while (n > 0) {
      digitSum += n % 10; // Add the last digit
      n = Math.floor(n / 10); // Remove the last digit
    }
    return digitSum;
  }

  // Iterate over all numbers from 1 to x
  for (let i = 1; i <= x; i++) {
    // If the sum of the digits of i equals y, add i to the sum
    if (getDigitSum(i) === y) {
      sum += 1;
    }
  }

  // Return the final result
  return sum;
}

// Example usage:
let x = 20;
let y = 5;
console.log(
  "Numbers with digit sum equal to y:",
  findNumbersWithDigitSumEqualToY(x, y)
);
// Output 2 : [5, 14]
```
