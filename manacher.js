const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const init = str => `$#${str.split("").join("#")}#`;

const manacher = str => {
  const newStr = init(str);
  const len = newStr.length;
  const p = [];
  p.length = len;
  p.fill(0);
  let maxLen = -1;
  let id = 0;
  let mx = 0;
  let maxPosition = 0;
  for (let i = 1; i < len; i += 1) {
    p[i] = i < mx ? Math.min(p[2 * id - i], mx - i) : 1;
    while (newStr[i - p[i]] === newStr[i + p[i]]) p[i] += 1;
    if (mx < i + p[i]) {
      id = i;
      mx = i + p[i];
    }
    if (p[i] - 1 > maxLen) {
      maxLen = p[i] - 1;
      maxPosition = i;
    }
    // maxLen = Math.max(maxLen, p[i] - 1);
  }
  return newStr.substr(maxPosition - maxLen + 1, maxLen * 2 - 1);
  return maxLen;
};

/**
 * 计算字符串中最长回文串
 * 思路: 翻转字符串和源字符串计算最长公共子串
 */
rl.on("line", input => {
  console.log(manacher(input.trim()));
});
