class TwoSum{
    //for of
    //find complement (target-nums[i])
    //map.has(complement)
    //map (key,value)[1=>0,2=>1]
    //map.set() []
    execute(nums, target){
        const map = new Map();
        for(let i =0; i <nums.length;i++){
            let complement = target - nums[i];//8,7,5,4
            
            if(map.has(complement)){//map=[]
                return [map.get(complement),i];//[2,3]
            }
            map.set(nums[i],i);//[1=>0,2=>1,4=>2,]
        }
        return[];
    }
}

console.log(new TwoSum().execute([1,2,4,5,6],9));//[2,3]