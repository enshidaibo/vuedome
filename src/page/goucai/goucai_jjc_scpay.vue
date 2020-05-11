<template>
	<div>
		<!-- 		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="closeWins()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title" style="text-overflow: inherit;left: 3rem;right:4.5rem">竞彩足球{{typeList[playType].name}}</div>
			<div class="fgr hm_top" @click="open_hemai()">
				<span><img src="../../assets/goucai/jjc/icon_flagre.png" /></span>
				<span>发起合买</span>
			</div>
		</header> -->
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" tapmode @click="closeWins()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div>
				<div class="aui-title" tapmode>竞彩足球 {{typeList[playType].name}}</div>
			</div>
			<div class="aui-pull-right aui-btn top-more" @click="open_hemai()" tapmode>
				发起合买
			</div>
		</header>
		<div class="jjc_bjdcpay" id="jjc_zp" v-if='lcbList'>
			<!-- 付款页面头部 -->
			<div class="jjcpay_head" v-if='lcbList'>
				<!-- <p>已选<span>{{lcbList.length}}</span>场 投注截止：<span>{{matchTimes|capitalize(1)}}</span></p> -->
				<p><span>第{{lcbList[0].periodNumber}}期</span> <span class="jiez">{{matchTimes|capitalize(1)}}截止</span></p>
			</div>

			<!-- 六场半全场 -->
			<div v-cloak v-if="playType == 0" class="main jjc_lcbqc_pay" id="pay_lcbqc">
				<template v-for="(item,index) in lcbList">
					<div class="con">
						<div class="titl">
							<p class="flr p1">周五 {{ item.periodId }} {{ item.gameName }} <span>{{ item.matchTime|capitalize(1) }}</span></p>
							<p class="fgr p2"><span>(主)</span> {{ item.homeTeamName }} vs {{ item.guestTeamName }} <span>(客)</span>
							</p>
						</div>
						<div class="battle">
							<div class="xuanhao flr">{{ index + 1 }}</div>
							<div class="battle_shel fgr">
								<ul>
									<li class="ban">半</li>
									<li :class="{ 'active': item.stateArr.b0 }" @click="modifyBetting(index,'b0')"><span>胜</span><br /><span>{{ item.odds1 }}</span></li>
									<li :class="{ 'active': item.stateArr.b1 }" @click="modifyBetting(index,'b1')"><span>平</span><br /><span>{{ item.odds2 }}</span></li>
									<li :class="{ 'active': item.stateArr.b2 }" @click="modifyBetting(index,'b2')"><span>负</span><br /><span>{{ item.odds3 }}</span></li>
								</ul>
								<ul>
									<li class="quan">全</li>
									<li :class="{ 'active': item.stateArr.q0 }" @click="modifyBetting(index,'q0')"><span>胜</span><br /><span>{{ item.odds1 }}</span></li>
									<li :class="{ 'active': item.stateArr.q1 }" @click="modifyBetting(index,'q1')"><span>平</span><br /><span>{{ item.odds2 }}</span></li>
									<li :class="{ 'active': item.stateArr.q2 }" @click="modifyBetting(index,'q2')"><span>负</span><br /><span>{{ item.odds3 }}</span></li>
								</ul>
							</div>
						</div>
					</div>
				</template>
				<div class="add_ss" @click="addList()" tapmode>
					<p>添加/编辑赛事</p>
				</div>
			</div>
			<!-- 四场进球 -->
			<div v-cloak v-else-if="playType == 3" class="main jjc_scjq_pay" id="pay_scjq">
				<template v-for="(item,index) in lcbList">
					<div class="con">
						<div class="titl">
							<p class="flr p1">周五{{ item.periodId }} {{ item.gameName }} <span>{{item.matchTime|capitalize(1)}}</span></p>
							<p class="fgr p2"><span>(主)</span> {{ item.homeTeamName }} vs {{ item.guestTeamName }} <span>(客)</span>
							</p>
						</div>
						<div class="battle">
							<div class="xuanhao flr">{{ index + 1 }}</div>
							<div class="battle_shel fgr">
								<ul>
									<li class="ban">主</li>
									<li :class="{ 'active': item.stateArr.z0 }" @click="modifyBetting(index,'z0')">0球</li>
									<li :class="{ 'active': item.stateArr.z1 }" @click="modifyBetting(index,'z1')">1球</li>
									<li :class="{ 'active': item.stateArr.z2 }" @click="modifyBetting(index,'z2')">2球</li>
									<li :class="{ 'active': item.stateArr.z3 }" @click="modifyBetting(index,'z3')">3+球</li>
								</ul>
								<ul>
									<li class="quan">客</li>
									<li :class="{ 'active': item.stateArr.k0 }" @click="modifyBetting(index,'k0')">0球</li>
									<li :class="{ 'active': item.stateArr.k1 }" @click="modifyBetting(index,'k1')">1球</li>
									<li :class="{ 'active': item.stateArr.k2 }" @click="modifyBetting(index,'k2')">2球</li>
									<li :class="{ 'active': item.stateArr.k3 }" @click="modifyBetting(index,'k3')">3+球</li>
								</ul>
							</div>
						</div>
					</div>
				</template>
				<div class="add_ss" @click="addList()" tapmode>
					<p>添加/编辑赛事</p>
				</div>
			</div>
			<!-- 任选九场 -->
			<div v-cloak v-else-if="playType == 1" class="main jjc_rxjc_pay" id="pay_rxjc">
				<template v-for="(item,index) in lcbList">
					<div class="con">
						<div class="battle">
							<div class="xuanhao flr">{{ index + 1 }}</div>
							<div class="battle_shel fgr">
								<ul>
									<li :class="{ 'active': item.stateArr.b0 }" @click="modifyBetting(index,'b0')"><span>{{ item.homeTeamName }}</span><br /><span>胜
											{{ item.odds1 }}</span></li>
									<li :class="{ 'active': item.stateArr.b1 }" @click="modifyBetting(index,'b1')"><span>VS</span><br /><span>平 {{ item.odds2 }}</span></li>
									<li :class="{ 'active': item.stateArr.b2 }" @click="modifyBetting(index,'b2')"><span>{{ item.guestTeamName }}</span><br /><span>负
											{{ item.odds3 }}</span></li>
								</ul>
							</div>
						</div>
					</div>
				</template>
				<div class="add_ss" @click="addList()" tapmode>
					<p>添加/编辑赛事</p>
				</div>
			</div>
			<!-- 胜负彩 -->
			<div v-cloak v-else class="main jjc_rfc_pay" id="pay_sfc">
				<template v-for="(item,index) in lcbList">
					<div class="con">
						<div class="battle">
							<div class="xuanhao flr">{{ index + 1 }}</div>
							<div class="battle_shel fgr">
								<ul>
									<li :class="{ 'active': item.stateArr.b0 }" @click="modifyBetting(index,'b0')"><span>{{ item.homeTeamName }}</span><br /><span>胜
											{{ item.odds1 }}</span></li>
									<li :class="{ 'active': item.stateArr.b1 }" @click="modifyBetting(index,'b1')"><span>VS</span><br /><span>平 {{ item.odds2 }}</span></li>
									<li :class="{ 'active': item.stateArr.b2 }" @click="modifyBetting(index,'b2')"><span>{{ item.guestTeamName }}</span><br /><span>负
											{{ item.odds3 }}</span></li>
								</ul>
							</div>
						</div>
					</div>
				</template>
				<div class="add_ss" @click="addList()" tapmode>
					<p>添加/编辑赛事</p>
				</div>
			</div>

			<!-- 底部倍数 -->
			<div class="bottom">
				<div class="agree">
					<div class="check"><b tapmode @click="onUserprotocol"><i :class="[ 'flr' , { 'active': Userprotocol }]"></i></b>
						<p class="flr">我已阅读并同意<span @click="JumpUserprotocol" tapmode>《委托投注规则》</span></p>
					</div>
				</div>
				<div class="bt_text">
					<div class="multiple sc_multiple">
						<div class="jian flr" @click="reduce"></div>
						<div class="beishu flr" @click=" showkeyboard = true ,coverage=true">
							<span>{{ multiple }}</span>倍
						</div>
						<div class="jia flr" @click="increase"></div>
					</div>
				</div>
				<!-- 				<footer>
					<div class="delete flr" @click="deleteList"></div>
					<div class="total flr">
						<p style="font-size: 0.9rem;line-height: 2.6rem;">共{{ totalNum }}注 {{ multiple }}倍<span>{{ totalNum*multiple*2 }}</span>元</p>
						
					</div>
					<div class="pay fgr" @click="onpay()">付款</div>
				</footer> -->
				<footer>
					<div class="ft_money flr scfooter">
						<p>共{{totalNum}}注{{multiple}}倍<span class="rit_tow">{{(totalNum*multiple*2).toFixed(2)}}</span>元</p>

					</div>
					<div class="ft_btn fgr">
						<div class="flr" tapmode>

						</div>
						<div class="flr" tapmode @click="onpay()">付款</div>
					</div>
				</footer>
			</div>

			<!-- 模拟数字键盘 -->
			<div v-if="showkeyboard" class="keyboard">
				<div class="hidekey" @click="closekeyboard"></div>
				<div class="cont-f">
					<div class="bt_text">
						<div class="multiple sc_multiple">
							<div class="jian flr" @click="reduce"></div>
							<div class="beishu flr">
								<span>{{ multiple }}</span>倍
							</div>
							<div class="jia flr" @click="increase"></div>
						</div>
					</div>
					<footer>
						<div class="ft_money flr scfooter">
							<p>共{{totalNum}}注{{multiple}}倍<span class="rit_tow">{{(totalNum*multiple*2).toFixed(2)}}</span>元</p>

						</div>
						<div class="ft_btn fgr">
							<div class="flr" tapmode>

							</div>
							<div class="flr" tapmode @click="onpay()">付款</div>
						</div>
					</footer>
					<div class="Key_li">
						<ul>
							<li @click="keyinputidx('1')">1</li>
							<li @click="keyinputidx('2')">2</li>
							<li @click="keyinputidx('3')">3</li>
							<li @click="keyinputidx('4')">4</li>
							<li @click="keyinputidx('5')">5</li>
							<li @click="keyinputidx('6')">6</li>
							<li @click="keyinputidx('7')">7</li>
							<li @click="keyinputidx('8')">8</li>
							<li @click="keyinputidx('9')">9</li>
							<li @click="keyinputidx('00')">00</li>
							<li @click="keyinputidx('0')">0</li>
							<li class="del" @click="keybackspace"><img src="../../assets/goucai/jjc/biaoqingshanchujian.png" /></li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<!-- 去充值弹窗end -->
		<module-pay :payPopupP='payPopup' :payMoneyP='payMoney' :coinsMoneyP='coinsMoney' :cashMoneyP='cashMoney'
		 :opnenWeixinP='opnenWeixin' :opnenBankopenP='opnenBankopen' :hasHongbaoP='hasHongbaoP' :typeName='typeList[playType].name'
		 @payPopupC="payPopupC" @RouteLeaveC='RouteLeaveC' @paybtn='paybtn' @paylogok='paylogok' @moneyTypeC='moneyTypeC'>
		</module-pay>

		<checkok-nav :logokz='logok' @showbox="showbox"></checkok-nav>
	</div>
