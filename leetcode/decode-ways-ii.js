// https://leetcode-cn.com/problems/decode-ways-ii/
// No 639. 解码方法 2

/**
  一条包含字母 A-Z 的消息通过以下的方式进行了编码：

  'A' -> 1
  'B' -> 2
  ...
  'Z' -> 26
  除了上述的条件以外，现在加密字符串可以包含字符 '*'了，字符'*'可以被当做1到9当中的任意一个数字。

  给定一条包含数字和字符'*'的加密信息，请确定解码方法的总数。

  同时，由于结果值可能会相当的大，所以你应当对109 + 7取模。（翻译者标注：此处取模主要是为了防止溢出）

  示例 1 :

  输入: "*"
  输出: 9
  解释: 加密的信息可以被解密为: "A", "B", "C", "D", "E", "F", "G", "H", "I".
  示例 2 :

  输入: "1*"
  输出: 9 + 9 = 18（翻译者标注：这里1*可以分解为1,* 或者当做1*来处理，所以结果是9+9=18）
  说明 :

  输入的字符串长度范围是 [1, 105]。
  输入的字符串只会包含字符 '*' 和 数字'0' - '9'。
 */

/**
 * @param {string} s
 * @return {number}
 */
const comb = str => {
  if (str === "0") return 0;
  if (str === "*") return 9;
  if (str.length === 1) return 1;
  if (str === "**") return 15;
  if (str[1] === "*") {
    if (str[0] === "1") return 9;
    return str[0] === "2" ? 6 : 0;
  }
  if (str[0] === "*") {
    return str[1] <= "6" ? 2 : 1;
  }

  const num = +str;
  return 10 <= num && num <= 26 ? 1 : 0;
};
const bigNumber = 10 ** 9 + 7;

// 思路: 动态规划 令 dp[i] 代表截止到第i位可能的解码组合数
// dp[i] = dp[i - 1] * numDecodings(s[i]) + dp[i - 2] * numDecodings(s[i - 1]s[i])
const numDecodings = s => {
  const { length } = s;
  const dp = Array(length + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= length; i += 1) {
    dp[i] += dp[i - 1] * comb(s[i - 1]);
    if (1 < i) dp[i] += dp[i - 2] * comb(s[i - 2] + s[i - 1]);
    dp[i] %= bigNumber;
  }

  return dp[length];
};

console.log(numDecodings("********************"));
console.log(numDecodings("*********"));
console.log(numDecodings("***"));
console.log(numDecodings("*1"));
console.log(numDecodings("3*"));
console.log(numDecodings("**"));
// console.log(numDecodings("*"));
// console.log(numDecodings("1*"));
