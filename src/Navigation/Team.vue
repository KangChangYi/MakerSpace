<style scoped>
  @import "../css/Layout.css";

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

    <div class="team-page-bg">
      <div class="big-title">人多好办事</div>
      <div class="title-text"> &emsp;&emsp;单个的人是软弱无力的，就像漂流的鲁滨孙一样，只有同别人在一齐，他才能完成许多事业。
      </div>
      <div class="title-text-2">——叔本华 </div>
      <!-- 
      <router-link :to="{ name: 'SignIn' }" replace>
        <input type="button" name="button2" class="button2" value="创建团队">
      </router-link> -->

    </div>

    <transition mode="out-in">
      <router-view></router-view>
    </transition>

    <div class="footer-frame">
      <div class="footer-inside-info">
        © 2018 Fearless, Inc. Terms Privacy Security Status Help
        <img src="../assets/fearless.jpg" class="fearlessImg" /> Contact Fearless API Training Shop Blog About
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Team',
    data() {
      return {}
    }
  }

</script>
