 <template>
  <div class="big">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
      <el-form-item prop="username" class="input-box" style="margin-bottom:20px">
        <el-input
          v-model="ruleForm2.username"
          placeholder="请输入用户名"
          clearable
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>

      <el-form-item prop="pass" class="input-box">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="ruleForm2.pass"
          auto-complete="off"
          clearable
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>

      <el-form-item style="margin:20px 0 30px 0">
        <el-button type="primary" round @click="submitForm('ruleForm2')">提交</el-button>
      </el-form-item>

      <div class="go-reg" @click="goReg">还没有账号，立即去注册</div>
    </el-form>
  </div>
</template>
 
 <script>
export default {
  data() {
    return {
      ruleForm2: {
        username: "",
        pass: ""
      },
      rules2: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { type: "string", min: 4, message: "用户名最少4位", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { type: "string", min: 6, message: "密码最少6位", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {},
  methods: {
	  //调到登录页面
	  goReg(){
		  this.$router.push({path:"./c"})
	  },
    //提交
    submitForm(data) {
      if (this.ruleForm2.username === "" || this.ruleForm2.pass === "") {
       this.$message({
                  message: "请输入账号密码",
                  type: "error",
                    center: true
                });
      }
      //表单验证通过，true和false
      this.$refs[data].validate(valid => {
        if (valid) {
          var that = this;
          //通过表单的方式来提交
          let config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          };
          this.axios
            .post(
              this.$store.state.apis + "/api/api_login/login",
              this.ruleForm2,
              config
            )
            .then(res => {
              console.log(res);
              if (res.data) {
                this.$message({
                  message: "登录成功",
                  type: "success",
                    center: true
                });
                //存uid
                localStorage.setItem("uid", res.data.uid);
                localStorage.setItem("userName", this.formInline.user);
                localStorage.setItem("userPwd", this.formInline.password);
              } else {
                 this.$message({
                  message: "登录失败",
                  type: "error",
                    center: true
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          this.$message({
                  message: "登录失败",
                  type: "error",
                    center: true
                });
        }
      });
    }
  },
  created() {

  }
};
</script>
 
<style >
.big {
  width: 100vw;
  height: 100vh;
  background: url("./img/timg.jpg") no-repeat;
  background-size: 100% 100%;
}
.el-form-item__content {
  margin: 0 auto !important;
}
.el-input input {
  border-radius: 20px !important;
}
.el-input__icon {
  height: 0 !important;
}
.el-form-item__error {
  margin-top: -10px !important;
}
.el-button.is-round {
  width: 100%;
}
.demo-ruleForm {
  margin: 0 auto !important;
  width: 80%;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  background: #fff;
  opacity: 0.8;
  border-radius: 10px;
  padding: 30px;
}
.go-reg{
      color: red;
      text-align: center;
      padding: 10px 0 0 0;
}
</style>