<template>
	<div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="closeWin()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div>
				<div class="aui-title" @click="ChoiceType()"><span>双色球</span> <span id="pagetitle">{{name}}</span> <img src="../../assets/goucai/jjc/xiajiantou.png" /></div>
			</div>
			<div class="aui-pull-right aui-btn top-more" @click="menuPage()">
				<span></span><span></span><span></span>
			</div>
		</header>
		<div id="mc_ssq">
			<!-- 购彩类型 -->
			<div class="nav-Tab" @click="hideChoice()" v-if='navTab'>
				<div class="list">
					<li :class="{ select: play == item.play }" v-for='item in typeList' @click="setChoice(item.play,item.name,item.id)">{{ item.name }}</li>
				</div>
			</div>
			<!-- 菜单 -->
			<div class="topMenu" @click='hidemoc()' v-if="topMenu">
				<ul>
					<li @click='toyilou()'>遗漏投注</li>
					<li @click='fenx()'>分享</li>
					<li @click='toHeMai()'>合买</li>
					<li @click='toPlay("ssq")'>玩法</li>
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
				<div class="top_mc" v-if='EndTime>0||EndTime==0'>
					<div class="flr">第{{current}}期</div>
					<div class="fgr">投注剩余时间:<span>{{surTimehours}}</span>时<span>{{surTimeminutes}}</span>分<span>{{surTimeseconds}}</span>秒</div>
					<span class="icon_down"></span>
					<!-- icon_down :class="[ishide[index]?'icon_up':'icon_down']"-->
				</div>
				<div class="top_mc" v-else>
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
								<td><span v-for="thal in item.result[0]">
										<i v-if="thal.length==2">{{ thal }}</i>
										<i v-else>0{{ thal }}</i>
									</span><span>
									<!-- 	<i v-if="item.result[1]>9">{{ item.result[1] }}</i> -->
										<i >{{ item.result[1] }}</i>
									</span></td>
							</tr>
						</tbody>
					</table>
				</div>

				<!-- 内容 -->
				<div class="mc_cont" v-if='play=="normal"'>
					<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
					<!--  -->
					<div class="yaoyiyao" tapmode @click="Random()">
						<p>摇一摇机选</p>
					</div>
					<div class="titl">
						<div class="flr red">红球：</div>
						<div class="fgr">请至少选择6个</div>
					</div>
					<div class="battle battle_red">
						<ul>
							<template v-for="(item,index) in redDallList">
								<li :class="{ 'active': item.state }" tapmode @click="setredDallList(index)"><span class="sp1">{{ item.id }}</span><span
									 class="sp2" v-if="yilou">{{ redMiss[index] }}</span></li>
							</template>
							<li style="border: 0;"></li>
							<li style="border: 0;"></li>
						</ul>
					</div>
					<div class="titl">
						<div class="flr blue">蓝球：</div>
						<div class="fgr">请至少选择1个蓝球</div>
					</div>
					<div class="battle battle_blue">
						<ul>
							<template v-for="(item,index) in blueDallList">
								<li :class="{ 'active': item.state }" tapmode @click="setblueDallList(index)"><span class="sp1">{{ item.id }}</span><span
									 class="sp2" v-if="yilou">{{ blueMiss[index] }}</span></li>
							</template>
							<li style="border: 0;"></li>
							<li style="border: 0;"></li>
							<li style="border: 0;"></li>
							<li style="border: 0;"></li>
							<li style="border: 0;"></li>
						</ul>
					</div>
				</div>
				<!-- 内容 -->
				<div class="mc_cont last_cont" v-if='play=="duplex"'>
					<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
					<div class="titl">
						<div class="flr red">胆码区</div>
						<div class="fgr">请至少选择1个，最多5个</div>
					</div>
					<div class="battle battle_red">
						<ul>
							<template v-for="(item,index) in danDallList">
								<li :class="{ 'active': item.state }" tapmode @click="setdanDallList(index)"><span class="sp1">{{ item.id }}</span><span
									 class="sp2" v-if="yilou">{{ redMiss[index] }}</span></li>
							</template>
							<li style="border: 0;"></li>
							<li style="border: 0;"></li>
						</ul>
					</div>


					<div class="titl">
						<div class="flr red">拖码区</div>
						<div class="fgr">请至少选择2个红球</div>
					</div>
					<div class="battle battle_red">
						<ul>
							<template v-for="(item,index) in tuoDallList">
								<li :class="{ 'active': item.state }" tapmode @click="settuoDallList(index)"><span class="sp1">{{ item.id }}</span><span
									 class="sp2" v-if="yilou">{{ redMiss[index] }}</span></li>
							</template>
							<li style="border: 0;"></li>
							<li style="border: 0;"></li>
						</ul>
					</div>

					<div class="titl">
						<div class="flr blue">蓝球：</div>
						<div class="fgr">请至少选择1个蓝球</div>
					</div>
					<div class="battle battle_blue">
						<ul>
							<template v-for="(item,index) in blueDallList">
								<li :class="{ 'active': item.state }" tapmode @click="setBlueAanDallList(index)"><span class="sp1">{{ item.id }}</span><span
									 class="sp2" v-if="yilou">{{ blueMiss[index] }}</span></li>
							</template>
							<li style="border: 0;"></li>
							<li style="border: 0;"></li>
							<li style="border: 0;"></li>
							<li style="border: 0;"></li>
							<li style="border: 0;"></li>
						</ul>
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
<!-- 			<footer>
				<div class="ft_money flr">共<span>{{totalNum}}</span>注<span>{{totalPrice}}</span>元</div>
				<div class="ft_btn fgr">
					<div class="flr" tapmode @click="setClearList()">清除</div>
					<div class="flr" tapmode @click="open_ssqpay()">投注<span v-if="betConlength > 0" class="pay_b">{{ betConlength > 99?"99":betConlength }}</span></div>
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
					<div class="flr" tapmode @click="open_ssqpay()">投注<span v-if="betConlength > 0" class="pay_b">{{ betConlength > 99?"99":betConlength }}</span></div>
				</div>
			</footer>

		</div>
	</div>
