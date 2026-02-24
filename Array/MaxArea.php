<?php
declare(strict_types=1);

class MaxArea{
    public function execute(array $num){
        $left = 0;
        $right = count($num) - 1;
        $maxArea = 0;

        while($left<$right){
            $width = $right - $left;
            $height = min($num[$left],$num[$right]); 
            $maxArea = max($maxArea,($width*$height));

            if($num[$left] < $num[$right]){
                $left ++;
            }else{
                $right --;
            }
        }

        return $maxArea;
    }
}

echo((new MaxArea())->execute( [1,8,6,2,5,4,8,3,7])).PHP_EOL;
echo((new MaxArea())->execute( [1,1]));
