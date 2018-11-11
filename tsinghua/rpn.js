// 逆波兰表达式求值
//
const ops = {
  "+": 0,
  "-": 1,
  "*": 2,
  "/": 3,
  "^": 4,
  "!": 5,
  "(": 6,
  ")": 7
};
const calcu = [
  (n1, n2) => n1 + n2, // 加法
  (n1, n2) => n1 - n2, // 减法
  (n1, n2) => n1 * n2, // 乘法
  (n1, n2) => n1 / n2, // 除法
  (n1, n2) => n1 ** n2, // 乘方
  n => {
    // 阶乘
    let ans = 1;
    let i = 1;
    while (i <= n) {
      ans *= i;
      i += 1;
    }
    return ans;
  }
];

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

const calcRPN = rpn => {
  const stack = [];
  const { length } = rpn;
  let i = 0;
  while (i < length) {
    const ch = rpn[i];
    if (isDigit(ch)) {
      let num = ch;
      while (isDigit(rpn[(i += 1)])) num += rpn[i];
      stack.push(+num);
      continue;
    } else if ("!" === ch) {
      stack.push(calcu[ops[ch]](stack.pop()));
    } else if (ops[ch] !== undefined) {
      const num2 = stack.pop();
      const num1 = stack.pop();
      stack.push(calcu[ops[ch]](num1, num2));
    }
    i += 1;
  }
  if (stack.length !== 1) throw Error("表达式语法错误");
  return stack[0];
};

const rpn = process.argv[2] || "0 ! 1 + 2 3 ! 4 + ^ * 5 ! 67 - 8 9 + - -";
console.log(calcRPN(rpn));
