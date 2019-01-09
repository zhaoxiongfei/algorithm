// https://leetcode-cn.com/problems/couples-holding-hands/
// No 765. 情侣牵手

/**
  N 对情侣坐在连续排列的 2N 个座位上，想要牵到对方的手。
  计算最少交换座位的次数，以便每对情侣可以并肩坐在一起。
  一次交换可选择任意两人，让他们站起来交换座位。

  人和座位用 0 到 2N-1 的整数表示，情侣们按顺序编号，
  第一对是 (0, 1)，第二对是 (2, 3)，以此类推，最后一对是 (2N-2, 2N-1)。

  这些情侣的初始座位  row[i] 是由最初始坐在第 i 个座位上的人决定的。

  示例 1:

  输入: row = [0, 2, 1, 3]
  输出: 1
  解释: 我们只需要交换row[1]和row[2]的位置即可。
  示例 2:

  输入: row = [3, 2, 0, 1]
  输出: 0
  解释: 无需交换座位，所有的情侣都已经可以手牵手了。
  说明:

  len(row) 是偶数且数值在 [4, 60]范围内。
  可以保证row 是序列 0...len(row)-1 的一个全排列。
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
}

/**
 * @param {number[]} row
 * @return {number}
 */
// 思路: 贪心算法
const minSwapsCouples = row => {
  const { length } = row;

  for (let i = 0; i < length; i += 1) {
    row[i] -= row[i] % 2;
  }

  console.log(row);
  let count = 0;
  for (let i = 0; i < length; i += 2) {
    if (row[i] === row[i + 1]) continue;
    for (let j = i + 2; j < length; j += 1) {
      if (row[i] === row[j]) {
        count += 1;
        const t = row[i + 1];
        row[i + 1] = row[j];
        row[j] = t;
        break;
      }
    }
  }

  return count;
};

/**
 * @param {number[]} row
 * @return {number}
 */
// 思路: 并查集
const minSwapsCouples1 = row => {
  const { length } = row;

  const n = length >> 1;
  const uf = new UnionFind(n);
  for (let i = 0; i < n; i += 1) {
    const p = row[i * 2];
    const q = row[i * 2 + 1];
    uf.union(p >> 1, q >> 1);
  }

  return n - uf.size;
};

console.log(minSwapsCouples([0, 2, 1, 3]));
console.log(minSwapsCouples1([0, 2, 1, 3]));
// console.log(minSwapsCouples([3, 2, 0, 1]));
