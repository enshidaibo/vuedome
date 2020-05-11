<template>
	<div class="lottery">
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="bake()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title home-header">开奖<span id="service" class="service"></span></div>
			<div class="aui-btn aui-pull-right" @click="fenx()">
				<span class="aui-iconfont aui-icon-share"></span>
			</div>
		</header>
		<!-- 分享模态框 -->
		<div v-if="shareStatue" class="share_box" @click="hideShare()">
			<div class="share_cont">
				<div class="quxiao">取消</div>
				<div class="down" @click="openDownload()">前往下载</div>
			</div>
		</div>
		<div class="top_header">
			<div class="aui-tab nav" id="tab">
				<div v-for="(item,index) in tabItemList" :class="['aui-tab-item','tab_item',{'aui-active':item.status}]" @click="changeTab($event,index)">
					<!-- <img class="tab_icon" :src="item.imgUrl"> -->
					<span class="progress">{{item.cont}}</span>
				</div>
			</div>
		</div>

<!-- 			<div slot="top" class="mint-loadmore-top" style="margin-top: -20px;">
				<span class="shaxinc" v-show="topStatus !== 'loading'"><img src="../assets/shuaxin/logo3.png" /></span>
				<span class="shaxinc" v-show="topStatus === 'loading'">
					<div class="almosh"><img src="../assets/shuaxin/xuanzhuan80.png" /></div>
				</span>
			</div> -->
			<div class="main_cont">
				<section class=" aui-refresh-content aui-refresh-pull-down" id="wrap" v-cloak>
					<!-- 热门 -->
					<div class="cont_top">
						<div class="content_hot" v-if="show == 1 && sports_data">
							<div class="heighter">
								<ul class="lists eight">
									<li class="list" v-for="item in heighter_data" :class="item.lotteryType == 'JXSSC'? 'dis_no': ''" v-if="item.lotteryType != 'BJKLB'" @click="heighter_details(item)">
										<img class="left_icon" :src="img_src(item.lotteryType)" alt="">
										<div class="heighter_right">
											<div class="title">
												<div class="title_left">
													<h3 class="change_text" v-text="lotteryType[item.lotteryType]"></h3>
													<span class="dates stage">第<span class="dates">{{item.periodNumber}}</span>期</span>
												</div>
												<span class="dates day">{{item.prizeTime|getTime(5)}}</span>
											</div>
											<div class="bottom">
												<div class="redball_left">
													<span class="circle_ball" :class="(item.lotteryType == 'JSK3' || item.lotteryType == 'AHK3' || item.lotteryType == 'HBK3')? 'kuaisan': 'circle_ball'"
													 v-for="result_data in ((item.result).split(','))">{{result_data}}</span>
												</div>
												<div class="right_size" v-show="item.lotteryType == 'XJSSC' || item.lotteryType == 'CQSSC'">
													<div class="single">
														<span v-if="(item.result).split(',')[0]>4" class="adj">大</span>
														<span v-else class="adj">小</span>
														<span class="border">|</span>
														<span v-if="(item.result).split(',')[0]%2 == 1">单</span>
														<span v-else>双</span>
													</div>
												</div>
												<div class="right_size" v-show="item.lotteryType == 'JSK3' || item.lotteryType == 'AHK3' || item.lotteryType == 'HBK3'">
													<span class="sum">和值:{{sum(item.result)}}</span>
												</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div class="math">
								<ul class="lists math_three">
									<li class="list" v-for="item in math_data" @click="math_details(item)">
										<img class="left_icon" :src="img_src(item.lotteryType,item.lotteryName)" alt="">
										<div class="right">
											<div class="title">
												<div class="title_left">
													<h3 class="change_text">{{item.lotteryName}}</h3>
													<span class="dates stage">第<span class="dates">{{item.periodNumber}}</span>期</span>
												</div>
												<span class="dates day">{{item.prizeTime|getTime(5)}}</span>
											</div>
											<div class="bottom">
												<div class="redball_left">
													<span v-for="result_data in (item.result.split(' ')[0].split(','))">{{result_data}}</span><span class="blue_ball"
													 v-for="result_data in (item.result.split(' ')[1]?item.result.split(' ')[1].split(','):[])">{{result_data}}</span>
												</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div class="sports">
								<ul class="lists">
									<li class="list" @click="beijinball(sports_data.DCZC)" v-if="sports_data.DCZC.gameName">
										<img class="left_icon" :src="img_src('DCZC')" alt="">
										<div class="sports_right">
											<div class="title">
												<div class="title_left">
													<h3 class="jc">北京单场</h3>
													<span class="dates stage">比赛日</span>
												</div>
												<span class="dates ymr">{{sports_data.DCZC.matchTime|getTime(3)}} {{sports_data.DCZC.matchTime|getTime(4)}}</span>
											</div>
											<div class="input_button">
												<span>{{sports_data.DCZC.homeTeamName}}</span>
												<span class="score">{{sports_data.DCZC.score}}</span>
												<span>{{sports_data.DCZC.guestTeamName}}</span>
											</div>
										</div>
									</li>
									<li class="list" @click="basketball(sports_data.JCLQ)" v-if="sports_data.JCLQ.gameName">
										<img class="left_icon" :src="img_src('JCLQ')" alt="">
										<div class="sports_right">
											<div class="title">
												<div class="title_left">
													<h3 class="jc">竞彩篮球</h3>
													<span class="dates stage">比赛日</span>
												</div>
												<span class="dates ymr">{{sports_data.JCLQ.matchTime|getTime(3)}} {{sports_data.JCLQ.matchTime|getTime(4)}}</span>
											</div>
											<div class="input_button">
												<span>{{sports_data.JCLQ.homeTeamName}}</span>
												<span class="score">{{fengelq(sports_data.JCLQ.score)}}</span>
												<span>{{sports_data.JCLQ.guestTeamName}}</span>
											</div>
										</div>
									</li>
									<li class="list" @click="football(sports_data.JCZQ)" v-if="sports_data.JCZQ.gameName">
										<img class="left_icon" :src="img_src('JCZQ')" alt="">
										<div class="sports_right">
											<div class="title">
												<div class="title_left">
													<h3 class="jc">竞彩足球</h3>
													<span class="dates stage">比赛日</span>
												</div>
												<span class="dates ymr">{{sports_data.JCZQ.matchTime|getTime(3)}} {{sports_data.JCZQ.matchTime|getTime(4)}}</span>
											</div>
											<div class="input_button">
												<span>{{sports_data.JCZQ.homeTeamName}}</span>
												<span class="score">{{sports_data.JCZQ.score}}</span>
												<span>{{sports_data.JCZQ.guestTeamName}}</span>
											</div>
										</div>
									</li>
								</ul>
								<ul class="lists ">
									<li class="list" @click="four(sports_data.SCZC)" v-if="sports_data.SCZC.lotteryType">
										<img class="left_icon" :src="img_src('SCZC')" alt="">
										<div class="sports_right">
											<div class="title">
												<div class="title_left">
													<h3 class="jc">四场进球</h3>
													<span class="dates stage">第<span class="dates">{{sports_data.SCZC.periodNumber}}</span>期<span class="week">{{sports_data.SCZC.endPrizeTime|getTime(4)}}</span></span>
												</div>
												<span class="dates day">{{sports_data.SCZC.endPrizeTime|getTime(5)}}</span>
											</div>
											<div class="date_num">
												<div class="redball_left">
													<span v-for="result_data in (sports_data.SCZC.result&&sports_data.SCZC.result.split(''))">{{result_data}}</span>
												</div>
											</div>
										</div>
									</li>
									<li class="list" @click="six(sports_data.LCZC)" v-if="sports_data.LCZC.lotteryType">
										<img class="left_icon" :src="img_src('LCZC')" alt="">
										<div class="sports_right">
											<div class="title">
												<div class="title_left">
													<h3 class="jc">六场半全场</h3>
													<span class="dates stage">第<span class="dates">{{sports_data.LCZC.periodNumber}}</span>期<span class="week">{{sports_data.LCZC.endPrizeTime|getTime(4)}}</span></span>
												</div>
												<span class="dates day">{{sports_data.LCZC.endPrizeTime|getTime(5)}}</span>
											</div>
											<div class="date_num">
												<div class="redball_left">
													<span v-for="result_data in (sports_data.LCZC.result&&sports_data.LCZC.result.split(''))">{{result_data}}</span>
												</div>
											</div>
										</div>
									</li>
									<li class="list" @click="nine(sports_data.SFZC)" v-if="sports_data.SFZC.lotteryType">
										<img class="left_icon" :src="img_src('SFZC')" alt="">
										<div class="sports_right">
											<div class="title">
												<div class="title_left">
													<h3 class="jc">胜负彩/任选九</h3>
													<span class="dates stage">第<span class="dates">{{sports_data.SFZC.periodNumber}}</span>期<span class="week">{{sports_data.SFZC.endPrizeTime|getTime(4)}}</span></span>
												</div>
												<span class="dates day">{{sports_data.SFZC.endPrizeTime|getTime(5)}}</span>
											</div>
											<div class="date_num">
												<div class="redball_left">
													<span v-for="result_data in (sports_data.SFZC.result&&sports_data.SFZC.result.split(''))">{{result_data}}</span>
												</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<!-- 高频彩 -->
						<div class="heighter" v-if="show == 2">
							<ul class="lists eight">
								<li class="list" v-for="item in heighter_data" :class="item.lotteryType == 'JXSSC'? 'dis_no': ''" v-if="item.lotteryType != 'BJKLB'" @click="heighter_details(item)">
									<img class="left_icon" :src="img_src(item.lotteryType)" alt="">
									<div class="heighter_right">
										<div class="title">
											<div class="title_left">
												<h3 class="change_text" v-text="lotteryType[item.lotteryType]"></h3>
												<span class="dates stage">第<span class="dates">{{item.periodNumber}}</span>期</span>
											</div>
											<span class="dates day">{{item.prizeTime|getTime(5)}}</span>
										</div>
										<div class="bottom">
											<div class="redball_left">
												<span class="circle_ball" :class="(item.lotteryType == 'JSK3' || item.lotteryType == 'AHK3' || item.lotteryType == 'HBK3'|| item.lotteryType == 'BJK3')? 'kuaisan': 'circle_ball'"
												 v-for="result_data in ((item.result).split(','))">{{result_data}}</span>
											</div>
											<div class="right_size" v-show="item.lotteryType == 'XJSSC' || item.lotteryType == 'CQSSC'">
												<div class="single">
													<span v-if="(item.result).split(',')[0]>4" class="adj">大</span>
													<span v-else class="adj">小</span>
													<span class="border">|</span>
													<span v-if="(item.result).split(',')[0]%2 == 1">单</span>
													<span v-else>双</span>
												</div>
											</div>
											<div class="right_size" v-show="item.lotteryType == 'JSK3' || item.lotteryType == 'AHK3' || item.lotteryType == 'HBK3'|| item.lotteryType == 'BJK3'">
												<span class="sum">和值:{{sum(item.result)}}</span>
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<!-- 数字彩 -->
						<div class="math" v-if="show == 3">
							<ul class="lists math_three">
								<li class="list" v-for="item in math_data" @click="math_details(item)">
									<img class="left_icon" :src="img_src(item.lotteryType,item.lotteryName)" alt="">
									<div class="right">
										<div class="title">
											<div class="title_left">
												<h3 class="change_text">{{item.lotteryName}}</h3>
												<span class="dates stage">第<span class="dates">{{item.periodNumber}}</span>期</span>
											</div>
											<span class="dates day">{{item.prizeTime|getTime(5)}}</span>
										</div>
										<div class="bottom">
											<div class="redball_left">
												<span v-for="result_data in (item.result.split(' ')[0].split(','))">{{result_data}}</span><span class="blue_ball"
												 v-for="result_data in (item.result.split(' ')[1]?item.result.split(' ')[1].split(','):[])">{{result_data}}</span>
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<!-- 竞技彩 -->
						<div class="sports" v-if="show == 4 && sports_data">
							<ul class="lists">
								<li class="list" @click="beijinball(sports_data.DCZC)" v-if="sports_data.DCZC.gameName">
									<img class="left_icon" :src="img_src('DCZC')" alt="">
									<div class="sports_right">
										<div class="title">
											<div class="title_left">
												<h3 class="jc">北京单场</h3>
												<span class="dates stage">比赛日</span>
											</div>
											<span class="dates ymr">{{sports_data.DCZC.matchTime|getTime(3)}} {{sports_data.DCZC.matchTime|getTime(4)}}</span>
										</div>
										<div class="input_button">
											<span>{{sports_data.DCZC.homeTeamName}}</span>
											<span class="score">{{sports_data.DCZC.score}}</span>
											<span>{{sports_data.DCZC.guestTeamName}}</span>
										</div>
									</div>
								</li>
								<li class="list" @click="basketball(sports_data.JCLQ)" v-if="sports_data.JCLQ.gameName">
									<img class="left_icon" :src="img_src('JCLQ')" alt="">
									<div class="sports_right">
										<div class="title">
											<div class="title_left">
												<h3 class="jc">竞彩篮球</h3>
												<span class="dates stage">比赛日</span>
											</div>
											<span class="dates ymr">{{sports_data.JCLQ.matchTime|getTime(3)}} {{sports_data.JCLQ.matchTime|getTime(4)}}</span>
										</div>
										<div class="input_button">
											<span>{{sports_data.JCLQ.homeTeamName}}</span>
											<span class="score">{{fengelq(sports_data.JCLQ.score)}}</span>
											<span>{{sports_data.JCLQ.guestTeamName}}</span>
										</div>
									</div>
								</li>
								<li class="list" @click="football(sports_data.JCZQ)" v-if="sports_data.JCZQ.gameName">
									<img class="left_icon" :src="img_src('JCZQ')" alt="">
									<div class="sports_right">
										<div class="title">
											<div class="title_left">
												<h3 class="jc">竞彩足球</h3>
												<span class="dates stage">比赛日</span>
											</div>
											<span class="dates ymr">{{sports_data.JCZQ.matchTime|getTime(3)}} {{sports_data.JCZQ.matchTime|getTime(4)}}</span>
										</div>
										<div class="input_button">
											<span>{{sports_data.JCZQ.homeTeamName}}</span>
											<span class="score">{{sports_data.JCZQ.score}}</span>
											<span>{{sports_data.JCZQ.guestTeamName}}</span>
										</div>
									</div>
								</li>
							</ul>
							<ul class="lists ">
								<li class="list" @click="four(sports_data.SCZC)" v-if="sports_data.SCZC.lotteryType">
									<img class="left_icon" :src="img_src('SCZC')" alt="">
									<div class="sports_right">
										<div class="title">
											<div class="title_left">
												<h3 class="jc">四场进球</h3>
												<span class="dates stage">第<span class="dates">{{sports_data.SCZC.periodNumber}}</span>期<span class="week">{{sports_data.SCZC.endPrizeTime|getTime(4)}}</span></span>
											</div>
											<span class="dates day">{{sports_data.SCZC.endPrizeTime|getTime(5)}}</span>
										</div>
										<div class="date_num">
											<div class="redball_left">
												<span v-for="result_data in (sports_data.SCZC.result&&sports_data.SCZC.result.split(''))">{{result_data}}</span>
											</div>
										</div>
									</div>
								</li>
								<li class="list" @click="six(sports_data.LCZC)" v-if="sports_data.LCZC.lotteryType">
									<img class="left_icon" :src="img_src('LCZC')" alt="">
									<div class="sports_right">
										<div class="title">
											<div class="title_left">
												<h3 class="jc">六场半全场</h3>
												<span class="dates stage">第<span class="dates">{{sports_data.LCZC.periodNumber}}</span>期<span class="week">{{sports_data.LCZC.endPrizeTime|getTime(4)}}</span></span>
											</div>
											<span class="dates day">{{sports_data.LCZC.endPrizeTime|getTime(5)}}</span>
										</div>
										<div class="date_num">
											<div class="redball_left">
												<span v-for="result_data in (sports_data.LCZC.result&&sports_data.LCZC.result.split(''))">{{result_data}}</span>
											</div>
										</div>
									</div>
								</li>
								<li class="list" @click="nine(sports_data.SFZC)" v-if="sports_data.SFZC.lotteryType">
									<img class="left_icon" :src="img_src('SFZC')" alt="">
									<div class="sports_right">
										<div class="title">
											<div class="title_left">
												<h3 class="jc">胜负彩/任选九</h3>
												<span class="dates stage">第<span class="dates">{{sports_data.SFZC.periodNumber}}</span>期<span class="week">{{sports_data.SFZC.endPrizeTime|getTime(4)}}</span></span>
											</div>
											<span class="dates day">{{sports_data.SFZC.endPrizeTime|getTime(5)}}</span>
										</div>
										<div class="date_num">
											<div class="redball_left">
												<span v-for="result_data in (sports_data.SFZC.result&&sports_data.SFZC.result.split(''))">{{result_data}}</span>
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</section>
			</div>
		<!-- <footer class="pos-fi b-0 w-100  footers">
			<ul class="flex-box w-100">
				<li class="foot_li w-20" @click='gohome'>
					<div class="w-100 imgBox"><img src="../assets/backIcon01_c.png" /></div>
					<div class="w-100"><span class="w-100 tac dis-bl fs-10 text_span">首页</span></div>
				</li>
				<li class="foot_li w-20" @click='gogoucai'>
					<div class="w-100 imgBox"><img src="../assets/backIcon02.png" /></div>
					<div class="w-100"><span class="w-100 tac dis-bl fs-10 text_span">购彩</span></div>
				</li>
				<li class="foot_li w-20 active" @click='golottery'>
					<div class="w-100 imgBox"><img src="../assets/backIcon03_c.png" /></div>
					<div class="w-100"><span class="w-100 tac dis-bl fs-10 text_span">开奖</span></div>
				</li>
				<li class="foot_li w-20" @click='gotask'>
					<div class="w-100 imgBox"><img src="../assets/backIcon04.png" /></div>
					<div class="w-100"><span class="w-100 tac dis-bl fs-10 text_span">任务</span></div>
				</li>
				<li class="foot_li w-20" @click='gouser'>
					<div class="w-100 imgBox"><img src="../assets/backIcon05.png" /></div>
					<div class="w-100"><span class="w-100 tac dis-bl fs-10 text_span">我的</span></div>
				</li>
			</ul>
		</footer> -->
		<!-- <mt-tabbar >
  <mt-tab-item id="tab1" @click.native=gohome>
    <img slot="icon" src="../assets/backIcon01_c.png">
    首页
  </mt-tab-item>
  <mt-tab-item id="tab2" @click.native=gogoucai>
    <img slot="icon" src="../assets/backIcon02.png">
    购彩
  </mt-tab-item>
  <mt-tab-item id="tab3" class='active' @click.native=golottery>
    <img slot="icon" src="../assets/backIcon03_c.png">
    开奖
  </mt-tab-item>
  <mt-tab-item id="tab4"  @click.native=gotask>
    <img slot="icon" src="../assets/backIcon04.png">
    任务
  </mt-tab-item>
  <mt-tab-item id="tab5" @click.native=gouser>
    <img slot="icon" src="../assets/backIcon05.png">
    我的
  </mt-tab-item>
