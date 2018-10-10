const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const init = str => Math.min(20, Math.max(1, str | 0));

const hanoi = (n, src, mid, dest) => {
  if (n === 1) {
    console.log("%s -> %s", src, dest);
    return;
  }
  hanoi(n - 1, src, dest, mid);
  console.log("%s -> %s", src, dest);
  hanoi(n - 1, mid, src, dest);
};

// A B C 代表三个柱子，要求从 A -> C
const calc = str => {
  const n = init(str);
  hanoi(n, "A", "B", "C");
};

// 汉诺塔问题, 给出具体的走法
// 输入：盘子的数量 n 满足 (1 <= n <= 10)
rl.on("line", input => {
  calc(input.trim());
});
