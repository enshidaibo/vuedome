<template>
	<div>
<!-- 		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="closeWinpay()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">广东11选5</div>
			<div class="share_btn aui-pull-right" @click="fenx()">
				<span class="aui-iconfont aui-icon-share"></span>
			</div>
		</header> -->
         <header class="aui-bar aui-bar-nav">
             <div class="aui-pull-left aui-btn" tapmode @click="closeWinpay()">
               <span class="aui-iconfont aui-icon-left"></span>
             </div>
             <div>
               <div class="aui-title"  tapmode>广东11选5
			   <span v-if="paydj.danlist=='normalList'" class="type">{{paydj.navname}}普通</span>
			   <span v-else class="type">{{paydj.navname}}胆拖</span>
				</div>
             </div>
         <div class=" aui-pull-right" @click="fenx()">
             <span class="aui-iconfont aui-icon-share" ></span>
         </div>
         </header>
		<div id="mc_qlcpay" v-cloak>
			<!-- 分享模态框 -->
			<div v-if="shareStatue" class="share_box" @click="hideShare()">
				<div class="share_cont">
					<div class="quxiao">取消</div>
					<div class="down" @click="openDownload()">前往下载</div>
				</div>
			</div>
			<!-- 顶部期数 -->
			<div class="szcpay_head">
				<p><span>第{{periodNumber}}期</span> <span class="jiez">{{EndTime|GetTimeStr(4)}} {{EndTime|GetTimeStr(3)}}截止</span></p>
			</div>
				
			<!-- 注数 -->
			<div class="zhus_nav">
				<div @click="Randomone()">+随机一注</div>
				<div @click="Randomfor()">+随机五注</div>
				<div @click="addlist()">+继续选号</div>
			</div>
			<!-- 红包返现 -->
			<div class="szchn_head">
				<div>现金投注即返<i>5%</i>的现金&nbsp;&nbsp;本次投注可返现金<i>{{(noteNum*2*multiple*qishu*0.05).toFixed(2)}}</i>元</div>
				<!--<img @click="hongbaogzbox" src="../../assets/goucai/jjc/hbwenhao.png" />-->
			</div>
			<!-- 内容 -->
			<div class="ssqpay">
				<div class="" v-if='paydj.navname=="前三直选"&&paydj.danlist=="normalList"'>
					<div class="cont" v-for="(item,index) in paydj.data">
						<div class="shanc" @click="closepaydata(index)"><img src="../../assets/goucai/jjc/close_btnre.png" /> </div>
						<div class="xuanh" @click="addset(index)">
							<div class="hao">
								<span v-for="(c,cindex) in item.wanarr">
									<i v-if="c>9" class="dayu">{{c}}</i>
									<i v-else class="dayu">0{{c}}</i>
								</span>|<span v-for="(d,dindex) in item.qianarr">
									<i v-if="d>9" class="dayu">{{d}}</i>
									<i v-else class="dayu">0{{d}}</i>
								</span>|<span v-for="(e,eindex) in item.baiarr">
									<i v-if="e>9" class="dayu">{{e}}</i>
									<i v-else class="dayu">0{{e}}</i>
								</span>
							</div>
							<p><span>{{paydj.navname}}<i> {{item.totalNum}}</i>注</span><span>共<i> {{item.totalNum*2}} </i>元</span></p>
						</div>
						<div class="jiant" @click="addset(index)"></div>
					</div>
				</div>
				<div class="" v-else-if='paydj.navname=="前二直选"&&paydj.danlist=="normalList"'>
					<div class="cont" v-for="(item,index) in paydj.data">
						<div class="shanc" @click="closepaydata(index)"><img src="../../assets/goucai/jjc/close_btnre.png" /> </div>
						<div class="xuanh" @click="addset(index)">
							<div class="hao">
								<span v-for="(c,cindex) in item.wanarr">
									<i v-if="c>9" class="dayu">{{c}}</i>
									<i v-else class="dayu">0{{c}}</i>
								</span>
								|<span v-for="(d,dindex) in item.qianarr">
									<i v-if="d>9" class="dayu">{{d}}</i>
									<i v-else class="dayu">0{{d}}</i>
								</span>
							</div>
							<p><span>{{paydj.navname}}<i> {{item.totalNum}}</i>注</span><span>共<i> {{item.totalNum*2}} </i>元</span></p>
						</div>
						<div class="jiant" @click="addset(index)"></div>
					</div>
				</div>
				<div class="" v-else-if='paydj.danlist=="duplexList"'>
					<div class="cont" v-for="(item,index) in paydj.data">
						<div class="shanc" @click="closepaydata(index)"><img src="../../assets/goucai/jjc/close_btnre.png" /> </div>
						<div class="xuanh" @click="addset(index)">
							<div class="hao">
								<span v-for="(c,cindex) in item.wanarr"> <i v-if="c>9" class="dayu">{{c}}</i>
									<i v-else class="dayu">0{{c}}</i></span>|<span v-for="(d,dindex) in item.qianarr"> <i v-if="d>9" class="dayu">{{d}}</i>
									<i v-else class="dayu">0{{d}}</i></span>
							</div>
							<p><span>{{paydj.navname}}胆拖<i> {{item.totalNum}}</i>注</span><span>共<i> {{item.totalNum*2}} </i>元</span></p>
						</div>
						<div class="jiant" @click="addset(index)"></div>
					</div>
				</div>
				<div class="" v-else>
					<div class="cont" v-for="(item,index) in paydj.data">
						<div class="shanc" @click="closepaydata(index)"><img src="../../assets/goucai/jjc/close_btnre.png" /> </div>
						<div class="xuanh" @click="addset(index)">
							<div class="hao">
								<span v-for="(c,cindex) in item.baiarr">
									<i v-if="c>9" class="dayu">{{c}}</i>
									<i v-else class="dayu">0{{c}}</i>
								</span>
							</div>
							<p><span>{{paydj.navname}}<i> {{item.totalNum}}</i>注</span><span>共<i> {{item.totalNum*2}} </i>元</span></p>
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
				<div v-if='qishu > 1' class="tingz"><span @click="xuanZ" :class="['xuanz',{'active':xuanzStatue}] "></span>中奖后停止追号</div>
