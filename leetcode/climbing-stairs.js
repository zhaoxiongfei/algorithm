// https://leetcode-cn.com/problems/climbing-stairs/description/

/**
 * @param {number} n
 * @return {number}
 */
//
// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
// 注意：给定 n 是一个正整数。
//
// 思路: 动态规划 dp[i] 代表到第 i 个台阶可能的走法
// 递推公式 dp[i] = dp[i - 1] + dp[i - 2];
const climbStairs = n => {
  const dp = Array(n + 2).fill(0);
  dp[1] = 1;
  for (let i = 2; i < n + 2; i += 1) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n + 1];
};

const climbStairs2 = n => {
  const dp = [1, 2];
  for (let i = 2; i < n; i += 1) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n - 1];
};

console.log(climbStairs(2));
console.log(climbStairs(3));
console.log(climbStairs(35));
console.log(climbStairs(36));
console.log(climbStairs2(36));
