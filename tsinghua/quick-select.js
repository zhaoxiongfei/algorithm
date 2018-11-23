// 快速选择, 查找序列中第K个元素
const select = (nums, nth) => {
  const swap = (i, j) => {
    const tmp = nums[j];
    nums[j] = nums[i];
    nums[i] = tmp;
  };

  const partition = (lo, hi) => {
    swap(lo, lo + ~~((Math.random() * (hi - lo)) % (hi - lo + 1)));
    const pivot = nums[lo];
    let mi = lo; // 轴点索引
    for (let k = lo + 1; k <= hi; k += 1) if (nums[k] < pivot) swap(++mi, k);
    swap(lo, mi);
    if (mi === nth) return mi;
    if (mi < nth) return partition(mi + 1, hi);
    return partition(lo, mi - 1);
  };

  return partition(0, nums.length - 1);
};

console.log(select([3, 8, 1, 5, 9, 8, 4, 5, 7, 2], 7));
