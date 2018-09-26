const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const init = str => str.split(" ").map(x => +x || 0);

const getMid = (left, right) => Math.floor((left + right) / 2);

/**
 * 思路：动态规划
 * 1. 记 s[i] 为以 a[i] 结尾的数组中的最大子数组
 * 2. 则 s[i + 1] = max(s[i] + a[i + 1], a[i + 1]);
 * 3. s[0] = a[0]
 * 4. 遍历i: 0 ≤ i ≤ len - 1
 * 5. 动态规划： 最优子问题
 * 6. 时间复杂度: O(n)
 */
const calc = str => {
  const a = init(str);
  const len = a.length;
  let sum = a[0];
  let ret = sum;
  let start = 0;
  let end = 0;
  for (let i = 1; i < len; i += 1) {
    if (sum > 0) {
      sum += a[i];
    } else {
      start = i;
      sum = a[i];
    }
    if (sum > ret) {
      end = i;
      ret = sum;
    }
  }
  return a.slice(start, end + 1).join(" ");
};

// 计算数组的求和最大子数组
// 1 -22 3 -3 10 -1 7 -6 8
rl.on("line", input => {
  console.log(calc(input.trim()));
});
