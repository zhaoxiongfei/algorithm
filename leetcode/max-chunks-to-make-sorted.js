// https://leetcode-cn.com/problems/max-chunks-to-make-sorted/
// No 769. 最多能完成排序的块

/**
 * @param {number[]} arr
 * @return {number}
 */
const maxChunksToSorted = arr => {
  const { length } = arr;
  // const maxIndex = length - 1;

  let count = 0;
  let i = 0;
  let max = 0;
  while (i < length) {
    max = Math.max(max, arr[i]);
    if (max === i) {
      max = 0;
      count += 1;
    }
    i += 1;
  }

  return count;
};

console.log(maxChunksToSorted([4, 3, 2, 1, 0]));
console.log(maxChunksToSorted([1, 0, 2, 3, 4]));
