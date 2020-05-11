<template>
	<div>
<!-- 		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" tapmode @click="bakey()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title" style="left: 3rem;right:4.5rem">竞彩篮球{{navname}}</div>
			<div class="fgr hm_top" tapmode @click="open_hemai()">
				<span><img src="../../assets/goucai/jjc/icon_flagre.png" /></span>
				<span>发起合买</span>
			</div>
		</header> -->
	<header class="aui-bar aui-bar-nav">
     <div class="aui-pull-left aui-btn" tapmode @click="bakey()">
       <span class="aui-iconfont aui-icon-left"></span>
     </div>
     <div>
       <div class="aui-title"  tapmode>竞彩篮球{{navname}}</div>
     </div>
     <div class="aui-pull-right aui-btn top-more" @click="open_hemai()" tapmode>
       发起合买
     </div>
 </header>
		<div class="jjc_bjdcpay" id="jjc_lq" v-cloak>
			<!-- 付款页面头部 -->
			<div class="jjcpay_head" v-if='lqpay'>
				<!-- <p>已选<span>{{lqpay.length}}</span>场 投注截止：<span>{{matchDate|GetTimeStr(4)}}{{lqpay[0].stopBuyTime|GetTimeStr(3)}}</span></p> -->
				<p><span>已选{{lqpay.length}}场</span> <span class="jiez">{{matchDate|GetTimeStr(4)}} {{lqpay[0].stopBuyTime|GetTimeStr(3)}}截止</span></p>
			</div>

			<!-- 胜负 -->
			<div class="main jjc_lqsf_pay" id="pay_sf" v-if="navPlay == 'SF'">
				<template v-for="(item,index) in lqpay">
					<div class="con">
						<div class="titl">
							<p class="flr p1">{{item.weekStr}} {{item.lineId}} <span>{{item.stopBuyTime|GetTimeStr(4)}}
									{{item.stopBuyTime|GetTimeStr(3)}}</span></p>
							<p class="fgr p2"><span>(客)</span> {{item.guestTeamName}} vs {{item.homeTeamName}} <span>(主)</span> </p>
						</div>
						<div class="battle">
							<div class="close flr" @click="deleteList(index)"></div>
							<div class="battle_shel fgr">
								<ul>
									<li class="dan" :class="{ 'active': item.dan }" @click="xuanDan(index)">胆</li>
									<li :class="{ 'active': item.soddsType }" @click="modifyBetting(index,'soddsType',item.sodds)"><span>
											{{item.guestTeamName}}</span><br /><span>胜{{item.sodds}}</span></li>
									<li :class="{ 'active': item.foddsType }" @click="modifyBetting(index,'foddsType',item.fodds)"><span>{{item.homeTeamName}}</span><br /><span>负{{item.fodds}}</span></li>
								</ul>
							</div>
						</div>
					</div>
				</template>
				<div class="add_ss" @click="addList()" tapmode>
					<p>添加/编辑赛事</p>
				</div>
			</div>
			<!-- 让分胜负 -->
			<div class="main jjc_lqrfsf_pay" id="pay_rfsf" v-if="navPlay == 'RFSF'">
				<template v-for="(item,index) in lqpay">
					<div class="con">
						<div class="titl">
							<p class="flr p1">{{item.weekStr}} {{item.lineId}} <span>{{item.stopBuyTime|GetTimeStr(4)}}
									{{item.stopBuyTime|GetTimeStr(3)}}</span></p>
							<p class="fgr p2"><span>(客)</span> {{item.guestTeamName}} vs {{item.homeTeamName}} <span>(主)</span> </p>
						</div>
						<div class="battle">
							<div class="close flr" @click="deleteList(index)"></div>
							<div class="battle_shel fgr">
								<ul>
									<li class="dan" :class="{ 'active': item.dan }" @click="xuanDan(index)">胆</li>
									<li :class="{ 'active': item.soddsType }" @click="modifyBetting(index,'soddsType',item.sodds)"><span>{{item.guestTeamName}}</span><br /><span>客胜{{item.sodds}}</span></li>
									<li v-if="item.singleHandicap>0" class="host ">主+{{item.singleHandicap}}</li>
									<li v-else class=" host host_green">主{{item.singleHandicap}}</li>
									<!-- <li class="host">主<span>+{{item.singleHandicap}}</span></li> -->

									<li :class="{ 'active': item.foddsType}" @click="modifyBetting(index,'foddsType',item.fodds)"><span>{{item.homeTeamName}}</span><br /><span>主胜{{item.fodds}}</span></li>
								</ul>
							</div>
						</div>
					</div>
				</template>
				<div class="add_ss" @click="addList()" tapmode>
					<p>添加/编辑赛事</p>
				</div>
			</div>
			<!-- 大小分 -->
			<div class="main jjc_lqdxf_pay" id="pay_dxf" v-if="navPlay == 'DXF'">
				<template v-for="(item,index) in lqpay">
					<div class="con">
						<div class="titl">
							<p class="flr p1">{{item.weekStr}} {{item.lineId}} <span>{{item.stopBuyTime|GetTimeStr(4)}}
									{{item.stopBuyTime|GetTimeStr(3)}}</span></p>
							<p class="fgr p2"><span>(客)</span> {{item.guestTeamName}} vs {{item.homeTeamName}} <span>(主)</span> </p>
						</div>
						<div class="battle">
							<div class="close flr" @click="deleteList(index)"></div>
							<div class="battle_shel fgr">
								<ul>
									<li class="dan" :class="{ 'active': item.dan }" @click="xuanDan(index)">胆</li>
									<li :class="{ 'active': item.soddsType }" @click="modifyBetting(index,'soddsType',item.sodds)"><span>大分</span><br /><span>{{item.sodds}}</span></li>
									<li class="score"><span>分数</span><br /><span>{{item.singleTotalScore}}</span></li>
									<li :class="{ 'active': item.foddsType }" @click="modifyBetting(index,'foddsType',item.fodds)"><span>小分</span><br /><span>{{item.fodds}}</span></li>

								</ul>
							</div>
						</div>
					</div>
				</template>
				<div class="add_ss" @click="addList()" tapmode>
					<p>添加/编辑赛事</p>
				</div>
			</div>
			<!-- 胜分差 -->
			<div class="main jjc_lqsfc_pay" id="pay_sfc" v-if="navPlay == 'SFC'">
				<template v-for="(item,index) in lqpay">
					<div class="con">
						<div class="titl">
							<p class="flr p1">{{item.weekStr}} {{item.lineId}} <span>{{item.stopBuyTime|GetTimeStr(4)}}
									{{item.stopBuyTime|GetTimeStr(3)}}</span></p>
							<p class="fgr p2"><span>(客)</span> {{item.guestTeamName}} vs {{item.homeTeamName}} <span>(主)</span> </p>
						</div>
						<div class="battle">
							<div class="close flr sfc_close" @click="deleteList(index)"></div>
							<div class="battle_shel fgr">
								<ul class="ul_ts" id="sfc_ul">
									<li class="dan sfc_dan" :class="{ 'active': item.dan }" @click="xuanDan(index)">胆</li>
									<li v-for="(d,spindex) in item.sfcchooseQr">
										<p>胜分差</p>
										<p><span>{{d}}</span><br /><span>胜{{item.sfcchoosesp[spindex]}}</span></p>
									</li>

								</ul>
							</div>
						</div>
					</div>
				</template>
				<div class="add_ss" @click="addList()" tapmode>
					<p>添加/编辑赛事</p>
				</div>
			</div>
			<!-- 混合过关 -->
			<div class="main jjc_lqhegg_pay" id="pay_hhgg" v-if="navPlay == 'HHGG'">
				<template v-for="(item,index) in lqpay">
					<div v-if="" class="con">
						<div class="titl">
							<p class="flr p1">{{item.weekStr}} {{item.lineId}} <span>{{item.stopBuyTime|GetTimeStr(4)}}
									{{item.stopBuyTime|GetTimeStr(3)}}</span></p>
							<p class="fgr p2"><span>(客)</span> {{item.guestTeamName}} vs {{item.homeTeamName}} <span>(主)</span> </p>
						</div>
						<div class="battle">
							<div class="close flr hhgg_close" @click="deleteList(index)"></div>
							<div class="battle_shel fgr">
								<ul v-if='item.type1'>
									<li class="dan hhgg_dan" :class="{ 'active': item.dan }" @click="xuanDan(index)">胆</li>
									<li v-for='(d,i) in item.type1' :class="{ 'dis-no': !item.chooseType1[i] }">
										<p class="red">让分</p>
										<p><span>{{d}}</span><br /><span>{{item.hhggsp1[i]}}</span></p>
									</li>
								</ul>
								<ul class="ul_ts" v-if='item.type2'>
									<li class="dan hhgg_dan" :class="{ 'active': item.dan }" @click="xuanDan(index)">胆</li>
									<li v-for='(d,i) in item.type2' :class="{ 'dis-no': !item.chooseType2[i] }">
										<p class="blue">非让分</p>
										<p><span>{{d}}</span><br /><span>{{item.hhggsp2[i]}}</span></p>
									</li>
								</ul>
								<ul v-if='item.type3'>
									<li class="dan hhgg_dan" :class="{ 'active': item.dan }" @click="xuanDan(index)">胆</li>
									<li v-for='(d,i) in item.type3' :class="{ 'dis-no': !item.chooseType3[i] }">
										<p class="green">大小分</p>
										<p><span>{{d}}</span><br /><span>{{item.hhggsp3[i]}}</span></p>
									</li>
								</ul>

								<ul class="ul_ts" id="hhgg_ul" v-if='item.type4'>
									<li class="dan hhgg_dan" :class="{ 'active': item.dan }" @click="xuanDan(index)">胆</li>
									<li v-for='(d,i) in item.type4' :class="{ 'dis-no': !item.chooseType4[i] }">
										<p>胜分差</p>
										<p><span>{{d}}</span><br /><span>{{item.hhggsp4[i]}}</span></p>
									</li>

								</ul>
							</div>
						</div>
					</div>

				</template>
				<div class="add_ss" @click="addList()" tapmode>
					<p>添加/编辑赛事</p>
				</div>
			</div>
			<!-- 单关固赔 -->
			<div class="main jjc_lqdggp_pay" id="pay_dggp" v-if="navPlay == 'DGGP'">
				<template v-for="(item,index) in lqpay">
					<div v-if="" class="con">
						<div class="titl">
							<p class="flr p1">{{item.weekStr}} {{item.lineId}} <span>{{item.stopBuyTime|GetTimeStr(4)}}
									{{item.stopBuyTime|GetTimeStr(3)}}</span></p>
							<p class="fgr p2"><span>(客)</span> {{item.guestTeamName}} vs {{item.homeTeamName}} <span>(主)</span> </p>
						</div>
						<div class="battle">
							<div class="close flr dggp_close" @click="deleteList(index)"></div>
							<div class="battle_shel fgr">
								<ul v-if='item.type1'>
									<li class="dan dggp_dan">胆</li>
									<li v-for='(d,i) in item.type1' :class="{ 'dis-no': !item.chooseType1[i] }">
										<p class="red">让分</p>
										<p><span>{{d}}</span><br /><span>{{item.hhggsp1[i]}}</span></p>
									</li>
								</ul>
								<ul class="ul_ts" v-if='item.type2'>
									<li class="dan dggp_dan">胆</li>
									<li v-for='(d,i) in item.type2' :class="{ 'dis-no': !item.chooseType2[i] }">
										<p class="blue">非让分</p>
										<p><span>{{d}}</span><br /><span>{{item.hhggsp2[i]}}</span></p>
									</li>
								</ul>
								<ul v-if='item.type3'>
									<li class="dan dggp_dan">胆</li>
									<li v-for='(d,i) in item.type3' :class="{ 'dis-no': !item.chooseType3[i] }">
										<p class="green">大小分</p>
										<p><span>{{d}}</span><br /><span>{{item.hhggsp3[i]}}</span></p>
									</li>
								</ul>

								<ul class="ul_ts" id="hhgg_ul" v-if='item.type4'>
									<li class="dan dggp_dan">胆</li>
									<li v-for='(d,i) in item.type4' :class="{ 'dis-no': !item.chooseType4[i] }">
										<p>胜分差</p>
										<p><span>{{d}}</span><br /><span>{{item.hhggsp4[i]}}</span></p>
									</li>

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
						<p class="flr">我已阅读并同意<span @click="JumpUserprotocol()" >《委托投注规则》</span></p>
					</div>
				</div>
				<div class="bt_text">
					<div class="flr data" v-if="navPlay !='DGGP'" @click=" showMaskchuan "><template v-for="item in chuan">{{item}}
						</template></div>
					<div class="flr dggplq" v-else><span>单关固赔</span></div>
					<div class="fgr multiple">
						<div class="jian flr" @click="reduce"></div>
						<div class="beishu flr" @click=" showkeyboard = true ,coverage=true"><span>{{ multiple }}</span>倍</div>
						<div class="jia flr" @click="increase"></div>
					</div>
				</div>
