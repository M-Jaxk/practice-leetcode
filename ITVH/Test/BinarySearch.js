class BinarySearch {
  //two pointer
  //left=0, right = nums.length
  //find mid
  //mid == target return;
  //if(num[mid]< target) , left = mid + 1
  //else, right = mid - 1
  execute(nums, target) {
    if (nums.length === 0) return false;
    let left = 0;
    let right = nums.length;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);

      if (nums[mid] === target) {
        return mid;
      }
      if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return -1;
  }
}

console.log(new BinarySearch().execute([1, 2, 4, 5, 7], 3)); //3
