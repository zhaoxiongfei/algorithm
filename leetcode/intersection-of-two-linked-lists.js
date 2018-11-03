// https://leetcode-cn.com/problems/intersection-of-two-linked-lists/description/
// No 160. 相交链表

/**
  编写一个程序，找到两个单链表相交的起始节点。

  例如，下面的两个链表：

  A:          a1 → a2
                     ↘
                       c1 → c2 → c3
                     ↗
  B:     b1 → b2 → b3
  在节点 c1 开始相交。

  注意：

  如果两个链表没有交点，返回 null.
  在返回结果后，两个链表仍须保持原有的结构。
  可假定整个链表结构中没有循环。
  程序尽量满足 O(n) 时间复杂度，且仅用 O(1) 内存。
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
// 思路: 我能想到就是借助于 set 来存储已访问的节点，如果后续在遇到就认为是相交了。
// 因为题目说保证没有循环
const getIntersectionNode = (headA, headB) => {
  const visited = new Set();

  let nodeA = headA;
  let nodeB = headB;
  while (nodeA) {
    visited.add(nodeA);
    nodeA = nodeA.next;
  }

  while (nodeB) {
    if (visited.has(nodeB)) return nodeB;
    visited.add(nodeB);
    nodeB = nodeB.next;
  }

  return null;
};

console.log(getIntersectionNode({}, {}));
