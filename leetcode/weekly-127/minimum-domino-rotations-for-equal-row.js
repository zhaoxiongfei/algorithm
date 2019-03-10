const helper = (A, B) => {
  const stats1 = Array(7).fill(0);
  for (const ch of A) stats1[ch] += 1;

  let min = Infinity;
  for (let i = 1; i < 7; i += 1) {
    let count = 0;
    let flag = true;
    for (let j = 0; j < A.length; j += 1) {
      if (A[j] !== i) {
        if (B[j] !== i) {
          flag = false;
          break;
        } else {
          count += 1;
        }
      }
    }
    if (flag) min = Math.min(min, count);
  }

  if (min === Infinity) return -1;
  return min;
};
/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
const minDominoRotations = (A, B) => {
  const a = helper(A, B);
  const b = helper(B, A);
  if (a === -1) return b;
  if (b === -1) return a;
  return Math.min(a, b);
};

console.log(minDominoRotations([2, 1, 2, 4, 2, 2], [5, 2, 6, 2, 3, 2]));
console.log(minDominoRotations([3, 5, 1, 2, 3], [3, 6, 3, 3, 4]));
