// https://leetcode-cn.com/problems/linked-list-cycle/description/
// No. 141

/**
  给定一个链表，判断链表中是否有环。

  进阶：
  你能否不使用额外空间解决此题？
 */

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
const hasCycle1 = (head, map = new Map()) => {
  if (!head) return false;
  if (map.get(head)) return true;
  map.set(head, true);
  return hasCycle1(head.next, map);
};

// 思路二: 设置快慢两个指针来扫描这个链表，如果有环必然会在某一刻相等，相当于快的超过慢的一圈了。
const hasCycle = head => {
  let fast = head;
  let slow = head;
  while (fast && slow) {
    if (!fast.next) return false;
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
};

console.log(hasCycle({}));
