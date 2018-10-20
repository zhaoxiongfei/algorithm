// https://leetcode-cn.com/problems/next-permutation/description/
//

/**
 *
 * 实现获取下一个排列的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。

 * 如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。
 *
 * 必须原地修改，只允许使用额外常数空间。
 *
 * 以下是一些例子，输入位于左侧列，其相应输出位于右侧列。
 * 1,2,3 → 1,3,2
 * 3,2,1 → 1,2,3
 * 1,1,5 → 1,5,1
 */

// 思路：从后往前找，找到第一组顺序对儿，交换之，之后反转第一个位置之后的全体元素
const nextPermutation = nums => {
  const { length } = nums;
  // 找第一个顺序对儿
  let first = length - 2;
  while (first >= 0) {
    const n1 = nums[first];
    let swap = false;
    for (let i = length - 1; i > first; i -= 1) {
      const n2 = nums[i];
      if (n1 < n2) {
        const tmp = nums[first];
        nums[first] = nums[i];
        nums[i] = tmp;
        swap = true;
        break;
      }
    }
    if (swap) break;
    first -= 1;
  }

  // 翻转 first 后的顺序
  const middle = Math.floor((length - (first + 1)) / 2);
  for (let n = 1; n <= middle; n += 1) {
    const tmp = nums[first + n];
    nums[first + n] = nums[length - n];
    nums[length - n] = tmp;
  }
};

// console.log(nextPermutation([1, 5, 6, 4, 3, 2]));
// console.log(nextPermutation([1, 0, 6, 4, 3, 2]));
const nums = [1, 2, 3, 7, 6, 5, 4, 2];
nextPermutation(nums);
console.log(nums);
