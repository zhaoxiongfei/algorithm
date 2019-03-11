// https://leetcode-cn.com/problems/longest-word-in-dictionary/
// No 720. 词典中最长的单词
const root = Symbol("root");

function Node() {
  return { children: [], val: null };
}

class Trie {
  constructor() {
    this[root] = new Node();
  }

  get root() {
    return this[root];
  }

  insert(word, value = true) {
    let node = this.root;
    word = word.toLowerCase();
    for (let i = 0; i < word.length; i += 1) {
      const index = word[i].charCodeAt() - 97;
      if (!node.children[index]) {
        node.children[index] = new Node();
      }
      node = node.children[index];
    }
    node.val = value;
  }
}

/**
 * @param {string[]} words
 * @return {string}
 */
const longestWord = words => {
  const trie = new Trie();
  for (const word of words) trie.insert(word, word);
  let maxLen = -1;
  let ans = "";

  const dfs = (node, len) => {
    if (maxLen < len + 1) {
      maxLen = len + 1;
      ans = node.val;
    }
    for (let i = 0; i < 26; i += 1) {
      const child = node.children[i];
      if (child && child.val) dfs(child, len + 1);
    }
  };

  const node = trie.root;
  for (let i = 0; i < 26; i += 1) {
    const child = node.children[i];
    if (child && child.val) dfs(child, 0);
  }
  return ans;
};

console.log(
  longestWord(["a", "banana", "app", "appl", "ap", "apply", "apple"])
);
console.log(longestWord(["w", "wo", "wor", "worl", "world"]));
