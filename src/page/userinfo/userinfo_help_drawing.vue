 <template>
<div class="helpcenterDom">  
<nav-bar title="常见问题"></nav-bar>
<div class="userinfo_help_center" >
    <div class="userinfo_help_center_content">
        	<div class="userinfo_help_center_problem">
        	<p class="help_center_info_title">提款问题</p>
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
        this.tipsList = [{status:false,tit:'提款有什么注意事项吗？',cont:'1、必须要绑定银行卡<br>2、单笔金额最低50元，最高5000元。'},
        	{status:false,tit:'提现金额的限制？',cont:'单笔提款金额最低50元，最高50000元。'},
        	{status:false,tit:'提款条件都有哪些？',cont:'提现金额取决于您的投注金额与平台赠送金额和充值金额，进行提款时，需满足一下条件：<br>1.用户可提现总金额等于用户累计投注金额<br>2.用户现金余额需≥50元<br>为了响应国家反洗钱行为，存款后必须进行投注，才可提现<br>4.【需消费金额】是指您还需要投注多少金额，才可将总资产提出，否则仅能提出【可提现余额】<br>5.【可提现余额】是指您在进行提现时，实际可以进行提现的金额'},
        	{status:false,tit:'为什么提款后，会显示资金被冻结？',cont:'为防止该笔资金未保存而导致提款失败，因此当您提交提款申请后，系统会自动冻结您的提款金额。直到款项通过银行审核汇出后，即会解除冻结状态并扣款。<br> 温馨提示：如用户中心显示提款通过您还没收到短信通知，请您及时查看您的银行信息，提款是否到账。'},
            {status:false,tit:'提款多长时间可以到账？',cont:'您的提款金额，预计在10分钟之内由快捷支付处理完成'},
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