<template>
	<div>
<!-- 		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" tapmode @click="closeWindos()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">大乐透</div>
			<div class="fgr hm_top" tapmode @click="open_hemai()">
				<span><img src="../../assets/goucai/jjc/icon_flagre.png" /></span>
				<span>发起合买</span>
			</div>
		</header> -->
	
  <header class="aui-bar aui-bar-nav">
      <div class="aui-pull-left aui-btn" tapmode @click="closeWindos()">
        <span class="aui-iconfont aui-icon-left"></span>
      </div>
      <div>
        <div class="aui-title"  tapmode>大乐透
		 <span v-if="datotype=='normal'" class="type">普通</span>
		 <span v-else class="type">胆拖</span>
		</div>
      </div>
      <div class="aui-pull-right aui-btn top-more" @click="open_hemai()" tapmode>
        发起合买
      </div>
  </header>

		<div id="mc_dltpay" v-cloak>
			<!-- 顶部期数 -->
			<div class="szcpay_head">
				<p><span>第{{current}}期</span><span class="jiez">{{endedTime}}截止</span></p>
			</div>
			<!-- 注数 -->
			<div class="zhus_nav">
				<div @click='randomone'>+随机一注</div>
				<div @click='randomfive'>+随机五注</div>
				<div @click='continueNum'>+继续选号</div>
			</div>
			<!-- 红包返现 -->
			<div class="szchn_head">
				<div>现金投注即返<i>5%</i>的现金&nbsp;&nbsp;本次投注可返现金<i>{{((noteNum*2+Userprotocolzhuijia*noteNum)*qishu*multiple*0.05).toFixed(2)}}</i>元</div>
				<!-- <img  @click="hongbaogzbox" src="../../assets/goucai/jjc/hbwenhao.png" /> -->
			</div>
			<!-- 内容 -->
			<div class="ssqpay">
				<div class="cont" v-for='(d,i) in dltBetArr'>
					<div class="shanc" @click='deletes(i)'><img src="../../assets/goucai/jjc/close_btnre.png" /> </div>
					<div class="xuanh" v-if='d.type=="normal"' @click='compileNum(i)'>
						<div class="hao"><span v-for='red in d.redQiu'>
								<i v-if="red>9" class="dayu">{{red}}</i>
								<i v-else class="dayu">0{{red}}</i>
							</span><span class="blue" v-for='(blue,iq) in d.blueQiu' :class="{ 'mgr-lf': iq==0 }">
								<i v-if="blue>9" class="dayu">{{blue}}</i>
								<i v-else class="dayu">0{{blue}}</i>
							</span></div>
						<p><span>单式投注<i> {{d.totalNum}}</i>注</span><span>共<i> {{d.totalPrice}} </i>元</span></p>
					</div>
					<div class="xuanh" v-else @click='compileNum(i)'>
						<div class="hao"><span v-for='Dred in d.redDanArr'>
								<i v-if="Dred>9" class="dayu">{{Dred}}</i>
								<i v-else class="dayu">0{{Dred}}</i>
							</span><i>_</i><span v-for='Tred in d.redTuoArr'>
								<i v-if="Tred>9" class="dayu">{{Tred}}</i>
								<i v-else class="dayu">0{{Tred}}</i>
							</span>
							<span class="blue" v-for='(blue,iq) in d.blueDanArr' :class="{ 'mgr-lf': iq==0 }">
								<i v-if="blue>9" class="dayu">{{blue}}</i>
								<i v-else class="dayu">0{{blue}}</i>
							</span><i>_</i><span class="blue" v-for='(Tblue,iq) in d.blueTuoArr'>
								<i v-if="Tblue>9" class="dayu">{{Tblue}}</i>
								<i v-else class="dayu">0{{Tblue}}</i>
							</span>
						</div>
						<p><span>胆拖投注<i> {{d.totalNum}}</i>注</span><span>共<i> {{d.totalPrice}} </i>元</span></p>
					</div>
					<div class="jiant" @click='compileNum(i)'></div>
				</div>
			</div>

			<!-- 底部倍数 -->
			<div class="bottom">
				<div class="agreedlt">
					<div class="check"><i :class="[ 'flr' , { 'active': Userprotocol }]" @click="onUserprotocol"></i>
						<p>我已阅读并同意<span @click="JumpUserprotocol()">《委托投注规则》</span></p>
					</div>
				</div>
				<div class="agreedlt zhuijia">
					<div class="check"><i :class="[ 'flr' , { 'active': Userprotocolzhuijia==1 }]" @click="onUserprotocolzhuijia"></i>
						<p>全部追加<span>每注追加1元，最多可中1800万元</span></p>
					</div>
				</div>
				<div class="bt_text">
					<div class="zhuiq flr">
						<div class="flr word_z">追 </div>
						<div class="flr multiple">
							<div class="jian flr" @click="reduce_qs"></div>
							<div class="beishu flr" @click=" showkeyboard = true,keyboardAsc = 0 ,coverage=true"><span>{{ qishu }}</span></div>
							<div class="jia flr" @click="increase_qs"></div>
						</div>
						<div class="flr word_q"> 期</div>
					</div>
					<div class="toub fgr">
						<div class="flr word_t">投</div>
						<div class="flr multiple">
							<div class="jian flr" @click="reduce"></div>
							<div class="beishu flr" @click=" showkeyboard = true,keyboardAsc = 1 ,coverage=true"><span>{{ multiple }}</span></div>
							<div class="jia flr" @click="increase"></div>
						</div>
						<div class="flr word_b">倍</div>
					</div>
				</div>
				<div v-if='qishu > 1' class="tingz"><span tapmode @click="xuanZ" class=" xuanz" :class="{active:xuanz}"></span>中奖后停止追号</div>
				<footer>
					<div class="ft_money flr">
						<p>合计金额：<span>¥{{((noteNum*2+Userprotocolzhuijia*noteNum)*qishu*multiple).toFixed(2)}}</span></p>
						<p class="p2"><span>{{noteNum}}</span>注<span>{{multiple}}</span>倍<span>{{qishu}}</span>期</p>
					</div>
					<div class="ft_btn fgr">
						<div class="flr" tapmode >

						</div>
						<div class="flr" tapmode @click="openSuccessWin()">付款</div>
					</div>
				</footer>
