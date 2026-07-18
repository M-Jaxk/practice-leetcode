<?php
declare(strict_types=1);

class MaxArea{
    public function execute(array $num){
        $left = 0;
        $right = count($num) - 1;
        $maxArea = 0;

        while($left<$right){ //0<8,1<8,2<8
            $width = $right - $left; //8-0=8
            $height = min($num[$left],$num[$right]);//min(1,7)=1
            $maxArea = max($maxArea,($width*$height));//8

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
