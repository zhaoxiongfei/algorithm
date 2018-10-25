// https://leetcode-cn.com/problems/merge-sorted-array/description/

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
// 思路: 双指针，寻找到合适的位置插入，原位置上的元素放在末尾，
const merge = (nums1, m, nums2, n) => {
  let i = 0;
  let j = 0;
  while (i < m + j && j < n) {
    // 插入
    if (nums2[j] <= nums1[i]) {
      nums1[m + j] = nums1[i];
      nums1[i] = nums2[j];
      let left = i + 1;
      while (left <= m + j) {
        if (nums1[left] >= nums1[m + j]) {
          const t = nums1[left];
          nums1[left] = nums1[m + j];
          nums1[m + j] = t;
        }
        left += 1;
      }
      j += 1;
    } else {
      i += 1;
    }
  }
  while (j < n) {
    nums1[m + j] = nums2[j];
    j += 1;
  }
};

// 版本二: 双指针，从后往前扫描，直接放入指定的位置，省去了排序的过程。完美
const merge2 = (nums1, m, nums2, n) => {
  let i = m - 1;
  let j = n - 1;
  while (i >= 0 || j >= 0) {
    /*
    console.log(
      "i: %d, j: %d, nums1[i]: %d, nums2[j]: %d, nums1: %s",
      i,
      j,
      nums1[i],
      nums2[j],
      nums1
    );
    */
    if (nums1[i] >= nums2[j] || j < 0) {
      // 把 nums 的元素挪到指定的位置，给未来将要插入的元素腾地方
      nums1[i + j + 1] = nums1[i];
      i -= 1;
    } else {
      // 直接将要插入的数放在指定的位置，
      // 不用担心 nums1[i +_ j + 1] 的信息被冲掉，前面已经把他移到指定的位置了。绝妙
      nums1[i + j + 1] = nums2[j];
      j -= 1;
    }
  }
};

/*
const nums1 = [1, 2, 3, 4, 7, 8];
const nums2 = [2, 5, 6, 9];
merge(nums1, nums1.length, nums2, nums2.length);
console.log(nums1);
*/

const nums1 = [1, 2, 3, 4, 7, 8];
const nums2 = [2, 5, 6, 9];
merge2(nums1, nums1.length, nums2, nums2.length);

console.log(nums1);
