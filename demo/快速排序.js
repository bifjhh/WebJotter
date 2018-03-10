function quickSort(arr) {
  if (arr.length <= 1) {
    // 如果传进来的数组length小于等于1，则直接返回这个数组
    return arr;
  }
  // 如果超过1，则以数组的中间数据为分界点
  var pivotIndex = Math.floor(arr.length / 2);
  // 获取中间的值
  var pivot = arr.splice(pivotIndex, 1)[0];
  // 定义左右存储数据的数组
  var left = [],right = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] <= pivot) {
      // 如果值小于等于基准值，则放在左边
      left.push(arr[i]);
    } else {
      // 否则放到右边
      right.push(arr[i]);
    }
  }
  // 利用递归的方式，重复调用函数排列数据，使用concat方法合并数组 返回最终的排列好的数据
  return quickSort(left).concat([pivot], quickSort(right));
}