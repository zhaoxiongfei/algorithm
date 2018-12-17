// https://leetcode-cn.com/problems/add-two-numbers-ii/
// No 445. 两数相加 II

/**
  给定两个非空链表来代表两个非负整数。
  数字最高位位于链表开始位置。它们的每个节点只存储单个数字。
  将这两数相加会返回一个新的链表。

  你可以假设除了数字 0 之外，这两个数字都不会以零开头。

  进阶:

  如果输入链表不能修改该如何处理？换句话说，你不能对列表中的节点进行翻转。

  示例:

  输入: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
  输出: 7 -> 8 -> 0 -> 7
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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = (l1, l2) => {
  let head = null;

  const list1 = [l1.val];
  const list2 = [l2.val];
  while (l1.next) {
    list1.push(l1.next.val);
    l1 = l1.next;
  }
  while (l2.next) {
    list2.push(l2.next.val);
    l2 = l2.next;
  }

  let base = 0;
  while (list1.length || list2.length) {
    const a = list1.pop() | 0;
    const b = list2.pop() | 0;
    const val = (base + a + b) % 10;
    base = base + a + b >= 10 ? 1 : 0;
    const node = new ListNode(val);
    node.next = head;
    head = node;
  }
  if (base) {
    const node = new ListNode(base);
    node.next = head;
    head = node;
  }

  return head;
};

console.log(
  ListNode.toArray(addTwoNumbers(ListNode.create([5]), ListNode.create([5])))
);

console.log(
  ListNode.toArray(
    addTwoNumbers(ListNode.create([7, 2, 4, 3]), ListNode.create([5, 6, 4]))
  )
);
