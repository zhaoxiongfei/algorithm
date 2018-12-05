// https://leetcode-cn.com/problems/longest-substring-with-at-least-k-repeating-characters/description/
// No 395. 至少有K个重复字符的最长子串

/**
  找到给定字符串（由小写字符组成）中的最长子串 T ，
  要求 T 中的每一字符出现次数都不少于 k 。输出 T 的长度。

  示例 1:

  输入:
  s = "aaabb", k = 3

  输出:
  3

  最长子串为 "aaa" ，其中 'a' 重复了 3 次。
  示例 2:

  输入:
  s = "ababbc", k = 2

  输出:
  5

  最长子串为 "ababb" ，其中 'a' 重复了 2 次， 'b' 重复了 3 次。
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const longestSubstring = (s, k) => {
  const { length } = s;
  if (k === 1) return length;
  if (k > length) return 0;

  const map = Array(26).fill(0);
  for (let i = 0; i < 26; i += 1) map[i] = [];
  for (let i = 0; i < length; i += 1) map[s[i].charCodeAt() - 97].push(i);

  let lackIndex = [-1];
  for (let i = 0; i < 26; i += 1) {
    if (map[i].length < k && 0 < map[i].length) {
      lackIndex = lackIndex.concat(map[i]);
    }
  }

  lackIndex.push(length);
  if (lackIndex.length === 2) return length;

  let max = 0;
  for (let i = 1; i < lackIndex.length; i += 1) {
    const lo = lackIndex[i - 1];
    const hi = lackIndex[i];
    const maxAvaliable = hi - lo - 1;
    if (maxAvaliable < k || maxAvaliable <= max) continue;
    const longest = longestSubstring(s.slice(lo + 1, hi), k);
    if (longest > max) max = longest;
  }

  return max;
};

console.log(longestSubstring("bbaaacbd", 3));
console.log(longestSubstring("caaaacac", 4));
console.log(longestSubstring("aaabb", 3));
console.log(longestSubstring("aacbbbdc", 2));
console.log(longestSubstring("weitong", 2));
console.log(longestSubstring("aaabb", 3));
console.log(longestSubstring("ababbc", 2));
console.log(longestSubstring("", 1));
