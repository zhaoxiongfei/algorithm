// https://leetcode-cn.com/problems/accounts-merge/
// No 721. 账户合并

/**
  给定一个列表 accounts，每个元素 accounts[i] 是一个字符串列表，
  其中第一个元素 accounts[i][0] 是 名称 (name)，
  其余元素是 emails 表示该帐户的邮箱地址。

  现在，我们想合并这些帐户。
  如果两个帐户都有一些共同的邮件地址，则两个帐户必定属于同一个人。
  请注意，即使两个帐户具有相同的名称，它们也可能属于不同的人，因为人们可能具有相同的名称。
  一个人最初可以拥有任意数量的帐户，但其所有帐户都具有相同的名称。

  合并帐户后，按以下格式返回帐户：每个帐户的第一个元素是名称，
  其余元素是按顺序排列的邮箱地址。accounts 本身可以以任意顺序返回。

  例子 1:

  Input:
  accounts = [
    ["John", "johnsmith@mail.com", "john00@mail.com"],
    ["John", "johnnybravo@mail.com"],
    ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
    ["Mary", "mary@mail.com"]
  ]
  Output: [
    ["John", 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com'],
    ["John", "johnnybravo@mail.com"],
    ["Mary", "mary@mail.com"]
  ]
  Explanation:
    第一个和第三个 John 是同一个人，因为他们有共同的电子邮件 "johnsmith@mail.com"。
    第二个 John 和 Mary 是不同的人，因为他们的电子邮件地址没有被其他帐户使用。
    我们可以以任何顺序返回这些列表，例如答案[['Mary'，'mary@mail.com']，['John'，'johnnybravo@mail.com']，
    ['John'，'john00@mail.com'，'john_newyork@mail.com'，'johnsmith@mail.com']]仍然会被接受。

  注意：

  accounts的长度将在[1，1000]的范围内。
  accounts[i]的长度将在[1，10]的范围内。
  accounts[i][j]的长度将在[1，30]的范围内。
 */

const parent = Symbol("parent");
const find = Symbol("find");

/**
 * Segment-tree 线段树(区间树)类
 * @class
 * @param {Array} _elem 初始数组
 * @return {List} Instance
 */
class UnionFind {
  /** Create a SegmentTree instance */
  constructor(size) {
    this[parent] = Array(size);
    for (let i = 0; i < size; i += 1) {
      this[parent][i] = i;
    }
  }

  /**
   * 获取数据长度/大小
   * @tithis.O(1)
   * @space O(1)
   *
   * @return {number}
   */
  get size() {
    return this[parent].length;
  }

  /**
   * 查找p所属的集合编号
   * @param {Number} p
   * @time O(log*N)
   * @space O(1);
   *
   * @return {Number}
   */
  [find](p) {
    if (p !== this[parent][p]) {
      this[parent][p] = this[find](this[parent][p]);
    }
    return this[parent][p];
  }

  /**
   * 链接两个元素
   * @param {Number} p
   * @param {Number} q
   * @time O(log*N)
   * @space O(1);
   *
   * @return {void}
   */
  union(p, q) {
    const pP = this[find](p);
    const qP = this[find](q);
    if (pP === qP) return;
    this[parent][pP] = qP;
  }

  /**
   * 判断两个元素是否相连
   * @param {Number} p
   * @param {Number} q
   * @time O(logN)
   * @space O(1)
   *
   * @return {Boolean}
   */
  isConnected(p, q) {
    return this[find](p) === this[find](q);
  }
}

/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
const accountsMerge = accounts => {
  const { length } = accounts;
  if (length < 2) return accounts;
  const uf = new UnionFind(length);
  const dict = {};
  for (let i = 0; i < length; i += 1) {
    for (let j = 1; j < accounts[i].length; j += 1) {
      const email = accounts[i][j];
      if (dict[email] !== undefined) {
        uf.union(dict[email], i);
      } else {
        dict[email] = i;
      }
    }
  }

  const acs = [];
  const finished = new Set(); // 记录已完成的编号
  for (let i = 0; i < length; i += 1) {
    if (finished.has(i)) continue;
    finished.add(i);
    let emails = new Set(accounts[i].slice(1));
    for (let j = 0; j < length; j += 1) {
      if (finished.has(j)) continue;
      if (!uf.isConnected(i, j)) continue;
      for (let k = 1; k < accounts[j].length; k += 1) {
        emails.add(accounts[j][k]);
      }
      finished.add(j);
    }
    emails = Array.from(emails);
    emails.sort((a, b) => (a > b ? 1 : -1));
    emails.unshift(accounts[i][0]);
    acs.push(emails);
  }

  return acs;
};

console.log(
  accountsMerge([
    ["David", "David0@m.co", "David1@m.co"],
    ["David", "David3@m.co", "David4@m.co"],
    ["David", "David4@m.co", "David5@m.co"],
    ["David", "David2@m.co", "David3@m.co"],
    ["David", "David1@m.co", "David2@m.co"]
  ])
);

console.log(
  accountsMerge([
    ["David", "David0@m.co", "David1@m.co", "David2@m.co"],
    ["David", "David2@m.co", "David3@m.co", "David4@m.co", "David5@m.co"]
  ])
);

console.log(
  accountsMerge([
    ["John", "johnsmith@mail.com", "john00@mail.com"],
    ["John", "johnnybravo@mail.com"],
    ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
    ["Mary", "mary@mail.com"]
  ])
);
