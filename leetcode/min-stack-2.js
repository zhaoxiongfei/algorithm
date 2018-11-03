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

/**
 * initialize your data structure here.
 */
// 思路: 参考了 leetcode 的最佳答案，简直五体投地
function MinStack() {
  const stack = [];

  /**
   * @param {number} x
   * @return {void}
   */
  const push = x => {
    let min = x;
    if (stack.length && stack[stack.length - 1] < x)
      min = stack[stack.length - 1];
    stack.push(x);
    stack.push(min);
  };

  /**
   * @return {void}
   */
  const pop = () => {
    stack.pop();
    stack.pop();
  };

  /**
   * @return {number}
   */
  const top = () => stack[stack.length - 2];

  /**
   * @return {number}
   */
  const getMin = () => stack[stack.length - 1];

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
minStack.pop();
console.log(minStack.top()); // 返回 0.
console.log(minStack.getMin()); // 返回 -2.
