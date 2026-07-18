class BinaryGraph{
    execute(num){
        const binary = num.toString(2);
        
        let maxGap = 0;
        let currentGap = 0;

        for(const bit of binary){
            if(bit === '0'){
                currentGap++;
            }else{
                maxGap = Math.max(currentGap,maxGap);
                currentGap = 0;
            }
        }
        return maxGap;
        
    }
}
console.log(new BinaryGraph().execute(1041));