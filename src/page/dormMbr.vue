<template>
  <div class="people">
    <div class="topButton">
      <el-button v-show="addsy" size="mini" @click="showAddDM()" type="primary">添加舍员</el-button>

      <el-button v-show="editsy" size="mini" type="warning" @click="showChange()">修改</el-button>

      <!-- <el-button size="mini" type="info" @click="mShow()">查看密码</el-button> -->

      <el-button v-show="deletesy" size="mini" type="danger" @click="showDelete()">删除</el-button>
	  <el-button  size="mini" type="info" @click="goback()" v-show="backbutton">返回</el-button>
    </div>
    <!-- 表格 -->
    <div class="list">
      <div class="search" v-show="searchsy">
        <el-input v-model="search" placeholder="请输入学号或者宿舍号"></el-input>
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
        
		<el-table-column label="宿舍号" prop="d_no"></el-table-column>

        <el-table-column label="学号" prop="s_no"></el-table-column>

        <el-table-column label="姓名" prop="s_name"></el-table-column>

        <el-table-column label="班级" prop="s_class"></el-table-column>

        <el-table-column label="班主任" prop="t_name"></el-table-column>

        <el-table-column label="是否为舍长" prop="is_dorm_header"></el-table-column>

      <!--  <el-table-column label="违规操作">
            <button @click="selectAttnClass()">逃课</button>
            <button @click="selectUseElec()">违规用电</button>
            <button @click="selectNotReturn()">夜不归寝</button>
        </el-table-column> -->
