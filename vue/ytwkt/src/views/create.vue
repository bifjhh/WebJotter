<template>
  <div class="body">
    <div class="img">
      我是占位图片
    </div>
    <div class="create">
      <input type="text" placeholder="姓名" v-model="name">
      <input type="text" placeholder="手机号码" v-model="phone">
      <input type="button" value="立即开卡"  @click="inquiry">
    </div>
    <div class="popup" v-if="popup">
      <h4>开卡确认</h4>
      <hr />
      <p><span>姓 名</span>:{{name}}</p>
      <p>手机号码:{{phone}}</p>
      <input type="button" value="确认" @click="addCard">
    </div>
    <div class="matte" v-if="matte" @click="end"></div>
    <div class="ok" v-if="ok" @click="end">
      <div class="info">对号</div>
      <p>开卡成功</p>
    </div>
  </div>
</template>

<script>
/* 新开卡用户 */
export default {
  created() {
    // console.log(localStorage.getItem("_id"));
    this.cardId=localStorage.getItem("_id")

  },
  data: () => ({
    cardId:null,
    name: null,
    phone: null,
    popup: false,
    matte: false,
    ok: false//是否添加完成
  }),
  methods: {
    /* 弹出确认开卡界面 */
    inquiry() {
      if (this.name && this.phone) {
        this.matte = true;
        this.popup = true;
      } else {
        alert("请输入完整的用户名和手机号");
      }
    },
    /* 确认添加卡 */
    addCard() {
      this.$http
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
        })
        .catch(err => {
          console.log(err);
        });
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
  margin: 0;
  padding: 0;
  .img {
    text-align: center;
    line-height: 4rem;
    height: 4rem;
    background-color: #ccc;
  }
  .create {
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
}
</style>