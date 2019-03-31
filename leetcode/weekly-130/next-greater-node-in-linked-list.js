/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
const ListNode = require("../link");
/**
 * @param {ListNode} head
 * @return {number[]}
 */
const nextLargerNodes = head => {
  const list = [head.val];
  let node = head;
  while (node.next) {
    list.push(node.next.val);
    node = node.next;
  }

  const { length } = list;
  const ans = Array(length).fill(0);
  for (let i = 0; i < length; i += 1) {
    let j = i + 1;
    while (j < length && list[j] <= list[i]) j += 1;
    console.log(j);
    if (j < length) ans[i] = list[j];
  }

  return ans;
};

console.log(nextLargerNodes(ListNode.create([3, 3])));
// console.log(nextLargerNodes(ListNode.create([2, 1, 5])));
// console.log(nextLargerNodes(ListNode.create([2, 7, 4, 3, 5])));
// console.log(nextLargerNodes(ListNode.create([1, 7, 5, 1, 9, 2, 5, 1])));
