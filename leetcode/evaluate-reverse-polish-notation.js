// https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/description/
// No. 150 逆波兰表达式求值

/**
  150. 逆波兰表达式求值
  题目描述提示帮助提交记录社区讨论阅读解答
  根据逆波兰表示法，求表达式的值。

  有效的运算符包括 +, -, *, / 。每个运算对象可以是整数，也可以是另一个逆波兰表达式。

  说明：

  整数除法只保留整数部分。
  给定逆波兰表达式总是有效的。换句话说，表达式总会得出有效数值且不存在除数为 0 的情况。
  示例 1：

  输入: ["2", "1", "+", "3", "*"]
  输出: 9
  解释: ((2 + 1) * 3) = 9
  示例 2：

  输入: ["4", "13", "5", "/", "+"]
  输出: 6
  解释: (4 + (13 / 5)) = 6
  示例 3：

  输入: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]
  输出: 22
  解释:
    ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
  = ((10 * (6 / (12 * -11))) + 17) + 5
  = ((10 * (6 / -132)) + 17) + 5
  = ((10 * 0) + 17) + 5
  = (0 + 17) + 5
  = 17 + 5
  = 22
 */

/**
 * @param {string[]} tokens
 * @return {number}
 */
// 思路: 利用栈，先进后出, 遇到操作符号，弹出前面两个数字
const evalRPN = tokens => {
  const stack = [];
  const ops = new Set(["+", "-", "*", "/"]);
  for (const ch of tokens) {
    if (ops.has(ch)) {
      const n1 = +stack.pop();
      const n2 = +stack.pop();
      if (ch === "+") stack.push(n2 + n1);
      if (ch === "-") stack.push(n2 - n1);
      if (ch === "*") stack.push(n2 * n1);
      if (ch === "/") stack.push(parseInt(n2 / n1, 10));
    } else {
      stack.push(ch);
    }
  }
  return +stack[0];
};

console.log(
  evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"])
);
