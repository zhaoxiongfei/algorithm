// https://leetcode-cn.com/problems/repeated-dna-sequences/description/
// No 187. 重复的DNA序列

/**
  所有 DNA 由一系列缩写为 A，C，G 和 T 的核苷酸组成，例如：“ACGAATTCCG”。在研究 DNA 时，识别 DNA 中的重复序列有时会对研究非常有帮助。

  编写一个函数来查找 DNA 分子中所有出现超多一次的10个字母长的序列（子串）。

  示例:

  输入: s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"

  输出: ["AAAAACCCCC", "CCCCCAAAAA"]
 */

/**
 * @param {string} s
 * @return {string[]}
 */
// 思路：dna 序列中只包含 acgt 四个不同的字母，好好利用这个特征，千万别做成通用的，通用的时间复杂度肯定高
const findRepeatedDnaSequences = s => {
  const { length } = s;
  const dict = {};
  for (let i = 0; i + 10 <= length; i += 1) {
    const str = s.slice(i, i + 10);
    if (!dict[str]) {
      dict[str] = 1;
    } else {
      dict[str] += 1;
    }
  }
  return Array.from(new Set(Object.keys(dict).filter(x => dict[x] > 1)));
};

const findRepeatedDnaSequences2 = s => {
  const { length } = s;
  const set = new Set();
  const dict = {};
  for (let i = 0; i + 10 <= length; i += 1) {
    const str = s.slice(i, i + 10);
    if (!dict[str]) {
      dict[str] = true;
    } else {
      set.add(str);
    }
  }
  return Array.from(set);
};

console.log(findRepeatedDnaSequences("AAAAAAAAAAAA"));
console.log(findRepeatedDnaSequences2("AAAAAAAAAAAA"));
console.log(findRepeatedDnaSequences("AAAAAAAAAAA"));
console.log(findRepeatedDnaSequences("AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"));
