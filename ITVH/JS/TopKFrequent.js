class TopKFrequent {
    execute(nums, k) {
        const freq = new Map();

        for (const num of nums) {
            freq.set(num, (freq.get(num) || 0) + 1);
        }

        return [...freq.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, k)
            .map(([num]) => num);
    }
}

console.log(
    new TopKFrequent().execute([1, 1, 1, 2, 2, 3, 6], 2)
);