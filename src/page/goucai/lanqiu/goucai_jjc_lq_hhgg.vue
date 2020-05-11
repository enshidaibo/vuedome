<template>

	<div>
			<section class="aui-refresh-content">
			<div class="aui-content">
		<div class="hunhgg_fm main">
			<template v-for="(item, cindex) in RQSPFlist">
				<div class="countime" :id="'jjc_hhggTime' + cindex" @click="showList(cindex)" data-state="open">
					<div class="date_fleft">{{item.matchDate|GetTimeStr(1)}}<span>共有<i>{{item.matchList|getLength()}}</i>场比赛可投</span></div>
					<div class="fright"><i class="aui-iconfont " :class="showListarr[cindex]?'aui-icon-top':'aui-icon-down'"></i></div>
				</div>
				<div class="jjc_sc_cont jjc_hhgg_cont jjc_hhggl_cont" v-show="showListarr[cindex]">
					<div v-for="(thal, rindex) in item.matchList" class="con" v-if="$options.filters.gamesShow(thal.gameName)">
						<div class="flr titl">
							<p class="p1"><span class="sq_icon" :style="{background:thal.gameColor}"></span><span>{{thal.gameName}}</span></p>
							<p>{{thal.stopBuyTime|GetTimeStr(2)}} {{thal.lineId}}</p>
							<p>{{thal.stopBuyTime|GetTimeStr(3)}}截止</p>
						</div>
						<div class="fgr battle">
							<div class="battle_name"><span><i>(客) </i>{{thal.guestTeamName}}</span><span>vs</span><span> {{thal.homeTeamName}}<i>
										(主)</i></span></div>
							<div class="battle_shel">
								<div class="last" v-if=thal.playTypeOpen.SFC @click="showPopup('Popuphhgg','chooseType4',cindex,rindex)" :class="{'el-yellow': thal.genduo}">更多<br />选项</div>
								<div class="last" v-else>暂无<br />更多</div>
								<ul class="ul1" v-if=thal.playTypeOpen.RFSF>
									<li>让分</li>
									<li :class="{'el-yellow': thal.chooseType1[1]}" @click="selectJJC_hhgg(cindex,rindex,'chooseType1',1,'客胜',thal.hhggsp1[1])">客胜<br />
										<span>{{thal.hhggsp1[1]}}</span></li>
									<li v-if="thal.singleHandicap>0" class="td_red td_wd">主+{{thal.singleTotalScore}}</li>
									<li v-else class="td_red td_wd green">主{{thal.singleHandicap}}</li>
									<li :class="{'el-yellow': thal.chooseType1[0]}" @click="selectJJC_hhgg(cindex,rindex,'chooseType1',0,'主胜',thal.hhggsp1[0])">主胜<br /><span>{{thal.hhggsp1[0]}}</span></li>
								</ul>
								<ul v-else class="ul1">
									<li>大小分</li>
									<li class="zwkf">暂无开放</li>
								</ul>
								<ul class="ul2" v-if=thal.playTypeOpen.SF>
									<li>非让分</li>
									<li :class="{'el-yellow':thal.chooseType2[0]}" @click="selectJJC_hhgg(cindex,rindex,'chooseType2',0,'胜',thal.hhggsp2[0])"
									 class="td_ts">胜<br /><span>{{thal.hhggsp2[0]}}</span></li>
									<li :class="{'el-yellow':thal.chooseType2[1]}" @click="selectJJC_hhgg(cindex,rindex,'chooseType2',1,'负',thal.hhggsp2[1])"
									 class="td_ts">负<br /> <span>{{thal.hhggsp2[1]}}</span></li>
								</ul>
								<ul v-else class="ul2">
									<li>大小分</li>
									<li class="zwkf">暂无开放</li>
								</ul>
								<ul class="ul3" v-if=thal.playTypeOpen.DXF>
									<li>大小分</li>
									<li :class="{'el-yellow': thal.chooseType3[0]}" @click="selectJJC_hhgg(cindex,rindex,'chooseType3',0,'大分',thal.hhggsp3[0])">大分<br /><span>{{thal.hhggsp3[0]}}</span></li>
									<li class="td_wd">分数<br /><span>168.5</span></li>
									<li :class="{'el-yellow': thal.chooseType3[1]}" @click="selectJJC_hhgg(cindex,rindex,'chooseType3',1,'小分',thal.hhggsp3[1])">小分<br />
										<span>{{thal.hhggsp3[0]}}</span></li>
								</ul>
								<ul v-else class="ul3">
									<li>大小分</li>
									<li class="zwkf">暂无开放</li>
								</ul>

							</div>
						</div>
					</div>
				</div>
			</template>
		</div>
		<lini-page :tpyes="'event'" :zheight='"85vh"' :zwidth='"100%"' :prompt='"该玩法暂无赛事"' :goText='"去其他玩法看看"' @tonewpage='othersPlay' v-if='nomatches'></lini-page>
		<!-- <div class="goucai_quesheng" v-if='nomatches'>
			<div class="ques_cont">
				<img src="../../../assets/goucai/jjc/no_sais.png" />
				<p class="p1">该玩法暂无赛事</p>
				<p class="p2" @click="othersPlay">去其他玩法看看</p>
			</div>
		</div> -->
		</div>
		</section>
		<!-- 混合过关点击投注弹出窗 -->
		<div v-if="PopupArr.Popuphhgg" class="mask bifen" v-cloak @touchmove.prevent>
			</div>
			<div class="banqc_cont bifen_cont shengfc_cont"  @touchmove.prevent>
				<div v-if="PopupArr.Popuphhgg">
				<div class="title"><span><i>(客) </i>{{sfc.guestTeamName}}</span><span> vs </span><span>{{sfc.homeTeamName}}<i> (主)</i></span></div>
				<div class="con">
					<table>
						<tr>
							<td rowspan='2' class="td1">客胜</td>
							<td :class="{ 'el-yellow':sfc.chooseType4[0]  }" @click="selectJJC_hhgg(cindex,rindex,'chooseType4','0','客1-5',sfc.hhggsp4[0])"><span>1-5</span><span>{{sfc.hhggsp4[0]}}</span></td>
							<td :class="{ 'el-yellow': sfc.chooseType4[1] }" @click="selectJJC_hhgg(cindex,rindex,'chooseType4','1','客6-10',sfc.hhggsp4[1])"><span>6-10</span><span>{{sfc.hhggsp4[1]}}</span></td>
							<td :class="{ 'el-yellow': sfc.chooseType4[2] }" @click="selectJJC_hhgg(cindex,rindex,'chooseType4','2','客11-15',sfc.hhggsp4[2])"><span>11-15</span><span>{{sfc.hhggsp4[2]}}</span></td>
						</tr>
						<tr>
							<td :class="{ 'el-yellow': sfc.chooseType4[3] }" @click="selectJJC_hhgg(cindex,rindex,'chooseType4','3','客16-20',sfc.hhggsp4[3])"><span>16-20</span><span>{{sfc.hhggsp4[3]}}</span></td>
							<td :class="{ 'el-yellow': sfc.chooseType4[4] }" @click="selectJJC_hhgg(cindex,rindex,'chooseType4','4','客21-25',sfc.hhggsp4[4])"><span>21-25</span><span>{{sfc.hhggsp4[4]}}</span></td>
							<td :class="{ 'el-yellow':sfc.chooseType4[5] }" @click="selectJJC_hhgg(cindex,rindex,'chooseType4','5','客26+',sfc.hhggsp4[5])"><span>26+</span><span>{{sfc.hhggsp4[5]}}</span></td>
		
		
						</tr>
						<tr>
							<td rowspan='2' class="td2">主胜</td>
							<td :class="{ 'el-yellow': sfc.chooseType4[6] }" @click="selectJJC_hhgg(cindex,rindex,'chooseType4','6','主1-5',sfc.hhggsp4[6])"><span>1-5</span><span>{{sfc.hhggsp4[6]}}</span></td>
							<td :class="{ 'el-yellow': sfc.chooseType4[7] }" @click="selectJJC_hhgg(cindex,rindex,'chooseType4','7','主6-10',sfc.hhggsp4[7])"><span>6-10</span><span>{{sfc.hhggsp4[7]}}</span></td>
							<td :class="{ 'el-yellow': sfc.chooseType4[8] }" @click="selectJJC_hhgg(cindex,rindex,'chooseType4','8','主11-15',sfc.hhggsp4[8])"><span>11-15</span><span>{{sfc.hhggsp4[8]}}</span></td>
		
						</tr>
						<tr>
							<td :class="{ 'el-yellow': sfc.chooseType4[9]}" @click="selectJJC_hhgg(cindex,rindex,'chooseType4','9','主16-20',sfc.hhggsp4[9])"><span>16-20</span><span>{{sfc.hhggsp4[9]}}</span></td>
							<td :class="{ 'el-yellow': sfc.chooseType4[10] }" @click="selectJJC_hhgg(cindex,rindex,'chooseType4','10','主21-25',sfc.hhggsp4[10])"><span>21-25</span><span>{{sfc.hhggsp4[10]}}</span></td>
							<td :class="{ 'el-yellow': sfc.chooseType4[11] }" @click="selectJJC_hhgg(cindex,rindex,'chooseType4','11','主26+',sfc.hhggsp4[11])"><span>26+</span><span>{{sfc.hhggsp4[11]}}</span></td>
						</tr>
					</table>
		
				</div>
				<div class="foot">
					<div @click="hidePopup('Popuphhgg')">取消</div>
					<div @click="confirmChoice('Popuphhgg')">确定</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		phoneLQ
	} from "../../../js/connector.js";
	import {
		getSession,
		animation,
		Get0pad,
		setSession
	} from '../../../js/common.js';
	import {
		Toast
	} from 'mint-ui';
	import {
		Indicator
	} from 'mint-ui';
	import {
		MessageBox
	} from 'mint-ui';
	export default {
		data() {
			return {
					nomatches:false,
				RQSPFlist: [],
				lqpay: [],
				sxlist: [], //赛选数组
				sxlistdata: [],
				sxcc: [], //赛选的场次.
				showListarr: [],
				matchListdata: [],
				sfcchoose: [], //sfc选中的初选
				sfcchoosesp: [], //sfc初选sp
				sfc: [], //sfc点击更多投注项的数据
				cindex: '', //当前数据的index
				rindex: '', //当前数据的index
				sfcchoose_qx: [], //取消数组
				sfcchoose_qxtext: [], //取消数组
				PopupArr: {
					Popupsfc: false,
					Popuphhgg: false,
					Popupdggp: false,
				},
				topStatus: ''
			};
		},
		created() {
			Indicator.open();
			this.getMatchList();
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
				} else return Get0pad(now.getHours(), 2) + ":" + Get0pad(now.getMinutes(), 2);
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
			getLength:function(matchList){
				let shaixuan = getSession('shaixuan');
				if (!shaixuan) {
					shaixuan = [];
				}
				var shaixuanLength=shaixuan.length;
				var matchListLength=matchList.length;
				var leng=0;
				for(var i=0;i<shaixuanLength;i++){
					for(var n=0;n<matchListLength;n++){
						if(shaixuan[i]==matchList[n].gameName){
							leng++
						}
					}
				}
				return leng;
			}
		},
		mounted() {
			
			    var that = this;
					   var pullToRefreshs = new auiPullToRefresh({ //下拉刷新
						container: document.querySelector('.aui-refresh-content'), //下拉容器
						triggerDistance: 80 //下拉高度
					}, function(ret) {
						if (ret.status == "success") {
							that.getMatchList();
							setTimeout(() => {
								pullToRefreshs.cancelLoading(); //刷新成功后调用此方法隐藏
							}, 1500)
						}
					});
		},
		methods: {
	
			
			showPopup: function(key,bkey,cindex, rindex) {
				// console.log(this.RQSPFlist[cindex].matchList[rindex][key]);
				var Type1, Type2, Type3, Type4;
				
				var chooseType1 = this.RQSPFlist[cindex].matchList[rindex]['chooseType1'];
				var chooseType2 = this.RQSPFlist[cindex].matchList[rindex]['chooseType2'];
				var chooseType3 = this.RQSPFlist[cindex].matchList[rindex]['chooseType3'];
				var chooseType4 = this.RQSPFlist[cindex].matchList[rindex]['chooseType4'];
				console.log(chooseType3);
				if (this.RQSPFlist[cindex].matchList[rindex]['chooseType1']) {
					for (var j = 0; j < chooseType1.length; j++) {
						if (chooseType1[j] == true) {
							Type1 = 'chooseType1';
				
						}
					}
				}
				if (this.RQSPFlist[cindex].matchList[rindex]['chooseType2']) {
					for (var j = 0; j < chooseType2.length; j++) {
						if (chooseType2[j] == true) {
							Type2 = 'chooseType2';
				
						}
					}
				}
				if (this.RQSPFlist[cindex].matchList[rindex]['chooseType3']) {
				
					for (var j = 0; j < chooseType3.length; j++) {
						if (chooseType3[j] == true) {
							Type3 = 'chooseType3';
						}
					}
				}
				if (this.RQSPFlist[cindex].matchList[rindex]['chooseType4']) {
					for (var j = 0; j < chooseType4.length; j++) {
						if (chooseType4[j] == true) {
							Type4 = 'chooseType4';
						}
					}
				}
				console.log(Type1);
				console.log(Type2);
				console.log(Type3);
				
				if (bkey == 'chooseType1') {
				
					if (Type2 || Type3 || Type4) {
						Toast('一场比赛中，只允许选择一个玩法进行过关!');
						return
					}
				} else if (bkey == 'chooseType2') {
					if (Type1 || Type3 || Type4) {
						Toast('一场比赛中，只允许选择一个玩法进行过关!');
						return
					}
				} else if (bkey == 'chooseType3') {
					if (Type1 || Type2 || Type4) {
						console.log(Type1);
						Toast('一场比赛中，只允许选择一个玩法进行过关!');
						return
					}
				} else if (bkey == 'chooseType4') {
					if (Type1 || Type2 || Type3) {
						Toast('一场比赛中，只允许选择一个玩法进行过关!');
						return
					}
				}
				this.cindex = cindex;
				this.rindex = rindex;
				console.log(this.PopupArr[key]);
				this.PopupArr[key] = true;
				this.sfc = this.RQSPFlist[cindex].matchList[rindex];
				if(getSession('arr')){
					//  var arrLength=getSession('arr').length;
					//  var arrMatchKey=[];
					// for (var d = 0; d <arrLength; d++) {
					// 	arrMatchKey.push(getSession('arr')[d].matchKey)
					// }				 
					// if(arrMatchKey.indexOf(sfc.matchKey)==-1&&arrLength==8){
					// 	Toast('至多一次选择8场赛事。');
					// 	return false
					// }
				}
				
				this.sfcchoose = JSON.parse(JSON.stringify(this.RQSPFlist[cindex].matchList[rindex].sfcchooseQr));
				this.sfcchoosesp = JSON.parse(JSON.stringify(this.RQSPFlist[cindex].matchList[rindex].sfcchoosesp));
				// this.sfcchoose_qx = JSON.parse(JSON.stringify(this.sfc.chooseType));
				this.sfcchoose_qxtext = JSON.parse(JSON.stringify(this.sfcchoose));
				var dom = document.querySelector('.banqc_cont')
				animation(dom, 'bottom', 0)
			},
			hidePopup: function(key) {
				this.PopupArr[key] = false;
				this.sfc.chooseType = JSON.parse(JSON.stringify(this.sfcchoose_qx));
				this.sfcchoose = JSON.parse(JSON.stringify(this.sfcchoose_qxtext));
				let dom = document.querySelector('.banqc_cont');
				let bottomDomInitial = window.getComputedStyle(dom).height.replace('px', '') * 1 * -1;
				animation(dom, 'bottom', bottomDomInitial)
				// console.log(JSON.stringify(this.sfc.chooseType));

			},
			selectJJC_hhgg: function(cindex, rindex, key, i, type, text) {
              if (text=="--") {
                  Toast('不能选择暂无赔率的赛事。')
                  return false;
                }
				// console.log(this.RQSPFlist[cindex].matchList[rindex][key]);
				var Type1, Type2, Type3, Type4;

				var chooseType1 = this.RQSPFlist[cindex].matchList[rindex]['chooseType1'];
				var chooseType2 = this.RQSPFlist[cindex].matchList[rindex]['chooseType2'];
				var chooseType3 = this.RQSPFlist[cindex].matchList[rindex]['chooseType3'];
				var chooseType4 = this.RQSPFlist[cindex].matchList[rindex]['chooseType4'];
				console.log(chooseType3);
				if (this.RQSPFlist[cindex].matchList[rindex]['chooseType1']) {
					for (var j = 0; j < chooseType1.length; j++) {
						if (chooseType1[j] == true) {
							Type1 = 'chooseType1';

						}
					}
				}
				if (this.RQSPFlist[cindex].matchList[rindex]['chooseType2']) {
					for (var j = 0; j < chooseType2.length; j++) {
						if (chooseType2[j] == true) {
							Type2 = 'chooseType2';

						}
					}
				}
				if (this.RQSPFlist[cindex].matchList[rindex]['chooseType3']) {

					for (var j = 0; j < chooseType3.length; j++) {
						if (chooseType3[j] == true) {
							Type3 = 'chooseType3';
						}
					}
				}
				if (this.RQSPFlist[cindex].matchList[rindex]['chooseType4']) {
					for (var j = 0; j < chooseType4.length; j++) {
						if (chooseType4[j] == true) {
							Type4 = 'chooseType4';
						}
					}
				}
				console.log(Type1);
				console.log(Type2);
				console.log(Type3);

				if (key == 'chooseType1') {

					if (Type2 || Type3 || Type4) {
						Toast('一场比赛中，只允许选择一个玩法进行过关!');
						return
					}
				} else if (key == 'chooseType2') {
					if (Type1 || Type3 || Type4) {
						Toast('一场比赛中，只允许选择一个玩法进行过关!');
						return
					}
				} else if (key == 'chooseType3') {
					if (Type1 || Type2 || Type4) {
						console.log(Type1);
						Toast('一场比赛中，只允许选择一个玩法进行过关!');
						return
					}
				} else if (key == 'chooseType4') {
					if (Type1 || Type2 || Type3) {
						Toast('一场比赛中，只允许选择一个玩法进行过关!');
						return
					}
				}

				if (this.RQSPFlist[cindex].matchList[rindex][key][i]) {
					this.$set(this.RQSPFlist[cindex].matchList[rindex][key], i, false);
					if (this.navPlay == 'SFC') {
						var index = this.sfcchoose.indexOf(text);
						if (index > -1) {
							this.sfcchoose.splice(index, 1);
						}
					}

				} else {
					this.$set(this.RQSPFlist[cindex].matchList[rindex][key], i, true);
					if (this.navPlay == 'SFC') {
						this.sfcchoose.push(text);
					}

				}
				if (key == 'chooseType4') {
					return
				} else {
					var lqpay = this.lqpay;
					var obj = toString(cindex) + toString(rindex);
					var obj = new Object();
					var match = this.RQSPFlist[cindex].matchList[rindex];
					if(getSession('arr')){
						//  var arrLength=getSession('arr').length;
						//  var arrMatchKey=[];
						// for (var d = 0; d <arrLength; d++) {
						// 	arrMatchKey.push(getSession('arr')[d].matchKey)
						// }				 
						// if(arrMatchKey.indexOf(match.matchKey)==-1&&arrLength==8){
						// 	Toast('至多一次选择8场赛事。');
						// 	return false
						// }
					}
					
					var matchDate = this.RQSPFlist[cindex].matchDate;
					var chooseType = false;
					if(match.chooseType1){
						for (var i = 0; i < match.chooseType1.length; i++) {
							if (match.chooseType1[i]) {
								chooseType = true;
							}
						}
					}
					if(match.chooseType2){
					for (var i = 0; i < match.chooseType2.length; i++) {
						if (match.chooseType2[i]) {
							chooseType = true;
						}
					}
					}
					if(match.chooseType3){
					for (var i = 0; i < match.chooseType3.length; i++) {
						if (match.chooseType3[i]) {
							chooseType = true;
						}
					}
					}
					console.log(match.chooseType1);
					console.log(match.chooseType2);
					console.log(match.chooseType3);
					if (chooseType) {
						obj['weekStr'] = match.weekStr;
						obj['lineId'] = match.lineId;
						obj['matchKey'] = match.matchKey;
						obj['gameName'] = match.gameName;
						obj['stopBuyTime'] = match.stopBuyTime;
						obj['homeTeamName'] = match.homeTeamName;
						obj['guestTeamName'] = match.guestTeamName;
						obj['handicap'] = match.handicap;
						obj['singleTotalScore'] = match.singleTotalScore;
						obj['singleHandicap'] = match.singleHandicap;
						obj['periodId'] = match.singleHandicap;

						obj['dan'] = false;
						if (key == 'chooseType1') {
							obj['typelx'] = 'RFSF';
							obj['type1'] = match.type1;
							obj['hhggsp1'] = match.hhggsp1;
							obj['chooseType1'] = match.chooseType1;
						} else if (key == 'chooseType2') {
							obj['typelx'] = 'SF';
							obj['type2'] = match.type2;
							obj['hhggsp2'] = match.hhggsp2;
							obj['chooseType2'] = match.chooseType2;
						} else if (key == 'chooseType3') {
							obj['typelx'] = 'DXF';
							obj['type3'] = match.type3;
							obj['hhggsp3'] = match.hhggsp3;
							obj['chooseType3'] = match.chooseType3;
						}
						var index = -1;
						if (lqpay.length > 0) {
							for (var x = 0; x < lqpay.length; x++) {
								if (lqpay[x].matchKey == match.matchKey) {
									index = x;
								}
							}
							if (index == -1) {

								lqpay.push(obj)
							} else {


								lqpay[index] = obj;
							}
						} else {

							lqpay.push(obj);
						}
					} else {
						for (var n = 0; n < lqpay.length; n++) {
							if (lqpay[n].matchKey == match.matchKey) {
								lqpay.splice(n, 1)
							}
						}
					}
					var lengths = lqpay.length;
					setSession("passTypes", ["P2_1"]);
					var passTypesnum = [2];
					setSession("passTypesnum", passTypesnum);
					if (lengths > 8) {
						toastMsg("最多只能选择8场比赛！")
					}
					setSession('arr', lqpay);
					setSession('matchDate', matchDate);
					phoneLQ.$emit('lengths', lengths);
				}
				console.log(JSON.stringify(this.lqpay));


			},
			confirmChoice: function(key) {
				var cindex = this.cindex;
				var rindex = this.rindex;
				this.PopupArr[key] = false;
				this.RQSPFlist[cindex].matchList[rindex].sfcchooseQr = JSON.parse(JSON.stringify(this.sfcchoose));
				this.RQSPFlist[cindex].matchList[rindex].sfcchoosesp = JSON.parse(JSON.stringify(this.sfcchoosesp));
				console.log(this.RQSPFlist[cindex].matchList[rindex].sfcchooseQr);
				var lqpaychooseType = this.RQSPFlist[cindex].matchList[rindex].chooseType4;


				// console.log(JSON.stringify(this.RQSPFlist[cindex].matchList[rindex]));

				var lqpay = this.lqpay;
				var obj = toString(cindex) + toString(rindex);
				var obj = new Object();
				var match = this.RQSPFlist[cindex].matchList[rindex];
				var matchDate = this.RQSPFlist[cindex].matchDate;
				var chooseType = false;
				var chooseType1=false;
				var chooseType2=false;
				var chooseType3=false;
				if(match.chooseType4){
				for (var i = 0; i < match.chooseType4.length; i++) {
					if (match.chooseType4[i]) {
						chooseType = true;
					}
				}
				}
				if(match.chooseType1){
				for (var i = 0; i < match.chooseType1.length; i++) {
					if (match.chooseType1[i]) {
						chooseType1 = true;
					}
				}
				}
				if(match.chooseType2){
				for (var i = 0; i < match.chooseType2.length; i++) {
					if (match.chooseType2[i]) {
						chooseType2 = true;
					}
				}
				}
				if(match.chooseType3){
				for (var i = 0; i < match.chooseType3.length; i++) {
					if (match.chooseType3[i]) {
						chooseType3 = true;
					}
				}
				}
				if (chooseType) {
					obj['weekStr'] = match.weekStr;
					obj['lineId'] = match.lineId;
					obj['matchKey'] = match.matchKey;
					obj['gameName'] = match.gameName;
					obj['stopBuyTime'] = match.stopBuyTime;
					obj['homeTeamName'] = match.homeTeamName;
					obj['guestTeamName'] = match.guestTeamName;
					obj['handicap'] = match.handicap;
					obj['singleTotalScore'] = match.singleTotalScore;
					obj['singleHandicap'] = match.singleHandicap;
					obj['typelx'] = 'SFC';
					obj['type4'] = match.type4;
					obj['hhggsp4'] = match.hhggsp4;
					obj['chooseType4'] = match.chooseType4;
					obj['periodId'] = match.periodId;
					obj['dan'] = false;
					var index = -1;
					if (lqpay.length > 0) {
						for (var x = 0; x < lqpay.length; x++) {
							if (lqpay[x].matchKey == match.matchKey) {
								index = x;
							}
						}
						if (index == -1) {
							lqpay.push(obj)
							this.RQSPFlist[cindex].matchList[rindex].genduo = true;

						} else {
							lqpay[index] = obj;
							this.RQSPFlist[cindex].matchList[rindex].genduo = true;
						}
					} else {

						lqpay.push(obj);
						this.RQSPFlist[cindex].matchList[rindex].genduo = true;

					}
				} else {
					for (var n = 0; n < lqpay.length; n++) {
						if (lqpay[n].matchKey == match.matchKey) {
							if(chooseType1||chooseType2||chooseType3){
								
							}else{
								lqpay.splice(n, 1)
							}
							
							this.RQSPFlist[cindex].matchList[rindex].genduo = false;
						}
					}
				}


				setSession('arr', lqpay);
				if (this.navPlay == 'DGGP' || this.navPlay == 'SFC') {
					var passTypes = ["P1"];
					var passTypesnum = ['DGGP'];
				} else {
					var passTypes = ["P2_1"];
					var passTypesnum = [2];
				}

				setSession("passTypesnum", passTypesnum);

				setSession("passTypes", passTypes);
				var lengths = lqpay.length;
				if (lengths > 8) {
					toastMsg("最多只能选择9场比赛！")
				}

				phoneLQ.$emit('lengths', lengths);
				 let dom = document.querySelector('.banqc_cont');
				let bottomDomInitial = window.getComputedStyle(dom).height.replace('px', '') * 1 * -1;
				animation(dom, 'bottom', bottomDomInitial)

			},
				othersPlay:function(){
				sessionStorage.removeItem('shaixuan')
				sessionStorage.removeItem('arr');
				sessionStorage.removeItem('passTypes');
				sessionStorage.removeItem('passTypesnum');
				sessionStorage.removeItem('playTypeName');
				sessionStorage.removeItem('play');
				sessionStorage.removeItem('matchDate');
				this.$router.go(-1); //根据浏览器记录返回上一次
			},
			getMatchList: function() {
				var data = [];
				var playType = "HHGG";
				data["playType"] = playType;
				var datas = this.Qs.stringify({
					path: "jc/jclq",
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getMatches',
						datas
					)
					.then(res => {
						var content = JSON.parse(res.data.content);
						if (res.data.status == 200) {
							if (content.code == 100000) {
								var matches = content.data;
								// 获取筛选列表
								if (matches.length ==0) {
									this.nomatches=true;
									 Indicator.close();
									return
								}
								var arrmata = [];
								for (var n = 0; n < matches.length; n++) {
									arrmata.push(true);
								}
								this.showListarr = arrmata;
								var arr = [],
									objects = [],
									sxcc = 0;
								for (var i = 0; i < matches.length; i++) {
									for (var n = 0; n < matches[i].matchList.length; n++) {
										var matchList = matches[i].matchList[n];
										if (arr.indexOf(matchList.gameName) < 0) {
											arr.push(matchList.gameName);
											var object = new Object;
											var key = 'name',
												key1 = 'state';
											object[key] = matchList.gameName;
											object[key1] = true;
											objects.push(object);
										}
									}
									sxcc += n;

								}
								this.sxcc = sxcc;
								phoneLQ.$emit('sxcc', this.sxcc);
								if (!getSession('shaixuan')) {
									setSession('shaixuan', arr)
									phoneLQ.$emit('saixunList', objects);
								}
								console.log(this.sxlist.length);

								if (this.sxlist.length > 0) {

								} else {
									this.sxlist = objects;
									this.sxlistdata = JSON.parse(JSON.stringify(objects));
								}
								this.getsp("RFSF", matches, 1);

							}
						} else if (res.data.status == 500) {
                               this.nomatches=true;
							  Indicator.close();
							Toast('服务器异常，请稍后重试！')
						}

					})
					.catch(err => {
						Indicator.close();
                         this.nomatches=true;
						Toast('服务器异常，请稍后重试！')
					})
			},
			getsp: function(playType, matches, num) {
				var data = [];
				data["playType"] = playType;
				var datas = this.Qs.stringify({
					path: "jc/jclq",
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getMatchSPs',
						datas
					)
					.then(res => {
						var content = JSON.parse(res.data.content);
						if (res.data.status == 200) {
							if (content.code == 100000) {
								var matchSPs = content.data;
								// 获取筛选列表
								if (num == 1) {
									matches = this.datalists(matches, matchSPs, 1); //classify   单关 混合过关 需另传一次做分别
									this.getsp('SF', matches, 2);
								} else if (num == 2) {
									matches = this.datalists(matches, matchSPs, 2);
									this.getsp('DXF', matches, 3);
								} else if (num == 3) {
									matches = this.datalists(matches, matchSPs, 3);
									this.getsp('SFC', matches, 4, );
								} else if (num == 4) {
									matches = this.datalists(matches, matchSPs, 4);
								}

							}
						} else if (res.data.status == 500) {

							Toast('服务器异常，请稍后重试！')
						}
					})
					.catch(err => {
						Indicator.close();

						console.log(err);
					})
			},
			datalists: function(matches, matchSPs, num) {

				for (var i = 0; i < matches.length; i++) {
					var newlist = matches[i].matchList;
					for (var m = 0; m < newlist.length; m++) {
						var matchekey = newlist[m].matchKey;
						for (var n = 0; n < matchSPs.length; n++) {
							if (matchekey == matchSPs[n].matchKey) {
								var hhggsp = JSON.parse(matchSPs[n].content).sp;
								for (var sr = 0; sr < hhggsp.length; sr++) {
                               if (hhggsp[sr]*1==0) {
                                hhggsp[sr]='--';
                             }
                            }
								var key0 = 'hhggsp' + num; //赔率
								var key3 = 'chooseType' + num; //选中控制
								var key4 = 'type' + num; //添加标题

								var key1 = 'chooseBet' + num; /*获取所需赔率的传值*/
								var key2 = 'choosetitel' + num; /*获取所需赔率的标题传值*/
								if (num == 1) {
									matches[i].matchList[m][key4] = ['主胜', '客胜'];
								} else if (num == 2) {
									matches[i].matchList[m][key4] = ['胜', '负'];
								} else if (num == 3) {
									matches[i].matchList[m][key4] = ['大分', '小分'];
								} else if (num == 4) {
									matches[i].matchList[m]['sfcchoosesp'] = []; /*获取所需赔率的传值*/
									matches[i].matchList[m]['sfcchooseQr'] = [];
									matches[i].matchList[m][key4] = ['客1-5', '客6-10', '客11-15', '客16-20', '客21-25', '客26+', '主1-5', '主6-10',
										'主11-15', '主16-20', '主21-25', '主26+'
									];
								}
								matches[i].matchList[m]['genduo'] = false;
								matches[i].matchList[m][key0] = hhggsp; /*赔率数据*/
								matches[i].matchList[m][key1] = [];
								matches[i].matchList[m][key2] = [];
								var chooseTypes = [];
								for (var a = 0; a < hhggsp.length; a++) {
									chooseTypes.push(false);
								}
								matches[i].matchList[m][key3] = chooseTypes; /*选中状态 初始皆为未选中*/
							}
						}
					}
				}
				if (num !== 4) {

					return matches;
				} else {
					this.RQSPFlist = matches;
					Indicator.close();
					this.matchListdata = JSON.parse(JSON.stringify(matches));
					var addarr = getSession('arr');
					if (addarr) {
						this.lqpay = addarr;
						phoneLQ.$emit('lengths', addarr.length);
						let matches = this.RQSPFlist;
						for (let x = 0; x < matches.length; x++) {
							for (let y = 0; y < matches[x].matchList.length; y++) {
								for (let i = 0; i < addarr.length; i++) {
									if (matches[x].matchList[y].matchKey == addarr[i].matchKey) {
										if (addarr[i].typelx == 'RFSF') {
											matches[x].matchList[y].chooseType1 = addarr[i].chooseType1;
										} else if (addarr[i].typelx == 'SF') {
											matches[x].matchList[y].chooseType2 = addarr[i].chooseType2;
										} else if (addarr[i].typelx == 'DXF') {
											matches[x].matchList[y].chooseType3 = addarr[i].chooseType3;
										} else if (addarr[i].typelx == 'SFC') {
											matches[x].matchList[y].chooseType4 = addarr[i].chooseType4;
											matches[x].matchList[y].genduo = true;
										}
										matches[x].matchList[y].dan = false;
										addarr[i].dan = false;

									}
								}
							}
						}
					}
					console.log(JSON.stringify(this.RQSPFlist));

				}


			},
			showList: function(i) {
				this.$set(this.showListarr, i, !this.showListarr[i])

			},
		}
	}
</script>

<style scoped>
	@import "../../../css/goucai_jjc.css";

	.jjc_bqc_cont .con .battle_shel .tzxx[data-v-56bae5a7] {
		text-align: center;
		background: #FFFFFF;
		border: 1px solid #F0F0F0;
		line-height: 1.4rem;
		font-size: 0.65rem;
		color: #4A4A4A;
	}
	.aui-refresh-content{
		min-height: 100vh;
	}
</style>
