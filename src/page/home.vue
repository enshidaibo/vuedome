<template>
	<div>
		<div style="width: 0;height: 0;" v-show="yujiazai" class="yaoganImg"></div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn">
				<!-- <img src="../assets/icon.png" alt="" width="32"> -->
			</div>
			<div class="aui-title home-header">{{cpname}}<span id="service" class="service"></span></div>
			<div class="aui-btn aui-pull-right" @click="xiazai()">
				<img src="../assets/home/homekf.png" />
			</div>
		</header>
		<div class="header_clone">
			<div class="header_clone_left">
				<img src="../assets/home_logo.png" alt="" class="img1">
				<div class="clone_box1">
					<span class="sp1">美奇彩票</span>
					<span class="sp2">手机购彩-让美好生活更便捷</span>
				</div>
			</div>
			<div class="header_clone_right">
				<img src="../assets/home_btn.png" alt="" class="img2" @click="xiazai1()">
			</div>
		</div>
		
		
		<section class="aui-refresh-content">
		    <div class="aui-content">
		<div class="home-page" id="frame0">
			<!-- <div class="CashTips" v-if="CashTips">
				<div class="cont">
					<div class="close" @click="CashTips = false"></div>
					<p class="h1">下载提示</p>
					<p class="p1">旧版APP不再更新，<span style="color: #407dcd;">为了保障您的资金安全，</span><span style="color: #f86718;">请下载新版APP</span></p>
					<div class="butt" @click="Download">
						立即下载
					</div>
				</div>
			</div> -->
			<div class="home_banner">
				<div class="home-banner swiper-container swiper-container1">
					<div class="swiper-wrapper aui-slide-wrap">
						<div v-for='item in bannerList' class="swiper-slide aui-slide-node bg-dark">
							<img :id="item.id" :src="item.src" />
						</div>
					</div>
					<div class="swiper-pagination">
						<!--分页容器-->
					</div>
				</div>
				<div class="home-header-banner swiper-container text_banner">
					<!-- <p>我是酱油党</p> -->
					<div class="swiper-wrapper">
						<div class="swiper-slide banner-content" v-for="(item,index) in ggtext" :data-swiper-slide-index="index">
							<img src="../assets/home/gongg.png" alt="">
							<span :id='item.articleid'>{{item.articleTitle}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="home-copy">
				<div class="menu">
					<li @click="menuJump('lottery')">
						<img src="../assets/home/home_menu_user.png" alt="">
						<p>最新开奖</p>
					</li>
					<li @click="menuJump('myincome')">
						<img src="../assets/home/home_menu_tg.png" alt="">
						<p>推广收益</p>
					</li>
					<li @click="menuJump('myfriend')">
						<img src="../assets/home/home_menu_fx.png" alt="">
						<p>我的好友</p>
					</li>
					<li @click="menuJump('userinfo_makemoney')">
						<img src="../assets/home/home_menu_yl.png" alt="">
						<p>赚钱攻略</p>
					</li>
				</div>
				<div class="listTitle">
					<div class="listTitleDiv">
						<div class="listTitleleft">神来一注<i>(滑动切换彩种)</i>
							<div class="xiaokuai"></div>
						</div>
						<div class="swiperTab">
							<div @click="switchSwiper(0)" :class="swiperIndex==0?'swiperActive':''">双色球</div>
							<div @click="switchSwiper(1)" :class="swiperIndex==1?'swiperActive':''">大乐透</div>
							<div @click="switchSwiper(2)" :class="swiperIndex==2?'swiperActive':''">七乐彩</div>
						</div>
					</div>
				</div> 
				<div class="swiper-container" id="laohuji">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
							
							<div class="laohuji">
								<div class="laohujiBgBox">
									<div class="laohujiBgimg">
										<div class="laohujishuji">
											<div class='slot' v-for='slot in slots' ref='slots'>
												<div class='slot__window'>
													<div class='slot__wrap'>
														<div class="slotitembox" v-for='opt in slot.items'>
															<div class='slot__item' :class="slot.title=='red'?'':'bgBlue'">{{ opt }}</div>
														</div>
														<div class="slotitembox">
															<div class='slot__item slot__item--copy' :class="slot.title=='red'?'':'bgBlue'">{{ slot.items[0] }}</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="laohujiBg">
										<div class="laiyizhu">来注<i>双色球</i>,2元变1000万！</div>
										<div class="shenlaiyizhu" @click="shenlaiyizhu">神来一注</div>
									</div>
								</div>
								<div class="yaogan">
									<div :class="isdong?'yaoganImg':''" @click='laiyizhu'>
									</div>
								</div>
							</div>
						</div>
						<div class="swiper-slide">
							<div class="laohuji">
								<div class="laohujiBgBox">
									<div class="laohujiBgimg">
										<div class="laohujishuji">
											<div class='slot' v-for='slot in slotsD' ref='slotsD'>
												<div class='slot__window'>
													<div class='slot__wrap slot__wrapD'>
														<div class="slotitembox" v-for='opt in slot.items'>
															<div class='slot__item' :class="slot.title=='red'?'':'bgBlue'">{{ opt }}</div>
														</div>
														<div class="slotitembox">
															<div class='slot__item slot__item--copy' :class="slot.title=='red'?'':'bgBlue'">{{ slot.items[0] }}</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="laohujiBg">
										<div class="laiyizhu">来注<i>大乐透</i>,2元变1600万！</div>
										<div class="shenlaiyizhu" @click="shenlaiyizhuD">神来一注</div>
									</div>
								</div>
								<div class="yaogan">
									<div :class="isdongD?'yaoganImgD':''" @click='laiyizhuD'>
									</div>
								</div>
							</div>
						</div>
						<div class="swiper-slide">
							<div class="laohuji">
								<div class="laohujiBgBox">
									<div class="laohujiBgimg">
										<div class="laohujishuji">
											<div class='slot' v-for='slot in slotsQ' ref='slotsQ'>
												<div class='slot__window'>
													<div class='slot__wrap slot__wrapQ'>
														<div class="slotitembox" v-for='opt in slot.items'>
															<div class='slot__item' :class="slot.title=='red'?'':'bgBlue'">{{ opt }}</div>
														</div>
														<div class="slotitembox">
															<div class='slot__item slot__item--copy'>{{ slot.items[0] }}</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="laohujiBg">
										<div class="laiyizhu">来注<i>七乐彩</i>,2元变500万！</div>
										<div class="shenlaiyizhu" @click="shenlaiyizhuQ">神来一注</div>
									</div>
								</div>
								<div class="yaogan">
									<div :class="isdongQ?'yaoganImgQ':''" @click='laiyizhuQ'>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
                <!-- <div class="swiper-container" id="laohuji">
                 	<div class="swiper-wrapper">
                 		<div class="swiper-slide">
							<div class="listTitle">
								<div class="listTitleDiv">
									<div class="listTitleleft">江苏快三<i>(滑动切换彩种)</i>
										<div class="xiaokuai"></div>
									</div>
									<div class="swiperTabHuan">
										<div @click="switchks()" class="swiperActive">换一注
										  <img :class="{'reflashimgref':reflash}" src="../assets/home/huanyizhu.png" />
										</div>
									</div>
								</div>
							</div>
                 			<div class="laohujiXin">
                 				<div class="betQiu">
									<span v-for="item in kuaisan">{{item}}</span>
								</div>
								<div class="betBtn">
									<span class="spanBtn" @click="ksPay()">2元购彩</span>
								</div>
                 			</div>
							<div class="swperImage">
								<img class="imageyuan" src="../assets/home/swiperyuan.png"/>
								<img class="imagedian" src="../assets/home/sweperdian.png"/>
							</div>
                 		</div>
                 		<div class="swiper-slide">
							<div class="listTitle">
								<div class="listTitleDiv">
									<div class="listTitleleft">重庆时时彩<i>(滑动切换彩种)</i>
										<div class="xiaokuai"></div>
									</div>
									<div class="swiperTabHuan">
										<div @click="switchssc()" class="swiperActive">换一注
										  <img :class="{'reflashimgref':reflash}" src="../assets/home/huanyizhu.png" />
										</div>
									</div>
								</div>
							</div>
                 			<div class="laohujiXin">
                 				<div class="betQiu">
                 					<span v-for="item in shishicai">0{{item}}</span>
                 					
                 				</div>
                 				<div class="betBtn">
                 					<span class="spanBtn" @click="sscPay()">2元购彩</span>
                 				</div>
                 			</div>
                 			<div class="swperImage">
                 				<img class="imagedian" src="../assets/home/sweperdian.png"/>
								<img class="imageyuan" src="../assets/home/swiperyuan.png"/>
                 			</div>
                 		</div>
                 	</div>
                 </div> -->
				<div class="list">
					<div class="listTitle">
						<div class="listTitleDiv">
							<div class="listTitleleft">常用彩种<div class="xiaokuai"></div>
							</div>
							<div class="listTitleright" @click="goToDetails('goucai','5')">更多彩种</div>
						</div>
					</div>
					<ul>
						<li v-for='item in copyList' @click="goToDetails(item.url,item.inx)" v-if='item.lotteryType!="BJKLB"' class="li">
							<img src="../assets/kaijiang.png" alt="" class="liImg" v-if="item.lotteryType=='SSQ'||item.lotteryType=='DLT'||item.lotteryType=='SEVEN'"
							 v-show='flags[item.lotteryType]'>
							<img src="../assets/kaijiang.png" alt="" class="liImg" v-if="item.lotteryType=='WELFARE3D'||item.lotteryType=='PL'">
							<img src="../assets/zuixin.png" alt="" class="liImg" v-if="item.lotteryType=='BJK3'">
							<div class="icon">
								<img :src="require('../assets/lottery/'+item.imageUrl+'.png')" alt="">
							</div>
							<div class="text">
								<!-- <p>{{item.lotteryTypeName}}</p> -->
								<div>
									<img src="../assets/goucai/goucai_gou.png" alt="暂无" class="imgGou" v-if="item.lotteryType=='SSQ'||item.lotteryType=='DLT'||item.lotteryType=='SEVEN'||item.lotteryTypeName=='排列五'||item.lotteryType=='RXJC'">
									<span>{{item.lotteryTypeName}}</span>
								</div>
								<p>{{item.introduce}}</p>
							</div>
						</li>
					</ul>
				</div>
				<div class="list mt_10" >
					<div class="listTitle" v-if="kindata.length>1">
						<div class="listTitleDiv">
							<div class="listTitleleft">中奖信息<div class="xiaokuai"></div>
							</div>
						</div>
					</div>
					<div class="list_ranking_tle" v-if="kindata.length>1">
						<div>彩种</div>
						<div>奖金</div>
						<div>期数</div>
						<div>用户</div>
					</div>
					<div id="box" @touchstart='stop' @touchend='up' :style="{height:boxLength}">
					<div id="con1">
						<!--  @click="ranking_img(itme.imgUrl)" -->
						<div class="list_ranking" v-for="(itme,cindex) in kindata" @click="goHomeDetails(itme.schemeId,itme.type,itme.uid)">
							<div><img :src="require('../assets/lottery/'+itme.imageUrl+'.png')" alt=""/></div>
							<div>{{tranNumberho(itme.money,2)}}</div>
							<!-- <div v-if="itme.type=='JCZQ'||itme.type=='JCLQ'">
								{{itme.periodNumber}}
							</div> -->
							<div>
								第{{itme.periodNumber}}期
							</div>
							<div>{{mobileHideho(itme.userName,3,4)}}</div>
						</div>
					</div>
					<div id="con2">
						<div class="list_ranking" v-for="(itme,cindex) in kindata" @click="goHomeDetails(itme.schemeId,itme.type,itme.uid)">
							<div><img :src="require('../assets/lottery/'+itme.imageUrl+'.png')" alt=""/></div>
							<div>{{tranNumberho(itme.money,2)}}</div>
							<!-- <div v-if="itme.type=='JCZQ'||itme.type=='JCLQ'">
								{{itme.periodNumber}}
							</div> -->
							<div>
								第{{itme.periodNumber}}期
							</div>
							<div>{{mobileHideho(itme.userName,3,4)}}</div>
						</div>
					</div>
					</div>
				</div>
			<!-- 	<div class="mnews" v-if="content">
					<div v-if="content.length>0">
						<div class="newsDiv">
							<div class="newsleft">新鲜资讯
								<div class="xiaokuai"></div>
							</div>
							<div class="newsright" @click="openNews()" tapmode>更多资讯</div>
						</div>
						<div class="mainContent1" v-if='content[0].imgUrlArr'>
							<div class="news" v-for="(item,index) in content" @click="openNewsDetails(item.articleid,item.clicks)">
								<div class='newsBox1' v-if="item.imgUrlArr.length==1">
									<div class="newsContent">
										<h3 :class="item.flag?'sh3':''">{{item.title}}</h3>
										<div class="title">
											<span class="sp1">{{item.typeName}}</span>
											<img src="../assets/home/eyes.png" alt="">
											<span class="sp2">{{item.clicks|tranNumber(1)}}人</span>
											<div>
												<span class="sp3">{{item.createTime|getTimes()}}</span>
											</div>
										</div>

									</div>
									<div class="newsImg1">
										<div v-for='items in item.imgUrlArr'>
											<img :src="items" alt="">
										</div>
									</div>
								</div>
								<div class='newsBox2' v-if="item.imgUrlArr.length!=1">
									<h3 :class="item.flag?'sh3':''">{{item.title}}</h3>
									<div class="newsImg" :class="item.imgUrlArr.length==2?'new_active':''">
										<div v-for='items in item.imgUrlArr'>
											<img :src="items" alt="">
										</div>
									</div>
									<div class="newsTiem">
										<div class="title">
											<span class="sp1">{{item.typeName}}</span>
											<img src="../assets/home/eyes.png" alt="">
											<span class="sp2">{{item.clicks|tranNumber(1)}}人</span>
											<div>
												<span class="sp3">{{item.createTime|getTimes()}}</span>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div> -->
			</div>
		</div>
	</div>
</section>
		<!-- 登录弹窗 -->
		<div class="tcBox" v-if="flag==1"  v-show="!CashTips">
			<img src="../assets/home/index_tc1.png" alt="" class="tcimg1" @click="toinvite">
			<!-- <img src="../assets/home/index_tc2.png" alt="" class="tcimg2" > -->
			<img src="../assets/home/index_close.png" alt="" class="tcimg3" @click="close">
		</div>
		<div class="tc" v-if="flag==1" v-show="!CashTips" @click="close">
			
		</div>
		<!-- <checkok-nav :logokz='logok' :shouye='shouye' @showbox="showbox"></checkok-nav> -->
		<!-- 未实名弹窗end -->
		<footer class="pos-fi b-0 w-100 footers">
			<ul class="flex-box w-100">
				<li class="foot_li w-20 active" @click='gohome'>
					<div class="w-100 imgBox"><img src="../assets/backIcon01.png" /></div>
					<div class="w-100"><span class="w-100 tac dis-bl fs-10 text_span">首页</span></div>
				</li>
				<li class="foot_li w-20 " @click='gogoucai'>
					<div class="w-100 imgBox"><img src="../assets/backIcon02.png" /></div>
					<div class="w-100"><span class="w-100 tac dis-bl fs-10 text_span">购彩</span></div>
				</li>
				<!-- <li class="foot_li w-20 " @click='golottery'>
					<div class="w-100 imgBox"><img src="../assets/backIcon03.png" /></div>
					<div class="w-100"><span class="w-100 tac dis-bl fs-10 text_span">开奖</span></div>
				</li> -->
				<li class="foot_li w-20 " @click='goscratch'>
					<div class="w-100 imgBox"><img src="../assets/backIcon7.png" /></div>
					<div class="w-100"><span class="w-100 tac dis-bl fs-10 text_span">资讯</span></div>
				</li>
				<li class="foot_li w-20" @click='gotask'>
					<div class="w-100 imgBox"><img src="../assets/backIcon04.png" /></div>
					<div class="w-100"><span class="w-100 tac dis-bl fs-10 text_span">活动</span></div>
				</li>
				<li class="foot_li w-20" @click='gouser'>
					<div class="w-100 imgBox"><img src="../assets/backIcon05.png" /></div>
					<div class="w-100"><span class="w-100 tac dis-bl fs-10 text_span">我的</span></div>
				</li>
			</ul>
		</footer>
	</div>
</template>
<script>
	import checkokNav from '../common/checkok.vue';
	var laohuji;
	const html = document.getElementsByTagName('html')[0];
	const htmlSize = window.getComputedStyle(html).fontSize;
	const next = window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame || function(cb) {
			window.setTimeout(cb, 1000 / 60)
		}
   var conin ;
   const speed=50;
	import Swiper from 'swiper';
	import {
		getSession,
		setSession,
		getCookie,
		setCookie,
		OverallData,
		maintenance,
		replace,
		homeIcon,
		mobileHide,
		tranNumber,
		compare,
		getTime,
		TypeCapitalconversionLowercase
	} from "../js/common.js"
	import {
		Toast
	} from 'mint-ui';
	export default {
		components: {
			checkokNav
		},
		data() {
			return {
				logok: false, //未实名标志
				shouye: true,
				cpname: OverallData().cpname,
				newsList: [],
				bannerList: [],
				CashTips: false,
				ggtext: [], //中奖信息
				flag: 1, //弹窗
				limit: 10,
				page: 1,
				limit1: 50,
				status: 1,
				zjxx: ['恭喜用户166***571排列五中获得10000元大奖', '恭喜用户134***571排列五中获得35000元大奖', '恭喜用户130***571排列五中获得20000元大奖'], //中奖信息
				content: [ //新闻资讯
				],
				articleId:["000"],
				clicks:{},
				copyList: [{
					'url': 'goucai_mc_ssq',
					'imageUrl': 'ssq',
					'lotteryTypeName': '双色球',
					'introduce': '2元赢取1000万',
					'inx': '5',
					'state': false
				}, {
					'url': 'goucai_mc_dlt',
					'imageUrl': 'dlt',
					'lotteryTypeName': '大乐透',
					'introduce': '2元赢取1600万',
					'inx': '5',
					'state': false
				}, {
					'url': 'goucai_mc_pls',
					'imageUrl': 'pl3',
					'lotteryTypeName': '排列三',
					'introduce': '每日20:30开奖',
					'inx': '5',
					'state': true
				}, {
					'url': 'goucai_gpc_cqssc',
					'imageUrl': 'cqssc',
					'lotteryTypeName': '重庆时时彩',
					'introduce': '每二十分钟一期',
					'inx': '5',
					'state': true
				}, {
					'url': 'goucai_gpc_xjssc',
					'imageUrl': 'xjssc',
					'lotteryTypeName': '新疆时时彩',
					'introduce': '每二十分钟一期',
					'inx': '5',
					'state': true
				}, {
					'url': 'goucai_jjc_zq',
					'imageUrl': 'jczq',
					'lotteryTypeName': '竞彩足球',
					'inx': '5',
					'introduce': '足球迷首选',
					'state': false
				}],
				yujiazai: true, //预加载图片
				//双色球神来一注
				slots: [{
						title: "red",
						items: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
							'18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33'
						]
					},
					{
						title: "red",
						items: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
							'18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33'
						]
					},
					{
						title: "red",
						items: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
							'18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33'
						]
					},
					{
						title: "red",
						items: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
							'18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33'
						]
					},
					{
						title: "red",
						items: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
							'18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33'
						]
					},
					{
						title: "red",
						items: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
							'18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33'
						]
					},
					{
						title: "blue",
						items: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16']
					},
				],
				opts: null,
				startedAt: null,
				chooseRed: [],
				chooseBlue: [],
				swiperIndex: 0,
				isdong: false, //控制遥杆动画
				//大乐透神来一注所有命名比双色球多了一个D
				slotsD: [{
						title: "red",
						items: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
							'18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'
						]
					},
					{
						title: "red",
						items: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
							'18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'
						]
					},
					{
						title: "red",
						items: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
							'18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'
						]
					},
					{
						title: "red",
						items: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
							'18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'
						]
					},
					{
						title: "red",
						items: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
							'18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'
						]
					},
					{
						title: "blue",
						items: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
					},
					{
						title: "blue",
						items: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
					},
				],
				optsD: null,
				startedAtD: null,
				chooseRedD: [],
				chooseBlueD: [],
				isdongD: false, //控制遥杆动画
				//七乐彩神来一注所有命名比双色球多了一个D
				slotsQ: [{
						title: "red",
						items: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
							'18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
						]
					},
					{
						title: "red",
						items: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
							'18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
						]
					},
					{
						title: "red",
						items: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
							'18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
						]
					},
					{
						title: "red",
						items: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
							'18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
						]
					},
					{
						title: "red",
						items: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
							'18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
						]
					},
					{
						title: "red",
						items: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
							'18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
						]
					},
					{
						title: "red",
						items: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17',
							'18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
						]
					},
				],
				optsQ: null,
				startedAtQ: null,
				chooseRedQ: [],
				chooseBlueQ: [],
				isdongQ: false, //控制遥杆动画
				kindata: [], //排行
				flags: {
					SSQ: false,
					DLT: false,
					SEVEN: false
				},
				boxLength:'0rem',
				//江苏快三神来一注
				ksbetNum:666,
				kuaisan:['06','06','06'],
				quchong:6,
				shishicai:[1,2,3,4,5],
				reflash: false
			}
		},
		/* {
		            'id': 'userinfo_task_real',
		            'src': 'http://m.facaime.com/caipiaoshouye/Public/images/e27e5656ae96167a4b102463dcab6d2.png'
		        }, {
		            'id': 'userinfo_task_invitation',
		            'src': 'http://m.facaime.com/caipiaoshouye/Public/images/a1041c838f90b83fbef99c7a57ee0a9.jpg'
		        } */
				beforeDestroy() {
					clearInterval(conin)
				},
		created() {
			// if(!getSession('tsDown')){
			// 	setSession('tsDown','1')
			// 	window.location.href = 'http://xz.facaime.com';

			// }
			// setTimeout(function(){
			// 	if(getSession('tsDown')){
			// 		sessionStorage.removeItem('tsDown')
			// 	}
			// },1000  * 60 * 60)
			var ms = getSession('homeTc');
			if (ms) {
				this.flag = ms;
			}
			console.log(ms)
// 			if(getSession('articleId')){
// 				this.articleId=getSession('articleId')
// 			}
// 			if(getCookie('clicks')){
// 				this.clicks=getCookie('clicks')
// 			}
			maintenance(this); //维护页面
			// this.preloadImg(bgArr)
			sessionStorage.removeItem('play');
			sessionStorage.removeItem('playTypeName');
			sessionStorage.removeItem('name');
			sessionStorage.removeItem('shaixuan');
			sessionStorage.removeItem('arr');
			sessionStorage.removeItem('passTypes')
			sessionStorage.removeItem('passTypesnum')
			sessionStorage.removeItem('parr');
			let nowTime = new Date().getTime();
			let oldTime = getSession('homeGetTime');
			let banxiaoshi = nowTime - oldTime;
			console.log(banxiaoshi)
			let homeCopyList = getSession('homeCopyList')
			let homekindata = getSession('homekindata')
			let homeGgtext = getSession('homeGgtext')
			let homebannerList = getSession('homebannerList')

			if (!oldTime) {
				this.getUserInfo();
				this.getBanner();
				this.getUserLotteryBetInfo();
				this.ranking();
			} else if (oldTime && banxiaoshi > 1800000) {
				this.getUserInfo();
				this.getBanner();
				this.getUserLotteryBetInfo();
				this.ranking();
			} else if (oldTime) {
				if (getSession('homeCopyList')) {
					this.copyList = getSession('homeCopyList')
					this.$nextTick(() => { // 解决方法: 在获取完数据后，将swiper放在$nextTick下一个UI帧再初始化
						this.initSwiper()
					})
				}
				if (getSession('homekindata')) {
					this.kindata = getSession('homekindata');
					let numRem=(this.kindata.length*1-1)*2.2;
								
								if(numRem>17.6){
									numRem=17.6
								}
							
					this.boxLength=numRem+'rem';
				}
				if (getSession('homeGgtext')) {
					this.ggtext = getSession('homeGgtext')
				}
				if (getSession('homebannerList')) {
					this.bannerList = getSession('homebannerList');
					this.$nextTick(() => { // 解决方法: 在获取完数据后，将swiper放在$nextTick下一个UI帧再初始化
						this.bannerSwiper()
					})
				}
			} else {
				this.getUserInfo();
				this.getBanner();
				this.getUserLotteryBetInfo();
				this.ranking();
			}
			this.getTime();
			// this.NewInformationgetList();
			setSession('homeTc', '0');
		},
		mounted() {		
			var that = this;
				var pullToRefresh = new auiPullToRefresh({ //下拉刷新
					container: document.querySelector('.aui-refresh-content'), //下拉容器
					triggerDistance: 80 //下拉高度
				}, function(ret) {
					if (ret.status == "success") {
						that.$ajax.defaults.timeout  =  49527;//49527这个值控制没有showLonding
						that.ranking();
						that.getBanner();
						that.getUserInfo();
						// that.NewInformationgetList();
						that.getUserLotteryBetInfo();
						setTimeout(() => {
							pullToRefresh.cancelLoading(); //刷新成功后调用此方法隐藏
						}, 1500)
					}
				});
// 				var scroll = new auiScroll({ //上拉加载
// 					listen: false, //是否监听滚动高度，开启后将实时返回滚动高度
// 					distance: 0 //判断到达底部的距离，isToBottom为true
// 				}, function(ret) {
// 					if (ret.isToBottom == true && that.auiScroll) {
// 						that.auiScroll = false;
// 						that.page++;
// 					}
// 				});
				
				
			laohuji = new Swiper('#laohuji', {
				loop: false,
				on: {
					slideChangeTransitionStart: function() {
						that.swiperIndex = this.activeIndex;
						if (this.activeIndex == 0) {
							setTimeout(() => {
								that.isdong = true;
								setTimeout(() => {
									// that.switchks();
									that.start();
								}, 500)
							}, 100)
						} else if (this.activeIndex == 1) {
							setTimeout(() => {
								that.isdongD = true;
								setTimeout(() => {
									// that.switchssc();
									that.startD();
								}, 500)
							}, 100)
						}else if (this.activeIndex == 2) {
							setTimeout(() => {
								that.isdongQ = true;
								setTimeout(() => {
									that.startQ();
								}, 500)
							}, 100)
						}
					},
				},
				paginationClickable: true,
				autoplayDisableOnInteraction: false,
				observer: true, //修改swiper自己或子元素时，自动初始化swiper
				observeParents: true, //修改swiper的父元素时，自动初始化swiper
			});

			let CashTscc = getCookie('CashTscc');
			if (CashTscc == '1') {
				this.CashTips = false;
			} else {
				this.CashTips = true;
				setCookie('CashTscc', '1');
			}
			setTimeout(() => {
				this.isdong = true;
				setTimeout(() => {
					// this.switchks();
					this.start()
				}, 500)
			}, 600)
			
			setTimeout(()=>{
				var box = document.getElementById("box");
				var con1 = document.getElementById("con1");
				var con2 = document.getElementById("con2");
				// con2.innerHTML = con1.innerHTML;
				 conin = setInterval(() => {
					this.ScrollUp(box, con1)
				}, speed);
			},1000)
		},
		methods: {
			//中奖详情
			goHomeDetails:function(shareNumber,types,uid){
				var betType;
				switch (types){
					case 'JCZQ':
					betType=1;
					break
					case 'JCLQ':
					betType=1;
					break
					case 'DCZC':
					betType=1;
					break
					case 'SCZC':
					betType=1;
					break
					case 'SFZC':
					betType=1;
					break
					case 'RXJC':
					betType=1;
					break
					case 'LCZC':
					betType=1;
					break
				}
				 types=TypeCapitalconversionLowercase(types)
				if(betType==1){
					this.$router.push({
						name:'home_scheme_detail_alone',
						query:{
							id:shareNumber,
							key:types,
							uid:uid
						}
					})
				}else{
					this.$router.push({
						name:'home_scheme_detail_alone_shuzicai',
						query:{
							id:shareNumber,
							key:types,
							uid:uid
						}
					})
				}
				
			},
			//时时彩
			switchssc:function(){
				this.reflash = true;
				setTimeout(() => {
					this.reflash = false;
				}, 250);
				var rand1 = parseInt(Math.random() * 9 + 1);
				var rand2 = parseInt(Math.random() * 9 + 1);
				var rand3 = parseInt(Math.random() * 9 + 1);
				var rand4 = parseInt(Math.random() * 9 + 1);
				var rand5 = parseInt(Math.random() * 9 + 1);
				var shishicai=[rand1,rand2,rand3,rand4,rand5];
				this.shishicai=shishicai;
			},
	        sscPay:function(){
					if(!getCookie('newData')){
					// Toast("登录过期，请重新登录");
				    this.RouteLeave = true;
					this.$router.push({
						name:'login'
					});
					return false;
				}
				if(!getCookie('newData').userid){
					// Toast("登录过期，请重新登录");
				    this.RouteLeave = true;
					this.$router.push({
						name:'login'
					});
					return false;
				}
				var wan=[this.shishicai[0]],qian=[this.shishicai[1]],bai=[this.shishicai[2]],shi=[this.shishicai[3]],ge=[this.shishicai[4]], betContent=[],obj={};
				obj.wan=wan;
				obj.qian=qian;
				obj.bai=bai;
				obj.shi=shi;
				obj.ge=ge;
				obj.totalNum=1;
				obj.playType='five';
				betContent.push(obj);
				var content = {};
				content.betContent=betContent;
				content.danDallIdx=6;
				content.playMethod='direct';
				content.playType='five';
				content.titleName='五星直选';
				setSession('betContent', betContent);
				setSession('content', content);
				this.$router.push({
					name: 'goucai_gpc_cqsscpay',
					query: {
						fromHome: 'home'
					}
				});
			},
			switchks:function(){
				this.reflash = true;
				setTimeout(() => {
					this.reflash = false;
				}, 250);
				var rand = parseInt(Math.random() * 6 + 1);
				while(rand==this.quchong){
					rand = parseInt(Math.random() * 6 + 1)
				}
				var ksbetNum;
				var kuaisan=[];
				switch (rand) {
					case 1:
						ksbetNum = 111;
						kuaisan=['01','01','01']
						break;
					case 2:
						ksbetNum = 222;
						kuaisan=['02','02','02']
						break;
					case 3:
						ksbetNum = 333;
						kuaisan=['03','03','03']
						break;
					case 4:
						ksbetNum = 444;
						kuaisan=['04','04','04']
						break;
					case 5:
						ksbetNum = 555;
						kuaisan=['05','05','05']
						break;
					case 6:
						ksbetNum = 666;
						kuaisan=['06','06','06']
						break;
					default:
				}
				this.quchong=rand;
				this.ksbetNum=ksbetNum;
				this.kuaisan=kuaisan;
			},
			ksPay:function(){
					if(!getCookie('newData')){
					Toast("登录过期，请重新登录");
				    this.RouteLeave = true;
					this.$router.push({
						name:'login'
					});
					return false;
				}
				if(!getCookie('newData').userid){
					Toast("登录过期，请重新登录");
				    this.RouteLeave = true;
					this.$router.push({
						name:'login'
					});
					return false;
				}
				var obj={};
				var redQiu=[];
				redQiu.push(this.ksbetNum);
				obj.current='20190605010';
				obj.limitNumber=2;
				obj.playType="三同号单选";
				obj.redQiu=redQiu;
				obj.totalNum=1;
				obj.totalPrice=2;
			
				var ssqBetArr=[];
				ssqBetArr.push(obj);
				var content = {};
				content["name"] = '三同号单选';
				content["limitNumber"] = 2;
				setSession('content',content);
				setSession('ssqBetList',ssqBetArr);
				this.$router.push({
				    name:'goucai_gpc_jskspay',
					query: {
						fromHome: 'home'
					}
				});
			},
			stop:function () {
				clearInterval(conin);
			},
			up:function() {
				var box = document.getElementById("box");
				var con1 = document.getElementById("con1");
				 conin = setInterval(() => {
					this.ScrollUp(box, con1)
				}, speed);
			},
			ScrollUp: function(box, con1) {
				// console.log(box.scrollTop);
				if (box.scrollTop >= con1.scrollHeight) {
					this.$nextTick(() => {
						box.scrollTop = 0;
					})
				} else {
					this.$nextTick(() => {
						box.scrollTop++;
					})

				}
				// console.log(box.scrollTop);
			},
			tranNumberho: function(money, nuo) {
				return tranNumber(money, nuo);
			},
			mobileHideho: function(str, start, num) {
				return mobileHide(str, start, num);
			},
			switchSwiper: function(index) {
				this.swiperIndex = index;
				laohuji.slideTo(index);
			},
			showbox: function(msg) { //实名
				this.logok = msg;
			},
			close: function() {
				this.flag = 0;
			},
			openIn: function(i) {
				this.$router.push({
					name: 'notice',
					// 					query: {
					// 						articleId: i,
					// 						bool: false
					// 					}
				})
			},
// 			openNewsDetails: function(i,s) { //资讯详情
// 				var thas=this;
// 				var nums=0;
// 				var numc=0;
// 				thas.articleId.map(function(item){
// 				if(item==i){
// 					nums++;	
// 				}})
// 				if(nums<1){
// 					thas.articleId.push(i);
// 				}
// 					for(var k in thas.clicks){
// 					console.log(k)
// 					if(k==i){
// 						this.clicks[k]=s+1;
// 						numc++;
// 					}
// 				}
// 				if(numc<1){
// 					this.clicks[i]=s+1;
// 				}
// 				setSession('articleId',this.articleId);
// 				setCookie("clicks",JSON.stringify(this.clicks),'3-D');
// 				this.$router.push({
// 					name: 'information_news_details',
// 					query: {
// 						articleId: i
// 					}
// 				})
// 			},
			getTime: function() {
				var time = new Date();
				console.log(time)
				var dd = time.getDay();
				switch (dd) {
					case 0:
						dd = "日";
						this.flags.SSQ = true;
						break;
					case 1:
						dd = "一";
						this.flags.DLT = true;
						this.flags.SEVEN = true;
						break;
					case 2:
						dd = "二";
						this.flags.SSQ = true;
						break;
					case 3:
						dd = "三";
						this.flags.DLT = true;
						this.flags.SEVEN = true;
						break;
					case 4:
						dd = "四";
						this.flags.SSQ = true;
						break;
					case 5:
						dd = "五";
						this.flags.SEVEN = true;
						break;
					case 6:
						dd = "六";
						this.flags.DLT = true;
						break;
				}
				console.log(dd)
			},
// 			NewInformationgetList: function() {
// 				console.log(1)
// 				let uid = getCookie('newData');
// 				var userId = uid.userid;
// 				var thas = this
// 				var data = [];
// 				data['page'] = thas.page;
// 				data['limit'] = thas.limit;
// 
// 				var datas = this.Qs.stringify({
// 					data
// 				}, {
// 					allowDots: true
// 				});
// 				var thas = this;
// 				console.log(datas)
// 				thas.$ajax.post('/caipiaoshouye/index.php/home/index/NewInformationgetList',
// 						datas
// 					)
// 					.then(res => {
// 						thas.content = [];
// 						console.log(res)
// 						var content = res.data.content
// 						console.log(content)
// 						if (content.code == '1000') {
// 							content.obj.map(function(item) {
// 								if (thas.content.length <= 4) {
// 									thas.content.push(item)
// 								}
// 							})
// 							thas.content.map(function(item){
// 								thas.articleId.map(function(items){
// 									if(item.articleid===items){
// 										item.flag=1;
// 									}
// 								})
// 							})
// 							thas.content.map(function(item){
// 								for(var k in thas.clicks){
// 									console.log(k)
// 									if(k==item.articleid){
// 										if(item.clicks<thas.clicks[k]){
// 											item.clicks=thas.clicks[k]
// 										}
// 									}
// 								}
// 							})
// 						}
// 					})
// 			},
			// 			logokbtn1: function() {  //前往实名
			// 			    this.logok = false;
			// 			    this.$router.push({
			// 			        name: 'userinfo_task_real'
			// 			    })
			// 			},
			// 			logokbtn2: function() {  //取消实名
			// 			    this.logok = false;
			// 			},
			getBanner: function() {
				var data = [];
				data["page"] = 1;
				data["limit"] = 10;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});

				this.$ajax.post('/caipiaoshouye/index.php/home/index/appbanner',
						datas
					)
					.then(ret => {

						console.log(ret.data);
						var conent = ret.data.content;

						var bannerList = [];
						for (var i = 0; i < conent.obj.length; i++) {
							var skipUrlArr = conent.obj[i].skipUrl.split(',');
							bannerList.push({
								'id': skipUrlArr[1],
								'src': "http://" + conent.other + conent.obj[i].url
							})
						}
						this.bannerList = [];
						this.bannerList = bannerList;
						/* if(getSession('homebannerList')){
							this.bannerList=getSession('homebannerList')
						}else{
							this.bannerList = bannerList;
						} */
						setSession('homebannerList', bannerList)
						this.$nextTick(() => { // 解决方法: 在获取完数据后，将swiper放在$nextTick下一个UI帧再初始化
							this.bannerSwiper()
						})
					})
					.catch(err => {

						console.log(err);
					})
			},
			bannerSwiper: function() {
				var that = this;
				let mySwiper = new Swiper('.swiper-container1', {
					loop: true,
					speed: 500,
					// autoWidth: 90,
					heght: 260,
					initialSlide: 1,
					autoHeight: false, //高度随内容变化
					spaceBetween: 10,
					// slidesOffsetBefore: 20,
					// autoplay:true,
					// effect : 'coverflow',
					slidesPerView: 'auto', //设置slider容器能够同时显示的slides数量
					noSwiping: false,
					// slidesOffsetBefore : 0,
					// slidesOffsetAfter:20,
					centeredSlides: true,
					autoplay: {
						delay: 3000,
						stopOnLastSlide: false,
						disableOnInteraction: false,
					},
					// pagination: {
					// 	el: '.swiper-pagination',
					// 	// type: 'bullets',
					// 	bulletElement: 'li',
					// },
					on: {
						click(e) {
							var user = getCookie('newData');
							if (!user) {
								that.$router.push({
									name: 'login'
								})
								return false;
							}
							let name = e.target.id;
							// let name ='information_bulletin,2,home';
							var ms = name.split('&')
							if (ms.length == 1) {
								that.$router.push({
									name: name
								})
							} else {
								that.$router.push({
									name: ms[0],
									query: {
										articleId: ms[1],
										bool: ms[2]
									}
								})
							}
						}
					},
					autoplayDisableOnInteraction: false,
					observer: true, //修改swiper自己或子元素时，自动初始化swiper
					observeParents: true, //修改swiper的父元素时，自动初始化swiper
					onSlideChangeEnd: function(swiper) {
						swiper.update();
						mySwiper.startAutoplay();
						mySwiper.reLoop();
					}
				});
			},
			xiazai: function() {
				/* var newData = getCookie('newData');
				var link = OverallData().download
				if (newData) {
					window.open('http://xz.facaime.com?_userId=' + newData.userid);
				} else {
					window.open('http://xz.facaime.com');
				} */
				this.$router.push({
					name: 'online_service'
				})
			},
			xiazai1: function() {
				var newData = getCookie('newData');
				var link = OverallData().download
				if(getCookie('yinliuaff')||getCookie('yinliuuser')){
					if(getCookie('yinliuuser')){
						window.open('http://m.facaime.com/yinliu/yinliu.html?_userId=' + getCookie('yinliuuser'));
					}else{
						window.open('http://m.facaime.com/yinliu/yinliu.html?aff_id=' + getCookie('yinliuaff'));
					}
					
					}else{
						if (newData) {
							window.open('http://xz.facaime.com?_userId=' + newData.sportId);
						} else {
							window.open('http://xz.facaime.com');
						}
					}
				
			},