<!-- 				<footer>
					<div class="delete flr" @click='deleteAll'></div>
					<div class="total flr">
						<p>共<span>{{(noteNum*2+Userprotocolzhuijia*noteNum)*qishu*multiple}}</span>元</p>
						<p class="p2"><span>{{noteNum}}</span>注<span>{{multiple}}</span>倍<span>{{qishu}}</span>期</p>
					</div>
					<div class="pay fgr" tapmode @click="openSuccessWin()">付款</div>
				</footer> -->
			</div>
			<!-- 模拟数字键盘 -->
			<div v-if="showkeyboard" class="keyboard">
				<div class="hidekey" @click="closekeyboard"></div>
				<div class="cont-f">
					<div class="bt_text">
						<div class="zhuiq flr">
							<div class="flr word_z">追 </div>
							<div class="flr multiple">
								<div class="jian flr" @click="reduce_qs"></div>
								<div :class="['beishu', 'flr', { 'selec': keyboardAsc == 0 }]" @click="keyboardAsc = 0,coverage=true"><span>{{ qishu }}</span></div>
								<div class="jia flr" @click="increase_qs"></div>
							</div>
							<div class="flr word_q"> 期</div>
						</div>
						<div class="toub fgr">
							<div class="flr word_t">投</div>
							<div class="flr multiple">
								<div class="jian flr" @click="reduce"></div>
								<div :class="['beishu', 'flr', { 'selec': keyboardAsc == 1 }]" @click="keyboardAsc = 1,coverage=true"><span>{{ multiple }}</span></div>
								<div class="jia flr" @click="increase"></div>
							</div>
							<div class="flr word_b">倍</div>
						</div>
					</div>
				<footer>
					<div class="ft_money flr">
						<p>合计金额：<span>¥{{((noteNum*2+Userprotocolzhuijia*noteNum)*qishu*multiple).toFixed(2)}}</span></p>
						<p class="p2"><span>{{noteNum}}</span>注<span>{{multiple}}</span>倍<span>{{qishu}}</span>期</p>
					</div>
					<div class="ft_btn fgr">
						<div class="flr" tapmode >

						</div>
						<div class="flr" tapmode @click="openSuccessWin()">付款</div>
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
        <module-pay :sqishu='qishu' :payPopupP='payPopup' :payMoneyP='(noteNum*2+Userprotocolzhuijia*noteNum)*qishu*multiple' :coinsMoneyP='coinsMoney' :cashMoneyP='cashMoney'
         :opnenWeixinP='opnenWeixin' :opnenBankopenP='opnenBankopen' :hasHongbaoP='true' :typeName='"大乐透"' @payPopupC="payPopupC" @RouteLeaveC='RouteLeaveC'
         @paybtn='paybtn' @paylogok='paylogok' @moneyTypeC='moneyTypeC'>
        </module-pay>
		<checkok-nav :logokz='logok' @showbox="showbox"></checkok-nav>
		<homngbaogz :hongbaogz='hongbaogz' @hongbaogzbox="hongbaogzbox"></homngbaogz>
	</div>
