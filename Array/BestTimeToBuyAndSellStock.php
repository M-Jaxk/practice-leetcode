<?php

declare(strict_types=1);

class BestTimeToBuyAndSellStock
{
    //[7, 1, 5, 3, 6, 4]
    public function maxProfit(array $prices): int
    {
        if(empty($prices)) return 0;

        $minPrice = $prices[0];
        $maxProfit = 0;
        for ($i=0; $i < count($prices); $i++) { 
            if($prices[$i] < $minPrice){
                $minPrice = $prices[$i];
            }else{
                $curProfit = $prices[$i] - $minPrice;
                if($curProfit > $maxProfit){
                    $maxProfit = $curProfit;
                }
            }
        }
        return $maxProfit;
    }
}

echo (new BestTimeToBuyAndSellStock)->maxProfit([7, 1, 5, 3, 6, 4]) . PHP_EOL;
echo (new BestTimeToBuyAndSellStock)->maxProfit([7, 6, 4, 3, 1]) . PHP_EOL;
