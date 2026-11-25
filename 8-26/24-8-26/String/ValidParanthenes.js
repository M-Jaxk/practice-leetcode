class ValidParenthenes {
  execute(s) {

    let stack = [];
    const pairs = {
      ")":"(",
      "]":"[",
      "}":"{"
    }
    if(s.length === 0)
        return false;

    for(let char of s){
      if(["(","[","{"].includes(char)){
        stack.push(char);
      }else{
        if(stack.length === 0)
          return false;
        const last = stack.pop();
        if(last !== pairs[char])
          return false;
      }
    }
    return true;
    }
}

const valid = new ValidParenthenes();

console.log(valid.execute("()[]{}")); // true

console.log(valid.execute("({[]})")); // true
console.log(valid.execute("(]")); // false