<!-- 				<footer>
					<div class="delete flr" @click="closebakey()"></div>
					<div class="total flr">
						<p>共{{talNum}}注 {{multiple}}倍<span>{{talNum*2*multiple}}</span>元</p>
						<p class="p2">预测奖金 <span>{{(minBet*multiple).toFixed(2)}} - {{(maxBet*multiple).toFixed(2)}} </span>元</p>
					</div>
					<div class="pay fgr" @click="pay">付款</div>
				</footer>-->
				      <footer> 
    <div class="ft_money flr">
      <p>共{{talNum}}注{{multiple}}倍<span class="rit_tow">{{(talNum*2*multiple).toFixed(2)}}</span>元</p>
      <p class="p2">预测奖金 <span>{{(minBet*multiple).toFixed(2)|tranNumber()}} - {{(maxBet*multiple).toFixed(2)|tranNumber()}}  </span>元</p>
    </div>
    <div class="ft_btn fgr">
      <div class="flr" tapmode >

      </div>
      <div class="flr" tapmode @click="pay()">付款</div>
    </div>
  </footer>
			</div>
			<!-- 2串1点击弹出窗 -->
			<div v-if="showMask" class="mask">
				<div class="popup_chuan">
					<div class="title">自由过关</div>
					<div class="text">
						<ul v-if="navPlay == 'SFC'">

							<li v-for="(item,index) in Stringnumber" v-if="index<lqpay.length" :class="{ 'active': item.state }" @click='onStringnumber(index)'>{{ item.name }}</li>
						</ul>
						<ul v-else>

							<li v-for="(item,index) in Stringnumber" v-if="index<lqpay.length-1" :class="{ 'active': item.state }" @click='onStringnumber(index)'>{{ item.name }}</li>
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
						<div class="flr data" v-if="navPlay !== 'DGGP'" @click="hideshowMask "><template v-for="item in chuan">{{item}}
							</template></div>
						<div class="flr data" v-else><span>单关固赔</span></div>
						<div class="fgr multiple">
							<div class="jian flr" @click="reduce"></div>
							<div class="beishu flr"><span>{{ multiple }}</span>倍</div>
							<div class="jia flr" @click="increase"></div>
						</div>
					</div>
					<footer> 
					  <div class="ft_money flr">
					    <p>共{{talNum}}注{{multiple}}倍<span class="rit_tow">{{(talNum*2*multiple).toFixed(2)}}</span>元</p>
					    <p class="p2">预测奖金 <span>{{(minBet*multiple).toFixed(2)|tranNumber()}} - {{(maxBet*multiple).toFixed(2)|tranNumber()}}  </span>元</p>
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
		<module-pay :payPopupP='payPopup' :payMoneyP='payMoney' :coinsMoneyP='coinsMoney' :cashMoneyP='cashMoney'
		 :opnenWeixinP='opnenWeixin' :opnenBankopenP='opnenBankopen' :hasHongbaoP='false' :typeName='"竞彩篮球"' @payPopupC="payPopupC" @RouteLeaveC='RouteLeaveC'
		 @paybtn='paybtn' @paylogok='paylogok'>
		</module-pay>
		<checkok-nav :logokz='logok' @showbox="showbox"></checkok-nav>
	</div>
