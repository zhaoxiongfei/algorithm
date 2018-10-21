// https://leetcode-cn.com/problems/trapping-rain-water/description

// 思路: 找到中间小，两头大的，补齐中间的，反复多次操作，知道扫描的时候找不到该特征的区域

// 判断是否从 i 开始连续n个元素相等
const middleEqual = (nums, i, n) => {
  let j = 1;
  while (j < n) {
    if (nums[i] !== nums[i + j]) return false;
    j += 1;
  }
  return true;
};
/**
 * @param {number[]} nums
 * @return {number}
 */
const trap = nums => {
  const { length } = nums;
  if (length < 3) return 0;
  let total = 0;
  let width = 1; // 雨水填满桶的宽度，由一开始
  while (width <= length - 2) {
    for (let i = 1; i < length - width; i += 1) {
      const l = i - 1;
      const r = i + width;
      const left = nums[l]; // 左边的边框索引永远都是 i - 1
      const curr = nums[i];
      const right = nums[r];
      if (!middleEqual(nums, i, width)) continue;
      if (curr >= left) continue;
      if (curr >= right) continue;
      const diff = Math.min(left, right) - curr;
      total += width * diff;
      let n = 0;
      while (n < width) {
        nums[i + n] += diff;
        n += 1;
      }
    }
    width += 1;
  }

  return total;
};

console.log(trap([2, 0, 2]));
console.log(trap([0, 1, 0, 2, 0, 0, 0, 3, 2, 1, 2, 1]));
