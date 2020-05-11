<template>
	<div>
<!-- 		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" tapmode @click="closeWinpay()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">排列五</div>
			<div class="fgr hm_top" tapmode @click="open_hemai()">
				<span><img src="../../assets/goucai/jjc/icon_flagre.png" /></span>
				<span>发起合买</span>
			</div>
		</header> -->
		 <header class="aui-bar aui-bar-nav">
		    <div class="aui-pull-left aui-btn" tapmode @click="closeWinpay()">
		      <span class="aui-iconfont aui-icon-left"></span>
		    </div>
		    <div>
		      <div class="aui-title"  tapmode>排列五 </div>
		    </div>
		    <div class="aui-pull-right aui-btn top-more" @click="open_hemai()" tapmode>
		      发起合买
		    </div>
		</header>
		<div id="mc_plwpay" v-cloak>
			<!-- 顶部期数 -->
			<div class="szcpay_head">
				<p><span>第{{periodNumber}}期</span> <span class="jiez">{{EndTime|GetTimeStr(4)}} {{EndTime|GetTimeStr(3)}}截止</span></p>
			</div>
			<!-- 注数 -->
			<div class="zhus_nav">
				<div @click="randomone()">+随机一注</div>
				<div @click="randomfour()">+随机五注</div>
				<div @click="addlist()">+继续选号</div>
			</div>
			<!-- 红包返现 -->
			<div class="szchn_head">
				<div>现金投注即返<i>5%</i>的现金&nbsp;&nbsp;本次投注可返现金<i>{{(noteNum*2*multiple*qishu*0.05).toFixed(2)}}</i>元</div>
				<!--<img @click="hongbaogzbox" src="../../assets/goucai/jjc/hbwenhao.png" />-->
			</div>
			<!-- 内容 -->
			<div class="ssqpay plspay " v-if='pay3d.data'>
				<div class="">
					<div class="cont" v-for="(item,index) in pay3d.data">
						<div class="shanc" @click="closepaydata(index)"><img src="../../assets/goucai/jjc/close_btnre.png" /> </div>
						<div class="xuanh" @click="addset(index)">
							<div class="hao">
								<span v-for="(a,aindex) in item.wanweiarr">{{a}}</span>|<span v-for="(b,bindex) in item.qianweiarr">{{b}}</span>|<span
								 v-for="(c,cindex) in item.baiweiarr">{{c}}</span>|<span v-for="(d,dindex) in item.shiweiarr">{{d}}</span>|<span
								 v-for="(e,eindex) in item.geweiarr">{{e}}</span>
							</div>
							<p><span>直选<i> {{item.totalNum}}</i>注</span><span>共<i> {{item.totalNum*2}} </i>元</span></p>
						</div>
						<div class="jiant" @click="addset(index)"></div>
					</div>
				</div>



			</div>

			<!-- 底部倍数 -->
			<div class="bottom">
				<div class="agree">
					<div class="check"><i :class="[ 'flr' , { 'active': Userprotocol }]" @click="onUserprotocol"></i>
						<p>我已阅读并同意<span @click="JumpUserprotocol()">《委托投注规则》</span></p>
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
				<div v-if='qishu > 1' class="tingz"><span tapmode @click="xuanZ" class=" xuanz" :class="{ active : xuanz }"></span>中奖后停止追号</div>
				<footer>
					<div class="ft_money flr">
						<p>合计金额：<span>¥{{(noteNum*2*multiple*qishu).toFixed(2)}}</span></p>
						<p class="p2"><span>{{noteNum}}</span>注<span>{{multiple}}</span>倍<span>{{qishu}}</span>期</p>
					</div>
					<div class="ft_btn fgr">
						<div class="flr" tapmode >
				
						</div>
						<div class="flr" tapmode @click="pay()">付款</div>
					</div>
				</footer>
