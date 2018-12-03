// https://leetcode-cn.com/problems/find-the-difference/description/
// No 389. 找不同

/**
  给定两个字符串 s 和 t，它们只包含小写字母。

  字符串 t 由字符串 s 随机重排，然后在随机位置添加一个字母。

  请找出在 t 中被添加的字母。

  示例:

  输入：
  s = "abcd"
  t = "abcde"

  输出：
  e

  解释：
  'e' 是那个被添加的字母。
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
const findTheDifference1 = (s, t) => {
  const map = Array(26).fill(0);
  for (let i = 0; i < s.length; i += 1) {
    map[t[i].charCodeAt() - 97] += 1;
    map[s[i].charCodeAt() - 97] -= 1;
  }
  map[t[t.length - 1].charCodeAt() - 97] += 1;

  const remain = map.findIndex(x => x);
  return String.fromCharCode(remain + 97);
};

const findTheDifference = (s, t) => {
  let code = 0;
  for (const ch of s + t) {
    code ^= ch.charCodeAt();
  }
  return String.fromCharCode(code);
};

console.log(findTheDifference1("abcd", "abcde"));
console.log(findTheDifference("abcd", "abcde"));
