<template>
	<div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="closeWin()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div>
				<div class="aui-title" @click="ChoiceType()"><span>大乐透</span> <span id="pagetitle">{{name}}</span> <img src="../../assets/goucai/jjc/xiajiantou.png" /></div>
			</div>
			<div class="aui-pull-right aui-btn top-more" @click="menuPage()" tapmode>
				<span></span><span></span><span></span>
			</div>
		</header>
		<div id="mc_dlt" >

			<!-- 购彩类型 -->
			<div class="nav-Tab" @click="hideChoice()" v-if='navTab'>
				<div class="list">
					<li :class="{ select: play == item.play }" v-for='item in typeList' @click="setChoice(item.play,item.name)"
					 tapmode>{{ item.name }}</li>
				</div>
			</div>
			<!-- 菜单 -->
			<div class="topMenu" @click='hidemoc()' v-if="topMenu">
				<ul>
					<li @click='toyilou()'>遗漏投注</li>
					<li @click='fenx()'>分享</li>
					<li @click='toHeMai()'>合买</li>
					<li @click='toPlay("dlt")'>玩法</li>
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
								<td><span v-for="thal in item.result[0]">{{ thal }}</span><span>{{ item.result[1] }}</span></td>
							</tr>
						</tbody>
					</table>
				</div>

				<!-- 内容 -->
				<div class="mc_cont" v-if='play=="normal"'>
					<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
					<div class="yaoyiyao" tapmode @click="Random()">
						<p>摇一摇机选</p>
					</div>
					<div class="titl">
						<div class="flr red">红球：</div>
						<div class="fgr">请至少选择5个</div>
					</div>
					<div class="battle battle_red">
						<ul>
							<template v-for="(item,index) in redDallList">
								<li :class="{ 'active': item.state }" tapmode @click="setredDallList(index)"><span class="sp1">{{ item.id }}</span><span
									 class="sp2" v-if="yilou">{{ redMiss[index] }}</span></li>
							</template>
						</ul>
					</div>

					<div class="titl">
						<div class="flr blue">蓝球：</div>
						<div class="fgr">请至少选择2个</div>
					</div>
					<div class="battle battle_blue">
						<ul>
							<template v-for="(item,index) in blueDallList">
								<li :class="{ 'active': item.state }" tapmode @click="setblueDallList(index)"><span class="sp1">{{ item.id }}</span><span
									 class="sp2" v-if="yilou">{{ blueMiss[index] }}</span></li>
							</template>
							<li style="border: 0;"></li>
							<li style="border: 0;"></li>
						</ul>
					</div>
				</div>
				<!-- 内容 -->
				<div class="mc_cont last_cont" v-if='play=="duplex"'>
					<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
					<div class="titl">
						<div class="flr red">胆码区-前区</div>
						<div class="fgr">请至少选择1个，最多4个</div>
					</div>
					<div class="battle battle_red">
						<ul>
							<template v-for="(item,index) in danQianDallList">
								<li :class="{ 'active': item.state }" tapmode @click="setdanQianList(index)"><span class="sp1">{{ item.id }}</span><span
									 class="sp2" v-if="yilou">{{ redMiss[index] }}</span></li>
							</template>
						</ul>
					</div>

					<div class="titl">
						<div class="flr blue">胆码区-后区</div>
						<div class="fgr">请至多选择1个</div>
					</div>
					<div class="battle battle_blue">
						<ul>
							<template v-for="(item,index) in danHouDallList">
								<li :class="{ 'active': item.state }" tapmode @click="setdanHouList(index)"><span class="sp1">{{ item.id }}</span><span
									 class="sp2" v-if="yilou">{{ blueMiss[index] }}</span></li>
							</template>
							<li style="border: 0;"></li>
							<li style="border: 0;"></li>
						</ul>
					</div>

					<div class="titl">
						<div class="flr red">拖码区-前区</div>
						<div class="fgr">至少选择5个</div>
					</div>
					<div class="battle battle_red">
						<ul>
							<template v-for="(item,index) in tuoQianDallList">
								<li :class="{ 'active': item.state }" tapmode @click="settuoQianList(index)"><span class="sp1">{{ item.id }}</span><span
									 class="sp2" v-if="yilou">{{ redMiss[index]  }}</span></li>
							</template>
						</ul>
					</div>

					<div class="titl">
						<div class="flr blue">拖码区-后区</div>
						<div class="fgr">请至少选择2个</div>
					</div>
					<div class="battle battle_blue">
						<ul>
							<template v-for="(item,index) in tuoHouDallList">
								<li :class="{ 'active': item.state }" tapmode @click="settuoHouList(index)"><span class="sp1">{{ item.id }}</span><span
									 class="sp2" v-if="yilou">{{ blueMiss[index] }}</span></li>
							</template>
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
					<div class="flr" tapmode @click="open_dltpay()">投注<span v-if="betConlength > 0" class="pay_b">{{ betConlength > 99?"99":betConlength }}</span></div>
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
					<div class="flr" tapmode @click="open_dltpay()">投注<span v-if="betConlength > 0" class="pay_b">{{ betConlength > 99?"99":betConlength }}</span></div>
				</div>
			</footer>
		</div>
	</div>
