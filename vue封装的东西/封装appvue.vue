<template>
  <div class="app-container">
	 <!-- 刷新页面 -->
    <router-view  v-if="isRouterAlive" />
    <tabbar v-if="$route.meta.footShow" />
  </div>
</template>
<script>
	export default {
		provide(){
			return{
			reload:this.reload
			}
		},
	  data() {
	    return {
		  isRouterAlive:true,
	    };
	  },
	  created() {
		  //websocket
	    this.localSocket();
		
		  //在页面刷新时将vuex里的信息保存到localStorage里
		    window.addEventListener("beforeunload", () => {
		      localStorage.setItem("messageStore", JSON.stringify(this.$store.state));
		    });
		    //在页面加载时读取localStorage里的状态信息
		    localStorage.getItem("messageStore") &&
		      this.$store.replaceState(
		        Object.assign(
		          this.$store.state,
		          JSON.parse(localStorage.getItem("messageStore"))
		        )
		      );
	  },
	  methods: {
		  //刷新页面
		   reload(){
			this.isRouterAlive = false;
			this.$nextTick(function(){
				this.isRouterAlive = true;
			})
			},
			//websocket
	    websocketonopen(e) {
	      const a = parseInt(localStorage.getItem("uid"));
		  console.log(a)
	      console.log("WebSocket连接成功");
	      console.log(this.ws);
		},
		//websocket
	    localSocket() {
	      let that = this;
	      if ("WebSocket" in window) {
	        console.log("您的浏览器支持 WebSocket!");
	        that.ws = new WebSocket(`ws://116.62.155.15:7272`);
	        that.global.setWs(that.ws);
	        that.global.ws.onopen = that.websocketonopen();
	      } else {
	        // 浏览器不支持 WebSocket
	        console.log("您的浏览器不支持 WebSocket!");
	      }
	    },
		//websocket
		initWebSocket(){ //初始化weosocket
　　　　　　　　const wsuri = "ws://39.96.83.39:7272";//ws地址
　　　　　　　　this.websocket = new WebSocket(wsuri);
			console.log(this.websocket)
	    　　　　   },
	  },
	  
	  components: {
	    name: "App",
	  }
	
	};
	
	
	
</script>
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1024px;
  min-width: 320px; 
}
.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .2s;
	}
.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}

</style>
