// https://leetcode-cn.com/contest/weekly-contest-114/problems/verifying-an-alien-dictionary/

/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
const isAlienSorted = (words, order) => {
  const map = {};
  for (let i = 0; i < order.length; i += 1) map[order[i]] = i;

  for (let i = 1; i < words.length; i += 1) {
    const last = words[i - 1];
    const curr = words[i];
    const len = Math.min(last.length, curr.length);
    let correct = false;
    for (let j = 0; j < len; j += 1) {
      if (map[curr[j]] < map[last[j]]) return false;
      if (map[curr[j]] > map[last[j]]) {
        correct = true;
        break;
      }
    }
    if (!correct && curr.length < last.length) return false;
  }

  return true;
};

console.log(isAlienSorted(["hello", "leetcode"], "hlabcdefgijkmnopqrstuvwxyz"));
console.log(isAlienSorted(["apple", "app"], "abcdefghijklmnopqrstuvwxyz"));
console.log(
  isAlienSorted(["word", "world", "row"], "worldabcefghijkmnpqstuvxyz")
);
