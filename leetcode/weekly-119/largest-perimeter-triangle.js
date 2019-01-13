/**
 * @param {number[]} A
 * @return {number}
 */
const largestPerimeter = A => {
  A.sort((a, b) => b - a);

  let ans = 0;
  for (let i = 0; i < A.length; i += 1) {
    if (A[i] < A[i + 1] + A[i + 2]) {
      ans = A[i] + A[i + 1] + A[i + 2];
      break;
    }
  }

  return ans;
};

console.log(largestPerimeter([3, 2, 3, 4]));
console.log(largestPerimeter([2, 1, 2]));
console.log(largestPerimeter([3, 6, 2, 3]));
