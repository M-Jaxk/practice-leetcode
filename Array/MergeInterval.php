<?php

declare(strict_types=1);
class MergeInterval{

//Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
//Output: [[1,6],[8,10],[15,18]]
//Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
    public function execute(array $data)
    {
        foreach ($data as $key => $value) {
            $lastVal1 = $value[1];
            $lastVal2 = 0;
        }
    }
}