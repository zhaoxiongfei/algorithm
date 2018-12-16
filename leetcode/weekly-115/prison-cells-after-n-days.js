// https://leetcode-cn.com/contest/weekly-contest-115/problems/prison-cells-after-n-days/

/**
 * @param {number[]} cells
 * @param {number} N
 * @return {number[]}
 */
const prisonAfterNDays = (cells, N) => {
  const { length } = cells;
  const map = {};
  let day = 0;
  while (day < N) {
    const key = cells.join("");
    if (map[key] !== undefined) {
      const index = map[key] + ((N - day) % (day - map[key]));
      return Object.keys(map)
        [index].split("")
        .map(x => +x);
    }
    map[key] = day;
    for (let i = 0; i < length; i += 1) {
      cells[i] = key[i - 1] === key[i + 1] ? 1 : 0;
    }
    day += 1;
  }

  return cells;
};

console.log(prisonAfterNDays([0, 1, 0, 1, 1, 0, 0, 1], 7));
