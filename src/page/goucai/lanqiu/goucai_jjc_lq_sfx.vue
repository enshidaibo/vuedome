<template>

	<div>
		<section class="aui-refresh-content">
			<div class="aui-content">
		  <!-- 胜分差 -->
        <div  class="shengfc_fm main">
            <template v-for="(item, cindex) in RQSPFlist">
        <div class="countime" :id="'jjc_sfcTime' + cindex" @click="showList(cindex)" data-state="open">
            <div class="date_fleft">{{item.matchDate|GetTimeStr(1)}}<span>共有<i>{{item.matchList|getLength()}}</i>场比赛可投</span></div>
            <div class="fright"><i class="aui-iconfont " :class="showListarr[cindex]?'aui-icon-top':'aui-icon-down'"></i></div>
        </div>

      <div class="jjc_sc_cont jjc_bqc_cont jjc_bf_cont jjc_sfcl_cont"  v-show="showListarr[cindex]">
          <div v-for="(thal, rindex) in item.matchList" class="con" v-if="$options.filters.gamesShow(thal.gameName)">
              <div class="flr titl">
                <p class="p1"><span class="sq_icon" :style="{background:thal.gameColor}"></span><span>{{thal.gameName}}</span></p>
                <p>{{thal.stopBuyTime|GetTimeStr(2)}} {{thal.lineId}}</p>
                <p>{{thal.stopBuyTime|GetTimeStr(3)}}截止</p>
              </div>
              <div class="fgr battle" >
                <div class="battle_name"><span><i>(客) </i>{{thal.guestTeamName}}  </span><span>vs</span><span> {{thal.homeTeamName}}<i> (主)</i></span></div>
                <div class="battle_shel">
                  <div v-if='thal.sfcchooseQr&&thal.sfcchooseQr.length' class="tzxx" @click="showPopup('Popupsfc',cindex,rindex)"><span  v-for="(sfc, sindex) in thal.sfcchooseQr">{{sfc}}</span></div>
                  <div v-else class="tzxx" @click="showPopup('Popupsfc',cindex,rindex)">点击展开投注选项</div>
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
		<div v-if="PopupArr.Popupsfc" class="mask bifen" v-cloak @touchmove.prevent>
			</div>
		    <div class="banqc_cont bifen_cont shengfc_cont" @touchmove.prevent>
				<div v-if="PopupArr.Popupsfc">
		        <div class="title"><span><i>(客) </i>{{sfc.guestTeamName}}</span><span> vs </span><span>{{sfc.homeTeamName}}<i> (主)</i></span></div>
		        <div class="con">
		            <table>
		                <tr>
		                    <td rowspan='2' class="td1">客胜</td>
		                    <td :class="{ 'el-yellow':sfc.chooseType[0]  }" @click="PopupJJC_sfc(cindex,rindex,'0','客1-5',sfc.erXY[0])"><span>1-5</span><span>{{sfc.erXY[0]}}</span></td>
		                    <td :class="{ 'el-yellow': sfc.chooseType[1] }" @click="PopupJJC_sfc(cindex,rindex,'1','客6-10',sfc.erXY[1])"><span>6-10</span><span>{{sfc.erXY[1]}}</span></td>
		                    <td :class="{ 'el-yellow': sfc.chooseType[2] }" @click="PopupJJC_sfc(cindex,rindex,'2','客11-15',sfc.erXY[2])"><span>11-15</span><span>{{sfc.erXY[2]}}</span></td>
		                </tr>
		                <tr>
		                    <td :class="{ 'el-yellow': sfc.chooseType[3] }" @click="PopupJJC_sfc(cindex,rindex,'3','客16-20',sfc.erXY[3])"><span>16-20</span><span>{{sfc.erXY[3]}}</span></td>
		                    <td :class="{ 'el-yellow': sfc.chooseType[4] }" @click="PopupJJC_sfc(cindex,rindex,'4','客21-25',sfc.erXY[4])"><span>21-25</span><span>{{sfc.erXY[4]}}</span></td>
		                    <td :class="{ 'el-yellow':sfc.chooseType[5] }" @click="PopupJJC_sfc(cindex,rindex,'5','客26+',sfc.erXY[5])"><span>26+</span><span>{{sfc.erXY[5]}}</span></td>
		
		
		                </tr>
		                <tr>
							<td rowspan='2' class="td2">主胜</td>
		                    <td :class="{ 'el-yellow': sfc.chooseType[6] }" @click="PopupJJC_sfc(cindex,rindex,'6','主1-5',sfc.erXY[6])"><span>1-5</span><span>{{sfc.erXY[6]}}</span></td>
		                    <td :class="{ 'el-yellow': sfc.chooseType[7] }" @click="PopupJJC_sfc(cindex,rindex,'7','主6-10',sfc.erXY[7])"><span>6-10</span><span>{{sfc.erXY[7]}}</span></td>
		                    <td :class="{ 'el-yellow': sfc.chooseType[8] }" @click="PopupJJC_sfc(cindex,rindex,'8','主11-15',sfc.erXY[8])"><span>11-15</span><span>{{sfc.erXY[8]}}</span></td>
		
		                </tr>
		                <tr>
		                    <td :class="{ 'el-yellow': sfc.chooseType[9]}" @click="PopupJJC_sfc(cindex,rindex,'9','主16-20',sfc.erXY[9])"><span>16-20</span><span>{{sfc.erXY[9]}}</span></td>
		                    <td :class="{ 'el-yellow': sfc.chooseType[10] }" @click="PopupJJC_sfc(cindex,rindex,'10','主21-25',sfc.erXY[10])"><span>21-25</span><span>{{sfc.erXY[10]}}</span></td>
		                    <td :class="{ 'el-yellow': sfc.chooseType[11] }" @click="PopupJJC_sfc(cindex,rindex,'11','主26+',sfc.erXY[11])"><span>26+</span><span>{{sfc.erXY[11]}}</span></td>
		
		                </tr>
		            </table>
		        </div>
		        <div class="foot">
		            <div @click="hidePopup('Popupsfc')">取消</div>
		            <div @click="confirmChoice('Popupsfc')">确定</div>
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
		Get0pad,
		animation,
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
		methods: {
		
			    showPopup: function(key, cindex, rindex) {
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
                this.sfcchoose_qx = JSON.parse(JSON.stringify(this.sfc.chooseType));
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
			PopupJJC_sfc: function(cindex, rindex, idx, text, sp) {
			 console.log(JSON.stringify(this.sfc));
			   if (sp=="--") {
                Toast('不能选择暂无赔率的赛事。')
                return false;
              }
				if (this.sfc.chooseType[idx]) {
				
					 this.$set(this.sfc.chooseType, idx, false);
					var index = this.sfcchoose.indexOf(text);
					if (index > -1) {
						this.sfcchoose.splice(index, 1);
						this.sfcchoosesp.splice(index, 1);
					}
				} else {
					
					 this.$set(this.sfc.chooseType, idx, true);
					this.sfcchoose.push(text);
					this.sfcchoosesp.push(sp);
				}
				console.log(JSON.stringify(this.sfcchoose));
			
			},
			confirmChoice: function(key) {
				var cindex = this.cindex;
				var rindex = this.rindex;
				this.PopupArr[key] = false;
				this.RQSPFlist[cindex].matchList[rindex].sfcchooseQr = JSON.parse(JSON.stringify(this.sfcchoose));
				this.RQSPFlist[cindex].matchList[rindex].sfcchoosesp = JSON.parse(JSON.stringify(this.sfcchoosesp));
				console.log(this.RQSPFlist[cindex].matchList[rindex].sfcchooseQr);
				var lqpaychooseType = this.RQSPFlist[cindex].matchList[rindex].chooseType4;
					var lqpay = this.lqpay;
					var obj = toString(cindex) + toString(rindex);
					var obj = new Object();
					var match = this.RQSPFlist[cindex].matchList[rindex];
					var matchDate = this.RQSPFlist[cindex].matchDate;
			
					if (match.sfcchooseQr.length > 0) {
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
						obj['sfcchooseQr'] = match.sfcchooseQr;
						obj['sfcchoosesp'] = match.sfcchoosesp;
						obj['chooseType'] = match.chooseType;
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
				 
				setSession('arr', lqpay);
				setSession('matchDate',matchDate);
				
					var passTypes = ["P1"];
					var passTypesnum = ['DGGP'];
				
			
				setSession("passTypesnum", passTypesnum);
			
				setSession("passTypes", passTypes);
				var lengths = lqpay.length;
				if (lengths > 8) {
					Toast("最多只能选择9场比赛！")
				}
				phoneLQ.$emit('lengths', lengths);
				let dom = document.querySelector('.banqc_cont');
				let bottomDomInitial = window.getComputedStyle(dom).height.replace('px', '') * 1 * -1;
				animation(dom, 'bottom', bottomDomInitial)
			
			},
			getMatchList: function() {
				var data = [];
				var playType = "SFC";
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
								if (matches.length == 0) {
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
								this.getsp(playType, matches);

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
						console.log(err);
					})
			},
			getsp: function(playType, matches) {
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
								this.datalists(matches, matchSPs);
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
			datalists: function(matches, matchSPs) {

				for (var i = 0; i < matches.length; i++) {
					var newlist = matches[i].matchList;
					for (var m = 0; m < newlist.length; m++) {
						var matchekey = newlist[m].matchKey;
						for (var n = 0; n < matchSPs.length; n++) {
							if (matchekey == matchSPs[n].matchKey) {
								var key0 = 'erXY'; //赔率
								var key1 = 'sfcchoosesp'; //选中的赔率
								var key2 = 'sfcchooseQr'; //选中的标题
								var key3 = 'chooseType'; //选中控制

								var bfBets = JSON.parse(matchSPs[n].content).sp
								for (var sr = 0; sr < bfBets.length; sr++) {
                                if (bfBets[sr]*1==0) {
                               bfBets[sr]='--';
                               }
                            }
								matches[i].matchList[m][key0] = bfBets; /*赔率数据*/
								var chooseTypes = [];
								var sfcchoosesp = [];
								var sfcchooseQr = [];
								for (var a = 0; a < bfBets.length; a++) {
									chooseTypes.push(false);
								}
								matches[i].matchList[m][key1] = sfcchoosesp; /*获取所需赔率的传值*/
								matches[i].matchList[m][key2] = sfcchooseQr; /*获取所需赔率的标题传值*/
								matches[i].matchList[m][key3] = chooseTypes; /*选中状态 初始皆为未选中*/
							}
						}
					}
				}
				this.RQSPFlist = matches;
				Indicator.close();
				this.matchListdata = JSON.parse(JSON.stringify(matches));
				var addarr=getSession('arr');
				if(addarr){
					console.log(addarr.length);
					 this.lqpay=addarr;
				   phoneLQ.$emit('lengths', addarr.length);
					let matches = this.RQSPFlist;
					for (let x = 0; x < matches.length; x++) {
						for (let y = 0; y < matches[x].matchList.length; y++) {
							for (let i = 0; i < addarr.length; i++) {
								  if (matches[x].matchList[y].matchKey == addarr[i].matchKey) {
									    matches[x].matchList[y].chooseType = addarr[i].chooseType;
                                    matches[x].matchList[y].sfcchooseQr = addarr[i].sfcchooseQr;
                                    addarr[i].dan = false;
						
								
								}
							}
						}
					}
					
					}
				console.log(JSON.stringify(matches));
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
