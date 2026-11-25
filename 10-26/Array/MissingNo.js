class MissingNo {
  execute(nums = []) {
    const len = nums.length;
    if (len <= 1) return nums;

    let set = new Set(nums);

    for(let i=0; i<=len; i++){
      if(!set.has(i))
        return i;
    }
  }
}

console.log(new MissingNo().execute([3, 0, 1]));
