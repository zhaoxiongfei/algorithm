// https://leetcode-cn.com/problems/reorder-list/description/
// No. 143

/**
 给定一个单链表 L：L0→L1→…→Ln-1→Ln ，
 将其重新排列后变为： L0→Ln→L1→Ln-1→L2→Ln-2→…

 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

 示例 1:

 给定链表 1->2->3->4, 重新排列为 1->4->2->3.
 示例 2:

 给定链表 1->2->3->4->5, 重新排列为 1->5->2->4->3.
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
 * @return {void} Do not return anything, modify head in-place instead.
 */
// 思路: 笨办法一次扫描链表入数组，之后按照规则重新组织链表, 将数组当成队列和栈，依次出队、出栈
const reorderList = head => {
  let node = head;
  const list = [];
  while (node) {
    list.push(node);
    node = node.next;
  }

  node = new ListNode();
  while (list.length) {
    const h = list.shift();
    const t = list.pop();
    node.next = h;
    node.next.next = t;
    node = node.next.next;
  }

  if (node) node.next = null;
};

const list = ListNode.create([1, 2, 3, 4, 5]);
reorderList(list);
console.log(list);
