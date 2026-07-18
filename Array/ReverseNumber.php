<?php
declare(strict_types=1);
class ReverseNumber{
    //Input: nums = [1,2,3,4]
    //Output: [24,12,8,6]
    public function execute(array $nums): array {
        if(empty($nums)) return [];
        $n = count($nums); //4
        $result = [];
        for ($i=0; $i < $n; $i++) { 
            $result[$i] = $nums[$n - ($i+1)];//3
        }
        
        return $result;

    }
}
print_r((new ReverseNumber())->execute([1,2,3,4]));
// print_r((new ReverseNumber())->execute([-1,1,0,-3,3]));
