// https://leetcode-cn.com/problems/subsets-ii/description/
const _combineRight = (list, end, k) => {
  const combinations = [];
  for (let i = end; i >= 0; i -= 1) {
    // console.log("for start: i = %d", i);
    if (k === 1) {
      if (list[i] === list[i - 1]) continue;
      combinations.push([list[i]]);
    } else {
      if (i + 1 <= end && list[i + 1] === list[i]) {
        // console.log("xxxxxxxxx");
        continue;
      }
      // console.log("i - 1: %d, k - 1: %d", i - 1, k - 1);
      const array = _combineRight(list, i - 1, k - 1);
      // console.log(array);
      for (let j = 0; j < array.length; j += 1) {
        array[j].push(list[i]);
        combinations.push(array[j]);
      }
    }
  }

  return combinations;
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 各种长度分别组合依次，之后合并在一起
const subsetsWithDup = nums => {
  const { length } = nums;
  if (length === 0) return [nums];
  nums.sort((a, b) => a - b);
  const res = [];
  // return console.log(_combineRight(nums, length - 2, 2));
  for (let k = 1; k < length; k += 1) {
    res.push(_combineRight(nums, length - 1, k));
  }
  res.push([nums]);
  return [[]].concat(...res);
};

console.log(subsetsWithDup([1, 1, 2, 2]));
console.log(subsetsWithDup([1, 2, 3, 4, 5]));
console.log(subsetsWithDup([1, 2, 3]));
console.log(subsetsWithDup([2, 2, 2]));
console.log(subsetsWithDup([1, 2, 2, 3]));
console.log(subsetsWithDup([1, 2, 2, 2]));
console.log(subsetsWithDup([2, 2, 2, 1, 1, 2, 2, 2, 1, 1]));
