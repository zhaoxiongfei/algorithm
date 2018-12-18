// https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/
// No 438. 找到字符串中所有字母异位词

/**
  给定一个字符串 s 和一个非空字符串 p，找到 s 中所有是 p 的字母异位词的子串，返回这些子串的起始索引。

  字符串只包含小写英文字母，并且字符串 s 和 p 的长度都不超过 20100。

  说明：

  字母异位词指字母相同，但排列不同的字符串。
  不考虑答案输出的顺序。
  示例 1:

  输入:
  s: "cbaebabacd" p: "abc"

  输出:
  [0, 6]

  解释:
  起始索引等于 0 的子串是 "cba", 它是 "abc" 的字母异位词。
  起始索引等于 6 的子串是 "bac", 它是 "abc" 的字母异位词。
   示例 2:

  输入:
  s: "abab" p: "ab"

  输出:
  [0, 1, 2]

  解释:
  起始索引等于 0 的子串是 "ab", 它是 "ab" 的字母异位词。
  起始索引等于 1 的子串是 "ba", 它是 "ab" 的字母异位词。
  起始索引等于 2 的子串是 "ab", 它是 "ab" 的字母异位词。
 */

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
// 思路：利用统计字典来判断
const findAnagrams = (s, p) => {
  const { length: m } = s;
  const { length: n } = p;

  const ans = [];

  const diff = new Map();
  for (const ch of p) diff.set(ch, (diff.get(ch) | 0) - 1);

  for (let i = 0; i < m; i += 1) {
    const added = s[i];

    if (diff.get(added) === -1) {
      diff.delete(added);
    } else {
      diff.set(added, (diff.get(added) | 0) + 1);
    }

    if (i >= n) {
      const removed = s[i - n];
      if (diff.get(removed) === 1) {
        diff.delete(removed);
      } else {
        diff.set(removed, (diff.get(removed) | 0) - 1);
      }
    }

    if (diff.size === 0) ans.push(i - n + 1);
  }

  return ans;
};

console.log(findAnagrams("abab", "ab"));
