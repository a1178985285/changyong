<template>
  <div>
    <div style="margin: 20px;display:flex;justify-content: space-between">
      <div>
        <el-button @click="batchdele(tableData)">批量删除</el-button>
        <el-button @click="dialogFormVisible = true">添加</el-button>
      </div>
      <div>
        <el-input v-model="search" placeholder="输入关键字搜索" style="width:30vw" />
      </div>
    </div>
    <el-table
      border
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      @selection-change="selectcli"
      @select-all="selectcliwh"
         tooltip-effect="dark"
    >
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column label="id" prop="id" sortable align="center"></el-table-column>

      <el-table-column label="日期" prop="date" sortable align="center"></el-table-column>

      <el-table-column label="名字" prop="name" align="center"></el-table-column>

      <el-table-column label="地址" prop="address" align="center"></el-table-column>

      <el-table-column label="操作" align="center">
        >
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row.id, scope.row)">修改</el-button>
          <el-button type="danger" @click="handleDelete(scope.row.id, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>



<!-- 添加2 -->

<el-dialog title="添加" :visible.sync="dialogFormVisible">
  
<el-form  status-icon label-width="60px" class="demo-ruleForm" 
 :model="formTwo"
 :rules="rules2" ref="formTwo" 
 >

  <el-form-item label='名字'   prop="user">
    <el-input type="text"  
      v-model="formTwo.user"
    ></el-input>
  </el-form-item>

  <el-form-item label="地址" >
    <el-input type="text"  ></el-input>
  </el-form-item>

  <el-form-item label="密码" >
    <el-input type="text"  ></el-input>
  </el-form-item>

</el-form>



  <div slot="footer" class="dialog-footer">
      <el-button @click="ResetFrom">重置</el-button>
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmFrom">确 定</el-button>
  </div>
</el-dialog>




  </div>
</template>

<script>
export default {
  data() {
    return {
      multipleSelection: [],
      tableData: [
        {
          date: "2016-05-02",
          id: 2,
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          id: 3,
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          id: 5,
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "张小虎",
          id: 10,
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      search: "",
//添加开始
      dialogTableVisible: false,
      dialogFormVisible: false,
    //添加里面的内容 form
        formTwo:{
              user:""
        },
        //表单验证
        rules2:{
               user: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        }
        
    };
  },
  mounted() {
    //监听滚动条
    //   window.addEventListener('scroll', () => {
    //   let top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
    //   console.log(top);
    // })
  },
  created(){

  },
    //组件
  components:{

  },  
  //计算属性
  computed:{

  },
  methods: {
    //编辑
    handleEdit(index, row) {
      console.log(index);
      console.log(row);
    },
    //删除
    handleDelete(index, row) {
      console.log(index);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {




          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },

    //单选
    selectcli(value) {
      //   console.log(value)
      //   //  this.multipleSelection = value;
      //   //  console.log(this.multipleSelection)
      //   for (let key in value){
      //         var valueid=value[key].id
             
      //   }
      // console.log(valueid)
      //           var multipleSelection = this.multipleSelection;

      //           // if(valueid!=valueid){
      //           //   valueid=null
      //           // }
      

      //         this.multipleSelection.push(valueid)
      //          this.multipleSelection.unshift(valueid)
      //         this.multipleSelection
      //          console.log(this.multipleSelection)
         
    },
    //全选
    selectcliwh(selection) {
      //把所有的id放进multipleSelection
      for (let key in selection) {
        var seleId = selection[key].id;
        this.multipleSelection.push(seleId);
      }
      console.log(this.multipleSelection);
    },
    //批量删除
    batchdele() {
      var multipleSelection = this.multipleSelection;
      //数组去重，避免重复的
      var multipleSelections = Array.from(new Set(multipleSelection));
      console.log(multipleSelections);
      //批量删除为空的时候，回
      if (multipleSelection.length == 0) {
        this.$message({
          message: "您没有要删除的东西",
          type: "warning"
        });
        return;
      }
      //批量获取到每一个id
      // for (let key in multipleSelections ){
      //       console.log(multipleSelections[key])
      // }
    },
    //表单提交
    confirmFrom(){
        this.dialogFormVisible = false;
        this.formTwo.user=''
    },
    //表单重置
    ResetFrom(){

    }
    
  }
};
</script>

<style  scoped>
</style>