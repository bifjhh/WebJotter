// 原型和继承
// 写一个类（class）再写一个继承（extends）
// 有name age 方法
class Person {
    // 必须 写这个构造器
    constructor(name, age) {
        this.name = name;
        this.age = age;
    };
    shouAge() {
        console.log('我是' + this.name + '---' + this.age + '岁');
    }
}

var p = new Person('小刘', '24');
p.shouAge();