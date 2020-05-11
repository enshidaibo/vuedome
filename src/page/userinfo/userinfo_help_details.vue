 <template>
<div class="helpcenterDom"> 
 <div class="box">
<nav-bar title="问题详情"></nav-bar>
<div class="box">
  <div class="userinfo_help_center" >
      <div class="userinfo_help_center_content">
          	<div class="userinfo_help_center_problem">
          	<p class="help_center_info_title">{{tipsList.title}}</p>
          	<div class="help_center_info_cont">
          		<div class="tips" >
          			<p class="tils" v-html="tipsList.content"></p>
          		</div>
          	</div>
          </div>
      </div>
  </div>
 </div>
</div>
</div>
</template>
<script>
	import {
		OverallData
	} from "../../js/common.js";
export default {
    data(){
        return {
            tipsList: {},
        }
    },
    
    created(){
        console.log(this.$route)
        this.tipsList ={
            title:this.$route.query.title,
            content:this.$route.query.content
        };
        console.log(this.tipsList)
    },
    methods:{
//         is_show: function(e,index){
//         	var obj = e.currentTarget;
//         	if(this.tipsList[index].status){
//         		this.tipsList[index].status = false;
//         	}else{
//         		for(var i=0;i<this.tipsList.length;i++){
//         			this.tipsList[i].status = false;
//         		}
//         		this.tipsList[index].status = true;
//         	}
//         },
    }
}
</script>
<style scoped>
@import "../../css/userinfo_setup.css";
</style> 