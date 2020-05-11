<template>
	<div>
		<section class="aui-refresh-content">
			<div class="aui-content">
		<!-- 内容 -->
		<div class="main" >
			<!-- 进球数 -->
			<div class="jjc_sc_cont jjc_jqs_cont">
				<div v-for="(item, cindex) in matches" >
					<div class="countime" @click="showList(cindex)" data-state="open" tapmode>
						<div class="date_fleft">{{item.matchDate|capitalize()}}<span>共<i>{{item.matchList|getLength()}}</i>场比赛可投</span></div>
						<div class="fright"><i class="aui-iconfont" :class="days[cindex]?'aui-icon-top':'aui-icon-down'"></i></div>
					</div>
					<div  v-show="days[cindex]">
						<div v-for="(thal, rindex) in item.matchList" :key='rindex' class="con" v-if="$options.filters.gamesShow(thal.gameName)">
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
											<td :class="{ 'el-yellow': thal.ctype0 }" @click="selectJJC_jqs(cindex,rindex,'ctype0',thal.goalBet0)">0球 <span>{{thal.goalBet0}}</span></td>
											<td :class="{ 'el-yellow': thal.ctype1 }" @click="selectJJC_jqs(cindex,rindex,'ctype1',thal.goalBet1)">1球 <span>{{thal.goalBet1}}</span></td>
											<td :class="{ 'el-yellow': thal.ctype2 }" @click="selectJJC_jqs(cindex,rindex,'ctype2',thal.goalBet2)">2球 <span>{{thal.goalBet2}}</span></td>
											<td :class="{ 'el-yellow': thal.ctype3 }" @click="selectJJC_jqs(cindex,rindex,'ctype3',thal.goalBet3)">3球 <span>{{thal.goalBet3}}</span></td>
										</tr>
										<tr>
											<td :class="{ 'el-yellow': thal.ctype4 }" @click="selectJJC_jqs(cindex,rindex,'ctype4',thal.goalBet4)">4球 <span>{{thal.goalBet4}}</span></td>
											<td :class="{ 'el-yellow': thal.ctype5 }" @click="selectJJC_jqs(cindex,rindex,'ctype5',thal.goalBet5)">5球 <span>{{thal.goalBet5}}</span></td>
											<td :class="{ 'el-yellow': thal.ctype6 }" @click="selectJJC_jqs(cindex,rindex,'ctype6',thal.goalBet6)">6球 <span>{{thal.goalBet6}}</span></td>
											<td :class="{ 'el-yellow': thal.ctype7 }" @click="selectJJC_jqs(cindex,rindex,'ctype7',thal.goalBet7)">7+球 <span>{{thal.goalBet7}}</span></td>
										</tr>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="mask" id="mask" style="display: none; width: 100%; height: 100vh;"></div>
		</div>
		<lini-page :tpyes="'event'" :zheight='"85vh"' :zwidth='"100%"' :prompt='"该玩法暂无赛事"' :goText='"去其他玩法看看"' @tonewpage='othersPlay' v-if='nomatches' ></lini-page>
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
	import {phone} from "../../../js/connector.js";
	import {
		Toast,Indicator
	} from 'mint-ui';
	// import { requestInterceptors, responseInterceptors } from '../../../main.js'
	export default {
		data() {
			return {
				matches: '', //数据
				shaixuanmatches: '',
				add: 0,
				days:[],
				nomatches:false,
				saixunList: [],
				keDianJi: false,
				topStatus:'',
				byValueRqspf: [], //让球胜平负 比分 半全场 一场制胜 胜平负 进球数 二选一 传值数组
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
		/* beforeDestroy() {
		 this.$ajax.interceptors.request.use(function(config) {
		  Indicator.open();
		  //请求发起之前  显示loadding
		  return config;
		})
		
		this.$ajax.interceptors.response.use(function(config) {
		  //在响应回来之后，隐藏loadding
		 Indicator.close();
		  // console.log(config);
		  return config;
		}) 
		},*/
		mounted() {
			phone.$on('delete', (val) => {
				if (val) {
					sessionStorage.removeItem('arr')
					Indicator.open();
					this.getMatches('JQS');
					this.recover();
				}
			})

		 var that = this;
					   var pullToRefreshs = new auiPullToRefresh({ //下拉刷新
						container: document.querySelector('.aui-refresh-content'), //下拉容器
						triggerDistance: 80 //下拉高度
					}, function(ret) {
						if (ret.status == "success") {
							that.$ajax.defaults.timeout  =  49527;//49527这个值控制没有showLonding
							that.getMatches('JQS');
							setTimeout(() => {
								that.$ajax.defaults.timeout  = 50000;
								pullToRefreshs.cancelLoading(); //刷新成功后调用此方法隐藏
							}, 1500)
						}
					});
		},
		beforeDestroy() {
		   this.$ajax.defaults.timeout  = 50000;
		},
		methods: {
	
			showList:function(i){
				this.$set(this.days,i,!this.days[i])
				console.log(this.days[i]);
			},
			recover: function() {
				this.matches = JSON.parse(JSON.stringify(this.shaixuanmatches));
			},
			getMatches: function(playType) { //赛事获取
		
				console.log(playType);
				if (!playType) {
					playType = 'JQS'
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
								let matchesLeng=matches.length;
								if(matchesLeng<1){
									Indicator.close();
									this.nomatches=true;
								}
								let daysArr=[];
								for(let i=0;i<matchesLeng;i++){
									daysArr.push(true);
								}
								this.days=daysArr;
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
								phone.$emit('add',add);
								if (!getSession('shaixuan')) {
									setSession('shaixuan', arr)
								}
									this.getMatchSPs(playType, matches, -1, 'ordinary'); //ordinary表示一般的玩法  即非一场制胜 单关 混合过关
							} else {
								alert('网络错误！');
							}
						}
					})
					.catch(err => {
						Indicator.close();
						this.nomatches=true;
						console.log(err);
					})
			},
othersPlay:function(){
				this.$router.push({
					name:'goucai'
				})
			},
			getMatchSPs: function(playType, matches, num, classify) { //赔率获取
				if (!playType) {
					playType = 'JQS'
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
									this.datalists(matches, matchSPs, playType, num, classify); //classify  一场制胜 单关 混合过关 需另传一次做分别
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
									let goalBet = JSON.parse(matchSPs[n].content).sp;
									for (let j = 0; j < goalBet.length; j++) {
										let key = 'goalBet' + j;
										let ctype = 'ctype' + j;
										  if (goalBet[j]*1==0) {
                               matches[i].matchList[m][key] = '--';
                            }else {
                              matches[i].matchList[m][key] = goalBet[j];
                            }

										matches[i].matchList[m][ctype] = false;
									}
							}
						}
					}
				}
					let arrmat = matches;
					this.matches = JSON.parse(JSON.stringify(matches)).concat([]);
					setSession('JQS', this.matches)
					console.log(this.matches);
					this.shaixuanmatches = JSON.parse(JSON.stringify(matches)); //matches数据存起来
					this.keDianJi = true;
					Indicator.close();
					// hideLoading();
					let array = getSession('arr');
					if(array){
						let lengths=0;
						this.byValueRqspf=array;
						let matches = this.matches;
						for (let x = 0; x < matches.length; x++) {
							for (let y = 0; y < matches[x].matchList.length; y++) {
								for (let i = 0; i < array.length; i++) {
									  if (matches[x].matchList[y].matchKey == array[i].matchKey) {
									matches[x].matchList[y].ctype0 = array[i].ctype0;
                                    matches[x].matchList[y].ctype1 = array[i].ctype1;
                                    matches[x].matchList[y].ctype2 = array[i].ctype2;
                                    matches[x].matchList[y].ctype3 = array[i].ctype3;
                                    matches[x].matchList[y].ctype4 = array[i].ctype4;
                                    matches[x].matchList[y].ctype5 = array[i].ctype5;
                                    matches[x].matchList[y].ctype6 = array[i].ctype6;
                                    matches[x].matchList[y].ctype7 = array[i].ctype7;
									 if(array[i].ctype0||array[i].ctype1||array[i].ctype2||array[i].ctype3||array[i].ctype4||array[i].ctype5||array[i].ctype6||array[i].ctype7){
																			   lengths++;
									}
									}
								}
							}
						}
						phone.$emit('lengths',lengths );
					}
			},
			selectJJC_jqs: function(cindex, rindex, key,bet) {
				
				if (this.keDianJi == false) {
					return false
				}
				if(bet=='--'){
                   Toast('不能选择暂无赔率的赛事。');
                   return false;
                 }
				var byValueRqspf = this.byValueRqspf;
				var keys = new Object();
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
				if (matchList[key]) {
					matchList[key] = false
				} else {
					matchList[key] = true
				}
				var byValueRqspf = this.byValueRqspf;
				var keys = new Object();
				if (matchList.ctype0 || matchList.ctype1 || matchList.ctype2 || matchList.ctype3 || matchList.ctype4 || matchList.ctype5 ||
					matchList.ctype6 || matchList.ctype7) {
					keys['weekStr'] = matchList.weekStr;
					keys['lineId'] = matchList.lineId;
					keys['periodId'] = matchList.periodId;
					keys['dan'] = false;
					keys['matchKey'] = matchList.matchKey;
					keys['gameName'] = matchList.gameName;
					keys['stopBuyTime'] = matchList.stopBuyTime;
					keys['homeTeamName'] = matchList.homeTeamName;
					keys['guestTeamName'] = matchList.guestTeamName;
					keys['goalBet0'] = matchList.goalBet0;
					keys['goalBet1'] = matchList.goalBet1;
					keys['goalBet2'] = matchList.goalBet2;
					keys['goalBet3'] = matchList.goalBet3;
					keys['goalBet4'] = matchList.goalBet4;
					keys['goalBet5'] = matchList.goalBet5;
					keys['goalBet6'] = matchList.goalBet6;
					keys['goalBet7'] = matchList.goalBet7;
					keys['ctype0'] = matchList.ctype0;
					keys['ctype1'] = matchList.ctype1;
					keys['ctype2'] = matchList.ctype2;
					keys['ctype3'] = matchList.ctype3;
					keys['ctype4'] = matchList.ctype4;
					keys['ctype5'] = matchList.ctype5;
					keys['ctype6'] = matchList.ctype6;
					keys['ctype7'] = matchList.ctype7;
					// console.log(keys);
					var index = -1;
					if (byValueRqspf.length > 0) {
						for (var x = 0; x < byValueRqspf.length; x++) {
							if (byValueRqspf[x].matchKey == matchList.matchKey) {
								index = x;
							}
						}
						if (index == -1) {
							byValueRqspf.push(keys)
						} else {
							byValueRqspf[index] = keys;
						}
					} else {
						byValueRqspf.push(keys);
					}
				} else {
					for (var n = 0; n < byValueRqspf.length; n++) {
						if (byValueRqspf[n].matchKey == matchList.matchKey) {
							byValueRqspf.splice(n, 1)
						} else {}
					}
				};
				var lengths = byValueRqspf.length;
				setSession('arr', byValueRqspf);
				if (lengths == 0) {
					sessionStorage.removeItem('arr')
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
					return y + "-" + m + "-" + d + " " + '星期' + dd;
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
		}
	}
</script>

<style scoped>
	@import "../../../css/goucai_jjc.css";
</style>