</template>

<script>
	var totalArr = [];
	var danArr = [];
	import {
		phoneLQ
	} from "../../js/connector.js";
	import {
		varietymaxPrizeAndCost,
		danmaxPrizeAndCost
	} from "../../js/maxPrizeAndCost.js";
	import {
		getSession,
		setSession,
		compare,
		Get0pad,
		getCookie,
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
				logok: false,  //未实名标志
				navPlay: '',
				navname: '',
				coverage:true,//键盘第一次唤起
				lqpay: '', //数据
				talNum: '1', //注数
				input_bei: '1', //倍数
				datamony: '1', //用户所需的钱
				minBet: '', //大奖金
				maxBet: '', //小奖金
				chuan: ['2串1'],
				multiple: '1',
				matchDate: '',
				'showkeyboard': false,
				'showMask': false,
				'Userprotocol': true,
				Stringnumber: [{
					'name': '2串1',
					'id': 'P2_1',
					'state': true,
					'num': 2
				}, {
					'name': '3串1',
					'id': 'P3_1',
					'state': false,
					'num': 3
				}, {
					'name': '4串1',
					'id': 'P4_1',
					'state': false,
					'num': 4
				}, {
					'name': '5串1',
					'id': 'P5_1',
					'state': false,
					'num': 5
				}, {
					'name': '6串1',
					'id': 'P6_1',
					'state': false,
					'num': 6
				}, {
					'name': '7串1',
					'id': 'P7_1',
					'state': false,
					'num': 7
				}, {
					'name': '8串1',
					'id': 'P8_1',
					'state': false,
					'num': 8
				}],
				'lcbList': [{
					"stateArr": {
						"b0": true,
						"b1": false,
						"b2": true,
						"q0": false,
						"q1": false,
						"q2": true,
					}
				}, {
					"stateArr": {
						"b0": true,
						"b1": false,
						"b2": true,
						"q0": false,
						"q1": true,
						"q2": false,
					}
				}, {
					"stateArr": {
						"b0": false,
						"b1": true,
						"b2": false,
						"q0": true,
						"q1": false,
						"q2": true,
					}
				}, {
					"stateArr": {
						"b0": false,
						"b1": true,
						"b2": true,
						"q0": false,
						"q1": true,
						"q2": true,
					}
				}],
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
			if (this.RouteLeave||to.name=='goucai_hemai'||to.name=='agreement') {
				next()
			} else {
				MessageBox({
					title:'',
						message: '返回后所选注单将不保存',
						showCancelButton: true,
						confirmButtonText:'返回',
						
					}).then(action => {
						if (action == 'confirm') {
							sessionStorage.removeItem('arr');
							sessionStorage.removeItem('passTypes');
							sessionStorage.removeItem('passTypesnum');
							sessionStorage.removeItem('matchDate');
							next()
						}else{
							next(false)
						}})
			}
		},
		created() {

			this.lqpay = getSession('arr');
			this.navPlay = getSession('play');

			this.navname = getSession('playTypeName');
			this.matchDate = getSession('matchDate');
			this.jiSuanZhuShu(this.lqpay);
			  if (this.navPlay == 'SFC') {
            this.chuan = ['单关固赔'];
            this.Stringnumber=[];
            for (var i = 0; i < this.lqpay.length; i++) {
              var strber='';
                    if (i==0) {
                      strber={
                        'name': '单关固赔',
                        'id': 'P1',
                        'state': true,
                        'num': 1,
                        'type':'DGGP'
                      }

                    }else {
                      strber={
                        'name': i+1+'串1',
                        'id': 'P'+(i+1)+'_1',
                        'state': false,
                        'num': i+1,
                      }
                    }

                      this.Stringnumber.push(strber)
            }
  console.log(JSON.stringify(this.Stringnumber));
        }
			console.log(JSON.stringify(this.navPlay));
			this.getUserInfo();
			this.checkIsWx();

		},
		mounted() {
			// 			phoneLQ.$on('lengths', (val) => {
			// 				this.chosenField = val;
			// 			
			// 			});
			// 			
			//            phoneLQ.$on('sxcc', (val) => {
			// 				this.sxcc = val;
			// 			});
			// 			phoneLQ.$on('saixunList', (val) => {
			// 				this.sxlist = val;
			// 			});

		},
		updated: function() {
			this.payMoney = this.talNum * 2 * this.multiple ;
			console.log(this.payMoney);
		},
		beforeDestroy() {
			phoneLQ.$off('delete');

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
			gamesShow: function(name) {
				var shaixuan = getSession('shaixuan');
				if (!shaixuan) {
					shaixuan = [];
				}
				if (shaixuan.indexOf(name) > -1) {
					return true;
				} else {
					return false;
				}
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
			JumpUserprotocol:function(){
				this.RouteLeave=true;
				this.$router.push({
					name:'agreement'
				})
			},
			open_hemai:function(){
				var data = this.setData(this.navPlay);
				let dataes = this.Qs.stringify({
					data
				});
				sessionStorage.setItem('hemaiData',dataes)
				// setSession('hemaiData',dataes);
				let Fnumber=parseInt(this.talNum)*parseInt(this.multiple)*2;
				if(this.multiple<1){
				  this.multiple=1;
				  Toast("投注倍数不得小于1倍!");
				  return false;
				}
				  if(Fnumber<1){
				Toast("请至少选择一注!");
				  return false;
				  }
				  if(!this.Userprotocol){
				  	Toast("请阅读并勾选委托投注规则！");
					return false;
				  }
				  this.RouteLeave=true;
				this.$router.push({
					path:'/goucai/goucai_hemai',
					 query: {
				     'pageName': 'jc/jclq',
				     'Fnumber': Fnumber,
				      payid: 'jclq',
				      }
				})
			},
			modifyBetting: function(idx, key,sp) {
				  if (sp=='--') {
              Toast('不能选择暂无赔率的赛事。')
			  
              return false;
            }
                   console.log(this.navPlay);
				if (this.lqpay[idx][key]) {
					this.$set(this.lqpay[idx], key, false);
					if (this.lqpay[idx].soddsType == false && this.lqpay[idx].foddsType == false) {
						var chaun = [];
						this.chuan = chaun;
						var passTypes = [];
						var passTypesnum = [];
						if (this.chuan.length == 0) {
							if (this.navPlay == 'SFC' || this.navPlay == 'DGGP') {
								this.chuan = ['单关固赔'];
							} else {
								this.chuan = ['2串1'];
							}

						}
						if (this.navPlay == 'SFC' || this.navPlay == 'DGGP') {
							passTypesnum.push('DGGP')
							passTypes.push('P1')

						} else {
							passTypesnum.push(2)
							passTypes.push('P2_1')
						}
						setSession("passTypes", passTypes);
						setSession("passTypesnum", passTypesnum);
					}
					setSession("arr", this.lqpay);
				} else {
					this.$set(this.lqpay[idx], key, true);
					setSession("arr", this.lqpay);
					
				}
				this.jiSuanZhuShu(this.lqpay); //注数
			},
			deleteList: function(idx) {
				if (this.lqpay.length == 1) {
					sessionStorage.removeItem('arr');
					sessionStorage.removeItem('passTypes');
					sessionStorage.removeItem('passTypesnum');
					sessionStorage.removeItem('matchDate');
					 this.RouteLeave=true;
					this.$router.go(-1);
					return;
				} else {
					this.lqpay.splice(idx, 1);
					var chaun = [];
					this.chuan = chaun;
					var passTypes = [];
					var passTypesnum = [];
					for (var i = 0; i < this.Stringnumber.length; i++) {
						if (i == 0) {
							this.Stringnumber[i].state = true;
						} else {
							this.Stringnumber[i].state = false;
						}

					}
					if (this.chuan.length == 0) {
						if (this.navPlay == 'SFC' || this.navPlay == 'DGGP') {
							this.chuan = ['单关固赔'];
						} else {
							this.chuan = ['2串1'];
						}

					}
					if (this.navPlay == 'SFC' || this.navPlay == 'DGGP') {
						passTypesnum.push('DGGP')
						passTypes.push('P1')

					} else {
						passTypesnum.push(2)
						passTypes.push('P2_1')

					}
					var arr = this.lqpay;
					for (var i = 0; i < arr.length; i++) {
						arr[i].dan = false;
					}
					setSession("passTypes", passTypes);
					setSession("passTypesnum", passTypesnum);
					setSession("arr", this.lqpay);
				}
				this.jiSuanZhuShu(this.lqpay);
			},
			addList: function() {
				if (this.navPlay=='SFC'||this.navPlay=='HHGG'||this.navPlay=='DGGP') {
					
				}else{
					for (let i = 0; i < this.lqpay.length;) {
						if (this.lqpay[i].foddsType||this.lqpay[i].soddsType) {
							i++
						} else{
							this.lqpay.splice(i, 1);
						}
					}
				}
				
				setSession("arr", this.lqpay);
				this.RouteLeave=true;
				this.$router.go(-1);
			},
			showMaskchuan: function() {
				if (this.showMask) {
					this.showMask = false;
				} else {
					this.showMask = true;
				}
			},
			// 显示隐藏模拟键盘
			showkeyboardjp: function() {
				$api.css($api.dom('.keyboard'), "display:block");
			},
			hidekeyboard: function() {

				$api.css($api.dom('.keyboard'), "display:none");
			},
			hideshowMask: function() {
				this.showkeyboard = false;
				this.showMask = true;
				if (this.multiple == '0') {
					this.multiple = '1'
				}
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
				var mun = ''
				if (this.multiple == '0') {
					mun = idx
				} else if(this.coverage){
						mun = idx;
						this.coverage=false;
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
				this.coverage=false;
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
			},
			closekeyboard: function() {
				this.showkeyboard = false;
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
				var chaun = [];
				this.chuan = chaun;
				var passTypes = [];
				var passTypesnum = [];
				for (var i = 0; i < this.Stringnumber.length; i++) {
					if (this.Stringnumber[i].state) {
						chaun.push(this.Stringnumber[i].name);
						passTypes.push(this.Stringnumber[i].id);
						if (this.Stringnumber[i].type) {
							passTypesnum.push(this.Stringnumber[i].type);
						} else {
							passTypesnum.push(this.Stringnumber[i].num);
						}

					}
				}
				console.log(this.chuan.length);
				if (this.chuan.length == 0) {
					if (this.navPlay == 'SFC' || this.navPlay == 'DGGP') {
						this.chuan = ['单关固赔'];
					} else {
						this.chuan = ['2串1'];
					}
					this.Stringnumber[0].state = true;
				}
				if (this.navPlay == 'SFC' || this.navPlay == 'DGGP') {
					if (passTypesnum.length == 0) {
						passTypesnum.push('DGGP')
					}
					if (passTypes.length == 0) {
						passTypes.push('P1')
					}
				} else {
					if (passTypesnum.length == 0) {
						passTypesnum.push(2)
					}
					if (passTypes.length == 0) {
						passTypes.push('P2_1')
					}
				}
				console.log(passTypes);
				console.log(passTypesnum);
				setSession("passTypes", passTypes);
				setSession("passTypesnum", passTypesnum);
				// getForecast(this.lqpay.lqpay);
				this.showMask = false;
				var arr = this.lqpay;
				for (var i = 0; i < arr.length; i++) {
					arr[i].dan = false;
				}
				this.jiSuanZhuShu(arr);
			},

			onUserprotocol: function() {
				if (this.Userprotocol) {
					this.Userprotocol = false
				} else {
					this.Userprotocol = true
				}
			},
			xuanDan: function(idx) {
				var arr = this.lqpay;
				var passTypes = getSession("passTypes");
				console.log(passTypes);
				var dnums;
				if (passTypes) {
					switch (passTypes[0]) {
						case "P2_1":
							dnums = 1;
							break;
						case "P3_1":
							dnums = 2;
							break;
						case "P4_1":
							dnums = 3;
							break;
						case "P5_1":
							dnums = 4;
							break;
						case "P6_1":
							dnums = 5;
							break;
						case "P7_1":
							dnums = 6;
							break;
						case "P8_1":
							dnums = 7;
							break;
					}
				} else {
					dnums = 1;
				}
				if (passTypes[0] == 'P1') {
					return;
				} else {
					if (this.lqpay[idx].dan) {
						this.lqpay[idx].dan = false
					} else {
						if (this.lqpay.length <= dnums + 1) {
							return
						}
						var num = 0;
						for (var i = 0; i < this.lqpay.length; i++) {
							if (this.lqpay[i].dan) {
								num += 1
							}
						}
						if (dnums == num) {
							return
						}
						this.lqpay[idx].dan = true
					}
					this.jiSuanZhuShu(this.lqpay);
				}


			},
			pay: function() {
				if (parseInt(this.multiple) < 1) {
					this.multiple=1;
					Toast('投注倍数不能小于1倍！');
					return
				}
				if (this.Userprotocol) {
					if (this.talNum < 1) {
						Toast("注数小于1注无法投注")
					} else {
						this.payPopup = true;
					}
				} else {
					Toast("请阅读并勾选委托投注规则！")
				}
			},
				paybtn: function() {
					this.payPopup=false;
				var data = this.setData(this.navPlay);
				console.log(JSON.stringify(data));
				if (data == "noc") {
					alert("选择有误");
					return false;
				}
				
				let _data = {...data};
				data = this.Encrypt(_data);
				let dataes = this.Qs.stringify({
					path: "jc/jclq",
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/createScheme',
						dataes
					)
					.then(ret => {
						if (ret.status == 200) {
							console.log(JSON.stringify(ret.data));
							var content = JSON.parse(ret.data.content);
							if (content.code == "100000") {
								var datacontent=this.setData(this.navPlay)['ticketContent'];
								var data=[];
								var myDate = new Date();
								myDate=getTime(myDate,2);
								var CitySN;
								if(getSession('equipmentIp')){
									CitySN=getSession('equipmentIp');
								}
								// obj.id=;
								data["mid"]=1;
								data["lotteryType"]=18;
								data['periodNumber']='';
								data["shareType"]=1; 
								data["shareTime"]=myDate;
								data["uid"]=getCookie('newData').userid;
								data["multiple"]=this.multiple;
								data["schemeCost"]=this.talNum * 2 * this.multiple;
								data["subscriptionMoney"]=this.talNum * 2 * this.multiple;
								data["content"]=datacontent;
								data['prizeAwards']='';
								data["quipmentiIp"]=CitySN;		//投注IP 
								data["quipmentTeype"]=10 ;         // 投注设备类型
								data["quipmentNumber"]='';          //投注设备号
								data["quipmentUid"]=getCookie('newData').userid;           // 投注UID
								data["quipmentOrderId"] =  content.data.schemeNumber;
								let object = {...data}
								setSession('obj', object);
								sessionStorage.removeItem('arr');
								sessionStorage.removeItem('parr');
								setSession('moneyType', 'LOTTERYMONEY');
								 this.RouteLeave=true;
								this.$router.push({
									path: '/goucai/goucai_success',
									query: {
										success: 'jclq',
										schemeId: content.data.schemeId,
										wcj_totalPrice: this.talNum * 2 * this.multiple,
										from: 'pay',
										types:'jingji'
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
			bakey: function() {
				this.$router.go(-1);
			},
			closebakey: function() {
				MessageBox({
				
					title:'',
						message: '您确定要清空当前投注内容吗',
						showCancelButton: true,
						confirmButtonText:'确定',
						
					}).then(action => {
						if (action == 'confirm') {
							sessionStorage.removeItem('arr');
							sessionStorage.removeItem('passTypes');
							sessionStorage.removeItem('passTypesnum');
							sessionStorage.removeItem('matchDate');
							 this.RouteLeave=true;
							this.$router.go(-1);
						}else{
							
						}})
				
			},
			/*注数计算调用*/
			jiSuanZhuShu: function(arr) {
				totalArr = [];
				danArr = [];
				var num;
				if (this.navPlay == 'SFC') {
					for (var i = 0; i < arr.length; i++) {
						num = 0;
						var qrlen = arr[i].sfcchooseQr.length;
						for (var j = 0; j < qrlen; j++) {
							num += 1;
						}
						totalArr.push(num);
					}
					console.log(totalArr);
				} else if (this.navPlay == 'HHGG' || this.navPlay == 'DGGP') {

					for (var i = 0; i < arr.length; i++) {
						num = 0;
						if (arr[i].typelx == 'RFSF') {
							var qrlen = arr[i].chooseType1.length;
							for (var j = 0; j < qrlen; j++) {
								if (arr[i].chooseType1[j] == true) {
									num += 1;
								}
							}
						}
						if (arr[i].typelx == 'SF') {
							var qrlen = arr[i].chooseType2.length;
							for (var j = 0; j < qrlen; j++) {
								if (arr[i].chooseType2[j] == true) {
									num += 1;
								}
							}
						}
						if (arr[i].typelx == 'DXF') {
							var qrlen = arr[i].chooseType3.length;
							for (var j = 0; j < qrlen; j++) {
								if (arr[i].chooseType3[j] == true) {
									num += 1;
								}
							}
						}
						if (arr[i].typelx == 'SFC') {
							var qrlen = arr[i].chooseType4.length;
							for (var j = 0; j < qrlen; j++) {
								if (arr[i].chooseType4[j] == true) {
									num += 1;
								}
							}
						}
						totalArr.push(num);
					}

					console.log(totalArr);
				} else {
					for (var i = 0; i < arr.length; i++) {
						num = 0;
						if (arr[i].soddsType) {
							num += 1;

						}
						if (arr[i].foddsType) {
							num += 1;

						};
						totalArr.push(num);
					}
					console.log(totalArr);
				}

				for (var z = 0; z < arr.length; z++) {
					if (arr[z].dan) {
						danArr.push(z)
					}
				}
				this.talNum = this.gettotalNum();
				this.getForecast(arr);
			},
			getForecast: function(arr) {
				// console.log(JSON.stringify(arr));
				var passTypesnum = getSession("passTypesnum");
				console.log(passTypesnum);
				var multiple = this.multiple;
				// 串关数组
				var _arr = [];
				var minBet = [];
				var maxBet = [];
				// 胆数组
				var danArrdata = [];
				var danminBet = [];
				var danmaxBet = [];
				if (this.navPlay == 'SFC') {
					for (var i = 0; i < arr.length; i++) {
						var bets = [];
						var danarrstr = [];
						var qrlen = arr[i].sfcchoosesp;
						for (var j = 0; j < qrlen.length; j++) {
							if (arr[i].dan) {
								danarrstr.push(qrlen[j]);
							} else {
								bets.push(qrlen[j]);
							}

						}
						if (passTypesnum == 'DGGP') {
							_arr.push(bets);
						} else {
							if (danarrstr.length > 0) {
								var danmin = Math.min.apply({}, danarrstr);
								var danmax = Math.max.apply({}, danarrstr);
								danminBet.push(danmin);
								danmaxBet.push(danmax);
							}
							if (bets.length > 0) {
								var min = Math.min.apply({}, bets);
								var max = Math.max.apply({}, bets);
								minBet.push(min);
								maxBet.push(max);
							}


						}

					}
					if (passTypesnum == 'DGGP') {

					} else {
						if (danminBet.length > 0) {
							danArrdata.push(danminBet);
							danArrdata.push(danmaxBet);
						}

						_arr.push(minBet);
						_arr.push(maxBet);
					}

				} else if (this.navPlay == 'HHGG' || this.navPlay == 'DGGP') {
					for (var i = 0; i < arr.length; i++) {
						var bets = [];
						var danarrstr = [];
						if (arr[i].chooseType1) {
							for (var a = 0; a < arr[i].chooseType1.length; a++) {
								if (arr[i].dan) {
									if (arr[i].chooseType1[a]) {
										danarrstr.push(arr[i].hhggsp1[a]);
									}
								} else {
									if (arr[i].chooseType1[a]) {
										bets.push(arr[i].hhggsp1[a]);
									}
								}


							}
						}
						if (arr[i].chooseType2) {
							for (var b = 0; b < arr[i].chooseType2.length; b++) {
								if (arr[i].dan) {
									if (arr[i].chooseType2[b]) {
										danarrstr.push(arr[i].hhggsp2[b]);
									}
								} else {
									if (arr[i].chooseType2[b]) {
										bets.push(arr[i].hhggsp2[b]);
									}
								}


							}
						}
						if (arr[i].chooseType3) {
							for (var c = 0; c < arr[i].chooseType3.length; c++) {
								if (arr[i].dan) {
									if (arr[i].chooseType3[c]) {
										danarrstr.push(arr[i].hhggsp3[c]);
									}
								} else {
									if (arr[i].chooseType3[c]) {
										bets.push(arr[i].hhggsp3[c]);
									}
								}

							}
						}
						if (arr[i].chooseType4) {
							for (var d = 0; d < arr[i].chooseType4.length; d++) {
								if (arr[i].dan) {
									if (arr[i].chooseType4[d]) {
										danarrstr.push(arr[i].hhggsp4[d]);
									}
								} else {
									if (arr[i].chooseType4[d]) {
										bets.push(arr[i].hhggsp4[d]);
									}
								}


							}
						}
						if (this.navPlay == 'DGGP') {
							_arr.push(bets);

						} else {
							if (danarrstr.length > 0) {
								var danmin = Math.min.apply({}, danarrstr);
								var danmax = Math.max.apply({}, danarrstr);

								danminBet.push(danmin);
								danmaxBet.push(danmax);
							}

							if (bets.length > 0) {
								var min = Math.min.apply({}, bets);
								var max = Math.max.apply({}, bets);
								minBet.push(min);
								maxBet.push(max);
							}
						}

					}
					if (this.navPlay == 'DGGP') {


					} else {
						danArrdata.push(danminBet);
						danArrdata.push(danmaxBet);
						_arr.push(minBet);
						_arr.push(maxBet);
					}

				} else {
					for (var i = 0; i < arr.length; i++) {
						var bets = [];
						var danarrstr = [];
						if (arr[i].dan) {
							if (arr[i].soddsType) {
								danarrstr.push(arr[i].sodds);
							}
							if (arr[i].foddsType) {
								danarrstr.push(arr[i].fodds);
							}
							if (danarrstr.length > 0) {
								var min = Math.min.apply({}, danarrstr);
								var max = Math.max.apply({}, danarrstr);
								danminBet.push(min);
								danmaxBet.push(max);
							}
						} else {
							if (arr[i].soddsType) {
								bets.push(arr[i].sodds);
							}
							if (arr[i].foddsType) {
								bets.push(arr[i].fodds);
							};
							if (bets.length > 0) {
								var min = Math.min.apply({}, bets);
								var max = Math.max.apply({}, bets);
								minBet.push(min);
								maxBet.push(max);
							}
						}
						// console.log(bets);
					}
					_arr.push(minBet);
					_arr.push(maxBet);
					if (danminBet.length > 0) {
						danArrdata.push(danminBet);
						danArrdata.push(danmaxBet);
					}

				}
				console.log(JSON.stringify(_arr));
				console.log(JSON.stringify(danArrdata));
				console.log(multiple);
				console.log(passTypesnum);

				var numdan = [];
				if (danArrdata.length > 0) {
					var data = danmaxPrizeAndCost(multiple, passTypesnum, _arr, danArrdata, numdan);

				} else {
					var data = varietymaxPrizeAndCost(multiple, passTypesnum, _arr, danArrdata, numdan);
				}

				if (this.talNum < 1) {
					this.minBet = 0;
					this.maxBet = 0;
				} else {
					this.minBet = data[0];
					this.maxBet = data[1];
				}


			},
			setData: function(playType) {
				var data = [];
				let newData = getCookie('newData');
					var uid = newData.userid;
				if (!uid) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
			
			

				//拼接uid
				data.userId =uid;
				//方案描述
				data.description = "";
				//过关模式
				data.passMode = "PASS";
				if (getSession("passTypes")[0] == "P1" && getSession("passTypes").length == 1)
					data.passMode = "SINGLE";
				var arr = this.lqpay;
				//方案投注方式
				var mode = "SINGLE";
				//过关方式
				var passTypes = getSession("passTypes") || ["P2_1"];
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

				data.multiple = this.multiple;

				//方案金额
				var schemeCost = parseInt(this.talNum) * parseInt(this.multiple) * 2;
				data.schemeCost = schemeCost;
				var ticketContent = [];
				if (playType == "SF" || playType == "RFSF" || playType == "DXF") {
					//玩法类型
					data.playType = playType;
					//投注内容
					mode = "COMPOUND";
					for (var i = 0; i < arr.length; i++) {
						var obj =  [];
						obj.matchKey = arr[i].matchKey;
						if (arr[i].dan) {
							obj.dan = true;
						} else {
							obj.dan = false;
						}
						var erxy = []
						if (playType == 'SF') {
							if (arr[i].soddsType) {
								erxy.push('胜');
							}
							if (arr[i].foddsType) {
								erxy.push('负');
							}
						} else if (playType == 'RFSF') {
							if (arr[i].soddsType) {
								erxy.push('客胜');
							}
							if (arr[i].foddsType) {
								erxy.push('主胜');
							}
						} else if (playType == 'DXF') {
							if (arr[i].soddsType) {
								erxy.push("大分");
							}
							if (arr[i].foddsType) {
								erxy.push("小分");
							}
						}
						console.log(erxy);
						if (erxy.length > 0) {
							if (playType == 'SF') {
								obj.value = getsfTotal(erxy);
							} else if (playType == 'RFSF') {
								obj.value = getrfsfTotal(erxy);
							} else if (playType == 'DXF') {
								obj.value = getdxfTotal(erxy);
							}
							ticketContent.push({...obj});
						}
					}
				} else if (playType == 'SFC') {
					data.playType = playType;
					mode = "COMPOUND";
					for (var i = 0; i < arr.length; i++) {
						var obj =  [];
						obj.matchKey = arr[i].matchKey;
						if (arr[i].dan) {
							obj.dan = true;
						} else {
							obj.dan = false;
						}
						obj.value = getsfcTotal(arr[i].sfcchooseQr);
						// console.log(JSON.stringify(obj.value));

						ticketContent.push({...obj});

					}
				} else if (playType == 'HHGG') {
					data.playType = playType;
					mode = "COMPOUND"
					for (var i = 0; i < arr.length; i++) {
						var obj =  [];
						obj.matchKey = arr[i].matchKey;
						if (arr[i].dan) {
							obj.dan = true;
						} else {
							obj.dan = false;
						}
						if (arr[i].typelx == 'SF') {
							var sf = [];
							for (var j = 0; j < arr[i].chooseType2.length; j++) {
								if (arr[i].chooseType2[j]) {
									sf.push(arr[i].type2[j]);
								}
							}
							obj.value = getsfTotal(sf);
						}
						if (arr[i].typelx == 'RFSF') {
							var rfsf = [];
							for (var j = 0; j < arr[i].chooseType1.length; j++) {
								if (arr[i].chooseType1[j]) {
									rfsf.push(arr[i].type1[j]);
								}
							}
							obj.value = getrfsfTotal(rfsf);
						}
						if (arr[i].typelx == 'DXF') {
							var dxf = [];
							for (var j = 0; j < arr[i].chooseType3.length; j++) {
								if (arr[i].chooseType3[j]) {
									dxf.push(arr[i].type3[j]);
								}
							}
							obj.value = getdxfTotal(dxf);
						}
						if (arr[i].typelx == 'SFC') {
							var sfc = [];
							for (var j = 0; j < arr[i].chooseType4.length; j++) {
								if (arr[i].chooseType4[j]) {
									sfc.push(arr[i].type4[j]);
								}
							}
							obj.value = getsfcTotal(sfc);
						}
						ticketContent.push({...obj});

					}
				} else if (playType == 'DGGP') {
					data.playType = playType;
					mode = "COMPOUND"
					for (var i = 0; i < arr.length; i++) {
						var obj =  [];
						obj.matchKey = arr[i].matchKey;
						if (arr[i].dan) {
							obj.dan = true;
						} else {
							obj.dan = false;
						}
						if (arr[i].typelx == 'SF') {
							var sf = [];
							for (var j = 0; j < arr[i].chooseType2.length; j++) {
								if (arr[i].chooseType2[j]) {
									sf.push(arr[i].type2[j]);
								}
							}
							obj.value = getsfTotal(sf);
						}
						if (arr[i].typelx == 'RFSF') {
							var rfsf = [];
							for (var j = 0; j < arr[i].chooseType1.length; j++) {
								if (arr[i].chooseType1[j]) {
									rfsf.push(arr[i].type1[j]);
								}
							}
							obj.value = getrfsfTotal(rfsf);
						}
						if (arr[i].typelx == 'DXF') {
							var dxf = [];
							for (var j = 0; j < arr[i].chooseType3.length; j++) {
								if (arr[i].chooseType3[j]) {
									dxf.push(arr[i].type3[j]);
								}
							}
							obj.value = getdxfTotal(dxf);
						}
						if (arr[i].typelx == 'SFC') {
							var sfc = [];
							for (var j = 0; j < arr[i].chooseType4.length; j++) {
								if (arr[i].chooseType4[j]) {
									sfc.push(arr[i].type4[j]);
								}
							}
							obj.value = getsfcTotal(sfc);
						}
						ticketContent.push({...obj});

					}
				}
				//方案注数
				data.units = this.talNum;
				data.mode = mode;
				if (ticketContent.length == 0) {
					return "noc";
				}
				data.ticketContent = ticketContent;
				data.betContent = [];
				//币种
				data.moneyType = "LOTTERYMONEY";
				console.log(JSON.stringify(data));
				return data;
			},
			gettotalNum: function() {
				var totalNum = 0;
				console.log(getSession("passTypes"));
				if (getSession("passTypes") && danArr.length == 0) {
					var passTypes = getSession("passTypes");
					for (var i = 0; i < passTypes.length; i++) {
						//单管
						if (passTypes[i] == "P1") {
							for (var k = 0; k < totalArr.length; k++) {
								totalNum += totalArr[k] * 1;
							}
						}
						//二串一
						else if (passTypes[i] == "P2_1") {
							for (var k = 0; k < totalArr.length; k++) {
								for (var j = k; j < totalArr.length; j++) {
									if (k != j) {
										totalNum += totalArr[k] * totalArr[j];
									}
								}
							}
						} else if (passTypes[i] == "P3_1") {
							for (var k = 0; k < totalArr.length; k++) {
								for (var j = k; j < totalArr.length; j++) {
									for (var l = j; l < totalArr.length; l++) {
										if (k != j && j != l) {
											totalNum += totalArr[k] * totalArr[j] * totalArr[l];
										}
									}
								}
							}
						} else if (passTypes[i] == "P4_1") {
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
						} else if (passTypes[i] == "P5_1") {
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
						} else if (passTypes[i] == "P6_1") {
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
						} else if (passTypes[i] == "P7_1") {
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
						} else if (passTypes[i] == "P8_1") {
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
																	totalArr[v] * totalArr[b];
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
					console.log(totalNum);
					return totalNum;

				} else if (getSession("passTypes") && danArr.length > 0) {
					var newArr = [];
					for (var w = 0; w < totalArr.length; w++) {
						newArr.push(totalArr[w]);
					}
					var dan = 1;
					for (var t = 0; t < danArr.length; t++) {
						dan *= newArr[danArr[t]];
					}
					for (var t = danArr.length - 1; t >= 0; t--) {
						//removeArr(newArr,newArr[danArr[t]]);
						newArr.splice(danArr[t], 1);
					}
					var passTypes = getSession("passTypes");
					for (var i = 0; i < passTypes.length; i++) {
						//单管
						if (passTypes[i] == "P1") {
							totalNum += dan * 1;
						}
						//二串一
						else if (passTypes[i] == "P2_1") {
							for (var q = 0; q < newArr.length; q++) {
								totalNum += dan * newArr[q];
							}
						} else if (passTypes[i] == "P3_1") {
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
						} else if (passTypes[i] == "P4_1") {
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
						} else if (passTypes[i] == "P5_1") {
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
						} else if (passTypes[i] == "P6_1") {
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
						} else if (passTypes[i] == "P7_1") {
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
						} else if (passTypes[i] == "P8_1") {
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
				} else if (!getSession("passTypes") && danArr.length == 0) {
					if (this.chuan == "单关固赔") {
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
				} else if (!getSession("passTypes") && danArr.length > 0) {
					var newArr = [];
					for (var w = 0; w < totalArr.length; w++) {
						newArr.push(totalArr[w]);
					}
					var dan = 1;
					for (var t = 0; t < danArr.length; t++) {
						dan *= newArr[danArr[t]];
					}
					for (var t = danArr.length - 1; t >= 0; t--) {
						//removeArr(newArr,newArr[danArr[t]]);
						newArr.splice(danArr[t], 1);
					}
					for (var q = 0; q < newArr.length; q++) {
						totalNum += dan * newArr[q];
					}
					return totalNum;
				}
			}
		}

	}
	//生成ticketContent里面的sfc_value
	function getsfcTotal(value) {
		var total = 0;
		for (var k = 0; k < value.length; k++) {
			switch (value[k]) {
				case "客胜1-5":
					total += 1;
					break;
				case "客胜6-10":
					total += 2;
					break;
				case "客胜11-15":
					total += 4;
					break;
				case "客胜16-20":
					total += 8;
					break;
				case "客胜21-25":
					total += 16;
					break;
				case "客胜26+":
					total += 32;
					break;
				case "主胜1-5":
					total += 64;
					break;
				case "主胜6-10":
					total += 128;
					break;
				case "主胜11-15":
					total += 256;
					break;
				case "主胜16-20":
					total += 512;
					break;
				case "主胜21-25":
					total += 1024;
					break;
				case "主胜26+":
					total += 2048;
					break;
				case "客1-5":
					total += 1;
					break;
				case "客6-10":
					total += 2;
					break;
				case "客11-15":
					total += 4;
					break;
				case "客16-20":
					total += 8;
					break;
				case "客21-25":
					total += 16;
					break;
				case "客26+":
					total += 32;
					break;
				case "主1-5":
					total += 64;
					break;
				case "主6-10":
					total += 128;
					break;
				case "主11-15":
					total += 256;
					break;
				case "主16-20":
					total += 512;
					break;
				case "主21-25":
					total += 1024;
					break;
				case "主26+":
					total += 2048;
					break;
			}
		}
		return "SFC_" + total;
	}

	function getsfTotal(value) {
		var total = 0;
		for (var k = 0; k < value.length; k++) {
			switch (value[k]) {
				case "胜":
					total += 1;
					break;
				case "负":
					total += 2;
					break;
			}
		}
		return "SF_" + total;
	}
	//
	function getrfsfTotal(value) {
		var total = 0;
		for (var k = 0; k < value.length; k++) {
			switch (value[k]) {
				case "客胜":
					total += 1;
					break;
				case "主胜":
					total += 2;
					break;
			}
		}
		return "RFSF_" + total;
	}

	function getdxfTotal(value) {
		var total = 0;
		for (var k = 0; k < value.length; k++) {
			switch (value[k]) {
				case "大分":
					total += 1;
					break;
				case "小分":
					total += 2;
					break;
			}
		}
		return "DXF_" + total;
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
