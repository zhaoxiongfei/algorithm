// https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/description/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
const makeLink = list => {
  if (list.length === 0) return null;
  let head = null;
  for (let i = list.length - 1; i >= 0; i -= 1) {
    head = { val: list[i], next: head };
  }
  return head;
};

const printLink = head => {
  const list = [];
  let node = head;
  while (node) {
    list.push(node.val);
    node = node.next;
  }
  return list;
};
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 此版本的删除重复保留一个
const deleteDuplicates2 = head => {
  let node = head;
  while (node) {
    if (!node.next) break;
    if (node.next.val === node.val) {
      node.next = node.next.next;
    } else {
      node = node.next;
    }
  }
  return head;
};

const deleteDuplicates = head => {
  let first = null;
  let tail = null;
  let node = head;
  let lastVal = NaN;
  while (node) {
    if (node.val === lastVal) {
      node = node.next;
      continue;
    }
    if (node.next && node.val === node.next.val) {
      lastVal = node.val;
      node = node.next.next;
      continue;
    }
    lastVal = NaN;
    if (first === null) {
      first = node;
      tail = node;
    } else {
      tail.next = node;
      tail = tail.next;
    }
    node = node.next;
  }
  if (tail) tail.next = null;

  return first;
};

console.log(printLink(deleteDuplicates(makeLink([1, 2, 2]))));
console.log(printLink(deleteDuplicates2(makeLink([1, 2, 2]))));
console.log(printLink(deleteDuplicates(makeLink([1, 2, 3, 3, 4, 4, 5]))));
console.log(printLink(deleteDuplicates2(makeLink([1, 2, 3, 3, 4, 4, 5]))));
