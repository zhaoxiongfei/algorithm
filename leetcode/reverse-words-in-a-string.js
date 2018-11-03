// https://leetcode-cn.com/problems/reverse-words-in-a-string/description/
// No 151. 翻转字符串里的单词

/**
  题目描述提示帮助提交记录社区讨论阅读解答
  给定一个字符串，逐个翻转字符串中的每个单词。

  示例:

  输入: "the sky is blue",
  输出: "blue is sky the".
  说明:

  无空格字符构成一个单词。
  输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
  如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
  进阶: 请选用C语言的用户尝试使用 O(1) 空间复杂度的原地解法。
 */

/**
 * @param {string} str
 * @returns {string}
 */
// 思路：简单暴力的做法, split filter trim reverse join
const reverseWords = str =>
  str
    .split(" ")
    .map(x => x.trim())
    .filter(x => x.length)
    .reverse()
    .join(" ");

// 进阶的做法, 从右往左依次判断字符
const reverseWords2 = str => {
  const { length } = str;
  let res = ""; // 存放最终结果
  let tmp = ""; // 存放临时的单词
  for (let i = length - 1; i >= 0; i -= 1) {
    const ch = str[i];
    if (ch === " ") {
      if (tmp) {
        if (!res) {
          res = tmp;
        } else {
          res += ` ${tmp}`;
        }
        tmp = "";
      }
    } else {
      tmp = `${ch}${tmp}`;
    }
  }
  if (tmp) {
    if (!res) {
      res = tmp;
    } else {
      res += ` ${tmp}`;
    }
  }

  return res;
};

console.log(reverseWords("   a   b  c d   e  "));
console.log(reverseWords("the sky is blue"));
console.log(reverseWords2("   a   b  c d   e  "));
console.log(reverseWords2("the sky is blue"));
