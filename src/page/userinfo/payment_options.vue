<template>
	<div class="wx-recharge">
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="bake()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">充值方式</div>

		</header>
		<div class="banner">

			<img src="../../assets/recharge/pay_banner.png" alt="">

		</div>
		<div class="content_pay">
			<p>选择支付方式</p>
			<div>
				<div v-for="(d,i) in datas" class="ab_content" @click="pay_min(i)">
					<div class="ab_left">
						<!-- <img src="../../assets/recharge/zhifupingtai-yinlian-copy.png" alt=""> -->
						<img :src="d.rechargeicon" alt="暂无">
					</div>
					<div class='ab_right'>
						<span>{{d.rechargename}}</span>
						<span>{{d.rechargedes}}</span>
					</div>
					<span class="icon_right"></span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		Toast,
		Indicator,
		MessageBox
	} from 'mint-ui';
	import {
		getSession,
		getCookie,
		setSession
	} from "../../js/common";
	export default {
		data() {
			return {
				recharge: true,
				datas: [],
			}
		},
		beforeDestroy() {
			document.querySelector('html').removeAttribute('style');
			document.querySelector('body').removeAttribute('style');
		},
		created() {
			document.querySelector('html').setAttribute('style', 'background-color:#F2F2F2;');
			document.querySelector('body').setAttribute('style', 'background-color:#F2F2F2;');
			this.rechargelist();
		},
		methods: {

			//跳转充值激励
			pay_min: function(i) {
				if (this.datas[i].isopen == 0) {
					Toast("此支付方式未开启");
					return false;
				}
				if (this.datas[i].rechargeurl == 0) {
					setSession("pay_list", this.datas[i]);
					this.$router.push({
						name: 'userinfo_recharge'
					})
				} else {
					setSession("pay_list", this.datas[i]);
					this.$router.push({
						name: 'userinfo_recharge_weixin'
					})
				}
				// if (this.datas[i].rechargeurl!=0) {
				// 	setSession("pay_list", this.datas[i]);
				// 	this.$router.push({
				// 		name: 'userinfo_recharge_weixin'
				// 	})
				// } else if(this.datas[i].rechargeurl==0){
				// 	setSession("pay_list", this.datas[i]);
				// 	this.$router.push({
				// 		name: 'userinfo_recharge'
				// 	})
				// }
			},
			bake: function() {
				this.$router.go(-1);
			},
			rechargelist: function() {
				this.$ajax.post('/caipiaoshouye/index.php/home/index/rechargelist')
					.then(res => {
						var content = res.data;
						console.log(JSON.stringify(content));
						if (content.status == 200) {
							this.datas = content.data;
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
		},

	}
</script>
<style scoped>
	header {
		position: fixed !important;
		background-color: #FFFFFF;
	}

	.banner {
		margin-top: 2.25rem;
		width: 100%;

	}

	.aui-bar-nav .aui-btn .aui-iconfont {
		color: #333333;
	}

	.aui-bar-nav .aui-title {
		color: #333333;
		font-weight: 500;
	}

	.content_pay {
		width: 100%;

	}

	.content_pay p:first-child {
		font-size: 0.6rem;
		font-weight: 400;
		color: #666666;
		line-height: 2rem;
		padding-left: 0.3rem;
	}

	.ab-img {
		position: relative;
	}

	.ab-img img {
		border-radius: .5rem;
	}

	.ab_content {
		position: relative;
		width: 100%;
		top: 38%;
		left: 0px;
		height: 3.2rem;
		margin-bottom: 0.25rem;
		background-color: #FFFFFF;
	}

	.ab_left {
		display: block;
		position: absolute;
		left: 3%;
		width: 2.6rem;
		height: 2.6rem;
		top: 0.2rem;
		/* right: 0; */
		bottom: 0;
		margin: auto;
	}

	.ab_left img {
		display: block;
		height: 100%;
		margin: 0px auto;
	}

	.ab_right {
		height: auto;
		width: 70%;
		position: absolute;
		left: 57%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
	}

	.ab_right span:nth-of-type(1) {
		font-size: .9rem;
		line-height: 1.5rem;
		font-weight: 400;
		color: #333333;
	}

	.ab_right span {
		display: block;
		font-size: 0.5rem;
		font-weight: 400;
		color: #868686;

	}

	.icon_right {
		width: 10px;
		height: 10px;
		border-left: transparent;
		border-top: transparent;
		border-right: 1px solid #A7A7A7;
		position: absolute;
		border-bottom: 1px solid #A7A7A7;
		right: 1rem;
		bottom: 0px;
		bottom: 0px;
		transform: rotate(-45deg);
		margin: auto;
		top: .5rem;
	}

	.ab_2 {
		top: 68%;
	}

	.ab_3 {
		width: 2.8rem;
		height: 2.8rem;
		left: 5%;
	}
</style>
