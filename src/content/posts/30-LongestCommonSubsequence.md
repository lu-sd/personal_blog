---
title: "DP-1143"
publishedAt: 2024-02-25
description: "use dfs with memo and dp table "
slug: "30-LongestCommonSubsequence"
isPublish: true
---

One using memoization (top-down approach) and the other using dynamic programming (bottom-up approach).

```js
function longestCommonSubsequence(text1: string, text2: string): number {
    // A cache to remember solutions to subproblems we've already solved
    const memo = new Map<string, number>();

    // A recursive helper function to find LCS length for substrings up to indices i and j
    function dfs(i: number, j: number): number {
        // Base case: if either string is fully traversed, return 0
        if (i < 0 || j < 0) return 0;

        // Generate a unique key to identify the current state (subproblem)
        const key = `${i},${j}`;
        // If this problem was already solved, return the stored result
        if (memo.has(key)) return memo.get(key)!;

        let result = 0;
        // If characters at current positions are the same, move diagonally and add 1
        if (text1[i] === text2[j]) {
            result = dfs(i - 1, j - 1) + 1;
        } else {
            // Otherwise, try moving in either string and choose the max result
            result = Math.max(dfs(i - 1, j), dfs(i, j - 1));
        }

        // Store the result in the cache before returning
        memo.set(key, result);
        return result;
    }

    // Start the recursion from the end of both strings
    return dfs(text1.length - 1, text2.length - 1);
};


function longestCommonSubsequence(text1: string, text2: string): number {
    // n and m store the lengths of text1 and text2, respectively
    const n: number = text1.length, m: number = text2.length;

    // Initialize a 2D array f with dimensions (n+1) x (m+1), filled with 0s
    // This array will store the lengths of LCS for different pairs of prefixes of text1 and text2
    const f: number[][] = Array.from({length: n + 1}, () => Array(m + 1).fill(0));

    // Iterate over each character of text1 (i) and text2 (j)
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            // If characters at current positions in both strings match
            if (text1[i] === text2[j]) {
                // Update the current cell with the value from the top-left cell plus one
                f[i + 1][j + 1] = f[i][j] + 1;
            } else {
                // If they don't match, take the maximum value from the cell above or to the left
                f[i + 1][j + 1] = Math.max(f[i][j + 1], f[i + 1][j]);
            }
        }
    }

    // Return the bottom-right cell of the array, which contains the length of LCS
    return f[n][m];
};
```
