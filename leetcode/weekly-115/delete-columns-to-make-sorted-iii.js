// https://leetcode-cn.com/contest/weekly-contest-115/problems/delete-columns-to-make-sorted-iii/

/**
 * @param {string[]} A
 * @return {number}
 */
// 思路: 动态规划 dp[i] 代表前 i + 1 个字符中最大能保留多少个有序字符
const minDeletionSize = A => {
  const m = A.length;
  const n = A[0].length;
  const dp = Array(n).fill(0);

  let keep = 0;

  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < i; j += 1) {
      let k = 0;
      while (k < m && A[k][j] <= A[k][i]) k += 1;
      if (k === m) dp[i] = Math.max(dp[i], dp[j]);
    }
    keep = Math.max(keep, (dp[i] += 1));
  }

  return n - keep;
};

console.log(minDeletionSize(["edcba"]));
console.log(minDeletionSize(["babca", "bbazb"]));
console.log(minDeletionSize(["ghi", "def", "abc"]));
