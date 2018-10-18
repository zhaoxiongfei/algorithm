// https://leetcode-cn.com/problems/container-with-most-water/description/

// 暴力算法 O(n*n)
const maxArea = list => {
  const { length } = list;
  let maxValue = 0;
  for (let i = 0; i < length; i += 1) {
    for (let j = i + 1; j < length; j += 1) {
      const value = Math.min(list[i], list[j]) * (j - i);
      if (value > maxValue) maxValue = value;
    }
  }

  return maxValue;
};

// 优化一些暴力算法 O(n*n)
const maxArea2 = list => {
  const { length } = list;
  let maxValue = 0;
  let left = 0; // 最大值时左边的高度
  let right = 0; // 最大值时右边的高度
  for (let i = 0; i < length; i += 1) {
    for (let j = length - 1; j > i; j -= 1) {
      if (left > list[i]) continue;
      if (right > list[j]) continue;
      const value = Math.min(list[i], list[j]) * (j - i);
      if (value > maxValue) {
        left = list[i];
        right = list[j];
        maxValue = value;
      }
    }
  }

  return maxValue;
};

// 最终优化 (n)
const maxArea3 = list => {
  const { length } = list;
  let maxValue = 0;
  let i = 0;
  let j = length - 1;
  while (i < j) {
    const value = Math.min(list[i], list[j]) * (j - i);
    if (value > maxValue) maxValue = value;
    if (list[i] < list[j]) i += 1;
    else j += 1;
  }

  return maxValue;
};

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
console.log(maxArea2([1, 8, 6, 2, 5, 4, 8, 3, 7]));
console.log(maxArea3([1, 8, 6, 2, 5, 4, 8, 3, 7]));
