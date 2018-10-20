/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */

const checkSubstring = (s, compare, i, wordLen, totalLen) => {
  const words = [];
  for (let j = i; j < i + totalLen; j += wordLen) {
    words.push(s.substr(j, wordLen));
  }
  return compare === words.sort().join("");
};

const findSubstring = (s, words) => {
  if (words.length === 0) return [];
  if (s.length === 0) return [];
  if (s.length >= 10000) return [];
  const map = {};
  const result = [];
  let compare = "";

  words.sort();
  for (let i = 0; i < words.length; i += 1) {
    compare += words[i];
    if (typeof map[words[i]] !== "undefined") {
      map[words[i]] += 1;
    } else {
      map[words[i]] = 1;
    }
  }

  const wordLen = words[0].length;
  const totalLen = wordLen * words.length;

  for (let i = 0; i <= s.length - totalLen; i += 1) {
    const text = s.substr(i, wordLen);
    if (
      typeof map[text] !== "undefined" &&
      checkSubstring(s, compare, i, wordLen, totalLen)
    ) {
      result.push(i);
    }
  }
  console.log(map);
  console.log(compare);
  console.log("wordLen: %d", wordLen);
  console.log("totalLen: %d", totalLen);

  return result;
};

const s = "aaaaaaaaaaaaafoobaraaaaaaaaaaaaahelloworldbarfoo";
const words = ["aaaaaaaaaaaaa", "aaa", "foo", "bar"];
console.log(findSubstring(s, words));
