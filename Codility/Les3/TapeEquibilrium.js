class TapeEquibilrium {
  //[3,1,2,4,3]
  //P1 = |3-10| = 7
  //P2 = |4-9| = 5
  //P3 = |6-7| = 1
  //P4 = |10-3| = 7
  execute(A = []) {
    const totalSum = A.reduce((sum, num) => sum + num, 0);
    let leftSum = 0;
    let minDiff = Infinity;

    for (let P = 0; P < A.length - 1; P++) {
      leftSum += A[P];
      let rightSum = totalSum - leftSum;

      let diff = Math.abs(leftSum - rightSum);

      if (diff < minDiff) {
        minDiff = diff;
      }
    }

    return minDiff;
  }
}

console.log(new TapeEquibilrium().execute([3, 1, 2, 4, 3]));
// console.log(new MissingNo().execute());
