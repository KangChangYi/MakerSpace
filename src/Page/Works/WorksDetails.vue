<style scoped>
  @import "./../../css/layout.css";
  @import "./WorksDetails.css";

</style>
<template>
  <div id="app">

    <div class="works-detail-top-frame">
      <!-- top1 -->
      <div class="works-detail-top-bread">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem to="/works">全部作品</BreadcrumbItem>
          <BreadcrumbItem>{{info.name}}</BreadcrumbItem>
        </Breadcrumb>
      </div>


      <div class="works-detail-info-frame">
        <img class="works-detail-info-img" v-bind:src="info.showPic" />

        <div class="works-detail-info-text-frame">

          <div class="works-detail-info-text-workname">{{info.name}} </div>
          <div class="works-detail-info-text-type">
            <Tag class="work-list-content-tag" color="blue">{{info.typeIndustry}}</Tag>
            <Tag class="work-list-content-tag" style="margin-left:5px;" color="green">{{info.typeTechnology}}</Tag>
          </div>

          <div class="works-detail-info-text-teaminfo-frame">
            <div class="details-category">
              团队： <div class="details-category-son">{{info.teamName}}</div>
            </div>
            <div class="details-category">
              成员： <div class="details-category-son">{{menber}}</div>
            </div>
            <div class="details-category">
              使用工具及技术： <div class="details-category-son">{{info.environment}}</div>
            </div>
          </div>


        </div>

      </div>

    </div>

    <div class="works-detail-markdown">

      <!-- <div class="works-detail-bottom-info" style="padding:30px;margin-bottom:55px;height:fit-content;background: rgb(233, 244, 247)" >
         <div> {{info.profile}} </div>
         <div style="float:right;" > ———— {{info.teamName}} </div>
      </div> -->

      <!-- 作品介绍 -->
      <div class="works-detail-bottom-info">
        <mavon-editor v-model="workintrodection" ref=md style="z-index:0" defaultOpen="preview" :subfield="false"
          :editable="false" :toolbarsFlag="false" />
      </div>

    </div>


    <!-- <div style="display: flex">

      <div style="color:#657180">所属团队 ：{{info.teamName}} &nbsp;&nbsp; &nbsp;&nbsp; </div>

      <div style="color:#657180">上传时间 ： 2019-06-05 15:23 &nbsp;&nbsp; </div>

      <div style="color:#657180"> 点击量 ：{{info.hits}}</div>
    </div> -->

    <div class="footer-frame">
      <div class="footer-inside-info">
        © 2018 Fearless, Inc. Terms Privacy Security Status Help
        <img src="./../../assets/fearless.jpg" class="fearlessImg" /> Contact Fearless API Training Shop Blog About
      </div>
    </div>


  </div>

</template>

<script>
  export default {
    name: 'WorksDetails',
    data() {
      return {
        menber: '',
        // 从服务器获取的数据
        info: [],
        // 传递过来的作品pkId
        pkId: 0,
        showPic: '',
        // markdown显示的
        workintrodection: '',
      }
    },
    created() {
      this.menu();
      var that = this
      that.pkId = that.$route.params.pkId,
        that.showPic = that.$route.params.showPic,
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      that.$http.get(this.global.url + "/work/list/" + that.pkId).then(response => {
        // 获取data
        that.info = response.data.data;
        that.workintrodection = that.info.workContext.context
        // 团队名
        that.$http.get(this.global.url + "/team/list/" + that.info.affiliateTeam).then(response => {
          that.menber = response.data.data.member
        }, response => {})
      }, response => {})

    },
    watch: {},
    methods: {
      menu() {
        window.scrollTo(0, 0);
      },
    },

  }

</script>
