<template>
  <div>
          <!--     搜索框        -->
          <el-input v-model="input" placeholder="请输入查询内容" size="medium" style="width:40%">
             <el-button slot="append" icon="el-icon-search" @click="dosearch"></el-button>
          </el-input>
            <br><br><br><br><br>

          <!--     结果展示       -->
          <el-collapse accordion>
              <div v-for="(item, index) in tableData " :key="index" >
                <el-collapse-item class="grid-content">
                        <div id="title" slot="title" class="collapse-title" style="text-align: left;">
                              音频编号:<span style="color: dodgerblue;margin-right: 4px">{{item.audio_id}}</span>
                              音频名称：<span style="color: dodgerblue;margin-right: 4px"  >{{item.audio_name}}</span>
                              原视频链接:<span style="color: dodgerblue;margin-right: 4px">
                              <a href="http://10.161.203.250:9000/videos/fb365ae18fac3a623bf8f9e13705e724.mp4">点击下载</a> </span>
                              总耗时:<span style="color: dodgerblue;margin-right: 4px"  >{{item.total_time}}</span>
                              检索耗时:<span style="color: dodgerblue;margin-right: 4px"  >{{item.query_time}}</span>
                              匹配耗时:<span style="color: dodgerblue;margin-right: 4px"  >{{item.align_time}}</span>
                              生成指纹耗时:<span style="color: dodgerblue;margin-right: 4px"  >{{item.fingerprint_time}}</span>
                              创建时间:<span style="color: dodgerblue;margin-right: 4px"  >{{item.date_created}}</span>
                              视频封面：<img src="http://10.161.203.250:9000/images/fb365ae18fac3a623bf8f9e13705e724.jpg"
                                        style="height: 30px;position: absolute;">
                        </div>
                        <div v-for="(iitem, iidex) in item.related_audios" :key="iidex" name="iidex"  >
                          <ul style="text-align: left;padding:0 300px">
                            <li>匹配编号:    <span style="color: #42b983">{{iitem.matched_id}}</span> <br></li>
                            <li>关联歌曲编号:<span style="color: #42b983">{{iitem.related_audio_id}}</span> <br></li>
                            <li>关联歌曲名称:<span style="color: #42b983">{{iitem.related_audio_name}}</span> <br></li>
                            <li>输入置信度:  <span style="color: #42b983">{{iitem.input_confidence}}</span> <br></li>
                            <li>指纹置信度:  <span style="color: #42b983">{{iitem.fingerprinted_confidence}}</span> <br></li>
                            <li>偏移量:      <span style="color: #42b983">{{iitem.offset}}</span> <br></li>
                            <li>偏移秒:      <span style="color: #42b983">{{iitem.offset_seconds}}</span> <br></li>
                            <li>关联歌曲哈希值:<span style="color: #42b983">{{iitem.input_total_hashes}}</span> <br></li>
                            <li>关联歌曲哈希值:<span style="color: #42b983">{{iitem.hashes_matched_in_input}}</span> <br></li>
                            <li>对应数据库指纹哈希值:<span style="color: #42b983">{{iitem.fingerprinted_hashes_in_db}}</span> <br></li>
                            <li>sha1加密值:<span style="color: #42b983">{{iitem.file_sha1}}</span> <br></li>
                          </ul>
                        </div>
                  </el-collapse-item>
              </div>
          </el-collapse>




  </div>
</template>

<script>
import Api from '../api/index.js';
import Vue from 'vue'
Vue.prototype.$api = Api;
export default {
name: "result",
    data() {
      return {
        input: '',
        tableData:[],
      }
    },
    methods:{
    dosearch: function () {
      this.show()
      if (this.input !==''){
        setInterval(this.show,15000);
      }
      else{
        alert("搜索栏不能为空！")
      }
    },
    show:function () {
          this.tableData=[]
          this.$api.get('http://localhost:8000/matched/information/index', {"key": this.input},
              mydata => {
               console.log(mydata)
               // this.tableData = mydata.data
                for (let i = 0; i < mydata.data.data.length; i++){
                  this.tableData.push({
                    "id":i,
                    "audio_id":mydata.data.data[i].audio_id,
                    "audio_name":mydata.data.data[i].audio_name,
                    "query_time":mydata.data.data[i].query_time,
                    "total_time":mydata.data.data[i].total_time,
                    "align_time":mydata.data.data[i].align_time,
                    "date_created":mydata.data.data[i].date_created,
                    "fingerprint_time":mydata.data.data[i].fingerprint_time,
                    "related_audios":mydata.data.data[i].related_audios,
                    })
                  }
                console.log(this.tableData)
             }
          )
    },

  }
}
</script>

<style scoped>
.collapse-title {
         flex: 0 1 100%;
         order: 1;
     }

.grid-content {
	width: 90%;    /*根据自己项目进行定义宽度*/
	overflow-x: hidden;     /*设置超出的部分进行影藏*/
	text-overflow: revert;     /*设置超出部分使用省略号*/
	white-space:nowrap;    /*设置为单行*/
}
#title img{
  cursor: pointer;
  transition: all 0.3s;
}
#title img:hover{
  transform: scale(10.0);
  z-index: 2;
}
</style>