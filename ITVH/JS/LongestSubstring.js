class LongestSubstring {
    // "abcabcbb" → 3 ("abc")
    execute(s) {
        const set = new Set();
        let left = 0;
        let max = 0;

        for (let right = 0; right < s.length; right++) {//0,1,2,3,4,5,6,7
            while (set.has(s[right])) {//
                set.delete(s[left]);//[]
                left++;//1,2,3,4,5,6,7
            }
           
            set.add(s[right]);//set[a,b,b]
            max = Math.max(max, right - left + 1);//1,2,3,3,3,3,3
        }
        return max;
    }
}
console.log(new LongestSubstring().execute("abcbabcbb"));
// console.log(new LongestSubstring().execute("abba"));
