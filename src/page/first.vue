<template>
  <div class="first">
    <div class="message">
      <el-row :gutter="20">       

        <el-col :span="6" class="mm1">
          <div>
            <el-card style="position: relative;" class="elcard1">
              <div class="card">
                <div class="something">
                  <span class="s1">{{userL}}</span>
                  <span class="s2">注册用户</span>
                  <i class="el-icon-user" style="color: #26A65B"></i>
                </div>

                <!-- <el-progress :percentage="" color="#FC9D99"></el-progress> -->
              </div>
            </el-card>
          </div>
        </el-col>

      </el-row>
    </div>

    <div class="welcome">
      <el-card class="elcard20">
        <div >
          <span>欢迎使用学生宿舍管理系统</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
      materialL: "",
      userL: ""
    };
  },
  components: {},
  created() {
  let _this = this;
  //   this.$axios
  //     .get("/materials")
  //     .then(function(res) {
  //       if (res.data) {
  //         _this.materialL = res.data.length;
  //         // console.log(_this.materialL);
  //       }
  //     })
  //     .catch(function(err) {
  //       if (err.response) {
  //         console.log(err.response);
  //       }
  //     });

    this.$axios
      .get("/user")
      .then(function(res) {
        if (res.data) {
          _this.userL = res.data.length;
          // console.log(res.data)
        }
      })
      .catch(function(err) {
        if (err.response) {
          console.log(err.response);
        }
      });
   },
  // computed: {},
  methods: {
    
 },

};
</script>

<style>


.card {
  height: 90px;
}
.mm1{
  margin-left: 400px;
}
.mm2{
  margin-left: 360px;
}
.something i {
  font-size: 40px;
  position: absolute;
  right: 10px;
  top: 24px;
}
.something .s1 {
  font-size: 40px;
  font-weight: 700;
}
.something .s2 {
  /* margin-left: 10px; */
  display: block;
  color: #909399;
  font-size: 14px;
  margin-top: 5px;
}
.el-progress {
  margin-top: 10px;
  margin-left: 10px;
}
.dataChart {
  margin-top: 20px;
}
.elcard20 {
  height: 250px;
  /* line-height: 150px; */
  text-align: center;
  /* padding-bottom: 50px; */
   /* height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.elcard20 span {
  font-size: 55px;
  /* margin-bottom: 50px; */
}
.welcome {
  margin-top: 80px;
  height: 100px;
}
.span1 {
  margin-right: 50px;
  color: #e6a23c;
}
.span2 {
  margin-right: 50px;
  color: #67c23a;
}
.span3 {
  color: #409eff;
}

.elcard20 .text2 {
  background: url(https://media.giphy.com/media/3o6Ztb45EYezY9x9gQ/giphy.gif);
  background-size: contain;
  background-position: top left;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 9rem;
  font-weight: bold;
  font-family: sans-serif;
}
</style>