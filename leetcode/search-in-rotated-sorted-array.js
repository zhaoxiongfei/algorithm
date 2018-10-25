// https://leetcode-cn.com/problems/search-in-rotated-sorted-array/description/

const binarySearch = (nums, target, start, end) => {
  let left = start;
  let right = end;
  while (left < right) {
    if (target === nums[left]) return left;
    if (target === nums[right]) return right;
    if (left + 1 === right) return -1;
    if (target < nums[left]) return -1;
    if (target > nums[right]) return -1;

    const middle = Math.ceil((left + right) / 2);
    if (target === nums[middle]) return middle;
    if (target < nums[middle]) {
      right = middle;
    } else {
      left = middle;
    }
  }

  return -1;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// 思路: 对半切开，肯定至少有一半是顺序良好的，顺序良好的放到二分法里查找
// 另外的一般继续切开
const search = (nums, target, start = 0, end = nums.length - 1) => {
  if (start === end) {
    if (target === nums[start]) return start;
    return -1;
  }
  if (start > end) return -1;
  if (nums[start] === target) return start;
  if (nums[end] === target) return end;
  if (start + 1 === end) {
    if (nums[start] === nums[end]) return -1;
    if (nums[start] !== target && nums[end] !== target) return -1;
  }

  const middle = Math.floor((start + end) / 2);
  // 右半边
  if (nums[middle] < nums[end]) {
    if (target < nums[end] && target >= nums[middle]) {
      return binarySearch(nums, target, middle, end);
    }
    return search(nums, target, start, middle - 1);
  }

  // 左半边
  if (nums[middle] > nums[start]) {
    if (target > nums[start] && target <= nums[middle]) {
      return binarySearch(nums, target, start, middle);
    }
    return search(nums, target, middle + 1, end);
  }

  // 两侧都无法确定有序，都经过 search
  if (nums[middle] === nums[start] || nums[middle] === nums[end]) {
    const indexInLeftHalf = search(nums, target, start, middle - 1);
    if (indexInLeftHalf !== -1) return indexInLeftHalf;
    return search(nums, target, middle, end);
  }

  return -1;
};

console.log(search([1, 1, 3, 1], 3));
console.log(search([2, 5, 6, 0, 0, 1, 2], 0));
console.log(search([8, 1, 2, 3, 4, 5, 6, 7], 6));
console.log(search([1, 3], 2));
console.log(search([3, 1], 0));
console.log(search([4, 5, 6, 7, 0, 1, 2], 1));
console.log(search([4, 5, 6, 7, 0, 1, 2], 6));
