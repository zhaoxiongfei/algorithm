// https://leetcode-cn.com/problems/shifting-letters/
// No 848. 字母移位

/**
 * @param {string} S
 * @param {number[]} shifts
 * @return {string}
 */
const shiftingLetters = (S, shifts) => {
  const { length } = S;
  const dp = Array(length).fill(0);

  let sum = 0;
  for (let i = length - 1; 0 <= i; i -= 1) {
    sum += shifts[i];
    dp[i] = sum;
  }

  let ans = "";
  for (let i = 0; i < length; i += 1) {
    ans += String.fromCharCode(97 + ((S[i].charCodeAt() - 97 + dp[i]) % 26));
  }

  return ans;
};

console.log(shiftingLetters("abc", [3, 5, 9]));
