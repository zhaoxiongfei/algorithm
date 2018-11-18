// https://leetcode-cn.com/problems/expression-add-operators/description/
// No 282. 给表达式添加运算符

/**
  给定一个仅包含数字 0-9 的字符串和一个目标值，
  在数字之间添加二元运算符（不是一元）+、- 或 * ，返回所有能够得到目标值的表达式。

  示例 1:

  输入: num = "123", target = 6
  输出: ["1+2+3", "1*2*3"]
  示例 2:

  输入: num = "232", target = 8
  输出: ["2*3+2", "2+3*2"]
  示例 3:

  输入: num = "105", target = 5
  输出: ["1*0+5","10-5"]
  示例 4:

  输入: num = "00", target = 0
  输出: ["0+0", "0-0", "0*0"]
  示例 5:

  输入: num = "3456237490", target = 9191
  输出: []
 */

const helper = (curr, num, target, solution, currRes, prevNum) => {
  // 结果等于目标值，且所有数字消耗殆尽，则记录答案
  if (currRes === target && num.length === 0) {
    solution.push(curr);
    return;
  }

  // 尝试所有可能的拆分情况
  for (let i = 1; i <= num.length; i += 1) {
    const first = num.slice(0, i);
    if (first.length > 1 && first[0] === "0") return;
    const currNum = +first;
    const next = num.slice(i);
    if (curr.length !== 0) {
      // 乘法
      helper(
        `${curr}*${first}`,
        next,
        target,
        solution,
        currRes - prevNum + prevNum * currNum,
        prevNum * currNum
      );
      // 加法
      helper(
        `${curr}+${first}`,
        next,
        target,
        solution,
        currRes + currNum,
        currNum
      );
      // 减法
      helper(
        `${curr}-${first}`,
        next,
        target,
        solution,
        currRes - currNum,
        -currNum
      );
    } else {
      helper(first, next, target, solution, currNum, currNum);
    }
  }
};

/**
 * @param {string} num
 * @param {number} target
 * @return {string[]}
 */
// 思路: 参考自 https://blog.csdn.net/sunyangwei1993/article/details/52199417
const addOperators = (num, target) => {
  const { length } = num;
  if (length === 0) return [];
  if (length === 1) {
    if (+num === target) return [num];
    return [];
  }

  const solution = [];
  helper("", num, target, solution, 0, 0);
  return solution;
};

// console.log(addOperators("123456789", 45));
console.log(addOperators("105", 5));
// console.log(addOperators("232", 8));
console.log(addOperators("3456237490", 9191));
