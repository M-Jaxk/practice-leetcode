class CoinChange {
    // coins = [1,2,5], amount = 11 → 3 (5+5+1)
    // coins = [2], amount = 3 → -1
    execute(coins, amount) {
        const dp = new Array(amount + 1).fill(Infinity);
        dp[0] = 0;
        // console.log(dp);

        for (let i = 1; i <= amount; i++) {//1<=3,2<=3
            for (const coin of coins) {//[1,2,5]
                if (i >= coin) {//1>=1,2>=1,2>=2
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                    console.log(dp);
                }
            }
        }
        // return dp;
        // console.log(dp);
        return dp[amount] === Infinity ? -1 : dp[amount];
    }
}

console.log(new CoinChange().execute([1, 2, 5], 3));
// console.log(new CoinChange().execute([2], 3));
// console.log(new CoinChange().execute([1], 0));
