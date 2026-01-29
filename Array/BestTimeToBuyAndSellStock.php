<?php

declare(strict_types=1);

class BestTimeToBuyAndSellStock
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
        $largestetStock = $smallestStock;
        $foundSmallestStock = false;
        for ($j = 0; $j < count($prices); $j++) {
            if ($prices[$j] === $smallestStock && $foundSmallestStock == false) {
                $foundSmallestStock = true;
                continue;
            }

            if ($foundSmallestStock == true && $prices[$j] > $largestetStock ) {
                $largestetStock = $prices[$j];
            }
        }
        return $largestetStock - $smallestStock;
    }
}

echo (new BestTimeToBuyAndSellStock)->maxProfit([7, 1, 5, 3, 6, 4]) . PHP_EOL;
echo (new BestTimeToBuyAndSellStock)->maxProfit([7, 6, 4, 3, 1]) . PHP_EOL;
