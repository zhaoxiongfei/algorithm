// https://leetcode-cn.com/problems/concatenated-words/
// No 472. 连接词

/**
  给定一个不含重复单词的列表，编写一个程序，返回给定单词列表中所有的连接词。

  连接词的定义为：一个字符串完全是由至少两个给定数组中的单词组成的。

  示例:

  输入: ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]

  输出: ["catsdogcats","dogcatsdog","ratcatdogcat"]

  解释: "catsdogcats"由"cats", "dog" 和 "cats"组成;
       "dogcatsdog"由"dog", "cats"和"dog"组成;
       "ratcatdogcat"由"rat", "cat", "dog"和"cat"组成。
  说明:

  给定数组的元素总数不超过 10000。
  给定数组中元素的长度总和不超过 600000。
  所有输入字符串只包含小写字母。
  不需要考虑答案输出的顺序。
 */

/**
 * @param {string[]} words
 * @return {string[]}
 */
// 先按照单词整理为字典，方便快速搜索
const findAllConcatenatedWordsInADict = words => {
  const dict = {};
  for (const word of words) dict[word] = true;

  const dfs = word => {
    for (let i = 0; i < word.length; i += 1) {
      if (!dict[word.slice(0, i + 1)]) continue;
      if (i + 1 === word.length) return true;
      if (dfs(word.slice(i + 1))) return true;
    }
    return false;
  };

  const list = [];
  for (const word of words) {
    dict[word] = false;
    if (dfs(word)) list.push(word);
    dict[word] = true;
  }

  return list;
};

console.log(
  findAllConcatenatedWordsInADict([
    "cat",
    "cats",
    "catsdogcats",
    "dog",
    "dogcatsdog",
    "hippopotamuses",
    "rat",
    "ratcatdogcat"
  ])
);
