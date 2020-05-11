<template>
<div class="about_us">  
<nav-bar title="关于我们"></nav-bar>
<div class="header">
    <div class="content">
        <img src="../../assets/userinfo/tu8.png" alt="">
        <span>{{cpname}}票</span>
        <span class="version"></span>
    </div>
</div>
<div class="introduce">
    <div class="fold_line">
        <span class="first_line"></span>
        <span>{{cpname}}票介绍</span>
        <span class="second_line"></span>
    </div>
    <span class="english">INTRODUCE</span>
    <span class="orange_line"></span>
</div>
<div class="word introduce_word">
    <span>{{cpname}}是一家多年完全致力于中国公益彩票事业，提供全方位彩票及彩票相关服务的提供商，是国内提供综合性彩票服务的龙头企业。</span>
    <img src="../../assets/userinfo/tu2.png" alt="">
    <span>
        {{cpname}}拥有一流的技术研发创新实力以及国内外多年的彩票运营及管理经验，为中国以及全球彩票客户提供一流的彩票创新产品及优质的服务。
        {{cpname}}本着专业、诚信、服务至上的经营理念，充分发挥机动灵活的运营及管理机制，伴随着中国互联网及手机互联网时代的腾飞、
        彩票市场的不断繁荣，和各方客户的忠诚支持，将全面促进新型彩票服务市场的全盛发展，通过不断的努力，{{cpname}}目前成为国内彼有影响力彩票软件之一。</span>
    <img src="../../assets/userinfo/tu3.png" alt="">
    <span>
        {{cpname}}作为一款为广大彩民打造的全方位、综合性的服务平台，
        平台大，考得住，流程正规可靠。除此之外，
        {{cpname}}还是市面上唯一一家可以购彩即可上传出票拍照照片的彩票代购，安全放心看得见！
    </span>
</div>
<div class="introduce">
    <div class="fold_line">
        <span class="first_line"></span>
        <span>我们的团队</span>
        <span class="second_line"></span>
    </div>
    <span class="english">OUR TEAM</span>
    <span class="orange_line"></span>
</div>
<div class="word team_word">
    <img src="../../assets/userinfo/tu4.png" alt="">
    <span>{{cpname}}的工作人员均长期从事于彩票行业，彩票的技术负责人来自500彩票，在行业内有超过10年的经验，技术过硬，经验丰富，具有极强的专业素质，对我国的彩票事业有着深刻的认识，值得信赖！</span>
</div>
<div class="introduce">
    <div class="fold_line">
        <span class="first_line"></span>
        <span>我们的承诺</span>
        <span class="second_line"></span>
    </div>
    <span class="english">OUR COMMITMENT</span>
    <span class="orange_line"></span>
</div>
<div class="commitment_word">
    <div class="lists">
        <div class="list_math">
			<img src="../../assets/userinfo/tu5.png" alt="">
			<h3>安全快捷</h3>
        </div>
        <span>安全、方便、快捷、足不出户，轻松购彩。</span>
    </div>
    <div class="lists">
        <div class="list_math">
			<img src="../../assets/userinfo/tu6.png" alt="">
			<h3>信息丰富</h3>
        </div>
        <span>彩种齐全，提供全国各大主流彩种，数字彩种、竞技彩种各种玩法应有尽有。开奖及时，即时更新开奖结果，第一时间得知中奖消息。更有丰富的收益环节和佣金方式，让你花样玩转赢利！</span>
    </div>
    <div class="lists">
        <div class="list_math">
			<img src="../../assets/userinfo/tu7.png" alt="">
			<h3>随时随地</h3>
        </div>
        <span>无地域限制，在竞彩的销售时间随意投注，具备正规的B2C公司才能提供的网上支付功能，支持工商银行、建设银行等大部分的银行支付，同时全程由先锋金融保驾护航。</span>
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
		 cpname:OverallData().cpname
		}
	},
	
	created(){
	 },
	methods:{
	
	}
}
</script>
<style scoped>
@import "../../css/userinfo_about_us.css";
</style> 