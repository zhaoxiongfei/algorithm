/**
 * @param {number[][]} points
 * @param {number} K
 * @return {number[][]}
 */
const kClosest = (points, K) => {
  const distances = [];
  for (let i = 0; i < points.length; i += 1) {
    const p = points[i];
    distances[i] = [i, p[0] * p[0] + p[1] * p[1]];
  }

  const ans = [];
  distances.sort((a, b) => a[1] - b[1]);
  for (let i = 0; i < K; i += 1) {
    ans.push(points[distances[i][0]]);
  }

  return ans;
};

console.log(kClosest([[1, 3], [-2, 2]], 1));
