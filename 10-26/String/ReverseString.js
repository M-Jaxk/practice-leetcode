class ReverseString{
    execute(str=[]){
        const result = [];
        for(let i=0;i<str.length;i++){
            result[i] = str[str.length-1-i];
        }
        return result;
    }
}

console.log(new ReverseString().execute(["h", "e", "l", "l", "o"]));
console.log(new ReverseString().execute(["H", "a", "n", "n", "a", "h"]));