<!-- 				<footer>
					<div class="delete flr" @click="closenotenum()"></div>
					<div class="total flr">
						<p>共<span>{{noteNum*2*multiple*qishu}}</span>元</p>
						<p class="p2"><span>{{noteNum}}</span>注<span>{{multiple}}</span>倍<span>{{qishu}}</span>期</p>
					</div>
					<div class="pay fgr" @click="openSuccessWin()">付款</div>
				</footer> -->
				<footer>
					<div class="ft_money flr">
						<p>合计金额：<span>¥{{(noteNum*2*multiple*qishu).toFixed(2)}}</span></p>
						<p class="p2"><span>{{noteNum}}</span>注<span>{{multiple}}</span>倍<span>{{qishu}}</span>期</p>
					</div>
					<div class="ft_btn fgr">
						<div class="flr" tapmode >
				
						</div>
						<div class="flr" tapmode @click="openSuccessWin()">付款</div>
					</div>
				</footer>
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
		<module-pay :payPopupP='payPopup' :payMoneyP='payMoney' :coinsMoneyP='coinsMoney' :cashMoneyP='cashMoney'
		 :opnenWeixinP='opnenWeixin' :opnenBankopenP='opnenBankopen' :hasHongbaoP='false'  :typeName='"广东11选5"' @payPopupC="payPopupC" @RouteLeaveC='RouteLeaveC'
		 @paybtn='paybtn' @paylogok='paylogok'>
		</module-pay>
		<checkok-nav :logokz='logok' @showbox="showbox"></checkok-nav>
		<homngbaogz :hongbaogz='hongbaogz' @hongbaogzbox="hongbaogzbox"></homngbaogz>
	</div>
