class ReverseString {
  execute(s) {

    if(s.length === 0)
      return false;

    let result=[];
    for(let i =0;i<s.length;i++){
      result[i] = s[s.length-1-i];
    }
    return result.join('');
  }
}


console.log(new ReverseString().execute("blue")); 

