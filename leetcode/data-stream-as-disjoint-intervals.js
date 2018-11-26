// https://leetcode-cn.com/problems/data-stream-as-disjoint-intervals/description/
// No 352. 将数据流变为多个不相交间隔

/**
  给定一个非负整数的数据流输入 a1，a2，…，an，…，
  将到目前为止看到的数字总结为不相交的间隔列表。

  例如，假设数据流中的整数为 1，3，7，2，6，…，每次的总结为：

  [1, 1]
  [1, 1], [3, 3]
  [1, 1], [3, 3], [7, 7]
  [1, 3], [7, 7]
  [1, 3], [6, 7]


  进阶：
  如果有很多合并，并且与数据流的大小相比，不相交间隔的数量很小，该怎么办?

  提示：
  特别感谢 @yunhong 提供了本问题和其测试用例。
 */

/**
 * Definition for an interval.
 */
function Interval(start, end) {
  this.start = start;
  this.end = end;
}

/**
 * Initialize your data structure here.
 */
function SummaryRanges() {
  const header = new Interval();
  const tailer = new Interval();
  header.next = tailer;
  tailer.pred = header;

  // A <--> B <--> C
  // A <--> C
  const remove = B => {
    const A = B.pred;
    const C = B.next;
    A.next = C;
    C.pred = A;
  };

  const traversle = visit => {
    let node = header;
    while (tailer !== (node = node.next)) {
      visit(node);
    }
  };

  /**
   * @param {number} val
   * @return {void}
   */
  // 利用linked-list 存储数字
  const addNum = val => {
    let node = tailer;
    while (header !== (node = node.pred)) {
      if (node.start <= val && val <= node.end) return;
      if (node.end + 1 < val) break;
      if (node.end + 1 === val) {
        // 扩展区间右侧
        node.end += 1;
        return;
      }
      if (node.start - 1 === val) {
        // 扩展区间左侧
        node.start = val;

        // 左侧区间和相邻区间结合了
        if (header !== node.pred && node.pred.end + 1 === val) {
          node.start = node.pred.start;
          remove(node.pred);
        }
        return;
      }
    }
    const interval = new Interval(val, val);

    // node <--> next
    // node <--> interval <--> next
    const next = node.next;

    node.next = interval;
    interval.next = next;
    next.pred = interval;
    interval.pred = node;
  };

  /**
   * @return {Interval[]}
   */
  const getIntervals = () => {
    const list = [];
    traversle(x => list.push([x.start, x.end]));

    return list;
  };

  return { addNum, getIntervals };
}

/**
 * Your SummaryRanges object will be instantiated and called as such:
 * var obj = Object.create(SummaryRanges).createNew()
 * obj.addNum(val)
 * var param_2 = obj.getIntervals()
 */

const summaryRanges = new SummaryRanges();
/*
[1, 3, 7, 2, 6].forEach(x => {
  summaryRanges.addNum(x);
  console.log(summaryRanges.getIntervals());
});
*/

const fns = [
  "addNum",
  "getIntervals",
  "addNum",
  "getIntervals",
  "addNum",
  "getIntervals",
  "addNum",
  "getIntervals",
  "addNum",
  "getIntervals",
  "addNum",
  "getIntervals",
  "addNum",
  "getIntervals",
  "addNum",
  "getIntervals",
  "addNum",
  "getIntervals",
  "addNum",
  "getIntervals"
];
const params = [
  [6],
  [],
  [6],
  [],
  [0],
  [],
  [4],
  [],
  [8],
  [],
  [7],
  [],
  [6],
  [],
  [4],
  [],
  [7],
  [],
  [5],
  []
];
fns.forEach((x, i) => console.log(summaryRanges[x](...params[i])));
