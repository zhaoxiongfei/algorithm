// https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/description/
// No 154. 寻找旋转排序数组中的最小值 II
/**
  假设按照升序排序的数组在预先未知的某个点上进行了旋转。

  ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。

  请找出其中最小的元素。

  注意数组中可能存在重复的元素。

  示例 1：

  输入: [1,3,5]
  输出: 1
  示例 2：

  输入: [2,2,2,0,1]
  输出: 0
  说明：

  这道题是 寻找旋转排序数组中的最小值 的延伸题目。
  允许重复会影响算法的时间复杂度吗？会如何影响，为什么？
 */

const findMin = (nums, left = 0, right = nums.length) => {
  const length = right - left;
  if (length === 0) throw Error("Exception");
  if (length === 1) return nums[left];
  if (length === 2) return Math.min(nums[left], nums[right - 1]);

  // console.log("nums: %o, left: %d, right: %d", nums, left, right);
  // 未旋转
  if (nums[left] < nums[right - 1]) return nums[left];

  const middle = ((left + right) / 2) | 0;
  if (nums[middle] < nums[right - 1]) {
    // 右边半拉是顺序的, 最小是是右边半拉第一个，或者左半拉里最小的
    return Math.min(nums[middle], findMin(nums, left, middle + 1));
  }
  if (nums[middle] > nums[left]) {
    // 左边半拉是顺序的, 最小是是左边半拉第一个，或者右半拉里最小的
    return Math.min(nums[left], findMin(nums, middle, right));
  }

  // 到这里说明左右都无法确定是顺序的
  return Math.min(
    findMin(nums, left, middle + 1),
    findMin(nums, middle, right)
  );
};

console.log(findMin([3, 1, 3, 3]));
console.log(findMin([1, 2, 1]));
console.log(findMin([10, 1, 9, 9, 9]));
console.log(findMin([10, 1, 10, 10, 10]));
console.log(findMin([2, 2, 2, 0, 1]));
console.log(findMin([2, 2, 2, 0, 1, 1, 1, 1, 1]));
