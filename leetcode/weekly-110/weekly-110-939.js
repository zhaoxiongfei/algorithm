/**
 * @param {number[][]} points
 * @return {number}
 */
const minAreaRect = points => {
  const { length } = points;
  const mapX = {};
  const mapY = {};

  const dp = Array(length);

  for (const [x, y] of points) {
    if (!mapX[x]) mapX[x] = new Set();
    if (!mapY[y]) mapY[y] = new Set();
    mapX[x].add(y);
    mapY[y].add(x);
  }

  for (let i = 0; i < length; i += 1) {
    dp[i] = Array(length).fill(Infinity);
    const [x1, y1] = points[i];
    for (let j = i + 1; j < length; j += 1) {
      const [x2, y2] = points[j];
      if (x2 === x1 || y1 === y2) continue;
      if (!mapX[x1].has(y2) || !mapY[y1].has(x2)) continue;
      dp[i][j] = Math.abs((x2 - x1) * (y2 - y1));
    }
  }

  const ans = Math.min(...dp.map(x => Math.min(...x)));
  return ans === Infinity ? 0 : ans;
};

// console.log(minAreaRect([[1, 1], [1, 3], [3, 1], [3, 3], [4, 1], [4, 3]]));
console.log(
  minAreaRect([[3, 2], [3, 1], [4, 4], [1, 1], [4, 3], [0, 3], [0, 2], [4, 0]])
);
