// https://leetcode-cn.com/problems/merge-two-sorted-lists/description/

const mergeTwoLists = (l1, l2) => {
  if (!l1) return l2;
  if (!l2) return l1;

  let head = l1; // 头节点
  let other = l2; // 另外一个链
  let curr = l1; // 当前所在节点
  if (l2.val < l1.val) {
    head = l2;
    other = l1;
    curr = l2;
  }
  while (other) {
    if (!curr.next) {
      curr.next = other;
      break;
    }
    if (other.val < curr.next.val) {
      const tmp = other;
      other = curr.next;
      curr.next = tmp;
      curr = tmp;
    } else {
      curr = curr.next;
    }
  }

  return head;
};

const link1 = {
  val: 2,
  next: null
};
const link2 = {
  val: 1,
  next: null
};
console.log(mergeTwoLists(link1, link2));
