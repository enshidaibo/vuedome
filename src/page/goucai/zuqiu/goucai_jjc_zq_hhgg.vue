<template>
	<div>
		<section class="aui-refresh-content">
			<div class="aui-content">
				<div class="main">
					<!-- 混合过关 -->
					<div class="jjc_sc_cont jjc_hhgg_cont">
						<template v-for="(item, cindex) in matches">
							<div class="countime" @click="showList(cindex)" data-state="open" tapmode>
								<div class="date_fleft">{{item.matchDate|capitalize()}}<span>共<i>{{item.matchList|getLength()}}</i>场比赛可投</span></div>
								<div class="fright"><i class="aui-iconfont" :class="days[cindex]?'aui-icon-top':'aui-icon-down'"></i></div>
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
											<table >
												<tr v-if='!thal.playTypeOpen.SPF'>
													<td>0</td>
													<td class="w-100">暂未开放</td>
													<td class="w-100">暂未开放</td>
													<td class="w-100">暂未开放</td>
													<td rowspan="2" class="tdlast" :class="{'el-yellow':thal.moreType}" @click="showPopup('Popuphhgg',cindex,rindex)">更多<br />选项</td>
												</tr>
												<tr v-else-if='thal.betNum1||!completed'>
													<td>0</td>
													<td :class="{ 'el-yellow': thal.chooseType1[0] }" @click="selectJJC_hhgg(cindex,rindex,'chooseType1',0,'spf','胜',thal.betNum1[0])">胜
														<span>{{thal.betNum1[0]}}</span></td>
													<td :class="{ 'el-yellow': thal.chooseType1[1] }" @click="selectJJC_hhgg(cindex,rindex,'chooseType1',1,'spf','平',thal.betNum1[1])">平
														<span>{{thal.betNum1[1]}}</span></td>
													<td :class="{ 'el-yellow': thal.chooseType1[2] }" @click="selectJJC_hhgg(cindex,rindex,'chooseType1',2,'spf','负',thal.betNum1[2])">负
														<span>{{thal.betNum1[2]}}</span></td>
													<td rowspan="2" class="tdlast" :class="{'el-yellow':thal.moreType}" @click="showPopup('Popuphhgg',cindex,rindex)">更多<br />选项</td>
												</tr>
													<tr v-else-if='!thal.betNum1'>
													<td>0</td>
													<td class="w-100">暂未开放</td>
													<td class="w-100">暂未开放</td>
													<td class="w-100">暂未开放</td>
													<td rowspan="2" class="tdlast" :class="{'el-yellow':thal.moreType}" @click="showPopup('Popuphhgg',cindex,rindex)">更多<br />选项</td>
												</tr>
												<tr v-if='!thal.playTypeOpen.RQSPF'>
													<td>0</td>
													<td class="w-100">暂未开放</td>
													<td class="w-100">暂未开放</td>
													<td class="w-100">暂未开放</td>
													<td rowspan="2" class="tdlast" :class="{'el-yellow':thal.moreType}" @click="showPopup('Popuphhgg',cindex,rindex)">更多<br />选项</td>
												</tr>
											
												<tr v-else-if='thal.betNum2||!completed2'>
													<td v-if='thal.handicap>0' class="c-red">主<br />+{{thal.handicap}}</td>
													<td v-else-if='thal.handicap==0' class="c-hui">主<br />{{thal.handicap}}</td>
													<td v-else>主<br />{{thal.handicap}}</td>
													<td :class="{ 'el-yellow': thal.chooseType2[0] }" @click="selectJJC_hhgg(cindex,rindex,'chooseType2',0,'rqspf','让胜',thal.betNum2[0])">胜
														<span>{{thal.betNum2[0]}}</span></td>
													<td :class="{ 'el-yellow': thal.chooseType2[1] }" @click="selectJJC_hhgg(cindex,rindex,'chooseType2',1,'rqspf','让平',thal.betNum2[1])">平
														<span>{{thal.betNum2[1]}}</span></td>
													<td :class="{ 'el-yellow': thal.chooseType2[2] }" @click="selectJJC_hhgg(cindex,rindex,'chooseType2',2,'rqspf','让负',thal.betNum2[2])">负
														<span>{{thal.betNum2[2]}}</span></td>
												</tr>
												<tr v-else-if='!thal.betNum2'>
													<td v-if='thal.handicap>0' class="c-red">主<br />+{{thal.handicap}}</td>
													<td v-else-if='thal.handicap==0' class="c-hui">主<br />{{thal.handicap}}</td>
													<td v-else>主<br />{{thal.handicap}}</td>
													<td class="w-100">暂未开放</td>
													<td class="w-100">暂未开放</td>
													<td class="w-100">暂未开放</td>
												</tr>
											</table>
										</div>
									</div>
								</div>
							</div>
						</template>
					</div>



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
		<!-- 混合过关点击更多选项弹出框 -->
		<div v-if="PopupArr.Popuphhgg" v-cloak class="mask bifen hunhgg"  @click="hidePopup('Popuphhgg')" @touchmove.prevent>
			</div>
			<div class="banqc_cont bifen_cont hunhgg_cont"  @touchmove.prevent>
				<div v-if="PopupArr.Popuphhgg">
				<div class="title"><span>{{bf.homeTeamName}}</span><span> vs </span><span>{{bf.guestTeamName}}</span></div>
				<div class="con">
					<table class="jqs" v-if='bf.betNum4'>
						<tr>
							<td class="td2" rowspan="2">进球数</td>
							<td :class="{ 'el-yellow':  bf.chooseType4[0] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType4',0,'jqs','0球',bf.betNum4[0])">0球<span>{{bf.betNum4[0]}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType4[1] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType4',1,'jqs','1球',bf.betNum4[1])">1球<span>{{bf.betNum4[1]}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType4[2] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType4',2,'jqs','2球',bf.betNum4[2])">2球<span>{{bf.betNum4[2]}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType4[3] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType4',3,'jqs','3球',bf.betNum4[3])">3球<span>{{bf.betNum4[3]}}</span></td>
						</tr>
						<tr>
							<td class='fs-we' :class="{ 'el-yellow':  bf.chooseType4[4] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType4',4,'jqs','4球',bf.betNum4[4])">4球<span>{{bf.betNum4[4]}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType4[5] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType4',5,'jqs','5球',bf.betNum4[5])">5球<span>{{bf.betNum4[5]}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType4[6] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType4',6,'jqs','6球',bf.betNum4[6])">6球<span>{{bf.betNum4[6]}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType4[7] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType4',7,'jqs','7+球',bf.betNum4[7])">7+球<span>{{bf.betNum4[7]}}</span></td>
						</tr>
					</table>
					<table class="jqs" v-else>
						<tr>
							<td class="td2" rowspan="2">进球数</td>
							<td class="w-100">暂未开放</td>
						</tr>
					</table>
					<div class="biaoti"></div>
					<table class="bqc" v-if='bf.betNum3'>
						<tr>
							<td rowspan='3' class="td2">半全场</td>
							<td  :class="{ 'el-yellow': bf.chooseType3[0] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType3',0,'bqc','胜-胜',bf.betNum3[0])">胜-胜<span>{{bf.betNum3[0]}}</span></td>
							<td :class="{ 'el-yellow': bf.chooseType3[1] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType3',1,'bqc','胜-平',bf.betNum3[1])">胜-平<span>{{bf.betNum3[1]}}</span></td>
							<td :class="{ 'el-yellow': bf.chooseType3[2] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType3',2,'bqc','胜-负',bf.betNum3[2])">胜-负<span>{{bf.betNum3[2]}}</span></td>
						</tr>
						<tr>
							<td class='fs-we' :class="{ 'el-yellow': bf.chooseType3[3] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType3',3,'bqc','平-胜',bf.betNum3[3])">平-胜<span>{{bf.betNum3[3]}}</span></td>
							<td :class="{ 'el-yellow': bf.chooseType3[4] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType3',4,'bqc','平-平',bf.betNum3[4])">平-平<span>{{bf.betNum3[4]}}</span></td>
							<td :class="{ 'el-yellow': bf.chooseType3[5] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType3',5,'bqc','平-负',bf.betNum3[5])">平-负<span>{{bf.betNum3[5]}}</span></td>
						</tr>
						<tr>
							<td class='fs-we' :class="{ 'el-yellow': bf.chooseType3[6] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType3',6,'bqc','负-胜',bf.betNum3[6])">负-胜<span>{{bf.betNum3[6]}}</span></td>
							<td :class="{ 'el-yellow': bf.chooseType3[7] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType3',7,'bqc','负-平',bf.betNum3[7])">负-平<span>{{bf.betNum3[7]}}</span></td>
							<td :class="{ 'el-yellow': bf.chooseType3[8] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType3',8,'bqc','负-负',bf.betNum3[8])">负-负<span>{{bf.betNum3[8]}}</span></td>
						</tr>
					</table>
					<table class="bqc" v-else>
						<tr>
							<td rowspan='3' class="td2">半全场</td>
							<td class="w-100">暂未开放</td>
						</tr>
					</table>
					<div class="biaoti"></div>
					<table  class="bf" v-if='bf.betNum5'>
						<tr>
							<td rowspan='5' class="td1">比分</td>
							<td  class='fs-we' :class="{ 'el-yellow':  bf.chooseType5[0] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',0,'bf','1:0',bf.betNum5[1])">1:0<span>{{bf.betNum5[1]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType5[1] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',1,'bf','2:0',bf.betNum5[2])">2:0<span>{{bf.betNum5[2]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType5[2] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',2,'bf','2:1',bf.betNum5[3])">2:1<span>{{bf.betNum5[3]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType5[3] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',3,'bf','3:0',bf.betNum5[4])">3:0<span>{{bf.betNum5[4]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType5[4] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',4,'bf','3:1',bf.betNum5[5])">3:1<span>{{bf.betNum5[5]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType5[5] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',5,'bf','3:2',bf.betNum5[6])">3:2<span>{{bf.betNum5[6]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType5[6] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',6,'bf','4:0',bf.betNum5[7])">4:0<span>{{bf.betNum5[7]|AddZeorMoWei}}</span></td>
						</tr>
						<tr>
							<td  class='fs-we' :class="{ 'el-yellow':  bf.chooseType5[7] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',7,'bf','4:1',bf.betNum5[8])">4:1<span>{{bf.betNum5[8]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType5[8] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',8,'bf','4:2',bf.betNum5[9])">4:2<span>{{bf.betNum5[9]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType5[9] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',9,'bf','5:0',bf.betNum5[10])">5:0<span>{{bf.betNum5[10]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType5[10] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',10,'bf','5:1',bf.betNum5[11])">5:1<span>{{bf.betNum5[11]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType5[11] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',11,'bf','5:2',bf.betNum5[12])">5:2<span>{{bf.betNum5[12]|AddZeorMoWei}}</span></td>
							<td :class="{ 'el-yellow':  bf.chooseType5[12] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',12,'bf','胜其它',bf.betNum5[0])"
							 colspan="2">胜其它<span>{{bf.betNum5[0]|AddZeorMoWei}}</span></td>
						</tr>
					   <tr>
					   	<td  class='fs-we' :class="{ 'el-yellow':  bf.chooseType5[13] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',13,'bf','0:0',bf.betNum5[14])">0:0<span>{{bf.betNum5[14]|AddZeorMoWei}}</span></td>
					   	<td :class="{ 'el-yellow':  bf.chooseType5[14] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',14,'bf','1:1',bf.betNum5[15])">1:1<span>{{bf.betNum5[15]|AddZeorMoWei}}</span></td>
					   	<td :class="{ 'el-yellow':  bf.chooseType5[15] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',15,'bf','2:2',bf.betNum5[16])">2:2<span>{{bf.betNum5[16]|AddZeorMoWei}}</span></td>
					   	<td :class="{ 'el-yellow':  bf.chooseType5[16] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',16,'bf','3:3',bf.betNum5[17])">3:3<span>{{bf.betNum5[17]|AddZeorMoWei}}</span></td>
					   	<td colspan="3" :class="{ 'el-yellow':  bf.chooseType5[17] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',17,'bf','平其它',bf.betNum5[13])" 
					   	>平其它<span>{{bf.betNum5[13]|AddZeorMoWei}}</span></td>
					   </tr>
					   <tr>
					   	<td  class='fs-we' :class="{ 'el-yellow':  bf.chooseType5[18] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',18,'bf','0:1',bf.betNum5[19])">0:1<span>{{bf.betNum5[19]|AddZeorMoWei}}</span></td>
					   	<td :class="{ 'el-yellow':  bf.chooseType5[19] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',19,'bf','0:2',bf.betNum5[20])">0:2<span>{{bf.betNum5[20]|AddZeorMoWei}}</span></td>
					   	<td :class="{ 'el-yellow':  bf.chooseType5[20] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',20,'bf','1:2',bf.betNum5[21])">1:2<span>{{bf.betNum5[21]|AddZeorMoWei}}</span></td>
					   	<td :class="{ 'el-yellow':  bf.chooseType5[21] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',21,'bf','0:3',bf.betNum5[22])">0:3<span>{{bf.betNum5[22]|AddZeorMoWei}}</span></td>
					   	<td :class="{ 'el-yellow':  bf.chooseType5[22] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',22,'bf','1:3',bf.betNum5[23])">1:3<span>{{bf.betNum5[23]|AddZeorMoWei}}</span></td>
					   	<td :class="{ 'el-yellow':  bf.chooseType5[23] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',23,'bf','2:3',bf.betNum5[24])">2:3<span>{{bf.betNum5[24]|AddZeorMoWei}}</span></td>
					   	<td :class="{ 'el-yellow':  bf.chooseType5[24] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',24,'bf','0:4',bf.betNum5[25])">0:4<span>{{bf.betNum5[25]|AddZeorMoWei}}</span></td>
					   </tr>
					   <tr>
					   	
					   	<td  class='fs-we' :class="{ 'el-yellow':  bf.chooseType5[25] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',25,'bf','1:4',bf.betNum5[26])">1:4<span>{{bf.betNum5[26]|AddZeorMoWei}}</span></td>
					   	<td :class="{ 'el-yellow':  bf.chooseType5[26] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',26,'bf','2:4',bf.betNum5[27])">2:4<span>{{bf.betNum5[27]|AddZeorMoWei}}</span></td>
					   	<td :class="{ 'el-yellow':  bf.chooseType5[27] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',27,'bf','0:5',bf.betNum5[28])">0:5<span>{{bf.betNum5[28]|AddZeorMoWei}}</span></td>
					   	<td :class="{ 'el-yellow':  bf.chooseType5[28] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',28,'bf','1:5',bf.betNum5[29])">1:5<span>{{bf.betNum5[29]|AddZeorMoWei}}</span></td>
					   	<td :class="{ 'el-yellow':  bf.chooseType5[29] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',29,'bf','2:5',bf.betNum5[30])">2:5<span>{{bf.betNum5[30]|AddZeorMoWei}}</span></td>
					   	<td :class="{ 'el-yellow':  bf.chooseType5[30] }" @click="selectJJC_hhgg(bfcindex,bfrindex,'chooseType5',30,'bf','负其它',bf.betNum5[18])"
					   	 colspan="2">负其它<span>{{bf.betNum5[18]|AddZeorMoWei}}</span></td>
					   </tr>
					</table>
					<table v-else>
						<tr>
							<td class="td1" rowspan="2">比分</td>
							<td class="w-100">暂未开放</td>
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
		getSession,
		setSession,
		animation
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
				matches: '', //数据
				shaixuanmatches: '',
				add: 0,
				days: [],
				nomatches: false,
				saixunList: [],
				keDianJi: false,
				completed: false,
				completed2: false,
				byValueRqspf: [], //让球胜平负 比分 半全场 一场制胜 胜平负 进球数 二选一 传值数组
				PopupArr: {
					Popupbqc: false,
					Popupbf: false,
					Popuphhgg: false,
					Popupdggp: false,
				},
				closetypes: [], ////比分 半全场选中状态
				chooseQr: '', //单关，混合投注 上一次选择的玩法
				hhAndDg: [], //单关，混合投注 投注项的数据
				indexAdd: '', //单关，混合投注 上一次选择的玩法下标
				Type1: '', //单关，混合投注 上一次选择的玩法为胜平负
				Type2: '', //单关，混合投注 上一次选择的玩法为让球胜平负
				closetypes3: [], ////单关，混合投注选中状态
				closetypes4: [], ////单关，混合投注选中状态
				closetypes5: [], ////单关，混合投注选中状态
				byValueHhgg: [], //单关，混合投注  传值数组;
				keyes: '',
				topStatus: ''
			};
		},

		created() {
			// 			this.$ajax.interceptors.request.eject(requestInterceptors);
			// 			this.$ajax.interceptors.response.eject(responseInterceptors);
			
			let playType = this.$route.query.play;
			if (getSession('HHGG')) {
				this.matches = getSession('HHGG');
				// this.keDianJi=true;
				this.completed= true;
				this.completed2= true;
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
					this.getMatches('HHGG');
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
					that.completed = false;
					that.completed2 = false;
					that.getMatches('HHGG');
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
					playType = 'HHGG'
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
								if (!getSession('HHGG')) {
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
								phone.$emit('saixunList', objects)
								phone.$emit('add', add);
								if (!getSession('shaixuan')) {
									setSession('shaixuan', arr)
								}
								// this.completed=true;
								this.getMatchSPs('SPF', matches, 1, 'HHGG'); //单关 混合过关 使用
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
					playType = 'HHGG'
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
								if (num == 1 && classify == 'HHGG') {
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
								let hhBets = JSON.parse(matchSPs[n].content).sp;
								for (var sr = 0; sr < hhBets.length; sr++) {
									if (hhBets[sr] * 1 == 0) {
										hhBets[sr] = '--';
									}

								}
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
							}
						}
					}
				}
				// console.log(JSON.stringify(matches[3]));
				if (classify == 'HHGG' && num !== 5) {
					let arrmat = matches;
					if (!getSession('HHGG')) {
						this.matches = JSON.parse(JSON.stringify(arrmat));
					}
					if (num == 1) {
						this.completed = true;
					} else if (num == 2) {
						this.completed2 = true;
					}
					return matches;

				} else {
					let arrmat = matches;
					this.matches = JSON.parse(JSON.stringify(matches)).concat([]);
					console.log(this.matches);
					setSession('HHGG', this.matches)
					this.shaixuanmatches = JSON.parse(JSON.stringify(matches)); //matches数据存起来
					// console.log(JSON.stringify(matches));
					this.keDianJi = true;
					Indicator.close();
					let array = getSession('arr');
					if (array) {
						let lengths = array.length;
						this.hhAndDg = array;
						phone.$emit('lengths', lengths);
						let matches = this.matches;
						for (let x = 0; x < matches.length; x++) {
							for (let y = 0; y < matches[x].matchList.length; y++) {
								for (let i = 0; i < array.length; i++) {
									if (matches[x].matchList[y].matchKey == array[i].matchKey) {
										var blo = false;
										if (matches[x].matchList[y].chooseType1 && array[i].chooseType1) {
											matches[x].matchList[y].chooseType1 = array[i].chooseType1;

										}
										if (matches[x].matchList[y].chooseType2 && array[i].chooseType2) {
											matches[x].matchList[y].chooseType2 = array[i].chooseType2;

										}
										if (matches[x].matchList[y].chooseType3 && array[i].chooseType3) {
											matches[x].matchList[y].chooseType3 = array[i].chooseType3;

										}
										if (matches[x].matchList[y].chooseType4 && array[i].chooseType4) {
											matches[x].matchList[y].chooseType4 = array[i].chooseType4;

										}
										if (matches[x].matchList[y].chooseType5 && array[i].chooseType5) {
											matches[x].matchList[y].chooseType5 = array[i].chooseType5;
										}
										if (array[i].chooseType3) {
											for (var a = 0; a < array[i].chooseType3.length; a++) {
												if (array[i].chooseType3[a]) {
													blo = true;
												}
											}
										}
										if (array[i].chooseType4) {
											for (var b = 0; b < array[i].chooseType4.length; b++) {
												if (array[i].chooseType4[b]) {
													blo = true;
												}
											}
										}
										if (array[i].chooseType5) {
											for (var c = 0; c < array[i].chooseType5.length; c++) {
												if (array[i].chooseType5[c]) {
													blo = true;
												}
											}
										}

										if (blo) {
											matches[x].matchList[y].moreType = true;
										} else {
											matches[x].matchList[y].moreType = false;
										}
									}
								}
							}
						}
					}
					// hideLoading();
				}
			},
			showPopup: function(key, cindex, rindex) {
				if (this.keDianJi == false) {
					return false
				}
				this.keyes = ''; //清楚上次选择
				this.bfcindex = cindex; //将下标存起来
				this.bfrindex = rindex; //将下标存起来
				//this.bfchoose = JSON.parse(JSON.stringify(this.matches[cindex].matchList[rindex].chooseBet)); //选择投注内容初始化使其等于上一次选择的内容，若无则为空
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
									Toast('一场比赛中，只允许选择一个玩法进行过关!');
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
				let arrSession = getSession('arr');
				console.log(this.matches[cindex].matchList[rindex].matchKey);
				if (arrSession) {
					for (let i = 0; i < arrSession.length; i++) {
						if (arrSession[i].matchKey == this.matches[cindex].matchList[rindex].matchKey) {
							this.keyes = arrSession[i]
						}
					}
				}
				this.PopupArr[key] = true; //投注内容显示
				var dom = document.querySelector('.banqc_cont')
				animation(dom, 'bottom', 0)
			},
			hidePopup: function(key) {
				this.bf.chooseType3 = JSON.parse(JSON.stringify(this.closetypes3)) //还原选中项状态
				this.bf.chooseType4 = JSON.parse(JSON.stringify(this.closetypes4)) //还原选中项状态
				this.bf.chooseType5 = JSON.parse(JSON.stringify(this.closetypes5)) //还原选中项状态
				this.PopupArr[key] = false //隐藏投注框
				let dom = document.querySelector('.banqc_cont');
				let bottomDomInitial = window.getComputedStyle(dom).height.replace('px', '') * 1 * -1;
				animation(dom, 'bottom', bottomDomInitial)
			},
			selectJJC_hhgg: function(cidx, idx, key, num, type, betty, betNum) {
				if (this.keDianJi == false) {
					return false
				}
				var Type1, Type2, Type3, Type4, Type5;
				var chooseType1 = [],
					chooseType2 = [],
					chooseType3 = [],
					chooseType4 = [],
					chooseType5 = [],
					chooseType1 = this.matches[cidx].matchList[idx]['chooseType1'];
				chooseType2 = this.matches[cidx].matchList[idx]['chooseType2'];
				chooseType3 = this.matches[cidx].matchList[idx]['chooseType3'];
				chooseType4 = this.matches[cidx].matchList[idx]['chooseType4'];
				chooseType5 = this.matches[cidx].matchList[idx]['chooseType5'];
				if (chooseType1) {
					for (var i = 0; i < chooseType1.length; i++) {
						if (chooseType1[i] == true) {
							Type1 = 'chooseType1';
							this.Type1 = Type1;
							// this.matches[cidx].matchList[idx]['chooseType1'][0]=
						}
					}
				}
				if (chooseType2) {
					for (var i = 0; i < chooseType2.length; i++) {
						if (chooseType2[i] == true) {
							Type2 = 'chooseType2';

						}
					}
				}
				if (chooseType3) {
					for (var i = 0; i < chooseType3.length; i++) {
						if (chooseType3[i] == true) {
							Type3 = 'chooseType3';
						}
					}
				}
				if (chooseType4) {
					for (var i = 0; i < chooseType4.length; i++) {
						if (chooseType4[i] == true) {
							Type4 = 'chooseType4';
						}
					}
				}
				if (chooseType5) {
					for (var i = 0; i < chooseType5.length; i++) {
						if (chooseType5[i] == true) {
							Type5 = 'chooseType5';
						}
					}
				}
				if (key == 'chooseType1') {
					if (Type2 || Type3 || Type4 || Type5) {
						Toast('一场比赛中，只允许选择一个玩法进行过关!');
						return
					}
				} else if (key == 'chooseType2') {
					if (Type1 || Type3 || Type4 || Type5) {
						Toast('一场比赛中，只允许选择一个玩法进行过关!');
						return
					}
				} else if (key == 'chooseType3') {
					if (Type1 || Type2 || Type4 || Type5) {
						Toast('一场比赛中，只允许选择一个玩法进行过关!');
						return
					}
				} else if (key == 'chooseType4') {
					if (Type1 || Type2 || Type3 || Type5) {
						Toast('一场比赛中，只允许选择一个玩法进行过关!');
						return
					}
				} else if (key == 'chooseType5') {
					if (Type1 || Type2 || Type3 || Type4) {
						Toast('一场比赛中，只允许选择一个玩法进行过关!');
						return
					}
				}
				var matchList = this.matches[cidx].matchList[idx];
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
				
				if (matchList[key][num]) {
					this.$set(matchList[key], num, false);


				} else {
					this.$set(matchList[key], num, true);

				}
				var keys = new Object();
				keys['weekStr'] = matchList.weekStr;
				keys['lineId'] = matchList.lineId;
				keys['periodId'] = matchList.periodId;
				keys['dan'] = false;
				keys['matchKey'] = matchList.matchKey;
				keys['gameName'] = matchList.gameName;
				keys['stopBuyTime'] = matchList.stopBuyTime;
				keys['homeTeamName'] = matchList.homeTeamName;
				keys['guestTeamName'] = matchList.guestTeamName;
				var isclosse = false;
				if (type == 'spf') {
					keys['betType1'] = matchList.betType1;
					keys['type'] = type;
					keys['betNum1'] = matchList.betNum1;
					keys['chooseType1'] = matchList.chooseType1;
					for (var a = 0; a < matchList.chooseType1.length; a++) {
						if (matchList.chooseType1[a]) {
							isclosse = true;
						}
					}
				} else if (type == 'rqspf') {
					keys['betType2'] = matchList.betType2;
					keys['betNum2'] = matchList.betNum2;
					keys['handicap'] = matchList.handicap;
					keys['type'] = type;
					keys['chooseType2'] = matchList.chooseType2;
					for (var b = 0; b < matchList.chooseType2.length; b++) {
						if (matchList.chooseType2[b]) {
							isclosse = true;
						}
					}
				} else if (type == 'bqc') {
					keys['betType3'] = matchList.betType3;
					keys['betNum3'] = matchList.betNum3;
					keys['type'] = type;
					keys['chooseType3'] = matchList.chooseType3;
					this.keyes = keys;
				} else if (type == 'jqs') {

					keys['betType4'] = matchList.betType4;
					keys['betNum4'] = matchList.betNum4;
					keys['type'] = type;
					keys['chooseType4'] = matchList.chooseType4;
					this.keyes = keys;
				} else if (type == 'bf') {
					keys['betType5'] = matchList.betType5;
					keys['betNum5'] = matchList.betNum5;
					keys['type'] = type;
					keys['chooseType5'] = matchList.chooseType5;
					this.keyes = keys;
				}
				if (type == 'spf' || type == 'rqspf') {
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
						}
					} else {
						var shanChuId = -1;
						for (var h = 0; h < this.hhAndDg.length; h++) {
							if (this.hhAndDg[h].matchKey == keys.matchKey) {
								shanChuId = h
							}

						}
						if (shanChuId !== -1) {
							this.hhAndDg.splice(shanChuId, 1)
						}
					};
					var lengths = this.hhAndDg.length;
					setSession('arr', this.hhAndDg);
					if (lengths == 0) {
						sessionStorage.removeItem('arr')
					}
					phone.$emit('lengths', lengths);

					// console.log(JSON.stringify(this.hhAndDg));

				}
			},
			confirmChoice: function(key) {
				var cindex = this.bfcindex; //取下标
				var rindex = this.bfrindex; //取下标
				//this.matches[cindex].matchList[rindex].chooseBet = JSON.parse(JSON.stringify(this.bfchoose)); //将选中内容赋给外面的数组  进行渲染
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
						console.log(keys.matchKey);
						console.log(matchList.matchKey);
						console.log(keys.matchKey == matchList.matchKey);
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


						};
						if (shanChuId !== -1) {
							this.hhAndDg.splice(shanChuId, 1)
						}
						matchList.moreType = false;
					}
					var lengths = this.hhAndDg.length;
					setSession('arr', this.hhAndDg);
					if (lengths == 0) {
						sessionStorage.removeItem('arr')
					}
					phone.$emit('lengths', lengths);
					console.log(JSON.stringify(this.hhAndDg));
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
							keys['betType'] = ['1:0', '2:0', '2:1', '3:0', '3:1', '3:2', '4:0', '4:1', '4:2', '5:0', '5:1', '5:2', '胜其它',
								'0:0', '1:1', '2:2', '3:3', '平其它', '0:1', '0:2', '1:2', '0:3', '1:3', '2:3', '0:4', '1:4', '2:4', '0:5',
								'1:5', '2:5', '负其它'
							]
						} else if (key == 'Popupbqc') {
							keys['betType'] = ['胜-胜', '胜-平', '胜-负', '平-胜', '平-平', '平-负', '负-胜', '负-平', '负-负']
						}
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
					var lengths = byValueRqspf.length;
					setSession('arr', byValueRqspf);
					if (lengths == 0) {
						sessionStorage.removeItem('arr')
					}
					phone.$emit('lengths', lengths);
					console.log(JSON.stringify(byValueRqspf));
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
</style>
