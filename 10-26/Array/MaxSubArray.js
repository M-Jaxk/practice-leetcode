class MaxSubArray {
  execute(nums = []) {
    let localMax = nums[0]
    let globalMax = nums[0]

    for(let i=1;i<nums.length;i++){
      const num = nums[i]
      localMax=Math.max(localMax+num,num)
      globalMax=Math.max(localMax,globalMax)
    }
    return globalMax
  }
}

console.log(new MaxSubArray().execute([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
console.log(new MaxSubArray().execute([1]));
console.log(new MaxSubArray().execute([5, 4, -1, 7, 8]));
