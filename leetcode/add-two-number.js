/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

const makeLink = num => {
  const list = num
    .toString()
    .split("")
    .map(x => x | 0);
  let node = null;
  while (list.length) {
    const val = list.shift();
    node = { val, next: node };
  }

  return node;
};

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = (l1, l2) => {
  let first = l1;
  let second = l2;

  const result = [];
  let overflow = false;
  while (first || second) {
    let val = 0;
    if (first) {
      val += first.val;
      first = first.next;
    }
    if (second) {
      val += second.val;
      second = second.next;
    }
    if (overflow) val += 1;
    overflow = val >= 10;
    result.push(val % 10);
  }
  if (overflow) result.push(1);

  return result;
};

console.log(addTwoNumbers(makeLink(9), makeLink(9999999991)));
