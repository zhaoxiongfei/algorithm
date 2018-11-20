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

function Heap(kind = "max") {
  const data = [];

  const insert = e => {
    if (kind === "min") e = -e;
    data.length += 1;
    let index = data.length - 1;
    while (index > 0) {
      const parent = (index - 1) >> 1;
      if (data[parent] >= e) break;
      data[index] = data[parent];
      index = parent;
    }
    data[index] = e;
  };

  const getTop = () => {
    if (kind === "max") return data[0];
    return -data[0];
  };

  const size = () => data.length;

  const properParent = (n, i) => {
    const lIndex = 1 + (i << 1);
    const rIndex = (1 + i) << 1;
    if (rIndex < n && data[rIndex] > data[lIndex] && data[rIndex] > data[i])
      return rIndex;
    if (lIndex < n && data[lIndex] > data[i]) return lIndex;
    return i;
  };

  const swap = (i, j) => {
    const t = data[i];
    data[i] = data[j];
    data[j] = t;
  };

  const percolateDown = (n, i) => {
    let j;
    while (i !== (j = properParent(n, i))) {
      swap(i, j);
      i = j;
    }
    return i;
  };

  const delTop = () => {
    const { length } = data;
    const removed = data[0];
    data[0] = data[length - 1];
    data.length -= 1;
    percolateDown(length - 1, 0);
    if (kind === "max") return removed;
    return -removed;
  };

  return { insert, getTop, delTop, size, elem: data };
}

/**
 * initialize your data structure here.
 */
// 思路: 采用heap 结构，插入复杂度 O(logN), 查找 O(1)
// 设置左右两个堆，分别记录比中位数小和比中位数大的数
function MedianFinder() {
  const leftHeap = new Heap("max");
  const rightHeap = new Heap("min");

  /**
   * @param {number} num
   * @return {void}
   */
  const addNum = num => {
    if (leftHeap.size() === rightHeap.size()) {
      // 插入左侧
      if (rightHeap.size() && rightHeap.getTop() < num) {
        leftHeap.insert(rightHeap.delTop());
        return rightHeap.insert(num);
      }
      return leftHeap.insert(num);
    }
    if (num <= leftHeap.getTop()) {
      // 插入右侧
      rightHeap.insert(leftHeap.delTop());
      return leftHeap.insert(num);
    }
    return rightHeap.insert(num);
  };

  /**
   * @return {number}
   */
  const findMedian = () => {
    if (leftHeap.size() > rightHeap.size()) {
      return leftHeap.getTop();
    }
    return (leftHeap.getTop() + rightHeap.getTop()) / 2;
  };

  return { addNum, findMedian };
}

const median = new MedianFinder();

// median.addNum(6);
// median.addNum(10);
// median.addNum(2);
// median.addNum(6);
// median.addNum(5);
// median.addNum(0);
// median.addNum(6);
// median.addNum(3);
// median.addNum(1);
// median.addNum(0);
// median.addNum(0);

// median.addNum(-1);
// median.addNum(-2);
// median.addNum(-3);
// median.addNum(-4);
// median.addNum(-5);

median.addNum(1);
median.addNum(2);
median.addNum(3);
// median.addNum(4);
// median.addNum(5);
// median.addNum(6);
// median.addNum(7);
// median.addNum(8);
// median.addNum(8);

console.log(median.findMedian());
