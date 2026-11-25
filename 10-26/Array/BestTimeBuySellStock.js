class BestTimeBuySellStock {
  execute(nums = []) {
    let minPrice = nums[0];
    let maxProfit = 0;

    for (let i = 0; i < nums.length; i++) {
      if (nums[i] < minPrice) {
        minPrice = nums[i];
      } else {
        let currProfit = nums[i] - minPrice;
        if (currProfit > maxProfit) {
          maxProfit = currProfit;
        }
      }
    }
    return maxProfit;
  }
}

console.log(new BestTimeBuySellStock().execute([7, 1, 5, 3, 6, 4]));
console.log(new BestTimeBuySellStock().execute([7, 6, 4, 3, 1]));
