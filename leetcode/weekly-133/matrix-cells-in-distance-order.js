/**
 * @param {number} R
 * @param {number} C
 * @param {number} r0
 * @param {number} c0
 * @return {number[][]}
 */
const allCellsDistOrder = (R, C, r0, c0) => {
  const list = [];
  for (let i = 0; i < R; i += 1) {
    for (let j = 0; j < C; j += 1) {
      const item = [i, j];
      item.d = Math.abs(r0 - i) + Math.abs(c0 - j);
      list.push(item);
    }
  }

  list.sort((a, b) => a.d - b.d);
  return list;
};

console.log(allCellsDistOrder(1, 2, 0, 0));
console.log(allCellsDistOrder(2, 2, 0, 1));
console.log(allCellsDistOrder(2, 3, 1, 2));
