<?php
declare(strict_types=1);
class SetZero{
    //[[1,1,1],[1,0,1],[1,1,1]]
    public function execute(array $matrix): array{
        $m = count($matrix);
        $n = count($matrix[0]);
       
        $firstRowZero = false;
        $firstColZero = false;
        
        for($j = 0; $j < $n; $j++){
            if($matrix[0][$j] === 0){
                $firstRowZero = true;
                break;
            }
        }
        
            for($i = 0; $i < $m; $i++){
                if($matrix[$i][0] === 0){
                    $firstColZero = true;
                    break;
                }
            }
        
        for($i = 1; $i < $m; $i++){
            for($j = 1; $j < $n; $j++){
                if($matrix[$i][$j] === 0){
                    $matrix[$i][0] = 0;
                    $matrix[0][$j] = 0;
                }
            }
        }
        
        for($i = 1; $i < $m; $i++){
            for($j = 1; $j < $n; $j++){
                if($matrix[$i][0] === 0 || $matrix[0][$j] === 0){
                    $matrix[$i][$j] = 0;
                }
            }
        }
        
        if($firstRowZero){
            for($j = 0; $j < $n; $j++){
                $matrix[0][$j] = 0;
            }
        }
        
        if($firstColZero){
            for($i = 0; $i < $m; $i++){
                $matrix[$i][0] = 0;
            }
        }
        
        return $matrix;
    }
}

print_r((new SetZero())->execute( [[1,1,1],[1,0,1],[1,1,1]]));
print_r((new SetZero())->execute([[0,1,2,0],[3,4,5,2],[1,3,1,5]]));