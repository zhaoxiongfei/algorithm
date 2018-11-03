// https://leetcode-cn.com/problems/min-stack/description/
// No 155. 最小栈

/**
  设计一个支持 push，pop，top 操作，并能在常数时间内检索到最小元素的栈。

  push(x) -- 将元素 x 推入栈中。
  pop() -- 删除栈顶的元素。
  top() -- 获取栈顶元素。
  getMin() -- 检索栈中的最小元素。
  示例:

  MinStack minStack = new MinStack();
  minStack.push(-2);
  minStack.push(0);
  minStack.push(-3);
  minStack.getMin();   --> 返回 -3.
  minStack.pop();
  minStack.top();      --> 返回 0.
  minStack.getMin();   --> 返回 -2.
 */
function LinkNode(val) {
  this.val = val;
  this.pre = null;
  this.next = null;
}
/**
 * initialize your data structure here.
 */
// 思路: 要求常数时间复杂度，我又想起了双向列表
// 利用双向列表来记录值大小的顺序
function MinStack() {
  const stack = [];
  let head = null;
  let tail = null;

  // 列表的顺序，大的在前，小的在后
  const insertNode = node => {
    if (!head) {
      head = node;
      tail = head;
      return;
    }
    // 如果要插入的值比第一个都大, 则直接作为第一个
    if (node.val >= head.val) {
      node.next = head;
      head.pre = node;
      head = node;
      return;
    }
    // 如果要插入的值比最后一个还小，则直接作为左后一个
    if (node.val <= tail.val) {
      tail.next = node;
      node.pre = tail;
      tail = node;
      return;
    }

    // 从头到尾扫描，插入到合适的位置
    let curr = head;
    while (curr) {
      if (node.val >= curr.val) {
        curr.pre.next = node;
        node.next = curr;
        node.pre = curr.pre;
        curr.pre = node;
        return;
      }
      curr = curr.next;
    }
  };

  const deleteNode = node => {
    if (node.pre) {
      node.pre.next = node.next;
    }
    if (node.next) {
      node.next.pre = node.pre;
    }
    if (node === tail) {
      tail = node.pre;
      if (tail) tail.next = null;
    }
    if (node === head) {
      head = node.next;
      if (head) head.pre = null;
    }
  };

  /**
   * @param {number} x
   * @return {void}
   */
  const push = x => {
    const node = new LinkNode(x);
    stack.push(node);
    insertNode(node);
  };

  /**
   * @return {void}
   */
  const pop = () => {
    const node = stack.pop();
    deleteNode(node);
    return node.val;
  };

  /**
   * @return {number}
   */
  const top = () => {
    const node = stack[stack.length - 1];
    if (!node) return undefined;
    return node.val;
  };

  /**
   * @return {number}
   */
  const getMin = () => {
    if (!tail) return undefined;
    return tail.val;
  };

  return { push, pop, top, getMin };
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = Object.create(MinStack).createNew()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); // 返回 -3.
console.log(minStack.pop());
console.log(minStack.top()); // 返回 0.
console.log(minStack.getMin()); // 返回 -2.
