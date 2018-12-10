// https://leetcode-cn.com/problems/reconstruct-original-digits-from-english/description/
// No 423. 从英文中重建数字

/**
  给定一个非空字符串，其中包含字母顺序打乱的英文单词表示的数字0-9。
  按升序输出原始的数字。

  注意:

  输入只包含小写英文字母。
  输入保证合法并可以转换为原始的数字，这意味着像 "abc" 或 "zerone" 的输入是不允许的。
  输入字符串的长度小于 50,000。
  示例 1:

  输入: "owoztneoer"

  输出: "012" (zeroonetwo)
  示例 2:

  输入: "fviefuro"

  输出: "45" (fourfive)
 */

/**
 * @param {string} s
 * @return {string}
 */
const originalDigits = s => {
  const map = Array(26).fill(0);
  for (const ch of s) map[ch.charCodeAt() - 97] += 1;

  // 这些单词按顺序都存在唯一字符
  const digits = [
    ["zero", "z", 0],
    ["two", "w", 2],
    ["four", "u", 4],
    ["six", "x", 6],
    ["eight", "g", 8],
    ["one", "o", 1],
    ["three", "t", 3],
    ["five", "f", 5],
    ["seven", "v", 7],
    ["nine", "i", 9]
  ];
  const stats = Array(10).fill(0);
  for (const [word, ch, n] of digits) {
    const num = map[ch.charCodeAt() - 97];
    if (num === 0) continue;
    stats[n] = num;
    for (const c of word) {
      map[c.charCodeAt() - 97] -= num;
    }
  }

  return stats.map((n, i) => i.toString().repeat(n)).join("");
};

console.log(originalDigits("owoztneoer"));
