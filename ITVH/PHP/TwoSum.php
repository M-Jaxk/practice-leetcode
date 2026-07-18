<?php
declare(strict_types=1);
namespace ITVH;
readonly class TwoSum
{
    //nums = [2,7,11,15], target = 9 → [0,1]
    public function execute(array $nums, int $target): array
    {
        $map = [];

        foreach ($nums as $i => $num) {
            $complement = $target - $num;

            if (array_key_exists($complement, $map)) {
                return [$map[$complement], $i];
            }

            $map[$num] = $i;
        }

        return [];
    }
}
print_r((new TwoSum())->execute([2, 7, 11, 15], 9));
