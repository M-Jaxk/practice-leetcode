class IsPalindrome {
  execute(s) {

    if(s.length === 0)
      return false;

    for(let i=0;i<s.length/2;i++){
      if(s[i] !== s[s.length-1-i]){
        return false;
      }
    }
    return true;
  }
}

const paladrone = new IsPalindrome();

console.log(paladrone.execute("acbca")); // true

console.log(paladrone.execute("raceca")); // false
