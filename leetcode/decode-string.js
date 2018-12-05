// https://leetcode-cn.com/problems/decode-string/description/
// No 394. 字符串解码

/**
  给定一个经过编码的字符串，返回它解码后的字符串。

  编码规则为: k[encoded_string]，
  表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。

  你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，
  且输入的方括号总是符合格式要求的。

  此外，你可以认为原始数据不包含数字，
  所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。

  示例:

  s = "3[a]2[bc]", 返回 "aaabcbc".
  s = "3[a2[c]]", 返回 "accaccacc".
  s = "2[abc]3[cd]ef", 返回 "abcabccdcdcdef".
 */

/**
 * @param {string} s
 * @return {string}
 */
// 类似于计算公式的方式。利用栈，不断的求值
const decodeString = s => {
  const digt = new Set(Array.from("0123456789"));
  const stack = [];
  for (let ch of s) {
    if (ch === "[") {
      stack.push(ch);
      continue;
    }
    if (ch === "]") {
      const chars = stack.pop();
      stack.pop(); // 丢弃掉 [
      const times = stack.pop();
      ch = chars.repeat(times | 0);
    }

    const top = stack[stack.length - 1];
    if (digt.has(ch)) {
      if (Number.isInteger(top)) {
        stack[stack.length - 1] = top * 10 + (ch | 0);
      } else {
        stack.push(ch | 0);
      }
    } else if (top === undefined || top === "[" || Number.isInteger(top)) {
      stack.push(ch);
    } else {
      stack[stack.length - 1] += ch;
    }
  }

  return stack[0] || "";
};

console.log(decodeString("3[a]2[bc]"));
console.log(decodeString("3[a2[c]]"));
console.log(decodeString("2[abc]3[cd]ef"));
