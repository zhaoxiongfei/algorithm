const make = list => {
  if (list.length === 0) return null;
  let head = null;
  for (let i = list.length - 1; i >= 0; i -= 1) {
    head = { val: list[i], next: head };
  }
  return head;
};

const toArray = head => {
  const list = [];
  let node = head;
  while (node) {
    list.push(node.val);
    node = node.next;
  }
  return list;
};

module.exports = { make, toArray };
