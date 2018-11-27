// https://leetcode-cn.com/problems/flatten-nested-list-iterator/description/
// No 341. 扁平化嵌套列表迭代器

/**
  给定一个嵌套的整型列表。设计一个迭代器，使其能够遍历这个整型列表中的所有整数。

  列表中的项或者为一个整数，或者是另一个列表。

  示例 1:

  输入: [[1,1],2,[1,1]]
  输出: [1,1,2,1,1]
  解释: 通过重复调用 next 直到 hasNext 返回false，next 返回的元素的顺序应该是: [1,1,2,1,1]。
  示例 2:

  输入: [1,[4,[6]]]
  输出: [1,4,6]
  解释: 通过重复调用 next 直到 hasNext 返回false，next 返回的元素的顺序应该是: [1,4,6]。
 */

/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */
/**
 * @constructor
 * @param {NestedInteger[]} nestedList
 */
function NestedIterator(list) {
  const data = [];
  let index = 0;

  const init = l => {
    for (const item of l) {
      if (Array.isArray(item)) {
        init(item);
      } else {
        data.push(item);
      }
    }
  };

  init(list);
  const { length } = data;

  /**
   * @this NestedIterator
   * @returns {boolean}
   */
  const hasNext = () => index < length;

  /**
   * @this NestedIterator
   * @returns {integer}
   */
  const next = () => data[index++];

  return { hasNext, next };
}

/**
 * Your NestedIterator will be called like this:
 * var i = new NestedIterator(nestedList), a = [];
 * while (i.hasNext()) a.push(i.next());
 */

// const list = [1, [4, [6]]];
const list = [[1, 1], 2, [1, 1]];
const instance = new NestedIterator(list);
const a = [];
while (instance.hasNext()) a.push(instance.next());
console.log(a);
