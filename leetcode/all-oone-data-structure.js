// https://leetcode-cn.com/problems/all-oone-data-structure/
// No 432. 全 O(1) 的数据结构

/**
  实现一个数据结构支持以下操作：

  Inc(key) - 插入一个新的值为 1 的 key。或者使一个存在的 key 增加一，保证 key 不为空字符串。
  Dec(key) - 如果这个 key 的值是 1，那么把他从数据结构中移除掉。否者使一个存在的 key 值减一。如果这个 key 不存在，这个函数不做任何事情。key 保证不为空字符串。
  GetMaxKey() - 返回 key 中值最大的任意一个。如果没有元素存在，返回一个空字符串""。
  GetMinKey() - 返回 key 中值最小的任意一个。如果没有元素存在，返回一个空字符串""。
  挑战：以 O(1) 的时间复杂度实现所有操作。
 */

function ListNode(data, count = 1) {
  this.count = count;
  this.data = data;
  this.prev = null;
  this.succ = null;
}

ListNode.prototype.insertAfter = function insertAfter(node) {
  this.succ.prev = node;
  node.succ = this.succ;
  this.succ = node;
  node.prev = this;
};

ListNode.prototype.remove = function remove() {
  this.prev.succ = this.succ;
  this.succ.prev = this.prev;
};

function Nodes() {
  const map = new Map();

  const header = new ListNode();
  const tailer = new ListNode();
  header.succ = tailer;
  tailer.prev = header;
  const add = key => {
    const node = new ListNode(key);
    header.insertAfter(node);
    map.set(key, node);
  };

  const remove = key => {
    const node = map.get(key);
    if (node) {
      node.remove();
      map.delete(key);
    }
  };

  return {
    add,
    remove,
    header,
    size() {
      return map.size;
    }
  };
}

/**
 * Initialize your data structure here.
 */
function AllOne() {
  const header = new ListNode(new Nodes(), 0);
  const tailer = new ListNode(new Nodes(), Infinity);
  header.succ = tailer;
  tailer.prev = header;

  const map = new Map(); // count => node
  map.set(0, header);
  map.set(Infinity, tailer);
  const cmap = new Map(); // key => count
  /**
   * Inserts a new key <Key> with value 1. Or increments an existing key by 1.
   * @param {string} key
   * @return {void}
   */
  const inc = key => {
    let count = cmap.get(key) || 0;
    count += 1;
    cmap.set(key, count); // 修正计数
    const last = map.get(count - 1); // 找到之前的节点
    let node = map.get(count); // 得到新阶层
    if (!node) {
      // 新阶层可能不存在
      node = new ListNode(new Nodes(), count);
      last.insertAfter(node); // 插入到之前阶层的下一阶层
      map.set(count, node); // 将该阶层加入到 map
    }
    node.data.add(key); // 加入新阶层（阶层跃升完毕）

    if (1 < count) {
      // 从原有阶层剔除掉
      last.data.remove(key); // 从之前节点删除，阶层跃升了。
      if (last.data.size() === 0) {
        // 原阶层是否需要删除
        map.delete(count - 1); // 删除映射表
        last.remove(); // 从列表删除
      }
    }
  };

  /**
   * Decrements an existing key by 1. If Key's value is 1, remove it from the data structure.
   * @param {string} key
   * @return {void}
   */
  const dec = key => {
    let count = cmap.get(key); // 根据映射表找到该key的计数值
    if (!count) return; // 不存在则直接退出
    const last = map.get(count); // 找到原有阶层
    count -= 1;

    if (count) {
      cmap.set(key, count); // 更新计数映射表
      let node = map.get(count); // 尝试获取新阶层
      if (!node) {
        // 新阶层可能不存在，需要创建
        node = new ListNode(new Nodes(), count);
        last.prev.insertAfter(node); // 新阶层插入到之前阶层前序阶层的后面
        map.set(count, node); // 将该阶层加入的映射表
      }
      node.data.add(key); // 加入新阶层（阶层滑落完毕）
    } else {
      // 可能要直接消失
      cmap.delete(key); // 从计数映射表移除
    }
    last.data.remove(key); // 从原有阶层移除
    if (last.data.size() === 0) {
      // 原阶层是否需要删除
      map.delete(count + 1); // 删除映射表
      last.remove(); // 从列表删除
    }
  };

  /**
   * Returns one of the keys with maximal value.
   * @return {string}
   */
  const getMaxKey = () => {
    if (tailer.prev === header) return "";
    return tailer.prev.data.header.succ.data;
  };

  /**
   * Returns one of the keys with Minimal value.
   * @return {string}
   */
  const getMinKey = () => {
    if (header.succ === tailer) return "";
    return header.succ.data.header.succ.data;
  };

  return { inc, dec, getMaxKey, getMinKey, header, tailer, map, cmap };
}

/**
 * Your AllOne object will be instantiated and called as such:
 * var obj = Object.create(AllOne).createNew()
 * obj.inc(key)
 * obj.dec(key)
 * var param_3 = obj.getMaxKey()
 * var param_4 = obj.getMinKey()
 */

const instance = new AllOne();
instance.inc("a");
instance.inc("a");

console.log(instance.getMaxKey());
console.log(instance.getMinKey());

instance.inc("b");
console.log(instance.getMaxKey());
console.log(instance.getMinKey());
