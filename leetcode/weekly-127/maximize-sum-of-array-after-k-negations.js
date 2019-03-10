/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
const largestSumAfterKNegations = (A, K) => {
  A.sort((a, b) => a - b);
  let a = 0;
  for (const n of A) {
    if (n <= 0) a += 1;
  }
  if (a <= K) {
    A = A.map(x => Math.abs(x));
    if ((K - a) % 2) {
      A.sort((x, y) => x - y);
      A[0] = 0 - A[0];
    }
    return A.reduce((m, x) => m + x, 0);
  }
  for (let i = 0; i < K; i += 1) {
    A[i] = 0 - A[i];
  }
  return A.reduce((m, x) => m + x, 0);
};

console.log(largestSumAfterKNegations([4, 2, 3], 1));
console.log(largestSumAfterKNegations([3, -1, 0, 2], 3));
console.log(largestSumAfterKNegations([2, -3, -1, 5, -4], 2));
