const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const init = str => str.split(" ").map(x => x | 0);

const output = (list, isShadow = false, key = "options") => {
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(row => {
    const start = row * 9;
    const end = start + 9;
    if (isShadow) {
      console.log(
        list
          .slice(start, end)
          .map(x => Array.from(x[key]).join("."))
          .join("\t")
      );
    } else {
      console.log(list.slice(start, end).join("\t"));
    }
  });
};

// 计算当前格子索引的同行同列同宮的其他格子索引值
const getOthers = (() => {
  const dict = {};
  const palaces = {};
  const byRow = {};
  const byCol = {};
  const byPalace = {};
  // 先整理 9 个宫所对应的 index 序列 { [palace] = [index...] }
  for (let i = 0; i < 81; i += 1) {
    const [row, col] = [Math.floor(i / 9), i % 9];
    const palace = 3 * Math.floor(row / 3) + Math.floor(col / 3);
    if (!palaces[palace]) palaces[palace] = [];
    palaces[palace].push(i);
  }
  Object.values(palaces).forEach(indexes => {
    indexes.forEach(x => {
      dict[x] = new Set([].concat(indexes));
      byPalace[x] = new Set([].concat(indexes));
    });
  });
  for (let index = 0; index < 81; index += 1) {
    byRow[index] = new Set();
    byCol[index] = new Set();
    const [row, col] = [Math.floor(index / 9), index % 9];
    for (let i = 0; i < 9; i += 1) {
      dict[index].add(row * 9 + i); // 同行
      byRow[index].add(row * 9 + i);
      dict[index].add(i * 9 + col); // 同列
      byCol[index].add(i * 9 + col);
    }
    dict[index].delete(index);
    byRow[index].delete(index);
    byCol[index].delete(index);
    byPalace[index].delete(index);
  }
  const func = index => dict[index];

  func.byRow = index => byRow[index];
  func.byCol = index => byCol[index];
  func.byPalace = index => byPalace[index];

  return func;
})();

// 获取可能的选项
// 我为人人的做法，当前如果有确定值则更新同行、同列、同宫的其余可能性
const setOptions = (index, list, shadow) => {
  const value = list[index];
  // 等于 0 的格子无法给别人做任何贡献，先忽略
  if (value === 0) return;

  // 有确切的值，则 without 会除该值外的其他值
  const item = shadow[index];
  item.without = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  item.without.delete(value);

  // 获取同行，同列，同宫的其他索引值，挨个删除当前值
  getOthers(index).forEach(i => {
    const { options, without } = shadow[i];
    if (options.size === 1) {
      if (!options.has(value)) return;
      if (value === 2 && (i === 34 || i === 30)) {
        console.log(
          "index: %d; i: %d; value: %d; options: %s, options.has(value): %s",
          index,
          i,
          value,
          Array.from(options),
          options.has(value)
        );
      }
      // 照理来说要删除，如果已经只有一个了，且和当前值相等，说明出错了，抛出异常
      throw Error("冲突了");
    }
    options.delete(value);
    without.add(value); // 其他的格子排除项里加该值
    // 如果剔除后长度为 1, 即确定了答案，则递归设置
    if (options.size === 1) {
      list[i] = options.values().next().value;
      setOptions(i, list, shadow);
    }
  });
};

const setRequired = (i, list, shadow) => {
  const item = shadow[i];
  const { options } = item;
  if (options.size === 1) return;

  const keys = ["Row", "Col", "Palace"];
  for (let k = 0; k < 3; k += 1) {
    const key = keys[k];
    const others = Array.from(getOthers[`by${key}`](i));
    const one = Array.from(options).find(v =>
      others.every(x => shadow[x].without.has(v))
    );
    if (one) {
      list[i] = one;
      setOptions(i, list, shadow);
      break;
    }
  }
};

const startup = list => {
  const shadow = [];
  for (let i = 0; i < 81; i += 1) {
    shadow[i] = {
      // 利用 without 可以缩小 options, 如果某个 option 在这里不存在，那么该 option 就是当前格子的正解
      without: new Set([]), // 一定不出现的
      options: new Set(list[i] ? [list[i]] : [1, 2, 3, 4, 5, 6, 7, 8, 9]) // 可选择
    };
  }
  list.forEach((x, i) => {
    // 设置可能的选项
    setOptions(i, list, shadow);
  });

  list.forEach((x, i) => {
    // 设置当前格子同行、同列、同宮的其他格子的可能选项
    // 以此可以确定是否当前选项里有仅有某个唯一的选择
    // 原理: 当前格子可选集合 ∪ 同行/同列/同宮 其他格子可选集合等于全集 {1, 2, 3, 4, 5, 6, 7, 8, 9}
    setRequired(i, list, shadow);
  });

  output(list);
  output(shadow, true);

  // 检查是否还有零值
  if (list.find(x => !x) === undefined) return list;

  const tryStack = []; // 尝试的栈
  // 尝试栈为空则找到选择最少的不确定项压栈
  if (tryStack.length === 0) {
    const unknow = [];
    for (let index = 0; index < 81; index += 1) {
      if (list[index] === 0) {
        unknow.push({ index, options: shadow[index].options });
      }
    }
    unknow.sort((a, b) => (a.options.size > b.options.size ? 1 : -1));
    unknow[0].options.forEach(x => {
      const fork = [].concat(list);
      fork[unknow[0].index] = x;
      tryStack.push(fork);
    });
  }

  let fork;
  while ((fork = tryStack.pop())) {
    // output(list);
    output(list);
    output(shadow, true);
    // process.exit();
    try {
      return startup(fork);
    } catch (e) {
      if (tryStack.length === 0) {
        throw Error("冲突了，需要回溯");
      }
    }
  }
};

const calc = list => {
  try {
    const resolve = startup(list);
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(row => {
      const start = row * 9;
      const end = start + 9;
      return resolve.slice(start, end);
    });
  } catch (e) {
    console.error("哈哈", e);
    return [];
  }
};

// 整理输入信息, 把矩阵整理成一维数组，长度 81, 便于后续单次循环
const arrange = matrix => {
  const list = [].concat(...matrix);
  if (list.length !== 81) throw Error("元素必须是 9 * 9 共 81 个");
  list.forEach((x, i) => {
    list[i] = x | 0;
  });
  if (list.find(x => x < 0 || x > 9)) throw Error("每一个元素只能是 0 ~ 9");

  return list;
};

// 数独解法
// 输入：9 * 9 数字矩阵, 每个数字取值 0 ~ 9
// 输出：最终完成后的数独矩阵，9 * 9 数字取值 1 ~ 9, 或者 无解
const matrix = [];
rl.on("line", input => {
  matrix.push(init(input.trim()));
});

rl.on("close", () => {
  console.log(
    calc(arrange(matrix))
      .map(row => row.join(" "))
      .join("\n")
  );
});
