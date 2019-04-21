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
}

/**
 * @param {string[]} words
 */
function StreamChecker(words) {
  const trie = new Trie();
  for (const word of words) {
    trie.insert(
      Array.from(word)
        .reverse()
        .join("")
    );
  }

  const querys = [];
  /**
   * @param {character} letter
   * @return {boolean}
   */
  const query = letter => {
    querys.push(letter);
    let node = trie.root;
    for (let i = querys.length - 1; 0 <= i; i -= 1) {
      const index = querys[i].charCodeAt() - 97;
      if (!node.children[index]) return false;
      node = node.children[index];
      if (node.has) return true;
    }
    return false;
  };

  return { query };
}

/**
 * Your StreamChecker object will be instantiated and called as such:
 * var obj = new StreamChecker(words)
 * var param_1 = obj.query(letter)
 */

const lines = [
  ["a"],
  ["a"],
  ["a"],
  ["a"],
  ["a"],
  ["b"],
  ["a"],
  ["b"],
  ["a"],
  ["b"],
  ["b"],
  ["b"],
  ["a"],
  ["b"],
  ["a"],
  ["b"],
  ["b"],
  ["b"],
  ["b"],
  ["a"],
  ["b"],
  ["a"],
  ["b"],
  ["a"],
  ["a"],
  ["a"],
  ["b"],
  ["a"],
  ["a"],
  ["a"]
];
const res = [
  false,
  false,
  false,
  false,
  false,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  true,
  true,
  true,
  false
];
const wss = ["ab", "ba", "aaab", "abab", "baa"];
const instance = StreamChecker(wss);
console.log(wss);
for (let i = 0; i < lines.length; i += 1) {
  console.log(
    "query: %s, curr: %s, res: %s",
    lines[i][0],
    instance.query(lines[i][0]),
    res[i]
  );
}
