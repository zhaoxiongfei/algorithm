// https://leetcode-cn.com/problems/decoded-string-at-index/
// No 880. 索引处的解码字符串

/**
  给定一个编码字符串 S。为了找出解码字符串并将其写入磁带，
  从编码字符串中每次读取一个字符，并采取以下步骤：

  如果所读的字符是字母，则将该字母写在磁带上。
  如果所读的字符是数字（例如 d），则整个当前磁带总共会被重复写 d-1 次。
  现在，对于给定的编码字符串 S 和索引 K，查找并返回解码字符串中的第 K 个字母。

  示例 1：

  输入：S = "leet2code3", K = 10
  输出："o"
  解释：
  解码后的字符串为 "leetleetcodeleetleetcodeleetleetcode"。
  字符串中的第 10 个字母是 "o"。
  示例 2：

  输入：S = "ha22", K = 5
  输出："h"
  解释：
  解码后的字符串为 "hahahaha"。第 5 个字母是 "h"。
  示例 3：

  输入：S = "a2345678999999999999999", K = 1
  输出："a"
  解释：
  解码后的字符串为 "a" 重复 8301530446056247680 次。第 1 个字母是 "a"。

  提示：

  2 <= S.length <= 100
  S 只包含小写字母与数字 2 到 9 。
  S 以字母开头。
  1 <= K <= 10^9
  解码后的字符串保证少于 2^63 个字母。
 */
const dfs = (schems, K) => {
  if (schems.length < K) {
    K %= schems.length;
    if (K === 0) K = schems.length;
  }
  const preLength = schems.schems.length * schems.schems.times;
  if (0 < preLength && K <= preLength) {
    return dfs(schems.schems, K);
  }
  return schems.string[K - preLength - 1];
};
/**
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
// 思路: 将 S 转换为一个递归的嵌套结构
// schems = {
//   schems: {schems},
//   tailer: '',
//   times: 1
// }
const decodeAtIndex = (S, K) => {
  let schems = { length: 0, times: 1 }; // 解码出来的字符串
  let string = ""; // 当前正在解码的字符串
  for (const ch of S) {
    if (+ch) {
      schems = {
        schems,
        string,
        length: schems.length * schems.times + string.length,
        times: +ch
      };
      string = "";
    } else {
      // 字符
      string += ch;
    }
  }
  if (string) {
    schems = {
      schems,
      string,
      length: schems.length * schems.times + string.length,
      times: 1
    };
    string = "";
  }

  console.log(JSON.stringify(schems, null, 2));
  return dfs(schems, K);
};

console.log(decodeAtIndex("vk6u5xhq9v", 554));
/*
console.log(decodeAtIndex("a23", 6));
console.log(decodeAtIndex("abc", 1));
console.log(decodeAtIndex("a2345678999999999999999", 1));
console.log(decodeAtIndex("leet2code3", 10));
console.log(decodeAtIndex("ha22", 5));
*/
