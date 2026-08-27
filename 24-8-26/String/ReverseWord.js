class ReverseWord {
  execute(s) {

    if(s.length === 0)
      return false;

    const cleanStr = s.trim().split(/\s+/);
    let result = [];

    for(let i=0; i< cleanStr.length; i++){
      result[i] = cleanStr[cleanStr.length - 1 - i];
    }
    return result.join(' ');
  }
}


console.log(new ReverseWord().execute("  the sky is blue"));
console.log(new ReverseWord().execute("  hello world  ")); 
console.log(new ReverseWord().execute("a good   example"));  

