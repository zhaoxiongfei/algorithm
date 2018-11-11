// 中缀表达式求值

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
// 优先级字典
const pri = [
  /*         |----------- 当前运算符 -------------|     */
  /*           +    -    *    /    ^    !    (    )     */
  /* -- + */ [">", ">", "<", "<", "<", "<", "<", ">"],
  /* 栈 - */ [">", ">", "<", "<", "<", "<", "<", ">"],
  /* 顶 * */ [">", ">", ">", ">", "<", "<", "<", ">"],
  /* 运 / */ [">", ">", ">", ">", "<", "<", "<", ">"],
  /* 算 ^ */ [">", ">", ">", ">", ">", "<", "<", ">"],
  /* 符 ! */ [">", ">", ">", ">", ">", ">", " ", ">"],
  /* -- ( */ ["<", "<", "<", "<", "<", "<", "<", "="],
  /* -- ) */ [" ", " ", " ", " ", " ", " ", " ", " "]
];

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

const orderBetween = (tr, curr) => pri[ops[tr]][ops[curr]];

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

const calc = str => {
  const string = `${str})`;
  const { length } = string;
  const optr = ["("]; // 操作符栈
  const opnd = []; // 操作数栈
  let i = 0;
  while (i < length) {
    const ch = string[i];
    if (isDigit(ch)) {
      let num = ch;
      while (isDigit(string[(i += 1)])) num += string[i];
      opnd.push(+num);
    } else {
      const priority = orderBetween(optr[optr.length - 1], ch);
      if (priority === "<") {
        // 栈顶运算符优先级更低
        optr.push(ch);
        i += 1;
      } else if (priority === "=") {
        // 只有左右括号才有这个情况
        optr.pop();
        i += 1;
      } else if (priority === ">") {
        // 栈顶运算符优先级更高，可以执行栈顶运算，并将结果入栈
        const op = optr.pop();
        if ("!" === op) {
          // 一元运算符
          opnd.push(calcu[ops[op]](opnd.pop()));
        } else {
          const num2 = opnd.pop();
          const num1 = opnd.pop();
          opnd.push(calcu[ops[op]](num1, num2));
        }
      }
    }
  }
  if (optr.length) throw Error("表达式错误");
  if (opnd.length !== 1) throw Error("表达式有误");
  return opnd[0];
};

console.log(calc("(1+2^3!-4)*(5!-(6-(7-(89-0!))))"));
