<?php

declare(strict_types=1);

class BestTimeToBuyAndSellStockII
{
    public function maxProfit(array $prices): float|int|string
    {

        if(count($prices) === 0)
            return "Empty Array";

        //1.smallest stock
        $smallestStock = $prices[0];
        for ($i=0; $i < count($prices); $i++) { 
            if($prices[$i] < $smallestStock){
                $smallestStock = $prices[$i];
            }
        }

        //2.find second smallest stock [7, 1, 5, 3, 6, 4] [1, 2, 3, 4, 5]
        $secondSmallestStock = PHP_INT_MAX;//7
        $secondSmallestStockIndex = 0;
        for ($i=0; $i < count($prices); $i++) { 
            if($prices[$i] < $secondSmallestStock && $prices[$i] > $smallestStock){
                $secondSmallestStock = $prices[$i];
                $secondSmallestStockIndex = $i;
            }
        }

        //3.largest number
        $largestStock = $smallestStock;
        $foundSmallestStock = false;
        
        //find smallest stock
        for ($j=0; $j < count($prices); $j++) { 
            if($prices[$j] == $smallestStock && $foundSmallestStock == false){
                $foundSmallestStock = true;
                continue;
            }
            if($foundSmallestStock === true && $prices[$j] > $largestStock){
                $largestStock = $prices[$j];
            }
        }

         //4.second largest number
        $secondLargestStock = $smallestStock;
        $secondLargestStockIndex = 0;
        $foundSecondSmallestStock = false;
        
        //find smallest stock
        for ($j=0; $j < count($prices); $j++) { 
            if($prices[$j] == $smallestStock && $foundSecondSmallestStock == false){
                $foundSecondSmallestStock = true;
                continue;
            }
            if($foundSecondSmallestStock == true && $prices[$j] > $secondLargestStock && $prices[$j] < $largestStock){
                $secondLargestStock = $prices[$j];
                $secondLargestStockIndex = $j;
            }
        }

        // 5. Compute profit cases
        $profitMain = $largestStock - $smallestStock;

        $profit1 = 0; // second largest - smallest
        $profit2 = 0; // largest - second smallest

        if ($secondSmallestStockIndex > $secondLargestStockIndex ) {
            $profit1 = $secondLargestStock - $smallestStock;
            $profit2 = $largestStock - $secondSmallestStock;
        }

        $combined = $profit1 + $profit2;

        return ($profitMain > $combined)
            ? $profitMain
            : $combined;
    }
}

echo (new BestTimeToBuyAndSellStockII)->maxProfit([7, 1, 5, 3, 6, 4]) . PHP_EOL;
echo (new BestTimeToBuyAndSellStockII)->maxProfit([1, 2, 3, 4, 5]) . PHP_EOL;
echo (new BestTimeToBuyAndSellStockII)->maxProfit([7, 6, 4, 3, 1]) . PHP_EOL;
