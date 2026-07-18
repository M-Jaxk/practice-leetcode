class CoinChange {
  // coins = [1,2,5], amount = 11 → 3 (5+5+1)
  // coins = [2], amount = 3 → -1
  execute(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (const coin of coins) {
      for (let i = coin; i <= amount; i++) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
  }
}

console.log(new CoinChange().execute([1, 2, 5], 3));
// console.log(new CoinChange().execute([2], 3));
// console.log(new CoinChange().execute([1], 0));
