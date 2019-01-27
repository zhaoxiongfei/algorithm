// 在有序向量的区间[lo, hi)查找元素不大于 e 的元素的最大秩, 0 <= lo <= hi <= size
const binSearch = (_elem, e, lo = 0, hi = _elem.length) => {
  while (lo < hi) {
    const mi = (lo + hi) >> 1; // 寻找中点
    // 经比较后确认深入 [lo, mi) 或 [mi + 1, hi)
    if (e < _elem[mi][1]) hi = mi;
    else lo = mi + 1;
  }
  // 查找成功不能提前终止

  // 循环结束时， lo 为大于e的元素的最小的秩，故 lo - 1即不大于 e de元素的最大秩
  return lo - 1;
};

/**
 * Initialize your data structure here.
 */
function TimeMap() {
  const map = new Map();

  /**
   * @param {string} key
   * @param {string} value
   * @param {number} timestamp
   * @return {void}
   */
  const set = (key, value, timestamp) => {
    const root = map.get(key);
    if (!root) {
      map.set(key, [[value, timestamp]]);
      return;
    }
    root.push([value, timestamp]);
    console.log(root);
  };

  /**
   * @param {string} key
   * @param {number} timestamp
   * @return {string}
   */
  const get = (key, timestamp) => {
    const list = map.get(key);
    if (!list) return "";
    const index = binSearch(list, timestamp, 0, list.length);
    if (index === -1) return "";
    return list[index][0];
  };

  return { set, get };
}

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = Object.create(TimeMap).createNew()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */
/*
const fns = ["set", "get", "get", "set", "get", "get"];
const args = [
  ["foo", "bar", 1],
  ["foo", 1],
  ["foo", 3],
  ["foo", "bar2", 4],
  ["foo", 4],
  ["foo", 5]
];

const instance = new TimeMap();
fns.forEach((fn, i) => console.log(instance[fn](...args[i])));
*/

const fns = ["set", "set", "get", "get", "get", "get", "get"];
const args = [
  ["love", "high", 10],
  ["love", "low", 20],
  ["love", 5],
  ["love", 10],
  ["love", 15],
  ["love", 20],
  ["love", 25]
];

const instance = new TimeMap();
fns.forEach((fn, i) =>
  console.log("i: %d, res: %s", i, instance[fn](...args[i]))
);
