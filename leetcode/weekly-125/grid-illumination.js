/**
 * @param {number} N
 * @param {number[][]} lamps
 * @param {number[][]} queries
 * @return {number[]}
 */
const gridIllumination = (N, lamps, queries) => {
  const mapX = new Map();
  const mapY = new Map();
  const mapZ = new Map();
  const mapQ = new Map();
  for (const [x, y] of lamps) {
    mapX.set(x, (mapX.get(x) || new Set()).add(y));
    mapY.set(y, (mapY.get(y) || new Set()).add(x));
    mapZ.set(x - y, (mapZ.get(x - y) || new Set()).add(`${x}_${y}`));
    mapQ.set(x + y, (mapQ.get(x + y) || new Set()).add(`${x}_${y}`));
  }

  const close = (x, y) => {
    if (mapX.get(x)) {
      mapX.get(x).delete(y);
      if (mapX.get(x).size === 0) mapX.delete(x);
    }
    if (mapY.get(y)) {
      mapY.get(y).delete(x);
      if (mapY.get(y).size === 0) mapY.delete(y);
    }
    if (mapZ.get(x - y)) {
      mapZ.get(x - y).delete(`${x}_${y}`);
      if (mapZ.get(x - y).size === 0) mapZ.delete(x - y);
    }
    if (mapQ.get(x + y)) {
      mapQ.get(x + y).delete(`${x}_${y}`);
      if (mapQ.get(x + y).size === 0) mapQ.delete(x + y);
    }
  };

  const ans = [];
  for (const [x, y] of queries) {
    let status = 0;
    if (mapX.has(x) || mapY.has(y) || mapZ.has(x - y) || mapQ.has(x + y)) {
      status = 1;
    }

    close(x, y);
    close(x - 1, y);
    close(x - 1, y + 1);
    close(x, y + 1);
    close(x + 1, y + 1);
    close(x + 1, y);
    close(x + 1, y - 1);
    close(x, y - 1);
    close(x - 1, y - 1);

    ans.push(status);
  }

  return ans;
};

// console.log(gridIllumination(5, [[0, 0], [4, 4]], [[1, 1], [1, 0]]));
console.log(
  gridIllumination(
    10,
    [[6, 9], [1, 1], [2, 6], [2, 9], [4, 1], [8, 9], [0, 4], [9, 9], [7, 3]],
    [[5, 5], [9, 5], [8, 2], [3, 3]]
  )
);
