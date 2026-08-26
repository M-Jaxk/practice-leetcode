class IsPalindrome {
  execute(s) {

    if(s.length === 0)
      return false;

    for(let i=0; i<s.length/2;i++){
      if(s[i] !== s[s.length-i-1]){
        return false;
      }
    }

    return true;
  }
}

const paladrone = new IsPalindrome();

console.log(paladrone.execute("abba")); // true

console.log(paladrone.execute("racecar")); // false
