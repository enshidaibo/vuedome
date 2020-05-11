<template>
	<div>
		<section class="aui-refresh-content">
			<div class="aui-content">
			<div class="main mainzq" v-if="BQQSPFList">
				<!-- 让球胜负平 -->
				<div class="rangqspf_fm">
					<template v-for="(item, cindex) in BQQSPFList">
						<div class="countime" @click="showList(cindex)" data-state="open">
							<div class="date_fleft">{{item.matchDate|capitalize()}}<span>共有<i>{{item.matchList|getLength()}}</i>场比赛可投</span></div>
							<div class="fright"><i class="aui-iconfont " :class="days[cindex]?'aui-icon-top':'aui-icon-down'"></i></div>
						</div>
						<div class="jjc_sc_cont jjc_bqc_cont" v-show="days[cindex]">
							<div v-for="(thal,rindex) in item.matchList" class="con" v-if="$options.filters.gamesShow(thal.gameName)">
								<div class="flr titl">
									<p class="p1"><span class="sq_icon" :style="'background-color:' + thal.gameColor"></span><span style="font-size: 0.6rem;">{{thal.gameName}}</span></p>
									<p>{{thal.weekStr}} {{thal.lineId}}</p>
									<p>{{thal.stopBuyTime|capitalize(2)}} 截止</p>
								</div>
								<div class="fgr battle">
									<div class="battle_name"><span>{{thal.homeTeamName}} </span><span>vs</span><span>{{thal.guestTeamName}}</span></div>
									<div class="battle_shel">
										<div class="tzxx" v-if="thal.stateArr.xz.length != 0" @click="showPopup(cindex,rindex)"> <template v-for=" (obj,oindex) in thal.stateArr.xz ">
												<span v-if="((oindex+1)%3)==1" style="color: rgb(246, 63, 65); margin-right:0.4rem">{{ obj }}</span>
												<span v-else-if="((oindex+1)%3)==2" style="color: rgb(13, 173, 135);margin-right:0.4rem">{{ obj }}</span><span
												 v-else style="color: rgb(1, 159, 230);margin-right:0.8rem">{{ obj }}</span></template></div>
										<div class="tzxx" v-else @click="showPopup(cindex,rindex)">点击展开投注选项</div>
									</div>
								</div>
							</div>
						</div>
					</template>
				</div>
				<div class="mask" id="mask" style="display: none; width: 100%; height: 100vh;"></div>
			</div>
			<lini-page :tpyes="'event'" :zheight='"85vh"' :zwidth='"100%"' :prompt='"该玩法暂无赛事"' :goText='"去其他玩法看看"' @tonewpage='skipGoucai' v-else></lini-page>
			<!-- <div class="goucai_quesheng" v-else>
				<div class="ques_cont">
					<img src="../../../assets/goucai/jjc/no_sais.png" />
					<p class="p1">该玩法暂无赛事</p>
					<p class="p2" @click="skipGoucai()">去其他玩法看看</p>
				</div>
			</div> -->
		</div>
		</section>
		<!-- 半全场点击投注弹出窗 -->
		<div  v-if="Popupbqc" class="mask banquanchang"  @click="hidePopup(PopupcIdx,PopuprIdx)" @touchmove.prevent>
			</div>
			<div class="banqc_cont bqc_con" @touchmove.prevent >
				<div  v-if="Popupbqc" >
				<div class="title"><span>{{BQQSPFList[PopupcIdx].matchList[PopuprIdx].homeTeamName}}</span><span> vs </span><span>{{BQQSPFList[PopupcIdx].matchList[PopuprIdx].guestTeamName}}</span></div>
				<div class="con">
					<table class="bqc">
						<tr>
							<td rowspan='3' class="td1">半全场</td>
							<td :class="{ 'el-yellow': BQQSPFList[PopupcIdx].matchList[PopuprIdx].stateArr.z0 }" @click="selectbjdc_bqc('z0','胜-胜',BQQSPFList[PopupcIdx].matchList[PopuprIdx].sp[0])">胜-胜<span>{{BQQSPFList[PopupcIdx].matchList[PopuprIdx].sp[0]}}</span></td>
							<td :class="{ 'el-yellow': BQQSPFList[PopupcIdx].matchList[PopuprIdx].stateArr.z1 }" @click="selectbjdc_bqc('z1','胜-平',BQQSPFList[PopupcIdx].matchList[PopuprIdx].sp[1])">胜-平<span>{{BQQSPFList[PopupcIdx].matchList[PopuprIdx].sp[1]}}</span></td>
							<td :class="{ 'el-yellow': BQQSPFList[PopupcIdx].matchList[PopuprIdx].stateArr.z2 }" @click="selectbjdc_bqc('z2','胜-负',BQQSPFList[PopupcIdx].matchList[PopuprIdx].sp[2])">胜-负<span>{{BQQSPFList[PopupcIdx].matchList[PopuprIdx].sp[2]}}</span></td>
						</tr>
						<tr>
							<td :class="{ 'el-yellow': BQQSPFList[PopupcIdx].matchList[PopuprIdx].stateArr.z3 }" @click="selectbjdc_bqc('z3','平-胜',BQQSPFList[PopupcIdx].matchList[PopuprIdx].sp[3])">平-胜<span>{{BQQSPFList[PopupcIdx].matchList[PopuprIdx].sp[3]}}</span></td>
							<td :class="{ 'el-yellow': BQQSPFList[PopupcIdx].matchList[PopuprIdx].stateArr.z4 }" @click="selectbjdc_bqc('z4','平-平',BQQSPFList[PopupcIdx].matchList[PopuprIdx].sp[4])">平-平<span>{{BQQSPFList[PopupcIdx].matchList[PopuprIdx].sp[4]}}</span></td>
							<td :class="{ 'el-yellow': BQQSPFList[PopupcIdx].matchList[PopuprIdx].stateArr.z5 }" @click="selectbjdc_bqc('z5','平-负',BQQSPFList[PopupcIdx].matchList[PopuprIdx].sp[5])">平-负<span>{{BQQSPFList[PopupcIdx].matchList[PopuprIdx].sp[5]}}</span></td>
						</tr>
						<tr>
							<td :class="{ 'el-yellow': BQQSPFList[PopupcIdx].matchList[PopuprIdx].stateArr.z6 }" @click="selectbjdc_bqc('z6','负-胜',BQQSPFList[PopupcIdx].matchList[PopuprIdx].sp[6])">负-胜<span>{{BQQSPFList[PopupcIdx].matchList[PopuprIdx].sp[6]}}</span></td>
							<td :class="{ 'el-yellow': BQQSPFList[PopupcIdx].matchList[PopuprIdx].stateArr.z7 }" @click="selectbjdc_bqc('z7','负-平',BQQSPFList[PopupcIdx].matchList[PopuprIdx].sp[7])">负-平<span>{{BQQSPFList[PopupcIdx].matchList[PopuprIdx].sp[7]}}</span></td>
							<td :class="{ 'el-yellow': BQQSPFList[PopupcIdx].matchList[PopuprIdx].stateArr.z8 }" @click="selectbjdc_bqc('z8','负-平',BQQSPFList[PopupcIdx].matchList[PopuprIdx].sp[8])">负-负<span>{{BQQSPFList[PopupcIdx].matchList[PopuprIdx].sp[8]}}</span></td>
						</tr>
					</table>
				</div>
				<div class="foot">
					<div @click="hidePopup(PopupcIdx,PopuprIdx)">取消</div>
					<div @click="confirmChoice(PopupcIdx,PopuprIdx)">确定</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		getSession,
		animation,
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
				days: [],
				BQQSPFList: [],
				'Popupbqc': false,
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
				if (val == 'BQQSPF') {
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
            skipGoucai: function(){
                this.$router.push({
                    name: 'goucai'
                })
            },
			showList: function(i) {
				this.$set(this.days, i, !this.days[i])
			},
			showPopup: function(cindex, rindex) {
				
				this.PopupcIdx = cindex;
				this.PopuprIdx = rindex;
				if(getSession('arr')){
					 var arrLength=getSession('arr').length;
					 var arrMatchKey=[];
					for (var d = 0; d <arrLength; d++) {
						arrMatchKey.push(getSession('arr')[d].id)
					}				 
					if(arrMatchKey.indexOf(this.BQQSPFList[cindex].matchList[rindex].id)==-1&&arrLength==8){
						Toast('至多一次选择8场赛事。');
						return false
					}
				}
				this.Popupbqc = true;
				for (let i = 0; i < 9; i++) {
					let key = 'z' + i
					this.BQQSPFList[cindex].matchList[rindex].stateArr[key] = false
				}
				if (this.isInArray(this.BQQSPFList[cindex].matchList[rindex].stateArr['xz'], '胜-胜')) {
					this.BQQSPFList[cindex].matchList[rindex].stateArr['z0'] = true;
				}
				if (this.isInArray(this.BQQSPFList[cindex].matchList[rindex].stateArr['xz'], '胜-平')) {
					this.BQQSPFList[cindex].matchList[rindex].stateArr['z1'] = true;
				}
				if (this.isInArray(this.BQQSPFList[cindex].matchList[rindex].stateArr['xz'], '胜-负')) {
					this.BQQSPFList[cindex].matchList[rindex].stateArr['z2'] = true;
				}
				if (this.isInArray(this.BQQSPFList[cindex].matchList[rindex].stateArr['xz'], '平-胜')) {
					this.BQQSPFList[cindex].matchList[rindex].stateArr['z3'] = true;
				}
				if (this.isInArray(this.BQQSPFList[cindex].matchList[rindex].stateArr['xz'], '平-平')) {
					this.BQQSPFList[cindex].matchList[rindex].stateArr['z4'] = true;
				}
				if (this.isInArray(this.BQQSPFList[cindex].matchList[rindex].stateArr['xz'], '平-负')) {
					this.BQQSPFList[cindex].matchList[rindex].stateArr['z5'] = true;
				}
				if (this.isInArray(this.BQQSPFList[cindex].matchList[rindex].stateArr['xz'], '负-胜')) {
					this.BQQSPFList[cindex].matchList[rindex].stateArr['z6'] = true;
				}
				if (this.isInArray(this.BQQSPFList[cindex].matchList[rindex].stateArr['xz'], '负-平')) {
					this.BQQSPFList[cindex].matchList[rindex].stateArr['z7'] = true;
				}
				if (this.isInArray(this.BQQSPFList[cindex].matchList[rindex].stateArr['xz'], '负-负')) {
					this.BQQSPFList[cindex].matchList[rindex].stateArr['z8'] = true;
				}
				var dom = document.querySelector('.banqc_cont')
				animation(dom, 'bottom', 0);
			},
			hidePopup: function(key, cindex, rindex) {
				this.Popupbqc = false;
				this.PopupcIdx = cindex;
				this.PopuprIdx = rindex;
				let dom = document.querySelector('.banqc_cont');
				let bottomDomInitial = window.getComputedStyle(dom).height.replace('px', '') * 1 * -1;
				animation(dom, 'bottom', bottomDomInitial)
			},
			selectbjdc_bqc: function(key, value, sp) {
				if (sp=='--') {
                Toast("不能选择暂无赔率的赛事。");
                return false;
            }
			
				if (this.BQQSPFList[this.PopupcIdx].matchList[this.PopuprIdx].stateArr[key]) {
					this.BQQSPFList[this.PopupcIdx].matchList[this.PopuprIdx].stateArr[key] = false;
				} else {
					this.BQQSPFList[this.PopupcIdx].matchList[this.PopuprIdx].stateArr[key] = true;
				}
			},
			confirmChoice: function(cindex, rindex) {
				this.Popupbqc = false;
				this.PopupcIdx = cindex;
				this.PopuprIdx = rindex;
				this.BQQSPFList[cindex].matchList[rindex].stateArr['xz'] = [];
				if (this.BQQSPFList[cindex].matchList[rindex].stateArr['z0']) {
					this.BQQSPFList[cindex].matchList[rindex].stateArr['xz'].push('胜-胜');
				}
				if (this.BQQSPFList[cindex].matchList[rindex].stateArr['z1']) {
					this.BQQSPFList[cindex].matchList[rindex].stateArr['xz'].push('胜-平');
				}
				if (this.BQQSPFList[cindex].matchList[rindex].stateArr['z2']) {
					this.BQQSPFList[cindex].matchList[rindex].stateArr['xz'].push('胜-负');
				}
				if (this.BQQSPFList[cindex].matchList[rindex].stateArr['z3']) {
					this.BQQSPFList[cindex].matchList[rindex].stateArr['xz'].push('平-胜');
				}
				if (this.BQQSPFList[cindex].matchList[rindex].stateArr['z4']) {
					this.BQQSPFList[cindex].matchList[rindex].stateArr['xz'].push('平-平');
				}
				if (this.BQQSPFList[cindex].matchList[rindex].stateArr['z5']) {
					this.BQQSPFList[cindex].matchList[rindex].stateArr['xz'].push('平-负');
				}
				if (this.BQQSPFList[cindex].matchList[rindex].stateArr['z6']) {
					this.BQQSPFList[cindex].matchList[rindex].stateArr['xz'].push('负-胜');
				}
				if (this.BQQSPFList[cindex].matchList[rindex].stateArr['z7']) {
					this.BQQSPFList[cindex].matchList[rindex].stateArr['xz'].push('负-平');
				}
				if (this.BQQSPFList[cindex].matchList[rindex].stateArr['z8']) {
					this.BQQSPFList[cindex].matchList[rindex].stateArr['xz'].push('负-负');
				}
				for (let i = 0; i < 9; i++) {
					let key = 'z' + i
					if (this.BQQSPFList[cindex].matchList[rindex].stateArr[key]) {
						this.BQQSPFList[cindex].matchList[rindex].stateArr['z'] = 1;
						break;
					} else {
						this.BQQSPFList[cindex].matchList[rindex].stateArr['z'] = 0
					}
				}

				var z = 0;
				var ass = [];
				for (var i = 0; i < this.BQQSPFList.length; i++) {
					for (var j = 0; j < this.BQQSPFList[i].matchList.length; j++) {
						if (this.BQQSPFList[i].matchList[j].stateArr['z']) {
							z += 1;
							ass.push(this.BQQSPFList[i].matchList[j]);
						}
					}
				}

				this.chosenField = z;
				var lengths = ass.length;
				setSession('arr', ass);
				if (lengths == 0) {
					sessionStorage.removeItem('arr')
				}
				phone.$emit('bjLengths', lengths);
				let dom = document.querySelector('.banqc_cont');
				let bottomDomInitial = window.getComputedStyle(dom).height.replace('px', '') * 1 * -1;
				animation(dom, 'bottom', bottomDomInitial)
			},
			getsp: function(arr) {
				let data = [];
				data["playType"] = 'BQQSPF';
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
						this.BQQSPFList = false
					} else {
						let content = JSON.parse(ret.data.content)
						if (content.code == 100000) {
							this.getMatchList(content.data,arr)
						} else {
							Toast(content.message);
							Indicator.close();
							this.BQQSPFList = false
						}
					}
				}).catch(err => {
					Indicator.close();
					console.log(err);
				})
			},
			getMatchList: function(sp,arr) {
				let data = [];
				data["playType"] = 'BQQSPF';
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
						this.BQQSPFList = false
					} else {
						let content = JSON.parse(ret.data.content)
						if (content.code == 100000) {
							var data = content.data
							if (data&&data.length>0) {
								if (arr) {
									phone.$emit('bjLengths', arr.length);
									for (var i = 0; i < data.length; i++) {
										for (var j = 0; j < data[i].matchList.length; j++) {
											if (sp) {
												for (var n = 0; n < sp.length; n++) {
                                        if (sp[n].lineId == data[i].matchList[j].lineId) {
                                        var srrsp=JSON.parse(sp[n].content).sp;
                                          for (var sr = 0; sr < srrsp.length; sr++) {

                                            if (srrsp[sr]*1==0) {
                                              srrsp[sr]='--';
                                            }
                                          }
                                            data[i].matchList[j]["sp"] = srrsp;
                                        }
                                    }
												
											}
											var stateArr = {
												"z": 0,"z0": false,"z1": false,"z2": false,"z3": false,"z4": false,
												"z5": false,"z6": false,"z7": false,"z8": false,"xz": [],"dan": false
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
                                        var srrsp=JSON.parse(sp[n].content).sp;
                                          for (var sr = 0; sr < srrsp.length; sr++) {

                                            if (srrsp[sr]*1==0) {
                                              srrsp[sr]='--';
                                            }
                                          }
                                            data[i].matchList[j]["sp"] = srrsp;
                                        }
                                    }
												
											}
											data[i].matchList[j]["stateArr"] = {
												"z": 0,"z0": false,"z1": false,"z2": false,"z3": false,"z4": false,
												"z5": false,"z6": false,"z7": false,"z8": false,"xz": [],"dan": false
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
								this.BQQSPFList = data;
								console.log(data)
							}else{
								this.BQQSPFList = false
							}
						} else {
							Toast(content.message);
							this.BQQSPFList = false
						}
					}
				}).catch(err => {
					Indicator.close();
					console.log(err);
				})
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
