// https://leetcode-cn.com/problems/shortest-palindrome/description/
// 214. 最短回文串

/**
  给定一个字符串 s，你可以通过在字符串前面添加字符将其转换为回文串。找到并返回可以用这种方式转换的最短回文串。

  示例 1:

  输入: "aacecaaa"
  输出: "aaacecaaa"
  示例 2:

  输入: "abcd"
  输出: "dcbabcd"
 */

/**
 * @param {string} s
 * @return {string}
 */
// 思路: 这个题等效的含义是一个字符串末尾去掉多少个字符就是一个回文串了。
// 去掉的那部分就是应该翻转增在前面的
const shortestPalindrome1 = s => {
  const { length } = s;
  const check = j => {
    let i = 0;
    while (i < j && s[i] === s[j]) {
      i += 1;
      j -= 1;
    }
    return s[i] === s[j];
  };
  let j = length - 1;
  while (0 <= j && !check(j)) j -= 1;
  let pre = "";
  let k = length - 1;
  while (j < k) {
    pre += s[k];
    k -= 1;
  }
  return pre + s;
};

// 上面的思路正确性没问题，但是性能不够, 考虑继续优化
const shortestPalindrome = s => {
  const { length } = s;
  let rs = "";
  for (let i = 1; i <= length; i += 1) rs += s[length - i];
  const str = `${s}#${rs}`;
  const dp = Array(str.length).fill(0);
  for (let i = 1; i < str.length; i += 1) {
    let k = dp[i - 1];
    while (k > 0 && str[k] !== str[i]) k = dp[k - 1];
    dp[i] = k;
    if (str[i] === str[k]) dp[i] += 1;
  }
  return str.substr(length + 1, length - dp[str.length - 1]) + s;
};

console.log(shortestPalindrome("aaaabbaaaaa"));

console.log(shortestPalindrome("aacecaaa"));
console.log(shortestPalindrome1("abaca"));
console.log(shortestPalindrome("abaca"));
console.log(shortestPalindrome("aaaabcaaaaa"));
console.log(shortestPalindrome("abbacd"));
console.log(shortestPalindrome("aacecaaa"));
console.log(shortestPalindrome("abcd"));
