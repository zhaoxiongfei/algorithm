// https://leetcode-cn.com/problems/subsets/description/
//

const _combineRight = (list, end, k) => {
  const combinations = [];
  for (let i = end; i >= 0; i -= 1) {
    if (k === 1) {
      combinations.push([list[i]]);
    } else {
      const array = _combineRight(list, i - 1, k - 1);
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
const subsets = nums => {
  const { length } = nums;
  if (length === 0) return [nums];
  const res = [];
  for (let k = 1; k <= length; k += 1) {
    res.push(_combineRight(nums, length - 1, k));
  }
  return [[]].concat(...res);
};

console.log(subsets([1, 2, 3, 4, 5]));
