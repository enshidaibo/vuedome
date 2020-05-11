<template>
	<div>
		<!-- 红包投注弹窗star -->
		<div class="paybgBoxx" @click.stop="hidepayPopup()" v-show='payPopup'></div>
		<div class="paybgBox">
			<div class="payBox" id="payPopup" :class="payPopup?'payPopup':''">
				<div class="sloganBox">
					<div @click.stop="hidepayPopup()"><img src="../assets/goucai/chacha.png" /></div>确认付款
				</div>
				<div class="paytabtitle">
					<div class="payMoney">￥<span>{{(payMoney*1).toFixed(2)}}</span></div>
					<div class="paytype">{{typeNames}}</div>
				</div>
				<div class='xianboxs'>
					<div class="xian"></div>
				</div>
				<div class="paytab" v-if="hasHongbao" :class="hongbaoType?'greybg':''" @click.stop='choseTypeyes(1)'>
					<div class="payiconimage">
						<img v-if="hongbaoType" src="../assets/goucai/quanimageshui.png" />
						<img v-else src="../assets/goucai/quanimages.png" />
					</div>
					<div class="paytextbox" :class="hongbaoType?'greyText':''">
						<div class="paytextup">红包支付<img src="../assets/goucai/tuijian.png" /></div>
						<div class="paytextdown" v-if="qishu>1">红包投注暂不支持追期购彩</div>
						<div class="paytextdown" v-else-if="hongbaoType">红包余额不足</div>
						<div class="paytextdown" v-else>当前彩种可使用红包支付</div>
					</div>
					<div class="choseType notxuan" v-if="hongbaoType"></div>
					<div class="choseType" :class="dianjiChonse?'choseTypeyes':''" v-else></div>
				</div>
				<div class='xianboxs' v-if="hasHongbao" :class="hongbaoType?'xianboxsgreybg':''">
					<div class="xian"></div>
				</div>
				<div class="paytab" :class="cashType?'greybg':''" @click.stop='choseTypeyes(2)'>
					<div class="payiconimage">
						<img v-if="cashType" src="../assets/goucai/cashimageshui.png" />
						<img v-else src="../assets/goucai/cashimages.png" />
					</div>
					<div class="paytextbox" :class="cashType?'greyText':''">
						<div class="paytextup">现金支付</div>
						<div class="paytextdown">现金投注即可返<i>{{hongbaobianxian.toFixed(2)}}</i>元现金</div>
					</div>
					<div class="choseType notxuan" v-if="cashType"></div>
					<div class="choseType" v-else :class="cashdianjiChonse?'choseTypeyes':''"></div>
				</div>
				<div class='xianboxs' :class="cashType?'xianboxsgreybg':''">
					<div class="xian"></div>
				</div>
				<div class="paybtn" :class="hasHongbao?'':'mard'" v-if="cashType&&hongbaoType&&hasHongbao" @click.stop='opnenRecharge'>余额不足，立即充值</div>
				<div class="paybtn" :class="hasHongbao?'':'mard'" v-else-if="cashType&&!hasHongbao" @click.stop='opnenRecharge'>余额不足，立即充值</div>
				<div class="paybtn" :class="hasHongbao?'':'mard'" @click.stop="paybtn()" v-else>立即付款</div>
			</div>
		</div>
		<!-- 红包投注弹窗end -->
		<!-- 去充值弹窗star -->
		<div class="goRechargeBox" id="payRecharge">
			<div class="goRechargeTitle">
				<div @click.stop="hidepayRecharge()"><img src="../assets/goucai/comeback.png" /></div>选择充值方式
			</div>
			<div class="goRechargeBanner"><img src="../assets/goucai/rechargebanner.png" /></div>
			<div class="goRechargeTab" :class="opnenBankopen||opneKuaiJie? '':'closeWeixin'" @click="recharge_back(1)">
				<div class="tabIcon" v-if='opnenBankopen'><img src="../assets/recharge/zhifupingtai-yinlian-copy.png" /></div>
				<div class="tabIcon" v-else-if='opneKuaiJie'><img src="../assets/recharge/zhifupingtai-yinlian-copy.png" /></div>
				<div class="tabIcon" v-else><img src="../assets/recharge/zhifupingtaiyinlianhui.png" /></div>
				<div class="tabText" :class="opnenBankopen||opneKuaiJie? '':'tabText1'">
					<div class="tabTextTitle">快捷支付</div>
					<div class="tabTextContent" v-if='opnenBankopen'>支持各大银行卡，操作方便又迅捷！</div>
					<div class="tabTextContent" v-else-if='opneKuaiJie'>支持各大银行卡，操作方便又迅捷！</div>
					<div class="tabTextContent" v-else>即将恢复，敬请期待！</div>
				</div>
			</div>
			<div class='xianboxs'>
				<div class="xian"></div>
			</div>
			<div class="goRechargeTab" :class="opnenWeixin? '':'closeWeixin'" @click="recharge_back(2)">
				<div class="tabIcon" v-if="opnenWeixin"><img src="../assets/recharge/weixinzhifu-copy.png" /></div>
				<div class="tabIcon" v-else><img src="../assets/recharge/weixinzhifuhui.png" /></div>
				<div class="tabText tabText1">
					<div class="tabTextTitle">微信支付</div>
					<div class="tabTextContent" v-if="opnenWeixin">快捷支付，安全有保障！</div>
					<div class="tabTextContent" v-else>即将开放，敬请期待！</div>
				</div>
			</div>
			<div class='xianboxs'>
				<div class="xian"></div>
			</div>
		</div>
		<!-- 去充值弹窗end -->
	</div>
