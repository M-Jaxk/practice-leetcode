<?php

declare(strict_types=1);

class BestTimeToBuyAndSellStockII
{
    //[7, 1, 5, 3, 6, 4]
    public function maxProfit(array $prices): float|int|string
    {
        if(count($prices) === 0)
            return "Empty Array";

        $totalProfit = 0;
        for ($i=1; $i < count($prices); $i++) { 
            if($prices[$i] > $prices[$i-1]){
                $totalProfit += $prices[$i] - $prices[$i-1];
            }
        }
        return $totalProfit;
    }
}

echo (new BestTimeToBuyAndSellStockII)->maxProfit([7, 1, 5, 3, 6, 4]) . PHP_EOL;
echo (new BestTimeToBuyAndSellStockII)->maxProfit([1, 2, 3, 4, 5]) . PHP_EOL;
echo (new BestTimeToBuyAndSellStockII)->maxProfit([7, 6, 4, 3, 1]) . PHP_EOL;
