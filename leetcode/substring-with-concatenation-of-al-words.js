// https://leetcode-cn.com/problems/substring-with-concatenation-of-all-words/description/
//

const findSubstring = (s, words) => {
  const { length } = words;
  const solution = [];

  const search = words.join("");
  if (search.length > s.length) return solution;

  if (length && words.every(x => x === words[0])) {
    let index = s.indexOf(search);
    while (index !== -1) {
      solution.push(index);
      index = s.indexOf(search, index + 1);
    }

    return solution;
  }

  const dict = {}; // { [index]: Set({ i })
  for (let i = 0; i < length; i += 1) {
    const word = words[i];
    let index = s.indexOf(word);
    let exists = false;
    while (index !== -1) {
      exists = true;
      if (!dict[index]) dict[index] = new Set();
      dict[index].add(i); // 这里记录单词表里的索引位置，因为单词表可能会有重复的
      const from = index + 1; // word.length;
      index = s.indexOf(word, from);
    }
    // 只要有任意一个词不存在的直接返回空
    if (!exists) return solution;
  }

  const indexes = Object.keys(dict)
    .map(x => x | 0)
    .sort((a, b) => a - b);

  const check = (index, exists) => {
    if (exists.size === length) {
      return true;
    }
    if (!dict[index]) return false;
    const ls = Array.from(dict[index]);
    if (!ls) return false;
    let lastWordIndex = -1;
    for (let i = 0; i < ls.length; i += 1) {
      const wordIndex = ls[i];
      // 如果该单词是已经找到的单词，则忽略
      if (exists.has(wordIndex)) continue;

      if (lastWordIndex !== -1) {
        exists.delete(lastWordIndex); // 删除上一次循环的遗毒
      }
      exists.add(wordIndex); // 加入这一次的新单词，记录往后判断
      lastWordIndex = wordIndex;

      if (check(index + words[ls[i]].length, exists)) {
        return true;
      }
      exists.delete(wordIndex); // 加入这一次的新单词，记录往后判断
    }
    return false;
  };

  // 逐个判断
  while (indexes.length) {
    const index = indexes.shift();
    if (check(index, new Set())) {
      solution.push(index);
    }
  }

  return solution;
};
console.log(findSubstring("", []));

console.log(
  findSubstring("wordgoodgoodgoodbestword", ["word", "good", "best", "good"])
);
console.log(findSubstring("aaaaaaaa", ["aa", "aa", "aa"]));
