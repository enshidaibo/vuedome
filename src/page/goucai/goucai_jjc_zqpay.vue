<template>
	<div>
		<!-- 		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="closeWins()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title" style="text-overflow: inherit;left: 3rem;right:4.5rem">竞彩足球{{playNames}}</div>
			<div class="fgr hm_top" @click="open_hemai()">
				<span><img src="../../assets/goucai/jjc/icon_flagre.png" /></span>
				<span>发起合买</span>
			</div>
		</header> -->
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" tapmode @click="closeWins()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div>
				<div class="aui-title" tapmode>竞彩足球 </div>
			</div>
			<div class="aui-pull-right aui-btn top-more" @click="open_hemai()" tapmode>
				发起合买
			</div>
		</header>
		<div class="jjc_bjdcpay" id="jjc_zp" v-if='arr'>
			<!-- 付款页面头部 -->
			<div class="jjcpay_head" v-if='arr'>
				<p><span>已选{{arr.length}}场</span> <span class="jiez">{{arr[0].stopBuyTime|capitalize(1)}}截止</span></p>
				<!-- <p>已选<span>{{arr.length}}</span>场 投注截止：<span>{{arr[0].stopBuyTime|capitalize(1)}}</span></p> -->
			</div>

			<!-- 让球胜平负 -->
			<div class="main jjc_zqrqspf_pay" id="pay_rqspf" v-if='payid=="RQSPF"'>
				<template v-for="(item,index) in arr">
					<div class="con">
						<div class="titl">
							<p class="flr p1">{{item.weekStr}}{{item.lineId|AddZeorpad(3)}} {{item.gameName}} <span>{{item.stopBuyTime|capitalize(1)}}</span></p>
							<p class="fgr p2"><span>(主)</span> {{item.homeTeamName}} vs {{item.guestTeamName}} <span>(客)</span>
							</p>
						</div>
						<div class="battle">
							<div class="close flr" @click="deleteList(index,'RQSPF')"></div>
							<div class="battle_shel fgr">
								<ul>
									<li v-if='item.handicap>0' class="c-red"><span>主</span><br /><span>+{{item.handicap}}</span></li>
									<li v-else-if='item.handicap==0' class="c-hui"><span>主</span><br /><span>{{item.handicap}}</span></li>
									<li v-else><span>主</span><br /><span>{{item.handicap}}</span></li>
									<li :class="{ 'active': item.soddsType }" @click="modifyBetting(index,'soddsType','RQSPF',item.sodds)"><span>{{item.homeTeamName}}</span><br /><span>胜{{item.sodds}}</span></li>
									<li :class="{ 'active': item.poddsType }" @click="modifyBetting(index,'poddsType','RQSPF',item.podds)"><span>VS</span><br /><span>平{{item.podds}}</span></li>
									<li :class="{ 'active': item.foddsType }" @click="modifyBetting(index,'foddsType','RQSPF',item.fodds)"><span>{{item.guestTeamName}}</span><br /><span>负{{item.fodds}}</span></li>
									<li class="dan" :class="{ 'active': item.dan }" @click="xuanDan(index,'RQSPF')">胆</li>
								</ul>
							</div>
						</div>
					</div>
				</template>
				<div class="add_ss" @click="addList()">
					<p>添加/编辑赛事</p>
				</div>
			</div>
			<!-- 进球数 -->
			<div class="main jjc_zqjqs_pay" id="pay_jqs" v-if='payid=="JQS"'>
				<template v-for="(item,index) in arr">
					<div class="con">
						<div class="titl">
							<p class="flr p1">{{item.weekStr}}{{item.lineId|AddZeorpad(3)}} {{item.gameName}} <span>{{item.stopBuyTime|capitalize(1)}}</span></p>
							<p class="fgr p2"><span>(主)</span> {{item.homeTeamName}} vs {{item.guestTeamName}} <span>(客)</span>
							</p>
						</div>
						<div class="battle">
							<div class="close flr" @click="deleteList(index,'JQS')"></div>
							<div class="battle_shel fgr">
								<ul>
									<li class="dan" :class="{ 'active': item.dan }" @click="xuanDan(index,'JQS')">胆</li>
									<li :class="{ 'active': item.ctype0 }" @click="modifyBetting(index,'ctype0','JQS',item.goalBet0)"><span>0球</span><br /><span>{{item.goalBet0}}</span></li>
									<li :class="{ 'active': item.ctype1 }" @click="modifyBetting(index,'ctype1','JQS',item.goalBet1)"><span>1球</span><br /><span>{{item.goalBet1}}</span></li>
									<li :class="{ 'active': item.ctype2 }" @click="modifyBetting(index,'ctype2','JQS',item.goalBet2)"><span>2球</span><br /><span>{{item.goalBet2}}</span></li>
									<li :class="{ 'active': item.ctype3 }" @click="modifyBetting(index,'ctype3','JQS',item.goalBet3)"><span>3球</span><br /><span>{{item.goalBet3}}</span></li>
									<li :class="{ 'active': item.ctype4 }" @click="modifyBetting(index,'ctype4','JQS',item.goalBet4)"><span>4球</span><br /><span>{{item.goalBet4}}</span></li>
									<li :class="{ 'active': item.ctype5 }" @click="modifyBetting(index,'ctype5','JQS',item.goalBet5)"><span>5球</span><br /><span>{{item.goalBet5}}</span></li>
									<li :class="{ 'active': item.ctype6 }" @click="modifyBetting(index,'ctype6','JQS',item.goalBet6)"><span>6球</span><br /><span>{{item.goalBet6}}</span></li>
									<li :class="{ 'active': item.ctype7 }" @click="modifyBetting(index,'ctype7','JQS',item.goalBet7)"><span>7+球</span><br /><span>{{item.goalBet7}}</span></li>
								</ul>
							</div>
						</div>
					</div>
				</template>
				<div class="add_ss" @click="addList()" tapmode>
					<p>添加/编辑赛事</p>
				</div>
			</div>
			<!-- 半全场 -->
			<div class="main jjc_zqbqc_pay" id="pay_bqc" v-if='payid=="BQQ"'>
				<template v-for="(item,index) in arr">
					<div class="con">
						<div class="titl">
							<p class="flr p1">{{item.weekStr}}{{item.lineId|AddZeorpad(3)}} {{item.gameName}} <span>{{item.stopBuyTime|capitalize(1)}}</span></p>
							<p class="fgr p2"><span>(主)</span> {{item.homeTeamName}} vs {{item.guestTeamName}} <span>(客)</span>
							</p>
						</div>
						<div class="battle">
							<div class="close flr zqbqc_close" @click="deleteList(index,'BQQ')"></div>
							<div class="battle_shel fgr">
								<ul class="ul_ts" id="zqbqc_ul">
									<li class="dan zqbqc_dan" :class="{ 'active': item.dan }" @click="xuanDan(index,'BQQ')">胆</li>
									<li v-for='(d,i) in item.betType' :class="{ 'dis-no': !item.chooseType[i] }"><span>{{d}}</span><br /><span>{{item.erXY[i]}}</span></li>
								</ul>
							</div>
						</div>
					</div>
				</template>
				<div class="add_ss" @click="addList()" tapmode>
					<p>添加/编辑赛事</p>
				</div>
			</div>
			<!-- 比分 -->
			<div class="main jjc_zqbqc_pay" id="pay_bf" v-if='payid=="BF"'>
				<template v-for="(item,index) in arr">
					<div class="con">
						<div class="titl">
							<p class="flr p1">{{item.weekStr}}{{item.lineId|AddZeorpad(3)}} {{item.gameName}} <span>{{item.stopBuyTime|capitalize(1)}}</span></p>
							<p class="fgr p2"><span>(主)</span> {{item.homeTeamName}} vs {{item.guestTeamName}} <span>(客)</span>
							</p>
						</div>
						<div class="battle">
							<div class="close flr zqbf_close" @click="deleteList(index,'BF')"></div>
							<div class="battle_shel fgr">
								<ul class="ul_ts" id="zqbf_ul">
									<li class="dan zqbf_dan" :class="{ 'active': item.dan }" @click="xuanDan(index,'BF')">胆</li>
									<li v-for='(d,i) in item.betType' :class="{ 'dis-no': !item.chooseType[i] }"><span>{{d}}</span><br /><span
										 v-if='i==12'>{{item.erXY[0]}}</span><span v-else-if='i==17'>{{item.erXY[13]}}</span><span v-else-if='i==30'>{{item.erXY[18]}}</span><span
										 v-else>{{item.erXY[i+1]}}</span></li>
								</ul>
							</div>
						</div>
					</div>
				</template>
				<div class="add_ss" @click="addList()" tapmode>
					<p>添加/编辑赛事</p>
				</div>
			</div>
			<!-- 混合过关 -->
			<div class="main jjc_zqhegg_pay" id="pay_hhgg" v-if='payid=="HHGG"'>
				<template v-for="(item,index) in arr">
					<div class="con">
						<div class="titl">
							<p class="flr p1">{{item.weekStr}}{{item.lineId|AddZeorpad(3)}} {{item.gameName}} <span>{{item.stopBuyTime|capitalize(1)}}</span></p>
							<p class="fgr p2"><span>(主)</span> {{item.homeTeamName}} vs {{item.guestTeamName}} <span>(客)</span>
							</p>
						</div>
						<div class="battle">
							<div class="close flr zqhhgg_close" @click="deleteList(index,'HHGG')"></div>
							<div class="battle_shel fgr">
								<ul class="ul_ts" id="zqhhgg_ul" v-if='item.type=="bf"'>
									<li class="dan zqhhgg_dan" :class="{ 'active': item.dan }" @click="xuanDan(index,'HHGG')">胆</li>
									<li v-for='(d,i) in item.betType5' :class="{ 'dis-no': !item.chooseType5[i] }">
										<p class="red">比分</p>
										<p><span>{{d}}</span><br /><span v-if='i==12'>{{item.betNum5[0]}}</span><span v-else-if='i==17'>{{item.betNum5[13]}}</span><span
											 v-else-if='i==30'>{{item.betNum5[18]}}</span><span v-else>{{item.betNum5[i+1]}}</span></p>
									</li>
								</ul>
								<ul class="ul_ts" id="zqhhgg_ul" v-else-if='item.type=="jqs"'>
									<li class="dan zqhhgg_dan" :class="{ 'active': item.dan }" @click="xuanDan(index,'HHGG')">胆</li>
									<li v-for='(d,i) in item.betType4' :class="{ 'dis-no': !item.chooseType4[i] }">
										<p class="blue">进球数</p>
										<p><span>{{d}}</span><br /><span>{{item.betNum4[i]}}</span></p>
									</li>
								</ul>
								<ul class="ul_ts" id="zqhhgg_ul" v-else-if='item.type=="bqc"'>
									<li class="dan zqhhgg_dan" :class="{ 'active': item.dan }" @click="xuanDan(index,'HHGG')">胆</li>
									<li v-for='(d,i) in item.betType3' :class="{ 'dis-no': !item.chooseType3[i] }">
										<p class="purple">半全场</p>
										<p><span>{{d}}</span><br /><span>{{item.betNum3[i]}}</span></p>
									</li>
								</ul>
								<ul class="ul_ts" id="zqhhgg_ul" v-else-if='item.type=="rqspf"'>
									<li class="dan zqhhgg_dan" :class="{ 'active': item.dan }" @click="xuanDan(index,'HHGG')">胆</li>
									<li v-for='(d,i) in item.betType2' :class="{ 'dis-no': !item.chooseType2[i] }">
										<p class="green c-red" v-if='item.handicap>0'>主 +{{item.handicap}}</p>
										<p class="c-hui green" v-else-if='item.handicap==0'>主 {{item.handicap}}</p>
										<p class="green" v-else>主 {{item.handicap}}</p>
										<p><span>{{d}}</span><br /><span>{{item.betNum2[i]}}</span></p>
									</li>
								</ul>
								<ul class="ul_ts" id="zqhhgg_ul" v-else-if='item.type=="spf"'>
									<li class="dan zqhhgg_dan" :class="{ 'active': item.dan }" @click="xuanDan(index,'HHGG')">胆</li>
									<li v-for='(d,i) in item.betType1' :class="{ 'dis-no': !item.chooseType1[i] }">
										<p class="grey c-grey">非让分</p>
										<p><span>{{d}}</span><br /><span>{{item.betNum1[i]}}</span></p>
									</li>
								</ul>
							</div>
						</div>
					</div>

				</template>
				<div class="add_ss" @click="addList()" tapmode>
					<p>添加/编辑赛事</p>
				</div>
			</div>
			<!-- 一场制胜 -->
			<div class="main jjc_zqyczs_pay" id="pay_yczs" v-if='payid=="YCZS"'>
				<template v-for="(item,index) in arr">
					<div class="con">
						<div class="titl">
							<p class="flr p1">{{item.weekStr}}{{item.lineId|AddZeorpad(3)}} {{item.gameName}} <span>{{item.stopBuyTime|capitalize(1)}}</span></p>
							<p class="fgr p2"><span>(主)</span> {{item.homeTeamName}} vs {{item.guestTeamName}} <span>(客)</span>
							</p>
						</div>
						<div class="battle">
							<div class="close flr" @click="deleteList(index,'YCZS')"></div>
							<div class="battle_shel fgr">
								<ul>
									<li class="zero">0</li>
									<li :class="{ 'active': item.soddsType }" @click="modifyBetting(index,'soddsType','YCZS',1,item.sodds)"><span>{{item.homeTeamName}}</span><br /><span>胜{{item.sodds}}</span></li>
									<li :class="{ 'active': item.poddsType }" @click="modifyBetting(index,'poddsType','YCZS',1,item.podds)"><span>VS</span><br /><span>平{{item.podds}}</span></li>
									<li :class="{ 'active': item.foddsType }" @click="modifyBetting(index,'foddsType','YCZS',1,item.fodds)"><span>{{item.guestTeamName}}</span><br /><span>负{{item.fodds}}</span></li>
								</ul>
								<ul>
									<li v-if='item.handicap>0' class="c-red">主 +{{item.handicap}}</li>
									<li v-else-if='item.handicap==0' class="c-hui">主 {{item.handicap}}</li>
									<li v-else class="green">主 {{item.handicap}}</li>
									<li :class="{ 'active': item.soddsTypeY }" @click="modifyBetting(index,'soddsTypeY','YCZS',2,item.soddsY)"><span>{{item.homeTeamName}}</span><br /><span>胜{{item.soddsY}}</span></li>
									<li :class="{ 'active': item.poddsTypeY }" @click="modifyBetting(index,'poddsTypeY','YCZS',2,item.poddsY)"><span>VS</span><br /><span>平{{item.poddsY}}</span></li>
									<li :class="{ 'active': item.foddsTypeY }" @click="modifyBetting(index,'foddsTypeY','YCZS',2,item.foddsY)"><span>{{item.guestTeamName}}</span><br /><span>负{{item.foddsY}}</span></li>
								</ul>
							</div>
						</div>
						<div class="details">
							<div class="tt" @click="showPpxq(index)"><span>匹配详情</span></div>
							<div class="text" v-if='item.showPpxq'>
								<template v-for='(l,ind) in piPei[index]'>
									<div v-if='l'>
										<div class="titl">
											<p class="flr p1">{{parr[index].weekStr}}{{parr[index].lineId|AddZeorpad(3)}} {{parr[index].gameName}} <span>{{parr[index].stopBuyTime|capitalize(1)}}</span></p>
											<p class="fgr p2"><span>(主)</span> {{parr[index].homeTeamName}} vs {{parr[index].guestTeamName}} <span>(客)</span>
											</p>
										</div>
										<div class="content">
											<ul v-if='parr[index].handicap<0'>
												<li><span>玩法</span><span>投注(赔率)</span><span>倍数</span><span>理论奖金</span></li>
												<li><span class="wan">让球胜平负<br />({{parr[index].handicap}})</span><span>让球负 [{{parr[index].foddsY}}]</span><span>{{item[l]|bonusOptimiation(parr[index].foddsY,parr[index].sodds,1)}}</span><span>$
														{{item[l]|bonusOptimiation(parr[index].foddsY,parr[index].sodds,1)|theory(parr[index].foddsY,item[l])}}</span></li>
												<li><span>胜平负</span><span>胜 [{{parr[index].sodds}}]</span><span>{{item[l]|bonusOptimiation(parr[index].foddsY,parr[index].sodds,2)}}</span><span>$
														{{item[l]|bonusOptimiation(parr[index].foddsY,parr[index].sodds,2)|theory(parr[index].sodds,item[l])}}</span></li>
											</ul>
											<ul v-else-if='parr[index].handicap>0'>
												<li><span>玩法</span><span>投注(赔率)</span><span>倍数</span><span>理论奖金</span></li>
												<li><span class="wan">让球胜平负<br />({{parr[index].handicap}})</span><span>让球胜 [{{parr[index].soddsY}}]</span><span>{{item[l]|bonusOptimiation(parr[index].soddsY,parr[index].fodds,1)}}</span><span>$
														{{item[l]|bonusOptimiation(parr[index].soddsY,parr[index].fodds,1)|theory(parr[index].soddsY,item[l])}}</span></li>
												<li><span>胜平负</span><span>负 [{{parr[index].fodds}}]</span><span>{{item[l]|bonusOptimiation(parr[index].soddsY,parr[index].fodds,2)}}</span><span>$
														{{item[l]|bonusOptimiation(parr[index].soddsY,parr[index].fodds,2)|theory(parr[index].fodds,item[l])}}</span></li>
											</ul>
										</div>
									</div>
								</template>
							</div>
						</div>
					</div>
				</template>
				<div class="add_ss" @click="addList()" tapmode>
					<p>添加/编辑赛事</p>
				</div>
			</div>
			<!-- 单关固赔1 -->
			<div class="main jjc_zqdggp1_pay" id="pay_dggp1" v-if='payid=="DGGP"'>
				<div class="con" v-for="(item,index) in arr">
					<div class="titl">
						<p class="flr p1">{{item.weekStr}}{{item.lineId|AddZeorpad(3)}} {{item.gameName}} <span>{{item.stopBuyTime|capitalize(1)}}</span></p>
						<p class="fgr p2"><span>(主)</span> {{item.homeTeamName}} vs {{item.guestTeamName}} <span>(客)</span>
						</p>
					</div>
					<div class="battle">
						<div class="close flr zqdggp1_close" @click="deleteList(index,'DGGP')"></div>
						<div class="battle_shel fgr">
							<ul class="ul_ts" id="zqdggp1_ul" v-if='item.type=="bf"'>
								<li class="dan zqdggp1_dan" :class="{ 'active': item.dan }" @click="xuanDan(index,'DGGP')">胆</li>
								<li v-for='(d,i) in item.betType5' :class="{ 'dis-no': !item.chooseType5[i] }">
									<p class="red">比分</p>
									<p><span>{{d}}</span><br /><span v-if='i==12'>{{item.betNum5[0]}}</span><span v-else-if='i==17'>{{item.betNum5[13]}}</span><span
										 v-else-if='i==30'>{{item.betNum5[18]}}</span><span v-else>{{item.betNum5[i+1]}}</span></p>
								</li>
							</ul>
							<ul class="ul_ts" id="zqdggp1_ul" v-else-if='item.type=="jqs"'>
								<li class="dan zqdggp1_dan" :class="{ 'active': item.dan }" @click="xuanDan(index,'DGGP')">胆</li>
								<li v-for='(d,i) in item.betType4' :class="{ 'dis-no': !item.chooseType4[i] }">
									<p class="blue">进球数</p>
									<p><span>{{d}}</span><br /><span>{{item.betNum4[i]}}</span></p>
								</li>
							</ul>
							<ul class="ul_ts" id="zqdggp1_ul" v-else-if='item.type=="bqc"'>
								<li class="dan zqdggp1_dan" :class="{ 'active': item.dan }" @click="xuanDan(index,'DGGP')">胆</li>
								<li v-for='(d,i) in item.betType3' :class="{ 'dis-no': !item.chooseType3[i] }">
									<p class="purple">半全场</p>
									<p><span>{{d}}</span><br /><span>{{item.betNum3[i]}}</span></p>
								</li>
							</ul>
							<ul class="ul_ts" id="zqdggp1_ul" v-else-if='item.type=="rqspf"'>
								<li class="dan zqdggp1_dan" :class="{ 'active': item.dan }" @click="xuanDan(index,'DGGP')">胆</li>
								<li v-for='(d,i) in item.betType2' :class="{ 'dis-no': !item.chooseType2[i] }">
									<p class="green">主 -1</p>
									<p><span>{{d}}</span><br /><span>{{item.betNum2[i]}}</span></p>
								</li>
							</ul>
							<ul class="ul_ts" id="zqdggp1_ul" v-else-if='item.type=="spf"'>
								<li class="dan zqdggp1_dan" :class="{ 'active': item.dan }" @click="xuanDan(index,'DGGP')">胆</li>
								<li v-for='(d,i) in item.betType1' :class="{ 'dis-no': !item.chooseType1[i] }">
									<p class="grey">非让分</p>
									<p><span>{{d}}</span><br /><span>{{item.betNum1[i]}}</span></p>
								</li>
							</ul>

						</div>
					</div>
				</div>

				<div class="add_ss" @click="addList()" tapmode>
					<p>添加/编辑赛事</p>
				</div>
			</div>

			<div class="main jjc_zqexy_pay" id="pay_erxy" v-if='payid=="ERXY"'>
				<div class="con" v-for='(item,index) in arr'>
					<div class="titl">
						<p class="flr p1">{{item.weekStr}}{{item.lineId|AddZeorpad(3)}} {{item.gameName}} <span>{{item.stopBuyTime|capitalize(1)}}</span></p>
						<p class="fgr p2"><span>(主)</span> {{item.homeTeamName}} vs {{item.guestTeamName}} <span>(客)</span>
						</p>
					</div>
					<div class="battle">
						<div class="close flr" @click="deleteList(index,'ERXY')"></div>
						<div class="battle_shel fgr">
							<ul>
								<li class="dan" :class="{ 'active': item.dan }" @click="xuanDan(index,'ERXY')">胆</li>
								<li :class="{ 'active': item.soddsTypeY }" @click="modifyBetting(index,'soddsTypeY','ERXY')"><span>{{item.homeTeamName}}</span><br /><span
									 v-if="item.handicap==1">主不败{{item.erXY[1][0]}}</span><span v-else>主胜{{item.erXY[0][0]}}</span></li>
								<li :class="{ 'active': item.poddsTypeY }" @click="modifyBetting(index,'poddsTypeY','ERXY')"><span>{{item.guestTeamName}}</span><br /><span
									 v-if="item.handicap==1">客胜{{item.erXY[0][2]}}</span><span v-else>客不败{{item.erXY[1][2]}}</span></li>
							</ul>
						</div>
					</div>
				</div>

				<div class="add_ss" @click="addList()" tapmode>
					<p>添加/编辑赛事</p>
				</div>
			</div>
			<!-- 胜平负 -->
			<div class="main jjc_zqspf_pay" id="pay_spf" v-if='payid=="SPF"'>
				<template v-for="(item,index) in arr">
					<div class="con">
						<div class="titl">
							<p class="flr p1">{{item.weekStr}}{{item.lineId|AddZeorpad(3)}} {{item.gameName}} <span>{{item.stopBuyTime|capitalize(1)}}</span></p>
							<p class="fgr p2"><span>(主)</span> {{item.homeTeamName}} vs {{item.guestTeamName}} <span>(客)</span>
							</p>
						</div>
						<div class="battle">
							<div class="close flr" @click="deleteList(index,'SPF')"></div>
							<div class="battle_shel fgr">
								<ul>
									<li :class="{ 'active': item.soddsType }" @click="modifyBetting(index,'soddsType','SPF',item.sodds)"><span>{{item.homeTeamName}}</span><br /><span>胜{{item.sodds}}</span></li>
									<li :class="{ 'active': item.poddsType }" @click="modifyBetting(index,'poddsType','SPF',item.podds)"><span>VS</span><br /><span>平{{item.podds}}</span></li>
									<li :class="{ 'active': item.foddsType }" @click="modifyBetting(index,'foddsType','SPF',item.fodds)"><span>{{item.guestTeamName}}</span><br /><span>负{{item.fodds}}</span></li>
									<li class="dan" :class="{ 'active': item.dan }" @click="xuanDan(index,'SPF')">胆</li>
								</ul>
							</div>
						</div>
					</div>
				</template>
				<div class="add_ss" @click="addList()" tapmode>
					<p>添加/编辑赛事</p>
				</div>
			</div>


			<!-- 底部倍数 -->
			<div class="bottom" v-cloak>
				<div class="agree">
					<div class="check"><b tapmode @click="onUserprotocol"><i :class="[ 'flr' , { 'active': Userprotocol }]"></i></b>
						<p class="flr">我已阅读并同意<span @click="JumpUserprotocol()" tapmode>《委托投注规则》</span></p>
					</div>
				</div>
				<div class="bt_text">
					<div class="flr dataone" v-if='payid=="DGGP"'>单关固赔</div>
					<div class="flr dataone" v-else-if='payid=="YCZS"'>一场制胜</div>

					<div class="flr data" @click="showMasks" v-else>{{cascade}}</div>

					<div class="fgr multiple">
						<div class="jian flr" @click="reduce"></div>
						<div class="beishu flr" @click=" showkeyboard = true ,coverage=true">
							<span>{{ multiple }}</span>倍
						</div>
						<div class="jia flr" @click="increase"></div>
					</div>
				</div>
				<!-- 				<footer>
					<div class="delete flr" @click='deleteAll'></div>
					<div class="total flr">
						<p class="span2">共{{noteNum}}注 {{multiple}}倍<span>{{noteNum*2*multiple}}</span>元</p>
						<p class="p2">预测奖金 <span v-if='payid=="DGGP"'>{{(minbet*multiple).toFixed(2)}} - {{(maxbet*multiple).toFixed(2)}}</span><span
							 v-else-if='payid=="YCZS"'>{{(minTheory*multiple).toFixed(2)}} - {{(maxTheory*multiple).toFixed(2)}}</span><span
							 v-else>{{(minbet*multiple).toFixed(2)}} - {{(maxbet*multiple).toFixed(2)}}</span>元</p>
					</div>
					<div class="pay fgr" @click="pay">付款</div>
				</footer> -->
				<footer>
					<div class="ft_money flr">
						<p>共{{noteNum}}注{{multiple}}倍<span class="rit_tow">{{noteNum*2*multiple}}</span>元</p>

						<p class="p2">预测奖金 <span v-if='payid=="DGGP"'>{{(minbet*multiple).toFixed(2)|tranNumber()}} -
								{{(maxbet*multiple).toFixed(2)|tranNumber()}}</span><span v-else-if='payid=="YCZS"'>{{(minTheory*multiple).toFixed(2)|tranNumber()}}
								- {{(maxTheory*multiple).toFixed(2)|tranNumber()}}</span><span v-else>{{(minbet*multiple).toFixed(2)|tranNumber()}}
								- {{(maxbet*multiple).toFixed(2)|tranNumber()}}</span>元</p>
					</div>
					<div class="ft_btn fgr">
						<div class="flr" tapmode>

						</div>
						<div class="flr" tapmode @click="pay()">付款</div>
					</div>
				</footer>
			</div>
			<!-- 2串1点击弹出窗 -->
			<div v-if="showMask" class="mask" v-cloak>
				<div class="popup_chuan">
					<div class="title">自由过关</div>
					<div class="text">
						<ul v-if='payid=="BF"'>
							<li v-for="(item,index) in Stringnumber" :class="[{ 'active': item.state },{'dis-no':index>(arrLength-1)}]"
							 @click='onStringnumber(index)'>{{ item.name }}</li>
						</ul>
						<ul v-else-if='payid=="BQQ"'>
							<li v-for="(item,index) in Stringnumber" :class="[{ 'active': item.state },{'dis-no':index>(arrLength-1)||index==0}]"
							 @click='onStringnumber(index)' v-if='index<4'>{{ item.name }}</li>
						</ul>
						<ul v-else-if='payid=="HHGG"&&hhgghasbqc'>
							<li v-for="(item,index) in Stringnumber" :class="[{ 'active': item.state },{'dis-no':index>(arrLength-1)||index==0}]"
							 @click='onStringnumber(index)' v-if='index<4'>{{ item.name }}</li>
						</ul>
						<ul v-else>
							<li v-for="(item,index) in Stringnumber" :class="[{ 'active': item.state },{'dis-no':index>(arrLength-1)||index==0}]"
							 @click='onStringnumber(index)'>{{ item.name }}</li>
						</ul>
					</div>
					<div class="qued_btn" @click="StringnumberSure">确定</div>
				</div>
			</div>
			<!-- 模拟数字键盘 -->
			<div v-if="showkeyboard&&arr" class="keyboard" v-cloak>
				<div class="hidekey" @click="closekeyboard"></div>
				<div class="cont-f">
					<div class="bt_text">

						<div class="flr dataone" v-if='payid=="DGGP"'>单关固赔</div>
						<div class="flr dataone" v-else-if='payid=="YCZS"'>一场制胜</div>

						<div class="flr data" @click="showMasks" v-else>{{cascade}}</div>
						<div class="fgr multiple">
							<div class="jian flr" @click="reduce"></div>
							<div class="beishu flr">
								<span>{{ multiple }}</span>倍
							</div>
							<div class="jia flr" @click="increase"></div>
						</div>
					</div>
					<footer>
						<div class="ft_money flr">
							<p>共{{noteNum}}注{{multiple}}倍<span class="rit_tow">{{noteNum*2*multiple}}</span>元</p>

							<p class="p2">预测奖金 <span v-if='payid=="DGGP"'>{{(minbet*multiple).toFixed(2)|tranNumber()}} -
									{{(maxbet*multiple).toFixed(2)|tranNumber()}}</span><span v-else-if='payid=="YCZS"'>{{(minTheory*multiple).toFixed(2)}}
									- {{(maxTheory*multiple).toFixed(2)|tranNumber()}}</span><span v-else>{{(minbet*multiple).toFixed(2)|tranNumber()}}
									- {{(maxbet*multiple).toFixed(2)|tranNumber()}}</span>元</p>
						</div>
						<div class="ft_btn fgr">
							<div class="flr" tapmode>

							</div>
							<div class="flr" tapmode @click="pay()">付款</div>
						</div>
					</footer>
					<div class="Key_li">
						<ul>
							<li @click="keyinputidx('1')">1</li>
							<li @click="keyinputidx('2')">2</li>
							<li @click="keyinputidx('3')">3</li>
							<li @click="keyinputidx('4')">4</li>
							<li @click="keyinputidx('5')">5</li>
							<li @click="keyinputidx('6')">6</li>
							<li @click="keyinputidx('7')">7</li>
							<li @click="keyinputidx('8')">8</li>
							<li @click="keyinputidx('9')">9</li>
							<li @click="keyinputidx('00')">00</li>
							<li @click="keyinputidx('0')">0</li>
							<li class="del" @click="keybackspace"><img src="../../assets/goucai/jjc/biaoqingshanchujian.png" /></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<module-pay :payPopupP='payPopup' :payMoneyP='payMoney' :coinsMoneyP='coinsMoney' :cashMoneyP='cashMoney'
		 :opnenWeixinP='opnenWeixin' :opnenBankopenP='opnenBankopen' :hasHongbaoP='false' :typeName='"竞彩足球"' @payPopupC="payPopupC"
		 @RouteLeaveC='RouteLeaveC' @paybtn='paybtn' @paylogok='paylogok'>
		</module-pay>
		<checkok-nav :logokz='logok' @showbox="showbox"></checkok-nav>
	</div>
