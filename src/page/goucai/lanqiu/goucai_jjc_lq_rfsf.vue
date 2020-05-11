<template>

	<div>
		<section class="aui-refresh-content">
			<div class="aui-content">
				<div class="rangfsf_fm main">
					<template v-for="(item, cindex) in RQSPFlist">
						<div class="countime" :id="'jjc_rfsfTime' + cindex" @click="showList(cindex)" data-state="open">
							<div class="date_fleft">{{item.matchDate|GetTimeStr(1)}}<span>共有<i>{{item.matchList|getLength()}}</i>场比赛可投</span></div>
							<div class="fright"><i class="aui-iconfont " :class="showListarr[cindex]?'aui-icon-top':'aui-icon-down'"></i></div>
						</div>

						<div class="jjc_sc_cont jjc_rxjc_cont jjc_rfsf_cont" v-show="showListarr[cindex]">
							<div v-for="(thal, rindex) in item.matchList" class="con" v-if="$options.filters.gamesShow(thal.gameName)">
								<div class="flr titl">
									<p class="p1"><span class="sq_icon" :style="{background:thal.gameColor}"></span><span>{{thal.gameName}}</span></p>
									<p>{{thal.stopBuyTime|GetTimeStr(2)}} {{thal.lineId}}</p>
									<p>{{thal.stopBuyTime|GetTimeStr(3)}}截止</p>
								</div>
								<div class="fgr battle">
									<div class="battle_shel">
										<ul>
											<li :class="{'el-yellow': thal.soddsType}" @click="selectJJC_erxy(cindex,rindex,'soddsType','thal.id')"><span>{{thal.guestTeamName}}</span><br /><span>客胜{{thal.sodds}}</span></li>
											<li v-if="thal.singleHandicap>0" class="">主+{{thal.singleHandicap}}</li>
											<li v-else class="green">主{{thal.singleHandicap}}</li>
											<!-- <li  :class="[thal.singleHandicap>0 ? '' : 'green']">主+{{thal.singleHandicap}}</li> -->

											<li :class="{'el-yellow': thal.foddsType}" @click="selectJJC_erxy(cindex,rindex,'foddsType','thal.id')"><span>{{thal.homeTeamName}}</span><br /><span>主胜{{thal.fodds}}</span></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</template>
				</div>
				<lini-page :tpyes="'event'" :zheight='"85vh"' :zwidth='"100%"' :prompt='"该玩法暂无赛事"' :goText='"去其他玩法看看"' @tonewpage='othersPlay'
				 v-if='nomatches'></lini-page>
				<!-- <div class="goucai_quesheng" v-if='nomatches'>
			<div class="ques_cont">
				<img src="../../../assets/goucai/jjc/no_sais.png" />
				<p class="p1">该玩法暂无赛事</p>
				<p class="p2" @click="othersPlay">去其他玩法看看</p>
			</div>
		</div> -->
			</div>
		</section>
	</div>
</template>

