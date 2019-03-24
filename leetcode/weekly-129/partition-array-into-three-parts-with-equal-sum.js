/**
 * @param {number[]} A
 * @return {boolean}
 */
const canThreePartsEqualSum = A => {
  const sum = A.reduce((m, x) => m + x, 0);

  if (sum % 3) return false;

  const each = sum / 3;
  let total = 0;
  let count = 0;
  for (let i = 0; i < A.length; i += 1) {
    total += A[i];
    if (total === each) {
      total = 0;
      count += 1;
    }
  }

  return count === 3 && total === 0;
};

console.log(canThreePartsEqualSum([0, 2, 1, -6, 6, -7, 9, 1, 2, 0, 1]));
console.log(canThreePartsEqualSum([0, 2, 1, -6, 6, 7, 9, -1, 2, 0, 1]));
console.log(canThreePartsEqualSum([3, 3, 6, 5, -2, 2, 5, 1, -9, 4]));
