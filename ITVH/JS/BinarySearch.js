class BinarySearch {
    //nums = [-1,0,3,5,9,12], target = 9
    execute(nums = [], target = 0) {
        let left = 0;
        let right = nums.length;
        while(left <= right){
            let mid = Math.floor((left+right)/2);

            if(nums[mid] === target){
                return mid;
            }

            if(nums[mid] < target){
                left = mid + 1;
            }else{
                right = mid - 1;
            }
        }
        return -1;
    }
}
console.log(new BinarySearch().execute([-1, 0, 3, 5, 9, 12], 9));
// console.log(new BinarySearch().execute([-1, 0, 3, 5, 9, 12], 2));
// console.log(new BinarySearch().execute([5], 5));
// console.log(new BinarySearch().execute([5], -5));
