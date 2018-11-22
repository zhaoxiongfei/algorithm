// https://leetcode-cn.com/problems/maximum-product-of-word-lengths/description/
// No 318. 最大单词长度乘积

/**
  给定一个字符串数组 words，找到 length(word[i]) * length(word[j]) 的最大值，并且这两个单词不含有公共字母。
  你可以认为每个单词只包含小写字母。如果不存在这样的两个单词，返回 0。

  示例 1:

  输入: ["abcw","baz","foo","bar","xtfn","abcdef"]
  输出: 16
  解释: 这两个单词为 "abcw", "xtfn"。
  示例 2:

  输入: ["a","ab","abc","d","cd","bcd","abcd"]
  输出: 4
  解释: 这两个单词为 "ab", "cd"。
  示例 3:

  输入: ["a","aa","aaa","aaaa"]
  输出: 0
  解释: 不存在这样的两个单词。
 */

/**
 * @param {string[]} words
 * @return {number}
 */
const maxProduct = words => {
  const { length } = words;
  if (length === 0) return 0;
  const counts = [];
  for (const word of words) {
    let num = 0;
    for (const ch of word) num |= 1 << (ch.charCodeAt() - 97);
    counts.push([word.length, num]);
  }

  let max = 0;
  for (let i = 0; i < length; i += 1) {
    for (let j = i + 1; j < length; j += 1) {
      if (counts[i][1] & counts[j][1]) continue;
      const product = counts[i][0] * counts[j][0];
      if (product > max) max = product;
    }
  }

  return max;
};

console.log(maxProduct(["abcw", "baz", "foo", "bar", "xtfn", "abcdef"]));
