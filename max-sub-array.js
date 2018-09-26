const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const init = str => str.split(" ").map(x => +x || 0);

const getMid = (left, right) => Math.floor((left + right) / 2);

/**
 * 思路：前i项求和，找到最大值和最小值
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

  console.log("sum = %s", JSON.stringify(sum, null, 2));
  sum.sort((x, y) => (x.v > y.v ? 1 : -1));
  console.log("sum = %s", JSON.stringify(sum, null, 2));

  const max = sum.pop();
  const min = sum.shift();

  return array.slice(min.pos, max.pos).join(" ");
};

// 计算数组的求和最大子数组
// 1 -2 3 10 -4 7 2 -5
rl.on("line", input => {
  console.log(calc(input.trim()));
});
