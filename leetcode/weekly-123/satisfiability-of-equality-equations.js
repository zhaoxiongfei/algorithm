/**
 * @param {string[]} equations
 * @return {boolean}
 */
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

const equationsPossible = equations => {
  const uf = new UnionFind(26);
  const ne = [];
  for (const k of equations) {
    const op = k.slice(1, 3);
    if (op === "==") {
      const [x, y] = k.split("==");
      uf.union(x.charCodeAt() - 97, y.charCodeAt() - 97);
    } else {
      const [x, y] = k.split("!=");
      ne.push([x.charCodeAt() - 97, y.charCodeAt() - 97]);
    }
  }

  for (const x of ne) {
    if (x[0] === x[1]) return false;
    if (uf.isConnected(x[0], x[1])) return false;
  }

  return true;
};

console.log(equationsPossible(["e==d", "e==a", "f!=d", "b!=c", "a==b"]));
console.log(equationsPossible(["c==c", "f!=a", "f==b", "b==c"]));
console.log(equationsPossible(["a==b", "b!=a"]));
console.log(equationsPossible(["b==a", "a==b"]));
console.log(equationsPossible(["a==b", "b==c", "a==c"]));
console.log(equationsPossible(["a==b", "b!=c", "c==a"]));
console.log(equationsPossible(["c==c", "b==d", "x!=z"]));
