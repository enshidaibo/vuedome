<template>
	<div class="wx-recharge">
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="bake()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">充值</div>
			<div class="aui-pull-right" @click='gorecord()'>
				<img src="../../assets/userinfo/recharges.png" alt="">
			</div>
		</header>
		<section class="vue-recharge" v-if="recharge">
			<div class="body-header">
				快捷支付
			</div>
			<div class="recharge-input">
				<div class="left">￥</div>
				<div class="right">
					<input type="text" v-model="numder" @input="numderInput"  placeholder="输入充值金额（最低10元）" />
				</div>
			</div>
			<div class="recharge_money_choice">
				<div v-for="(item,index) in numderList" :class="['list',item.select?'selection':'']" @click="moneySelect(index)">
					<p class="p1">{{item.title}}</p>
					<p class="p2">赠{{(item.money)*0.05}}元</p>
				</div>
			</div>
			<div class="numderActual">实际到账：<span style="color: #e6474b;">{{(numder*1.05)|numberFormat}}元</span></div>
			<div class="borderSho"></div>
			<!-- <div class="rechargId">
				<div class="left">
					充值账号
				</div>
				<div class="right">
					{{phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')}}
				</div>
			</div> -->
			<div class="payBtn" @click="pay()">充值</div>
		</section>
		<section class="vue-recharge" v-else>
			<div class="body-header">
				快捷支付
			</div>
			<div class="borderSho"></div>
			<div class="confirm-recharge">
				<div class="hader-icon">
						<img src="../../assets/recharge/zhifupingtai-yinlian-copy.png" alt="">
				</div>

				<div class="h1">确认支付</div>
				<div class="p1">支付金额（元）</div>
				<div class="p2">{{numder|numberFormat}}</div>
				<div class="text">
					<p>1.如果未打开快捷支付或是未完成付款,请重新点击"确认支付"</p>
					<p>2.如果已完成,请点击“已完成付款”</p>
				</div>
				<!-- 点击确认支付微信form -->
				<form action="http://m.facaime.com/caipiaoshouye/index.php/home/index/quickPay" method="post">
					<input style="display: none;" v-model="userId" name="data[userId]" />
					<input style="display: none;" v-model="numder" name="data[amount]" />
					<input class="Btn1" type="submit" value="确认支付" />

				</form>
				<!-- <div class="Btn1" @click="jxpay">继续支付</div> -->
				<div class="Btn2" @click="complete">已完成付款</div>
			</div>
			<!-- <div class="QR-code">
				<div class="QR-img">
					<img src="../../assets/userinfo/newkefuimg.png" width="193" height="192" />
				</div>
				<div class="h1">请扫码支付</div>
				<div class="p1">安全、方便、快捷</div>
			</div> -->
		</section>
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
		getCookie
	} from "../../js/common";
	export default {
		data() {
			return {
				recharge: true,
				numderList: [{
					title: '30元',
					money: 30,
					select: false
				}, {
					title: '50元',
					money: 50,
					select: false
				}, {
					title: '100元',
					money: 100,
					select: false
				}, {
					title: '300元',
					money: 300,
					select: false
				}, {
					title: '500元',
					money: 500,
					select: false
				}, {
					title: '1000元',
					money: 1000,
					select: false
				}],
				numder: '',
				reteret: '',
				userId: 0,
				phone: ''
			}
		},
		created() {
			let uid = getCookie('newData');
			if (!uid) {
				this.$router.push({
					name: 'login'
				})
				return false;
			}
			this.userId = uid.userid;
			this.phone = uid.tel;
		},
		methods: {
			moneySelect: function(index) {
				this.numder = this.numderList[index].money + '';
				for (var i = 0; i < this.numderList.length; i++) {
					this.numderList[i].select = false;
				}
				this.numderList[index].select = true;
			},
			//跳转充值激励
			gorecord:function(){
				this.$router.push({
					name: 'userinfo_recharge_record'
				})
			},
			numderInput: function() {
			  var regRule = /^([0-9]|\.)*$/; //禁止输入
                if (!regRule.test(this.numder) || this.numder.length > 6) {
                    // this.str = this.str.replace(regRule, "");
                    // Toast("请输入有效数字");
                    this.numder = this.numder.substring(0, this.numder.length - 1);
                }
				for (var i = 0; i < this.numderList.length; i++) {
					this.numderList[i].select = false;
				}
			},
			pay: function() {
				if (this.numder == '') {
					Toast('请输入充值金额');
					return false;
				}
				if (!this.numder) {
					Toast('金额错误,请重新输入')
					return false;
				}

				if (this.numder * 1 < 10) {
					Toast('单笔金额不能小于10元')
					return false;
				}
				if (this.numder * 1 > 1000000) {
					Toast('单笔金额不能大于1000000元')
					return false;
				}
				this.recharge = false;
				let uid = getCookie('newData');
				if (!uid) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
				var userId = uid.sportId;
				var data = [];
				data["userId"] = userId;
				data["amount"] = this.numder;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});

				// 				this.$ajax.post('/caipiaoshouye/index.php/home/index/wechatPay',
				// 						datas
				// 					)
				// 					.then(res => {
				// 						// console.log(JSON.stringify(res.data.));
				// 						console.log(JSON.stringify(res));
				// 						if (res.data.status == 200) {
				// 							this.reteret = res;
				// 						}
				// 
				// 					})
				// 					.catch(err => {
				// 						console.log(err);
				// 					})
			},
			jxpay: function() {
				let uid = getCookie('newData');
				if (!uid) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
				var userId = uid.userid;

			},
			complete: function() {
				this.$router.push({
					name: 'userinfo_recharge_weixin_success',
					query: {
						money: this.numder,
						message: '充值成功'
					}
				})
			},
			bake: function() {
				this.$router.go(-1);
			}
		},
		filters: {
			numberFormat: function(number) {
				var data = Math.floor(number * 100) / 100;
				return data.toFixed(2);
			}
		}
	}
