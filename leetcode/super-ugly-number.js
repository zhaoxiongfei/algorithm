// https://leetcode-cn.com/problems/super-ugly-number/description/
// No 313. 超级丑数

/**
  编写一段程序来查找第 n 个超级丑数。

  超级丑数是指其所有质因数都是长度为 k 的质数列表 primes 中的正整数。

  示例:

  输入: n = 12, primes = [2,7,13,19]
  输出: 32
  解释: 给定长度为 4 的质数列表 primes = [2,7,13,19]，前 12 个超级丑数序列为：[1,2,4,7,8,13,14,16,19,26,28,32] 。
  说明:

  1 是任何给定 primes 的超级丑数。
   给定 primes 中的数字以升序排列。
  0 < k ≤ 100, 0 < n ≤ 106, 0 < primes[i] < 1000 。
  第 n 个超级丑数确保在 32 位有符整数范围内。
 */

/**
 * @param {number} n
 * @param {number[]} primes
 * @return {number}
 */
const nthSuperUglyNumber = (n, primes) => {
  const { length } = primes;
  const counts = Array(length).fill(0);

  const dp = [1];
  for (let i = 1; i < n; i += 1) {
    dp[i] = Math.min(...counts.map((x, j) => dp[x] * primes[j]));
    for (let j = 0; j < length; j += 1) {
      if (dp[i] === dp[counts[j]] * primes[j]) {
        counts[j] += 1;
      }
    }
  }

  console.log(dp);
  return dp[n - 1];
};

console.log(nthSuperUglyNumber(12, [2, 7, 13, 19]));
