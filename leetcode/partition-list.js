// https://leetcode-cn.com/problems/partition-list/description/
const link = require("./link");

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
/**
  给定一个链表和一个特定值 x，对链表进行分隔，使得所有小于 x 的节点都在大于或等于 x 的节点之前。

  你应当保留两个分区中每个节点的初始相对位置。

  示例:

  输入: head = 1->4->3->2->5->2, x = 3
  输出: 1->2->2->4->3->5
*/

const partition = (head, x) => {
  let ltHead = null;
  let ltTail = null;
  let gteHead = null;
  let gteTail = null;
  let node = head;
  while (node) {
    if (node.val >= x) {
      if (gteHead === null) {
        gteHead = node;
        gteTail = node;
      } else {
        gteTail.next = node;
        gteTail = gteTail.next;
      }
    } else if (ltHead === null) {
      ltHead = node;
      ltTail = node;
    } else {
      ltTail.next = node;
      ltTail = ltTail.next;
    }
    node = node.next;
  }
  if (gteTail) gteTail.next = null;

  if (!ltHead) return gteHead;
  ltTail.next = gteHead;

  return ltHead;
};

console.log(link.toArray(partition(link.make([1, 4, 3, 2, 5, 2]), 3)));
