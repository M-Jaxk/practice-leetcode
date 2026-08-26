class TwoSum {
  execute(nums = [], target){

    let map = new Map();
    for(let i=0; i< nums.length; i++){
      let compliment = target - nums[i];

      if(map.has(compliment))
        return [map.get(compliment),i];

      map.set(nums[i],i);
    }
  }
}

console.log(new TwoSum().execute([2, 3, 5, 7, 15], 9));
