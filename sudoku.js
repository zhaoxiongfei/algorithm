const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const init = str => str.split(" ").map(x => x | 0);

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

  // 获取同行，同列，同宫的其他索引值，挨个删除当前值
  getOthers(index).forEach(i => {
    const { options } = shadow[i];
    if (options.size === 1) return; // 无须删除
    options.delete(value);
    // 如果剔除后长度为 1, 即确定了答案，则递归设置
    if (options.size === 1) {
      list[i] = options.values().next().value;
      setOptions(i, list, shadow);
    }
  });

  // 把同行的可选项删除当前值
  getOthers.byRow(index).forEach(i => {
    const { withoutByRow } = shadow[i];
    withoutByRow.delete(value);
  });

  // 把同行的可选项删除当前值
  getOthers.byCol(index).forEach(i => {
    const { withoutByCol } = shadow[i];
    withoutByCol.delete(value);
  });

  // 把同宫的可选项删除当前值
  getOthers.byPalace(index).forEach(i => {
    const { withoutByPalace } = shadow[i];
    withoutByPalace.delete(value);
  });
};

const getOnlyNotFound = (src, dest) => {
  const notFound = [];
  src.forEach(x => {
    if (!dest.has(x)) notFound.push(x);
  });

  if (notFound.length === 1) return notFound[0];
  return false;
};

const setRequired = (i, list, shadow) => {
  const { options } = shadow[i];
  if (options.size === 1) return;
  const keys = ["Row", "Col", "Palace"];
  for (let k = 0; k < 3; k += 1) {
    const key = keys[k];
    const exists = getOnlyNotFound(options, shadow[i][`withoutBy${key}`]);
    if (exists) {
      list[i] = exists;
      console.log("fuck you");
      setOptions(i, list, shadow);
      break;
    }
  }
};

const startup = (list, shadow) => {
  list.forEach((x, i) => {
    // 设置可能的选项
    setOptions(i, list, shadow);

    // 设置当前格子同行、同列、同宮的其他格子的可能选项
    // 以此可以确定是否当前选项里有仅有某个唯一的选择
    // 原理: 当前格子可选集合 ∪ 同行/同列/同宮 其他格子可选集合等于全集 {1, 2, 3, 4, 5, 6, 7, 8, 9}
    setRequired(i, list, shadow);
  });

  return list;
};

const calc = list => {
  const shadow = [];
  for (let i = 0; i < 81; i += 1) {
    shadow[i] = {
      // 利用这批 without 开头的可以缩小 options, 如果某个 option 在这里不存在，那么该 option 就是当前格子的正解
      withoutByRow: new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]), // 同行其他格子可选值
      withoutByCol: new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]), // 同列其他格子可选值
      withoutByPalace: new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]), // 同宫其他格子可选值
      options: new Set(list[i] ? [list[i]] : [1, 2, 3, 4, 5, 6, 7, 8, 9]) // 可选择
    };
  }
  startup(list, shadow);
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(row => {
    const start = row * 9;
    const end = start + 9;
    console.log(
      shadow
        .slice(start, end)
        .map(x => Array.from(x.withoutByPalace).join("."))
        .join("\t\t")
    );
    return list.slice(start, end);
  });
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
