// https://leetcode-cn.com/problems/find-k-closest-elements/
// No 658. 找到 K 个最接近的元素

const binSearch = (_elem, e, lo = 0, hi = _elem.length) => {
  while (lo < hi) {
    const mi = (lo + hi) >> 1; // 寻找中点
    // 经比较后确认深入 [lo, mi) 或 [mi + 1, hi)
    if (e < _elem[mi]) hi = mi;
    else lo = mi + 1;
  }
  // 查找成功不能提前终止

  // 循环结束时， lo 为大于e的元素的最小的秩，故 lo - 1即不大于 e de元素的最大秩
  return lo - 1;
};

/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
const findClosestElements = (arr, k, x) => {
  const { length } = arr;
  const min = arr[0];
  const max = arr[length - 1];
  if (x <= min) return arr.slice(0, k);
  if (max <= x) return arr.slice(0 - k);
  let l = binSearch(arr, x);
  let r = l + 1;

  for (let i = 0; i < k; i += 1) {
    if (l < 0) {
      r += 1;
      continue;
    }
    if (length <= r) {
      l -= 1;
      continue;
    }
    const lv = Math.abs(x - arr[l]);
    const rv = Math.abs(x - arr[r]);
    if (rv < lv) {
      r += 1;
    } else {
      l -= 1;
    }
  }
  return arr.slice(l + 1, r);
};

console.log(findClosestElements([1, 2, 3, 4, 5], 4, 4));
console.log(findClosestElements([1, 2, 3, 4, 5], 4, 3));
console.log(findClosestElements([1, 2, 3, 4, 5], 4, -1));
