<template>
  <div>
    <div id="code">
        <div>验证码 &nbsp;: &nbsp;&nbsp;&nbsp;</div>
      <div class="code" @click="refreshCode">
    <s-identify :identifyCode="identifyCode"></s-identify>
  </div>
    </div>
    
  </div>
</template>

<script>
import SIdentify    from './o.vue'
  export default {
         data() {
    return {
      identifyCodes: "1234567890",
      identifyCode: ""
    };
    
  },
  components:{
SIdentify
  },

  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },

    methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
      makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    }
    },



  }
</script>

<style  scoped>
#code{
  display: flex;
}
.code {
  width: 114px;
  height: 40px;
}
</style>