</template>

<script>
	var totalArr;
	import phone from "../../js/connector.js";
	import checkokNav from '../../common/checkok.vue';
	import modulePay from '../../common/modulepay.vue';
	import {
		varietymaxPrizeAndCost,
		danmaxPrizeAndCost
	} from "../../js/maxPrizeAndCost.js";
	import {
		getSession,
		setSession,
		getCookie,
		compare,
		animation,
		getTime
	} from '../../js/common.js';
	 
	import {
		Toast,
		MessageBox
	} from 'mint-ui';
	export default {
		components: {
			checkokNav,
			modulePay
		},
		data() {
			return {
				logok: false, //未实名标志
				coverage: true, //键盘第一次唤起
				'multiple': '1',
				'showkeyboard': false,
				'Userprotocol': true,
				hasHongbaoP:false,
				'periodNumber': '',
				'matchTimes': '',
				'typeList': [{
						'id': 6,
						'name': '六场半全场',
						'path': 'goucai_jjc_zq_lcb',
						'play': 'LCZC'
					},
					{
						'id': 9,
						'name': '任选九场',
						path: 'goucai_jjc_zq_rxjc',
						'play': 'RXZC'
					},
					{
						'id': 14,
						'name': '胜负彩',
						'path': 'goucai_jjc_zq_sfc',
						'play': 'SFZC'
					},
					{
						'id': 4,
						'name': '四场进球',
						'path': 'goucai_jjc_zq_sc',
						'play': 'SCZC'
					}
				],
				'lcbList': [{
					"stateArr": {
						"b0": true,
						"b1": false,
						"b2": true,
						"q0": false,
						"q1": false,
						"q2": true,
					}
				}],
				'playType': 3,
				'totalNum': 0,
				'RouteLeave': false,
				coinsMoney: 0, //红包余额
				cashMoney: 0, //现金余额
				payPopup: false, //红包弹窗
				dianjiChonse: true, //选择红包
				cashdianjiChonse: false, //选择现金
				hongbaoType: false, //红包余额是否充足
				cashType: false, //现金余额是否充足
				opnenWeixin: false, //微信是否开放
				opnenBankopen: false, //银行卡是否开放
				payMoney: 0,
				hongbaobianxian: 0,
				moneyType: "COINS"
			};
		},
		created() {
			let payid = getSession('palyIndex');
			let BetArr = getSession('arr');

			for (let i = 0; i < BetArr.length; i++) {
				BetArr[i]['listSelect'] = true
			}
			if(payid==1){
				this.hasHongbaoP=true
			}//任选九能用红包
			console.log(BetArr)
			this.playType = payid;
			this.lcbList = BetArr;
			this.periodNumber = BetArr[0].periodNumber;
			this.matchTimes = BetArr[0].matchTime;
			this.totalNum = getTotalNum(payid, BetArr);
			this.getUserInfo();
			this.checkIsWx();
		},
		mounted() {

		},
		beforeRouteEnter(to, from, next) {
			if (from.matched.length > 0) {
				var lint = from.matched[0].name + 'pay'
				if (to.name == lint) {
					var arr = getSession('arr');
					if (arr) {
						next();
					} else {
						window.history.go(-1);
					}
				} else {
					next();
				}
			} else {
				next();
			}
		},
		beforeRouteLeave(to, from, next) {
			var _this = this
			if (this.RouteLeave || to.name == 'goucai_hemai' || to.name == 'agreement') {
				next()
			} else {
				MessageBox({
					title: '',
					message: '返回后所选注单将不保存',
					showCancelButton: true,
					confirmButtonText: '返回',

				}).then(action => {
					if (action == 'confirm') {
						_this.RouteLeave = true
						sessionStorage.removeItem('arr');
						sessionStorage.removeItem('parr');
						next();
					} else {
						next(false)
					}
				})
			}
		},
		updated: function() {
			this.payMoney = this.totalNum * 2 * this.multiple;

		},
		destroyed() {

		},
		methods: {
			showbox: function(msg) {
				this.RouteLeave = true;
				this.logok = msg;
			},
			paylogok: function(msg) {
				this.logok = msg;
			},
			payPopupC: function(msg) {
				this.payPopup = msg;
			},
			RouteLeaveC: function(msg) {
				this.RouteLeave = msg;
			},
			moneyTypeC: function(msg) {
				this.moneyType = msg;
			},
			logokbtn1: function() { //前往实名
				this.RouteLeave = true;
				this.logok = false;
				this.$router.push({
					name: 'userinfo_task_real'
				})
			},
			logokbtn2: function() { //取消实名
				this.logok = false;
			},
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
						}

					})
					.catch(err => {
						this.$ajax.timeout = 50000;
						console.log(err);
					})
			},
			hidepayRecharge: function() {
				let dompayRecharge = document.querySelector('#payRecharge');
				animation(dompayRecharge, 'left', 100)
			},
			hidepayPopup: function() {
				this.payPopup = false;
				this.hongbaoType = false;
				this.cashdianjiChonse = false;
				let bottomDom = document.querySelector('#payPopup');
				let bottomDomInitial = window.getComputedStyle(bottomDom).height.replace('px', '') * 1 * -1;
				// document.querySelector('#payPopup').style.bottom='-19.5rem';
				let dom = document.querySelector('#payPopup');
				animation(dom, 'bottom', bottomDomInitial)
			},
			recharge_back: function(type) {
				if (type == 1) {
					if (this.opnenBankopen) {
						this.RouteLeave = true;
						this.$router.push({
							name: 'userinfo_recharge'
						})
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
						this.RouteLeave = true;
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
			choseTypeyes: function(type) {
				if (type == 1) {
					if (this.hongbaoType) {
						return false
					}
					this.dianjiChonse = true;
					this.moneyType = 'COINS';
					this.cashdianjiChonse = false;
				} else {
					if (this.cashType) {
						return false
					}
					this.dianjiChonse = false;
					this.cashdianjiChonse = true;
					this.moneyType = 'LOTTERYMONEY';
				}
			},
			getUserInfo: function(money, type) {
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
				data = this.Encrypt({...data});
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});

				this.$ajax.post('/caipiaoshouye/index.php/home/index/getUserInfo',
						datas
					)
					.then(res => {

						var content = JSON.parse(res.data.content);
						console.log(JSON.stringify(content));
						if (res.data.status != "200") {

							return;
						} else {
							if (content.code == "100000") {
								var cashMoney = content.data.money * 1;
								var coinsMoney = content.data.coinsMoney * 1;
								this.cashMoney = cashMoney;
								this.coinsMoney = coinsMoney;

							} else if (content.code == "201010") {
								Toast("账户已被锁定，请联系客服");
								setCookie('newData', '', '0-S');
								this.$router.push({
									name: 'login'
								})
							}
						}
					})
					.catch(err => {
						console.log(err);
					})

			},
			closeWins: function() {
				this.$router.go(-1);
			},
			open_hemai: function() {
				let Fnumber = parseInt(this.totalNum) * parseInt(this.multiple) * 2;
				if(this.multiple<1){
				  this.multiple=1;
				  Toast("投注倍数不得小于1倍!");
				  return false;
				}
				if (Fnumber < 1) {
					Toast("请至少选择一注!");
					return false;
				}
				if(!this.Userprotocol){
					Toast("请阅读并勾选委托投注规则！");
					return false;
				}
				this.moneyType = 'LOTTERYMONEY';
				var data = this.setData(this.lcbList, this.multiple, this.totalNum, this.playType);
				let dataes = this.Qs.stringify({
					data
				});
				console.log(data['ticketContent']);
				sessionStorage.setItem('hemaiData', dataes)
				let playType = this.playType
				let path, lotteryTypeKey;
				if (playType == 0) {
					path = "jc/lczc";
					lotteryTypeKey = "lczc";
				} else if (playType == 1) {
					path = "jc/sfzc";
					lotteryTypeKey = "sfzc";
				} else if (playType == 2) {
					path = "jc/sfzc";
					lotteryTypeKey = "sfzc";
				} else if (playType == 3) {
					path = "jc/sczc";
					lotteryTypeKey = "sczc";
				}
				this.RouteLeave = true
				this.$router.push({
					path: '/goucai/goucai_hemai',
					query: {
						'pageName': path,
						'Fnumber': Fnumber,
						'payid': lotteryTypeKey,
					}
				})
			},
			JumpUserprotocol: function() {
				this.RouteLeave = true
				this.$router.push({
					name: 'agreement'
				})
			},
			addList: function() {
				console.log(this.lcbList)
				for (let i = 0; i < this.lcbList.length;) {
					if (!this.lcbList[i].listSelect) {
						this.lcbList.splice(i, 1);
					} else {
						i++
					}
				}
				setSession('arr', this.lcbList);
				this.RouteLeave = true
				this.$router.go(-1);
			},
			modifyBetting: function(idx, key) {
				let state = this.lcbList[idx].stateArr[key];
				this.lcbList[idx].stateArr[key] = !state;
				this.totalNum = getTotalNum(this.playType, this.lcbList);
				let playType = this.playType;
				let fhz = 0,
					fhk = 0;
				if (playType == 0) {
					for (var i = 0; i < 3; i++) {
						if (this.lcbList[idx].stateArr['b' + i]) {
							fhz++
						}
						if (this.lcbList[idx].stateArr['q' + i]) {
							fhk++
						}
					}
					if (fhz == 0 || fhk == 0) {
						this.lcbList[idx].listSelect = false
					} else {
						this.lcbList[idx].listSelect = true
					}
				} else if (playType == 1) {
					for (var i = 0; i < 3; i++) {
						if (this.lcbList[idx].stateArr['b' + i]) {
							fhz++
						}
					}
					if (fhz == 0) {
						this.lcbList[idx].listSelect = false
					} else {
						this.lcbList[idx].listSelect = true
					}
				} else if (playType == 2) {
					for (var i = 0; i < 3; i++) {
						if (this.lcbList[idx].stateArr['b' + i]) {
							fhz++
						}
					}
					if (fhz == 0) {
						this.lcbList[idx].listSelect = false
					} else {
						this.lcbList[idx].listSelect = true
					}
				} else if (playType == 3) {
					for (var i = 0; i <= 3; i++) {
						if (this.lcbList[idx].stateArr['z' + i]) {
							fhz++
						}
					}
					for (var i = 0; i <= 3; i++) {
						if (this.lcbList[idx].stateArr['k' + i]) {
							fhk++
						}
					}
					if (fhz == 0 || fhk == 0) {
						this.lcbList[idx].listSelect = false
					} else {
						this.lcbList[idx].listSelect = true
					}
				}
				setSession('arr', this.lcbList);
			},
			// 键盘操作
			increase: function() {
				if (this.multiple < 9999) {
					this.multiple = this.multiple * 1 + 1 + ''
				}
			},
			reduce: function() {
				if (this.multiple > 1) {
					this.multiple = this.multiple * 1 - 1 + ''
				}
			},
			keyinputidx: function(idx) {
				let mun = ''
				if (this.multiple == '0') {
					mun = idx
				} else if (this.coverage) {
					mun = idx;
					this.coverage = false;
				} else {
					mun = this.multiple + idx
				}
				if (parseInt(mun) < 10000 && parseInt(mun) > 0) {
					this.multiple = mun
				} else if (parseInt(mun) > 9999) {
					this.multiple = '9999'
				} else {
					this.multiple = '0'
				}
			},
			keybackspace: function() {
				this.coverage = false;
				let mun = this.multiple
				if (mun.length > 1) {
					this.multiple = mun.slice(0, -1)
				} else {
					if (parseInt(mun) != 0) {
						if (parseInt(mun) > 1) {
							this.multiple = '1'
						} else {
							this.multiple = '0'
						}
					}
				}
			},
			closekeyboard: function() {
				this.showkeyboard = false;
				if (this.multiple == '0') {
					this.multiple = '1'
				}
			},
			onStringnumber: function(idx) {
				let state = this.Stringnumber[idx].state
				if (state) {
					state = false
				} else {
					state = true
				}
				this.Stringnumber[idx].state = state
			},
			StringnumberSure: function() {
				this.showMask = false

			},
			onUserprotocol: function() {
				if (this.Userprotocol) {
					this.Userprotocol = false
				} else {
					this.Userprotocol = true
				}
			},
			deleteList: function() {
				MessageBox({
					title: '',
					message: '您确定要清空当前投注内容吗',
					showCancelButton: true,
				}).then(action => {
					if (action == 'confirm') {
						this.lcbList = [];
						this.totalNum = 0;
						sessionStorage.removeItem('arr');
						sessionStorage.removeItem('parr')
						this.RouteLeave = true
						this.$router.go(-1)
					} else {

					}
				})
			},
			opnenRecharge: function() {
				if (getCookie('logok')) { //判断是否实名
					this.logok = true;
					return false;
				}
				// document.querySelector('#payRecharge').style.left=0;
				let dompayRecharge1 = document.querySelector('#payRecharge');
				animation(dompayRecharge1, 'left', 0)
			},
			onpay: function() {
				if (!this.Userprotocol) {
					Toast('请阅读并勾选委托投注规则');
					return false;
				}
				if (parseInt(this.totalNum) < 1) {
					Toast('注数不能小于1注！');
					return false;
				}
				if (parseInt(this.multiple) < 1) {
					this.multiple=1;
					Toast('投注倍数不能小于1倍！');
					return
				}
				this.payPopup = true;
				// var dom=document.querySelector('#payPopup')
				// animation(dom,'bottom',0)
				// if(this.coinsMoney<this.totalNum * 2 * this.multiple ){
				// 	this.hongbaoType=true;
				// }else{
				// 	this.hongbaoType=false;
				// }
				// if(this.cashMoney<this.totalNum * 2 * this.multiple ){
				// 	this.cashType=true;
				// }else{
				// 	this.cashType=false;
				// }
				// if(!this.hongbaoType){
				// 	this.dianjiChonse=true;
				// 	this.moneyType='COINS';
				// }else if(!this.cashType&&this.hongbaoType){
				// 	this.cashdianjiChonse=true;
				// 	this.moneyType='LOTTERYMONEY';
				// }
				// let hongbaobianxian=this.totalNum*1 * 2 * this.multiple*1 *20/100;
				// if(this.coinsMoney<0.4){
				// 	hongbaobianxian=0.00;
				// }else if(this.coinsMoney<=hongbaobianxian){
				// 	hongbaobianxian=this.coinsMoney;
				// }
				// this.hongbaobianxian=hongbaobianxian;
				if(this.playType==0||this.playType==2||this.playType==3){
					this.moneyType='LOTTERYMONEY';
				}//胜负彩 四场 六场时只能现金

			},
			paybtn: function() {
				this.payPopup = false;
				let playType = this.playType
				let path;
				let lotteryTypeKey;
				var numtype;
				if (playType == 0) {
					path = "jc/lczc";
					lotteryTypeKey = "lczc";
					numtype = 10;
				} else if (playType == 1) {
					path = "jc/sfzc";
					lotteryTypeKey = "rxjc";
					numtype = 28;
				} else if (playType == 2) {
					path = "jc/sfzc";
					lotteryTypeKey = "sfzc14";
					numtype = 9;
				} else if (playType == 3) {
					path = "jc/sczc";
					lotteryTypeKey = "sczc";
					numtype = 11;
				}
				if(this.playType==0||this.playType==2||this.playType==3){
					this.moneyType='LOTTERYMONEY';
				}//胜负彩 四场 六场时只能现金
				let data = this.setData(this.lcbList, this.multiple, this.totalNum, this.playType);
				if (data === false) {
					return false;
				}
				let _data = {...data};
				console.log(_data);//eas加密
				data = this.Encrypt(_data);
				console.log(data);//eas加密
				let dataes = this.Qs.stringify({
					path: path,
					data: data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/createScheme', dataes).then(ret => {
					if (ret.status == 200) {
						let content = JSON.parse(ret.data.content);
						if (content.code == 100000) {
							var datacontent = this.setData(this.lcbList, this.multiple, this.totalNum, this.playType)['content'];
							var data = [];
							var myDate = new Date();
							myDate = getTime(myDate, 2);
							var CitySN;
							if (getSession('equipmentIp')) {
								CitySN = getSession('equipmentIp');
							}
							// obj.id=;
							data["mid"] = 1;
							data["lotteryType"] = numtype;
							data['periodNumber'] = '';
							data["shareType"] = 1;
							data["shareTime"] = myDate;
							data["uid"] = getCookie('newData').userid;
							data["multiple"] = this.multiple;
							data["schemeCost"] = this.totalNum * this.multiple * 2;
							data["subscriptionMoney"] = this.totalNum * this.multiple * 2;
							data["content"] = datacontent;
							data['prizeAwards'] = '';
							data["quipmentiIp"] = CitySN; //投注IP 
							data["quipmentTeype"] = 10; // 投注设备类型
							data["quipmentNumber"] = ''; //投注设备号
							data["quipmentUid"] = getCookie('newData').userid; // 投注UID
							data["quipmentOrderId"] = content.data.schemeNumber;
							let object = {...data}
							setSession('obj', object);
							sessionStorage.removeItem('arr');
							sessionStorage.removeItem('parr');
							setSession('moneyType', this.moneyType);
							this.RouteLeave = true
							this.$router.push({
								path: '/goucai/goucai_success',
								query: {
									success: lotteryTypeKey,
									schemeId: content.data.schemeId,
									wcj_totalPrice: this.totalNum * 2 * this.multiple,
									from: 'pay',
									types: 'jingji',
									moneyType: this.moneyType
								}
							})
						} else {
							alert(content.message);
						}
					} else {
						alert('网络错误！')
					}
				}).catch(err => {
					console.log(err)
				})
			},
			//付款参数
			setData: function(arr, multiple, totalNum, playType) {
				let uid = getCookie('newData').userid;
				let data = [];
				if (arr.length == 0) {
					Toast('请选择比赛');
					return false;
				}
				//拼接uid
				data.userId = uid;
				//方案描述
				data.description = "";
				data.mode = "COMPOUND";
				//方案保密类型
				data.secretType = "FULL_PUBLIC";
				//自购|合买
				data.shareType = "SELF";
				//过关模式
				data.passMode = "PASS";
				if (playType == 0) {
					data.lotteryType = 'LCZC';
				} else if (playType == 1) {
					data.lotteryType = 'SFZC';
				} else if (playType == 2) {
					data.lotteryType = 'SFZC'
				} else if (playType == 3) {
					data.lotteryType = 'LCZC'
				}
				//方案类型
				//data.schemeType="MULTIPLE_PASS";
				//方案认购许可类型
				//data.subscriptionLicenseType="PUBLIC_LICENSE";
				//是否奖金优化
				data.prizeOptimizing = false;
				//期编号
				data.periodId = parseInt(arr[0].periodId);
				//投注倍数
				data.multiple = multiple;
				//方案注数
				data.units = totalNum;
				//方案金额
				let schemeCost = multiple * totalNum * 2;
				data.schemeCost = schemeCost;
				if (playType == 0) {
					let content = [];
					for (let i = 0; i < arr.length; i++) {
						let con = [];
						con.lineId = arr[i].lineId;
						let half = [];
						if (arr[i].stateArr.b0) {
							half.push("3")
						}
						if (arr[i].stateArr.b1) {
							half.push("1")
						}
						if (arr[i].stateArr.b2) {
							half.push("0")
						}
						con.half = half;
						let full = [];
						if (arr[i].stateArr.q0) {
							full.push("3")
						}
						if (arr[i].stateArr.q1) {
							full.push("1")
						}
						if (arr[i].stateArr.q2) {
							full.push("0")
						}
						con.full = full;
						if (full.length > 0 || half.length > 0) {
							content.push({...con});
						}
					}
					if (content.length == 0) {
						return "noc";
					}
					data.content = content;
				} else if (playType == 1) {
					data.lotteryType = "SFZC";
					data.playType = 'SFZC9';
					let content = [];
					for (var v = 0; v < arr.length; v++) {
						if (arr[v].stateArr.b0 || arr[v].stateArr.b1 || arr[v].stateArr.b2) {

						} else {
							arr.splice(v, 1);
						}
					}
					for (let i = 0; i < arr.length; i++) {
						let con = [];
						let betsResult = [];
						con.dan = false;
						con.lineId = arr[i].lineId;
						let value = [];
						if (arr[i].stateArr.b0) {
							value.push('3')
						}
						if (arr[i].stateArr.b1) {
							value.push('1')
						}
						if (arr[i].stateArr.b2) {
							value.push('0')
						}
						for (let k = 0; k < value.length; k++) {
							betsResult.push(value[k]);
						}
						con.betsResult = betsResult;
						content.push({...con});
					}
					if (content.length == 0) {
						return "noc";
					}
					data.content = content;
				} else if (playType == 2) {
					data.lotteryType = "SFZC";
					data.playType = 'SFZC14';
					let content = [];
					for (let i = 0; i < arr.length; i++) {
						let con = [];
						con.dan = false;
						con.lineId = arr[i].lineId;
						let betsResult = [];
						let value = [];
						if (arr[i].stateArr.b0) {
							value.push('3')
						}
						if (arr[i].stateArr.b1) {
							value.push('1')
						}
						if (arr[i].stateArr.b2) {
							value.push('0')
						}
						for (let k = 0; k < value.length; k++) {
							betsResult.push(value[k]);
						}
						con.betsResult = betsResult;
						content.push({...con});
					}
					if (content.length == 0) {
						return "noc";
					}
					data.content = content;
				} else if (playType == 3) {
					let content = [];
					for (let i = 0; i < arr.length; i++) {
						let con = [];
						con.lineId = arr[i].lineId;
						let home = [];
						if (arr[i].stateArr.z0) {
							home.push("0")
						}
						if (arr[i].stateArr.z1) {
							home.push("1")
						}
						if (arr[i].stateArr.z2) {
							home.push("2")
						}
						if (arr[i].stateArr.z3) {
							home.push("3")
						}
						con.home = home;

						let guest = [];
						if (arr[i].stateArr.k0) {
							guest.push("0")
						}
						if (arr[i].stateArr.k1) {
							guest.push("1")
						}
						if (arr[i].stateArr.k2) {
							guest.push("2")
						}
						if (arr[i].stateArr.k3) {
							guest.push("3")
						}
						con.guest = guest;
						if (home.length > 0 || guest.length > 0) {
							content.push({...con});
						}
					}
					if (content.length == 0) {
						return "noc";
					}
					data.content = content;
				}
				//币种
				data.moneyType = this.moneyType;
				return data;
			}
		},
		filters: {
			capitalize: function(matchDate, num) { //时间处理
				var time = new Date(matchDate);
				var y = time.getFullYear();
				var m = time.getMonth() + 1 >= 10 ? parseInt(time.getMonth() + 1) : "0" + parseInt(time.getMonth() + 1);
				var d = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
				var h = time.getHours() >= 10 ? time.getHours() : "0" + time.getHours();
				var mm = time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes();
				var s = time.getSeconds() >= 10 ? time.getSeconds() : "0" + time.getSeconds();
				var dd = time.getDay();
				switch (dd) {
					case 0:
						dd = "日";
						break;
					case 1:
						dd = "一";
						break;
					case 2:
						dd = "二";
						break;
					case 3:
						dd = "三";
						break;
					case 4:
						dd = "四";
						break;
					case 5:
						dd = "五";
						break;
					case 6:
						dd = "六";
						break;
				}
				if (num == 1) {
					return m + "-" + d + " " + h + ":" + mm;
				} else if (num == 2) {
					return h + ":" + mm;
				} else if (num == 3) {
					return h + ":" + mm;
				} else {
					return y + "-" + m + "-" + d + " " + '星期' + dd;
				}
			}
		}
	}

	//注数计算
	function getTotalNum(playType, lcbList) {
		let totalNum = 1;
		if (playType == 3) {
			for (let i = 0; i < lcbList.length; i++) {
				let ctu = 0,
					cto = 0;
				for (let j = 0; j < 4; j++) {
					if (lcbList[i].stateArr['z' + j]) {
						ctu++
					}
				}
				for (let j = 0; j < 4; j++) {
					if (lcbList[i].stateArr['k' + j]) {
						cto++
					}
				}
				totalNum = totalNum * ctu * cto
			}
		} else if (playType == 0) {
			for (let i = 0; i < lcbList.length; i++) {
				let ctu = 0,
					cto = 0;
				for (let j = 0; j < 3; j++) {
					if (lcbList[i].stateArr['b' + j]) {
						ctu++
					}
				}
				for (let j = 0; j < 3; j++) {
					if (lcbList[i].stateArr['q' + j]) {
						cto++
					}
				}
				totalNum = totalNum * ctu * cto
			}
		} else if (playType == 2) {
			for (let i = 0; i < lcbList.length; i++) {
				let ctu = 0
				for (let j = 0; j < 3; j++) {
					if (lcbList[i].stateArr['b' + j]) {
						ctu++
					}
				}
				totalNum *= ctu
			}
		} else {
			let totalArr = []
			for (let i = 0; i < lcbList.length; i++) {
				let ctu = 0;
				for (let j = 0; j < 3; j++) {
					if (lcbList[i].stateArr['b' + j]) {
						ctu++;
					}
				}
				totalArr.push(ctu);
			}
			if (totalArr.length < 9) {
				totalNum = 0;
			} else {
				totalNum = 0;
				for (let k = 0; k < totalArr.length; k++) {
					for (let j = k; j < totalArr.length; j++) {
						for (let l = j; l < totalArr.length; l++) {
							for (let z = l; z < totalArr.length; z++) {
								for (let x = z; x < totalArr.length; x++) {
									for (let c = x; c < totalArr.length; c++) {
										for (let v = c; v < totalArr.length; v++) {
											for (let b = v; b < totalArr.length; b++) {
												for (let n = b; n < totalArr.length; n++) {
													if (k != j && j != l && l != z && z != x && x != c && c != v && v != b && b != n) {
														totalNum += totalArr[k] * totalArr[j] * totalArr[l] * totalArr[z] * totalArr[x] * totalArr[c] * totalArr[
															v] * totalArr[b] * totalArr[n];
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		return totalNum
	}
</script>

<style scoped>
	@import "../../css/goucai_jjcpay.css";

	header {
		position: fixed;
	}

	.jjc_bjdcpay {
		margin-top: 2.25rem;
	}

	.c-red {
		background-color: #fb6b63 !important;
		border: 1px solid #E45B54 !important;
	}

	.c-hui {
		background-color: #c4c4c4 !important;
	}

	.c-grey {
		background-color: #C9C9C9 !important;
		line-height: 0.5rem !important;
	}

	.dis-no {
		display: none !important;
	}
</style>
