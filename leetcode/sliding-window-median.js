// https://leetcode-cn.com/problems/sliding-window-median/description/
// No 480. 滑动窗口中位数

/**
  中位数是有序序列最中间的那个数。
  如果序列的大小是偶数，则没有最中间的数；此时中位数是最中间的两个数的平均数。

  例如：

  [2,3,4]，中位数是 3

  [2,3]，中位数是 (2 + 3) / 2 = 2.5

  给出一个数组 nums，有一个大小为 k 的窗口从最左端滑动到最右端。窗口中有 k 个数，每次窗口移动 1 位。你的任务是找出每次窗口移动后得到的新窗口中元素的中位数，并输出由它们组成的数组。

  例如：

  给出 nums = [1,3,-1,-3,5,3,6,7]，以及 k = 3。

  窗口位置                      中位数
  ---------------               -----
  [1  3  -1] -3  5  3  6  7       1
   1 [3  -1  -3] 5  3  6  7       -1
   1  3 [-1  -3  5] 3  6  7       -1
   1  3  -1 [-3  5  3] 6  7       3
   1  3  -1  -3 [5  3  6] 7       5
   1  3  -1  -3  5 [3  6  7]      6
   因此，返回该滑动窗口的中位数数组 [1,-1,-1,3,5,6]。

  提示：
  假设k是合法的，即：k 始终小于输入的非空数组的元素个数.
 */
function ListNode(val) {
  this.val = val;
  this.succ = null;
  this.pred = null;
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// 思路：没有想到巧妙的数学解法，程序方面只能利用列表来加快插入和删除的速度
const medianSlidingWindow = (nums, k) => {
  if (k === 1) return nums;
  const { length } = nums;
  const header = new ListNode("header");
  const tailer = new ListNode("tailer");
  header.succ = tailer;
  tailer.pred = header;

  const remove = e => {
    let curr = tailer.pred;
    while (header !== curr) {
      if (curr.val === e) break;
      curr = curr.pred;
    }
    curr.succ.pred = curr.pred;
    curr.pred.succ = curr.succ;
  };

  const insert = e => {
    let curr = tailer.pred;
    while (header !== curr) {
      if (curr.val <= e) break;
      curr = curr.pred;
    }
    const node = new ListNode(e);
    curr.succ.pred = node;
    node.succ = curr.succ;
    curr.succ = node;
    node.pred = curr;
  };

  for (let i = 0; i < k; i += 1) insert(nums[i]);

  const medianIndex = k >> 1;
  const ans = [];
  const getMedian = () => {
    let curr = header.succ;
    let i = 0;
    while (i < medianIndex) {
      curr = curr.succ;
      i += 1;
    }

    if (k % 2) {
      ans.push(curr.val);
    } else {
      ans.push((curr.val + curr.pred.val) / 2);
    }
  };
  getMedian();

  for (let i = 0; i < length - k; i += 1) {
    remove(nums[i]);
    insert(nums[i + k]);
    getMedian();
  }

  return ans;
};

console.log(medianSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
console.log(medianSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 2));
console.log(medianSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 1));
