 <template>
<div class="helpcenterDom">  
<nav-bar title="常见问题"></nav-bar>
<div class="userinfo_help_center" >
    <div class="userinfo_help_center_content">
        	<div class="userinfo_help_center_problem">
        	<p class="help_center_info_title">购彩问题</p>
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
        this.tipsList = [{status:false,tit:OverallData().cpname+'票购彩后多久会出票？',cont:'您在本平台提交订单后，投注站会在第一时间对您的订单进行处理，但有时因方案数量较多，可能会有一定的延迟，建议您在购买后半小时左右再留意一下出票状态，给您的购票体验带来不便请您谅解。<br>温馨提示：20：30后非出票时间，若您在20：30后购买了彩票，请于第二天及时查看出票状态。'},
        	{status:false,tit:'在'+OverallData().cpname+'网购买彩票是否有时间限制？',cont:'请您在各彩种截止时间段内购买，其余时间无法购买。'},
        	{status:false,tit:'如何查看购彩记录？',cont:'请您在成功登录后前往“投注记录”查看购彩详情。'},
        	{status:false,tit:'竞彩足球/篮球 开停售时间？',cont:'【竟足】周一至周五(开售9:00-停售24:00)周六、周日(9:00次日01:00)<br>【竟篮】周一/周二/周五(9:00-24:00),周三/周四(7:30-24:00),周六/周日(9:00-次日01:00)。'},
            {status:false,tit:'福彩3D和排列三直选、组选三和组选六玩法？',cont:'1、直选:竞猜三位开奖号码，即百位、十位和个位，【且顺序一致】<br>2、组选三:竟猜三位开奖号码，顺序不限【开奖号码的3位数字中，有两位相同，即为组三形式】<br>3、组选六:竟猜三位开奖号码，顺序不限【开奖号码的3位数字都不相同，即为组六型式】。'},
            {status:false,tit:'什么是合买？如何发起合买？',cont:'合买是网站投注的另一种模式，顾名思义就是指合资买彩票，发起人负责发起一个方案然后与其他用户一起合资买这个方案。与发起代购相似，在完成方案后购彩类型选择【合买】，设置好合买的相关内容即可。<br>最低认购：发起人设置每一份方案的最低金额，系统默认为1元。<br>我要认购：发起人所认购的金额至少是方案5%的金额，且认购金额不能小于最低认购金额。<br>我要保底：发起人所设置的保底金额，可以不设置。<br>提成比例：发起人发起的合买方案，盈利后所提成的佣金比例，可设置0%-5%不等。<br>保密设置：发起人可对发起的方案内容进行保密，完全公开、开奖后公开、完全保密三种方式供用户选择。'},
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