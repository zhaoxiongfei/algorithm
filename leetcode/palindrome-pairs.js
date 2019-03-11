// https://leetcode-cn.com/problems/palindrome-pairs/
// No 336. 回文对

const reverse = str =>
  Array.from(str)
    .reverse()
    .join("");

const is = str => {
  const mi = str.length >> 1;
  for (let i = 0; i < mi; i += 1) {
    if (str[i] !== str[str.length - 1 - i]) return false;
  }
  return true;
};

/**
 * @param {string[]} words
 * @return {number[][]}
 */
const palindromePairs = words => {
  const dict = {};
  for (let i = 0; i < words.length; i += 1) {
    dict[words[i]] = i;
  }

  const empty = dict[""];
  const ans = new Set();
  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];
    const index = dict[reverse(word)];
    if (index !== undefined && index !== i) {
      ans.add(`${i}_${index}`);
      ans.add(`${index}_${i}`);
    }
    if (empty !== undefined && empty !== i && is(word)) {
      ans.add(`${i}_${empty}`);
      ans.add(`${empty}_${i}`);
    }
    for (let j = 1; j < word.length; j += 1) {
      if (is(word.slice(0, j))) {
        const l = dict[reverse(word.slice(j))];
        if (l !== undefined) {
          ans.add(`${l}_${i}`);
        }
      }

      if (is(word.slice(-j))) {
        const r = dict[reverse(word.slice(0, -j))];
        if (r !== undefined) {
          ans.add(`${i}_${r}`);
        }
      }
    }
  }

  return Array.from(ans).map(x => x.split("_").map(o => +o));
};

console.log(palindromePairs(["abcd", "dcba", "lls", "s", "sssll"]));
console.log(palindromePairs(["bat", "tab", "cat"]));
console.log(palindromePairs(["a", ""]));
console.log(palindromePairs(["a", "abc", "aba", ""]));
