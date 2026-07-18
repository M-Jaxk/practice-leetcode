class SearchRotated {
    //nums = [4,5,6,7,0,1,2], target = 0 → 4
    execute(nums, target) {
        let left = 0;
        let right = nums.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (nums[mid] === target) return mid;

            // Left half is sorted
            if (nums[left] <= nums[mid]) {
                if (target >= nums[left] && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                // Right half is sorted
                if (target > nums[mid] && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }

        return -1;
    }
}
console.log(new SearchRotated().execute([4, 5, 6, 7, 0, 1, 2], 0));
// console.log(new SearchRotated().execute([4, 5, 6, 7, 0, 1, 2], 3));
