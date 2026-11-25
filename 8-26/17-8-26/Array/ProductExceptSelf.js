class ProductExceptSelf {
  execute(nums = []){

    const result = new Array(nums.length).fill(1);

    let prefix = 1;
    for(let i=0;i<nums.length;i++){
      result[i] = prefix;
      prefix *= nums[i];
    }

    let suffix = 1;
    for(let i=nums.length-1; i>=0; i--){
      result[i] *= suffix;
      suffix *= nums[i];
    }

    return result;
  }
}

console.log(new ProductExceptSelf().execute([1,2,3,4]));
console.log(new ProductExceptSelf().execute([-1,1,0,-3,3]));
