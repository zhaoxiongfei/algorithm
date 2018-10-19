// https://leetcode-cn.com/problems/swap-nodes-in-pairs/description/

const swapPairs = link => {
  if (!link) return null;
  const head = { val: 0, next: null };
  let curr = head;
  let node = link;
  while (node) {
    const first = node;
    const second = first.next;
    if (!second) {
      // 如果第二个不存在，直接将第一个挂在 curr.next 上
      curr.next = first;
      node = second;
      curr = curr.next;
    } else {
      first.next = second.next;
      second.next = first;
      curr.next = second;
      node = first.next;
      curr = first;
    }
  }
  return head.next;
};

const link = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: null
      }
    }
  }
};
console.log(swapPairs(link));
