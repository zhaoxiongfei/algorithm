// https://leetcode-cn.com/problems/majority-element-ii/description/
// No 229. 求众数 II

/**
  给定一个大小为 n 的数组，找出其中所有出现超过 ⌊ n/3 ⌋ 次的元素。

  说明: 要求算法的时间复杂度为 O(n)，空间复杂度为 O(1)。

  示例 1:

  输入: [3,2,3]
  输出: [3]
  示例 2:

  输入: [1,1,1,3,3,2,2,2]
  输出: [1,2]
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 思路: https://blog.csdn.net/magicbean2/article/details/73737526
// BM（Boyer-Moore Majority Vote Algorithm）投票法：设置一个计数器，
// 在遍历数组的时候，如果是这个数，则计数器加1，否则减1，该方法用来计数超过一半的数非常方便。
// 在这里我们改进一下BM投票计数法：设置两个计数器，如果是两个数中的一个，则对应的计数器加1，
// 如果不是这两个数中的任何一个，则两个计数器都减1。如果计数器为0了，则统计当前这个数。
// 那么如果一个数出现次数超过1/3，则最后必然出现在统计的数中，
// 但是我们不确定得到的这两个数出现次数是否超过1/3，因此最后需要验证一下。
// 该算法的时间复杂度是O(n)，空间复杂度是O(1)。
const majorityElement = nums => {
  const { length } = nums;
  if (length === 0) return [];

  let a = null;
  let b = null;
  let ac = 0;
  let bc = 0;
  for (const n of nums) {
    if (n === a) {
      ac += 1;
    } else if (n === b) {
      bc += 1;
    } else if (ac === 0) {
      a = n;
      ac = 1;
    } else if (bc === 0) {
      b = n;
      bc = 1;
    } else {
      ac -= 1;
      bc -= 1;
    }
  }
  ac = 0;
  bc = 0;
  for (const n of nums) {
    if (n === a) ac += 1;
    if (n === b) bc += 1;
  }

  const ans = [];
  const min = length / 3;
  console.log("a: %d, b: %d, ac: %d, bc: %d, min: %d", a, b, ac, bc, min);
  if (ac > min) ans.push(a);
  if (bc > min) ans.push(b);

  return ans;
};

console.log(majorityElement([1, 2]));
