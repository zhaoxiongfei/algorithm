// https://leetcode-cn.com/problems/prefix-and-suffix-search/
// No 745. 前缀和后缀搜索

const root = Symbol("root");

function Node() {
  return { children: [], val: "" };
}

class Trie {
  constructor() {
    this[root] = new Node();
  }

  get root() {
    return this[root];
  }

  insert(word, value) {
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

const reverse = str =>
  Array.from(str)
    .reverse()
    .join("");

/**
 * @param {string[]} words
 */
function WordFilter(words) {
  const { length } = words;

  const preTrie = new Trie();
  const sufTrie = new Trie();
  for (let i = 0; i < length; i += 1) {
    preTrie.insert(words[i], words[i]);
    sufTrie.insert(reverse(words[i]), words[i]);
  }

  const reduce = (node, set) => {
    if (node.val) set.add(node.val);
    for (const child of node.children) {
      if (child) reduce(child, set);
    }
  };

  /**
   * @param {string} prefix
   * @param {string} suffix
   * @return {number}
   */
  const f = (prefix, suffix) => {
    if (!prefix && !suffix) return length - 1;
    const preSet = new Set();
    const sufSet = new Set();
    if (prefix) {
      let node = preTrie.root;
      for (const ch of prefix) {
        node = node.children[ch.charCodeAt() - 97];
        if (!node) return -1;
      }
      reduce(node, preSet);
      if (preSet.size === 0) return -1;
    }

    if (suffix) {
      let node = sufTrie.root;
      for (const ch of reverse(suffix)) {
        node = node.children[ch.charCodeAt() - 97];
        if (!node) return -1;
      }
      reduce(node, sufSet);
      if (sufTrie.size === 0) return -1;
    }

    for (let i = length - 1; 0 <= i; i -= 1) {
      if (
        (prefix === "" || preSet.has(words[i])) &&
        (suffix === "" || sufSet.has(words[i]))
      ) {
        return i;
      }
    }

    return -1;
  };

  return { f };
}

/**
 * Your WordFilter object will be instantiated and called as such:
 * var obj = Object.create(WordFilter).createNew(words)
 * var param_1 = obj.f(prefix,suffix)
 */
const obj = WordFilter(["apple"]);
console.log(obj.f("a", "e"));
