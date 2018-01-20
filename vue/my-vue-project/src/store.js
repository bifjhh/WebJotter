const STORAGE_KEY = 'todos-vuejs'; //ES6定义常量，存储用来本地保存的 key 值
export default { //设置函数出口
  fetch() { //获取本地存储的数据，并转换json对象
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
  },
  save(items) { //设置到本地存储，并将对象转换为json字符串
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
}
