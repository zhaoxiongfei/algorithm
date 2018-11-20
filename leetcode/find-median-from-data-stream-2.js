// https://leetcode-cn.com/problems/find-median-from-data-stream/description/
// No 295. 数据流的中位数

/**
  中位数是有序列表中间的数。如果列表长度是偶数，中位数则是中间两个数的平均值。

  例如，

  [2,3,4] 的中位数是 3

  [2,3] 的中位数是 (2 + 3) / 2 = 2.5

  设计一个支持以下两种操作的数据结构：

  void addNum(int num) - 从数据流中添加一个整数到数据结构中。
  double findMedian() - 返回目前所有元素的中位数。
  示例：

  addNum(1)
  addNum(2)
  findMedian() -> 1.5
  addNum(3)
  findMedian() -> 2
  进阶:

  如果数据流中所有整数都在 0 到 100 范围内，你将如何优化你的算法？
  如果数据流中 99% 的整数都在 0 到 100 范围内，你将如何优化你的算法？
 */

function ListNode(val) {
  this.val = val;
  this.prev = null;
  this.succ = null;
}

/**
 * initialize your data structure here.
 */
// 思路: 采用list结构
function MedianFinder() {
  const header = new ListNode(-Infinity); // 升序排列的数组
  const tailer = new ListNode(Infinity); // 升序排列的数组
  header.succ = tailer;
  tailer.prev = header;

  let size = 0;
  let median = null;

  const search = num => {
    if (num >= tailer.prev.val) return tailer.prev;
    if (num <= header.succ.val) return header;
    let node = tailer.prev;
    while (header !== node && node.val > num) {
      node = node.prev;
    }

    return node;
  };

  /**
   * @param {number} num
   * @return {void}
   */
  const addNum = num => {
    const node = search(num);
    const inserted = new ListNode(num);
    inserted.succ = node.succ;
    inserted.succ.prev = inserted;
    node.succ = inserted;
    inserted.prev = node;

    size += 1;
    median = null;
  };

  /**
   * @return {number}
   */
  const findMedian = () => {
    if (size === 0) return 0;
    if (size === 1) return header.succ.val;
    if (median !== null) return median;
    let node = header;
    let index = -1;
    const md = Math.floor(size / 2);
    while (tailer !== node && index < md) {
      node = node.succ.succ;
      index += 2;
    }

    if (index > md) node = node.prev;
    if (size % 2 === 0) {
      median = (node.val + node.prev.val) / 2;
    } else {
      median = node.val;
    }
    return median;
  };

  return { addNum, findMedian };
}

const median = new MedianFinder();
median.addNum(1);
median.addNum(2);
median.addNum(3);
median.addNum(4);
median.addNum(5);
median.addNum(6);
median.addNum(7);
median.addNum(8);
median.addNum(8);

console.log(median.findMedian());
