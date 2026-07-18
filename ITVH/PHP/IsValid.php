<?php
declare(strict_types=1);
namespace ITVH;
readonly class IsValid
{
    //s = ()[]{}
    public function execute(string $str):bool
    {
        if(strlen($str) <= 1) return false;

        $stack = [];

        $pairs = [
            ')' => '(',
            '}' => '{',
            ']' => '[',
        ];

        foreach (str_split($str) as $char) {
            if (in_array($char, ['(', '{', '['])) {
                $stack[] = $char;//[ (,{,[ ]
            } else {
                if (empty($stack)) {
                    return false;
                }

                $top = array_pop($stack);

                if ($top !== $pairs[$char]) {
                    return false;
                }
            }
        }
        return empty($stack);
    }
}
echo((new IsValid())->execute("({[]})")) . PHP_EOL;
echo((new IsValid())->execute("()[]{}")) . PHP_EOL;
echo((new IsValid())->execute("(]")) . PHP_EOL;
