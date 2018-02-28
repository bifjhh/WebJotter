// 业务处理模块,实现对应的路由的操作 加载 数据 模块
var db = require('./db.js');
// 首页
module.exports.index = (req, res) => {
  res.render('index');
};

// 学员列表页面
module.exports.students = (req, res, next) => {
  // 1. 读取 MongoDB 数据库 中所有的学员数据
  db.findAll('students', (err, docs) => {
    if(err){next(err); return};
    
    // 2. 将查询到的数据 使用 json 返回给客户端
    res.json({status:1,list:docs});
  })
};

// 查看学员详情
module.exports.info = (req, res,next) => {
  // 1. 获取 _id
  var objID = db.ObjectID(req.query._id);

  // 2. 根据 _id 去数据库中查询
  db.findOne('students', {_id:objID},(err,doc)=>{
    if(err){next(err); return};
    if(doc){
      res.json({status:1,info:doc});
    }else{
      res.json({status:0});
    }
  });
};

// 读取所有的城市信息
module.exports.cities = (req, res, next) => {
  db.findAll('cities',(err,city_docs)=>{
    if(err){next(err); return};
    res.json({status:1,cities:city_docs});
  });
};

// 读取所有的专业信息
module.exports.majors = (req, res, next) => {
  db.findAll('majors',(err,majors_docs)=>{
    if(err){next(err); return};
    res.json({status:1,majors:majors_docs});
  });

};
// 显示添加学员页面
module.exports.showAdd = (req, res,next) =>{
  // 1. 读取所有的城市信息
  db.findAll('cities',(err,city_docs)=>{
    if(err){next(err); return};

    // 2. 读取所有的专业信息
    db.findAll('majors',(err,majors_docs)=>{
      if(err){next(err); return};
      
      // 3. 调用 res.render() 进行渲染
      // res.render('add',{cities:city_docs,majors:majors_docs});
      res.json({status:1,cities:city_docs,majors:majors_docs});
    });

  });


  
};
// 添加学员
module.exports.addStu=(req,res,next)=>{
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
    if(err){next(err); return};
    // 3. 返回一个结果
    res.json({status:1,result:result});
  });
};

// 更新 学员修改 信息
module.exports.updateOne=(req,res,next)=>{
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
    if(err){next(err); return};
    res.json({status:1});
  });
};

// 删除一条学员信息
module.exports.removeStu=(req,res,next)=>{
  // 1. 获取要删除的学员 _id
  var objID= db.ObjectID(req.query._id);
  // 2. 删除
  db.removeStu('students',{_id:objID},(err,result)=>{
    if(err){next(err); return};
    res.json({status:1});
  });
};







