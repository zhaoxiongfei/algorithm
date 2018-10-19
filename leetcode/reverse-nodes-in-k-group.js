// https://leetcode-cn.com/problems/reverse-nodes-in-k-group/description/
/*
给出一个链表，每 k 个节点一组进行翻转，并返回翻转后的链表。

k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么将最后剩余节点保持原有顺序。

示例 :

给定这个链表：1->2->3->4->5

当 k = 2 时，应当返回: 2->1->4->3->5

当 k = 3 时，应当返回: 3->2->1->4->5

说明 :

你的算法只能使用常数的额外空间。
你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
*/

// 思路：先将链表转成数组，之后按组翻转，之后在重新整理为列表
const link2Array = node => {
  const list = [];
  let curr = node;
  while (curr) {
    list.push(curr);
    curr = curr.next;
  }
  return list;
};

const array2Link = list => {
  const head = { val: 0, next: null };
  let curr = head;
  while (list.length) {
    const node = list.shift();
    curr.next = node;
    curr = node;
  }

  curr.next = null;
  return head.next;
};

const reverse = (list, k) => {
  const group = Math.floor(list.length / k);
  const halfOfK = Math.floor(k / 2);
  for (let g = 0; g < group; g += 1) {
    for (let i = 0; i < halfOfK; i += 1) {
      const first = g * k + i;
      const second = g * k + k - i - 1;
      const tmp = list[first];
      list[first] = list[second];
      list[second] = tmp;
    }
  }

  return list;
};

const reverseKGroup = (node, k) => {
  const list = link2Array(node);
  if (list.length < k) return node;

  reverse(list, k);

  return array2Link(list);
};

const link = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5,
          next: {
            val: 6,
            next: null
          }
        }
      }
    }
  }
};
console.log(JSON.stringify(reverseKGroup(link, 2), null, 2));
