// https://leetcode-cn.com/problems/top-k-frequent-words/
// No 692. 前K个高频单词

/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
const topKFrequent = (words, k) => {
  const map = new Map();
  for (const word of words) {
    map.set(word, (map.get(word) || 0) + 1);
  }

  const list = new Map();
  for (const [word, times] of map) {
    const ws = list.get(times) || [];
    if (ws.length === 0) list.set(times, ws);
    ws.push(word);
  }

  const ans = [];
  const ls = Array.from(list).sort((a, b) => b[0] - a[0]);

  let i = k;
  for (const [, ws] of ls) {
    if (i === 0) break;
    if (1 < ws.length) ws.sort((a, b) => (a > b ? 1 : -1));
    for (const w of ws) {
      if (0 < i) {
        ans.push(w);
        i -= 1;
      }
    }
  }

  return ans;
};

console.log(topKFrequent(["i", "love", "leetcode", "i", "love", "coding"], 2));
console.log(
  topKFrequent(
    ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"],
    4
  )
);
