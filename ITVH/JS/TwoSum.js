class TwoSum {
    //nums = [2,7,11,15], target = 9 → [0,1]
    execute(nums, target) {
        const map = new Map();

        for (let i = 0; i < nums.length; i++) {
            const complement = target - nums[i];//7,2

            if (map.has(complement)) {
                return [map.get(complement), i];//0,1
            }

            map.set(nums[i], i);//2=>0, 
        }

        return [];
    }
}
console.log(new TwoSum().execute([2,1, 7, 8, 11, 15], 9));
