// https://leetcode-cn.com/problems/palindromic-substrings/
// No 647. 回文子串

/**
 * @param {string} s
 * @return {number}
 */
// 思路一: 暴力求解
const countSubstrings1 = s => {
  let count = s.length;
  for (let i = 0; i < s.length; i += 1) {
    for (let j = i + 1; j < s.length; j += 1) {
      const d = (j - i + 1) >> 1;
      let flag = true;
      for (let c = 0; c < d; c += 1) {
        if (s[i + c] !== s[j - c]) {
          flag = false;
          break;
        }
      }
      if (flag) count += 1;
    }
  }

  return count;
};

// 思路二: 中心扩展法，以某个字符为中心的回文串的个数
const countSubstrings = s => {
  const n = s.length;
  let count = 0;

  const expand = (start, end) => {
    while (0 <= start && end < n && s[start] === s[end]) {
      count += 1;
      start -= 1;
      end += 1;
    }
  };

  for (let i = 0; i < n; i += 1) {
    expand(i, i);
    expand(i, i + 1);
  }
  return count;
};

console.log(countSubstrings1("abc"));
console.log(countSubstrings("aaa"));
