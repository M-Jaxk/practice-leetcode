class SearchChallenge {
  execute(str) {
    // Extract all digits from the string using a regular expression
    const numberMatches = str.match(/\d/g);
    let sumOfNumbers = 0;
    if (numberMatches) {
      sumOfNumbers = numberMatches.reduce(
        (acc, curr) => acc + parseInt(curr, 10),
        0,
      );
    }

    // Extract all letters from the string using a regular expression
    const letterMatches = str.match(/[a-zA-Z]/g);
    let countOfLetters = 0;
    if (letterMatches) {
      countOfLetters = letterMatches.length;
    }

    // Prevent division by zero just in case
    if (countOfLetters === 0) return 0;

    // Divide the sum of numbers by the count of letters and round to the nearest whole number
    const result = sumOfNumbers / countOfLetters;
    return Math.round(result);
  }
}

// keep this function call here
console.log(new SearchChallenge().execute("fa1234ofafa"));
