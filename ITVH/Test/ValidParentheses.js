class ValidParentheses{
    
    execute(str){
        if(str.length === 0) return "";

        const set = new Set(["(","[","{"]);
        const pairs = {
            ")":"(",
            "}":"{",
            "]":"[",
        };
        const result = [];
        for(const char of str){
            if(set.has(char)){
                result.push(char);//[(]
            }else{
                // if(result.length ===0)
                //     return false;//( !== )
                if(!result.length || result.pop() !== pairs[char]){
                    return false;
                }
            }
        }
        return result.length == 0;
    }
}

console.log(new ValidParentheses().execute("()"));
console.log(new ValidParentheses().execute("({[]})"));
console.log(new ValidParentheses().execute("(]"));