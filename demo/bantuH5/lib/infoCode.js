 $(function () {
     var off = true;
     // 对浏览器的UserAgent进行正则匹配，不含有微信独有标识的则为其他浏览器  
     var useragent = navigator.userAgent;
     if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
         // 这里警告框会阻塞当前页面继续加载  
         // alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
         // 以下代码是用javascript强行关闭当前页面  
         //   if (confirm("退出当前页面")) {
         //   var opened = window.open('about:blank', '_self');
         //   opened.opener = null;
         //   opened.close();
         //   }

         // var htl = '<div class = "weui_msg"><div class="weui_icon_area"><i class="weui_icon_info weui_icon_msg"></i></div><div class="weui_text_area"><h4 class="weui_msg_title">请在微信扫一扫打开链接</h4></div></div>';
         // $("#dowebok").html(htl);
         off = false;
     }

     // // 封装正则--用来获取url地址后的参数
     function GetQueryString(name) {
         var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if (r != null) return unescape(r[2]);
         return null;
     }
     var content = $('#content');
     var key = GetQueryString('k');
     var uid = GetQueryString('uid');
     var cid = GetQueryString('cid');
     var code = GetQueryString('code');
     var userid = '';
     console.log('code');
     console.log(code);
     if (!off) {
         $('#click').css("display", "none");
         $('#cik').css("display", "none");
     }
     $.post('https://www.bantucard.com/bantu/wxuser/H5login', {
         code: code
     }, function (res) {
         var res = JSON.parse(res);
         console.log(res);
         userid = res.userid;
         $.post("https://www.bantucard.com/bantu/Mycard/getShareCardBycardId", {
             mycard_cardid: cid,
             mycard_uid: userid
         }, function (res) {
             console.log("进入函数");
             console.log(res);
             var res = JSON.parse(res);
             console.log(res.resObject);
             console.log(res.res.resCode);
             if (res.res.resCode == '200' && off) {
                 if (res.resObject == 1) {
                     alert("您已保存该名片");
                     $('#click').css("display", "none");
                     $('#cik').css("display", "none");
                     return;
                 } else if (res.resObject == 0) {
                     console.log('您没有保存该名片');
                     $("#click").click(function () {
                         console.log("rew")
                         $.post("https://www.bantucard.com/bantu/Mycard/addCardcaseTwoH5", {
                             cardcase_cardid: cid,
                             cardcase_uid: userid,
                         }, function (res) {
                             console.log("添加成功");
                             console.log(res);
                            //  $("#code_sc").css("transform", "scale(1.5) translateX(-50%)");
                             //添加当前状态类名
                             $("#code_sc").addClass("current");
                             //添加当前状态类名
                             alert("保存成功");
                             $('#click').css("display", "none");
                             $('#cik').css("display", "none");
                         })
                     })
                 } else {
                     $('#click').css("display", "none");
                     $('#cik').css("display", "none");
                     console.log('错误--不等于0||1')
                     return;
                 }
             } else {
                 $('#click').css("display", "none");
                 $('#cik').css("display", "none");
                 console.log('off');
                 console.log(off);
                 //  alert('请求失败');
                 return;
             }
         }, 'JSON');

     }, 'JSON');




     // 获取需要动态赋值的ID
     var name = $("#name");
     var namei = $("#namei");
     var post = $("#post");
     var company = $("#company");
     var mobile = $("#mobile");
     var tal = $("#tal");
     var email = $("#email");
     var site = $("#site");
     var url = $("#url");
     var intro = $("#intro");
     var scope = $("#scope");
     var user_deptpic = $("#deptpic")

     // 请求获取数据 $.post(url,data,success(data, textStatus, jqXHR),dataType)
     $.post('https://www.bantucard.com/bantu/CreateConnect/getCardAadRedPacket', {
         uid: uid,
         cid: cid
     }, function (res) {
         var res = JSON.parse(res);
         console.log(res);
         if (res.res.resCode == 200) {
             var data = res.resObject[0];
             name.html(data.mycard_name + '的名片');
             namei.html(data.mycard_name);
             post.html(data.mycard_position);
             company.html(data.mycard_companyname);
             mobile.html(data.mycard_mobile);
             tal.html(data.mycard_phone);
             email.html(data.mycard_mail);
             site.html(data.mycard_add);
             url.html(data.mycard_website);
             intro.html(data.mycard_profile);
             scope.html(data.mycard_scope);
         } else {
             console.log('获取信息失败');
             return;
         }
     }, 'JSON');
     $.post("https://www.bantucard.com/bantu/wxuser/getUserPic", {
         user_uid: uid
     }, function (res) {
         console.log('getUserPic');
         console.log(res);
         //  var res = JSON.parse(res);
         //  if (res.res.Code == 200) {
         if (res) {
             $("#deptpic").attr('src', res.user_deptpic);
         } else {
             alert("获取图片失败");
         }
     })
 });
 /* 
     
     1 获取code 在确保微信公众账号拥有授权作用域（scope参数）的权限的前提下（服务号获得高级接口后，默认拥有scope参数中的snsapi_base和snsapi_userinfo），引导关注者打开如下页面： 
     
     https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxba6f729bc6aa5ddc&redirect_uri=http://192.168.2.109/details.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
          */