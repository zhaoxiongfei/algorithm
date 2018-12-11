// https://leetcode-cn.com/problems/magical-string/description/
// No 481. 神奇字符串

/**
  神奇的字符串 S 只包含 '1' 和 '2'，并遵守以下规则：

  字符串 S 是神奇的，因为串联字符 '1' 和 '2' 的连续出现次数会生成字符串 S 本身。

  字符串 S 的前几个元素如下：S = “1221121221221121122 ......”

  如果我们将 S 中连续的 1 和 2 进行分组，它将变成：

  1 22 11 2 1 22 1 22 11 2 11 22 ......

  并且每个组中 '1' 或 '2' 的出现次数分别是：

  1 2 2 1 1 2 1 2 2 1 2 2 ......

  你可以看到上面的出现次数就是 S 本身。

  给定一个整数 N 作为输入，返回神奇字符串 S 中前 N 个数字中的 '1' 的数目。

  注意：N 不会超过 100,000。

  示例：

  输入：6
  输出：3
  解释：神奇字符串 S 的前 6 个元素是 “12211”，它包含三个 1，因此返回 3。
 */

/**
 * @param {number} n
 * @return {number}
 */
const magicalString = n => {
  if (n < 1) return 0;
  if (n < 4) return 1;
  if (n < 5) return 2;
  if (n < 6) return 3;
  let i = 3; // 描述指针
  let j = 4; // 真实字符串指针
  let count = 3; // 1 的个数统计
  let str = "12211"; // 真实的串
  while (j < n - 1) {
    const ch = str[j] === "1" ? "2" : "1";
    const num = Math.min(str[i] | 0, n - j - 1);
    if (ch === "1") {
      if (num === 1) {
        str += "1";
      } else {
        str += "11";
      }
    } else if (num === 1) {
      str += "2";
    } else {
      str += "22";
    }
    j += num;
    i += 1;
    if (ch === "1") count += num;
  }

  console.log(str);
  return count;
};

console.log(magicalString(13)); // 1221121221221121122
console.log(magicalString(6));
console.log(magicalString(7));
console.log(magicalString(15));
console.log(magicalString(20)); // 1221121221221121122
