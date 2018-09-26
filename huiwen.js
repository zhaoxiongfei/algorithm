const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const reverse = string => [].__proto__.reverse.call(string.split("")).join("");

const lcs = (str1, str2) => {
  const len = Math.max(str1.length, str2.length);
};

/**
 * 计算字符串中最长回文串
 * 思路: 翻转字符串和源字符串计算最长公共子串
 */
const calc = string => {
  const len = string.length;
  const string2 = reverse(string);
  return lcs(string, string2);
};

rl.on("line", input => {
  console.log(calc(input.trim()));
});
