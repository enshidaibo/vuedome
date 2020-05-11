<template>
	<div>
		<section class="aui-refresh-content">
			<div class="aui-content">
				<div class="main mainzq" v-if="SPFList">
					<!-- 让球胜负平 -->
					<div class="rangqspf_fm">
						<template v-for="(item, cindex) in SPFList">
							<div class="countime" @click="showList(cindex)" data-state="open">
								<div class="date_fleft">{{item.matchDate|capitalize()}}<span>共有<i>{{item.matchList|getLength()}}</i>场比赛可投</span></div>
								<div class="fright"><i class="aui-iconfont " :class="days[cindex]?'aui-icon-top':'aui-icon-down'"></i></div>
							</div>
							<div class="jjc_sc_cont jjc_rxjc_cont jjc_spf_cont jjc_rqspf_cont" v-show="days[cindex]">
								<div v-for="(thal,rindex) in item.matchList" class="con" v-if="$options.filters.gamesShow(thal.gameName)">
									<div class="flr titl">
										<p class="p1"><span class="sq_icon" :style="'background-color:' + thal.gameColor"></span><span>{{thal.gameName}}</span></p>
										<p>{{thal.weekStr}} {{thal.lineId}}</p>
										<p>{{thal.stopBuyTime|capitalize(2)}} 截止</p>
									</div>
									<div class="fgr battle">
										<div class="battle_shel">
											<ul>
												<li v-if="thal.handicap>0" style="background-color:#fb6b63;border-color:#fb6b63"><span>主</span><br /><span>+{{thal.handicap}}</span></li>
												<li v-else-if="thal.handicap==0" style="background-color:#c4c4c4;border-color:#c4c4c4"><span>主</span><br /><span>{{thal.handicap}}</span></li>
												<li v-else style="background-color:#69bc14"><span>主</span><br /><span>{{thal.handicap}}</span></li>
												<li :class="{ 'el-yellow': thal.stateArr.z0 }" @click="selectbjdc_spf(cindex,rindex,'z0',thal.sp[0])"><span>{{thal.homeTeamName}}</span><br /><span>胜{{thal.sp[0]}}</span></li>
												<li :class="{ 'el-yellow': thal.stateArr.z1 }" @click="selectbjdc_spf(cindex,rindex,'z1',thal.sp[1])"><span>VS</span><br /><span>平{{thal.sp[1]}}</span></li>
												<li :class="{ 'el-yellow': thal.stateArr.z2 }" @click="selectbjdc_spf(cindex,rindex,'z2',thal.sp[2])"><span>{{thal.guestTeamName}}</span><br /><span>负{{thal.sp[2]}}</span></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</template>
					</div>
					<div class="mask" id="mask" style="display: none; width: 100%; height: 100vh;"></div>
				</div>
				<lini-page :tpyes="'event'" :zheight='"85vh"' :zwidth='"100%"' :prompt='"该玩法暂无赛事"' :goText='"去其他玩法看看"' @tonewpage='skipGoucai'
				 v-else></lini-page>
				<!-- <div class="goucai_quesheng" v-else>
				<div class="ques_cont">
					<img src="../../../assets/goucai/jjc/no_sais.png" />
					<p class="p1">该玩法暂无赛事</p>
					<p class="p2"  @click="skipGoucai()">去其他玩法看看</p>
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
	export default {
		data() {
			return {
				'days': [],
				'SPFList': [],
				'PopupcIdx': 0,
				'PopuprIdx': 0,
				'totalField': 1,
				'chosenField': 0,
				'totalList': 0,
				'topStatus': ''
			};
		},
		created() {
			let arr = getSession('arr');
			Indicator.open();
			this.getsp(arr);
		},
		mounted() {
			phone.$on('bjDelete', (val) => {
				console.log(val)
				if (val == 'SPF') {
					sessionStorage.removeItem('arr');
					Indicator.open();
					this.getsp();
				}
			});
			var that = this;
			var pullToRefreshs = new auiPullToRefresh({ //下拉刷新
				container: document.querySelector('.aui-refresh-content'), //下拉容器
				triggerDistance: 80 //下拉高度
			}, function(ret) {
				if (ret.status == "success") {
					that.getsp();
					setTimeout(() => {
						pullToRefreshs.cancelLoading(); //刷新成功后调用此方法隐藏
					}, 1500)
				}
			});
		},

		methods: {
			skipGoucai: function() {
				this.$router.push({
					name: 'goucai'
				})
			},
			showList: function(i) {
				this.$set(this.days, i, !this.days[i])
			},
			selectbjdc_spf: function(cindex, rindex, key, sp) {
				if (sp == '--') {
					Toast("不能选择暂无赔率的赛事。");
					return false;
				}
				if(getSession('arr')){
					 var arrLength=getSession('arr').length;
					 var arrMatchKey=[];
					for (var d = 0; d <arrLength; d++) {
						arrMatchKey.push(getSession('arr')[d].id)
					}				 
					if(arrMatchKey.indexOf(this.SPFList[cindex].matchList[rindex].id)==-1&&arrLength==8){
						Toast('至多一次选择8场赛事。');
						return false
					}
				}
				
				if (this.SPFList[cindex].matchList[rindex].stateArr[key]) {
					this.SPFList[cindex].matchList[rindex].stateArr[key] = false
				} else {
					this.SPFList[cindex].matchList[rindex].stateArr[key] = true
				}
				for (let i = 0; i < 3; i++) {
					let key = 'z' + i
					if (this.SPFList[cindex].matchList[rindex].stateArr[key]) {
						this.SPFList[cindex].matchList[rindex].stateArr['z'] = 1;
						break;
					} else {
						this.SPFList[cindex].matchList[rindex].stateArr['z'] = 0
					}
				}

				var z = 0;
				var ass = [];
				for (var i = 0; i < this.SPFList.length; i++) {
					for (var j = 0; j < this.SPFList[i].matchList.length; j++) {
						if (this.SPFList[i].matchList[j].stateArr['z']) {
							z += 1;
							ass.push(this.SPFList[i].matchList[j]);
						}
					}
				}
				var lengths = ass.length;
				setSession('arr', ass);
				if (lengths == 0) {
					sessionStorage.removeItem('arr')
				}
				phone.$emit('bjLengths', lengths);
			},
			getsp: function(arr) {
				let data = [];
				data["playType"] = 'SPF';
				let dataes = this.Qs.stringify({
					"path": "jc/dczc",
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getMatchSPs', dataes).then(ret => {
					if (ret.status == 500) {
						Toast("服务器异常，请稍后重试");
						Indicator.close();
						this.SPFList = false
					} else {
						let content = JSON.parse(ret.data.content)
						if (content.code == 100000) {
							this.getMatchList(content.data, arr)
						} else {
							Indicator.close();
							Toast(content.message);
							this.SPFList = false
						}
					}
				}).catch(err => {
					Indicator.close();
					console.log(err);
				})
			},
			getMatchList: function(sp, arr) {
				let data = [];
				data["playType"] = 'SPF';
				let dataes = this.Qs.stringify({
					"path": "jc/dczc",
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getMatches', dataes).then(ret => {
					Indicator.close();
					if (ret.status == 500) {
						Toast("服务器异常，请稍后重试");
						this.SPFList = false
					} else {
						let content = JSON.parse(ret.data.content)
						if (content.code == 100000) {
							var data = content.data
							if (data && data.length > 0) {
								if (arr) {
									phone.$emit('bjLengths', arr.length);
									for (var i = 0; i < data.length; i++) {
										for (var j = 0; j < data[i].matchList.length; j++) {
											if (sp) {
												for (var n = 0; n < sp.length; n++) {
													if (sp[n].lineId == data[i].matchList[j].lineId) {
														var srrsp = JSON.parse(sp[n].content).sp;
														for (var sr = 0; sr < srrsp.length; sr++) {

															if (srrsp[sr] * 1 == 0) {
																srrsp[sr] = '--';
															}
														}
														data[i].matchList[j]["sp"] = srrsp;
													}
												}

											}
											var stateArr = {
												"z": 0,
												"z0": false,
												"z1": false,
												"z2": false,
												"xz": [],
												"dan": false
											};
											for (var k = 0; k < arr.length; k++) {
												if (data[i].matchList[j].lineId == arr[k].lineId) {
													data[i].matchList[j]["stateArr"] = arr[k].stateArr;
													break;
												} else {
													data[i].matchList[j]["stateArr"] = stateArr;
												}
											}
										}
										this.days.push(true)
									}
								} else {
									for (var i = 0; i < data.length; i++) {
										for (var j = 0; j < data[i].matchList.length; j++) {
											if (sp) {
												for (var n = 0; n < sp.length; n++) {
													if (sp[n].lineId == data[i].matchList[j].lineId) {
														var srrsp = JSON.parse(sp[n].content).sp;
														for (var sr = 0; sr < srrsp.length; sr++) {

															if (srrsp[sr] * 1 == 0) {
																srrsp[sr] = '--';
															}
														}
														data[i].matchList[j]["sp"] = srrsp;
													}
												}

											}
											data[i].matchList[j]["stateArr"] = {
												"z": 0,
												"z0": false,
												"z1": false,
												"z2": false,
												"xz": [],
												"dan": false
											};
										}
										this.days.push(true)
									}
								}

								var bjdc_filter = [];
								var cc = 0;
								for (var i = 0; i < data.length; i++) {
									for (var j = 0; j < data[i].matchList.length; j++) {
										cc += 1;
										if (!this.isInArray(bjdc_filter, data[i].matchList[j].gameName)) {
											bjdc_filter.push(data[i].matchList[j].gameName);
										}
									}
								}
								var arrs = {
									arr: [],
									add: cc
								};
								for (var n = 0; n < bjdc_filter.length; n++) {
									arrs.arr.push({
										"id": n,
										'name': bjdc_filter[n],
										'state': true
									});
								}
								if (!getSession('shaixuan')) {
									setSession('shaixuan', bjdc_filter)
								}
								phone.$emit('bjSaixunList', arrs)
								this.totalList = cc;
								this.SPFList = data;
								console.log(data)
							} else {
								this.SPFList = false
							}
						} else {
							Toast(content.message);
							this.SPFList = false
						}
					}
				}).catch(err => {
					Indicator.close();
					console.log(err);
				})
			},
			loadTop: function() {
				this.getsp();
				setTimeout(() => {
					this.$refs.loadmore.onTopLoaded();
				}, 1000)
			},
			handleTopChange: function(status) {
				this.topStatus = status;
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
