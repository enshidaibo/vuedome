<template>
	<div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="closeWin()" tapmode>
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">充值验证</div>
		</header>
		<section class="paymentVerif" id="payment_verif">
			<div class="verifText1" style="text-align: center;">
				我们已把验证码发送到您手机，请及时查收
			</div>
			<div class="verifText2">
				+86 {{phone}}
			</div>
			<div class="verifInput">
				<div class="write-input">
					<input ref="input" type="tel" maxlength="6" class="realInput" v-model="photoNum" @keyup="getNum()" @keydown="delNum()">
					<li v-for="(disInput, index) of disInputs" :class="{'input-active': photoNum.length === index || photoNum.length > index || index === 0}">
						<input maxlength="1" disabled v-model="disInput.value">
					</li>
				</div>
				<div class="write-text">
					<span v-if="tipContent">收短信大概需要{{verifiTem}}秒</span><span v-else>收不到验证码？ <span @click="sendPhone" style="color:#05A9F5;text-decoration:underline;">重新获取</span></span>
				</div>
			</div>
			<div :class="['verifSubmis',submiKg?'adopt':'unbind']" @click="onSubmit">
				确定充值
			</div>
		</section>
	</div>
</template>

<script>
	import {
		getCookie,
		OverallData,
	} from "../../js/common";
	import {
		Toast,
		Indicator,
		MessageBox
	} from 'mint-ui';
	var timer;
	export default {
		data() {
			return {
				userid: '',
				tipContent: true,
				verifiTem: '',
				photoNum: '',
				tradeId: '',
				phone: '',
				bankId: '',
				amount: '',
				submiKg: false,
				disInputs: [{
					value: ''
				}, {
					value: ''
				}, {
					value: ''
				}, {
					value: ''
				}, {
					value: ''
				}, {
					value: ''
				}],
				closeRout: false
			}
		},
		beforeRouteLeave (to, from , next) {
			if (this.closeRout) {
				next();
				return false;
			}
			this.closeRout = true;
			if (this.cardBind == '0') {
				next();
			} else{
				this.$router.go(-2);
			}
		},
		mounted() {
			let uid = getCookie('newData');
			if (!uid) {
				this.closeRout = true;
				this.$router.push({
					name: 'login'
				})
				return false;
			}
			this.userid = uid.userid;
			this.phone = this.$route.query.phone;
			this.tradeId = this.$route.query.tradeId;
			this.bankId = this.$route.query.bankId;
			this.amount = this.$route.query.amount;
			this.interval();
			console.log()
		},
		methods: {
			closeWin: function() {
			    this.closeRout = true;
			    if (this.cardBind == '0') {
			    	this.$router.go(-1);
			    } else{
			    	this.$router.go(-2);
			    }
			},
			interval: function() {
				this.verifiTem = 90;
				this.tipContent = true;
				timer = setInterval(() => {
					this.verifiTem--;
					if (this.verifiTem < 0) {
						this.tipContent = false;
						clearInterval(timer);
					}
				}, 1000);
			},
			delNum: function() { // 删除
                var oEvent = window.event
                if (oEvent.keyCode === 8) {
                    if (this.photoNum.length > 0) {
                        this.disInputs[this.photoNum.length - 1].value = ''
                    }
                }
            },
            getNum: function() { // 输入
                for (var i = 0; i < this.photoNum.length; i++) {
                    this.disInputs[i].value = this.photoNum.charAt(i)
                }
                if (this.photoNum.length == 6) {
                    this.submiKg = true
                } else {
                    this.submiKg = false
                }
            },
			sendPhone: function() {
				let data = [];
				data["userId"] = this.userid;
				data["bankId"] = this.bankId;
				data["amount"] = this.amount;
				let datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/payQuickApply',
						datas
					)
					.then(res => {
						if (res.status != 200) {
							Toast("服务器连接失败,请稍后重试");
							this.tipContent = false;
						} else {
							let strcon = JSON.parse(res.data.content);
							if (strcon.code == '100000') {
								this.tradeId = strcon.data.tradeId;
								this.interval();
							} else {
								Toast(strcon.message);
								this.tipContent = false;
							}
						}
					})
					.catch(err => {
						Toast("请检查网络连接！");
					})
			},
			onSubmit: function() {
				if (!this.submiKg) {
                    return false;
                }
				let data = [];
				data["tradeId"] = this.tradeId;
				data["code"] = this.photoNum;
				let datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/payQuickConfirm',
						datas
					)
					.then(res => {
						let contentsr = res.data;
						let concode = contentsr.content;
						concode = JSON.parse(concode);
						console.log(concode);
						if (res.data.status == 200) {
							if (concode.data.status == 1) {
								this.closeRout = true;
								this.$router.push({
									name: 'userinfo_recharge_weixin_success',
									query: {
										money: this.amount,
										message: '订单已提交，处理中...',
										cardBind: this.$route.query.cardBind
									}
								})
							} else {
								MessageBox('提示', '充值失败');
							}
						} else {
							MessageBox('提示', '充值失败');
						}
						clearInterval(timer);
						this.submitKg = false;
						this.tipContent = false;
					})
					.catch(err => {
						console.log(err);
					})
			}
		}
	}
</script>

<style scoped>
	@import "../../css/payment_verif.css";
</style>
