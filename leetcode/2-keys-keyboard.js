// https://leetcode-cn.com/problems/2-keys-keyboard/
// No 650. 只有两个键的键盘

const dp = Array(1001).fill(Infinity);
dp[0] = 0;
dp[1] = 0;
for (let i = 2; i < 1001; i += 1) {
  for (let j = 1; j < i; j += 1) {
    if (i % j) continue;
    dp[i] = Math.min(dp[i], dp[j] + i / j);
  }
}
/**
 * @param {number} n
 * @return {number}
 */
const minSteps = n => dp[n];

console.log(minSteps(3));
console.log(minSteps(4));
console.log(minSteps(8));
console.log(minSteps(1000));
