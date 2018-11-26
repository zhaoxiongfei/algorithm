// https://leetcode-cn.com/contest/weekly-contest-111/problems/valid-mountain-array/
//
//
/**
 * @param {number[]} A
 * @return {boolean}
 */
const validMountainArray = A => {
  const { length } = A;
  if (length < 3) return false;

  let i = 0;
  while (i < length - 1 && A[i] < A[i + 1]) i += 1;
  let j = length - 1;
  while (0 < j && A[j] < A[j - 1]) j -= 1;
  return i === j && i !== 0 && i !== length - 1;
};

console.log(validMountainArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
console.log(validMountainArray([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]));
console.log(validMountainArray([0, 3, 2, 1]));
console.log(validMountainArray([2, 1]));
console.log(validMountainArray([3, 5, 5]));
