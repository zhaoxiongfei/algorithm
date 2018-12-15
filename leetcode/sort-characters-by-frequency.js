// https://leetcode-cn.com/problems/sort-characters-by-frequency/
// No 451. 根据字符出现频率排序

/**
  给定一个字符串，请将字符串里的字符按照出现的频率降序排列。

  示例 1:

  输入:
  "tree"

  输出:
  "eert"

  解释:
  'e'出现两次，'r'和't'都只出现一次。
  因此'e'必须出现在'r'和't'之前。此外，"eetr"也是一个有效的答案。
  示例 2:

  输入:
  "cccaaa"

  输出:
  "cccaaa"

  解释:
  'c'和'a'都出现三次。此外，"aaaccc"也是有效的答案。
  注意"cacaca"是不正确的，因为相同的字母必须放在一起。
  示例 3:

  输入:
  "Aabb"

  输出:
  "bbAa"

  解释:
  此外，"bbaA"也是一个有效的答案，但"Aabb"是不正确的。
  注意'A'和'a'被认为是两种不同的字符。
 */

/**
 * @param {string} s
 * @return {string}
 */
// 思路1: 利用map或者hash统计各字符出现次数，按照次数排序，之后组装结果
const frequencySort = s => {
  const { length } = s;
  if (length === 0) return "";

  const map = new Map();
  for (const ch of s) {
    const times = map.get(ch) | 0;
    map.set(ch, times + 1);
  }

  return Array.from(map)
    .sort((a, b) => b[1] - a[1])
    .map(x => x[0].repeat(x[1]))
    .join("");
};

// 思路2: 利用map或者hash统计各字符出现次数，后组装结果之后排序
// 这两种思路本质上没什么区别
const frequencySort1 = s => {
  const { length } = s;
  if (length === 0) return "";

  const map = {};
  for (const ch of s) map[ch] = (map[ch] | 0) + 1;

  return Object.keys(map)
    .map(k => k.repeat(map[k]))
    .sort((a, b) => b.length - a.length)
    .join("");
};
console.log(frequencySort("tree"));
console.log(frequencySort("Aabb"));
console.log(frequencySort1("tree"));
console.log(frequencySort1("Aabb"));
