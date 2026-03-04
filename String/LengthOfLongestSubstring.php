<?php

declare(strict_types=1);

class LengthOfLongestSubstring{
    public function execute(string $str):int{
        $maxLength = 0;
        $window = [];
        $left = 0;
        
        //"abcabcbb"
        for ($right=0; $right < strlen($str); $right++) { 
            $char = $str[$right];
            if(isset($window[$char]) && $window[$char] >= $left){
                $left = $window[$char] + 1;
            }
            $window[$char] = $right;
            $maxLength = max($maxLength,$right-$left+1);
        }



        // for ($right = 0; $right < strlen($str); $right++) {
        //     $char = $str[$right];//a,b,c,a
        //     if (isset($window[$char]) && $window[$char] >= $left) {
        //         $left = $window[$char] + 1;//0+1,
        //     }
        //     $window[$char] = $right;//[[a]=>0,[b]=>1,[c]=>2,[a]=>3]
        //     $maxLength = max($maxLength, $right - $left + 1);
        // }

        return $maxLength;
    }
}

echo (new LengthOfLongestSubstring())->execute("abcabcbb"). PHP_EOL;
// echo (new LengthOfLongestSubstring())->execute("bbbbb"). PHP_EOL;
// echo (new LengthOfLongestSubstring())->execute("pwwkew"). PHP_EOL;