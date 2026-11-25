class BestTimeToBuyAndSellStock {
  execute(prices = []) {
    let minPrice = prices[0];
    let maxProfit = 0;
    for (let i = 0; i < prices.length; i++) {
      if (prices[i] < minPrice) {
        minPrice = prices[i];
      } else {
        const currentProfit = prices[i] - minPrice;

        if (currentProfit > maxProfit) {
          maxProfit = currentProfit;
        }
      }
    }
    return maxProfit;
  }
}

const stock = new BestTimeToBuyAndSellStock();

console.log(stock.execute([7, 1, 5, 3, 6, 4])); // 5
console.log(stock.execute([7, 6, 4, 3, 1])); // 0
