const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const init = str => str.split(" ").map(x => x.trim());

const lcs = (s1, s2, i, j) => {
  if (i === -1 || j === -1) {
    return 0;
  }
  if (s1[i] === s2[j]) {
    return lcs(s1, s2, i - 1, j - 1) + 1;
  }
  return Math.max(lcs(s1, s2, i - 1, j), lcs(s1, s2, i, j - 1));
};

const calc = str => {
  const [s1, s2] = init(str);
  return lcs(s1, s2, s1.length - 1, s2.length - 1);
};

// 计算两个字符串的最长公共子序列长度
// 输入：空格隔开的两个字符串
rl.on("line", input => {
  console.log(calc(input.trim()));
});
