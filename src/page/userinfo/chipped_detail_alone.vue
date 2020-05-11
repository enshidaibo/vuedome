<template>
	<div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" tapmode @click="OncloseWin()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">合买方案详情</div>
			<div class="aui-pull-right aui-btn subhead">
				<span @click="shaidan()">晒单</span>
			</div>
		</header>
		<div class="header_clone" v-if='shareLink'>
			<div class="header_clone_left">
				<img src="../../assets/home_logo.png" alt="" class="img1">
				<div class="clone_box1">
					<span class="sp1">美奇彩票</span>
					<span class="sp2">手机购彩-让美好生活更便捷</span>
				</div>
			</div>
			<div class="header_clone_right">
				<img src="../../assets/home_btn.png" alt="" class="img2" @click="xiazai1()">
			</div>
		</div>
		<!-- 分享模态框 -->
		<div v-if="shareStatue" class="share_box" @click="hideShare()">
			<div class="share_cont">
				<div class="quxiao">取消</div>
				<div class="down" @click="openDownload()">前往下载</div>
			</div>
		</div>
		<section id='main'>
			<section class="aui-refresh-content">
				<div class="aui-content">
					<div class="main w-100 bg-w" id='main1' v-if='betsList'>
						<div class="refactorHeader">
							<div class="w-100 mr-0 flex-box  headerbox" id='headerbox'>
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
										<div class="type_box w-70 flex-box " v-if='details.lotteryType == "JCZQ"'>
											<span class="fs-16 fs-we w-100  tal pd-l-10 v-bon">竞彩足球</span>
											<span v-if='details.playTypeName=="单关固赔"' class="fs-12 tal c-9b w-100 pd-l-10 v-bon pd-t-5">单关</span>
											<!-- <span v-else-if='details.playTypeName=="胜平负"' class="fs-13 tal c-cc pd-l-26 v-bon pd-t-5">让球胜平负</span> -->
											<span v-else-if='details.playTypeName=="混合投注"' class="fs-13 tal c-cc pd-l-26 v-bon pd-t-5">混合过关</span>
											<span v-else class="fs-13 tal c-cc pd-l-26 v-bon pd-t-5">{{details.playTypeName}}</span>
										</div>
										<div class="type_box w-70 flex-box " v-if='details.lotteryType == "JCLQ"'>
											<span class="fs-16 fs-we w-100 tal pd-l-10 v-bon">竞彩篮球</span>
											<span class="fs-13 tal c-cc pd-l-26 v-bon pd-t-5">{{basketball}}</span>
										</div>
										<div class="type_box w-70 flex-box " v-if='details.lotteryType == "DCZC"'>
											<span class="fs-16 fs-we w-100 tal pd-l-10 v-bon">北京单场</span>
											<span class="fs-13 tal c-cc pd-l-26 v-bon pd-t-5">{{details.playType}}&nbsp;&nbsp;&nbsp;第{{details.periodNumber}}期</span>
										</div>
										<div class="type_box w-70 flex-box " v-if='details.lotteryType == "SFZC"'>
											<span class="fs-16 fs-we w-100 tal pd-l-10 v-bon">胜负彩</span>
											<span class="fs-13 tal c-cc pd-l-26 v-bon pd-t-5">第{{details.periodNumber}}期</span>
										</div>
										<div class="type_box w-70 flex-box " v-if='details.lotteryType == "LCZC"'>
											<span class="fs-16 fs-we w-100 tal pd-l-10 v-bon">六场半全场</span>
											<span class="fs-13 tal c-cc pd-l-26 v-bon pd-t-5">第{{details.periodNumber}}期</span>
										</div>
										<div class="type_box w-70 flex-box " v-if='details.lotteryType == "SCZC"'>
											<span class="fs-16 fs-we w-100 tal pd-l-10 v-bon"> 四场进球</span>
											<span class="fs-13 tal c-cc pd-l-26 v-bon pd-t-5">第{{details.periodNumber}}期</span>
										</div>
									</div>

								</div>
								<div class="box_right w-35">
									<img class="w-90" :src="require('../../assets/userinfo/'+imgType+'.png')" />
								</div>
							</div>
							<div class="refactorwin" v-if='isGenDanRen'>
								<div class="refactorwinxiji flex-box mr-0">
									<div class="money_box">
										<span class="dis-bl w-100 fs-13 c-33 tac fs-we" v-if='details.loginSubscribedCost'>{{(details.loginSubscribedCost*1).toFixed(2)}}元</span>
										<span class="dis-bl w-100 fs-13 c-9b tac fs-we" v-else>- -</span>
										<span class="dis-bl w-100 fs-12 c-99 tac ">我的认购金额</span>
									</div>
									<div class="money_box">
										<span class="dis-bl w-100 fs-13 tac c-f8 fs-we" v-if="caseType=='已中奖'">{{caseType}}</span>
										<span class="dis-bl w-100 fs-13  tac c-f8 fs-we" v-else-if="caseType=='未中奖'">{{caseType}}</span>
										<span class="dis-bl w-100 fs-13 c-f8 tac fs-we" v-else>未开奖</span>
										<span class="dis-bl w-100 fs-12 c-99 tac">方案状态</span>
									</div>
									<div class="winmoney_box">
										<span v-if="!details.prize||details.prize=='- -'" class="dis-bl w-100 fs-13 c-99 tac fs-we">-
											-</span>
										<span v-else class="dis-bl w-100 fs-12 c-f8 tac fs-we">{{(details.prize*1).toFixed(2)}}元</span>
										<span class="dis-bl w-100 fs-12 c-99 tac ">我的中奖金额</span>
									</div>
								</div>
							</div>
						</div>
						<ul class="w-100  pd-b-5 bd-b-10-f4 ulbox">
							<li class="flex-box expect">
								<span class="dis-bl fs-14">预计派奖</span>
								<span class="dis-bl w-65 fs-14 c-66">{{times}}</span>
							</li>
						</ul>
						<!-- <div class="w-100 bd-b-10-f4"></div> -->
						<div class="content_box w-100">
							<div class=" fs-14 c-33 meassagesren" :class="chosesa?'bd-b-1':''" @click="chosesafn()">
								发起人信息
								<span class="fr dis-bl w-60 tar text-hide-1 c-bl" :class="chosesa?'close':''"></span>
							</div>
							<ul class="w-100  ulboxh" :class="chosesa?'':'dis-no'">
								<li class="  flex-box ">
									<span class="dis-bl  fs-13 c-66">发起人</span>
									<span class="dis-bl w-65 fs-13 c-99">{{details.sponsorName|mobileHide(3,4)}}</span>
								</li>
								<li class=" flex-box ">
									<span class="dis-bl  fs-13 c-66">中奖次数</span>
									<span class="dis-bl w-65 fs-13 c-99">
										<i class="c-re" v-if='details.sponsorWinCount'>{{details.sponsorWinCount}}</i><i v-else>0</i>次</span>
								</li>
								<li class=" flex-box ">
									<span class="dis-bl  fs-13 c-66">中奖金额</span>
									<span class="dis-bl w-65 fs-13 c-99"><i class="c-re" v-if='details.sponsorTotalBonus'>{{(details.sponsorTotalBonus*1).toFixed(2)}}</i><i
										 v-else>0.00</i>元</span>
								</li>
							</ul>
							<div class="w-100 bd-b-10-f4"></div>
							<div class=" fs-14 c-33 meassages" :class="chosesb?'bd-b-1':''" @click="chosesbfn()">
								方案信息
								<span class="fr dis-bl w-60 tar text-hide-1 c-bl" :class="chosesb?'close':''"></span>
							</div>
							<ul class="w-100  ulboxh" :class="chosesb?'':'dis-no'">
								<li class="flex-box">
									<span class="dis-bl  fs-13 c-66">方案总金额</span>
									<span class="dis-bl w-65 fs-12 c-66">{{(details.schemeCost*1).toFixed(2)}}元</span>
								</li>
								<li class="flex-box">
									<span class="dis-bl  fs-13 c-66">发起人提成</span>
									<span class="dis-bl w-65 fs-12 c-99">{{details.commissionRate*100}}%</span>
								</li>
								<li class="flex-box">
									<span class="dis-bl  fs-13 c-66">承诺保底</span>
									<span class="dis-bl w-65 fs-13 c-99" v-if='details.schemePrintState == "SUCCESS"'>{{details.actualBaoDiCost|minimum(details.schemeCost)}}%</span>
									<span class="dis-bl w-65 fs-13 c-99" v-else-if='details.schemePrintState == "UNPRINT"'>{{details.promiseBaoDiCost|minimum(details.schemeCost)}}%</span>
								</li>
								<li class="flex-box">
									<span class="dis-bl  fs-13 c-66">方案进度</span>
									<span class="dis-bl w-65 fs-13 c-99">{{details.progressRate}}%</span>
								</li>
								  <li class="flex-box">
                            <span class="dis-bl  fs-13 c-66">方案中奖金额</span>
                            <span v-if="!details.prizeAfterTax||details.prizeAfterTax=='--'" class="dis-bl w-65 fs-13 c-99">- -</span>
                            <span v-else class="dis-bl w-65 fs-13 c-99"><i class="c-re">{{(details.prizeAfterTax*1).toFixed(2)}}</i>元</span>
                        </li>
								<!--<li class="w-85 mr-0 flex-box pd-t-10">
									<div class="w-50 flex-box">
										<span class="dis-bl w-50 fs-12 fs-we">承诺保底</span>
										<span class="dis-bl w-50 fs-12 c-9b" v-if='details.schemePrintState == "SUCCESS"'>{{details.actualBaoDiCost|minimum(details.schemeCost)}}%</span>
										<span class="dis-bl w-50 fs-12 c-9b" v-else-if='details.schemePrintState == "UNPRINT"'>{{details.promiseBaoDiCost|minimum(details.schemeCost)}}%</span>
									</div>
									<div class="w-50 flex-box">
										<span class="dis-bl w-50 fs-12 fs-we">方案进度</span>
										<span class="dis-bl w-50 fs-12 c-9b">{{details.progressRate}}%</span>
									</div>
								</li>
								<li class="w-85 mr-0 flex-box pd-t-10">
									<div class="w-50 flex-box">
										<span class="dis-bl w-50 fs-12 fs-we">预计派奖</span>
										<span class="dis-bl w-50 fs-12 c-9b">{{details.prizeSendTime|capitalize(1)}}</span>
									</div>
									<div class="w-50 flex-box">
										<span class="dis-bl w-50 fs-12 fs-we">方案状态</span>
										<span class="dis-bl w-50 fs-12 c-9b">{{caseType}}</span>
									</div>
								</li> -->
							</ul>
							<div class="w-100 bd-b-10-f4"></div>
							<div id="tables" class=''>
								<div class="content_title   fs-14" :class="unfold?'bd-b-1':''" @click="unfolds()">方案内容
									<i v-if="caseType=='未出票'||caseType=='未满'" class="c-03">(&nbsp;未出票&nbsp;)</i>
									<i v-else-if="caseType=='已撤单'" class="c-03">(&nbsp;{{caseType}}&nbsp;)</i>
									<i v-else class="c-03">(&nbsp;已出票&nbsp;)</i>
									<span class="fr dis-bl w-60 tar text-hide-1 c-f8" :class="unfold ?'close':''">{{state}}</span></div>
								<div :class="unfold?'':'dis-no'">
									<ul class="w-100 bd-b-1 ulboxj">
										<li class=" mr-0 flex-box ">
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
									<table class="w-100 tables gaiwi" v-if='lotType=="SCZC"||lotType=="SFZC"||lotType=="LCZC"'>
										<tr class="w-100">
											<td>场次</td>
											<td>主队VS客队</td>
											<!-- <td>玩法</td> -->
											<td>投注(赔率)</td>
											<td>赛果</td>
										</tr>
										<tr class="w-100" v-for='(d,index) in betsList'>
											<!-- td1 -->
											<td>
												<div>{{d.gameName}}</div>
												<div v-if="d.lineId*1<10">00{{d.lineId}}</div>
												<div v-else-if="d.lineId*1<100">0{{d.lineId}}</div>
												<div v-else>{{d.lineId}}</div>
												
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
													<span class="w-100 dis-bl tac text-hide-1">[<i v-for='(lis,s) in homeItem[index]' :class="[betSCT[index][s]? 'c-re':'']">{{lis}}</i>]</span>
												</div>
												<div class="flex-box w-100 mr-0" v-if='guestItem'>
													<span class="w-100 dis-bl tac text-hide-1">客队</span>
													<span class="w-100 dis-bl tac text-hide-1">[<i v-for='(li,ind) in guestItem[index]' :class="[betSCB[index][ind] ? 'c-re':'']">{{li}}</i>]</span>
												</div>
											</td>
											<td v-else-if='lotType=="LCZC"'>
												<div class="flex-box w-100 mr-0" v-if="homeItem">
													<span class="w-100 dis-bl tac text-hide-1">半场</span>
													<span class="w-100 dis-bl tac text-hide-1">[<i v-for='(lis,s) in homeItem[index]' :class="[betSCT[index][s]? 'c-re':'']">{{lis}}</i>]</span>
												</div>
												<div class="flex-box w-100 mr-0" v-if='guestItem'>
													<span class="w-100 dis-bl tac text-hide-1">全场</span>
													<span class="w-100 dis-bl tac text-hide-1">[<i v-for='(li,ind) in guestItem[index]' :class="[betSCB[index][ind]? 'c-re':'']">{{li}}</i>]</span>
												</div>
											</td>
											<!-- <td v-else-if='lotType=="SFZC"'>
										<div class="flex-box w-100 mr-0 tac"><span class="w-100 dis-bl tac text-hide-1">[{{d.betsContent}}]</span></div>
									</td> -->
											<td v-else>
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
										<div class="w-100" v-for='(d,index) in betsList'>
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
														<div v-for='(list,i) in bet[index]' class="flex-box w-100 mr-0">
															<span class="w-100 dis-bl tac text-hide-1" :class="[bet[index][i]==amidithiones[index] ? 'c-re':'']">{{bet[index][i]}}</span>
															<span class="w-100 dis-bl tac text-hide-1" v-if='values[index][i]=="-1"||values[index][i]==-1'>[--]</span>
															<span class="w-100 dis-bl tac text-hide-1" v-else :class="[bet[index][i]==amidithiones[index] ? 'c-re':'']">[{{values[index][i]}}]</span>
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
												<tr v-for='(l,c) in d.yczsMatchList'>
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
														<div><span class="dis-bl w-100">{{l.betType}}</span><span class="dis-bl w-100">[{{l.betOdds}}]</span></div>
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
										<tr class="w-100" v-for='(d,index) in betsList'>
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
												<div v-for='(list,i) in bet[index]' class="flex-box w-100 mr-0">
													<span class="w-100 dis-bl tac text-hide-1" :class="[bet[index][i]==amidithiones[index] ? 'c-re':'']">{{bet[index][i]}}</span>
													<span class="w-100 dis-bl tac text-hide-1" v-if='values[index][i] =="-1"||values[index][i] ==-1'>[--]</span>
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
							</div>
							<div class="w-100 pd-5 " :class="unfold?'':'dis-no'"></div>
							<div class="w-100 bd-b-10-f4"></div>
							<div class="">
								<div class="personlist bd-b-1 fs-14" @click="openBoxs()">跟单人列表<span class="fr dis-bl w-60 tar text-hide-1 c-f8"
									 :class="openBox?'close':''">{{personlist.length}}人</span></div>
								<table class="w-100 tables tab_no_bor" :class="openBox?'':'dis-no'">
									<tr>
										<td>用户名</td>
										<td>跟单金额</td>
										<td>中奖金额</td>
										<td>时间</td>
									</tr>
									<tr v-for='item in personlist'>
										<!-- td1 -->
										<td>{{item.userName|mobileHide(3,4)}}</td>
										<!-- td2 -->
										<td>{{item.cost}}</td>
										<!-- td3 -->
										<td v-if='item.bonus'>{{item.bonus}}</td>
										<td v-else>- -</td>
										<!-- td4 -->
										<td>
											<div>{{item.createTime.split(' ')[0]}}</div>
											<div>{{item.createTime.split(' ')[1]}}</div>
										</td>
									</tr>
								</table>
							</div>
							<div class="w-100 pd-5" :class="openBox?'':'dis-no'"></div>
							<div class="w-100 bd-b-10-f4"></div>
							<div class="content_title   fs-14" :class="nsmbzly?'bd-b-1':''" @click="nsmbzl()">更多信息
								<span class="fr dis-bl w-60 tar text-hide-1 c-f8" :class="nsmbzly ?'close':''"></span>
							</div>
							<ul class="w-100 bg-w " id="message" :class="nsmbzly?'':'dis-no'">
								<li class=" mr-0 flex-box ">
									<span class="dis-bl w-30  ">出票详情</span>
									<!-- <span class="dis-bl w-70 fs-13 c-03 text-line-b" v-if="details.schemePrintState == 'SUCCESS'&& details.imgUrl[0]&&isDaYuWuBai"><i
										 @click="hasTrueImgGai()" tapmode>查看实票</i></span>
									<span class="dis-bl w-70 fs-13 c-03 text-line-b" v-else-if="details.schemePrintState == 'SUCCESS'&& details.imgUrl[0]&&details.payOrNot"><i
										 @click="hasTrueImgGai()" tapmode>查看实票</i></span>
									<span class="dis-bl w-70 fs-13 c-03 text-line-b" v-else-if="details.schemePrintState == 'SUCCESS'&& !details.payOrNot&&!isDaYuWuBai"><i
										 @click="hasTrueImgNoPay()" tapmode>查看实票</i></span>
									<span class="dis-bl w-70 fs-13 c-03 text-line-b" v-else-if="details.schemePrintState == 'SUCCESS'&& !details.imgUrl[0]&&isDaYuWuBai"><i
										 @click="noTrueImg()" tapmode>实票上传中...</i></span>
									<span class="dis-bl w-70 fs-13 c-03 text-line-b" v-else-if="details.schemePrintState == 'SUCCESS'&& !details.imgUrl[0]&&details.payOrNot"><i
										 @click="noTrueImg()" tapmode>实票上传中...</i></span> -->
										 <span class="dis-bl w-70 fs-13 c-03 " v-if="details.schemePrintState == 'SUCCESS'"><i
										 	 	  tapmode>已出票</i></span>
									<span class="dis-bl w-70 fs-13 c-99" v-if="details.schemePrintState == 'UNPRINT'">未出票</span>
									<span class="dis-bl w-70 fs-13 c-99" v-if="details.schemePrintState == 'FAILED'">出票失败</span>
								</li>
								<li class=" mr-0 flex-box ">
									<span class="dis-bl w-30  ">支付时间</span>
									<span class="dis-bl w-70 fs-13 c-99">{{payTime}}</span>
								</li>
								<li class=" mr-0 flex-box ">
									<span class="dis-bl w-30  ">方案编号</span>
									<span class="dis-bl w-70 fs-13 c-99">{{details.screenNumber}}</span>
								</li>
								<li class=" mr-0 flex-box ">
									<span class="dis-bl w-30  ">温馨提示</span>
									<span class="dis-bl w-70 fs-13 c-99">奖金直接打入您的账户</span>
								</li>
							</ul>
							<div class="w-100 laja"></div>
						</div>
					</div>
				</div>
			</section>
			<!-- 键盘 -->
			<!-- <transition name="fade"> -->
			<div class="w-100 keyboard_box" v-if='!keyboardShow'>
				<div class="close_keyboard w-100"><span class="icon_down" @click="keyboardHide()" tapmode></span></div>
				<ul class="keyboard clearfix" id="keyboard">
					<li class="num" v-for='(li,index) in keyboards' :class="index==9||index==10||index==11?'bor_b_1':''"><span @click='inputNum(li,index)'
						 tapmode='bs'>{{li}}</span></li>
				</ul>
			</div>
			<!-- </transition> -->
			<div class="w-100 pos-fi b-0 l-0 z-99 pay_box bg-w" v-if='canPay'>
				<div class="w-100 flex-box">
					<div class="w-70 flex-box">
						<div class="w-100 flex-box btnjj">
							<div class="fs-16 c-99">购买</div>
							<div class="btnjjbox flex-box">
								<div @click='keyboardjian()' tapmode></div>
								<div @click='keyboardShows()' tapmode>{{canSubscribedCost}}</div>
								<div @click='keyboardjia()' tapmode></div>
							</div>
							<div class="fs-16 c-99">份</div>
						</div>
						<div class="w-100 shengyu">当前合买剩余<i class="c-f8">{{details.canSubscribedCost}}</i>份</div>
					</div>
					<div class="w-30 payBtnXin" @click="pay()" tapmode>付款</div>
					<!-- <span class="fs-16 c_blue mr-r-5 pry_text">购买</span><span class="tac pay_num" @click='keyboardShows()' tapmode>{{canSubscribedCost}}</span><span
							 class="fs-16 c_blue pd-l-5 pry_text">份</span><span class="pos-ab pay_btn" @click="pay()" tapmode>付款</span> -->
				</div>
			</div>
			<div v-else-if="!canPay&&shareLink" class="nocopies flex-box w-100">
				<div>当前合买剩余<i class="c-33 fs-18">&nbsp;{{details.canSubscribedCost}}&nbsp;</i>份</div>
				<div  @click="CashTips = true">查看更多合买</div>
			</div>
			<!-- 查看实票 -->
			<div class="tishi_box" v-if='payBox'>
				<div class="tishi_info">因{{cpname}}票在索要实票的过程中有一定费用的产生，若您的方案金额未达500元时要查看实票，需要支付1元手续费后即可查看。</div>
				<div class="btn_box">
					<div class="quxiao" @click="qiongbi()" tapmode>取消</div>
					<div class="queding" @click="payApi()" tapmode>确定</div>
				</div>
			</div>

		</section>

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
		<!-- 红包投注弹窗star -->
		<div class="paybgBoxx" v-show='payPopup'></div>
		<div class="paybgBox">
			<div class="payBox" id="payPopup" :class="payPopup?'payPopup':''">
				<div class="sloganBox">
					<div @click.stop="hidepayPopup()"><img src="../../assets/goucai/chacha.png" /></div>确认付款
				</div>
				<div class="paytabtitle">
					<div class="payMoney">￥<span>{{(canSubscribedCost*1).toFixed(2)}}</span></div>
					<div class="paytype" v-if='details.lotteryType == "JCZQ"'>竞彩足球</div>
					<div class="paytype" v-if='details.lotteryType == "JCLQ"'>竞彩篮球</div>
					<div class="paytype" v-if='details.lotteryType == "DCZC"'>北京单场</div>
					<div class="paytype" v-if='details.lotteryType == "SFZC"'>胜负彩</div>
					<div class="paytype" v-if='details.lotteryType == "LCZC"'>六场半全场</div>
					<div class="paytype" v-if='details.lotteryType == "SCZC"'>四场进球</div>
				</div>
				<!-- <div class="paytab" :class="hongbaoType?'greybg':''" @click.stop='choseTypeyes(1)'>
					<div class="payiconimage">
						<img v-if="hongbaoType" src="../../assets/goucai/quanimageshui.png" />
						<img v-else src="../../assets/goucai/quanimages.png" />
					</div>
					<div class="paytextbox" :class="hongbaoType?'greyText':''">
						<div class="paytextup">红包支付<img src="../../assets/goucai/tuijian.png" /></div>
						<div class="paytextdown" v-if="hongbaoType">红包余额不足</div>
						<div class="paytextdown" v-else>当前彩种可使用红包支付</div>
					</div>
					<div class="choseType notxuan" v-if="hongbaoType"></div>
					<div class="choseType" :class="dianjiChonse?'choseTypeyes':''" v-else></div>
				</div> 
				<div class='xianboxs' :class="hongbaoType?'xianboxsgreybg':''">
					<div class="xian"></div>
				</div>-->
				<div class='xianboxs' :class="cashType?'xianboxsgreybg':''">
					<div class="xian"></div>
				</div>
				<div class="paytab" :class="cashType?'greybg':''" @click.stop='choseTypeyes(2)'>
					<div class="payiconimage">
						<img v-if="cashType" src="../../assets/goucai/cashimageshui.png" />
						<img v-else src="../../assets/goucai/cashimages.png" />
					</div>
					<div class="paytextbox" :class="cashType?'greyText':''">
						<div class="paytextup">现金支付</div>
						<!-- （剩余:¥{{cashMoney.toFixed(2)}}） -->
						<div class="paytextdown">现金投注即可返<i>{{hongbaobianxian.toFixed(2)}}</i>红包变现</div>
					</div>
					<div class="choseType notxuan" v-if="cashType"></div>
					<div class="choseType" v-else :class="cashdianjiChonse?'choseTypeyes':''"></div>
				</div>
				<div class='xianboxs' :class="cashType?'xianboxsgreybg':''">
					<div class="xian"></div>
				</div>
				<div class="paybtn" v-if="cashType" @click.stop='opnenRecharge'>余额不足，立即充值</div>
				<div class="paybtn" @click.stop="paybtn()">立即付款</div>
			</div>
		</div>
		<!-- 红包投注弹窗end -->
		<!-- 去充值弹窗star -->
		<div class="goRechargeBox" id="payRecharge">
			<div class="goRechargeTitle">
				<div @click.stop="hidepayRecharge()"><img src="../../assets/goucai/comeback.png" /></div>选择充值方式
			</div>
			<div class="goRechargeBanner"><img src="../../assets/goucai/rechargebanner.png" /></div>
			<div class="goRechargeTab" :class="opnenBankopen? '':'closeWeixin'" @click="recharge_back(1)">
				<div class="tabIcon" v-if='opnenBankopen'><img src="../../assets/recharge/zhifupingtai-yinlian-copy.png" /></div>
				<div class="tabIcon" v-else><img src="../../assets/recharge/zhifupingtaiyinlianhui.png" /></div>
				<div class="tabText" :class="opnenBankopen? '':'tabText1'">
					<div class="tabTextTitle">快捷支付</div>
					<div class="tabTextContent" v-if='opnenBankopen'>支持各大银行卡，操作方便又迅捷！</div>
					<div class="tabTextContent" v-else>即将恢复，敬请期待！</div>
				</div>
			</div>
			<div class='xianboxs'>
				<div class="xian"></div>
			</div>
			<div class="goRechargeTab" :class="opnenWeixin? '':'closeWeixin'" @click="recharge_back(2)">
				<div class="tabIcon" v-if="opnenWeixin"><img src="../../assets/recharge/weixinzhifu-copy.png" /></div>
				<div class="tabIcon" v-else><img src="../../assets/recharge/weixinzhifuhui.png" /></div>
				<div class="tabText tabText1">
					<div class="tabTextTitle">微信支付</div>
					<div class="tabTextContent" v-if="opnenWeixin">快捷支付，安全有保障！</div>
					<div class="tabTextContent" v-else>即将开放，敬请期待！</div>
				</div>
			</div>
			<div class='xianboxs'>
				<div class="xian"></div>
			</div>
		</div>
		<!-- 去充值弹窗end -->
		<!--实名弹窗-->
		<checkok-nav :logokz='logok' @showbox="showbox"></checkok-nav>
		<!--实名弹窗end-->
		<!--登录询问弹窗-->
		<div class="takeOffPants" v-if="wjallissb">
			<div class="fart">
				<div class="fartwsb">
					<div>您当前还未登录，不能付款</div>
					<div>确定是否登录</div>
				</div>
				<div class="fartjsb flex-box">
					<div class="c-99" @click="sbquxiao">取消</div>
					<div @click="tologin">确认</div>
				</div>
			</div>
		</div>
		<!--登录询问弹窗end-->
		<div class="CashTips" v-if="CashTips">
			<div class="cont">
				<div class="close" @click="CashTips = false"></div>
				<p class="h1">安全提示</p>
				<p class="p1">尊敬的用户，<span style="color: #1bb1ff;">为了保障您的资金安全</span></p>
				<p class="p2">请下载APP版本进行提款</p>
				<div class="butt" @click="xiazai1">
					立即下载
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	var pullToRefreshs;
	import checkokNav from '../../common/checkok.vue';
	let str = '';
	let path = "";
	let app2;
	let _uid;
	let _schemeId_;
	let _lotteryTypeKey_;
	var shareuid;
	import {
		Toast,
		MessageBox
	} from 'mint-ui';
	import {
		getSession,
		setSession,
		getTime,
		getIcon,
		_ImgUrl_,
		getCookie,
		setCookie,
		OverallData,
		animation
	} from "../../js/common.js";
	import Swiper from 'swiper';

	export default {
		components: {
			checkokNav
		},
		data() {
			return {
				logok: false, //未实名标志
				shareStatue: false, //分享状态
				shareLink: false, //分享链接进来的
				betsList: '',
				getPlayType: '',
				betValues: '',
				bet: '',
				values: '',
				cpname: OverallData().cpname,
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
				bonType: '',
				caseType: '',
				personlist: '',
				record: '',
				state: '',
				baodiType: '',
				imgType: '',
				unfold: false,
				openBox: true,
				chosesa: true,
				chosesb: true,
				nsmbzly: true,
				canSubscribedCost: 1,
				keyboards: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0', '清除'],
				keyboardShow: true,
				hasInput: false,
				schemeId: '',
				uid: '',
				lotteryTypeKey: '',
				maxPayNum: '',
				isKaiJiang: false,
				isGenDanRen: false,
				canNotShaiDan: '',
				canPay: true,
				hasTrueImg: false,
				payBox: false,
				tureImgUrl: '',
				isDaYuWuBai: false,
				topStatus: '',
				refreshSwitch: false,
				starRefresh: false,
				coinsMoney: 0, //红包余额
				cashMoney: 0, //现金余额
				payPopup: false, //红包弹窗
				dianjiChonse: true, //选择红包
				cashdianjiChonse: false, //选择现金
				hongbaoType: false, //红包余额是否充足
				cashType: false, //现金余额是否充足
				opnenWeixin: false, //微信是否开放
				opnenBankopen: false, //银行卡是否开放
				wjallissb:false,//充值弹窗
				hongbaobianxian: 0,//变现红包
				CashTips:false,
			};
		},
		created() {
			//             if (getCookie('logok')) {  //判断是否实名
			//             	this.logok = true;
			//             }
			document.querySelector('html').setAttribute('style', 'background-color:#f4f4f4;');
			let uid = getCookie('newData');
			// if (!uid) {
			// 	this.$router.push({
			// 		name: 'login'
			// 	})
			// 	return false;
			// }
			_schemeId_ = this.$route.query.id;
			_lotteryTypeKey_ = this.$route.query.key;
			let shareLink = this.$route.query.shareLink;
			 shareuid=this.$route.query.uid;
			
			if (shareLink) {
				this.shareLink = true;
			}
			_uid = uid.sportId;
			if(!_uid){
				_uid=shareuid
			}
			GETurl(_schemeId_, _lotteryTypeKey_);
			this.getDetails(_schemeId_, _uid);
			this.getGdlist(getCookie('newData').sportId);
			
			this.checkIsWx();
			// let uidsb = getCookie('newData');
			if (uid) {
				this.getUserInfo();
			}
		},
		mounted() {
			let mySwiper = new Swiper('.swiper-container', {
				loop: true,
				width: window.innerWidth,
				autoHeight: true, //高度随内容变化
				pagination: {
					el: '.swiper-pagination',
					type: 'fraction',
				},
				autoplayDisableOnInteraction: false,
				observer: true, //修改swiper自己或子元素时，自动初始化swiper
				observeParents: true, //修改swiper的父元素时，自动初始化swiper
			});
			let that = this;
			pullToRefreshs = new auiPullToRefresh({ //下拉刷新
				container: document.querySelector('.aui-refresh-content'), //下拉容器
				triggerDistance: 80 //下拉高度
			}, function(ret) {
				if (ret.status == "success") {
					that.$ajax.defaults.timeout = 49527; //49527这个值控制没有showLonding
					that.refreshSwitch = false; //数据是否加载完成的开关
					that.starRefresh = true; //开始下拉刷新
					that.getDetails(_schemeId_, _uid);
					that.getGdlist(getCookie('newData').sportId);
					if (that.refreshSwitch1 && that.refreshSwitch2) {
						that.$ajax.defaults.timeout = 50000;
						pullToRefreshs.cancelLoading(); //刷新成功后调用此方法隐藏
					}

				}
			});
		},
		watch: {
			//监听刷新开关refreshSwitch状态
			refreshSwitch(val) {
				console.log(val);
				if (val == true && this.starRefresh) {
					this.$ajax.defaults.timeout = 50000;
					pullToRefreshs.cancelLoading(); //刷新成功后调用此方法隐藏
				}
			}
		},
		beforeDestroy() {
			//离开页面就还原刷新状态
			document.querySelector('html').removeAttribute('style');
			this.$ajax.defaults.timeout = 50000;
			// pullToRefreshs.cancelLoading(); //刷新成功后调用此方法隐藏
		},
		beforeRouteLeave(to, from, next) {
			str = '';
			next();
		},
		methods: {
			showbox: function(msg) {
				this.RouteLeave = true;
				this.logok = msg;
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
			hidepayRecharge: function() {
				let dompayRecharge = document.querySelector('#payRecharge');
				animation(dompayRecharge, 'left', 100)
			},
			hidepayPopup: function() {
				this.payPopup = false;
				this.hongbaoType = false;
				this.cashdianjiChonse = false;
				let bottomDom = document.querySelector('#payPopup');
				let bottomDomInitial = window.getComputedStyle(bottomDom).height.replace('px', '') * 1 * -1;
				let dom = document.querySelector('#payPopup');
				animation(dom, 'bottom', bottomDomInitial)
			},
			recharge_back: function(type) {
				if (type == 1) {
					if (this.opnenBankopen) {
						this.RouteLeave = true;
						this.$router.push({
							name: 'userinfo_recharge'
						})
					} else {
						MessageBox({
							title: '',
							message: '快捷支付暂时无法使用，给您带来的不便敬请谅解!',
							showCancelButton: false,
							confirmButtonText: "我知道了",
			
							// cancelButtonText:"知道了"
						}).then(action => {
							if (action == 'confirm') {
			
							} else {
								return false;
							}
						})
					}
				} else {
					if (this.opnenWeixin) {
						this.RouteLeave = true;
						this.$router.push({
							name: 'userinfo_recharge_weixin'
						})
					} else {
						MessageBox({
							title: '',
							message: '微信充值暂时无法使用，给您带来的不便敬请谅解!',
							showCancelButton: false,
							confirmButtonText: "我知道了",
						}).then(action => {
							if (action == 'confirm') {
			
							} else {
								return false;
							}
						})
					}
				}
			},
			choseTypeyes: function(type) {
				if (type == 1) {
					if (this.hongbaoType) {
						return false
					}
					this.dianjiChonse = true;
					this.moneyType = 'COINS';
					this.cashdianjiChonse = false;
				} else {
					if (this.cashType) {
						return false
					}
					this.dianjiChonse = false;
					this.cashdianjiChonse = true;
				}
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
				data = this.Encrypt({...data});
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
			logokbtn1: function() { //前往实名
				this.logok = false;
				this.$router.push({
					name: 'userinfo_task_real'
				})
			},
			logokbtn2: function() { //取消实名
				this.logok = false;
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
					window.open(link + '?_userId=' + newData.userid);
				} else {
					window.open(link);
				}
			},
			/* loadTop() {
				this.getDetails(_schemeId_, _uid);
				this.getGdlist(_uid);
				setTimeout(() => {
					this.$refs.loadmore.onTopLoaded();
				}, 1000)
				// 加载更多数据
			},
			handleTopChange(status) {
				this.topStatus = status;
			}, */
			getDetails: function() {
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

				this.$ajax.post('/caipiaoshouye/index.php/home/index/getSchemeDetailshare',
						dataes
					)
					.then(ret => {

						if (ret.status == 200) {
							let datas = JSON.parse(ret.data.content);
							console.log(datas.code);
							if (datas.code == 100000) {
								playType = datas;
								let details = datas.data;
								if (parseInt(details.schemeCost) > 500) {
									this.isDaYuWuBai = true;
								} else {
									this.isDaYuWuBai = false;
								}
								this.canSubscribedCost = 1; //'剩余' + details.canSubscribedCost;
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
								this.maxPayNum = details.canSubscribedCost;
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
								} else if (details.playTypeName == "一场制胜" && details.schemePrintState == 'SUCCESS') {
									lotType = "YCZS"
								}
								let isd = true;
								//  let isShow;
								if (details.lotteryType == "SCZC" || details.lotteryType == "SFZC" || details.lotteryType == "LCZC") {
									isd = false;
								}
								if (details.schemePrintState == 'SUCCESS' && details.winningUpdateStatus == 'NONE' && isd || details.schemePrintState ==
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
								let caseType;
								let bonType;
								let baodiType;
								let imgType;
								if (details.schemePrintState == "SUCCESS") {
									this.canNotShaiDan = 2;
									baodiType = '实际保底';
									imgType = 'detail_s04';
									if (details.winningUpdateStatus == "NONE") {
										caseType = '已出票'
										this.canPay = false;
										if (details.schemeState == "UNFULL" || details.state == "UNFULL") {
											bonType = '未满'
											caseType = '未满';
											this.canPay = true;
										} else if (details.schemeState == "FULL") {
											bonType = '已满'
											caseType = '已满';
											this.canPay = false;
										} else if (details.schemeState == "SUCCESS") {
											bonType = '已开奖'
											caseType = '已开奖';
											this.canPay = false;
											this.isKaiJiang = true;
										}
									} else if (details.winningUpdateStatus == "PRICE_UPDATED") {
										if (details.isWon) {
											baodiType = '实际保底';
											imgType = 'detail_s08';
											bonType = '已中奖';
											caseType = '已中奖';
											this.canPay = false;
										} else if (!details.isWon) {
											baodiType = '实际保底';
											imgType = 'detail_s07';
											bonType = '未中奖';
											caseType = '未中奖';
											this.canPay = false;
											this.isKaiJiang = true;
										}
									} else if (details.winningUpdateStatus == "WINNING_UPDATED") {
										if (details.isWon) {
											baodiType = '实际保底';
											imgType = 'detail_s08';
											bonType = '已中奖'
											caseType = '已中奖';
											this.canPay = false;
											this.isKaiJiang = true;
										} else if (!details.isWon) {
											baodiType = '实际保底';
											imgType = 'detail_s07';
											bonType = '未中奖'
											caseType = '未中奖';
											this.canPay = false;
											this.isKaiJiang = true;
										}
									}
								} else if (details.schemePrintState == "UNPRINT") {
									baodiType = '承诺保底';
									imgType = 'detail_s05';
									this.canNotShaiDan = 1;
									if (details.schemeState == "UNFULL" || details.state == "UNFULL") {
										bonType = '未满'
										caseType = '未满';
										this.canPay = true;
									} else if (details.schemeState == "FULL") {
										bonType = '已满'
										caseType = '已满';
										this.canPay = false;
									} else if (details.schemeState == "SUCCESS") {
										bonType = '已开奖'
										caseType = '已开奖';
										this.canPay = false;
										this.isKaiJiang = true;

									}
									if (details.schemeState == "CANCEL" || details.state == "CANCEL") {
										imgType = 'detail_s06';
										bonType = '已撤单';
										caseType = '已撤单';
										this.canPay = false;
										this.canNotShaiDan = 1;
									}
								};
								if (this.details.progressRate == 100) {
									this.canPay = false;
								}
								this.bonType = bonType;
								this.caseType = caseType;
								this.baodiType = baodiType;
								this.imgType = imgType;
								let state;
								if (details.secretType == "DRAWN_PUBLIC") {
									state = "开奖后公开";
								} else if (details.secretType == "FULL_PUBLIC") {
									state = "完全公开";
								} else if (details.secretType == "FULL_SECRET") {
									state = "完全保密";
								} else if (details.secretType == "FOLLOW_PUBLIC") {
									state = "跟单人公开";
								}
								this.state = state;
								if (details.loginSubscribedCost > 0) {
									this.isGenDanRen = true;
								}

							} else if (content.code == "201010") {
								Toast("账户已被锁定，请联系客服");
								setCookie('newData', '', '0-S');
								this.$router.push({
									name: 'login'
								})
							};

							this.contents(lotType);
							// getRecord(path,_schemeId_,details.sponsorId);
						} else {
							alert('网络错误！')
						}
					})
					.catch(err => {
						//this.MintUi.Indicator.close();
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
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getSchemeContentshare',
						dataes
					)
					.then(res => {
						this.refreshSwitch = true; //数据是否加载完成的开关==》开
						if (res.status == 200) {
							let dataes = JSON.parse(res.data.content);
							console.log(dataes.data.betslist)
							if (dataes.code == 100000) {
								let betsList = dataes.data.betslist
								let amidithiones = amidithion(betsList, lotType)
								this.amidithiones = amidithiones;
								this.betsList = betsList;
								this.getPlayType = getPlayType(betsList, this.details.playTypeName);
								this.betValues = betOdds(betsList, 1,amidithiones,this.details.lotteryType);
								let bet = betOdds(betsList, 2,amidithiones,this.details.lotteryType);
								this.bet = bet;
								this.values = betOdds(betsList, 3,amidithiones,this.details.lotteryType);
								
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
							alert('网络错误！')
						}
					})
					.catch(err => {
						this.refreshSwitch = true; //数据是否加载完成的开关==》开
						//this.MintUi.Indicator.close();
						console.log(err);
					})
			},
			keyboardShows: function() {
				this.hasInput = true;
				this.canSubscribedCost = this.canSubscribedCost;
				let boardShow = this.keyboardShow;
				if (boardShow) {
					this.keyboardShow = false;
				} else {
					this.keyboardShow = true;
				}
			},
			keyboardjian: function() {
				if (this.canSubscribedCost <= 1) {
					Toast('已达最小购买份数')
					return false
				} else {
					this.canSubscribedCost--
				}
			},
			keyboardjia: function() {
				if (this.canSubscribedCost == this.details.canSubscribedCost) {
					Toast('已达最大购买份数')
					return false
				} else {
					this.canSubscribedCost++
				}
			},
			keyboardHide: function() {
				this.keyboardShow = true;
			},
			opnenRecharge: function() {
				if (getCookie('logok')) { //判断是否实名
					this.logok = true;
					return false;
				}
				// document.querySelector('#payRecharge').style.left=0;
				// let dompayRecharge1 = document.querySelector('#payRecharge');
				// animation(dompayRecharge1, 'left', 0)
				this.$router.push({
									name: 'payment_options'
					})
			},
			tologin:function(){
				setSession('fromhemai','fromhemai')
				this.$router.push({
					name: 'login',
				})
			},
			sbquxiao:function(){
				this.wjallissb=false;
			},
			pay: function() {
				// if (getCookie('logok')) {  //判断是否实名
				// 	this.logok = true;
				//     return false;
				// }
				if(this.shareLink){
					let uid = getCookie('newData');
					if (!uid) {
						this.wjallissb=true;
						
						return false;
					}
				}
				let num = this.canSubscribedCost;
				
				if(parseInt(num) < 1||num=='') {
					Toast('请输入正确的购买份数');
					return false;
				}
				this.payPopup = true;
				var dom = document.querySelector('#payPopup')
				animation(dom, 'bottom', 0);
				if (this.cashMoney < this.canSubscribedCost*1) {
					this.cashType = true;
				} else {
					this.cashType = false;
				}
				 if (!this.cashType) {
					this.cashdianjiChonse = true;
				}
				let hongbaobianxian = this.canSubscribedCost * 1 * 20 / 100;
				if (this.coinsMoney < 0.2) {
					hongbaobianxian = 0.00;
				} else if (this.coinsMoney <= hongbaobianxian) {
					hongbaobianxian = this.coinsMoney;
				}
				this.hongbaobianxian = hongbaobianxian;
// 					MessageBox({
// 							title: '购买',
// 							message: '确认购买?',
// 							showCancelButton: true,
// 						}).then(action => {
// 							if (action == 'confirm') {
// 								
// 							} else if (action == 'cancel') {
// 								console.log('取消');
// 							}
// 						})
// 						.catch(err => {
// 							if (err == 'cancel') { //取消的回调
// 
// 							}
// 						});
			},
			paybtn: function() {
				console.log(111);
				this.payPopup = false;
				this.hongbaoType = false;
				this.cashdianjiChonse = false;
				let bottomDom = document.querySelector('#payPopup');
				let bottomDomInitial = window.getComputedStyle(bottomDom).height.replace('px', '') * 1 * -1;
				let dom = document.querySelector('#payPopup');
				animation(dom, 'bottom', bottomDomInitial)
				let schemeIds = this.schemeId;
				let uids = this.uid;
				let lotteryTypeKeys = this.lotteryTypeKey;
				let num = this.canSubscribedCost;
					let data = [];
					data['schemeId'] = _schemeId_;
					data['userId'] = getCookie('newData').userid;
					data['subscriptionCost'] = num;
					let dataes = this.Qs.stringify({
						'path': path,
						data
					}, {
						allowDots: true
					});
					this.$ajax.post('/caipiaoshouye/index.php/home/index/subscribe',
							dataes
						)
						.then(res => {
							if (res.status == 200) {
								let content = JSON.parse(res.data.content);
								if (content.code == 100000) {
									this.keyboardShow = true;
									this.canSubscribedCost = 0;
									MessageBox({
										title: '提示',
										message: '付款成功!',
									}).then(action => {
										this.getDetails(_schemeId_, _uid);
										this.getGdlist(getCookie('newData').sportId);
									});
								} else {
									alert(content.message)
									console.log(JSON.stringify(res));
									console.log(content.message);
								}
							}
						})
						.catch(err => {
							//this.MintUi.Indicator.close();
							console.log(err);
						})
	
			},
			getGdlist: function() {
				let page = 1;
				let rows = 9999999;
				let data = [];
				data['schemeId'] = _schemeId_;
				data['page'] = page;
				data['rows'] = rows;
				let dataes = this.Qs.stringify({
					'path': path,
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/gdlist',
						dataes
					)
					.then(res => {
						this.refreshSwitch2 = true;
						let content = JSON.parse(res.data.content);
						if (content.code == 100000) {
							let personlist = content.data.content;
							this.personlist = personlist;
						}
					})
			},
			chosesafn: function() {
				var chosesa = this.chosesa;
				if (chosesa) {
					this.chosesa = false;
				} else {
					this.chosesa = true;
				}
			},
			chosesbfn: function() {
				var chosesb = this.chosesb;
				if (chosesb) {
					this.chosesb = false;
				} else {
					this.chosesb = true;
				}
			},
			openBoxs: function() {
				var openBox = this.openBox;
				if (openBox) {
					this.openBox = false;
				} else {
					this.openBox = true;
				}
			},
			nsmbzl: function() {
				var nsmbzly = this.nsmbzly;
				if (nsmbzly) {
					this.nsmbzly = false;
				} else {
					this.nsmbzly = true;
				}
			},
			unfolds: function() {
				var boole = this.unfold;
				var state = this.state;
				if (this.details.sponsorId == getCookie('newData').sportId) {
					if (boole) {
						this.unfold = false;
					} else {
						this.unfold = true;
					}
				} else if (state == '完全公开') {
					if (boole) {
						this.unfold = false;
					} else {
						this.unfold = true;
					}
				} else if (state == '完全保密') {
					return false;
				} else if (state == '开奖后公开' && this.isKaiJiang) {
					if (boole) {
						this.unfold = false;
					} else {
						this.unfold = true;
					}
				} else if (state == '跟单人公开' && this.isGenDanRen) {
					if (boole) {
						this.unfold = false;
					} else {
						this.unfold = true;
					}
				}
			},
			matchingShow: function(i, e) {
				let ishide = this.ishide[i];
				if (ishide) {
					this.$set(this.ishide, i, false)
				} else {
					this.$set(this.ishide, i, true)
				}
			},
			inputNum: function(i, num, maxNum) {
				maxNum = parseInt(this.maxPayNum);
				if (num !== 11) {
					if (str == '' && parseInt(i) == 0) {
						str = '1';
					} else {
						str = str + i;
					}

				} else {
					if (str.length == 1 || parseInt(str) == 0) {
						str = '';
					} else {
						str = str.slice(0, str.length - 1);
					}
				}
				if (parseInt(str) > maxNum) {
					str = maxNum.toString();
					Toast('已达最大份数')
					this.canSubscribedCost = str;
					str = '';
				} else {
					this.canSubscribedCost = str
				};


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
			xiazai1: function() {
				var newData = getCookie('newData');
				var link = OverallData().download
				if (getCookie('yinliuaff') || getCookie('yinliuuser')) {
					if (getCookie('yinliuuser')) {
						window.open('http://m.facaime.com/yinliu/yinliu.html?_userId=' + getCookie('yinliuuser'));
					} else {
						window.open('http://m.facaime.com/yinliu/yinliu.html?aff_id=' + getCookie('yinliuaff'));
					}

				} else {
					if (newData) {
						window.open('http://xz.facaime.com?_userId=' + newData.sportId);
					} else {
						window.open('http://xz.facaime.com');
					}
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
								this.getGdlist(getCookie('newData').sportId);
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
					return y + "/" + m + "/" + d + " " + h + ":" + mm;
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
					handicap = handicap
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
			mobileHide: function(str, start, num) {
				let st = "";
				for (let i = 0; i < num; i++) {
					st += "*";
				}
				let end = 11 - parseInt(start) - parseInt(num);
				return str.substr(0, start) + st + str.substr(parseInt(start) + parseInt(num), end);
			},
			minimum: function(num1, num2) {
				let num;
				num = Math.floor((num1 / num2 * 10000) / 100);
				return num;
			},
			fengelq: function(str) {
				var strs = new Array(); //定义一数组 
				strs = str.split(":"); //字符分割 
				return strs[1] + ":" + strs[0];
			}
		}
	}

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
				case "welfare3d":
					path = "number/lows/welfare3d";
					break;
				case 'fc3d':
					path = "number/lows/welfare3d";
					break;
				case "seven":
					path = "number/lows/seven";
					break;
				case "bjklb":
					path = "number/keno/bjklb";
					break;
				case 'kl8':
					path = "number/keno/bjklb";
					break;
				case "sdel11to5":
					path = "number/keno/sdel11to5";
					break;

				case "cqssc":
					path = "number/keno/cqssc";
					break;
				case "xjssc":
					path = "number/keno/xjssc";
					break;
				case "gdel11to5":
					path = "number/keno/gdel11to5";
					break;
				case "jxel11to5":
					path = "number/keno/jxel11to5";
					break;
				case "gdklsf":
					path = "number/keno/gdklsf";
					break;
				case "gdkls":
					path = "number/keno/gdklsf";
					break;
				case "tjklsf":
					path = "number/keno/tjklsf";
					break;
				case "tjkls":
					path = "number/keno/tjklsf";
					break;

				case "ahk3":
					path = "number/keno/ahk3";
					break;
				case "hbk3":
					path = "number/keno/hbk3";
					break;
				case "jsk3":
					path = "number/keno/jsk3";
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
			// schemeId = _schemeId_;
		}
	};

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

	function getPlayType(betsList, name) {
		let playTypes = [];
		for (let i = 0; i < betsList.length; i++) {
			let typeObj = betsList[i].playTypeStr;
			let arr = [];
			for (let key in typeObj) {
				arr.push(typeObj[key])
			}
			if (name == '二选一') {
				playTypes.push('二选一');
			} else {
				playTypes.push(arr[0]);
			}

		}
		console.log(playTypes)
		return playTypes;
	};

	function betOdds(options, num,amidithiones,typeS) {
		let allArrs = [];
		let allKeys = [];
		let allValues = [];
		let betAmidithiones=amidithiones;
		console.log(betAmidithiones);
		for (let i = 0; i < options.length; i++) {
			let keys = [];
			let values = [];
			let forInTi = [];
			let arrs = options[i].betsOption;
			let wanfatype = '';
			for (let key in arrs) {
				console.log(typeS)
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
					for (let key in typeObj) {
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
</style>
