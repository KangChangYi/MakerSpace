<style scoped>
  @import "./TeamList.css";
</style>

<template>
  <div class="team-list-frame">

    <router-link class="team-list-item" v-for="item in teaminfo" :key="item.pkId" :to="{ name:'TeamDetail',params:{pkId:item.pkId}}">
  
      <img v-bind:src="item.coverPic" class="team-list-item-img" />

      <!-- <div class="team-list-item-name">
        {{item.teamName}}
      </div>

      <div class="team-list-item-other-frame">
        <div class="team-list-item-other">
          <img class="team-list-item-icon" src="./../../assets/tag.png">
          <div class="team-list-item-College">{{item.affiliationCollege}} </div>
        </div>

        <div class="team-list-item-other">
          <img class="team-list-item-icon" src="./../../assets/manager.png">
          <div class="team-list-item-College">{{item.manager}} </div>
        </div>
      </div> -->


    </router-link>

    <div class="paging">
      <page :total="this.totalCount" :page-size="6" show-elevator @on-change="changePage" />
    </div>

  </div>

</template>

<script>
  export default {
    name: 'TeamList',
    data() {
      return {
        // teaminfos: [
        //   { id: 1, img: require("../../assets/dota.jpg"), main: "Minnesota Higher", mini: " Education Five campuses across Minnesota 60,000+ University of Minnesota Lear network for collaborating on code with GitHu" },
        //   { id: 2, img: require("../../assets/dota.jpg"), main: "Minnesota Higher", mini: " Education Five campuses across Minnesota 60,000+ University of Minnesota Lear network for collaborating on code with GitHu" },
        //   { id: 3, img: require("../../assets/dota.jpg"), main: "Minnesota Higher", mini: " Education Five campuses across Minnesota 60,000+ University of Minnesota Lear network for collaborating on code with GitHu" },
        //   { id: 4, img: require("../../assets/dota.jpg"), main: "Minnesota Higher", mini: " Education Five campuses across Minnesota 60,000+ University of Minnesota Lear network for collaborating on code with GitHu" },
        //   { id: 5, img: require("../../assets/dota.jpg"), main: "Minnesota Higher", mini: " Education Five campuses across Minnesota 60,000+ University of Minnesota Lear network for collaborating on code with GitHu" },
        //   { id: 6, img: require("../../assets/dota.jpg"), main: "Minnesota", mini: " Education Five campuses across Minnesota 60,000+ University of Minnesota Lear network for collaborating on code with GitHu" }
        // ],
        // 总条数
        totalCount: 0,
        // 返回数组
        teaminfo: [],
        // 当前页数
        page: 1,
      }
    },
    components: {},
    created: function () {
      this.$http.get(this.global.url + "/team/list", {
        params: {
          limit: 6,
          page: 1
        }
      }).then(response => {
        // 获取总条数
        this.totalCount = response.data.data.totalCount
        // 获取data
        this.teaminfo = response.data.data.list;
      }, response => {
        // error callback
      })
    },
    methods: {
      changePage(page) {
        this.page = page;
        this.$http.get(this.global.url + "/team/list", {
          params: {
            limit: 6,
            page: this.page
          }
        }).then(response => {
          this.teaminfo = response.data.data.list;
          this.teaminfo = this.teaminfo;
        }, response => {
          // error callback
        })
      }
    },

  }

</script>
