// https://leetcode-cn.com/problems/reverse-vowels-of-a-string/description/
// No 345. 反转字符串中的元音字母

/**
  编写一个函数，以字符串作为输入，反转该字符串中的元音字母。

  示例 1:

  输入: "hello"
  输出: "holle"
  示例 2:

  输入: "leetcode"
  输出: "leotcede"
  说明:
  元音字母不包含字母"y"。
 */

/**
 * @param {string} s
 * @return {string}
 */
const vowels = new Set(["a", "o", "e", "i", "u", "A", "O", "E", "I", "U"]);
const reverseVowels = s => {
  const { length } = s;
  if (length === 0) return s;

  const str = Array(length).fill("");
  let i = 0;
  let j = length - 1;
  while (i <= j) {
    if (vowels.has(s[i])) {
      while (!vowels.has(s[j])) {
        str[j] = s[j];
        j -= 1;
      }
      str[i] = s[j];
      str[j] = s[i];
      j -= 1;
    } else {
      str[i] = s[i];
    }
    i += 1;
  }

  return str.join("");
};

console.log(reverseVowels("hello"));
