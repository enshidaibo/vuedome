 <template>
<div class="helpcenterDom">  
<nav-bar title="帮助中心"></nav-bar>
<div class="userinfo_help_center" >
	<div class="userinfo_help_center_info show_info show_info_btn6">
		<p class="qa6">其他相关问题</p>
		<div class="tips"  v-for="(item,index) in tipsList"  @click="is_show($event,index)">
			<p :class="['off',{'on':item.status}]">{{item.tit}}</p>
			<p v-if="item.status" v-html="item.cont"></p>
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
			tipsList: [],
		}
	},
	
	created(){
		this.tipsList = [{status:false,tit:OverallData().cpname+'票官方网址是多少？',cont:'我们的官方唯一地址是m.facaime.com'},
			{status:false,tit:'如何退出账号？',cont:'在我的-设置-最下方【退出登录】即可退出当前账号。'},
			{status:false,tit:'什么是定制跟单？',cont:'定制跟单是指用户对发起人的某个彩种方案进行跟单定制，由系统自动执行跟单操作；当该发起人发起相应彩种的合买方案时，系统会按用户设定的金额或比例自动认购该方案，免去用户守候跟单，跟不到好单的烦恼。'},
			{status:false,tit:'如果帮助中心内容没能帮助到您！',cont:'请联系我们的在线客服！'},
		];
	},
	methods:{
		is_show: function(e,index){
			var obj = e.currentTarget;
			if(this.tipsList[index].status){
				this.tipsList[index].status = false;
			}else{
				for(var i=0;i<this.tipsList.length;i++){
					this.tipsList[i].status = false;
				}
				this.tipsList[index].status = true;
			}
		},
	}
}
</script>
<style scoped>
@import "../../css/userinfo_setup.css";
</style> 