// https://leetcode-cn.com/contest/weekly-contest-108/problems/beautiful-array/

/**
 * @param {number} N
 * @return {number[]}
 */
// 思路: 递归的思想，分左右两半，每一半都是漂亮数组, 左边内容成2 ，右边 *2 - 1
// 同时用相同的方式扩大，不会导致 N[i] + N[j] = 2 * N[k]
// 1 ~ N 的集合等于 2 * N ∪ 2 * N - 1
const beautifulArray = N => {
  if (N === 1) return [1];
  return [].concat(
    beautifulArray(Math.floor(N / 2)).map(x => x * 2),
    beautifulArray(N - Math.floor(N / 2)).map(x => x * 2 - 1)
  );
};

console.log(beautifulArray(3));
console.log(beautifulArray(5));
console.log(beautifulArray(7));
