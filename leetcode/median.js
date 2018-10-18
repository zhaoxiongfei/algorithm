const findMedianSortedArrays = (nums1, nums2) => {
  const nums = [].concat(nums1, nums2).sort((a, b) => a - b);
  const { length } = nums;

  console.log(nums);
  if (length % 2) return nums[Math.floor(length / 2)];
  return (nums[length / 2] + nums[length / 2 - 1]) / 2;
};

const arr1 = [1, 3];
const arr2 = [2];
console.log(findMedianSortedArrays(arr1, arr2));
