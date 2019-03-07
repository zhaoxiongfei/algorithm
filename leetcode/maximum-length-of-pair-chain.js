// https://leetcode-cn.com/problems/maximum-length-of-pair-chain/
// No 646. 最长数对链

/**
 * @param {number[][]} pairs
 * @return {number}
 */
const findLongestChain = pairs => {
  pairs.sort((a, b) => a[1] - b[1]);

  let len = 1;
  let lv = pairs[0][1];
  for (let i = 1; i < pairs.length; i += 1) {
    if (lv < pairs[i][0]) {
      len += 1;
      lv = pairs[i][1];
    }
  }

  return len;
};

console.log(findLongestChain([[1, 2], [2, 3], [3, 4]]));
