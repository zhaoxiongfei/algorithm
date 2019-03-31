// https://leetcode-cn.com/problems/the-skyline-problem/description/
// No 218. 天际线问题

/**
  城市的天际线是从远处观看该城市中所有建筑物形成的轮廓的外部轮廓。
  现在，假设您获得了城市风光照片（图A）上显示的所有建筑物的位置和高度，
  请编写一个程序以输出由这些建筑物形成的天际线（图B）。

  Buildings  Skyline Contour
  每个建筑物的几何信息用三元组 [Li，Ri，Hi] 表示，
  其中 Li 和 Ri 分别是第 i 座建筑物左右边缘的 x 坐标，Hi 是其高度。
  可以保证 0 ≤ Li, Ri ≤ INT_MAX, 0 < Hi ≤ INT_MAX 和 Ri - Li > 0。
  您可以假设所有建筑物都是在绝对平坦且高度为 0 的表面上的完美矩形。

  例如，图A中所有建筑物的尺寸记录为：[ [2 9 10], [3 7 15], [5 12 12], [15 20 10], [19 24 8] ] 。

  输出是以 [ [x1,y1], [x2, y2], [x3, y3], ... ] 格式的“关键点”（图B中的红点）的列表，它们唯一地定义了天际线。
  关键点是水平线段的左端点。请注意，最右侧建筑物的最后一个关键点仅用于标记天际线的终点，并始终为零高度。
  此外，任何两个相邻建筑物之间的地面都应被视为天际线轮廓的一部分。

  例如，图B中的天际线应该表示为：[ [2 10], [3 15], [7 12], [12 0], [15 10], [20 8], [24, 0] ]。

  说明:

  任何输入列表中的建筑物数量保证在 [0, 10000] 范围内。
  输入列表已经按升序排列在左边的 x 位置 Li 。
  输出列表必须按 x 位排序。
  输出天际线中不得有连续的相同高度的水平线。
    例如 [...[2 3], [4 5], [7 5], [11 5], [12 7]...] 是不正确的答案；
    三条高度为 5 的线应该在最终输出中合并为一个：[...[2 3], [4 5], [12 7], ...]
 */

/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */
// 思路: 数个夜晚的思索，终于想明白了。
/**
  1. 按照起点坐标依次处理起点(给定的数据恰好就是排序后的)
  2. 定义两个有序向量，endings, talls 记录已处理的建筑，分别按照结束坐标降序和高度降序排列
  3. 每处理一个建筑的起点坐标前都需要检查是否有不大于当前起点坐标的结束坐标, 从小到大一次处理，因为endings 是结束坐标降序的，所以从后往前处理即可
    1. 每处理一个结束坐标都需要判断当前处理的结束坐标是否为高度最大(talls的第一项)
      1. 如果是则记录一个轮廓点
        1. 这里需要和记录里最后一条比较，
        2. 如果x坐标相同，则保留更小的高度值
        3. 如果x坐标不同，则插入新的坐标和高度对儿
      2. 如果不是talls的第一项，说明有其他的建筑挡住了它，忽略即可
    2. 处理完毕后从endings删除该项(因为endings是结束坐标降序的，因此只要修改endings的size即可)
    3. 删除 talls 里对应的该项
    4. 比较当前处理的建筑的高度和目前talls里的最高建筑（talls[0][2])
      1. 如果当前的高度比talls里最高的低，则改起始点被遮挡，无须记录
      2. 反之，如果当前的高度比talls的最高高度仍然高, 则记录一个起始类型的轮廓点
        1. 这里依然需要合记录里最后一条做比较
        2. 如果x坐标相同，则保留更大的高度值
        3. 如果x坐标不相同，则插入新的坐标和高度对儿
    5. endings, talls 分别插入当前处理的建筑(他俩分别需要维持各自的顺序)
  4. 处理完毕后将endings里的多余的数据按照 3.1， 3.2， 3.3 的代码依次执行
 */
const getSkyline = buildings => {
  const { length } = buildings;
  const landline = [-Infinity, Infinity, 0];
  const endings = [landline]; // 存放结束点, 以结束点坐标降序排列
  const talls = [landline]; // 存放目前为止的最高边, 以高度降序排列

  endings.insert = item => {
    let i = 0;
    while (i < endings.length && item[1] < endings[i][1]) i += 1;
    endings.splice(i, 0, item);
  };

  talls.insert = item => {
    let i = 0;
    while (i < talls.length && item[2] < talls[i][2]) i += 1;
    talls.splice(i, 0, item);
  };

  const ans = [];
  for (let i = 0; i < length; i += 1) {
    const item = buildings[i];
    for (let e = endings.length - 1; 0 <= e; e -= 1) {
      const ending = endings[e];
      const x = ending[1];
      if (item[0] < x) break;
      if (x < item[0] && ending === talls[0]) {
        const y = talls[1][2];
        const last = ans[ans.length - 1];
        if (last && last[0] === x) {
          last[1] = Math.min(last[1], y);
        } else {
          ans.push([x, y]);
        }
      }
      talls.splice(talls.indexOf(ending), 1);
      endings.length -= 1;
    }

    if (talls[0][2] < item[2]) {
      const last = ans[ans.length - 1];
      if (last && last[0] === item[0]) {
        last[1] = Math.max(last[1], item[2]);
      } else if (!last || last[1] !== item[2]) {
        ans.push([item[0], item[2]]);
      }
    }

    endings.insert(item);
    talls.insert(item);
  }

  while (1 < endings.length) {
    const ending = endings.pop();
    const x = ending[1];
    if (ending === talls[0]) {
      const y = talls[1][2];
      const last = ans[ans.length - 1];
      if (last && last[0] === x) {
        last[1] = Math.min(last[1], y);
      } else {
        ans.push([x, y]);
      }
    }
    talls.splice(talls.indexOf(ending), 1);
  }

  return ans;
};

console.log(
  // getSkyline([[2, 9, 10], [3, 7, 15], [5, 12, 12], [15, 20, 10], [19, 24, 8]])
  // getSkyline([[0, 2, 3], [2, 5, 3]])
  getSkyline([[1, 2, 1], [1, 2, 2], [1, 2, 3]])
);
