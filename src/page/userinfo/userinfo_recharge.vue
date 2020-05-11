<template>
	<div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="bake()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">充值</div>
			<div class="aui-pull-right" @click='gorecord()'>
				<img src="../../assets/userinfo/recharges.png" alt="">
			</div>
		</header>
		<section id="vue-recharge">
			<div class="recharge_page">
				<div class="rechar_teltei" v-if='pay_list.rechargetext'>
				    <p>
				        {{ pay_list.rechargetext}}
				    </p>
				  
				</div>
				<div  class="rechar_top_tel" v-if='menybei==0.1'>
					您当前有首次充值特权，充值可额外获赠10%现金。
				</div>
				<div class="recharge_balance">
					现金余额：{{ (balance*1).toFixed(2) }}元
				</div>
				<div id="certify">
					<div class="swiper-container swiper-container-horizontal recharge_bank" :style="bankShow?'opacity:1':'opacity:0'">
						<div class="swiper-wrapper">
							<div v-for="(item,index) in bankList" class="swiper-slide bank-list" :id="index">
								<div class="bank-name">
									<img :src="'../../../static/bankicon/' + item.bankName + '.png'" alt="">
									{{ item.bankName|getBankName() }}
								</div>
								<div class="bank-nemder">
									**** **** **** **** {{ item.cardLastNum }}
								</div>
							</div>
							<div v-if="bankList.length < 3" class="swiper-slide bank-add">
								<img src="../../../static/userinfo/addbank_icon.png" alt=""> 暂无银行卡信息，请添加
								<span class="bankList_bot">
									暂不支持信用卡
								</span>
							</div>
						</div>
					</div>
					<div class="swiper-pagination swiper-pagination-bullets"></div>
				</div>
				<div class="recharge_money">
					<div class="recharge_money_input">
						<label>¥</label>
						<input type="text" name="money" id="money" @input="inputMoney" v-model="amount" placeholder="输入充值金额（最低10元）">
					</div>
					<div class="recharge_money_choice">
						<div v-for="(item,index) in moneyList" :class="['list',item.select?'selection':'']" @click="moneySelect(index)">
							<p class="p1">{{item.title}}</p>
							<p class="p2">赠{{(item.money)*menybei}}元</p>
						</div>
					</div>
					<div class="recharge_money_calcu">
						实际到账：<span>{{ amount*1>=10? (amount*(1+menybei)).toFixed(2):'0.00' }}元</span>
					</div>
				</div>
				<div class="recharge_fom">
					<div class="recharge_fom_phone">
						<label>预留手机号</label>
						<div class="phone">
							{{ phone }}
						</div>
						<!-- <input type="tel" name="phone" v-model="phone" id="phone" disabled> -->
					</div>
					<!-- 					<div class="recharge_fom_verif">
						<label>交易验证码</label>
						<input type="tel" name="verification" id="verification" v-model="verifiNum" @input="oninput" maxlength="6"
						 placeholder="输入验证码">
						<div :class="['recharge_fom_verif_but',countDown?'verifiBut':'']" @click="sendPhone">
							{{ verifiText }}
						</div>
					</div> -->
				</div>
				<div class="tc" v-if="ma">
					<div class="tcBox">
						<div class="tcHeader">手机绑定</div>
						<div class="tcTitle">您首次使用快捷支付，为了确保您的资金安全需绑定一次，成功后即可支付</div>
						<div class="tcInput1">
							<img src="../../assets/userinfo/cz_shouji.png" alt="">
							<p>{{ phone }}</p>
							<!-- <input type="text" id="phone" maxlength="11" placeholder="请输入您的手机号" v-model="telnum"> -->
						</div>
						<div class="tcInput2">
							<label for="tel"><img src="../../assets/userinfo/cz_anquan.png" alt=""></label>
							<input type="tel" name="tel" id="tel" maxlength="6" placeholder="输入验证码" @input='oninputs' v-model="verifiNum">
						</div>
						<div class='qd' @click="msa" :class="flag2?'tcactive':''">确定</div>
					</div>
					<img src="../../assets/home/index_close.png" alt="" class="tcimg3" @click="cloas">
				</div>
				<div v-if="submitKg" class="recharge_submis adopt" @click="sendPhone">下一步</div>
				<div v-else class="recharge_submis unbind">下一步</div>
			</div>
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
		getCookie,
		setCookie
	} from "../../js/common";
	import Swiper from 'swiper';
	var certifySwiper;
	var timer;
	var m_snum2 = 90;
	var m_stimer2 = null;
	var allbanksz = [{
		name: "ccb",
		"text": "中国建设银行",
	}, {
		name: "psbc",
		"text": "中国邮政储蓄",
	}, {
		name: "abc",
		"text": "中国农业银行",
	}, {
		name: "icbc",
		"text": "中国工商银行",
	}, {
		name: "boc",
		"text": "中国银行",
	}, {
		name: "cmbc",
		"text": "中国民生银行",
	}, {
		name: "cmb",
		"text": "招商银行",
	}, {
		name: "cib",
		"text": "兴业银行",
	}, {
		name: "bob",
		"text": "北京银行",
	}, {
		name: "comm",
		"text": "交通银行",
	}, {
		name: "ceb",
		"text": "中国光大银行",
	}, {
		name: "citic",
		"text": "中信银行",
	}, {
		name: "gdb",
		"text": "广发银行",
	}, {
		name: "sdb",
		"text": "深圳发展银行",
	}, {
		name: "hzb",
		"text": "杭州银行",
	}, {
		name: "bos",
		"text": "上海银行",
	}, {
		name: "pab",
		"text": "平安银行",
	}, {
		name: "bod",
		"text": "东莞银行",
	}, {
		name: "cbhb",
		"text": "渤海银行",
	}, {
		name: "czb",
		"text": "浙商银行",
	}, {
		name: "gzb",
		"text": "广州银行",
	}, {
		name: "hxb",
		"text": "华夏银行",
	}, {
		name: "spdb",
		"text": "浦发银行",
	}, {
		name: "bjrcb",
		"text": "北京农商银行",
	}];
	export default {
		data() {
			return {
				ma: false,
				flag2: false,
				userid: '',
				balance: '',
				phone: '',
				bankId: '',
				amount: '',
				bankList: [],
				bankShow: false,
				bankListIndex: 0,
				cardLastNums:'',
				verifiText: '获取验证码',
				submitKg: false,
				countDown: false,
				verifiNum: '',
				tradeId: '',
				bankNames:'',
				moneyList: [{
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
				pay_list:'',
				menybei:0.05
				
			}
		},
		created() {
			let uid = getCookie('newData');
			this.pay_list= getSession('pay_list');
			if (!uid) {
				this.$router.push({
					name: 'login'
				})
				return false;
			}
			this.userid = uid.userid;
			this.getBanlist();
			this.getUserInfo();
			this.fundDetailList();
		},
		methods: {
			//这是弹窗JS开始	
			cloas: function() {
				this.ma = false;
			},
			msa: function() {
				if (this.verifiNum.length > 5) {
					this.onSubmit();
				} else {
					Toast('请输入6位验证码')
				}
			},
			//跳转充值激励
			gorecord:function(){
				this.$router.push({
					name: 'userinfo_recharge_record'
				})
			},

			//这是弹窗JS结束		
			oninputs: function() {
				if (this.verifiNum.length > 5) {
					this.flag2 = true;
				} else {
					this.flag2 = false;
				}
			},
			//是否第一次充值，累计充值金额
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
			
								var data = content.data.content;
								if (data != '') {
			
			
								} else {
			
									this.menybei = 0.1;
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
			getBanlist: function() {
				let data = [];
				data["userId"] = this.userid;
				let datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getBanks',
						datas
					)
					.then(res => {
						let content = res.data;
						if (content.status == 500) {
							Toast('服务器异常，请稍后重试');
							return;
						}
						let data = JSON.parse(content.content);
						if (data.code == '100000') {
							this.bankList = data.data;
							setTimeout(() => {
								this.setSwiper();
								this.bankShow = true;
							}, 100);
						} else if (content.code == "201010") {
							Toast("账户已被锁定，请联系客服");
							setCookie('newData', '', '0-S');
							this.$router.push({
								name: 'login'
							})
						} else {
							Toast('服务器异常，请稍后重试');
						}

					})
					.catch(err => {
						Toast('请检查网络连接！');
					})
			},
			getUserInfo: function() {
				let data = [];
				data["userId"] = this.userid;
				data = this.Encrypt({...data});
				let datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getUserInfo',
						datas
					)
					.then(res => {
						if (res.data.status != 200) {
							Toast("服务器连接失败,请稍后重试");
						} else {
							let data = JSON.parse(res.data.content);
							if (data.code == '100000') {
								this.balance = data.data.money;
							} else {
								Toast(data.message);
							}
						}
					})
					.catch(err => {
						Toast('请检查网络连接！');
					})
			},
			setSwiper: function() {
				let that = this;
				certifySwiper = new Swiper('.swiper-container', {
					watchSlidesProgress: true,
					slidesPerView: 'auto',
					centeredSlides: true,
					loopedSlides: 5,
					loop: false,
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
					},
					on: {
						progress: function(progress) {
							let num = Math.round((this.slides.length - 1) * progress);
							for (let i = 0; i < this.slides.length; i++) {
								let slide = this.slides.eq(i);
								let slideProgress = this.slides[i].progress;
								let modify = 1;
								if (Math.abs(slideProgress) > 1) {
									modify = (Math.abs(slideProgress) - 1) * 0.26 + 1;
								}
								let translate = slideProgress * modify * 260 + 'px';
								let scale = 1 - Math.abs(slideProgress) / 5;
								let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
								slide.transform('translateX(' + translate + ') scale(' + scale + ')');
								slide.css('zIndex', zIndex);
								slide.css('opacity', 0.5);
								if (Math.abs(slideProgress) > 3) {
									slide.css('opacity', 0);
								}
							}
							this.slides.eq(num).css('opacity', 1);
							if (num < that.bankList.length) {
								that.phone = '*******' + that.bankList[num].mobile;
								that.bankId = that.bankList[num].id;
								that.bankNames = that.bankList[num].bankName;
								that.cardLastNums=that.bankList[num].cardLastNum;
							} else {
								that.phone = '';
								that.bankId = '';
							}
							that.bankListIndex = num;
							that.oninput();
						},
						setTransition: function(transition) {
							for (let i = 0; i < this.slides.length; i++) {
								let slide = this.slides.eq(i)
								slide.transition(transition);
							}
						},
						click: function(e) {
							if (that.bankListIndex == that.bankList.length) {
								that.$router.push({
									name: 'userinfo_addbank'
								})
							}
						},
					}
				});
			},
			inputMoney: function() {
				let regRule = /^([0-9]|\.)*$/;
				if (!regRule.test(this.amount) || this.amount.length > 8 ){
					// this.str = this.str.replace(regRule, "");
					// Toast("请输入有效数字");
					this.amount = this.amount.substring(0, this.amount.length - 1);
				}
				for (let i = 0; i < this.moneyList.length; i++) {
					this.moneyList[i].select = false;
				}
				this.oninput()
			},
			moneySelect: function(index) {
				this.amount = this.moneyList[index].money;
				for (let i = 0; i < this.moneyList.length; i++) {
					this.moneyList[i].select = false;
				}
				this.moneyList[index].select = true;
				this.oninput();
			},
			oninput: function() {
				if (this.amount * 1 >= 10 && this.amount * 1 < 1000000 && this.bankId != '') {
					this.submitKg = true;
				} else {
					this.submitKg = false
				}
			},
			sendPhone: function() {
				
				if (!this.countDown) {
					if (this.bankId == '') {
						Toast("请选择银行卡");
						return false;
					}
					if (this.amount == '') {
						Toast("请输入充值金额");
						return false;
					}
					if (!this.amount) {
						Toast("金额错误,请重新输入");
						return false;
					}
					if (this.amount < 10) {
						Toast("单笔金额不能小于10元");
						return false;
					}
					if (this.amount > 1000000) {
						Toast("单笔金额不能大于100万元");
						return false;
					}
					
					this.countDown = true;
                   this.$router.push({
						name:'userinfo_recharge_order_pay',
						query:{
							amount:this.amount,
							bankNames: this.bankNames,
							phone:this.phone,
							cardLastNums:this.cardLastNums,
							bankId:this.bankId,
						}
					})
					return false;
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
								this.countDown = false;
							} else {
								let strcon = JSON.parse(res.data.content);
								if (strcon.code == '100000') {
									if (strcon.data.cardBind == '-1') {
										this.$router.push({
											name: 'userinfo_recharge_binding_verif',
											query: {
												amount: this.amount,
												phone: this.phone,
												tradeId: strcon.data.tradeId,
												bankId: this.bankId
											}
										})
									} else {
										this.$router.push({
											name: 'userinfo_recharge_payment_verif',
											query: {
												amount: this.amount,
												phone: this.phone,
												tradeId: strcon.data.tradeId,
												bankId: this.bankId,
												cardBind: '0'
											}
										})
									}
									this.tradeId = strcon.data.tradeId;
								} else {
									Toast(strcon.message);
									this.countDown = false;
								}
							}
						})
						.catch(err => {
							Toast("请检查网络连接！");
							this.countDown = false;
						})
				}
			},
			onSubmit: function() {
				let data = [];
				data["tradeId"] = this.tradeId;
				data["code"] = this.verifiNum;
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
								this.$router.push({
									name: 'userinfo_recharge_weixin_success',
									params: {
										money: this.amount,
										message: '充值成功'
									}
								})
							} else if (concode.data.status == 0) {
								this.$router.push({
									name: 'userinfo_recharge_weixin_success',
									params: {
										money: this.amount,
										message: '订单已提交，处理中...'
									}
								})
							} else if (concode.data.status == -1) {
								MessageBox('提示', '充值失败');
							}
						} else {
							MessageBox('提示', '充值失败');

						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			bake: function() {
				this.$router.go(-1); //根据浏览器记录返回上一次
			}
		},
		filters: {
			getBankName: function(bankname) {
				for (let i = 0; i < allbanksz.length; i++) {
					if (bankname == allbanksz[i].name) {
						return allbanksz[i].text;
					}
				}
			}
		}
	}
