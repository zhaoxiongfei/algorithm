// https://leetcode-cn.com/problems/implement-trie-prefix-tree/description/
// No 208 实现 Trie

/**
  实现一个 Trie (前缀树)，包含 insert, search, 和 startsWith 这三个操作。

  示例:

  Trie trie = new Trie();

  trie.insert("apple");
  trie.search("apple");   // 返回 true
  trie.search("app");     // 返回 false
  trie.startsWith("app"); // 返回 true
  trie.insert("app");
  trie.search("app");     // 返回 true
  说明:

  你可以假设所有的输入都是由小写字母 a-z 构成的。
  保证所有输入均为非空字符串。
 */
function TrieNode() {
  this.exist = false;
  this.children = {};
}
/**
 * Initialize your data structure here.
 */
function Trie() {
  const roots = new TrieNode();

  /**
   * Inserts a word into the trie.
   * @param {string} word
   * @return {void}
   */
  const insert = word => {
    let node = roots;
    let i = 0;
    while (i < word.length) {
      const ch = word[i];
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
      i += 1;
    }
    node.exist = true;
  };

  /**
   * Returns if the word is in the trie.
   * @param {string} word
   * @return {boolean}
   */
  const search = word => {
    let node = roots;
    let i = 0;
    while (i < word.length) {
      const ch = word[i];
      if (!node.children[ch]) return false;
      node = node.children[ch];
      i += 1;
    }
    return node.exist;
  };

  /**
   * Returns if there is any word in the trie that starts with the given prefix.
   * @param {string} prefix
   * @return {boolean}
   */
  const startsWith = prefix => {
    let node = roots;
    let i = 0;
    while (i < prefix.length) {
      const ch = prefix[i];
      if (!node.children[ch]) return false;
      node = node.children[ch];
      i += 1;
    }
    return true;
  };

  return { insert, search, startsWith };
}

const trie = new Trie();
console.log(trie.insert("apple"));
console.log(trie.search("apple"));
console.log(trie.search("app"));
console.log(trie.startsWith("app"));
console.log(trie.insert("app"));
console.log(trie.search("app"));
