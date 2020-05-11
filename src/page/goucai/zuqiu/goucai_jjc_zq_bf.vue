<template>
	<div>
		<section class="aui-refresh-content">
			<div class="aui-content">
		<div class="main" >
			<!-- 比分 -->
			<div class="jjc_sc_cont jjc_bqc_cont jjc_bf_cont">
				<template v-for="(item, cindex) in matches">
					<div class="countime"  @click="showList(cindex)" data-state="open">
						<div class="date_fleft">{{item.matchDate|capitalize()}}<span>共<i>{{item.matchList|getLength()}}</i>场比赛可投</span></div>
						<div class="fright"><i class="aui-iconfont" :class="days[cindex]?'aui-icon-top':'aui-icon-down'"></i></div>
					</div>
					<div   v-show="days[cindex]">
						<div v-for="(thal,rindex) in item.matchList" :key='rindex' class="con" v-if="$options.filters.gamesShow(thal.gameName)">
							<div class="flr titl">
								<p class="p1"><span class="sq_icon" :style="{background:thal.gameColor}"></span><span>{{ thal.gameName }}</span></p>
								<p>{{ thal.weekStr }} {{ thal.lineId|AddZeorpad(3)}}</p>
								<p>{{thal.stopBuyTime|capitalize(2)}}截止</p>
							</div>
							<div class="fgr battle">
								<div class="battle_name"><span>{{ thal.homeTeamName }} </span><span>vs</span><span>{{ thal.guestTeamName }}</span></div>
								<div class="battle_shel">
									<div class="tzxx" @click="showPopup('Popupbf',cindex,rindex)" tapmode v-if="thal.chooseBet&&thal.chooseBet.length>0">
										<template v-for='(d,i) in thal.chooseBet'>
											<span class="pd-l-5" v-if="((i+1)%3)==1" style="color: rgb(246, 63, 65); margin-right:0.5rem">{{d}}</span>
											<span class="pd-l-5" v-else-if="((i+1)%3)==2" style="color: rgb(13, 173, 135); margin-right:0.5rem">{{d}}</span>
											<span class="pd-l-5" v-else style="color: rgb(1, 159, 230); margin-right:0.5rem">{{d}}</span>
										</template>
									</div>
									<div class="tzxx" @click="showPopup('Popupbf',cindex,rindex)" tapmode v-else-if='thal.erXY'>点击展开投注选项</div>
									<div class="tzxx" tapmode v-else>暂未开放</div>
								</div>
							</div>
						</div>
					</div>
				</template>
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
			<!-- 比分点击投注弹出窗 -->
		<div v-if="PopupArr.Popupbf" v-cloak class="mask bifen"  @click="hidePopup('Popupbf')" @touchmove.prevent>
			</div>
			<div class="banqc_cont bifen_cont" @touchmove.prevent>
				<div v-if="PopupArr.Popupbf">
				<div class="title"><span>{{bf.homeTeamName}}</span><span> vs </span><span>{{bf.guestTeamName}}</span></div>
				<div class="con">
					<table class="bf_con" >
						<tr>
							<td rowspan='2' class="td1">主胜</td>
							<td :class="{ 'el-yellow':  bf.chooseType[0] }" @click="selectJJC_bf(0,'1:0',bf.erXY[1])">1:0<span>{{bf.erXY[1]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[1] }" @click="selectJJC_bf(1,'2:0',bf.erXY[2])">2:0<span>{{bf.erXY[2]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[2] }" @click="selectJJC_bf(2,'2:1',bf.erXY[3])">2:1<span>{{bf.erXY[3]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[3] }" @click="selectJJC_bf(3,'3:0',bf.erXY[4])">3:0<span>{{bf.erXY[4]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[4] }" @click="selectJJC_bf(4,'3:1',bf.erXY[5])">3:1<span>{{bf.erXY[5]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[5] }" @click="selectJJC_bf(5,'3:2',bf.erXY[6])">3:2<span>{{bf.erXY[6]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[6] }" @click="selectJJC_bf(6,'4:0',bf.erXY[7])">4:0<span>{{bf.erXY[7]|AddZeorMoWei}}</span></td>
						</tr>
						<tr>
							<td :class="{ 'el-yellow':  bf.chooseType[7] }" @click="selectJJC_bf(7,'4:1',bf.erXY[8])">4:1<span>{{bf.erXY[8]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[8] }" @click="selectJJC_bf(8,'4:2',bf.erXY[9])">4:2<span>{{bf.erXY[9]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[9] }" @click="selectJJC_bf(9,'5:0',bf.erXY[10])">5:0<span>{{bf.erXY[10]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[10] }" @click="selectJJC_bf(10,'5:1',bf.erXY[11])">5:1<span>{{bf.erXY[11]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[11] }" @click="selectJJC_bf(11,'5:2',bf.erXY[12])">5:2<span>{{bf.erXY[12]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[12] }" @click="selectJJC_bf(12,'胜其它',bf.erXY[0])" colspan="2">胜其它<span>{{bf.erXY[0]|AddZeorMoWei}}</span></td>
						</tr>
						<tr class="jianju"><td></td> <td colspan="7"></td></tr>
						<tr class="bf_con_ping">
							<td class="td2">平</td>
							<td :class="{ 'el-yellow':  bf.chooseType[13] }" @click="selectJJC_bf(13,'0:0',bf.erXY[14])">0:0<span>{{bf.erXY[14]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[14] }" @click="selectJJC_bf(14,'1:1',bf.erXY[15])">1:1<span>{{bf.erXY[15]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[15] }" @click="selectJJC_bf(15,'2:2',bf.erXY[16])">2:2<span>{{bf.erXY[16]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[16] }" @click="selectJJC_bf(16,'3:3',bf.erXY[17])">3:3<span>{{bf.erXY[17]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[17] }" @click="selectJJC_bf(17,'平其它',bf.erXY[13])" colspan="3">平其它<span>{{bf.erXY[13]|AddZeorMoWei}}</span></td>
						</tr>
						<tr class="jianju"><td></td> <td colspan="7"></td></tr>
						<tr>
							<td rowspan='2' class="td3">客胜</td>
							<td :class="{ 'el-yellow':  bf.chooseType[18] }" @click="selectJJC_bf(18,'0:1',bf.erXY[19])">0:1<span>{{bf.erXY[19]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[19] }" @click="selectJJC_bf(19,'0:2',bf.erXY[20])">0:2<span>{{bf.erXY[20]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[20] }" @click="selectJJC_bf(20,'1:2',bf.erXY[21])">1:2<span>{{bf.erXY[21]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[21] }" @click="selectJJC_bf(21,'0:3',bf.erXY[22])">0:3<span>{{bf.erXY[22]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[22] }" @click="selectJJC_bf(22,'1:3',bf.erXY[23])">1:3<span>{{bf.erXY[23]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[23] }" @click="selectJJC_bf(23,'2:3',bf.erXY[24])">2:3<span>{{bf.erXY[24]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[24] }" @click="selectJJC_bf(24,'0:4',bf.erXY[25])">0:4<span>{{bf.erXY[25]|AddZeorMoWei}}</span></td>
						</tr>
						<tr>
							<td :class="{ 'el-yellow':  bf.chooseType[25] }" @click="selectJJC_bf(25,'1:4',bf.erXY[26])">1:4<span>{{bf.erXY[26]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[26] }" @click="selectJJC_bf(26,'2:4',bf.erXY[27])">2:4<span>{{bf.erXY[27]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[27] }" @click="selectJJC_bf(27,'0:5',bf.erXY[28])">0:5<span>{{bf.erXY[28]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[28] }" @click="selectJJC_bf(28,'1:5',bf.erXY[29])">1:5<span>{{bf.erXY[29]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[29] }" @click="selectJJC_bf(29,'2:5',bf.erXY[30])">2:5<span>{{bf.erXY[30]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType[30] }" @click="selectJJC_bf(30,'负其它',bf.erXY[18])" colspan="2">负其它<span>{{bf.erXY[18]|AddZeorMoWei}}</span></td>
						</tr>
					</table>
					
				</div>
				<div class="foot">
					<div @click="hidePopup('Popupbf')">取消</div>
					<div @click="confirmChoice('Popupbf')">确定</div>
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
	import {phone} from "../../../js/connector.js";
	import {
		Toast,Indicator
	} from 'mint-ui';
	// import { requestInterceptors, responseInterceptors } from '../../../main.js'
	export default {
		data() {
			return {
				nomatches:false,
				matches: '', //数据
				shaixuanmatches: '',
				add: 0,
				saixunList: [],
				keDianJi: false,
				byValueRqspf: [], //让球胜平负 比分 半全场 一场制胜 胜平负 进球数 二选一 传值数组
				PopupArr: {
					Popupbqc: false,
					Popupbf: false,
					Popuphhgg: false,
					Popupdggp: false,
				},
				  bfchoose: [], //比分 半全场选中的初选
            bfchooseQr: [], //比分 半全场确认初选
            bf: '', //比分 半全场点击更多投注项的数据
            bfBetList: [], //比分 半全场选中赔率数组
            bfBetListQr: [], //比分 半全场确认选中赔率数组
            bfcindex: -1, //比分 半全场展开比赛的下标
            bfrindex: -1, //比分 半全场展开比赛的下标
            closetypes: [], ////比分 半全场选中状态
			keyes:'',
			days:[],
			topStatus:''
			};
		},
		created() {
// 			this.$ajax.interceptors.request.eject(requestInterceptors);
//             this.$ajax.interceptors.response.eject(responseInterceptors);
			let playType = this.$route.query.play;
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
					sessionStorage.removeItem('arr');
					Indicator.open();
					this.getMatches('BF');
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
							that.getMatches('BF');
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
			
			othersPlay:function(){
				this.$router.push({
					name:'goucai'
				})
			},
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
					playType = 'BF'
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
								// console.log(JSON.stringify(content.data));
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
								phone.$emit('add',add)
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

			getMatchSPs: function(playType, matches, num, classify) { //赔率获取
				if (!playType) {
					playType = 'BF'
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
									let key0 = 'erXY'; //赔率
									let key3 = 'chooseType'; //选中控制
									let key1 = 'chooseBet'; //空数组
									let bfBets = JSON.parse(matchSPs[n].content).sp;
									for (var sr = 0; sr < bfBets.length; sr++) {
                                          if (bfBets[sr]*1==0) {
                                            bfBets[sr]='--';
                                      }

                                        }
									matches[i].matchList[m][key0] = bfBets; /*赔率数据*/
									matches[i].matchList[m][key1] = []; /*创建一个空数组将来存选中项*/
									let chooseTypes = [];
									for (let a = 0; a < bfBets.length; a++) {
										chooseTypes.push(false);
									}
									matches[i].matchList[m][key3] = chooseTypes; /*选中状态 初始皆为未选中*/
							}
						}
					}
				}
				// console.log(JSON.stringify(matches[3]));
					let arrmat = matches;
					this.matches = JSON.parse(JSON.stringify(matches)).concat([]);
					setSession('BF', this.matches)
					console.log(this.matches);
					this.shaixuanmatches = JSON.parse(JSON.stringify(matches)); //matches数据存起来
					// console.log(JSON.stringify(matches));
					this.keDianJi = true;
					Indicator.close();
					let array = getSession('arr');
					if(array){
						let lengths=array.length;
						this.byValueRqspf=array;
						phone.$emit('lengths',lengths );
						let matches = this.matches;
						for (let x = 0; x < matches.length; x++) {
							for (let y = 0; y < matches[x].matchList.length; y++) {
								for (let i = 0; i < array.length; i++) {
									  if (matches[x].matchList[y].matchKey == array[i].matchKey) {
									matches[x].matchList[y].chooseType = array[i].chooseType;
					                var betTypes = [];
					                for (var d = 0; d < array[i].chooseType.length; d++) {
					                    if (array[i].chooseType[d]) {
					                        betTypes.push(array[i].betType[d]);
					                    }
					                }
					                matches[x].matchList[y].chooseBet = betTypes;
									}
								}
							}
						}
					}
					// hideLoading();
			},
			showPopup: function(key, cindex, rindex) {
                    if (this.keDianJi==false) {
                      return false
                    }
                this.keyes='';//清楚上次选择
                this.bfcindex = cindex; //将下标存起来
                this.bfrindex = rindex; //将下标存起来
                this.bfchoose = JSON.parse(JSON.stringify(this.matches[cindex].matchList[rindex].chooseBet)); //选择投注内容初始化使其等于上一次选择的内容，若无则为空
                this.bf = this.matches[cindex].matchList[rindex]; //将投注内容用下标取出来存着
				if(getSession('arr')){
					var arrLength=getSession('arr').length;
					 var arrMatchKey=[];
					for (var d = 0; d <arrLength; d++) {
						arrMatchKey.push(getSession('arr')[d].matchKey)
					}				 
					if(arrMatchKey.indexOf(this.bf.matchKey)==-1&&arrLength==8){
						Toast('至多一次选择8场赛事。');
						return false
					}
				}
				 
                if (key == 'Popupbqc' || key == 'Popupbf') {
                    this.closetypes = JSON.parse(JSON.stringify(this.bf.chooseType))
                } else {
                    if (this.hhAndDg.length > 0) {
                        for (var x = 0; x < this.hhAndDg.length; x++) {
                            if (this.hhAndDg[x].matchKey == this.bf.matchKey) {
                                if (this.hhAndDg[x].type == 'spf' || this.hhAndDg[x].type == 'rqspf') {
                                    toastMsg('一场比赛中，只允许选择一个玩法进行过关!');
                                    return
                                }
                            }
                        }
                    }
                    if (this.bf.chooseType3) {
                        this.closetypes3 = JSON.parse(JSON.stringify(this.bf.chooseType3))
                    } else {

                    }
                    if (this.bf.chooseType4) {
                        this.closetypes4 = JSON.parse(JSON.stringify(this.bf.chooseType4))
                    } else {

                    }
                    if (this.bf.chooseType5) {
                        this.closetypes5 = JSON.parse(JSON.stringify(this.bf.chooseType5))
                    } else {

                    }
                } //将初始化的选中状态存起来  点击取消的时候还原
                this.PopupArr[key] = true; //投注内容显示
				var dom = document.querySelector('.banqc_cont')
				animation(dom, 'bottom', 0)
				
            },
			hidePopup: function(key) {
                this.bf.chooseType = JSON.parse(JSON.stringify(this.closetypes)) //还原选中项状态
                this.PopupArr[key] = false; //隐藏投注框
				let dom = document.querySelector('.banqc_cont');
				let bottomDomInitial = window.getComputedStyle(dom).height.replace('px', '') * 1 * -1;
				animation(dom, 'bottom', bottomDomInitial)
            },
			selectJJC_bf: function(idx, list, bet) {
			  if (bet*1=='--') {
                Toast('不能选择暂无赔率的赛事。')
                return false;
              }
                if (this.bf.chooseType[idx]) {
                    this.$set(this.bf.chooseType, idx, false);
                    var index = this.bfchoose.indexOf(list);
                    if (index > -1) {
                        this.bfchoose.splice(index, 1);
                    }
                } else {
                    this.bfchoose.push(list);
                    this.$set(this.bf.chooseType, idx, true);
                };
            },
			confirmChoice: function(key) {
                var cindex = this.bfcindex; //取下标
                var rindex = this.bfrindex; //取下标
                this.matches[cindex].matchList[rindex].chooseBet = JSON.parse(JSON.stringify(this.bfchoose)); //将选中内容赋给外面的数组  进行渲染
                //this.bfBetListQr=this.bfBetList;//pei
                var matchList = this.bf;
                var byValueRqspf = this.byValueRqspf;
                var keys = new Object();
                var chose = false;
                var matchList = this.matches[cindex].matchList[rindex];
                if (key == 'Popuphhgg' || key == 'Popupdggp') {
                    var keys = this.keyes;
                    var isclosse = false;
                    if (matchList.chooseType3) {
                        for (var c = 0; c < matchList.chooseType3.length; c++) {
                            if (matchList.chooseType3[c]) {
                                isclosse = true;
                            }
                        }
                    }
                    if (matchList.chooseType4) {
                        for (var d = 0; d < matchList.chooseType4.length; d++) {
                            if (matchList.chooseType4[d]) {
                                isclosse = true;
                            }
                        }
                    }
                    if (matchList.chooseType5) {
                        for (var e = 0; e < matchList.chooseType5.length; e++) {
                            if (matchList.chooseType5[e]) {
                                isclosse = true;
                            }
                        }
                    }
                    if (isclosse) {
                        if (this.hhAndDg.length > 0) {
                            var index = -1;
                            for (var g = 0; g < this.hhAndDg.length; g++) {
                                if (this.hhAndDg[g].matchKey == keys.matchKey) {
                                    index = g
                                }
                            }
                            if (index == -1) {
                                this.hhAndDg.push(keys)
                            } else {
                                this.hhAndDg[index] = keys
                            }
                        } else {
                            this.hhAndDg.push(keys)
                        };
                        if (keys.matchKey == matchList.matchKey) {
                            if (keys.type == 'bf' || keys.type == 'bqc' || keys.type == 'jqs') {
                                matchList.moreType = true;
                                // console.log(JSON.stringify(keys));
                            }
                        } else {
                            matchList.moreType = false
                        };
                    } else {
                        var shanChuId = -1;
                        for (var h = 0; h < this.hhAndDg.length; h++) {
                            if (this.hhAndDg[h].matchKey == keys.matchKey) {
                                shanChuId = h
                            }

                            if (shanChuId !== -1) {
                                this.hhAndDg.splice(shanChuId, 1)
                            }
                        };
                        matchList.moreType = false;
                    }
                    var lengths = this.hhAndDg.length;
                   setSession('arr', this.hhAndDg);
                   if (lengths == 0) {
                   	sessionStorage.removeItem('arr')
                   }
                   phone.$emit('lengths', lengths);
                    //console.log(JSON.stringify(this.hhAndDg));
                };
                if (key == 'Popupbf' || key == 'Popupbqc') {
                    for (var i = 0; i < matchList.chooseType.length; i++) {
                        if (matchList.chooseType[i]) {
                            chose = true;
                        }
                    }
                    if (chose) {

                        keys['weekStr'] = matchList.weekStr;
                        keys['lineId'] = matchList.lineId;
                        keys['matchKey'] = matchList.matchKey;
                        keys['gameName'] = matchList.gameName;
                        keys['periodId'] = matchList.periodId;
                        keys['dan'] = false;
                        keys['stopBuyTime'] = matchList.stopBuyTime;
                        keys['homeTeamName'] = matchList.homeTeamName;
                        keys['guestTeamName'] = matchList.guestTeamName;
                        keys['erXY'] = matchList.erXY;
                        keys['chooseType'] = matchList.chooseType;
                        if (key == 'Popupbf') {
                            keys['betType'] = ['1:0', '2:0', '2:1', '3:0', '3:1', '3:2', '4:0', '4:1', '4:2', '5:0', '5:1', '5:2', '胜其它', '0:0', '1:1', '2:2', '3:3', '平其它', '0:1', '0:2', '1:2', '0:3', '1:3', '2:3', '0:4', '1:4', '2:4', '0:5', '1:5', '2:5', '负其它']
                        } else if (key == 'Popupbqc') {
                            keys['betType'] = ['胜-胜', '胜-平', '胜-负', '平-胜', '平-平', '平-负', '负-胜', '负-平', '负-负']
                        }
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
                    }
                    var lengths = byValueRqspf.length;
//                     api.sendEvent({
//                         name: 'sessions',
//                         extra: {
//                             lengths: lengths,
//                             arr: byValueRqspf
//                         }
//                     });
                var lengths = byValueRqspf.length;
				setSession('arr', byValueRqspf);
				if (lengths == 0) {
					sessionStorage.removeItem('arr')
				}
				phone.$emit('lengths', lengths);
                    //console.log(JSON.stringify(byValueRqspf));
                };
                // this.byValueRqspf=byValueRqspf;


            

                this.PopupArr[key] = false; //隐藏投注框
				let dom = document.querySelector('.banqc_cont');
				let bottomDomInitial = window.getComputedStyle(dom).height.replace('px', '') * 1 * -1;
				animation(dom, 'bottom', bottomDomInitial)
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
