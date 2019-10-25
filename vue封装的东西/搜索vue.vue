<template>
    <div>

<div id="app">
        <!-- 搜索框 -->
        <input 
            type="text" 
            v-model="selectVal"
            placeholder="搜索所在的银行机构" 

            @input="queryData"
            >
        
        <button @click="reset()">取消</button>
        <!-- 搜索机构列表 -->
        <div class="org">
            <div v-for="(item,index) in orgList" :key="index">
                {{item}}
            </div>
 
        </div>
    </div>

    </div>
</template>

<script>

    export default {
        data(){
            return{
                orgList:[
                    '江苏银行',
                    '江苏农业银行',
                    '上海银行',
                    '苏州银行',
                    '南京银行',
                    '上海银行贷款部'
                ],
                //全部的数据列表
                normal:[
                    '江苏银行',
                    '江苏农业银行',
                    '上海银行',
                    '苏州银行',
                    '南京银行',
                    '上海银行贷款部'
                ],
                selectVal:''//搜索关键字
            }
        },
           methods:{
                queryData(){
                    //搜索
                    let list=this.orgList.filter(item=>item.indexOf(this.selectVal)>=0);
                    this.orgList=list;
					
									//加上这句字会变红
					 // for (let key in list){                             
						// list[key]=`<span style="color:red">${list[key]}</span>`
						// 	}
					 // console.log(this.selectVal)  
					 
                    //当没有搜索内容时候，回去
                    if(this.selectVal===""){
                        this.orgList=JSON.parse(JSON.stringify(this.normal))
                    }
                },
                reset(){
                    this.orgList=JSON.parse(JSON.stringify(this.normal))
                }
           }
    }
</script>

<style scoped>

</style>