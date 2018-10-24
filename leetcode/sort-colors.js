// https://leetcode-cn.com/problems/sort-colors/description/

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// 参考 https://www.cnblogs.com/ganganloveu/p/3703746.html
/**
 * 如果只能扫一遍，很容易想到的就是左边存放0和1，右边存放2.两边往中间靠。
  设置两个index，left记录第一个1的位置，left左边为0，right记录第一个非2的位置，right右边为2.
  然后使用i从头到尾扫一遍，直到与right相遇。
  i遇到0就换到左边去，遇到2就换到右边去，遇到1就跳过。
  需要注意的是：由于left记录第一个1的位置，因此A[left]与A[i]交换后，A[left]为0,A[i]为1，因此i++；
  而right记录第一个非2的位置，可能为0或1，因此A[right]与A[i]交换后，A[right]为2,A[i]为0或1，i不能前进，要后续判断。
  由此该数组分为4段：[0,left)-->0; [left,i)-->1; [i,right]-->乱序; (right,n-1]-->2

  0  0  0  1  1  1  2  1  0  2  1  2  2  2

             ^         ^             ^

            left         i            right
 */
const sortColors = nums => {
  const { length } = nums;
  let l = 0;
  let r = length - 1;
  let i = l;
  while (i <= r) {
    const num = nums[i];
    if (num === 0) {
      nums[i] = nums[l];
      nums[l] = num;
      l += 1;
      i += 1;
    } else if (num === 1) {
      i += 1;
    } else if (num === 2) {
      nums[i] = nums[r];
      nums[r] = num;
      r -= 1;
    }
  }
};

const nums = [2, 0, 2, 1, 1, 0];
sortColors(nums);
console.log(nums);
