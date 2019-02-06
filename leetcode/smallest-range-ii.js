// https://leetcode-cn.com/problems/smallest-range-ii/
// No 910. 最小差值 II

/**
  给定一个整数数组 A，对于每个整数 A[i]，
  我们可以选择 x = -K 或是 x = K，并将 x 加到 A[i] 中。

  在此过程之后，我们得到一些数组 B。

  返回 B 的最大值和 B 的最小值之间可能存在的最小差值。

  示例 1：

  输入：A = [1], K = 0
  输出：0
  解释：B = [1]
  示例 2：

  输入：A = [0,10], K = 2
  输出：6
  解释：B = [2,8]
  示例 3：

  输入：A = [1,3,6], K = 3
  输出：3
  解释：B = [4,6,3]

  提示：

  1 <= A.length <= 10000
  0 <= A[i] <= 10000
  0 <= K <= 10000
 */

/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
const smallestRangeII = (A, K) => {
  const { length } = A;
  if (length < 2) return 0;

  A.sort((a, b) => a - b);
  const M = A[length - 1];
  const m = A[0];
  let ans = M - m;

  if (ans === 0) return 0;
  if (K === 0 && ans < K) return ans;

  for (let i = 0; i < length - 1; i += 1) {
    const max = Math.max(A[i] + K, M - K);
    const min = Math.min(A[i + 1] - K, m + K);
    ans = Math.min(max - min, ans);
  }

  return ans;
};

console.log(smallestRangeII([7, 8, 8], 5));
console.log(smallestRangeII([1], 0));
console.log(smallestRangeII([0, 10], 2));