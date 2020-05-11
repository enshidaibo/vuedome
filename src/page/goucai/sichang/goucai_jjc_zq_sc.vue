<template>
	<div>
		<section class="aui-refresh-content">
			<div class="aui-content">
			<div class="main" v-if="scjqList">
				<div class="jjc_sc_cont jjc_scjq_cont">
					<div class="countime" @click="showList">
						<div class="date_fleft scjqbtl">第<span>{{ periods }}</span>期 投注截止时间 : <span>{{ BettingEndline|capitalize(4)}}</span></div>
						<div class="fright"><i class="aui-iconfont" :class="days?'aui-icon-top':'aui-icon-down'"></i></div>
					</div>
					<div class="" v-if='scjqList&&days'>
						<div v-for="(thal,rindex) in scjqList" class="con">
							<div class="flr titl">
								<p class="p1"><span :style="{background:thal.gameColor}" class="sq_icon"></span><span style="font-size: 0.6rem;">{{ thal.gameName }}</span></p>
								<p class="ts_p">{{ thal.lineId }}</p>
								<p>{{ thal.matchTime|capitalize(2) }}截止</p>
							</div>
							<div class="fgr battle">
								<div class="battle_name"><span><i class="zkdui">(主) </i>{{thal.homeTeamName}}</span><span>vs</span><span>{{ thal.guestTeamName }}
										<i class="zkdui">(客)</i></span></div>
								<div class="battle_shel">
									<table>
										<tr>
											<td>主</td>
											<td v-bind:class="{ 'el-yellow': thal.stateArr.z0 }" @click="selectJJC_sc(rindex,'z0')">0球</td>
											<td v-bind:class="{ 'el-yellow': thal.stateArr.z1 }" @click="selectJJC_sc(rindex,'z1')">1球</td>
											<td v-bind:class="{ 'el-yellow': thal.stateArr.z2 }" @click="selectJJC_sc(rindex,'z2')">2球</td>
											<td v-bind:class="{ 'el-yellow': thal.stateArr.z3 }" @click="selectJJC_sc(rindex,'z3')">3+球</td>
										</tr>
										<tr>
											<td>客</td>
											<td v-bind:class="{ 'el-yellow': thal.stateArr.k0 }" @click="selectJJC_sc(rindex,'k0')">0球</td>
											<td v-bind:class="{ 'el-yellow': thal.stateArr.k1 }" @click="selectJJC_sc(rindex,'k1')">1球</td>
											<td v-bind:class="{ 'el-yellow': thal.stateArr.k2 }" @click="selectJJC_sc(rindex,'k2')">2球</td>
											<td v-bind:class="{ 'el-yellow': thal.stateArr.k3 }" @click="selectJJC_sc(rindex,'k3')">3+球</td>
										</tr>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<lini-page :tpyes="'event'" :zheight='"85vh"' :zwidth='"100%"' :prompt='"该玩法暂无赛事"' :goText='"去其他玩法看看"' @tonewpage='skipGoucai' v-else ></lini-page>
           <!-- <div class="goucai_quesheng" v-else>
            	<div class="ques_cont">
            		<img src="../../../assets/goucai/jjc/no_sais.png" />
            		<p class="p1">该玩法暂无赛事</p>
            		<p class="p2" @click="skipGoucai()">去其他玩法看看</p>
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
		Toast,Indicator
	} from 'mint-ui';
	export default {
		data() {
			return {
				periods: 0,
				BettingEndline: 0,
				sczcBetArr: [],
				scjqList: [],
				chosenField: 0,
				days: true,
				topStatus:''
			};
		},
		created() {
			Indicator.open();
			this.getMatches();
		},
		mounted() {
			phone.$on('delete', (val) => {
				if (val) {
					sessionStorage.removeItem('arr')
					Indicator.open();
					this.getMatches();
				}
			});
			 var that = this;
							   var pullToRefreshs = new auiPullToRefresh({ //下拉刷新
								container: document.querySelector('.aui-refresh-content'), //下拉容器
								triggerDistance: 80 //下拉高度
							}, function(ret) {
								if (ret.status == "success") {
									that.$ajax.defaults.timeout  =  49527;//49527这个值控制没有showLonding
									that.getMatches();
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
            skipGoucai: function(){
                this.$router.push({
                    name: 'goucai'
                })
            },
			showList: function() {
				this.days = !this.days
			},
			getMatches: function() {
				this.chosenField = 0
				let dataes = this.Qs.stringify({
					"path": "jc/sczc"
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getMatches', dataes).then(ret => {
					Indicator.close();
					if (ret.status == 500) {
						
						Toast("服务器异常，请稍后重试");
						this.scjqList = false
					} else {
						let content = JSON.parse(ret.data.content)
						if (content.code == 100000) {
							var matches = content.data;
							var newlist = matches.matchList;
							this.periods = matches.periodNumber; //期数
							this.BettingEndline = matches.periodEndedTime; //期数
							if (newlist.length > 0) {
								for (var i = 0; i < newlist.length; i++) {
									newlist[i]['matchTime'] = newlist[i]['matchTime'];
									newlist[i]['listSelect'] = false
									newlist[i]['stateArr'] = {
										'z0': false,
										'z1': false,
										'z2': false,
										'z3': false,
										'k0': false,
										'k1': false,
										'k2': false,
										'k3': false
									};
								}
								let arr = getSession('arr');
								if (arr) {
									for (let i = 0; i < arr.length; i++) {
										for (let s = 0; s < newlist.length; s++) {
											if (arr[i].lineId == newlist[s].lineId) {
												newlist[s].listSelect = true
												newlist[s].stateArr = arr[i].stateArr
												break;
											}
										}
									}
									this.sczcBetArr = arr
									this.chosenField = arr.length
									phone.$emit('sclengths', this.chosenField);
								}
							} else{
								newlist = false
							}
							this.scjqList = newlist;
						} else {
							Indicator.close();
							Toast(content.message);
                            this.scjqList = false
                        }
					}
				})
				.catch(err=>{
					Indicator.close();
				})
			},
			selectJJC_sc: function(rindex, key) {
				if (this.scjqList[rindex].stateArr[key]) {
					this.scjqList[rindex].stateArr[key] = false;
					if (this.scjqList[rindex].listSelect) {
						var fhz = 0,
							fhk = 0;
						for (var i = 0; i <= 3; i++) {
							if (this.scjqList[rindex].stateArr['z' + i]) {
								fhz++
							}
						}
						for (var i = 0; i <= 3; i++) {
							if (this.scjqList[rindex].stateArr['k' + i]) {
								fhk++
							}
						}
						if (fhz == 0 || fhk == 0) {
							this.chosenField = this.chosenField - 1;
							if (this.chosenField < 0) {
								this.chosenField = 0;
							}
							this.scjqList[rindex].listSelect = false
							for (var i = 0; i < this.sczcBetArr.length; i++) {
								if (this.scjqList[rindex].id == this.sczcBetArr[i].id) {
									this.sczcBetArr.splice(i, 1)
								}
							}
						}
					}
				} else {
					this.scjqList[rindex].stateArr[key] = true
					if (!this.scjqList[rindex].listSelect) {
						var fhz = 0,
							fhk = 0;
						for (var i = 0; i <= 3; i++) {
							if (this.scjqList[rindex].stateArr['z' + i]) {
								fhz++
							}
						}
						for (var i = 0; i <= 3; i++) {
							if (this.scjqList[rindex].stateArr['k' + i]) {
								fhk++
							}
						}
						if (fhz > 0 && fhk > 0) {
							this.chosenField = this.chosenField + 1;
							this.scjqList[rindex].listSelect = true;
							this.sczcBetArr.push(this.scjqList[rindex])
						}
					}
				}
				var lengths = this.sczcBetArr.length;
				setSession('arr', this.sczcBetArr);
				if (lengths == 0) {
					sessionStorage.removeItem('arr')
				}
				phone.$emit('sclengths', this.chosenField);
			},
			loadTop: function() {
				this.getMatches();
				setTimeout(() => {
					this.$refs.loadmore.onTopLoaded();
				}, 1000)
			},
			handleTopChange: function(status) {
				this.topStatus = status;
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
		}
	}
</script>

<style scoped>
	@import "../../../css/goucai_jjc.css";

	header {
		position: fixed;
	}

	.routerView {
		margin-top: 2.25rem;
		margin-bottom: 3.8rem;
	}
</style>
