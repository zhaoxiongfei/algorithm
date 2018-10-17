const values = [-1, 0, 1, 2, -1, -4];

const threeSum = nums => {
  const { length } = nums;
  nums.sort((a, b) => a - b);

  const result = [];
  for (let i = 0; i < length; i += 1) {
    const first = nums[i];
    if (first > 0) break;
    if (i > 0 && first === nums[i - 1]) continue;
    const target = 0 - nums[i];
    let l = i + 1;
    let r = length - 1;
    while (l < r) {
      const second = nums[l];
      const third = nums[r];
      if (second + third === target) {
        result.push([first, second, third]);
        while (l < r && second === nums[l + 1]) l += 1;
        while (l < r && third === nums[r - 1]) r -= 1;
        l += 1;
        r -= 1;
      } else if (second + third < target) {
        l += 1;
      } else {
        r -= 1;
      }
    }
  }

  return result;
};

console.log(threeSum(values));