</template>

<script>
	var caiPiao;
	import checkokNav from '../../common/checkok.vue';
	import homngbaogz from '../../common/homngbaogz.vue';
	import modulePay from '../../common/modulepay.vue';
	import {
		getSession,
		setSession,
		getCookie,
		getTime,
		animation,
		getfactorial,
		compare
	} from '../../js/common.js';
	 
	import {
		Toast,
		MessageBox
	} from 'mint-ui';
	export default {
		components: {
			checkokNav,
			modulePay,
			homngbaogz
		},
		data() {
			return {
				logok: false, //未实名标志
				'content': [],
				dltBetArr: [],
				current: '',
				playType: 'normal',
				endedTime: '',
				'pageParam': '',
				'showkeyboard': false,
				'Userprotocol': true,
				Userprotocolzhuijia: 0,
				'showMask': false,
				'zhuihDom': false,
				'totalNum': 0,
				'noteNum': 0,
				'multiple': 1,
				'qishu': 1,
				'keyboardAsc': 0,
				coverage:true,//键盘第一次唤起
				xuanz: true,
				'RouteLeave': false,
				fromHome: '',
				coinsMoney: 0, //红包余额
				cashMoney: 0, //现金余额
				payPopup: false, //红包弹窗
				dianjiChonse: true, //选择红包
				cashdianjiChonse: false, //选择现金
				hongbaoType: false, //红包余额是否充足
				cashType: false, //现金余额是否充足
				opnenWeixin: false, //微信是否开放
				opnenBankopen: false, //银行卡是否开放
				hongbaobianxian: 0,
				moneyType: "COINS",
				payMoney:0,
				sjhongbao: 0,
			    hongbaogz:false,
				datotype:''

			};
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
			if (this.RouteLeave || to.name == 'goucai_hemai' || to.name == 'agreement' || this.dltBetArr.length == 0) {
				next()
			} else {
				if (this.fromHome && this.fromHome == 'home') {
					sessionStorage.removeItem('arr');
					sessionStorage.removeItem('continue');
					sessionStorage.removeItem('index')
					next()
				} else if (caiPiao == 'doubleEntry') {
					MessageBox({
						title: '',
						message: '是否放弃本次投注？',
						showCancelButton: true,
						closeOnClickModal:false
					}).then(action => {
						if (action == 'confirm') {
							sessionStorage.removeItem('arr');
							sessionStorage.removeItem('continue');
							sessionStorage.removeItem('index')
							next()
						} else {
                           next(false)
						}
					})
				} else if (caiPiao == 'unitary' && this.dltBetArr.length == 5) {
					MessageBox({
						title: '',
						message: '是否放弃本次投注？',
						showCancelButton: true,
						closeOnClickModal:false
					}).then(action => {
						if (action == 'confirm') {
							sessionStorage.removeItem('arr');
							sessionStorage.removeItem('continue');
							sessionStorage.removeItem('index')
							next()
						} else {
                              next(false)
						}
					})
				}else {
					MessageBox({
						title: '',
						message: '是否保存当前注单',
						showCancelButton: true,
						closeOnClickModal:false
					}).then(action => {
						if (action == 'confirm') {
							setSession('continue', 'continue')
							next()
						} else {
							sessionStorage.removeItem('arr');
							sessionStorage.removeItem('continue');
							sessionStorage.removeItem('index')
							next()
						}
					})
				}
			}
		},
		created() {
			let arr = getSession('arr');
			this.dltBetArr = this.dltBetArr.concat(arr);
			this.zhuNum(this.dltBetArr);
			this.playType = this.$route.query.type;
			this.fromHome = this.$route.query.fromHome;
			this.datotype= getSession('datotype');
			if (this.dltBetArr[0].totalNum == 1) {
				caiPiao = 'unitary'
			} else {
				caiPiao = 'doubleEntry'
			}
			this.setTime();
			this.getUserInfo();
			this.checkIsWx();
		},
		watch: {
			coinsMoney: function() {
				this.sjhongbaostr();
			}
		},
		updated: function() {
			this.payMoney = this.noteNum * 2 * this.multiple * this.qishu;
			this.$nextTick(function() {
				this.sjhongbaostr();
			})
		},
		methods: {
			sjhongbaostr: function() {
			let hongbaobianxian = (this.noteNum * 1 * 2 + this.Userprotocolzhuijia * this.noteNum) * this.qishu * 1 * this.multiple * 20 / 100;
			if (this.coinsMoney < 0.4) {
				hongbaobianxian = 0.00;
			} else if (this.coinsMoney <= hongbaobianxian) {
				hongbaobianxian = this.coinsMoney;
			}
			
		 this.sjhongbao = hongbaobianxian;
			},
			hongbaogzbox:function(msg){
				this.RouteLeave = true;
				this.hongbaogz = msg;
			},
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
				console.log(msg);
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
			JumpUserprotocol: function() {
				this.RouteLeave = true;
				this.$router.push({
					name: 'agreement'
				})
			},
			open_hemai: function() {
				if(this.multiple<1){
				  this.multiple=1;
				  Toast("投注倍数不能小于1倍!");
				  return false;
				}
				if (!this.Userprotocol) {
					Toast('请阅读并勾选委托投注规则！');
					return
				}
				if (parseInt(this.noteNum) < 1||parseInt(this.multiple) < 1) {
					Toast('注数不能小于1注！');
					return
				}
				if (this.qishu > 1) {
					this.qishu=1;
					Toast("暂不支持追期合买!");
					return false;
				}
				if (this.qishu < 1) {
					this.qishu=1;
					Toast("投注期数不能为0!");
					return false;
				}
				let Fnumber = (this.noteNum * 2 + this.Userprotocolzhuijia * this.noteNum) * this.multiple;
				this.moneyType = 'LOTTERYMONEY';
				var data = this.setData(this.payid);
				let dataes = this.Qs.stringify({
					data
				});
				sessionStorage.setItem('hemaiData', dataes);
				this.RouteLeave = true;
				this.$router.push({
					path: '/goucai/goucai_hemai',
					query: {
						'pageName': "number/lows/dlt",
						'Fnumber': Fnumber,
						payid: 'dlt',
						periodNumber: this.current,
					}
				})
			},
			closeWindos: function() {
				this.$router.go(-1)
				/* MessageBox({
					title: '',
					message: '是否保存当前注单',
					showCancelButton: true,
				}).then(action => {
					if (action == 'confirm') {
						setSession('continue', 'continue')
						this.$router.go(-1)
					} else {
						sessionStorage.removeItem('arr');
						sessionStorage.removeItem('continue');
						sessionStorage.removeItem('index')
						this.$router.go(-1)
					}
				}) */

			},
			// 键盘操作
			increase: function() {
				if (this.multiple < 999) {
					this.multiple = this.multiple * 1 + 1 + ''
				}
			},
			reduce: function() {
				if (this.multiple > 1) {
					this.multiple = this.multiple * 1 - 1 + ''
				}
			},
			increase_qs: function() {
				if (this.qishu < 50) {
					this.qishu = this.qishu * 1 + 1 + ''
				}
				this.zhuihDom = true
			},
			reduce_qs: function() {
				if (this.qishu > 1) {
					this.qishu = this.qishu * 1 - 1 + ''
				}
				if (this.qishu == 1) {
					this.zhuihDom = false
				}
			},
			xuanZ: function() {
				this.xuanz = !this.xuanz;
			},
			keyinputidx: function(idx) {
				var mun = '';
				if (this.keyboardAsc == 0) {
					if (this.qishu == '0') {
						mun = idx
					}else if(this.coverage){
						mun = idx;
						this.coverage=false;
					} else {
						mun = this.qishu + idx
					}
					if (parseInt(mun) < 51 && parseInt(mun) > 0) {
						this.qishu = mun
					} else if (parseInt(mun) > 50) {
						this.qishu = '50'
					} else {
						this.qishu = '0'
					}
				} else {
					
					if (this.multiple == '0') {
						mun = idx
					}else if(this.coverage){
						mun = idx;
						this.coverage=false;
					}  else {
						mun = this.multiple + idx
					}
					if (parseInt(mun) < 1000 && parseInt(mun) > 0) {
						this.multiple = mun
					} else if (parseInt(mun) > 999) {
						this.multiple = '999'
					} else {
						this.multiple = '0'
					}
				}

			},
			keybackspace: function() {
				this.coverage=false;
				if (this.keyboardAsc == 0) {
					var mun = this.qishu
					if (mun.length > 1) {
						this.qishu = mun.slice(0, -1)
					} else {
						if (parseInt(mun) != 0) {
							if (parseInt(mun) > 1) {
								this.qishu = '1'
							} else {
								this.qishu = '0'
							}
						}
					}
				} else {
					var mun = this.multiple
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
				}

			},
			closekeyboard: function() {
				this.showkeyboard = false;
				if (this.multiple == '0') {
					this.multiple = '1'
				}
				if (this.qishu == '0') {
					this.qishu = '1'
				}
			},
			onStringnumber: function(idx) {
				var state = this.Stringnumber[idx].state
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
			onUserprotocolzhuijia: function() {
				if (this.Userprotocolzhuijia) {
					this.Userprotocolzhuijia = 0
				} else {
					this.Userprotocolzhuijia = 1
				}
			},
			randomone: function() {
				if (caiPiao == 'doubleEntry') {
					Toast('复式投注最多1条');
					return
				}
				if (caiPiao == 'unitary' && this.dltBetArr.length == 5) {
					Toast('单式注单最多5注!');
					return
				}
				// if (parseInt(this.noteNum) >= 100) {
				// 	Toast('注单数量最多100注！');
				// 	return
				// }
				if (this.playType == 'normal') {
					var obj = {};
					//生成蓝色球号码
					var newBlueArr = [];
					if (newBlueArr.length == 0) {
						while (newBlueArr.length < 2) {
							var numb = parseInt(Math.random() * 11 + 1);
							if (newBlueArr.indexOf(numb) < 0) {
								newBlueArr.push(numb);
							}
						}
					}
					//生成5个不重复的1-35的随机数
					var newRedArr = [];
					if (newRedArr.length == 0) {
						while (newRedArr.length < 5) {
							var num = parseInt(Math.random() * 34 + 1);
							if (newRedArr.indexOf(num) < 0) {
								newRedArr.push(num);
							}
						}
					}
					newRedArr.sort(compare);
					obj.type = 'normal';
					obj.totalNum = 1;
					obj.totalPrice = 2;
					obj.current = this.current;
					obj.redQiu = newRedArr;
					obj.blueQiu = newBlueArr;
					this.dltBetArr.push(obj);
					this.zhuNum(this.dltBetArr);
					setSession('arr', this.dltBetArr)
				} else {
					Toast('该玩法不支持随机')
				}


			},
			randomfive: function() {
				if (caiPiao == 'doubleEntry') {
					Toast('复式投注最多1条');
					return
				};
				if (this.playType == 'normal') {
					for (var i = 0; i < 5; i++) {
						if (caiPiao == 'unitary' && this.dltBetArr.length == 5) {
							Toast('单式注单最多5注!');
							return
						}
						// if (parseInt(this.noteNum) >= 100) {
						// 	Toast('注单数量最多100注！');
						// 	return
						// }
						var obj = {};
						//生成蓝色球号码
						var newBlueArr = [];
						if (newBlueArr.length == 0) {
							while (newBlueArr.length < 2) {
								var numb = parseInt(Math.random() * 11 + 1);
								if (newBlueArr.indexOf(numb) < 0) {
									newBlueArr.push(numb);
								}
							}
						}
						//生成6个不重复的1-35的随机数
						var newRedArr = [];
						if (newRedArr.length == 0) {
							while (newRedArr.length < 5) {
								var num = parseInt(Math.random() * 34 + 1);
								if (newRedArr.indexOf(num) < 0) {
									newRedArr.push(num);
								}
							}
						}
						newRedArr.sort(compare);
						obj.type = 'normal';
						obj.totalNum = 1;
						obj.totalPrice = 2;
						obj.current = this.current;
						obj.redQiu = newRedArr;
						obj.blueQiu = newBlueArr;
						this.dltBetArr.push(obj);
						this.zhuNum(this.dltBetArr);
						setSession('arr', this.dltBetArr)
					}
				} else {
					Toast('该玩法不支持随机')
				}


			},
			deletes: function(index) {
				this.dltBetArr.splice(index, 1);
				this.zhuNum(this.dltBetArr);
				setSession('arr', this.dltBetArr)
                if(this.totalNum==0){
                caiPiao='unitary'
                  }
			},
			deleteAll: function() {
				MessageBox({
					title: '',
					message: '是否清空所有注单',
					showCancelButton: true,
				}).then(action => {
					if (action == 'confirm') {
						this.dltBetArr = [];
						this.zhuNum(this.dltBetArr);
						setSession('arr', this.dltBetArr);
						  caiPiao='unitary'
					}
				})

			},
			continueNum: function() {
				if(caiPiao=='doubleEntry'){
				    Toast('复式投注最多1条');
				    return
				}
				if (caiPiao=='unitary'&&this.dltBetArr.length>=5) {
				  Toast('单式注单最多5注!');
				  return
				}
				setSession('arr', this.dltBetArr)
				setSession('continue', 'continue');
				this.RouteLeave = true;
				this.$router.go(-1)

			},
			compileNum: function(i) {
				setSession('arr', this.dltBetArr)
				setSession('continue', 'compile');
				setSession('index', i);
				this.RouteLeave = true;
				this.$router.go(-1)
			},
			setTime: function() {
				let dataes = this.Qs.stringify({
					"path": "number/lows/dlt"
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getCurrentInfo',
						dataes
					)
					.then(ret => {
						if (ret.status == 200) {
							var content = JSON.parse(ret.data.content);
							if (content.code == 100000) {
								this.endedTime = getTime(content.data.endedTime, 1);
								this.current = content.data.periodNumber;
								this.setSurplusTime(content.data.endedTime);
							} else if (content.code == 201004) {
								this.EndTime = -1;
							}
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			setSurplusTime: function(time) {
				var surTimes = time;
				let inter = setInterval(() => {
					surTimes = surTimes - 1000
					if (surTimes < 0) {
						clearInterval(inter);
						this.setTime();
					}
				}, 1000)
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
			openSuccessWin: function() {
				if (!this.Userprotocol) {
					Toast('请阅读并勾选委托投注规则！');
					return
				}
				if (parseInt(this.qishu) < 1) {
					this.qishu=1;
					Toast('投注期数不能小于1期！');
					return
				}
				if (parseInt(this.multiple) < 1) {
					this.multiple=1;
					Toast('投注倍数不能小于1倍！');
					return
				}
				if (parseInt(this.noteNum) < 1) {
					Toast('注数不能小于1注！');
					return
				}
				// if (parseInt(this.noteNum) > 100) {
				// 	Toast('注单数量最多100注!');
				// 	return false;
				// }
				this.payPopup = true;
				// var dom = document.querySelector('#payPopup')
				// animation(dom, 'bottom', 0)
				// if (this.coinsMoney < (this.noteNum * 2 + this.Userprotocolzhuijia * this.noteNum) * this.qishu * this.multiple) {
				// 	this.hongbaoType = true;
				// } else {
				// 	this.hongbaoType = false;
				// }
				// if (this.cashMoney < (this.noteNum * 2 + this.Userprotocolzhuijia * this.noteNum) * this.qishu * this.multiple) {
				// 	this.cashType = true;
				// } else {
				// 	this.cashType = false;
				// }
				// if (!this.hongbaoType) {
				// 	this.dianjiChonse = true;
				// 	this.moneyType = 'COINS';
				// } else if (!this.cashType && this.hongbaoType) {
				// 	this.cashdianjiChonse = true;
				// 	this.moneyType = 'LOTTERYMONEY';
				// }
				// let hongbaobianxian = (this.noteNum * 1 * 2 + this.Userprotocolzhuijia * this.noteNum) * this.qishu * 1 * this.multiple * 20 / 100;
				// if (this.coinsMoney < 0.4) {
				// 	hongbaobianxian = 0.00;
				// } else if (this.coinsMoney <= hongbaobianxian) {
				// 	hongbaobianxian = this.coinsMoney;
				// }
				// this.hongbaobianxian = hongbaobianxian;
				/* MessageBox({
					title: '',
					message: '确认购买所选注单',
					showCancelButton: true,
				}).then(action => {
					if (action == 'confirm') {
						
					}
				}) */


			},
			paybtn: function() {
				this.payPopup=false;
				let data = this.setData();
				let _data = {...data};
				data = this.Encrypt(_data);
				let dataes = this.Qs.stringify({
					path: "number/lows/dlt",
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/createScheme',
						dataes
					)
					.then(ret => {
						if (ret.status == 200) {
							var content = JSON.parse(ret.data.content);
							if (content.code == "100000") {
								sessionStorage.removeItem('arr');
								sessionStorage.removeItem('continue');
								sessionStorage.removeItem('index');
								var datacontent = this.setData()['content'];
								var data = [];
								var myDate = new Date();
								myDate = getTime(myDate, 2);
								var CitySN;
								if (getSession('equipmentIp')) {
									CitySN = getSession('equipmentIp');
								}
								// obj.id=;
								data["mid"] = 1;
								data["lotteryType"] = 13;
								data["shareTime"] = myDate;
								data['periodNumber'] = this.current;
								data["shareType"] = 1;
								data["uid"] = getCookie('newData').userid;
								data["multiple"] = this.multiple;
								data["schemeCost"] = (this.noteNum * 2 + this.Userprotocolzhuijia * this.noteNum)* this.qishu  * this.multiple;
								data["subscriptionMoney"] = (this.noteNum * 2 + this.Userprotocolzhuijia * this.noteNum)* this.qishu  * this.multiple;
								data["content"] = datacontent;
								data["quipmentiIp"] = CitySN; //投注IP
								data["quipmentTeype"] = 10; // 投注设备类型
								data["quipmentNumber"] = ''; //投注设备号
								data["quipmentUid"] = getCookie('newData').userid; // 投注UID
								data["quipmentOrderId"] = content.data.schemeNumber;
								let object = {...data}
								setSession('obj', object);
								setSession('moneyType', this.moneyType);
								this.RouteLeave = true;
								this.$router.push({
									path: '/goucai/goucai_success',
									query: {
										success: 'dlt',
										schemeId: content.data.id,
										wcj_totalPrice: (this.noteNum * 2 + this.Userprotocolzhuijia * this.noteNum)* this.qishu  * this.multiple,
										from: 'dlt',
										types: 'shuzi',
										moneyType: this.moneyType
									}
								})
							} else {
								alert(content.message);

							}
						} else {
							console.log(JSON.stringify(ret));
							alert('网络错误！')
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			zhuNum: function(array) {
				var totalNum = 0;
				for (var i = 0; i < array.length; i++) {
					totalNum += array[i].totalNum;
				}
				this.noteNum = totalNum;
			},
			setData: function() {
				var data = [];
				var uid = getCookie('newData').userid;
				//拼接uid
				data.userId = uid;
				//判断是否追号
				if (this.qishu > 1) {
					data.chase = true;
				} else {
					data.chase = false;
				}
				//追号列表
				var chaseMultipleList = [];
				var qi = this.qishu;
				var bei = this.multiple;
				console.log(bei);
				for (var i = 0; i < qi; i++) {
					chaseMultipleList.push(bei);
				}
				data.chaseMultipleList = chaseMultipleList;
				//content
				var content = [];
				var betArr = this.dltBetArr;
				for (var i = 0; i < betArr.length; i++) {
					var obj = [];
					if (this.playType == 'normal') {
						obj.playMethod = 'normal';
						obj.playType = 'normal';
						var str = betArr[i].redQiu.join(',') + '|' + betArr[i].blueQiu.join(',');
						obj.betContent = str;
						obj.schemeUnits = betArr[i].totalNum;
						content.push({...obj});
					} else {
						obj.playMethod = 'duplex';
						obj.playType = 'duplex';
						var str = betArr[i].redDanArr.join(',') + '_' + betArr[i].redTuoArr.join(',') + '|' + betArr[i].blueDanArr.join(
							',') + '_' + betArr[i].blueTuoArr.join(',');
						obj.betContent = str;
						obj.schemeUnits = betArr[i].totalNum;
						content.push({...obj});
					}
				}
				data.content = content;
				//isSingle
				data.isSingle = "normal";
				//投注倍数
				var schemeMultiple = bei;
				data.schemeMultiple = schemeMultiple;
				//方案保密类型
				data.secretType = "FULL_PUBLIC";
				//自购|合买
				data.shareType = "SELF";
				//中奖后停止追号
				if (this.Userprotocolzhuijia == 1) {
					data.append = true;
				} else {
					data.append = false;
				}
				if (this.xuanz) {
					data.winstopstyle = true;
				} else {
					data.winstopstyle = false;
				}
				//币种
				data.moneyType = this.moneyType;
				console.log(data);
				return data;
			},

		}
	}
</script>

<style scoped>
	@import "../../css/goucai_szcpay.css";

	#mc_dltpay {
		margin-top: 2.25rem;
	}

	#mc_dltpay {
		background: #f2f2f2;
		height: 100%;
	}
</style>
