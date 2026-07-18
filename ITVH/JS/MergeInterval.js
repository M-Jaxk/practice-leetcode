class MergeInterval {
    //Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
    //Output: [[1,6],[8,10],[15,18]]
    //Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
    execute(intervals) {
        if (intervals.length === 0) {
            return [];
        }

        // Step 1: Sort intervals by start time [[4,7],[1,4]]
        intervals.sort((a, b) => a[0] - b[0]);

        // Step 2: Initialize merged list
        const merged = [];

        // Step 3: Iterate through intervals
        for (const interval of intervals) {
            // If merged is empty or no overlap, just append
            if (merged.length === 0 || merged[merged.length - 1][1] < interval[0]) {
                merged.push(interval);
            } else {
                // Overlap exists, merge intervals
                merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], interval[1]);
            }
        }

        return merged;
    }
}
console.log(new MergeInterval().execute([[4, 7], [1, 4]]));
