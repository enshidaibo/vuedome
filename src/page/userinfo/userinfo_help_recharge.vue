 <template>
<div class="helpcenterDom">  
<nav-bar title="常见问题"></nav-bar>
<div class="userinfo_help_center" >
    <div class="userinfo_help_center_content">
        	<div class="userinfo_help_center_problem">
        	<p class="help_center_info_title">充值问题</p>
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
export default {
    data(){
        return {
			tipsList: [],
        }
    },
    
    created(){
		this.tipsList = [{status:false,tit:'在线充值支付安全吗？',cont:'网上支付是通过国内各大银行支付网关进行操作的，采用的是国际流行的SSL/SET方式加密。安全性是由银行方面负责的，完全可以保证您的账户安全。网银在线不会收集用户的银行卡资料，当您需要填写银行卡资料时，实际上已经达到银行的支付网关，所以，您不必担心银行卡资料会经由网银在线泄密。在线支付使用的支付平台，是由银行和相关金融部门提供的，经过SSL128位加密，非常安全。您的资料均经过安全保密处理并直接提交给认证系统，有关银行认证后会以安全的方式通知我们相应订单金额结果。当您在使用银行卡或微信等方式支付时，有关个人资料在结算时将向有关金融认证系统直接传送，包括本平台在内的任何其它人无法得知，所以您一定要正确核对您的支付信息。'},
			
			{status:false,tit:'目前支持什么方式充值？',cont:'本平台支持微信和银行卡等充值方式。'},
			{status:false,tit:'我充值成功了，为什么账户余额没有改变？',cont:'在线充值成功未及时到账可能是支付接口延迟、网速过慢、银行系统防火墙屏蔽弹窗等原因。如出现这种情况请您不用担心，充值款项会在2小时内到账，请您耐心等待。'},
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