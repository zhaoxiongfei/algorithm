// https://leetcode-cn.com/contest/weekly-contest-138/problems/grumpy-bookstore-owner/

/**
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} X
 * @return {number}
 */
const maxSatisfied = (customers, grumpy, X) => {
  const { length } = customers;
  const sum = customers.reduce((m, x, i) => (grumpy[i] ? m : m + x), 0);
  const dp = Array(length - X + 1).fill(0);
  for (let i = 0; i < X; i += 1) {
    if (grumpy[i] === 1) dp[0] += customers[i];
  }

  for (let i = 1; i < length - X + 1; i += 1) {
    dp[i] = dp[i - 1];
    if (grumpy[X + i - 1] === 1) dp[i] += customers[X + i - 1];
    if (grumpy[i - 1] === 1) dp[i] -= customers[i - 1];
  }

  console.log(sum);
  console.log(dp);
  return sum + Math.max(...dp);
};

console.log(
  maxSatisfied([1, 0, 1, 2, 1, 1, 7, 5], [0, 1, 0, 1, 0, 1, 0, 1], 3)
);
