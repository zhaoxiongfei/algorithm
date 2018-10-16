const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const init = str => str.split(" ").map(x => x | 0);

// “我为人人” 的更新思路
// 发现后面有比我大的值，后面的就 +1
const lcs = list => {
  const { length } = list;
  const maxLen = []; // 记录每个位置对应的最大上升子串的长度, 初始值均为 1, 只有本身
  maxLen.length = length;
  maxLen.fill(1);

  for (let i = 0; i < length; i += 1) {
    for (let j = i + 1; j < length; j += 1) {
      if (list[j] > list[i]) {
        maxLen[j] = Math.max(maxLen[j], maxLen[i] + 1);
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
