<?php

declare(strict_types=1);

class ValidAnagram
{
    public function execute(string $s, string $t)
    {
        //Input: s = "anagram", t = "nagaram"
        // If lengths differ, they cannot be anagrams
        if (strlen($s) != strlen($t)) return 0;

        $count = [];
        for ($i = 0; $i < strlen($s); $i++) {
            $char = $s[$i];//a
            $count[$char] = ($count[$char] ?? 0) + 1;
        }

        for ($i = 0; $i < strlen($t); $i++) {
            $char = $t[$i];
            if (!isset($count[$char]) || $count[$char] == 0) {
                return 0;
            }
            $count[$char]--;
        }
        return 1;
    }
}

echo (new ValidAnagram())->execute("anagram","nagaram"). PHP_EOL;
echo (new ValidAnagram())->execute("apple", "aplee") . PHP_EOL;