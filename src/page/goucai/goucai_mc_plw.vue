<template>
	<div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" tapmode @click="closeWin()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div>
				<div class="aui-title"><span>排列五</span> </div>
			</div>
			<div class="aui-pull-right aui-btn top-more" @click="menuPage()" tapmode>
				<span></span><span></span><span></span>
			</div>
		</header>

		<div id="mc_plw" v-cloak>

			<!-- 菜单 -->
			<div v-show="topMenu" class="topMenu" @click='hidemoc()'>
				<ul>
					<li @click='toyilou()'>遗漏投注</li>
					<li @click='fenx()'>分享</li>
					<li @click='toHeMai()'>合买</li>
					<li @click='toPlay("pl5")'>玩法</li>
				</ul>
			</div>
            <!-- 分享模态框 -->
            <div v-if="shareStatue" class="share_box" @click="hideShare()">
                <div class="share_cont">
                    <div class="quxiao">取消</div>
                    <div class="down" onclick="openDownload()">前往下载</div>
                </div>
            </div>
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

			<!-- 内容 -->
			<div class="mc_cont mc_cont2">
				<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
				<div class="yaoyiyao" tapmode @click="Random()">
					<p>摇一摇机选</p>
				</div>
				<div class="jieshao">按位猜对开奖号即中100000元</div>
				<div class="wanwei">
					<div class="titl">
						<div>请至少选1个号码</div>
					</div>
					<div class="battle battle_red">
						<div class="battle_icon flr">万位<div class="right_arror"></div>
						</div>
						<div class="battle_shuz flr">
							<ul>
								<template v-for="(item,index) in wanWeiList">
									<li :class="{ 'active': item.state }" tapmode @click="setwanWeiList(index)"><span class="sp1">{{ item.id }}</span><span
										 class="sp2" v-if="yilou">{{oneyilouData[index]}}</span></li>
								</template>
								<li style="border: 0;"></li>
								<li style="border: 0;"></li>
							</ul>
						</div>
					</div>
				</div>
				<div class="qianwei">
					<div class="titl">
						<div>请至少选1个号码</div>
					</div>
					<div class="battle battle_red">
						<div class="battle_icon flr">千位<div class="right_arror"></div>
						</div>
						<div class="battle_shuz flr">
							<ul>
								<template v-for="(item,index) in qianWeiList">
									<li :class="{ 'active': item.state }" tapmode @click="setqianWeiList(index)"><span class="sp1">{{ item.id }}</span><span
										 class="sp2" v-if="yilou">{{ twoyilouData[index] }}</span></li>
								</template>
								<li style="border: 0;"></li>
								<li style="border: 0;"></li>
							</ul>
						</div>
					</div>
				</div>
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
										 class="sp2" v-if="yilou">{{ threeyilouData[index] }}</span></li>
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
										 class="sp2" v-if="yilou">{{fouryilouData[index]}}</span></li>
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
										 class="sp2" v-if="yilou">{{fiveyilouData[index]}}</span></li>
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
<!-- 		<footer>
			<div class="ft_money flr">共<span>{{totalNum}}</span>注<span>{{totalPrice}}</span>元</div>
			<div class="ft_btn fgr">
				<div class="flr" tapmode @click="setClearList()">清除</div>
				<div class="flr" tapmode @click="pay()">投注<span v-if="betConlength > 0" class="pay_b">{{ betConlength > 99?"99":betConlength }}</span></div>
			</div>
		</footer> -->
	</div>
</template>

