const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const init = str => str.split(" ").map(x => x | 0);

const lcs = list => {
  const { length } = list;
  const maxLen = []; // 记录每个位置对应的最大上升子串的长度, 初始值均为 1, 只有本身
  maxLen.length = length;
  maxLen.fill(1);

  for (let i = 1; i < length; i += 1) {
    for (let j = 0; j < i; j += 1) {
      if (list[i] > list[j]) {
        maxLen[i] = Math.max(maxLen[i], maxLen[j] + 1);
      }
    }
  }

  return Math.max(...maxLen);
};

const calc = str => {
  const list = init(str);
  return lcs(list);
};

// 计算最长上升子序列的长度
// 输入：空格隔开的若干数字
rl.on("line", input => {
  console.log(calc(input.trim()));
});
