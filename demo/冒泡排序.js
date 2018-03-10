var arr = [1, 3, 2, 5, 6, 4, 7, 9, 8],
    num = 0,
    is = 0;

for (var i = 0; i < arr.length; i++) {
    //添加节流阀，假设一起数据都是按照顺序排列的
    var istrue = true; 
    for (var j = 0; j < arr.length; j++) {
        is++;
        if (arr[j] > arr[j + 1]) {
            //if条件达成时，代表之前假设失败
            istrue = false; 
            num = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = num;
        }
    }
    if (istrue) { 
    //判断假设是否正确，正确则直接跳出本轮循环
        break;
    }
}
console.log(arr);
console.log(is);
// 通过使用节流阀，可以减少循环的次数，节约占用的内存