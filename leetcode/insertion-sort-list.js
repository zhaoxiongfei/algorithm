// https://leetcode-cn.com/problems/insertion-sort-list/description/
// No. 147

/**
 对链表进行插入排序。


 插入排序的动画演示如上。从第一个元素开始，该链表可以被认为已经部分排序（用黑色表示）。
 每次迭代时，从输入数据中移除一个元素（用红色表示），并原地将其插入到已排好序的链表中。

 插入排序算法：

 插入排序是迭代的，每次只移动一个元素，直到所有元素可以形成一个有序的输出列表。
 每次迭代中，插入排序只从输入数据中移除一个待排序的元素，找到它在序列中适当的位置，并将其插入。
 重复直到所有输入数据插入完为止。


 示例 1：

 输入: 4->2->1->3
 输出: 1->2->3->4
 示例 2：

 输入: -1->5->3->4->0
 输出: -1->0->3->4->5
 */
const ListNode = require("./link");
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

const insertSort = (curr, fake) => {
  if (!curr) return false;
  const { next } = curr;
  if (!next) return false;
  if (next.val >= curr.val) return false;

  let node = fake;
  while (node) {
    if (node.next.val >= next.val) {
      const tmp = node.next;
      node.next = next;
      curr.next = next.next;
      next.next = tmp;
      return true;
    }
    node = node.next;
  }
  return false;
};

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const insertionSortList = head => {
  if (!head) return null;
  if (!head.next) return head;
  const fake = new ListNode(0);
  fake.next = head;

  let curr = head;
  while (curr) {
    if (!insertSort(curr, fake)) {
      curr = curr.next;
    }
  }

  return fake.next;
};

console.log(ListNode.toArray(insertionSortList(ListNode.create([4, 2, 1, 3]))));
