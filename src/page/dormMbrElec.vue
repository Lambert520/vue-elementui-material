<template>
  <div class="people">
    <div class="topButton">
      <el-button v-show="addEc" size="mini" @click="showAddElec()" type="primary">添加违规用电记录</el-button>

      <el-button v-show="editEc" size="mini" type="warning" @click="showChange()">修改</el-button>

      <!-- <el-button size="mini" type="info" @click="mShow()">查看密码</el-button> -->

      <el-button v-show="deleteEc" size="mini" type="danger" @click="showDelete()">删除</el-button>
    </div>
    <!-- 表格 -->
    <div class="list">
      <div class="search">
        <el-input v-model="search" placeholder="请输入学号/宿舍号"></el-input>
		<el-button size="mini" type="number" @click="selctStudent()">查询</el-button>
      </div> 

      <el-table
        :data="user.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        style="width: 100%"
        highlight-current-row
        border
        @current-change="handleCurrentsChange"
      >
		<!-- <el-table-column label="编号" prop="id"></el-table-column> -->
        <el-table-column label="学号" prop="s_no"></el-table-column>

        <el-table-column label="宿舍号" prop="d_no"></el-table-column>

        <el-table-column label="姓名" prop="s_name"></el-table-column>

        <el-table-column label="违规用电原因" prop="illegal_elec_rsn"></el-table-column>

        <el-table-column label="违规用电时间" prop="illegal_elec_t"></el-table-column>
		<el-table-column label="班主任" prop="t_name"></el-table-column>

        <!-- <el-table-column label="楼层数" prop="floor"></el-table-column>

        <el-table-column label="楼层数" prop="floor"></el-table-column>

        <el-table-column label="楼层数" prop="floor"></el-table-column>  -->

      </el-table>

      <!-- 分页 -->
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="user.length"
        ></el-pagination>
      </div>
    </div>

    <!-- 添加宿舍弹框 -->

    <div v-if="flag" class="addElec">
      <div class="title">
        <h2>添加违规用电信息</h2>
        <i class="el-icon-close" @click="clossAdd()"></i>
      </div>
      <div class="add">
        <el-form ref="form" :model="addElec" label-width="80px" :rules="rules">
          <el-form-item label="学号">
            <el-input v-model="addElec.s_no"></el-input>
          </el-form-item>
          <el-form-item label="宿舍号">
            <el-input v-model="addElec.d_no"></el-input>
          </el-form-item>        
          <el-form-item label="姓名">
            <el-input v-model="addElec.s_name"></el-input>
          </el-form-item>
           <el-form-item label="违规原因">
            <el-input v-model="addElec.illegal_elec_rsn"></el-input>
          </el-form-item>
          <el-form-item label="违规时间">
            <el-input v-model="addElec.illegal_elec_t"></el-input>
          </el-form-item>
		  <el-form-item label="班主任">
		   <el-select v-model="addElec.t_name" placeholder="请选择班主任">
		     <el-option value="" disabled selected>请选择</el-option>
		     <el-option v-for="item in changeStuList" :key="item.u_name" :value="item.u_name" :label="item.u_name"></el-option>
		   </el-select>
		  </el-form-item>
          <div class="addButton">
            <el-form-item>
              <el-button type="primary" @click="addElecI()">提交</el-button>
              <el-button @click="addRest()">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <!-- 修改弹框 -->

    <div v-if="flag2" class="changeElec">
      <div class="title">
        <h2>修改违规用电信息</h2>
        <i class="el-icon-close" @click="clossChange()"></i>
      </div>

      <div class="change">
        <el-form ref="form" :model="changeList" label-width="80px">
          <!-- <el-form-item label="学号">
            <el-input v-model="changeList.s_no"></el-input>
          </el-form-item> -->
          <el-form-item label="宿舍号">
            <el-input v-model="changeList.d_no"></el-input>
          </el-form-item>  
          <el-form-item label="姓名">
            <el-input v-model="changeList.s_name"></el-input>
          </el-form-item>       
          <el-form-item label="违规原因">
            <el-input v-model="changeList.illegal_elec_rsn"></el-input>
          </el-form-item>  
          <el-form-item label="违规时间">
            <el-input v-model="changeList.illegal_elec_t"></el-input>
          </el-form-item>
		  <el-form-item label="班主任">
		   <el-select v-model="changeList.t_name" placeholder="请选择班主任">
		     <el-option value="" disabled selected>请选择</el-option>
		     <el-option v-for="item in changeStuList" :key="item.u_name" :value="item.u_name" :label="item.u_name"></el-option>
		   </el-select>
		  </el-form-item>
          <div class="addButton">
            <el-form-item>
              <el-button type="primary" @click="changeElecI()">提交</el-button>
              <el-button @click="changeRest()">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>

    <!-- 删除弹框 -->
    <div class="delete" v-if="flag3">
      <div class="title">
        <span>提示</span>
        <i class="el-icon-close" @click="closeDelete()"></i>
      </div>
      <div class="main">
        <i class="el-icon-warning"></i>
        <span>此操作将永久删除该数据，是否继续</span>
      </div>
      <div class="deleteButton">
        <el-button size="mini" @click="closeDelete()">取消</el-button>
        <el-button size="mini" type="danger" @click="deleteInfo()">确定</el-button>
      </div>
    </div>

    <div class="popContainer" v-if="flag"></div>
    <div class="popContainer" v-if="flag2"></div>
    <div class="popContainer" v-if="flag3"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: [],
      flag: false,
      flag2: false,
      flag3: false,
      flag4:false,
      search: "",
      currentPage: 1, //初始页
      pagesize: 5,
      addElec: [
        {
          d_no:'',
          s_no:'',
          s_name: "",
          illegal_elec_rsn: "",
          illegal_elec_t: ""
        }
      ],
      changeList: [
        {
          d_no:'',
          s_no:'',
          s_name: "",
          illegal_elec_rsn: "",
          illegal_elec_t: ""
        }
      ],
      deleteList: [
        {
          d_no:'',
          s_no:'',
          s_name: "",
          illegal_elec_rsn: "",
          illegal_elec_t: ""
        }
      ],
      rules: {
        d_no: [
          { required: true, message: "请输入宿舍号", trigger: "blur" },
          { max: 3, message: "不能大于3个字符", trigger: "blur" }
        ],
       
        s_no: [
          { required: true, message: "请输入学号", trigger: "blur" },
          { max: 11, message: "不能大于11个字符", trigger: "blur" }
        ]
      },
	  list:[],
	  changeStuList:[]
    };
  },
  created() {
    let _this = this;
	let val = this.$route.query.val;
	let srcStr ="/dormmbrelec";
	
	
	let u_type = this.$store.getters.userNType;
	let u_no = this.$store.getters.userNo;
	let u_name = this.$store.getters.userName;
	let dNo = this.$store.getters.dNo;
	if(u_type == '管理员'){
		_this.addEc = true;
		_this.editEc = true;
		_this.deleteEc = true;
	} else if(u_type == '舍长'){
		_this.addEc = true;
		_this.editEc = true;
		_this.deleteEc = true;
	}
	
	if(u_type == "舍长"){
		srcStr = srcStr+"?sz=" +encodeURIComponent(dNo);
	} else if(u_type == "班主任"){
		srcStr = srcStr+"?bzr=" +encodeURIComponent(u_name);
	} else{
		if(val != '' && val != undefined){
			srcStr = srcStr + "?s_no=" + val;
		}
	}
	console.log("请求地址",srcStr)
    this.$axios
      .get(srcStr)
      .then(function(res) {
        if (res.data) {
          _this.user = res.data;
          // console.log(res.data)
        }
      })
      .catch(function(err) {
        if (err.response) {
          console.log(err.response);
        }
      });
	  
	  this.$axios
	    .get("/getUser?u_type=班主任")
	    .then(res => {
	      if (res.data.code === 200) {
	  					  console.log(res);
	  	  				  _this.list = res.data.data;
	  					  _this.changeStuList = res.data.data;
	  					  console.log(_this.list);
	      }
	    })
	    .catch(function(err) {
	      if (err.response) {
	        console.log(err.response);
	        this.$message("后台连接失败");
	      }
	    });
  },
  inject: ["reload"],
  methods: {
	  selctStudent(){
		  let _this = this;
		  this.$axios
		    .get("/dormmbrelec?ssh=" + encodeURIComponent(_this.search))
		    .then(function(res) {
		      if (res.data) {
		        _this.user = res.data;
		        // console.log(res.data)
		      }
		    })
		    .catch(function(err) {
		      if (err.response) {
		        console.log(err.response);
		      }
		    });
	  },
	  goback(){
		  this.$router.go(-1);//返回上一层
	  },
    showAddElec() {
      this.flag = !this.flag;
    },
    addElecI() {
      if(this.addElec.s_no){
         let _this = this;
      this.$axios
        .post("/dormmbrelec", {
          d_no:_this.addElec.d_no,
          s_no: _this.addElec.s_no,
          s_name: _this.addElec.s_name,
          illegal_elec_rsn: _this.addElec.illegal_elec_rsn,
          illegal_elec_t: _this.addElec.illegal_elec_t,
		  t_name: _this.addElec.t_name
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message("添加成功");
            this.flag = !this.flag;
            // this.flag2=!this.flag2
            // this.$router.go(0)
            this.reload();
            console.log(_this.addElec.d_no)
          }
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
            this.$message("后台连接失败");
          }
        });
      }else{
        this.$message('请添全信息')
      }
    },
    changeElecI() {
      let _this = this;
      this.$axios
        .put("/dormmbrelec", {
			id: _this.changeList.id,
		  d_no: _this.changeList.d_no,
          s_name: _this.changeList.s_name,
          s_no: _this.changeList.s_no,
          illegal_elec_rsn: _this.changeList.illegal_elec_rsn,
          illegal_elec_t: _this.changeList.illegal_elec_t,
		  t_name: _this.changeList.t_name
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message("修改成功");
            this.flag2 = !this.flag2;
            // this.flag2=!this.flag2
            // this.$router.go(0)
            this.reload();
          }
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
            this.$message("后台连接失败");
          }
        });
    },
    deleteInfo() {

      let _this = this;
      console.log(_this.deleteList.s_no);
      this.$axios
        .delete("/dormmbrelec", {
          data: {
            id: _this.deleteList.id
          }
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message("删除成功");
            this.flag3 = !this.flag3;
            this.reload();
          }
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response);
            this.$message("后台连接失败");
          }
        });
    },

    showDelete() {
      if (this.deleteList.s_no) {
        this.flag3 = !this.flag3;
      } else {
        this.$message("请选择一条数据");
      }
    },

    clossAdd() {
      this.flag = !this.flag;
      this.$message("操作已取消");
    },
    addRest() {
      this.addElec = [];
    },
    // 点击选中
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentsChange(val) {
      this.currentRow = val;
      this.changeList = val;
      this.deleteList = val;

      // this.changeList = []
    },

    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },

    clossChange() {
      this.flag2 = !this.flag2;
      this.$message("操作已取消");
    },
    showChange() {
      if (this.changeList.s_no) {
        this.flag2 = !this.flag2;
      } else {
        this.$message("请选择一条数据");
      }
    },
    closeDelete() {
      this.flag3 = !this.flag3;
      this.$message("操作已取消");
    },
    changeRest() {
      this.changeList = [];
    },
    mShow(){
       this.flag4 = !this.flag4;
    }
  }
};
</script>

