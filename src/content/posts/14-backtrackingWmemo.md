---
title: "Algorithm-70,322"
publishedAt: 2024-01-21
description: "Backtracking with memo"
slug: "14-backtrackingWithMemo"
isPublish: true
---

70:You are climbing a staircase. It takes n steps to reach the top.
Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

```js
function climbStairs(n: number): number {
    const memo = new Map<number,number>()
    function dfs(steps:number, total:number){
        if(steps === total) return 1
        if (steps > total) return 0
        if (memo.has(steps)) return memo.get(steps)
        let ans = 0
        for( const step of [1,2]){
          ans = ans+ dfs(step + steps ,total)
        }
        memo.set(steps, ans)
       return ans
    }
    return dfs(0, n)
}
```

322:You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1

```js
function coinChange(coins: number[], amount: number): number {
  let memo = new Array(amount + 1).fill(-1);
  function dfs(sum: number): number {
    if (sum === amount) return 0;
    if (sum > amount) return Infinity;
    if (memo[sum] != -1) return memo[sum];
    let ans = Infinity;
    for (let coin of coins) {
      let result = dfs(sum + coin);
      if (result === Infinity) continue;
      ans = Math.min(ans, result + 1);
    }
    memo[sum] = ans;
    return ans;
  }
  let res = dfs(0);
  return res === Infinity ? -1 : res;
}
```

Can you tell the difference between this:

39:Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the
frequency
of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.

Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.

```js
function combinationSum(candidates: number[], target: number): number[][] {
  candidates.sort((a, b) => a - b);
  const res: number[][] = [];

  function dfs(start: number, remain: number, path: number[]) {
    if (remain === 0) {
      res.push([...path]);
      return;
    }
    if (remain < 0) return;

    for (let index = start; index < candidates.length; index++) {
      let num = candidates[index];
      path.push(num);
      dfs(index, remain - num, path);
      path.pop();
    }
  }
  dfs(0, target, []);
  return res;
}
```
