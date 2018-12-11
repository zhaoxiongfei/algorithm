// https://leetcode-cn.com/problems/ones-and-zeroes/
// No 474. 一和零

/**
  在计算机界中，我们总是追求用有限的资源获取最大的收益。

  现在，假设你分别支配着 m 个 0 和 n 个 1。另外，还有一个仅包含 0 和 1 字符串的数组。

  你的任务是使用给定的 m 个 0 和 n 个 1 ，找到能拼出存在于数组中的字符串的最大数量。每个 0 和 1 至多被使用一次。

  注意:

  给定 0 和 1 的数量都不会超过 100。
  给定字符串数组的长度不会超过 600。
  示例 1:

  输入: Array = {"10", "0001", "111001", "1", "0"}, m = 5, n = 3
  输出: 4

  解释: 总共 4 个字符串可以通过 5 个 0 和 3 个 1 拼出，即 "10","0001","1","0" 。
  示例 2:

  输入: Array = {"10", "0", "1"}, m = 1, n = 1
  输出: 2

  解释: 你可以拼出 "10"，但之后就没有剩余数字了。更好的选择是拼出 "0" 和 "1" 。
 */

/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
// 思路: 直观感觉特别像是一个0/1背包问题, 二维背包问题，所以dp是三维的了，复杂度较高
const findMaxForm = (strs, m, n) => {
  const { length } = strs;

  const stats = strs.map(x => {
    const count = [0, 0];
    for (const ch of x) count[ch] += 1;
    return count;
  });

  const dp = Array(length + 1);
  for (let i = 0; i <= length; i += 1) {
    dp[i] = Array(m + 1);
    for (let j = 0; j <= m; j += 1) dp[i][j] = Array(n + 1).fill(0);
  }

  for (let i = 1; i <= length; i += 1) {
    const count = stats[i - 1];
    for (let j = 0; j <= m; j += 1) {
      // 0 的个数
      for (let k = 0; k <= n; k += 1) {
        // 1 的个数
        if (j < count[0] || k < count[1]) {
          dp[i][j][k] = dp[i - 1][j][k];
        } else {
          dp[i][j][k] = Math.max(
            dp[i - 1][j][k],
            dp[i - 1][j - count[0]][k - count[1]] + 1
          );
        }
      }
    }
  }

  return dp[length][m][n];
};

// 思路二: 依然是背包解决方案，只是忽略掉商品索引的那一维，空间复杂度降低为 O(mn)
const findMaxForm2 = (strs, m, n) => {
  const { length } = strs;

  const stats = strs.map(x => {
    const count = [0, 0];
    for (const ch of x) count[ch] += 1;
    return count;
  });

  const dp = Array(m + 1);
  for (let i = 0; i <= m; i += 1) dp[i] = Array(n + 1).fill(0);

  for (let i = 1; i <= length; i += 1) {
    const count = stats[i - 1];
    for (let j = m; j >= count[0]; j -= 1) {
      // 0 的个数
      for (let k = n; k >= count[1]; k -= 1) {
        dp[j][k] = Math.max(dp[j][k], dp[j - count[0]][k - count[1]] + 1);
      }
    }
  }

  return dp[m][n];
};

console.log(findMaxForm(["10", "0001", "111001", "1", "0"], 5, 3));
console.log(findMaxForm2(["10", "0001", "111001", "1", "0"], 5, 3));
