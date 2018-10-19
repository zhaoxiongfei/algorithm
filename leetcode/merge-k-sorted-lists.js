// https://leetcode-cn.com/problems/merge-k-sorted-lists/description/
//

const mergeKLists = lists => {
  const head = {
    val: 0,
    next: null
  };

  const everyIsNull = array => {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i]) return false;
    }
    return true;
  };

  let curr = head;
  while (!everyIsNull(lists)) {
    let minNode = null;
    let minIndex = 0;
    for (let i = 0; i < lists.length; i += 1) {
      const node = lists[i];
      if (!node) continue;
      if (minNode) {
        if (minNode.val > node.val) {
          minNode = node;
          minIndex = i;
        }
      } else {
        minNode = node;
        minIndex = i;
      }
    }
    lists[minIndex] = minNode.next;
    curr.next = minNode;
    curr = minNode;
  }

  return head.next;
};

const links = [
  { val: 1, next: null },
  { val: 2, next: null },
  { val: -1, next: { val: 5, next: null } }
];
console.log(mergeKLists(links));
