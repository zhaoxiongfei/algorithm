// https://leetcode-cn.com/problems/minimum-moves-to-equal-array-elements-ii/
// No 462. 最少移动次数使数组元素相等 II

/**
  给定一个非空整数数组，找到使所有数组元素相等所需的最小移动数，
  其中每次移动可将选定的一个元素加1或减1。 您可以假设数组的长度最多为10000。

  例如:

  输入:
  [1,2,3]

  输出:
  2

  说明：
  只有两个动作是必要的（记得每一步仅可使其中一个元素加1或减1）：

  [1,2,3]  =>  [2,2,3]  =>  [2,2,2]
 */
/**
 * 排序求解中位数, 时间复杂度 O(NlogN)
 */
const getMedian = nums => {
  const { length } = nums;
  nums.sort((a, b) => a - b);
  if (length % 2) return nums[length >> 1];

  return (nums[length >> 1] + nums[(length >> 1) - 1]) >> 1;
};

const swap = (nums, i, j) => {
  const t = nums[j];
  nums[j] = nums[i];
  nums[i] = t;
};

const insertSort = (nums, lo, hi) => {
  for (let i = lo + 1; i < hi; i += 1) {
    const t = nums[i];
    let j = i;
    for (; j > lo && nums[j - 1] > t; j -= 1) {
      nums[j] = nums[j - 1];
    }
    nums[j] = t;
  }
  return (lo + hi) >> 1;
};

const partition = (nums, lo, hi, pivotIndex) => {
  swap(nums, hi, pivotIndex);
  let mi = lo;
  for (let i = lo; i < hi; i += 1) {
    if (nums[i] < nums[hi]) {
      swap(nums, i, mi);
      mi += 1;
    }
  }
  swap(nums, hi, mi);
  return mi;
};

const getPivotIndex = (nums, lo, hi) => {
  if (hi - lo < 5) return insertSort(nums, lo, hi);
  let back = lo - 1;
  for (let i = lo; i + 4 < hi; i += 5) {
    const index = insertSort(nums, i, i + 4);
    swap(nums, (back += 1), index);
  }
  return BFPRT(nums, lo, back, ((lo + back) >> 1) + 1);
};

/**
 * 利用 bfprt 算法优化获取中位数的速度
 * https://blog.csdn.net/qq_32815807/article/details/78183597
 * 本质上这个程序是获取第k大的数
 * 时间复杂度降低到 O(N)
 */
const BFPRT = (nums, lo, hi, k) => {
  const pivotIndex = getPivotIndex(nums, lo, hi);
  const mi = partition(lo, hi, pivotIndex);
  const count = mi - lo + 1;
  if (count === k) return mi;
  if (count > k) return BFPRT(nums, lo, mi - 1, k);

  return BFPRT(nums, mi + 1, hi, k - count);
};

/**
 * @param {number[]} nums
 * @return {number}
 */
// 思路: 初步感觉大家都调整为中位数将是最小的变化量，但是苦于数学太渣无法证明，只能先这么做做看了。
// 居然通过了。 接下来如果优化的话，就优化计算中位数的过程， 这里用排序的方式有点奢侈, 利用堆可能更加经济
const minMoves2 = nums => {
  const { length } = nums;
  if (!length) return 0;

  const median = Math.floor(getMedian(nums));
  let total = 0;
  for (let i = 0; i < length; i += 1) {
    total += Math.abs(median - nums[i]);
  }

  return total;
};

console.log(minMoves2([1, 2, 3]));
// console.log(minMoves2([2, 1]));
// console.log(minMoves2([1, 2, 3, 4]));
// console.log(minMoves2([1, 2, 3, 4, 5]));
