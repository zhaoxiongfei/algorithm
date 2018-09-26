const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const init = str => str.split(" ").map(x => +x || 0);

const getMid = (left, right) => Math.floor((left + right) / 2);

/**
 * 思路：动态规划
 * 1. 记 s[i] 为以 a[i] 结尾的数组中的最大子连续数组
 * 2. 则 s[i + 1] = max(s[i] + a[i + 1], a[i + 1]);
 * 3. s[0] = a[0]
 * 4. 遍历i: 0 ≤ i ≤ len - 1
 * 5. 动态规划： 最优子问题
 * 6. 时间复杂度: O(n)
 */
const calc = str => {
  const a = init(str);
  const len = a.length;
  let curr = {
    last: a[0],
    start: 0,
    end: 0,
    length: 1
  };
  let other = {
    start: 0,
    end: 0,
    length: 1
  };
  for (let i = 1; i < len; i += 1) {
    if (a[i] === curr.last + 1) {
      curr.length += 1;
      curr.last = a[i];
      curr.end = i;
    } else {
      if (other.length < curr.length) other = curr;
      curr = {
        last: a[i],
        start: i,
        end: i,
        length: 1
      };
    }
  }
  if (other.length < curr.length) {
    return a.slice(curr.start, curr.end + 1).join(" ");
  }
  return a.slice(other.start, other.end + 1).join(" ");
};

// 计算数组中的最长连续子数组
// 1 2 3 34 56 57 58 59 60 61 99 121
rl.on("line", input => {
  console.log(calc(input.trim()));
});
