class CyclicRotation{
    execute(nums,t){
        if(nums.length === 0) return [];

        for(let i=0; i < t; i++){
            let least = nums.pop();
            nums.unshift(least);
        }
        return nums;
    }
}

console.log(new CyclicRotation().execute([3, 8, 9, 7, 6],3));