// https://leetcode-cn.com/problems/design-circular-deque/
// No 641. 设计循环双端队列

/**
 * Initialize your data structure here. Set the size of the deque to be k.
 * @param {number} k
 */
function MyCircularDeque(k) {
  const q = [];
  /**
   * Checks whether the circular deque is empty or not.
   * @return {boolean}
   */
  const isEmpty = () => q.length === 0;

  /**
   * Checks whether the circular deque is full or not.
   * @return {boolean}
   */
  const isFull = () => q.length === k;

  /**
   * Adds an item at the front of Deque. Return true if the operation is successful.
   * @param {number} value
   * @return {boolean}
   */
  const insertFront = value => {
    if (isFull()) return false;
    q.unshift(value);
    return true;
  };

  /**
   * Adds an item at the rear of Deque. Return true if the operation is successful.
   * @param {number} value
   * @return {boolean}
   */
  const insertLast = value => {
    if (isFull()) return false;
    q.push(value);
    return true;
  };

  /**
   * Deletes an item from the front of Deque. Return true if the operation is successful.
   * @return {boolean}
   */
  const deleteFront = () => {
    if (isEmpty()) return false;
    q.shift();
    return true;
  };

  /**
   * Deletes an item from the rear of Deque. Return true if the operation is successful.
   * @return {boolean}
   */
  const deleteLast = () => {
    if (isEmpty()) return false;
    q.pop();
    return true;
  };

  /**
   * Get the front item from the deque.
   * @return {number}
   */
  const getFront = () => {
    if (isEmpty()) return -1;
    return q[0];
  };

  /**
   * Get the last item from the deque.
   * @return {number}
   */
  const getRear = () => {
    if (isEmpty()) return -1;
    return q[q.length - 1];
  };

  return {
    isEmpty,
    isFull,
    insertFront,
    insertLast,
    deleteFront,
    deleteLast,
    getFront,
    getRear
  };
}

const obj = new MyCircularDeque(2);
obj.getFront();

/**
 * Your MyCircularDeque object will be instantiated and called as such:
 * var obj = Object.create(MyCircularDeque).createNew(k)
 * var param_1 = obj.insertFront(value)
 * var param_2 = obj.insertLast(value)
 * var param_3 = obj.deleteFront()
 * var param_4 = obj.deleteLast()
 * var param_5 = obj.getFront()
 * var param_6 = obj.getRear()
 * var param_7 = obj.isEmpty()
 * var param_8 = obj.isFull()
 */
