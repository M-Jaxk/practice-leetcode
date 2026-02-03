<?php

declare(strict_types=1);
class MergeInterval
{

    //Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
    //Output: [[1,6],[8,10],[15,18]]
    //Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
    public function execute(array $intervals)
    {
        if (empty($intervals)) {
            return [];
        }

        // Step 1: Sort intervals by start time [[4,7],[1,4]]
        usort($intervals, function ($a, $b) {
            return $a[0] <=> $b[0];
        });

        // Step 2: Initialize merged list
        $merged = [];

        // Step 3: Iterate through intervals
        foreach ($intervals as $interval) {
            // If merged is empty or no overlap, just append
            if (empty($merged) || $merged[count($merged) - 1][1] < $interval[0]) {
                $merged[] = $interval;
            } else {
                // Overlap exists, merge intervals
                $merged[count($merged) - 1][1] = max($merged[count($merged) - 1][1], $interval[1]);
            }
        }

        return $merged;
    }
}
// print_r((new MergeInterval())->execute([[1,3],[2,6],[8,10],[15,18]]));
// print_r((new MergeInterval())->execute( [[1,4],[4,5]]));
print_r((new MergeInterval())->execute([[4,7],[1,4]]));

