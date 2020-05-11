 <template>
<div class="helpcenterDom">  
<nav-bar title="常见问题"></nav-bar>
<div class="userinfo_help_center" >
    <div class="userinfo_help_center_content">
        	<div class="userinfo_help_center_problem">
        	<p class="help_center_info_title">中奖问题</p>
        	<div class="help_center_info_cont">
        		<div class="tips"  v-for="(item,index) in tipsList"  @click="is_show(item.tit,item.cont)">
        			<p class="tils">{{item.tit}}</p><span class="sp2"></span>
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
			tipsList: [],
		}
	},
	
	created(){
		this.tipsList = [{status:false,tit:'中奖后怎么兑奖？',cont:'无论您的中奖金额是多少，本平台都将在开奖后及时将您的税后奖金派发至您的账户余额内，您可在账户余额或账户明细内查看奖金详情。'},
			{status:false,tit:OverallData().cpname+'如何保护中奖者的个人信息？',cont:'您的个人信息是保密的，本站不会公布个人注册信息，请您放心购买。<br>1.对于中奖金额特别巨大的大奖用户，本站可以根据客户的实际要求，提供更加严格的保密措施。<br>2.本站在资讯页面发布中奖资讯时，如果中奖用户对投注方案和过滤详情进行了保密处理，本站相关工作人员必须与该中奖用户取得联系，在征得中奖用户本人或中奖用户直接授权好客确认同意后，方可对保密的具体投注方案与过滤详情进行资讯报道。'},
			{status:false,tit:'中奖后是否需要缴税？',cont:'根据彩票管理机构的相关规定，中奖彩票单注奖金超过1万彩币时，中奖人需要缴纳奖金的20%作为个人偶然所得税;税金由本站代扣代缴。 选择倍投投注时，只要开奖后单注奖金不超过1万彩币，就算翻倍后奖金超过1万彩币，也无须缴纳个人偶然所得税。'},
			{status:false,tit:'网站各彩种的开派奖时间分别是？',cont:'网站各彩种中奖方案的中奖奖金将在官方公布开奖信息后，把奖金发送到各中奖用户帐号中。<br>足彩开奖当天，下午可以派奖到帐户；数字彩开奖当天，23：00左右可以派奖到帐户；11选5在开奖后4-5分钟派奖到账户；北京单场晚上和凌晨的比赛，会在中午派奖。'},
			{status:false,tit:'如何查询购买的彩票是否中奖？',cont:'请您在成功登录后前往“账户明细”/“投注记录”查看中奖详情。'},
		];
	},
	methods:{
		 is_show: function(e,s){
		    console.log(e)
		    console.log(s)
		    this.$router.push({
		    	name:'userinfo_help_details',
		        query:{
		            title:e,
		            content:s
		        }
		    }) 
			
		},
	}
}
</script>
<style scoped>
@import "../../css/userinfo_setup.css";
</style> 