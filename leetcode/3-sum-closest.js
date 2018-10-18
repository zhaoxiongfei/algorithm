const threeSumClosest = (nums, target) => {
  const { length } = nums;
  // 不知道如何解题先排序再说
  nums.sort((a, b) => a - b);

  console.log(nums);
  let minDiff = nums[0] + nums[1] + nums[2] - target;
  let minDiffAbs = Math.abs(minDiff);
  for (let i = 0; i < length - 2; i += 1) {
    for (let j = i + 1; j < length - 1; j += 1) {
      for (let k = j + 1; k < length; k += 1) {
        const first = nums[i];
        const second = nums[j];
        const third = nums[k];
        const diff = first + second + third - target;
        if (diff === 0) return diff + target;
        const diffAbs = Math.abs(diff);
        if (diffAbs < minDiffAbs) {
          minDiffAbs = diffAbs;
          minDiff = diff;
        }
      }
    }
  }
  return minDiff + target;
};

// 改良版
const threeSumClosest2 = (nums, target) => {
  const { length } = nums;
  // 不知道如何解题先排序再说
  nums.sort((a, b) => a - b);

  let minSum = nums[0] + nums[1] + nums[2];
  let minDiff = Math.abs(minSum - target);
  for (let i = 0; i < length - 2; i += 1) {
    let left = i + 1;
    let right = length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      const diff = Math.abs(sum - target);
      if (diff < minDiff) {
        minDiff = diff;
        minSum = sum;
      }
      if (sum > target) {
        right -= 1;
      } else {
        left += 1;
      }
    }
  }
  return minSum;
};

console.log(threeSumClosest([1, 2, 4, 8, 16, 32, 64, 128], 82));
console.log(threeSumClosest2([1, 2, 4, 8, 16, 32, 64, 128], 82));
// console.log(threeSumClosest([-1, 2, 1, -4], 1));
// console.log(threeSumClosest([1, 1, 1, 1], 0));