</script>
<style scoped>
.aui-bar-nav {
    background-color: #03a9f4 !important;
    color: #ffffff;
}
.aui-title {
	    color: #fff !important;
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

	.recharge_page {
		width: 100%;
		height: auto;
		min-height: 100vh;
		padding-top: 2.25rem;
		overflow: scroll;
		background-color: rgb(244, 244, 244);
	}

	.recharge_balance {
		width: auto;
		height: auto;
		padding: 0 0.5rem;
		background-color: #fff;
		font-size: 0.7rem;
		font-family: PingFangSC;
		color: rgb(51, 51, 51);
		line-height: 1.8rem;
	}

	#certify {
		position: relative;
		width: 100%;
		padding-bottom: 1rem;
		margin: 0 auto;
		background-color: #fff;
	}

	.recharge_bank {
		width: auto;
		height: auto;
		margin: 0 0.2rem;
		background-color: #fff;
	}

	.recharge_bank .swiper-slide {
		width: 14.8rem;
		height: 6.9rem;
		border-radius: 0.6rem;
		position: relative;
	}

	.recharge_bank .bank-add {
		background: #B5BABE;
		font-size: 0.7rem;
		font-family: PingFangSC;
		color: rgb(255, 255, 255);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.recharge_bank .bank-add img {
		width: 1.15rem;
		height: 1.15rem;
		margin-right: 0.35rem;
	}

	.recharge_bank .bank-add .bankList_bot {
		width: auto;
		height: auto;
		display: block;
		position: absolute;
		bottom: 0.8rem;
		font-size: 0.55rem;
		font-family: PingFangSC;
		color: rgba(255, 255, 255, 0.5);
		line-height: 0.75rem;
		right: 1.25rem;
	}

	.recharge_bank .bank-list {
		background-image: url(../../../static/userinfo/bank_list_bg.png);
		background-repeat: no-repeat;
		background-position: 50% 50%;
		background-size: 100% 100%;
	}

	.recharge_bank .bank-list .bank-name {
		width: auto;
		height: 1.45rem;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		position: absolute;
		top: 1rem;
		left: 1.35rem;
		font-size: 0.75rem;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgb(255, 255, 255);
		line-height: 1.45rem;
	}

	.recharge_bank .bank-list .bank-name img {
		width: 1.4rem;
		height: 1.4rem;
		margin-right: 0.625rem;
	}

	.recharge_bank .bank-list .bank-nemder {
		width: 100%;
		height: 1.5rem;
		position: absolute;
		top: 50%;
		left: 0;
		margin-top: -0.75rem;
		text-align: center;
		font-size: 1.05rem;
		font-family: PingFangSC;
		color: rgb(255, 255, 255);
		line-height: 1.5rem;
	}

	.recharge_page .swiper-pagination {
		width: 100%;
		height: 1rem;
	}

	.recharge_page .swiper-pagination span {
		margin: 0 5px !important;
		background-color: #D8D8D8 !important;
		width: 0.8rem !important;
		height: 0.1rem !important;
		border-radius: 0.05rem !important;
	}

	.recharge_page .swiper-pagination .swiper-pagination-bullet-active {
		background-color: #05A9F5 !important;
	}

	.recharge_money {
		width: 100%;
		height: auto;
		background-color: #fff;
		margin-top: 0.5rem;
	}

	.recharge_money .recharge_money_input {
		width: 100%;
		height: 3.3rem;
		padding: 0 1rem;
		border-bottom: 1px solid #E5E5E5;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.recharge_money .recharge_money_input label {
		font-size: 1.5rem;
		font-family: PingFangSC;
		color: rgb(51, 51, 51);
		line-height: 2.25rem;
	}

	.recharge_money .recharge_money_input input {
		display: block;
		width: 67%;
		height: 3.3rem;
		margin-left: 1rem;
		border: 0;
		background: none;
		/* font-size: 1.5rem; */
		font-family: PingFangSC;
		color: rgb(51, 51, 51);
		line-height: 2.25rem;
	}

	.recharge_money .recharge_money_choice {
		width: 100%;
		height: auto;
		border-bottom: 1px solid #E5E5E5;
		padding: 0.8rem 0;
		display: flex;
		justify-content: center;
		flex-flow: row wrap;
	}

	.recharge_money .recharge_money_choice .list {
		flex: 0 1 auto;
		width: 5.20rem;
		height: 2.8rem;
		margin: 0.35rem;
		padding-top: 0.5rem;
		background-image: url(../../../static/userinfo/money_choice_bg.png);
		background-repeat: no-repeat;
		background-position: 50% 50%;
		background-size: 100% 100%;
	}

	.recharge_money .recharge_money_choice .list.selection {
		background-image: url(../../../static/userinfo/money_choice_bg_on.png);
	}

	.recharge_money .recharge_money_choice .list.selection p {
		color: rgb(5, 169, 245);
	}

	.recharge_money .recharge_money_choice .list .p1 {
		font-size: 0.75rem;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgb(51, 51, 51);
		line-height: 1.05rem;
		text-align: center;
	}

	.recharge_money .recharge_money_choice .list .p2 {
		font-size: 0.6rem;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgb(153, 153, 153);
		line-height: 1.2rem;
		text-align: center;
	}

	.recharge_money .recharge_money_calcu {
		width: 100%;
		height: 2.2rem;
		padding: 0 0.5rem;
		text-align: right;
		font-size: 0.75rem;
		font-family: PingFangSC;
		color: #333333;
		line-height: 2.2rem;
	}

	.recharge_money .recharge_money_calcu span {
		color: #F94238;
	}

	.recharge_fom {
		width: 100%;
		height: auto;
		margin-top: 0.5rem;
		background-color: #fff;
	}

	.recharge_fom .recharge_fom_phone {
		width: 100%;
		height: 3.2rem;
		padding: 0 1rem;
		border-bottom: 1px solid #E5E5E5;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.recharge_fom .recharge_fom_phone label {
		font-size: 0.75rem;
		font-family: PingFangSC;
		color: #333333;
		line-height: 3.2rem;
	}

	.recharge_fom .recharge_fom_phone .phone {
		display: block;
		width: 67%;
		height: 3.2rem;
		border: 0;
		background: none;
		font-size: 0.75rem;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgb(153, 153, 153);
		line-height: 3.2rem;
		text-align: right;
	}

	.recharge_fom .recharge_fom_verif {
		width: 100%;
		height: 3.2rem;
		padding: 0 1rem;
		border-bottom: 1px solid #E5E5E5;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.recharge_fom .recharge_fom_verif label {
		font-size: 0.75rem;
		font-family: PingFangSC;
		color: #333333;
		line-height: 3.2rem;
	}

	.recharge_fom .recharge_fom_verif input {
		display: block;
		width: 40%;
		height: 3.2rem;
		padding-left: 0.5rem;
		border: 0;
		background: none;
		font-size: 0.75rem;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgb(153, 153, 153);
		line-height: 3.2rem;
	}

	.recharge_fom .recharge_fom_verif .recharge_fom_verif_but {
		width: 5rem;
		height: 1.7rem;
		background: rgb(5, 169, 245);
		border-radius: 0.27rem;
		font-size: 0.7rem;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgb(255, 255, 255);
		line-height: 1.7rem;
		text-align: center;
	}

	.recharge_fom .recharge_fom_verif .recharge_fom_verif_but.verifiBut {
		background-color: #999999;
	}

	.recharge_submis {
		margin: 1.2rem 1rem;
		height: 2.25rem;
		background: rgb(181, 186, 190);
		border-radius: 0.27rem;
		font-size: 0.9rem;
		font-family: PingFangSC;
		color: rgb(252, 252, 252);
		line-height: 2.25rem;
		text-align: center;
	}

	.recharge_submis.adopt:active {
		background-color: #009ce2;
	}

	.recharge_submis.adopt {
		background-color: #05A9F5;
	}

	.tc {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.75);
		z-index: 100;
	}

	.tcBox {
		width: 15rem;
		border-radius: 0.425rem;
		background: #fff;
		margin: 0 auto;
		margin-top: 43%;
		padding: 1.15rem 0.75rem 0.9rem 0.75rem;
		position: relative;
		text-align: center;
		box-sizing: border-box;
	}

	.tcHeader {
		font-size: 0.85rem;
		color: #666;
		line-height: 1.2rem;
	}

	.tcTitle {
		margin-top: 0.45rem;
		color: #666;
		font-size: 0.65rem;
		line-height: 0.925rem;
		text-align: center;
		margin-bottom: 0.8rem;
	}

	.tcInput1 {
		border-bottom: 1px solid #E5E5E5;
	}

	.tcInput2 {
		border-bottom: 1px solid #E5E5E5;
	}

	.tcInput1 p {
		width: 85%;
		height: 2.75rem;
		line-height: 2.75rem;
		display: inline-block;
		text-align: right;
	}

	.tcBox img {
		width: 1.2rem;
		height: 1.2rem;
		display: inline-block;
	}

	.tcBox label {
		width: 10%;
		display: inline-block;
	}

	.tcBox input {
		width: 85%;
		display: inline-block;
		height: 2.75rem;
		line-height: 2.75rem;
	}

	.tcInput2 .btn1 {
		width: 5rem;
		height: 1.7rem;
		display: inline-block;
		background: #05A9F5;
		line-height: 1.7rem;
		border-radius: 0.27rem;
		color: #fff;
		margin-top: 0.525rem;
		float: right;
	}

	.qd {
		width: 13.4rem;
		height: 2.25rem;
		background: #B5BABE;
		border-radius: 0.275rem;
		color: #FCFCFC;
		font-size: 0.9rem;
		line-height: 2.25rem;
		margin-top: 0.9rem;
	}

	.tcimg3 {
		height: 1.25rem;
		width: 1.25rem;
		margin: 0 auto;
		margin-top: 1.8rem;
	}

	.tcBox .tcactive {
		background: #05A9F5;
	}
	.rechar_teltei {
	            width: 100%;
	            padding: 0.9rem 0;
	            padding-left: 0.8rem;
	            background-color: #999999;
	        }
	        .rechar_teltei p{
	          width: 90%;
	          font-size:0.5rem;
	        font-weight:400;
	          color:#ffffff;
	          line-height: 1rem;
	        }
			.rechar_top_tel{
				width: 100%;
				line-height: 1.7rem;
				background-color: #FFAE2D;
				color: #FFFFFF;
				padding: 0 0.7rem;
				font-size:0.7rem;
			
			font-weight:400;
			}
</style>
