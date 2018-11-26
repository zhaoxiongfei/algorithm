// https://leetcode-cn.com/contest/weekly-contest-111/problems/di-string-match/

/**
 * @param {string} S
 * @return {number[]}
 */
const diStringMatch = S => {
  const { length } = S;
  const dp = [[0, 0]]; // 逐个记录I，D的个数
  for (let i = 0; i < length; i += 1) {
    if (S[i] === "I") {
      dp[i + 1] = [dp[i][0] + 1, dp[i][1]];
    } else {
      dp[i + 1] = [dp[i][0], dp[i][1] + 1];
    }
  }

  const set = new Set();
  for (let i = 0; i <= length; i += 1) set.add(i);
  console.log(dp);
  const solution = Array(length + 1).fill(0);
  for (let i = length; i >= 0; i -= 1) {
    const dNum = length - dp[i][1];
    const iNum = dp[i][0];
    if (set.has(dNum)) {
      solution[i] = dNum;
    } else {
      solution[i] = iNum;
    }
    set.delete(solution[i]);
  }
  return solution;
};

console.log(diStringMatch("III"));
console.log(diStringMatch("DDI"));
console.log(diStringMatch("IDID"));
