<template>
	<div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" tapmode @click="OncloseWin()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">中奖详情 </div>
			<div class="aui-pull-right aui-btn subhead">
				<!-- <span @click="shaidan()">晒单</span> -->
			</div>
		</header>
		<!-- 分享模态框 -->
		<div v-if="shareStatue" class="share_box" @click="hideShare()">
			<div class="share_cont">
				<div class="quxiao">取消</div>
				<div class="down" @click="openDownload()">前往下载</div>
			</div>
		</div>
		<!-- <section class="aui-refresh-content"> -->
			<!-- <div class="aui-content"> -->
				<section id='main' v-cloak>
					<div class="main w-100 bg-w" id='main1' v-if='betsList'>
						<div class="refactorHeader">
							<div class="w-100 mr-0  flex-box headerbox" id='headerbox'>
								<div class="box_left w-65">
									<div class="l_topbox w-100 flex-box">
										<div class="icon_box w-30">
											<img v-if='details.lotteryType == "JCZQ"' class="w-100" src="../../assets/userinfo/jczq.png" />
											<img v-else-if='details.lotteryType == "JCLQ"' class="w-100" src="../../assets/userinfo/jclq.png" />
											<img v-else-if='details.lotteryType == "DCZC"' class="w-100" src="../../assets/userinfo/bjdc.png" />
											<img v-else-if='details.lotteryType == "SFZC"' class="w-100" src="../../assets/userinfo/sfzc.png" />
											<img v-else-if='details.lotteryType == "LCZC"' class="w-100" src="../../assets/userinfo/lcbqc.png" />
											<img v-else-if='details.lotteryType == "SCZC"' class="w-100" src="../../assets/userinfo/sczc.png" />
										</div>
										<div class="type_box w-70 flex-box  " v-if='details.lotteryType == "JCZQ"'>
											<span class="fs-17 fs-we w-100 tal pd-l-26 v-bon">竞彩足球</span>
											<span v-if='details.playTypeName=="单关固赔"' class="fs-13 tal c-cc pd-l-26 v-bon pd-t-5">单关</span>
											<!-- <span v-else-if='details.playTypeName=="胜平负"' class="fs-13 tal c-cc pd-l-26 v-bon pd-t-5">让球胜平负</span> -->
											<span v-else-if='details.playTypeName=="混合投注"' class="fs-13 tal c-cc pd-l-26 v-bon pd-t-5">混合过关</span>
											<span v-else class="fs-13 tal c-cc pd-l-26 v-bon pd-t-5">{{details.playTypeName}}</span>
										</div>
										<div class="type_box w-70 flex-box  " v-if='details.lotteryType == "JCLQ"'>
											<span class="fs-17 fs-we w-100 tal pd-l-26 v-bon">竞彩篮球</span>
											<span class="fs-13 tal c-cc pd-l-26 v-bon pd-t-5">{{basketball}}</span>
										</div>
										<div class="type_box w-70 flex-box  " v-if='details.lotteryType == "DCZC"'>
											<span class="fs-17 fs-we w-100 tal pd-l-26 v-bon">北京单场</span>
											<span class="fs-13 tal c-cc pd-l-26 v-bon pd-t-5">{{details.playType}}&nbsp;&nbsp;&nbsp;第{{details.periodNumber}}期</span>
										</div>
										<div class="type_box w-70 flex-box  " v-if='details.lotteryType == "SFZC"'>
											<span class="fs-17 fs-we w-100 tal pd-l-26 v-bon">胜负彩</span>
											<span class="fs-13 tal c-cc pd-l-26 v-bon pd-t-5">第{{details.periodNumber}}期</span>
										</div>
										<div class="type_box w-70 flex-box  " v-if='details.lotteryType == "LCZC"'>
											<span class="fs-17 fs-we w-100 tal pd-l-26 v-bon">六场半全场</span>
											<span class="fs-13 tal c-cc pd-l-26 v-bon pd-t-5">第{{details.periodNumber}}期</span>
										</div>
										<div class="type_box w-70 flex-box  " v-if='details.lotteryType == "SCZC"'>
											<span class="fs-17 fs-we w-100 tal pd-l-26 v-bon"> 四场进球</span>
											<span class="fs-13 tal c-cc pd-l-26 v-bon pd-t-5">第{{details.periodNumber}}期</span>
										</div>
									</div>

								</div>
								<div class="box_right w-35">
									<img class="w-90" :src="require('../../assets/userinfo/'+imgType+'.png')" />
								</div>
							</div>
							<div class="refactorwin">
								<!-- <div class="w-100 pd-b-10"> -->
								<div class=" refactorwinxiji  flex-box mr-0">
									<div class="money_box ">
										<span class="dis-bl w-100 fs-13 c-33 tac fs-we">{{(details.schemeCost*1).toFixed(2)}}元</span>
										<span class="dis-bl w-100 fs-12 c-99 tac">方案金额</span>
									</div>
									<div class="money_box">
										<span class="dis-bl w-100 fs-13 tac c-f8  fs-we" v-if="baodiType=='已中奖'">{{baodiType}}</span>
										<span class="dis-bl w-100 fs-13  tac c-f8 fs-we" v-else-if="baodiType=='未中奖'">{{baodiType}}</span>
										<span class="dis-bl w-100 fs-13  tac c-f8 fs-we" v-else-if="baodiType=='已撤单'">{{baodiType}}</span>
										<span class="dis-bl w-100 fs-13 c-f8 tac fs-we" v-else>未开奖</span>
										<span class="dis-bl w-100 fs-12 c-99 tac">方案状态</span>
									</div>
									<div class="winmoney_box">
										<span v-if="!details.prizeAfterTax||details.prizeAfterTax=='- -'" class="dis-bl w-100 fs-13 c-99 tac fs-we">- -</span>
										<span v-else class="dis-bl w-100 fs-13 tac c-f8 fs-we">{{(details.prizeAfterTax*1).toFixed(2)}}元</span>
										<span class="dis-bl w-100 fs-12 c-99 tac">中奖金额</span>
									</div>
								</div>
								<!-- </div> -->
							</div>
						</div>
						<ul class="w-100  pd-b-5 bd-b-10-f4 ulbox" >
							<!-- <li class="flex-box expect" v-if="times">
								<span class="dis-bl fs-14">预计派奖</span>
								<span class="dis-bl w-70 fs-14 c-66">{{times}}</span>
							</li> -->
						</ul>
						<!-- <div class="w-100 bd-b-10-f4"></div> -->
						<div class="content_box w-100" >
							<div class="content_title w-90  fs-14 c-33 " :class="closes?'bd-b-1':''"  @click="closess()">投注内容
								<i v-if="baodiType=='未出票'" class="c-03">(&nbsp;{{baodiType}}&nbsp;)</i>
								<i v-else-if="baodiType=='已撤单'" class="c-03">(&nbsp;{{baodiType}}&nbsp;)</i>
								<i v-else class="c-03">(&nbsp;已出票&nbsp;)</i>
								<span class="fr dis-bl w-60 tar text-hide-1 c-bl" :class="closes?'close':''">
									<!-- {{lengths}}条 -->
								</span></div>
							<!-- <ul class="w-100  pd-b-10 bd-b-10-f4 ulbox">
                            <li class="w-85 mr-0 flex-box pd-t-10">
                                <span class="dis-bl w-30 fs-12 fs-we">方案状态</span>
                                <span class="dis-bl w-70 fs-12 c-bl" v-if="baodiType=='已出票'">{{baodiType}}</span>
                                <span class="dis-bl w-70 fs-12 c-re" v-else-if="baodiType=='已中奖'">{{baodiType}}</span>
                                <span class="dis-bl w-70 fs-12 c-fl" v-else-if="baodiType=='未中奖'">{{baodiType}}</span>
                                <span class="dis-bl w-70 fs-12 c-9b" v-else-if="baodiType=='未出票'">{{baodiType}}</span>
                                <span class="dis-bl w-70 fs-12 c-9b" v-else-if="baodiType=='已撤单'">{{baodiType}}</span>
                            </li>
                            <li class="w-85 mr-0 flex-box pd-t-10" v-if="isShow">
                                <span class="dis-bl w-30 fs-12 fs-we">预计派奖</span>
                                <span class="dis-bl w-70 fs-12 c-9b">{{times}}</span>
                            </li>
                            <li class="w-85 mr-0 flex-box pd-t-10" v-if="isShow && details.lotteryType != 'SCZC'&&details.lotteryType != 'LCZC'&&details.lotteryType != 'SFZC'">
                                <span class="dis-bl w-30 fs-12 fs-we">预计奖金</span>
                                <span class="dis-bl w-70 fs-12 c-9b">{{details.jcMaxAndMinPrize}}元</span>
                            </li>
                            <li class="w-85 mr-0 flex-box pd-t-10">
                                <span class="dis-bl w-30 fs-12 fs-we">投注信息</span>
                                <span class="dis-bl w-70 fs-12 c-9b">
                                    <span v-if='details.lotteryType == "JCLQ"' class="changci c-w pd-l-5 pd-r-5">{{sessions}}场</span>
                                    <span v-else-if='details.sessions' class="changci c-w pd-l-5 pd-r-5 mr-r-5">{{details.sessions}}场</span>
                                    <span v-if='details.passType' class="changci1 c-w pd-l-5 pd-r-5 mr-r-5">{{details.passType}}</span>
                                    <span v-if='details.schemeUnits' class="changci2 c-w pd-l-5 pd-r-5 mr-r-5">{{details.schemeUnits}}注</span>
                                    <span v-if='details.schemeMultiple' class="changci3 c-w pd-l-5 pd-r-5 mr-r-5">{{details.schemeMultiple}}倍</span>
                                </span>
                            </li>
                        </ul> -->
							<ul class="w-100 bd-b-1 ulboxj" :class="closes?'':'dis-no'">
								<li class="mr-0 flex-box">
									<span class="dis-bl w-30 fs-14">投注信息</span>
									<span class="dis-bl w-70 fs-13 c-9b">
										<span v-if='details.lotteryType == "JCLQ"' class="changci c-w pd-l-5 pd-r-5">{{sessions}}场</span>
										<span v-else-if='details.sessions' class="changci c-w pd-l-5 pd-r-5 mr-r-5">{{details.sessions}}场</span>
										<span v-if='details.passType' class="changci1 c-w pd-l-5 pd-r-5 mr-r-5">{{details.passType}}</span>
										<span v-if='details.schemeUnits' class="changci2 c-w pd-l-5 pd-r-5 mr-r-5">{{details.schemeUnits}}注</span>
										<span v-if='details.schemeMultiple' class="changci3 c-w pd-l-5 pd-r-5 mr-r-5">{{details.schemeMultiple}}倍</span>
									</span>
								</li>
							</ul>
							<div id="tables" :class="closes?'':'dis-no'">
								<table class="w-100 tables gaiwi" v-if='lotType=="SCZC"||lotType=="SFZC"||lotType=="LCZC"'>
									<tr class="w-100">
										<td>场次</td>
										<td>主队VS客队</td>
										<!-- <td>玩法</td> -->
										<td>投注(赔率)</td>
										<td>赛果</td>
									</tr>
									<tr class="w-100" v-for='(d,index) in betsList' :key='index'>
										<!-- td1 -->
										<td>
											<div>{{d.gameName}}</div>
											<div v-if="d.lineId*1<10">00{{d.lineId}}</div>
											<div v-else-if="d.lineId*1<100">0{{d.lineId}}</div>
											<div v-else>{{d.lineId}}</div>
											<!-- <div>{{d.gameName}}</div> -->
										</td>
										<!-- td2 -->
										<td>
											<div>{{d.homeTeamName}}</div>
											<div v-if="d.resultScore&&lotType=='LCZC'" class="c-re">({{d.resultScore.split(',')[0]}})({{d.resultScore.split(',')[1]}})</div>
											<div v-else-if="d.resultScore&&lotType=='SCZC'" class="c-re">({{d.resultScore}})</div>
											<div v-else class="c-re">{{d.matchTime | capitalize(1)}}</div>
											<div>{{d.guestTeamName}}</div>
										</td>
										<!-- td3 -->
										<!-- <td v-if='lotType=="SCZC"'>
                                        <div>四场进球</div>
                                    </td>
                                    <td v-else-if='lotType=="SFZC"'>
                                        <div>胜负彩</div>
                                    </td>
                                    <td v-else-if='lotType=="LCZC"'>
                                        <div>六场半全场</div>
                                    </td> -->
										<!-- td4 -->
										<td v-if='lotType=="SCZC"'>
											<div class="flex-box w-100 mr-0" v-if="homeItem">
												<span class="w-100 dis-bl tac text-hide-1">主队</span>
												<span class="w-100 dis-bl tac text-hide-1">[<i v-for='(lis,s) in homeItem[index]' :key='s' :class="[betSCT[index][s]? 'c-re':'']">{{lis}}</i>]</span>
											</div>
											<div class="flex-box w-100 mr-0" v-if='guestItem'>
												<span class="w-100 dis-bl tac text-hide-1">客队</span>
												<span class="w-100 dis-bl tac text-hide-1">[<i v-for='(li,ind) in guestItem[index]' :key='ind' :class="[betSCB[index][ind] ? 'c-re':'']">{{li}}</i>]</span>
											</div>
										</td>
										<td v-else-if='lotType=="LCZC"'>
											<div class="flex-box w-100 mr-0" v-if="homeItem">
												<span class="w-100 dis-bl tac text-hide-1">半场</span>
												<span class="w-100 dis-bl tac text-hide-1">[<i v-for='(lis,s) in homeItem[index]' :key='s' :class="[betSCT[index][s]? 'c-re':'']">{{lis}}</i>]</span>
											</div>
											<div class="flex-box w-100 mr-0" v-if='guestItem'>
												<span class="w-100 dis-bl tac text-hide-1">全场</span>
												<span class="w-100 dis-bl tac text-hide-1">[<i v-for='(li,ind) in guestItem[index]' :class="[betSCB[index][ind]? 'c-re':'']">{{li}}</i>]</span>
											</div>
										</td>
										<td v-else>
											<!-- {{d.betsContent.length}} -->
											<div class="flex-box w-100 mr-0 tac" v-if="d.betsContent.length==1">
												<span class="w-100 dis-bl tac text-hide-1" v-if="d.betsContent=='0'">负</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else-if="d.betsContent=='1'">平</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else-if="d.betsContent=='3'">胜</span>
												<span class="w-100 dis-bl tac text-hide-1" v-if="d.betsContent=='0'">[{{d.odds3}}]</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else-if="d.betsContent=='1'">[{{d.odds2}}]</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else-if="d.betsContent=='3'">[{{d.odds1}}]</span>
											</div>
											<div class="flex-box w-100 mr-0 tac" v-if="d.betsContent.length==3">
												<span class="w-100 dis-bl tac text-hide-1" v-if="d.betsContent.split(',')[0]=='0'">负</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else-if="d.betsContent.split(',')[0]=='1'">平</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else-if="d.betsContent.split(',')[0]=='3'">胜</span>
												<span class="w-100 dis-bl tac text-hide-1" v-if="d.betsContent.split(',')[0]=='0'">[{{d.odds3}}]</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else-if="d.betsContent.split(',')[0]=='1'">[{{d.odds2}}]</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else-if="d.betsContent.split(',')[0]=='3'">[{{d.odds1}}]</span>
											</div>
											<div class="flex-box w-100 mr-0 tac" v-if="d.betsContent.length==3">
												<span class="w-100 dis-bl tac text-hide-1" v-if="d.betsContent.split(',')[1]=='0'">负</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else-if="d.betsContent.split(',')[1]=='1'">平</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else-if="d.betsContent.split(',')[1]=='3'">胜</span>
												<span class="w-100 dis-bl tac text-hide-1" v-if="d.betsContent.split(',')[1]=='0'">[{{d.odds3}}]</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else-if="d.betsContent.split(',')[1]=='1'">[{{d.odds2}}]</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else-if="d.betsContent.split(',')[1]=='3'">[{{d.odds1}}]</span>
											</div>
											<div class="flex-box w-100 mr-0 tac" v-if="d.betsContent.length==5">
												<span class="w-100 dis-bl tac text-hide-1" v-if="d.betsContent.split(',')[0]=='0'">负</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else-if="d.betsContent.split(',')[0]=='1'">平</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else-if="d.betsContent.split(',')[0]=='3'">胜</span>
												<span class="w-100 dis-bl tac text-hide-1" v-if="d.betsContent.split(',')[0]=='0'">[{{d.odds3}}]</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else-if="d.betsContent.split(',')[0]=='1'">[{{d.odds2}}]</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else-if="d.betsContent.split(',')[0]=='3'">[{{d.odds1}}]</span>
											</div>
											<div class="flex-box w-100 mr-0 tac" v-if="d.betsContent.length==5">
												<span class="w-100 dis-bl tac text-hide-1" v-if="d.betsContent.split(',')[1]=='0'">负</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else-if="d.betsContent.split(',')[1]=='1'">平</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else-if="d.betsContent.split(',')[1]=='3'">胜</span>
												<span class="w-100 dis-bl tac text-hide-1" v-if="d.betsContent.split(',')[1]=='0'">{{d.odds3}}</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else-if="d.betsContent.split(',')[1]=='1'">[{{d.odds2}}]</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else-if="d.betsContent.split(',')[1]=='3'">[{{d.odds1}}]</span>
											</div>
											<div class="flex-box w-100 mr-0 tac" v-if="d.betsContent.length==5">
												<span class="w-100 dis-bl tac text-hide-1" v-if="d.betsContent.split(',')[2]=='0'">负</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else-if="d.betsContent.split(',')[2]=='1'">平</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else-if="d.betsContent.split(',')[2]=='3'">胜</span>
												<span class="w-100 dis-bl tac text-hide-1" v-if="d.betsContent.split(',')[2]=='0'">[{{d.odds3}}]</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else-if="d.betsContent.split(',')[2]=='1'">[{{d.odds2}}]</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else-if="d.betsContent.split(',')[2]=='3'">[{{d.odds1}}]</span>
											</div>
										</td>

										<!--  td5-->
										<td v-if='lotType=="SCZC"&&d.resultScore'>
											<div :class="[slcolorT[index] ? 'c-re':'']">主队{{saiGuoT[index]}}</div>
											<div :class="[slcolorB[index] ? 'c-re':'']">客队{{saiGuoB[index]}}</div>
										</td>
										<td v-else-if='lotType=="LCZC"&&d.resultScore'>
											<div :class="[slcolorT[index] ? 'c-re':'']">半场{{saiGuoT[index]}}</div>
											<div :class="[slcolorB[index] ? 'c-re':'']">全场{{saiGuoB[index]}}</div>
										</td>
										<td v-else-if='d.resultScore'>
											<div class="w-100 tac">{{d.resultScore}}</div>
										</td>
										<td v-else>
											待定
										</td>
									</tr>

								</table>
								<div class="w-100" v-else-if='lotType=="YCZS"'>
									<div class="w-100" v-for='(d,index) in betsList' :key='index'>
										<table class="w-100 tables gaiwi">
											<tr class="w-100">
												<td>场次</td>
												<td>主队VS客队</td>
												<!-- <td>玩法</td> -->
												<td>投注(赔率)</td>
												<td>赛果</td>
											</tr>
											<tr class="w-100">
												<!-- td1 -->
												<td>
													<div>{{d.gameName}}</div>
													<div>{{d.weekStr}}</div>
													<div v-if="d.lineId*1<10">00{{d.lineId}}</div>
													<div v-else-if="d.lineId*1<100">0{{d.lineId}}</div>
													<div v-else>{{d.lineId}}</div>
													
												</td>
												<!-- td2 -->
												<td>
													<div v-if='getPlayType[index]=="让球胜平负"&&d.handicap!=""'>{{d.homeTeamName}}(<i :class="d.handicap>0?'redtext':'greentext'">主{{d.handicap | handicaps()}}</i>)</div>
													<div v-else-if='getPlayType[index]=="让分胜负"&&d.singleHandicap!==""'>{{d.homeTeamName}}(<i  :class="d.handicap>0?'redtext':'greentext'">主{{d.singleHandicap | handicaps()}}</i>)</div>
													<div v-else>{{d.homeTeamName}}(主)</div>
													<div v-if="d.resultScore" class="c-re">({{d.resultScore}})</div>
													<div v-else class="c-re">{{d.matchTime | capitalize(1)}}</div>
													<div>{{d.guestTeamName}}(客)</div>
												</td>
												<!-- td3 -->
												<!-- <td v-if='getPlayType[index]=="让球胜平负"'>
                                                <div>{{getPlayType[index]}}</div>
                                                <div v-if='d.handicap!==""'>{{d.handicap | handicaps()}}</div>
                                            </td>
                                            <td v-else-if='getPlayType[index]=="让分胜负"'>
                                                <div>{{getPlayType[index]}}</div>
                                                <div v-if='d.singleHandicap!==""'>{{d.singleHandicap | handicaps()}}</div>
                                            </td>
                                            <td v-else>
                                                <div>{{getPlayType[index]}}</div>
                                            </td> -->
												<!-- td4 -->
												<td>
													<div v-for='(list,i) in bet[index]' class="flex-box w-100 mr-0" :key='i'>
														<span class="w-100 dis-bl tac text-hide-1" :class="[bet[index][i]==amidithiones[index] ? 'c-re':'']">{{bet[index][i]}}</span>
														<span class="w-100 dis-bl tac text-hide-1" v-if='values[index][i]=="-1"||values[index][i]==-1'>[--]</span>
														<span class="w-100 dis-bl tac text-hide-1"  v-else :class="[bet[index][i]==amidithiones[index] ? 'c-re':'']">[{{values[index][i]}}]</span>
													</div>
												</td>
												<!-- td5 -->
												<td>
													<div :class="[color[index] ? 'c-re':'']">{{amidithiones[index]}}</div>
												</td>
											</tr>
										</table>
										<div class="mr-0 fs-12 matchingHeader" @click="matchingShow(index)">
											匹配详情
											<span :class="[ishide[index]?'icon_up':'icon_down']"></span>
											<!-- icon_down -->
										</div>
										<table class="w-100 tables pptab" :class="[ishide[index]?'':'dis-no']">
											<tr>
												<td>匹配场次</td>
												<td>玩法</td>
												<td>投注(赔率)</td>
												<td>倍数</td>
												<td>理论奖金</td>
											</tr>
											<tr v-for='(l,c) in d.yczsMatchList' :key='c'>
												<!-- td1 -->
												<td :rowspan='d.yczsMatchList.length' v-if='c==0'>
													<div>{{d.weekStr}}{{d.yczsMatchList.length}}</div>
													<div v-if="l.lineId*1<10">00{{l.lineId}}</div>
													<div v-else-if="l.lineId*1<100">0{{l.lineId}}</div>
													<div v-else>{{l.lineId}}</div>
													<div>{{d.gameName}}</div>
													<div>{{l.homeTeamName}}</div>
													<div>{{l.matchTime | capitalize(1)}}</div>
													<div>{{l.guestTeamName}}</div>
												</td>
												<td v-else class="dis-no"></td>
												<!-- td2 -->
												<td>
													<div>{{l.playType}}</div>
												</td>
												<!-- td3 -->
												<td>
													<div><span  class="dis-bl w-100">{{l.betType}}</span><span  class="dis-bl w-100">[{{l.betOdds}}]</span></div>
												</td>
												<!-- td4 -->
												<td>
													<div>{{l.multiple}}</div>
												</td>
												<!-- td5 -->
												<td>
													<div>{{l.estimatedBonus}}</div>
												</td>
											</tr>
										</table>
									</div>
								</div>
								<table class="w-100 tables gaiwi" v-else>
									<tr class="w-100">
										<td>场次</td>
										<td>主队VS客队</td>
										<!-- <td>玩法</td> -->
										<td>投注(赔率)</td>
										<td>赛果</td>
									</tr>
									<tr class="w-100" v-for='(d,index) in betsList' :key='index'>
										<!-- td1 -->
										<td>
											<div>{{d.gameName}}</div>
											<div>{{d.weekStr}}</div>
											<div v-if="d.lineId*1<10">00{{d.lineId}}</div>
											<div v-else-if="d.lineId*1<100">0{{d.lineId}}</div>
											<div v-else>{{d.lineId}}</div>
											
										</td>
										<!-- td2 -->
										<td>
											<div v-if='getPlayType[index]=="让球胜平负"&&d.handicap!=""'>{{d.homeTeamName}}(<i :class="d.handicap>0?'redtext':'greentext'">主{{d.handicap | handicaps()}}</i>)</div>
											<div v-else-if='getPlayType[index]=="让分胜负"&&d.singleHandicap!==""'>{{d.homeTeamName}}(<i  :class="d.handicap>0?'redtext':'greentext'">主{{d.singleHandicap | handicaps()}}</i>)</div>
											<div v-else>{{d.homeTeamName}}(主)</div>
											<div v-if="d.resultScore&&details.lotteryType=='JCLQ'" class="c-re">({{d.resultScore|fengelq}})</div>
											<div v-else-if="d.resultScore" class="c-re">({{d.resultScore}})</div>
											<div v-else class="c-re">{{d.matchTime | capitalize(1)}}</div>
											<div>{{d.guestTeamName}}(客)</div>
										</td>
										<!-- td3 -->
										<!-- <td v-if='getPlayType[index]=="让球胜平负"'>
                                        <div>{{getPlayType[index]}}</div>
                                        <div v-if='d.handicap!==""'>{{d.handicap | handicaps()}}</div>
                                    </td>
                                    <td v-else-if='getPlayType[index]=="让分胜负"'>
                                        <div>{{getPlayType[index]}}</div>
                                        <div v-if='d.singleHandicap!==""'>{{d.singleHandicap | handicaps()}}</div>
                                    </td>
                                    <td v-else>
                                        <div>{{getPlayType[index]}}</div>
                                    </td> -->
										<!-- td4 -->
										<td>
											<div v-for='(list,i) in bet[index]' class="flex-box w-100 mr-0" :key='i'>
												<span class="w-100 dis-bl tac text-hide-1" :class="[bet[index][i]==amidithiones[index] ? 'c-re':'']">{{bet[index][i]}}</span>
												<span class="w-100 dis-bl tac text-hide-1"  v-if='values[index][i]=="-1"||values[index][i]==-1'>[--]</span>
												<span class="w-100 dis-bl tac text-hide-1" v-else :class="[bet[index][i]==amidithiones[index] ? 'c-re':'']">[{{values[index][i]}}]</span>
											</div>
										</td>
										<!-- td5 -->
										<td>
											<div :class="[color[index] ? 'c-re':'']">{{amidithiones[index]}}</div>
										</td>
									</tr>
								</table>
							</div>
							<div class="w-100 pd-5" :class="closes?'':'dis-no'"></div>
							<div class="w-100 bd-b-10-f4"></div>
						</div>

					</div>
				</section>
				<lini-page v-if="dataslength"  :prompt='"用户暂未公开中奖信息"' :zheight='"100vh"' :zwidth='"100%"'  :tpyes="'record'"></lini-page>
		<!-- 	</div>

		</section> -->
		<div class="img_bg" v-if='hasTrueImg'>
			<div class="box_tab">
				<div class="img_box">
					<div class="border_box">
						<div class="swiper-container">
							<div class="swiper-wrapper">
								<div class="swiper-slide" v-for='(img,i) in tureImgUrl'>
									<img @click='closeImgBox()' tapmode :src="img" />
								</div>
							</div>
							<div class="swiper-pagination"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	let path = "";
	let _uid;
	let app2;
	let isgplotterytype = 0;
	let _schemeId_;
	let _lotteryTypeKey_;
	var pullToRefreshs;
	import {
		getTime,
		getIcon,
		_ImgUrl_,
		getCookie,
		setCookie,
		OverallData
	} from "../../js/common.js";
	import {
		Toast
	} from 'mint-ui';
	export default {
		data() {
			return {
				shareStatue: false, //分享状态
				cpname: OverallData().cpname,
				betsList: '',
				getPlayType: '',
				betValues: '',
				bet: '',
				values: '',
				amidithiones: '',
				color: '',
				lotType: '',
				homeItem: '',
				guestItem: '',
				saiGuoT: '',
				saiGuoB: '',
				slcolorT: '',
				slcolorB: '',
				betSCT: '',
				betSCB: '',
				indexs: -1,
				ishide: [],
				details: '',
				times: '',
				sessions: '',
				isShow: '',
				imgUrl: '',
				basketball: '',
				payTime: '',
				isgplotterytype: 0,
				tureImgUrl: [],
				baodiType: '',
				imgType: '',
				hasTrueImg: false,
				payBox: false,
				isDaYuWuBai: false,
				topStatus: '',
				refreshSwitch: false,
				starRefresh: false,
				closes:true,
				nsmbzly:true,
				dataslength:false,
			};
		},
		created() {
			document.querySelector('html').setAttribute('style', 'background-color:#f4f4f4;');
			_schemeId_ = this.$route.query.id;
			_lotteryTypeKey_ = this.$route.query.key;
			var newData = getCookie("newData");
			// if (!newData) {
			// 	this.$router.push({
			// 		name: 'login'
			// 	})
			// 	return false;
			// }
			_uid = this.$route.query.uid;
			GETurl(_schemeId_, _lotteryTypeKey_);
			this.getDetails(_schemeId_, _uid);
		},
		mounted() {
		},
		watch: {
			//监听刷新开关refreshSwitch状态
			refreshSwitch(val) {
				console.log(val);
				if (val == true && this.starRefresh) {
					this.$ajax.defaults.timeout = 50000;
					setTimeout(() => {
						pullToRefreshs.cancelLoading(); //刷新成功后调用此方法隐藏
					}, 2000)
					//pullToRefreshs.cancelLoading(); //刷新成功后调用此方法隐藏
				}
			}
		},
		beforeDestroy() {
			document.querySelector('html').removeAttribute('style');
			//离开页面就还原刷新状态
			this.$ajax.defaults.timeout = 50000;


		},
		methods: {
			closess: function() {
				var close = this.closes;
				if (close == false) {
					this.closes = true;
				} else {
					this.closes = false;
				}
			},
			shaidan: function() { //分享
				this.shareStatue = true;
			},
			hideShare: function() {
				this.shareStatue = false;
			},
			openDownload: function() { //前往下载
				var newData = getCookie('newData');
				var link = OverallData().download
				if (newData) {
					window.open(link + '?_userId=' + newData.sportId);
				} else {
					window.open(link);
				}
			},
			/* loadTop() {
			     this.getDetails(_schemeId_, _uid);
			     setTimeout(() => {
			         this.$refs.loadmore.onTopLoaded();
			     }, 1000)
			     // 加载更多数据
			 },
			 handleTopChange(status) {
			     this.topStatus = status;
			 }, */
			getDetails: function(_schemeId_, _uid) {
				let playType;
				let lotType;
				/*方案信息*/
				let data = [];
				data['schemeId'] = _schemeId_;
				data['userId'] = _uid;
				let dataes = this.Qs.stringify({
					'path': path,
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('http://api.r5792.cn/caipiaoshouye/index.php/home/index/getSchemeDetailVirtual',
						dataes
					)
					.then(ret => {
						if (ret.status == 500) {
							this.dataslength = true
							alert("服务器异常，请稍后重试");
						} else if (ret.status == 200) {
							console.log(ret);
							let datas = JSON.parse(ret.data.content);
							if (datas.code == 100000) {
								playType = datas;
								let details = datas.data;
								if (parseInt(details.schemeCost) > 500) {
									this.isDaYuWuBai = true;
								} else {
									this.isDaYuWuBai = false;
								}
								this.isgplotterytype = isgplotterytype;
								this.details = details;
								this.times = getTime(details.prizeSendTime, 6);
								if (details.lotteryType == "JCLQ") {
									this.sessions = details.sessionsCountTotal.length;
								} else if (details.lotteryType == "SCZC") {
									lotType = "SCZC"
								} else if (details.lotteryType == "SFZC") {
									lotType = "SFZC"
								} else if (details.lotteryType == "LCZC") {
									lotType = "LCZC"
								} else if (details.playTypeName == "一场制胜" && details.schemePrintState ==
									'SUCCESS') {
									lotType = "YCZS"
								}
								let isd = true;
								//  let isShow;
								if (details.lotteryType == "SCZC" || details.lotteryType == "SFZC" || details.lotteryType ==
									"LCZC") {
									isd = false;
								}
								if (details.schemePrintState == 'SUCCESS' && details.winningUpdateStatus ==
									'NONE' && isd || details.schemePrintState ==
									'UNPRINT') {
									this.isShow = true;
								} else {
									this.isShow = false;
								}
								this.imgUrl = getIcon(details.lottery);
								if (details.lotteryType == "JCLQ") {
									this.basketball = JCLQplayTypeName(details.playType);
								}
								this.payTime = getTime(details.createTime, 2);
								if (details.imgUrl) {
									var tureImgUrl = [];
									if (typeof(details.imgUrl) == 'string') {
										var arrImgS = details.imgUrl.split(',')
										for (let i = 0; i < arrImgS.length; i++) {
											tureImgUrl.push(_ImgUrl_ + arrImgS[i])
										}
										this.tureImgUrl = tureImgUrl;
									} else {
										for (let s = 0; s < details.imgUrl.length; s++) {
											tureImgUrl.push(_ImgUrl_ + details.imgUrl[s])
										}
										this.tureImgUrl = tureImgUrl;
									}

								}

								//出票状态
								let baodiType;
								let imgType;
								if (details.schemePrintState == "SUCCESS") {
									imgType = 'detail_s04';
									if (details.winningUpdateStatus == "NONE") {
										baodiType = '已出票';
									} else if (details.winningUpdateStatus == "PRICE_UPDATED") {
										if (details.isWon) {
											baodiType = '已中奖';
											imgType = 'detail_s08';
										} else if (!details.isWon) {
											baodiType = '未中奖';
											imgType = 'detail_s07';
										}
									} else if (details.winningUpdateStatus == "WINNING_UPDATED") {
										if (details.isWon) {
											baodiType = '已中奖';
											imgType = 'detail_s08';
										} else if (!details.isWon) {
											baodiType = '未中奖';
											imgType = 'detail_s07';
										}
									}
								} else if (details.schemePrintState == "UNPRINT") {
									baodiType = '未出票';
									imgType = 'detail_s05';
									if (details.schemeState == "CANCEL" || details.state == "CANCEL") {
										imgType = 'detail_s06';
										baodiType = '已撤单';
									}
								} else if (details.schemeState == "CANCEL" || details.state == "CANCEL") {
									imgType = 'detail_s06';
									baodiType = '已撤单';
								};
								this.baodiType = baodiType;
								this.imgType = imgType;
								this.contents(lotType);
							} else {
								this.dataslength = true
								alert('网络错误');
							}
						}
					})
					.catch(err => {
						//this.MintUi.Indicator.close();
						this.dataslength = true
						console.log(err);
					})
			},

			contents: function(lotType) {
				let data = [];
				data['schemeId'] = _schemeId_;
				data['userId'] = _uid;
				let dataes = this.Qs.stringify({
					'path': path,
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('http://api.r5792.cn/caipiaoshouye/index.php/home/index/getSchemeContentVirtual',
						dataes
					)
					.then(res => {
						this.refreshSwitch = true; //数据是否加载完成的开关==》开
						if (res.status == 200) {
							console.log(JSON.stringify(res));
							let dataes = JSON.parse(res.data.content);
							console.log(dataes.data.betslist)
							if (dataes.code == 100000) {

								let betsList = dataes.data.betslist;
								this.betsList = betsList;
								let amidithiones = amidithion(betsList, lotType)
								this.amidithiones = amidithiones;
								this.getPlayType = getPlayType(betsList, this.details.playTypeName);
								this.betValues = betOdds(betsList, 1,amidithiones,this.details.lotteryType);
								let bet = betOdds(betsList, 2,amidithiones,this.details.lotteryType);
								this.bet = bet;
								this.values = betOdds(betsList, 3,amidithiones,this.details.lotteryType);
								console.log(JSON.stringify(this.values));
								console.log(JSON.stringify(bet));
								
								this.color = discolor(bet, amidithiones);
								let type;
								if (lotType == 'SCZC') {
									type = 4;
								} else if (lotType == 'LCZC') {
									type = 6;
								}
								let homeItem = SCZC(betsList, 1, type);
								this.homeItem = homeItem;
								let guestItem = SCZC(betsList, 2, type);

								this.guestItem = guestItem;
								let saiGuoT = saiGuoScrll(betsList, 1, type);
								this.saiGuoT = saiGuoT;
								let saiGuoB = saiGuoScrll(betsList, 2, type);
								this.saiGuoB = saiGuoB;
								this.slcolorT = siLiuBianSe(homeItem, saiGuoT);
								this.slcolorB = siLiuBianSe(guestItem, saiGuoB);
								this.betSCT = betSColors(homeItem, saiGuoT);
								this.betSCB = betSColors(guestItem, saiGuoB)
								let ishide = [];
								for (let i = 0; i < betsList.length; i++) {
									ishide.push(true);
								}
								this.ishide = ishide;
								this.lotType = lotType;
							}
						} else {
							// this.dataslength = true
							alert('网络错误')
						}
					})
					.catch(err => {
						// this.dataslength = true
						this.refreshSwitch = true; //数据是否加载完成的开关==》开
						//this.MintUi.Indicator.close();
						console.log(err);
					})
			},
			matchingShow: function(i, e) {
				let ishide = this.ishide[i];
				// console.log(Vue);
				if (ishide) {
					this.$set(this.ishide, i, false)
				} else {
					this.$set(this.ishide, i, true)
				}
			},
			hasTrueImgNoPay: function() {
				this.payBox = true;
			},
			hasTrueImgGai: function() {
				this.hasTrueImg = true;
			},
			noTrueImg: function() {
				Toast('实票图片正在上传，请您耐心等待！')
			},
			closeImgBox: function() {
				this.hasTrueImg = false;
			},
			qiongbi: function() {
				this.payBox = false;
			},
			nsmbzl:function(){
				var nsmbzly = this.nsmbzly;
				if (nsmbzly) {
					this.nsmbzly = false;
				} else {
					this.nsmbzly = true;
				}
			},
			payApi: function() {
				let data = [];
				data['sponsorId'] = this.details.sponsorId;
				data['schemeNumber'] = this.details.schemeNumber;
				let dataes = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/checkHandleFee',
						dataes
					)
					.then(ret => {
						if (ret.status == 200) {
							var payMess = JSON.parse(ret.data.content);
							console.log(JSON.stringify(payMess));
							if (payMess.code == '100000') {
								this.payBox = false;
								this.getDetails(_schemeId_, _uid);
							} else {
								alert(payMess.data.message)
							}
						} else {
							alert(payMess.data.message)
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			OncloseWin: function() {
				this.$router.go(-1)
			}
		},
		filters: {
			capitalize: function(matchDate, num) {
				let time = new Date(matchDate);
				let y = time.getFullYear();
				let m = time.getMonth() + 1 >= 10 ? parseInt(time.getMonth() + 1) : "0" + parseInt(time.getMonth() +
					1);
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
				} else {
					return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
				}
			},
			handicaps: function(handicap) {

				if (handicap > 0) {
					handicap = '+' + handicap 
				} else if (handicap == 0) {
					handicap = ''
				} else {
					handicap =  handicap 
				};
				return handicap;
			},
			playTypeStr: function(data) {
				let keys = [];
				for (let key in data) {
					keys.push(data[key])
				}
				return keys[0];
			},
			fengelq: function(str) {
				var strs = new Array(); //定义一数组 
				strs = str.split(":"); //字符分割 
				return strs[1] + ":" + strs[0];
			}

		}
	}

	function JCLQplayTypeName(typeNames) {
		let typeName;
		switch (typeNames) {
			case 'SF':
				typeName = '胜负';
				break
			case 'RFSF':
				typeName = '让分胜负';
				break;
			case 'DXF':
				typeName = '大小分';
				break;
			case 'HHGG':
				typeName = '混合过关';
				break;
			case 'DGGP':
				typeName = '单关';
				break;
			case 'SFC':
				typeName = '胜分差';
				break;
		}
		return typeName;
	};

	function GETurl(_schemeId_, _lotteryTypeKey_) {
		if (_schemeId_) {
			if (_lotteryTypeKey_ == "rxjc" || _lotteryTypeKey_ == "sfzc14") {
				_lotteryTypeKey_ = "sfzc";
			}
			switch (_lotteryTypeKey_) {
				case "ssq":
					path = "number/lows/ssq";
					break;
				case "dlt":
					path = "number/lows/dlt";
					break;
				case "pl":
					path = "number/lows/pl";
					break;
				case "pl3":
					path = "number/lows/pl";
					break;
				case "pl5":
					path = "number/lows/pl";
					break;
				case 'fc3d':
					path = "number/lows/welfare3d";
					break;
				case "welfare3d":
					path = "number/lows/welfare3d";
					break;
				case "seven":
					path = "number/lows/seven";
					break;
				case "bjklb":
					path = "number/keno/bjklb";
					isgplotterytype = 1;
					break;
				case 'kl8':
					path = "number/keno/bjklb";
					isgplotterytype = 1;
					break;
				case "sdel11to5":
					path = "number/keno/sdel11to5";
					isgplotterytype = 1;
					break;

				case "cqssc":
					path = "number/keno/cqssc";
					isgplotterytype = 1;
					break;
				case "xjssc":
					path = "number/keno/xjssc";
					isgplotterytype = 1;
					break;
				case "gdel11to5":
					path = "number/keno/gdel11to5";
					isgplotterytype = 1;
					break;
				case "jxel11to5":
					path = "number/keno/jxel11to5";
					isgplotterytype = 1;
					break;
				case "gdklsf":
					path = "number/keno/gdklsf";
					isgplotterytype = 1;
					break;
				case "gdkls":
					path = "number/keno/gdklsf";
					isgplotterytype = 1;
					break;
				case "tjklsf":
					path = "number/keno/tjklsf";
					isgplotterytype = 1;
					break;
				case "tjkls":
					path = "number/keno/tjklsf";
					isgplotterytype = 1;
					break;

				case "ahk3":
					path = "number/keno/ahk3";
					isgplotterytype = 1;
					break;
				case "hbk3":
					path = "number/keno/hbk3";
					isgplotterytype = 1;
					break;
				case "jsk3":
					path = "number/keno/jsk3";
					isgplotterytype = 1;
					break;
				case "jczq":
					path = "jc/jczq";
					break;
				case "jclq":
					path = "jc/jclq";
					break;
				case "dczc":
					path = "jc/dczc";
					break;
				case "sczc":
					path = "jc/sczc";
					break;
				case "sfzc":
					path = "jc/sfzc";
					break;
				case "lczc":
					path = "jc/lczc";
					break;
				case "rxjc":
					path = "jc/sfzc";
					break;
				case "sfzc14":
					path = "jc/sfzc";
					break;
			}
			console.log(path)
			// schemeId = _schemeId_;
		}
	}

	function getPlayType(betsList, name) {
		console.log(name)
		let playTypes = [];
		for (let i = 0; i < betsList.length; i++) {
			let typeObj = betsList[i].playTypeStr;
			let arr = [];

			for (let key in typeObj) {
				console.log(key);
				arr.push(typeObj[key])
			}
			if (name == '二选一') {
				playTypes.push('二选一');
			} else {
				playTypes.push(arr[0]);
			}
			console.log(playTypes)
		}
		return playTypes;
	};

	function betOdds(options, num,amidithiones,typeS) {
		let allArrs = [];
		let allKeys = [];
		let allValues = [];
		let betAmidithiones=amidithiones;
		console.log(betAmidithiones);
		for (let i = 0; i < options.length; i++) {
			//			console.log(JSON.stringify(options));
			let keys = [];
			let values = [];
			let forInTi = [];
			let arrs = options[i].betsOption;
			let wanfatype = '';
			for (let key in arrs) {

				if(typeS=='DCZC'){
					if (arrs["SXDS"]) {
						wanfatype = 'sxds';
					} else if (arrs["BF"]) {
						wanfatype = 'bf';
					} else if (arrs["BQQ"]) {
						wanfatype = 'bqq';
					} else if (arrs["SPF"]) {
						wanfatype = 'spf';
					} else if (arrs["ZJQS"]) {
						wanfatype = 'zjqs';
					}
				}
				let arreValue = arrs[key];
				forInTi.push(arreValue);
				for (let bet in arreValue) {
					keys.push(bet);
					if (wanfatype == 'sxds') {
						if (arreValue[bet] == '-1') {
							values.push(arreValue[bet]);
						} else if (options[i].sxdcResultSp&&amidithiones[i]==bet) {
							values.push(options[i].sxdcResultSp);
						} else {
							values.push(arreValue[bet]);
						}
					} else if (wanfatype == 'bf') {
						if (arreValue[bet] == '-1') {
							values.push(arreValue[bet]);
						} else if (options[i].bfResultSp&&amidithiones[i]==bet) {
							values.push(options[i].bfResultSp);
						} else {
							values.push(arreValue[bet]);
						}
					} else if (wanfatype == 'zjqs') {
						if (arreValue[bet] == '-1') {
							values.push(arreValue[bet]);
						} else if (options[i].zjqsResultSp&&amidithiones[i]==bet) {
							values.push(options[i].zjqsResultSp);
						} else {
							values.push(arreValue[bet]);
						}
					} else if (wanfatype == 'bqq') {
						if (arreValue[bet] == '-1') {
							values.push(arreValue[bet]);
						} else if (options[i].bqqResultSp&&amidithiones[i]==bet) {
							values.push(options[i].bqqResultSp);
						} else {
							values.push(arreValue[bet]);
						}
					} else if (wanfatype == 'spf') {
						if (arreValue[bet] == '-1') {
							values.push(arreValue[bet]);
						} else if (options[i].spfResultSp&&amidithiones[i]==bet) {
							values.push(options[i].spfResultSp);
						} else {
							values.push(arreValue[bet]);
						}
					} else {
						values.push(arreValue[bet]);
					}

					console.log(values);
				};

				function swapArray(arr, index1, index2) {
					arr[index1] = arr.splice(index2, 1, arr[index1])[0];
					return arr;
				};

				function zIndexBottom(arr, index, length) {
					if (index != 0) {
						//首先判断当前元素需要上移几个位置,置底移动到数组的第一位
						let moveNum = index - 0;
						//循环出需要一个一个上移的次数
						for (let z = 0; z < moveNum; z++) {
							swapArray(arr, index, index - 1);
							index--;
						}
					} else {}
					return arr;
				};
				let sting = keys.join(',')
				if (sting == '平,胜,负') {
					keys = '胜,平,负'.split(',');
					values = zIndexBottom(values, 1, values.length);
				} else if (sting == '平,胜') {
					keys = '胜,平'.split(',');
					values = zIndexBottom(values, 1, values.length);
				} else if (sting == '让球平,让球胜,让球负') {
					keys = '让球胜,让球平,让球负'.split(',');
					values = zIndexBottom(values, 1, values.length);
				} else if (sting == '让球平,让球胜') {
					keys = '让球胜,让球平'.split(',');
					values = zIndexBottom(values, 1, values.length);
				}
				allArrs.push(forInTi);
				allValues.push(values);
				allKeys.push(keys);
			}
		}

		if (num == 1) {
			return allArrs;
			console.log(allArrs);
		} else if (num == 2) {
			return allKeys;
			console.log(allKeys);
		} else if (num == 3) {
			return allValues;
			console.log(allValues);
		}
	};

	function amidithion(detail, lotType) {
		let amidithions = [];
		for (let i = 0; i < detail.length; i++) {
			if (detail[i].result) {
				let saiguo = detail[i].result.split(',');;
				if (saiguo.length > 1) {
					let num;
					let typeObj = detail[i].playTypeStr;
					let arr;
					for (var key in typeObj) {
						arr = typeObj[key]
					}
					if (lotType !== 'YCZS') {
						switch (arr) {
							case '胜平负':
								num = 0;
								break;
							case '让球胜平负':
								num = 1;
								break;
							case '比分':
								num = 2;
								break;
							case '半全场':
								num = 3;
								break;
							case '进球数':
								num = 4;
								break;
							case '胜分差':
								num = 2;
								break;
							case '大小分':
								num = 0;
								break;
							case '胜负':
								num = 1;
								break;
							case '让分胜负':
								num = 3;
								break;
						}
					} else {
						switch (arr) {
							case '胜平负':
								num = 1;
								break;
							case '让球胜平负':
								num = 0;
								break;

						}
					}

					amidithions.push(saiguo[num]);
				} else {
					amidithions.push(detail[i].result)
				}
			} else {
				amidithions.push("待定");
			}
		}
		return amidithions;
	}

	function discolor(bet, amidithiones) {
		let color = [];
		for (let i = 0; i < bet.length; i++) {

			if (bet[i].indexOf(amidithiones[i]) > -1) {
				color.push(true);
			} else {
				color.push(false);
			}

		}
		return color
	}

	function SCZC(data, num, type) {
		let homeItems = [];
		let guestItems = [];
		for (let i = 0; i < data.length; i++) {
			if (type == 4) {
				homeItems.push(data[i].homeItem.split(','));
				guestItems.push(data[i].guestItem.split(','));
			} else if (type == 6) {
				homeItems.push(data[i].half.split(','));
				guestItems.push(data[i].full.split(','));
			}
		}
		if (num == 1) {
			return homeItems;
		} else if (num == 2) {
			return guestItems
		}
	};

	function saiGuoScrll(data, num, type) {
		let topArr = [];
		let bomArr = [];
		for (let i = 0; i < data.length; i++) {
			if (type == 4 && data[i].resultScore) {
				topArr.push(data[i].resultScore.split(':')[0]);
				bomArr.push(data[i].resultScore.split(':')[0]);
			} else if (type == 6 && data[i].resultScore) {
				let arrSix = data[i].resultScore.split(',');
				let arrBan = arrSix[0].split(':');
				let arrQuan = arrSix[1].split(':');
				let banNum1 = parseInt(arrBan[0]);
				let banNum2 = parseInt(arrBan[1]);
				let quanNum1 = parseInt(arrQuan[0]);
				let quanNum2 = parseInt(arrQuan[1]);
				let banResult = banNum1 - banNum2;
				let quanResult = quanNum1 - quanNum2;
				let banChang;
				let quanChang;
				if (banResult < 0) {
					banChang = '0';
				} else if (banResult == 0) {
					banChang = '1';
				} else {
					banChang = '3';
				}
				if (quanResult < 0) {
					quanChang = '0';
				} else if (quanResult == 0) {
					quanChang = '1';
				} else {
					quanChang = '3';
				};
				topArr.push(banChang);
				bomArr.push(quanChang);
			}
		}
		if (num == 1) {
			return topArr;
		} else if (num == 2) {
			return bomArr;
		}
	}

	function siLiuBianSe(array, arr) {
		let slcolorT = [];
		for (let i = 0; i < array.length; i++) {
			let str = parseInt(arr[i]);
			let strs = array[i];
			if (str > 3) {
				str = 3
			};
			let xiangDeng = false;
			for (let n = 0; n < strs.length; n++) {
				let betStr = parseInt(strs[n]);
				if (betStr == str) {
					xiangDeng = true;
				}
			}
			slcolorT.push(xiangDeng);
		}
		return slcolorT;
	};

	function betSColors(array, arr) {

		let betSColor = [];
		for (let i = 0; i < array.length; i++) {
			let str = parseInt(arr[i]);
			let strs = array[i];
			if (str > 3) {
				str = 3
			};
			let xiangDeng;
			let slcolorT = [];
			for (let n = 0; n < strs.length; n++) {
				let betStr = parseInt(strs[n]);
				if (betStr == str) {
					slcolorT.push(true);
				} else {
					slcolorT.push(false);
				}
			}
			betSColor.push(slcolorT);
		}
		return betSColor;
	};
</script>

<style scoped>
	@import "../../css/scheme_detail_alone.css";

	header {
		position: fixed;
	}
	#main{
		margin-top: 2.25rem;
	}
</style>
