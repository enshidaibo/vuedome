<template>
	<div>
		<section class="aui-refresh-content">
			<div class="aui-content">
				<div class="main">
					<!-- 一场制胜 -->
					<div class="jjc_sc_cont jjc_hhgg_cont jjc_yczs_cont">
						<template v-for="(item, cindex) in matches">
							<div class="countime" @click="showList(cindex)" data-state="open" tapmode>
								<div class="date_fleft">{{item.matchDate|capitalize()}}<span>共<i>{{item.matchList|getLength()}}</i>场比赛可投</span></div>
								<div class="fright"><i class="aui-iconfont " :class="days[cindex]?'aui-icon-top':'aui-icon-down'"></i></div>
							</div>
							<div v-show="days[cindex]">
								<div v-for="(thal,rindex) in item.matchList" :key='rindex' class="con" v-if="$options.filters.gamesShow(thal.gameName)">
									<div class="flr titl">
										<p class="p1"><span class="sq_icon" :style="{background:thal.gameColor}"></span><span>{{ thal.gameName }}</span></p>
										<p>{{ thal.weekStr }} {{ thal.lineId|AddZeorpad(3)}}</p>
										<p>{{thal.stopBuyTime|capitalize(2)}}截止</p>
									</div>
									<div class="fgr battle">
										<div class="battle_name"><span>{{ thal.homeTeamName }} </span><span>vs</span><span>{{ thal.guestTeamName }}</span></div>
										<div class="battle_shel">
											<table>
												<tr>
													<td>0</td>
													<td :class="{'el-yellow': thal.soddsType}" @click="selectJJC_yczs(cindex,rindex,'soddsType','spf',thal.sodds)">胜
														<span>{{ thal.sodds }}</span></td>
													<td :class="{'el-yellow': thal.poddsType}" @click="selectJJC_yczs(cindex,rindex,'poddsType','spf',thal.podds)">平
														<span>{{ thal.podds }}</span></td>
													<td :class="{'el-yellow': thal.foddsType}" @click="selectJJC_yczs(cindex,rindex,'foddsType','spf',thal.fodds)">负
														<span>{{ thal.fodds }}</span></td>
												</tr>
												<tr>
													<td v-if='thal.handicap>0' class="c-red">主<br />+{{thal.handicap}}</td>
													<td v-else-if='thal.handicap==0' class="c-hui">主<br />{{thal.handicap}}</td>
													<td v-else>主<br />{{thal.handicap}}</td>
													<td :class="{'el-yellow': thal.soddsTypeY}" @click="selectJJC_yczs(cindex,rindex,'soddsTypeY','rqspf',thal.soddsY)">胜
														<span>{{thal.soddsY}}</span></td>
													<td :class="{'el-yellow': thal.poddsTypeY}" @click="selectJJC_yczs(cindex,rindex,'poddsTypeY','rqspf',thal.poddsY)">平
														<span>{{thal.poddsY}}</span></td>
													<td :class="{'el-yellow': thal.foddsTypeY}" @click="selectJJC_yczs(cindex,rindex,'foddsTypeY','rqspf',thal.foddsY)">负
														<span>{{thal.foddsY}}</span></td>
												</tr>
											</table>
										</div>
									</div>
								</div>
							</div>
						</template>
					</div>
					<div class="mask" id="mask" style="display: none; width: 100%; height: 100vh;"></div>
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
		getSession,
		setSession
	} from '../../../js/common.js';
	import {
		phone
	} from "../../../js/connector.js";
	import {
		Toast,
		Indicator
	} from 'mint-ui';
	// import { requestInterceptors, responseInterceptors } from '../../../main.js'
	export default {
		data() {
			return {
				matches: '', //数据
				shaixuanmatches: '',
				add: 0,
				days: [],
				saixunList: [],
				keDianJi: false,
				topStatus: '',
				nomatches: false,
				byValueRqspf: [], //让球胜平负 比分 半全场 一场制胜 胜平负 进球数 二选一 传值数组
				pbyValueRqspf: [], //一场制胜匹配场次传值数组
			};
		},
		created() {
			// 			this.$ajax.interceptors.request.eject(requestInterceptors);
			// 			this.$ajax.interceptors.response.eject(responseInterceptors);
			let playType = this.$route.query.play;
			console.log(playType);
			if (getSession(playType)) {
					this.matches = getSession(playType);
					// this.keDianJi=true;
					this.getMatches(playType);
				}else{
					Indicator.open();
					this.getMatches(playType);
				}
		},
		mounted() {
			phone.$on('delete', (val) => {
				if (val) {
					sessionStorage.removeItem('arr')
					sessionStorage.removeItem('parr');
					Indicator.open();
					this.getMatches('YCZS');
					this.recover();
				}
			})

			var that = this;
			var pullToRefreshs = new auiPullToRefresh({ //下拉刷新
				container: document.querySelector('.aui-refresh-content'), //下拉容器
				triggerDistance: 80 //下拉高度
			}, function(ret) {
				if (ret.status == "success") {
					that.$ajax.defaults.timeout = 49527; //49527这个值控制没有showLonding
					that.getMatches('YCZS');
					setTimeout(() => {
						that.$ajax.defaults.timeout = 50000;
						pullToRefreshs.cancelLoading(); //刷新成功后调用此方法隐藏
					}, 1500)
				}
			});
		},
		beforeDestroy() {
			this.$ajax.defaults.timeout = 50000;
		},

		methods: {

			showList: function(i) {
				this.$set(this.days, i, !this.days[i])
				console.log(this.days[i]);
			},
			recover: function() {
				this.matches = JSON.parse(JSON.stringify(this.shaixuanmatches));
			},
			getMatches: function(playType) { //赛事获取
				console.log(playType);
				if (!playType) {
					playType = 'RQSPF'
				}
				let data = [];
				data["playType"] = playType;

				let dataes = this.Qs.stringify({
					"path": "jc/jczq",
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getMatches',
						dataes
					)
					.then(ret => {
						if (ret.status == 500) {
							alert("服务器异常，请稍后重试");
						} else {
							let content = JSON.parse(ret.data.content)
							if (content.code == 100000) {
								//console.log(JSON.stringify(content.data));
								let matches = content.data;
								if (!getSession(playType)) {
									this.matches = matches;
								}
								let matchesLeng = matches.length;
								if (matchesLeng < 1) {
									Indicator.close();
									this.nomatches = true;
								}
								let daysArr = [];
								for (let i = 0; i < matchesLeng; i++) {
									daysArr.push(true);
								}
								this.days = daysArr;
								/* if (matches.length < 1) {
								     hideLoading();
								     $api.css($api.dom('.goucai_quesheng'), 'display:block');
								     return
								 } */
								var arr = [],
									objects = [],
									add = 0;
								for (var i = 0; i < matches.length; i++) {
									for (var n = 0; n < matches[i].matchList.length; n++) {
										var matchList = matches[i].matchList[n];
										if (arr.indexOf(matchList.gameName) < 0) {
											arr.push(matchList.gameName);
											var object = new Object;
											var key = 'name',
												key1 = 'state';
											object[key] = matchList.gameName;
											object[key1] = false;
											objects.push(object);
										}
									}
									add += n;
								}
								this.add = add;
								this.saixunList = objects;
								phone.$emit('saixunList', objects);
								phone.$emit('add', add);
								if (!getSession('shaixuan')) {
									setSession('shaixuan', arr)
								}
								if (playType == 'YCZS') {
									this.getMatchSPs('SPF', matches, 1, 'YCZS'); //1表示第一次调用  适用于一场制胜 单关 混合过关 使用
								} else if (playType == 'HHGG' || playType == 'DGGP') {
									this.getMatchSPs('SPF', matches, 1, 'HHGG'); //单关 混合过关 使用
								} else {
									this.getMatchSPs(playType, matches, -1, 'ordinary'); //ordinary表示一般的玩法  即非一场制胜 单关 混合过关
								};
							} else {
								alert('网络错误！');
							}
						}
					})
					.catch(err => {
						Indicator.close();
						this.nomatches = true;
						console.log(err);
					})
			},
			othersPlay: function() {
				this.$router.push({
					name: 'goucai'
				})
			},
			getMatchSPs: function(playType, matches, num, classify) { //赔率获取
				if (!playType) {
					playType = 'RQSPF'
				}
				let data = [];
				data["playType"] = playType;

				let dataes = this.Qs.stringify({
					"path": "jc/jczq",
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getMatchSPs',
						dataes
					)
					.then(ret => {
						if (ret.status == 500) {
							alert("服务器异常，请稍后重试");
						} else {
							let content = JSON.parse(ret.data.content)
							if (content.code == 100000) {
								// console.log(JSON.stringify(content.data));
								let matchSPs = content.data;
								if (num == 1 && classify == 'YCZS') {
									matches = this.datalists(matches, matchSPs, playType, 1, 'YCZS'); //classify  一场制胜 单关 混合过关 需另传一次做分别
									this.getMatchSPs('RQSPF', matches, 2, 'YCZS');
								} else if (num == 2 && classify == 'YCZS') {
									this.datalists(matches, matchSPs, playType, 2, 'YCZS');
								} else if (num == 1 && classify == 'HHGG') {
									matches = this.datalists(matches, matchSPs, playType, 1, 'HHGG'); //classify  一场制胜 单关 混合过关 需另传一次做分别
									this.getMatchSPs('RQSPF', matches, 2, 'HHGG');
								} else if (num == 2 && classify == 'HHGG') {
									matches = this.datalists(matches, matchSPs, playType, 2, 'HHGG');
									this.getMatchSPs('BQQ', matches, 3, 'HHGG');
								} else if (num == 3 && classify == 'HHGG') {
									matches = this.datalists(matches, matchSPs, playType, 3, 'HHGG');
									this.getMatchSPs('JQS', matches, 4, 'HHGG');
								} else if (num == 4 && classify == 'HHGG') {
									matches = this.datalists(matches, matchSPs, playType, 4, 'HHGG');
									this.getMatchSPs('BF', matches, 5, 'HHGG');
								} else if (num == 5 && classify == 'HHGG') {
									this.datalists(matches, matchSPs, playType, 5, 'HHGG');

								} else {
									this.datalists(matches, matchSPs, playType, num, classify); //classify  一场制胜 单关 混合过关 需另传一次做分别
								}

							} else {
								// hideLoading();
								alert('网络错误！');
							}
						}
					})
					.catch(err => {
						Indicator.close();
						console.log(err)
					})


			},
			/*赔率数据和赛事信息结合处理*/ //注  一场制胜 单关 混合过关 会多次调用获取赔率接口  所以有多次调用
			/*让球胜平负*/
			datalists: function(matches, matchSPs, playType, num, classify) {
				for (let i = 0; i < matches.length; i++) {

					let newlist = matches[i].matchList;
					for (let m = 0; m < newlist.length; m++) {

						let matchekey = newlist[m].matchKey;
						if (i == 0 && m == 0) { //一场制胜去付款排序
							matches[i].matchList[m]['paixu'] = 'a'
						} else if (i == 0 && m == 1) {
							matches[i].matchList[m]['paixu'] = 'b'
						} else {
							matches[i].matchList[m]['paixu'] = 'c'
						}
						let erXuanYiBet = []; //二选一赔率
						for (let n = 0; n < matchSPs.length; n++) {
							if (matchekey == matchSPs[n].matchKey) {
								if (classify == 'ordinary' && playType == 'JQS') { //进球数
									let goalBet = JSON.parse(matchSPs[n].content).sp;
									for (let j = 0; j < goalBet.length; j++) {
										let key = 'goalBet' + j;
										let ctype = 'ctype' + j;
										matches[i].matchList[m][key] = goalBet[j];
										matches[i].matchList[m][ctype] = false;
									}
								} else if (classify == 'ordinary' && playType == 'ERXY') { //二选一
									erXuanYiBet.push(JSON.parse(matchSPs[n].content).sp)
									if (erXuanYiBet.length > 1) {
										let key0 = 'erXY'; //赔率
										let key3 = 'soddsTypeY'; //选中控制
										let key4 = 'poddsTypeY'; //选中控制
										matches[i].matchList[m][key0] = erXuanYiBet; /*赔率数据*/
										matches[i].matchList[m][key3] = false; /*选中状态 初始皆为未选中*/
										matches[i].matchList[m][key4] = false;

									}
								} else if (classify == 'ordinary' && playType == 'BF' || classify == 'ordinary' && playType == 'BQQ') { //比分 半全场
									let key0 = 'erXY'; //赔率
									let key3 = 'chooseType'; //选中控制
									let key1 = 'chooseBet'; //空数组
									let bfBets = JSON.parse(matchSPs[n].content).sp;
									matches[i].matchList[m][key0] = bfBets; /*赔率数据*/
									matches[i].matchList[m][key1] = []; /*创建一个空数组将来存选中项*/
									let chooseTypes = [];
									for (let a = 0; a < bfBets.length; a++) {
										chooseTypes.push(false);
									}
									matches[i].matchList[m][key3] = chooseTypes; /*选中状态 初始皆为未选中*/

								} else if (classify == 'HHGG') {

									let hhBets = JSON.parse(matchSPs[n].content).sp;
									let key0 = 'betNum' + num; //赔率
									let key3 = 'chooseType' + num; //选中控制
									let key1 = 'chooseBet'; //空数组
									let key2 = 'moreType'
									if (num == 1) {
										matches[i].matchList[m]['betType1'] = ['胜', '平', '负']
									} else if (num == 2) {
										matches[i].matchList[m]['betType2'] = ['胜', '平', '负']
									} else if (num == 3) {
										matches[i].matchList[m]['betType3'] = ['胜-胜', '胜-平', '胜-负', '平-胜', '平-平', '平-负', '负-胜', '负-平', '负-负']
									} else if (num == 4) {
										matches[i].matchList[m]['betType4'] = ['0球', '1球', '2球', '3球', '4球', '5球', '6球', '7+球', ]
									} else if (num == 5) {
										matches[i].matchList[m]['betType5'] = ['1:0', '2:0', '2:1', '3:0', '3:1', '3:2', '4:0', '4:1', '4:2', '5:0',
											'5:1', '5:2', '胜其它', '0:0', '1:1', '2:2', '3:3', '平其它', '0:1', '0:2', '1:2', '0:3', '1:3', '2:3', '0:4',
											'1:4',
											'2:4', '0:5', '1:5', '2:5', '负其它'
										]
									}
									matches[i].matchList[m][key0] = hhBets; /*赔率数据*/
									matches[i].matchList[m][key1] = []; /*创建一个空数组将来存选中项*/
									matches[i].matchList[m][key2] = false; /*更多选项控制字段*/
									let chooseTypes = [];
									for (let a = 0; a < hhBets.length; a++) {
										chooseTypes.push(false);
									}
									matches[i].matchList[m][key3] = chooseTypes; /*选中状态 初始皆为未选中*/

								} else if (classify == 'YCZS' && num == 2) { //一场制胜第二次调用
									let key0 = 'soddsY'; //胜赔率
									let key1 = 'poddsY'; //平赔率
									let key2 = 'foddsY'; //负赔率
									let key3 = 'soddsTypeY'; //胜选中控制
									let key4 = 'poddsTypeY'; //平选中控制
									let key5 = 'foddsTypeY'; //负选中控制
									matches[i].matchList[m][key0] = JSON.parse(matchSPs[n].content).sp[0]; /*增加赔率数据*/
									matches[i].matchList[m][key1] = JSON.parse(matchSPs[n].content).sp[1];
									matches[i].matchList[m][key2] = JSON.parse(matchSPs[n].content).sp[2];
									matches[i].matchList[m][key3] = false; /*选中状态 初始皆为未选中*/
									matches[i].matchList[m][key4] = false;
									matches[i].matchList[m][key5] = false;
								} else { //让球胜平负 胜平负 一场制胜第一次调用
									let key0 = 'sodds'; //胜赔率
									let key1 = 'podds'; //平赔率
									let key2 = 'fodds'; //负赔率
									let key3 = 'soddsType'; //胜选中控制
									let key4 = 'poddsType'; //平选中控制
									let key5 = 'foddsType'; //负选中控制
									if (JSON.parse(matchSPs[n].content).sp[0] * 1 == 0) {
										matches[i].matchList[m][key0] = '--';
									} else {
										matches[i].matchList[m][key0] = JSON.parse(matchSPs[n].content).sp[0];
									}
									if (JSON.parse(matchSPs[n].content).sp[1] * 1 == 0) {
										matches[i].matchList[m][key1] = '--';
									} else {
										matches[i].matchList[m][key1] = JSON.parse(matchSPs[n].content).sp[1];
									}
									if (JSON.parse(matchSPs[n].content).sp[2] * 1 == 0) {
										matches[i].matchList[m][key2] = '--';
									} else {
										matches[i].matchList[m][key2] = JSON.parse(matchSPs[n].content).sp[2];
									}
									// matches[i].matchList[m][key0] = JSON.parse(matchSPs[n].content).sp[0]; 
									// matches[i].matchList[m][key1] = JSON.parse(matchSPs[n].content).sp[1];
									// matches[i].matchList[m][key2] = JSON.parse(matchSPs[n].content).sp[2];
									matches[i].matchList[m][key3] = false; /*选中状态 初始皆为未选中*/
									matches[i].matchList[m][key4] = false;
									matches[i].matchList[m][key5] = false;
								}

							}
						}
					}
				}
				if (classify == 'YCZS' && num == 1) {
					let arrmat = matches;
					if (!getSession('YCZS')) {
						this.matches = JSON.parse(JSON.stringify(arrmat));
					}
					return matches; //一场制胜先将胜平负的赔率数据处理好后返回数组再取加上让球胜平负的赔率在getMatchSPs函数中会用到这个返回值

				} else if (classify == 'HHGG' && num !== 5) {
					let arrmat = matches;
					this.matches = JSON.parse(JSON.stringify(arrmat));
					return matches;

				} else {
					let arrmat = matches;
					this.matches = JSON.parse(JSON.stringify(arrmat));
					setSession('YCZS', this.matches)
					console.log(this.matches);
					this.shaixuanmatches = JSON.parse(JSON.stringify(matches)); //matches数据存起来
					this.keDianJi = true;
					Indicator.close();
					let array = getSession('arr');
					let parr = getSession('parr');
					if (array) {
						let lengths = 0;
						this.byValueRqspf = array;

						let matches = this.matches;
						for (let x = 0; x < matches.length; x++) {
							for (let y = 0; y < matches[x].matchList.length; y++) {
								for (let i = 0; i < array.length; i++) {
									if (matches[x].matchList[y].matchKey == array[i].matchKey) {
										matches[x].matchList[y].soddsType = array[i].soddsType;
										matches[x].matchList[y].poddsType = array[i].poddsType;
										matches[x].matchList[y].foddsType = array[i].foddsType;
										matches[x].matchList[y].soddsTypeY = array[i].soddsTypeY;
										matches[x].matchList[y].poddsTypeY = array[i].poddsTypeY;
										matches[x].matchList[y].foddsTypeY = array[i].foddsTypeY;
										if (array[i].soddsType || array[i].poddsType || array[i].foddsType || array[i].soddsTypeY || array[i].poddsTypeY ||
											array[i].foddsTypeY) {
											lengths++
										}
										this.byValueRqspf = array;
										this.pbyValueRqspf = parr;
									}
								}
							}
						}
						phone.$emit('lengths', lengths);
					}
					// hideLoading();
				}
			},
			selectJJC_yczs: function(cindex, rindex, key, type, bet) { //一场制胜点击事件
				if (this.keDianJi == false) {
					return false
				}
				if (bet=='--') {
                Toast('不能选择暂无赔率的赛事。')
                return false;
              }
				var matchList = this.matches[cindex].matchList[rindex];
				if(getSession('arr')){
					var arrLength=getSession('arr').length;
					 var arrMatchKey=[];
					for (var d = 0; d <arrLength; d++) {
						arrMatchKey.push(getSession('arr')[d].matchKey)
					}				 
					if(arrMatchKey.indexOf(matchList.matchKey)==-1&&arrLength==8){
						Toast('至多一次选择8场赛事。');
						return false
					}
				}
				 

				if (type == 'rqspf') {
					if (matchList.soddsType || matchList.poddsType || matchList.foddsType) {
						matchList.soddsType = false;
						matchList.poddsType = false;
						matchList.foddsType = false;

						// Toast('一场比赛中，只允许选择一个玩法进行过关!');
						// return
					}
				} else if (type == 'spf') {
					if (matchList.soddsTypeY || matchList.poddsTypeY || matchList.foddsTypeY) {
						matchList.soddsTypeY = false;
						matchList.poddsTypeY = false;
						matchList.foddsTypeY = false;

						// Toast('一场比赛中，只允许选择一个玩法进行过关!');
						// return
					}
				}
				if (matchList[key]) {
					matchList[key] = false
				} else {
					matchList[key] = true
				};
				var keys = new Object();
				var pkeys = {};
				var pcinx;
				var prinx;
				if (cindex == 0 && rindex == 0 && this.matches[cindex].matchList.length == 1) {
					pcinx = 1;
					prinx = 0;
				} else if (cindex == 0 && rindex == 0) {
					pcinx = 0;
					prinx = 1;
				} else if (cindex !== 0 && rindex == 0) {
					pcinx = cindex - 1;
					prinx = this.matches[cindex - 1].matchList.length - 1;
				} else {
					pcinx = cindex;
					prinx = rindex - 1;
				}
				console.log(pcinx, prinx)
				var pmatchList = this.matches[pcinx].matchList[prinx];
				var byValueRqspf = this.byValueRqspf;
				var pbyValueRqspf = this.pbyValueRqspf;
				if (matchList.soddsType || matchList.poddsType || matchList.foddsType || matchList.soddsTypeY || matchList.poddsTypeY ||
					matchList.foddsTypeY) {
					keys['weekStr'] = matchList.weekStr;
					keys['lineId'] = matchList.lineId;
					keys['periodId'] = matchList.periodId;
					keys['handicap'] = matchList.handicap;
					keys['dan'] = false;
					keys['showPpxq'] = false;
					keys['paixu'] = matchList.paixu;
					keys['matchKey'] = matchList.matchKey;
					keys['gameName'] = matchList.gameName;
					keys['stopBuyTime'] = matchList.stopBuyTime;
					keys['homeTeamName'] = matchList.homeTeamName;
					keys['guestTeamName'] = matchList.guestTeamName;
					keys["sodds"] = matchList.sodds;
					keys["podds"] = matchList.podds;
					keys["fodds"] = matchList.fodds;
					keys["soddsType"] = matchList.soddsType;
					keys["poddsType"] = matchList.poddsType;
					keys["foddsType"] = matchList.foddsType;
					keys["soddsY"] = matchList.soddsY;
					keys["poddsY"] = matchList.poddsY;
					keys["foddsY"] = matchList.foddsY;
					keys["soddsTypeY"] = matchList.soddsTypeY;
					keys["poddsTypeY"] = matchList.poddsTypeY;
					keys["foddsTypeY"] = matchList.foddsTypeY;
					pkeys['weekStr'] = pmatchList.weekStr;
					pkeys['lineId'] = pmatchList.lineId;
					pkeys['periodId'] = pmatchList.periodId;
					pkeys['dan'] = false;
					pkeys['matchKey'] = pmatchList.matchKey;
					pkeys['paixu'] = pmatchList.paixu;
					pkeys['gameName'] = pmatchList.gameName;
					pkeys['handicap'] = pmatchList.handicap;
					pkeys['stopBuyTime'] = pmatchList.stopBuyTime;
					pkeys['homeTeamName'] = pmatchList.homeTeamName;
					pkeys['guestTeamName'] = pmatchList.guestTeamName;
					pkeys["sodds"] = pmatchList.sodds;
					pkeys["podds"] = pmatchList.podds;
					pkeys["fodds"] = pmatchList.fodds;
					pkeys["soddsType"] = pmatchList.soddsType;
					pkeys["poddsType"] = pmatchList.poddsType;
					pkeys["foddsType"] = pmatchList.foddsType;
					pkeys["soddsY"] = pmatchList.soddsY;
					pkeys["poddsY"] = pmatchList.poddsY;
					pkeys["foddsY"] = pmatchList.foddsY;
					pkeys["soddsTypeY"] = pmatchList.soddsTypeY;
					pkeys["poddsTypeY"] = pmatchList.poddsTypeY;
					pkeys["foddsTypeY"] = pmatchList.foddsTypeY;

					var index = -1;
					if (byValueRqspf.length > 0) {
						for (var x = 0; x < byValueRqspf.length; x++) {
							if (byValueRqspf[x].matchKey == matchList.matchKey) {
								index = x;
							}
						}
						if (index == -1) {
							byValueRqspf.push(keys);
							pbyValueRqspf.push(pkeys);
						} else {
							byValueRqspf[index] = keys;
							pbyValueRqspf[index] = pkeys;
						}
					} else {
						byValueRqspf.push(keys);
						pbyValueRqspf.push(pkeys);
					}
				} else {
					for (var n = 0; n < byValueRqspf.length; n++) {
						if (byValueRqspf[n].matchKey == matchList.matchKey) {
							//console.log(JSON.stringify(byValueRqspf));
							//console.log(JSON.stringify(pbyValueRqspf));
							byValueRqspf.splice(n, 1);
							pbyValueRqspf.splice(n, 1)
						} else {}
					}
				};
				var lengths = byValueRqspf.length;
				setSession('arr', byValueRqspf);
				setSession('parr', pbyValueRqspf);
				if (lengths == 0) {
					sessionStorage.removeItem('arr')
					sessionStorage.removeItem('parr')
				}
				phone.$emit('lengths', lengths);
			},
		},
		filters: {
			capitalize: function(matchDate, num) { //时间处理
				let time = new Date(matchDate);
				let y = time.getFullYear();
				let m = time.getMonth() + 1 >= 10 ? parseInt(time.getMonth() + 1) : "0" + parseInt(time.getMonth() + 1);
				let d = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
				let h = time.getHours() >= 10 ? time.getHours() : "0" + time.getHours();
				let mm = time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes();
				let s = time.getSeconds() >= 10 ? time.getSeconds() : "0" + time.getSeconds();
				let dd = time.getDay();
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
				} else {
					return y + "-" + m + "-" + d + " " + '周' + dd;
				}
			},
			AddZeorpad: function(num, n) { //以0补齐3位
				let len = num.toString().length;
				while (len < n) {
					num = "0" + num;
					len++;
				}
				return num;
			},
			AddZeorMoWei: function(num) { //以0补齐3位
				return parseFloat(num).toFixed(2);
			},
			gamesShow: function(name) {
				let shaixuan = getSession('shaixuan');
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
		}
	}
</script>

<style scoped>
	@import "../../../css/goucai_jjc.css";

	.c-red {
		background-color: #fb6b63 !important;
		border: 1px solid #E45B54 !important;
	}

	.c-hui {
		background-color: #c4c4c4 !important;
	}

	.dis-no {
		display: none !important;
	}
</style>
