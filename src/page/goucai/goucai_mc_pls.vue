<template>
	<div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" tapmode @click="closeWin()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div>
				<div class="aui-title" @click="ChoiceType()" tapmode><span>排列三</span> <span id="pagetitle"> {{pypename}}</span>
					<img src="../../assets/goucai/jjc/xiajiantou.png" /></div>
			</div>
			<div class="aui-pull-right aui-btn top-more" @click="menuPage()" tapmode>
				<span></span><span></span><span></span>
			</div>
		</header>
		<div id="mc_pls">

			<!-- 购彩类型 -->
			<div class="nav-Tab" @click="hideChoice()" v-if='navTab'>
				<div class="list">
					<li v-for='(item,index) in styleList' :class="{ select: index == redDallIdx }" @click="setChoice(item.limitNumber,item.name,index)"
					 tapmode>{{ item.name }}</li>
				</div>
			</div>
			<!-- 菜单 -->
			<div class="topMenu" @click='hidemoc()' v-if="topMenu">
				<ul>
					<li @click='toyilou()'>遗漏投注</li>
					<li @click='fenx()'>分享</li>
					<li @click='toHeMai()'>合买</li>
					<li @click='toPlay("pl3")'>玩法</li>
				</ul>
			</div>
			<!-- 分享模态框 -->
			<div v-if="shareStatue" class="share_box" @click="hideShare()">
				<div class="share_cont">
					<div class="quxiao">取消</div>
					<div class="down" onclick="openDownload()">前往下载</div>
				</div>
			</div>
			<div class="mc_content">
				<!-- 顶部期数 -->
				<div v-if='title==true' class="top_mc">
					<div class="flr">第{{periodNumber}}期</div>
					<div class="fgr">投注剩余时间:<span>{{surTimehours}}</span>时<span>{{surTimeminutes}}</span>分<span>{{surTimeseconds}}</span>秒</div>
					<span class="icon_down"></span>
					<!-- icon_down :class="[ishide[index]?'icon_up':'icon_down']"-->
				</div>
				<div v-else class="top_mc">
					<div class="flr">当前期已截止</div>
					<span class="icon_down"></span>
					<!-- icon_down :class="[ishide[index]?'icon_up':'icon_down']"-->
				</div>
				<!-- 往期开奖 -->
				<div class="last_ten" style="display: block;">
					<table>
						<tbody>
							<tr v-for="item in HistoryDraws">
								<td>第{{ item.periodNumber }}期<span></span></td>
								<td><span v-for="thal in item.result">{{ thal }}</span><span></span></td>
							</tr>
						</tbody>
					</table>
				</div>
				<!-- 直选内容 -->
				<div v-if="redDallIdx == 0" class="mc_cont mc_cont2">
					<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
					<div class="yaoyiyao" tapmode @click="Random()">
						<p>摇一摇机选</p>
					</div>
					<div class="jieshao">{{ styleList[0].text }}</div>
					<div class="baiwei">
						<div class="titl">
							<div>请至少选1个号码</div>
						</div>
						<div class="battle battle_red">
							<div class="battle_icon flr">百位<div class="right_arror"></div>
							</div>
							<div class="battle_shuz flr">
								<ul>
									<template v-for="(item,index) in baiWeiList">
										<li :class="{ 'active': item.state }" tapmode @click="setbaiWeiList(index)"><span class="sp1">{{ item.id }}</span><span
											 class="sp2" v-if="yilou">{{oneyilouData[index] }}</span></li>
									</template>
									<li style="border: 0;"></li>
									<li style="border: 0;"></li>
								</ul>
							</div>
						</div>
					</div>
					<div class="shiwei">
						<div class="titl">
							<div>请至少选1个号码</div>
						</div>
						<div class="battle battle_red">
							<div class="battle_icon flr">十位<div class="right_arror"></div>
							</div>
							<div class="battle_shuz flr">
								<ul>
									<template v-for="(item,index) in shiWeiList">
										<li :class="{ 'active': item.state }" tapmode @click="setshiWeiList(index)"><span class="sp1">{{ item.id }}</span><span
											 class="sp2" v-if="yilou">{{ twoyilouData[index] }}</span></li>
									</template>
									<li style="border: 0;"></li>
									<li style="border: 0;"></li>
								</ul>
							</div>
						</div>
					</div>
					<div class="gewei">
						<div class="titl">
							<div>请至少选1个号码</div>
						</div>
						<div class="battle battle_red">
							<div class="battle_icon flr">个位<div class="right_arror"></div>
							</div>
							<div class="battle_shuz flr">
								<ul>
									<template v-for="(item,index) in geWeiList">
										<li :class="{ 'active': item.state }" tapmode @click="setgeWeiList(index)"><span class="sp1">{{ item.id }}</span><span
											 class="sp2" v-if="yilou">{{ threeyilouData[index] }}</span></li>
									</template>
									<li style="border: 0;"></li>
									<li style="border: 0;"></li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<!-- 和值内容 -->
				<div v-else-if="redDallIdx == 1" class="mc_cont mc_cont2">
					<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
					<div class="jieshao">{{ styleList[1].text }}</div>
					<div>
						<div class="battle battle_red">
							<div class="battle_icon flr">和值<div class="right_arror"></div>
							</div>
							<div class="battle_shuz flr">
								<ul>
									<template v-for="(item,index) in heZhiList">
										<li :class="{ 'active': item.state }" tapmode @click="setheZhiList(index)"><span class="sp1">{{ item.id }}</span><span
											 class="sp2" v-if="yilou">{{ hezhiyilouData[index] }}</span></li>
									</template>
									<li style="border: 0;"></li>
									<li style="border: 0;"></li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<!-- 组三内容 -->
				<div v-else-if="redDallIdx == 2" class="mc_cont mc_cont2">
					<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
					<div class="yaoyiyao" tapmode @click="RandomZuSan()">
						<p>摇一摇机选</p>
					</div>
					<div class="jieshao">{{ styleList[2].text }}</div>
					<div class="baiwei">
						<div class="battle battle_red">
							<div class="battle_icon flr">选号<div class="right_arror"></div>
							</div>
							<div class="battle_shuz flr">
								<ul>
									<template v-for="(item,index) in zuSanList">
										<li :class="{ 'active': item.state }" tapmode @click="setzuSanList(index)"><span class="sp1">{{ item.id }}</span><span
											 class="sp2" v-if="yilou">{{ zuxuanyilouData[index] }}</span></li>
									</template>
									<li style="border: 0;"></li>
									<li style="border: 0;"></li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<!-- 组六内容 -->
				<div v-else-if="redDallIdx == 3" class="mc_cont mc_cont2 last_cont">
					<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
					<div class="yaoyiyao" tapmode @click="RandomZuLiu()">
						<p>摇一摇机选</p>
					</div>
					<div class="jieshao">{{ styleList[3].text }}</div>
					<div class="baiwei">
						<div class="battle battle_red">
							<div class="battle_icon flr">选号<div class="right_arror"></div>
							</div>
							<div class="battle_shuz flr">
								<ul>
									<template v-for="(item,index) in zuLiuList">
										<li :class="{ 'active': item.state }" tapmode @click="setzuLiuList(index)"><span class="sp1">{{ item.id }}</span><span
											 class="sp2" v-if="yilou">{{ zuxuanyilouData[index] }}</span></li>
									</template>
									<li style="border: 0;"></li>
									<li style="border: 0;"></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 未实名弹窗 -->
			<!-- <div id="sdApp" v-show="logok">
            	<div id="logok" v-show="logok">
            		<div class="renzcont">
            			<div>
            				<img src="../../assets/Group14@2x.png" alt="">
                            <p class="text">实名认证</p>
            				<div class="title2">为了您的账户安全，请帐户实名认证</div>
            				<div class="content">实名认证后，可有效保护账号的资金安全</div>
                            <p class="renz_text">认证即可获得6.88元现金</p>
            				<div class="logokbtn">
            					<p id="logokbtn1" @click="logokbtn1()">立即认证</p>
            				</div>
            			</div>
            		</div>
                    <div class="qux_btn" @click="logokbtn2()"><img src="../../assets/quxiao.png" alt=""></div>
            	</div>
            </div> -->
			<!--<checkok-nav :logokz='logok' @showbox="showbox"></checkok-nav>-->
			<!-- 未实名弹窗end -->
			<!-- <footer>
				<div class="ft_money flr">共<span>{{totalNum}}</span>注<span>{{totalPrice}}</span>元</div>
				<div class="ft_btn fgr">
					<div class="flr" tapmode @click="setClearList()">清除</div>
					<div class="flr" @click="pay()">投注<span v-if="betConlength > 0" class="pay_b">{{ betConlength > 99?"99":betConlength }}</span></div>
				</div>
			</footer> -->
			<footer>
				<div class="ft_money flr">
					<p>合计金额：<span>¥{{totalPrice|numberFormat}}</span></p>
					<p>共<span>{{totalNum}}</span>注</p>
				</div>
				<div class="ft_btn fgr">
					<div class="flr" tapmode @click="setClearList()">
						<img src="../../assets/goucai/jjc/closelj.png" />
						<span>清除</span>
					</div>
					<div class="flr" tapmode @click="pay()">投注<span v-if="betConlength > 0" class="pay_b">{{ betConlength > 99?"99":betConlength }}</span></div>
				</div>
			</footer>
		</div>
	</div>
