// https://leetcode-cn.com/contest/weekly-contest-109/problems/knight-dialer/

/**
 * @param {number} N
 * @return {number}
 */
// 思路: 动态规划，走 N 步等于 走 N - 1 不的前序点之和
// 一次递推到 1 ~ N
const knightDialer = N => {
  const P = 1000000007;
  let dp = Array(10).fill(1);
  const dp2 = [];
  for (let i = 1; i < N; i += 1) {
    dp2[0] = (dp[4] + dp[6]) % P;
    dp2[1] = (dp[6] + dp[8]) % P;
    dp2[2] = (dp[7] + dp[9]) % P;
    dp2[3] = (dp[4] + dp[8]) % P;
    dp2[4] = (dp[0] + dp[3] + dp[9]) % P;
    dp2[5] = 0;
    dp2[6] = (dp[0] + dp[1] + dp[7]) % P;
    dp2[7] = (dp[2] + dp[6]) % P;
    dp2[8] = (dp[1] + dp[3]) % P;
    dp2[9] = (dp[2] + dp[4]) % P;

    dp = dp2.slice();
  }

  let num = 0;
  for (let i = 0; i < 10; i += 1) {
    num += dp[i];
    num %= P;
  }
  return num;
};

// console.log(knightDialer(2));
console.log(knightDialer(3));
// console.log(knightDialer(10));
