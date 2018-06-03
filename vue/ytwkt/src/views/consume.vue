<template>
  <div class="body" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="1">
    <div class="btn">
      <div class="use" @click="scanQRCode">
        <span>我是字体图标</span>
        <span>扫码核销</span>
      </div>
      <span class="placeholder"></span>
      <div class="create" @click="toCreate">
        <span>我是字体图标</span>
        <span>新用户开卡</span>
      </div>
    </div>
      <transition name="el-fade-in-linear">
        <div class="create_box" v-show="create_box">
          <div class="img">
            我是占位图片
          </div>
          <div class="create_ipt">
            <input type="text" placeholder="姓名" v-model="name">
            <input type="text" placeholder="手机号码" v-model="phone">
            <input type="button" value="立即开卡"  @click="inquiry">
          </div>
          <transition name="el-zoom-in-center">
            <div class="popup" v-show="popup">
              <h4>开卡确认</h4>
              <hr />
              <p><span>姓 名</span>:{{name}}</p>
              <p>手机号码:{{phone}}</p>
              <input type="button" value="确认" @click="addCard">
            </div>
          </transition>  
          <transition name="el-fade-in-linear">
            <div class="ok" v-show="ok" @click="end">
              <div class="info">对号</div>
              <p>开卡成功</p>
            </div>
          </transition>
          <div class="del" @click="del">关闭</div>
          <div class="matte" v-show="matte" @click="end">
            <div class="del">关闭</div>
          </div>
          
        </div>
      </transition>
    <div class="log">
      <p>操作记录</p>
      <div class="info" v-for="(item,index) in list" :key="index">
        <div class="item">开卡时间:2018-3-16 01:17:09</div>
        <div class="name">持卡人:王小明</div>
        <div class="number">会员卡号:111 222 333 222 </div>
      </div>
     
      
    </div>
    <div class="modul" v-show="create_box"></div>
    <a href="javascript:;" class="top" @click="toTop">顶部</a>
  </div>
</template>

