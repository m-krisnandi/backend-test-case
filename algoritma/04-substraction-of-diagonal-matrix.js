const substractionDiagonal = (matrix) => {
  let first = 0,
    second = 0,
    result = 0;
  for (let i = 0; i < matrix.length; i++) {
    first += matrix[i][i];
    second += matrix[i][matrix.length - i - 1];
  }
  result = first - second;
  return `${first} - ${second} = ${result}`;
};

const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(substractionDiagonal(matrix)); // 15 - 12 = 3
