<template>
 <div class="zhuce">
     <div class="zhuce-box">

        <i class="el-icon-circle-close close-zhuce" @click="closezhuce"></i>
        
        <el-form :label-position="labelPosition" label-width="80px" :model="formRegister" :rules="rules">

          <el-form-item label="用户账号" class="zhucela" prop="u_no">
            <el-input placeholder="请输入账号" v-model="formRegister.u_no"></el-input>
          </el-form-item>

          <el-form-item label="姓名" class="zhucela" prop="u_name">
            <el-input placeholder="请输入姓名" v-model="formRegister.u_name"></el-input>
          </el-form-item>

          <el-form-item label="密码" class="zhucela" prop="u_password">
            <el-input placeholder="请输入密码" v-model="formRegister.u_password" show-password></el-input>
          </el-form-item>

          <el-form-item label="再次输入密码" class="zhucela" prop="u_passwordR">
            <el-input placeholder="请再次输入密码" v-model="formRegister.u_passwordR" show-password></el-input>
          </el-form-item>

           <el-form-item label="输入用户类型" class="zhucela" prop="u_type">
            <el-select placeholder="选择用户类型" v-model="formRegister.u_type">
              <el-option label="管理员" value="管理员"></el-option>
            </el-select>
          </el-form-item>

          <!-- <el-form-item label="用户类型">
            <el-select v-model="addUser.u_type" placeholder="请选择角色">
              <el-option label="管理员" value="管理员"></el-option>
              <el-option label="班主任" value="班主任"></el-option>
            </el-select>
          </el-form-item> -->
        </el-form>

        <el-button type="primary" class="zhuce-button" @click="zhuce">注册</el-button>
    </div>  
  </div>
</template>

<script>
 export default {
   data () {
      return {
        labelPosition: 'top',
        formRegister: {
          u_no: '',
          u_password: '',
          u_name: '',
          u_passwordR:'',
          u_type:""
        },
        rules: {
          u_no: [
            {required: true, message: '请输入用户账号', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'}
          ],
          u_name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'}
          ],
          u_password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {max: 11, message: '不能大于11个字符', trigger: 'blur'}
          ],
          u_passwordR: [
            {required: true, message: '再次输入密码', trigger: 'blur'},
            {max: 11, message: '不能大于11个字符', trigger: 'blur'}
          ],
           u_type: [
            {required: true, message: '输入用户类型', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'}
          ]
        }
     }
   },
   components: {

   },
   methods: {

     closezhuce () {
       this.$router.replace({path:'/login'})
     },
     zhuce () {
       if(this.formRegister.u_no==""){
          this.$message('请输入账号')
       }
       else if(this.formRegister.u_name==""){
          this.$message('请输入姓名')
       }
       else if(this.formRegister.u_password==""){
          this.$message("请输入密码");
        }else if(this.formRegister.u_passwordR==""){
          this.$message("请再次输入密码")
        }else if(this.formRegister.u_type==""){
          this.$message("请输入用户类型")
        } else if(this.formRegister.u_password==this.formRegister.u_passwordR){
          this.$axios
          .post('/register', {
            u_no: this.formRegister.u_no,
            u_name: this.formRegister.u_name,
            u_password: this.formRegister.u_password,
            u_type: this.formRegister.u_type
          })
          .then(successResponse => {
            this.responseResult = JSON.stringify(successResponse.data)
            if (successResponse.data.code === 200) {
              this.$message('注册成功请登陆')
              this.$router.push({ path: "/login" });
            }
          })
          .catch(failResponse => {
             this.responseResult = JSON.stringify(failResponse.data)
             if(failResponse.data.code === 400){
               this.$message('输入值为空')
             }
          })
        }else{
          this.$message("两次密码不一致")
        }
     }
  
     
   }
 }
</script>

<style>

  .zhuce-box{
  
    position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 400px;
		padding: 40px;
    background: rgba(0, 0, 0, 0.562);
		box-sizing: border-box;
		box-shadow: 0 15px 25px rgba(0,0,0,.5);
		border-radius: 10px;
  }
  .close-zhuce{
    position: absolute;
    right: 25px;
    top: 20px;
    font-size: 20px;
    color: #fff;
  }
 .el-form--label-top .el-form-item__label{
   color: #fff;
   padding: 0 0 2px;
 }
 .zhuce-button{
   width: 320px;
   margin-top: 10px;
 }
</style>
