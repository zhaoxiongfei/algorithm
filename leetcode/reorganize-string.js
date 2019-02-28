// https://leetcode-cn.com/problems/reorganize-string/
// No 767. 重构字符串

/**
 * @param {string} S
 * @return {string}
 */
const reorganizeString = S => {
  const { length } = S;
  const map = Array(26).fill(0);
  for (const ch of S) map[ch.charCodeAt() - 97] += 1;
  const max = Math.max(...map);
  if (Math.ceil(length / 2) < max) return "";
  let ans = "";
  let c = 0;
  let lastIndex = null;
  while (c < length) {
    let maxIndex = null;
    for (let i = 0; i < 26; i += 1) {
      if (lastIndex === i) continue;
      if (maxIndex === null || map[maxIndex] < map[i]) maxIndex = i;
    }
    c += 1;
    lastIndex = maxIndex;
    map[maxIndex] -= 1;
    ans += String.fromCharCode(97 + maxIndex);
  }

  return ans;
};

console.log(reorganizeString("aab"));
console.log(reorganizeString("aaab"));
