// https://leetcode-cn.com/problems/lru-cache/description/
// No. 146

/**
 运用你所掌握的数据结构，设计和实现一个  LRU (最近最少使用) 缓存机制。它应该支持以下操作： 获取数据 get 和 写入数据 put 。

 获取数据 get(key) - 如果密钥 (key) 存在于缓存中，则获取密钥的值（总是正数），否则返回 -1。
 写入数据 put(key, value) - 如果密钥不存在，则写入其数据值。当缓存容量达到上限时，它应该在写入新数据之前删除最近最少使用的数据值，从而为新的数据值留出空间。

 进阶:

 你是否可以在 O(1) 时间复杂度内完成这两种操作？

 示例:

 LRUCache cache = new LRUCache( 2 ); // 2 为缓存最大容量

 cache.put(1, 1);
 cache.put(2, 2);
 cache.get(1);        // 返回  1
 cache.put(3, 3);     // 该操作会使得密钥 2 作废
 cache.get(2);        // 返回 -1 (未找到)
 cache.put(4, 4);     // 该操作会使得密钥 1 作废
 cache.get(1);        // 返回 -1 (未找到)
 cache.get(3);        // 返回  3
 cache.get(4);        // 返回  4
 */

/**
 * @param {number} capacity
 */
function LRUCache(capacity) {
  const cache = {};
  const keys = [];

  /**
   * @param {number} key
   * @return {number}
   */
  const get = key => {
    let index = keys.indexOf(key);
    if (index === -1) return -1;
    while (index > 0) {
      keys[index] = keys[index - 1];
      index -= 1;
    }
    keys[0] = key;

    return cache[key];
  };

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  const put = (key, value) => {
    if (keys.includes(key)) {
      cache[key] = value;
      get(key);
      return;
    }
    if (keys.length === capacity) {
      // 末位淘汰法
      const del = keys.pop();
      delete cache[del];
    }
    cache[key] = value;
    keys.unshift(key);
  };

  return { get, put };
}

const cache = LRUCache(2);
const args = [[2], [2, 6], [1], [1, 5], [1, 2], [1], [2]];
["get", "put", "get", "put", "put", "get", "get"].forEach((fn, i) => {
  console.log(cache[fn](...args[i]));
});

// 思路二: 这个问题如果要想时间复杂度是 O(1) 不能用数组来存储 keys, 数组的删除、插入都是 O(n)的复杂度
// 用双向链表来实现
function LinkNode(key, val) {
  this.key = key;
  this.val = val;
  this.next = null;
  this.pre = null;
}

function LRUCache2(capacity) {
  let head = null; // 双向链表头节点
  const map = new Map();
  let tail = null; // 双向链表尾节点

  const get = key => {
    const node = map.get(key);
    // 不存在直接返回 -1
    if (!node) return -1;

    // 已经是头部
    if (head === node) return node.val;

    // 返回cache值之前需要调整双向列表, 保证当前读取的这个在head位
    if (capacity > 1 && map.size > 1) {
      node.pre.next = node.next;
      node.pre = null;
      node.next = head;
    }

    return node.val;
  };

  const put = (key, value) => {
    if (capacity < 1) return;

    const node = map.get(key);
    // 如果已经存在
    if (node) {
      // 更新值
      node.val = value;
      // 利用 get 调整顺序
      get(key);
      return;
    }

    const newNode = new LinkNode(key, value);
    if (capacity === 1) {
      if (head) map.delete(head.key);
      head = newNode;
      map.set(key, newNode);
      return;
    }
    if (capacity === map.size) {
      if (tail) tail.pre.next = null; // 删除 tail 自身
      map.delete(tail.key);
      tail = tail.pre;
    }
    map.set(key, newNode);
    if (head) head.pre = newNode;
    newNode.next = head;
    head = newNode;
  };

  return { get, put };
}

const cache1 = LRUCache2(2);
const args1 = [[1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]];
["put", "put", "get", "put", "get", "put", "get", "get", "get"].forEach(
  (fn, i) => {
    console.log(cache1[fn](...args1[i]));
  }
);
