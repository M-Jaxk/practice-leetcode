<?php
declare(strict_types=1);
namespace ITVH;
readonly class BinarySearch{
    //nums = [-1,0,3,5,9,12], target = 9
    public function execute(array $nums=[],int $target=0){
        $left = 0;
        $right = count($nums) - 1;//5

        while ($left <= $right) {

            $mid = intdiv($left + $right, 2);//5/1=2,4

            if ($nums[$mid] === $target) {
                return $mid;
            }

            if ($nums[$mid] < $target) {
                $left = $mid + 1;//3
            } else {
                $right = $mid - 1;
            }
        }

        return -1;
    }
}
echo(new BinarySearch()->execute([-1,0,3,5,9,12],9)) . PHP_EOL;
echo(new BinarySearch()->execute( [-1,0,3,5,9,12],2)) . PHP_EOL;
echo(new BinarySearch()->execute([5],5)) . PHP_EOL;
echo(new BinarySearch()->execute([5],-5)) . PHP_EOL;