const parent = Symbol('parent');

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
      strs.push(`Set: ${id}, included: ${Array.from(ids).join(', ')}`);
    }

    return strs.join('\n');
  }
}

module.exports = UnionFind;
