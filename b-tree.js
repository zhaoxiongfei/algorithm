const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const init = str => str.split(" ").map(x => +x || 0);

const getMid = (left, right) => Math.floor((left + right) / 2);

const node = value => ({
  value
});

const insert = (root, value) => {
  let key;
  if (value < root.value) key = "left";
  if (value > root.value) key = "right";
  if (value === root.value) return false;

  if (root[key] == null) {
    root[key] = node(value);
    return true;
  }
  return insert(root[key], value);
};

/**
 * 思路：依次插入
 * 比根小的放在左节点，比根大的放在右节点
 */
const calc = str => {
  const a = init(str);
  const { length } = a;
  const root = node(a[0]);
  for (let i = 1; i < length; i += 1) {
    insert(root, a[i]);
  }
  return JSON.stringify(root, null, 2);
};

// 二叉树的插入
// 15 5 3 12 16 20 23 13 18 10 6 7
rl.on("line", input => {
  console.log(calc(input.trim()));
});
