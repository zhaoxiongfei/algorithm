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

/**
 * initialize your data structure here.
 */
// 思路: 采用数组结构，插入操作 O(N), 查找为 O(1)
function MedianFinder() {
  const sortedArray = []; // 升序排列的数组

  /**
   * @param {number} num
   * @return {void}
   */
  const addNum = num => {
    const { length } = sortedArray;
    let index = length;
    while (sortedArray[(index -= 1)] > num) {}
    let end = length;
    while ((end -= 1) > index) sortedArray[end + 1] = sortedArray[end];

    sortedArray[index + 1] = num;

    console.log(sortedArray);
  };

  /**
   * @return {number}
   */
  const findMedian = () => {
    console.log(sortedArray);
    const { length } = sortedArray;
    if (length % 2 === 0) {
      const md = length / 2;
      return (sortedArray[md - 1] + sortedArray[md]) / 2;
    }
    return sortedArray[Math.floor(length / 2)];
  };

  return { addNum, findMedian };
}

const median = new MedianFinder();
median.addNum(6);
median.addNum(10);
median.addNum(2);
median.addNum(6);
median.addNum(5);
median.addNum(0);
median.addNum(6);
median.addNum(3);
median.addNum(1);
median.addNum(0);
median.addNum(0);
