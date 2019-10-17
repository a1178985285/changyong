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

        <el-form-item prop="chepass" class="input-box">
        <el-input
          type="password"
          placeholder="请确定输入密码"
          v-model="ruleForm2.chepass"
          auto-complete="off"
          clearable
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>

      <el-form-item style="margin:20px 0 30px 0">
        <el-button type="primary" round @click="submitForm('ruleForm2')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
 <script>
export default {
  data() {
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
       var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };


    return {
      ruleForm2: {
        username: "",
        pass: "",
        chepass:""
      },
      rules2: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { type: "string", min: 4, message: "用户名最少4位", trigger: "blur" }
        ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
            chepass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
       
      }
    };
  },
  mounted() {},
  methods: {
	  //调到登录页面
	  goReg(){
		  this.$router.push({path:"./"})
	  },
	  
	  
    //提交
    submitForm(data) {
      if (this.ruleForm2.username === "" || this.ruleForm2.pass === "" ||this.ruleForm2.username === "" || this.ruleForm2.chepass === "" ) {
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
        console.log(this.ruleForm2)
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
                  message: "注册成功",
                  type: "success"
                });
                
		       this.$router.push({path:"./b"})
	
                //存uid
              } else {
                  this.$message({
                  message: "注册失败",
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
                  message: "注册失败",
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