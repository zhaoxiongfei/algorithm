// https://leetcode-cn.com/problems/palindrome-linked-list/description/
// No 234. 回文链表

/**
  请判断一个链表是否为回文链表。

  示例 1:

  输入: 1->2
  输出: false
  示例 2:

  输入: 1->2->2->1
  输出: true
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
 * @return {boolean}
 */
// 思路: 扫描一次变为双向列表, 第二次双向扫描来判断 O(N) 复杂度
const isPalindrome = head => {
  if (!head) return true;
  let curr = head;
  while (curr.next) {
    curr.next.prev = curr;
    curr = curr.next;
  }
  let forward = head;
  let backward = curr;
  while (forward && backward) {
    if (forward === backward) return true;
    if (forward.val !== backward.val) return false;
    if (forward.next === backward && backward.prev === forward) return true;
    forward = forward.next;
    backward = backward.prev;
  }

  return false;
};

console.log(isPalindrome(ListNode.create([1, 0, 1])));
