// https://leetcode-cn.com/problems/remove-duplicate-letters/description/
// No 316. 去除重复字母

/**
  给定一个仅包含小写字母的字符串，去除字符串中重复的字母，使得每个字母只出现一次。
  需保证返回结果的字典序最小（要求不能打乱其他字符的相对位置）。

  示例 1:

  输入: "bcabc"
  输出: "abc"
  示例 2:

  输入: "cbacdcbc"
  输出: "acdb"
 */

/**
 * @param {string} s
 * @return {string}
 */
// 思路: 根据题意，该串最终长度不超过26. 试着记录下每一个字母出现的位置，
// 选择性的删除那些个数超过一的字母, 删除的过程中保证保留下的是顺序最小的
const removeDuplicateLetters1 = s => {
  const { length } = s;
  if (length === 0) return "";
  const counts = Array(26).fill(0);

  for (let i = 0; i < length; i += 1) counts[s[i].charCodeAt() - 97] += 1;

  let i = 0;
  let pos = 0;
  for (; i < length; i += 1) {
    if (s[i] < s[pos]) pos = i;
    const index = s[i].charCodeAt() - 97;
    counts[index] -= 1;
    if (counts[index] === 0) break;
  }
  const remain = s.slice(pos + 1).replace(new RegExp(s[pos], "g"), "");
  return s[pos] + removeDuplicateLetters1(remain);
};

const removeDuplicateLetters = s => {
  const { length } = s;
  const ans = ["0"];

  const visited = Array(26).fill(false);
  const counts = Array(26).fill(0);
  for (let i = 0; i < length; i += 1) counts[s[i].charCodeAt() - 97] += 1;

  for (const ch of s) {
    const index = ch.charCodeAt() - 97;
    counts[index] -= 1;
    if (visited[index]) continue;
    let lastIndex = ans[ans.length - 1].charCodeAt() - 97;
    while (lastIndex > index && counts[lastIndex]) {
      ans.pop();
      visited[lastIndex] = false;
      lastIndex = ans[ans.length - 1].charCodeAt() - 97;
    }
    ans.push(ch);
    visited[index] = true;
  }
  return ans.slice(1).join("");
};

console.log(removeDuplicateLetters1("dbede"));
console.log(removeDuplicateLetters("cbacdcbc"));
// console.log(removeDuplicateLetters("bcabc"));
