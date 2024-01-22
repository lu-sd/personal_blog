---
title: "Algorithm-70"
publishedAt: 2024-01-21
description: "Backtracking with memo "
slug: "13-backtracking"
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
