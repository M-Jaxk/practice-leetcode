class OddOccurences{
    //return empty []
    //use Map() to store key value
    //.set(val,+occr)
    execute(nums){
        if(nums.length === 0) return [];

        const map = new Map();

        for(const num of nums){
            map.set(num,(map.get(num) || 0) + 1);
        }

          for (const [key, value] of map) {
            if (value === 1) {
                return key;
            }
        }
        return null;
       
    }
}

console.log(new OddOccurences().execute([9, 3, 9, 3, 7, 9]));