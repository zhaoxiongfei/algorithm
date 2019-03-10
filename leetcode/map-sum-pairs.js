// https://leetcode-cn.com/problems/map-sum-pairs/
// No 677. 键值映射
const root = Symbol("root");

function Node() {
  return { children: Array(26), val: 0 };
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

/**
 * Initialize your data structure here.
 */
function MapSum() {
  const trie = new Trie();

  /**
   * @param {string} key
   * @param {number} val
   * @return {void}
   */
  const insert = (key, val) => {
    trie.insert(key, val);
  };

  const dfs = node => {
    if (!node) return 0;
    let total = node.val;
    for (const child of node.children) {
      total += dfs(child);
    }
    return total;
  };

  /**
   * @param {string} prefix
   * @return {number}
   */
  const sum = prefix => {
    let node = trie.root;
    for (const ch of prefix) {
      node = node.children[ch.charCodeAt() - 97];
      if (!node) return 0;
    }
    return dfs(node);
  };

  return { insert, sum };
}
/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = Object.create(MapSum).createNew()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */
const obj = new MapSum();
obj.insert("apple", 3);
console.log(obj.sum("ap"));
obj.insert("app", 2);
console.log(obj.sum("ap"));
