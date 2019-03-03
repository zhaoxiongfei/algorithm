/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
const longestOnes = (A, K) => {
  const { length } = A;
  const dp = Array(length + 1).fill(0); // 截止到i的最长1
  const map = []; // 用掉条件的索引
  for (let i = 0; i < length; i += 1) {
    if (A[i] === 0) {
      if (map.length < K) {
        dp[i + 1] = dp[i] + 1;
      } else if (0 < map.length) {
        const used = map.shift();
        dp[i + 1] = i - used;
      }
      if (K) map.push(i);
    } else {
      dp[i + 1] = dp[i] + 1;
    }
  }

  return Math.max(...dp);
};

console.log(longestOnes([0, 0, 1, 1, 1, 0, 0], 0));
console.log(longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2));
console.log(
  longestOnes([0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3)
);
