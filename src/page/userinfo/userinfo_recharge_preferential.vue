<template>
	<div class="prefe">
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="closeWin()" tapmode>
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">充值优惠</div>
		</header>
		<div class="main">
			<div class="mainHeader">
				<img src="../../assets/userinfo/preferential_header.png" alt="" v-if="rechargeCount==1">
				<img src="../../assets/userinfo/preferential_header1.png" alt="" v-if="rechargeCount==0">
			</div>
			<div class="mainBox1">
				<div class="Box1top">
					<p>您已得到<span>{{(money*1).toFixed(2)}}</span>元充值返现</p>
				</div>
				<ul class="Box1conent">
					<li>
						<img src="../../assets/userinfo/preferential_icon01.png" alt="" v-if="rechargeCount>0">
						<img src="../../assets/userinfo/preferential_icon1.png" alt="" v-if="rechargeCount==0">
						<div @click="userinfo_recharge"></div>
					</li>
					<li>
						<img src="../../assets/userinfo/preferential_icon02.png" alt="" v-if="rechargeCount>0">
						<img src="../../assets/userinfo/preferential_icon2.png" alt="" v-if="rechargeCount==0">
						<div @click="userinfo_recharge"></div>
					</li>
					<li>
						<img src="../../assets/userinfo/preferential_icon03.png" alt="" v-if="rechargeCount>0">
						<img src="../../assets/userinfo/preferential_icon3.png" alt="" v-if="rechargeCount==0">
						<div @click="userinfo_recharge"></div>
					</li>
					<li>
						<img src="../../assets/userinfo/preferential_icon04.png" alt="" v-if="rechargeCount>0">
						<img src="../../assets/userinfo/preferential_icon4.png" alt="" v-if="rechargeCount==0">
						<div @click="userinfo_recharge"></div>
					</li>
				</ul>
			</div>
			<div class="Btn" @click="userinfo_recharge">
				<p>查看更多充值</p>
				<!-- <img src="../../assets/userinfo/preferential_btn.png" alt=""> -->
			</div>
			<div class="bottomText" v-if="rechargeCount>0">
				<p>充值即送充值金额5%的现金</p>
				<p>不限充值上限，多充多送，不限充值方式</p>
				<p>注：充值的金额直接进入锁定金额，不可直接提现</p>
				<p>通过购彩可解锁锁定金额，充值赠送的金额进入锁定</p>
			</div>
			<div class="bottomText" v-if="rechargeCount==0">
				<p>首次充值即送充值金额10%，最高888元现金</p>
				<p>注：充值的金额直接进入锁定金额，不可直接提现</p>
				<p>通过购彩可解锁锁定金额，充值赠送的金额进入锁定</p>
			</div>
			<div class="foots"></div>
					<!-- 未实名认证弹框 -->
			<div id="sdApp" v-show="logok">
				<div class="boxsa"></div>
				<div id="logok" v-show="logok">
					<div class="renzcont">
						<div>
							<img src="../../assets/Group14@2x.png" alt="">
							<p class="text">实名认证</p>
							<div class="title2">为了您的账户安全，请帐户实名认证</div>
							<div class="content">实名认证后，可有效保护账号的资金安全</div>
							<p class="renz_text">认证即可获得<span>6.66</span>元红包</p>
							<div class="logokbtn">
								<p id="logokbtn1" @click="logokbtn1()">立即认证</p>
								<!-- <p id="logokbtn2" @click="logokbtn2()">暂不认证</p> -->
							</div>
						<div class="qux_btn" @click="logokbtn2()"><img src="../../assets/quxiao.png" alt=""></div>
						</div>
					</div>
				</div>
				<div  v-show="logok" class="zz" @click="logokbtn2()"></div>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		getCookie,
	} from "../../js/common.js"
	import {
		Toast
	} from 'mint-ui';
	var ms
	var _userId
	export default {
		data() {
			return {
				money: 0,
				rechargeCount: 0,
				logok:false,
			}
		},
		created() {
			this.getRechargeByUserId();
			this.fundDetailList();
		},
		mounted() {

		},
		methods: {
			closeWin: function() {
				this.$router.go(-1);
			},
// 			Gorecharge: function() {
// 				this.$router.push({
// 					name: 'payment_options'
// 				})
// 			},
			userinfo_recharge: function() {
				if (getCookie('logok')) {
					this.logok = true;
				} else {
					this.$router.push({
						name: 'payment_options'
					})
				}
			},
			logokbtn1: function() {
				this.logok = false;
				this.$router.push({
					name: 'userinfo_task_real'
				})
			},
			logokbtn2: function() {
				this.logok = false;
			
			},
			// 是否第一次充值
			fundDetailList: function() {
				let uid = getCookie('newData');
				if (!uid) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
				var date = new Date();
				console.log(data)
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				var ms = year + '-' + month + '-' + strDate;
				console.log(ms)
				var userId = uid.userid;
				var data = [];
				data["userId"] = userId;
				data["status"] = 'successful';
				data["payway"] = ''; //中国银联:UNIONPAY ,微信:WEIXIN
				data["page"] = '1';
				data["row"] = "1";
				data["startTime"] = '2017-01-01';
				data["endTime"] = ms;
				var datas = this.Qs.stringify({
					"mid": 1,
					"appId": 1,
					data
				}, {
					allowDots: true
				});
				var thas = this;
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getIpsorderStatus',
						datas
					)
					.then(res => {
						console.log(res)
						var content = JSON.parse(res.data.content);
						if (res.data.status == 200) {
							if (content.code == 100000) {
								console.log(2)
								var data = content.data.content;
								if (data != '') {
									console.log(1)
									this.rechargeCount = 1;
								} else {
									console.log(0)
									this.rechargeCount = 0;
								}
							}
						} else if (res.data.status == 500) {
							Toast('服务器异常，请稍后重试！')
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			//，累计充值金额
			getRechargeByUserId: function() {
				let uid = getCookie('newData');
				if (!uid) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
				var userId = uid.userid;
				var data = [];
				data["userId"] = userId;
				data = this.Encrypt({ ...data
				});
				console.log(data);
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});

				this.$ajax.post('/caipiaoshouye/index.php/home/index/getRechargeByUserId',
						datas
					)
					.then(res => {
						console.log(res)
						if (res.data.status == 200) {
							var content = res.data.content;
							console.log(content)
							if (content.code == 1000) {
								var data = content.obj;
								this.money = data.returnCash;
								// this.rechargeCount=data.rechargeCount;
							} else {

							}
						} else {

						}
					})
					.catch(err => {
						console.log(err);
					})
			},
		}
	}
</script>
<style scoped>
	.prefe {
		background: linear-gradient(360deg, rgba(214, 20, 19, 1) 0%, rgba(197, 1, 10, 1) 100%);
	}

	header {
		position: fixed;
		background: #fff;
	}

	.aui-bar-nav .aui-btn .aui-iconfont {
		color: #333;
	}

	.aui-title {
		color: #333;
	}

	.main {
		margin-top: 2.25rem;
	}

	.mainHeader img {
		width: 100%;
	}

	.mainBox1 {
		background: #fff;
		margin: 0 0.75rem;
		margin-top: -1.25rem;
		padding: 0 0.625rem;
		padding-top: 1.75rem;
		padding-bottom: 2.375rem;
		border-radius: 0 0 0.5rem 0.5rem;
	}

	.mainBox1 .Box1top {
		height: 2.35rem;
		background: #FFE9E9;
		width: 100%;
		border-radius: 0.25rem;
		text-align: center;
		padding-top: 0.38rem;
		margin-bottom: 0.825rem;
	}

	.Box1top p {
		font-size: 0.9rem;
		color: #FF6049;
		line-height: 1.5rem;
	}

	.Box1top span {
		font-size: 1.4rem;
		color: #F50C3A;
		line-height: 1.5rem;
	}

	.Box1conent li {
		position: relative;
		margin-bottom: 0.75rem;
	}

	.Box1conent img {
		width: 100%;
	}

	.Box1conent div {
		position: absolute;
		top: 8%;
		right: 3%;
		width: 26.5%;
		height: 82.9%;
	}

	.Btn {
		width: 11.7rem;
		height: 2.8rem;
		margin: 0 auto;
		margin-top: -1.4rem;
		background: url(../../assets/userinfo/preferential_btn.png) no-repeat;
		background-size: cover;
		text-align: center;
		margin-bottom: 0.875rem;


	}

	.Btn p {
		font-size: 1.1rem;
		color: rgba(201, 25, 0, 1);
		line-height: 2.8rem;
	}

	.bottomText {
		width: 17.25rem;
		height: 7.6rem;
		margin: 0 auto;
		padding: 0 0.9rem;
		background: url(../../assets/userinfo/preferential_real.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 1.975rem;
	}

	.bottomText p {
		font-size: 0.6rem;
		color: #FFFFFF;
		line-height: 1.225rem;
		opacity: 0.8;
	}

	.foots {
		height: 1.975rem;
	}
	
		/*未实名弹窗*/
	.boxsa{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .75);
	}
	#logok {
		width: 100%;
	    height: 50vh;
	    position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    z-index: 2000;
	    /* background: rgba(0, 0, 0, .75); */
	    bottom: 0;
	    margin: auto;
	        max-height: 341px;
	}
	
	#logok .qux_btn {
		width: 8%;
	    position: absolute;
	    bottom: -3rem;
	    left: 46%;
	}
	
	#logok .qux_btn img {
		width: 100%;
	}
	
	#logok>div.renzcont {
		width: 85%;
	     height: 100%; 
	    /* position: absolute; */
	    /* top: 0; */
	    /* left: 7.5%; */
	    z-index: 2;
	    margin: 0px auto;
	    border-radius: 0.6rem;
	    background-color: #fff;
	}
	
	#logok>div p.text {
		text-align: center;
		line-height: 1.2rem;
		padding: 5% 0;
		font-size: 1.2rem;
		color: #363636;
		font-weight: bold;
	}
	
	#logok>div p.renz_text {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 1.8rem;
		font-size: 0.8rem;
		text-align: center;
		color: #43A4F1;
		font-weight: bold;
	}
	
	#logok>div p.renz_text span {
		display: inline-block;
		margin-top: -0.2rem;
		font-size: 1.75rem;
		color: #FF2323;
	}
	
	#logok>div>div {
		width: 100%;
	
	}
	
	#logok>div>div>img {
		display: block;
		width: 100%;
		/*height: 3.2rem;*/
		margin: 0 auto 0.2rem;
	}
	
	#logok>div>div>.title2 {
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.65rem;
		text-align: center;
		color: #7a7a7a;
	}
	
	#logok>div>div>.content {
		width: 100%;
		line-height: 1rem;
		font-size: 0.65rem;
		text-align: center;
		color: #7a7a7a;
		margin: 0 auto;
	}
	
	#logokbtn1,
	#logokbtn2 {
		width: 85%;
		/* height: 2.2rem; */
		line-height: 1.2rem;
		padding: 3% 0;
		border-radius: 0.2rem;
		text-align: center;
		font-size: 0.7rem;
	}
	
	#logokbtn1 {
		margin-right: 0.3rem;
		background-color: #5fa3eb;
		color: #fff;
	}
	
	#logokbtn2 {
		margin-left: 0.3rem;
		background-color: #9b9b9b;
		color: #fff;
	}
	
	#logok .logokbtn {
		width: 100%;
		height: auto;
		margin-top: 3%;
		margin-bottom: 8%;
		display: flex;
		justify-content: center;
	}
	
	#logok2 .logokbtn {
		width: 100%;
		height: auto;
		margin-top: 0.5rem;
		display: flex;
		justify-content: center;
	}
</style>
