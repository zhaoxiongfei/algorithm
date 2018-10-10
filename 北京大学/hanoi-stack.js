const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const init = str => Math.min(20, Math.max(1, str | 0));

const hanoi = (n, src, mid, dest) => {
  const steps = []; // 记录问题的拆分方案
  steps.push({ n, src, mid, dest });
  while (steps.length) {
    const step = steps.pop();
    if (step.n === 1) {
      console.log("%s -> %s", step.src, step.dest);
    } else {
      steps.push({
        n: step.n - 1,
        src: step.mid,
        mid: step.src,
        dest: step.dest
      });
      steps.push({ n: 1, src: step.src, mid: step.mid, dest: step.dest });
      steps.push({
        n: step.n - 1,
        src: step.src,
        mid: step.dest,
        dest: step.mid
      });
    }
  }
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
