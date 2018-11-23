// 快速排序
const sort = nums => {
  const swap = (i, j) => {
    const tmp = nums[j];
    nums[j] = nums[i];
    nums[i] = tmp;
  };

  const partition = (lo, hi) => {
    if (hi - lo === 1) {
      if (nums[lo] > nums[hi]) swap(lo, hi);
      return;
    }
    swap(lo, lo + ~~((Math.random() * (hi - lo)) % (hi - lo + 1)));
    const pivot = nums[lo];
    let mi = lo; // 轴点索引
    for (let k = lo + 1; k <= hi; k += 1) if (nums[k] < pivot) swap(++mi, k);
    swap(lo, mi);
    if (lo < mi - 1) partition(lo, mi - 1);
    if (mi < hi - 1) partition(mi + 1, hi);
  };

  partition(0, nums.length - 1);
  return nums;
};

console.log(sort([3, 8, 1, 5, 9, 8, 4, 5, 7, 2]));
