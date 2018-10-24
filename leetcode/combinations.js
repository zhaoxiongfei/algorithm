// https://leetcode-cn.com/problems/combinations/description/

const _combineCount = (n, k) => {
  let num1 = 1;
  let num2 = 1;
  for (let i = 0; i < k; i += 1) {
    num1 *= n - i;
    num2 *= k - i;
  }

  return num1 / num2;
};

const _combineLeft = (list, start, k) => {
  const combinations = [];
  for (let i = start; i < list.length; i += 1) {
    if (k === 1) {
      combinations.push([list[i]]);
    } else {
      const array = _combineLeft(list, i + 1, k - 1);
      for (let j = 0; j < array.length; j += 1) {
        array[j].unshift(list[i]);
        combinations.push(array[j]);
      }
    }
  }

  return combinations;
};

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
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
// 思路: 从左到右依次固定一个， 调用自身得到后续的列表中的 k - 1个
// 思路2: 从右向左依次固定一个， 调用自身得到前序续的列表中的 k - 1个
// 数组的 push 要比 unshift 性能高很多，尤其数组长度较长时
const combine = (n, k) => {
  if (k > n) return [];
  const nums = [];
  for (let i = 1; i <= n; i += 1) nums.push(i);
  if (k === n) return [nums];
  // return _combineLeft(nums, 0, k);
  // return _combineRight(nums, n - 1, k);
  return _combineCount(n, k);
};

// console.log(combine(4, 2));
console.log(combine(100, 10));
