<?php
declare(strict_types=1);
class TwoSum{
 public function execute(array $nums, int $target) {

        $map = [];

        for ($i = 0; $i < count($nums); $i++) {

            $difference = $target - $nums[$i];//9-2 =7,9-7=2,9-11=-2,9-15=-6

            if (isset($map[$difference])) {//isset($map[7],[2],[-2],[-6])
                // return "correct";
                return [$map[$difference], $i];//$map[[2],1]
            }

            $map[$nums[$i]] = $i; //$map[2][7][11][15] = 0,1,2,3
            // return $map;
            
            }//$map[2] = 0;$map[3]=0, $map[2]=1

        return [];
    }
}

print_r((new TwoSum())->execute( [2,7,11,15],9));
// print_r((new TwoSum())->execute( [0,1,1]));
// print_r((new TwoSum())->execute( [0,0,0]));