</template>

<script>
	import {
		getSession,
		setSession,
		getCookie,
		OverallData,
		getTime
	} from '../../js/common.js';
	 
	import {
		Toast,
		MessageBox
	} from 'mint-ui';

	function Get0pad(num, n) {
		var len = num.toString().length;
		while (len < n) {
			num = "0" + num;
			len++;
		}
		return num;
	}
import checkokNav from '../../common/checkok.vue';
	import modulePay from '../../common/modulepay.vue';
	import homngbaogz from '../../common/homngbaogz.vue';
	
	export default {
		components: {
			checkokNav,
			modulePay,
			homngbaogz
		},
		data() {
			return {
				logok: false, //未实名标志
				shareStatue: false, //分享状态
				coverage:true,//键盘第一次唤起
				xuanzStatue: true,
				nowTime: 0, //开始时间
				EndTime: 0, //结束时间
				periodNumber: 0, //期数
				paydj: [],
				ccarray: [],
				'content': [],
				'pageParam': '',
				'multiple': '1',
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
		payMoney: 0,
		sjhongbao: 0,
		hongbaogz: false
			};
		},
		beforeRouteEnter(to, from, next) {
			if (from.matched.length > 0) {
				var lint = from.matched[0].name + 'pay'
				if (to.name == lint) {
					var arr = getSession('data');
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
			if (this.RouteLeave || to.name == 'agreement' || this.paydj.data.length == 0) {
				next()
			} else {
				MessageBox({
					title: '',
					message: '是否保存当前注单',
					showCancelButton: true,
				}).then(action => {
					if (action == 'confirm') {
						setSession('pay', 1);
						setSession('content', this.paydj);
						next()
					} else {
						sessionStorage.removeItem("content");
						sessionStorage.removeItem("pay");
						next()
					}
				})
			}
		},
		created() {
			this.setTime();
			sessionStorage.removeItem("pay");
			this.getUserInfo();
			this.checkIsWx();
		},
		mounted() {
			this.paydj = getSession("content");
			this.paydj.data = getSession("data");
			console.log(JSON.stringify(this.paydj));
			for (var i = 0; i < this.paydj.data.length; i++) {
				this.noteNum += this.paydj.data[i].totalNum;
			}
			console.log(this.noteNum);
		},
		watch: {
					coinsMoney: function() {
						this.sjhongbaostr();
					}
				},
		
		updated: function() {
					this.payMoney = this.noteNum * 2 * this.multiple * this.qishu;
					console.log(this.payMoney);
					this.$nextTick(function() {
						this.sjhongbaostr();
					})
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
			},
		},
		methods: {
			sjhongbaostr: function() {
				let hongbaobianxian = this.noteNum * 1 * 2 * this.multiple * 1 * this.qishu * 1 * 20 / 100;
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
			setTime: function() { //请求数据
				var datas = this.Qs.stringify({
					"path": "number/keno/gdel11to5"
				}, {
					allowDots: true
				});

				this.$ajax.post('/caipiaoshouye/index.php/home/index/getCurrentInfo',
						datas
					)
					.then(res => {
						console.log(res);
						if (res.data.status == 200) {
							var content = JSON.parse(res.data.content);
							if (content.code == 100000) {
								this.EndTime = parseInt(content.data.endedTime);
								this.nowTime = parseInt(content.data.nowTime);
								this.periodNumber = content.data.periodNumber;
								// setSurplusTime();
							} else if (content.code == 201004) {
								Toast("当前期已截止")
							}
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			closeWinpay: function() {
				if (this.noteNum < 1) {
					this.RouteLeave = true;
					this.$router.go(-1)
				} else {
					this.$router.go(-1)
				}
			},
			Randomone: function() { // 随机一注
				// if (parseInt(this.noteNum) >= 100) {
				// 	Toast('注单数量最多100注！');
				// 	return
				// }
				var rand1 = []; //万位
				var rand2 = []; // 千位
				var rand3 = []; // 百位
                var strarr=[]; // 直选
				if (this.paydj.danlist == "normalList") {
					if (this.paydj.navname == "前二直选") {
			   strarr = this.getRandom(strarr, 2);
                  rand1.push(strarr[0]);
                  rand2.push(strarr[1]);
                  this.paydj.data.push({
                      "wanarr": rand1,
                      "qianarr": rand2,
                      "baiarr": rand3,
                      "totalNum": 1
                  })

              } else if (this.paydj.navname == "前三直选") {
                  strarr = this.getRandom(strarr, 3);
                   rand1.push(strarr[0]);
                   rand2.push(strarr[1]);
                  rand3.push(strarr[2]);
                  this.paydj.data.push({
                      "wanarr": rand1,
                      "qianarr": rand2,
                      "baiarr": rand3,
                      "totalNum": 1
                  })
              } else if (this.paydj.navname == "前三直选") {
						var arrct = []
						arrct = this.getRandom(arrct, 3);
						rand1[0] = arrct[0];
						rand2[0] = arrct[1];
						rand3[0] = arrct[2];
						this.paydj.data.push({
							"wanarr": rand1,
							"qianarr": rand2,
							"baiarr": rand3,
							"totalNum": 1
						})
					} else {
						var nuom = 0;
						if (this.paydj.navname == "任选二" || this.paydj.navname == "前二组选") {
							nuom = 2
						} else if (this.paydj.navname == "任选三" || this.paydj.navname == "前三组选") {
							nuom = 3
						} else if (this.paydj.navname == "任选四") {
							nuom = 4
						} else if (this.paydj.navname == "任选五") {
							nuom = 5
						} else if (this.paydj.navname == "任选六") {
							nuom = 6
						} else if (this.paydj.navname == "任选七") {
							nuom = 7
						} else if (this.paydj.navname == "任选八") {
							nuom = 8
						} else if (this.paydj.navname == "前一") {
							nuom = 1
						}
						rand3 = this.getRandom(rand3, nuom);
						this.paydj.data.push({
							"wanarr": [],
							"qianarr": [],
							"baiarr": rand3,
							"totalNum": 1
						})
					}
				} else if (this.paydj.danlist == "duplexList") {
					Toast("该玩法不支持随机！")
					return false;
				}
				var noteNum = 0;
				for (var i = 0; i < this.paydj.data.length; i++) {
					noteNum += this.paydj.data[i].totalNum;
				}
				this.noteNum = noteNum;
				setSession('data', this.paydj.data);
			},
			Randomfor: function() { // 随机五注
				for (var i = 0; i < 5; i++) {
					// if (parseInt(this.noteNum) >= 100) {
					// 	Toast('注单数量最多100注！');
					// 	return
					// }
					this.Randomone();
				}
			},
			addlist: function() { // 继续选号
				setSession('pay', 1);
				setSession('content', this.paydj);
				this.RouteLeave = true;
				this.$router.go(-1)
			},
			addset: function(idx) { // 继续编辑
				setSession('pay', 2);
				setSession('content', this.paydj);
				setSession('index', idx);
				this.RouteLeave = true;
				this.$router.go(-1)
			},
			closepaydata: function(index) {
				this.paydj.data.splice(index, 1);
				var noteNum = 0;
				for (var i = 0; i < this.paydj.data.length; i++) {
					noteNum += this.paydj.data[i].totalNum;
				}
				this.noteNum = noteNum;
				setSession('data', this.paydj.data);
			},
			generateRandom: function(count, nun) { // 随机数
				var rand = parseInt(((Math.random() * count) + nun));
				for (var i = 0; i < this.ccarray.length; i++) {
					if (this.ccarray[i] == rand) {
						return null
					}
				}
				return rand
			},
			getRandom: function(count, index) { // 随机数
				while (count.length < index) {
					var num = parseInt(((Math.random() * 11) + 1));
					if (count.indexOf(num) < 0) {
						count.push(num);
					}
				}
				return count;
			},
			fenx: function() { //分享
				this.shareStatue = true;
			},
			hideShare: function() {
				this.shareStatue = false;
			},
			openDownload: function() { //前往下载
				var newData = getCookie('newData');
				var link = OverallData().download
				if (newData) {
					window.open(link + '?_userId=' + newData.userid);
				} else {sportId}
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
			increase_qs: function() {
				if (this.qishu < 100) {
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
				if (this.xuanzStatue) {
					this.xuanzStatue = false;
				} else {
					this.xuanzStatue = true;
				}
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
					if (parseInt(mun) < 101 && parseInt(mun) > 0) {
						this.qishu = mun
					} else if (parseInt(mun) > 100) {
						this.qishu = '100'
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
					if (parseInt(mun) < 10000 && parseInt(mun) > 0) {
						this.multiple = mun
					} else if (parseInt(mun) > 9999) {
						this.multiple = '9999'
					} else {
						this.multiple = '0'
					}
				}
				// FastClick.attach(document.body);
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
				// FastClick.attach(document.body);
			},
			closenotenum: function() {
				MessageBox({
					title: '',
					message: '是否清空所有注单',
					showCancelButton: true,
				}).then(action => {
					if (action == 'confirm') {
						this.paydj.data = [];
						this.noteNum = 0;
						setSession('data', this.paydj.data);
					} else {
						return false;
					}
				})
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
			openSuccessWin: function() {
				if (parseInt(this.noteNum) < 1) {
					Toast('注数不能小于1注!');
					return
				}
				// if (parseInt(this.noteNum) > 100) {
				// 	Toast('注单数量最多100注!');
				// 	return false;
				// }
				if (parseInt(this.qishu) < 1) {
					this.qishu=1;
					Toast('投注期数不能小于1期!');
					return
				}
				if (parseInt(this.multiple) < 1) {
					this.multiple=1;
					Toast('投注倍数不能小于1倍!');
					return
				}
				if (this.Userprotocol) {
				this.payPopup = true;
				} else {
					Toast('请阅读并勾选委托投注规则!')
				}
			},
				paybtn: function() {
					this.payPopup=false;
				 var data = this.setData();
				 let _data = {...data};
				 data = this.Encrypt(_data);
				 var datas = this.Qs.stringify({
				 	"path": "number/keno/gdel11to5",
				 	data
				 }, {
				 	allowDots: true
				 });
				 
				 this.$ajax.post('/caipiaoshouye/index.php/home/index/createScheme',
				 		datas
				 	)
				 	.then(res => {
				 		console.log(res);
				 		if (res.data.status == 200) {
				 			var content = JSON.parse(res.data.content);
				 			if (content.code == 100000) {
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
				 				data["lotteryType"] = 19;
				 				data['periodNumber'] = this.periodNumber;
				 				data["shareType"] = 1;
				 				data["shareTime"] = myDate;
				 				data["uid"] = getCookie('newData').userid;
				 				data["multiple"] = this.multiple;
				 				data["schemeCost"] = this.noteNum * 2 * this.multiple * this.qishu;
				 				data["subscriptionMoney"] = this.noteNum * 2 * this.multiple * this.qishu;
				 				data["content"] = datacontent;
				 				data["quipmentiIp"] = CitySN; //投注IP
				 				data["quipmentTeype"] = 10; // 投注设备类型
				 				data["quipmentNumber"] = ''; //投注设备号
				 				data["quipmentUid"] = getCookie('newData').userid; // 投注UID
				 				data["quipmentOrderId"] = content.data.schemeNumber;
				 				let object = {...data}
				 				setSession('obj', object);
				 				setSession('moneyType', 'LOTTERYMONEY');
				 				this.RouteLeave = true;
				 				this.$router.push({
				 					name: 'goucai_success',
				 					query: {
				 						success: 'gdel11to5',
				 						schemeId: content.data.id,
				 						wcj_totalPrice: this.noteNum * 2 * this.multiple * this.qishu,
				 						from: 'pay',
				 						types: 'shuzi'
				 					}
				 				});
				 			} else {
				 				Toast(content.message);
				 			}
				 		}
				 	})
				 	.catch(err => {
				 		console.log(err);
				 		Toast('服务器繁忙，请稍后重试！')
				 	})
			},
			setData: function() {
				var data = [];
				var uid = getCookie('newData').userid;
				data.userId = uid; //拼接uid
				if (parseInt(this.qishu) > 1) { //判断是否追号
					data.chase = true;
				} else {
					data.chase = false;
				}
				var chaseMultipleList = []; //追号列表
				var qi = parseInt(this.qishu);
				var bei = parseInt(this.multiple);
				for (var i = 0; i < qi; i++) {
					chaseMultipleList.push(bei);
				}
				data.chaseMultipleList = chaseMultipleList;
				var content = [];
				var playType;
				var playMethod;
				if (this.paydj.danlist == "normalList") {
					for (var i = 0; i < this.paydj.data.length; i++) {
						var strdata = [];
						if (this.paydj.navname == "任选二") {
							playType = 'randomTwo';
							playMethod = 'normal';
							var betStr = this.paydj.data[i].baiarr.join(",");
						} else if (this.paydj.navname == "任选三") {
							playType = 'randomThree';
							playMethod = 'normal';
							var betStr = this.paydj.data[i].baiarr.join(",");
						} else if (this.paydj.navname == "任选四") {
							playType = 'randomFour';
							playMethod = 'normal';
							var betStr = this.paydj.data[i].baiarr.join(",");
						} else if (this.paydj.navname == "任选五") {
							playType = 'randomFive';
							playMethod = 'normal';
							var betStr = this.paydj.data[i].baiarr.join(",");
						} else if (this.paydj.navname == "任选六") {
							playType = 'randomSix';
							playMethod = 'normal';
							var betStr = this.paydj.data[i].baiarr.join(",");
						} else if (this.paydj.navname == "任选七") {
							playType = 'randomSeven';
							playMethod = 'normal';
							var betStr = this.paydj.data[i].baiarr.join(",");
						} else if (this.paydj.navname == "任选八") {
							playType = 'randomEight';
							playMethod = 'normal';
							var betStr = this.paydj.data[i].baiarr.join(",");
						} else if (this.paydj.navname == "前二组选") {
							playType = 'foreTwo';
							playMethod = 'group';
							var betStr = this.paydj.data[i].baiarr.join(",");
						} else if (this.paydj.navname == "前二直选") {
							playType = 'foreTwo';
							playMethod = 'direct';
							var betStr = this.paydj.data[i].wanarr.join(",") + "|" + this.paydj.data[i].qianarr.join(",");
						} else if (this.paydj.navname == "前三组选") {
							playType = 'foreThree';
							playMethod = 'group';
							var betStr = this.paydj.data[i].baiarr.join(",");
						} else if (this.paydj.navname == "前三直选") {
							playType = 'foreThree';
							playMethod = 'direct';
							var betStr = this.paydj.data[i].wanarr.join(",") + "|" + this.paydj.data[i].qianarr.join(",") + "|" + this.paydj
								.data[i].baiarr.join(",");
						} else if (this.paydj.navname == "前一") {
							playType = 'foreOne';
							playMethod = 'direct';
							var betStr = this.paydj.data[i].baiarr.join(",");
						}
						// strdata = {playMethod: playMethod,playType: playType,betContent: betStr,schemeUnits: this.paydj.data[i].totalNum};
						strdata.playMethod = playMethod;
						strdata.playType = playType;
						strdata.betContent = betStr;
						strdata.schemeUnits = this.paydj.data[i].totalNum;
						content.push({...strdata});
					}
				} else if (this.paydj.danlist == "duplexList") {
					for (var i = 0; i < this.paydj.data.length; i++) {
						var strdata = [];
						if (this.paydj.navname == "任选二") {
							playType = 'randomTwo';
							playMethod = 'duplex';
							var danten = this.paydj.data[i].wanarr.join(",");
							var betStr = this.paydj.data[i].qianarr.join(",");
						} else if (this.paydj.navname == "任选三") {
							playType = 'randomThree';
							playMethod = 'duplex';
							var danten = this.paydj.data[i].wanarr.join(",");
							var betStr = this.paydj.data[i].qianarr.join(",");
						} else if (this.paydj.navname == "任选四") {
							playType = 'randomFour';
							playMethod = 'duplex';
							var danten = this.paydj.data[i].wanarr.join(",");
							var betStr = this.paydj.data[i].qianarr.join(",");
						} else if (this.paydj.navname == "任选五") {
							playType = 'randomFive';
							playMethod = 'duplex';
							var danten = this.paydj.data[i].wanarr.join(",");
							var betStr = this.paydj.data[i].qianarr.join(",");
						} else if (this.paydj.navname == "任选六") {
							playType = 'randomSix';
							playMethod = 'duplex';
							var danten = this.paydj.data[i].wanarr.join(",");
							var betStr = this.paydj.data[i].qianarr.join(",");
						} else if (this.paydj.navname == "任选七") {
							playType = 'randomSeven';
							playMethod = 'duplex';
							var danten = this.paydj.data[i].wanarr.join(",");
							var betStr = this.paydj.data[i].qianarr.join(",");
						} else if (this.paydj.navname == "任选八") {
							playType = 'randomEight';
							playMethod = 'duplex';
							var danten = this.paydj.data[i].wanarr.join(",");
							var betStr = this.paydj.data[i].qianarr.join(",");
						} else if (this.paydj.navname == "前二组选") {
							playType = 'foreTwo';
							playMethod = 'groupDuplex';
							var danten = this.paydj.data[i].wanarr.join(",");
							var betStr = this.paydj.data[i].qianarr.join(",");
						} else if (this.paydj.navname == "前三组选") {
							playType = 'foreThree';
							playMethod = 'groupDuplex';
							var danten = this.paydj.data[i].wanarr.join(",");
							var betStr = this.paydj.data[i].qianarr.join(",");
						}
						// strdata = {playMethod: playMethod,playType: playType,betContentDan:danten,betContent: betStr,schemeUnits: this.paydj.data[i].totalNum};
						strdata.playMethod = playMethod;
						strdata.playType = playType;
						strdata.betContentDan = danten;
						strdata.betContent = betStr;
						strdata.schemeUnits = this.paydj.data[i].totalNum;
						content.push({...strdata});
					}
				}
				data.content = content;
				data.isSingle = "normal"; //isSingle
				var schemeMultiple = this.multiple; //投注倍数
				data.schemeMultiple = schemeMultiple;
				data.secretType = "FULL_PUBLIC"; //方案保密类型
				data.shareType = "SELF"; //自购|合买
				if (this.xuanzStatue) { //中奖后停止追号
					data.winstopstyle = true;
				} else {
					data.winstopstyle = false;
				}
				data.moneyType = "LOTTERYMONEY"; //币种
				console.log(JSON.stringify(data));
				return data;
			},
			JumpUserprotocol() {
				this.RouteLeave = true;
				this.$router.push({
					name: 'agreement'
				});
			},
		}
	}
</script>

<style scoped>
	@import "../../css/goucai_szcpay.css";

	header {
		position: fixed !important;
	}

	#mc_qlcpay {
		font-size: 0.8rem;
		margin-top: 2.25rem;
		background: #f2f2f2;
		min-height: 100vh;
	}
</style>
