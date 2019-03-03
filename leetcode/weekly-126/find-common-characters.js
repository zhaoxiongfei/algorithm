/**
 * @param {string[]} A
 * @return {string[]}
 */
const commonChars = A => {
  const { length } = A;
  const list = [];
  const maps = Array(length);
  for (let i = 0; i < length; i += 1) {
    maps[i] = Array(26).fill(0);
    for (const ch of A[i]) {
      maps[i][ch.charCodeAt() - 97] += 1;
    }
  }

  for (let i = 0; i < 26; i += 1) {
    let len = Infinity;
    for (const map of maps) {
      if (map[i] < len) len = map[i];
    }
    if (len === 0) continue;
    for (let j = 0; j < len; j += 1) list.push(String.fromCharCode(i + 97));
  }

  return list;
};

console.log(commonChars(["bella", "label", "roller"]));
console.log(commonChars(["cool", "lock", "cook"]));
