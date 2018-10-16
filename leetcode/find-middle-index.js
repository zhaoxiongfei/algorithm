const values = [-4, -2, 1, -5, -4, -4, 4, -2, 0, 4, 0, -2, 3, 1, -5, 0];
// const values = [-2, 0, 1, 1, 2];
// const values = [-4, -1, -1, 0, 1, 2];
// const values = [0, 0, 0];

// 找到一个索引位置，该位置之前的元素都比 num 小，右侧都比 num 大或等
const findMiddleIndex = (nums, num, from = 0) => {
  const { length } = nums;
  if (nums[from] > num) return -1;
  if (nums[length - 1] < num) return -1;

  let left = from;
  let right = length - 1;
  while (left < right - 1) {
    const index = Math.floor((left + right) / 2);
    const curr = nums[index];
    if (curr >= num) {
      // 当前值比 num 大了，左移
      right = Math.min(index, right - 1);
    } else if (curr <= num) {
      // 当前值比 num 小了，右移
      left = Math.max(index, left + 1);
    }
  }
  while (nums[right + 1] === nums[right]) {
    right += 1;
  }
  return right;
};

values.sort((a, b) => (a > b ? 1 : -1));
console.log(values);
console.log(findMiddleIndex(values, 0, 9));
// console.log(findMiddleIndex(values, 1, 1));
// console.log(findMiddleIndex(values, 1 / 2, 2));
// console.log(findMiddleIndex(values, 0, 1));
