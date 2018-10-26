// https://leetcode-cn.com/problems/reverse-linked-list-ii/description/
const Link = require("./link");

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
// 思路：扫描找到开始位置，不断的组建翻转后的子链，到结束位置把子链挂到主链上去
const reverseBetween = (head, m, n) => {
  if (m === n) return head;

  let node = head;
  let start = null;
  let end = null;
  let count = 0;
  let perStart = null; // 翻转起始节点的上一个点
  while (node) {
    count += 1;
    const next = node.next;
    // 开始点
    if (count === m) {
      start = node;
      end = node;
    } else if (count > m) {
      node.next = start;
      start = node;
      // 结束点
      if (count === n) {
        end.next = next;
        if (m === 1) return start;
        if (m > 1) perStart.next = start;
        return head;
      }
    } else {
      perStart = node;
    }

    node = next;
  }

  return head;
};

// 思路二: 两次循环，第一次找到起始节点， 第二次直接从起始节点开始扫描到结束节点, 并以此翻转
const reverseBetween2 = (head, m, n) => {
  const fakeHead = { val: null, next: head };
  let pre = fakeHead;
  for (let i = 1; i < m; i += 1) pre = pre.next;

  const cur = pre.next;
  for (let i = m; i < n; i += 1) {
    const next = cur.next;
    cur.next = next.next;
    next.next = pre.next;
    pre.next = next;
  }

  return fakeHead.next;
};

console.log(Link.toArray(reverseBetween(Link.make([1, 2, 3, 4, 5]), 2, 4)));
console.log(Link.toArray(reverseBetween2(Link.make([1, 2, 3, 4, 5]), 2, 4)));
console.log(Link.toArray(reverseBetween2(Link.make([1, 2, 3, 4, 5]), 1, 5)));
console.log(Link.toArray(reverseBetween2(Link.make([1, 2, 3, 4, 5]), 1, 2)));
console.log(Link.toArray(reverseBetween2(Link.make([1, 2, 3, 4, 5]), 1, 1)));
console.log(Link.toArray(reverseBetween2(Link.make([1, 2, 3, 4, 5]), 4, 5)));
console.log(Link.toArray(reverseBetween2(Link.make([1, 2, 3, 4, 5]), 4, 4)));
console.log(Link.toArray(reverseBetween(Link.make([1, 2, 3, 4, 5]), 5, 5)));
