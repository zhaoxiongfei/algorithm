// https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array-ii/description/

/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = nums => {
  let { length } = nums;
  for (let i = 0; i < length - 2; i += 1) {
    if (nums[i] === nums[i + 2]) {
      nums[i + 2] = nums[length - 1];

      length -= 1;
      // 移动 num[i + 2] 到合适的地方, 保持数组的顺序不变
      let t = i + 2;
      while (nums[t] > nums[t + 1] && t < length - 1) {
        const tmp = nums[t];
        nums[t] = nums[t + 1];
        nums[t + 1] = tmp;
        t += 1;
      }
      i -= 1;
    }
  }

  return length;
};

// 这个方法好神奇,及其巧妙
const removeDuplicates2 = nums => {
  let i = 0;
  for (const num of nums) {
    if (i < 2 || num > nums[i - 2]) {
      nums[i] = num;
      i += 1;
    }
  }
  return i;
};

let nums = [1, 1, 1, 2, 2, 3];
console.log(removeDuplicates2(nums));
console.log(nums);

nums = [1, 1, 1, 2, 2, 3];
console.log(removeDuplicates(nums));
console.log(nums);
console.log(removeDuplicates([1, 1, 1, 1]));
console.log(removeDuplicates([0, 0, 1, 1, 1, 1, 2, 3, 3]));
nums = [1, 1, 1, 2, 2, 2, 3, 3];
console.log(removeDuplicates(nums));
console.log(nums);
