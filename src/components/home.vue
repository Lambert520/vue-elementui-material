<template>
  <div class="home">
    <head-top></head-top>
    <el-container style="height:100%">
      <div style="border-right:1px solid #dcdfe6;" :style="height" class="leftm">

        <el-aside width="200px">
  
          <el-menu :default-active="$route.path" style="min-height: 100%;" router>
            <el-menu-item index="/home/first">
              <i class="el-icon-odometer"></i>
              <span slot="title" class="">欢迎界面</span>
            </el-menu-item>

            <el-submenu index="4" v-show="ssgl">
              <template slot="title">
                <i class="el-icon-shopping-bag-1"></i>
                <span>宿舍管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home/dormInfo">基本信息</el-menu-item>
              </el-menu-item-group>

              <!-- <el-menu-item-group>
                <el-menu-item index="/home/dormMember">舍员信息</el-menu-item>
              </el-menu-item-group> -->

              <!-- <el-menu-item-group>
                <el-menu-item index="/home/sanitation">卫生情况</el-menu-item>
              </el-menu-item-group> -->

              <!-- <el-menu-item-group>
                <el-menu-item index="/home/bed">就寝信息</el-menu-item>
              </el-menu-item-group> -->

              <!-- <el-menu-item-group>
                <el-menu-item index="/home/repaired">报修记录</el-menu-item>
              </el-menu-item-group> -->
              <!-- <el-menu-item-group>
                <el-menu-item index="/home/latereturn">晚归记录</el-menu-item>
              </el-menu-item-group> -->
              <!-- <el-menu-item-group>
                <el-menu-item index="/home/watertransfer">搬水记录</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="/home/waterdeliver">送水记录</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="/home/leavescholl">离校时间</el-menu-item>
              </el-menu-item-group> -->
            </el-submenu>

            <el-submenu index="5" v-show="cygl">
              <template slot="title">
                <i class="el-icon-truck"></i>
                <span>宿舍成员管理</span>
              </template>

              <el-menu-item-group>
                <el-menu-item index="/home/dormMbr">基本信息</el-menu-item>
                <el-menu-item index="/home/dormMbrCs">逃课</el-menu-item>
                <el-menu-item index="/home/dormMbrElec">违规用电</el-menu-item>
                <el-menu-item index="/home/dormMbrNR">夜不归寝</el-menu-item>
              </el-menu-item-group>
              <!-- <el-menu-item-group>
                <el-menu-item index="/home/dormMbrCs">逃课记录</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="/home/dormMbrElec">违规用电记录</el-menu-item>
              </el-menu-item-group>
               <el-menu-item-group>
                <el-menu-item index="/home/dormMbrNR">夜不归寝记录</el-menu-item>
              </el-menu-item-group> -->
              
               <!-- <el-menu-item-group>
                <el-menu-item index="/home/dormMember">基本信息</el-menu-item>
              </el-menu-item-group>
               <el-menu-item-group>
                <el-menu-item index="/home/dormMember">基本信息</el-menu-item>
              </el-menu-item-group>
               <el-menu-item-group>
                <el-menu-item index="/home/dormMember">基本信息</el-menu-item>
              </el-menu-item-group> -->

            </el-submenu>

            <el-submenu index="6" v-show="yhgl">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home/userInfo">用户信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
              <!-- <el-menu-item index="/home/webMap">
              <i class="el-icon-discover"></i>
              <span slot="title">地图查看</span>
            </el-menu-item> -->
          </el-menu>
        </el-aside>
      </div>

      <el-container>
        <!-- 主要内容：显示左边菜单的内容 -->
        <el-main>

          <div class="bar">
            <nav-bar></nav-bar>
          </div>
          <transition name="slide-fade">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import headTop from "./headTop.vue";
// import webMap from "../page/webMap.vue";
// import charts from "../page/someCharts.vue";
import navBar from "../components/navBar";
import dormInfo from "../page/dormInfo.vue";
import sanitation from "../page/sanitation.vue";
export default {
  data() {
    return {
      height: {
        height: ""
      },
      isCollapse: true,
	  ssgl:false,
	  cygl:false,
	  yhgl:false
    };
  },
  components: {
    headTop,
    // webMap,
    navBar,
    dormInfo
  },
  mounted() {},
  methods: {
    hh() {
      this.height.height = window.innerHeight - 60 + "px";
	  let userType = this.$store.getters.userNType;
	  if(userType == "学生"){
		  this.yhgl = true;
	  } else if(userType == "管理员"){
		 this.ssgl=true;
		 this.cygl=true;
		 this.yhgl=true;
	  } else if(userType == "班主任"){
		 this.ssgl=true;
		 this.cygl=true;
		 this.yhgl=true;
	  }  else if(userType == "舍长"){
		 this.cygl=true;
		 this.yhgl=true;
	  }  
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
    this.hh();
  },
  computed: {},
  watch: {}
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background-color: #fff;
  height: 100%;
}

.el-aside {
  background-color: #545c64;
}
.el-menu {
  border: none;
}
.bar {
  margin-bottom: 8px;
}
.slide-fade {
  position: absolute;
  left: 0;
  right: 0;
}
.slide-fade-enter-active {
  transition: all 1.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(2, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  left: 0;
  right: 0;
  transform: translateX(50px);
  opacity: 0;
}
.el-menu-item-group__title {
  padding: 0px 0px 0px 20px;
}

</style>
