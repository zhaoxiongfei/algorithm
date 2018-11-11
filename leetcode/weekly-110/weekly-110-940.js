/**
 * @param {string} S
 * @return {number}
 */
const distinctSubseqII = S => {
  const { length } = S;
  const mod = 1e9 + 7;
  const dp = [1];
  const map = {};
  for (let i = 1; i <= length; i += 1) {
    dp[i] = (dp[i - 1] << 1) % mod;
    if (map[S[i - 1]] !== undefined) {
      dp[i] -= dp[map[S[i - 1]]];
      dp[i] += 2 * mod;
      dp[i] %= mod;
    }
    map[S[i - 1]] = i - 1;
  }

  return dp[length] - 1;
};

console.log(distinctSubseqII("aba"));
console.log(distinctSubseqII("abab"));
// console.log(distinctSubseqII("aab"));
// console.log(distinctSubseqII("abc"));