<script>
	import {
		phoneLQ
	} from "../../../js/connector.js";
	import {
		getSession,
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
				nomatches: false,
				RQSPFlist: [],
				lqpay: [],
				sxlist: [], //赛选数组
				sxlistdata: [],
				sxcc: [], //赛选的场次.
				showListarr: [],
				matchListdata: [],
				topStatus: '',
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
			getLength: function(matchList) {
				let shaixuan = getSession('shaixuan');
				if (!shaixuan) {
					shaixuan = [];
				}
				var shaixuanLength = shaixuan.length;
				var matchListLength = matchList.length;
				var leng = 0;
				for (var i = 0; i < shaixuanLength; i++) {
					for (var n = 0; n < matchListLength; n++) {
						if (shaixuan[i] == matchList[n].gameName) {
							leng++
						}
					}
				}
				return leng;
			}
		},
		methods: {
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
			selectJJC_erxy: function(cindex, rindex, key) {
                 if (this.RQSPFlist[cindex].matchList[rindex].sodds=='--') {
                     Toast('不能选择暂无赔率的赛事。')
                     return false;
                   }
                   if (this.RQSPFlist[cindex].matchList[rindex].fodds=='--') {
                     Toast('不能选择暂无赔率的赛事。')
                     return false;
                   }
				if (this.RQSPFlist[cindex].matchList[rindex][key]) {
					this.RQSPFlist[cindex].matchList[rindex][key] = false
				} else {
					this.RQSPFlist[cindex].matchList[rindex][key] = true
				}
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

				if (match.soddsType == true || match.foddsType == true) {
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
					obj['periodId'] = match.periodId;
					obj['sodds'] = match.sodds;
					obj['fodds'] = match.fodds;
					obj['soddsType'] = match.soddsType;
					obj['foddsType'] = match.foddsType;
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
				};

				setSession('arr', this.lqpay);
				setSession('matchDate', matchDate);
				var lengths = lqpay.length;
				setSession("passTypes", ["P2_1"]);
				var passTypesnum = [2];
				setSession("passTypesnum", passTypesnum);
				if (lengths > 8) {
					Toast("最多只能选择8场比赛！")
				}
				phoneLQ.$emit('lengths', lengths);
				console.log(JSON.stringify(this.lqpay));

			},
			getMatchList: function() {
				var data = [];
				var playType = "RFSF";
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
									this.nomatches = true;
									Indicator.close();
									return
								}
								if(matches.length == 1) {
									
									if(getSession('mataces')){
									
									}else{
									    setSession('mataces','ss');
										phoneLQ.$emit('mataleng', );
										
									}
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
									setSession('shaixuan', arr);
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
							this.nomatches = true;
							Indicator.close();
							Toast('服务器异常，请稍后重试！')
						}

					})
					.catch(err => {
						Indicator.close();

						console.log(err);
					})
			},
			getsp: function(playType, matches) {
				var data = [];
				data["playType"] = "RFSF";
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
								// 胜负
								var key0 = 'sodds'; //胜赔率
								var key1 = 'fodds'; //负赔率
								var key2 = 'soddsType'; //胜选中控制
								var key3 = 'foddsType'; //负选中控制
								if (JSON.parse(matchSPs[n].content).sp[0] == "0.00") {
									matches[i].matchList[m][key0] = '--';
								} else {
									matches[i].matchList[m][key0] = JSON.parse(matchSPs[n].content).sp[0];
								}
								if (JSON.parse(matchSPs[n].content).sp[1] == "0.00") {
									matches[i].matchList[m][key1] = '--';
								} else {
									matches[i].matchList[m][key1] = JSON.parse(matchSPs[n].content).sp[1];
								}
								// matches[i].matchList[m][key0] = JSON.parse(matchSPs[n].content).sp[0];
								// matches[i].matchList[m][key1] = JSON.parse(matchSPs[n].content).sp[1];
								matches[i].matchList[m][key2] = false; /*初始皆为未选中*/
								matches[i].matchList[m][key3] = false;
							}
						}
					}
				}
				this.RQSPFlist = matches;
				Indicator.close();
				this.matchListdata = JSON.parse(JSON.stringify(matches));
				var addarr = getSession('arr');
				if (addarr) {
					console.log(addarr.length);
					this.lqpay = addarr;
					phoneLQ.$emit('lengths', addarr.length);
					let matches = this.RQSPFlist;
					for (let x = 0; x < matches.length; x++) {
						for (let y = 0; y < matches[x].matchList.length; y++) {
							for (let i = 0; i < addarr.length; i++) {
								if (matches[x].matchList[y].matchKey == addarr[i].matchKey) {
									matches[x].matchList[y].soddsType = addarr[i].soddsType;
									matches[x].matchList[y].foddsType = addarr[i].foddsType;
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

	.aui-refresh-content {
		min-height: 100vh;
	}
</style>
