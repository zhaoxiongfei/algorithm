// https://leetcode-cn.com/problems/reverse-linked-list/description/
// No 206. 反转链表

/**
  反转一个单链表。

  示例:

  输入: 1->2->3->4->5->NULL
  输出: 5->4->3->2->1->NULL
  进阶:
  你可以迭代或递归地反转链表。你能否用两种方法解决这道题？
 */

const ListNode = require("./link");
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList1 = head => {
  if (!head) return head;
  let tail = head;
  const node = head;
  while (node.next) {
    const t = node.next;
    node.next = node.next.next;
    t.next = tail;
    tail = t;
  }

  return tail;
};

const reverseList = head => {
  if (!head || !head.next) return head;

  const tail = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return tail;
};

console.log(ListNode.toArray(reverseList1(ListNode.create([1, 2, 3, 4, 5]))));
console.log(ListNode.toArray(reverseList(ListNode.create([1, 2, 3, 4, 5]))));
