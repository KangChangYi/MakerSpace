<style scoped>
  @import "../css/layout.css";

  .Divider-text {
    font-weight: bold;
    color: #777;
    font-size: 17px;
  }

  /* 特效 */
  .v-enter {
    opacity: 0;
  }

  .v-enter-active {
    transition: 0.25s;
  }

  .v-enter-to {
    opacity: 1;
  }

  .v-leave {
    opacity: 1;
  }

  .v-leave-to {
    opacity: 0;
  }

  .v-leave-active {
    transition: 0.25s;
  }

</style>

<template>

  <div id="app">
    <div class="bg-image">
        <!-- Maker's Space -->
        <!-- <span style="font-size: 40px;font-family:'Calibri'" > SHAOXING UNIVERSITY</span> -->
      <img class="maker-space-logo" src="../assets/marksapce.png" />
    </div>

    <!-- mid -->

    <div class="page-mid">

      <div class="title-frame">
        <div class="title" @click="hotWorks"> 首页推荐 </div>
        <div class="title" @click="newWorks"> 最新作品 </div>
      </div>

      <div style="min-height:390px;">
        <transition mode="out-in">
          <router-view></router-view>
        </transition>
      </div>

      <Divider orientation="center" class="Divider-text">
        <span>优秀团队</span>
      </Divider>

      <!-- 显示团队 -->
      <div class="show-team-frame">
        <router-link class="show-team" :style="backgroundDiv1" :to="{ name : 'TeamDetail', params:{ pkId:1 }}">
        </router-link>
        <div class="show-team" :style="backgroundDiv1"> </div>
        <div class="show-team" :style="backgroundDiv1"> </div>
        <div class="show-team" :style="backgroundDiv1"> </div>
      </div>
      <!-- 显示团队 -->

    </div>

    <!-- mid -->

    <div class="footer-frame">
      <div class="footer-inside-info">
        © 2018 Fearless, Inc. Terms Privacy Security Status Help
        <img src="../assets/fearless.jpg" class="fearlessImg" /> Contact Fearless API Training Shop Blog About
      </div>
    </div>

  </div>

</template>

<script>
  // const url = "http://192.168.10.113:8080";
  const url = "http://210.32.98.136:8080";
  export default {
    url,
    data() {
      return {
        // 设置背景图片
        backgroundDiv1: {
          backgroundImage: 'url(' + require('../assets/fearLess.png') + ')'
        }
      }
    },
    name: 'Index',
    components: {},
    created() {},
    methods: {
      menu() {
        window.scrollTo(0, 0);
      },
      hotWorks() {
        this.$router.push({
          name: "HotWork"
        })
      },
      newWorks() {
        this.$router.push({
          name: "NewWork"
        })
      }
    },
  }

</script>
