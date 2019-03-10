const size = Symbol("size");
const root = Symbol("root");

function Node() {
  return { children: Array(26), has: false };
}

class Trie {
  constructor() {
    this[size] = 0; // 字典包含单词的数量
    this[root] = new Node();
  }

  get size() {
    return this[size];
  }

  get root() {
    return this[root];
  }

  insert(word) {
    let node = this.root;
    word = word.toLowerCase();
    for (let i = 0; i < word.length; i += 1) {
      const index = word[i].charCodeAt() - 97;
      if (!node.children[index]) {
        node.children[index] = new Node();
      }
      node = node.children[index];
    }
    if (!node.has) {
      this[size] += 1;
      node.has = true;
    }
  }

  find(word) {
    let node = this.root;
    word = word.toLowerCase();
    for (let i = 0; i < word.length; i += 1) {
      const index = word[i].charCodeAt() - 97;
      if (!node.children[index]) return false;
      node = node.children[index];
    }
    return node.has;
  }
}

module.exports = Trie;
