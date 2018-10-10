const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const init = str => str.split(" ").map(x => x | 0);

const min = (ns, m) => {
  const n = ns.length;
  if (m === 0) return ns.join("") | 0;
  if (n <= m) throw Error("Plus operate too more");

  const values = [];
  for (let i = 0; i < n - m; i += 1) {
    const split = m + i;
    const left = ns.slice(0, split);
    const right = ns.slice(split, n);
    values.push(min(left, m - 1) + (right.join("") | 0));
  }

  return Math.min(...values);
};

const calc = str => {
  const [m, ...ns] = init(str);
  return min(ns, m);
};

// n 个数字，插入 m 个加号，所能形成的表达式的最小值
// 输入：空格隔开的若干数字，第一个是 m, 其余的是 n 个数字
// 输出：所能形成的表达式的最小值
rl.on("line", input => {
  console.log(calc(input.trim()));
});