</template>
<script>
	import {
		animation,
		getCookie
	} from '../js/common.js';
	import {
		MessageBox
	} from 'mint-ui';
	export default {
		props: ['payPopupP', 'payMoneyP', 'hongbaoTypeP', 'coinsMoneyP', 'cashMoneyP', 'dianjiChonseP', 'cashdianjiChonseP',
			'cashTypeP', 'opnenWeixinP', 'opnenBankopenP', 'opneKuaiJieP', 'hongbaobianxianP', 'hasHongbaoP', 'typeName',
			'sqishu'
		], //声明接收父组件参数
		data() {
			return {
				payMoney: 0,
				coinsMoney: 0, //红包余额
				cashMoney: 0, //现金余额
				payPopup: false, //红包弹窗
				dianjiChonse: true, //选择红包
				cashdianjiChonse: false, //选择现金
				hongbaoType: false, //红包余额是否充足
				cashType: false, //现金余额是否充足
				opnenWeixin: false, //微信是否开放
				opnenBankopen: false, //银行卡是否开放
				opneKuaiJie: false, //银lian是否开放
				hongbaobianxian: 0,
				typeNames: '',
				qishu: 1,
				hasHongbao: false
			}
		},
		created() {
			this.qishu = this.sqishu;
			this.payMoney = this.payMoneyP;
			this.typeNames = this.typeName;
			this.coinsMoney = this.coinsMoneyP;
			this.cashMoney = this.cashMoneyP;
			this.payPopup = this.payPopupP
			// this.opnenWeixin = this.opnenWeixinP;
			// this.opnenBankopen = this.opnenBankopenP;
			this.hasHongbao = this.hasHongbaoP;
			// this.opneKuaiJie=this.opneKuaiJieP;
			this.checkIsWx();
		},

		methods: {
			checkIsWx: function() {
				this.$ajax.timeout = 49527; //不要加载状态
				this.$ajax.post('/caipiaoshouye/index.php/home/index/checkIsWx')
					.then(res => {
						this.$ajax.timeout = 50000;
						if (res.data.isopen == 0) {
							this.opnenWeixin = false;
						} else if (res.data.isopen == 1) {
							this.opnenWeixin = true;
						}
						if (res.data.isbankopen == 0) {
							this.opnenBankopen = false;
						} else if (res.data.isbankopen == 1) {
							this.opnenBankopen = true;
							this.opneKuaiJie = false;
						} else if (res.data.isbankopen == 2) {
							this.opneKuaiJie = true;
							this.opnenBankopen = false;
						}

					})
					.catch(err => {
						this.$ajax.timeout = 50000;
						console.log(err);
					})
			},
			hidepayPopup: function() { //
				this.payPopup = false;
				this.hongbaoType = false;
				this.cashdianjiChonse = false;
				this.$emit('payPopupC', this.payPopup); //触发showbox方法，this.logoks为向父组件传递的数据
				let bottomDom = document.querySelector('#payPopup');
				let bottomDomInitial = window.getComputedStyle(bottomDom).height.replace('px', '') * 1 * -1;
				let dom = document.querySelector('#payPopup');
				animation(dom, 'bottom', bottomDomInitial)

			},
			recharge_back: function(type) { //
				if (type == 1) {
					if (this.opnenBankopen || this.opneKuaiJie) {
						this.$emit('RouteLeaveC', true); //触发RouteLeave方法，this.logoks为向父组件传递的数据
						if (this.opnenBankopen) {
							this.$router.push({
								name: 'userinfo_recharge'
							})
						} else if (this.opneKuaiJie) {
							this.$router.push({
								name: 'userinfo_recharge_weixin_kj'
							})
						}
					} else {
						MessageBox({
							title: '',
							message: '快捷支付暂时无法使用，给您带来的不便敬请谅解!',
							showCancelButton: false,
							confirmButtonText: "我知道了",

							// cancelButtonText:"知道了"
						}).then(action => {
							if (action == 'confirm') {

							} else {
								return false;
							}
						})
					}
				} else {
					if (this.opnenWeixin) {
						this.$emit('RouteLeaveC', true); //触发RouteLeave方法，this.logoks为向父组件传递的数据
						this.$router.push({
							name: 'userinfo_recharge_weixin'
						})
					} else {
						MessageBox({
							title: '',
							message: '微信充值暂时无法使用，给您带来的不便敬请谅解!',
							showCancelButton: false,
							confirmButtonText: "我知道了",
						}).then(action => {
							if (action == 'confirm') {

							} else {
								return false;
							}
						})
					}
				}

			},
			opnenRecharge: function() {
				if (getCookie('logok')) { //判断是否实名
					console.log(2222);
					this.$emit('paylogok', true); //触发showbox方法，this.logoks为向父组件传递的数据
					return false;
				}
				// let dompayRecharge1 = document.querySelector('#payRecharge');
				// animation(dompayRecharge1, 'left', 0)
				this.$emit('RouteLeaveC', true);
				this.$router.push({
					name: 'payment_options'
				})
			},
			paybtn: function() {
				this.$emit('paybtn', true); //触发showbox方法，this.logoks为向父组件传递的数据
			},
			hidepayRecharge: function() {
				let dompayRecharge = document.querySelector('#payRecharge');
				animation(dompayRecharge, 'left', 100)
			},
			choseTypeyes: function(type) {
				if (type == 1) {
					if (this.hongbaoType || this.qishu > 1) {
						return false
					}
					this.dianjiChonse = true;
					this.cashdianjiChonse = false;
					this.$emit('moneyTypeC', 'COINS'); //触发showbox方法，this.logoks为向父组件传递的数据
				} else {
					if (this.cashType) {
						return false
					}
					this.dianjiChonse = false;
					this.cashdianjiChonse = true;
					this.$emit('moneyTypeC', 'LOTTERYMONEY'); //触发showbox方法，this.logoks为向父组件传递的数据
				}
			},
		},
		watch: {
			payPopupP(val) { //payPopupP即为父组件的值，val参数为值
				if (val) {
					var dom = document.querySelector('#payPopup')
					this.payPopup = val; //将父组件的值赋给childrenMessage 子组件的值
					animation(dom, 'bottom', 0)
					if (this.coinsMoney < this.payMoney * 1) {
						this.hongbaoType = true;
					} else {
						this.hongbaoType = false;
					}
					//期数大于1时只能用现金
					if (this.qishu > 1) {
						this.hongbaoType = true;
					}
					if (this.cashMoney < this.payMoney * 1) {
						this.cashType = true;
					} else {
						this.cashType = false;
					}
					if (!this.hongbaoType) {
						this.dianjiChonse = true;
						this.$emit('moneyTypeC', 'COINS'); //触发showbox方法，this.logoks为向父组件传递的数据
					} else if (!this.cashType && this.hongbaoType) {
						this.cashdianjiChonse = true;
						this.$emit('moneyTypeC', 'LOTTERYMONEY'); //触发showbox方法，this.logoks为向父组件传递的数据
					}
					let hongbaobianxian = this.payMoney * 1 * 5 / 100;
					if (!this.hasHongbao) {
						this.cashdianjiChonse = true;
						this.$emit('moneyTypeC', 'LOTTERYMONEY'); //触发showbox方法，this.logoks为向父组件传递的数据
					}
					/* if (this.coinsMoney < 0.4) {
						hongbaobianxian = 0.00;
					} else if (this.coinsMoney <= hongbaobianxian) {
						hongbaobianxian = this.coinsMoney;
					} */
					this.hongbaobianxian = hongbaobianxian;
				} else {
					this.payPopup = false;
					this.hongbaoType = false;
					this.cashdianjiChonse = false;
					this.$emit('payPopupC', this.payPopup); //触发showbox方法，this.logoks为向父组件传递的数据
					let bottomDom = document.querySelector('#payPopup');
					let bottomDomInitial = window.getComputedStyle(bottomDom).height.replace('px', '') * 1 * -1;
					let dom = document.querySelector('#payPopup');
					animation(dom, 'bottom', bottomDomInitial)
				}
			},
			payMoneyP(val) {
				this.payMoney = val;
			},
			coinsMoneyP(val) {
				this.coinsMoney = val;
			},
			cashMoneyP(val) {
				this.cashMoney = val;
			},
			// 			opnenWeixinP(val) {
			// 				this.opnenWeixin = val;
			// 			},
			// 			opnenBankopenP(val) {
			// 				this.opnenBankopen = val;
			// 			},
			hasHongbaoP(val) {
				this.hasHongbao = val;
			},
			typeName(val) {
				this.typeNames = val;
			},
			sqishu(val) {
				this.qishu = val;
			},
			// 			opneKuaiJieP(val){
			// 				this.opneKuaiJie = val;
			// 			}
		}
	}