</template>

<script>
	import checkokNav from '../../common/checkok.vue';
	var compileNum = false;
	var indexs;
	var interval;
	var scrollTops;
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
				var gpc_hbks = document.querySelector("#mc_ssq");
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
							gpc_hbks.style.height = heig + 'px';
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
				shareStatue: false, //分享状态
				current: 0,
				betConlength: 0,
				bgzhuanhuan: false,
				nowTime: 0,
				EndTime: 0,
				surTimedays: 0,
				surTimehours: 0,
				surTimeminutes: 0,
				surTimeseconds: 0,
				totalNum: 0,
				totalPrice: 0,
				yilou: false,
				PastPerShow: true,
				ccarray: [],
				selectedArr: [],
				redMiss: [],
				blueMiss: [],
				HistoryDraws: [],
				id: '0',
				name: '普通',
				play: 'normal',
				typeList: [{
					'id': '0',
					'name': '普通',
					'play': 'normal'
				}, {
					'id': '1',
					'name': '胆拖',
					'play': 'duplex'
				}],
				redDallList: [{
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
					}, {
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
					},
					{
						'id': 11,
						'state': false
					}, {
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
					}, {
						'id': 18,
						'state': false
					}, {
						'id': 19,
						'state': false
					}, {
						'id': 20,
						'state': false
					},
					{
						'id': 21,
						'state': false
					}, {
						'id': 22,
						'state': false
					}, {
						'id': 23,
						'state': false
					}, {
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
					}, {
						'id': 28,
						'state': false
					}, {
						'id': 29,
						'state': false
					}, {
						'id': 30,
						'state': false
					},
					{
						'id': 31,
						'state': false
					}, {
						'id': 32,
						'state': false
					}, {
						'id': 33,
						'state': false
					}
				],
				blueDallList: [{
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
					}, {
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
					},
					{
						'id': 11,
						'state': false
					}, {
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
					}
				],
				danDallList: [{
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
					}, {
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
					},
					{
						'id': 11,
						'state': false
					}, {
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
					}, {
						'id': 18,
						'state': false
					}, {
						'id': 19,
						'state': false
					}, {
						'id': 20,
						'state': false
					},
					{
						'id': 21,
						'state': false
					}, {
						'id': 22,
						'state': false
					}, {
						'id': 23,
						'state': false
					}, {
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
					}, {
						'id': 28,
						'state': false
					}, {
						'id': 29,
						'state': false
					}, {
						'id': 30,
						'state': false
					},
					{
						'id': 31,
						'state': false
					}, {
						'id': 32,
						'state': false
					}, {
						'id': 33,
						'state': false
					}
				],
				tuoDallList: [{
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
					}, {
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
					},
					{
						'id': 11,
						'state': false
					}, {
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
					}, {
						'id': 18,
						'state': false
					}, {
						'id': 19,
						'state': false
					}, {
						'id': 20,
						'state': false
					},
					{
						'id': 21,
						'state': false
					}, {
						'id': 22,
						'state': false
					}, {
						'id': 23,
						'state': false
					}, {
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
					}, {
						'id': 28,
						'state': false
					}, {
						'id': 29,
						'state': false
					}, {
						'id': 30,
						'state': false
					},
					{
						'id': 31,
						'state': false
					}, {
						'id': 32,
						'state': false
					}, {
						'id': 33,
						'state': false
					}
				],
				redDallIdx: 0,
				blueDallIdx: 0,
				tuoDallIdx: 0,
				danDallIdx: 0,
				navTab: false,
				topMenu: false,
				coinsMoney: 0, //红包余额
				cashMoney: 0, //现金余额
				payPopup: false,

			};
		},
		created() {
			if (getCookie('logok')) { //判断是否实名
				this.logok = true;
			}
			if (getSession('play')) {
				this.play = getSession('play');
				this.name = getSession('name');
			} else {
				setSession('play', "normal");
				setSession('name', "普通");
				this.play = "normal";
				this.name = "普通";
				this.id = "0";
			};
			this.setTime();
			this.getMiss();

			this.getHistoryDraws();
			if (getSession('arr')) {
				if (getSession('continue') == 'continue') {
					if (getSession('arr').length > 0) {
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
				var gpc_hbks = document.querySelector("#mc_ssq");
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
						dataType: "ssq"
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
						this.Random(); //摇一摇触发随机事件
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
				this.selectedArr = arr;
				this.betConlength = arr.length;
			},
			compileFun: function() {
				var arr = getSession('arr');
				this.selectedArr = arr;
				this.betConlength = arr.length - 1;
				compileNum = true;
				indexs = getSession('index');
				if (this.play == "normal") {
					var arrs = arr[indexs];
					console.log(JSON.stringify(arrs));
					this.redDallIdx = arrs.redQiu.length;
					this.blueDallIdx = arrs.blueQiu.length;
					this.totalNum = arrs.totalNum;
					this.totalPrice = parseInt(arrs.totalNum) * 2;
					for (var i = 0; i < arrs.redQiu.length; i++) {
						for (var n = 0; n < this.redDallList.length; n++) {
							if (arrs.redQiu[i] == this.redDallList[n].id) {
								this.redDallList[n].state = true;
							}
						}
					};
					for (var x = 0; x < arrs.blueQiu.length; x++) {
						for (var y = 0; y < this.blueDallList.length; y++) {
							if (arrs.blueQiu[x] == this.blueDallList[y].id) {
								this.blueDallList[y].state = true;
							}
						}
					}
				} else {
					var arrs = arr[indexs];
					console.log(JSON.stringify(arrs));
					this.danDallIdx = arrs.redDanArr.length;
					this.tuoDallIdx = arrs.redTuoArr.length;
					this.blueDallIdx = arrs.blueQiu.length;
					this.totalNum = arrs.totalNum;
					this.totalPrice = parseInt(arrs.totalNum) * 2;
					for (var c = 0; c < arrs.redDanArr.length; c++) {
						for (var d = 0; d < this.danDallList.length; d++) {
							if (arrs.redDanArr[c] == this.danDallList[d].id) {
								this.danDallList[d].state = true;
							}
						}
					};
					for (var a = 0; a < arrs.redTuoArr.length; a++) {
						for (var b = 0; b < this.tuoDallList.length; b++) {
							if (arrs.redTuoArr[a] == this.tuoDallList[b].id) {
								this.tuoDallList[b].state = true;
							}
						}
					};
					for (var x = 0; x < arrs.blueQiu.length; x++) {
						for (var y = 0; y < this.blueDallList.length; y++) {
							if (arrs.blueQiu[x] == this.blueDallList[y].id) {
								this.blueDallList[y].state = true;
							}
						}
					}
				}
			},
			ChoiceType: function() {
				if (getSession('arr') && getSession('arr').length > 0) {
					Toast('请选择相同玩法进行投注！');
					return false
				}
				this.navTab = !this.navTab;
			},
			setChoice: function(play, name, id) {
				this.play = play;
				this.name = name;
				this.id = id;
				setSession('play', play);
				setSession('name', name);
				if (play == "normal") {
					window.addEventListener('devicemotion', this.motionHandler, false);
				} else {
					window.removeEventListener('devicemotion', this.motionHandler, false)
				}
				this.setClearList();
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
			menuPage: function() {
				this.topMenu = !this.topMenu;
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
			// 随机选择
			Random: function() {
				this.redDallIdx = 0;
				for (var i = 0;; i++) {
					if (this.ccarray.length < 6) {
						var rand1 = this.generateRandom(33)
						if (rand1 != null && rand1 < 33) {
							this.ccarray.push(rand1);
						}
					} else {
						break;
					}
				}
				for (var i = 0; i < 33; i++) {
					this.redDallList[i].state = false;
				}
				for (var i = 0; i < 6; i++) {
					this.redDallList[this.ccarray[i]].state = true;
					this.redDallIdx++;
				}
				this.ccarray = []
				var rand2 = this.generateRandom(16)
				for (var i = 0; i < 16; i++) {
					this.blueDallList[i].state = false;
				}
				this.blueDallList[rand2].state = true;
				this.blueDallIdx = 1;
				var redDallIdx = this.redDallIdx;
				var blueDallIdx = this.blueDallIdx;
				if (redDallIdx < 6 || blueDallIdx < 1) {
					this.totalNum = 0;
					this.totalPrice = 0;
				} else {
					var num = parseInt((getfactorial(redDallIdx) / (getfactorial(redDallIdx - 6) * getfactorial(6))) * blueDallIdx);
					this.totalNum = num;
					this.totalPrice = num * 2;
				}


			},
			// 选择普通红球
			setredDallList: function(idx) {
				var state = this.redDallList[idx].state;
				if (state) {
					this.redDallIdx--;
					state = false;
					this.redDallList[idx].state = state;
				} else {
					if (operationType == 1 && this.totalNum == 1) {
						Toast('单式投注单笔订单不能携带复式投注');
						return
					} else if (operationType == 1 && this.blueDallIdx > 1 && this.redDallIdx > 4) {
						Toast('单式投注单只能选择1个蓝球');
						return
					} else if (operationType == 2 && this.selectedArr.length > 1 && this.selectedArr[indexs].totalNum == 1 && this.totalNum ==1 ) {
						Toast('单式投注单笔订单不能携带复式投注');
						return
					} else if (operationType == 2 && this.selectedArr.length > 1 && this.blueDallIdx > 1 && this.redDallIdx > 4) {
						// Toast('单式投注单笔订单不能携带复式投注');
						Toast('单式投注单只能选择1个蓝球');
						return
					}
					state = true
					if (this.redDallIdx < 20) {
						this.redDallIdx++;
						this.redDallList[idx].state = state
					} else {
						Toast('最多选择20个')
					}
				}
				var redDallIdx = this.redDallIdx;
				var blueDallIdx = this.blueDallIdx;
				if (redDallIdx < 6 || blueDallIdx < 1) {
					this.totalNum = 0;
					this.totalPrice = 0;
				} else {
					var num = parseInt((getfactorial(redDallIdx) / (getfactorial(redDallIdx - 6) * getfactorial(6))) * blueDallIdx);
					this.totalNum = num;
					this.totalPrice = num * 2;
				}


			},
			// 选择普通蓝球
			setblueDallList: function(idx) {
				var state = this.blueDallList[idx].state
				if (state) {
					this.blueDallIdx--;
					state = false
				} else {
					if(operationType==1&&this.totalNum==1){
          Toast('单式投注单笔订单不能携带复式投注');
          return
        }else if(operationType==1&&this.redDallIdx>6){
            Toast('单式投注单只能选择6个红球');
          return
        }else if (operationType==2&&this.selectedArr.length>1&&this.selectedArr[indexs].totalNum==1&&this.totalNum==1) {
          Toast('单式投注单笔订单不能携带复式投注');
          return
        }else if (operationType==2&&this.selectedArr.length>1&&this.redDallIdx>6) {
          // Toast('单式投注单笔订单不能携带复式投注');
            Toast('单式投注单只能选择6个红球');
          return
        }
					this.blueDallIdx++;
					state = true
				}
				this.blueDallList[idx].state = state;
				var redDallIdx = this.redDallIdx;
				var blueDallIdx = this.blueDallIdx;
				if (redDallIdx < 6 || blueDallIdx < 1) {
					this.totalNum = 0;
					this.totalPrice = 0;
				} else {
					var num = parseInt((getfactorial(redDallIdx) / (getfactorial(redDallIdx - 6) * getfactorial(6))) * blueDallIdx);
					this.totalNum = num;
					this.totalPrice = num * 2;
				}


			},
			// 选择胆码红球
			setdanDallList: function(idx) {
				// console.log(this.danDallIdx);
				var state = this.danDallList[idx].state
				if (state) {
					this.danDallIdx--
					state = false
					this.danDallList[idx].state = state
				} else {
					state = true
					if (this.danDallIdx < 5) {
						this.danDallIdx++
						this.danDallList[idx].state = state
						if (this.tuoDallList[idx].state) {
							this.tuoDallIdx--
							this.tuoDallList[idx].state = false
						}
					} else {
						Toast('最多选择5个')
					}
				}
				var dnums = this.danDallIdx;
				var bbnums = this.blueDallIdx;
				var tnums = this.tuoDallIdx;
				if (dnums < 1 || 7 - dnums > tnums || bbnums < 1) {
					this.totalNum = 0;
					this.totalPrice = 0;
				} else {
					var totalNum1 = parseInt(getfactorial(tnums) / (getfactorial(6 - dnums) * getfactorial(tnums - (6 - dnums))));
					var totalNum2 = parseInt(getfactorial(bbnums) / (getfactorial(1) * getfactorial(bbnums - 1)));
					var totalNum = totalNum1 * totalNum2;
					this.totalNum = totalNum;
					this.totalPrice = 2 * totalNum;
				}


			},
			// 选择拖码红球
			settuoDallList: function(idx) {
				var state = this.tuoDallList[idx].state
				if (state) {
					state = false
					this.tuoDallIdx--
					this.tuoDallList[idx].state = state
				} else {
					state = true
					if (this.tuoDallIdx < 20) {
						this.tuoDallIdx++
						this.tuoDallList[idx].state = state
						if (this.danDallList[idx].state) {
							this.danDallList[idx].state = false
							this.danDallIdx--
						}
					} else {
						Toast('最多选择20个')
					}
				}
				var dnums = this.danDallIdx;
				var bbnums = this.blueDallIdx;
				var tnums = this.tuoDallIdx;
				if (dnums < 1 || 7 - dnums > tnums || bbnums < 1) {
					this.totalNum = 0;
					this.totalPrice = 0;
				} else {
					var totalNum1 = parseInt(getfactorial(tnums) / (getfactorial(6 - dnums) * getfactorial(tnums - (6 - dnums))));
					var totalNum2 = parseInt(getfactorial(bbnums) / (getfactorial(1) * getfactorial(bbnums - 1)));
					var totalNum = totalNum1 * totalNum2;
					this.totalNum = totalNum;
					this.totalPrice = 2 * totalNum;
				}


			},
			// 选择胆码蓝球
			setBlueAanDallList: function(idx) {
				var state = this.blueDallList[idx].state
				if (state) {
					this.blueDallIdx--;
					state = false
				} else {
					this.blueDallIdx++;
					state = true
				}
				this.blueDallList[idx].state = state;
				var dnums = this.danDallIdx;
				var bbnums = this.blueDallIdx;
				var tnums = this.tuoDallIdx;
				if (dnums < 1 || 7 - dnums > tnums || bbnums < 1) {
					this.totalNum = 0;
					this.totalPrice = 0;
				} else {
					var totalNum1 = parseInt(getfactorial(tnums) / (getfactorial(6 - dnums) * getfactorial(tnums - (6 - dnums))));
					var totalNum2 = parseInt(getfactorial(bbnums) / (getfactorial(1) * getfactorial(bbnums - 1)));
					var totalNum = totalNum1 * totalNum2;
					this.totalNum = totalNum;
					this.totalPrice = 2 * totalNum;
				}

			},
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
				for (var i = 0; i < 33; i++) {
					this.redDallList[i].state = false
					this.danDallList[i].state = false
					this.tuoDallList[i].state = false
				}
				for (var i = 0; i < 16; i++) {
					this.blueDallList[i].state = false
				}
				this.redDallIdx = 0;
				this.danDallIdx = 0;
				this.tuoDallIdx = 0;
				this.blueDallIdx = 0;
				this.totalNum = 0;
				this.totalPrice = 0;
			},
			open_ssqpay: function() {
				
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
				if (this.betConlength <= 0 || this.totalNum > 0) {
					if (this.play == "normal") {
						if (this.redDallIdx < 6) {
							Toast('最少选择6个红球');
							return
						}
					} else {
						if (this.danDallIdx < 1) {
							Toast('最少选择1个胆码');
							return
						}
						if (7 - parseInt(this.danDallIdx) > parseInt(this.tuoDallIdx)) {
							var minnum = 7 - parseInt(this.danDallIdx);
							Toast('最少选择' + minnum + '个拖码');
							return
						}
					}

					if (this.blueDallIdx < 1) {
						Toast('最少选择1个蓝球');
						return
					}
					if (this.play == "normal") {
						var redArr = [];
						var blueArr = [];
						var ssqBetList = {};
						var redDallList = this.redDallList;
						var blueDallList = this.blueDallList;
						for (var i = 0; i < redDallList.length; i++) {
							if (redDallList[i].state) {
								redArr.push(redDallList[i].id)
							}
						}
						for (var i = 0; i < blueDallList.length; i++) {
							if (blueDallList[i].state) {
								blueArr.push(blueDallList[i].id)
							}
						}
						ssqBetList.type = 'puTong';
						ssqBetList.totalNum = this.totalNum;
						ssqBetList.totalPrice = this.totalPrice;
						ssqBetList.current = this.current;
						ssqBetList.redQiu = redArr;
						ssqBetList.blueQiu = blueArr;
					} else {
						var redDanArr = [];
						var redTuoArr = [];
						var blueArr = [];
						var ssqBetList = {};
						var danDallList = this.danDallList;
						var tuoDallList = this.tuoDallList;
						var blueDallList = this.blueDallList;
						for (var i = 0; i < danDallList.length; i++) {
							if (danDallList[i].state) {
								redDanArr.push(danDallList[i].id)
							}
						}
						for (var i = 0; i < tuoDallList.length; i++) {
							if (tuoDallList[i].state) {
								redTuoArr.push(tuoDallList[i].id)
							}
						}
						for (var i = 0; i < blueDallList.length; i++) {
							if (blueDallList[i].state) {
								blueArr.push(blueDallList[i].id)
							}
						}
						ssqBetList.type = 'danTuo';
						ssqBetList.totalNum = this.totalNum;
						ssqBetList.totalPrice = this.totalPrice;
						ssqBetList.redDanArr = redDanArr;
						ssqBetList.current = this.current;
						ssqBetList.redTuoArr = redTuoArr;
						ssqBetList.blueQiu = blueArr;
					}

					// Object.assign(this.$data, this.$options.data())

					var setArr = [];
					setArr.push(ssqBetList);
					var ssqBetArr;
					if (compileNum) {
						var selectedArrs = this.selectedArr
						selectedArrs[indexs] = ssqBetList;
						ssqBetArr = selectedArrs;
						compileNum = false;
					} else {
						ssqBetArr = this.selectedArr.concat(setArr);
					}
				} else {
					if (compileNum) {
						var selectedArrs = this.selectedArr
						selectedArrs.splice(indexs, 1);
						ssqBetArr = selectedArrs;
						compileNum = false;
					} else {
						ssqBetArr = this.selectedArr;
					}
				}
				this.betConlength = 0;
				this.reloadFun();
				console.log(JSON.stringify(this.selectedArr));
				setSession('arr', ssqBetArr);
				setSession('datotype', ssqBetArr[0].type);
				sessionStorage.removeItem('continue');
				sessionStorage.removeItem('index');
				operationType = 0;
				window.removeEventListener('devicemotion', this.motionHandler, false)
				this.$router.push({
					path: '/goucai/goucai_mc_ssqpay',
					query: {
						current: this.current,
						endedTime: getTime(this.EndTime, 1),
						type: this.play,
					}
				})

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
					"path": "number/lows/ssq"
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
								this.current = content.data.periodNumber;
								this.setSurplusTime();
							} else if (content.code == 201004) {
								this.EndTime = -1;
							}
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			getMiss: function() {
				let dataes = this.Qs.stringify({
					"path": "number/lows/ssq"
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
								var redMiss = [];
								for (var i = 1; i < 34; i++) {
									var str = "red" + i + "Miss";
									for (var key in content.data) {
										if (key == str) {
											redMiss.push(content.data[key])
										}
									}
								}
								var blueMiss = [];
								for (var j = 1; j < 17; j++) {
									var str = "blue" + j + "Miss";
									for (var keys in content.data) {
										if (keys == str) {
											blueMiss.push(content.data[keys])
										}
									}
								}
								this.redMiss = redMiss;
								this.blueMiss = blueMiss;
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
					"path": "number/lows/ssq",
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
									var csarr = content.data[i].result.split(' ')
									csarr[0] = csarr[0].split(',')
									content.data[i].result = csarr
								}
								this.HistoryDraws = content.data;
					for (var i = 0; i < this.HistoryDraws.length; i++) {
                      var resultext = this.HistoryDraws[i];
                      if (resultext.result[0]) {
                          var result = resultext.result[0];
                          for (var f = 0; f < result.length; f++) {
                              if (result[f].length != 2) {
                                  if (result[f] * 1 < 10) {
                                      result[f] = "0" + result[f];
                                  }
                              }

                          }
                          resultext.result[0] = result;
                      }
                      if (resultext.result[1]) {
                          var result1 = resultext.result[1].split(',');
                          for (var f = 0; f < result1.length; f++) {
                              if (result1[f].length != 2) {
                                  if (result1[f] * 1 < 10) {
                                      result1[f] = "0" + result1[f];
                                  }
                              }

                          }
                          resultext.result[1] = result1.join(",");
                      }
                      this.HistoryDraws[i] = resultext;
                  }
								EventUtil.listenTouchDirection(document.getElementById("mc_ssq"))
							}
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			reloadFun: function() {
				this.totalNum = 0;
				this.totalPrice = 0;
				this.yilou = false;
				this.PastPerShow = true;
				this.ccarray = [];
				this.selectedArr = [];
				this.typeList = [{
					'id': '0',
					'name': '普通',
					'play': 'normal'
				}, {
					'id': '1',
					'name': '胆拖',
					'play': 'duplex'
				}];
				this.redDallList = [{
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
					}, {
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
					},
					{
						'id': 11,
						'state': false
					}, {
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
					}, {
						'id': 18,
						'state': false
					}, {
						'id': 19,
						'state': false
					}, {
						'id': 20,
						'state': false
					},
					{
						'id': 21,
						'state': false
					}, {
						'id': 22,
						'state': false
					}, {
						'id': 23,
						'state': false
					}, {
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
					}, {
						'id': 28,
						'state': false
					}, {
						'id': 29,
						'state': false
					}, {
						'id': 30,
						'state': false
					},
					{
						'id': 31,
						'state': false
					}, {
						'id': 32,
						'state': false
					}, {
						'id': 33,
						'state': false
					}
				];
				this.blueDallList = [{
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
					}, {
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
					},
					{
						'id': 11,
						'state': false
					}, {
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
					}
				];
				this.danDallList = [{
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
					}, {
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
					},
					{
						'id': 11,
						'state': false
					}, {
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
					}, {
						'id': 18,
						'state': false
					}, {
						'id': 19,
						'state': false
					}, {
						'id': 20,
						'state': false
					},
					{
						'id': 21,
						'state': false
					}, {
						'id': 22,
						'state': false
					}, {
						'id': 23,
						'state': false
					}, {
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
					}, {
						'id': 28,
						'state': false
					}, {
						'id': 29,
						'state': false
					}, {
						'id': 30,
						'state': false
					},
					{
						'id': 31,
						'state': false
					}, {
						'id': 32,
						'state': false
					}, {
						'id': 33,
						'state': false
					}
				];
				this.tuoDallList = [{
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
					}, {
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
					},
					{
						'id': 11,
						'state': false
					}, {
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
					}, {
						'id': 18,
						'state': false
					}, {
						'id': 19,
						'state': false
					}, {
						'id': 20,
						'state': false
					},
					{
						'id': 21,
						'state': false
					}, {
						'id': 22,
						'state': false
					}, {
						'id': 23,
						'state': false
					}, {
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
					}, {
						'id': 28,
						'state': false
					}, {
						'id': 29,
						'state': false
					}, {
						'id': 30,
						'state': false
					},
					{
						'id': 31,
						'state': false
					}, {
						'id': 32,
						'state': false
					}, {
						'id': 33,
						'state': false
					}
				];
				this.redDallIdx = 0;
				this.blueDallIdx = 0;
				this.tuoDallIdx = 0;
				this.danDallIdx = 0;
			},

		},

	}

	function formatDuring(mss) {
		var days = parseInt(mss / (1000 * 60 * 60 * 24));
		var hours = parseInt((mss % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60));
		var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = parseInt((mss % (1000 * 60)) / 1000);
		return [days, hours, minutes, seconds]
	};
</script>

<style scoped>
	@import "../../css/goucai_szc.css";

	#mc_ssq {
		margin-top: 2.25rem;
	}
</style>
