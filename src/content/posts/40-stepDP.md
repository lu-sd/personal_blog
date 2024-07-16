---
title: "climbing stairs dp-70.746,139,91"
publishedAt: 2024-05-20
description: "this is kind of  a classic dp problems"
slug: "40-steoDP"
isPublish: true
---

## step dp

70.Climbing Stairs
You are climbing a staircase. It takes n steps to reach the top.
Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

```js
const dp = Array(n + 1).fill(0);
dp[0] = 1;

for (let i = 1; i <= n; i++) {
  for (const j of [1, 2]) {
    if (i >= j) {
      dp[i] += dp[i - j];
    }
  }
}

return dp[n];
```

746:Min Cost Climbing Stairs
You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index 0, or the step with index 1.

Return the minimum cost to reach the top of the floor.

```js
function minCostClimbingStairs(cost: number[]): number {
  const n = cost.length;
  const dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;
  dp[1] = 0;

  for (let i = 1; i <= n; i++) {
    for (const j of [1, 2]) {
      if (i >= j) {
        dp[i] = Math.min(dp[i - j] + cost[i - j], dp[i]);
      }
    }
  }
  return dp[n];
}
```

Input: cost = [10,15,20]
Output: 15
Explanation: You will start at index 1.

- Pay 15 and climb two steps to reach the top.
  The total cost is 15.

139:word break

```js
function wordBreak(s: string, wordDict: string[]): boolean {
  const wordSet = new Set(wordDict);
  //  dp[i] will be true if the substring s[0...i-1] can be segmented into dictionary words.
  const dp: boolean[] = Array(s.length + 1).fill(false);
  dp[0] = true; // Base case: empty string
  const len = wordDict.map((item) => item.length);
  const steps = new Set(len);

  for (let i = 0; i <= s.length; i++) {
    for (const step of steps) {
      if (i >= step) {
        const end = s.slice(i - step, i);
        if (dp[i - step]) {
          if (wordSet.has(end)) {
            dp[i] = true;
            break;
          }
        }
      }
    }
  }

  return dp[s.length];
}
```

91:Decode Ways

```js
function numDecodings(s: string): number {
  if (s[0] === "0") return 0;
  const dict = Array.from({ length: 26 }, (_, idx) => (idx + 1).toString());
  const dp = Array(s.length + 1).fill(0);
  dp[0] = 1;

  for (let i = 0; i <= s.length; i++) {
    for (const step of [1, 2]) {
      if (i >= step) {
        const end = s.slice(i - step, i);
        if (dp[i - step]) {
          if (dict.includes(end)) {
            dp[i] += dp[i - step];
          }
        }
      }
    }
  }

  return dp[s.length];
}
```
