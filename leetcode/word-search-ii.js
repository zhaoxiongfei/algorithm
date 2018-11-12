// https://leetcode-cn.com/problems/word-search-ii/description/
// 212. 单词搜索 II

/**
  给定一个二维网格 board 和一个字典中的单词列表 words，找出所有同时在二维网格和字典中出现的单词。

  单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。
  同一个单元格内的字母在一个单词中不允许被重复使用。

  示例:

  输入:
  words = ["oath","pea","eat","rain"] and board =
  [
    ['o','a','a','n'],
    ['e','t','a','e'],
    ['i','h','k','r'],
    ['i','f','l','v']
  ]

  输出: ["eat","oath"]
  说明:
  你可以假设所有输入都由小写字母 a-z 组成。

  提示:

  你需要优化回溯算法以通过更大数据量的测试。你能否早点停止回溯？
  如果当前单词不存在于所有单词的前缀中，则可以立即停止回溯。
  什么样的数据结构可以有效地执行这样的操作？散列表是否可行？为什么？ 前缀树如何？
  如果你想学习如何实现一个基本的前缀树，请先查看这个问题： 实现Trie（前缀树）。
*/

function TreeNode(val) {
  this.val = val;
  this.count = 0;
  this.isWord = false;
  this.children = {};
}

function WordDictionary() {
  const tree = new TreeNode("*");

  const add = word => {
    const { length } = word;
    let node = tree;
    node.count += 1;
    let i = 0;
    while (i < length) {
      const ch = word[i];
      if (!node.children[ch]) node.children[ch] = new TreeNode(ch);
      node = node.children[ch];
      node.count += 1;
      i += 1;
    }
    node.isWord = true;
  };

  const remove = word => {
    const { length } = word;
    let node = tree;
    node.count -= 1;
    let i = 0;
    while (i < length) {
      const ch = word[i];
      const child = node.children[ch];
      if (!child) return;
      child.count -= 1;
      if (child.count === 0) delete node.children[ch];
      i += 1;
      node = child;
    }
    node.isWord = false;
  };

  return { add, remove, tree };
}

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
// 思路: 先将 words 变成一颗 trie 树, 之后从树根节点依次查找
// 这样对于拥有相同前缀的单词可以节约很多算力
const findWords = (board, words) => {
  const m = board.length;
  if (m === 0) return [];
  const n = board[0].length;
  if (n === 0) return [];
  const trie = new WordDictionary();
  for (const word of words) trie.add(word);
  const { tree } = trie;

  const ans = [];

  const find = (node, i, j, pre) => {
    if (node.count === 0) return;
    // 上下左右四个方向分别检测
    const directions = [
      [i - 1, j], // 上
      [i + 1, j], // 下
      [i, j - 1], // 左
      [i, j + 1] // 右
    ];
    for (const [r, c] of directions) {
      if (r < 0 || r >= m || c < 0 || c >= n) continue;
      const ch = board[r][c];
      const child = node.children[ch];
      if (!child || !child.count) continue;
      const word = pre + ch;
      if (child.isWord && child.count > 0) {
        ans.push(word);
        trie.remove(word);
      }
      board[r][c] = "$";
      find(child, r, c, word);
      board[r][c] = ch;
    }
  };

  let i = -1;
  let j = 0;
  while (i < m && j < n) {
    find(tree, i, j, "");
    j += 1;
    if (j === n) {
      j = 0;
      i += 1;
    }
  }

  return ans;
};

console.log(
  findWords(
    [["a", "a", "a", "a"], ["a", "a", "a", "a"], ["a", "a", "a", "a"]],
    // ["aaaaaaaaaaaa", "aaaaaaaaaaaaa", "aaaaaaaaaaab"]
    ["aaaaaaaaaaaa"]
  )
);
console.log(findWords([["a", "a"]], ["aaa"]));
console.log(findWords([["a"]], ["a"]));
console.log(
  findWords(
    [
      ["o", "a", "a", "n"],
      ["e", "t", "a", "e"],
      ["i", "h", "k", "r"],
      ["i", "f", "l", "v"]
    ],
    ["oath", "pea", "eat", "rain"]
  )
);
