<template>
	<div>
		<!-- 		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="closeWins()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title" style="text-overflow: inherit;left: 3rem;right:4.5rem">北京单场{{typeList[playType].name}}</div>
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
				<div class="aui-title" tapmode>北京单场 </div>
			</div>
			<div class="aui-pull-right aui-btn top-more" @click="open_hemai()" tapmode>
				发起合买
			</div>
		</header>
		<div class="jjc_bjdcpay" id="jjc_zp" v-if='lcbList'>
			<!-- 付款页面头部 -->
			<div class="jjcpay_head">
				<!-- <p>已选<span>{{lcbList.length}}</span>场 投注截止：<span>{{stopBuyTime|capitalize(1)}}</span></p> -->
				<p><span>已选{{lcbList.length}}场</span> <span class="jiez">{{stopBuyTime|capitalize(1)}}截止</span></p>
			</div>

			<!-- 让球胜平负 -->
			<div v-cloak v-if="playType == 0" class="main jjc_rqspf_pay" id="bjdc_rpsqf">
				<template v-for="(item,index) in lcbList">
					<div class="con">
						<div class="titl">
							<p class="flr p1">{{item.weekStr}}{{item.lineId}} {{item.gameName}} <span>{{item.stopBuyTime|capitalize(1)}}</span></p>
							<p class="fgr p2"><span>(主)</span> {{item.homeTeamName}} vs {{item.guestTeamName}} <span>(客)</span></p>
						</div>
						<div class="battle">
							<div class="close flr" @click="deleteList(index)"></div>
							<div class="battle_shel fgr">
								<ul>
									<li v-if="item.handicap>0" style="background-color:#fb6b63;border-color:#fb6b63;"><span>主</span><br /><span>{{item.handicap}}</span></li>
									<li v-else-if="item.handicap==0" style="background-color:#c4c4c4;border-color:#c4c4c4;"><span>主</span><br /><span>{{item.handicap}}</span></li>
									<li v-else style="background-color:#69bc14"><span>主</span><br /><span>{{item.handicap}}</span></li>
									<li :class="{ 'active': item.stateArr.z0 }" @click="modifyBetting(index,'z0',item.sp[0])"><span>{{item.homeTeamName}}</span><br /><span>胜{{item.sp[0]}}</span></li>
									<li :class="{ 'active': item.stateArr.z1 }" @click="modifyBetting(index,'z1',item.sp[1])"><span>VS</span><br /><span>平{{item.sp[1]}}</span></li>
									<li :class="{ 'active': item.stateArr.z2 }" @click="modifyBetting(index,'z2',item.sp[2])"><span>{{item.guestTeamName}}</span><br /><span>负{{item.sp[2]}}</span></li>
									<li class="dan" :class="{ 'active': item.stateArr.dan }" @click="xuandan(index)">胆</li>
								</ul>
							</div>
						</div>
					</div>
				</template>
				<div class="add_ss" @click="addList">
					<p>添加/编辑赛事</p>
				</div>
			</div>
			<!-- 总进球数 -->
			<div v-cloak v-if="playType == 1" class="main jjc_zjqs_pay" id="bjdc_zjqs">
				<template v-for="(item,index) in lcbList">
					<div class="con">
						<div class="titl">
							<p class="flr p1">{{item.weekStr}}{{item.lineId}} {{item.gameName}} <span>{{item.stopBuyTime|capitalize(1)}}</span></p>
							<p class="fgr p2"><span>(主)</span> {{item.homeTeamName}} vs {{item.guestTeamName}} <span>(客)</span>
							</p>
						</div>
						<div class="battle">
							<div class="close flr" @click="deleteList(index)"></div>
							<div class="battle_shel fgr">
								<ul>
									<li class="dan" :class="{ 'active': item.stateArr.dan }" @click="xuandan(index)">胆</li>
									<li :class="{ 'active': item.stateArr.z0 }" @click="modifyBetting(index,'z0',item.sp[0])"><span>0球</span><br /><span>{{item.sp[0]}}</span></li>
									<li :class="{ 'active': item.stateArr.z1 }" @click="modifyBetting(index,'z1',item.sp[1])"><span>1球</span><br /><span>{{item.sp[1]}}</span></li>
									<li :class="{ 'active': item.stateArr.z2 }" @click="modifyBetting(index,'z2',item.sp[2])"><span>2球</span><br /><span>{{item.sp[2]}}</span></li>
									<li :class="{ 'active': item.stateArr.z3 }" @click="modifyBetting(index,'z3',item.sp[3])"><span>3球</span><br /><span>{{item.sp[3]}}</span></li>
									<li :class="{ 'active': item.stateArr.z4 }" @click="modifyBetting(index,'z4',item.sp[4])"><span>4球</span><br /><span>{{item.sp[4]}}</span></li>
									<li :class="{ 'active': item.stateArr.z5 }" @click="modifyBetting(index,'z5',item.sp[5])"><span>5球</span><br /><span>{{item.sp[5]}}</span></li>
									<li :class="{ 'active': item.stateArr.z6 }" @click="modifyBetting(index,'z6',item.sp[6])"><span>6球</span><br /><span>{{item.sp[6]}}</span></li>
									<li :class="{ 'active': item.stateArr.z7 }" @click="modifyBetting(index,'z7',item.sp[7])"><span>7+球</span><br /><span>{{item.sp[7]}}</span></li>
								</ul>
							</div>
						</div>
					</div>
				</template>
				<div class="add_ss" @click="addList">
					<p>添加/编辑赛事</p>
				</div>
			</div>
			<!-- 半全场 -->
			<div v-cloak v-if="playType == 2" class="main jjc_bqc_pay" id="bjdc_bqc">
				<template v-for="(item,index) in lcbList">
					<div class="con">
						<div class="titl">
							<p class="flr p1">{{item.weekStr}}{{item.lineId}} {{item.gameName}} <span>{{item.stopBuyTime|capitalize(1)}}</span></p>
							<p class="fgr p2"><span>(主)</span> {{item.homeTeamName}} vs {{item.guestTeamName}} <span>(客)</span>
							</p>
						</div>
						<div class="battle">
							<div class="close flr bqc_close" @click="deleteList(index)"></div>
							<div class="battle_shel fgr">
								<ul class="ul_ts" id="bqc_ul">
									<li class="dan bqc_dan" :class="{ 'active': item.stateArr.dan }" @click="xuandan(index)">胆</li>
									<li v-if="item.stateArr.z0"><span>胜-胜</span><br /><span>{{item.sp[0]}}</span></li>
									<li v-if="item.stateArr.z1"><span>胜-平</span><br /><span>{{item.sp[1]}}</span></li>
									<li v-if="item.stateArr.z2"><span>胜-负</span><br /><span>{{item.sp[2]}}</span></li>
									<li v-if="item.stateArr.z3"><span>平-胜</span><br /><span>{{item.sp[3]}}</span></li>
									<li v-if="item.stateArr.z4"><span>平-平</span><br /><span>{{item.sp[4]}}</span></li>
									<li v-if="item.stateArr.z5"><span>平-负</span><br /><span>{{item.sp[5]}}</span></li>
									<li v-if="item.stateArr.z6"><span>负-胜</span><br /><span>{{item.sp[6]}}</span></li>
									<li v-if="item.stateArr.z7"><span>负-平</span><br /><span>{{item.sp[7]}}</span></li>
									<li v-if="item.stateArr.z8"><span>负-负</span><br /><span>{{item.sp[8]}}</span></li>
								</ul>
							</div>
						</div>
					</div>
				</template>
				<div class="add_ss" @click="addList">
					<p>添加/编辑赛事</p>
				</div>
			</div>
			<!-- 比分 -->
			<div v-cloak v-if="playType == 3" class="main jjc_bqc_pay" id="bjdc_bf">
				<template v-for="(item,index) in lcbList">
					<div class="con">
						<div class="titl">
							<p class="flr p1">{{item.weekStr}}{{item.lineId}} {{item.gameName}} <span>{{item.stopBuyTime|capitalize(1)}}</span></p>
							<p class="fgr p2"><span>(主)</span> {{item.homeTeamName}} vs {{item.guestTeamName}} <span>(客)</span>
							</p>
						</div>
						<div class="battle">
							<div class="close flr bf_close" @click="deleteList(index)"></div>
							<div class="battle_shel fgr">
								<ul class="ul_ts" id="bf_ul">
									<li class="dan bf_dan" :class="{ 'active': item.stateArr.dan }" @click="xuandan(index)">胆</li>
									<li v-if="item.stateArr.z0"><span>1:0</span><br /><span>{{item.sp[0]}}</span></li>
									<li v-if="item.stateArr.z1"><span>2:0</span><br /><span>{{item.sp[1]}}</span></li>
									<li v-if="item.stateArr.z2"><span>2:1</span><br /><span>{{item.sp[2]}}</span></li>
									<li v-if="item.stateArr.z3"><span>3:0</span><br /><span>{{item.sp[3]}}</span></li>
									<li v-if="item.stateArr.z4"><span>3:1</span><br /><span>{{item.sp[4]}}</span></li>
									<li v-if="item.stateArr.z5"><span>3:2</span><br /><span>{{item.sp[5]}}</span></li>
									<li v-if="item.stateArr.z6"><span>4:0</span><br /><span>{{item.sp[6]}}</span></li>
									<li v-if="item.stateArr.z7"><span>4:1</span><br /><span>{{item.sp[7]}}</span></li>
									<li v-if="item.stateArr.z8"><span>4:2</span><br /><span>{{item.sp[8]}}</span></li>
									<li v-if="item.stateArr.z9"><span>胜其他</span><br /><span>{{item.sp[9]}}</span></li>
									<li v-if="item.stateArr.z10"><span>0:0</span><br /><span>{{item.sp[10]}}</span></li>
									<li v-if="item.stateArr.z11"><span>1:1</span><br /><span>{{item.sp[11]}}</span></li>
									<li v-if="item.stateArr.z12"><span>2:2</span><br /><span>{{item.sp[12]}}</span></li>
									<li v-if="item.stateArr.z13"><span>3:3</span><br /><span>{{item.sp[13]}}</span></li>
									<li v-if="item.stateArr.z14"><span>平其他</span><br /><span>{{item.sp[14]}}</span></li>
									<li v-if="item.stateArr.z15"><span>0:1</span><br /><span>{{item.sp[15]}}</span></li>
									<li v-if="item.stateArr.z16"><span>0:2</span><br /><span>{{item.sp[16]}}</span></li>
									<li v-if="item.stateArr.z17"><span>1:2</span><br /><span>{{item.sp[17]}}</span></li>
									<li v-if="item.stateArr.z18"><span>0:3</span><br /><span>{{item.sp[18]}}</span></li>
									<li v-if="item.stateArr.z19"><span>1:3</span><br /><span>{{item.sp[19]}}</span></li>
									<li v-if="item.stateArr.z20"><span>2:3</span><br /><span>{{item.sp[20]}}</span></li>
									<li v-if="item.stateArr.z21"><span>0:4</span><br /><span>{{item.sp[21]}}</span></li>
									<li v-if="item.stateArr.z22"><span>1:4</span><br /><span>{{item.sp[22]}}</span></li>
									<li v-if="item.stateArr.z23"><span>2:4</span><br /><span>{{item.sp[23]}}</span></li>
									<li v-if="item.stateArr.z24"><span>负其他</span><br /><span>{{item.sp[24]}}</span></li>
								</ul>
							</div>
						</div>
					</div>
				</template>
				<div class="add_ss" @click="addList">
					<p>添加/编辑赛事</p>
				</div>
			</div>
			<!-- 上下单双 -->
			<div v-cloak v-if="playType == 4" class="main jjc_sxds_pay" id="bjdc_sxds">
				<template v-for="(item,index) in lcbList">
					<div class="con">
						<div class="titl">
							<p class="flr p1">{{item.weekStr}}{{item.lineId}} {{item.gameName}} <span>{{item.stopBuyTime|capitalize(1)}}</span></p>
							<p class="fgr p2"><span>(主)</span> {{item.homeTeamName}} vs {{item.guestTeamName}} <span>(客)</span>
							</p>
						</div>
						<div class="battle">
							<div class="close flr" @click="deleteList(index)"></div>
							<div class="battle_shel fgr">
								<ul>
									<li :class="{ 'active': item.stateArr.z0 }" @click="modifyBetting(index,'z0',item.sp[0])"><span>上单</span><br /><span>{{item.sp[0]}}</span></li>
									<li :class="{ 'active': item.stateArr.z1 }" @click="modifyBetting(index,'z1',item.sp[1])"><span>上双</span><br /><span>{{item.sp[1]}}</span></li>
									<li :class="{ 'active': item.stateArr.z2 }" @click="modifyBetting(index,'z2',item.sp[2])"><span>下单</span><br /><span>{{item.sp[2]}}</span></li>
									<li :class="{ 'active': item.stateArr.z3 }" @click="modifyBetting(index,'z3',item.sp[3])"><span>下双</span><br /><span>{{item.sp[3]}}</span></li>
									<li class="dan" :class="{ 'active': item.stateArr.dan }" @click="xuandan(index)">胆</li>
								</ul>
							</div>
						</div>
					</div>
				</template>
				<div class="add_ss" @click="addList">
					<p>添加/编辑赛事</p>
				</div>
			</div>


			<!-- 底部倍数 -->
			<div class="bottom">
				<div class="agree">
					<div class="check"><b tapmode @click="onUserprotocol"><i :class="[ 'flr' , { 'active': Userprotocol }]"></i></b>
						<p class="flr">我已阅读并同意<span @click="JumpUserprotocol">《委托投注规则》</span></p>
					</div>
				</div>
				<div class="bt_text">
					<div class="flr data" @click=" showMask = true ">
						<template v-for="(items,indexs) in lcbListfs">
							{{items}}
						</template>
					</div>
					<div class="fgr multiple">
						<div class="jian flr" @click="reduce"></div>
						<div class="beishu flr" @click="showkeyboard = true ,coverage=true">
							<span>{{ multiple }}</span>倍
						</div>
						<div class="jia flr" @click="increase"></div>
					</div>
				</div>
				<!-- 				<footer>
					<div class="delete flr" @click="deleteqk"></div>
					<div class="total flr">
						<p>共{{lcbListlength}}注 {{ multiple }}倍<span>{{totle}}</span>元</p>
						<p class="p2">预测奖金 <span>{{ycjj[0]}} - {{ycjj[1]}}</span>元</p>
					</div>
					<div class="pay fgr" @click="onpay">付款</div>
				</footer> -->
				<footer>
    <div class="ft_money flr">
      <p>共{{lcbListlength}}注{{multiple}}倍<span class="rit_tow">{{(totle).toFixed(2)}}</span>元</p>
    <p class="p2">预测奖金 <span>{{ycjj[0]|tranNumber()}} - {{ycjj[1]|tranNumber()}}</span>元</p>
    </div>
    <div class="ft_btn fgr">
      <div class="flr" tapmode >

						</div>
						<div class="flr" tapmode @click="onpay()">付款</div>
					</div>
				</footer>
			</div>
			<!-- 2串1点击弹出窗 -->
			<div v-if="showMask" class="mask">
				<div class="popup_chuan">
					<div class="title">自由过关</div>
					<div class="text">
						<ul v-if="playType==2">
							<li v-for="(item,index) in Stringnumber" :class="{ 'active': item.state }" @click='onStringnumber(index)' v-if='index<4'>{{ item.name }}</li>
						</ul>
						<ul v-else>
							<li v-for="(item,index) in Stringnumber" :class="{ 'active': item.state }" @click='onStringnumber(index)'>{{ item.name }}</li>
						</ul>
					</div>
					<div class="qued_btn" @click="StringnumberSure">确定</div>
				</div>
			</div>
			<!-- 模拟数字键盘 -->
			<div v-if="showkeyboard" class="keyboard">
				<div class="hidekey" @click="closekeyboard"></div>
				<div class="cont-f">
					<div class="bt_text">
						<div class="flr data" @click="hideshowMask"> <template v-for="(items,indexs) in lcbListfs">
								{{items}}
							</template></div>
						<div class="fgr multiple">
							<div class="jian flr" @click="reduce"></div>
							<div class="beishu flr">
								<span>{{ multiple }}</span>倍
							</div>
							<div class="jia flr" @click="increase"></div>
						</div>
					</div>
					<footer>
					  <div class="ft_money flr">
					    <p>共{{lcbListlength}}注{{multiple}}倍<span class="rit_tow">{{(totle).toFixed(2)}}</span>元</p>
					  <p class="p2">预测奖金 <span>{{ycjj[0].toFixed(2)|tranNumber()}} - {{ycjj[1].toFixed(2)|tranNumber()}}</span>元</p>
					  </div>
					  <div class="ft_btn fgr">
					    <div class="flr" tapmode >
					
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
		<module-pay :payPopupP='payPopup' :payMoneyP='payMoney' :coinsMoneyP='coinsMoney' :cashMoneyP='cashMoney'
		 :opnenWeixinP='opnenWeixin' :opnenBankopenP='opnenBankopen' :hasHongbaoP='false' :typeName='"北京单场"' @payPopupC="payPopupC"
		 @RouteLeaveC='RouteLeaveC' @paybtn='paybtn' @paylogok='paylogok'>
		</module-pay>
		<checkok-nav :logokz='logok' @showbox="showbox"></checkok-nav>
	</div>
