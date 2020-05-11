<template>
	<div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn">
				<span class="aui-iconfont aui-icon-left" @click="bakey()"></span>
			</div>
			<div class="aui-title">盈利说明</div>
		</header>
		<div class="main">
			<div class="mainBanner">
				<img src="../../assets/info01.png" alt="">
			</div>
			<div class="main1">
				<div class="main1Box1">
					<h3>当您看到这个页面，说明您的账号既是玩家账号也可能是推广账号哦！您可以自己投注，也可以发展下级。</h3>
				</div>
				<div class="main1Box2">
					<img src="../../assets/info02.png" alt="">
					<h4>如何赚取佣金</h4>
					<p>好友首次充值，您即可获得充值金额的<span>30%</span>，最高可获得<span>300元</span>现金。以后每次充值可获得充值金额<span>4%</span>现金</p>
					<!-- <p>直接好友投注后，您可获得投注金额<span>2%现金</span>；间接好友投注后可返投注金额的<span>1%现金</span></p> -->
					<!-- <p> 若直接好友进行充值，即返充值金额的<span>4%现金</span></p> -->
					<p class="p1">所以，在美奇彩，邀请的越多，收益越多！即刻邀请您的好友一起玩转美奇彩吧</p>
				</div>
				<div class="main1Box3">
					<img src="../../assets/info03.png" alt="">
					<h4>如何获取直接用户、间接用户</h4>
					<p>通过分享您的专属二维码邀请的好友，注册后会自动与之关联，既是您的直接好友。</p>
					<p class="p2">您的直接好友通过分享专属二维码后，加入的新用户，即是您的间接好友。</p>
				</div>
				<div class="main1Box4">
					<img src="../../assets/info04.png" alt="">
					<h4>温馨提示</h4>
					<p>可在推广收益/我的好友查看您的直接或间接好友详情。</p>
				</div>
			</div>
			<div class="main2" @click="goYao()">
				<img src="../../assets/info05.png" alt="">
			</div>
		</div>
	</div>
</template>

<script>
	import {
		OverallData
	} from "../../js/common.js";
	export default {
		data() {
			return {
             cpname:OverallData().cpname
			};
		},
		methods:{
			//邀请好友
			goYao: function() {
				this.$router.push({
					name: 'special_friends'
				})
			},
			bakey: function() {
				this.$router.go(-1)
			},
		}
	}
</script>

<style scoped>
	.aui-bar-nav {
		top: 0;
		line-height: 2.25rem;
		background-color: #fff;
		color: #000;
		position: fixed;
	}

	.aui-bar-nav .aui-btn .aui-iconfont {
		font-size: 0.9rem;
		line-height: 1.25rem;
		padding: 0;
		margin: 0;
		color: #000;
	}

	.main {
		margin-top: 2.25rem;
		background: #0094FF;
		min-height: 100vh;
	}

	.main1 {
		background: #fff;
		border-radius: 0.4rem;
		position: relative;
		z-index: 2;
		margin: 0 4%;
		margin-top: -1.3rem;
	}

	.main1 div {
		margin: 0 0.475rem;
		padding: 0 0.275rem;
		padding-top: 0.75rem;
		padding-bottom: 0.775rem;
	}

	.main1 img {
		width: 1.25rem;
		height: 1.25rem;
		display: inline-block;
		margin-bottom: 0.45rem;
		vertical-align: top;
	}

	.main1 h3 {
		font-size: 0.65rem;
		color: #03A9F4;
		line-height: 1rem;
		font-weight: bold;
	}

	.main1 h4{
		font-size: 0.75rem;
		color: #333333;
		line-height: 1.05rem;
		display: inline-block;
		font-weight: bold;
	}

	.main1 p {
		font-size: 0.65rem;
		color: #777777;
		line-height: 0.925rem;
	}

	.main1 span {
		font-size: 0.65rem;
		color: #FF0B00;
		line-height: 0.925rem;
		font-weight: bold;
	}

	.main1 .p1 {
		font-size: 0.65rem;
		color: #FF6300;
		line-height: 0.925rem;
		margin-top: 0.25rem;
	}

	.main1 .p2 {
		margin-top: 0.425rem;
	}

	.main1 .main1Box1 {
		background: #FFFAEC;
		padding: 1.025rem 0.75rem 0.675rem 0.75rem;
		border-radius: 0.4rem ;
		margin: 0;
	}

/* 	.main1 .main1Box2 {

	} */

	.main1 .main1Box3 {
		border-top: 1px solid #F3F3F3;
		border-bottom: 1px solid #F3F3F3;
	}

	.main2 {
		margin: 0 4%;
		margin-top: 0.775rem;
		padding-bottom: 0.825rem;
	}

	.main2 img {
		width: 100%;
	}
</style>
