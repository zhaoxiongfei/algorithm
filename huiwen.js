const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const reverse = string => [].__proto__.reverse.call(string.split("")).join("");

const lcs = (str1, str2) => {
  let max = 0;
  const list = [];
  let i = 0;
  let j = 0;
  while (i < str1.length && j < str2.length) {
    if (str1[i] === str2[j]) {
      i += 1;
      j += 1;
    } else {
    }
  }
  return [str1, str2];
};

/**
 * 计算字符串中最长回文串
 * 思路: manacher
 */
const calc = string => {
  const len = string.length;
  const string2 = reverse(string);
  return lcs(string, string2);
};

rl.on("line", input => {
  console.log(calc(input.trim()));
});
