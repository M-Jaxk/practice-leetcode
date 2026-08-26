class RotateArray {
  execute(nums = [], k){

  const len = nums.length;
  k = k % len;

  return[...nums.slice(len-k),...nums.slice(0,len-k)];
  }
}

console.log(new RotateArray().execute([1,2, 3,4, 5,6, 7], 8));
