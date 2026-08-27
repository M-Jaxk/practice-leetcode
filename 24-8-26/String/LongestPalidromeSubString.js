class LongestPalindromeSubstring {
  execute(s) {
    let longest = "";

    for (let i = 0; i < s.length; i++) {
      const odd = this.expand(s, i, i);
      const even = this.expand(s, i, i + 1);

      if (odd.length > longest.length) {
        longest = odd;
      }

      if (even.length > longest.length) {
        longest = even;
      }
    }

    return longest;
  }

  expand(s, left, right) {
    while (
      left >= 0 &&
      right < s.length &&
      s[left] === s[right]
    ) {
      left--;
      right++;
    }

    return s.slice(left + 1, right);
  }
}

const palindrome = new LongestPalindromeSubstring();

console.log(palindrome.execute("babad"));   // "bab"
console.log(palindrome.execute("racecar")); // "racecar"
console.log(palindrome.execute("cbbd"));    // "bb"