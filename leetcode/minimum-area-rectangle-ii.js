// https://leetcode-cn.com/problems/minimum-area-rectangle-ii/
// 963. 最小面积矩形 II

/**
 * @param {number[][]} points
 * @return {number}
 */
const minAreaFreeRect = points => {
  const { length } = points;
  const set = new Set(points.map(x => x.join("_")));

  let ans = Infinity;
  const rightTriangle = (...p) => {
    for (let i = 0; i < 3; i += 1) {
      const q = p[(i + 1) % 3];
      p[i].other = q;
      const dx = p[i][0] - q[0];
      const dy = p[i][1] - q[1];
      p[i].adge = dx * dx + dy * dy;
    }

    p.sort((a, b) => a.adge - b.adge);
    // 如果不是直接三角形，直接退出，通过勾股定理判断
    if (p[2].adge !== p[0].adge + p[1].adge) return;

    // 找到直角点
    let t;
    if (p[0] === p[1].other) t = p[0];
    if (p[1] === p[0].other) t = p[1];

    // 开始寻找第四点, 先找到斜边上的中点
    const c1 = [(p[2][0] + p[2].other[0]) / 2, (p[2][1] + p[2].other[1]) / 2];
    const p4 = [c1[0] - (t[0] - c1[0]), c1[1] + (c1[1] - t[1])];

    if (!set.has(p4.join("_"))) {
      // console.log("p4 non-exists: p: %s, p4: %s, t: %s, c1: %s", p, p4, t, c1);
      return;
    }
    const area = Math.sqrt(p[0].adge * p[1].adge);
    if (area < ans) ans = area;
  };

  for (let i = 0; i < length; i += 1) {
    const p1 = points[i];
    for (let j = i + 1; j < length; j += 1) {
      const p2 = points[j];
      for (let k = j + 1; k < length; k += 1) {
        const p3 = points[k];
        rightTriangle(p1, p2, p3);
      }
    }
  }

  return ans === Infinity ? 0 : ans;
};

console.log(minAreaFreeRect([[1, 2], [2, 1], [1, 0], [0, 1]]));
console.log(minAreaFreeRect([[0, 1], [2, 1], [1, 1], [1, 0], [2, 0]]));
console.log(minAreaFreeRect([[0, 3], [1, 2], [3, 1], [1, 3], [2, 1]]));
console.log(
  minAreaFreeRect([
    [3, 1],
    [1, 1],
    [0, 1],
    [2, 1],
    [3, 3],
    [3, 2],
    [0, 2],
    [2, 3]
  ])
);