<script>
import "element-ui/lib/theme-chalk/base.css";
/* 我是消费和开卡的 */
export default {
  created() {
    console.log(window.location.href);
    // console.log(localStorage.getItem("_id"));
    // this.cardId = localStorage.getItem("_id");
    /* this.$http.post(this.$apiUrl + "appid").then(res => {
      var data = JSON.parse(res.data.data);
      wx.config({
        debug: true, //
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名
        jsApiList: ["scanQRCode"] // 必填，需要使用的JS接口列表
      });
    }); 
    */
    this.$http
      .get("http://h5.ddhudong.com/async/comsvr", { url: window.location.href })
      .then(res => {
        console.log(res)
        var data = JSON.parse(res.data.data);
        wx.config({
          debug: true, //
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名
          jsApiList: ["scanQRCode"] // 必填，需要使用的JS接口列表
        });
      });

    /* this.$http
      .get("http://h5.ddhudong.com/async/comsvr", {
        url: window.location.href
      })
      .then(data => {
        new wxJsdk(wx).Init({
          appIdstr: data.appId,
          timestampstr: data.timestamp,
          nonceStrstr: data.nonceStr,
          signaturestr: data.signature,
          wx_share_title: "加班的开心你想象不到",
          wx_share_desc: "看完这个，好多人都主动申请国庆加班了！什么情况？",
          wx_share_link: "http://" + window.location.host + "/nationalday/",
          wx_share_img:
            "http://" +
            window.location.host +
            "/nationalday/res/share-" +
            rnd +
            ".png",
          shareOkFunction: type => {
            this.$http.post("/pv", {
              remark: "国庆节-申请加班H5",
              events: "[" + type + "]"
            });
          }
        });
      }); */
  },
  data: () => ({
    cardId: null,
    name: null,
    phone: null,
    popup: false,
    matte: false,
    create_box: false,
    ok: false, //是否添加完成
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9] //模拟数据
  }),
  methods: {
    /* 跳转 */
    toCreate() {
      this.create_box = true;
      // this.$router.push({ path: `/consume/create` });
    },
    /* 关闭开卡界面 */
    del() {
      this.create_box = false;
      this.name = null;
      this.phone = null;
    },
    /* 页面滚动到底部加载事件 */
    loadMore() {
      console.log("加载更多");
      for (let i = 0; i < 5; i++) {
        this.list.push(1);
      }
    },
    /* 返回顶部 */
    toTop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
    /* 微信扫描预留接口 */
    scanQRCode() {
      // alert("请扫描二维码");

      wx.scanQRCode({
        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function(res) {
          var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        }
      });
    },
    /* 弹出确认开卡界面 */
    inquiry() {
      this.matte = true;
      this.popup = true;
      /* if (this.name && this.phone) {
        this.matte = true;
        this.popup = true;
      } else {
        alert("请输入完整的用户名和手机号");
      } 
    */
    },
    /* 确认添加卡 */
    addCard() {
      this.name = null;
      this.phone = null;
      this.popup = false;
      this.ok = true;
      this.create_box = true;
      setTimeout(() => {
        this.ok = false;
        this.del();
        this.end();
      }, 1500);
      console.log(this.list);
      setTimeout(() => {
        this.list.unshift(1);
        console.log(this.list);
      }, 2000);

      /* this.$http
        .post(this.$apiUrl+"addcard", {
          name: this.name,
          phone: this.phone
        })
        .then(res => {
          if(!res.data.status)return;
          this.name = null;
          this.phone = null;
          this.popup = false;
          this.ok = true;

          setTimeout(()=>{
            this.ok = false;
            this.create_box=false;
          },1500)
        })
        .catch(err => {
          console.log(err);
        }); 
      */
    },
    /* 退出界面 */
    end() {
      this.popup = false;
      this.matte = false;
      this.ok = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.body {
  background-color: #eee;
  padding-top: 4.7rem;
}
.btn {
  position: fixed;
  width: 100%;
  padding: 30px 20px;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  background-color: #eee;
  > div {
    height: 3rem;
    background-color: #fff;
    flex: auto;
    text-align: center;
    > span:nth-of-type(1) {
      display: block;
      margin: 0.5rem 30%;
      height: 1rem;
      background-color: #ccc;
    }
  }
  .placeholder {
    flex: 0.2;
  }
}
.log {
  > p {
    text-align: center;
  }
  .info {
    width: 100%;
    font-size: 16px;
    background-color: #fff;
    padding: 0.2rem 0.5rem;
    margin-top: 0.5rem;
    line-height: 1rem;
  }
}
.top {
  width: 1rem;
  // height: 1rem;
  line-height: 1rem;
  position: fixed;
  bottom: 0.5rem;
  right: 1rem;
  text-align: center;
  background-color: #eee;
}
.create_box {
  // position: relative;
  position: fixed;
  left: 0;
  top: 50%;
  width: 100%;
  background-color: #eee;
  transform: translateY(-50%);
  z-index: 99;
  padding: 1rem 0;
  .del {
    position: absolute;
    right: 2px;
    top: 2px;
    width: 1rem;
    line-height: 0.7rem;
    text-align: center;
    background-color: #eee;
  }
  .img {
    text-align: center;
    line-height: 4rem;
    height: 4rem;
    background-color: #ccc;
  }
  .create_ipt {
    padding: 0.3rem;
    display: flex;
    flex-direction: column;
    input {
      border: 1px solid #ccc;
      height: 1.1rem;
      margin-top: 0.3rem;
      text-indent: 1em;
    }
    input[type="button"] {
      background-color: #fff;

      text-indent: initial;
    }
  }
  .popup,
  .ok {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 0.3rem;
    position: absolute;
    width: 7rem;
    z-index: 9;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    h4,
    p {
      text-align: center;
      height: 1rem;
      line-height: 1rem;
    }
    hr {
      margin-bottom: 0.5rem;
    }
    p {
      text-align: left;
      text-indent: 0.5em;
      span {
        text-align: justify;
      }
    }
    input[type="button"] {
      background-color: #fff;
      border: 1px solid #ccc;
      margin: 1.5rem 0.5rem 0.5rem;
      line-height: 1.2rem;
      height: 1.2rem;
    }
  }
  .ok {
    width: 6rem;
    height: 6rem;
    .info {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      background-color: rgb(20, 155, 218);
      margin: 0.5rem auto;
      color: #fff;
      text-align: center;
      line-height: 2.5rem;
      font-size: 20px;
      font-weight: 700;
    }
    > p {
      // margin-top: .5rem;
      text-align: center;
    }
  }
  .matte {
    .del {
      border: 1px solid #eee;
      background-color: rgba(0, 0, 0, 0);
      color: #fff;
    }
  }
}
.modul {
  width: 100%;
  height: 100%;
  position: fixed;
  opacity: 0.5;
  top: 0;
  left: 0;
  background-color: #000;
  z-index: 9;
}
.matte {
  position: fixed;
  background-color: #000;
  width: 10rem;
  height: 100%;
  opacity: 0.5;
  top: 0;
  left: 0;
  z-index: 2;
}
</style>