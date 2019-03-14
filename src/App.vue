<style scoped>
  @import "./css/Layout.css";

  #app {
    font-size: 14px;
  }

  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  c .slide-left-leave-active {
    will-change: transform;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

  }

  .slide-left-enter-active,
  .slide-right-leave-active {
    transform: translateX(-100%);

  }

  .slide-right-enter-active,
  .slide-left-leave-active {
    transform: translateX(-100%);
  }

</style>
<template>

  <div id="app">
    <!-- top -->
    <div class="navigation-layout">
      <div class="navigation-inside-layout">

        <router-link class="navigation-cell" :to="{ name: 'Index' }">
          <div class="navigation-hoverColor"> </div>
          首页
        </router-link>

        <router-link class="navigation-cell" :to="{ name: 'Works' }">
          <div class="navigation-hoverColor"> </div>
          作品
        </router-link>

        <router-link class="navigation-cell" :to="{ name: 'Team' }">
          <div class="navigation-hoverColor"> </div>
          团队
        </router-link>

        <div class="navigation-cell">
          <div class="navigation-hoverColor"> </div>
          技术
        </div>

        <router-link :to="{ name: 'SignIn' }">
          <div class="navigation-sign-in">
            注册团队
          </div>
        </router-link>

        <div class="navigation-search">
          <Input search @on-search="search" v-model="searchinfo" placeholder="请输入作品名" />
        </div>

      </div>
    </div>

    <!-- <transition :name="transitionName"> -->

    <router-view></router-view>

    <!-- </transition> -->

  </div>

</template>

<script>
  export default {
    data() {
      return {
        searchinfo: '',
        transitionName: '',
      }
    },
    name: 'App',
    components: {},
    methods: {
      fetchData() {  },
      // 搜索
      search()  {
        if (this.searchinfo === '') {
          return
        } else {
          this.$http.get(this.global.url + "/work/list", {
            params: {
              limit: 5,
              page: 1,
              name: this.searchinfo
            }
          }).then(response => {
            if (response.data.data === null) {
              this.$Message.warning("没有相关搜索结果");
              return;
            }
            this.$router.replace({name:"Index"})
            this.$router.replace({
              name: 'Works',
              params: {
                searchinfo: this.searchinfo
              },
            })
          }, response => {})
        }
      },
    },
    created() {
      var self = this;
      self.fetchData();
    },
    watch: { //使用watch 监听$router的变化
      '$route': 'fetchData',
      $route(to, from) {
        //如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if (to.meta.index < from.meta.index) {
          this.transitionName = 'slide-left';
        } else {
          this.transitionName = 'slide-right';
        }
      }

    }
  }

</script>