</template>

<script>
	import checkokNav from '../../common/checkok.vue';
	var interval;
	var scrollTops;
	var allyilouData;
	var operationType;
	const SHAKE_SPEED = 300;
	let lastTime = 0; //上次变化的时间
	let x = 0,
		y = 0,
		z = 0,
		lastX = 0,
		lastY = 0,
		lastZ = 0; //位置变量初始化
	import {
		getSession,
		setSession,
		getCookie,
		getTime,
		getfactorial,
		compare,
		OverallData,
		openDownload,
		numberFormat
	} from '../../js/common.js';
	import {
		Toast
	} from 'mint-ui';
	var EventUtil = {
		addHandler: function(element, type, handler) {
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else if (element.attachEvent) {
				element.attachEvent("on" + type, handler);
			} else {
				element["on" + type] = handler;
			}
		},
		listenTouchDirection: function(target) {
			this.addHandler(target, "touchstart", handleTouchEvent);
			this.addHandler(target, "touchend", handleTouchEvent);
			var startY;
			var scrollTops;

			function handleTouchEvent(event) {
				var lastTen = document.querySelector(".last_ten");
				var gpc_hbks = document.querySelector("#mc_pls");
				switch (event.type) {
					case "touchstart":
						startY = event.touches[0].pageY;
						scrollTops = gpc_hbks.scrollTop;
						break;
					case "touchend":
						var spanY = event.changedTouches[0].pageY - startY;
						if (spanY > 50 && scrollTops < 3) {
							var heig = document.documentElement.clientHeight - document.getElementsByTagName("header")[0].offsetHeight
							lastTen.style.height = "16rem";
							gpc_hbks.style.overflow = "hidden";
							gpc_hbks.style.height = heig + "px";
							xiedajian(0);
						} else if (spanY < -50) {
							lastTen.style.height = "0";
							gpc_hbks.removeAttribute("style");
							xiedajian(1);
						}
						break;
				}
			}
		}
	};
	export default {
		components: {
			checkokNav
		},
		data() {
			return {
				logok: false, //未实名标志
				bgzhuanhuan: false, //箭头控制
				shareStatue: false, //分享状态
				nowTime: 0, //开始时间
				EndTime: 0, //结束时间
				periodNumber: 0, //期数
				totalNum: 0, //注数
				totalPrice: 0, //金额
				title: true, //当前期是否截止
				zxDom: true,
				hzDom: false,
				zsDom: false,
				zlDom: false,
				surTimedays: 0,
				surTimehours: 0,
				surTimeminutes: 0,
				surTimeseconds: 0,
				yilou: false,
				ccarray: [],
				bnums: 0, //百位球个数
				snums: 0, //十位球个数
				gnums: 0, //个位球个数
				hnums: 0, //和值球个数
				tnums: 0, //组三球个数
				lnums: 0, //组六球个数
				baiweiarr: [], //百位数组
				shiweiarr: [], //十位数组
				geweiarr: [], //个位数组
				heZhiarr: [], //和值数组
				zuSanarr: [], //组三数组
				zuLiuarr: [], //组六数组
				sumNum: 0, //和值累计
				oneyilouData: [], //百位遗漏
				twoyilouData: [], //十位遗漏
				threeyilouData: [], //个位遗漏
				zuxuanyilouData: [], //组选
				hezhiyilouData: [], //和值
				addlist: '', //继续选号回来的存数组
				addset: '', //继续选号回来的继续编辑数组
				betConlength: 0,
				HistoryDraws: [],
				baiWeiList: [{
						'id': 0,
						'state': false
					}, {
						'id': 1,
						'state': false
					}, {
						'id': 2,
						'state': false
					}, {
						'id': 3,
						'state': false
					}, {
						'id': 4,
						'state': false
					}, {
						'id': 5,
						'state': false
					},
					{
						'id': 6,
						'state': false
					}, {
						'id': 7,
						'state': false
					}, {
						'id': 8,
						'state': false
					}, {
						'id': 9,
						'state': false
					}
				],
				shiWeiList: [{
						'id': 0,
						'state': false
					}, {
						'id': 1,
						'state': false
					}, {
						'id': 2,
						'state': false
					}, {
						'id': 3,
						'state': false
					}, {
						'id': 4,
						'state': false
					}, {
						'id': 5,
						'state': false
					},
					{
						'id': 6,
						'state': false
					}, {
						'id': 7,
						'state': false
					}, {
						'id': 8,
						'state': false
					}, {
						'id': 9,
						'state': false
					}
				],
				geWeiList: [{
						'id': 0,
						'state': false
					}, {
						'id': 1,
						'state': false
					}, {
						'id': 2,
						'state': false
					}, {
						'id': 3,
						'state': false
					}, {
						'id': 4,
						'state': false
					}, {
						'id': 5,
						'state': false
					},
					{
						'id': 6,
						'state': false
					}, {
						'id': 7,
						'state': false
					}, {
						'id': 8,
						'state': false
					}, {
						'id': 9,
						'state': false
					}
				],
				heZhiList: [{
						'id': 0,
						'state': false
					}, {
						'id': 1,
						'state': false
					}, {
						'id': 2,
						'state': false
					}, {
						'id': 3,
						'state': false
					}, {
						'id': 4,
						'state': false
					}, {
						'id': 5,
						'state': false
					},
					{
						'id': 6,
						'state': false
					}, {
						'id': 7,
						'state': false
					}, {
						'id': 8,
						'state': false
					}, {
						'id': 9,
						'state': false
					}, {
						'id': 10,
						'state': false
					}, {
						'id': 11,
						'state': false
					},
					{
						'id': 12,
						'state': false
					}, {
						'id': 13,
						'state': false
					}, {
						'id': 14,
						'state': false
					}, {
						'id': 15,
						'state': false
					}, {
						'id': 16,
						'state': false
					}, {
						'id': 17,
						'state': false
					},
					{
						'id': 18,
						'state': false
					}, {
						'id': 19,
						'state': false
					}, {
						'id': 20,
						'state': false
					}, {
						'id': 21,
						'state': false
					}, {
						'id': 22,
						'state': false
					}, {
						'id': 23,
						'state': false
					},
					{
						'id': 24,
						'state': false
					}, {
						'id': 25,
						'state': false
					}, {
						'id': 26,
						'state': false
					}, {
						'id': 27,
						'state': false
					}
				],
				zuSanList: [{
						'id': 0,
						'state': false
					}, {
						'id': 1,
						'state': false
					}, {
						'id': 2,
						'state': false
					}, {
						'id': 3,
						'state': false
					}, {
						'id': 4,
						'state': false
					}, {
						'id': 5,
						'state': false
					},
					{
						'id': 6,
						'state': false
					}, {
						'id': 7,
						'state': false
					}, {
						'id': 8,
						'state': false
					}, {
						'id': 9,
						'state': false
					}
				],
				zuLiuList: [{
						'id': 0,
						'state': false
					}, {
						'id': 1,
						'state': false
					}, {
						'id': 2,
						'state': false
					}, {
						'id': 3,
						'state': false
					}, {
						'id': 4,
						'state': false
					}, {
						'id': 5,
						'state': false
					},
					{
						'id': 6,
						'state': false
					}, {
						'id': 7,
						'state': false
					}, {
						'id': 8,
						'state': false
					}, {
						'id': 9,
						'state': false
					}
				],
				styleList: [{
					'name': '直选',
					'limitNumber': 0,
					'playType': 'randomTwo',
					'AmoMoney': '1040',
					'type': 'normal',
					'text': '按位猜对开奖号码即中1040元'
				}, {
					'name': '和值',
					'limitNumber': 0,
					'playType': 'randomThree',
					'AmoMoney': '1040',
					'type': 'normal',
					'text': '请至少选择一个号码，所选和值与开奖号码和值一致即中1040元'
				}, {
					'name': '组三',
					'limitNumber': 0,
					'playType': 'randomFour',
					'AmoMoney': '78',
					'type': 'normal',
					'text': '请至少选择2个号码，猜对开奖号(顺序不限)即中346元'
				}, {
					'name': '组六',
					'limitNumber': 0,
					'playType': 'randomFour',
					'AmoMoney': '173',
					'type': 'normal',
					'text': '请至少选择3个号码，猜对开奖号(顺序不限)即中173元'
				}],
				redDallIdx: 0,
				pypename: '直选',
				navTab: false,
				topMenu: false,
			};
		},
		created() {
			if (getCookie('logok')) { //判断是否实名
				this.logok = true;
			}
			if (getSession('play')) {
				this.redDallIdx = getSession('play');
				this.pypename = getSession('name');
			} else {
				setSession('play', "0");
				setSession('name', "直选");
			};
			this.setTime();
			this.getMiss();
			this.getHistoryDraws();
			if (getSession('arr')) {
				if (getSession('continue') == 'continue') {
					if (getSession('arr').data.length > 0) {
						operationType = 1; //2编辑当前注 1继续选号
					}
					this.continueFun();
				} else if (getSession('continue') == 'compile') {
					operationType = 2; //2编辑当前注 1继续选号
					this.compileFun();
				}
			}
		},
		mounted() {
			if (window.DeviceMotionEvent) {
				window.addEventListener('devicemotion', this.motionHandler, false);
			} else {
				console.log("你的设备不支持位置感应!");
			}
			window.xiedajian = this.xiedajian;
			window.openDownload = openDownload;
		},
			filters: {
		numberFormat: function(number) {
			var data = Math.floor(number * 100) / 100;
			return data.toFixed(2);
		}
		},
		methods: {
			xiedajian:function(num){
				if (num==0) {
					this.bgzhuanhuan=true
				}else{
					this.bgzhuanhuan=false;
				}	
			},
			changebg: function() {
				this.bgzhuanhuan = !this.bgzhuanhuan;
				var lastTen = document.querySelector(".last_ten");
				var gpc_hbks = document.querySelector("#mc_pls");
				if (this.bgzhuanhuan) {
					var heig = document.documentElement.clientHeight - document.getElementsByTagName("header")[0].offsetHeight
					lastTen.style.height = "16rem";
					gpc_hbks.style.overflow = "hidden";
					gpc_hbks.style.height = heig + 'px';
				} else {
					lastTen.style.height = "0";
					gpc_hbks.removeAttribute("style");
				}

			},
			showbox: function(msg) {
				this.logok = msg;
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
			toHeMai: function() {
				sessionStorage.removeItem('shaixuan');
				sessionStorage.removeItem('arr');
				this.$router.push({
					name: 'heimai_lobby',
				})
			},
			toPlay() { //	玩法
				// sessionStorage.setItem('play', document.querySelector('.aui-title').innerText);
				// location.href = 'http://www.baidu.com';
				this.$router.push({
					path: "/goucai/play",
					query: {
						isApp: '0',
						dataType: "pl3"
					}

				})
			},
			motionHandler: function(event) { //摇一摇
				let acceleration = event.accelerationIncludingGravity;
				let curTime = Date.now(); //取得当前时间
				if ((curTime - lastTime) > 120) {
					let diffTime = curTime - lastTime;
					lastTime = curTime;
					x = acceleration.x;
					y = acceleration.y;
					z = acceleration.z;
					//计算摇动速度
					let speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 1000;
					if (speed > SHAKE_SPEED) {
						var index = this.pypename;
						switch (index) {
							case "直选":
								this.Random();
								break;
							case "组三":
								this.RandomZuSan();
								break;
							case "组六":
								this.RandomZuLiu();
								break;
						} //摇一摇触发随机事件
					}
					lastX = x;
					lastY = y;
					lastZ = z;
				}
			},
			closeWin: function() {
				sessionStorage.removeItem('arr');
				sessionStorage.removeItem('play');
				sessionStorage.removeItem('name');
				sessionStorage.removeItem('continue');
				sessionStorage.removeItem('index');
				window.removeEventListener('devicemotion', this.motionHandler, false)
				this.$router.go(-1);
			},
			continueFun: function() {
				let arr = getSession('arr');
				this.addlist = [];
				this.addset = [];
				this.addlist = arr.data;
				this.betConlength = arr.data.length;
			},
			compileFun: function() {
				var arr = getSession('arr');
				this.addlist = [];
				this.addset = [];
				this.addset = arr.data;
				console.log(JSON.stringify(this.addset));
				let index = getSession('index');
				this.betConlength = this.addset.length - 1;
				this.totalNum = this.addset[index].totalNum;
				this.totalPrice = this.totalNum * 2;
				this.addsetindex = index;
				var setnum = 10;
				if (arr.type == '和值') {
					setnum = this.heZhiList.length;
					console.log(setnum);
				}
				for (var i = 0; i < setnum; i++) {
					if (arr.type == '直选') {
						for (var n = 0; n < this.addset[index].baiweiarr.length; n++) {
							if (this.addset[index].baiweiarr[n] == this.baiWeiList[i].id) {
								this.baiWeiList[i].state = true;
								this.bnums++;
								this.baiweiarr = this.addset[index].baiweiarr;
							}
						}
						for (var n = 0; n < this.addset[index].shiweiarr.length; n++) {
							if (this.addset[index].shiweiarr[n] == this.shiWeiList[i].id) {
								this.shiWeiList[i].state = true;
								this.snums++;
								this.shiweiarr = this.addset[index].shiweiarr;
							}
						}
						for (var n = 0; n < this.addset[index].geweiarr.length; n++) {
							if (this.addset[index].geweiarr[n] == this.geWeiList[i].id) {
								this.geWeiList[i].state = true;
								this.gnums++;
								this.geweiarr = this.addset[index].geweiarr;
							}
						}
					} else if (arr.type == "组三") {
						for (var n = 0; n < this.addset[index].zuSanarr.length; n++) {
							if (this.addset[index].zuSanarr[n] == this.zuSanList[i].id) {
								this.zuSanList[i].state = true;
								this.tnums++;
								this.zuSanarr = this.addset[index].zuSanarr;
							}
						}
					} else if (arr.type == "组六") {
						for (var n = 0; n < this.addset[index].zuLiuarr.length; n++) {
							if (this.addset[index].zuLiuarr[n] == this.zuLiuList[i].id) {
								this.zuLiuList[i].state = true;
								this.lnums++;
								this.zuLiuarr = this.addset[index].zuLiuarr;
							}
						}
					} else if (arr.type == "和值") {
						for (var n = 0; n < this.addset[index].heZhiarr.length; n++) {
							if (this.addset[index].heZhiarr[n] == this.heZhiList[i].id) {
								this.heZhiList[i].state = true;
								this.hnums++;
								this.heZhiarr = this.addset[index].heZhiarr;

							}
						}
					}
				}
				console.log(this.heZhiarr);
				if (arr.type == "和值") {
					if (this.hnums < 1) {
						this.totalNum = 0;
						this.totalPrice = 0;
					} else {
						this.sumNum = 0;
						var idx;
						for (var i = 0; i < this.heZhiarr.length; i++) {
							idx = this.heZhiarr[i];
							console.log(idx);
							if (idx < 10) {
								this.sumNum += parseInt((idx + 1) * (idx + 2) / 2);
								console.log(0);
							} else if (idx > 17) {
								console.log(17);
								idx = 27 - idx;
								this.sumNum += parseInt((idx + 1) * (idx + 2) / 2);
							} else {
								console.log(27);
								switch (idx) {
									case 10:
									case 17:
										this.sumNum += 63;
										break;
									case 11:
									case 16:
										this.sumNum += 69;
										break;
									case 12:
									case 15:
										this.sumNum += 73;
										break;
									case 13:
									case 14:
										this.sumNum += 75;
										break;
								}
							}
							console.log(this.sumNum);
						}

						this.totalNum = parseInt(this.sumNum);
						this.totalPrice = this.totalNum * 2;
					}
				}
			},
			ChoiceType: function() {
				console.log(getSession('arr'));
				if (getSession('arr') && getSession('arr').data.length > 0) {
					Toast('请选择相同玩法进行投注！');
					return false
				}
				this.navTab = !this.navTab;
			},
			setChoice: function(play, name, idx) {
				this.setClearList();
				if (idx == 1) {
					window.removeEventListener('devicemotion', this.motionHandler, false)
				} else {
					window.addEventListener('devicemotion', this.motionHandler, false);
				}
				this.styleList[this.redDallIdx].state = false;
				this.pypename = name;
				this.redDallIdx = idx;
				setSession('name', this.pypename);
				setSession('play', this.redDallIdx);
			},
			hideChoice: function() {
				this.navTab = false;
			},
			toyilou: function() {
				if (this.yilou) {
					this.yilou = false
				} else {
					this.yilou = true
				}
			},
			fenx: function() { //分享
				this.shareStatue = true;
			},
			hideShare: function() {
				this.shareStatue = false;
			},
			// openDownload: function(){   //前往下载
			//     var link = OverallData().download
			//     if(getCookie('newData')){
			//         window.open(link+'?_userId='+getCookie('newData').userid);
			//     }else{
			//         window.open(link);
			//     }
			// },
			hidemoc: function() {
				this.topMenu = false;
			},
			menuPage: function() {
				this.topMenu = !this.topMenu;
			},
			// setClearList: function(){
			//   for (var i = 0; i < 28; i++) {
			//     this.heZhiList[i].state = false
			//   }
			//   for (var i = 0; i < 10; i++) {
			//     this.baiWeiList[i].state = false
			//     this.shiWeiList[i].state = false
			//     this.geWeiList[i].state = false
			//     this.zuSanList[i].state = false
			//     this.zuLiuList[i].state = false
			//   }
			// },
			// 随机选择直选
			Random: function() {
				// 百位
				this.bnums = [];
				this.snums = [];
				this.gnums = [];
				this.baiweiarr = [];
				this.shiweiarr = [];
				this.geweiarr = [];
				var rand3 = this.generateRandom(10)
				for (var i = 0; i < 10; i++) {
					this.baiWeiList[i].state = false
				}
				this.baiWeiList[rand3].state = true
				this.bnums++;
				this.baiweiarr.push(this.baiWeiList[rand3].id);
				// 十位
				var rand4 = this.generateRandom(10)
				for (var i = 0; i < 10; i++) {
					this.shiWeiList[i].state = false
				}
				this.shiWeiList[rand4].state = true
				this.snums++;
				this.shiweiarr.push(this.shiWeiList[rand4].id);
				// 个位
				var rand5 = this.generateRandom(10)
				for (var i = 0; i < 10; i++) {
					this.geWeiList[i].state = false
				}
				this.geWeiList[rand5].state = true
				this.gnums++;
				this.geweiarr.push(this.geWeiList[rand5].id);

				if (this.bnums < 1 || this.snums < 1 || this.gnums < 1) {
					this.totalNum = 0;
					this.totalPrice = 0
				} else {
					this.totalNum = parseInt(this.bnums * this.snums * this.gnums);
					this.totalPrice = this.totalNum * 2;
				}

			},
			// 组三随机选择
			RandomZuSan: function() {
				this.tnums = 0;
				this.zuSanarr = [];
				for (var i = 0;; i++) {
					if (this.ccarray.length < 2) {
						var randZ = this.generateRandom(10)
						if (randZ != null && randZ < 10) {
							this.ccarray.push(randZ);
						}
					} else {
						break;
					}
				}

				for (var i = 0; i < 10; i++) {
					this.zuSanList[i].state = false
				}

				for (var i = 0; i < 2; i++) {
					this.zuSanList[this.ccarray[i]].state = true
					this.tnums++;
					this.zuSanarr.push(this.zuSanList[this.ccarray[i]].id);
				}
				if (this.tnums < 2) {
					this.totalNum = 0;
					this.totalPrice = 0
				} else {
					this.totalNum = parseInt(parseInt(this.tnums * (this.tnums - 1)));
					this.totalPrice = this.totalNum * 2;
				}
				this.ccarray = []
			},
			// 组六随机选择
			RandomZuLiu: function() {
				this.lnums = 0;
				this.zuLiuarr = [];
				for (var i = 0;; i++) {
					if (this.ccarray.length < 3) {
						var randL = this.generateRandom(10)
						if (randL != null && randL < 10) {
							this.ccarray.push(randL);
						}
					} else {
						break;
					}
				}
				for (var i = 0; i < 10; i++) {
					this.zuLiuList[i].state = false
				}
				for (var i = 0; i < 3; i++) {
					this.zuLiuList[this.ccarray[i]].state = true
					this.lnums++;
					this.zuLiuarr.push(this.zuLiuList[this.ccarray[i]].id);
				}
				if (this.lnums < 3) {
					this.totalNum = 0;
					this.totalPrice = 0
				} else {
					var totalNum = parseInt(getfactorial(this.lnums) / (getfactorial(3) * getfactorial(this.lnums - 3)));

					this.totalNum = totalNum;
					this.totalPrice = this.totalNum * 2;
				}
				this.ccarray = []
			},
			// 选择
			setbaiWeiList: function(idx) {
				if (this.baiWeiList[idx].state) {
					this.baiWeiList[idx].state = false;
					this.bnums--;
					for (var i = 0; i < this.baiweiarr.length; i++) {
						if (this.baiweiarr[i] == this.baiWeiList[idx].id) {
							this.baiweiarr.splice(i, 1);
						}
					}
				} else {
					if (operationType == 1) {
						if (this.totalNum == 1) {
							Toast('单式投注单笔订单不能携带复式投注');
							return
						} else if (this.snums > 1 && this.gnums > 0) {
							// Toast('单式投注单笔订单不能携带复式投注');
							Toast('单式投注单笔订单只能选择1个十位');
							return
						} else if (this.snums > 0 && this.gnums > 1) {
							// Toast('单式投注单笔订单不能携带复式投注');
							Toast('单式投注单笔订单只能选择1个个位');
							return
						}
					} else if (operationType == 2) {
						if (this.addset.length > 1 && this.totalNum > 0) {
							Toast('单式投注单笔订单不能携带复式投注');
							return
						} else if (this.addset.length > 1 && this.snums > 1 && this.gnums > 0) {
							// Toast('单式投注单笔订单不能携带复式投注');
							Toast('单式投注单笔订单只能选择1个十位');
							return
						} else if (this.addset.length > 1 && this.snums > 0 && this.gnums > 1) {
							// Toast('单式投注单笔订单不能携带复式投注');
							Toast('单式投注单笔订单只能选择1个个位');
							return
						}
					}
					this.baiWeiList[idx].state = true;
					this.bnums++;
					this.baiweiarr.push(this.baiWeiList[idx].id);
				}
				if (this.bnums < 1 || this.snums < 1 || this.gnums < 1) {
					this.totalNum = 0;
					this.totalPrice = 0
				} else {
					this.totalNum = parseInt(this.bnums * this.snums * this.gnums);
					this.totalPrice = this.totalNum * 2;
				}

			},
			setshiWeiList: function(idx) {
				// var state = this.shiWeiList[idx].state
				// if (state) {
				//   state = false
				// } else {
				//   state = true
				// }
				// this.shiWeiList[idx].state = state
				if (this.shiWeiList[idx].state) {
					this.shiWeiList[idx].state = false;
					this.snums--;
					for (var i = 0; i < this.shiweiarr.length; i++) {
						if (this.shiweiarr[i] == this.shiWeiList[idx].id) {
							this.shiweiarr.splice(i, 1);
						}
					}
				} else {
					if (operationType == 1) {
						if (this.totalNum == 1) {
							Toast('单式投注单笔订单不能携带复式投注');
							return
						} else if (this.bnums > 1 && this.gnums > 0) {
							// Toast('单式投注单笔订单不能携带复式投注');
							Toast('单式投注单笔订单只能选择1个百位');
							return
						} else if (this.bnums > 0 && this.gnums > 1) {
							// Toast('单式投注单笔订单不能携带复式投注');
							Toast('单式投注单笔订单只能选择1个个位');
							return
						}
					} else if (operationType == 2) {
						if (this.addset.length > 1 && this.totalNum > 0) {
							Toast('单式投注单笔订单不能携带复式投注');
							return
						} else if (this.addset.length > 1 && this.bnums > 1 && this.gnums > 0) {
							// Toast('单式投注单笔订单不能携带复式投注');
							Toast('单式投注单笔订单只能选择1个百位');
							return
						} else if (this.addset.length > 1 && this.bnums > 0 && this.gnums > 1) {
							// Toast('单式投注单笔订单不能携带复式投注');
							Toast('单式投注单笔订单只能选择1个个位');
							return
						}
					}
					this.shiWeiList[idx].state = true;
					this.snums++;
					this.shiweiarr.push(this.shiWeiList[idx].id);
				}
				if (this.bnums < 1 || this.snums < 1 || this.gnums < 1) {
					this.totalNum = 0;
					this.totalPrice = 0
				} else {
					this.totalNum = parseInt(this.bnums * this.snums * this.gnums);
					this.totalPrice = this.totalNum * 2;
				}

			},
			setgeWeiList: function(idx) {
				// var state = this.geWeiList[idx].state
				// if (state) {
				//   state = false
				// } else {
				//   state = true
				// }
				// this.geWeiList[idx].state = state
				if (this.geWeiList[idx].state) {
					this.geWeiList[idx].state = false;
					this.gnums--;
					for (var i = 0; i < this.geweiarr.length; i++) {
						if (this.geweiarr[i] == this.geWeiList[idx].id) {
							this.geweiarr.splice(i, 1);
						}
					}
				} else {
					if (operationType == 1) {
						if (this.totalNum == 1) {
							Toast('单式投注单笔订单不能携带复式投注');
							return
						} else if (this.snums > 1 && this.bnums > 0) {
							Toast('单式投注单笔订单只能选择1个十位');
							return
						} else if (this.snums > 0 && this.bnums > 1) {
							// Toast('单式投注单笔订单不能携带复式投注');
							Toast('单式投注单笔订单只能选择1个百位');
							return
						}
					} else if (operationType == 2) {
						if (this.addset.length > 1 && this.totalNum > 0) {
							Toast('单式投注单笔订单不能携带复式投注');
							return
						} else if (this.addset.length > 1 && this.snums > 1 && this.bnums > 0) {
							Toast('单式投注单笔订单只能选择1个十位');
							return
						} else if (this.addset.length > 1 && this.snums > 0 && this.bnums > 1) {
							// Toast('单式投注单笔订单不能携带复式投注');
							Toast('单式投注单笔订单只能选择1个百位');
							return
						}
					}
					this.geWeiList[idx].state = true;
					this.gnums++;
					this.geweiarr.push(this.geWeiList[idx].id);
				}
				if (this.bnums < 1 || this.snums < 1 || this.gnums < 1) {
					this.totalNum = 0;
					this.totalPrice = 0
				} else {
					this.totalNum = parseInt(this.bnums * this.snums * this.gnums);
					this.totalPrice = this.totalNum * 2;
				}

			},
			setheZhiList: function(idx) {
				console.log(this.heZhiarr);
				console.log(idx);
				if (this.heZhiList[idx].state) {
					this.heZhiList[idx].state = false;
					this.hnums--;

					console.log(this.heZhiarr);
					for (var i = 0; i < this.heZhiarr.length; i++) {
						if (this.heZhiarr[i] == this.heZhiList[idx].id) {
							this.heZhiarr.splice(i, 1);
							console.log(this.heZhiarr);
						}
					}

					if (this.hnums < 1) {
						this.totalNum = 0;
						this.totalPrice = 0;
						this.sumNum = 0;
					} else {
						if (idx < 10) {
							this.sumNum -= parseInt((idx + 1) * (idx + 2) / 2);
						} else if (idx > 17) {
							idx = 27 - idx;
							this.sumNum -= parseInt((idx + 1) * (idx + 2) / 2);
						} else {
							switch (idx) {
								case 10:
								case 17:
									this.sumNum -= 63;
									break;
								case 11:
								case 16:
									this.sumNum -= 69;
									break;
								case 12:
								case 15:
									this.sumNum -= 73;
									break;
								case 13:
								case 14:
									this.sumNum -= 75;
									break;
							}
						}
						this.totalNum = parseInt(this.sumNum);
						this.totalPrice = this.totalNum * 2;
					}

				} else {
					this.heZhiList[idx].state = true;
					this.hnums++;
					this.heZhiarr.push(this.heZhiList[idx].id);
					if (this.hnums < 1) {
						this.totalNum = 0;
						this.totalPrice = 0;
						this.sumNum = 0;
					} else {
						if (idx < 10) {
							this.sumNum += parseInt((idx + 1) * (idx + 2) / 2);
						} else if (idx > 17) {
							idx = 27 - idx;
							this.sumNum += parseInt((idx + 1) * (idx + 2) / 2);
						} else {
							switch (idx) {
								case 10:
								case 17:
									this.sumNum += 63;
									break;
								case 11:
								case 16:
									this.sumNum += 69;
									break;
								case 12:
								case 15:
									this.sumNum += 73;
									break;
								case 13:
								case 14:
									this.sumNum += 75;
									break;
							}
						}
						this.totalNum = parseInt(this.sumNum);
						this.totalPrice = this.totalNum * 2;
					}
				}
				console.log(this.heZhiarr);


			},
			setzuSanList: function(idx) {

				if (this.zuSanList[idx].state) {
					this.zuSanList[idx].state = false
					this.tnums--;
					for (var i = 0; i < this.zuSanarr.length; i++) {
						if (this.zuSanarr[i] == this.zuSanList[idx].id) {
							this.zuSanarr.splice(i, 1);
						}
					}

				} else {
					if (operationType == 1 && this.totalNum == 2) {
						Toast('单式投注单笔订单不能携带复式投注');
						return
					} else if (operationType == 2 && this.addset.length > 1 && this.totalNum == 2) {
						Toast('单式投注单笔订单不能携带复式投注');
						return
					}
					this.zuSanList[idx].state = true
					this.tnums++;
					this.zuSanarr.push(this.zuSanList[idx].id);

				}
				if (this.tnums < 2) {
					this.totalNum = 0;
					this.totalPrice = 0
				} else {
					this.totalNum = parseInt(parseInt(this.tnums * (this.tnums - 1)));
					this.totalPrice = this.totalNum * 2;
				}

			},
			setzuLiuList: function(idx) {

				if (this.zuLiuList[idx].state) {
					this.zuLiuList[idx].state = false;
					this.lnums--;
					for (var i = 0; i < this.zuLiuarr.length; i++) {
						if (this.zuLiuarr[i] == this.zuLiuList[idx].id) {
							this.zuLiuarr.splice(i, 1);
						}
					}

				} else {
					if (operationType == 1 && this.totalNum == 1) {
						Toast('单式投注单笔订单不能携带复式投注');
						return
					} else if (operationType == 2 && this.addset.length > 1 && this.totalNum == 1) {
						Toast('单式投注单笔订单不能携带复式投注');
						return
					}
					this.zuLiuList[idx].state = true;
					this.lnums++;
					this.zuLiuarr.push(this.zuLiuList[idx].id)
				}
				if (this.lnums < 3) {
					this.totalNum = 0;
					this.totalPrice = 0
				} else {
					var totalNum = parseInt(getfactorial(this.lnums) / (getfactorial(3) * getfactorial(this.lnums - 3)));

					this.totalNum = totalNum;
					this.totalPrice = this.totalNum * 2;
				}

			},
			// 随机数
			generateRandom: function(count) {
				var rand = parseInt(Math.random() * count);
				for (var i = 0; i < this.ccarray.length; i++) {
					if (this.ccarray[i] == rand) {
						return null
					}
				}
				return rand
			},
			// 清除
			setClearList: function() {

				this.bnums = 0, //百位球个数
					this.snums = 0, //十位球个数
					this.gnums = 0, //个位球个数
					this.hnums = 0, //和值球个数
					this.tnums = 0, //组三球个数
					this.lnums = 0, //组六球个数
					this.sumNum = 0; //和值
				this.baiweiarr = [], //百位数组
					this.shiweiarr = [], //十位数组
					this.geweiarr = [], //个位数组
					this.heZhiarr = [], //和值数组
					this.zuSanarr = [], //组三数组
					this.zuLiuarr = [], //组六数组
					this.sumNum = 0, //和值累计
					this.totalNum = 0, //注数
					this.totalPrice = 0; //金额
				for (var i = 0; i < 10; i++) {
					this.baiWeiList[i].state = false
					this.shiWeiList[i].state = false
					this.geWeiList[i].state = false
					this.zuSanList[i].state = false
					this.zuLiuList[i].state = false
				}
				for (var i = 0; i < 28; i++) {
					this.heZhiList[i].state = false
				}
			},
			pay: function() {
				let uid = getCookie('newData');
				if (!uid) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
				// if (getCookie('logok')) {  //判断是否实名
				// 	this.logok = true;
				//     return false;
				// }
				// if (this.totalNum > 100) {
				// 	Toast('注单数量最多100注!');
				// 	return false;
				// }
				var data;
				if (this.betConlength > 0 && this.totalNum < 1) {
					if (this.addset.length > 0) {

						this.addset.splice(this.addsetindex, 1);

						data = this.addset;
					} else {
						data = this.addlist;
					}
					this.setClearList();
					this.addlist = [];
					this.addset = [];
					this.betConlength = 0;
					let obj = {};
					obj.data = data;
					obj.type = this.pypename
					setSession('arr', obj);
					sessionStorage.removeItem('continue');
					sessionStorage.removeItem('index');
					window.removeEventListener('devicemotion', this.motionHandler, false);
					operationType = 0;
					this.$router.push({
						path: '/goucai/goucai_mc_plspay',
					})
				} else {
					if (this.pypename == '直选') {
						//直选
						if (this.bnums < 1) {
							Toast("至少选择1个百位数字");
							return false;
						}
						if (this.snums < 1) {
							Toast("至少选择1个十位数字");
							return false;
						}
						if (this.gnums < 1) {
							Toast("至少选择1个个位数字");
							return false;
						}
						// 						console.log(this.addset.length);
						// 						console.log(this.addlist.length);
						if (this.bnums >= 1 && this.snums >= 1 && this.gnums >= 1) {
							this.baiweiarr = this.baiweiarr.sort(compare);
							this.shiweiarr = this.shiweiarr.sort(compare);
							this.geweiarr = this.geweiarr.sort(compare);
							if (this.addlist.length > 0) {
								console.log(5);
								this.addlist.push({
									playMethod: "normal",
									playType: "p3Direct",
									baiweiarr: this.baiweiarr,
									shiweiarr: this.shiweiarr,
									geweiarr: this.geweiarr,
									totalNum: this.totalNum
								});
								data = this.addlist;
							} else if (this.addset.length > 0) {
								console.log(11);
								this.addset[this.addsetindex] = {
									playMethod: "normal",
									playType: "p3Direct",
									baiweiarr: this.baiweiarr,
									shiweiarr: this.shiweiarr,
									geweiarr: this.geweiarr,
									totalNum: this.totalNum
								};
								data = this.addset;

							} else {
								data = [{
									playMethod: "normal",
									playType: "p3Direct",
									baiweiarr: this.baiweiarr,
									shiweiarr: this.shiweiarr,
									geweiarr: this.geweiarr,
									totalNum: this.totalNum
								}];
							}
							this.setClearList();
							this.addlist = [];
							this.addset = [];
							let obj = {};
							obj.data = data;
							obj.type = this.pypename
							setSession('arr', obj);
							sessionStorage.removeItem('continue');
							sessionStorage.removeItem('index');
							window.removeEventListener('devicemotion', this.motionHandler, false);
							operationType = 0;
							this.$router.push({
								path: '/goucai/goucai_mc_plspay',
							})
						}
					} else if (this.pypename == '组三') {
						//组三

						if (this.tnums < 2) {
							Toast("至少选择2个号码");
							return false;
						}
						if (this.tnums >= 2) {
							this.zuSanarr = this.zuSanarr.sort(compare);
							if (this.addlist.length > 0) {
								this.addlist.push({
									playMethod: "normal",
									playType: "group3",
									zuSanarr: this.zuSanarr,
									totalNum: this.totalNum
								});
								data = this.addlist;
							} else if (this.addset.length > 0) {
								this.addset[this.addsetindex] = {
									playMethod: "normal",
									playType: "group3",
									zuSanarr: this.zuSanarr,
									totalNum: this.totalNum
								};
								data = this.addset;

							} else {
								data = [{
									playMethod: "normal",
									playType: "group3",
									zuSanarr: this.zuSanarr,
									totalNum: this.totalNum
								}];
							}
							this.setClearList();
							this.addlist = [];
							this.addset = [];
							let obj = {};
							obj.data = data;
							obj.type = this.pypename
							setSession('arr', obj);
							sessionStorage.removeItem('continue');
							sessionStorage.removeItem('index');
							window.removeEventListener('devicemotion', this.motionHandler, false);
							operationType = 0;
							this.$router.push({
								path: '/goucai/goucai_mc_plspay',
							})
						}
					} else if (this.pypename == '组六') {
						//组六
						if (this.lnums < 3) {
							Toast("至少选择3个号码");
							return false;
						}
						if (this.lnums >= 3) {
							this.zuLiuarr = this.zuLiuarr.sort(compare);
							if (this.addlist.length > 0) {
								this.addlist.push({
									playMethod: "normal",
									playType: "group6",
									zuLiuarr: this.zuLiuarr,
									totalNum: this.totalNum
								});
								data = this.addlist;
							} else if (this.addset.length > 0) {
								this.addset[this.addsetindex] = {
									playMethod: "normal",
									playType: "group6",
									zuLiuarr: this.zuLiuarr,
									totalNum: this.totalNum
								};
								data = this.addset;

							} else {
								data = [{
									playMethod: "normal",
									playType: "group6",
									zuLiuarr: this.zuLiuarr,
									totalNum: this.totalNum
								}];
							}
							this.setClearList();
							this.addlist = [];
							this.addset = [];
							let obj = {};
							obj.data = data;
							obj.type = this.pypename
							setSession('arr', obj);
							sessionStorage.removeItem('continue');
							sessionStorage.removeItem('index');
							window.removeEventListener('devicemotion', this.motionHandler, false);
							operationType = 0;
							this.$router.push({
								path: '/goucai/goucai_mc_plspay',
							})
						}
					} else if (this.pypename == '和值') {
						//和值
						if (this.hnums < 1) {
							Toast("至少选择1个号码");
							return false;
						}
						if (this.hnums >= 1) {
							console.log(this.heZhiarr);
							this.heZhiarr = this.heZhiarr.sort(compare);
							console.log(this.heZhiarr);
							if (this.addlist.length > 0) {
								this.addlist.push({
									playMethod: "sum",
									playType: "p3Direct",
									heZhiarr: this.heZhiarr,
									totalNum: this.totalNum
								});
								data = this.addlist;
							} else if (this.addset.length > 0) {
								this.addset[this.addsetindex] = {
									playMethod: "sum",
									playType: "p3Direct",
									heZhiarr: this.heZhiarr,
									totalNum: this.totalNum
								};
								data = this.addset;

							} else {
								data = [{
									playMethod: "sum",
									playType: "p3Direct",
									heZhiarr: this.heZhiarr,
									totalNum: this.totalNum
								}];
							}
							this.setClearList();
							this.addlist = [];
							this.addset = [];
							let obj = {};
							obj.data = data;
							obj.type = this.pypename
							setSession('arr', obj);
							sessionStorage.removeItem('continue');
							sessionStorage.removeItem('index');
							window.removeEventListener('devicemotion', this.motionHandler, false);
							operationType = 0;
							this.$router.push({
								path: '/goucai/goucai_mc_plspay',
							})
						}

					}
				}
			},
			setSurplusTime: function() {
				clearInterval(interval);
				var timestamp = this.nowTime;
				console.log(this.EndTime);
				var endedTime = this.EndTime;
				var surTime = endedTime - timestamp;
				var sTm = formatDuring(surTime);
				if (sTm[0].toString().length < 2) {
					this.surTimedays = '0' + sTm[0].toString();
				} else {
					this.surTimedays = sTm[0];
				}
				if (sTm[1].toString().length < 2) {
					this.surTimehours = '0' + sTm[1].toString();
				} else {
					this.surTimehours = sTm[1]
				}
				if (sTm[2].toString().length < 2) {
					this.surTimeminutes = '0' + sTm[2].toString();
				} else {
					this.surTimeminutes = sTm[2]
				}
				if (sTm[3].toString().length < 2) {
					this.surTimeseconds = '0' + sTm[3].toString();
				} else {
					this.surTimeseconds = sTm[3];
				}
				interval = setInterval(() => {
					surTime = surTime - 1000
					if (surTime < 0) {
						clearInterval(interval);
					}
					var Tm = formatDuring(surTime);
					if (Tm[0].toString().length < 2) {
						this.surTimedays = '0' + Tm[0].toString();
					} else {
						this.surTimedays = Tm[0];
					}
					if (Tm[1].toString().length < 2) {
						this.surTimehours = '0' + Tm[1].toString();
					} else {
						this.surTimehours = Tm[1]
					}
					if (Tm[2].toString().length < 2) {
						this.surTimeminutes = '0' + Tm[2].toString();
					} else {
						this.surTimeminutes = Tm[2]
					}
					if (Tm[3].toString().length < 2) {
						this.surTimeseconds = '0' + Tm[3].toString();
					} else {
						this.surTimeseconds = Tm[3];
					}
				}, 1000)
			},
			setTime: function() {
				let dataes = this.Qs.stringify({
					"path": "number/lows/pl"
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getCurrentInfo',
						dataes
					)
					.then(ret => {
						if (ret.status == 200) {
							var content = JSON.parse(ret.data.content);
							if (content.code == 100000) {
								this.EndTime = parseInt(content.data.endedTime);
								this.nowTime = parseInt(content.data.nowTime);
								this.periodNumber = content.data.periodNumber;
								this.setSurplusTime();
							} else if (content.code == 201004) {
								this.title = false;
							}
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			getMiss: function() {
				let dataes = this.Qs.stringify({
					"path": "number/lows/pl"
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getMiss',
						dataes
					)
					.then(data => {
						if (data.status == 200) {
							var content = JSON.parse(data.data.content);
							if (content.code == 100000) {
								allyilouData = content.data;
								if (allyilouData) {
									for (var i = 0; i < 10; i++) {
										this.oneyilouData.push(allyilouData.pl3Direct["oneBall" + i + "Miss"]);
										this.twoyilouData.push(allyilouData.pl3Direct["twoBall" + i + "Miss"]);
										this.threeyilouData.push(allyilouData.pl3Direct["threeBall" + i + "Miss"]);
										this.zuxuanyilouData.push(allyilouData.pl3Group["ball" + i + "Miss"]);
										this.hezhiyilouData.push(allyilouData.pl3DirectSum["ball" + i + "Miss"]);
									}
								}
							} else if (content.code == 201004) {}
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			// 获取往期开奖
			getHistoryDraws: function() {
				let data = [];
				data.flag = false;
				data.page = 1;
				data.rows = 10;
				let dataes = this.Qs.stringify({
					"path": "number/lows/pl",
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getHistoryDraws',
						dataes
					)
					.then(data => {
						if (data.status == 200) {
							var content = JSON.parse(data.data.content);
							if (content.code == 100000) {
								for (var i = 0; i < content.data.length; i++) {
									var csarr = content.data[i].result.split(',')
									content.data[i].result = csarr
								}
								this.HistoryDraws = content.data;
								for (var i = 0; i < this.HistoryDraws.length; i++) {
								    var resultext = this.HistoryDraws[i];
								    if (resultext.result) {
								        var result = resultext.result;
								        for (var f = 0; f < result.length; f++) {
								            if (result[f].length != 2) {
								              if (result[f] * 1 < 10) {
								                  result[f] = "0" + result[f];
								              }
								            }
								        }
								        resultext.result = result;
								    }
								    this.HistoryDraws[i] = resultext;
								}
								EventUtil.listenTouchDirection(document.getElementById("mc_pls"))
							}
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
		},
	}

	function formatDuring(mss) {
		var days = parseInt(mss / (1000 * 60 * 60 * 24));
		var hours = parseInt((mss % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60));
		var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = parseInt((mss % (1000 * 60)) / 1000);
		return [days, hours, minutes, seconds]
	}
</script>

<style scoped>
	@import "../../css/goucai_szc.css";

	#mc_pls {
		margin-top: 2.25rem;
	}
</style>