</template>

<script>
    import checkokNav from '../../common/checkok.vue';
var compileNum=false;
var indexs;
var interval;
var scrollTops;
var operationType;
const SHAKE_SPEED = 300;
	let lastTime = 0;//上次变化的时间
	let x =0,y=0,z=0,lastX =0,lastY=0,lastZ=0;//位置变量初始化
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
				var gpc_hbks = document.querySelector("#mc_dlt");
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
    current:0,
    betConlength:0,
    nowTime:0,
    EndTime:0,
    surTimedays: 0,
    surTimehours: 0,
    surTimeminutes: 0,
    surTimeseconds: 0,
    totalNum:0,
    totalPrice:0,
    yilou: false,
    PastPerShow: true,
    playType:'normal',
    selectedArr:[],
    blueMiss:[],
    redMiss:[],
    ccarray: [],
    HistoryDraws: [],
    typeList: [{'id': '0','name': '普通','play': 'normal'},{'id': '1','name': '胆拖','play': 'duplex'}],
    redDallList: [{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false},{'id':10,'state':false},
                  {'id':11,'state':false},{'id':12,'state':false},{'id':13,'state':false},{'id':14,'state':false},{'id':15,'state':false},{'id':16,'state':false},{'id':17,'state':false},{'id':18,'state':false},{'id':19,'state':false},{'id':20,'state':false},
                  {'id':21,'state':false},{'id':22,'state':false},{'id':23,'state':false},{'id':24,'state':false},{'id':25,'state':false},{'id':26,'state':false},{'id':27,'state':false},{'id':28,'state':false},{'id':29,'state':false},{'id':30,'state':false},
                  {'id':31,'state':false},{'id':32,'state':false},{'id':33,'state':false},{'id':34,'state':false},{'id':35,'state':false}],

    blueDallList: [{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false},{'id':10,'state':false},
                  {'id':11,'state':false},{'id':12,'state':false}],

    danQianDallList: [{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false},{'id':10,'state':false},
                  {'id':11,'state':false},{'id':12,'state':false},{'id':13,'state':false},{'id':14,'state':false},{'id':15,'state':false},{'id':16,'state':false},{'id':17,'state':false},{'id':18,'state':false},{'id':19,'state':false},{'id':20,'state':false},
                  {'id':21,'state':false},{'id':22,'state':false},{'id':23,'state':false},{'id':24,'state':false},{'id':25,'state':false},{'id':26,'state':false},{'id':27,'state':false},{'id':28,'state':false},{'id':29,'state':false},{'id':30,'state':false},
                  {'id':31,'state':false},{'id':32,'state':false},{'id':33,'state':false},{'id':34,'state':false},{'id':35,'state':false}],

    danHouDallList: [{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false},{'id':10,'state':false},
                  {'id':11,'state':false},{'id':12,'state':false}],

    tuoQianDallList: [{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false},{'id':10,'state':false},
                  {'id':11,'state':false},{'id':12,'state':false},{'id':13,'state':false},{'id':14,'state':false},{'id':15,'state':false},{'id':16,'state':false},{'id':17,'state':false},{'id':18,'state':false},{'id':19,'state':false},{'id':20,'state':false},
                  {'id':21,'state':false},{'id':22,'state':false},{'id':23,'state':false},{'id':24,'state':false},{'id':25,'state':false},{'id':26,'state':false},{'id':27,'state':false},{'id':28,'state':false},{'id':29,'state':false},{'id':30,'state':false},
                  {'id':31,'state':false},{'id':32,'state':false},{'id':33,'state':false},{'id':34,'state':false},{'id':35,'state':false}],

    tuoHouDallList: [{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false},{'id':10,'state':false},
                  {'id':11,'state':false},{'id':12,'state':false}],
    redDallIdx: 0,
    blueDallIdx: 0,
    tuoQianIdx: 0,
    danDallIdx: 0,
    danBlueNum: 0,
    tuoBlueNum: 0,
	id: '0',
	name: '普通',
	play: 'normal',
	navTab: false,
	topMenu: false,
			};
		},
		created() {
            if (getCookie('logok')) {  //判断是否实名
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
			if(getSession('arr')){
				if(getSession('continue')=='continue'){
					if (getSession('arr').length > 0) {
						operationType = 1; //2编辑当前注 1继续选号
					}
					this.continueFun();
				}else if(getSession('continue')=='compile'){
					operationType = 2; //2编辑当前注 1继续选号
					this.compileFun();
				}
			}
		},
		mounted() {
			if(window.DeviceMotionEvent) {
			     window.addEventListener('devicemotion',this.motionHandler, false);
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
				var gpc_hbks = document.querySelector("#mc_dlt");
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
			toHeMai:function(){
				sessionStorage.removeItem('shaixuan');
				sessionStorage.removeItem('arr');
				this.$router.push({
					name:'heimai_lobby',
				})
			},
			toPlay(){	//	玩法
				// sessionStorage.setItem('play',document.querySelector('.aui-title').innerText);
				// location.href = 'http://www.baidu.com';
				this.$router.push({
					path:"/goucai/play",
					query:{
						isApp:'0',
						dataType:"dlt"
					}

				})
			},
			motionHandler:function  (event) {//摇一摇
			    let acceleration = event.accelerationIncludingGravity;
			    let curTime = Date.now();//取得当前时间
			    if ((curTime - lastTime) > 120) {
			      let diffTime = curTime - lastTime;
			      lastTime = curTime;
			      x = acceleration.x;
			      y = acceleration.y;
			      z = acceleration.z;
			      //计算摇动速度
			      let speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 1000;
			      if (speed > SHAKE_SPEED) {
			        this.Random();//摇一摇触发随机事件
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
				window.removeEventListener('devicemotion',this.motionHandler, false)
				this.$router.go(-1);
			},
			continueFun:function(){
				let arr=getSession('arr');
          this.selectedArr=arr;
           this.betConlength=arr.length;
			},
			compileFun:function(){
				var arr=getSession('arr');
     this.selectedArr=arr;
     this.betConlength=arr.length-1;
     compileNum=true;
     indexs=getSession('index');
     if (this.play=='normal') {
       var arrs= arr[indexs];
       console.log(JSON.stringify(arrs));
       this.redDallIdx=arrs.redQiu.length;
       this.blueDallIdx= arrs.blueQiu.length;
       this.totalNum=arrs.totalNum;
       this.totalPrice=parseInt(arrs.totalNum)*2;
       for (var i = 0; i<arrs.redQiu.length; i++) {
         for (var n = 0; n < this.redDallList.length; n++) {
           if (arrs.redQiu[i]==this.redDallList[n].id) {
             this.redDallList[n].state=true;
           }
         }
       };
       for (var x = 0; x < arrs.blueQiu.length; x++) {
         for (var y = 0; y < this.blueDallList.length; y++) {
           if (arrs.blueQiu[x]==this.blueDallList[y].id) {
             this.blueDallList[y].state=true;
           }
         }
       }
     }else {
       var arrs= arr[indexs];
       console.log(JSON.stringify(arrs));
       this.danDallIdx=arrs.redDanArr.length;
       this.danBlueNum= arrs.blueDanArr.length;
       this.tuoQianIdx=arrs.redTuoArr.length;
       this.tuoBlueNum= arrs.blueTuoArr.length;
       this.totalNum=arrs.totalNum;
       this.totalPrice=parseInt(arrs.totalNum)*2;
       for (var c = 0; c<arrs.redDanArr.length; c++) {
         for (var d = 0; d < this.danQianDallList.length; d++) {
           if (arrs.redDanArr[c]==this.danQianDallList[d].id) {
             this.danQianDallList[d].state=true;
           }
         }
       };
       for (var a = 0; a<arrs.redTuoArr.length; a++) {
         for (var b = 0; b < this.tuoQianDallList.length; b++) {
           if (arrs.redTuoArr[a]==this.tuoQianDallList[b].id) {
             this.tuoQianDallList[b].state=true;
           }
         }
       };
       for (var x = 0; x < arrs.blueDanArr.length; x++) {
         for (var y = 0; y < this.danHouDallList.length; y++) {
           if (arrs.blueDanArr[x]==this.danHouDallList[y].id) {
             this.danHouDallList[y].state=true;
           }
         }
       }
       for (var u = 0; u < arrs.blueTuoArr.length; u++) {
         for (var g = 0; g < this.tuoHouDallList.length; g++) {
           if (arrs.blueTuoArr[u]==this.tuoHouDallList[g].id) {
             this.tuoHouDallList[g].state=true;
           }
         }
       }
     }

			},
			ChoiceType: function() {
					if(getSession('arr')&&getSession('arr').length>0){
					Toast('请选择相同玩法进行投注！');
					return false
				}
				this.navTab = !this.navTab;
			},
    setChoice: function(play, name) {
		this.play = play;
		this.name = name;
   setSession('play', play);
   setSession('name', name);
   if(play=="normal"){
   	window.addEventListener('devicemotion',this.motionHandler, false);
   }else{
   	window.removeEventListener('devicemotion',this.motionHandler, false)
   }
   this.setClearList();
    },
    hideChoice: function() {
        this.navTab = false;
    },
    toyilou: function () {
      if (this.yilou) {
        this.yilou = false
      } else {
        this.yilou = true
      }
    },
	menuPage: function() {
		this.topMenu = !this.topMenu;
	},
    hidemoc: function() {
        this.topMenu = false;
    },
    fenx: function(){   //分享
        this.shareStatue = true;
    },
    hideShare: function(){
        this.shareStatue = false;
    },
    openDownload: function(){   //前往下载
        var newData = getCookie('newData');
        var link = OverallData().download
        if(newData){
            window.open(link+'?_userId='+newData.sportId);
        }else{
            window.open(link);
        }
    },
    // 随机选择
    Random: function () {
      this.redDallIdx = 0
      for(var i = 0 ; ; i++){
        if(this.ccarray.length<5){
            var rand1 = this.generateRandom(35)
            if (rand1 != null && rand1 < 35) {
              this.ccarray.push(rand1);
            }
          }else{
            break;
         }
      }
      for (var i = 0; i < 35; i++) {
        this.redDallList[i].state = false
      }
      for (var i = 0; i < 5; i++) {
        this.redDallList[this.ccarray[i]].state = true
        this.redDallIdx++
        console.log(this.redDallIdx);
      }
      this.ccarray = []
      //---
      for(var i = 0 ; ; i++){
        if(this.ccarray.length<2){
            var rand2 = this.generateRandom(12)
            if (rand2 != null && rand2 < 12) {
              this.ccarray.push(rand2);
            }
          }else{
            break;
         }
      }
      for (var i = 0; i < 12; i++) {
        this.blueDallList[i].state = false
      }
      for (var i = 0; i < 2; i++) {
        this.blueDallList[this.ccarray[i]].state = true
      }
      this.blueDallIdx=2;
      var rnums=this.redDallIdx;
      var bnums=this.blueDallIdx;
      if (rnums<5||bnums<2) {
        this.totalNum=0;
        this.totalPrice=0;
      }else {
          var totalNum=parseInt((getfactorial(rnums)/(getfactorial(rnums-5)*getfactorial(5)))*(getfactorial(bnums)/(getfactorial(bnums-2)*getfactorial(2))));
          this.totalNum=totalNum;
          this.totalPrice=totalNum*2;
      }
      
      
    },
    //   // 选择普通红球
    setredDallList: function (idx) {
      var state = this.redDallList[idx].state
      if (state) {
        this.redDallIdx--
        state = false
        this.redDallList[idx].state = state
      } else {
		  if (operationType == 1 && this.totalNum == 1) {
		  	Toast('单式投注单笔订单不能携带复式投注');
		  	return
		  } else if (operationType == 1 && this.blueDallIdx > 2 && this.redDallIdx > 3) {
		  	Toast('单式投注单只能选择1个蓝球');
		  	return
		  } else if (operationType == 2 && this.selectedArr.length > 1 && this.selectedArr[indexs].totalNum == 1 && this.totalNum ==1 ) {
		  	Toast('单式投注单笔订单不能携带复式投注');
		  	return
		  } else if (operationType == 2 && this.selectedArr.length > 1 && this.blueDallIdx > 2 && this.redDallIdx > 3) {
		  	// Toast('单式投注单笔订单不能携带复式投注');
		  	Toast('单式投注单只能选择1个蓝球');
		  	return
		  }
        state = true;
        if (this.redDallIdx < 20) {
          this.redDallIdx++
          this.redDallList[idx].state = state
        } else {
          Toast('最多选择20个')
        }
      };
      var rnums=this.redDallIdx;
      var bnums=this.blueDallIdx;
      if (rnums<5||bnums<2) {
        this.totalNum=0;
        this.totalPrice=0;
      }else {
          var totalNum=parseInt((getfactorial(rnums)/(getfactorial(rnums-5)*getfactorial(5)))*(getfactorial(bnums)/(getfactorial(bnums-2)*getfactorial(2))));
          this.totalNum=totalNum;
          this.totalPrice=totalNum*2;
      }
      
      
    },
    // 选择普通蓝球
    setblueDallList: function (idx) {
      var state = this.blueDallList[idx].state
      if (state) {
        this.blueDallIdx--;
        state = false
      } else {
		  if(operationType==1&&this.totalNum==1){
		    Toast('单式投注单笔订单不能携带复式投注');
		    return
		  }else if(operationType==1&&this.redDallIdx>5&&this.blueDallIdx>0){
		      Toast('单式投注单只能选择6个红球');
		    return
		  }else if (operationType==2&&this.selectedArr.length>1&&this.selectedArr[indexs].totalNum==1&&this.totalNum==1) {
		    Toast('单式投注单笔订单不能携带复式投注');
		    return
		  }else if (operationType==2&&this.selectedArr.length>1&&this.redDallIdx>5&&this.blueDallIdx>0) {
		    // Toast('单式投注单笔订单不能携带复式投注');
		      Toast('单式投注单只能选择6个红球');
		    return
		  }
        this.blueDallIdx++;
        state = true
      }
      this.blueDallList[idx].state = state;
      var rnums=this.redDallIdx;
      var bnums=this.blueDallIdx;
      if (rnums<5||bnums<2) {
        this.totalNum=0;
        this.totalPrice=0;
      }else {
          var totalNum=parseInt((getfactorial(rnums)/(getfactorial(rnums-5)*getfactorial(5)))*(getfactorial(bnums)/(getfactorial(bnums-2)*getfactorial(2))));
          this.totalNum=totalNum;
          this.totalPrice=totalNum*2;
      }
      
      
    },
    // 选择胆码红球
    setdanQianList: function (idx) {
        var state = this.danQianDallList[idx].state
        if (state) {
          this.danDallIdx--
          state = false
          this.danQianDallList[idx].state = state
        } else {
          state = true
          if (this.danDallIdx < 4) {
            this.danDallIdx++
            this.danQianDallList[idx].state = state
            if(this.tuoQianDallList[idx].state){
              this.tuoQianIdx--
              this.tuoQianDallList[idx].state = false
            }
          } else {
            Toast('最多选择4个')
          }
        };
        var drnums=this.danDallIdx,dbnums=this.danBlueNum,trnums=this.tuoQianIdx,tbnums=this.tuoBlueNum;
        if(drnums<1||dbnums<1||6-drnums>trnums||tbnums<2){
          this.totalNum=0;
          this.totalPrice=0;
        }else{
            var totalNum=parseInt(getfactorial(trnums)/(getfactorial(5-drnums)*getfactorial(trnums-5+drnums))*getfactorial(tbnums)/(getfactorial(2-dbnums)*getfactorial(tbnums-2+dbnums)));
            this.totalNum=totalNum;
            this.totalPrice=totalNum*2;
        }
        
        
    },
    // 选择胆码蓝球
    setdanHouList: function (idx) {
      var bb = true;
	  var isChosed;
      for (var i = 0; i < this.danHouDallList.length; i++) {
        if (this.danHouDallList[i].state) {
          bb = false;
		  isChosed=i;
        }
      }
      var state = this.danHouDallList[idx].state
      if (state) {
        this.danBlueNum--;
        state = false
      } else {
        if (bb) {
          state = true
            this.danBlueNum++;
            if (this.tuoHouDallList[idx].state) {
              this.tuoHouDallList[idx].state = false;
              this.tuoBlueNum--
            }

        } else {
			this.danHouDallList[isChosed].state = false;
			// this.danBlueNum--;
			 state = true
			  // this.danBlueNum++;
			  if (this.tuoHouDallList[idx].state) {
			    this.tuoHouDallList[idx].state = false;
			    this.tuoBlueNum--
			  }
          // Toast('最多选择1个')
        }
      }
      this.danHouDallList[idx].state = state;
      var drnums=this.danDallIdx,dbnums=this.danBlueNum,trnums=this.tuoQianIdx,tbnums=this.tuoBlueNum;
      if(drnums<1||dbnums<1||6-drnums>trnums||tbnums<2){
        this.totalNum=0;
        this.totalPrice=0;
      }else{
          var totalNum=parseInt(getfactorial(trnums)/(getfactorial(5-drnums)*getfactorial(trnums-5+drnums))*getfactorial(tbnums)/(getfactorial(2-dbnums)*getfactorial(tbnums-2+dbnums)));
          this.totalNum=totalNum;
          this.totalPrice=totalNum*2;
      }
      
      
    },
    // 选择拖码红球
    settuoQianList: function (idx) {
      var state = this.tuoQianDallList[idx].state
      if (state) {
        state = false
        this.tuoQianIdx--
        this.tuoQianDallList[idx].state = state
      } else {
        state = true
        if (this.tuoQianIdx < 20) {
          this.tuoQianIdx++
          this.tuoQianDallList[idx].state = state
          if (this.danQianDallList[idx].state) {
            this.danQianDallList[idx].state = false
            this.danDallIdx--
          }
        } else {
          Toast('最多选择20个')
        }
      };
      var drnums=this.danDallIdx,dbnums=this.danBlueNum,trnums=this.tuoQianIdx,tbnums=this.tuoBlueNum;
      if(drnums<1||dbnums<1||6-drnums>trnums||tbnums<2){
        this.totalNum=0;
        this.totalPrice=0;
      }else{
          var totalNum=parseInt(getfactorial(trnums)/(getfactorial(5-drnums)*getfactorial(trnums-5+drnums))*getfactorial(tbnums)/(getfactorial(2-dbnums)*getfactorial(tbnums-2+dbnums)));
          this.totalNum=totalNum;
          this.totalPrice=totalNum*2;
      }
      
      
    },
    // 选择拖码蓝球
    settuoHouList: function (idx) {
      var state = this.tuoHouDallList[idx].state
      if (state) {
        state = false;
        this.tuoBlueNum--;
      } else {
        state = true;
        this.tuoBlueNum++;
        if (this.danHouDallList[idx].state) {
            this.danHouDallList[idx].state = false;
          this.danBlueNum--
        }
      }
      this.tuoHouDallList[idx].state = state;
      var drnums=this.danDallIdx,dbnums=this.danBlueNum,trnums=this.tuoQianIdx,tbnums=this.tuoBlueNum;

      if(drnums<1||dbnums<1||6-drnums>trnums||tbnums<2){
        this.totalNum=0;
        this.totalPrice=0;
      }else{
          var totalNum=parseInt(getfactorial(trnums)/(getfactorial(5-drnums)*getfactorial(trnums-5+drnums))*getfactorial(tbnums)/(getfactorial(2-dbnums)*getfactorial(tbnums-2+dbnums)));
          this.totalNum=totalNum;
          this.totalPrice=totalNum*2;
      }
      
      
    },
    generateRandom: function (count){
       var rand = parseInt(Math.random()*count);
       for(var i = 0 ; i < this.ccarray.length; i++){
          if(this.ccarray[i] == rand){
             return null
          }
       }
       return rand
    },
    // 清除
    setClearList: function(){
      for (var i = 0; i < 35; i++) {
        this.redDallList[i].state = false
        this.danQianDallList[i].state = false
        this.tuoQianDallList[i].state = false
      }

      for (var i = 0; i < 12; i++) {
        this.blueDallList[i].state = false
        this.danHouDallList[i].state = false
        this.tuoHouDallList[i].state = false
      }
      this.redDallIdx = 0;
      this.blueDallIdx = 0;
      this.tuoQianIdx = 0;
      this.danDallIdx = 0;
      this.danBlueNum = 0;
      this.tuoBlueNum = 0;
      this.totalNum=0;
      this.totalPrice=0;
      
      
    },
    open_dltpay:function (){
    let uid=getCookie('newData');
    if(!uid){
    	this.$router.push({
    		name:'login'
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
if (this.betConlength<=0||this.totalNum>0) {
  if (this.play=="normal") {
    var rnums=this.redDallIdx;
    var bnums=this.blueDallIdx;
    if (rnums<5) {
      Toast('最少选择5个红球');
      return
    }
    if (bnums<2) {
      Toast('最少选择2个蓝球');
      return
    };
    var redArr = [];
    var blueArr = [];
    var dltBetList = {};
    var redDallList=this.redDallList;
    var blueDallList=this.blueDallList;
    for (var i = 0; i < redDallList.length; i++) {
        if (redDallList[i].state) {
            redArr.push(redDallList[i].id)
        }
    }
    for (var i = 0; i < blueDallList.length; i++) {
        if (blueDallList[i].state) {
            blueArr.push(blueDallList[i].id)
        }
    };
    dltBetList.type = this.play;
    dltBetList.totalNum= this.totalNum;
    dltBetList.totalPrice= this.totalPrice;
    dltBetList.current = this.current;
    dltBetList.redQiu = redArr;
    dltBetList.blueQiu = blueArr;
  }else {
    var drnums=this.danDallIdx,dbnums=this.danBlueNum,trnums=this.tuoQianIdx,tbnums=this.tuoBlueNum;
    if (drnums<1) {
      Toast('最少选择1个红球胆码');
      return
    }
    if (dbnums<1) {
      Toast('最少选择1个蓝球胆码');
      return
    }
    if (6-drnums>trnums) {
      var x=6-drnums
      Toast('最少选择'+x+'个红球拖码');
      return
    }
    if (tbnums<2) {
      Toast('最少选择2个蓝球拖码');
      return
    }
    var redDanArr=[],blueDanArr=[],redTuoArr=[],blueTuoArr=[],dltBetList={};
    var danQianDallList=this.danQianDallList;
    var danHouDallList=this.danHouDallList;
    var tuoQianDallList=this.tuoQianDallList;
    var tuoHouDallList=this.tuoHouDallList;
    for (var i = 0; i < danQianDallList.length; i++) {
        if (danQianDallList[i].state) {
            redDanArr.push(danQianDallList[i].id)
        }
    }
    for (var i = 0; i < danHouDallList.length; i++) {
        if (danHouDallList[i].state) {
            blueDanArr.push(danHouDallList[i].id)
        }
    };
    for (var i = 0; i < tuoQianDallList.length; i++) {
        if (tuoQianDallList[i].state) {
            redTuoArr.push(tuoQianDallList[i].id)
        }
    }
    for (var i = 0; i < tuoHouDallList.length; i++) {
        if (tuoHouDallList[i].state) {
            blueTuoArr.push(tuoHouDallList[i].id)
        }
    };
    dltBetList.type = this.play;
    dltBetList.totalNum= this.totalNum;
    dltBetList.totalPrice= this.totalPrice;
    dltBetList.current = this.current;
    dltBetList.redDanArr = redDanArr;
    dltBetList.blueDanArr = blueDanArr;
    dltBetList.redTuoArr = redTuoArr;
    dltBetList.blueTuoArr = blueTuoArr;
  }
  var setArr=[];
  setArr.push(dltBetList);
  if (compileNum) {
  var selectedArrs= this.selectedArr;
  var dltBetArr;
  selectedArrs[indexs]=dltBetList;
   dltBetArr=selectedArrs;
   compileNum=false;
  }else {
    dltBetArr=this.selectedArr.concat(setArr);
  }
}else {
  if (compileNum) {
    var selectedArrs= this.selectedArr
    selectedArrs.splice(indexs,1);
    dltBetArr=selectedArrs;
    compileNum=false;
  }else {
      dltBetArr=this.selectedArr;
  }
}
this.betConlength=0;
  console.log(JSON.stringify(dltBetArr));
//   $api.css($api.dom('.last_ten'), 'height: 0');
//   $api.removeAttr($api.dom('#mc_dlt'), 'style');
  this.reloadFun();
  setSession('arr', dltBetArr);
  setSession('datotype', dltBetArr[0].type);
  sessionStorage.removeItem('continue');
  sessionStorage.removeItem('index');
  window.removeEventListener('devicemotion',this.motionHandler, false);
  operationType = 0;
  this.$router.push({
  	path: '/goucai/goucai_mc_dltpay',
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
		interval = setInterval(()=> {
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
	setTime:function() {
		let dataes = this.Qs.stringify({
			"path": "number/lows/dlt"
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
			"path": "number/lows/dlt"
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
                      for (var i = 1; i < 36; i++) {
                          var str = "red" + i + "Miss";
                          for (var key in content.data) {
                              if (key == str) {
                                  redMiss.push(content.data[key])
                              }
                          }
                      }
                      var blueMiss = [];
                      for (var j = 1; j < 13; j++) {
                          var str = "blue" + j + "Miss";

                          for (var keys in content.data) {
                              if (keys == str) {
                                  blueMiss.push(content.data[keys])
                              }
                          }

                      }
                      this.redMiss=redMiss;
                      this.blueMiss=blueMiss;
					} else if (content.code == 201004) {
					}
				}
			})
			.catch(err => {
				console.log(err)
			})
	},
	// 获取往期开奖
	getHistoryDraws: function() {
		let data=[];
		data.flag=false;
		data.page=1;
		data.rows=10;
		let dataes = this.Qs.stringify({
			"path": "number/lows/dlt",
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
						EventUtil.listenTouchDirection(document.getElementById("mc_dlt"))
					}
				}
			})
			.catch(err => {
				console.log(err)
			})
	},
	reloadFun:function (){
  this.totalNum=0;
  this.totalPrice=0;
  this.yilou= false;
  this.PastPerShow= true;
  this.selectedArr=[];
  this.ccarray= [];
  this.typeList= [{'id': '0','name': '普通','play': 'normal'},{'id': '1','name': '胆拖','play': 'duplex'}];
  this.redDallList= [{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false},{'id':10,'state':false},
                {'id':11,'state':false},{'id':12,'state':false},{'id':13,'state':false},{'id':14,'state':false},{'id':15,'state':false},{'id':16,'state':false},{'id':17,'state':false},{'id':18,'state':false},{'id':19,'state':false},{'id':20,'state':false},
                {'id':21,'state':false},{'id':22,'state':false},{'id':23,'state':false},{'id':24,'state':false},{'id':25,'state':false},{'id':26,'state':false},{'id':27,'state':false},{'id':28,'state':false},{'id':29,'state':false},{'id':30,'state':false},
                {'id':31,'state':false},{'id':32,'state':false},{'id':33,'state':false},{'id':34,'state':false},{'id':35,'state':false}];

  this.blueDallList= [{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false},{'id':10,'state':false},
                {'id':11,'state':false},{'id':12,'state':false}];

  this.danQianDallList= [{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false},{'id':10,'state':false},
                {'id':11,'state':false},{'id':12,'state':false},{'id':13,'state':false},{'id':14,'state':false},{'id':15,'state':false},{'id':16,'state':false},{'id':17,'state':false},{'id':18,'state':false},{'id':19,'state':false},{'id':20,'state':false},
                {'id':21,'state':false},{'id':22,'state':false},{'id':23,'state':false},{'id':24,'state':false},{'id':25,'state':false},{'id':26,'state':false},{'id':27,'state':false},{'id':28,'state':false},{'id':29,'state':false},{'id':30,'state':false},
                {'id':31,'state':false},{'id':32,'state':false},{'id':33,'state':false},{'id':34,'state':false},{'id':35,'state':false}];

  this.danHouDallList= [{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false},{'id':10,'state':false},
                {'id':11,'state':false},{'id':12,'state':false}];

  this.tuoQianDallList= [{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false},{'id':10,'state':false},
                {'id':11,'state':false},{'id':12,'state':false},{'id':13,'state':false},{'id':14,'state':false},{'id':15,'state':false},{'id':16,'state':false},{'id':17,'state':false},{'id':18,'state':false},{'id':19,'state':false},{'id':20,'state':false},
                {'id':21,'state':false},{'id':22,'state':false},{'id':23,'state':false},{'id':24,'state':false},{'id':25,'state':false},{'id':26,'state':false},{'id':27,'state':false},{'id':28,'state':false},{'id':29,'state':false},{'id':30,'state':false},
                {'id':31,'state':false},{'id':32,'state':false},{'id':33,'state':false},{'id':34,'state':false},{'id':35,'state':false}];

  this.tuoHouDallList= [{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false},{'id':10,'state':false},
                {'id':11,'state':false},{'id':12,'state':false}];
  this.redDallIdx= 0;
  this.blueDallIdx= 0;
  this.tuoQianIdx= 0;
  this.danDallIdx= 0;
  this.danBlueNum= 0;
  this.tuoBlueNum= 0;
}

  }
	}
	function formatDuring(mss) {
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = parseInt((mss % (1000 * 60)) / 1000);
    return [days,hours,minutes,seconds]
}
</script>

<style scoped>
	@import "../../css/goucai_szc.css";

	#mc_dlt {
		margin-top: 2.25rem;
	}
</style>
