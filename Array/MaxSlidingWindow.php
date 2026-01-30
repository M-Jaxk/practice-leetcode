<?php

declare(strict_types=1);
class MaxSlidingWindow
{
    //[1,3,-1,-3,5,3,6,7] ,k=3
    //[1,3,-1] = [3]
    //[3,-1,-1] = [3]

    // public function execute(array $arr,int $slicer)
    // {
    //     $result = [];
    //     for ($i=0; $i < count($arr)-($slicer-1); $i++) { 
    //         # code...
    //         $newArr = array_slice($arr, $i,  $slicer + $i);
    //         $max = 0;
    //         foreach ($newArr as $a) {
    //             if ($a > $max) {
    //                 $max = $a;
    //             }
    //         }
    //         array_push($result,$max);
    //     }
    //     return $result;
    // }

    public function execute(array $arr, int $slicer)
    {
        $n = count($arr);
        if ($slicer <= 0 || $slicer > $n) {
            return [];
        }

        $result = [];
        $deque = []; // stores indexes

        for ($i = 0; $i < $n; $i++) {

            // Remove indexes out of current window
            if (!empty($deque) && $deque[0] <= $i - $slicer) {
                array_shift($deque);
            }

            // Maintain decreasing order in deque
            while (!empty($deque) && $arr[end($deque)] <= $arr[$i]) {
                array_pop($deque);
            }

            // Add current index
            $deque[] = $i;

            // Window formed → record max
            if ($i >= $slicer - 1) {
                $result[] = $arr[$deque[0]];
            }
        }

        return $result;
    }
}

print_r((new MaxSlidingWindow())->execute([1, 3, -1, -3, 5, 3, 6, 7], 3));
