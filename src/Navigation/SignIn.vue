<style scoped>
  @import "../css/layout.css";
</style>

<template>

  <div id="app">



    <div class="Sign-page-top-bg">
      <div class="Sign-page-top-text" style="color:white;font-size: 50px;padding-top: 200px;"> 想要创建你的团队吗? </div>
      <div class="Sign-page-top-text" style="color:#EFEFEF;font-size:22px;margin-top:10px;">填写表单在此注册你的团队
        <br />通过注册申请的团队可以展示他们的作品
      </div>
      <div class="Scroll-down">
        <a class="Scroll-button" id="turnToContent" href="#content"> 立即申请
          <Icon type="ios-arrow-down" /> </a>
      </div>
    </div>

    <div class="Sign-page-form">
      <div class="Sign-form-left" id="content">
                                  <!-- ↑jquary锚记 -->
        <div class="form-frame">
          <div class="form-text">团队名称:</div>
          <Input v-model="teamname" required placeholder="团队名称" style="width: 285px" />
        </div>

        <div class="form-frame">
          <div class="form-text">邮箱(帐户名):</div>
          <Input v-model="email" placeholder="邮箱" style="width: 285px;" />
        </div>

        <div class="form-frame">
          <div class="form-text">团队负责人:</div>
          <Input v-model="chargename" placeholder="负责人姓名" style="width: 140px" /> -
          <Input v-model="chargephone" placeholder="负责人联系电话" style="width: 140px" />
        </div>

        <div class="form-frame">
          <div class="form-text">指导老师(选填):</div>
          <Input v-model="teachername" placeholder="指导老师姓名" style="width: 140px" /> -
          <Input v-model="teacherphone" placeholder="指导老师联系电话" style="width: 140px" />
        </div>

        <div class="form-frame">
          <div class="form-text">所属学院(全称):</div>
          <Select style="width:285px" v-model="school">
            <Option v-for="item in schooldList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>

        <div class="form-frame">
          <div class="form-text">注册目的:</div>
          <Input v-model="target" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="可说明注册目的" style="width: 285px;" />
        </div>

        <div class="form-button">
          <Button id="btn" type="success" style="margin-right:30px;" size="large" @click="submit" :class="{disabled: !this.canClick}">
            {{butinfo}}</Button>
          <Button type="warning" size="large" @click="clearn">重置</Button>
        </div>

      </div>

      <div class="Sign-form-tips">
        邮箱为登录名
        <br />注册目的将会决定是否通过申请！
      </div>

    </div>


    <div class="footer-frame">
      <div class="footer-inside-info">
        © 2018 Fearless, Inc. Terms Privacy Security Status Help
        <img src="../assets/fearless.jpg" class="fearlessImg" /> Contact Fearless API Training Shop Blog About
      </div>
    </div>

  </div>

</template>


<script>
  import $ from 'jquery';
  export default {
    name: 'SignIn',
    data() {
      return {
        // 按钮名字
        butinfo: '提交审核',
        totalTime: 5,
        canClick: true,

        teamname: '',
        email: '',
        chargename: '',
        chargephone: '',
        teachername: '',
        teacherphone: '',
        school: '',
        schooldList: [{
            value: '机械与电气工程学院',
            label: '机械与电气工程学院'
          },
          {
            value: '土木工程学院',
            label: '土木工程学院'
          },
          {
            value: '化学化工学院',
            label: '化学化工学院'
          },
          {
            value: '纺织服装学院',
            label: '纺织服装学院'
          },
          {
            value: '美术学院',
            label: '美术学院'
          },
          {
            value: '商学院',
            label: '商学院'
          }
        ],
        target: '',
        res: '',
      }
    },
    created() {
      this.menu();
    },
    mounted(){
      $('#turnToContent').click(function () {
        $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top
        }, 600);
        return false;
      });
    },
    methods: {
      menu() {
        window.scrollTo(0, 0);
      },
      submit() {
        var that = this;

        // 按钮禁用
        if (!this.canClick) return //倒计时组成

        if (that.teamname === '') {
          that.$Message.warning('团队名不能为空！');
          return 0;
        }
        if (that.email === '') {
          that.$Message.warning('邮箱不能为空！');
          return 0;
        }
        var reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        if (!reg.test(that.email)) {
          that.$Message.warning('邮箱格式错误！');
          return 0;
        }
        // 邮箱重复 
        this.$http.get(this.global.url + "/login/repeat/", {
          params: {
            name: that.email
          }
        }).then(response => {
          that.res = response.data.msg
        }, response => {})
        if (that.res === "该邮箱已存在") {
          that.$Message.warning('该邮箱已被注册!');
          return 0;
        }

        if (that.chargename === '') {
          that.$Message.warning('负责人不能为空！');
          return 0;
        }
        if (that.chargephone === '') {
          that.$Message.warning('负责人电话不能为空！');
          return 0;
        }
        var reg2 = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        if (!reg2.test(that.chargephone)) {
          that.$Message.warning('负责人电话格式错误！');
          return 0;
        }
        var reg2 = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        if (that.teacherphone !== '') {
          if (!reg2.test(that.teacherphone)) {
            that.$Message.warning('指导老师电话格式错误！');
            return 0;
          }
        }

        if (that.school === '') {
          that.$Message.warning('所属学院不能为空！');
          return 0;
        }
        if (that.target === '') {
          that.$Message.warning('注册目的不能为空！');
          return 0;
        }

        this.$http.post(this.global.url + "/team/regist", {
          teamName: that.teamname,
          name: that.email,
          manager: that.chargename,
          mTelephone: that.chargephone,
          teacher: that.teachername,
          tTelephone: that.teacherphone,
          affiliationCollege: that.school,
          purpose: that.target
        }).then(response => {
          that.$Message.warning({
            content: "请等待审核   (1-3日)  ",
            closable: true,
            top: 500,
            duration: 10,
          });
          that.$Message.success({
            content: "提交成功",
            closable: true,
            top: 500,
            duration: 10,
          });
        }, response => {
          // error callback
          that.$Message.error('提交失败');
        })
        // 清空
        that.teamname = '';
        that.email = '';
        that.chargename = '';
        that.chargephone = '';
        that.teachername = '';
        that.teacherphone = '';
        that.school = '';
        that.target = ''
        // 倒计时组成
        this.canClick = false
        this.butinfo = this.totalTime + 's后可用' //这里解决60秒不见了的问题
        let clock = window.setInterval(() => {
          this.totalTime--
          this.butinfo = this.totalTime + 's后可用'
          if (this.totalTime < 0) { //当倒计时小于0时清除定时器
            window.clearInterval(clock)
            this.butinfo = '提交审核'
            this.totalTime = 5
            this.canClick = true
          }
        }, 1000)
      },

      clearn() {
        var that = this
        that.teamname = ''
        that.email = ''
        that.chargename = ''
        that.chargephone = ''
        that.teachername = ''
        that.teacherphone = ''
        that.school = ''
        that.target = ''
      }
    }
  }

</script>
