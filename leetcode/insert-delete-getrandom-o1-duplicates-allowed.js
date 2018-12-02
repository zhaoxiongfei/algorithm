// https://leetcode-cn.com/problems/insert-delete-getrandom-o1-duplicates-allowed/description/
// No 381. O(1) 时间插入、删除和获取随机元素 - 允许重复

/**
  设计一个支持在平均 时间复杂度 O(1) 下， 执行以下操作的数据结构。

  注意: 允许出现重复元素。

  insert(val)：向集合中插入元素 val。
  remove(val)：当 val 存在时，从集合中移除一个 val。
  getRandom：从现有集合中随机获取一个元素。每个元素被返回的概率应该与其在集合中的数量呈线性相关。
  示例:

  // 初始化一个空的集合。
  RandomizedCollection collection = new RandomizedCollection();

  // 向集合中插入 1 。返回 true 表示集合不包含 1 。
  collection.insert(1);

  // 向集合中插入另一个 1 。返回 false 表示集合包含 1 。集合现在包含 [1,1] 。
  collection.insert(1);

  // 向集合中插入 2 ，返回 true 。集合现在包含 [1,1,2] 。
  collection.insert(2);

  // getRandom 应当有 2/3 的概率返回 1 ，1/3 的概率返回 2 。
  collection.getRandom();

  // 从集合中删除 1 ，返回 true 。集合现在包含 [1,2] 。
  collection.remove(1);

  // getRandom 应有相同概率返回 1 和 2 。
  collection.getRandom();
 */

/**
 * Initialize your data structure here.
 */
function RandomizedCollection() {
  const elem = [];
  const map = {};
  /**
   * Inserts a value to the collection.
   * Returns true if the collection did not already contain the specified element.
   * @param {number} val
   * @return {boolean}
   */
  const insert = val => {
    const len = elem.push(val);
    if (!map[val]) map[val] = [];
    map[val].push(len - 1);
    return map[val].length === 1;
  };

  /**
   * Removes a value from the collection.
   * Returns true if the collection contained the specified element.
   * @param {number} val
   * @return {boolean}
   */
  const remove = val => {
    if (map[val] === undefined || map[val].length === 0) return false;
    const removed = map[val].pop();
    if (removed !== elem.length - 1) {
      const tailer = elem.pop();
      elem[removed] = tailer;
      map[tailer][map[tailer].indexOf(elem.length)] = removed;
    } else {
      elem.pop();
    }
    return true;
  };

  /**
   * Get a random element from the collection.
   * @return {number}
   */
  const getRandom = () => elem[((Math.random() * 9999999) | 0) % elem.length];

  return {
    insert,
    remove,
    getRandom,
    getData() {
      return { elem, map };
    }
  };
}

const coll = new RandomizedCollection();
coll.insert(10);
coll.insert(10);
coll.insert(20);
coll.insert(20);
coll.insert(30);
coll.insert(30);
console.log(coll.getData());
coll.remove(10);
console.log(coll.getData());
coll.remove(10);
console.log(coll.getData());
coll.remove(30);
console.log(coll.getData());
coll.remove(30);
coll.getRandom();
coll.getRandom();
coll.getRandom();
coll.getRandom();
coll.getRandom();
coll.getRandom();
coll.getRandom();
coll.getRandom();
coll.getRandom();
coll.getRandom();
console.log(coll.getData());