<!-- 				<footer>
					<div class="delete flr" @click="closetoull()"></div>
					<div class="total flr">
						<p>共<span>{{noteNum*2*multiple*qishu}}</span>元</p>
						<p class="p2"><span>{{noteNum}}</span>注<span>{{multiple}}</span>倍<span>{{qishu}}</span>期</p>
					</div>
					<div class="pay fgr" tapmode @click="pay()">付款</div>
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
						<p>合计金额：<span>¥{{(noteNum*2*multiple*qishu).toFixed(2)}}</span></p>
						<p class="p2"><span>{{noteNum}}</span>注<span>{{multiple}}</span>倍<span>{{qishu}}</span>期</p>
					</div>
					<div class="ft_btn fgr">
						<div class="flr" tapmode >
				
						</div>
						<div class="flr" tapmode @click="pay()">付款</div>
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
		<module-pay :sqishu='qishu' :payPopupP='payPopup' :payMoneyP='payMoney' :coinsMoneyP='coinsMoney' :cashMoneyP='cashMoney'
		 :opnenWeixinP='opnenWeixin' :opnenBankopenP='opnenBankopen' :hasHongbaoP='true' :typeName='"排列五"' @payPopupC="payPopupC" @RouteLeaveC='RouteLeaveC'
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
		compare,
		Get0pad
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
				logok: false,  //未实名标志
				coverage:true,//键盘第一次唤起
				xuanz: true,
				nowTime: 0, //开始时间
				EndTime: 0, //结束时间
				periodNumber: 0, //期数
				pay3d: [], //数据
				zhuihao_flag: true,
				'content': [],
				'pageParam': '',
				'showkeyboard': false,
				'Userprotocol': true,
				'showMask': false,
				'zhuihDom': false,
				'totalNum': 0,
				'noteNum': 0,
				'multiple': 1,
				'qishu': 1,
				'keyboardAsc': 0,
				'RouteLeave': false,
				coinsMoney:0,//红包余额
				cashMoney:0,//现金余额
				payPopup:false,//红包弹窗
				dianjiChonse:true,//选择红包
				cashdianjiChonse:false,//选择现金
				hongbaoType:false,//红包余额是否充足
				cashType:false,//现金余额是否充足
				opnenWeixin:false,//微信是否开放
				opnenBankopen:false,//银行卡是否开放
				hongbaobianxian:0,
				moneyType:"COINS",
				payMoney:0,
				sjhongbao: 0,
				hongbaogz: false
			};
		},
		created() {
			this.setTime();
			let arr = getSession('arr');
			this.pageParam = this.pageParam
			this.pay3d = arr;
			console.log(JSON.stringify(this.pay3d));
			var num = 0;
			for (var i = 0; i < arr.data.length; i++) {
				num += arr.data[i].totalNum;
			}
			this.noteNum = num;
			if (this.pay3d.data[0].totalNum == 1) {
				caiPiao = 'unitary'
			} else {
				caiPiao = 'doubleEntry'
			}
			this.getUserInfo();
			this.checkIsWx();
		},
		filters: {
			GetTimeStr: function(matchDate, num) {
				var now = new Date(matchDate);
				if (num == 0 || num == 1) {
					var dayss = "";
					if (now.getDay() == 0) dayss = "周日";
					else if (now.getDay() == 1) dayss = "周一";
					else if (now.getDay() == 2) dayss = "周二";
					else if (now.getDay() == 3) dayss = "周三";
					else if (now.getDay() == 4) dayss = "周四";
					else if (now.getDay() == 5) dayss = "周五";
					else if (now.getDay() == 6) dayss = "周六";
					else dayss = "周日";
					return now.getFullYear() + "-" + Get0pad(now.getMonth() + 1, 2) + "-" + Get0pad(now.getDate(), 2) + " " + dayss;
				} else if (num == 2) {
					var dayss = "";
					if (now.getDay() == 0) dayss = "周日";
					else if (now.getDay() == 1) dayss = "周一";
					else if (now.getDay() == 2) dayss = "周二";
					else if (now.getDay() == 3) dayss = "周三";
					else if (now.getDay() == 4) dayss = "周四";
					else if (now.getDay() == 5) dayss = "周五";
					else if (now.getDay() == 6) dayss = "周六";
					else dayss = "周日";
					return dayss;
				} else if (num == 3) {
					return Get0pad(now.getHours(), 2) + ":" + Get0pad(now.getMinutes(), 2);
				} else if (num == 4) {
					return Get0pad(now.getMonth() + 1, 2) + "-" + Get0pad(now.getDate(), 2);
				}
			}

		},
		beforeRouteEnter (to, from, next) {
			if (from.matched.length > 0) {
			    var lint = from.matched[0].name + 'pay'
			    if (to.name == lint) {
			        var arr=getSession('arr');
			        if (arr) {
			            next();
			        } else {
			            window.history.go(-1);
			        }
			    } else {
			        next();
			    }
			}else{
			    next();
			}
		},
		beforeRouteLeave (to, from , next) {
		    if (this.RouteLeave||to.name=='goucai_hemai'||to.name=='agreement'||this.pay3d.data.length == 0) {
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
			} else if (caiPiao == 'unitary' && this.pay3d.data.length == 5) {
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
				let hongbaobianxian=this.noteNum*1 * 2 * this.multiple*1 * this.qishu*1*20/100;
				if (this.coinsMoney < 0.4) {
					hongbaobianxian = 0.00;
				} else if (this.coinsMoney <= hongbaobianxian) {
					hongbaobianxian = this.coinsMoney;
				}
				this.sjhongbao = hongbaobianxian;
			},
			hongbaogzbox: function(msg) {
				this.RouteLeave = true;
				this.hongbaogz = msg;
			},
			showbox:function(msg){
				this.RouteLeave=true;
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
			logokbtn1: function() {  //前往实名
			this.RouteLeave=true;
				this.logok = false;
				this.$router.push({
					name: 'userinfo_task_real'
				})
			},
			logokbtn2: function() {  //取消实名
				this.logok = false;
			},
			checkIsWx: function() {
			           this.$ajax.timeout=49527;//不要加载状态
				this.$ajax.post('/caipiaoshouye/index.php/home/index/checkIsWx')
					.then(res => {
						this.$ajax.timeout=50000;
				         if(res.data.isopen==0){
			                this.opnenWeixin=false;
			            }else if (res.data.isopen==1) {
			                this.opnenWeixin=true;
			            }
						if(res.data.isbankopen==0){
						   this.opnenBankopen=false;
						}else if (res.data.isbankopen==1) {
						  this.opnenBankopen=true;
						}
			
					})
					.catch(err => {
						this.$ajax.timeout=50000;
						console.log(err);
					})
			},
			hidepayRecharge:function(){
				let dompayRecharge =document.querySelector('#payRecharge');
				animation(dompayRecharge,'left',100)
			},
			hidepayPopup:function(){
				this.payPopup=false;
				this.hongbaoType=false;
				this.cashdianjiChonse=false;
				let bottomDom=document.querySelector('#payPopup');
				let bottomDomInitial = window.getComputedStyle(bottomDom).height.replace('px','')*1*-1;
				// document.querySelector('#payPopup').style.bottom='-19.5rem';
				let dom=document.querySelector('#payPopup');
				animation(dom,'bottom',bottomDomInitial)
			},
			recharge_back:function(type){
					if(type==1){
					if (this.opnenBankopen) {
						this.RouteLeave=true;
					this.$router.push({
						name: 'userinfo_recharge'
					})
					}else{
						MessageBox({
							title: '',
							message: '快捷支付暂时无法使用，给您带来的不便敬请谅解!',
							showCancelButton: false,
							   confirmButtonText:"我知道了",
										
						    // cancelButtonText:"知道了"
						}).then(action => {
							if (action == 'confirm') {
								
							} else {
							return false;
							}
						})
					}
				}else{
					if (this.opnenWeixin) {
						this.RouteLeave=true;
						this.$router.push({
							name: 'userinfo_recharge_weixin'
						})
					} else {
						MessageBox({
							title: '',
							message: '微信充值暂时无法使用，给您带来的不便敬请谅解!',
							showCancelButton: false,
							   confirmButtonText:"我知道了",
						}).then(action => {
							if (action == 'confirm') {
							
							} else {
								return false;
							}
						})
					}
				}
			},
			choseTypeyes:function(type){
				if(type==1){
					if(this.hongbaoType){
						return false
					}
					this.dianjiChonse=true;
					this.moneyType='COINS';
					this.cashdianjiChonse=false;
				}else{
					if(this.cashType){
						return false
					}
					this.dianjiChonse=false;
					this.cashdianjiChonse=true;
					this.moneyType='LOTTERYMONEY';
				}
			},
			getUserInfo: function(money,type) {
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
							    var cashMoney=content.data.money*1;
								var coinsMoney = content.data.coinsMoney*1;
								this.cashMoney=cashMoney;
								this.coinsMoney=coinsMoney;
						
							}
			                 else if (content.code == "201010") {
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
			JumpUserprotocol:function(){
				this.RouteLeave=true;
				this.$router.push({
					name:'agreement'
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
				let Fnumber = this.noteNum * 2 * this.multiple;
				this.moneyType='LOTTERYMONEY';
				var data = this.setData(this.payid);
				let dataes = this.Qs.stringify({
					data
				});
				sessionStorage.setItem('hemaiData', dataes);
				this.RouteLeave=true;
				this.$router.push({
					path: '/goucai/goucai_hemai',
					query: {
						'pageName': "number/lows/pl",
						'Fnumber': Fnumber,
						payid: 'pl5',
						periodNumber:this.periodNumber,
					}
				})
			},
			closeWinpay: function() {
			this.$router.go(-1);
			},
			// 随机一注
			randomone: function() {
				if (caiPiao == 'doubleEntry') {
					Toast('复式投注最多1条');
					return
				}
				if (caiPiao == 'unitary' && this.pay3d.data.length == 5) {
					Toast('单式注单最多5注!');
					return
				}
				// if(parseInt(this.noteNum)>=100){
				// 	 Toast('注单数量最多100注！');
				// 	 return
				// }
				var onedata = {};
				var wanwei = [];
				wanwei = this.generateRandom(wanwei, 1);

				var qianwei = [];
				qianwei = this.generateRandom(qianwei, 1);
				var baiwei = [];
				baiwei = this.generateRandom(baiwei, 1);
				var shiwei = [];
				shiwei = this.generateRandom(shiwei, 1);
				var gewei = [];
				gewei = this.generateRandom(gewei, 1);
				var totalNum = 1;
				onedata = {
					playMethod: "normal",
					playType: "p5Direct",
					wanweiarr: wanwei,
					qianweiarr: qianwei,
					baiweiarr: baiwei,
					shiweiarr: shiwei,
					geweiarr: gewei,
					totalNum: totalNum
				}
				console.log(JSON.stringify(onedata));
				this.pay3d.data.push(onedata);
				var noteNum = 0;
				for (var i = 0; i < this.pay3d.data.length; i++) {
					noteNum += this.pay3d.data[i].totalNum;
				}
				setSession('arr',this.pay3d);
				this.noteNum = noteNum;
			},
			generateRandom: function(count, index) {
				while (count.length < index) {
					var num = parseInt(Math.random() * 10);
					if (count.indexOf(num) < 0) {
						count.push(num);
					}
				}
				return count;
			},
			// 继续选号
			addlist: function() {
				if (caiPiao == 'doubleEntry') {
					Toast('复式投注最多1条');
					return
				}
				if (caiPiao == 'unitary' && this.pay3d.data.length == 5) {
					Toast('单式注单最多5注!');
					return
				}
				setSession('arr', this.pay3d)
				setSession('continue', 'continue')
				this.RouteLeave=true;
				this.$router.go(-1)
			},
			// 随机五注
			randomfour: function() {
				if (caiPiao == 'doubleEntry') {
					Toast('复式投注最多1条');
					return
				}
				for (var i = 0; i < 5; i++) {
					if (caiPiao == 'unitary' && this.pay3d.data.length == 5) {
						Toast('单式注单最多5注!');
						return
					}
					// if(parseInt(this.noteNum)>=100){
					// 	 Toast('注单数量最多100注！');
					// 	 return
					// }
					this.randomone();
				}
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
				var mun = ''
				if (this.keyboardAsc == 0) {
					if (this.qishu == '0') {
						mun = idx
					}else if(this.coverage){
						mun = idx;
						this.coverage=false;
					}  else {
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
			closepaydata: function(index) {
				this.pay3d.data.splice(index, 1);
				if (this.pay3d.data.length > 0) {
					var noteNum = 0;
					for (var i = 0; i < this.pay3d.data.length; i++) {
						noteNum += this.pay3d.data[i].totalNum;
					}
					this.noteNum = noteNum;
				}
				setSession('arr', this.pay3d)
				if( this.pay3d.data.length==0){
					this.noteNum=0;
					
					  caiPiao='unitary'
					   
				}
				console.log(JSON.stringify(this.pay3d.data));
			},
			addset: function(index) {
				setSession('arr', this.pay3d)
				setSession('continue', 'compile');
				setSession('index', index)
				this.RouteLeave=true;
				this.$router.go(-1)
			},
			closetoull: function() {
				MessageBox({
					title: '',
					message: '是否清空所有注单',
					showCancelButton: true,
				}).then(action => {
					if (action == 'confirm') {
						this.pay3d.data = [];
						this.noteNum = 0;
						this.multiple=1;
						this.qishu =1;
						setSession('arr', this.pay3d);
						caiPiao='unitary'
					}
				})

			},
			setTime: function() {
				let dataes = this.Qs.stringify({
					"path": "number/lows/pl"
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getCurrentInfo',
						dataes
					)
					.then(ret => {
						var content = JSON.parse(ret.data.content);
						if (content.code == 100000) {
							this.EndTime = parseInt(content.data.endedTime);
							this.nowTime = parseInt(content.data.nowTime);
							this.periodNumber = content.data.periodNumber;
						} else if (content.code == 201004) {
							this.title = false;
						}

					})
					.catch(err => {
						console.log(err)
					})
			},
			opnenRecharge:function(){
				if (getCookie('logok')) {  //判断是否实名
					this.logok = true;
				    return false;
				}
				// document.querySelector('#payRecharge').style.left=0;
				let dompayRecharge1 =document.querySelector('#payRecharge');
				animation(dompayRecharge1,'left',0)
			},
			pay: function() {
				if (this.Userprotocol) {
					if (parseInt(this.noteNum) < 1) {
						Toast('注数不能小于1注！');
						return
					}
					// 	if(parseInt(this.noteNum)>100){
					//   Toast('注单数量最多100注!');
					//   return false;
					// }
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
					this.payPopup=true;
					// var dom=document.querySelector('#payPopup')
					// animation(dom,'bottom',0)
					// if(this.coinsMoney<this.noteNum * 2 * this.multiple * this.qishu){
					// 	this.hongbaoType=true;
					// }else{
					// 	this.hongbaoType=false;
					// }
					// if(this.cashMoney<this.noteNum * 2 * this.multiple * this.qishu){
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
					// let hongbaobianxian=this.noteNum*1 * 2 * this.multiple*1 * this.qishu*1*20/100;
					// if(this.coinsMoney<0.4){
					// 	hongbaobianxian=0.00;
					// }else if(this.coinsMoney<=hongbaobianxian){
					// 	hongbaobianxian=this.coinsMoney;
					// }
					// this.hongbaobianxian=hongbaobianxian;	
				} else {
					Toast('请阅读并勾选委托投注规则！')
				}

			},
			paybtn:function(){
				this.payPopup=false;
				let data = this.setData();
				let _data = {...data};
				data = this.Encrypt(_data);
				let dataes = this.Qs.stringify({
					path: "number/lows/pl",
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
								var datacontent=this.setData()['content'];
								var data=[];
								var myDate = new Date();
								myDate=getTime(myDate,2);
								var CitySN;
								if(getSession('equipmentIp')){
									CitySN=getSession('equipmentIp');
								}
								// obj.id=;
								data["mid"]=1;
								data["lotteryType"]=6;
								data['periodNumber']=this.periodNumber;
								data["shareType"]=1;
								data["shareTime"]=myDate;
								data["uid"]=getCookie('newData').userid;
								data["multiple"]=this.multiple;
								data["schemeCost"]=this.noteNum*2*this.multiple*this.qishu;
								data["subscriptionMoney"]=this.noteNum*2*this.multiple*this.qishu;
								data["content"]=datacontent;
								data["quipmentiIp"]=CitySN;		//投注IP 
								data["quipmentTeype"]=10 ;         // 投注设备类型
								data["quipmentNumber"]='';          //投注设备号
								data["quipmentUid"]=getCookie('newData').userid;           // 投注UID
								data["quipmentOrderId"] =  content.data.schemeNumber;
								let object = {...data}
								setSession('obj', object);
								setSession('moneyType', this.moneyType);
								this.RouteLeave=true;
								this.$router.push({
									path: '/goucai/goucai_success',
									query: {
										success: 'pl5',
										schemeId: content.data.id,
										wcj_totalPrice: this.noteNum * 2 * this.multiple * this.qishu,
										from: 'pl5',
							types:'shuzi',
							 moneyType:this.moneyType
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
			setData: function() {
				var data = [];
				var uid = getCookie('newData').userid;
				//拼接uid
				data.userId = uid;
				//判断是否追号
				if (parseInt(this.qishu) > 1) {
					data.chase = true;
				} else {
					data.chase = false;
				}
				//追号列表
				var chaseMultipleList = [];
				var qi = parseInt(this.qishu);
				var bei = parseInt(this.multiple);
				for (var i = 0; i < qi; i++) {
					chaseMultipleList.push(bei);
				}
				data.chaseMultipleList = chaseMultipleList;
				//content
				var content = [];
				console.log(JSON.stringify(this.pay3d.data));
				var strdata=[];
				for (var i = 0; i < this.pay3d.data.length; i++) {
					var betStr = this.pay3d.data[i].wanweiarr.join(",") + "|" + this.pay3d.data[i].qianweiarr.join(",") + "|" + this.pay3d
						.data[i].baiweiarr.join(",") + "|" + this.pay3d.data[i].shiweiarr.join(",") + "|" + this.pay3d.data[i].geweiarr.join(",");
						strdata.playMethod= this.pay3d.data[i].playMethod,
						strdata.playType=this.pay3d.data[i].playType,
						strdata.betContent= betStr,
						strdata.schemeUnits= this.pay3d.data[i].totalNum
					
					content.push({...strdata});
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
				if (this.xuanz) {
					data.winstopstyle = true;
				} else {
					data.winstopstyle = false;
				}
				//币种
				data.moneyType = this.moneyType;
				console.log(JSON.stringify(data));
				return data;
			}
		}
	}
</script>

<style scoped>
	@import "../../css/goucai_szcpay.css";

	#mc_plwpay {
		margin-top: 2.25rem;
	}

	#mc_plwpay {
		background: #f2f2f2;
		height: 100%;
	}
</style>
