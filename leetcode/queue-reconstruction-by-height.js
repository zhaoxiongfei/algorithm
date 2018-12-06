// https://leetcode-cn.com/problems/queue-reconstruction-by-height/description/
// 406. 根据身高重建队列

/**
  假设有打乱顺序的一群人站成一个队列。
  每个人由一个整数对(h, k)表示，其中h是这个人的身高，k是排在这个人前面且身高大于或等于h的人数。 编写一个算法来重建这个队列。

  注意：
  总人数少于1100人。

  示例

  输入:
  [[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]

  输出:
  [[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]
 */
function LinkNode(val) {
  this.val = val;
  this.pred = null;
  this.succ = null;
}
/**
 * @param {number[][]} people
 * @return {number[][]}
 */
// 思路，利用列表来做
const reconstructQueue = people => {
  let { length } = people;

  people.sort((a, b) => a[1] - b[1]);
  const header = new LinkNode("header");
  const tailer = new LinkNode("tailer");
  tailer.pred = header;
  header.succ = tailer;
  let size = 0;
  while (length) {
    for (let i = 0; i < people.length; i += 1) {
      const p = people[i];
      if (!p) continue;
      if (size < p[1]) continue;
      let node = header;
      let s = 0;
      while (tailer !== node.succ) {
        node = node.succ;
        if (node.val[0] >= p[0]) {
          s += 1;
          if (s > p[1]) break;
        }
      }
      if (s < p[1]) continue;
      if (s > p[1]) node = node.pred;
      people[i] = null;

      length -= 1;
      size += 1;

      const newNode = new LinkNode(p);

      // A <--> C
      // A <--> B <--> C
      newNode.succ = node.succ;
      node.succ.pred = newNode;

      node.succ = newNode;
      newNode.pred = node;
    }
  }

  const list = [];
  let node = header;
  while (tailer !== node.succ) {
    node = node.succ;
    list.push(node.val);
  }
  return list;
};

// console.log(reconstructQueue([[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]]));
console.log(
  reconstructQueue([
    [9, 0],
    [7, 0],
    [1, 9],
    [3, 0],
    [2, 7],
    [5, 3],
    [6, 0],
    [3, 4],
    [6, 2],
    [5, 2]
  ])
);
