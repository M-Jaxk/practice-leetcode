<?php
class Rotate{
    //Input: nums = [1,2,3,4,5,6,7], k = 3 ,nuns = [-1,-100,3,99] k=2
    //nums = [7,1,2,3,4,5,6]
    //Output: [5,6,7,1,2,3,4]
    public function execute(array $nums, int $k){
        if(empty($nums) || $k<0){
            return [];
        }
        $rotateArr = array_slice($nums,count($nums)-$k,$k);
        $untouchArr = array_slice($nums,0,count($nums)-$k);
        
        return array_merge($rotateArr, $untouchArr);
    }
}
print_r((new Rotate())->execute([1,2,3,4,5,6,7],3));
print_r((new Rotate())->execute([-1,-100,3,99],2));