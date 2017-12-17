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
// 继承 Person
class Teacher extends Person {
    // 必须写
    constructor(name, age, height) {
        // 还要必须写super  调用父类的方法
        super(name, age);
        // 多余的就自己加上 this 追加
        this.height = height;
    };
    Theight(){
        console.log(this.name + "的身高是" + this.height);
    }
}
var p = new Teacher('小刘', '24', 166);
p.shouAge();
p.Theight();