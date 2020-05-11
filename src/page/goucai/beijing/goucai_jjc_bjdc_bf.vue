<template>
	<div>
		<mt-loadmore @top-status-change="handleTopChange" :top-method="loadTop" ref="loadmore">
			<div slot="top" class="mint-loadmore-top">
				<span class="shaxinc" v-show="topStatus !== 'loading'"><img src="../../../assets/shuaxin/logo3.png" /></span>
				<span class="shaxinc" v-show="topStatus === 'loading'">
					<div class="almosh"><img src="../../../assets/shuaxin/xuanzhuan80.png" /></div>
				</span>
			</div>
			<div class="main mainzq" v-if="BFList">
				<!-- 让球胜负平 -->
				<div class="rangqspf_fm">
					<template v-for="(item, cindex) in BFList">
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
												<span v-else-if="((oindex)+1%3)==2" style="color: rgb(13, 173, 135);margin-right:0.4rem">{{ obj }}</span><span
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
			<lini-page :tpyes="'event'" :zheight='"85vh"' :zwidth='"100%"' :prompt='"该玩法暂无赛事"' :goText='"去其他玩法看看"' @tonewpage='skipGoucai'
			 v-else></lini-page>
			<!-- <div class="goucai_quesheng" v-else>
				<div class="ques_cont">
					<img src="../../../assets/goucai/jjc/no_sais.png" />
					<p class="p1">该玩法暂无赛事</p>
					<p class="p2" @click="skipGoucai()">去其他玩法看看</p>
				</div>
			</div> -->
		</mt-loadmore>
		<!-- 比分点击投注弹出窗 -->
		<div v-cloak v-if="Popupbf" class="mask bifen" @touchmove.prevent  @click="hidePopup(PopupcIdx,PopuprIdx)">
			</div>
			<div class="banqc_cont bifen_cont bjdc_bifen_cont"  @touchmove.prevent>
				<div v-if="Popupbf">
				<div class="title"><span>{{BFList[PopupcIdx].matchList[PopuprIdx].homeTeamName}}</span><span> vs </span><span>{{BFList[PopupcIdx].matchList[PopuprIdx].guestTeamName}}</span></div>
				<div class="con">
					<table>
						<tr>
							<td rowspan='3' class="td1">主胜</td>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z0 }" @click="selectbjdc_bf('z0',BFList[PopupcIdx].matchList[PopuprIdx].sp[0])">1:0<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[0]}}</span></td>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z1 }" @click="selectbjdc_bf('z1',BFList[PopupcIdx].matchList[PopuprIdx].sp[1])">2:0<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[1]}}</span></td>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z2 }" @click="selectbjdc_bf('z2',BFList[PopupcIdx].matchList[PopuprIdx].sp[2])">2:1<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[2]}}</span></td>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z3 }" @click="selectbjdc_bf('z3',BFList[PopupcIdx].matchList[PopuprIdx].sp[3])">3:0<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[3]}}</span></td>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z4 }" @click="selectbjdc_bf('z4',BFList[PopupcIdx].matchList[PopuprIdx].sp[4])">3:1<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[4]}}</span></td>
						</tr>
						<tr>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z5 }" @click="selectbjdc_bf('z5',BFList[PopupcIdx].matchList[PopuprIdx].sp[5])">3:2<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[5]}}</span></td>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z6 }" @click="selectbjdc_bf('z6',BFList[PopupcIdx].matchList[PopuprIdx].sp[6])">4:0<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[6]}}</span></td>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z7 }" @click="selectbjdc_bf('z7',BFList[PopupcIdx].matchList[PopuprIdx].sp[7])">4:1<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[7]}}</span></td>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z8 }" @click="selectbjdc_bf('z8',BFList[PopupcIdx].matchList[PopuprIdx].sp[8])">4:2<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[8]}}</span></td>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z9 }" @click="selectbjdc_bf('z9',BFList[PopupcIdx].matchList[PopuprIdx].sp[9])">胜其它<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[9]}}</span></td>
						</tr>
					</table>
					<table class="table2">
						<tr>
							<td class="td2">平</td>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z10 }" @click="selectbjdc_bf('z10',BFList[PopupcIdx].matchList[PopuprIdx].sp[10])">0:0<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[10]}}</span></td>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z11 }" @click="selectbjdc_bf('z11',BFList[PopupcIdx].matchList[PopuprIdx].sp[11])">1:1<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[11]}}</span></td>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z12 }" @click="selectbjdc_bf('z12',BFList[PopupcIdx].matchList[PopuprIdx].sp[12])">2:2<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[12]}}</span></td>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z13 }" @click="selectbjdc_bf('z13',BFList[PopupcIdx].matchList[PopuprIdx].sp[13])">3:3<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[13]}}</span></td>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z14 }" @click="selectbjdc_bf('z14',BFList[PopupcIdx].matchList[PopuprIdx].sp[14])">平其它<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[14]}}</span></td>
						</tr>
					</table>
					<table>
						<tr>
							<td rowspan='3' class="td3">客胜</td>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z15 }" @click="selectbjdc_bf('z15',BFList[PopupcIdx].matchList[PopuprIdx].sp[15])">0:1<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[15]}}</span></td>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z16 }" @click="selectbjdc_bf('z16',BFList[PopupcIdx].matchList[PopuprIdx].sp[16])">0:2<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[16]}}</span></td>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z17 }" @click="selectbjdc_bf('z17',BFList[PopupcIdx].matchList[PopuprIdx].sp[17])">1:2<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[17]}}</span></td>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z18 }" @click="selectbjdc_bf('z18',BFList[PopupcIdx].matchList[PopuprIdx].sp[18])">0:3<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[18]}}</span></td>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z19 }" @click="selectbjdc_bf('z19',BFList[PopupcIdx].matchList[PopuprIdx].sp[19])">1:3<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[19]}}</span></td>
						</tr>
						<tr>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z20 }" @click="selectbjdc_bf('z20',BFList[PopupcIdx].matchList[PopuprIdx].sp[20])">2:3<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[20]}}</span></td>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z21 }" @click="selectbjdc_bf('z21',BFList[PopupcIdx].matchList[PopuprIdx].sp[21])">0:4<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[21]}}</span></td>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z22 }" @click="selectbjdc_bf('z22',BFList[PopupcIdx].matchList[PopuprIdx].sp[22])">1:4<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[22]}}</span></td>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z23 }" @click="selectbjdc_bf('z23',BFList[PopupcIdx].matchList[PopuprIdx].sp[23])">2:4<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[23]}}</span></td>
							<td :class="{ 'el-yellow': BFList[PopupcIdx].matchList[PopuprIdx].stateArr.z24 }" @click="selectbjdc_bf('z24',BFList[PopupcIdx].matchList[PopuprIdx].sp[24])">负其它<span>{{BFList[PopupcIdx].matchList[PopuprIdx].sp[24]}}</span></td>
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
		Toast,
		Indicator
	} from 'mint-ui';
	export default {
		data() {
			return {
				'days': [],
				'BFList': [],
				'Popupbf': false,
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
			this.getsp(arr);
		},
		mounted() {
			phone.$on('bjDelete', (val) => {
				if (val == 'BF') {
					sessionStorage.removeItem('arr')
					this.getsp();
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
			showPopup: function(cindex, rindex) {
				
				this.PopupcIdx = cindex;
				this.PopuprIdx = rindex;
				if(getSession('arr')){
					 var arrLength=getSession('arr').length;
					 var arrMatchKey=[];
					for (var d = 0; d <arrLength; d++) {
						arrMatchKey.push(getSession('arr')[d].id)
					}				 
					if(arrMatchKey.indexOf(this.BFList[cindex].matchList[rindex].id)==-1&&arrLength==8){
						Toast('至多一次选择8场赛事。');
						return false
					}
				}
				this.Popupbf = true;
				for (let i = 0; i < 25; i++) {
					let key = 'z' + i
					this.BFList[cindex].matchList[rindex].stateArr[key] = false
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '1:0')) {
					this.BFList[cindex].matchList[rindex].stateArr['z0'] = true;
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '2:0')) {
					this.BFList[cindex].matchList[rindex].stateArr['z1'] = true;
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '2:1')) {
					this.BFList[cindex].matchList[rindex].stateArr['z2'] = true;
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '3:0')) {
					this.BFList[cindex].matchList[rindex].stateArr['z3'] = true;
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '3:1')) {
					this.BFList[cindex].matchList[rindex].stateArr['z4'] = true;
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '3:2')) {
					this.BFList[cindex].matchList[rindex].stateArr['z5'] = true;
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '4:0')) {
					this.BFList[cindex].matchList[rindex].stateArr['z6'] = true;
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '4:1')) {
					this.BFList[cindex].matchList[rindex].stateArr['z7'] = true;
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '4:2')) {
					this.BFList[cindex].matchList[rindex].stateArr['z8'] = true;
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '胜其它')) {
					this.BFList[cindex].matchList[rindex].stateArr['z9'] = true;
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '0:0')) {
					this.BFList[cindex].matchList[rindex].stateArr['z10'] = true;
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '1:1')) {
					this.BFList[cindex].matchList[rindex].stateArr['z11'] = true;
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '2:2')) {
					this.BFList[cindex].matchList[rindex].stateArr['z12'] = true;
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '3:3')) {
					this.BFList[cindex].matchList[rindex].stateArr['z13'] = true;
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '平其它')) {
					this.BFList[cindex].matchList[rindex].stateArr['z14'] = true;
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '0:1')) {
					this.BFList[cindex].matchList[rindex].stateArr['z15'] = true;
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '0:2')) {
					this.BFList[cindex].matchList[rindex].stateArr['z16'] = true;
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '1:2')) {
					this.BFList[cindex].matchList[rindex].stateArr['z17'] = true;
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '0:3')) {
					this.BFList[cindex].matchList[rindex].stateArr['z18'] = true;
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '1:3')) {
					this.BFList[cindex].matchList[rindex].stateArr['z19'] = true;
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '2:3')) {
					this.BFList[cindex].matchList[rindex].stateArr['z20'] = true;
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '0:4')) {
					this.BFList[cindex].matchList[rindex].stateArr['z21'] = true;
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '1:4')) {
					this.BFList[cindex].matchList[rindex].stateArr['z22'] = true;
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '2:4')) {
					this.BFList[cindex].matchList[rindex].stateArr['z23'] = true;
				}
				if (this.isInArray(this.BFList[cindex].matchList[rindex].stateArr['xz'], '负其它')) {
					this.BFList[cindex].matchList[rindex].stateArr['z24'] = true;
				}
				var dom = document.querySelector('.banqc_cont')
				animation(dom, 'bottom', 0)
			},
			hidePopup: function(key, cindex, rindex) {
				this.Popupbf = false;
				this.PopupcIdx = cindex;
				this.PopuprIdx = rindex;
				let dom = document.querySelector('.banqc_cont');
				let bottomDomInitial = window.getComputedStyle(dom).height.replace('px', '') * 1 * -1;
				animation(dom, 'bottom', bottomDomInitial)
			},
			selectbjdc_bf: function(key, sp) {
				if (sp=='--') {
                Toast("不能选择暂无赔率的赛事。");
                return false;
                }
				if (this.BFList[this.PopupcIdx].matchList[this.PopuprIdx].stateArr[key]) {
					this.BFList[this.PopupcIdx].matchList[this.PopuprIdx].stateArr[key] = false
				} else {
					this.BFList[this.PopupcIdx].matchList[this.PopuprIdx].stateArr[key] = true
				}
			},
			confirmChoice: function(cindex, rindex) {
				this.Popupbf = false;
				this.PopupcIdx = cindex;
				this.PopuprIdx = rindex;
				this.BFList[cindex].matchList[rindex].stateArr['xz'] = [];
				this.BFList[cindex].matchList[rindex].stateArr['xz'] = [];
				if (this.BFList[cindex].matchList[rindex].stateArr['z0']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('1:0');
				}
				if (this.BFList[cindex].matchList[rindex].stateArr['z1']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('2:0');
				}
				if (this.BFList[cindex].matchList[rindex].stateArr['z2']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('2:1');
				}
				if (this.BFList[cindex].matchList[rindex].stateArr['z3']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('3:0');
				}
				if (this.BFList[cindex].matchList[rindex].stateArr['z4']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('3:1');
				}
				if (this.BFList[cindex].matchList[rindex].stateArr['z5']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('3:2');
				}
				if (this.BFList[cindex].matchList[rindex].stateArr['z6']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('4:0');
				}
				if (this.BFList[cindex].matchList[rindex].stateArr['z7']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('4:1');
				}
				if (this.BFList[cindex].matchList[rindex].stateArr['z8']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('4:2');
				}
				if (this.BFList[cindex].matchList[rindex].stateArr['z9']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('胜其它');
				}
				if (this.BFList[cindex].matchList[rindex].stateArr['z10']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('0:0');
				}
				if (this.BFList[cindex].matchList[rindex].stateArr['z11']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('1:1');
				}
				if (this.BFList[cindex].matchList[rindex].stateArr['z12']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('2:2');
				}
				if (this.BFList[cindex].matchList[rindex].stateArr['z13']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('3:3');
				}
				if (this.BFList[cindex].matchList[rindex].stateArr['z14']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('平其它');
				}
				if (this.BFList[cindex].matchList[rindex].stateArr['z15']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('0:1');
				}
				if (this.BFList[cindex].matchList[rindex].stateArr['z16']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('0:2');
				}
				if (this.BFList[cindex].matchList[rindex].stateArr['z17']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('1:2');
				}
				if (this.BFList[cindex].matchList[rindex].stateArr['z18']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('0:3');
				}
				if (this.BFList[cindex].matchList[rindex].stateArr['z19']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('1:3');
				}
				if (this.BFList[cindex].matchList[rindex].stateArr['z20']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('2:3');
				}
				if (this.BFList[cindex].matchList[rindex].stateArr['z21']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('0:4');
				}
				if (this.BFList[cindex].matchList[rindex].stateArr['z22']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('1:4');
				}
				if (this.BFList[cindex].matchList[rindex].stateArr['z23']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('2:4');
				}
				if (this.BFList[cindex].matchList[rindex].stateArr['z24']) {
					this.BFList[cindex].matchList[rindex].stateArr['xz'].push('负其它');
				}
				for (let i = 0; i < 25; i++) {
					let key = 'z' + i
					if (this.BFList[cindex].matchList[rindex].stateArr[key]) {
						this.BFList[cindex].matchList[rindex].stateArr['z'] = 1;
						break;
					} else {
						this.BFList[cindex].matchList[rindex].stateArr['z'] = 0
					}
				}

				var z = 0;
				var ass = [];
				for (var i = 0; i < this.BFList.length; i++) {
					for (var j = 0; j < this.BFList[i].matchList.length; j++) {
						if (this.BFList[i].matchList[j].stateArr['z']) {
							ass.push(this.BFList[i].matchList[j]);
						}
					}
				}

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
				Indicator.open();
				let data = [];
				data["playType"] = 'BF';
				let dataes = this.Qs.stringify({
					"path": "jc/dczc",
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getMatchSPs', dataes).then(ret => {
					if (ret.status == 500) {
						this.scjqList = false
						Indicator.close();
						Toast("服务器异常，请稍后重试");
					} else {
						let content = JSON.parse(ret.data.content);
						if (content.code == 100000) {
							this.getMatchList(content.data, arr)
						} else {
							this.scjqList = false
							Indicator.close();
							Toast(content.message);
						}
					}
				}).catch(err => {
					Indicator.close();
					console.log(err);
				})
			},
			getMatchList: function(sp, arr) {
				let data = [];
				data["playType"] = 'BF';
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
						this.BFList = false
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
												"z3": false,
												"z4": false,
												"z5": false,
												"z6": false,
												"z7": false,
												"z8": false,
												"z9": false,
												"z10": false,
												"z11": false,
												"z12": false,
												"z13": false,
												"z14": false,
												"z15": false,
												"z16": false,
												"z17": false,
												"z18": false,
												"z19": false,
												"z20": false,
												"z21": false,
												"z22": false,
												"z23": false,
												"z24": false,
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
												"z3": false,
												"z4": false,
												"z5": false,
												"z6": false,
												"z7": false,
												"z8": false,
												"z9": false,
												"z10": false,
												"z11": false,
												"z12": false,
												"z13": false,
												"z14": false,
												"z15": false,
												"z16": false,
												"z17": false,
												"z18": false,
												"z19": false,
												"z20": false,
												"z21": false,
												"z22": false,
												"z23": false,
												"z24": false,
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
								phone.$emit('bjSaixunList', arrs);
								this.totalList = cc;
								this.BFList = data;
							} else {
								this.BFList = false
							}
						} else {
							Toast(content.message);
							this.BFList = false
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
