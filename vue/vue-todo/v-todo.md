### 前端工程化概念
- 如何搭建前端工程

### 网络优化

### API定制

### vue2介绍
- 数据绑定
- vue文件的开发方式
- 组件化框架
- 在vue文件内可以书写html，js，css代码
- render方法
    + 虚拟dom方法
    + vue渲染html标签的一种方法
- 生命周期方法
    + computed
### todo应用 实例  
1. 将页面划分为不同的组件
2. 设置数据的增加---删除
    + 增加使用push()方法
    + 删除使用splice方法 + findIndex()方法判断需要删除的id 的索引位置
3. 设置不同状态的显示
    + 使用filter() 方法，判断当前需要显示的数据  
        + ["all", "active", "completed"] 不同的显示状态
    + 如果 是 all  则返回全部数据
    + 如果 是 completed 则返回 过滤后 所有完成的
    + 如果 是 active 则返回 过滤后 所有没有完成的
4. 删除全部已完成的项目
    + 通过filter() 方法 给todos数组重新赋值，只留下未完成的事项

- 将完成后的项目使用cnpm run build 命令打包成生产代码

    