// 			openNews: function() { //跳转到新闻资讯
// 				this.$router.push({
// 					name: 'information_news'
// 				})
// 			},
			gouser: function() {
				if (this.$router.name !== 'user') {
					this.$router.push({
						name: 'user'
					})
				}
			},
			gohome: function() {
				if (this.$router.name !== 'home') {
					this.$router.push({
						name: 'home'
					})
				}
			},
			goscratch: function() {
				if (this.$router.name !== 'scratch') {
					this.$router.push({
						name: 'scratch'
					})
				}
			},
			gogoucai: function() {
				if (this.$router.name !== 'goucai') {
					this.$router.push({
						name: 'goucai'
					})
				}
			},
			toinvite: function() {
					this.$router.push({
						name: 'userinfo_invite_friends'
					})
			},
			golottery: function() {
				if (this.$router.name !== 'lottery') {
					this.$router.push({
						name: 'lottery'
					})
				}
			},
			gotask: function() {
				if (this.$router.name !== 'task') {
					this.$router.push({
						name: 'task'
					})
				}
			},

			//执行循环
			initSwiper: function() {
				var thas = this;
				let mySwiper1 = new Swiper('.home-header-banner', {
					loop: true,
					direction: 'vertical',
					autoplay: {
						delay: 3000,
						stopOnLastSlide: false,
						disableOnInteraction: false,
					},
					on: {
						click(e) {
							var i = e.target.id;
							thas.openIn(i)
						}
					},
					paginationClickable: true,
					autoplayDisableOnInteraction: false,
					observer: true, //修改swiper自己或子元素时，自动初始化swiper
					observeParents: true, //修改swiper的父元素时，自动初始化swiper
				});
			},
			menuJump: function(url) {
				//判断登录过期
				var user = getCookie('newData');
				if (!user) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
				if(url == 'myincome'){
					this.$router.push({
						name: url,
						query:{
                            pageId:0
                        }
					})
				}else{
					this.$router.push({
						name: url
					})
				}
				
			},

			goToDetails: function(name, patyInd) {
				console.log(patyInd+","+name)
				if (patyInd !== '5') {
					this.$router.push({
						path: '/goucai/goucai_jjc_sc',
						query: {
							'patyInd': patyInd
						}
					})
				} else {
					this.$router.push({
						name
					})
				}
			},
			Download: function() {
				var link = OverallData().Appdownload
				window.open(link);
			},
			getUserInfo: function() {
				var data = [];
				// data["id"] = 0;
				data['page'] = this.page;
				data['limit'] = this.limit;
				data['status'] = this.status;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/noticeWebselect',
						datas
					).then(res => {
						console.log(res)
						let homeGetTime = new Date().getTime();
						// console.log(homeGetTime)
						setSession('homeGetTime', homeGetTime)
						var content = res.data.content;
						// console.log(content)   
						console.log(content.data)
						if (res.data.status != "200") {
							return;
						} else {
							if (content.code == "1000") {
								console.log(content.data);
								this.ggtext = content.data.lotteryNoticeList;
								/* if(getSession('homeGgtext')){
									this.ggtext=getSession('homeGgtext')
								}else{
									this.ggtext = content.data.lotteryNoticeList;
								} */
								setSession('homeGgtext', content.data.lotteryNoticeList)
								this.$nextTick(() => { // 解决方法: 在获取完数据后，将swiper放在$nextTick下一个UI帧再初始化
									this.initSwiper()
								})
								console.log(this.ggtext)
							} else if (content.code == "201010") {
								Toast("账户已被锁定，请联系客服");
								setCookie('newData', '', '0-S');
								this.$router.push({
									name: 'login'
								})
							}

						}
						this.img_url = getCookie("newData").headurl;
					})
					.catch(err => {

					})

			},
			laiyizhu: function() {
				this.isdong = true;
				setTimeout(() => {
					this.start();
				}, 500)
			},
			shenlaiyizhu: function() {
				var user = getCookie('newData');
				if (!user) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
				// if (getCookie('logok')) { //判断是否实名
				// 	this.logok = true;
				// 	return false;
				// }
				if (this.chooseRed.length < 6) {
					Toast('请点击摇杆生成随机一注!');
					return false;
				}
				if (this.chooseBlue.length < 1) {
					Toast('请点击摇杆生成随机一注!');
					return
				}
				var redArr = this.chooseRed;
				var blueArr = this.chooseBlue;
				var ssqBetList = {};
				ssqBetList.type = 'puTong';
				ssqBetList.totalNum = 1;
				ssqBetList.totalPrice = 2;
				ssqBetList.current = '';
				ssqBetList.redQiu = redArr;
				ssqBetList.blueQiu = blueArr;
				var setArr = [];
				setArr.push(ssqBetList);
				setSession('arr', setArr);
				this.$router.push({
					path: '/goucai/goucai_mc_ssqpay',
					query: {
						current: '',
						endedTime: '',
						type: 'normal',
						fromHome: 'home'
					}
				})
			},
			start: function() {
				let dataString = htmlSize.replace('px', '');
				const tagHight = 1 * dataString * 2.7;
				console.log(tagHight);
				let chooseArr = [];
				let choose = [];
				let chooseb = [];
				if (this.opts) {
					return
				}
				var randomSix
				while (chooseArr.length < 6) {
					randomSix = Math.floor(Math.random() * 33);
					if (chooseArr.indexOf(randomSix) < 0) {
						chooseArr.push(randomSix); //生成随机红球
						choose.push(randomSix * 1 + 1); //生成红球
					}
				}
				chooseArr.sort(compare); //随机排序
				randomSix = Math.floor(Math.random() * 16);
				chooseArr.push(randomSix); //生成随机蓝球
				chooseb.push(randomSix * 1 + 1); //生成蓝球
				choose.sort(compare); //红球排序
				this.chooseRed = choose; //红球数组
				this.chooseBlue = chooseb; //蓝球数组
				this.opts = this.slots.map((data, i) => {
					const slot = this.$refs.slots[i]; // map(function(){})利用map便利slots的每一个选项组,最终得到return的返回值
					const choice = chooseArr[i]; // Math.floor(random * data.items.length); // 随机生成一个[0,data.items.length]的整数(floor向下取整)
					// console.log("choice", i, data.items[choice])
					const opts = {
						el: slot.querySelector('.slot__wrap'), //指向奖项元素的父级;
						finalPos: choice * tagHight, // 180为每一个奖品滚动标签的高度;
						//    startOffset: 2000 + Math.random() * 500 + i * 500,// 影响转的圈数
						startOffset: 20 + Math.random() * 500 + i * 500, // 影响转的圈数
						height: data.items.length * tagHight,
						duration: 3000 + i * 700, // milliseconds
						isFinished: false,
					}
					return opts
				})
				//  console.log(this.opts);//这个时候this.opts已经和opts一模一样了
				next(this.animate); // 开启动画
			},
			animate: function(timestamp) { // timestamp当前的方法持续的毫秒数
				if (this.startedAt == null) {
					this.startedAt = timestamp // 动画初始时间
				}
				const timeDiff = timestamp - this.startedAt //动画持续的时间
				this.opts.forEach(opt => {
					if (opt.isFinished) {
						return
					}
					const timeRemaining = Math.max(opt.duration - timeDiff, 0); // 总的持续时间 - 动画持续时间 = 剩下的时间,0表示结束
					const power = 3;
					const offset = (Math.pow(timeRemaining, power) / Math.pow(opt.duration, power)) * opt.startOffset;
					// Math.pow(timeRemaining, power)表示: timeRemaining 的3 次幂;
					// negative, such that slots move from top to bottom
					const pos = -1 * Math.floor((offset + opt.finalPos) % opt.height)
					opt.el.style.transform = "translate3d(0px," + pos + "px,0px)"

					if (timeDiff > opt.duration) {
						//    console.log('finished', opt, pos, opt.finalPost)
						opt.isFinished = true
					}

				})
				if (this.opts.every(o => o.isFinished)) {
					this.opts = null
					this.startedAt = null
					// console.log('jieshule');
					this.isdong = false;
					//   console.log('finished')
				} else {
					next(this.animate)
				}
			},
			//大乐透身来一注
			laiyizhuD: function() {
				this.isdongD = true;
				setTimeout(() => {

					this.startD();
				}, 500)
			},
			shenlaiyizhuD: function() {
				var user = getCookie('newData');
				if (!user) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
				// if (getCookie('logok')) { //判断是否实名
				// 	this.logok = true;
				// 	return false;
				// }
				if (this.chooseRedD.length < 5) {
					Toast('请点击摇杆生成随机一注!');
					return false;
				}
				if (this.chooseBlueD.length < 2) {
					Toast('请点击摇杆生成随机一注!');
					return
				}
				var redArrD = this.chooseRedD;
				var blueArrD = this.chooseBlueD;
				var ssqBetListD = {};
				ssqBetListD.type = 'normal';
				ssqBetListD.totalNum = 1;
				ssqBetListD.totalPrice = 2;
				ssqBetListD.current = '';
				ssqBetListD.redQiu = redArrD;
				ssqBetListD.blueQiu = blueArrD;
				var setArrD = [];
				setArrD.push(ssqBetListD);
				setSession('arr', setArrD);
				this.$router.push({
					path: '/goucai/goucai_mc_dltpay',
					query: {
						current: '',
						endedTime: '',
						type: 'normal',
						fromHome: 'home'
					}
				})
			},
			startD: function() {
				let dataStringD = htmlSize.replace('px', '');
				const tagHightD = 1 * dataStringD * 2.7;
				console.log(tagHightD);
				let chooseArrD = [];
				let chooseArrDL = [];
				let chooseD = [];
				let choosebD = [];
				if (this.optsD) {
					return
				}
				var randomSixD;
				while (chooseArrD.length < 5) {
					randomSixD = Math.floor(Math.random() * 35);
					if (chooseArrD.indexOf(randomSixD) < 0) {
						chooseArrD.push(randomSixD); //生成随机红球
						chooseD.push(randomSixD * 1 + 1); //生成红球
					}
				}
				chooseArrD.sort(compare); //随机排序
				while (chooseArrDL.length < 2) {
					randomSixD = Math.floor(Math.random() * 12);
					if (chooseArrDL.indexOf(randomSixD) < 0) {
						chooseArrDL.push(randomSixD); //生成随机蓝球
						choosebD.push(randomSixD * 1 + 1); //生成蓝球
					}
				}
				chooseArrDL.sort(compare); //随机排序
				chooseArrD = chooseArrD.concat(chooseArrDL); //生成随机蓝球
				choosebD.sort(compare); //蓝球排序
				chooseD.sort(compare); //红球排序
				this.chooseRedD = chooseD; //红球数组
				this.chooseBlueD = choosebD; //蓝球数组
				this.optsD = this.slotsD.map((data, i) => {
					const slotD = this.$refs.slotsD[i]; // map(function(){})利用map便利slots的每一个选项组,最终得到return的返回值
					const choiceD = chooseArrD[i]; // Math.floor(random * data.items.length); // 随机生成一个[0,data.items.length]的整数(floor向下取整)
					// console.log("choice", i, data.items[choice])
					const optsD = {
						el: slotD.querySelector('.slot__wrapD'), //指向奖项元素的父级;
						finalPos: choiceD * tagHightD, // 180为每一个奖品滚动标签的高度;
						//    startOffset: 2000 + Math.random() * 500 + i * 500,// 影响转的圈数
						startOffset: 20 + Math.random() * 500 + i * 500, // 影响转的圈数
						height: data.items.length * tagHightD,
						duration: 3000 + i * 700, // milliseconds
						isFinished: false,
					}
					return optsD
				})
				//  console.log(this.opts);//这个时候this.opts已经和opts一模一样了
				next(this.animateD); // 开启动画
			},
			animateD: function(timestamp) { // timestamp当前的方法持续的毫秒数
				if (this.startedAtD == null) {
					this.startedAtD = timestamp // 动画初始时间
				}
				const timeDiffD = timestamp - this.startedAtD //动画持续的时间
				this.optsD.forEach(opt => {
					if (opt.isFinished) {
						return
					}
					const timeRemainingD = Math.max(opt.duration - timeDiffD, 0); // 总的持续时间 - 动画持续时间 = 剩下的时间,0表示结束
					const powerD = 3;
					const offsetD = (Math.pow(timeRemainingD, powerD) / Math.pow(opt.duration, powerD)) * opt.startOffset;
					// Math.pow(timeRemaining, power)表示: timeRemaining 的3 次幂;
					// negative, such that slots move from top to bottom
					const posD = -1 * Math.floor((offsetD + opt.finalPos) % opt.height)
					opt.el.style.transform = "translate3d(0px," + posD + "px,0px)"

					if (timeDiffD > opt.duration) {
						//    console.log('finished', opt, pos, opt.finalPost)
						opt.isFinished = true
					}

				})
				if (this.optsD.every(o => o.isFinished)) {
					this.optsD = null
					this.startedAtD = null
					// console.log('jieshule');
					this.isdongD = false;
					//   console.log('finished')
				} else {
					next(this.animateD)
				}
			},
			//七乐彩神来一注
			laiyizhuQ: function() {
				this.isdongQ = true;
				setTimeout(() => {

					this.startQ();
				}, 500)
			},
			shenlaiyizhuQ: function() {
				var user = getCookie('newData');
				if (!user) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
				// if (getCookie('logok')) { //判断是否实名
				// 	this.logok = true;
				// 	return false;
				// }
				if (this.chooseRedQ.length < 7) {
					Toast('请点击摇杆生成随机一注!');
					return false;
				}
				var redArrQ = this.chooseRedQ;
				var ssqBetListQ = {};
				ssqBetListQ.type = 'normal';
				ssqBetListQ.totalNum = 1;
				ssqBetListQ.totalPrice = 2;
				ssqBetListQ.current = '';
				ssqBetListQ.redQiu = redArrQ;
				var setArrQ = [];
				setArrQ.push(ssqBetListQ);
				setSession('arr', setArrQ);
				this.$router.push({
					path: '/goucai/goucai_mc_qlcpay',
					query: {
						current: '',
						endedTime: '',
						type: 'normal',
						fromHome: 'home'
					}
				})
			},
			startQ: function() {
				let dataStringQ = htmlSize.replace('px', '');
				const tagHightQ = 1 * dataStringQ * 2.7;
				console.log(tagHightQ);
				let chooseArrQ = [];
				let chooseQ = [];
				if (this.optsQ) {
					return
				}
				var randomSixQ;
				while (chooseArrQ.length < 7) {
					randomSixQ = Math.floor(Math.random() * 30);
					if (chooseArrQ.indexOf(randomSixQ) < 0) {
						chooseArrQ.push(randomSixQ); //生成随机红球
						chooseQ.push(randomSixQ * 1 + 1); //生成红球
					}
				}
				chooseArrQ.sort(compare); //随机排序
				chooseQ.sort(compare); //红球排序
				this.chooseRedQ = chooseQ; //红球数组
				this.optsQ = this.slotsQ.map((data, i) => {
					const slotQ = this.$refs.slotsQ[i]; // map(function(){})利用map便利slots的每一个选项组,最终得到return的返回值
					const choiceQ = chooseArrQ[i]; // Math.floor(random * data.items.length); // 随机生成一个[0,data.items.length]的整数(floor向下取整)
					// console.log("choice", i, data.items[choice])
					const optsQ = {
						el: slotQ.querySelector('.slot__wrapQ'), //指向奖项元素的父级;
						finalPos: choiceQ * tagHightQ, // 180为每一个奖品滚动标签的高度;
						//    startOffset: 2000 + Math.random() * 500 + i * 500,// 影响转的圈数
						startOffset: 20 + Math.random() * 500 + i * 500, // 影响转的圈数
						height: data.items.length * tagHightQ,
						duration: 3000 + i * 700, // milliseconds
						isFinished: false,
					}
					return optsQ
				})
				//  console.log(this.opts);//这个时候this.opts已经和opts一模一样了
				next(this.animateQ); // 开启动画
			},
			animateQ: function(timestamp) { // timestamp当前的方法持续的毫秒数
				if (this.startedAtQ == null) {
					this.startedAtQ = timestamp // 动画初始时间
				}
				const timeDiffQ = timestamp - this.startedAtQ //动画持续的时间
				this.optsQ.forEach(opt => {
					if (opt.isFinished) {
						return
					}
					const timeRemainingQ = Math.max(opt.duration - timeDiffQ, 0); // 总的持续时间 - 动画持续时间 = 剩下的时间,0表示结束
					const powerQ = 3;
					const offsetQ = (Math.pow(timeRemainingQ, powerQ) / Math.pow(opt.duration, powerQ)) * opt.startOffset;
					// Math.pow(timeRemaining, power)表示: timeRemaining 的3 次幂;
					// negative, such that slots move from top to bottom
					const posQ = -1 * Math.floor((offsetQ + opt.finalPos) % opt.height)
					opt.el.style.transform = "translate3d(0px," + posQ + "px,0px)"

					if (timeDiffQ > opt.duration) {
						//    console.log('finished', opt, pos, opt.finalPost)
						opt.isFinished = true
					}

				})
				if (this.optsQ.every(o => o.isFinished)) {
					this.optsQ = null
					this.startedAtQ = null
					// console.log('jieshule');
					this.isdongQ = false;
					//   console.log('finished')
				} else {
					next(this.animateQ)
				}
			},
			getUserLotteryBetInfo: function() {
				var data = [];
				var user = getCookie('newData').sportId;
				data['uid'] = user;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.timeout == 49527;
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getUserLotteryBetInfo',
						datas
					).then(res => {
						if (res.data.content.code == '1000') {
							console.log(dataes)
							var dataes = res.data.content.data;
							for (var i = 0; i < dataes.length; i++) {
								if (dataes[i].lotteryType == 'PL') {
									dataes[i].lotteryTypeName = '排列三'
								}
								dataes[i].imageUrl = homeIcon(dataes[i].lotteryType).path;
								dataes[i].url = homeIcon(dataes[i].lotteryType).url;
								dataes[i].inx = homeIcon(dataes[i].lotteryType).index;
								dataes[i].introduce = homeIcon(dataes[i].lotteryType).introduce;
							}
							/* if(getSession('homeCopyList')){
								this.copyList=getSession('homeCopyList')
							}else{
								this.copyList = dataes;

							} */
							setSession('homeCopyList', dataes)
							this.copyList = dataes;
							console.log(this.copyList);
						}
						// this.$ajax.timeout==50000;
					})
					.catch(err => {
						console.log(err);
						this.$ajax.timeout == 50000;
					})
			},
			// 中奖排行
			ranking_img: function(url) {
				this.$router.push({
					path: './userinfo/ranking_img',
					query: {
						url: url,

					}
				})
			},
			ranking: function() {
				var userId='';
				if(getCookie('newData')){
					userId=getCookie('newData').sportId;
				}
				
				var nowt = new Date();
				var getyeur = nowt.getFullYear();
				var getmonth = nowt.getMonth() + 1;
				var getday = nowt.getDate() - 1;
				var endday = nowt.getDate();
				if (getmonth < 10) {
					getmonth = "0" + getmonth;
				}
				var user=0;
				if(getCookie('newData')){
					user= getCookie('newData').sportId;
				}
				 
				
				var data = [];
				data["limit"] = 90;
				data["page"] = 1;
				data["winTimeStart"] = getyeur + '-' + getmonth + '-' + '01';
				data["winTimeEnd"] = getyeur + '-' + getmonth + '-' + endday;
                 data['userId'] = user;
				var datas = this.Qs.stringify({
					"mid": 1,
					"appId": 1,
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/LotteryUserWinInfoGetList',
						datas
					)
					.then(res => {
						var data = res.data;
						if (data.status == 200) {
							if (data.content.code == 1000) {
								var lotTypeData=data.content.obj;
								
								for(var i=0;i<lotTypeData.length;i++){
									lotTypeData[i].imageUrl = homeIcon(lotTypeData[i].type).path;
								}
								this.kindata = lotTypeData;
								let numRem=(this.kindata.length*1-1)*2.2;
											
											if(numRem>17.6){
												numRem=17.6
											}
										
								this.boxLength=numRem+'rem';
								// dataes[i].imageUrl = homeIcon(dataes[i].lotteryType).path;
								/* if(getSession('homekindata')){
									this.kindata=getSession('homekindata')
								}else{
									this.kindata = data.content.obj;
								} */
								setSession('homekindata', lotTypeData)
							}
						}

					})
					.catch(err => {
						console.log(err);
					})
			},
		},
		filters: {
			getTimes: function(matchDate) {
				matchDate = matchDate.replace(/-/g, '/');
				var time = new Date(matchDate);
				var y = time.getFullYear();
				var m = time.getMonth() + 1 >= 10 ? parseInt(time.getMonth() + 1) : "0" + parseInt(time.getMonth() + 1);
				var d = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
				var h = time.getHours() >= 10 ? time.getHours() : "0" + time.getHours();
				var mm = time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes();
				//月日时分
				return m + "-" + d + " " + h + ":" + mm;
			},
			tranNumber: function(num, point) {
				var numStr = num.toString()
				// 千以内直接返回
				if (numStr.length <= 4) {
					return numStr;
				}
				//大于8位数是亿
				else if (numStr.length > 11) {
					let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
					return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿';
				}
				//大于4位数是万 (以1W分割 1W以下全部显示)
				else if (numStr.length > 4) {
					let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
					return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万';
				}
			}

		},

	}
</script>
<style scoped>
	@import "../css/home.css";
	
</style>
