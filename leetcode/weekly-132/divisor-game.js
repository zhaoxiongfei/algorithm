/**
 * @param {number} N
 * @return {boolean}
 */
const divisorGame = N => {
  const dp = Array(1001).fill(false);
  dp[1] = false;
  dp[2] = true;
  dp[3] = false;
  for (let i = 4; i <= 1000; i += 1) {
    for (let j = 1; j < i; j += 1) {
      if (i % j) continue;
      if (dp[i - j] === false) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[N];
};

console.log(divisorGame(5));
console.log(divisorGame(4));
console.log(divisorGame(2));
console.log(divisorGame(3));
