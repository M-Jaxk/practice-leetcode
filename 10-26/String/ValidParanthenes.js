class ReverseString{
    execute(str=""){

        const result = [];
        const pairs = {
            ')':'(',
            ']':'[',
            '}':'{'
        }

        for(let char of str){
            if(["(","[","{"].includes(char)){
                result.push(char);
            }else{
                if(result.length == 0)
                    return false;

                const last = result.pop();
                if(last !== pairs[char])
                    return false;
            }
        }
        return true;
    }
}

console.log(new ReverseString().execute("()"));
console.log(new ReverseString().execute("()[]{}"));
console.log(new ReverseString().execute("(]"));
console.log(new ReverseString().execute("([])"));