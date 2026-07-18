class KthLargestElement {
    // [3,2,1,5,6,4], k = 2 → 5
    // [3,2,3,1,2,4,5,5,6], k = 4 → 4
    execute(nums, k) {
        const swap = (i, j) => {
            [nums[i], nums[j]] = [nums[j], nums[i]];
        };

        const quickSelect = (left, right) => {
            const pivot = nums[right];
            let storeIdx = left;

            for (let i = left; i < right; i++) {
                if (nums[i] > pivot) {
                    swap(i, storeIdx);
                    storeIdx++;
                }
            }

            swap(storeIdx, right);

            if (storeIdx === k - 1) return nums[storeIdx];
            if (storeIdx > k - 1) return quickSelect(left, storeIdx - 1);
            return quickSelect(storeIdx + 1, right);
        };

        return quickSelect(0, nums.length - 1);
    }
}
console.log(new KthLargestElement().execute([3, 2, 1, 5, 6, 4], 2));
