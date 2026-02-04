<?php
declare(strict_types=1);
class ProductExceptSelf{
    //Input: nums = [1,2,3,4]
    //Output: [24,12,8,6]
    public function execute(array $nums): array {
        // $n = count($nums);
        // $result = array_fill(0, $n, 1);
        
        // //$result=[1,1,1,1]
        // // First pass: left products
        // $leftProduct = 1;
        // for ($i = 0; $i < $n; $i++) {//$i=0,0<4,1<4,2<4,3<4
        //     $result[$i] = $leftProduct;//[1,1,2,6]
        //     $leftProduct *= $nums[$i];//1,2,6,24
        // }
        
        // // Second pass: right products
        // $rightProduct = 1;
        // for ($i = $n - 1; $i >= 0; $i--) {//i=3>=0,2>=0,1>=0,0>=0
        //     $result[$i] *= $rightProduct;//[24,12,8,6]
        //     $rightProduct *= $nums[$i];//4,12,24,24
        // }
        
        // return $result;

        $n = count($nums);

    $leftProducts  = array_fill(0, $n, 1);
    $rightProducts = array_fill(0, $n, 1);
    $result        = array_fill(0, $n, 0);

    // Calculate products of all elements to the left
    //[1,2,3,4]
    //[1,1,2,6]
    for ($i = 1; $i < $n; $i++) {
        $leftProducts[$i] = $leftProducts[$i - 1] * $nums[$i - 1];
    }

    // Calculate products of all elements to the right
    //[1,2,3,4]
    //[24,12,4,1]
    for ($i = $n - 2; $i >= 0; $i--) {//i=2,1
        $rightProducts[$i] = $rightProducts[$i + 1] * $nums[$i + 1];
    }

    // Multiply left and right products
    //[1,1,2,6]
    //[24,12,4,1]
    for ($i = 0; $i < $n; $i++) {
        $result[$i] = $leftProducts[$i] * $rightProducts[$i];
    }

    return $result;
    }
}
print_r((new ProductExceptSelf())->execute([1,2,3,4]));
print_r((new ProductExceptSelf())->execute([-1,1,0,-3,3]));
