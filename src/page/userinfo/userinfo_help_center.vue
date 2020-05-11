 <template>
<div class="helpcenterDom">  
<nav-bar title="帮助中心"></nav-bar>
<!-- <div class="userinfo_help_center" >
    <div class="userinfo_help_center_content">
		<img src="../../assets/userinfo/help_banner.png" alt="">
		<div>
			<p>问题类型</p>
			<p>
				<span class="userinfo_help_center_btn1" @click="register()">注册</span>
				<span class="userinfo_help_center_btn2" @click="recharge()">充值</span>
				<span class="userinfo_help_center_btn3" @click="purchase()">购彩</span>
				<span class="userinfo_help_center_btn4" @click="prize()">中奖</span>
				<span class="userinfo_help_center_btn5" @click="drawing()">提款</span>
				<span class="userinfo_help_center_btn6" @click="other()">其他</span>
			</p>
		</div>
		<div class="userinfo_help_center_problem">
			<p class="help_center_info_title">常见问题</p>
			<div class="help_center_info_cont">
				<div class="tips"  v-for="(item,index) in tipsList"  @click="is_show($event,index)">
					<p :class="['off',{'on':item.status}]">{{item.tit}}</p>
					<p v-if="item.status" v-html="item.cont"></p>
				</div>
			</div>
		</div>
    </div>
</div> -->
  <div class="userinfo_help_center" >
      <div class="userinfo_help_center_content">
          	<div class="userinfo_help_center_problem">
          	<p class="help_center_info_title">热点问题</p>
          	<div class="help_center_info_cont">
          		<div class="tips"  v-for="(item,index) in tipsList"  @click="is_show(item.tit,item.cont)">
          			<p class="tits">{{item.tit}}</p><span class="sp1"></span>
          			<p v-if="item.status" v-html="item.cont"></p>
          		</div>
              <div class="hongbao" @click='hongbao'>
                <p class="tits">红包相关规则</p>
                <span class="sp1"></span>
              </div>
          	</div>
          </div>

  		<div class="userinfo_help_center_center">
  			<p class="help_center_info_title">问题分类</p>
              <ul class="help_center_info_nav">
              	<li @click="register">
                      <img src="../../assets/userinfo/qa1.png" alt="">
                      <p>注册问题</p>
                  </li>
                  <li @click="recharge">
                          <img src="../../assets/userinfo/qa2.png" alt="">
                      <p>充值问题</p>
                  </li>
                  <li @click="purchase">
                          <img src="../../assets/userinfo/qa3.png" alt="">
                      <p>购彩问题</p>
                  </li>
                  <li @click="prize">
                          <img src="../../assets/userinfo/qa4.png" alt="">
                      <p>中奖问题</p>
                  </li>
                  <li @click="drawing">
                          <img src="../../assets/userinfo/qa5.png" alt="">
                      <p>提款问题</p>
                  </li>
              </ul>

  		</div>
  	    <div class="userinfo_help_center_bottom">
              <div>
                  <a href="tel:4000131068"><button class="btn1"><img src="../../assets/userinfo/icon_setup07.png" alt="">联系客服</button></a>
              </div>
              <div>
                  <button class="btn2"  @click="onlineService()"><img src="../../assets/userinfo/icon_setup02.png" alt="">在线客服</button>
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
			tipsList: [{status:false,tit:'如何注册成为美奇彩彩票会员？',cont:'当您使用手机号获取验证码成功登录后，您将默认成为本平台会员。'},
			{status:false,tit:'美奇彩票购彩后多久会出票？',cont:'您在本平台提交订单后，投注站会在第一时间对您的订单进行处理，但有时因方案数量较多，可能会有一定的延迟，建议您在购买后半小时左右再留意一下出票状态，给您的购票体验带来不便请您谅解。<br>温馨提示：20：30后非出票时间，若您在20：30后购买了彩票，请于第二天及时查看出票状态。'},
			{status:false,tit:'目前支持什么方式充值？',cont:'本平台支持微信和银行卡等充值方式。'},
			{status:false,tit:'中奖后怎么兑奖？',cont:'无论您的中奖金额是多少，本平台都将在开奖后及时将您的税后奖金派发至您的账户余额内，您可在账户余额或账户明细内查看奖金详情。'},
		]
		}
	},
	
	created(){
		
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
		register: function(){
			this.$router.push({
				name:'userinfo_help_register'
			}) 
		},
        hongbao:function(){
            this.$router.push({
                name:'userinfo_hongbao_rule'
            })
        },
		recharge: function(){
			this.$router.push({
				name:'userinfo_help_recharge'
			}) 
		},
		purchase: function(){
			this.$router.push({
				name:'userinfo_help_purchase'
			}) 
		},
		prize: function(){
			this.$router.push({
				name:'userinfo_help_prize'
			}) 
		},
		drawing: function(){
			this.$router.push({
				name:'userinfo_help_drawing'
			}) 
		},
		other: function(){
			this.$router.push({
				name:'userinfo_help_other'
			}) 
		},
        onlineService:function(){
            this.$router.push({
                name:'online_service'
            })
        }
	}
}
</script>
<style scoped>
@import "../../css/userinfo_setup.css";
</style> 
