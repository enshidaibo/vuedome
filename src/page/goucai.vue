<template>
	<div class="goucai" >
		<header class="aui-bar aui-bar-nav">
			<div class="aui-title home-header">购彩<span id="service" class="service"></span></div>
			<!-- <div class="aui-btn aui-pull-right kaijiang" @click="golottery()">
				<img src="../assets/lottery/kaijianBtn.png" />
			</div> -->
		</header>
		<div class="msta">
			<div class="aui-tab" id="frame1_nav">
				<div v-for="(item,index) in tabItemList" :class="['aui-tab-item','tapmode',{'aui-active': item.status}]" @click="changeTab($event,index)">
				<img src="../assets/goucai/goucai_hongbao.png" alt="" class="imgHg" v-if="index!=1" :class="index==2?'imgHg1':''">
{{item.cont}}</div>
			</div>
			<div class="mainBox">
				<div class="mainBox1">
				<div class="mainLeft">
					<p>近期</p>
					<p>开奖</p>
				</div>
				<div class="mainCenter ws1" v-if="show==0">
					<div class="redball_left" >
						<span v-if="math_data[num1].result!=''" v-for="result_data in (math_data[num1].result.split(' ')[0].split(','))">{{result_data}}</span><span class="blue_ball"
						 v-for="result_data in (math_data[num1].result.split(' ')[1]?math_data[num1].result.split(' ')[1].split(','):[])">{{result_data}}</span>
					</div>
				</div>
				<div class="mainCenter ws2" v-else-if="show==1">
					<div class="redball_left">
						
						<div class="bottom">
							<div class="redball_left">
								<span v-if="heighter_data[num2].result!=''"  v-for="result_data in (heighter_data[num2].result.split(' ')[0].split(','))">{{result_data}}</span><span class="blue_ball"
								 v-for="result_data in (heighter_data[num2].result.split(' ')[1]?heighter_data[num2].result.split(' ')[1].split(','):[])">{{result_data}}</span>
							</div>			
						</div>		
					</div>
				</div>
				<div class="mainCenter ws3" v-else-if="show==2">	
					<div class="input_button">
						<div v-if="num==0">
							<span>{{sports_data.JCZQ.homeTeamName}}</span>
							<span class="score">{{sports_data.JCZQ.score}}</span>
							<span>{{sports_data.JCZQ.guestTeamName}}</span>
						</div>
						<div v-else-if="num==1">
							<span>{{sports_data.JCLQ.guestTeamName}}</span>
							<span class="score">{{sports_data.JCLQ.score}}</span>
							<span>{{sports_data.JCLQ.homeTeamName}}</span>
						</div>	
						<div v-else-if="num==2">
							<span>{{sports_data.DCZC.homeTeamName}}</span>
							<span class="score">{{sports_data.DCZC.score}}</span>
							<span>{{sports_data.DCZC.guestTeamName}}</span>
						</div>	
						<div v-else-if="num==3">
							<div class="redball_left">
								<span v-for="result_data in (sports_data.SCZC.result&&sports_data.SCZC.result.split(''))">{{result_data}}</span>
							</div>
						</div>	
						<div v-else-if="num==4">
							<div class="redball_left">
								<span v-for="result_data in (sports_data.LCZC.result&&sports_data.LCZC.result.split(''))">{{result_data}}</span>
							</div>
						</div>
						<div v-else-if="num==5">
							<div class="redball_left">
								<span v-for="result_data in (sports_data.SFZC.result&&sports_data.SFZC.result.split(''))">{{result_data}}</span>
							</div>
						</div>	
						<div v-else-if="num==6">
							<div class="redball_left">
								<span v-for="result_data in (sports_data.SFZC.result&&sports_data.SFZC.result.split(''))">{{result_data}}</span>
							</div>
						</div>
					</div>
					
				</div>
				<div class="mainRight" @click="kuozhan()">
					<div><span>{{typeName[show][num]}}</span></div>
					<img src="../assets/lottery/kjjiao.png" alt="" :class="flag?'active_img':''">
				</div>
              </div>
			</div>

			<div class="mainTc" :class="flag?'':'active1'">
				<div class="box1">
				<button class="btn1" v-for="(item,index) in (typeName[show])" @click="zhonglei(index)" :class="index==num?'btn1_acitve':''">{{item}}</button>
				</div>
				<button class="btn2" @click="golottery()">查看更多开奖信息</button>
			</div>
		</div>
		<div class="box2" v-if="flag" @click="openClose()"></div>
		<div v-show="show==0" class="swiperbox">
			  <div class="swiper-containers">
				<div class="swiper-wrapper aui-slide-wrap">
					<div class="swiper-slide aui-slide-node">
						<img src="../assets/goucai/goucai_header.png" alt="暂无" class="imgHeader">
					</div>
					<div class="swiper-slide aui-slide-node">
						<img src="../assets/goucai/goucaibanner.png" alt="暂无" class="imgHeader">
					</div>
				</div>
			</div>
		</div>

		<div v-show="show==0" class="frame1_con" id="frame1_con1"  ref='frame1'>
			
			<ul>
				<li id="ssq1" @click="goToDetails('goucai_mc_ssq')">
					<img src="../assets/kaijiang.png" alt="" class="liImg" v-if="flags[0]">
					<div class="flr"><img src="../assets/lottery/ssq.png" /> </div>
					<div class="frg">
						<div>
							<img src="../assets/goucai/goucai_gou.png" alt="暂无" class="imgGou">
							<span>双色球</span>
						</div>
						<p class="p1">2元赢取1000万</p>
					</div>
				</li>
				<li id="dlt1" @click="goToDetails('goucai_mc_dlt')">
					<img src="../assets/kaijiang.png" alt="" class="liImg" v-if="flags[1]">
					<div class="flr"><img src="../assets/lottery/dlt.png" /> </div>
					<div class="frg">
						<div>
							<img src="../assets/goucai/goucai_gou.png" alt="暂无" class="imgGou">
							<span>大乐透</span>
						</div>	
						<p class="p1">2元赢取1600万</p>
					</div>
				</li>
				<li id="fc3d1" class="active" @click="goToDetails('goucai_mc_fcsd')">
					<img src="../assets/kaijiang.png" alt="" class="liImg">
					<div class="flr"><img src="../assets/lottery/fc3d.png" /></div>
					<div class="frg">
						<div>
							<!-- <img src="../assets/goucai/goucai_gou.png" alt="暂无" class="imgGou"> -->
							<span>福彩3D</span>
						</div>
						<p>每日21:15开奖</p>
					</div>
				<li id="pl31" class="active" @click="goToDetails('goucai_mc_pls')">
					<img src="../assets/kaijiang.png" alt="" class="liImg">
					<div class="flr"><img src="../assets/lottery/pl3.png" /> </div>
					<div class="frg">
						<div>
							<!-- <img src="../assets/goucai/goucai_gou.png" alt="暂无" class="imgGou"> -->
							<span>排列三</span>
						</div>
						<p>每日20:30开奖</p>
					</div>
				</li>
				<li id="pl51" class="active" @click="goToDetails('goucai_mc_plw')">
					<img src="../assets/kaijiang.png" alt="" class="liImg">
					<div class="flr"><img src="../assets/lottery/pl5.png" /> </div>
					<div class="frg">
						<div>
							<img src="../assets/goucai/goucai_gou.png" alt="暂无" class="imgGou">
							<span>排列五</span>
						</div>
						<p>每日20:30开奖</p>
					</div>
				</li>
				</li>
				<li id="seven" @click="goToDetails('goucai_mc_qlc')">
					<img src="../assets/kaijiang.png" alt="" class="liImg" v-if="flags[2]">
					<div class="flr"><img src="../assets/lottery/seven.png" /> </div>
					<div class="frg">
						<div>
							<img src="../assets/goucai/goucai_gou.png" alt="暂无" class="imgGou">
							<span>七乐彩</span>
						</div>
						<p class="p1">2元赢取500万</p>
					</div>
				</li>
			</ul>
		</div>
			<div v-show="show==1" class="swiperbox">
			  <img src="../assets/goucai/goucaibanner.png" alt="暂无" class="imgHeader">
		</div>
         	
		<div v-show="show==1" class="frame1_con" id="frame1_con2" ref='frame1'>
			
			<ul>
				<!-- <li id="bjklb" class="active" @click="goToDetails('goucai_gpc_bjk8')">
					<div class="flr"><img src="../assets/lottery/gc_1.png" /> </div>
					<div class="frg">
						<span>北京快乐八</span>
						<p>每二十分钟一期</p>
					</div>
				</li> -->
				<li id="bjk3" class="active" @click="goToDetails('goucai_gpc_bjks')">
					<img src="../assets/zuixin.png" alt="" class="liImg">
					<div class="flr"><img src="../assets/lottery/bjk3.png" /> </div>
					<div class="frg">
						<span>北京快三</span>
						<p>每二十分钟一期</p>
					</div>
				</li>
				<li id="sdel11to5" class="active" @click="goToDetails('goucai_gpc_sd11ydj')">
					<div class="flr"><img src="../assets/lottery/sdel11to5.png" /> </div>
					<div class="frg">
						<span>山东11运夺金</span>
						<p>每二十分钟一期</p>
					</div>
				</li>
				<li id="cqssc" class="active" @click="goToDetails('goucai_gpc_cqssc')">
					<div class="flr"><img src="../assets/lottery/cqssc.png" /> </div>
					<div class="frg">
						<span>重庆时时彩</span>
						<p>每二十分钟一期</p>
					</div>
				</li>
				<li id="xjssc" class="active" @click="goToDetails('goucai_gpc_xjssc')">
					<div class="flr"><img src="../assets/lottery/xjssc.png" /> </div>
					<div class="frg">
						<span>新疆时时彩</span>
						<p>每二十分钟一期</p>
					</div>
				</li>
				<li id="gdel11to5" class="active" @click="goToDetails('goucai_gpc_gd11x5')">
					<div class="flr"><img src="../assets/lottery/gdel11to5.png" /> </div>
					<div class="frg">
						<span>广东11选5</span>
						<p>每二十分钟一期</p>
					</div>
				</li>
				<li id="jxel11to5" class="active" @click="goToDetails('goucai_gpc_jx11x5')">
					<div class="flr"><img src="../assets/lottery/jxel11to5.png" /> </div>
					<div class="frg">
						<span>江西11选5</span>
						<p>每二十分钟一期</p>
					</div>
				</li>		
				<li id="ahk3" class="active" @click="goToDetails('goucai_gpc_ahks')">
					<div class="flr"><img src="../assets/lottery/ahk3.png" /> </div>
					<div class="frg">
						<span>安徽快三</span>
						<p>每二十分钟一期</p>
					</div>
				</li>
				<li id="jsk3" class="active" @click="goToDetails('goucai_gpc_jsks')">
					<div class="flr"><img src="../assets/lottery/jsk3.png" /> </div>
					<div class="frg">
						<span>江苏快三</span>
						<p>每二十分钟一期</p>
					</div>
				</li>
				<li id="hbk3" class="active" @click="goToDetails('goucai_gpc_hbks')">
					<div class="flr"><img src="../assets/lottery/hbk3.png" /> </div>
					<div class="frg">
						<span>湖北快三</span>
						<p>每二十分钟一期</p>
					</div>
				</li>
				<li id="gdkls" class="active" @click="goToDetails('goucai_gpc_gdkl10')">
					<div class="flr"><img src="../assets/lottery/gdkls.png" /> </div>
					<div class="frg">
						<span>广东快乐10分</span>
						<p>每二十分钟一期</p>
					</div>
				</li>
				<li id="tjkls" class="active" @click="goToDetails('goucai_gpc_tjkl10')">
					<div class="flr"><img src="../assets/lottery/tjkls.png" /> </div>
					<div class="frg">
						<span>天津快乐10分</span>
						<p>每二十分钟一期</p>
					</div>
				</li>

			</ul>
		</div>
   <div v-show="show==2" class="swiperbox">
	   <div class="swiper-container1">
	   	<div class="swiper-wrapper aui-slide-wrap">
	   		<div class="swiper-slide aui-slide-node">
	   			<img src="../assets/goucai/goucai_header1.png" alt="暂无" class="imgHeader">
	   		</div>
	   		<div class="swiper-slide aui-slide-node">
	   			<img src="../assets/goucai/goucaibanner.png" alt="暂无" class="imgHeader">
	   		</div>
	   	</div>
	   </div>
   </div>
		<div v-show="show==2" class="frame1_con" id="frame1_con3" ref='frame1'>
			
			<ul>
				<li id="jczq" @click="goToDetails('goucai_jjc_zq')">
					<div class="flr"><img src="../assets/lottery/jczq.png" /> </div>
					<div class="frg">
						<span>竞彩足球</span>
						<p>足球迷首选</p>
					</div>
				</li>
				<li id="jclq" @click="goToDetails('goucai_jjc_lq')">
					<div class="flr"><img src="../assets/lottery/jclq.png" /> </div>
					<div class="frg">
						<span>竞彩篮球</span>
						<p>覆盖NBA比赛</p>
					</div>
				</li>
				<li id="bjdc" @click="goToDetails('goucai_jjc_bjdc')">
					<div class="flr"><img src="../assets/lottery/bjdc.png" /> </div>
					<div class="frg">
						<span>北京单场</span>
						<p>猜中一场就有奖</p>
					</div>
				</li>
				<li id="sczc" @click="goToDetails('goucai_jjc_sc','3')">
					<div class="flr"><img src="../assets/lottery/sczc.png" /> </div>
					<div class="frg">
						<div>
							<!-- <img src="../assets/goucai/goucai_gou.png" alt="暂无" class="imgGou"> -->
							<span>四场进球</span>
						</div>
						<p>最高奖金500万</p>
					</div>
				</li>
				
				<li id="lcbqc" @click="goToDetails('goucai_jjc_sc','0')">
					<div class="flr"><img src="../assets/lottery/lcbqc.png" /> </div>
					<div class="frg">
						<div>
							<!-- <img src="../assets/goucai/goucai_gou.png" alt="暂无" class="imgGou"> -->
							<span>六场半全场</span>
						</div>
						<p>最高奖金500万</p>
					</div>
				</li>
				<li id="rxjc" @click="goToDetails('goucai_jjc_sc','1')">
					<div class="flr"><img src="../assets/lottery/rxjc.png" /> </div>
					<div class="frg">
						<div>
							<img src="../assets/goucai/goucai_gou.png" alt="暂无" class="imgGou">
							<span>任选九场</span>
						</div>
						<p>最高奖金500万</p>
					</div>
				</li>
				<li id="sfc" @click="goToDetails('goucai_jjc_sc','2')">
					<div class="flr"><img src="../assets/lottery/sfzc.png" /> </div>
					<div class="frg">
						<div>
							<!-- <img src="../assets/goucai/goucai_gou.png" alt="暂无" class="imgGou"> -->
							<span>胜负彩</span>
						</div>
						<p>最高奖金500万</p>
					</div>
				</li>
			</ul>
		</div>
		<!-- 弹窗 -->
