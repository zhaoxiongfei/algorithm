// https://leetcode-cn.com/problems/copy-list-with-random-pointer/description/
// No. 138
/**
 给定一个链表，每个节点包含一个额外增加的随机指针，该指针可以指向链表中的任何节点或空节点。

 要求返回这个链表的深度拷贝。
 */

/**
 * Definition for singly-linked list with a random pointer.
 */
function RandomListNode(label) {
  this.label = label;
  this.next = null;
  this.random = null;
}

/**
 * @param {RandomListNode} head
 * @return {RandomListNode}
 */
const copyRandomList = (head, map = new Map()) => {
  if (!head) return null;
  if (map.get(head)) return map.get(head);
  const clone = new RandomListNode(head.label);
  map.set(head, clone);
  if (head.next) clone.next = copyRandomList(head.next, map);
  if (head.random) clone.random = copyRandomList(head.random, map);
  return clone;
};
