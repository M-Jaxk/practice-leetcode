class SetZero {
    execute(matrix) {
        const m = matrix.length;
        console.log(matrix[0].length)
        const n = matrix[0].length;

        let firstRowZero = false;
        let firstColZero = false;

        // Check first row
        for (let j = 0; j < n; j++) {
            if (matrix[0][j] === 0) {
                firstRowZero = true;
                break;
            }
        }

        // Check first column
        for (let i = 0; i < m; i++) {
            if (matrix[i][0] === 0) {
                firstColZero = true;
                break;
            }
        }

        // Use first row and first column as markers
        for (let i = 1; i < m; i++) {
            for (let j = 1; j < n; j++) {
                if (matrix[i][j] === 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }

        // Set cells to zero based on markers
        for (let i = 1; i < m; i++) {
            for (let j = 1; j < n; j++) {
                if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                    matrix[i][j] = 0;
                }
            }
        }

        // Set first row to zero
        if (firstRowZero) {
            for (let j = 0; j < n; j++) {
                matrix[0][j] = 0;
            }
        }

        // Set first column to zero
        if (firstColZero) {
            for (let i = 0; i < m; i++) {
                matrix[i][0] = 0;
            }
        }

        return matrix;
    }
}

const setZero = new SetZero();

console.log(
    setZero.execute([
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
    ])
);

// [
//   [1, 0, 1],
//   [0, 0, 0],
//   [1, 0, 1]
// ]

// console.log(
//     setZero.execute([
//         [0, 1, 2, 0],
//         [3, 4, 5, 2],
//         [1, 3, 1, 5]
//     ])
// );

// [
//   [0, 0, 0, 0],
//   [0, 4, 5, 0],
//   [0, 3, 1, 0]
// ]