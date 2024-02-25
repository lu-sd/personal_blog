---
title: "DP-1143"
publishedAt: 2024-02-25
description: "use dfs with memo and dp table "
slug: "30-LongestCommonSubsequence"
isPublish: true
---

```js
function longestCommonSubsequence(text1: string, text2: string): number {

   const memo = new Map<string, number>();

    function dfs(i: number, j: number): number {
        if (i < 0 || j < 0) return 0;

        const key = `${i},${j}`; // Create a unique key for the current subproblem
        if (memo.has(key)) return memo.get(key)!; // If result is cached, return it

        let result = 0
        if (text1[i] === text2[j]) {
            result = dfs(i - 1, j - 1) + 1;
        } else {
            result = Math.max(dfs(i - 1, j), dfs(i, j - 1));
        }

        memo.set(key, result); // Cache the result before returning
        return result;
    }

    return dfs(text1.length - 1, text2.length - 1);
};

function longestCommonSubsequence(text1: string, text2: string): number {
    const n: number = text1.length, m: number = text2.length;
        const f: number[][] = Array.from({length: n + 1}, () => Array(m + 1).fill(0));

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (text1[i] === text2[j]) {
                    f[i + 1][j + 1] = f[i][j] + 1;
                } else {
                    f[i + 1][j + 1] = Math.max(f[i][j + 1], f[i + 1][j]);
                }
            }
        }

        return f[n][m];
};
```
