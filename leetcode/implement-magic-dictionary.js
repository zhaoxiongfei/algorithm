// https://leetcode-cn.com/problems/implement-magic-dictionary/
// No 676. 实现一个魔法字典

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

/**
 * Initialize your data structure here.
 */
function MagicDictionary() {
  const trie = new Trie();

  /**
   * Build a dictionary through a list of words
   * @param {string[]} dict
   * @return {void}
   */
  const buildDict = dict => {
    for (const word of dict) trie.insert(word);
  };

  /**
   * Returns if there is any word in the trie that
   * equals to the given word after modifying exactly one character
   * @param {string} word
   * @return {boolean}
   */
  const search = word => {
    const arr = Array.from(word);
    const chs = new Set(Array.from("abcdefghijklmnopqrstuvwxyz"));
    for (let i = 0; i < arr.length; i += 1) {
      const ch = arr[i];
      chs.delete(ch);
      for (const r of chs) {
        arr[i] = r;
        if (trie.find(arr.join(""))) return true;
      }
      arr[i] = ch;
      chs.add(ch);
    }

    return false;
  };

  return { buildDict, search };
}

/**
 * Your MagicDictionary object will be instantiated and called as such:
 * var obj = Object.create(MagicDictionary).createNew()
 * obj.buildDict(dict)
 * var param_2 = obj.search(word)
 */

const obj = MagicDictionary();
obj.buildDict(["hello", "leetcode"]);
console.log(obj.search("hello"));
console.log(obj.search("hhllo"));
console.log(obj.search("hell"));
console.log(obj.search("leetcoded"));