</script>
<style scoped>
	/*投注弹窗star*/
	.paybgBoxx {
		width: 100%;
		height: 100vh;
		position: fixed;
		z-index: 1001;
		background: rgba(0, 0, 0, 0.75);
		top: 0;
		left: 0;
	}

	.paybgBox .payBox {
		width: 100%;
		height: 19.5rem;
		position: fixed;
		bottom: -19.5rem;
		background: #fff;
		overflow: hidden;
		z-index: 1002;


	}

	.paybgBox .payBox .sloganBox {
		width: 100%;
		height: 2.25rem;
		line-height: 2.25rem;
		background: #fff;
		text-align: center;
		font-size: 0.75rem;
		color: #333;
		position: relative;
		border-bottom: 1px solid #E5E5E5;
	}

	.paybgBox .payBox .sloganBox div {
		width: 0.7rem;
		height: 0.7rem;
		position: absolute;
		left: 0.75rem;
		top: 0.775rem;
	}

	.paybgBox .payBox .paytabtitle {
		width: 100%;
		height: 6rem;
		background: #FFFFFF;
		color: #333333;
	}

	.paybgBox .payBox .paytabtitle .payMoney {
		width: 100%;
		display: inline-block;
		text-align: center;
		color: #333;
		font-size: 1rem;
		padding-top: 1.3rem;
	}

	.paybgBox .payBox .paytabtitle .paytype {
		text-align: center;
		color: #999;
		font-size: 0.7rem;
	}

	.paybgBox .payBox .paytabtitle .payMoney span {
		font-size: 2rem;
		height: 2.35rem;
		line-height: 2.35rem;
		font-weight: bold;
	}

	.paybgBox .payBox .paytab {
		width: 100%;
		height: 3.6rem;
		background-color: #fff;
		display: flex;
		display: -webkit-flex;
		position: relative;
	}

	.paybgBox .payBox .paytab:active {
		background-color: #FaFaFa;
	}

	.paybgBox .payBox .greybg {
		background-color: #F4F4F4;
	}

	.paybgBox .payBox .paytab .payiconimage {
		width: 2.775rem;
		height: 100%;
		padding-left: 0.9rem;
		padding-top: 1.1rem;
	}

	.paybgBox .payBox .paytab .payiconimage img {
		width: 1.4rem;
		height: 1.4rem;
		display: block;
	}

	.paybgBox .payBox .xianboxs {
		width: 100%;
		background-color: #fff;

	}

	.paybgBox .payBox .xianboxsgreybg {
		background-color: #F4F4F4;
	}

	.paybgBox .payBox .xian {
		width: 92%;
		height: 1px;
		background-color: #E5E5E5;
		margin: 0 auto;
	}

	.paybgBox .payBox .paytab .paytextbox {
		width: 65%;
		height: 100%;
		/* background-color: #fff; */
		padding-top: .8875rem;
	}

	.paybgBox .payBox .greybg .paytextbox {
		/* background-color:#F4F4F4; */
	}

	.paybgBox .payBox .paytab .paytextbox .paytextup {
		font-size: 0.7rem;
		color: #333;
		height: 1rem;
		line-height: 1rem;
	}

	.paybgBox .payBox .paytab .paytextbox .paytextup img {
		display: inline-block;
		width: 1.8rem;
		height: 0.75rem;
		margin-top: -.25rem;
	}

	.paybgBox .payBox .paytab .paytextbox .paytextdown {
		font-size: 0.6rem;
		color: #999;
		height: 0.825rem;
		line-height: .825rem;
	}

	/* 	.paybgBox .payBox .paytab .greyText div{
			color:#9E9E9E !important;
		} */
	.paybgBox .payBox .paytab .paytextbox .paytextdown i {
		color: #F82A5B !important;
		font-size: 0.65rem;
	}

	.paybgBox .payBox .paytab .choseType {
		width: 0.8rem;
		height: 0.8rem;
		position: absolute;
		top: 1.4rem;
		right: 1rem;
		/* background-image:url(../assets/goucai/weixuanzhong.png) ; */
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.paybgBox .payBox .paytab .choseTypeyes {
		background-image: url(../assets/goucai/duigou.png);
	}

	.paybgBox .payBox .paytab .notxuan {
		/* background-image:url(../assets/goucai/notxuan.png) ; */
	}

	.paybgBox .payBox .paybtn {
		width: 92%;
		height: 2.25rem;
		line-height: 2.25rem;
		text-align: center;
		color: #fff;
		border-radius: 0.275rem;
		background: #05A9F5;
		font-size: 0.9rem;
		margin: 0 auto;
		margin-top: 0.9rem;
	}

	.paybgBox .payBox .paybtn:active {
		width: 90%;
		height: 2rem;
		line-height: 2rem;
		margin-top: 1.025rem;
	}

	.paybgBox .payBox .mard {
		width: 92%;
		height: 2.25rem;
		line-height: 2.25rem;
		text-align: center;
		color: #fff;
		border-radius: 0.275rem;
		background: #05A9F5;
		font-size: 0.9rem;
		margin: 0 auto;
		margin-top: 4.5rem;
	}

	.paybgBox .payBox .mard:active {
		width: 90%;
		height: 2rem;
		line-height: 2rem;
		margin-top: 4.625rem;
	}

	/*投注弹窗end*/
	/*去充值star*/
	.goRechargeBox {
		width: 100%;
		height: 19.5rem;
		position: fixed;
		left: 100%;
		bottom: 0;
		background: #fff;
		overflow: hidden;
		z-index: 1003;

	}

	.goRechargeBox .goRechargeTitle {
		width: 100%;
		height: 2.25rem;
		line-height: 2.25rem;
		background: #fff;
		text-align: center;
		font-size: 0.75rem;
		color: #333;
		position: relative;
		border-bottom: 1px solid #E5E5E5;
	}

	.goRechargeBox .goRechargeTitle div {
		width: 0.45rem;
		height: 0.8rem;
		position: absolute;
		left: 0.8rem;
		top: 0.75rem;
	}

	.goRechargeBox .goRechargeBanner {
		width: 100%;
		height: 6rem;
	}

	.goRechargeBox .goRechargeBanner img {
		height: 100%;
		width: 100%;
	}

	.goRechargeBox .goRechargeTab {
		width: 100%;
		height: 3.6rem;
		background-color: #fff;
		display: flex;
		display: -webkit-flex;
		background-image: url(../assets/goucai/gotorechrge.png);
		background-repeat: no-repeat;
		background-size: 0.225rem 0.45rem;
		background-position: 17.3rem 1.575rem;
		/* position: relative; */
	}

	.goRechargeBox .goRechargeTab .tabIcon {
		width: 4.025rem;
		height: 100%;
		padding-left: 0.75rem;
		padding-top: 0.675rem;
	}

	.goRechargeBox .goRechargeTab .tabIcon img {
		width: 2.25rem;
		height: 2.25rem;
		display: block;
	}

	.goRechargeBox .goRechargeTab .tabText {
		width: 60%;
		height: 100%;
		background: #fff;
		padding-top: 0.425rem;
	}

	.goRechargeBox .goRechargeTab .tabText1 {
		padding-top: 0.825rem;
	}

	.goRechargeBox .goRechargeTab .tabText .tabTextTitle {
		color: #2F2F2F;
		font-size: 0.7rem;
	}

	.goRechargeBox .goRechargeTab .tabText .tabTextContent {
		color: #999;
		font-size: 0.6rem;
	}

	.goRechargeBox .xianboxs {
		width: 100%;
		background: #fff;

	}

	.goRechargeBox .xianboxsgreybg {
		background: #F4F4F4;
	}

	.goRechargeBox .xian {
		width: 92%;
		height: 1px;
		background: #E5E5E5;
		margin: 0 auto;
	}

	.goRechargeBox .closeWeixin {
		background-color: #F4F4F4;
	}

	.goRechargeBox .closeWeixin .tabText {
		background-color: #F4F4F4;
	}

	/*去充值end*/
</style>