<style>
.topButton {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-bottom: 20px;
}
.el-table-column {
  text-align: center;
}
.el-submenu .el-menu-item:hover {
  background-color: rgb(232, 243, 255);
}
.list {
  position: relative;
}
.addElec {
  position: absolute;
  z-index: 1001;
  width: 400px;
  height: 550px;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
}
.addElec .title {
  height: 50px;
  width: 100%;
  text-align: center;
  line-height: 30px;
  /* border-bottom: 1px solid #dcdfe6; */
  color: #409eff;
  text-shadow: 2px 2px 2px #ccc;
}
.addElec .title i {
  position: relative;
  top: -55px;
  right: -170px;
  color: black;
  font-size: 20px;
}
.addElec .add {
  margin-right: 40px;
  margin-top: 30px;
}
.addElec .addButton {
  margin-left: 10px;
  margin-top: 30px;
}
.addElec .addButton .el-button {
  width: 110px;
}
.addElec .el-select {
  width: 280px;
}
.changeElec {
  position: absolute;
  z-index: 1001;
  width: 400px;
  height: 550px;
  /* border:1px solid #dcdfe6; */
  left: 0;
  top: -50px;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
}
.changeElec .title {
  height: 50px;
  width: 100%;
  text-align: center;
  line-height: 30px;
  /* border-bottom: 1px solid #dcdfe6; */
  color: #409eff;
  text-shadow: 2px 2px 2px #ccc;
}
.changeElec .title i {
  position: relative;
  top: -55px;
  right: -170px;
  color: black;
  font-size: 20px;
}
.changeElec .change {
  margin-right: 40px;
  margin-top: 30px;
}
.changeElec .addButton .el-button {
  width: 115px;
}
.changeElec.el-select {
  width: 280px;
}
.delete {
  position: absolute;
  z-index: 1001;
  width: 430px;
  height: 140px;
  border: 1px solid #dcdfe6;
  left: 0;
  top: -50px;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: #fff;
  border-radius: 10px;
}
.title {
  width: 100%;
  height: 45px;
  line-height: 45px;
}
.title span {
  float: left;
  margin-left: 20px;
}
.delete .title i {
  float: right;
  margin-top: 10px;
  margin-right: 10px;
}
.delete .main {
  height: 50px;
  width: 100%;
  line-height: 50px;
  margin-left: 50px;
}
.delete .main i {
  color: #e6a23c;
  font-size: 20px;
  margin-right: 10px;
}
.delete .main span {
  margin-bottom: 5px;
}
.delete .deleteButton {
  float: right;
  margin-right: 20px;
  margin-top: 7px;
}

.popContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 500;
}
.page {
  position: absolute;
  right: 0;
  bottom: -50px;
}
.search {
  position: relative;
  top: -12px;
}
</style>