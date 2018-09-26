const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const init = str => str.split(" ").map(x => +x || 0);

const getMid = (left, right) => Math.floor((left + right) / 2);

/**
 * 思路：高原数组、折半查找，二分法思想
 */
const calc = str => {
  const array = init(str);
  const len = array.length;
  const sum = [{ v: 0, pos: 0 }];
  for (let i = 0; i < len; i += 1) {
    sum[i + 1] = {
      pos: i + 1,
      v: sum[i].v + array[i]
    };
  }

  // console.log("sum = %s", JSON.stringify(sum, null, 2));
  sum.sort((x, y) => (x.v > y.v ? 1 : -1));
  let ret = Math.abs(sum[1].v - sum[0].v); // 记录最接近0的值
  let start = 0; // 记录求和最接近0的子数组起始偏移量
  let end = 1; // 记录求和最接近0的子数组结束偏移量
  for (let i = 1; i < len; i += 1) {
    const diff = Math.abs(sum[i + 1].v - sum[i].v);
    if (diff < ret) {
      ret = diff;
      start = sum[i].pos;
      end = sum[i + 1].pos;
    }
  }

  // console.log("sum = %s", JSON.stringify(sum, null, 2));
  return array.slice(start, end).join(" ");
};

// 计算数组的一个求和最接近0的连续子数组
// 1 -2 3 10 -4 7 2 -5
rl.on("line", input => {
  console.log(calc(input.trim()));
});
