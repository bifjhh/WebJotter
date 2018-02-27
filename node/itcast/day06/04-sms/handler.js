// 业务处理模块,实现对应的路由的操作 加载 数据 模块
var db = require('./db.js');
// 首页
module.exports.index = (req, res) => {
  res.render('index');
};

// 学员列表页面
module.exports.students = (req, res) => {
  // 1. 读取 MongoDB 数据库 中所有的学员数据
  db.findAll('students', (err, docs) => {
    if (err) throw err;
    
    // 2. 调用 res.render 进行模板渲染
    res.render('students', {list: docs});
  })
};

// 查看学员详情
module.exports.info = (req, res) => {
  // 1. 获取 _id
  var objID = db.ObjectID(req.query._id);

  // 2. 根据 _id 去数据库中查询
  db.findOne('students', {_id:objID},(err,doc)=>{
    if(err)throw err;
    if(doc){
    res.render('info', {item: doc});
    }else{
      res.send('no such Item');
    }
  });
};

// 显示添加学员页面
module.exports.showAdd = (req, res) =>{
  // 1. 读取所有的城市信息
  db.findAll('cities',(err,city_docs)=>{
    if(err)throw err;

    // 2. 读取所有的专业信息
    db.findAll('majors',(err,majors_docs)=>{
      if(err)throw err;
      
      // 3. 调用 res.render() 进行渲染
      res.render('add',{cities:city_docs,majors:majors_docs});
    });

  });


  
};

module.exports.addSta=(req,res)=>{
  // 1. 获取用户提交的信息
  // req.body
  var doc = {
    sno: req.body.sno,
    sname: req.body.sname,
    sgender: req.body.sgender === 'M' ? '男' : '女',
    sbirthday: req.body.sbirthday,
    sphone: req.body.sphone,
    saddr: req.body.saddr, 
    smajor: req.body.smajor
  };
  // 2. 将用户提交的信息插入到 学员 合集内
  db.insertOne('students',doc,(err,result)=>{
    if(err)throw err;
    // 3. 执行重定向
    res.redirect('/students');
  });
};

// 修改学员信息页面
module.exports.showEdit=(req,res)=>{
  // 1. 获取 _id
  var objID = db.ObjectID(req.query._id);
  // 2. 根据 _id 去数据库中查询
  db.findOne('students', {_id:objID},(err,info)=>{
    if(err)throw err;
    if(info){
      // 3. 读取所有的城市信息
      db.findAll('cities',(err,city_docs)=>{
        if(err)throw err;
        // 4. 读取所有的专业信息
        db.findAll('majors',(err,majors_docs)=>{
          if(err)throw err;
          // 4. 调用 res.render() 进行渲染
          res.render('edit',{item: info,cities:city_docs,majors:majors_docs});
        });
      });
    }else{
      res.send('no such Item');
    }
  });
};

// 更新 学员修改 信息
module.exports.updateOne=(req,res)=>{
  // 1. 获取 _id
  var objID = db.ObjectID(req.body._id);
  // 2. 获取用户 post 提交的更新
  var doc = {
    sno: req.body.sno,
    sname: req.body.sname,
    sgender: req.body.sgender === 'M' ? '男' : '女',
    sbirthday: req.body.sbirthday,
    sphone: req.body.sphone,
    saddr: req.body.saddr, 
    smajor: req.body.smajor
  };
  db.updateOne('students',{_id:objID},{$set:doc},(err,result)=>{
    if(err)throw err;
    res.redirect('/students');
  });
};

// 删除一条学员信息
module.exports.removeStu=(req,res)=>{
  // 1. 获取要删除的学员 _id
  var objID= db.ObjectID(req.query._id);
  // 2. 删除
  db.removeStu('students',{_id:objID},(err,result)=>{
    if(err)throw err;
    res.redirect('/students');
  });
};