<el-table-column label="违规操作" align="center" min-width="100">
      <template slot-scope="scope">
        <button  @click="selectAttnClass(scope.row.s_no)">逃课</button>
        <button  @click="selectUseElec(scope.row.s_no)">违规用电</button>
		<button  @click="selectNotReturn(scope.row.s_no)">夜不归寝</button>
      </template>
    </el-table-column>
        <!-- <el-table-column label="楼层数" prop="floor"></el-table-column>

        <el-table-column label="楼层数" prop="floor"></el-table-column>

        <el-table-column label="楼层数" prop="floor"></el-table-column>

        <el-table-column label="楼层数" prop="floor"></el-table-column> -->

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

    <div v-if="flag" class="addD">
      <div class="title">
        <h2>添加舍员信息</h2>
        <i class="el-icon-close" @click="clossAdd()"></i>
      </div>
      <div class="add">
        <el-form ref="form" :model="addDormitoryM" label-width="80px" :rules="rules">
          <el-form-item label="宿舍号">
            <el-input v-model="addDormitoryM.d_no"></el-input>
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model="addDormitoryM.s_no" placeholder="请输入数字"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="addDormitoryM.s_name"></el-input>
          </el-form-item>
          <el-form-item label="班级">
            <el-input v-model="addDormitoryM.s_class"></el-input>
          </el-form-item>
          <el-form-item label="班主任">
            <!-- <el-input v-model="addDormitoryM.t_name"></el-input> -->
			<el-select v-model="addDormitoryM.t_name" placeholder="请选择班主任">
			  <el-option value="" disabled selected>请选择</el-option>
			  <el-option v-for="item in list" :key="item.u_name" :value="item.u_name" :label="item.u_name"></el-option>
			</el-select>
          </el-form-item>
          <el-form-item label="舍长">
            <el-select v-model="addDormitoryM.is_dorm_header" placeholder="请选择">
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="楼层号">
            <el-input v-model="addDormitoryM.floor"></el-input>
          </el-form-item> -->
          <div class="addButton">
            <el-form-item>
              <el-button type="primary" @click="addDormitoryMr()">提交</el-button>
              <el-button @click="addRest()">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <!-- 修改弹框 -->

    <div v-if="flag2" class="changeD">
      <div class="title">
        <h2>修改舍员信息</h2>
        <i class="el-icon-close" @click="clossChange()"></i>
      </div>

      <div class="change">
        <el-form ref="form" :model="changeList" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="changeList.s_name"></el-input>
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model="changeList.s_no"></el-input>
          </el-form-item>
          <el-form-item label="班级">
            <el-input v-model="changeList.s_class"></el-input>
          </el-form-item>
          <el-form-item label="班主任">
           <!-- <el-input v-model="changeList.t_name"></el-input> -->
		   <el-select v-model="changeList.t_name" placeholder="请选择班主任">
		     <el-option value="" disabled selected>请选择</el-option>
		     <el-option v-for="item in changeStuList" :key="item.u_name" :value="item.u_name" :label="item.u_name"></el-option>
		   </el-select>
          </el-form-item>
          <el-form-item label="舍长">
            <el-select v-model="changeList.is_dorm_header" placeholder="请选择">
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="楼层号">
            <el-input v-model="changeList.floor"></el-input>
          </el-form-item> -->
          <div class="addButton">
            <el-form-item>
              <el-button type="primary" @click="changeDormitoryM()">提交</el-button>
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
	  addsy:false,
	  editsy:false,
	  deletesy:false,
	  searchsy:false,
	  backbutton:false,
      search: "",
      currentPage: 1, //初始页
      pagesize: 5,
      addDormitoryM: [
        {
          d_no:'',
          s_no:'',
          s_name: "",
          s_class:"",
          t_name:"",
          is_dorm_header: ""
         
        }
      ],
      changeList: [
        {
          d_no:'',
          s_no:'',
          s_name: "",
          s_class:"",
          t_name:"",
          is_dorm_header: ""
          
        }
      ],
      deleteList: [
        {
          d_no:'',
          s_no:'',
          s_name: "",
          s_class:"",
          t_name:"",
          is_dorm_header: ""
         
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
    let u_type = this.$store.getters.userNType;
    let u_no = this.$store.getters.userNo;
    let u_name = this.$store.getters.userName;
    console.log(u_type);
    var srcStr = "/dormitorymbr";
    let dNo = this.$store.getters.dNo;
    let d_no = this.$route.query.d_no;
    if(d_no == undefined){
      d_no = "";
    }
	if(d_no !="" && d_no != undefined){
		_this.backbutton = true;
	}
	console.log("参数",d_no);
	if(u_type == "班主任"){
		srcStr = srcStr+"?b_name=" + u_name + "&u_type=" + u_type + "&ssh=" + encodeURIComponent(d_no);
	} else if(u_type == "管理员"){
		srcStr = srcStr+"?u_type=" + u_type + "&ssh=" + encodeURIComponent(d_no);
		console.log("管理员地址",srcStr);
	}  else if(u_type == "舍长"){
		srcStr = srcStr+"?ssh=" + encodeURIComponent(dNo) + "&u_type=" + u_type;
	}
	console.log("地址",srcStr);
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
				
	if(u_type == "管理员"){
		this.addsy = true;
		this.editsy=true;
		this.deletesy=true;
		this.searchsy=true;
	}
  },
  inject: ["reload"],
  methods: {
    selectAttnClass(val){
      this.$router.push({ path: "/home/dormMbrCs?val=" + encodeURIComponent(val) });
      console.log(_this.changeList.s_no)
    },
    selectUseElec(val){
      this.$router.push({ path: "/home/dormMbrElec?val=" + encodeURIComponent(val) });
    },
    selectNotReturn(val){
      this.$router.push({ path: "/home/dormMbrNR?val=" + encodeURIComponent(val) });
    },
    showAddDM() {
      this.flag = !this.flag;
    },
    addDormitoryMr() {
      if(this.addDormitoryM.s_name){
         let _this = this;
      this.$axios
        .post("/dormitorymbr", {
          d_no:_this.addDormitoryM.d_no,
          s_no: _this.addDormitoryM.s_no,
          s_name: _this.addDormitoryM.s_name,
          s_class: _this.addDormitoryM.s_class,
          t_name: _this.addDormitoryM.t_name,
          is_dorm_header: _this.addDormitoryM.is_dorm_header
          // floor: _this.addDormitory.floor
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$message("添加成功");
            this.flag = !this.flag;
            // this.flag2=!this.flag2
            // this.$router.go(0)
            this.reload();
            console.log(_this.addDormitoryM.d_no)
          } else {
			  this.$message(res.data.message);
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
    changeDormitoryM() {
      let _this = this;
      this.$axios
        .put("/dormitorymbr", {
			id: _this.changeList.id,
		  d_no: _this.changeList.id,
          s_name: _this.changeList.s_name,
          s_no: _this.changeList.s_no,
          s_class: _this.changeList.s_class,
          t_name: _this.changeList.t_name,
          is_dorm_header: _this.changeList.is_dorm_header
          // floor: _this.changeList.floor
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
      console.log(_this.deleteList.d_no);
      this.$axios
        .delete("/dormitorymbr", {
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
goback(){
	this.$router.go(-1);//返回上一层
},
    showDelete() {
      if (this.deleteList.d_no) {
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
      this.addDormitoryM = [];
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
      if (this.changeList.d_no) {
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
    },
    selctStudent(){
		this.currentPage = 1;
		let _this = this;
		let u_type = this.$store.getters.userNType;
		console.log(_this.search);
		this.$axios
		  .get("/dormitorymbr?s_no=" +encodeURIComponent( _this.search) + "&u_type=" + u_type)//用于uri当做参数传播
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
     /* let _this = this;
      this.$axios
        .get("/dormitorymbr", {
          data: {
            s_no: _this.search
          }
        })
        .then(res => {
          // if (res.data.code === 200) {
          //   this.$message("删除成功");
          //   this.flag3 = !this.flag3;
          //   this.reload();
          // }
          // this.reload();
        })
        .catch(err => {
          if (err.response) {
            console.log(err.response);
            this.$message("后台连接失败");
          }
        }); */
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
.addD {
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
.addD .title {
  height: 50px;
  width: 100%;
  text-align: center;
  line-height: 30px;
  /* border-bottom: 1px solid #dcdfe6; */
  color: #409eff;
  text-shadow: 2px 2px 2px #ccc;
}
.addD .title i {
  position: relative;
  top: -55px;
  right: -170px;
  color: black;
  font-size: 20px;
}
.addD .add {
  margin-right: 40px;
  margin-top: 30px;
}
.addD .addButton {
  margin-left: 10px;
  margin-top: 30px;
}
.addD .addButton .el-button {
  width: 110px;
}
.addD .el-select {
  width: 280px;
}
.changeD {
  position: absolute;
  z-index: 1001;
  width: 400px;
  height: 500px;
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
.changeD .title {
  height: 50px;
  width: 100%;
  text-align: center;
  line-height: 30px;
  /* border-bottom: 1px solid #dcdfe6; */
  color: #409eff;
  text-shadow: 2px 2px 2px #ccc;
}
.changeD .title i {
  position: relative;
  top: -55px;
  right: -170px;
  color: black;
  font-size: 20px;
}
.changeD .change {
  margin-right: 40px;
  margin-top: 30px;
}
.changeD .addButton .el-button {
  width: 115px;
}
.changeD .el-select {
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