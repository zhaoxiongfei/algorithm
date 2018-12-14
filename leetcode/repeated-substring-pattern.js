// https://leetcode-cn.com/problems/repeated-substring-pattern/
// No 459. 重复的子字符串

/**
  给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。
  给定的字符串只含有小写英文字母，并且长度不超过10000。

  示例 1:

  输入: "abab"

  输出: True

  解释: 可由子字符串 "ab" 重复两次构成。
  示例 2:

  输入: "aba"

  输出: False
  示例 3:

  输入: "abcabcabcabc"

  输出: True

  解释: 可由子字符串 "abc" 重复四次构成。 (或者子字符串 "abcabc" 重复两次构成。)
 */

/**
 * @param {string} s
 * @return {boolean}
 */
const repeatedSubstringPattern = s => {
  const { length } = s;

  let i = 1;
  while (i < (length >> 1) + 1) {
    if (length % i === 0 && s.slice(0, i).repeat(length / i) === s) return true;
    i += 1;
  }

  return false;
};

const repeatedSubstringPattern1 = s =>
  (s.slice(1) + s.slice(0, -1)).indexOf(s) !== -1;

console.log(repeatedSubstringPattern1("abcabcabc"));
console.log(repeatedSubstringPattern("abcabcabc"));
