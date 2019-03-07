// https://leetcode-cn.com/problems/solve-the-equation/
// No 640. 求解方程

const parse = str => {
  const stack = ["+"];
  const value = [0, 0]; // 左侧的值 第一项是 x 的系数，第二项是常数

  const intSet = new Set(Array.from("0123456789"));
  let num = null;
  for (const ch of str) {
    if (ch === "+" || ch === "-") {
      const op = stack.pop();
      if (op === "+") {
        value[1] += num | 0;
      } else {
        value[1] -= num | 0;
      }
      num = null;
      stack.push(ch);
      continue;
    }
    if (ch === "x") {
      const op = stack.pop();
      if (num === null) num = 1;
      if (op === "+") {
        value[0] += num | 0;
      } else {
        value[0] -= num | 0;
      }
      num = null;
      continue;
    }
    if (intSet.has(ch)) {
      num = (num | 0) * 10 + +ch;
    }
  }
  if (num) {
    const op = stack.pop();
    if (op === "+") {
      value[1] += num | 0;
    } else {
      value[1] -= num | 0;
    }
  }

  return value;
};

/**
 * @param {string} equation
 * @return {string}
 */
const solveEquation = equation => {
  const e = equation.split("=");
  const left = parse(e[0]);
  const right = parse(e[1]);

  const ratio = left[0] - right[0];
  const constant = right[1] - left[1];

  if (ratio === 0 && constant === 0) return "Infinite solutions";
  if (ratio === 0 && constant !== 0) return "No solution";
  return `x=${constant / ratio}`;
};

console.log(solveEquation("0x=0"));
console.log(solveEquation("x+5-3+x=6+x-2"));
console.log(solveEquation("x=x"));
console.log(solveEquation("2x=x"));
console.log(solveEquation("2x+3x-6x=x+2"));
console.log(solveEquation("x=x+2"));