<!-- 		<div class="coinstc" v-if="dygoucai&&oneth<2">
			<div class="coinstc_text" v-if="oneth=='0'">
				<div class="coinstc_h3">
					<img src="../assets/goucaitc4.png" @click="dygoucaiclic()" />
				</div>
			</div>
			<div class="coinstc_text coinstc_text_tow" v-if="oneth=='1'">
				<div class="coinstc_h3">
					<img src="../assets/goucaitc4.png" @click="dygoucaiclic()" />

				</div>
			</div>
		</div> -->
		<footer class="pos-fi b-0 w-100  footers">
			<ul class="flex-box w-100">
				<li class="foot_li w-20" @click='gohome'>
					<div class="w-100 imgBox"><img src="../assets/backIcon01_c.png" /></div>
					<div class="w-100"><span class="w-100 tac dis-bl fs-10 text_span">首页</span></div>
				</li>
				<li class="foot_li w-20 active" @click='gogoucai'>
					<div class="w-100 imgBox"><img src="../assets/backIcon02_c.png" /></div>
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
		<!-- <mt-tabbar >
  <mt-tab-item id="tab1" @click.native=gohome>
    <img slot="icon" src="../assets/backIcon01_c.png">
    首页
  </mt-tab-item>
  <mt-tab-item id="tab2" class='active' @click.native=gogoucai>
    <img slot="icon" src="../assets/backIcon02_c.png">
    购彩
  </mt-tab-item>
  <mt-tab-item id="tab3" @click.native=golottery>
    <img slot="icon" src="../assets/backIcon03.png">
    开奖
  </mt-tab-item>
  <mt-tab-item id="tab4" @click.native=gotask>
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
	import Swiper from 'swiper';
	import {
		getSession,
		setSession,
		getCookie,
		setCookie,
		maintenance
	} from '../js/common.js';
	import {
		Toast
	} from 'mint-ui';
	export default {
		data() {
			return {
				show: 0,
				tabItemList: [{
					status: true,
					cont: "慢彩"
				}, {
					status: false,
					cont: "高频彩"
				}, {
					status: false,
					cont: "竞技彩"
				}, ],
				typeName: [
					['双色球', '大乐透', '福彩3D', '排列3', '排列5', '七乐彩'],
					['山东11运夺金', '重庆时时彩', '新疆时时彩', '广东11选5', '江西11选5', '安徽快三', '江苏快三','湖北快三','北京快三','广东快乐10分', '天津快乐10分'],
					['竞彩足球', '竞彩篮球', '北京单场', '四场进球', '六场半全场', '任选九场', '胜负彩']
				],
				dygoucai: false,
				oneth: 0,
				num:0,
				num1:0,
				num2:6,
				num3:0,
				flag:false,
				   math_data:[
            {
                    		endedTime :'',
                    		lotteryType :"BJKLB ",
                    		periodNumber :"935190 ",
                    		prizeTime :'',
                    		result :""},
                      {
                    		endedTime :'',
                    		lotteryType :"CQSSC ",
                        periodNumber:"20190404038 ",
                    		prizeTime :'',
                    		result :""},
                        {
                    		endedTime :'',
                    		lotteryType :"XJSSC ",
                        periodNumber :"2019040420 ",
                        prizeTime :'',
                        result :""},
                      {
                    		endedTime :'',
                    		lotteryType :"JXEL11TO5 ",
                    		periodNumber :"2019040423 ",
                    		prizeTime :'',
                    		result :""},
                      {
                    		endedTime :'',
                    		lotteryType :"TJKLSF ",
                    		periodNumber :"20190404024 ",
                    		prizeTime :'',
                    		result :""},
                      {
                    		endedTime :'',
                    		lotteryType :"GDKLSF ",
                    		periodNumber :"2019040423 ",
                    		prizeTime :'',
                    		result :""},
                      {
                    		endedTime :'',
                    		lotteryType :"GDEL11TO5 ",
                    		periodNumber :"2019040423 ",
                    		prizeTime :'',
                    		result :""},
                      {
                    		endedTime :'',
                    		lotteryType :"SDEL11TO5 ",
                    		periodNumber :"19040424 ",
                    		prizeTime :'',
                    		result :""},
                      {
                    		endedTime :'',
                    		lotteryType :"JSK3 ",
                    		periodNumber :"20190404025 ",
                    		prizeTime :'',
                    		result :" "},
                      {
                    		endedTime :'',
                    		lotteryType :"AHK3 ",
                    		periodNumber :"20190404024 ",
                    		prizeTime :'',
                    		result :""},
                        {
                    		endedTime :'',
                    		lotteryType :"HBK3 ",
                    		periodNumber :"20190404023 ",
                    		prizeTime:'',
                    		result:""}
          ],
    				heighter_data: [
              {},{},{},{},{},{},{endedTime: '',
                                                lotteryType: "SDEL11TO5",
                                                periodNumber: "19040424",
                                                prizeTime: '',
                                                result: ""}
                                              ],
    				sports_data: {
              	"DCZC": {
                        		"gameName": "墨西哥杯",
                        		"guestTeamName": "",
                        		"halfScore": "",
                        		"handicap": 0,
                        		"homeTeamName": "",
                        		"lineId": 283,
                        		"matchTime": 1548817200000,
                        		"result": "让球负",
                        		"resultSP": "5.1",
                        		"score": "1:2"
                        	},
                        	"JCLQ": {
                        		"gameName": "NBA",
                        		"guestTeamName": "",
                        		"homeTeamName": "",
                        		"lineId": 301,
                        		"matchDate": 20190403,
                        		"matchTime": 1554334200000,
                        		"result": "客胜,让客胜,客胜6-10,小,客胜",
                        		"resultSP": "1.59,1.7,4.2,1.7,",
                        		"score": "115:105",
                        		"singleHandicap": ''
                        	},
                        	"JCZQ": {
                        		"gameName": "德国杯",
                        		"guestTeamName": "",
                        		"halfScore": "",
                        		"handicap": -1,
                        		"homeTeamName": "",
                        		"lineId": 2,
                        		"matchDate": 20190402,
                        		"matchTime": 1554222600000,
                        		"result": "负,让球负,0:2,平负,2球",
                        		"resultSP": "2.52,1.45,14.0,5.7,3.55",
                        		"score": ""
                        	},
                        	"LCZC": {
                            endPrizeTime: 1559617200000,
                            endedTime: 1554217200000,
                            lotteryType: "LCZC",
                            periodId: 1759,
                            periodNumber: "19048",
                            prizeEndDate: 1559491200000,
                            prizePool: "140830",
                            prizeTime: 1554346800000,
                            result: ""
                          },
                        	"SCZC": {
                            endPrizeTime: 1559617200000,
                            endedTime: 1554217200000,
                            lotteryType: "SCZC",
                            periodId: 1760,
                            periodNumber: "19050",
                            prizeEndDate: 1559491200000,
                            prizePool: "0",
                            prizeTime: 1554346800000,
                            result: ""
                          },
                        	"SFZC": {
                            endPrizeTime: 1559617200000,
                            endedTime: 1554217200000,
                            lotteryType: "SFZC",
                            periodId: 1758,
                            periodNumber: "19045",
                            prizeEndDate: 1559491200000,
                            prizePool: "14220909",
                            prizeTime: 1554346800000,
                            result: ""
                          }
                        },
				data:['JCZQ','JCLQ','DCZC','SCZC','LCZC','SFZC'],
				data1:["SDEL11TO5","CQSSC","XJSSC","GDEL11TO5","JXEL11TO5","AHK3","JSK3","HBK3","BJK3","GDKLSF","TJKLSF"],
				flags:[false,false,false]

			}
		},
		created() {
			this.getTime()
			maintenance(this); //维护页面
			if (getSession('lotteryBigClassify')) {
				this.show = getSession('lotteryBigClassify');
				for (var i = 0; i < this.tabItemList.length; i++) {
					this.tabItemList[i].status = false;
				}
				this.tabItemList[this.show].status = true;
			}
			sessionStorage.removeItem('play');
			sessionStorage.removeItem('shaixuan');
			sessionStorage.removeItem('playTypeName');
			sessionStorage.removeItem('name');
			sessionStorage.removeItem('arr');
			sessionStorage.removeItem('parr');
			var neotex = localStorage.getItem("neotex");
			if(getSession('sports_data')){
				this.sports_data=getSession('sports_data');
			}
			else {
				this.requestSports();//请求竞技彩数据
			}
		
			if(getSession('math_data')){
				this.math_data=getSession('math_data');
			}
			else{
				this.requestMath();//请求数字彩数据
			
			}		
			if(getSession('heighter_data')){
				this.heighter_data=getSession('heighter_data');
				if(this.heighter_data[0].lotteryType=='BJKLB'){
				this.heighter_data.splice(0,1)
				}
			}
			else{
				this.requestHeighter();//请求高频彩数据
			
			}
			
			
			// localStorage.removeItem("neotex");
			console.log(JSON.parse(neotex))
			neotex = JSON.parse(neotex);
			let uid = getCookie('newData');
			if (uid) {
				if (neotex) {
					var d = new Date();
					if (neotex[0].d != d.getDate() && neotex[1].y == (d.getMonth() + 1)) {
						// this.getUserFirstOrSecondBetCount();
					}
				} else {
					// this.getUserFirstOrSecondBetCount();
				}
			}


		},
		mounted() {
			
				this.bannerone();
				this.bannertwo();
			
			
		},
		methods: {
			bannerone:function(){
				let mySwiperd = new Swiper('.swiper-containers', {
					loop: true,
					width: window.innerWidth,
					autoplay: {
						delay: 3000,
						stopOnLastSlide: false,
						disableOnInteraction: false,
					},
				  autoplayDisableOnInteraction: false,
				  observer: true, //修改swiper自己或子元素时，自动初始化swiper
				  observeParents: true, //修改swiper的父元素时，自动初始化swiper
				});
			},
			bannertwo:function(){
				let mySwiper1s = new Swiper('.swiper-container1', {
					loop: true,
					width: window.innerWidth,
					autoplay: {
						delay: 3000,
						stopOnLastSlide: false,
						disableOnInteraction: false,
					},
				  autoplayDisableOnInteraction: false,
				  observer: true, //修改swiper自己或子元素时，自动初始化swiper
				  observeParents: true, //修改swiper的父元素时，自动初始化swiper
				});
			},
			dygoucaiclic: function() {
				if (this.dygoucai) {
					this.dygoucai = false;
				} else {
					this.dygoucai = true;
				}
				var d = new Date();
				var data = [];
				data = [{
					d: d.getDate()
				}, {
					y: d.getMonth() + 1
				}];

				data = JSON.stringify(data);
				localStorage.setItem("neotex", data);
			},
			sum: function(result) { //求和
				var results = result.split(',').map(Number);
				var sums = 0;
				for (var i = 0; i < results.length; i++) {
					sums += results[i];
				}
				return sums;
			},
			kuozhan:function(){//控制收缩
				this.flag=!this.flag
				
			},
			getTime :function() {
				let time = new Date();
				console.log(time)
				let dd = time.getDay();
				switch (dd) {
					case 0:
						dd = "日";
						this.flags[0]=true;
						break;
					case 1:
						dd = "一";
						this.flags[1]=true;
						this.flags[2]=true;
						break;
					case 2:
						dd = "二";
						this.flags[0]=true;
						break;
					case 3:
						dd = "三";
						this.flags[1]=true;
						this.flags[2]=true;
						break;
					case 4:
						dd = "四";
						this.flags[0]=true;
						break;
					case 5:
						dd = "五";
						this.flags[2]=true;
						break;
					case 6:
						dd = "六";
						this.flags[1]=true;
						break;
				}
				console.log(dd)
			},
			zhonglei:function(i){//点击切换种类
				this.num=i
				var thas=this
				console.log(this.num)
				console.log(this.data1[this.num])

				if(this.show==0){
					this.math_data.map(function(item,index){
						if(item.lotteryName==thas.typeName[thas.show][thas.num]){
							thas.num1=index
						}
						// console.log(thas.num1)
					})
				}
				else if (this.show==1){
					this.heighter_data.map(function(item,index){
						if(item.lotteryType==thas.data1[thas.num]){
							thas.num2=index
						}
						console.log(thas.num2)
					})
				}
				else if(this.show==2){
					this.num3=i
				}
			
			},
			openClose:function(){
				this.flag=!this.flag
			},
			gouser: function() {
				if (this.$router.name !== 'user') {
					this.$router.push({
						name: 'user'
					})
					sessionStorage.removeItem('lotteryBigClassify');
					sessionStorage.removeItem('sports_data');
					sessionStorage.removeItem('math_data');
					sessionStorage.removeItem('heighter_data');
				}
			},
			gohome: function() {
				if (this.$router.name !== 'home') {
					this.$router.push({
						name: 'home'
					})
					sessionStorage.removeItem('lotteryBigClassify');
					sessionStorage.removeItem('sports_data');
					sessionStorage.removeItem('math_data');
					sessionStorage.removeItem('heighter_data');
				}
			},
			gogoucai: function() {
				if (this.$router.name !== 'goucai') {
					this.$router.push({
						name: 'goucai'
					})
				}
			},
			golottery: function() {
				if (this.$router.name !== 'lottery') {
					this.$router.push({
						name: 'lottery'
					})
					sessionStorage.removeItem('lotteryBigClassify');
				}
			},
			goscratch: function() {
				if (this.$router.name !== 'scratch') {
					this.$router.push({
						name: 'scratch'
					})
					sessionStorage.removeItem('sports_data');
					sessionStorage.removeItem('math_data');
					sessionStorage.removeItem('heighter_data');
				}
			},
			gotask: function() {
				if (this.$router.name !== 'task') {
					this.$router.push({
						name: 'task'
					})
					sessionStorage.removeItem('lotteryBigClassify');
					sessionStorage.removeItem('sports_data');
					sessionStorage.removeItem('math_data');
					sessionStorage.removeItem('heighter_data');
				}
			},
			changeTab: function(e, index) {
			
				var obj = e.currentTarget;
				if (this.tabItemList[index].status) {
					return false;
				} else {
					var frame1=this.$refs.frame1
					console.log(frame1.scrollTop)
					frame1.scrollTo(100,100)
					for (var i = 0; i < this.tabItemList.length; i++) {
						this.tabItemList[i].status = false;
					}
					this.tabItemList[index].status = true;
					this.show = index;
					if(this.show){
						this.num2=6
					}
					this.num=0
					this.num1=0
					setSession('lotteryBigClassify', index);
				}
			},
			goToDetails: function(name, patyInd) {
				console.log(patyInd)
				if (patyInd) {
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
			getUserFirstOrSecondBetCount: function() {
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
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});

				this.$ajax.post('/caipiaoshouye/index.php/home/index/getUserFirstOrSecondBetCount',
						datas
					)
					.then(res => {

						var content = JSON.parse(res.data.content);
						console.log(JSON.stringify(content));
						if (res.data.status != "200") {

							return;
						} else {
							if (content.code == "100000") {
								this.oneth = content.data.firstOrSecondBetCount;
								if (this.oneth < 2) {
									this.dygoucai = true;
								}

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
							setSession('math_data',data.data);
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
							if(this.heighter_data[0].lotteryType=='BJKLB'){
							this.heighter_data.splice(0,1)
							}
							setSession('heighter_data',this.heighter_data);
							console.log(this.heighter_data)
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
							setSession('sports_data',data.data);
							console.log(this.sports_data)
						}
					})
					.catch(err => {
						console.log(err);
					})
			},

		}
	}
</script>
<style scoped>
	@import "../css/goucai.css";
  .swiper-containers{
	  /* width: 100%; */
	  height: 3.5rem;
  }
  .swiper-container1{
  	  /* width: 100%; */
  	  height: 3.5rem;
  }
	header {
		background: white;
		color: #333333;
		display: block;
		z-index: 1002;
	}
    footer .footers {
		z-index: 100;
	}
	a {
		color: #000;
	}
     
	[v-clock] {
		display: none;
	} 
	.aui-active {
		background: #03A9F4;
		color: #fff;
	}

	.active {
		color: #5fa3eb;
	}

	.coinstc {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2000;
		background: rgba(0, 0, 0, .7);
		background-image: url(../assets/goucaitc1.png);
		background-repeat: no-repeat;
		background-position: center 20%;
		background-size: 100% 10rem;

	}

	.coinstc>p {
		width: 100%;
		height: 1.5rem;
		margin-top: 8.5rem;
		background-image: url(../assets/topdatecoent10.png);
		background-repeat: no-repeat;
		background-position: 15rem 50%;
		background-size: 1.5rem 100%;
	}

	.coinstc_text {
		width: 100%;
		height: 17rem;
		margin: auto;
		margin-top: 9.6rem;
		background-image: url(../assets/goucaitc2.png);
		background-repeat: no-repeat;
		background-position: 50% 50%;
		background-size: 70% 100%;
		padding-top: 14.5rem;
	}

	.coinstc_text_tow {
		background-image: url(../assets/goucaitc3.png);
	}

	.coinstc_h3 img {
		width: 8rem;
		height: 100%;
		margin: auto;
	}

	.coinstc_h3 {
		width: 100%;
		height: 1.6rem;
	}

	.kaijiang img {
		width: 60%;
		position: relative;
		left: 2.3rem;
	}
	
	.box1 .btn1_acitve {
		background: #FA2C5D;
	color: #FFFFFF;
	}
	
	.frame1_con li:active {
		background:#F6F6F6
	}
	
	.frame1_con ul li .liImg {
		width: 1.075rem;
		height: 1.2rem;
		position: absolute;
		top: 0;
		right: 0;
	}
	.imgHeader{
		height: 3.5rem;
		width: 100vw;
	}
</style>
