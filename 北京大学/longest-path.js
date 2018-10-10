const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const init = str => str.split(" ").map(x => x | 0);

const update = (matrix, x, y, longest, height) => {
  if (matrix[y] == null) return;
  if (matrix[y][x] == null) return;
  if (matrix[y][x].height <= height) return;
  matrix[y][x].longest = longest + 1;
};

const updateLongest = (matrix, sorted, idx) => {
  const point = sorted[idx];
  if (!point) return;
  const { x, y, height } = point;
  // 如果未设置最大路径值，则设置为 1
  if (!point.longest) point.longest = 1;
  // 更新周围比当前点高的的最大路径，为当前最大路径 +1
  update(matrix, x - 1, y, point.longest, height); // 左侧
  update(matrix, x + 1, y, point.longest, height); // 右侧
  update(matrix, x, y - 1, point.longest, height); // 上面
  update(matrix, x, y + 1, point.longest, height); // 下面
  updateLongest(matrix, sorted, idx + 1);
};

const calc = matrix => {
  const sorted = [];
  for (let y = 0; y < matrix.length; y += 1) {
    const line = matrix[y];
    for (let x = 0; x < line.length; x += 1) {
      matrix[y][x] = { x, y, height: line[x] };
      sorted.push(matrix[y][x]);
    }
  }
  sorted.sort((a, b) => (a.height > b.height ? 1 : -1));
  updateLongest(matrix, sorted, 0);
  return sorted.sort((a, b) => (a.longest > b.longest ? -1 : 1));
};

// 给出一个矩阵，数字值代表该点的高度，求该地图的最大滑雪路径的长度
// 输入：数字矩阵，每行内的数字用空格分隔
// 输出：最大路径的值坐标序列，有高到底, 逗号分隔，每行一个坐标
const matrix = [];
rl.on("line", input => {
  matrix.push(init(input.trim()));
});

rl.on("close", () => {
  console.log(
    calc(matrix)
      .map(({ x, y }) => [x, y].join(","))
      .join("\n")
  );
});
