// 最长无重复的子串，注意不是子序列
const lengthOfLongestSubstring = string => {
  const { length } = string;
  if (length < 2) return length;

  let max = 1;
  let start = 0; // 从哪个索引开始
  let end = 1; // 到哪个索引结束
  while (end < length) {
    let duplicate = false;
    const currLen = end - start + 1;
    for (let i = start; i < end; i += 1) {
      if (string[end] === string[i]) {
        duplicate = true;
        start = i + 1;
        break;
      }
    }
    if (!duplicate) {
      max = Math.max(max, currLen);
    }
    end += 1;
  }

  return max;
};

const s = "abcabcdecfabc";
// const s = "aaaaaaaaaaba";
// const s = "abcabcbb";
// const s = "bbbbb";
console.log(lengthOfLongestSubstring(s));
