/**
 * Heap
 */

function Heap(kind = "max") {
  const data = [];

  const insert = e => {
    if (kind === "min") e = -e;
    data.length += 1;
    let index = data.length - 1;
    while (index > 0) {
      const parent = (index - 1) >> 1;
      if (data[parent] >= e) break;
      data[index] = data[parent];
      index = parent;
    }
    data[index] = e;
  };

  const getTop = () => {
    if (kind === "max") return data[0];
    return -data[0];
  };

  const size = () => data.length;

  const properParent = (n, i) => {
    const lIndex = 1 + (i << 1);
    const rIndex = (1 + i) << 1;
    if (rIndex < n && data[rIndex] > data[lIndex] && data[rIndex] > data[i])
      return rIndex;
    if (lIndex < n && data[lIndex] > data[i]) return lIndex;
    return i;
  };

  const swap = (i, j) => {
    const t = data[i];
    data[i] = data[j];
    data[j] = t;
  };

  const percolateDown = (n, i) => {
    let j;
    while (i !== (j = properParent(n, i))) {
      swap(i, j);
      i = j;
    }
    return i;
  };

  const delTop = () => {
    const { length } = data;
    const removed = data[0];
    data[0] = data[length - 1];
    data.length -= 1;
    percolateDown(length - 1, 0);
    if (kind === "max") return removed;
    return -removed;
  };

  return { insert, getTop, delTop, size, elem: data };
}

module.exports = Heap;
