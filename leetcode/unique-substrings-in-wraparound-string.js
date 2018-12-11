// https://leetcode-cn.com/problems/unique-substrings-in-wraparound-string/
// No 467. 环绕字符串中唯一的子字符串

/**
  把字符串 s 看作是“abcdefghijklmnopqrstuvwxyz”的无限环绕字符串，
  所以 s 看起来是这样的："...zabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcd....".

  现在我们有了另一个字符串 p 。你需要的是找出 s 中有多少个唯一的 p 的非空子串，
  尤其是当你的输入是字符串 p ，你需要输出字符串 s 中 p 的不同的非空子串的数目。

  注意: p 仅由小写的英文字母组成，p 的大小可能超过 10000。

  示例 1:

  输入: "a"
  输出: 1
  解释: 字符串 S 中只有一个"a"子字符。


  示例 2:

  输入: "cac"
  输出: 2
  解释: 字符串 S 中的字符串“cac”只有两个子串“a”、“c”。.


  示例 3:

  输入: "zab"
  输出: 6
  解释: 在字符串 S 中有六个子串“z”、“a”、“b”、“za”、“ab”、“zab”。.
 */

/**
 * @param {string} p
 * @return {number}
 */
// 思路: 找到环绕前的字符，非空子串的个数就是每个字符为结尾的字符串数量求和
const findSubstringInWraproundString = p => {
  const { length } = p;
  if (length === 1) return 1;

  const dp = Array(26).fill(0); // 记录以 26 个字母结尾的字符串最大长度
  let i = length - 1;
  while (i >= 0) {
    let j = i;
    while (j >= 1) {
      const code1 = p[j].charCodeAt();
      const code2 = p[j - 1].charCodeAt();
      if ((p[j] === "a" && p[j - 1] === "z") || code1 === code2 + 1) {
        j -= 1;
      } else {
        break;
      }
    }
    let k = j;
    while (k <= i) {
      const code = p[k].charCodeAt() - 97;
      dp[code] = Math.max(dp[code], k - j + 1);
      k += 1;
    }
    i = Math.min(j, i - 1);
  }

  return dp.reduce((m, x) => m + x, 0);
};

console.log(findSubstringInWraproundString("a"));
console.log(findSubstringInWraproundString("ca"));
console.log(findSubstringInWraproundString("zab"));
