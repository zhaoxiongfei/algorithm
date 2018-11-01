// https://leetcode-cn.com/problems/word-break/description/
// No. 139

/**
 给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict，判定 s 是否可以被空格拆分为一个或多个在字典中出现的单词。

 说明：

 拆分时可以重复使用字典中的单词。
 你可以假设字典中没有重复的单词。
 示例 1：

 输入: s = "leetcode", wordDict = ["leet", "code"]
 输出: true
 解释: 返回 true 因为 "leetcode" 可以被拆分成 "leet code"。
 示例 2：

 输入: s = "applepenapple", wordDict = ["apple", "pen"]
 输出: true
 解释: 返回 true 因为 "applepenapple" 可以被拆分成 "apple pen apple"。
      注意你可以重复使用字典中的单词。
 示例 3：

 输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
 输出: false
 */

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
// 思路: 动态规划，令 dp[i] 为截止到第 i 个字符是否满足条件
// 递推公式: dp[i] = true; when s[0..i] 包含在 wordDict 内 或者 dp[n] === 1 且 s[n..i] 包含在wordDict 内 0 < n < i
//           dp[i] 默认等于 false
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

  return dp[length];
};

console.log(wordBreak("applepenapple", ["apple", "pen"]));
