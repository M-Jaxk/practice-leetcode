class MissingFirstPositiveNo {
  execute(nums = []) {
    
    let set = new Set(nums);
    const len = nums.length;
    for(let i=1;i<=len+1;i++){
        if(!set.has(i)){
            return i;
        }
    }
  }
}

console.log(new MissingFirstPositiveNo().execute([1,2,0]));
console.log(new MissingFirstPositiveNo().execute([3,4,1,-1]));
console.log(new MissingFirstPositiveNo().execute([7,8,9,11,12]));
