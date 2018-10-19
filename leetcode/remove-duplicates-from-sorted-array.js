// https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/description/

// 思路，双指针移动，不相等的前移
const removeDuplicates = nums => {
  const { length } = nums;
  let i = 0;
  for (let j = 1; j < length; j += 1) {
    if (nums[i] !== nums[j]) {
      i += 1;
      nums[i] = nums[j];
    }
  }

  return i + 1;
};

const list = [1, 1, 3, 4, 5, 5, 5, 6, 7];
console.log(removeDuplicates(list), list);
