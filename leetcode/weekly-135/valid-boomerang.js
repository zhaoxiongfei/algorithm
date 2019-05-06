/**
 * @param {number[][]} points
 * @return {boolean}
 */
const isBoomerang = points => {
  const [A, B, C] = points;
  return (B[1] - A[1]) * (C[0] - B[0]) !== (B[0] - A[0]) * (C[1] - B[1]);
};

console.log(isBoomerang([[1, 1], [2, 3], [3, 2]]));
console.log(isBoomerang([[1, 1], [2, 2], [3, 3]]));
