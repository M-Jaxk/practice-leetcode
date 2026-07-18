class ProductExceptSelf {
  //create new same size array  fill with 1
  //calculate prefix
  //calculate suffix

  execute(nums) {
    if (nums.length === 0) return [];
    const result = new Array(nums.length).fill(1);
    
    //left calcualtion
    let prefix = 1;
    for(let i=0; i< nums.length; i++){
      result[i] = prefix;
      prefix *= nums[i]; 
    }

    //right calcualtion
    let suffix = 1;
    for(let i = nums.length-1; i >= 0; i--){
      result[i] *= suffix;
      suffix *= nums[i]; 
    }
    
    return result;
  }
}

console.log(new ProductExceptSelf().execute([1,2,3,4])); //[1,2]
