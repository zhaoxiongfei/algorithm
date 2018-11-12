// https://leetcode-cn.com/problems/add-and-search-word-data-structure-design/description/
// No 211. 添加与搜索单词 - 数据结构设计

/**
  设计一个支持以下两种操作的数据结构：

  void addWord(word)
  bool search(word)
  search(word) 可以搜索文字或正则表达式字符串，字符串只包含字母 . 或 a-z 。 . 可以表示任何一个字母。

  示例:

  addWord("bad")
  addWord("dad")
  addWord("mad")
  search("pad") -> false
  search("bad") -> true
  search(".ad") -> true
  search("b..") -> true
  说明:

  你可以假设所有单词都是由小写字母 a-z 组成的。
 */

/**
 * Initialize your data structure here.
 */
// 思路: 构造字典树
function TreeNode(val) {
  this.val = val;
  this.isWord = false;
  this.children = {};
}

const searchIn = (tree, word) => {
  const { length } = word;
  let node = tree;
  let i = 0;
  while (i < length) {
    const ch = word[i];
    if (ch === ".") {
      for (const key of Object.keys(node.children)) {
        if (searchIn(node.children[key], word.slice(i + 1))) return true;
      }
      return false;
    }
    if (!node.children[ch]) {
      return false;
    }
    node = node.children[ch];
    i += 1;
  }
  return node.isWord;
};

function WordDictionary() {
  const tree = new TreeNode();

  const addWord = word => {
    const { length } = word;
    let node = tree;
    let i = 0;
    while (i < length) {
      const ch = word[i];
      if (!node.children[ch]) {
        node.children[ch] = new TreeNode(ch);
      }
      node = node.children[ch];
      i += 1;
    }
    node.isWord = true;
  };

  const search = word => searchIn(tree, word);

  return { addWord, search };
}

const instance = new WordDictionary();
[
  "addWord",
  "addWord",
  "addWord",
  "search",
  "search",
  "search",
  "search"
].forEach((m, index) => {
  console.log(
    instance[m](
      ...[["bad"], ["dad"], ["mad"], ["pad"], ["bad"], [".ad"], ["b.."]][index]
    )
  );
});
