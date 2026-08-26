class LongestSubString {
  execute(str = ""){

    const set = new Set();
    let left = 0;
    let max = 0;
    for(let i=0;i<str.length; i++){
      while(set.has(str[i])){
        set.delete(str[i]);
        left ++;
      }
      set.add(str[i]);
      max = Math.max(max,i- left +1);
    }
    return max;
  }
}

console.log(new LongestSubString().execute("abcabcbb"));

console.log(new LongestSubString().execute("bbbbb"));

console.log(new LongestSubString().execute("pwwkew"));