<script>
    import checkokNav from '../../common/checkok.vue';
	var interval;
	var scrollTops;
	var operationType;
	var allyilouData;
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
		openDownload
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
				var gpc_hbks = document.querySelector("#mc_plw");
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
							gpc_hbks.style.height = heig+"px";
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
                logok: false,  //未实名标志
				bgzhuanhuan:false,//箭头控制
                shareStatue: false,  //分享状态
				nowTime: 0, //开始时间
				EndTime: 0, //结束时间
				periodNumber: 0, //期数
				totalNum: 0, //注数
				totalPrice: 0, //金额
				wanweiarr: [], //万位数组
				qianweiarr: [], //千位数组
				baiweiarr: [], //百位数组
				shiweiarr: [], //十位数组
				geweiarr: [], //个位数组
				wnums: 0, //万位球个数
				qnums: 0, //千位球个数
				bnums: 0, //百位球个数
				snums: 0, //十位球个数
				gnums: 0, //个位球个数
				oneyilouData: [], //万位遗漏
				twoyilouData: [], //千位遗漏
				threeyilouData: [], //百位位遗漏
				fouryilouData: [], //十位遗漏
				fiveyilouData: [], //个位遗漏
				ptDom: true,
				dtDom: false,
				surTimedays: 0,
				surTimehours: 0,
				surTimeminutes: 0,
				surTimeseconds: 0,
				yilou: false,
				PastPerShow: true,
				ccarray: [],
				title: true, //当前期是否截止
				addlist: '', //继续选号回来的存数组
				addset: '', //继续编辑数组
				HistoryDraws: [],
				betConlength: 0,
				wanWeiList: [{
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
				}],
				qianWeiList: [{
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
				}],
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
				}],
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
				}],
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
				}],
			
				redDallIdx: 0,
				
				navTab: false,
				topMenu: false,
			};
		},
		created() {
            if (getCookie('logok')) {  //判断是否实名
                this.logok = true;
            }
			if (getSession('play')) {
				this.redDallIdx = getSession('play');
				
			} else {
				setSession('play', "0");
				
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
			 window.openDownload=openDownload;
		},
							filters: {
		numberFormat: function(number) {
			var data = Math.floor(number * 100) / 100;
			return data.toFixed(2);
		}
		},
		methods:{
			xiedajian:function(num){
				if (num==0) {
					this.bgzhuanhuan=true
				}else{
					this.bgzhuanhuan=false;
				}	
			},
			changebg:function(){
				this.bgzhuanhuan=!this.bgzhuanhuan;
				var lastTen = document.querySelector(".last_ten");
				var gpc_hbks = document.querySelector("#mc_plw");
				if(this.bgzhuanhuan){
					var heig = document.documentElement.clientHeight - document.getElementsByTagName("header")[0].offsetHeight
					lastTen.style.height = "16rem";
					gpc_hbks.style.overflow = "hidden";
					gpc_hbks.style.height = heig + 'px';
				}else{
					lastTen.style.height = "0";
					gpc_hbks.removeAttribute("style");
				}
				
			},
            showbox:function(msg){
            	this.logok = msg;
            },
            logokbtn1: function() {  //前往实名
                this.logok = false;
                this.$router.push({
                    name: 'userinfo_task_real'
                })
            },
            logokbtn2: function() {  //取消实名
                this.logok = false;
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
					
						this.Random();
				
					}
					lastX = x;
					lastY = y;
					lastZ = z;
				}
			},
			toHeMai:function(){
				sessionStorage.removeItem('arr');
				sessionStorage.removeItem('play');
				sessionStorage.removeItem('name');
				sessionStorage.removeItem('continue');
				sessionStorage.removeItem('index');
					this.$router.push({
					name: 'heimai_lobby'
				})
			},
			toPlay(){	//	玩法
				// sessionStorage.setItem('play',document.querySelector('.aui-title').innerText);
				// location.href = 'http://www.baidu.com';
				this.$router.push({
					path:"/goucai/play",
					query:{
						isApp:'0',
						dataType:"pl5"
					}

				})
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
			  var setnum = 10;
            for (var i = 0; i < setnum; i++) {
                for (var n = 0; n < this.addset[index].wanweiarr.length; n++) {
                    if (this.addset[index].wanweiarr[n] == this.wanWeiList[i].id) {
                        this.wanWeiList[i].state = true;
                        this.wnums++;
                        this.wanweiarr = this.addset[index].wanweiarr;
                    }
                }
                for (var n = 0; n < this.addset[index].qianweiarr.length; n++) {
                    if (this.addset[index].qianweiarr[n] == this.qianWeiList[i].id) {
                        this.qianWeiList[i].state = true;
                        this.qnums++;
                        this.qianweiarr = this.addset[index].qianweiarr;
                    }
                }

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

            }
				console.log(this.heZhiarr);
		
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
            fenx: function(){   //分享
                this.shareStatue = true;
            },
            hideShare: function(){
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
				this.wnums = 0;
				this.qnums = 0;
				this.bnums = 0;
				this.snums = 0;
				this.gnums = 0;
				this.wanweiarr = [];
				this.qianweiarr = [];
				this.baiweiarr = [];
				this.shiweiarr = [];
				this.geweiarr = [];
				// 万位
				var rand1 = this.generateRandom(10)
				for (var i = 0; i < 10; i++) {
					this.wanWeiList[i].state = false
				}
				this.wanWeiList[rand1].state = true
				this.wnums++;
				this.wanweiarr.push(this.wanWeiList[rand1].id);
				// 千位
				var rand2 = this.generateRandom(10)
				for (var i = 0; i < 10; i++) {
					this.qianWeiList[i].state = false
				}
				this.qianWeiList[rand2].state = true
				this.qnums++;
				this.qianweiarr.push(this.qianWeiList[rand2].id);
				// 百位
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

				if (this.wnums < 1 || this.qnums < 1 || this.bnums < 1 || this.snums < 1 || this.gnums < 1) {
					this.totalNum = 0;
					this.totalPrice = 0
				} else {
					this.totalNum = parseInt(this.wnums * this.qnums * this.bnums * this.snums * this.gnums);
					this.totalPrice = this.totalNum * 2;
				}

			},
			setwanWeiList: function(idx) {

				if (this.wanWeiList[idx].state) {
					this.wanWeiList[idx].state = false;
					this.wnums--;
					for (var i = 0; i < this.wanweiarr.length; i++) {
						if (this.wanweiarr[i] == this.wanWeiList[idx].id) {
							this.wanweiarr.splice(i, 1);
						}
					}
				} else {
					  if(operationType==1){
                    if(this.totalNum==1){
                      Toast('单式投注单笔订单不能携带复式投注');
                      return
                    }else if (this.snums>1&&this.gnums>0&&this.qnums>0&&this.bnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                      Toast('单式投注单笔订单只能选择1个十位');
                        return
                    }else if (this.snums>0&&this.gnums>1&&this.qnums>0&&this.bnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                        Toast('单式投注单笔订单只能选择1个个位');
                        return
                    }else if (this.snums>0&&this.gnums>0&&this.qnums>1&&this.bnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                        Toast('单式投注单笔订单只能选择1个千位');
                        return
                    }else if (this.snums>0&&this.gnums>0&&this.qnums>0&&this.bnums>1) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                      Toast('单式投注单笔订单只能选择1个百位');
                        return
                    }
                  }else if (operationType==2) {
                    if(this.addset.length>1&&this.totalNum>0){
                        Toast('单式投注单笔订单不能携带复式投注');
                          return
                    }else if (this.addset.length>1&&this.snums>1&&this.gnums>0&&this.qnums>0&&this.bnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                      Toast('单式投注单笔订单只能选择1个十位');
                        return
                    }else if (this.addset.length>1&&this.snums>0&&this.gnums>1&&this.qnums>0&&this.bnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                        Toast('单式投注单笔订单只能选择1个个位');
                        return
                    }else if (this.addset.length>1&&this.snums>0&&this.gnums>0&&this.qnums>1&&this.bnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                        Toast('单式投注单笔订单只能选择1个千位');
                        return
                    }else if (this.addset.length>1&&this.snums>0&&this.gnums>0&&this.qnums>0&&this.bnums>1) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                      Toast('单式投注单笔订单只能选择1个百位');
                        return
                    }

                  }
					this.wanWeiList[idx].state = true
					this.wnums++;
					this.wanweiarr.push(this.wanWeiList[idx].id);
				}
				if (this.wnums < 1 || this.qnums < 1 || this.bnums < 1 || this.snums < 1 || this.gnums < 1) {
					this.totalNum = 0;
					this.totalPrice = 0
				} else {
					this.totalNum = parseInt(this.wnums * this.qnums * this.bnums * this.snums * this.gnums);
					this.totalPrice = this.totalNum * 2;
				}
				
			},
			setqianWeiList: function(idx) {


				if (this.qianWeiList[idx].state) {
					this.qianWeiList[idx].state = false;
					this.qnums--;
					for (var i = 0; i < this.qianweiarr.length; i++) {
						if (this.qianweiarr[i] == this.qianWeiList[idx].id) {
							this.qianweiarr.splice(i, 1);
						}
					}
				} else {
					if(operationType==1){
                    if(this.totalNum==1){
                      Toast('单式投注单笔订单不能携带复式投注');
                      return
                    }else if (this.snums>1&&this.gnums>0&&this.wnums>0&&this.bnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                      Toast('单式投注单笔订单只能选择1个十位');
                        return
                    }else if (this.snums>0&&this.gnums>1&&this.wnums>0&&this.bnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                      Toast('单式投注单笔订单只能选择1个个位');
                        return
                    }else if (this.snums>0&&this.gnums>0&&this.wnums>1&&this.bnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                      Toast('单式投注单笔订单只能选择1个万位');
                        return
                    }else if (this.snums>0&&this.gnums>0&&this.wnums>0&&this.bnums>1) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                      Toast('单式投注单笔订单只能选择1个百位');
                        return
                    }
                  }else if (operationType==2) {
                    if(this.addset.length>1&&this.totalNum>0){
                        Toast('单式投注单笔订单不能携带复式投注');
                          return
                    }else if (this.addset.length>1&&this.snums>1&&this.gnums>0&&this.wnums>0&&this.bnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                      Toast('单式投注单笔订单只能选择1个十位');
                        return
                    }else if (this.addset.length>1&&this.snums>0&&this.gnums>1&&this.wnums>0&&this.bnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                      Toast('单式投注单笔订单只能选择1个个位');
                        return
                    }else if (this.addset.length>1&&this.snums>0&&this.gnums>0&&this.wnums>1&&this.bnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                      Toast('单式投注单笔订单只能选择1个万位');
                        return
                    }else if (this.addset.length>1&&this.snums>0&&this.gnums>0&&this.wnums>0&&this.bnums>1) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                      Toast('单式投注单笔订单只能选择1个百位');
                        return
                    }
                  }
					this.qianWeiList[idx].state = true
					this.qnums++;
					this.qianweiarr.push(this.qianWeiList[idx].id);
				}
				if (this.wnums < 1 || this.qnums < 1 || this.bnums < 1 || this.snums < 1 || this.gnums < 1) {
					this.totalNum = 0;
					this.totalPrice = 0
				} else {
					this.totalNum = parseInt(this.wnums * this.qnums * this.bnums * this.snums * this.gnums);
					this.totalPrice = this.totalNum * 2;
				}
				
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
					if(operationType==1){
                    if(this.totalNum==1){
                      Toast('单式投注单笔订单不能携带复式投注');
                      return
                    }else if (this.snums>1&&this.gnums>0&&this.qnums>0&&this.wnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                      Toast('单式投注单笔订单只能选择1个十位');
                        return
                    }else if (this.snums>0&&this.gnums>1&&this.qnums>0&&this.wnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                      Toast('单式投注单笔订单只能选择1个个位');
                        return
                    }else if (this.snums>0&&this.gnums>0&&this.qnums>1&&this.wnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                        Toast('单式投注单笔订单只能选择1个千位');
                        return
                    }else if (this.snums>0&&this.gnums>0&&this.qnums>0&&this.wnums>1) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                      Toast('单式投注单笔订单只能选择1个万位');
                        return
                    }
                  }else if (operationType==2) {
                    if(this.addset.length>1&&this.totalNum>0){
                        Toast('单式投注单笔订单不能携带复式投注');
                          return
                    }else if (this.addset.length>1&&this.snums>1&&this.gnums>0&&this.qnums>0&&this.wnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                      Toast('单式投注单笔订单只能选择1个十位');
                        return
                    }else if (this.addset.length>1&&this.snums>0&&this.gnums>1&&this.qnums>0&&this.wnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                      Toast('单式投注单笔订单只能选择1个个位');
                        return
                    }else if (this.addset.length>1&&this.snums>0&&this.gnums>0&&this.qnums>1&&this.wnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                        Toast('单式投注单笔订单只能选择1个千位');
                        return
                    }else if (this.addset.length>1&&this.snums>0&&this.gnums>0&&this.qnums>0&&this.wnums>1) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                      Toast('单式投注单笔订单只能选择1个万位');
                        return
                    }

                  }
					this.baiWeiList[idx].state = true;
					this.bnums++;
					this.baiweiarr.push(this.baiWeiList[idx].id);
				}
				if (this.wnums < 1 || this.qnums < 1 || this.bnums < 1 || this.snums < 1 || this.gnums < 1) {
					this.totalNum = 0;
					this.totalPrice = 0
				} else {
					this.totalNum = parseInt(this.wnums * this.qnums * this.bnums * this.snums * this.gnums);
					this.totalPrice = this.totalNum * 2;
				}

			},
			setshiWeiList: function(idx) {
				
				if (this.shiWeiList[idx].state) {
					this.shiWeiList[idx].state = false;
					this.snums--;
					for (var i = 0; i < this.shiweiarr.length; i++) {
						if (this.shiweiarr[i] == this.shiWeiList[idx].id) {
							this.shiweiarr.splice(i, 1);
						}
					}
				} else {
					  if(operationType==1){
                    if(this.totalNum==1){
                      Toast('单式投注单笔订单不能携带复式投注');
                      return
                    }else if (this.wnums>1&&this.gnums>0&&this.qnums>0&&this.bnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                      Toast('单式投注单笔订单只能选择1个万位');
                        return
                    }else if (this.wnums>0&&this.gnums>1&&this.qnums>0&&this.bnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                      Toast('单式投注单笔订单只能选择1个个位');
                        return
                    }else if (this.wnums>0&&this.gnums>0&&this.qnums>1&&this.bnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                        Toast('单式投注单笔订单只能选择1个千位');
                        return
                    }else if (this.wnums>0&&this.gnums>0&&this.qnums>0&&this.bnums>1) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                      Toast('单式投注单笔订单只能选择1个百位');
                        return
                    }
                  }else if (operationType==2) {
                    if(this.addset.length>1&&this.totalNum>0){
                        Toast('单式投注单笔订单不能携带复式投注');
                          return
                    }else if (this.addset.length>1&&this.wnums>1&&this.gnums>0&&this.qnums>0&&this.bnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                      Toast('单式投注单笔订单只能选择1个万位');
                        return
                    }else if (this.addset.length>1&&this.wnums>0&&this.gnums>1&&this.qnums>0&&this.bnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                      Toast('单式投注单笔订单只能选择1个个位');
                        return
                    }else if (this.addset.length>1&&this.wnums>0&&this.gnums>0&&this.qnums>1&&this.bnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                        Toast('单式投注单笔订单只能选择1个千位');
                        return
                    }else if (this.addset.length>1&&this.wnums>0&&this.gnums>0&&this.qnums>0&&this.bnums>1) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                      Toast('单式投注单笔订单只能选择1个百位');
                        return
                    }

                  }
					this.shiWeiList[idx].state = true;
					this.snums++;
					this.shiweiarr.push(this.shiWeiList[idx].id);
				}
				if (this.wnums < 1 || this.qnums < 1 || this.bnums < 1 || this.snums < 1 || this.gnums < 1) {
					this.totalNum = 0;
					this.totalPrice = 0
				} else {
					this.totalNum = parseInt(this.wnums * this.qnums * this.bnums * this.snums * this.gnums);
					this.totalPrice = this.totalNum * 2;
				}

			},
			setgeWeiList: function(idx) {
			
				if (this.geWeiList[idx].state) {
					this.geWeiList[idx].state = false;
					this.gnums--;
					for (var i = 0; i < this.geweiarr.length; i++) {
						if (this.geweiarr[i] == this.geWeiList[idx].id) {
							this.geweiarr.splice(i, 1);
						}
					}
				} else {
					  if(operationType==1){
                    if(this.totalNum==1){
                      Toast('单式投注单笔订单不能携带复式投注');
                      return
                    }else if (this.snums>1&&this.wnums>0&&this.qnums>0&&this.bnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                        Toast('单式投注单笔订单只能选择1个十位');
                        return
                    }else if (this.snums>0&&this.wnums>1&&this.qnums>0&&this.bnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                        Toast('单式投注单笔订单只能选择1个万位');
                        return
                    }else if (this.snums>0&&this.wnums>0&&this.qnums>1&&this.bnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                        Toast('单式投注单笔订单只能选择1个千位');
                        return
                    }else if (this.snums>0&&this.wnums>0&&this.qnums>0&&this.bnums>1) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                        Toast('单式投注单笔订单只能选择1个百位');
                        return
                    }
                  }else if (operationType==2) {
                    if(this.addset.length>1&&this.totalNum>0){
                        Toast('单式投注单笔订单不能携带复式投注');
                          return
                    }else if (this.addset.length>1&&this.snums>1&&this.wnums>0&&this.qnums>0&&this.bnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                        Toast('单式投注单笔订单只能选择1个十位');
                        return
                    }else if (this.addset.length>1&&this.snums>0&&this.wnums>1&&this.qnums>0&&this.bnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                        Toast('单式投注单笔订单只能选择1个万位');
                        return
                    }else if (this.addset.length>1&&this.snums>0&&this.wnums>0&&this.qnums>1&&this.bnums>0) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                        Toast('单式投注单笔订单只能选择1个千位');
                        return
                    }else if (this.addset.length>1&&this.snums>0&&this.wnums>0&&this.qnums>0&&this.bnums>1) {
                      // Toast('单式投注单笔订单不能携带复式投注');
                        Toast('单式投注单笔订单只能选择1个百位');
                        return
                    }

                  }
					this.geWeiList[idx].state = true;
					this.gnums++;
					this.geweiarr.push(this.geWeiList[idx].id);
				}
				if (this.wnums < 1 || this.qnums < 1 || this.bnums < 1 || this.snums < 1 || this.gnums < 1) {
					this.totalNum = 0;
					this.totalPrice = 0
				} else {
					this.totalNum = parseInt(this.wnums * this.qnums * this.bnums * this.snums * this.gnums);
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

                this.totalNum = 0;
                this.totalPrice = 0;
                this.wnums = 0;
                this.qnums = 0;
                this.bnums = 0;
                this.snums = 0;
                this.gnums = 0;
                this.wanweiarr = [];
                this.qianweiarr = [];
                this.baiweiarr = [];
                this.shiweiarr = [];
                this.geweiarr = [];
                for (var i = 0; i < 10; i++) {
                    this.wanWeiList[i].state = false
                    this.qianWeiList[i].state = false
                    this.baiWeiList[i].state = false
                    this.shiWeiList[i].state = false
                    this.geWeiList[i].state = false
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
				// 	if(this.totalNum>100){
				//   Toast('注单数量最多100注!');
				//   return false;
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

					setSession('arr', obj);
					sessionStorage.removeItem('continue');
					sessionStorage.removeItem('index');
					window.removeEventListener('devicemotion', this.motionHandler, false);
					operationType = 0;
					this.$router.push({
						path: '/goucai/goucai_mc_plwpay',
					})
				} else {

					if (this.wnums < 1) {
						Toast("至少选择1个万位数字");
						return false;
					}
					if (this.qnums < 1) {
						Toast("至少选择1个千位数字");
						return false;
					}
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

					if (this.wnums >= 1 && this.qnums >= 1 && this.bnums >= 1 && this.snums >= 1 && this.gnums >= 1) {
						this.wanweiarr = this.wanweiarr.sort(compare);
						this.qianweiarr = this.qianweiarr.sort(compare);
						this.baiweiarr = this.baiweiarr.sort(compare);
						this.shiweiarr = this.shiweiarr.sort(compare);
						this.geweiarr = this.geweiarr.sort(compare);
						if (this.addlist.length > 0) {
							console.log(5);
							this.addlist.push({
								playMethod: "normal",
								playType: "p5Direct",
								wanweiarr: this.wanweiarr,
								qianweiarr: this.qianweiarr,
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
								playType: "p5Direct",
								wanweiarr: this.wanweiarr,
								qianweiarr: this.qianweiarr,
								baiweiarr: this.baiweiarr,
								shiweiarr: this.shiweiarr,
								geweiarr: this.geweiarr,
								totalNum: this.totalNum
							};
							data = this.addset;

						} else {
							data = [{
								playMethod: "normal",
								playType: "p5Direct",
								wanweiarr: this.wanweiarr,
								qianweiarr: this.qianweiarr,
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

						setSession('arr', obj);
						sessionStorage.removeItem('continue');
						sessionStorage.removeItem('index');
						window.removeEventListener('devicemotion', this.motionHandler, false);
						operationType = 0;
						this.$router.push({
							path: '/goucai/goucai_mc_plwpay',
						})
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
										this.oneyilouData.push(allyilouData.pl5Direct["oneBall" + i + "Miss"]);
										this.twoyilouData.push(allyilouData.pl5Direct["twoBall" + i + "Miss"]);
										this.threeyilouData.push(allyilouData.pl5Direct["threeBall" + i + "Miss"]);
										this.fouryilouData.push(allyilouData.pl5Direct["fourBall" + i + "Miss"]);
										this.fiveyilouData.push(allyilouData.pl5Direct["fiveBall" + i + "Miss"]);
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
							console.log(content);
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
								console.log(JSON.stringify(this.HistoryDraws) );
								EventUtil.listenTouchDirection(document.getElementById("mc_plw"))
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

	#mc_plw {
		margin-top: 2.25rem;
			margin-bottom: 2.5rem;
	}
</style>
