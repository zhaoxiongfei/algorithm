// https://leetcode-cn.com/problems/remove-element/description/

// 删除数组中的指定项
// 思路：双指针扫描，一个从头，一个从尾, 尾部发现直接删除，头部发现用尾部替换
const removeElement = (nums, val) => {
  const { length } = nums;
  let i = 0;
  let j = length - 1;
  while (i <= j) {
    if (nums[j] === val) {
      j -= 1;
    } else {
      if (nums[i] === val) {
        nums[i] = nums[j];
        j -= 1;
      }
      i += 1;
    }
  }

  return j + 1;
};

const list = [1, 2, 2, 2, 3, 3, 4, 5];
console.log(removeElement(list, 2), list);

// const list = [1];
// console.log(removeElement(list, 1), list);
