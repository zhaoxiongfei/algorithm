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

function Heap() {
  const data = [];

  const insert = e => {
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

  const getMax = () => data[0];

  const size = () => data.length;

  const delMax = () => {
    const { length } = data;
    const removed = data[0];
    const e = data[data.length - 1];
    if (data.length === 1) {
      data.length -= 1;
      return removed;
    }
    let index = 0;
    while (index < data.length) {
      const leftIndex = 1 + (index << 1);
      const rightIndex = (index + 1) << 1;
      if (
        rightIndex < length &&
        data[rightIndex] > data[leftIndex] &&
        data[rightIndex] > e
      ) {
        data[index] = data[rightIndex];
        index = rightIndex;
      } else if (leftIndex < length && data[leftIndex] > e) {
        data[index] = data[leftIndex];
        index = leftIndex;
      } else {
        break;
      }
    }
    data.length -= 1;
    if (index !== length - 1) data[index] = e;

    return removed;
  };

  return { insert, getMax, delMax, size, elem: data };
}

/**
 * initialize your data structure here.
 */
// 思路: 采用heap 结构，插入复杂度 O(logN), 查找 O(1)
// 设置左右两个堆，分别记录比中位数小和比中位数大的数
function MedianFinder() {
  const leftHeap = new Heap();
  const rightHeap = new Heap();

  /**
   * @param {number} num
   * @return {void}
   */
  const addNum = num => {
    if (leftHeap.size() === 0) return leftHeap.insert(num);
    if (rightHeap.size() === 0) {
      if (num <= leftHeap.getMax()) {
        rightHeap.insert(-leftHeap.delMax());
        return leftHeap.insert(num);
      }
      return rightHeap.insert(-num);
    }
    if (leftHeap.size() > rightHeap.size()) {
      // 本来按照平衡性应该放在右堆，但是按照数值应该归到左堆
      // 所以左侧插入这个，同时把左侧最大的放到 median, median 挪到右边
      if (num <= leftHeap.getMax()) {
        rightHeap.insert(-leftHeap.delMax());
        return leftHeap.insert(num);
      }
      return rightHeap.insert(-num);
    }
    // 本来按照平衡性应该放在左堆，但是按照数值应该归到右堆
    // 所以右侧插入这个，同时把右侧最大的放到 median, median 挪到左边
    if (-num < rightHeap.getMax()) {
      leftHeap.insert(-rightHeap.delMax());
      return rightHeap.insert(-num);
    }
    return leftHeap.insert(num);
  };

  /**
   * @return {number}
   */
  const findMedian = () => {
    console.log(leftHeap.elem);
    console.log(rightHeap.elem);
    if (leftHeap.size() > rightHeap.size()) {
      return leftHeap.getMax();
    }
    return (leftHeap.getMax() - rightHeap.getMax()) / 2;
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

median.addNum(-1);
median.addNum(-2);
median.addNum(-3);
// median.addNum(-4);
// median.addNum(-5);

// median.addNum(1);
// median.addNum(2);
// median.addNum(3);
// median.addNum(4);
// median.addNum(5);
// median.addNum(6);
// median.addNum(7);
// median.addNum(8);
// median.addNum(8);

console.log(median.findMedian());
