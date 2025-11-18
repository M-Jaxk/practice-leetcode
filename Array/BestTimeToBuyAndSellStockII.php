<?php

declare(strict_types=1);

class BestTimeToBuyAndSellStockII
{

    public function maxProfit(array $prices): float|int|string
    {
        if (count($prices) === 0)
            return "Empty Array";

        $smallestStock = $prices[0];
        for ($i = 0; $i < count($prices); $i++) { //[7,1,5,3,6,4]
            if ($prices[$i] < $smallestStock)
                $smallestStock = $prices[$i];
        }

        $secondSmallestStock = PHP_INT_MAX;
         for ($i = 0; $i < count($prices); $i++) { //[7,1,5,3,6,4]//[1,2,3,4,5]
            if ($prices[$i] < $secondSmallestStock && $prices[$i] > $smallestStock){
                $secondSmallestStock = $prices[$i];
                $secondSmallestStockIndex = $i;
            }
        }

        $largestetStock = $smallestStock;
        $secondLargestStock = $smallestStock;
        $secondLargestStockIndex=0;
        $foundSmallestStock = false;
        $foundSecondSmallestStock = false;

        for ($j = 0; $j < count($prices); $j++) {
            if ($prices[$j] === $smallestStock && $foundSmallestStock == false) {
                $foundSmallestStock = true;
                continue;
            }

            if ($foundSmallestStock == true && $prices[$j] > $largestetStock ) {
                $largestetStock = $prices[$j];
            }
        }

        for ($j = 0; $j < count($prices); $j++) {//[7,1,5,3,6,4]//[7,6,4,3,1]
            if ($prices[$j] === $smallestStock && $foundSecondSmallestStock == false) {
                $foundSecondSmallestStock = true;
                continue;
            }
            if ($foundSecondSmallestStock == true && $prices[$j] > $secondLargestStock && $prices[$j] < $largestetStock ) {//5<1
               $secondLargestStock = $prices[$j];
               $secondLargestStockIndex = $j;
           }
        }
        // var_dump($smallestStock,$secondSmallestStock,$largestetStock,$secondLargestStock);
        $profit= $largestetStock - $smallestStock;
        
        // var_dump($secondSmallestStockIndex , $secondLargestStockIndex);
        $profit1=0;
        $profit2=0;
        if($secondSmallestStockIndex > $secondLargestStockIndex){
            $profit1 = $secondLargestStock - $smallestStock;//5-1
            $profit2 = $largestetStock - $secondSmallestStock;//6-3
        }
        
        // var_dump($profit,($profit1+$profit2));
        return $profit > ($profit1 + $profit2)? $profit: ($profit1 + $profit2);
    }
}

echo (new BestTimeToBuyAndSellStockII)->maxProfit([7, 1, 5, 3, 6, 4]) . PHP_EOL;
echo (new BestTimeToBuyAndSellStockII)->maxProfit([1,2,3,4,5]) . PHP_EOL;
echo (new BestTimeToBuyAndSellStockII)->maxProfit([7,6,4,3,1]) . PHP_EOL;
