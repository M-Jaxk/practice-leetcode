<?php

declare(strict_types=1);
final class MaximumSubArray
{
    function maxSubArray(array $nums): int
    {
        //localMax:store the maximum subarray sum ending at index i
        //globalMax:store the maximum subarray sum we have encountered so far
        $localMax = $globalMax = $nums[0];

        foreach (array_slice($nums, 1) as $num) {
            $localMax = max($localMax + $num, $num); //0,1
            $globalMax = max($globalMax, $localMax); //0,1
        }

        return $globalMax;
    }
}

echo (new MaximumSubArray)->maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]) . PHP_EOL;
echo (new MaximumSubArray)->maxSubArray([1]) . PHP_EOL;
echo (new MaximumSubArray)->maxSubArray([5,4,-1,7,8]);
