<style scoped>
@import "./../../css/layout.css";
@import "./TeamDetail.css";
</style>

<template>
  <div id="app">
    <div class="teamDetail-page-top-bg">
      <div class="teamDetail-page-top-inside-frame">
        <div class="teamDetail-page-top-title">{{data.teamName}}</div>
      </div>
    </div>

    <div class="team-page-mid">
      <!-- left -->
      <div class="team-page-markdown">
        <mavon-editor
          v-model="teamIntroduction"
          ref="md"
          style="z-index:0"
          defaultOpen="preview"
          :subfield="false"
          :editable="false"
          :toolbarsFlag="false"
        />
      </div>

      <!-- rigth -->
      <div class="team-page-teaminfo-frame">
        <div class="team-page-left-info">
          <!-- <div class="info-frame">
            <div class="Categories">团队简介</div>
          </div>-->
          <!-- <div class="teaminfo-title-son">
          {{data.profile}} </div>-->
          <div class="teaminfo-title">团队成员</div>
          <!-- style="border-bottom:1px #DFDFDF solid;padding:10px 0 20px 0;margin-bottom:25px;line-height: 20px;" -->
          <div class="teaminfo-title-son">{{data.member}}</div>
          <Divider/>
          <div class="teaminfo-title">其他</div>
          <div class="teaminfo-title-son">团队负责人: {{data.manager}}</div>
          <div class="teaminfo-title-son">指导老师: {{data.teacher}}</div>
          <div class="teaminfo-title-son">所属学院: {{data.affiliationCollege}}</div>
          <div class="teaminfo-title-son">电话: {{data.mTelephone}}</div>
        </div>
        <!-- right 1 -->
        <div class="team-page-left-info" style="margin-top:15px">
          <div class="teaminfo-title">作品</div>
          <div class="teaminfo-works" v-for="item in teamworks" :key="item.pkId">
            <router-link :to="{ name : 'WorksDetails',  params:{ pkId:item.pkId }}">
              <img v-bind:src="item.showPic">
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-frame">
      <div class="footer-inside-info">
        © 2018 Fearless, Inc. Terms Privacy Security Status Help
        <img
          src="../../assets/fearless.jpg"
          class="fearlessImg"
        > Contact Fearless API Training Shop Blog About
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamDetail",
  data() {
    return {
      // 数据
      data: [],
      // 团队作品
      teamworks: [],
      pkId: "",
      teamIntroduction: ""
    };
  },
  created() {
    this.menu();
    var that = this;
    // 获取传递的团队id
    that.pkId = that.$route.params.pkId;
    // 服务器请求
    this.$http.get(this.global.url + "/team/list/" + that.pkId).then(
      response => {
        that.data = response.data.data;
        console.log(response.data.data);
        that.teamIntroduction =
          response.data.data.teamIntroduction.introduction;
        // 服务器请求
        this.$http
          .get(this.global.url + "/work/list", {
            params: {
              limit: 3,
              page: 1,
              teamName: that.data.teamName
            }
          })
          .then(
            response => {
              that.teamworks = response.data.data.list;
            },
            err => {}
          );
      },
      err => {}
    );
  },
  methods: {
    menu() {
      window.scrollTo(0, 0);
    }
  }
};
</script>
