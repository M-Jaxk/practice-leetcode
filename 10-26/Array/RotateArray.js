class RotateArray{
    execute(nums=[],k){
        const len = nums.length;
        k = k%len;
        // for(let i=0;i<k;i++){
        //     const lastNum = nums[len-1];

        //     for(let j=len-1;j>0;j--){
        //         nums[j] = nums[j-1];
        //     }
        //     nums[0] = lastNum;
        // }
        // return nums;

        return [...nums.slice(len-k),...nums.slice(0,(len-k))]
    }
}

console.log(new RotateArray().execute([1,2,3,4,5,6,7],3));