<template>
	<div class="about_us">
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn">
				<span class="aui-iconfont aui-icon-left" @click="bakey()"></span>
			</div>
			<div class="aui-title">福利介绍</div>
		</header>
		<div class="welfare">
			<img src="../../assets/userinfo/we_header.png" alt="" class="mainImg">
			<div class="main">
				<div class="box">
					<div class="mainBox main1">
						<h3>购彩的优惠福利</h3>
						<div class="main1Box1">
							<h4>1、会员充值赠送奖励：</h4>
							<p>用户首次充值即送充值金额的<span>10%</span>现金(最高888元现金)，之后每次充值可获得充值金额的<span >5%</span>现金。</p>
							
						</div>
						<div class="main1Box2">
							<h4>2、会员投注赠送奖励：</h4>
							<p>无论中奖与否，赠送投注金额<span>5%</span>的现金</p>
						</div>
						<div class="main1Box3">
							<h4>3、中奖提现：</h4>
							<p>中奖提现无流水倍数限制！</p>
							<span>中多少，提多少，巨优惠</span>
						</div>
					</div>
				</div>
				<div class="box box2">
					<div class="mainBox main2">
						<h3>推广赚钱的优惠福利</h3>
					<!-- 	<div class="main2Box1">
							<h4>1、好友充值奖励：</h4>
							<p>好友首次累计充值满30元，赠送<span>3元</span>现金</p>
						</div> -->
						<div class="main2Box2">
							<h4>1、好友实名认证：</h4>
							<p>好友实名认证，赠送<span>2.88元</span>红包</p>
						</div>
						<div class="main2Box3">
							<h4>2、好友充值奖励：</h4>
							<p>好友每次充值都会获得充值金额<span>4%</span>的现金奖励</p>
							<p>好友首次充值，您即可获得充值金额的<span>30%</span>现金最高可获得<span>300</span>元现金</p>
							
						</div>
						<div class="main2Box4">
							<h4>3、好友投注奖励：</h4>
							<p>直接好友每次投注都会赠送投注金额<span>2%</span>的现金奖励</p>
							<p>间接好友每次投注都会赠送投注金额<span>1%</span>的现金奖励 </p>
						</div>
						<div class="main2Box5">
							<h4>4、推广福利获得的现金奖励，都不进行锁定，可以随时提款 </h4>
						</div>
					</div>
				</div>

				<div class="box">

					<div class="mainBox main3">
						<h3>平台其他免费福利</h3>
						<div class="main3Box1">
							<h4>1、签到：</h4>
							<p>每天签到送红包， 连续签到7天共奖励<span>3.84元</span>红包</p>
						</div>
						<div class="main3Box2">
							<h4>2、抽奖：</h4>
							<p>每天<span>5次</span>免费抽奖机会，参与晒单，可获得更多的抽奖机会</p>
						</div>
						<div class="main3Box3">
							<h4>3、实名认证：</h4>
							<p>自己账号实名认证赠送<span>6.66元</span>红包</p>
						</div>
						<div class="main3Box4">
							<h4>4、晒单：</h4>
							<p>投注后使用晒单功能，可获得投注金额<span>5%</span>的红包奖励</p>
							<p>另外晒单中的二维码有推广功能，推广成功还会获得推广奖励</p>
						</div>
						<div class="main3Box5">
							<h4>5、免费红包可投注低频彩</h4>
						</div>
					</div>
				</div>

				<div class="footer">
					<p>本次活动最终解释权归平台所有</p>
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
		data() {
			return {
				flag: false
			}
		},

		created() {
			window.addEventListener('scroll', this.handleScroll, true);
		},
		mounted() {

		},
		methods: {
			gogoucai: function() {
				this.$router.push({
					name: 'goucai'
				})
			},
			gotask: function() {
				this.$router.push({
					name: 'task'
				})
			},
			top_tj: function() {
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

	.welfare {
		background: #EE3908;
		padding-top: 3.775rem;
	}

	.mainImg {
		width: 76.8%;
		margin: 0 auto;
		margin-bottom: 1.175rem;
	}

	.main {
		margin: 0 4%;
	}

	.main h3 {
		font-size: 1.1rem;
		color: #EE3908;
		line-height: 1.55rem;
		text-align: center;
		margin-bottom: 1.1rem;
	}

	.main h4 {
		font-size: 0.9rem;
		color: #FEA602;
		line-height: 1.25rem;
		margin-bottom: 0.3rem;
	}

	.main p {
		font-size: 0.7rem;
		color: #666666;
		line-height: 1rem;
	}

	.main span {
		font-size: 0.7rem;
		color: #ED3807;
		line-height: 1rem;
	}

	.box {
		border: 0.375rem solid #FBA231;
		border-radius: 0.525rem;
		background: #fff;
	}

	.box2 {
		margin: 1.35rem 0 1.45rem 0;
	}

	.mainBox {
		border-radius: 0.3rem;
		background: #fff;
		padding: 1rem 1rem 0 0.95rem;
	}

	.mainBox div {
		margin-bottom: 1.075rem;
	}



	.footer {
		margin-top: 0.625rem;
		padding-bottom: 0.475rem;
		text-align: center;
	}

	.footer p {
		line-height: 0.825rem;
		font-size: 0.6rem;
		/* margin-bottom: 0.475rem; */
		color: #ec7d5f;
	}
</style>
