// https://leetcode-cn.com/problems/word-break-ii/description/
// No. 140

/**
 给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict，在字符串中增加空格来构建一个句子，使得句子中所有的单词都在词典中。返回所有这些可能的句子。

 说明：

 分隔时可以重复使用字典中的单词。
 你可以假设字典中没有重复的单词。
 示例 1：

 输入:
 s = "catsanddog"
 wordDict = ["cat", "cats", "and", "sand", "dog"]
 输出:
 [
   "cats and dog",
   "cat sand dog"
 ]
 示例 2：

 输入:
 s = "pineapplepenapple"
 wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
 输出:
 [
   "pine apple pen apple",
   "pineapple pen apple",
   "pine applepen apple"
 ]
 解释: 注意你可以重复使用字典中的单词。
 示例 3：

 输入:
 s = "catsandog"
 wordDict = ["cats", "dog", "sand", "and", "cat"]
 输出:
 []
 */

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
const helper = (s, set, solution, solutions) => {
  for (let i = 1; i <= s.length; i += 1) {
    const str = s.substring(0, i);
    if (set.has(str)) {
      solution.push(str);
      const other = s.substring(i);
      if (other) {
        helper(s.substring(i), set, solution, solutions);
      } else {
        solutions.push(solution.join(" "));
      }
      solution.pop();
    }
  }
};

// 换个思路: 回溯算法
const wordBreak = (s, wordDict) => {
  const { length } = s;
  const set = new Set(wordDict);

  const dp = Array(length + 1).fill(false);
  for (let i = 1; i <= length; i += 1) {
    const str = s.substring(0, i);
    if (set.has(str)) {
      dp[i] = true;
      continue;
    }
    for (let j = 1; j < i; j += 1) {
      if (dp[j] === false) continue;
      if (set.has(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }

  if (dp[length] === false) return [];
  const solutions = [];
  helper(s, set, [], solutions);
  return solutions;
};

console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]));
console.log(wordBreak("catsanddog", ["cat", "cats", "and", "sand", "dog"]));
console.log(
  wordBreak("pineapplepenapple", [
    "apple",
    "pen",
    "applepen",
    "pine",
    "pineapple"
  ])
);
console.log(
  wordBreak(
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    [
      "a",
      "aa",
      "aaa",
      "aaaa",
      "aaaaa",
      "aaaaaa",
      "aaaaaaa",
      "aaaaaaaa",
      "aaaaaaaaa",
      "aaaaaaaaaa"
    ]
  )
);
