// https://leetcode-cn.com/problems/4sum/description/

const fourSum = (nums, target) => {
  const { length } = nums;
  if (length < 4) return [];
  nums.sort((a, b) => a - b);

  const resolves = [];
  for (let i = 0; i < length - 3; i += 1) {
    const first = nums[i];
    if (first === nums[i - 1]) continue;
    for (let j = i + 1; j < length - 2; j += 1) {
      const second = nums[j];
      if (j > i + 1 && second === nums[j - 1]) continue;
      let left = j + 1;
      let right = length - 1;
      while (left < right) {
        const third = nums[left];
        const forth = nums[right];
        const sum = first + second + third + forth;
        if (sum === target) {
          resolves.push([first, second, third, forth]);
          while (third === nums[left + 1]) left += 1;
          while (forth === nums[right - 1]) right -= 1;
          left += 1;
          right -= 1;
        } else if (sum > target) {
          while (forth === nums[right - 1]) right -= 1;
          right -= 1;
        } else {
          while (third === nums[left + 1]) left += 1;
          left += 1;
        }
      }
    }
  }

  return resolves;
};

// console.log(fourSum([1, 0, -1, 0, -2, 2], 0));
// console.log(fourSum([-3, -2, -1, 0, 0, 1, 2, 3], 0));
// console.log(fourSum([-4, -3, -2, -1, 0, 0, 1, 2, 3, 4], 0));
// console.log(fourSum([-4, -3, -2, -1, 0, 0, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4], 0));
console.log(fourSum([1, 1, 1, 1, 1, 1], 4));
