<?php 
declare(strict_types=1);

class BestTimeToBuyAndSellStock {

    public function maxProfit(array $prices): float|int|string {
        if (count($prices) === 0) {
            return "Empty array";
        }

        $smallestStock = $prices[0];
        for ($i = 0; $i < count($prices); $i++) {
            if ($prices[$i] < $smallestStock) {
                $smallestStock = $prices[$i];
            }
        }

        $largestStock = $smallestStock;
        $foundSmallest = false;

        for ($j = 0; $j < count($prices); $j++) {

            // once we reach smallestStock index, start tracking max
            if ($prices[$j] === $smallestStock && $foundSmallest === false) {
                $foundSmallest = true;
                continue;
            }

            if ($foundSmallest && $prices[$j] > $largestStock) {
                $largestStock = $prices[$j];
            }
        }

        return $largestStock - $smallestStock;
    }
}

echo (new BestTimeToBuyAndSellStock)->maxProfit([7,1,5,3,6,4]) . PHP_EOL;
echo (new BestTimeToBuyAndSellStock)->maxProfit([7,6,4,3,1]) . PHP_EOL;
