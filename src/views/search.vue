<template>
  <div id="searchapp">

    <el-input v-model="input" placeholder="请输入查询内容" size="medium" style="width:40%">
       <el-button slot="append" icon="el-icon-search" @click="dosearch"></el-button>
    </el-input>

      <br><br><br><br><br>
    <div style="width: 50%;text-align: left">
      <JsonView :json="jsonData" ></JsonView>
    </div>

  </div>
</template>
<script>
import JsonView from "./JsonView";
export default {
name: "search",
  components: {
    JsonView,
   },
    data() {
        return {
             input: '',
              jsonData: {

              },

        }
    },
     methods:{
            dosearch: function () {
                if (this.input !=='') {
					window.setInterval(setTimeout(this.$api.get('http://127.0.0.1:8000/matched/information/index', {
                      "key": this.input
                    }, mydata => {
                      console.log(mydata)
                      this.jsonData = mydata
                      console.log(this.jsonData)
                    }), 0), 15000);
                    
                    } else {
                      alert("搜索不能为空！")
                }
            },
    },
}
</script>

<style scoped>
#searchapp {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>