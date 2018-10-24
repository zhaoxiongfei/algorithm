// https://leetcode-cn.com/problems/text-justification/description/

// 给单词插入空格，是的字符串全长达到 need
const insertSpace = (words, length, need) => {
  const lack = need - length; // 缺少的空格数
  if (!lack) return words.join(" ");
  if (words.length === 1) {
    words[0] += " ".repeat(need - length);
    return words[0];
  }
  const num = (lack / (words.length - 1)) | 0;
  const remainder = lack % (words.length - 1);
  for (let i = 0; i < words.length - 1; i += 1) {
    const n = num + (i < remainder ? 1 : 0);
    words[i] += " ".repeat(n);
  }

  return words.join(" ");
};

/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
const fullJustify = (words, maxWidth) => {
  const { length } = words;

  const list = []; // 结果存放数组
  let currLine = [];
  let currLen = 0; // 当前行单词总长度
  for (let i = 0; i < length; i += 1) {
    const word = words[i];
    const ext = currLine.length ? 1 : 0; // 补充长度，这个是补充必须的单词间的空格长度, 两个单词之间只要要一个空格
    if (currLen + word.length + ext > maxWidth) {
      list.push(insertSpace(currLine, currLen, maxWidth));
      currLine = [word];
      currLen = word.length;
    } else {
      currLine.push(word);
      currLen += word.length + ext;
    }
  }
  if (currLine.length) {
    const lastLine = currLine.join(" ") + " ".repeat(maxWidth - currLen);
    list.push(lastLine);
  }

  return list;
};

const words = [
  "Science",
  "is",
  "what",
  "we",
  "understand",
  "well",
  "enough",
  "to",
  "explain",
  "to",
  "a",
  "computer.",
  "Art",
  "is",
  "everything",
  "else",
  "we",
  "do"
];
const maxWidth = 20;

console.log(fullJustify(words, maxWidth));
