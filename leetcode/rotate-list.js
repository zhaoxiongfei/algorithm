// https://leetcode-cn.com/problems/rotate-list/description/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
// 思路: 从头到尾扫描一遍，记录链表的长度 n，以及头节点 head 和尾节点 tail
// 移动 k % n 步，从头部找到第 curr = n - (k % n) 个节点，指向 NULL
// 尾节点 tail 指向刚才找到的头节点 head
const rotateRight = (head, k) => {
  if (!head) return head;
  if (k === 0) return head;
  let tail = head;
  let n = 1;
  while (tail.next) {
    n += 1;
    tail = tail.next;
  }
  let node = head;
  let i = 0;
  const curr = n - (k % n);
  console.log("n: %d, curr: %d", n, curr);
  if (curr === n) return head;
  while (node) {
    i += 1;
    if (curr === i) break;
    node = node.next;
  }

  const newHead = node.next;
  tail.next = head;
  node.next = null;

  return newHead;
};

const node = {
  val: 1,
  next: {
    val: 2,
    next: { val: 3, next: { val: 4, next: { val: 5, next: null } } }
  }
};
console.log(JSON.stringify(rotateRight(node, 2), null, 2));
