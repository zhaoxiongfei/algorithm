const values = [];

for (let i = 0; i < 50000; i += 1)
  values.push(500 - ((Math.random() * 1000) | 0));

var threeSum = function(nums) {
  nums.sort((a, b) => {
    return a - b;
  });
  let result = [];
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      break;
    }
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    var target = 0 - nums[i];
    var m = i + 1;
    var n = nums.length - 1;
    while (m < n) {
      if (nums[m] + nums[n] === target) {
        result.push([nums[i], nums[m], nums[n]]);
        while (m < n && nums[m] === nums[m + 1]) ++m;
        while (m < n && nums[n] === nums[n - 1]) --n;
        ++m, --n;
      } else if (nums[m] + nums[n] < target) ++m;
      else --n;
    }
  }
  return result;
};

console.log(threeSum(values));
