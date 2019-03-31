const parent = Symbol("parent");

class UnionFind {
  constructor(size) {
    this[parent] = Array(size);
    for (let i = 0; i < size; i += 1) {
      this[parent][i] = i;
    }
    this.size = size;
  }

  find(p) {
    if (p !== this[parent][p]) {
      this[parent][p] = this.find(this[parent][p]);
    }
    return this[parent][p];
  }

  union(p, q) {
    const pP = this.find(p);
    const qP = this.find(q);
    if (pP === qP) return;
    this[parent][pP] = qP;
    this.size -= 1;
  }

  isConnected(p, q) {
    return this.find(p) === this.find(q);
  }

  toString() {
    const map = new Map();
    for (let id = 0; id < this[parent].length; id += 1) {
      const p = this.find(id);
      map.set(p, (map.get(p) || new Set()).add(id));
    }
    const strs = [];
    for (const [id, ids] of map) {
      strs.push(`Set: ${id}, included: ${Array.from(ids).join(", ")}`);
    }

    return strs.join("\n");
  }
}

/**
 * @param {number[][]} A
 * @return {number}
 */
const numEnclaves = A => {
  const m = A.length;
  const n = A[0].length;

  const top = m * n;
  const uf = new UnionFind(m * n + 1);
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (A[i][j] === 0) continue;
      const curr = i * n + j;
      if (i === 0) {
        // 上
        uf.union(top, curr);
      } else if (A[i - 1][j]) {
        uf.union((i - 1) * n + j, curr);
      }
      if (i === m - 1) {
        // 下
        uf.union(top, curr);
      } else if (A[i + 1][j]) {
        uf.union((i + 1) * n + j, curr);
      }

      if (j === 0) {
        // 左
        uf.union(top, curr);
      } else if (A[i][j - 1]) {
        uf.union(i * n + j - 1, curr);
      }

      if (j === n - 1) {
        // 右
        uf.union(top, curr);
      } else if (A[i][j + 1]) {
        uf.union(i * n + j + 1, curr);
      }
    }
  }

  let count = 0;
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (A[i][j] && !uf.isConnected(top, i * n + j)) count += 1;
    }
  }

  return count;
};

console.log(
  numEnclaves([
    [0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0],
    [1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1]
  ])
);

/*
console.log(
  numEnclaves([[0, 0, 0, 0], [1, 0, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]])
);
console.log(
  numEnclaves([[0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]])
);
*/
