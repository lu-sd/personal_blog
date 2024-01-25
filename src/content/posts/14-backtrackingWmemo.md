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
  let memo = new Map<number,number>()
  function dfs(sum: number): number {
    if (sum === amount) return 0;
    if (sum > amount) return Infinity;
    if(mem.has(sum)) return mem.get(sum)
    let ans = Infinity;
    for (let coin of coins) {
      let result = dfs(sum + coin);
      ans = Math.min(ans, result + 1);
    }
    mem.set(sum,ans)
    return ans;
  }
  let res = dfs(0);
  return res === Infinity ? -1 : res;
}
```
