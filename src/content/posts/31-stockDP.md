---
title: "DP-122,309,188"
publishedAt: 2024-02-26
description: "Best time to buy and sell stock"
slug: "31-stockDP"
isPublish: true
---

122:You are given an integer array prices where prices[i] is the price of a given stock on the ith day.

On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day.

Find and return the maximum profit you can achieve.

```js
function maxProfit(prices: number[]): number {
  const n = prices.length;
  // A 2D array (matrix) of size (n + 1) x 2, where f[i][0] represents the maximum profit up to day i when not holding a stock, and f[i][1] represents the maximum profit up to day i when holding a stock.
  const f = Array(n + 1)
    .fill(null)
    .map(() => [0, 0]);
  // Base case: before any transaction (at day 0), it's impossible to be holding a stock, ensuring that the first buy action is properly accounted for.
  f[0][1] = -Infinity;
  for (let i = 0; i < n; i++) {
    f[i + 1][0] = Math.max(f[i][0], f[i][1] + prices[i]);
    f[i + 1][1] = Math.max(f[i][1], f[i][0] - prices[i]);
  }
  // The function returns f[n][0], the maximum profit at the end of the last day when not holding a stock, as this represents the completion of all transactions.
  return f[n][0];
}
```

Dynamic Programming Loop:

The for loop iterates through each day, calculating the maximum profit for each state (holding or not holding a stock) at day i + 1 based on the prices and actions (buy or sell) up to day i.

f[i + 1][0] = Math.max(f[i][0], f[i][1] + prices[i]): This line calculates the maximum profit for not holding a stock on day i + 1. There are two possibilities:

You were not holding a stock on day i, so no action is taken (f[i][0]).
You were holding a stock on day i, and you sell it on day i (f[i][1] + prices[i]).

f[i + 1][1] = Math.max(f[i][1], f[i][0] - prices[i]): This line calculates the maximum profit for holding a stock on day i + 1. There are two possibilities:

You were already holding a stock on day i, so no action is taken (f[i][1]).
You were not holding a stock on day i, and you buy it on day i (f[i][0] - prices[i]), accounting for the cost of buying.

309: add one restriction:

After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).

```js
function maxProfit(prices: number[]): number {
  const n = prices.length;
  //  Each f[i][0] represents the maximum profit up to day i-2 when not holding a stock, and f[i][1] represents the maximum profit up to day i-2 when holding a stock. The reason for n + 2 rows and starting calculations from f[2] is to easily accommodate the cooldown period and simplify index calculations.
  const f = Array(n + 2)
    .fill(null)
    .map(() => [0, 0]);
  f[1][1] = -Infinity;
  for (let i = 0; i < n; i++) {
    f[i + 2][0] = Math.max(f[i + 1][0], f[i + 1][1] + prices[i]);
    f[i + 2][1] = Math.max(f[i + 1][1], f[i][0] - prices[i]);
  }
  return f[n + 1][0];
}
```

### The Indexing Adjustment

Day Indexing Starts from 1: By adopting this setup, when we refer to the first day of stock prices (prices[0]), the corresponding dynamic programming state is f[2]. This adjustment makes the indexing more intuitive within the context of this specific problem, especially when handling the cooldown.
Accommodating Cooldown: The logic behind "buying" and "selling" operations now naturally incorporates the cooldown day. For example, when updating the state for day i (corresponding to f[i + 2] in this setup), it's straightforward to reference the state from two days before (f[i]) to enforce the cooldown rule.

188:You may complete at most k transactions: i.e. you may buy at most k times and sell at most k times.

```js
function maxProfit(k: number, prices: number[]): number {
  const n = prices.length;
  const f = Array(n + 1)
    .fill(null)
    .map(() =>
      Array(k + 2)
        .fill(null)
        .map(() => Array(2).fill(-Infinity))
    );
  for (let j = 1; j < k + 2; j++) {
    f[0][j][0] = 0;
  }
  for (let i = 0; i < n; i++) {
    for (let j = 1; j < k + 2; j++) {
      f[i + 1][j][0] = Math.max(f[i][j][0], f[i][j][1] + prices[i]);
      f[i + 1][j][1] = Math.max(f[i][j][1], f[i][j - 1][0] - prices[i]);
    }
  }
  return f[n][k + 1][0];
}
```
