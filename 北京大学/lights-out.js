const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const init = str => str.split(" ").map(x => x | 0);

/**
 * 思路：枚举验证，有效到大
 * 数学思想: 素数不能被比它小的任一素数整除 (这样验证空间小了很多)
 */
const calc = str => {
  const [money, chicken] = init(str);
  const resolve = [];
  for (let x = 0; x <= chicken; x += 1) {
    for (let y = 0; y <= chicken - x; y += 1) {
      const z = chicken - x - y;
      if (x * 5 + y * 3 + z / 3 === money) resolve.push([x, y, z]);
    }
  }
  return resolve.map(x => x.join("\t")).join("\n");
};

// 熄灯问题, 按下按钮，本身会改变，以及周围四盏灯状态改变
// 输入： 代表对应灯的状态
// 1 0 1 0 1 0
// 0 0 0 1 0 0
// 0 0 1 0 0 0
// 0 1 0 1 0 0
// 1 0 0 0 1 0
// 输出: 代表对应灯是否要按下
// 1 0 1 0 1 0
// 0 0 0 1 0 0
// 0 0 1 0 0 0
// 0 1 0 1 0 0
// 1 0 0 0 1 0
// 依次输出鸡翁 鸡母 鸡雏个数，空格分隔
rl.on("line", input => {
  console.log(calc(input.trim()));
});
