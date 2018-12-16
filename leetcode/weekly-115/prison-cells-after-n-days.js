// https://leetcode-cn.com/contest/weekly-contest-115/problems/prison-cells-after-n-days/

/**
 * @param {number[]} cells
 * @param {number} N
 * @return {number[]}
 */
const prisonAfterNDays = (cells, N) => {
  const { length } = cells;
  N %= 252;
  while ((N -= 1) >= 0) {
    const origin = cells.slice();
    for (let i = 0; i < length; i += 1) {
      cells[i] = origin[i - 1] === origin[i + 1] ? 1 : 0;
    }
  }

  return cells;
};

console.log(prisonAfterNDays([0, 1, 0, 1, 1, 0, 0, 1], 1));
console.log(prisonAfterNDays([0, 1, 0, 1, 1, 0, 0, 1], 253));
