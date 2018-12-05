// https://leetcode-cn.com/problems/is-subsequence/description/
// No 392. 判断子序列

/**
  给定字符串 s 和 t ，判断 s 是否为 t 的子序列。

  你可以认为 s 和 t 中仅包含英文小写字母。字符串 t 可能会很长（长度 ~= 500,000），而 s 是个短字符串（长度 <=100）。

  字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。

  示例 1:
  s = "abc", t = "ahbgdc"

  返回 true.

  示例 2:
  s = "axc", t = "ahbgdc"

  返回 false.

  后续挑战 :

  如果有大量输入的 S，称作S1, S2, ... , Sk 其中 k >= 10亿，你需要依次检查它们是否为 T 的子序列。在这种情况下，你会怎样改变代码？
 */

const convert = t => {
  const { length } = t;
  const map = Array(26);
  for (let i = 0; i < 26; i += 1) map[i] = [];
  for (let i = 0; i < length; i += 1) {
    map[t[i].charCodeAt() - 97].push(i);
  }
  return map;
};

// 返回小于 e 的元素最大的秩
const binSearch = (_elem, e) => {
  let lo = 0;
  let hi = _elem.length;
  while (lo < hi) {
    const mi = (lo + hi) >> 1; // 寻找中点
    // 经比较后确认深入 [lo, mi) 或 [mi + 1, hi)
    if (e <= _elem[mi]) hi = mi;
    else lo = mi + 1;
  }
  // 查找成功不能提前终止

  // 循环结束时， lo 为大于等于e的元素的最小的秩，故 lo - 1即不大于 e de元素的最大秩
  return lo - 1;
};

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isSubsequence = (s, t) => {
  const { length } = s;
  const map = convert(t);
  let curr = Infinity;
  for (let i = length - 1; i >= 0; i -= 1) {
    const ch = s[i];
    const elem = map[ch.charCodeAt() - 97];
    const index = binSearch(elem, curr);
    if (index === -1) return false;
    curr = elem[index];
  }

  return true;
};

console.log(isSubsequence("abcc", "aadbklc"));
