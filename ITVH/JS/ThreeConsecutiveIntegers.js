class ThreeConsecutiveIntegers {
  execute(num) {
    for (let i = 0; i <= num; i++) {
      if (i + (i + 1) + (i + 2) === num) {
        return [i, i + 1, i + 2];
      }
    }

    return [];

    // if (num % 3 !== 0) {
    //   return [];
    // }

    // const middle = num / 3;

    // return [middle - 1, middle, middle + 1];
  }
}

//time-complexity  =>  O(n)
//space-complexity => O(1)

const solution = new ThreeConsecutiveIntegers();

console.log(solution.execute(33)); // [10, 11, 12]
console.log(solution.execute(4)); // []
