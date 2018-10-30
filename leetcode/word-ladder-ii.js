// https://leetcode-cn.com/problems/word-ladder-ii/description/
// No. 126

/**
  给定两个单词（beginWord 和 endWord）和一个字典 wordList，找出所有从 beginWord 到 endWord 的最短转换序列。转换需遵循如下规则：

  每次转换只能改变一个字母。
  转换过程中的中间单词必须是字典中的单词。
  说明:

  如果不存在这样的转换序列，返回一个空列表。
  所有单词具有相同的长度。
  所有单词只由小写字母组成。
  字典中不存在重复的单词。
  你可以假设 beginWord 和 endWord 是非空的，且二者不相同。
  示例 1:

  输入:
  beginWord = "hit",
  endWord = "cog",
  wordList = ["hot","dot","dog","lot","log","cog"]

  输出:
  [
    ["hit","hot","dot","dog","cog"],
    ["hit","hot","lot","log","cog"]
  ]
  示例 2:

  输入:
  beginWord = "hit"
  endWord = "cog"
  wordList = ["hot","dot","dog","lot","log"]

  输出: []

  解释: endWord "cog" 不在字典中，所以不存在符合要求的转换序列。
*/

const makeDict = wordList => {
  const dict = {};
  for (let w = 0; w < wordList.length; w += 1) {
    const root = wordList[w];
    dict[root] = wordList.filter(x => {
      if (x === root) return false;
      let diff = 0;
      for (let i = 0; i < x.length; i += 1) {
        if (x[i] !== root[i]) {
          diff += 1;
          if (diff > 1) return false;
        }
      }
      return diff === 1;
    });
  }

  return dict;
};

const getOnlyOneDiff = (root, dict, withouts) => {
  const exists = new Set(withouts);
  return dict[root].filter(x => !exists.has(x));
};

let min = Infinity;
const search = (root, dict, paths, endWord, solutions) => {
  if (min <= paths.length) return;
  const ls = getOnlyOneDiff(root, dict, paths, endWord);
  if (!ls.length) return;
  if (ls.indexOf(endWord) !== -1) {
    paths.push(endWord);
    if (paths.length < min) min = paths.length;
    solutions.push(paths);
    return;
  }
  ls.map(x => search(x, dict, [].concat(paths, x), endWord, solutions));
};

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
// 分析: 转换过程中每一个单词只能使用一次，虽然题目没有这么要求, 但是显然一旦重复使用了，
// 就陷入了死循环中了。
// 思路: 将字典转换为一个树状结构, 父子之间只有一个字符差异。树的根是 beginWord, 某些叶子可能是endWord
const findLadders = (beginWord, endWord, wordList) => {
  min = Infinity;
  const { length } = beginWord;
  const solutions = [];
  if (wordList.indexOf(endWord) === -1) return solutions;
  const stats = []; // 记录从beginWord => endWord 各位是否已经相同
  for (let i = 0; i < length; i += 1) stats[i] = beginWord[i] === endWord;
  const dict = makeDict(wordList.concat(beginWord)); // 生成一个字典，[word] => [] // 词对应的变化一个字符的单词列表
  search(beginWord, dict, [beginWord], endWord, solutions);

  solutions.sort((a, b) => a.length - b.length);
  return solutions.filter(x => x.length === min);
};

console.log(
  // findLadders("hot", "dog", ["hot", "dog", "dot"])
  // findLadders("a", "c", ["a", "b", "c"])
  findLadders("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])
);
