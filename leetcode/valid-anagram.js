// https://leetcode-cn.com/problems/valid-anagram/description/
// No 242. 有效的字母异位词

/**
  给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的一个字母异位词。

  示例 1:

  输入: s = "anagram", t = "nagaram"
  输出: true
  示例 2:

  输入: s = "rat", t = "car"
  输出: false
  说明:
  你可以假设字符串只包含小写字母。

  进阶:
  如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram = (s, t) => {
  const m = s.length;
  const n = t.length;
  if (m !== n) return false;
  const list = Array(26).fill(0);
  for (let i = 0; i < m; i += 1) {
    list[s[i].charCodeAt() - 97] += 1;
    list[t[i].charCodeAt() - 97] -= 1;
  }

  return list.every(x => x === 0);
};
console.log(isAnagram("dgqztusjuu", "dqugjzutsu"));
console.log(isAnagram("anagram", "nagaram"));
console.log(isAnagram("adbc", "dbac"));
console.log(isAnagram("abdc", "dbac"));