</template>

<script>
	var totalArr = [];
	import phone from "../../js/connector.js";
	 
	import {
		varietymaxPrizeAndCost,
		danmaxPrizeAndCost
	} from "../../js/maxPrizeAndCost.js";
	import {
		getSession,
		setSession,
		getCookie,
		compare,
		getTime
	} from '../../js/common.js';
	import {
		Toast,
		MessageBox
	} from 'mint-ui';
	import checkokNav from '../../common/checkok.vue';
	import modulePay from '../../common/modulepay.vue';
	export default {
		components: {
			checkokNav,
			modulePay
		},
		data() {
			return {
				logok: false, //未实名标志
				'multiple': '1',
				coverage: true, //键盘第一次唤起
				'showkeyboard': false,
				'showMask': false,
				'Userprotocol': true,
				'stopBuyTime': '',
				'ycjj': [],
				'playType': 0,
				'Stringnumber': [{
					'name': '单关固赔',
					'id': 'P1_1',
					'state': true
				}],
				'typeList': [{
					'id': '0',
					'name': '让球胜平负',
					'play': 'SPF',
				}, {
					'id': '1',
					'name': '总进球数',
					'play': 'ZJQS',
				}, {
					'id': '2',
					'name': '半全场',
					'play': 'BQQSPF',
				}, {
					'id': '3',
					'name': '比分',
					'play': 'BF',
				}, {
					'id': '4',
					'name': '上下单双',
					'play': 'SXDS',
				}],
				'lcbList': [],
				'stoptime': '',
				'totle': 0,
				'lcbListlength': 1,
				'lcbListfs': ['单关固赔'],
				'periodNumber': '',
				'matchTimes': '',
				'totalNum': '',
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
						sessionStorage.removeItem('arr');
						sessionStorage.removeItem('parr');
						next()
					} else {
						next(false)
					}
				})
			}
		},
		created() {
			let payid = getSession('palyIndex');
			let BetArr = getSession('arr');
			this.playType = payid;
			this.lcbList = BetArr;
			this.stopBuyTime = BetArr[0].matchTime;
			this.periodNumber = BetArr[0].periodNumber;
			this.matchTimes = BetArr[0].matchTime;
			let keyLng = 0;
			switch (this.playType) {
				case 0:
					keyLng = 3;
					break;
				case 1:
					keyLng = 8;
					break;
				case 2:
					keyLng = 9;
					break;
				case 3:
					keyLng = 25;
					break;
				case 4:
					keyLng = 4;
					break;
			}
			var totalArr = [];
			for (var i = 0; i < BetArr.length; i++) {
				var zs = 0;
				for (var n = 0; n < keyLng; n++) {
					if (BetArr[i].stateArr['z' + n]) {
						zs += 1;
					}
				}
				if (zs) {
					totalArr.push(zs);
				}
				if (i > 0) {
					this.Stringnumber.push({
						'name': i + 1 + "串1",
						'id': 'P' + (i + 1) + '_1',
						'state': false
					});
				}
			}
			this.lcbListlength = this.gettotalNum(totalArr);
			this.totle = this.multiple * this.lcbListlength * 2;
			this.bjdc_maxPrizeAndCost();
			this.getUserInfo();
			this.checkIsWx();
		},
		mounted() {

		},
		updated: function() {
			this.payMoney = this.multiple * this.lcbListlength * 2;
			console.log(this.payMoney);
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
			closeWins: function() {
				this.$router.go(-1);
			},
			open_hemai: function() {
				var data = this.setData(this.lcbList, this.multiple, this.totalNum, this.playType);
				let dataes = this.Qs.stringify({
					data
				});
				sessionStorage.setItem('hemaiData', dataes)
				// setSession('hemaiData',dataes);
				//				let Fnumber = parseInt(this.noteNum) * parseInt(this.multiple) * 2;
				if(this.multiple<1){
				  this.multiple=1;
				  Toast("投注倍数不得小于1倍!");
				  return false;
				}
				if (this.totle < 1) {
					Toast("请至少选择一注!");
					return false;
				}
				if(!this.Userprotocol){
					Toast("请阅读并勾选委托投注规则！");
					return false;
				}
				this.RouteLeave = true
				this.$router.push({
					path: '/goucai/goucai_hemai',
					query: {
						'pageName': 'jc/dczc',
						'Fnumber': this.totle,
						'payid': 'dczc',
					}
				})
			},
			JumpUserprotocol: function() {
				this.RouteLeave = true;
				this.$router.push({
					name: 'agreement'
				})
			},
			addList: function() {
				for (let i = 0; i < this.lcbList.length;) {
					if (!this.lcbList[i].stateArr.z) {
						this.lcbList.splice(i, 1);
					} else {
						i++
					}
				}
				setSession('arr', this.lcbList);
				this.RouteLeave = true
				this.$router.go(-1)
			},
			xuandan: function(key) {
				var arr = this.filtersarr_baoliu(this.lcbList);
				if (!arr[key].stateArr['dan']) {
					for (var i = 1; i < this.Stringnumber.length; i++) {
						if (this.Stringnumber[i]["state"]) {
							var dansz = 0;
							for (var z = 0; z < arr.length; z++) {
								if (arr[z].stateArr['dan']) {
									dansz += 1;
								}
							}
							if (arr.length > (i + 1) && dansz < i) {
								if (arr[key].stateArr['z']) {
									this.lcbList[key].stateArr['dan'] = true;
								}
							}
							break;
						}
					}
				} else {
					this.lcbList[key].stateArr['dan'] = false;
				}
				var totalArr = [];
				for (var i = 0; i < this.lcbList.length; i++) {
					var zs = 0;
					for (var n = 0; n <= 24; n++) {
						if (this.lcbList[i].stateArr['z' + n]) {
							zs += 1;
						}
					}
					for (var k = 0; k < 4; k++) {
						if (this.lcbList[i].stateArr['k' + k]) {
							zs += 1;
						}
					}
					if (zs) {
						totalArr.push(zs);
					}
				}
				this.lcbListlength = this.gettotalNum(totalArr);
				this.totle = this.multiple * this.lcbListlength * 2;
				this.bjdc_maxPrizeAndCost();
				this.lcbListfs = [];
				for (var l = 0; l < this.Stringnumber.length; l++) {
					if (this.Stringnumber[l].state) {
						this.lcbListfs.push(this.Stringnumber[l].name);
					}
				}
			},
			//付款
			onpay: function() {
				if (!this.Userprotocol) {
					Toast('请阅读并勾选委托投注规则');
					return false;
				}
				// console.log(this.totalNum);
				if (parseInt(this.lcbListlength) < 1) {
					Toast('注数不能小于1注！');
					return false;
				}
				if (parseInt(this.multiple) < 1) {
					this.multiple=1;
					this.totle = this.multiple * this.lcbListlength * 2;
					this.bjdc_maxPrizeAndCost();
					Toast('投注倍数不能小于1倍！');
					return
				}
				this.payPopup = true;

			},
			paybtn: function() {
				this.payPopup = false;
				let playType = this.playType;
				console.log(this.lcbList);
				let data = this.setData(this.lcbList, this.multiple, this.totalNum, this.playType);
				if (data === false) {
					return false;
				}
				let _data = {...data};
				data = this.Encrypt(_data);
				let dataes = this.Qs.stringify({
					path: 'jc/dczc',
					data: data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/createScheme', dataes).then(ret => {
					if (ret.status == 200) {
						let content = JSON.parse(ret.data.content);
						if (content.code == 100000) {

							var datacontent = this.setData(this.lcbList, this.multiple, this.totalNum, this.playType)['ticketContent'];
							var data = [];
							var myDate = new Date();
							myDate = getTime(myDate, 2);
							var CitySN;
							if (getSession('equipmentIp')) {
								CitySN = getSession('equipmentIp');
							}
							// obj.id=;
							data["mid"] = 1;
							data["lotteryType"] = 7;
							data['periodNumber'] = '';
							data["shareType"] = 1;
							data["shareTime"] = myDate;
							data["uid"] = getCookie('newData').userid;
							data["multiple"] = this.multiple;
							data["schemeCost"] = this.totle;
							data["subscriptionMoney"] = this.totle;
							data["content"] = datacontent;
							data['prizeAwards'] = '';
							data["quipmentiIp"] = CitySN; //投注IP 
							data["quipmentTeype"] = 10; // 投注设备类型
							data["quipmentNumber"] = ''; //投注设备号
							data["quipmentUid"] = getCookie('newData').userid; // 投注UID
							data["quipmentOrderId"] = content.data.schemeNumber;
							let object = {...data}
							setSession('obj', object);
							this.RouteLeave = true;
							sessionStorage.removeItem('arr');
							sessionStorage.removeItem('parr');
							sessionStorage.removeItem('shaixuan');
							setSession('moneyType', 'LOTTERYMONEY');
							this.$router.push({
								path: '/goucai/goucai_success',
								query: {
									success: 'dczc',
									schemeId: content.data.schemeId,
									wcj_totalPrice: this.totle,
									from: 'pay',
									types: 'jingji'
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
			// 键盘操作
			increase: function() {
				var totalArr = [];
				for (var i = 0; i < this.lcbList.length; i++) {
					var zs = 0;
					for (var n = 0; n <= 24; n++) {
						if (this.lcbList[i].stateArr['z' + n]) {
							zs += 1;
						}
					}
					for (var k = 0; k < 4; k++) {
						if (this.lcbList[i].stateArr['k' + k]) {
							zs += 1;
						}
					}
					if (zs) {
						totalArr.push(zs);
					}
				}
				this.lcbListlength = this.gettotalNum(totalArr);
				if (this.multiple < 9999) {
					this.multiple = this.multiple * 1 + 1 + '';
					this.totle = this.multiple * this.lcbListlength * 2;
				}
				this.bjdc_maxPrizeAndCost();
			},
			reduce: function() {
				var totalArr = [];
				for (var i = 0; i < this.lcbList.length; i++) {
					var zs = 0;
					for (var n = 0; n <= 24; n++) {
						if (this.lcbList[i].stateArr['z' + n]) {
							zs += 1;
						}
					}
					for (var k = 0; k < 4; k++) {
						if (this.lcbList[i].stateArr['k' + k]) {
							zs += 1;
						}
					}
					if (zs) {
						totalArr.push(zs);
					}
				}
				this.lcbListlength = this.gettotalNum(totalArr);
				if (this.multiple > 1) {
					this.multiple = this.multiple * 1 - 1 + '';
					this.totle = this.multiple * this.lcbListlength * 2;
				}
				this.bjdc_maxPrizeAndCost();
			},
			keyinputidx: function(idx) {
				var mun = ''
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
				var totalArr = [];
				for (var i = 0; i < this.lcbList.length; i++) {
					var zs = 0;
					for (var n = 0; n <= 24; n++) {
						if (this.lcbList[i].stateArr['z' + n]) {
							zs += 1;
						}
					}
					for (var k = 0; k < 4; k++) {
						if (this.lcbList[i].stateArr['k' + k]) {
							zs += 1;
						}
					}
					if (zs) {
						totalArr.push(zs);
					}
				}
				this.lcbListlength = this.gettotalNum(totalArr);
				this.totle = this.multiple * this.lcbListlength * 2;
				this.bjdc_maxPrizeAndCost();
			},
			keybackspace: function() {
				this.coverage = false;
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
				var totalArr = [];
				for (var i = 0; i < this.lcbList.length; i++) {
					var zs = 0;
					for (var n = 0; n <= 24; n++) {
						if (this.lcbList[i].stateArr['z' + n]) {
							zs += 1;
						}
					}
					for (var k = 0; k < 4; k++) {
						if (this.lcbList[i].stateArr['k' + k]) {
							zs += 1;
						}
					}
					if (zs) {
						totalArr.push(zs);
					}
				}
				this.lcbListlength = this.gettotalNum(totalArr);
				this.totle = this.multiple * this.lcbListlength * 2;
				this.bjdc_maxPrizeAndCost();
			},
			closekeyboard: function() {
				this.showkeyboard = false;
				if (this.multiple == '0') {
					this.multiple = '1'
				}
				this.totle = this.multiple * this.lcbListlength * 2;
				this.bjdc_maxPrizeAndCost();
			},
			hideshowMask: function() {
				this.showkeyboard = false;
				this.showMask = true;
				if (this.multiple == '0') {
					this.multiple = '1'
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
				this.lcbListfs = [];
				var strn = 0;
				for (var i = 0; i < this.Stringnumber.length; i++) {
					if (this.Stringnumber[i].state) {
						this.lcbListfs.push(this.Stringnumber[i].name);
						strn = 1;
					}
				}
				if (!strn) {
					this.lcbListfs.push(this.Stringnumber[0].name);
					this.Stringnumber[0].state = true;
				}
				var totalArr = [];
				for (var i = 0; i < this.lcbList.length; i++) {
					var zs = 0;
					this.lcbList[i].stateArr["dan"] = false;
					for (var n = 0; n <= 24; n++) {
						if (this.lcbList[i].stateArr['z' + n]) {
							zs += 1;
						}
					}
					for (var k = 0; k < 4; k++) {
						if (this.lcbList[i].stateArr['k' + k]) {
							zs += 1;
						}
					}
					totalArr.push(zs);
				}
				this.lcbListlength = this.gettotalNum(totalArr);
				this.totle = this.multiple * this.lcbListlength * 2;
				this.bjdc_maxPrizeAndCost();
				this.showMask = false
			},
			deleteList: function(idx) {
				this.Stringnumber = [];
				this.lcbList.splice(idx, 1);
				if (!this.lcbList.length) {
					this.lcbList = [];
					this.totalNum = 0;
					sessionStorage.removeItem('arr');
					this.RouteLeave = true
					this.$router.go(-1)
					return false;
				}
				var totalArr = [];
				for (var i = 0; i < this.lcbList.length; i++) {
					var zs = 0;
					for (var n = 0; n <= 24; n++) {
						if (this.lcbList[i].stateArr['z' + n]) {
							zs += 1;
						}
					}
					for (var k = 0; k < 4; k++) {
						if (this.lcbList[i].stateArr['k' + k]) {
							zs += 1;
						}
					}
					if (zs) {
						totalArr.push(zs);
						if (i > 0) {
							this.Stringnumber.push({
								'name': i + 1 + "串1",
								'id': 'P' + (i + 1) + '_1',
								'state': false
							});
						} else {
							this.Stringnumber.push({
								'name': "单关固赔",
								'id': 'P' + (i + 1) + '_1',
								'state': true
							});
						}
					}
				}
				this.lcbListfs = ["单关固赔"];
				this.lcbListlength = this.gettotalNum(totalArr);
				this.totle = this.multiple * this.lcbListlength * 2;
				this.bjdc_maxPrizeAndCost();
				setSession('arr', this.lcbList);
			},
			deleteqk: function() {
				MessageBox({
					title: '',
					message: '您确定要清空当前投注内容吗',
					showCancelButton: true,
				}).then(action => {
					if (action == 'confirm') {
						this.lcbList = [];
						this.totalNum = 0;
						sessionStorage.removeItem('arr');
						this.RouteLeave = true
						this.$router.go(-1)
					} else {

					}
				})
			},
			onUserprotocol: function() {
				if (this.Userprotocol) {
					this.Userprotocol = false
				} else {
					this.Userprotocol = true
				}
			},
			modifyBetting: function(idx, key, sp) {
				if (sp == '--') {
					Toast('不能选择暂无赔率的赛事。')
					return false;
				}
				var state = this.lcbList[idx].stateArr[key];
				if (sp <= 0) {
					Toast("该注数赔率不存在不可选取");
					return false;
				}
				if (state) {
					state = false;
				} else {
					state = true
				}
				let keyLng = 0;
				switch (this.playType) {
					case 0:
						keyLng = 3;
						break;
					case 1:
						keyLng = 8;
						break;
					case 2:
						keyLng = 9;
						break;
					case 3:
						keyLng = 25;
						break;
					case 4:
						keyLng = 4;
						break;
				}
				this.lcbList[idx].stateArr[key] = state;
				if (state) {
					this.lcbList[idx].stateArr.z = 1
				} else {
					for (var n = 0; n < keyLng; n++) {
						if (this.lcbList[idx].stateArr['z' + n]) {
							this.lcbList[idx].stateArr.z = 1
							break;
						} else {
							this.lcbList[idx].stateArr.z = 0
						}
					}
				}
				var totalArr = [];
				for (var i = 0; i < this.lcbList.length; i++) {
					var zs = 0;
					for (var n = 0; n < keyLng; n++) {
						if (this.lcbList[i].stateArr['z' + n]) {
							zs += 1;
						}
					}
					if (zs) {
						totalArr.push(zs);
					}
				}
				if (!state) {
					var szs = 0;
					for (var n = 0; n <= 24; n++) {
						if (this.lcbList[idx].stateArr['z' + n]) {
							szs += 1;
						}
					}
					if (!szs) {
						this.lcbListfs = [];
						for (var l = 0; l < this.Stringnumber.length; l++) {
							this.Stringnumber[l].state = false;
						}
						this.Stringnumber[0].state = true;
						this.lcbListfs.push("单关固赔");
					}
				}
				this.lcbListlength = this.gettotalNum(totalArr);
				this.totle = this.multiple * this.lcbListlength * 2;
				this.bjdc_maxPrizeAndCost();
				setSession('arr', this.lcbList);
			},
			bjdc_maxPrizeAndCost: function() {
				var bjdc_fs = [];
				for (var v = 0; v < this.Stringnumber.length; v++) {
					if (this.Stringnumber[v].state) {
						for (var b = 1; b < 9; b++) {
							if (this.Stringnumber[v].id == 'P' + b + '_1') {
								if (b == 1) {
									bjdc_fs.push('DGGP');
								} else {
									bjdc_fs.push(b);
								}
							}
						}
					}
				}
				var saa = [];
				var saadan = [];
				if (!this.isInArray(bjdc_fs, 'DGGP')) {
					var p1 = [];
					var p2 = [];
					var p3 = [];
					var p4 = [];
					for (var i = 0; i < this.lcbList.length; i++) {
						var ass = [];
						var ass_dan = [];
						for (var z = 0; z < 24; z++) {
							if (this.lcbList[i].stateArr['z' + z]) {
								if (this.lcbList[i].stateArr['dan']) {
									ass_dan.push(this.lcbList[i].sp[z]);
								} else {
									ass.push(this.lcbList[i].sp[z]);
								}
							}
						}
						if (ass.length > 0) {
							var max = Math.max.apply(null, ass);
							var min = Math.min.apply(null, ass);
							p1.push(min);
							p2.push(max);
						}
						if (ass_dan.length > 0) {
							var max1 = Math.max.apply(null, ass_dan);
							var min1 = Math.min.apply(null, ass_dan);
							p3.push(min1);
							p4.push(max1);
						}
					}
					if (p1 && p2) {
						saa.push(p1);
						saa.push(p2);
					}
					if (p3.length > 0 && p4.length > 0) {
						saadan.push(p3);
						saadan.push(p4);
					}
				} else {
					for (var i = 0; i < this.lcbList.length; i++) {
						var ass = [];
						for (var z = 0; z < 24; z++) {
							if (this.lcbList[i].stateArr['z' + z]) {
								ass.push(this.lcbList[i].sp[z]);
							}
						}
						if (ass.length > 0) {
							saa.push(ass);
						}
					}
				}
				if (saadan.length <= 0) {
					var pricemx = varietymaxPrizeAndCost(this.multiple, bjdc_fs, saa, [], []);
				} else {
					var pricemx = danmaxPrizeAndCost(this.multiple, bjdc_fs, saa, saadan);
				}
				if (!pricemx[0]) {
					pricemx[0] = 0;
				}
				if (!pricemx[1]) {
					pricemx[1] = 0;
				}
				if (pricemx[0] == 'Infinity') {
					pricemx[0] = 0;
				}
				if (pricemx[1] == 'Infinity') {
					pricemx[1] = 0;
				}
				pricemx[0] = Math.floor(pricemx[0] * 100) / 100;
				pricemx[1] = Math.floor(pricemx[1] * 100) / 100;
				if (!this.isInArray(bjdc_fs, 'DGGP')) {
					pricemx[0] = pricemx[0] * this.multiple;
					pricemx[1] = pricemx[1] * this.multiple
				}
				this.ycjj = pricemx;
			},
			gettotalNum: function(totalArr) {
				var totalNum = 0;
				var danArr = [];
				for (var as = 0; as < this.lcbList.length; as++) {
					if (this.lcbList[as].stateArr['dan']) {
						danArr.push(as);
					}
				}
				if (this.lcbListfs && danArr.length == 0) {
					var passTypes = this.lcbListfs;
					for (var i = 0; i < passTypes.length; i++) {
						//单管
						if (passTypes[i] == "单关固赔") {
							for (var k = 0; k < totalArr.length; k++) {
								totalNum += totalArr[k] * 1;
							}
						}
						//二串一
						else if (passTypes[i] == "2串1") {
							for (var k = 0; k < totalArr.length; k++) {
								for (var j = k; j < totalArr.length; j++) {
									if (k != j) {
										totalNum += totalArr[k] * totalArr[j];
									}
								}
							}
						} else if (passTypes[i] == "3串1") {
							for (var k = 0; k < totalArr.length; k++) {
								for (var j = k; j < totalArr.length; j++) {
									for (var l = j; l < totalArr.length; l++) {
										if (k != j && j != l) {
											totalNum += totalArr[k] * totalArr[j] * totalArr[l];
										}
									}
								}

							}
						} else if (passTypes[i] == "4串1") {
							for (var k = 0; k < totalArr.length; k++) {
								for (var j = k; j < totalArr.length; j++) {
									for (var l = j; l < totalArr.length; l++) {
										for (var z = l; z < totalArr.length; z++) {
											if (k != j && j != l && l != z) {
												totalNum += totalArr[k] * totalArr[j] * totalArr[l] * totalArr[z];
											}
										}
									}
								}
							}
						} else if (passTypes[i] == "5串1") {
							for (var k = 0; k < totalArr.length; k++) {
								for (var j = k; j < totalArr.length; j++) {
									for (var l = j; l < totalArr.length; l++) {
										for (var z = l; z < totalArr.length; z++) {
											for (var x = z; x < totalArr.length; x++) {
												if (k != j && j != l && l != z && z != x) {
													totalNum += totalArr[k] * totalArr[j] * totalArr[l] * totalArr[z] * totalArr[x];
												}
											}
										}
									}
								}
							}
						} else if (passTypes[i] == "6串1") {
							for (var k = 0; k < totalArr.length; k++) {
								for (var j = k; j < totalArr.length; j++) {
									for (var l = j; l < totalArr.length; l++) {
										for (var z = l; z < totalArr.length; z++) {
											for (var x = z; x < totalArr.length; x++) {
												for (var c = x; c < totalArr.length; c++) {
													if (k != j && j != l && l != z && z != x && x != c) {
														totalNum += totalArr[k] * totalArr[j] * totalArr[l] * totalArr[z] * totalArr[x] * totalArr[c];
													}
												}
											}
										}
									}
								}
							}
						} else if (passTypes[i] == "7串1") {
							for (var k = 0; k < totalArr.length; k++) {
								for (var j = k; j < totalArr.length; j++) {
									for (var l = j; l < totalArr.length; l++) {
										for (var z = l; z < totalArr.length; z++) {
											for (var x = z; x < totalArr.length; x++) {
												for (var c = x; c < totalArr.length; c++) {
													for (var v = c; v < totalArr.length; v++) {
														if (k != j && j != l && l != z && z != x && x != c && c != v) {
															totalNum += totalArr[k] * totalArr[j] * totalArr[l] * totalArr[z] * totalArr[x] * totalArr[c] *
																totalArr[v];
														}
													}
												}
											}
										}
									}
								}
							}
						} else if (passTypes[i] == "8串1") {
							for (var k = 0; k < totalArr.length; k++) {
								for (var j = k; j < totalArr.length; j++) {
									for (var l = j; l < totalArr.length; l++) {
										for (var z = l; z < totalArr.length; z++) {
											for (var x = z; x < totalArr.length; x++) {
												for (var c = x; c < totalArr.length; c++) {
													for (var v = c; v < totalArr.length; v++) {
														for (var b = v; b < totalArr.length; b++) {
															if (k != j && j != l && l != z && z != x && x != c && c != v && v != b) {
																totalNum += totalArr[k] * totalArr[j] * totalArr[l] * totalArr[z] * totalArr[x] * totalArr[c] *
																	totalArr[
																		v] * totalArr[b];
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
					return totalNum;
				} else if (this.lcbListfs && danArr.length > 0) {
					var newArr = [];
					for (var w = 0; w < totalArr.length; w++) {
						newArr.push(totalArr[w]);
					}
					var dan = 1;
					for (var t = 0; t < danArr.length; t++) {
						dan *= newArr[danArr[t]];
					}
					for (var t = danArr.length - 1; t >= 0; t--) {
						newArr.splice(danArr[t], 1);
					}
					var passTypes = this.lcbListfs;
					for (var i = 0; i < passTypes.length; i++) {
						//单管
						if (passTypes[i] == "单关固赔") {
							totalNum += dan * 1;
						}
						//二串一
						else if (passTypes[i] == "2串1") {
							for (var q = 0; q < newArr.length; q++) {
								totalNum += dan * newArr[q];
							}
						} else if (passTypes[i] == "3串1") {
							if (danArr.length == 1) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										if (k != j) {
											totalNum += dan * newArr[k] * newArr[j];
										}
									}
								}
							} else if (danArr.length == 2) {
								for (var q = 0; q < newArr.length; q++) {
									totalNum += dan * newArr[q];
								}
							}
						} else if (passTypes[i] == "4串1") {
							if (danArr.length == 1) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											if (k != j && j != l) {
												totalNum += dan * newArr[k] * newArr[j] * newArr[l];
											}
										}
									}
								}
							} else if (danArr.length == 2) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										if (k != j) {
											totalNum += dan * newArr[k] * newArr[j];
										}
									}
								}
							} else if (danArr.length == 3) {
								for (var q = 0; q < newArr.length; q++) {
									totalNum += dan * newArr[q];
								}
							}
						} else if (passTypes[i] == "5串1") {
							if (danArr.length == 1) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											for (var z = l; z < newArr.length; z++) {
												if (k != j && j != l && l != z) {
													totalNum += dan * newArr[k] * newArr[j] * newArr[l] * newArr[z];
												}
											}
										}
									}
								}
							} else if (danArr.length == 2) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											if (k != j && j != l) {
												totalNum += dan * newArr[k] * newArr[j] * newArr[l];
											}
										}
									}
								}
							} else if (danArr.length == 3) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										if (k != j) {
											totalNum += dan * newArr[k] * newArr[j];
										}
									}
								}
							} else if (danArr.length == 4) {
								for (var q = 0; q < newArr.length; q++) {
									totalNum += dan * newArr[q];
								}
							}
						} else if (passTypes[i] == "6串1") {
							if (danArr.length == 1) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											for (var z = l; z < newArr.length; z++) {
												for (var x = z; x < newArr.length; x++) {
													if (k != j && j != l && l != z && z != x) {
														totalNum += dan * newArr[k] * newArr[j] * newArr[l] * newArr[z] * newArr[x];
													}
												}
											}
										}
									}
								}
							} else if (danArr.length == 2) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											for (var z = l; z < newArr.length; z++) {
												if (k != j && j != l && l != z) {
													totalNum += dan * newArr[k] * newArr[j] * newArr[l] * newArr[z];
												}
											}
										}
									}
								}
							} else if (danArr.length == 3) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											if (k != j && j != l) {
												totalNum += dan * newArr[k] * newArr[j] * newArr[l];
											}
										}
									}
								}
							} else if (danArr.length == 4) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										if (k != j) {
											totalNum += dan * newArr[k] * newArr[j];
										}
									}
								}
							} else if (danArr.length == 5) {
								for (var q = 0; q < newArr.length; q++) {
									totalNum += dan * newArr[q];
								}
							}
						} else if (passTypes[i] == "7串1") {
							if (danArr.length == 1) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											for (var z = l; z < newArr.length; z++) {
												for (var x = z; x < newArr.length; x++) {
													for (var c = x; c < newArr.length; c++) {
														if (k != j && j != l && l != z && z != x && x != c) {
															totalNum += dan * newArr[k] * newArr[j] * newArr[l] * newArr[z] * newArr[x] * newArr[c];
														}
													}
												}
											}
										}
									}
								}
							} else if (danArr.length == 2) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											for (var z = l; z < newArr.length; z++) {
												for (var x = z; x < newArr.length; x++) {
													if (k != j && j != l && l != z && z != x) {
														totalNum += dan * newArr[k] * newArr[j] * newArr[l] * newArr[z] * newArr[x];
													}
												}
											}
										}
									}
								}
							} else if (danArr.length == 3) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											for (var z = l; z < newArr.length; z++) {
												if (k != j && j != l && l != z) {
													totalNum += dan * newArr[k] * newArr[j] * newArr[l] * newArr[z];
												}
											}
										}
									}
								}
							} else if (danArr.length == 4) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											if (k != j && j != l) {
												totalNum += dan * newArr[k] * newArr[j] * newArr[l];
											}
										}
									}
								}
							} else if (danArr.length == 5) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										if (k != j) {
											totalNum += dan * newArr[k] * newArr[j];
										}
									}
								}
							} else if (danArr.length == 6) {
								for (var q = 0; q < newArr.length; q++) {
									totalNum += dan * newArr[q];
								}
							}
						} else if (passTypes[i] == "8串1") {
							if (danArr.length == 1) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											for (var z = l; z < newArr.length; z++) {
												for (var x = z; x < newArr.length; x++) {
													for (var c = x; c < newArr.length; c++) {
														for (var v = c; v < newArr.length; v++) {
															if (k != j && j != l && l != z && z != x && x != c && c != v) {
																totalNum += dan * newArr[k] * newArr[j] * newArr[l] * newArr[z] * newArr[x] * newArr[c] * newArr[v];
															}
														}
													}
												}
											}
										}
									}
								}
							} else if (danArr.length == 2) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											for (var z = l; z < newArr.length; z++) {
												for (var x = z; x < newArr.length; x++) {
													for (var c = x; c < newArr.length; c++) {
														if (k != j && j != l && l != z && z != x && x != c) {
															totalNum += dan * newArr[k] * newArr[j] * newArr[l] * newArr[z] * newArr[x] * newArr[c];
														}
													}
												}
											}
										}
									}
								}
							} else if (danArr.length == 3) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											for (var z = l; z < newArr.length; z++) {
												for (var x = z; x < newArr.length; x++) {
													if (k != j && j != l && l != z && z != x) {
														totalNum += dan * newArr[k] * newArr[j] * newArr[l] * newArr[z] * newArr[x];
													}
												}
											}
										}
									}
								}
							} else if (danArr.length == 4) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											for (var z = l; z < newArr.length; z++) {
												if (k != j && j != l && l != z) {
													totalNum += dan * newArr[k] * newArr[j] * newArr[l] * newArr[z];
												}
											}
										}
									}
								}
							} else if (danArr.length == 5) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											if (k != j && j != l) {
												totalNum += dan * newArr[k] * newArr[j] * newArr[l];
											}
										}
									}
								}
							} else if (danArr.length == 6) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										if (k != j) {
											totalNum += dan * newArr[k] * newArr[j];
										}
									}
								}
							} else if (danArr.length == 7) {
								for (var q = 0; q < newArr.length; q++) {
									totalNum += dan * newArr[q];
								}
							}
						}
					}
					return totalNum;
				} else if (!this.lcbListfs && danArr.length == 0) {
					if (this.lcbListfs.length == 1 && this.lcbListfs[0] == "单关固赔") {
						for (var k = 0; k < totalArr.length; k++) {
							totalNum += totalArr[k] * 1;
						}
					} else {
						for (var k = 0; k < totalArr.length; k++) {
							for (var j = k; j < totalArr.length; j++) {
								if (k != j) {
									totalNum += totalArr[k] * totalArr[j];
								}
							}
						}
					}
					return totalNum;
				} else if (!this.lcbListfs && danArr.length > 0) {
					var newArr = [];
					for (var w = 0; w < totalArr.length; w++) {
						newArr.push(totalArr[w]);
					}
					var dan = 1;
					for (var t = 0; t < danArr.length; t++) {
						dan *= newArr[danArr[t]];
					}
					for (var t = danArr.length - 1; t >= 0; t--) {
						newArr.splice(danArr[t], 1);
					}
					for (var q = 0; q < newArr.length; q++) {
						totalNum += dan * newArr[q];
					}
					return totalNum;
				}
			},
			//付款参数
			setData: function(arr, multiple, totalNum, playType) {
				console.log(playType);
				let uid = getCookie('newData').userid;
				let data = {};
				if (arr.length == 0) {
					Toast('请至少选择一场投注');
					return false;
				}
				//拼接uid
				data.userId = uid;
				//过关模式
				data.passMode = "NORMAL";
				//方案投注方式
				var mode = "COMPOUND";
				var passTypes = [];
				for (var p = 0; p < this.lcbListfs.length; p++) {
					if (this.lcbListfs[p] == '2串1') {
						passTypes.push("P2_1");
					} else if (this.lcbListfs[p] == '3串1') {
						passTypes.push("P3_1");
					} else if (this.lcbListfs[p] == '4串1') {
						passTypes.push("P4_1");
					} else if (this.lcbListfs[p] == '5串1') {
						passTypes.push("P5_1");
					} else if (this.lcbListfs[p] == '6串1') {
						passTypes.push("P6_1");
					} else if (this.lcbListfs[p] == '7串1') {
						passTypes.push("P7_1");
					} else if (this.lcbListfs[p] == '8串1') {
						passTypes.push("P8_1");
					} else {
						passTypes.push("P1");
					}
				}
				//过关方式
				data.passTypes = passTypes;
				//方案类型
				data.schemeType = "MULTIPLE_PASS";
				//方案保密类型
				data.secretType = "FULL_PUBLIC";
				//自购|合买
				data.shareType = "SELF";
				//方案认购许可类型
				data.subscriptionLicenseType = "PUBLIC_LICENSE";
				//是否奖金优化
				data.isPrizeOptimizing = false;
				//期编号
				data.periodId = parseInt(arr[0].periodId);
				//投注倍数
				data.multiple = multiple;
				//方案金额
				var schemeCost = this.totle;
				data.schemeCost = schemeCost;
				if (playType == 3) {
					//玩法类型
					data.playType = "BF";
					if (arr.length > 1) {
						mode = "COMPOUND";
					}
					//投注内容
					var ticketContent = [];
					var zoqiu = [];
					for (var i = 0; i < arr.length; i++) {
						var obj = [];
						obj.lineId = parseInt(arr[i].lineId);
						obj.dan = arr[i].stateArr.dan;
						obj.value = getbfTotal(arr[i]);
						ticketContent.push({...obj});
					}
					console.log(ticketContent);
				} else if (playType == 1) {
					//玩法类型
					data.playType = "ZJQS";
					if (arr.length > 1) {
						mode = "COMPOUND";
					}
					//投注内容
					var ticketContent = [];
					var zoqiu = [];
					for (var i = 0; i < arr.length; i++) {
						var obj = [];
						var ztexts = [];
						obj.lineId = parseInt(arr[i].lineId);
						obj.dan = arr[i].stateArr.dan;
						obj.value = getjqsTotal(arr[i]);
						ticketContent.push({...obj});
					}
				} else if (playType == 2) {
					//玩法类型
					data.playType = "BQQSPF";
					if (arr.length > 1) {
						mode = "COMPOUND";
					}
					//投注内容
					var ticketContent = [];
					for (var i = 0; i < arr.length; i++) {
						var obj = [];
						obj.lineId = parseInt(arr[i].lineId);
						obj.dan = arr[i].stateArr.dan;
						obj.value = getbqcTotal(arr[i]);
						ticketContent.push({...obj});
					}
				} else if (playType == 0) {
					//玩法类型
					data.playType = "SPF";
					//投注内容
					var ticketContent = [];
					if (arr.length > 1) {
						mode = "COMPOUND";
					}
					for (var i = 0; i < arr.length; i++) {
						var obj = [];
						obj.lineId = parseInt(arr[i].lineId);
						obj.dan = arr[i].stateArr.dan;
						if (arr.length > 0) {
							obj.value = getrqspfTotal(arr[i]);
							ticketContent.push({...obj});
						}
					}
					console.log(ticketContent);
				} else if (playType == 4) {
					//玩法类型
					data.playType = "SXDS";
					//投注内容
					var ticketContent = [];
					if (arr.length > 1) {
						mode = "COMPOUND";
					}
					for (var i = 0; i < arr.length; i++) {
						var value = [];
						var obj = [];
						obj.lineId = parseInt(arr[i].lineId);
						obj.dan = arr[i].stateArr.dan;
						if (arr.length > 0) {
							obj.value = getsxdsTotal(arr[i]);
							ticketContent.push({...obj});
						}
					}

				}
				//方案注数
				data.units = parseInt(this.lcbListlength);
				data.mode = mode;
				console.log(ticketContent);
				data.ticketContent = ticketContent;
				if (ticketContent.length == 0) {
					return "noc";
				}
				data.betContent = [];
				//币种
				data.moneyType = "LOTTERYMONEY";
				console.log(data);
				return data;
			},
			filtersarr_baoliu: function(arr) {
				let keyLng = 0;
				switch (this.playType) {
					case 0:
						keyLng = 3;
						break;
					case 1:
						keyLng = 8;
						break;
					case 2:
						keyLng = 9;
						break;
					case 3:
						keyLng = 25;
						break;
					case 4:
						keyLng = 4;
						break;
				}
				for (var i = 0; i < arr.length; i++) {
					for (let j = 0; j < keyLng; j++) {
						let key = 'z' + j
						if (this.lcbList[i].stateArr[key]) {
							this.lcbList[i].stateArr['z'] = 1;
							break;
						} else {
							this.lcbList[i].stateArr['z'] = 0
						}
					}
				}
				return arr;
			},
			isInArray: function(arr, value) {
				for (var i = 0; i < arr.length; i++) {
					if (value === arr[i]) {
						return true;
					}
				}
				return false;
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
			},
			AddZeorpad: function(num, n) { //以0补齐3位
				var len = num.toString().length;
				while (len < n) {
					num = "0" + num;
					len++;
				}
				return num;
			},
			theory: function(beiNum, bet1, bet2) {
				var beiNum = parseFloat(beiNum);
				var bet1 = parseFloat(bet1);
				var bet2 = parseFloat(bet2);
				var theoryNum = (beiNum * bet1 * bet2 * 2).toFixed(2);
				return theoryNum;
			},
			 tranNumber:function(num, point) {
				let numStr = num.toString()
				// 十万以内直接返回
				if (numStr.length <= 7) {
					return numStr;
				}
				//大于8位数是亿
				else if (numStr.length > 11) {
					let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
					return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿';
				}
				//大于6位数是十万 (以10W分割 10W以下全部显示)
				else if (numStr.length > 7) {
					let decimal = numStr.substring(numStr.length - 7, numStr.length - 7 + point)
					return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万';
				}
			}
		}
	}

	function getbfTotal(value) {
		var total = 0;

		if (value.stateArr['z0']) {
			total += 1;
		}
		if (value.stateArr['z1']) {
			total += 2;
		}
		if (value.stateArr['z2']) {
			total += 4;
		}
		if (value.stateArr['z3']) {
			total += 8;
		}
		if (value.stateArr['z4']) {
			total += 16;
		}
		if (value.stateArr['z5']) {
			total += 32;
		}
		if (value.stateArr['z6']) {
			total += 64;
		}
		if (value.stateArr['z7']) {
			total += 128;
		}
		if (value.stateArr['z8']) {
			total += 256;
		}
		if (value.stateArr['z9']) {
			total += 512;
		}
		if (value.stateArr['z10']) {
			total += 1024;
		}
		if (value.stateArr['z11']) {
			total += 2048;
		}
		if (value.stateArr['z12']) {
			total += 4096;
		}
		if (value.stateArr['z13']) {
			total += 8192;
		}
		if (value.stateArr['z14']) {
			total += 16384;
		}
		if (value.stateArr['z15']) {
			total += 32768;
		}
		if (value.stateArr['z16']) {
			total += 65536;
		}
		if (value.stateArr['z17']) {
			total += 131072;
		}
		if (value.stateArr['z18']) {
			total += 262144;
		}
		if (value.stateArr['z19']) {
			total += 524288;
		}
		if (value.stateArr['z20']) {
			total += 1048576;
		}
		if (value.stateArr['z21']) {
			total += 2097152;
		}
		if (value.stateArr['z22']) {
			total += 4194304;
		}
		if (value.stateArr['z23']) {
			total += 8388608;
		}
		if (value.stateArr['z24']) {
			total += 16777216;
		}



		return "BF_" + total;
	}

	function getjqsTotal(value) {
		var total = 0;
		//  console.log(JSON.stringify(value));

		if (value.stateArr['z0']) {
			total += 1;
		}
		if (value.stateArr['z1']) {
			total += 2;
		}

		if (value.stateArr['z2']) {
			total += 4;
		}

		if (value.stateArr['z3']) {
			total += 8;
		}
		if (value.stateArr['k0']) {
			total += 16;
		}
		if (value.stateArr['k1']) {
			total += 32;
		}
		if (value.stateArr['k2']) {
			total += 64;
		}
		if (value.stateArr['k3']) {
			total += 128;
		}
		return "ZJQS_" + total;
	}

	function getbqcTotal(value) {
		var total = 0;
		if (value.stateArr['z0']) {
			total += 1;
		}
		if (value.stateArr['z1']) {
			total += 2;
		}

		if (value.stateArr['z2']) {
			total += 4;
		}

		if (value.stateArr['z3']) {
			total += 8;
		}
		if (value.stateArr['z4']) {
			total += 16;
		}
		if (value.stateArr['z5']) {
			total += 32;
		}
		if (value.stateArr['z6']) {
			total += 64;
		}
		if (value.stateArr['z7']) {
			total += 128;
		}
		if (value.stateArr['z8']) {
			total += 256;
		}
		return "BQQSPF_" + total;
	};

	function getrqspfTotal(value) {
		var total = 0;
		if (value.stateArr['z0']) {
			total += 1;
		}
		if (value.stateArr['z1']) {
			total += 2;
		}
		if (value.stateArr['z2']) {
			total += 4;
		}
		return "SPF_" + total;
	}

	function getsxdsTotal(value) {
		var total = 0;
		if (value.stateArr['z0']) {
			total += 1;
		}
		if (value.stateArr['z1']) {
			total += 2;
		}

		if (value.stateArr['z2']) {
			total += 4;
		}

		if (value.stateArr['z3']) {
			total += 8;
		}
		return "SXDS_" + total;
	};
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
