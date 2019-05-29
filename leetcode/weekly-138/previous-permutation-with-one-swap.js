// https://leetcode-cn.com/contest/weekly-contest-138/problems/previous-permutation-with-one-swap/

/**
 * @param {number[]} A
 * @return {number[]}
 */
const prevPermOpt1 = A => {
  const { length } = A;

  let i = length - 1;
  while (0 < i) {
    if (A[i] < A[i - 1]) {
      let j = i + 1;
      let max = i;
      while (j < length) {
        if (A[max] < A[j] && A[j] < A[i - 1]) max = j;
        j += 1;
      }
      const t = A[i - 1];
      A[i - 1] = A[max];
      A[max] = t;
      break;
    }
    i -= 1;
  }

  return A;
};

console.log(prevPermOpt1([3, 2, 1]));
console.log(prevPermOpt1([1, 1, 5]));
console.log(prevPermOpt1([1, 9, 4, 6, 7]));
console.log(prevPermOpt1([3, 1, 1, 3]));
