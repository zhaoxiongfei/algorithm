// https://leetcode-cn.com/problems/linked-list-cycle-ii/description/
// No. 142

/**
 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。

 说明：不允许修改给定的链表。

 进阶：
 你是否可以不用额外空间解决此题？
 */

/**
 * Definition for singly-linked list.
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const detectCycle1 = (head, map = new Map()) => {
  if (!head) return null;
  if (map.get(head)) return head;
  map.set(head, true);
  return detectCycle1(head.next, map);
};

// 思路二: 设置快慢两个指针来扫描这个链表，如果有环必然会在某一刻相等，相当于快的超过慢的一圈了。
const detectCycle = head => {
  let slow = head;
  let fast = head;
  let _head = head;
  while (slow && fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      while (_head !== fast) {
        _head = _head.next;
        fast = fast.next;
      }
      return _head;
    }
  }
  return null;
};

const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);
head.next.next.next.next.next = new ListNode(6);
head.next.next.next.next.next.next = head.next.next;

console.log(detectCycle(head));
console.log(detectCycle1(head));
