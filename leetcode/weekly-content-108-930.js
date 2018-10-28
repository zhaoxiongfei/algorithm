// https://leetcode-cn.com/contest/weekly-contest-108/problems/binary-subarrays-with-sum/

/**
 * @param {number[]} A
 * @param {number} S
 * @return {number}
 */
// 思路：双指针，分别指向子数组的  start, end 索引, start 慢指针，end 快指针
const numSubarraysWithSum = (A, S) => {
  const { length } = A;
  if (length === 0) return 0;
  if (length === 1) return A[0] === S ? 1 : 0;
  let count = 0;

  for (let start = 0; start < length; start += 1) {
    let total = 0;
    for (let end = start; end < length; end += 1) {
      total += A[end];
      if (total === S) {
        count += 1;
      } else if (total > S) {
        total = 0;
        break;
      }
    }
  }

  return count;
};

console.log(numSubarraysWithSum([0, 0, 0, 0, 0], 0));
console.log(numSubarraysWithSum([1, 0, 1, 0, 1], 2));
