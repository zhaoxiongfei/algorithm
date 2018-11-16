// https://leetcode-cn.com/problems/different-ways-to-add-parentheses/description/
// No 241. 为运算表达式设计优先级

/**
  给定一个含有数字和运算符的字符串，为表达式添加括号，改变其运算优先级以求出不同的结果。你需要给出所有可能的组合的结果。有效的运算符号包含 +, - 以及 * 。

  示例 1:

  输入: "2-1-1"
  输出: [0, 2]
  解释:
  ((2-1)-1) = 0
  (2-(1-1)) = 2
  示例 2:

  输入: "2*3-4*5"
  输出: [-34, -14, -10, -10, 10]
  解释:
  (2*(3-(4*5))) = -34
  ((2*3)-(4*5)) = -14
  ((2*(3-4))*5) = -10
  (2*((3-4)*5)) = -10
  (((2*3)-4)*5) = 10
 */

const digitSet = new Set([
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "."
]);
const isDigit = ch => digitSet.has(ch);
const calcu = {
  "+": (n1, n2) => n1 + n2, // 加法
  "-": (n1, n2) => n1 - n2, // 减法
  "*": (n1, n2) => n1 * n2 // 乘法
};

const diffWaysToCompute = (input, start = 0, end = input.length) => {
  const ans = [];
  let n = input[start];
  for (let i = start + 1; i < end; i += 1) {
    const ch = input[i];
    if (isDigit(ch)) {
      n += ch;
      continue;
    }
    n = "";
    const left = diffWaysToCompute(input, start, i);
    const right = diffWaysToCompute(input, i + 1, end);
    for (const l of left) {
      for (const r of right) {
        ans.push(calcu[ch](l, r));
      }
    }
  }

  if (!ans.length) ans.push(+n);

  return ans;
};

/**
 * @param {string} input
 * @return {number[]}
 */
// 思路: 遇到操作符号就分隔为两部分

console.log(diffWaysToCompute("2-1-1"));
console.log(diffWaysToCompute("2*3-4*5"));
