// https://leetcode-cn.com/problems/longest-repeating-character-replacement/description/
// No 424. 替换后的最长重复字符

/**
  给你一个仅由大写英文字母组成的字符串，你可以将任意位置上的字符替换成另外的字符，
  总共可最多替换 k 次。在执行上述操作后，找到包含重复字母的最长子串的长度。

  注意:
  字符串长度 和 k 不会超过 104。

  示例 1:

  输入:
  s = "ABAB", k = 2

  输出:
  4

  解释:
  用两个'A'替换为两个'B',反之亦然。
  示例 2:

  输入:
  s = "AABABBA", k = 1

  输出:
  4

  解释:
  将中间的一个'A'替换为'B',字符串变为 "AABBBBA"。
  子串 "BBBB" 有最长重复字母, 答案为 4。
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const characterReplacement = (s, k) => {
  const { length } = s;
  const map = Array(26);
  for (let i = 0; i < 26; i += 1) map[i] = [[0, -1]];
  for (let i = 0; i < s.length; i += 1) {
    const index = s[i].charCodeAt() - 65;
    const last = map[index][map[index].length - 1];
    if (last[1] === i - 1) {
      last[1] = i;
    } else {
      map[index].push([i, i]);
    }
  }
  for (let i = 0; i < 26; i += 1) {
    const last = map[i][map[i].length - 1];
    if (last[1] !== length - 1) {
      map[i].push([length, length - 1]);
    }
  }

  let max = 0;
  for (const list of map) {
    if (list.length === 0) continue;
    let money = k;
    let len = list[0][1] - list[0][0] + 1;
    if (max < len) max = len;
    let start = 0;
    let i = 1;
    while (i < list.length) {
      const last = list[i - 1];
      const curr = list[i];
      const price = curr[0] - last[1] - 1;
      if (money < price) {
        // 买不起，退掉前面的第一个
        if (start === i - 1) {
          len = curr[1] - curr[0] + 1;
          money = k;
          start += 1;
          i += 1;
        } else {
          start += 1;
          // 退款为 第二个和第一个的差值
          const back = list[start][0] - list[start - 1][1] - 1;
          money += back;

          // 长度减少
          len -= back + list[start - 1][1] - list[start - 1][0] + 1;
        }
      } else {
        money -= price;
        len += price + curr[1] - curr[0] + 1;
        i += 1;
      }
      // 统计更新一下目前的最大值
      if (max < len + money) max = len + money;
      if (max >= length) return length;
    }
  }

  return max;
};

console.log(
  characterReplacement(
    "KRSCDCSONAJNHLBMDQGIFCPEKPOHQIHLTDIQGEKLRLCQNBOHNDQGHJPNDQPERNFSSSRDEQLFPCCCARFMDLHADJADAGNNSBNCJQOF",
    4
  )
);
console.log(characterReplacement("AABABBA", 1));
console.log(characterReplacement("ABAB", 2));
console.log(characterReplacement("ABAB", 1));
