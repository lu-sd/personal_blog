---
title: "DP-1143"
publishedAt: 2024-02-25
description: "use dfs with memo and dp table "
slug: "30-LongestCommonSubsequence"
isPublish: true
---

One using memoization (top-down approach) and the other using dynamic programming (bottom-up approach).I prefer the DP method.

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
    const m = text1.length
    const n = text2.length
    const dp = Array.from({length:m + 1}, () => Array(n + 1).fill(0))

    for(let i = 1; i <= m; i++){
        for(let j = 1; j <= n; j++){
            if(text1[i -1] === text2[j-1]){
                dp[i][j] = dp[i-1][j-1] + 1
            }else{
                dp[i][j] = Math.max(dp[i-1][j],dp[i][j-1])
            }
        }
    }

    return dp[m][n]
};
```
