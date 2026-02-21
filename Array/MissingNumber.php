<?php
declare(strict_types=1);
class MissingNumber{
    public function execute(array $num):int
    {
        $missingNo = count($num);
        for ($i = 0; $i < count($num); $i++) {
            $missingNo ^= $i ^ $num[$i];
        }
        return $missingNo;
    }
}
echo((new MissingNumber())->execute( [3,0,1])).PHP_EOL;
echo((new MissingNumber())->execute( [0,1])).PHP_EOL;
echo((new MissingNumber())->execute( [9,6,4,2,3,5,7,0,1])).PHP_EOL;
