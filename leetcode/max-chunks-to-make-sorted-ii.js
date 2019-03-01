// https://leetcode-cn.com/problems/max-chunks-to-make-sorted-ii/
// No 768. 最多能完成排序的块 II

/**
 * @param {number[]} arr
 * @return {number}
 */
const maxChunksToSorted = arr => {
  const res = arr.slice();
  arr.sort((a, b) => a - b);
  let sum1 = 0;
  let sum2 = 0;
  let count = 0;
  for (let i = 0; i < arr.length; i += 1) {
    sum1 += res[i];
    sum2 += arr[i];
    if (sum1 === sum2) count += 1;
  }
  return count;
};

console.log(
  maxChunksToSorted([
    0,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    1,
    0,
    0,
    1,
    0,
    0,
    0,
    1,
    1
  ])
);
// console.log(maxChunksToSorted([5, 4, 3, 2, 1]));
// console.log(maxChunksToSorted([2, 1, 3, 4, 4]));