</script>
<style scoped>
	.wx-recharge{
		width: 100%;
		height: auto;
		min-height: 100vh;
		background-color: #F4F4F4;
	}
	
	header {
		position: fixed !important;
	}
	
	header img {
		width: 1.1rem;
		height: 1.1rem;
		margin-top: 0.55rem;
		margin-left: 0.5rem;
	}
	html{
		background-color: !important;
	}
	/*    input:disabled, textarea:diabled {
    -webkit-text-fill-color: #000;
    -webkit-opacity: 1;
    color: #000;
} */
	.vue-recharge {
		/* padding-top: 2.25rem; */
		/* min-height: vh; */
		/* position: fixed ; */
		margin-top: 2.25rem;
	}

	.blue {
		background-color: #EEF4FB;
	}

	.body-header {
		width: 100%;
		height: 4rem;
		background-color: #fff;
		padding-left: 3.4rem;
		background-image: url(../../assets/recharge/zhifupingtai-yinlian-copy.png);
		background-repeat: no-repeat;
		background-position: 1rem 50%;
		background-size: 2rem 2rem;
		font-size: 0.94rem;
		color: #4D4D4D;
		line-height: 4rem;
	}

	.borderSho {
		width: 100%;
		height: 0.5rem;
	}

	.recharge-input {
		width: 100%;
		height: 4rem;
		margin-top: 0.5rem;
		background-color: #fff;
		border-bottom: 1px solid #E5E5E5;
	}

	.recharge-input .left {
		float: left;
		width: 4rem;
		height: 4rem;
		text-align: center;
		font-size: 1.5rem;
		color: #4D4D4D;
		line-height: 4rem;
	}

	.recharge-input .right {
		float: right;
		width: 60%;
		height: 4rem;
		margin-right: 1rem;
	}

	.recharge-input .right input {
		display: block;
		width: 100%;
		height: 4rem;
		font-size: 1.5rem;
		color: #000;
		text-align: right;
	}

	.recharge_money_choice {
		width: 100%;
		height: auto;
		background-color: #fff;
		border-bottom: 1px solid #E5E5E5;
		padding: 0.8rem 0;
		display: flex;
		justify-content: center;
		flex-flow: row wrap;
	}

	.recharge_money_choice .list {
		flex: 0 1 auto;
		width: 5.2rem;
		height: 2.8rem;
		margin: 0.35rem;
		padding-top: 0.5rem;
		background-image: url(../../../static/userinfo/money_choice_bg.png);
		background-repeat: no-repeat;
		background-position: 50% 50%;
		background-size: 100% 100%;
	}

	.recharge_money_choice .list.selection {
		background-image: url(../../../static/userinfo/money_choice_bg_on.png);
	}

	.recharge_money_choice .list.selection p {
		color: rgb(5, 169, 245);
	}

	.recharge_money_choice .list.selection .p2 {
		color: #F94238
	}

	.recharge_money_choice .list .p1 {
		font-size: 0.75rem;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgb(51, 51, 51);
		line-height: 1.05rem;
		text-align: center;
	}

	.recharge_money_choice .list .p2 {
		font-size: 0.6rem;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgb(153, 153, 153);
		line-height: 1.2rem;
		text-align: center;
	}

	.numderActual {
		width: 100%;
		height: auto;
		padding: 1rem;
		background-color: #fff;
		line-height: 1.5rem;
		text-align: right;
		font-size: 0.94rem;
		color: #716F6C;
	}

	.payBtn {
		width: 90%;
		height: 2.45rem;
		margin:  auto;
		margin-top: 1.5rem;
		line-height: 2.45rem;
		text-align: center;
		font-size: 0.9rem;
		color: #fff;
		background-color: #43A4F1;
		border-radius: 0.35rem;
	}

	.confirm-recharge {
		width: 100%;
		height: auto;
	}

	.confirm-recharge .hader-icon {
		width: 100%;
		height: auto;
		margin-top: 1.6rem;
	}

	.confirm-recharge .hader-icon img {
		width: 4.6rem;
		height: auto;
		margin: auto;
	}

	.confirm-recharge .h1 {
		margin-top: 0.6rem;
		font-size: 1rem;
		font-weight: bold;
		color: #3F3F3F;
		line-height: 1.6rem;
		text-align: center;
	}

	.confirm-recharge .p1 {
		font-size: 0.76rem;
		color: #A3A3A3;
		line-height: 1.9rem;
		text-align: center;
	}

	.confirm-recharge .p2 {
		font-family: PingFangSC-Medium;
		font-size: 1.6rem;
		font-weight: 550;
		color: #DF191E;
		line-height: 2rem;
		text-align: center;
	}

	.confirm-recharge .text {
		width: 100%;
		height: auto;
		padding: 0 1rem;
		margin-top: 0.9rem;
	}

	.confirm-recharge .text p {
		font-size: 0.68rem;
		color: #A0A0A0;
		line-height: 1.1rem;
		padding: 0.3rem 0;
	}

	.confirm-recharge form {
		width: 90%;
		height: auto;
		text-align: center;
		margin: auto;
		margin-top: 1.6rem;
	}

	.confirm-recharge form .Btn1 {
		width: 100%;
		height: 2.45rem;

		text-align: center;
		font-size: 0.9rem;
		color: #fff;
		background-color: #43A4F1;
		border-radius: 0.35rem;
	}

	.confirm-recharge .Btn2 {
		width: 90%;
		height: 2.45rem;
		margin: auto;
		margin-top: 0.9rem;
		line-height: 2.45rem;
		text-align: center;
		font-size: 0.9rem;
		color: #43A4F1;
		border: 1px solid #43A4F1;
		border-radius: 0.35rem;
	}

	input::-webkit-input-placeholder {
		color: #C1C1C1;
		font-size: 0.76rem;
	}

	.rechargId {
		width: 100%;
		height: 3.2rem;
		background-color: #fff;
		padding: 0 0.75rem;
	}

	.rechargId .left {
		width: auto;
		height: auto;
		float: left;
		font-size: 0.75rem;
		color: #333;
		line-height: 3.2rem;
	}

	.rechargId .right {
		width: auto;
		height: auto;
		float: right;
		font-size: 0.75rem;
		color: #999999;
		line-height: 3.2rem;
	}

	/* 	.QR-code{
		margin-top: 1.3rem;
		margin-left: 1rem;
		margin-right: 1rem;
		background-color: #fff;
		border-radius: 0.5rem;
		padding: 6rem 0;
		text-align: center;
	}
	.QR-img img{
		margin: auto;
	} */
</style>
