class TwoSum{
    execute(nums=[],target){
        if(nums.length <= 2 || target === null)
            return nums;

        let map = new Map();
        for(let i=0;i<nums.length;i++){
            const compliment = target - nums[i];

            if(map.has(compliment)){
                return [map.get(compliment),i];
            }
            map.set(nums[i],i);
        }
    }
}

console.log(new TwoSum().execute([2,7,11,15],9));