</mt-tabbar> -->
	</div>
</template>
<script>
	//在js部分所有变量都是模块作用域
	//如果需要使用就必须引入
	import {
		Toast
	} from 'mint-ui';
	import {
		OverallData,
		getCookie,
		getSession,
		setSession
	} from '../js/common.js';
	export default {
		data() {
			return {
				shareStatue: false, //分享状态
				tabItemList: [{
						status: true,
						imgUrl: require("../assets/runlottery/lottery1icon.png"),
						cont: "热门"
					},
					{
						status: false,
						imgUrl: require("../assets/runlottery/lottery2icon.png"),
						cont: "高频彩"
					},
					{
						status: false,
						imgUrl: require("../assets/runlottery/lottery3icon.png"),
						cont: "数字彩"
					},
					{
						status: false,
						imgUrl: require("../assets/runlottery/lottery4icon.png"),
						cont: "竞技彩"
					},
				],
				show: 1, //点谁显示谁
				math_data: [], //
				heighter_data: [],
				sports_data: '',
				imgs: {
					'SSQ': 'ssq',
					'WELFARE3D': 'fc3d',
					'PL': 'pl5',
					'PL3': 'pl3',
					'PL5': 'pl5',
					'DCZC': 'bjdc',
					'SEVEN': 'seven',
					'SFZC': 'sfzc',
					'LCZC': 'lczc',
					'SCZC': 'sczc',
					'DLT': 'dlt',
					'SDEL11TO5': 'sdel11to5',
					'JCZQ': 'jczq',
					'JCLQ': 'jclq',
					'GDEL11TO5': 'gdel11to5',
					'BJKLB': 'kl8',
					'CQSSC': 'cqssc',
					'XJSSC': 'xjssc',
					'JXSSC': 'ssc',
					'JXEL11TO5': 'jxel11to5',
					'TJKLSF': 'tjkls',
					'GDKLSF': 'gdkls',
					'JSK3': 'jsk3',
					'AHK3': 'ahk3',
					'HBK3': 'hbk3',
					'BJK3': 'bjk3',
					'RXJC': 'rxjc',
					'HN4J1': 'football',
				},
				lotteryType: {
					'BJKLB': '北京快乐八',
					'CQSSC': '重庆时时彩',
					'XJSSC': '新疆时时彩',
					'JXSSC': '江西时时彩',
					'JXEL11TO5': '江西11选5',
					'TJKLSF': '天津快乐十分',
					'GDKLSF': '广东快乐十分',
					'GDEL11TO5': '广东11选5',
					'SDEL11TO5': '山东11运夺金',
					'JSK3': '江苏快3',
					'AHK3': '安徽快3',
					'HBK3': '湖北快3',
					'BJK3': '北京快3',
					'RXJC': '任选九场',
					'HN4J1': '海南4+1',
					'SCZC': '四场进球',
					'SFZC': '胜负彩/任选九',
					'PL': '排列5',
					'PL3': '排列三',
				},
			}
		},
		created() {
			if (getSession('lotteryTab')) {
				this.show = getSession('lotteryTab')+1;
				for (var i = 0; i < this.tabItemList.length; i++) {
					this.tabItemList[i].status = false;
				}
				// this.show = index + 1;
				this.tabItemList[getSession('lotteryTab')].status = true;
			}
			this.requestMath();
			this.requestHeighter();
			this.requestSports();
			sessionStorage.removeItem('shaixuan');
		},
		mounted(){
			this.pullRefresh = new auiPullToRefresh({
			  container: document.querySelector('.aui-refresh-content'),
			  triggerDistance: 100
			}, (ret => {
			  if (ret.status == "success") {
			    let i = this.show;
				this.$ajax.defaults.timeout  =  49527;//49527这个值控制没有showLonding
			    if (i === 1) {
			    	this.requestMath();
			    	this.requestHeighter();
			    	this.requestSports();
			    } else if (i === 2) {
			    	this.requestHeighter();
			    } else if (i === 3) {
			    	this.requestMath();
			    } else if (i === 4) {
			    	this.requestSports();
			    }

			    setTimeout(() => {
					this.$ajax.defaults.timeout  =  50000;
			    	this.pullRefresh.cancelLoading();
			    }, 1000)
			  }
			}));
		},
		beforeDestroy() {
		   this.$ajax.defaults.timeout  = 50000;
		},
		filters: {
			getTime: function(matchDate, num) {
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
				if (num == 1) { //月日时分
					return m + "-" + d + " " + h + ":" + mm;
				} else if (num == 2) { //年月日时分秒
					return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
				} else if (num == 3) { //年月日
					return y + "-" + m + "-" + d;
				} else if (num == 4) { //星期
					return '周' + dd;
				} else if (num == 5) { // 年月日时分
					return y + "-" + m + "-" + d + " " + h + ":" + mm;
				}
			}
		},
		methods: {
			gouser: function() {
				if (this.$router.name !== 'user') {
					this.$router.push({
						name: 'user'
					})
				}
				sessionStorage.removeItem('lotteryTab');
			},
			gohome: function() {
				if (this.$router.name !== 'home') {
					this.$router.push({
						name: 'home'
					})
				}
				sessionStorage.removeItem('lotteryTab');
			},
			gogoucai: function() {
				if (this.$router.name !== 'goucai') {
					this.$router.push({
						name: 'goucai'
					})
				}
				sessionStorage.removeItem('lotteryTab');
			},
			golottery: function() {
				if (this.$router.name !== 'lottery') {
					this.$router.push({
						name: 'lottery'
					})
				}
				sessionStorage.removeItem('lotteryTab');
			},
			gotask: function() {
				if (this.$router.name !== 'task') {
					this.$router.push({
						name: 'task'
					})
				}
				sessionStorage.removeItem('lotteryTab');
			},
			bake: function() {
				this.$router.go(-1);
				sessionStorage.removeItem('lotteryTab');
			},
			changeTab: function(e, index) {
				var obj = e.currentTarget;
				if (this.tabItemList[index].status) {
					return false;
				} else {
					for (var i = 0; i < this.tabItemList.length; i++) {
						this.tabItemList[i].status = false;
					}
					this.tabItemList[index].status = true;
					this.show = index + 1;
					setSession('lotteryTab', index);
				}
			},
			fenx: function() { //分享

			},
			requestMath: function() { //请求数字彩数据  
				var datas = this.Qs.stringify({
					path: 'winnumbers'
				}, {
					allowDots: true
				});

				this.$ajax.post('/caipiaoshouye/index.php/home/index/getlowWinNumbers',
						datas
					)
					.then(res => {
						console.log(res);
						if (res.data.status == 500) {
							toastMsg("服务器异常，请稍后重试");
						} else if (res.data.status == 200) {
							var data = JSON.parse(res.data.content);
							this.math_data = data.data;
							console.log(this.math_data)
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			requestHeighter: function() { //请求高频彩数据  
				var datas = this.Qs.stringify({
					path: 'winnumbers'
				}, {
					allowDots: true
				});

				this.$ajax.post('/caipiaoshouye/index.php/home/index/getKenoWinNumbers',
						datas
					)
					.then(res => {
						if (res.data.status == 500) {
							toastMsg("服务器异常，请稍后重试");
						} else if (res.data.status == 200) {
							var data = JSON.parse(res.data.content);
							this.heighter_data = data.data;
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			requestSports: function() { //请求竞技彩数据  
				var data = [];
				var Type;
				Type = ["JCZQ", "DCZC", "jclq", "SFZC", "LCZC", "SCZC"];
				data["lotteryType"] = Type;
				var datas = this.Qs.stringify({
					path: 'winnumbers',
					data
				}, {
					allowDots: true
				});

				this.$ajax.post('/caipiaoshouye/index.php/home/index/findResultsMenu',
						datas
					)
					.then(res => {
						if (res.data.status == 500) {
							toastMsg("服务器异常，请稍后重试");
						} else if (res.data.status == 200) {
							var data = JSON.parse(res.data.content);
							this.sports_data = data.data;
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			img_src: function(type, name) { //图片
				//          var url = '../assets/lottery/';
				// 			var urlImg=url + this.imgs[type] + '.png';
				if (name) {
					  if(type=='PL'){
					if (name == '排列3') {
						type = 'PL3'
					} else if (name == '排列5') {
						type = 'PL5'
					}
				}
				}
				return require('../assets/lottery/' + this.imgs[type] + '.png');
			},
			sum: function(result) { //求和
				var results = result.split(',').map(Number);
				var sums = 0;
				for (var i = 0; i < results.length; i++) {
					sums += results[i];
				}
				return sums;
			},
			fengelq:function(str){
				var strs= new Array(); //定义一数组 
                strs=str.split(":"); //字符分割 
				return strs[1]+":"+strs[0];
			},
			getTime: function(matchDate, num) {
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
				if (num == 1) { //月日时分
					return m + "-" + d + " " + h + ":" + mm;
				} else if (num == 2) { //年月日时分秒
					return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
				} else if (num == 3) { //年月日
					return y + "-" + m + "-" + d;
				} else if (num == 4) { //星期
					return '周' + dd;
				} else if (num == 5) { // 年月日时分
					return y + "-" + m + "-" + d + " " + h + ":" + mm;
				} else if (num == 6) {
					return y + "" + m + "" + d;
				}
			},
			beijinball: function(DCZC) { //跳转北京单场开奖详情页
				var matchTime = this.getTime(DCZC.matchTime, 6);
				var change_text = '北京单场'; //文字改变
				this.$router.push({
					name: 'football_details',
					query: {
						change_text: change_text,
						ball_name: 'dczc',
						matchTime: matchTime
					}
				})
			},
			basketball: function(JCLQ) { //跳转竞彩篮球开奖详情页
				var matchTime = this.getTime(JCLQ.matchTime, 6);
				var change_text = '竞彩篮球'; //文字改变
				this.$router.push({
					name: 'football_details',
					query: {
						change_text: change_text,
						ball_name: 'jclq',
						matchTime: matchTime
					}
				})
			},
			football: function(JCZQ) { //跳转竞彩足球开奖详情页
				var matchTime = this.getTime(JCZQ.matchTime, 6);
				var change_text = '竞彩足球'; //文字改变
				this.$router.push({
					name: 'football_details',
					query: {
						change_text: change_text,
						ball_name: 'jczq',
						matchTime: matchTime
					}
				})
			},
			nine: function(SFZC) { //跳转胜负彩/任选九场开奖详情页
				var periodId = SFZC.periodId;
				var change_text = '胜负彩/任选九场'; //文字改变
				this.$router.push({
					name: 'four_six_details',
					query: {
						change_text: change_text,
						ball_name: 'sfzc',
						periodId: periodId
					}
				})
			},
			math_details: function(item) { //跳转数字彩开奖详情页
				var change_text = item.lotteryName; //文字改变
				this.$router.push({
					name: 'heighter_details',
					query: {
						change_text: change_text,
						ball_name: item.lotteryType,
						name: 'lows'
					}
				})
			},
			heighter_details: function(item) { //跳转高频彩开奖详情页
				var change_text = this.lotteryType[item.lotteryType]; //文字改变
				this.$router.push({
					name: 'heighter_details',
					query: {
						change_text: change_text,
						ball_name: item.lotteryType,
						name: 'keno'
					}
				})
			},
			four: function(SCZC) { //跳转四场进球开奖详情页
				var periodId = SCZC.periodId;
				var change_text = '四场进球'; //文字改变
				this.$router.push({
					name: 'four_six_details',
					query: {
						change_text: change_text,
						ball_name: 'sczc',
						periodId: periodId
					}
				})
			},
			six: function(LCZC) { //跳转六场半全场开奖详情页
				var periodId = LCZC.periodId;
				var change_text = '六场半全场'; //文字改变
				this.$router.push({
					name: 'four_six_details',
					query: {
						change_text: change_text,
						ball_name: 'lczc',
						periodId: periodId
					}
				})
			},
			fenx: function() { //分享
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
		}
	}
</script>
<style scoped>
	@import "../css/lottery.css";

	a {
		color: #000;
	}

	.active {
		color: #5fa3eb;
	}
	.main_cont{
		padding-top: 1.8rem;
	}
	.cont_top{
		padding-top: 0.5rem;
	}
</style>
