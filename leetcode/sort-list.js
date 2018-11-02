// https://leetcode-cn.com/problems/sort-list/description/
// No. 148

/**
 在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序。

 示例 1:

 输入: 4->2->1->3
 输出: 1->2->3->4
 示例 2:

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

// 找到一个列表的中点，利用快慢指针的办法
// 快指针是慢指针的二倍，所以快指针到结尾了，慢指针所在位置就是中点
const split = head => {
  if (!head) return null;
  let fast = head;
  let slow = head;

  while (fast) {
    fast = fast.next;
    if (fast) fast = fast.next;
    if (!fast) break;

    slow = slow.next;
  }

  const head2 = slow.next; // 慢指针的下一个节点作为中间节点
  slow.next = null; // 斩断两半部分

  return head2;
};

// 按照值的大小合并两个链表
const merge = (head1, head2) => {
  if (!head1) return head2;
  if (!head2) return head1;

  const fake = new ListNode(0);
  let tail = fake;
  let node1 = head1;
  let node2 = head2;
  while (node1 && node2) {
    if (node1.val <= node2.val) {
      tail.next = node1;
      node1 = node1.next;
    } else {
      tail.next = node2;
      node2 = node2.next;
    }
    tail = tail.next;
  }
  if (node1) tail.next = node1;
  if (node2) tail.next = node2;

  return fake.next;
};

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// https://blog.csdn.net/weixin_42014942/article/details/79985024
// 参考上面的文章，因为要求时间复杂度 O(nlogn) 所以采纳归并排序
const sortList = head => {
  if (head === null || head.next === null) return head;

  let head1 = head; // 一分为二，所以第一半的头就是整体的头
  let head2 = split(head); // 切分找到终点，作为第二半的头

  head1 = sortList(head1); // 递归第一半
  head2 = sortList(head2); // 递归第二半

  return merge(head1, head2); // 合并
};

console.log(ListNode.toArray(sortList(ListNode.create([4, 2, 1, 3]))));
console.log(ListNode.toArray(sortList(ListNode.create([-1, 5, 3, 4, 0]))));
