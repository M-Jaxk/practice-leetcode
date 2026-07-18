class LongestSubStr {
  //for()
  //set.has(val)
  //while(left)
  //set.remove(val)
  //left++
  //set.push(val)
  //max(max,(right-left) +1)
  execute(strs) {
    if (strs.length === 0) return -1;

    const set = new Set();
    let left = 0;
    let max = 0;
    for (let right = 0; right < strs.length; right++) {//0,1,2,3,4,5
      while (set.has(strs[right])) {//[a,b]
        set.delete(strs[left]); //[a,b]
        left++;//1,2,3
      }
      set.add(strs[right]); //[a,b]
      max = Math.max(max, right - left + 1);
    }
    return max;
  }
}

// console.log(new LongestSubStr().execute("abcabcbb")); //3
console.log(new LongestSubStr().execute("abba")); //3
