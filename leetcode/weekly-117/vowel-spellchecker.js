/**
 * @param {string[]} wordlist
 * @param {string[]} queries
 * @return {string[]}
 */
const spellchecker = (wordlist, queries) => {
  const wovles = new Set(["a", "o", "e", "i", "u"]);
  const map = new Map();
  for (const word of wordlist) {
    const lower = word.toLowerCase();
    let words = map.get(lower);
    if (!words) {
      map.set(lower, []);
      words = map.get(lower);
    }
    words.push(word);
  }

  const ans = [];
  for (const q of queries) {
    const lower = q.toLowerCase();
    const ws = map.get(lower);
    if (ws) {
      if (ws.includes(q)) {
        ans.push(q);
      } else {
        ans.push(ws[0]);
      }
    } else {
      let exists = false;
      for (const word of wordlist) {
        if (word.length !== q.length) continue;
        let finded = true;
        for (let i = 0; i < word.length; i += 1) {
          const a = word[i].toLowerCase();
          const b = q[i].toLowerCase();
          if (a === b) continue;
          if (wovles.has(a) && wovles.has(b)) continue;
          finded = false;
          break;
        }
        if (finded === true) {
          ans.push(word);
          exists = true;
          break;
        }
      }
      if (!exists) ans.push("");
    }
  }

  return ans;
};

console.log(
  spellchecker(
    ["KiTe", "kite", "hare", "Hare"],
    [
      "kite",
      "Kite",
      "KiTe",
      "Hare",
      "HARE",
      "Hear",
      "hear",
      "keti",
      "keet",
      "keto"
    ]
  )
);