</template>

<script>
	var totalArr;
	import phone from "../../js/connector.js";
	import {
		varietymaxPrizeAndCost,
		danmaxPrizeAndCost
	} from "../../js/maxPrizeAndCost.js";
	import {
		getSession,
		setSession,
		getCookie,
		compare,
		getTime
	} from '../../js/common.js';

	import {
		Toast,
		MessageBox
	} from 'mint-ui';
	import checkokNav from '../../common/checkok.vue';
	import modulePay from '../../common/modulepay.vue';
	export default {
		components: {
			checkokNav,
			modulePay
		},
		data() {
			return {
				logok: false,
				arr: '', //数据
				parr: '', //一场制胜匹配数据；
				coverage: true, //键盘第一次唤起
				piPei: [],
				noteNum: '', //注数
				payid: '', //玩法
				cascade: '2串1',
				minbet: '',
				maxbet: '',
				playNames: '让球胜平负',
				maxTheory: 0,
				minTheory: 0,
				arrLength: 0,
				'multiple': 1,
				hhgghasbqc: false,
				'showkeyboard': false,
				'showMask': false,
				'Userprotocol': true,
				'Stringnumber': [{
					'name': '单关固赔',
					'id': 'P1',
					'state': false,
					'num': 'DGGP'
				}, {
					'name': '2串1',
					'id': 'P2_1',
					'state': true,
					'num': 2
				}, {
					'name': '3串1',
					'id': 'P3_1',
					'state': false,
					'num': 3
				}, {
					'name': '4串1',
					'id': 'P4_1',
					'state': false,
					'num': 4
				}, {
					'name': '5串1',
					'id': 'P5_1',
					'state': false,
					'num': 5
				}, {
					'name': '6串1',
					'id': 'P6_1',
					'state': false,
					'num': 6
				}, {
					'name': '7串1',
					'id': 'P7_1',
					'state': false,
					'num': 7
				}, {
					'name': '8串1',
					'id': 'P8_1',
					'state': false,
					'num': 8
				}],
				'lcbList': [{
					"stateArr": {
						"b0": true,
						"b1": false,
						"b2": true,
						"q0": false,
						"q1": false,
						"q2": true,
					}
				}],
				'RouteLeave': false,
				coinsMoney: 0, //红包余额
				cashMoney: 0, //现金余额
				payPopup: false, //红包弹窗
				dianjiChonse: true, //选择红包
				cashdianjiChonse: false, //选择现金
				hongbaoType: false, //红包余额是否充足
				cashType: false, //现金余额是否充足
				opnenWeixin: false, //微信是否开放
				opnenBankopen: false, //银行卡是否开放
				hongbaobianxian: 0,
				payMoney: 0,
			};
		},
		watch: {
			arr: function(newName, oldName) {
				console.log(newName[0].type);
				if (this.payid == 'HHGG') {
					for (var i = 0; i < newName.length; i++) {
						if (newName[i].type == 'bqc') {
							this.hhgghasbqc = true;
							return
						} else {
							this.hhgghasbqc = false;
						}
					}
					console.log(this.hhgghasbqc);
				}
			},
			deep: true
		},
		beforeRouteEnter(to, from, next) {
			if (from.matched.length > 0) {
				var lint = from.matched[0].name + 'pay'
				if (to.name == lint) {
					var arr = getSession('arr');
					if (arr) {
						next();
					} else {
						window.history.go(-1);
					}
				} else {
					next();
				}
			} else {
				next();
			}
		},
		beforeRouteLeave(to, from, next) {
			if (this.RouteLeave || to.name == 'goucai_hemai' || to.name == 'agreement') {
				next()
			} else {
				MessageBox({
					title: '',
					message: '返回后所选注单将不保存',
					showCancelButton: true,
					confirmButtonText: '返回',

				}).then(action => {
					if (action == 'confirm') {
						sessionStorage.removeItem('arr');
						sessionStorage.removeItem('parr');
						next()
					} else {
						next(false)
					}
				})
			}
		},
		created() {
			// 			if(!getSession('arr')){
			// 				return false
			// 			}
			this.playNames = getSession('playTypeName');
			var payid = getSession('play');

			if (payid == 'DGGP') {
				setSession("passTypes", ["P1"]);
				setSession("passTypesnum", ['DGGP']);
			} else if (payid == 'YCZS') {
				setSession("passTypes", ["P1_1"]);
				// setSession("passTypesnum", ['DGGP']);
			} else if (payid == 'BF') {
				setSession("passTypes", ["P1"]);
				this.cascade = '单关固赔'
				this.Stringnumber[0].state = true;
				this.Stringnumber[1].state = false;
				setSession("passTypesnum", ['DGGP']);
			} else {
				setSession("passTypes", ["P2_1"]);
				setSession("passTypesnum", [2]);
			}
			this.payid = payid;
			var parr;
			if (payid == 'YCZS') {
				 
				parr = getSession('parr');
				console.log(parr);
				if (parr) {
					parr = parr.sort(comparess);
				}
console.log(parr);
// 				if (parr.length > 1) {
// 					if (parr[0].paixu == 'a' && parr[1].paixu == 'b') {
// 						var zhuanHuan = parr[0];
// 						parr[0] = parr[1];
// 						parr[1] = zhuanHuan
// 					}
// 				}
// 
				this.parr = parr;
				console.log(this.parr);
			}

			// console.log(app.payid);
			// payshowMain(payid);
			var arr = getSession('arr');
			if (arr) {
				arr = arr.sort(comparess);
			}
			this.arr = arr;
			if (payid == 'YCZS') {
				this.getPiPeiLength();
				this.YCZSJangJin();
			}
			totalArr = [];
			this.jiSuanZhuShu(arr, payid) //注数
			this.getForecast(arr, payid)
			this.getUserInfo();
			this.checkIsWx();
		},

		mounted() {

		},
		updated: function() {
			this.payMoney = this.noteNum * 2 * this.multiple;
			console.log(this.payMoney);
		},
		methods: {
			showbox: function(msg) {
				this.RouteLeave = true;
				this.logok = msg;
			},
			paylogok: function(msg) {
				this.logok = msg;
			},
			payPopupC: function(msg) {
				this.payPopup = msg;
			},
			RouteLeaveC: function(msg) {
				this.RouteLeave = msg;
			},
			moneyTypeC: function(msg) {
				this.moneyType = msg;
			},
			checkIsWx: function() {
				this.$ajax.timeout = 49527; //不要加载状态
				this.$ajax.post('/caipiaoshouye/index.php/home/index/checkIsWx')
					.then(res => {
						this.$ajax.timeout = 50000;
						if (res.data.isopen == 0) {
							this.opnenWeixin = false;
						} else if (res.data.isopen == 1) {
							this.opnenWeixin = true;
						}
						if (res.data.isbankopen == 0) {
							this.opnenBankopen = false;
						} else if (res.data.isbankopen == 1) {
							this.opnenBankopen = true;
						}

					})
					.catch(err => {
						this.$ajax.timeout = 50000;
						console.log(err);
					})
			},
			getUserInfo: function(money, type) {
				let uid = getCookie('newData');
				if (!uid) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
				var userId = uid.userid;
				var data = [];
				data["userId"] = userId;
				data = this.Encrypt({ ...data
				});
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});

				this.$ajax.post('/caipiaoshouye/index.php/home/index/getUserInfo',
						datas
					)
					.then(res => {

						var content = JSON.parse(res.data.content);
						console.log(JSON.stringify(content));
						if (res.data.status != "200") {

							return;
						} else {
							if (content.code == "100000") {
								var cashMoney = content.data.money * 1;
								var coinsMoney = content.data.coinsMoney * 1;
								this.cashMoney = cashMoney;
								this.coinsMoney = coinsMoney;

							} else if (content.code == "201010") {
								Toast("账户已被锁定，请联系客服");
								setCookie('newData', '', '0-S');
								this.$router.push({
									name: 'login'
								})
							}
						}
					})
					.catch(err => {
						console.log(err);
					})

			},
			JumpUserprotocol: function() {
				this.RouteLeave = true;
				this.$router.push({
					name: 'agreement'
				})
			},
			open_hemai: function() {
				this.RouteLeave = true;
				var data = this.setData(this.payid);
				let dataes = this.Qs.stringify({
					data
				});
				var Strings = data['ticketContent'].toString();
				setSession('Strings', Strings)
				sessionStorage.setItem('hemaiData', dataes)
				// setSession('hemaiData',dataes);
				let Fnumber = parseInt(this.noteNum) * parseInt(this.multiple) * 2;
				if(this.multiple<1){
				  this.multiple=1;
				  Toast("投注倍数不得小于1倍!");
				  return false;
				}
				if (Fnumber < 1) {
					Toast("请至少选择一注!");
					return false;
				}
				if(!this.Userprotocol){
					Toast("请阅读并勾选委托投注规则！");
					return false;
				}
				this.RouteLeave = true
				this.$router.push({
					path: '/goucai/goucai_hemai',
					query: {
						'pageName': 'jc/jczq',
						'Fnumber': Fnumber,
						payid: 'jczq',
					}
				})
			},
			addList: function() {
				// phone.$emit('continue',true)
				setSession('arr', this.arr);
				setSession('parr', this.parr);
				this.RouteLeave = true
				this.$router.go(-1)
			},
			closeWins: function() {
				this.$router.go(-1)
			},
			showMasks: function() {
				this.showkeyboard = false;
				if (this.multiple == '0') {
					this.multiple = '1'
				}
				var arrLength = 0;
				if (this.payid == 'BF' || this.payid == 'BQQ' || this.payid == 'HHGG' || this.payid == 'YCZS' || this.payid ==
					'DGGP') {
					arrLength = this.arr.length;
				} else if (this.payid == 'SPF' || this.payid == 'RQSPF') {
					for (var i = 0; i < this.arr.length; i++) {
						if (this.arr[i].soddsType || this.arr[i].poddsType || this.arr[i].foddsType) {
							arrLength += 1
						}
					}
				} else if (this.payid == 'JQS') {
					for (var idx = 0; idx < this.arr.length; idx++) {
						if (this.arr[idx].ctype0 || this.arr[idx].ctype1 || this.arr[idx].ctype2 || this.arr[idx].ctype3 || this.arr[idx]
							.ctype4 || this.arr[idx].ctype5 || this.arr[idx].ctype6 || this.arr[idx].ctype7) {
							arrLength += 1
						}
					}
				} else if (this.payid == 'ERXY') {
					for (var dx = 0; dx < this.arr.length; dx++) {
						if (this.arr[dx].soddsTypeY || this.arr[dx].poddsTypeY) {
							arrLength += 1
						}
					}
				}
				this.arrLength = arrLength;
				this.showMask = true;
			},
			modifyBetting: function(idx, key, type, yczs, sp) {
				if (sp) {
					if (sp == '--') {
						Toast('不能选择暂无赔率的赛事。')
						return false;
					}
				} else {
					if (key == 'soddsTypeY') {
						if (this.arr[idx].handicap == '1') {
							if (this.arr[idx].erXY[1][0] == '--') {
								Toast('不能选择暂无赔率的赛事。')
								return false;
							}
						} else {
							if (this.arr[idx].erXY[0][0] == '--') {
								Toast('不能选择暂无赔率的赛事。')
								return false;
							}
						}
					}
					if (key == 'poddsTypeY') {
						if (this.arr[idx].handicap == '1') {
							if (this.arr[idx].erXY[0][2] == '--') {
								Toast('不能选择暂无赔率的赛事。')
								return false;
							}
						} else {
							if (this.arr[idx].erXY[1][2] == '--') {
								Toast('不能选择暂无赔率的赛事。')
								return false;
							}
						}
					}


				}
				if (type == 'YCZS' && yczs == 1) {
					if (this.arr[idx].soddsTypeY || this.arr[idx].poddsTypeY || this.arr[idx].foddsTypeY) {
						Toast('一场比赛中，只允许选择一个玩法进行过关!');
						return
					}
				} else if (type == 'YCZS' && yczs == 2) {
					if (this.arr[idx].soddsType || this.arr[idx].poddsType || this.arr[idx].foddsType) {
						Toast('一场比赛中，只允许选择一个玩法进行过关!');
						return
					}
				}
				var state = this.arr[idx][key];
				if (state) {
					state = false
				} else {
					state = true
				}
				this.arr[idx][key] = state;
				if (type == 'YCZS') {
					if (!this.arr[idx]['soddsType'] && !this.arr[idx]['poddsType'] && !this.arr[idx]['foddsType'] && !this.arr[idx][
							'soddsTypeY'
						] && !this.arr[idx]['poddsTypeY'] && !this.arr[idx]['foddsTypeY']) {
						if (this.arr.length == 1) {
							sessionStorage.removeItem('arr');
							sessionStorage.removeItem('parr');
							this.RouteLeave = true
							this.$router.go(-1)
						} else {

							this.arr.splice(idx, 1);
							this.parr.splice(idx, 1);
						}

					}
				} else if (type == 'DGGP') {

				} else if (type == 'RQSPF' || type == 'SPF') {
					if (!this.arr[idx].soddsType && !this.arr[idx].poddsType && !this.arr[idx].foddsType) {
						this.cascade = '2串1';
						setSession("passTypes", ["P2_1"]);
						setSession("passTypesnum", [2]);
						for (var i = 0; i < this.arr.length; i++) {
							this.arr[i].dan = false;
						}
					}
				} else if (type == 'JQS') {
					if (!this.arr[idx].ctype0 && !this.arr[idx].ctype1 && !this.arr[idx].ctype2 && !this.arr[idx].ctype3 && !this.arr[
							idx].ctype4 && !this.arr[idx].ctype5 && !this.arr[idx].ctype6 && !this.arr[idx].ctype7) {
						this.cascade = '2串1';
						setSession("passTypes", ["P2_1"]);
						setSession("passTypesnum", [2]);
						for (var i = 0; i < this.arr.length; i++) {
							this.arr[i].dan = false;
						}
					}
				} else if (type == 'ERXY') {
					if (!this.arr[idx].soddsTypeY && !this.arr[idx].poddsTypeY) {
						this.cascade = '2串1';
						setSession("passTypes", ["P2_1"]);
						setSession("passTypesnum", [2]);
						for (var i = 0; i < this.arr.length; i++) {
							this.arr[i].dan = false;
						}
					}
				}
				if (type == 'YCZS') {
					this.getPiPeiLength(); //重新匹配
					this.YCZSJangJin();
				}
				setSession("arr", this.arr);
				setSession("parr", this.parr);
				this.jiSuanZhuShu(this.arr, type) //注数
				this.getForecast(this.arr, type);

			},
			deleteAll: function() {
				MessageBox({
					title: '',
					message: '您确定要清空当前投注内容吗',
					showCancelButton: true,
				}).then(action => {
					if (action == 'confirm') {
						sessionStorage.removeItem('arr');
						sessionStorage.removeItem('parr');
						this.RouteLeave = true
						this.$router.go(-1)
					} else {

					}
				})
			},
			// 显示隐藏模拟键盘
			showkeyboards: function() {
				// 				$api.css($api.dom('.keyboard'), "display:block");
				// 				
			},
			hidekeyboard: function() {
				//$api.css($api.dom('.keyboard'), "display:none");

			},
			// 键盘操作
			increase: function() {
				if (this.multiple < 9999) {
					this.multiple = this.multiple * 1 + 1 + ''
				}

			},
			reduce: function() {
				if (this.multiple > 1) {
					this.multiple = this.multiple * 1 - 1 + ''
				}
			},
			keyinputidx: function(idx) {
				var mun = ''
				if (this.multiple == '0') {
					mun = idx
				} else if (this.coverage) {
					mun = idx;
					this.coverage = false;
				} else {
					mun = this.multiple + idx
				}
				if (parseInt(mun) < 10000 && parseInt(mun) > 0) {
					this.multiple = mun
				} else if (parseInt(mun) > 9999) {
					this.multiple = '9999'
				} else {
					this.multiple = '0'
				}

			},
			keybackspace: function() {
				this.coverage = false;
				var mun = this.multiple;
				if (mun.length > 1) {
					this.multiple = mun.slice(0, -1)
				} else {
					if (parseInt(mun) != 0) {
						if (parseInt(mun) > 1) {
							this.multiple = '1'
						} else {
							this.multiple = '0'
						}
					}
				}

			},
			closekeyboard: function() {
				this.showkeyboard = false;
				if (this.multiple == '0') {
					this.multiple = '1'
				}
			},
			onStringnumber: function(idx) {
				var state = this.Stringnumber[idx].state
				if (state) {
					state = false
				} else {
					state = true
				}
				this.Stringnumber[idx].state = state;

			},
			StringnumberSure: function() {
				var passTypes0 = getSession("passTypes")[0];
				var Stringnumber = this.Stringnumber;
				var cascade = '';
				var passTypes = [];
				var passTypesnum = [];
				for (var i = 0; i < Stringnumber.length; i++) {
					if (Stringnumber[i].state) {
						cascade += Stringnumber[i].name + ' ';
						passTypes.push(Stringnumber[i].id);
						passTypesnum.push(Stringnumber[i].num)
					}
				}
				if (this.payid == 'BF') {
					if (cascade == '') {
						cascade = '单关固赔'
					}
					if (passTypesnum.length == 0) {
						passTypesnum.push('DGGP')
					}
					if (passTypes.length == 0) {
						passTypes.push('P1')
					}
				} else {
					if (cascade == '') {
						cascade = '2串1'
					}
					if (passTypesnum.length == 0) {
						passTypesnum.push(2)
					}
					if (passTypes.length == 0) {
						passTypes.push('P2_1')
					}
				}

				this.cascade = cascade;

				setSession("passTypes", passTypes);
				setSession("passTypesnum", passTypesnum);
				var xinpassTypes0 = getSession("passTypes")[0];
				if (passTypes0 != xinpassTypes0) {
					for (var x = 0; x < this.arr.length; x++) {
						this.arr[x].dan = false;
					}
					danArr = [];
				}
				this.noteNum = this.gettotalNum();
				this.getForecast(this.arr, this.payid);
				this.showMask = false;

			},
			deleteList: function(idx, type) {
				if (this.arr.length == 1) {
					sessionStorage.removeItem('arr');
					sessionStorage.removeItem('parr');
					this.RouteLeave = true
					this.$router.go(-1)
				} else {
					this.arr.splice(idx, 1);

					for (var i = 0; i < this.arr.length; i++) {
						this.arr[i].dan = false;
					}
					if (type == 'YCZS') {
						this.parr.splice(idx, 1);
					};
					if (type == 'YCZS' || type == 'DGGP') {

					} else if (type == 'BF') {
						this.cascade = '单关固赔';
						setSession("passTypes", ["P1"]);
						setSession("passTypesnum", ['DGGP']);
					} else {
						this.cascade = '2串1';
						setSession("passTypes", ["P2_1"]);
						setSession("passTypesnum", [2]);
					}
					setSession("arr", this.arr);
					setSession("parr", this.parr);
				}

				var Stringnumber = this.Stringnumber;
				var arrLen = this.arr.length;
				for (var i = 0; i < Stringnumber.length; i++) {
					if (i == 0) {

					} else {
						if (i > arrLen - 2) {
							this.Stringnumber[i].state = false;
						}
					}
				};
				if (type == 'YCZS') {
					this.getPiPeiLength(); //重新匹配
					this.YCZSJangJin();
				}

				this.jiSuanZhuShu(this.arr, type);
				this.getForecast(this.arr, type);

			},
			xuanDan: function(idx, type) {
				var arr = this.arr;
				var passTypes = getSession("passTypes");
				let dnums;
				if (passTypes) {
					switch (passTypes[0]) {
						case "P1":
							dnums = 0;
							break;
						case "P2_1":
							dnums = 1;
							break;
						case "P3_1":
							dnums = 2;
							break;
						case "P4_1":
							dnums = 3;
							break;
						case "P5_1":
							dnums = 4;
							break;
						case "P6_1":
							dnums = 5;
							break;
						case "P7_1":
							dnums = 6;
							break;
						case "P8_1":
							dnums = 7;
							break;
					}
				} else {
					dnums = 1;
				}

				if (this.arr[idx].dan) {
					this.arr[idx].dan = false
				} else {

					if (arr.length <= dnums + 1) {

						return
					}
					var num = 0;
					for (var i = 0; i < arr.length; i++) {
						if (arr[i].dan) {
							num += 1
						}
					}
					if (dnums == num) {
						return
					}
					this.arr[idx].dan = true
				}
				this.jiSuanZhuShu(this.arr, type);
				this.getForecast(this.arr, type)
			},
			onUserprotocol: function() {
				if (this.Userprotocol) {
					this.Userprotocol = false
				} else {
					this.Userprotocol = true
				}

			},
			pay: function() {

				if (!this.Userprotocol) {
					Toast('请阅读并勾选委托投注规则！');
					return
				}
				if (parseInt(this.noteNum) < 1) {
					Toast('注数不能小于1注！');
					return
				}
				if (parseInt(this.multiple) < 1) {
					this.multiple = 1;
					Toast('投注倍数不能小于1倍！');
					return
				}
				this.payPopup = true;

			},
			paybtn: function() {
				this.payPopup = false;
				var data = this.setData(this.payid);
				console.log(JSON.stringify(data));
				if (data == "noc") {
					alert("选择有误");
					return false;
				}
				// 							let data = [];
				// 							data["playType"] = playType;
				// var _data = this.Qs.stringify(data))
				let _data = { ...data
				};
				console.log(_data);
				data = this.Encrypt(_data);
				console.log(this.Decrypt(data));
				let dataes = this.Qs.stringify({
					"path": "jc/jczq",
					data
				}, {
					allowDots: true
				})
				//	return false
				this.$ajax.post('/caipiaoshouye/index.php/home/index/createScheme',
						dataes
					)
					.then(ret => {
						if (ret.status == 200) {
							var content = JSON.parse(ret.data.content);
							if (content.code == "100000") {
								var datacontent = this.setData(this.payid)['ticketContent'];
								var data = [];
								var myDate = new Date();
								myDate = getTime(myDate, 2);
								var CitySN;
								if (getSession('equipmentIp')) {
									CitySN = getSession('equipmentIp');
								}
								// obj.id=;
								data["mid"] = 1;
								data["lotteryType"] = 17;
								data['periodNumber'] = '';
								data["shareType"] = 1;
								data["shareTime"] = myDate;
								data["uid"] = getCookie('newData').userid;
								data["multiple"] = this.multiple;
								data["schemeCost"] = this.noteNum * this.multiple * 2;
								data["subscriptionMoney"] = this.noteNum * this.multiple * 2;
								data["content"] = datacontent;
								data['prizeAwards'] = '';
								data["quipmentiIp"] = CitySN; //投注IP 
								data["quipmentTeype"] = 10; // 投注设备类型
								data["quipmentNumber"] = ''; //投注设备号
								data["quipmentUid"] = getCookie('newData').userid; // 投注UID
								data["quipmentOrderId"] = content.data.schemeNumber;
								let object = {...data}
								setSession('obj', object);
								sessionStorage.removeItem('arr');
								sessionStorage.removeItem('parr');
								sessionStorage.removeItem('shaixuan');
								setSession('moneyType', 'LOTTERYMONEY');
								this.RouteLeave = true;
								this.$router.push({
									path: '/goucai/goucai_success',
									query: {
										success: 'jczq',
										schemeId: content.data.schemeId,
										wcj_totalPrice: this.noteNum * 2 * this.multiple,
										from: 'pay',
										types: 'jingji'
									}
								})
							} else {
								alert(content.message);
							}
						} else {
							console.log(JSON.stringify(ret));
							alert('网络错误！')
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			//一场制胜预测奖金
			YCZSJangJin: function() {
				var arr = this.arr;
				var parr = this.parr;
				var allJangJin = [];
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].soddsType) {

						var bei1;
						var bei2;
						var jiangJin1;
						var jiangJin2;
						if (parr[i].handicap > 0) {

							bei1 = bonusOptimiation(arr[i].sodds, parr[i].soddsY, parr[i].fodds, 1);
							bei2 = bonusOptimiation(arr[i].sodds, parr[i].soddsY, parr[i].fodds, 2);
							jiangJin1 = (parseInt(bei1) * parseFloat(arr[i].sodds) * parseFloat(parr[i].soddsY) * 2).toFixed(2);
							jiangJin2 = (parseInt(bei2) * parseFloat(arr[i].sodds) * parseFloat(parr[i].fodds) * 2).toFixed(2);
						} else {

							bei1 = bonusOptimiation(arr[i].sodds, parr[i].foddsY, parr[i].sodds, 1);
							bei2 = bonusOptimiation(arr[i].sodds, parr[i].foddsY, parr[i].sodds, 2);
							jiangJin1 = (parseInt(bei1) * parseFloat(arr[i].sodds) * parseFloat(parr[i].foddsY) * 2).toFixed(2);
							jiangJin2 = (parseInt(bei2) * parseFloat(arr[i].sodds) * parseFloat(parr[i].sodds) * 2).toFixed(2);
						}

						allJangJin.push(jiangJin1);
						allJangJin.push(jiangJin2);
					};
					if (arr[i].poddsType) {
						var bei1;
						var bei2;
						var jiangJin1;
						var jiangJin2;
						if (parr[i].handicap > 0) {
							bei1 = bonusOptimiation(arr[i].podds, parr[i].soddsY, parr[i].fodds, 1);
							bei2 = bonusOptimiation(arr[i].podds, parr[i].soddsY, parr[i].fodds, 2);
							jiangJin1 = (parseInt(bei1) * parseFloat(arr[i].podds) * parseFloat(parr[i].soddsY) * 2).toFixed(2);
							jiangJin2 = (parseInt(bei2) * parseFloat(arr[i].podds) * parseFloat(parr[i].fodds) * 2).toFixed(2);
						} else {
							bei1 = bonusOptimiation(arr[i].podds, parr[i].foddsY, parr[i].sodds, 1);
							bei2 = bonusOptimiation(arr[i].podds, parr[i].foddsY, parr[i].sodds, 2);
							jiangJin1 = (parseInt(bei1) * parseFloat(arr[i].podds) * parseFloat(parr[i].foddsY) * 2).toFixed(2);
							jiangJin2 = (parseInt(bei2) * parseFloat(arr[i].podds) * parseFloat(parr[i].sodds) * 2).toFixed(2);
						}

						allJangJin.push(jiangJin1);
						allJangJin.push(jiangJin2);
					};
					if (arr[i].foddsType) {
						var bei1;
						var bei2;
						var jiangJin1;
						var jiangJin2;
						if (parr[i].handicap > 0) {
							bei1 = bonusOptimiation(arr[i].fodds, parr[i].soddsY, parr[i].fodds, 1);
							bei2 = bonusOptimiation(arr[i].fodds, parr[i].soddsY, parr[i].fodds, 2);
							jiangJin1 = (parseInt(bei1) * parseFloat(arr[i].fodds) * parseFloat(parr[i].soddsY) * 2).toFixed(2);
							jiangJin2 = (parseInt(bei2) * parseFloat(arr[i].fodds) * parseFloat(parr[i].fodds) * 2).toFixed(2);
						} else {
							bei1 = bonusOptimiation(arr[i].fodds, parr[i].foddsY, parr[i].sodds, 1);
							bei2 = bonusOptimiation(arr[i].fodds, parr[i].foddsY, parr[i].sodds, 2);
							jiangJin1 = (parseInt(bei1) * parseFloat(arr[i].fodds) * parseFloat(parr[i].foddsY) * 2).toFixed(2);
							jiangJin2 = (parseInt(bei2) * parseFloat(arr[i].fodds) * parseFloat(parr[i].sodds) * 2).toFixed(2);
						}

						allJangJin.push(jiangJin1);
						allJangJin.push(jiangJin2);
					};
					if (arr[i].soddsTypeY) {
						var bei1;
						var bei2;
						var jiangJin1;
						var jiangJin2;
						if (parr[i].handicap > 0) {
							bei1 = bonusOptimiation(arr[i].soddsY, parr[i].soddsY, parr[i].fodds, 1);
							bei2 = bonusOptimiation(arr[i].soddsY, parr[i].soddsY, parr[i].fodds, 2);
							jiangJin1 = (parseInt(bei1) * parseFloat(arr[i].soddsY) * parseFloat(parr[i].soddsY) * 2).toFixed(2);
							jiangJin2 = (parseInt(bei2) * parseFloat(arr[i].soddsY) * parseFloat(parr[i].fodds) * 2).toFixed(2);
						} else {
							bei1 = bonusOptimiation(arr[i].soddsY, parr[i].foddsY, parr[i].sodds, 1);
							bei2 = bonusOptimiation(arr[i].soddsY, parr[i].foddsY, parr[i].sodds, 2);
							jiangJin1 = (parseInt(bei1) * parseFloat(arr[i].soddsY) * parseFloat(parr[i].foddsY) * 2).toFixed(2);
							jiangJin2 = (parseInt(bei2) * parseFloat(arr[i].soddsY) * parseFloat(parr[i].sodds) * 2).toFixed(2);
						}

						allJangJin.push(jiangJin1);
						allJangJin.push(jiangJin2);
					};
					if (arr[i].poddsTypeY) {
						var bei1;
						var bei2;
						var jiangJin1;
						var jiangJin2;
						if (parr[i].handicap > 0) {
							bei1 = bonusOptimiation(arr[i].poddsY, parr[i].soddsY, parr[i].fodds, 1);
							bei2 = bonusOptimiation(arr[i].poddsY, parr[i].soddsY, parr[i].fodds, 2);
							jiangJin1 = (parseInt(bei1) * parseFloat(arr[i].poddsY) * parseFloat(parr[i].soddsY) * 2).toFixed(2);
							jiangJin2 = (parseInt(bei2) * parseFloat(arr[i].poddsY) * parseFloat(parr[i].fodds) * 2).toFixed(2);
						} else {
							bei1 = bonusOptimiation(arr[i].poddsY, parr[i].foddsY, parr[i].sodds, 1);
							bei2 = bonusOptimiation(arr[i].poddsY, parr[i].foddsY, parr[i].sodds, 2);
							jiangJin1 = (parseInt(bei1) * parseFloat(arr[i].poddsY) * parseFloat(parr[i].foddsY) * 2).toFixed(2);
							jiangJin2 = (parseInt(bei2) * parseFloat(arr[i].poddsY) * parseFloat(parr[i].sodds) * 2).toFixed(2);
						}

						allJangJin.push(jiangJin1);
						allJangJin.push(jiangJin2);
					};
					if (arr[i].foddsTypeY) {
						var bei1;
						var bei2;
						var jiangJin1;
						var jiangJin2;
						if (parr[i].handicap > 0) {
							bei1 = bonusOptimiation(arr[i].foddsY, parr[i].soddsY, parr[i].fodds, 1);
							bei2 = bonusOptimiation(arr[i].foddsY, parr[i].soddsY, parr[i].fodds, 2);
							jiangJin1 = (parseInt(bei1) * parseFloat(arr[i].foddsY) * parseFloat(parr[i].soddsY) * 2).toFixed(2);
							jiangJin2 = (parseInt(bei2) * parseFloat(arr[i].foddsY) * parseFloat(parr[i].fodds) * 2).toFixed(2);
						} else {
							bei1 = bonusOptimiation(arr[i].foddsY, parr[i].foddsY, parr[i].sodds, 1);
							bei2 = bonusOptimiation(arr[i].foddsY, parr[i].foddsY, parr[i].sodds, 2);
							jiangJin1 = (parseInt(bei1) * parseFloat(arr[i].foddsY) * parseFloat(parr[i].foddsY) * 2).toFixed(2);
							jiangJin2 = (parseInt(bei2) * parseFloat(arr[i].foddsY) * parseFloat(parr[i].sodds) * 2).toFixed(2);
						}

						allJangJin.push(jiangJin1);
						allJangJin.push(jiangJin2);
					};

				}
				var maxTheory = 0;
				for (var n = 0; n < allJangJin.length; n++) {
					maxTheory = parseFloat(maxTheory) + parseFloat(allJangJin[n])
				}

				var minTheory = Math.min.apply({}, allJangJin);
				this.minTheory = minTheory.toFixed(2);
				this.maxTheory = maxTheory.toFixed(2);

			},
			/*生成付款参数*/

			setData: function(playType) {
				var data = [];
				console.log(playType);
				var uid = getCookie('newData').userid;;
				//拼接uid
				data.userId = uid;
				//方案描述
				data.description = "";
				//过关模式
				data.passMode = "PASS";
				if (getSession("passTypes")[0] == "P1" && getSession("passTypes").length == 1)
					data.passMode = "SINGLE";
				var arr = this.arr;

				//方案投注方式
				var mode = "COMPOUND";
				//过关方式
				var passTypes = getSession("passTypes") || ["P2_1"];
				data.passTypes = passTypes;
				//方案类型
				data.schemeType = "MULTIPLE_PASS";
				//方案保密类型
				data.secretType = "FULL_PUBLIC";
				//自购|合买
				data.shareType = "SELF";
				//方案认购许可类型
				data.subscriptionLicenseType = "PUBLIC_LICENSE";
				//是否奖金优化
				data.isPrizeOptimizing = false;
				//期编号
				data.periodId = parseInt(arr[0].periodId);
				//投注倍数

				data.multiple = parseInt(this.multiple);



				//var brr=getSession("brr");//暂时注释
				//方案金额
				var schemeCost = parseInt(this.noteNum) * parseInt(this.multiple) * 2;

				data.schemeCost = schemeCost;

				if (playType == "BF") {
					//玩法类型
					data.playType = "BF";
					if (arr.length > 1) {
						mode = "COMPOUND";
					}
					//投注内容
					var ticketContent = [];
					for (var i = 0; i < arr.length; i++) {
						var obj = [];
						obj.matchKey = arr[i].matchKey;
						if (arr[i].dan) {
							obj.dan = true;
						} else {
							obj.dan = false;
						}
						var value = [];
						var bfchooseTypes = arr[i].chooseType;
						for (var n = 0; n < bfchooseTypes.length; n++) {
							if (bfchooseTypes[n]) {
								value.push(arr[i].betType[n]);
							}
						}
						obj.value = getbfTotal(value);
						ticketContent.push({ ...obj
						});
					}
				} else if (playType == "JQS") {
					//玩法类型
					data.playType = "JQS";
					if (arr.length > 1) {
						mode = "COMPOUND";
					}

					//投注内容
					var ticketContent = [];
					for (var i = 0; i < arr.length; i++) {
						var obj = [];
						obj.matchKey = arr[i].matchKey;
						if (arr[i].dan) {
							obj.dan = true;
						} else {
							obj.dan = false;
						}
						var suanfashu = [];

						var num = 0;
						if (arr[i].ctype0) {
							suanfashu.push('0')
						}
						if (arr[i].ctype1) {
							suanfashu.push('1')
						}
						if (arr[i].ctype2) {
							suanfashu.push('2')
						}
						if (arr[i].ctype3) {
							suanfashu.push('3')
						}
						if (arr[i].ctype4) {
							suanfashu.push('4')
						}
						if (arr[i].ctype5) {
							suanfashu.push('5')
						}
						if (arr[i].ctype6) {
							suanfashu.push('6')
						}
						if (arr[i].ctype7) {
							suanfashu.push('7+')
						};


						obj.value = getjqsTotal(suanfashu);
						ticketContent.push({ ...obj
						});
					}
				} else if (playType == "BQQ") {
					//玩法类型
					data.playType = "BQQ";
					if (arr.length > 1) {
						mode = "COMPOUND";
					}
					//投注内容
					var ticketContent = [];
					for (var i = 0; i < arr.length; i++) {
						var obj = [];
						obj.matchKey = arr[i].matchKey;
						if (arr[i].dan) {
							obj.dan = true;
						} else {
							obj.dan = false;
						}
						var value = [];
						for (var x = 0; x < arr[i].chooseType.length; x++) {
							if (arr[i].chooseType[x]) {
								value.push(arr[i].betType[x])
							}
						}
						obj.value = getbqcTotals(value);
						ticketContent.push({ ...obj
						});
					}
				} else if (playType == "SPF" || playType == "RQSPF") {
					//玩法类型
					data.playType = playType;
					if (arr.length > 1) {
						mode = "COMPOUND";
					}
					//投注内容
					var ticketContent = [];
					for (var i = 0; i < arr.length; i++) {
						var obj = [];
						obj.matchKey = arr[i].matchKey;
						if (arr[i].dan) {
							obj.dan = true;
						} else {
							obj.dan = false;
						}
						var spfvalue = [];
						var rqspfvalue = [];
						var value = [];
						if (playType == "SPF") {
							if (arr[i].soddsType) {
								spfvalue.push('胜');
							}
							if (arr[i].poddsType) {
								spfvalue.push('平');
							}
							if (arr[i].foddsType) {
								spfvalue.push('负');
							}
						} else {
							if (arr[i].soddsType) {
								rqspfvalue.push('胜');
							}
							if (arr[i].poddsType) {
								rqspfvalue.push('平');
							}
							if (arr[i].foddsType) {
								rqspfvalue.push('负');
							}
						}

						if (spfvalue.length > 0) {
							value.push(getspfTotal(spfvalue));
						}
						if (rqspfvalue.length > 0) {
							value.push(getrqspfTotal(rqspfvalue));
						}
						if (value.length > 0) {
							obj.value = value.join(",");
							ticketContent.push({ ...obj
							});
						}
					}
				} else if (playType == "HHGG") {
					//玩法类型
					data.playType = "HHGG";
					//投注内容
					var ticketContent = [];
					if (arr.length > 1) {
						mode = "COMPOUND";
					}
					for (var i = 0; i < arr.length; i++) {
						var obj = [];
						obj.matchKey = arr[i].matchKey;
						if (arr[i].dan) {
							obj.dan = true;
						} else {
							obj.dan = false;
						}
						var value = [];
						if (arr[i].type == 'spf') {
							var spf = [];
							for (var a = 0; a < arr[i].chooseType1.length; a++) {
								if (arr[i].chooseType1[a]) {
									spf.push(arr[i].betType1[a])
								}
							}
							value.push(getspfTotal(spf));
						}
						if (arr[i].type == 'rqspf') {
							var rqspf = [];
							for (var b = 0; b < arr[i].chooseType2.length; b++) {
								if (arr[i].chooseType2[b]) {
									rqspf.push(arr[i].betType2[b])
								}
							}
							value.push(getrqspfTotal(rqspf));
						}
						if (arr[i].type == 'bqc') {
							var bqc = [];
							for (var c = 0; c < arr[i].chooseType3.length; c++) {
								if (arr[i].chooseType3[c]) {
									bqc.push(arr[i].betType3[c])
								}
							}
							value.push(getbqcTotals(bqc));
						}
						if (arr[i].type == 'jqs') {
							var jqs = [];
							for (var d = 0; d < arr[i].chooseType4.length; d++) {
								if (arr[i].chooseType4[d]) {
									jqs.push(arr[i].betType4[d])
								}
							}
							value.push(getjqsTotal(jqs));
						}
						if (arr[i].type == 'bf') {
							var bf = [];
							for (var e = 0; e < arr[i].chooseType5.length; e++) {
								if (arr[i].chooseType5[e]) {
									bf.push(arr[i].betType5[e])
								}
							}
							value.push(getbfTotal(bf));
						}
						if (value.length > 0)
							obj.value = value.join(",");
						ticketContent.push({ ...obj
						});
					}
				} else if (playType == "YCZS") {
					//玩法类型
					data.playType = "YCZS";
					//过关方式
					data.passTypes = ["P1_1"];
					//过关模式
					data.passMode = "SINGLE";
					//是否奖金优化
					data.isPrizeOptimizing = true;
					if (arr.length > 1) {
						mode = "COMPOUND";
					}
					mode = "COMPOUND";
					var ticketContent = [];
					for (var i = 0; i < arr.length; i++) {
						var obj = [];
						obj.matchKey = arr[i].matchKey;
						if (arr[i].dan) {
							obj.dan = true;
						} else {
							obj.dan = false;
						}
						var spfvalue = [];

						if (arr[i].soddsType) {
							spfvalue.push('胜')
						}
						if (arr[i].poddsType) {
							spfvalue.push('平')
						}
						if (arr[i].foddsType) {
							spfvalue.push('负')
						}

						var rqspfvalue = [];
						if (arr[i].soddsTypeY) {
							rqspfvalue.push('胜')
						}
						if (arr[i].poddsTypeY) {
							rqspfvalue.push('平')
						}
						if (arr[i].foddsTypeY) {
							rqspfvalue.push('负')
						}

						var value = [];

						if (spfvalue.length > 0) {
							value.push(getspfTotal(spfvalue));
						}
						if (rqspfvalue.length > 0) {
							value.push(getrqspfTotal(rqspfvalue));
						}
						if (value.length > 0)
							obj.value = value.join(",");
						var yczsOptions = [];

						var mtc = this.parr[i].matchKey;
						yczsOptions[mtc] = {};
						if (this.parr[i].handicap == 1) {
							yczsOptions[mtc]['SPF'] = 4;
							yczsOptions[mtc]['RQSPF'] = 1;
							// 							yczsOptions[mtc] = {
							// 								"SPF": 4,
							// 								"RQSPF": 1
							// 							};
						} else {
							yczsOptions[mtc]['SPF'] = 1;
							yczsOptions[mtc]['RQSPF'] = 4;
							/* yczsOptions[mtc] = {
								"SPF": 1,
								"RQSPF": 4
							}; */
						}
						obj.yczsOptions = { ...yczsOptions
						};
						ticketContent.push({ ...obj
						});
					}
				} else if (playType == "DGGP") {
					//玩法类型
					data.playType = "DGGP";
					//过关方式
					//data.passTypes=["P1"];
					//过关模式
					data.passMode = "SINGLE";
					//if(arr.length>1){
					//    mode="COMPOUND";
					//}
					mode = "COMPOUND";
					//投注内容
					var ticketContent = [];
					for (var i = 0; i < arr.length; i++) {
						var obj = [];
						obj.matchKey = arr[i].matchKey;
						if (arr[i].dan) {
							obj.dan = true;
						} else {
							obj.dan = false;
						}
						var value = [];
						if (arr[i].type == 'spf') {
							var spf = [];
							for (var a = 0; a < arr[i].chooseType1.length; a++) {
								if (arr[i].chooseType1[a]) {
									spf.push(arr[i].betType1[a])
								}
							}
							value.push(getspfTotal(spf));
						}
						if (arr[i].type == 'rqspf') {
							var rqspf = [];
							for (var b = 0; b < arr[i].chooseType2.length; b++) {
								if (arr[i].chooseType2[b]) {
									rqspf.push(arr[i].betType2[b])
								}
							}
							value.push(getrqspfTotal(rqspf));
						}
						if (arr[i].type == 'bqc') {
							var bqc = [];
							for (var c = 0; c < arr[i].chooseType3.length; c++) {
								if (arr[i].chooseType3[c]) {
									bqc.push(arr[i].betType3[c])
								}
							}
							value.push(getbqcTotals(bqc));
						}
						if (arr[i].type == 'jqs') {
							var jqs = [];
							for (var d = 0; d < arr[i].chooseType4.length; d++) {
								if (arr[i].chooseType4[d]) {
									jqs.push(arr[i].betType4[d])
								}
							}
							value.push(getjqsTotal(jqs));
						}
						if (arr[i].type == 'bf') {
							var bf = [];
							for (var e = 0; e < arr[i].chooseType5.length; e++) {
								if (arr[i].chooseType5[e]) {
									bf.push(arr[i].betType5[e])
								}
							}
							value.push(getbfTotal(bf));
						}
						if (value.length > 0)
							obj.value = value.join(",");
						ticketContent.push({ ...obj
						});
					}
				} else if (playType == "ERXY") {
					//玩法类型
					data.playType = "ERXY";
					//投注内容
					var ticketContent = [];
					if (arr.length > 1) {
						mode = "COMPOUND";
					}

					for (var i = 0; i < arr.length; i++) {
						var obj = [];
						obj.matchKey = arr[i].matchKey;
						// var s=arr[i].team6.split(' ')
						// ex=s[0];

						if (arr[i].dan) {
							obj.dan = true;
						} else {
							obj.dan = false;
						}
						var value = [];
						if (arr[i].soddsTypeY) {
							if (arr[i].handicap == 1) {
								value.push('客胜');
							} else {
								value.push('主胜');
							}
						}
						if (arr[i].poddsTypeY) {
							if (arr[i].handicap == 1) {
								value.push('主不败');
							} else {
								value.push('客不败');
							}
						}
						if (arr.length > 0) {
							obj.value = geterxyTotals(value);
							ticketContent.push({ ...obj
							});
						}
					}
				}
				//方案注数
				data.units = parseInt(this.noteNum);
				if (playType == "YCZS") {
					data.units = arr.length;
					var parr = this.parr;
					//拼接投注时使用的content
					//var arr = getSession("arr");
					console.log(JSON.stringify(parr));
					var _content = [];
					for (var s = 0; s < arr.length; s++) {
						if (arr[s].soddsType) { //选中为胜平负胜
							var obj = []
							var jcMatchItemList = [];
							if (parr[s].handicap > 0) {
								var bei = bonusOptimiation(arr[s].sodds, parr[s].soddsY, parr[s].fodds, 1);
								obj.multiple = bei;
							} else {
								var bei = bonusOptimiation(arr[s].sodds, parr[s].foddsY, parr[s].sodds, 1);
								obj.multiple = bei;
							}
							obj['passPos'] = 2;
							var obj1 = [];
							obj1.valueSize = 1;
							obj1.matchKey = arr[s].matchKey;
							obj1.dan = false;
							obj1.value = 1;
							obj1.playType = 1;
							jcMatchItemList.push({ ...obj1
							});
							var obj2 = [];
							obj2.valueSize = 1;
							obj2.matchKey = parr[s].matchKey;
							obj2.dan = false;
							if (parr[s].handicap > 0) {
								obj2.value = 4;
								obj2.playType = 1;
							} else {
								obj2.value = 1;
								obj2.playType = 1;
							}
							jcMatchItemList.push({ ...obj2
							});
							obj.jcMatchItemList = jcMatchItemList;
							_content.push({ ...obj
							});
							//dierci
							var obj = [];
							var jcMatchItemList = [];

							if (parr[s].handicap > 0) {
								var bei = bonusOptimiation(arr[s].sodds, parr[s].soddsY, parr[s].fodds, 2);
								obj['multiple'] = bei;
							} else {
								var bei = bonusOptimiation(arr[s].sodds, parr[s].foddsY, parr[s].sodds, 2);
								obj['multiple'] = bei;
							}
							obj['passPos'] = 2;
							var obj1 = [];
							obj1.valueSize = 1;
							obj1.matchKey = arr[s].matchKey;
							obj1.dan = false;
							obj1.value = 1;
							obj1.playType = 1;
							jcMatchItemList.push({ ...obj1
							});
							var obj2 = [];
							obj2.valueSize = 1;
							obj2.matchKey = parr[s].matchKey;
							obj2.dan = false;
							if (parr[s].handicap > 0) {
								obj2.value = 1;
								obj2.playType = 0;
							} else {
								obj2.value = 4;
								obj2.playType = 0;
							}
							jcMatchItemList.push({ ...obj2
							});
							obj.jcMatchItemList = jcMatchItemList;
							_content.push({ ...obj
							});
						};
						if (arr[s].poddsType) { //选中为胜平负平
							var obj = []
							var jcMatchItemList = [];
							if (parr[s].handicap > 0) {
								var bei = bonusOptimiation(arr[s].podds, parr[s].soddsY, parr[s].fodds, 1);
								obj.multiple = bei;
								//console.log(obj.multiple);
							} else {
								var bei = bonusOptimiation(arr[s].podds, parr[s].foddsY, parr[s].sodds, 1);
								obj.multiple = bei;
								//console.log(obj.multiple);
							}
							obj['passPos'] = 2;
							var obj1 = [];
							obj1.valueSize = 1;
							obj1.matchKey = arr[s].matchKey;
							obj1.dan = false;
							obj1.value = 2;
							obj1.playType = 1;
							jcMatchItemList.push({ ...obj1
							});
							var obj2 = [];
							obj2.valueSize = 1;
							obj2.matchKey = parr[s].matchKey;
							obj2.dan = false;
							if (parr[s].handicap > 0) {
								obj2.value = 4;
								obj2.playType = 1;
							} else {
								obj2.value = 1;
								obj2.playType = 1;
							}
							jcMatchItemList.push({ ...obj2
							});
							obj.jcMatchItemList = jcMatchItemList;
							_content.push({ ...obj
							});
							//dierci
							var obj = []
							var jcMatchItemList = [];

							if (parr[s].handicap > 0) {
								var bei = bonusOptimiation(arr[s].podds, parr[s].soddsY, parr[s].fodds, 2);
								obj['multiple'] = bei;
							} else {
								var bei = bonusOptimiation(arr[s].podds, parr[s].foddsY, parr[s].sodds, 2);
								obj['multiple'] = bei;
							}
							obj['passPos'] = 2;
							var obj1 = [];
							obj1.valueSize = 1;
							obj1.matchKey = arr[s].matchKey;
							obj1.dan = false;
							obj1.value = 2;
							obj1.playType = 1;
							jcMatchItemList.push({ ...obj1
							});
							var obj2 = [];
							obj2.valueSize = 1;
							obj2.matchKey = parr[s].matchKey;
							obj2.dan = false;
							if (parr[s].handicap > 0) {
								obj2.value = 1;
								obj2.playType = 0;
							} else {
								obj2.value = 4;
								obj2.playType = 0;
							}
							jcMatchItemList.push({ ...obj2
							});
							obj.jcMatchItemList = jcMatchItemList;
							_content.push({ ...obj
							});
						};
						if (arr[s].foddsType) { //选中为胜平负负
							var obj = []
							var jcMatchItemList = [];
							if (parr[s].handicap > 0) {
								var bei = bonusOptimiation(arr[s].fodds, parr[s].soddsY, parr[s].fodds, 1);
								obj.multiple = bei;
								//console.log(obj.multiple);
							} else {
								var bei = bonusOptimiation(arr[s].fodds, parr[s].foddsY, parr[s].sodds, 1);
								obj.multiple = bei;
								//console.log(obj.multiple);
							}
							obj['passPos'] = 2;
							var obj1 = [];
							obj1.valueSize = 1;
							obj1.matchKey = arr[s].matchKey;
							obj1.dan = false;
							obj1.value = 4;
							obj1.playType = 1;
							jcMatchItemList.push({ ...obj1
							});
							var obj2 = [];
							obj2.valueSize = 1;
							obj2.matchKey = parr[s].matchKey;
							obj2.dan = false;
							if (parr[s].handicap > 0) {
								obj2.value = 4;
								obj2.playType = 1;
							} else {
								obj2.value = 1;
								obj2.playType = 1;
							}
							jcMatchItemList.push({ ...obj2
							});
							obj.jcMatchItemList = jcMatchItemList;
							_content.push({ ...obj
							});
							//dierci
							var obj = []
							var jcMatchItemList = [];

							if (parr[s].handicap > 0) {
								var bei = bonusOptimiation(arr[s].fodds, parr[s].soddsY, parr[s].fodds, 2);
								obj['multiple'] = bei;
							} else {
								var bei = bonusOptimiation(arr[s].fodds, parr[s].foddsY, parr[s].sodds, 2);
								obj['multiple'] = bei;
							}
							obj['passPos'] = 2;
							var obj1 = [];
							obj1.valueSize = 1;
							obj1.matchKey = arr[s].matchKey;
							obj1.dan = false;
							obj1.value = 4;
							obj1.playType = 1;
							jcMatchItemList.push({ ...obj1
							});
							var obj2 = [];
							obj2.valueSize = 1;
							obj2.matchKey = parr[s].matchKey;
							obj2.dan = false;
							if (parr[s].handicap > 0) {
								obj2.value = 1;
								obj2.playType = 0;
							} else {
								obj2.value = 4;
								obj2.playType = 0;
							}
							jcMatchItemList.push({ ...obj2
							});
							obj.jcMatchItemList = jcMatchItemList;
							_content.push({ ...obj
							});
						};
						if (arr[s].soddsTypeY) { //选中为让球胜平负胜
							var obj = []
							var jcMatchItemList = [];
							if (parr[s].handicap > 0) {
								var bei = bonusOptimiation(arr[s].soddsY, parr[s].soddsY, parr[s].fodds, 1);
								obj.multiple = bei;
								//console.log(obj.multiple);
							} else {
								var bei = bonusOptimiation(arr[s].soddsY, parr[s].foddsY, parr[s].sodds, 1);
								obj.multiple = bei;
								//console.log(obj.multiple);
							}
							obj['passPos'] = 2;
							var obj1 = [];
							obj1.valueSize = 1;
							obj1.matchKey = arr[s].matchKey;
							obj1.dan = false;
							obj1.value = 1;
							obj1.playType = 0;
							jcMatchItemList.push({ ...obj1
							});
							var obj2 = [];
							obj2.valueSize = 1;
							obj2.matchKey = parr[s].matchKey;
							obj2.dan = false;
							if (parr[s].handicap > 0) {
								obj2.value = 4;
								obj2.playType = 1;
							} else {
								obj2.value = 1;
								obj2.playType = 1;
							}
							jcMatchItemList.push({ ...obj2
							});
							obj.jcMatchItemList = jcMatchItemList;
							_content.push({ ...obj
							});
							//dierci
							var obj = []
							var jcMatchItemList = [];

							if (parr[s].handicap > 0) {
								var bei = bonusOptimiation(arr[s].soddsY, parr[s].soddsY, parr[s].fodds, 2);
								obj['multiple'] = bei;
							} else {
								var bei = bonusOptimiation(arr[s].soddsY, parr[s].foddsY, parr[s].sodds, 2);
								obj['multiple'] = bei;
							}
							obj['passPos'] = 2;
							var obj1 = [];
							obj1.valueSize = 1;
							obj1.matchKey = arr[s].matchKey;
							obj1.dan = false;
							obj1.value = 1;
							obj1.playType = 0;
							jcMatchItemList.push({ ...obj1
							});
							var obj2 = [];
							obj2.valueSize = 1;
							obj2.matchKey = parr[s].matchKey;
							obj2.dan = false;
							if (parr[s].handicap > 0) {
								obj2.value = 1;
								obj2.playType = 0;
							} else {
								obj2.value = 4;
								obj2.playType = 0;
							}
							jcMatchItemList.push({ ...obj2
							});
							obj.jcMatchItemList = jcMatchItemList;
							_content.push({ ...obj
							});
						};
						if (arr[s].poddsTypeY) { //选中为让球胜平负平
							var obj = []
							var jcMatchItemList = [];
							if (parr[s].handicap > 0) {
								var bei = bonusOptimiation(arr[s].poddsY, parr[s].soddsY, parr[s].fodds, 1);
								obj.multiple = bei;
								//console.log(obj.multiple);
							} else {
								var bei = bonusOptimiation(arr[s].poddsY, parr[s].foddsY, parr[s].sodds, 1);
								obj.multiple = bei;
								//console.log(obj.multiple);
							}
							obj['passPos'] = 2;
							var obj1 = [];
							obj1.valueSize = 1;
							obj1.matchKey = arr[s].matchKey;
							obj1.dan = false;
							obj1.value = 2;
							obj1.playType = 0;
							jcMatchItemList.push({ ...obj1
							});
							var obj2 = [];
							obj2.valueSize = 1;
							obj2.matchKey = parr[s].matchKey;
							obj2.dan = false;
							if (parr[s].handicap > 0) {
								obj2.value = 4;
								obj2.playType = 1;
							} else {
								obj2.value = 1;
								obj2.playType = 1;
							}
							jcMatchItemList.push({ ...obj2
							});
							obj.jcMatchItemList = jcMatchItemList;
							_content.push({ ...obj
							});
							//dierci
							var obj = []
							var jcMatchItemList = [];

							if (parr[s].handicap > 0) {
								var bei = bonusOptimiation(arr[s].poddsY, parr[s].soddsY, parr[s].fodds, 2);
								obj['multiple'] = bei;
							} else {
								var bei = bonusOptimiation(arr[s].poddsY, parr[s].foddsY, parr[s].sodds, 2);
								obj['multiple'] = bei;
							}
							obj['passPos'] = 2;
							var obj1 = [];
							obj1.valueSize = 1;
							obj1.matchKey = arr[s].matchKey;
							obj1.dan = false;
							obj1.value = 2;
							obj1.playType = 0;
							jcMatchItemList.push({ ...obj1
							});
							var obj2 = [];
							obj2.valueSize = 1;
							obj2.matchKey = parr[s].matchKey;
							obj2.dan = false;
							if (parr[s].handicap > 0) {
								obj2.value = 1;
								obj2.playType = 0;
							} else {
								obj2.value = 4;
								obj2.playType = 0;
							}
							jcMatchItemList.push({ ...obj2
							});
							obj.jcMatchItemList = jcMatchItemList;
							_content.push({ ...obj
							});
						};
						if (arr[s].foddsTypeY) { //选中为让球胜平负负
							var obj = []
							var jcMatchItemList = [];
							if (parr[s].handicap > 0) {
								obj['multiple'] = bonusOptimiation(arr[s].foddsY, parr[s].soddsY, parr[s].fodds, 1);
							} else {
								obj['multiple'] = bonusOptimiation(arr[s].foddsY, parr[s].foddsY, parr[s].sodds, 1);
							}
							obj['passPos'] = 2;
							var obj1 = [];
							obj1.valueSize = 1;
							obj1.matchKey = arr[s].matchKey;
							obj1.dan = false;
							obj1.value = 4;
							obj1.playType = 0;
							jcMatchItemList.push({ ...obj1
							});
							var obj2 = [];
							obj2.valueSize = 1;
							obj2.matchKey = parr[s].matchKey;
							obj2.dan = false;
							if (parr[s].handicap > 0) {
								obj2.value = 4;
								obj2.playType = 1;
							} else {
								obj2.value = 1;
								obj2.playType = 1;
							}
							jcMatchItemList.push({ ...obj2
							});
							obj.jcMatchItemList = jcMatchItemList;
							_content.push({ ...obj
							});
							//dierci
							var obj = []
							var jcMatchItemList = [];

							if (parr[s].handicap > 0) {
								var bei = bonusOptimiation(arr[s].foddsY, parr[s].soddsY, parr[s].fodds, 2);
								obj['multiple'] = bei;
							} else {
								var bei = bonusOptimiation(arr[s].foddsY, parr[s].foddsY, parr[s].sodds, 2);
								obj['multiple'] = bei;
							}
							obj['passPos'] = 2;
							var obj1 = [];
							obj1.valueSize = 1;
							obj1.matchKey = arr[s].matchKey;
							obj1.dan = false;
							obj1.value = 4;
							obj1.playType = 0;
							jcMatchItemList.push({ ...obj1
							});
							var obj2 = [];
							obj2.valueSize = 1;
							obj2.matchKey = parr[s].matchKey;
							obj2.dan = false;
							if (parr[s].handicap > 0) {
								obj2.value = 1;
								obj2.playType = 0;
							} else {
								obj2.value = 4;
								obj2.playType = 0;
							}
							jcMatchItemList.push({ ...obj2
							});
							obj.jcMatchItemList = jcMatchItemList;
							_content.push({ ...obj
							});
						};
					}
					console.log(JSON.stringify(_content));
					data.content = _content;
				}

				data.mode = mode;
				console.log(ticketContent);
				if (ticketContent.length == 0) {
					return "noc";
				}
				data.ticketContent = ticketContent;
				//data.betContent = [];
				//币种
				data.moneyType = "LOTTERYMONEY";
				console.log(JSON.stringify(data));
				return data;

			},
			//获取匹配场次的长度
			getPiPeiLength: function() {
				var arr = this.arr;
				var piPei = [];
				for (var i = 0; i < arr.length; i++) {
					var piPeiType = [];
					if (arr[i].soddsType) {
						piPeiType.push('sodds');
					} else {
						piPeiType.push(false);
					}
					if (arr[i].poddsType) {
						piPeiType.push('podds');
					} else {
						piPeiType.push(false);
					}
					if (arr[i].foddsType) {
						piPeiType.push('fodds');
					} else {
						piPeiType.push(false);
					}
					if (arr[i].soddsTypeY) {
						piPeiType.push('soddsY');
					} else {
						piPeiType.push(false);
					}
					if (arr[i].poddsTypeY) {
						piPeiType.push('poddsY');
					} else {
						piPeiType.push(false);
					}
					if (arr[i].foddsTypeY) {
						piPeiType.push('foddsY');
					} else {
						piPeiType.push(false);
					};
					piPei.push(piPeiType)
				}
				this.piPei = piPei;
			},
			/*预测奖金*/
			getForecast: function(arr, type) {
				if (parseInt(this.noteNum) == 0) {
					this.minbet = 0;
					this.maxbet = 0;
					return
				}
				var passTypes = getSession("passTypesnum");
				// console.log(typeof(passTypes));
				var multiple = this.multiple;
				var _arr = [];
				var minBet = [];
				var maxBet = [];
				var danMaxBet = [];
				var danMinBet = [];
				var danBetArr = [];
				if (type == 'RQSPF' || type == 'SPF') {
					for (var i = 0; i < arr.length; i++) {
						var bets = [];
						if (arr[i].dan) {
							if (arr[i].soddsType) {
								bets.push(arr[i].sodds);
							}
							if (arr[i].poddsType) {
								bets.push(arr[i].podds);
							}
							if (arr[i].foddsType) {
								bets.push(arr[i].fodds);
							};

							if (bets.length > 0) {
								var min = Math.min.apply({}, bets);
								var max = Math.max.apply({}, bets);
								danMaxBet.push(max);
								danMinBet.push(min);
							}

						} else {
							if (arr[i].soddsType) {
								bets.push(arr[i].sodds);
							}
							if (arr[i].poddsType) {
								bets.push(arr[i].podds);
							}
							if (arr[i].foddsType) {
								bets.push(arr[i].fodds);
							};
							if (bets.length > 0) {
								var min = Math.min.apply({}, bets);
								var max = Math.max.apply({}, bets);
								minBet.push(min);
								maxBet.push(max);
							}

						}

					}

				} else if (type == 'JQS') {
					for (var i = 0; i < arr.length; i++) {
						var bets = [];
						if (arr[i].dan) {
							if (arr[i].ctype0) {
								bets.push(arr[i].goalBet0);
							}
							if (arr[i].ctype1) {
								bets.push(arr[i].goalBet1);
							}
							if (arr[i].ctype2) {
								bets.push(arr[i].goalBet2);
							}
							if (arr[i].ctype3) {
								bets.push(arr[i].goalBet3);
							}
							if (arr[i].ctype4) {
								bets.push(arr[i].goalBet4);
							}
							if (arr[i].ctype5) {
								bets.push(arr[i].goalBet5);
							}
							if (arr[i].ctype6) {
								bets.push(arr[i].goalBet6);
							}
							if (arr[i].ctype7) {
								bets.push(arr[i].goalBet7);
							};
							if (bets.length > 0) {
								var min = Math.min.apply({}, bets);
								var max = Math.max.apply({}, bets);
								danMinBet.push(min);
								danMaxBet.push(max);
							}

						} else {
							if (arr[i].ctype0) {
								bets.push(arr[i].goalBet0);
							}
							if (arr[i].ctype1) {
								bets.push(arr[i].goalBet1);
							}
							if (arr[i].ctype2) {
								bets.push(arr[i].goalBet2);
							}
							if (arr[i].ctype3) {
								bets.push(arr[i].goalBet3);
							}
							if (arr[i].ctype4) {
								bets.push(arr[i].goalBet4);
							}
							if (arr[i].ctype5) {
								bets.push(arr[i].goalBet5);
							}
							if (arr[i].ctype6) {
								bets.push(arr[i].goalBet6);
							}
							if (arr[i].ctype7) {
								bets.push(arr[i].goalBet7);
							};
							if (bets.length > 0) {
								var min = Math.min.apply({}, bets);
								var max = Math.max.apply({}, bets);
								minBet.push(min);
								maxBet.push(max);
							}

						}

					}
				} else if (type == 'ERXY') {
					for (var i = 0; i < arr.length; i++) {
						var bets = [];
						if (arr[i].dan) {
							if (arr[i].soddsTypeY && arr[i].handicap == 1) {
								bets.push(arr[i].erXY[1][0]);
							}
							if (arr[i].soddsTypeY && arr[i].handicap == -1) {
								bets.push(arr[i].erXY[0][0]);
							}
							if (arr[i].poddsTypeY && arr[i].handicap == 1) {
								bets.push(arr[i].erXY[0][2]);
							}
							if (arr[i].poddsTypeY && arr[i].handicap == -1) {
								bets.push(arr[i].erXY[1][2]);
							};
							if (bets.length > 0) {
								var min = Math.min.apply({}, bets);
								var max = Math.max.apply({}, bets);
								danMinBet.push(min);
								danMaxBet.push(max);
							}

						} else {
							if (arr[i].soddsTypeY && arr[i].handicap == 1) {
								bets.push(arr[i].erXY[1][0]);
							}
							if (arr[i].soddsTypeY && arr[i].handicap == -1) {
								bets.push(arr[i].erXY[0][0]);
							}
							if (arr[i].poddsTypeY && arr[i].handicap == 1) {
								bets.push(arr[i].erXY[0][2]);
							}
							if (arr[i].poddsTypeY && arr[i].handicap == -1) {
								bets.push(arr[i].erXY[1][2]);
							};
							if (bets.length > 0) {
								var min = Math.min.apply({}, bets);
								var max = Math.max.apply({}, bets);
								minBet.push(min);
								maxBet.push(max);
							}

						}

					}
				} else if (type == 'BQQ') {

					for (var i = 0; i < arr.length; i++) {
						var bets = [];
						if (arr[i].dan) {
							for (var n = 0; n < arr[i].chooseType.length; n++) {
								if (arr[i].chooseType[n]) {
									bets.push(arr[i].erXY[n]);
								}
							}
							if (bets.length > 0) {
								var min = Math.min.apply({}, bets);
								var max = Math.max.apply({}, bets);
								danMinBet.push(min);
								danMaxBet.push(max);
							}

						} else {
							for (var n = 0; n < arr[i].chooseType.length; n++) {
								if (arr[i].chooseType[n]) {
									bets.push(arr[i].erXY[n]);
								}
							}
							if (bets.length > 0) {
								var min = Math.min.apply({}, bets);
								var max = Math.max.apply({}, bets);
								minBet.push(min);
								maxBet.push(max);
							}

						}

					}
				} else if (type == 'BF') {
					for (var i = 0; i < arr.length; i++) {
						var bets = [];
						if (arr[i].dan) {
							for (var n = 0; n < arr[i].chooseType.length; n++) {
								if (arr[i].chooseType[n]) {
									if (n == 12) {
										bets.push(arr[i].erXY[0])
									} else if (n == 17) {
										bets.push(arr[i].erXY[13])
									} else if (n == 30) {
										bets.push(arr[i].erXY[18])
									} else {
										bets.push(arr[i].erXY[n + 1]);
									}

								}
							}
							var min = Math.min.apply({}, bets);
							var max = Math.max.apply({}, bets);
							if (bets.length > 0) {
								var min = Math.min.apply({}, bets);
								var max = Math.max.apply({}, bets);
								danMinBet.push(min);
								danMaxBet.push(max);
							}

						} else if (passTypes.length == 1 && passTypes[0] == 'DGGP') {
							for (var n = 0; n < arr[i].chooseType.length; n++) {
								if (arr[i].chooseType[n]) {
									if (n == 12) {
										bets.push(arr[i].erXY[0])
									} else if (n == 17) {
										bets.push(arr[i].erXY[13])
									} else if (n == 30) {
										bets.push(arr[i].erXY[18])
									} else {
										bets.push(arr[i].erXY[n + 1]);
									}

								}
							}
							var min = Math.min.apply({}, bets);
							var max = Math.max.apply({}, bets);
							if (bets.length > 0) {
								minBet.push(bets);
							}


						} else {
							for (var n = 0; n < arr[i].chooseType.length; n++) {
								if (arr[i].chooseType[n]) {
									if (n == 12) {
										bets.push(arr[i].erXY[0])
									} else if (n == 17) {
										bets.push(arr[i].erXY[13])
									} else if (n == 30) {
										bets.push(arr[i].erXY[18])
									} else {
										bets.push(arr[i].erXY[n + 1]);
									}

								}
							}
							var min = Math.min.apply({}, bets);
							var max = Math.max.apply({}, bets);
							if (bets.length > 0) {
								var min = Math.min.apply({}, bets);
								var max = Math.max.apply({}, bets);
								minBet.push(min);
								maxBet.push(max);
							}


						}

					}
				} else if (type == 'HHGG') {

					for (var i = 0; i < arr.length; i++) {
						var bets = [];
						if (arr[i].dan) {
							if (arr[i].chooseType1) {
								for (var a = 0; a < arr[i].chooseType1.length; a++) {
									if (arr[i].chooseType1[a]) {
										bets.push(arr[i].betNum1[a]);
									}
								}
							}
							if (arr[i].chooseType2) {
								for (var b = 0; b < arr[i].chooseType2.length; b++) {
									if (arr[i].chooseType2[b]) {
										bets.push(arr[i].betNum2[b]);
									}
								}
							}
							if (arr[i].chooseType3) {
								for (var c = 0; c < arr[i].chooseType3.length; c++) {
									if (arr[i].chooseType3[c]) {
										bets.push(arr[i].betNum3[c]);
									}
								}
							}
							if (arr[i].chooseType4) {
								for (var d = 0; d < arr[i].chooseType4.length; d++) {
									if (arr[i].chooseType4[d]) {
										bets.push(arr[i].betNum4[d]);
									}
								}
							}
							if (arr[i].chooseType5) {
								for (var e = 0; e < arr[i].chooseType5.length; e++) {
									if (arr[i].chooseType5[e]) {
										if (e == 12) {
											bets.push(arr[i].betNum5[0])
										} else if (e == 17) {
											bets.push(arr[i].betNum5[13])
										} else if (e == 30) {
											bets.push(arr[i].betNum5[18])
										} else {
											bets.push(arr[i].betNum5[e + 1]);
										}

									}
								}
							}

							if (bets.length > 0) {
								var min = Math.min.apply({}, bets);
								var max = Math.max.apply({}, bets);
								danMinBet.push(min);
								danMaxBet.push(max);
							}


						} else {
							if (arr[i].chooseType1) {
								for (var a = 0; a < arr[i].chooseType1.length; a++) {
									if (arr[i].chooseType1[a]) {
										bets.push(arr[i].betNum1[a]);
									}
								}
							}
							if (arr[i].chooseType2) {
								for (var b = 0; b < arr[i].chooseType2.length; b++) {
									if (arr[i].chooseType2[b]) {
										bets.push(arr[i].betNum2[b]);
									}
								}
							}
							if (arr[i].chooseType3) {
								for (var c = 0; c < arr[i].chooseType3.length; c++) {
									if (arr[i].chooseType3[c]) {
										bets.push(arr[i].betNum3[c]);
									}
								}
							}
							if (arr[i].chooseType4) {
								for (var d = 0; d < arr[i].chooseType4.length; d++) {
									if (arr[i].chooseType4[d]) {
										bets.push(arr[i].betNum4[d]);
									}
								}
							}
							if (arr[i].chooseType5) {
								for (var e = 0; e < arr[i].chooseType5.length; e++) {
									if (arr[i].chooseType5[e]) {
										if (e == 12) {
											bets.push(arr[i].betNum5[0])
										} else if (e == 17) {
											bets.push(arr[i].betNum5[13])
										} else if (e == 30) {
											bets.push(arr[i].betNum5[18])
										} else {
											bets.push(arr[i].betNum5[e + 1]);
										}

									}
								}
							}

							if (bets.length > 0) {
								var min = Math.min.apply({}, bets);
								var max = Math.max.apply({}, bets);
								minBet.push(min);
								maxBet.push(max);
							}


						}

					}
				} else if (type == 'DGGP') {

					for (var i = 0; i < arr.length; i++) {
						var bets = [];
						if (arr[i].chooseType1) {
							for (var a = 0; a < arr[i].chooseType1.length; a++) {
								if (arr[i].chooseType1[a]) {
									bets.push(arr[i].betNum1[a]);
								}
							}
						}
						if (arr[i].chooseType2) {
							for (var b = 0; b < arr[i].chooseType2.length; b++) {
								if (arr[i].chooseType2[b]) {
									bets.push(arr[i].betNum2[b]);
								}
							}
						}
						if (arr[i].chooseType3) {
							for (var c = 0; c < arr[i].chooseType3.length; c++) {
								if (arr[i].chooseType3[c]) {
									bets.push(arr[i].betNum3[c]);
								}
							}
						}
						if (arr[i].chooseType4) {
							for (var d = 0; d < arr[i].chooseType4.length; d++) {
								if (arr[i].chooseType4[d]) {
									bets.push(arr[i].betNum4[d]);
								}
							}
						}
						if (arr[i].chooseType5) {
							for (var e = 0; e < arr[i].chooseType5.length; e++) {
								if (arr[i].chooseType5[e]) {
									if (e == 12) {
										bets.push(arr[i].betNum5[0])
									} else if (e == 17) {
										bets.push(arr[i].betNum5[13])
									} else if (e == 30) {
										bets.push(arr[i].betNum5[18])
									} else {
										bets.push(arr[i].betNum5[e + 1]);
									}

								}
							}
						}

						// var min=Math.min.apply( {}, bets );
						// var max=Math.max.apply( {}, bets );
						if (bets.length > 0) {
							_arr.push(bets);
						}

					}
				}
				if (type !== 'DGGP') {
					_arr.push(minBet);
					_arr.push(maxBet);
					if (danMinBet.length > 0) {
						danBetArr.push(danMinBet);
					}
					if (danMaxBet.length > 0) {
						danBetArr.push(danMaxBet);
					}
				}
				if (type == 'BF' && passTypes.length == 1 && passTypes[0] == 'DGGP') {
					_arr = minBet;
				}
				//console.log(JSON.stringify(_arr));
				//console.log(multiple);
				console.log(JSON.stringify(danBetArr));
				console.log(JSON.stringify(multiple));
				console.log(JSON.stringify(passTypes));
				console.log(JSON.stringify(_arr));
				if (danBetArr.length > 0) {
					var data = danmaxPrizeAndCost(multiple, passTypes, _arr, danBetArr, []);
				} else {
					var data = varietymaxPrizeAndCost(multiple, passTypes, _arr, danBetArr, []);
				}

				this.minbet = data[0];
				this.maxbet = data[1];
			},
			gettotalNum: function() {
				var totalNum = 0;
				if (this.payid == "YCZS") {
					// var arr = getSession("arr");
					var num = 0;
					for (var ind = 0; ind < this.piPei.length; ind++) {
						for (var index = 0; index < this.piPei[ind].length; index++) {
							if (this.piPei[ind][index]) {
								num += 1;
							}
						}
					}
					totalNum = num * 10;

					return totalNum;
				}
				if (getSession("passTypes") && danArr.length == 0) {
					var passTypes = getSession("passTypes");

					for (var i = 0; i < passTypes.length; i++) {
						//单管
						if (passTypes[i] == "P1") {
							for (var k = 0; k < totalArr.length; k++) {
								totalNum += totalArr[k] * 1;
							}
						}
						//二串一
						else if (passTypes[i] == "P2_1") {

							for (var k = 0; k < totalArr.length; k++) {
								for (var j = k; j < totalArr.length; j++) {
									if (k != j) {
										totalNum += totalArr[k] * totalArr[j];
									}
								}
							}
						} else if (passTypes[i] == "P3_1") {

							for (var k = 0; k < totalArr.length; k++) {
								for (var j = k; j < totalArr.length; j++) {
									for (var l = j; l < totalArr.length; l++) {
										if (k != j && j != l) {
											totalNum += totalArr[k] * totalArr[j] * totalArr[l];
										}
									}
								}
							}
						} else if (passTypes[i] == "P4_1") {

							for (var k = 0; k < totalArr.length; k++) {
								for (var j = k; j < totalArr.length; j++) {
									for (var l = j; l < totalArr.length; l++) {
										for (var z = l; z < totalArr.length; z++) {
											if (k != j && j != l && l != z) {
												totalNum += totalArr[k] * totalArr[j] * totalArr[l] * totalArr[z];
											}
										}
									}
								}
							}
						} else if (passTypes[i] == "P5_1") {
							for (var k = 0; k < totalArr.length; k++) {
								for (var j = k; j < totalArr.length; j++) {
									for (var l = j; l < totalArr.length; l++) {
										for (var z = l; z < totalArr.length; z++) {
											for (var x = z; x < totalArr.length; x++) {
												if (k != j && j != l && l != z && z != x) {
													totalNum += totalArr[k] * totalArr[j] * totalArr[l] * totalArr[z] * totalArr[x];
												}
											}
										}
									}
								}
							}
						} else if (passTypes[i] == "P6_1") {
							for (var k = 0; k < totalArr.length; k++) {
								for (var j = k; j < totalArr.length; j++) {
									for (var l = j; l < totalArr.length; l++) {
										for (var z = l; z < totalArr.length; z++) {
											for (var x = z; x < totalArr.length; x++) {
												for (var c = x; c < totalArr.length; c++) {
													if (k != j && j != l && l != z && z != x && x != c) {
														totalNum += totalArr[k] * totalArr[j] * totalArr[l] * totalArr[z] * totalArr[x] * totalArr[c];
													}
												}
											}
										}
									}
								}
							}
						} else if (passTypes[i] == "P7_1") {
							for (var k = 0; k < totalArr.length; k++) {
								for (var j = k; j < totalArr.length; j++) {
									for (var l = j; l < totalArr.length; l++) {
										for (var z = l; z < totalArr.length; z++) {
											for (var x = z; x < totalArr.length; x++) {
												for (var c = x; c < totalArr.length; c++) {
													for (var v = c; v < totalArr.length; v++) {
														if (k != j && j != l && l != z && z != x && x != c && c != v) {
															totalNum += totalArr[k] * totalArr[j] * totalArr[l] * totalArr[z] * totalArr[x] * totalArr[c] *
																totalArr[v];
														}
													}
												}
											}
										}
									}
								}
							}
						} else if (passTypes[i] == "P8_1") {
							for (var k = 0; k < totalArr.length; k++) {
								for (var j = k; j < totalArr.length; j++) {
									for (var l = j; l < totalArr.length; l++) {
										for (var z = l; z < totalArr.length; z++) {
											for (var x = z; x < totalArr.length; x++) {
												for (var c = x; c < totalArr.length; c++) {
													for (var v = c; v < totalArr.length; v++) {
														for (var b = v; b < totalArr.length; b++) {
															if (k != j && j != l && l != z && z != x && x != c && c != v && v != b) {
																totalNum += totalArr[k] * totalArr[j] * totalArr[l] * totalArr[z] * totalArr[x] * totalArr[c] *
																	totalArr[
																		v] * totalArr[b];
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}

					return totalNum;
				} else if (getSession("passTypes") && danArr.length > 0) {
					var newArr = [];
					for (var w = 0; w < totalArr.length; w++) {
						newArr.push(totalArr[w]);
					}
					var dan = 1;
					for (var t = 0; t < danArr.length; t++) {
						dan *= newArr[danArr[t]];
					}
					for (var t = danArr.length - 1; t >= 0; t--) {
						//removeArr(newArr,newArr[danArr[t]]);
						newArr.splice(danArr[t], 1);
					}
					var passTypes = getSession("passTypes");
					for (var i = 0; i < passTypes.length; i++) {
						//单管
						if (passTypes[i] == "P1") {
							totalNum += dan * 1;
						}
						//二串一
						else if (passTypes[i] == "P2_1") {
							for (var q = 0; q < newArr.length; q++) {
								totalNum += dan * newArr[q];
							}
						} else if (passTypes[i] == "P3_1") {
							if (danArr.length == 1) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										if (k != j) {
											totalNum += dan * newArr[k] * newArr[j];
										}
									}
								}
							} else if (danArr.length == 2) {
								for (var q = 0; q < newArr.length; q++) {
									totalNum += dan * newArr[q];
								}
							}
						} else if (passTypes[i] == "P4_1") {
							if (danArr.length == 1) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											if (k != j && j != l) {
												totalNum += dan * newArr[k] * newArr[j] * newArr[l];
											}
										}
									}
								}
							} else if (danArr.length == 2) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										if (k != j) {
											totalNum += dan * newArr[k] * newArr[j];
										}
									}
								}
							} else if (danArr.length == 3) {
								for (var q = 0; q < newArr.length; q++) {
									totalNum += dan * newArr[q];
								}
							}
						} else if (passTypes[i] == "P5_1") {
							if (danArr.length == 1) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											for (var z = l; z < newArr.length; z++) {
												if (k != j && j != l && l != z) {
													totalNum += dan * newArr[k] * newArr[j] * newArr[l] * newArr[z];
												}
											}
										}
									}
								}
							} else if (danArr.length == 2) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											if (k != j && j != l) {
												totalNum += dan * newArr[k] * newArr[j] * newArr[l];
											}
										}
									}
								}
							} else if (danArr.length == 3) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										if (k != j) {
											totalNum += dan * newArr[k] * newArr[j];
										}
									}
								}
							} else if (danArr.length == 4) {
								for (var q = 0; q < newArr.length; q++) {
									totalNum += dan * newArr[q];
								}
							}
						} else if (passTypes[i] == "P6_1") {
							if (danArr.length == 1) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											for (var z = l; z < newArr.length; z++) {
												for (var x = z; x < newArr.length; x++) {
													if (k != j && j != l && l != z && z != x) {
														totalNum += dan * newArr[k] * newArr[j] * newArr[l] * newArr[z] * newArr[x];
													}
												}
											}
										}
									}
								}
							} else if (danArr.length == 2) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											for (var z = l; z < newArr.length; z++) {
												if (k != j && j != l && l != z) {
													totalNum += dan * newArr[k] * newArr[j] * newArr[l] * newArr[z];
												}
											}
										}
									}
								}
							} else if (danArr.length == 3) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											if (k != j && j != l) {
												totalNum += dan * newArr[k] * newArr[j] * newArr[l];
											}
										}
									}
								}
							} else if (danArr.length == 4) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										if (k != j) {
											totalNum += dan * newArr[k] * newArr[j];
										}
									}
								}
							} else if (danArr.length == 5) {
								for (var q = 0; q < newArr.length; q++) {
									totalNum += dan * newArr[q];
								}
							}
						} else if (passTypes[i] == "P7_1") {
							if (danArr.length == 1) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											for (var z = l; z < newArr.length; z++) {
												for (var x = z; x < newArr.length; x++) {
													for (var c = x; c < newArr.length; c++) {
														if (k != j && j != l && l != z && z != x && x != c) {
															totalNum += dan * newArr[k] * newArr[j] * newArr[l] * newArr[z] * newArr[x] * newArr[c];
														}
													}
												}
											}
										}
									}
								}
							} else if (danArr.length == 2) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											for (var z = l; z < newArr.length; z++) {
												for (var x = z; x < newArr.length; x++) {
													if (k != j && j != l && l != z && z != x) {
														totalNum += dan * newArr[k] * newArr[j] * newArr[l] * newArr[z] * newArr[x];
													}
												}
											}
										}
									}
								}
							} else if (danArr.length == 3) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											for (var z = l; z < newArr.length; z++) {
												if (k != j && j != l && l != z) {
													totalNum += dan * newArr[k] * newArr[j] * newArr[l] * newArr[z];
												}
											}
										}
									}
								}
							} else if (danArr.length == 4) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											if (k != j && j != l) {
												totalNum += dan * newArr[k] * newArr[j] * newArr[l];
											}
										}
									}
								}
							} else if (danArr.length == 5) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										if (k != j) {
											totalNum += dan * newArr[k] * newArr[j];
										}
									}
								}
							} else if (danArr.length == 6) {
								for (var q = 0; q < newArr.length; q++) {
									totalNum += dan * newArr[q];
								}
							}
						} else if (passTypes[i] == "P8_1") {
							if (danArr.length == 1) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											for (var z = l; z < newArr.length; z++) {
												for (var x = z; x < newArr.length; x++) {
													for (var c = x; c < newArr.length; c++) {
														for (var v = c; v < newArr.length; v++) {
															if (k != j && j != l && l != z && z != x && x != c && c != v) {
																totalNum += dan * newArr[k] * newArr[j] * newArr[l] * newArr[z] * newArr[x] * newArr[c] * newArr[v];
															}
														}
													}
												}
											}
										}
									}
								}
							} else if (danArr.length == 2) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											for (var z = l; z < newArr.length; z++) {
												for (var x = z; x < newArr.length; x++) {
													for (var c = x; c < newArr.length; c++) {
														if (k != j && j != l && l != z && z != x && x != c) {
															totalNum += dan * newArr[k] * newArr[j] * newArr[l] * newArr[z] * newArr[x] * newArr[c];
														}
													}
												}
											}
										}
									}
								}
							} else if (danArr.length == 3) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											for (var z = l; z < newArr.length; z++) {
												for (var x = z; x < newArr.length; x++) {
													if (k != j && j != l && l != z && z != x) {
														totalNum += dan * newArr[k] * newArr[j] * newArr[l] * newArr[z] * newArr[x];
													}
												}
											}
										}
									}
								}
							} else if (danArr.length == 4) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											for (var z = l; z < newArr.length; z++) {
												if (k != j && j != l && l != z) {
													totalNum += dan * newArr[k] * newArr[j] * newArr[l] * newArr[z];
												}
											}
										}
									}
								}
							} else if (danArr.length == 5) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										for (var l = j; l < newArr.length; l++) {
											if (k != j && j != l) {
												totalNum += dan * newArr[k] * newArr[j] * newArr[l];
											}
										}
									}
								}
							} else if (danArr.length == 6) {
								for (var k = 0; k < newArr.length; k++) {
									for (var j = k; j < newArr.length; j++) {
										if (k != j) {
											totalNum += dan * newArr[k] * newArr[j];
										}
									}
								}
							} else if (danArr.length == 7) {
								for (var q = 0; q < newArr.length; q++) {
									totalNum += dan * newArr[q];
								}
							}
						}
					}
					return totalNum;
				} else if (!getSession("passTypes") && danArr.length == 0) {
					if (this.payid == 'DGGP') {
						for (var k = 0; k < totalArr.length; k++) {
							totalNum += totalArr[k] * 1;
						}
					} else {
						for (var k = 0; k < totalArr.length; k++) {
							for (var j = k; j < totalArr.length; j++) {
								if (k != j) {
									totalNum += totalArr[k] * totalArr[j];
								}
							}
						}
					}
					return totalNum;
				} else if (!getSession("passTypes") && danArr.length > 0) {
					var newArr = [];
					for (var w = 0; w < totalArr.length; w++) {
						newArr.push(totalArr[w]);
					}
					var dan = 1;
					for (var t = 0; t < danArr.length; t++) {
						dan *= newArr[danArr[t]];
					}
					for (var t = danArr.length - 1; t >= 0; t--) {
						//removeArr(newArr,newArr[danArr[t]]);
						newArr.splice(danArr[t], 1);
					}
					for (var q = 0; q < newArr.length; q++) {
						totalNum += dan * newArr[q];
					}
					return totalNum;
				}
			},
			/*注数计算调用*/
			jiSuanZhuShu: function(arr, type) {
				totalArr = [];
				danArr = [];
				let num;
				if (type == 'RQSPF' || type == 'SPF') {
					for (var i = 0; i < arr.length; i++) {
						num = 0;
						if (arr[i].soddsType) {
							num += 1;
						}
						if (arr[i].poddsType) {
							num += 1;
						}
						if (arr[i].foddsType) {
							num += 1;
						};
						totalArr.push(num);
					}
				} else if (type == 'JQS') {
					for (var i = 0; i < arr.length; i++) {
						num = 0;
						if (arr[i].ctype0) {
							num += 1;
						}
						if (arr[i].ctype1) {
							num += 1;
						}
						if (arr[i].ctype2) {
							num += 1;
						}
						if (arr[i].ctype3) {
							num += 1;
						}
						if (arr[i].ctype4) {
							num += 1;
						}
						if (arr[i].ctype5) {
							num += 1;
						}
						if (arr[i].ctype6) {
							num += 1;
						}
						if (arr[i].ctype7) {
							num += 1;
						};
						totalArr.push(num);
					}
				} else if (type == 'ERXY') {
					for (var i = 0; i < arr.length; i++) {
						num = 0;
						if (arr[i].soddsTypeY) {
							num += 1;
						}
						if (arr[i].poddsTypeY) {
							num += 1;
						};
						totalArr.push(num);
					}
				} else if (type == 'BQQ' || type == 'BF') {

					for (var i = 0; i < arr.length; i++) {
						num = 0;
						for (var n = 0; n < arr[i].chooseType.length; n++) {
							if (arr[i].chooseType[n]) {
								num += 1
							}
						}
						totalArr.push(num);
					}
				} else if (type == 'HHGG' || type == 'DGGP') {

					for (var i = 0; i < arr.length; i++) {
						num = 0;
						if (arr[i].chooseType1) {
							for (var a = 0; a < arr[i].chooseType1.length; a++) {
								if (arr[i].chooseType1[a]) {
									num += 1
								}
							}
						}
						if (arr[i].chooseType2) {
							for (var b = 0; b < arr[i].chooseType2.length; b++) {
								if (arr[i].chooseType2[b]) {
									num += 1
								}
							}
						}
						if (arr[i].chooseType3) {
							for (var c = 0; c < arr[i].chooseType3.length; c++) {
								if (arr[i].chooseType3[c]) {
									num += 1
								}
							}
						}
						if (arr[i].chooseType4) {
							for (var d = 0; d < arr[i].chooseType4.length; d++) {
								if (arr[i].chooseType4[d]) {
									num += 1
								}
							}
						}
						if (arr[i].chooseType5) {
							for (var e = 0; e < arr[i].chooseType5.length; e++) {
								if (arr[i].chooseType5[e]) {
									num += 1
								}
							}
						}

						totalArr.push(num);
					}
				}
				for (var z = 0; z < arr.length; z++) {
					if (arr[z].dan) {
						danArr.push(z)
					}
				}
				//console.log(JSON.stringify(danArr));
				//console.log(JSON.stringify(totalArr));
				this.noteNum = this.gettotalNum()
			},
			showPpxq: function(obj) {
				this.arr[obj].showPpxq = !this.arr[obj].showPpxq;
			},
		},
		filters: {
			capitalize: function(matchDate, num) { //时间处理
				var time = new Date(matchDate);
				var y = time.getFullYear();
				var m = time.getMonth() + 1 >= 10 ? parseInt(time.getMonth() + 1) : "0" + parseInt(time.getMonth() + 1);
				var d = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
				var h = time.getHours() >= 10 ? time.getHours() : "0" + time.getHours();
				var mm = time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes();
				var s = time.getSeconds() >= 10 ? time.getSeconds() : "0" + time.getSeconds();
				var dd = time.getDay();
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
				} else if (num == 3) {
					return h + ":" + mm;
				} else {
					return y + "-" + m + "-" + d + " " + '周' + dd;
				}
			},
			AddZeorpad: function(num, n) { //以0补齐3位
				var len = num.toString().length;
				while (len < n) {
					num = "0" + num;
					len++;
				}
				return num;
			},
			bonusOptimiation: function(self, other1, other2, type) {
				var uintAmount1 = other1 * 1 * self * 1 * 2;
				var uintAmount2 = other2 * 1 * self * 1 * 2;

				var chazhi = [];
				for (let i = 1; i < 10; i++) {
					chazhi.push(Math.abs((uintAmount1 * i) - (uintAmount2 * (10 - i))))
				}
				var minchazhi = chazhi.indexOf(Math.min.apply(Math, chazhi)) + 1;
				// 				console.log(minchazhi)
				// 				console.log(chazhi)
				if (type == 1) {
					if (other1 * 1 > other2 * 1) {
						return Math.min(minchazhi, 10 - minchazhi);
					} else {
						return Math.max(minchazhi, 10 - minchazhi);
					}
				} else {
					if (other1 * 1 > other2 * 1) {
						return Math.max(minchazhi, 10 - minchazhi);
					} else {
						return Math.min(minchazhi, 10 - minchazhi);
					}
				}
				var arrs1 = {};
				var arrs2 = {};
				arrs1['uintAmount'] = uintAmount1;
				arrs1['self'] = self;
				arrs1['other'] = other1;
				arrs2['uintAmount'] = uintAmount2;
				arrs2['self'] = self;
				arrs2['other'] = other2;
				var detailDatas = [];
				detailDatas.push(arrs1);
				detailDatas.push(arrs2);
				var totalBetNum = 10;
				var uintAmounts = [];
				var i = 0;
				var detailData;
				for (i = 0; i < detailDatas.length; i++) {
					detailData = detailDatas[i]
					uintAmounts.push(detailData.uintAmount);
				}
				var max = 0; //最大值
				var item;
				var tempBeiTotal = 0; //临时投注倍数只和
				for (var i = 0; i < uintAmounts.length; i++) {
					max = Math.max(max, uintAmounts[i]);
				}
				for (var i = 0; i < uintAmounts.length; i++) {
					tempBeiTotal += max / uintAmounts[i];
				}
				var coefficient = (totalBetNum / tempBeiTotal); //精确到小数的投注倍数 到达小数已保证所有金额*倍数相等
				var betNumArray = [] //计算出的注数保持数组
				var beiTotal = 0; //按照目前计算得出的倍数
				var item;
				for (var i = 0; i < uintAmounts.length; i++) {
					item = uintAmounts[i];
					var biaozhuan = coefficient * (max / item); //作为参照的标准值
					var floor = Math.floor(coefficient * (max / item)); //取下限整数得到的值
					var ceil = Math.ceil(coefficient * (max / item)); //取上限整数得到的值
					var bei; //最终保留的倍数
					if (Math.abs(floor - biaozhuan) > Math.abs(ceil - biaozhuan)) { //哪个最接近标准值保留哪个
						bei = ceil;
					} else {
						bei = floor;
					}
					betNumArray.push(bei);
					beiTotal += bei;
				}

				//数组已经从小到大排列 所以从前往后加减对结果造成的影响最小
				//如果当前倍数大于给定的倍数 则依次减去1 直到和标准倍数相等
				if (beiTotal > totalBetNum) {
					for (i = 0; i < beiTotal - totalBetNum; i++) {
						betNumArray[i] = betNumArray[i] - 1;
					}
				} else if (beiTotal < totalBetNum) { //如果当前倍数小于给定的倍数 则依次加上1 直到和标准倍数相等
					for (i = 0; i < totalBetNum - beiTotal; i++) {
						betNumArray[i] = betNumArray[i] + 1;
					}
				}
				beiTotal = 0;
				var btStr = "";
				for (i = 0; i < detailDatas.length; i++) {
					detailData = detailDatas[i];
					detailData.betNum = betNumArray[i];
					detailData.amount = detailData.uintAmount * detailData.betNum;
					beiTotal += betNumArray[i];
					btStr += "(" + detailData.uintAmount + "," + betNumArray[i] + ")_"

				}
				if (type == 1) {
					return parseInt(betNumArray[0]);
				} else {
					return parseInt(betNumArray[1]);
				}
			},
			theory: function(beiNum, bet1, bet2) {
				var beiNum = parseFloat(beiNum);
				var bet1 = parseFloat(bet1);
				var bet2 = parseFloat(bet2);
				var theoryNum = (beiNum * bet1 * bet2 * 2).toFixed(2);

				return theoryNum;
			},
			tranNumber: function(num, point) {
				let numStr = num.toString()
				// 十万以内直接返回
				if (numStr.length <= 7) {
					return numStr;
				}
				//大于8位数是亿
				else if (numStr.length > 11) {
					let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
					return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿';
				}
				//大于6位数是十万 (以10W分割 10W以下全部显示)
				else if (numStr.length > 7) {
					let decimal = numStr.substring(numStr.length - 7, numStr.length - 7 + point)
					return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万';
				}
			}
		}
	}
	// 	var compare = function(obj1,obj2) {
	// 		var val1 = parseInt(obj1.matchKey);
	// 		var val2 = parseInt(obj2.matchKey);
	// 		if (val1 < val2) {
	// 			return -1;
	// 		} else if (val1 > val2) {
	// 			return 1;
	// 		} else {
	// 			return 0;
	// 		}
	// 	}

	setSession("passTypes", ["P2_1"]);
	setSession("passTypesnum", [2]);
	if (this.payid == 'DGGP') {
		setSession("passTypes", ["P1"]);
		setSession("passTypesnum", ['DGGP']);
	} else if (this.payid == 'YCZS') {
		setSession("passTypes", ["P1_1"]);
		// setSession("passTypesnum", ['DGGP']);
	} else if (this.payid == 'BF') {
		setSession("passTypes", ["P1"]);
		setSession("passTypesnum", ['DGGP']);
	}
	var danArr = [];
	/*注数计算*/




	//总价格
	var totalPrice = 0;

	function settList(obj) {
		var team1 = obj.team1;
		var team2 = obj.team2;
		var team3 = obj.team3;
		var team4 = obj.team4;
		var team5 = obj.team5;
		var arr = obj.value;
		var rang = false;
		var bl = obj.bl;
		setBiFen(arr, rang, team1, team2, team3, team4, team5, bl, obj.matchKey, obj.periodId);
	}

	function settListjqs(obj) {
		var team1 = obj.team1;
		var team2 = obj.team2;
		var team3 = obj.team3;
		var team4 = obj.team4;
		var team5 = obj.team5;
		var arr = obj.value;
		var rang = false;
		var bl = obj.bl;
		setBiFen2(arr, rang, team1, team2, team3, team4, team5, bl, obj.matchKey, obj.periodId);
	}
	//生成ticketContent里面的bf_value
	function getbfTotal(value) {
		var total = 0;
		for (var k = 0; k < value.length; k++) {
			switch (value[k]) {
				case "1:0":
					total += 2;
					break;
				case "2:0":
					total += 4;
					break;
				case "2:1":
					total += 8;
					break;
				case "3:0":
					total += 16;
					break;
				case "3:1":
					total += 32;
					break;
				case "3:2":
					total += 64;
					break;
				case "4:0":
					total += 128;
					break;
				case "4:1":
					total += 256;
					break;
				case "4:2":
					total += 512;
					break;
				case "5:0":
					total += 1024;
					break;
				case "5:1":
					total += 2048;
					break;
				case "5:2":
					total += 4096;
					break;
				case "胜其它":
					total += 1;
					break;
				case "0:0":
					total += 16384;
					break;
				case "1:1":
					total += 32768;
					break;
				case "2:2":
					total += 65536;
					break;
				case "3:3":
					total += 131072;
					break;
				case "平其它":
					total += 8192;
					break;
				case "0:1":
					total += 524288;
					break;
				case "0:2":
					total += 1048576;
					break;
				case "1:2":
					total += 2097152;
					break;
				case "0:3":
					total += 4194304;
					break;
				case "1:3":
					total += 8388608;
					break;
				case "2:3":
					total += 16777216;
					break;
				case "0:4":
					total += 33554432;
					break;
				case "1:4":
					total += 67108864;
					break;
				case "2:4":
					total += 134217728;
					break;
				case "0:5":
					total += 268435456;
					break;
				case "1:5":
					total += 536870912;
					break;
				case "2:5":
					total += 1073741824;
					break;
				case "负其它":
					total += 262144;
					break;
			}
		}

		return "BF_" + total;
	}

	function getjqsTotal(value) {
		var total = 0;

		for (var k = 0; k < value.length; k++) {

			if (value[k] == "7球" || value[k] == "7+球") {
				value[k] = "7+球";
			}
			switch (value[k]) {
				case "0":
					total += 1;
					break;
				case "1":
					total += 2;
					break;
				case "2":
					total += 4;
					break;
				case "3":
					total += 8;
					break;
				case "4":
					total += 16;
					break;
				case "5":
					total += 32;
					break;
				case "6":
					total += 64;
					break;
				case "7+":
					total += 128;
					break;
				case "0球":
					total += 1;
					break;
				case "1球":
					total += 2;
					break;
				case "2球":
					total += 4;
					break;
				case "3球":
					total += 8;
					break;
				case "4球":
					total += 16;
					break;
				case "5球":
					total += 32;
					break;
				case "6球":
					total += 64;
					break;
				case "7+球":
					total += 128;
					break;
			}
		}

		return "JQS_" + total;
	}

	function getbqcTotal(value) {
		var total = 0;
		for (var k = 0; k < value.length; k++) {
			switch (value[k]) {
				case "胜胜":
					total += 1;
					break;
				case "胜平":
					total += 2;
					break;
				case "胜负":
					total += 4;
					break;
				case "平胜":
					total += 8;
					break;
				case "平平":
					total += 16;
					break;
				case "平负":
					total += 32;
					break;
				case "负胜":
					total += 64;
					break;
				case "负平":
					total += 128;
					break;
				case "负负":
					total += 256;
					break;
				case "胜-胜":
					total += 1;
					break;
				case "胜-平":
					total += 2;
					break;
				case "胜-负":
					total += 4;
					break;
				case "平-胜":
					total += 8;
					break;
				case "平-平":
					total += 16;
					break;
				case "平-负":
					total += 32;
					break;
				case "负-胜":
					total += 64;
					break;
				case "负-平":
					total += 128;
					break;
				case "负-负":
					total += 256;
					break;
			}
		}
		return "BQQ_" + total;
	}

	function getbqcTotals(value) {
		var total = 0;
		for (var k = 0; k < value.length; k++) {
			switch (value[k]) {
				case "胜胜":
					total += 1;
					break;
				case "胜平":
					total += 2;
					break;
				case "胜负":
					total += 4;
					break;
				case "平胜":
					total += 8;
					break;
				case "平平":
					total += 16;
					break;
				case "平负":
					total += 32;
					break;
				case "负胜":
					total += 64;
					break;
				case "负平":
					total += 128;
					break;
				case "负负":
					total += 256;
					break;
				case "胜-胜":
					total += 1;
					break;
				case "胜-平":
					total += 2;
					break;
				case "胜-负":
					total += 4;
					break;
				case "平-胜":
					total += 8;
					break;
				case "平-平":
					total += 16;
					break;
				case "平-负":
					total += 32;
					break;
				case "负-胜":
					total += 64;
					break;
				case "负-平":
					total += 128;
					break;
				case "负-负":
					total += 256;
					break;
			}
		}
		return "BQQ_" + total;
	}

	function getspfTotal(value) {
		var total = 0;
		for (var k = 0; k < value.length; k++) {
			switch (value[k]) {
				case "胜":
					total += 1;
					break;
				case "平":
					total += 2;
					break;
				case "负":
					total += 4;
					break;
			}
		}
		return "SPF_" + total;
	}

	function getrqspfTotal(value) {
		var total = 0;
		for (var k = 0; k < value.length; k++) {
			switch (value[k]) {
				case "胜":
					total += 1;
					break;
				case "平":
					total += 2;
					break;
				case "负":
					total += 4;
					break;
			}
		}
		return "RQSPF_" + total;
	}

	function geterxyTotal(value) {
		var total = 0;
		for (var k = 0; k < value.length; k++) {
			switch (parseInt(value[k])) {
				case 0:
					total += 1;
					break;
				case 1:
					total += 4;
					break;
				case 2:
					total += 4;
					break;
			}
		}
		return "SPF_" + total;
	}

	function geterxyTotals(value) {
		var total = "";


		for (var k = 0; k < value.length; k++) {
			switch (value[k]) {
				case "主胜":
					total += "SPF_1,";
					break;
				case "客不败":
					total += "RQSPF_4,";
					break;
				case "客胜":
					total += "SPF_4,";
					break;
				case "主不败":
					total += "RQSPF_1,";
					break;
			}
		}



		return total.substr(0, total.length - 1);
		// if (value == "主胜") {
		//     return "SPF_1";
		// }else if(value == "客不败"){
		//      return "RQSPF_4";
		// }else if(value == "客胜"){
		//     return "SPF_4";
		// }else if(value == "主不败"){
		//      return "RQSPF_1";
		// }

	}


	//一场制胜匹配倍数

	// bonusOptimiation(detailDatas);

	function bonusOptimiation(self, other1, other2, type) {
		var uintAmount1 = other1 * 1 * self * 1 * 2;
		var uintAmount2 = other2 * 1 * self * 1 * 2;

		var chazhi = [];
		for (let i = 1; i < 10; i++) {
			chazhi.push(Math.abs((uintAmount1 * i) - (uintAmount2 * (10 - i))))
		}
		var minchazhi = chazhi.indexOf(Math.min.apply(Math, chazhi)) + 1;
		// 				console.log(minchazhi)
		// 				console.log(chazhi)
		if (type == 1) {
			if (other1 * 1 < other2 * 1) {
				return Math.min(minchazhi, 10 - minchazhi);
			} else {
				return Math.max(minchazhi, 10 - minchazhi);
			}
		} else {
			if (other1 * 1 < other2 * 1) {
				return Math.max(minchazhi, 10 - minchazhi);
			} else {
				return Math.min(minchazhi, 10 - minchazhi);
			}
		}
		console.log(minchazhi)
		var arrs1 = {};
		var arrs2 = {};
		arrs1['uintAmount'] = uintAmount1;
		arrs1['self'] = self;
		arrs1['other'] = other1;
		arrs2['uintAmount'] = uintAmount2;
		arrs2['self'] = self;
		arrs2['other'] = other2;
		var detailDatas = [];
		detailDatas.push(arrs1);
		detailDatas.push(arrs2);
		var totalBetNum = 10;
		var uintAmounts = [];
		var i = 0;
		var detailData;

		for (i = 0; i < detailDatas.length; i++) {
			detailData = detailDatas[i]
			uintAmounts.push(detailData.uintAmount);
		}

		var max = 0; //最大值
		var item;
		var tempBeiTotal = 0; //临时投注倍数只和
		for (var i = 0; i < uintAmounts.length; i++) {
			max = Math.max(max, uintAmounts[i]);
		}
		for (var i = 0; i < uintAmounts.length; i++) {
			tempBeiTotal += max / uintAmounts[i];
		}
		var coefficient = (totalBetNum / tempBeiTotal); //精确到小数的投注倍数 到达小数已保证所有金额*倍数相等
		var betNumArray = [] //计算出的注数保持数组
		var beiTotal = 0; //按照目前计算得出的倍数

		var item;
		for (var i = 0; i < uintAmounts.length; i++) {

			item = uintAmounts[i];

			var biaozhuan = coefficient * (max / item); //作为参照的标准值
			var floor = Math.floor(coefficient * (max / item)); //取下限整数得到的值
			var ceil = Math.ceil(coefficient * (max / item)); //取上限整数得到的值
			var bei; //最终保留的倍数
			if (Math.abs(floor - biaozhuan) > Math.abs(ceil - biaozhuan)) { //哪个最接近标准值保留哪个
				bei = ceil;
			} else {
				bei = floor;
			}
			betNumArray.push(bei);
			beiTotal += bei;
		}

		//数组已经从小到大排列 所以从前往后加减对结果造成的影响最小
		//如果当前倍数大于给定的倍数 则依次减去1 直到和标准倍数相等
		if (beiTotal > totalBetNum) {
			for (i = 0; i < beiTotal - totalBetNum; i++) {
				betNumArray[i] = betNumArray[i] - 1;
			}
		} else if (beiTotal < totalBetNum) { //如果当前倍数小于给定的倍数 则依次加上1 直到和标准倍数相等
			for (i = 0; i < totalBetNum - beiTotal; i++) {
				betNumArray[i] = betNumArray[i] + 1;
			}
		}
		beiTotal = 0;
		var btStr = "";

		for (i = 0; i < detailDatas.length; i++) {
			detailData = detailDatas[i];
			detailData.betNum = betNumArray[i];
			detailData.amount = detailData.uintAmount * detailData.betNum;
			beiTotal += betNumArray[i];
			btStr += "(" + detailData.uintAmount + "," + betNumArray[i] + ")_"

		}
		console.log(JSON.stringify(betNumArray));
		// 		if (type == 1) {
		// 			return parseInt(betNumArray[0]);
		// 		} else {
		// 			return parseInt(betNumArray[1]);
		// 		}

	}
	function comparess(a,b){
		return a.matchKey*1 - b.matchKey*1
	}
</script>

<style scoped>
	@import "../../css/goucai_jjcpay.css";

	header {
		position: fixed;
	}

	.jjc_bjdcpay {
		margin-top: 2.25rem;
	}

	.c-red {
		background-color: #fb6b63 !important;
		border: 1px solid #E45B54 !important;
	}

	.c-hui {
		background-color: #c4c4c4 !important;
	}

	.c-grey {
		background-color: #C9C9C9 !important;
		line-height: 0.5rem !important;
	}

	.dis-no {
		display: none !important;
	}
</style>
