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
  let x = 0; // 鸡翁数量
  let y = 0; // 鸡母数量
  let z = 0; // 鸡雏数量
  const check = () => x * 5 + y * 3 + z / 3 === money;
  for (; x <= chicken; x += 1) {
    for (; y <= chicken; y += 1) {
      z = chicken - x - y;
      if (check()) return [x, y, z];
    }
  }
  throw Error("no resolve");
};

// 百鸡百钱问题
// 源自 张丘建《算经》
// 鸡翁一值钱五，鸡母一值钱三，鸡雏三值钱一。
// 百钱买百鸡，鸡翁、鸡母、鸡雏各几何
// 输入：钱数、鸡数空格分隔
// 依次输出鸡翁 鸡母 鸡雏个数，空格分隔
rl.on("line", input => {
  console.log(calc(input.trim()));
});
