---
title: "DP-122"
publishedAt: 2024-02-26
description: "Best time to buy and sell stock"
slug: "31-stockDP"
isPublish: true
---

You are given an integer array prices where prices[i] is the price of a given stock on the ith day.

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
