// https://leetcode-cn.com/problems/split-array-into-consecutive-subsequences/
// No 659. 分割数组为连续子序列

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const isPossible = nums => {
  if (nums.length < 3) return false;
  const map = new Map();
  for (const n of nums) {
    map.set(n, (map.get(n) || 0) + 1);
  }

  const need = new Map();
  for (const n of nums) {
    if ((map.get(n) || 0) <= 0) continue;
    if (0 < (need.get(n) || 0)) {
      need.set(n, (need.get(n) || 0) - 1);
      need.set(n + 1, (need.get(n + 1) || 0) + 1);
    } else if (0 < (map.get(n + 1) || 0) && 0 < (map.get(n + 2) || 0)) {
      map.set(n + 1, (map.get(n + 1) || 0) - 1);
      map.set(n + 2, (map.get(n + 2) || 0) - 1);
      need.set(n + 3, (need.get(n + 3) || 0) + 1);
    } else {
      return false;
    }
    map.set(n, (map.get(n) || 0) - 1);
  }

  return true;
};

console.log(isPossible([1, 2, 3, 3, 4, 5]));
console.log(isPossible([1, 2, 3, 3, 4, 4, 5, 5]));
console.log(isPossible([1, 2, 3, 4, 4, 5]));
