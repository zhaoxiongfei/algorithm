// https://leetcode-cn.com/problems/longest-common-prefix/description/
const longestCommonPrefix = strs => {
  const { length } = strs;
  if (length === 0) return "";
  let lcp = "";
  let minLenth = strs[0].length; // 最短的字符串
  let minIndex = 0; // 找到最短的数组索引，以此为初始源
  for (let i = 0; i < length; i += 1) {
    if (strs[i].length < minLenth) {
      minLenth = strs[i].length;
      minIndex = i;
    }
  }
  const minString = strs[minIndex];
  for (let index = 0; index < minLenth; index += 1) {
    const ch = minString[index];
    for (let i = 0; i < length; i += 1) {
      if (i === minIndex) continue;
      if (strs[i][index] !== ch) return lcp;
    }
    lcp += ch;
  }

  return lcp;
};

// 优化后的算法
const longestCommonPrefix2 = strs => {
  if (strs.length === 0) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i += 1)
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix.length === 0) return "";
    }
  return prefix;
};

// 多重优化
const longestCommonPrefix3 = strs => {
  if (strs.length === 0) return "";

  const { length } = strs;
  let minLenth = strs[0].length; // 最短的字符串长度
  for (let i = 0; i < length; i += 1) {
    if (strs[i].length < minLenth) {
      minLenth = strs[i].length;
    }
  }

  let prefix = strs[0].substr(0, minLenth);
  for (let i = 0; i < length; i += 1) {
    if (i === minIndex) continue;
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix.length === 0) return "";
    }
  }
  return prefix;
};

console.log(longestCommonPrefix(["flower", "flow", "flight"]));
console.log(longestCommonPrefix2(["flower", "flow", "flight"]));
console.log(longestCommonPrefix3(["flower", "flow", "flight"]));
