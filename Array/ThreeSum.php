<?php
declare(strict_types=1);
class ThreeSum{
public function execute(array $nums)
    {
        $result = [];
        $n = count($nums);//6
        sort($nums);//[-4,-1,-1,0,1,2]
        
        for ($i = 0; $i < $n - 2; $i++) {
            if ($i > 0 && $nums[$i] == $nums[$i - 1]) {
                continue;
            }
            
            $left = $i + 1;
            $right = $n - 1;//5 
            
            while ($left < $right) {//1<5
                $sum = $nums[$i] + $nums[$left] + $nums[$right];//-4+(-1)+(-1)
                
                if ($sum == 0) {
                    $result[] = [$nums[$i], $nums[$left], $nums[$right]];
                    
                    while ($left < $right && $nums[$left] == $nums[$left + 1]) {
                        $left++;
                    }
                    while ($left < $right && $nums[$right] == $nums[$right - 1]) {
                        $right--;
                    }
                    
                    $left++;
                    $right--;
                } elseif ($sum < 0) {
                    $left++;
                } else {
                    $right--;
                }
            }
        }
        
        return $result;
    }
}

print_r((new ThreeSum())->execute( [-1,0,1,2,-1,-4]));
print_r((new ThreeSum())->execute( [0,1,1]));
print_r((new ThreeSum())->execute( [0,0,0]));
