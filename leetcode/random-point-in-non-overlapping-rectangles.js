// https://leetcode-cn.com/problems/random-point-in-non-overlapping-rectangles/
// No 497. 非重叠矩形中的随机点

/**
  给定一个非重叠轴对齐矩形的列表 rects，写一个函数 pick 随机均匀地选取矩形覆盖的空间中的整数点。

  提示：

  整数点是具有整数坐标的点。
  矩形周边上的点包含在矩形覆盖的空间中。
  第 i 个矩形 rects [i] = [x1，y1，x2，y2]，其中 [x1，y1] 是左下角的整数坐标，[x2，y2] 是右上角的整数坐标。
  每个矩形的长度和宽度不超过 2000。
  1 <= rects.length <= 100
  pick 以整数坐标数组 [p_x, p_y] 的形式返回一个点。
  pick 最多被调用10000次。


  示例 1：

  输入:
  ["Solution","pick","pick","pick"]
  [[[[1,1,5,5]]],[],[],[]]
  输出:
  [null,[4,1],[4,1],[3,3]]
  示例 2：

  输入:
  ["Solution","pick","pick","pick","pick","pick"]
  [[[[-2,-2,-1,-1],[1,0,3,0]]],[],[],[],[],[]]
  输出:
  [null,[-1,-2],[2,0],[-2,-1],[3,0],[-2,-2]]


  输入语法的说明：

  输入是两个列表：调用的子例程及其参数。Solution 的构造函数有一个参数，即矩形数组 rects。pick 没有参数。参数总是用列表包装的，即使没有也是如此。
 */

/**
 * @param {number[][]} rects
 */
// 思路: 要计算各个矩形的面积之比，面积越大的被选中的概率应该越高
function Solution(rects) {
  const { length } = rects;
  const range = Array(length);

  for (let i = 0; i < length; i += 1) {
    const x = rects[i];
    const size = (x[2] - x[0] + 1) * (x[3] - x[1] + 1);
    const start = range[i - 1] ? range[i - 1][1] + 1 : 0;
    range[i] = [start, start + size - 1];
  }

  const total = range[range.length - 1][1] + 1;
  console.log(total);

  console.log(range);
  const binSearch = (e, lo = 0, hi = length) => {
    while (lo < hi) {
      const mi = (lo + hi) >> 1; // 寻找中点
      // 经比较后确认深入 [lo, mi) 或 [mi + 1, hi)
      if (e < range[mi][0]) hi = mi;
      else lo = mi + 1;
    }
    return lo - 1;
  };

  const hash = Array(length).fill(0);

  /**
   * @return {number[]}
   */
  const pick = () => {
    const index = binSearch((Math.random() * total) | 0);
    hash[index] += 1;
    const rect = rects[index];
    const w = rect[2] - rect[0];
    const h = rect[3] - rect[1];
    const dx = (Math.random() * (w + 1)) | 0;
    const dy = (Math.random() * (h + 1)) | 0;

    return [rect[0] + dx, rect[1] + dy];
  };

  const stats = () => hash.map(x => x / 10000);

  return { pick, stats };
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = Object.create(Solution).createNew(rects)
 * var param_1 = obj.pick()
 */
// const instance = new Solution([[1, 1, 5, 5]]);
// const instance = new Solution([[-2, -2, -1, -1], [1, 0, 3, 0]]);
const instance = new Solution([
  /*
  [-58953616, -40483558, -58953446, -40482555],
  [76369640, 94978791, 76371036, 94979394],
  [80970826, -37466957, 80971657, -37466388],
  [-79821573, -4177978, -79820536, -4177925]
  */

  [82918473, -57180867, 82918476, -57180863],
  [83793579, 18088559, 83793580, 18088560],
  [66574245, 26243152, 66574246, 26243153],
  [72983930, 11921716, 72983934, 11921720]
]);

for (let i = 0; i < 300000; i += 1) {
  instance.pick();
}
console.log(instance.stats());
