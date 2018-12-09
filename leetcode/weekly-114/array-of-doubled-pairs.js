// https://leetcode-cn.com/contest/weekly-contest-114/problems/array-of-doubled-pairs/

/**
 * @param {number[]} A
 * @return {boolean}
 */
const canReorderDoubled = A => {
  const { length } = A;
  if (length === 0) return true;
  const map = {};
  for (const n of A) {
    if (!map[n]) map[n] = 0;
    map[n] += 1;
  }

  A.sort((a, b) => Math.abs(a) - Math.abs(b));
  for (const n of A) {
    if (map[n] === 0) continue;
    if (!map[n * 2]) return false;
    map[n] -= 1;
    map[n * 2] -= 1;
  }

  for (const n of A) {
    if (map[n]) return false;
  }

  return true;
};

console.log(canReorderDoubled([2, 1, 2, 6]));
console.log(canReorderDoubled([4, -2, 2, -4]));
console.log(canReorderDoubled([3, 1, 3, 6]));
console.log(canReorderDoubled([1, 2, 4, 16, 8, 4]));
