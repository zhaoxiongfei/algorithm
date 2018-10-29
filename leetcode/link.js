function ListNode(val) {
  this.val = val;
  this.next = null;
}

ListNode.make = list => {
  if (list.length === 0) return null;
  let head = null;
  for (let i = list.length - 1; i >= 0; i -= 1) {
    const next = head;
    head = new ListNode(list[i]);
    head.next = next;
  }
  return head;
};

ListNode.toArray = head => {
  const list = [];
  let node = head;
  while (node) {
    list.push(node.val);
    node = node.next;
  }
  return list;
};

ListNode.create = ListNode.make;

module.exports = ListNode;
