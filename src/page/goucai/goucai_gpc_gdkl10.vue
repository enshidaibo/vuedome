<template>
<div>
<header class="aui-bar aui-bar-nav">
    <div class="aui-pull-left aui-btn" @click="OncloseWin()">
        <span class="aui-iconfont aui-icon-left"></span>
    </div>
    <div>
        <div class="aui-title" @click="ChoiceType()"><span>广东快乐10分</span> <span id="pagetitle">{{navname}}{{playTypeName}}</span> <img src="../../assets/goucai/jjc/xiajiantou.png" /></div>
    </div>
    <div class="aui-pull-right aui-btn top-more" @click="menuPage()">
        <span></span><span></span><span></span>
    </div>
</header>

<div id="gpc_gdkl10" v-cloak>
    <!-- 购彩类型 -->
    <div v-if="navTabStatue" class="nav-Tab" @click="hideChoice()">
        <div class="list">
            <div class="title">普通投注</div>
            <li v-for='(item,index) in styleList.normalList' :class="{ select: danDallIdx.index == index&&danDallIdx.list == 'normalList' }" @click="setChoice(item.typeName,item.name,index,'normalList')">{{ item.name }}</li>
            <div class="title">胆拖投注</div>
            <li v-for='(item,index) in styleList.duplexList' :class="{ select: danDallIdx.index == index&&danDallIdx.list == 'duplexList' }" @click="setChoice(item.typeName,item.name,index,'duplexList')">{{ item.name }}</li>
        </div>
    </div>
    <!-- 菜单 -->
    <div v-if="menuStatue" class="topMenu" @click='hidemoc()'>
        <ul>
            <li @click='toyilou()'>遗漏投注</li>
            <li @click='fenx()'>分享</li>
                    <li @click='toPlay("gdkl10f")'>玩法</li>

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
            <div class="fgr">{{text}}:<span>{{surTimeminutes}}</span>分<span>{{surTimeseconds}}</span>秒</div>
			<span class="icon_down"></span>
			<!-- icon_down :class="[ishide[index]?'icon_up':'icon_down']"-->
        </div>
        <div class="top_mc" v-else>
            <div class="flr">当前期已截止</div>
			<span class="icon_down"></span>
			<!-- icon_down :class="[ishide[index]?'icon_up':'icon_down']"-->
        </div>
        <!-- 往期开奖 -->
        <div class="last_ten_bjk8" style="display: block;">
            <table>
                <tbody>
                    <tr v-for="item in HistoryDraws">
                        <td style="width: 44%;">第{{ item.periodNumber }}期<span></span></td>
                        <td><span v-for="thal in item.result">{{ thal }}</span><span></span></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 普通内容 -->
        <div v-if="danDallIdx.list == 'normalList'&&danDallIdx.index != 7&&danDallIdx.index != 9" class="mc_cont">
			<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
            <div class="yaoyiyao" @click="Random()"><p>摇一摇机选</p></div>
            <div class="titl">{{ styleList.normalList[danDallIdx.index].text }}</div>
            <div class="battle battle_red">
                <ul v-if="danDallIdx.index == 0">
                    <template v-for="(item,index) in xystList">
                        <li :class="{ 'active': item.state }" @click="setxystList(index)"><span class="sp1">{{ item.id }}</span><span class="sp2" v-if="yilou">{{ redMiss[index] }}</span></li>
                    </template>
                    <!-- <li style="border: 0;"></li><li style="border: 0;"></li><li style="border: 0;"></li> -->
                </ul>
                <ul v-else-if="danDallIdx.index == 1">
                    <template v-for="(item,index) in xyhtList">
                        <li :class="{ 'active': item.state }" @click="setxyhtList(index)"><span class="sp1">{{ item.id }}</span><span class="sp2" v-if="yilou">{{ redMiss[index] }}</span></li>
                    </template>
                    <!-- <li style="border: 0;"></li><li style="border: 0;"></li><li style="border: 0;"></li><li style="border: 0;"></li><li style="border: 0;"></li> -->
                </ul>
                <ul v-else>
                    <template v-for="(item,index) in baiWeiList">
                        <li :class="{ 'active': item.state }" @click="setbaiWeiListp(index,danDallIdx.index)"><span class="sp1">{{ item.id }}</span><span class="sp2" v-if="yilou">{{ redMiss[index] }}</span></li>
                    </template>
                    <!-- <li style="border: 0;"></li> -->
                </ul>
            </div>
        </div>
        <!-- 胆拖内容 -->
        <div v-if="danDallIdx.list == 'duplexList'" class="mc_cont mc_cont2">
			<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
            <!-- <div class="yaoyiyao" @click="Random()"><p>摇一摇机选</p></div> -->
            <div class="jieshao">{{ styleList.duplexList[danDallIdx.index].text }}</div>
            <div class="baiwei">
                <div class="titl"><div>至多可选{{ styleList.duplexList[danDallIdx.index].limitNumber }}个号码</div></div>
                <div class="battle battle_red">
                    <div class="battle_icon flr">胆码<div class="right_arror"></div></div>
                    <div class="battle_shuz flr">
                        <ul>
                            <template v-for="(item,index) in wanWeiList">
                                <li :class="{ 'active': item.state }" @click="setDanList(index,danDallIdx.index)"><span class="sp1">{{ item.id }}</span><span class="sp2" v-if="yilou">{{ redMiss[index] }}</span></li>
                            </template>
                            <!-- <li style="border: 0;"></li><li style="border: 0;"></li><li style="border: 0;"></li><li style="border: 0;"></li> -->
                        </ul>
                    </div>
                </div>
            </div>
            <div class="shiwei">
                <div class="titl"><div>可选2-19个号码</div></div>
                <div class="battle battle_red">
                    <div class="battle_icon flr">拖码<div class="right_arror"></div></div>
                    <div class="battle_shuz flr">
                        <ul>
                            <template v-for="(item,index) in qianWeiList">
                                <li :class="{ 'active': item.state }" @click="setTuoList(index,danDallIdx.index)"><span class="sp1">{{ item.id }}</span><span class="sp2" v-if="yilou">{{ redMiss[index] }}</span></li>
                            </template>
                            <!-- <li style="border: 0;"></li><li style="border: 0;"></li><li style="border: 0;"></li><li style="border: 0;"></li> -->
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 直选内容 -->
        <template v-if="danDallIdx.list == 'normalList'">
			
            <div v-if="danDallIdx.index == 7||danDallIdx.index == 9" class="mc_cont mc_cont2">
				<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
                <div class="yaoyiyao" @click="Random()"><p>摇一摇机选</p></div>
                <div class="jieshao">{{ styleList.normalList[danDallIdx.index].text }}</div>
                <div class="baiwei">
                    <div class="battle battle_red">
                        <div class="battle_icon flr" style="width: 15%;">第一位<div class="right_arror"></div></div>
                        <div class="battle_shuz flr" style="width: 80%;">
                            <ul>
                                <template v-for="(item,index) in wanWeiList">
                                    <li :class="{ 'active': item.state }" @click="setwanWeiList(index,danDallIdx.index)"><span class="sp1">{{ item.id }}</span><span class="sp2" v-if="yilou">{{ redMiss[index] }}</span></li>
                                </template>
                                <!-- <li style="border: 0;"></li><li style="border: 0;"></li><li style="border: 0;"></li><li style="border: 0;"></li> -->
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="shiwei">
                    <div class="battle battle_red">
                        <div class="battle_icon flr" style="width: 15%;">第二位<div class="right_arror"></div></div>
                        <div class="battle_shuz flr" style="width: 80%;">
                            <ul>
                                <template v-for="(item,index) in qianWeiList">
                                    <li :class="{ 'active': item.state }" @click="setqianWeiList(index,danDallIdx.index)"><span class="sp1">{{ item.id }}</span><span class="sp2" v-if="yilou">{{ redMiss[index] }}</span></li>
                                </template>
                                <!-- <li style="border: 0;"></li><li style="border: 0;"></li><li style="border: 0;"></li><li style="border: 0;"></li> -->
                            </ul>
                        </div>
                    </div>
                </div>
                <div v-if="danDallIdx.index == 9" class="gewei">
                    <div class="battle battle_red">
                        <div class="battle_icon flr" style="width: 15%;">第三位<div class="right_arror"></div></div>
                        <div class="battle_shuz flr" style="width: 80%;">
                            <ul>
                                <template v-for="(item,index) in baiWeiList">
                                    <li :class="{ 'active': item.state }" @click="setbaiWeiList(index,danDallIdx.index)"><span class="sp1">{{ item.id }}</span><span class="sp2" v-if="yilou">{{ redMiss[index] }}</span></li>
                                </template>
                                <!-- <li style="border: 0;"></li><li style="border: 0;"></li><li style="border: 0;"></li><li style="border: 0;"></li> -->
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </template>
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
			<footer  v-if='isShow'>
				<div class="ft_money flr">
					<p>合计金额：<span>¥{{totalPrice|numberFormat}}</span></p>
					<p>共<span>{{totalNum}}</span>注</p>
				</div>
				<div class="ft_btn fgr">
					<div class="flr" tapmode @click="setClearList()">
						<img src="../../assets/goucai/jjc/closelj.png" />
						<span>清除</span>
					</div>
					<div class="flr" tapmode @click="open_fcsdpay()">投注<span v-if="betConlength > 0" class="pay_b">{{ betConlength > 99?"99":betConlength }}</span></div>
				</div>
			</footer>
<!--    <footer v-if='isShow'>   
        <div class="ft_money flr">共<span>{{totalNum}}</span>注<span>{{totalPrice}}</span>元</div>
        <div class="ft_btn fgr"><div class="flr" @click="setClearList()">清除</div><div class="flr" @click="open_fcsdpay()">投注<span v-if="betConlength > 0" class="pay_b">{{ betConlength > 99?"99":betConlength }}</span></div></div>
    </footer> -->
</div>
</div>
</template>

<script>
    import checkokNav from '../../common/checkok.vue';
const SHAKE_SPEED = 300;
let lastTime = 0;//上次变化的时间
let x =0,y=0,z=0,lastX =0,lastY=0,lastZ=0;//位置变量初始化
import {getSession,setSession,getCookie,getfactorial,getTime,OverallData,openDownload} from '../../js/common.js';
import {Toast} from 'mint-ui';
var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        }else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        }else{
            element["on" + type] = handler;
        }
    },
    listenTouchDirection: function (target) {
        this.addHandler(target, "touchstart", handleTouchEvent);
        this.addHandler(target, "touchend", handleTouchEvent);
        var startY;
        var scrollTops;
        function handleTouchEvent(event) {
            var lastTen = document.querySelector(".last_ten_bjk8");
            var gpc_gdkl10 = document.querySelector("#gpc_gdkl10");
            switch (event.type){
                case "touchstart":
                    startY = event.touches[0].pageY;
                    scrollTops=gpc_gdkl10.scrollTop
                    break;
                case "touchend":
                    var spanY = event.changedTouches[0].pageY - startY;
                    if(spanY > 50 && scrollTops < 3){
                        var heig = document.documentElement.clientHeight - document.getElementsByTagName("header")[0].offsetHeight
                        lastTen.style.height = "16rem";
                        gpc_gdkl10.style.overflow = "hidden";
                        gpc_gdkl10.style.height = heig + 'px';
						xiedajian(0);
                    } else if (spanY < -50) {
                        lastTen.style.height = "0";
                        gpc_gdkl10.removeAttribute("style");
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
        indexs: '',
        menuStatue: false,
        navTabStatue: false,
        compileNum: false,
        interval: '',
        inter: '',
        text:'投注剩余时间',
        playTypeName: '普通',
        navname: '选一数投',
        isShow:true,
        cantchose: true,
        current:0,
        betConlength:0,
        nowTime:0,
        EndTime:0,
        surTimedays: 0,
        surTimehours: 0,
        surTimeminutes: 0,
        surTimeseconds: 0,
        yilou: false,
        PastPerShow: true,
        ccarray: [],
        redMiss:[],
        totalNum:0,
        totalPrice:0,
        selectedArr:[],
        HistoryDraws: [],
        styleList: {
            'normalList': [
                {'name': '选一数投','limitNumber': 1,'playType': 'randomTwo','AmoMoney': '25','typeName': '普通','type': 'normal','text': '任意选1个号码，与开奖号码第一个号码相同，即中24元'},
                {'name': '选一红投','limitNumber': 1,'playType': 'randomThree','AmoMoney': '5','typeName': '普通','type': 'normal','text': '任选1个号码，若开奖号码第一个号码为19，20，即中5元'},
                {'name': '任选二','limitNumber': 2,'playType': 'randomFour','AmoMoney': '8','typeName': '普通','type': 'normal','text': '任意选2个号码，与开奖号码中任意2个相符，即中8元'},
                {'name': '任选三','limitNumber': 3,'playType': 'randomFour','AmoMoney': '24','typeName': '普通','type': 'normal','text': '任意选3个号码，与开奖号码中任意3个相符，即中24元'},
                {'name': '任选四','limitNumber': 4,'playType': 'randomFour','AmoMoney': '80','typeName': '普通','type': 'normal','text': '任意选4个号码，与开奖号码中任意4个相符，即中80元'},
                {'name': '任选五','limitNumber': 5,'playType': 'randomFive','AmoMoney': '320','typeName': '普通','type': 'normal','text': '任意选5个号码，与开奖号码中任意5个相符，即中320元'},
                {'name': '选二连组','limitNumber': 2,'playType': 'foreTwo','AmoMoney': '31','typeName': '普通','type': 'group','text': '至少选择2个号码，与开奖号码中任意2个号连续号码相符即中奖(前后顺序不定)，即中31元'},
                {'name': '选二连直','limitNumber': 2,'playType': 'foreTwo','AmoMoney': '130','typeName': '普通','type': 'direct','text': '任选2个号码，与开奖号码中前2个号码相符即为中奖(前后顺序必须一致)，即中奖62元'},
                {'name': '选三前组','limitNumber': 3,'playType': 'foreThree','AmoMoney': '1300','typeName': '普通','type': 'group','text': '任选3个号码，与开奖号码中任意3个号连续号码相符即中奖(前后顺序不定)，即中1300元'},
                {'name': '选三连直','limitNumber': 3,'playType': 'foreThree','AmoMoney': '8000','typeName': '普通','type': 'direct','text': '任选3个号码，与开奖号码中前3个号码相符即为中奖(前后顺序必须一致)，即中奖8000元'},
            ],
            'duplexList': [
                {'name': '任选二','limitNumber': 1,'playType': 'randomTwo','AmoMoney': '6','typeName': '胆拖','type': 'duplex','text': ''},
                {'name': '任选三','limitNumber': 2,'playType': 'randomThree','AmoMoney': '19','typeName': '胆拖','type': 'duplex','text': ''},
                {'name': '任选四','limitNumber': 3,'playType': 'randomFour','AmoMoney': '78','typeName': '胆拖','type': 'duplex','text': ''},
                {'name': '任选五','limitNumber': 4,'playType': 'randomFive','AmoMoney': '540','typeName': '胆拖','type': 'duplex','text': ''},
                {'name': '选二连组','limitNumber': 1,'playType': 'foreTwo','AmoMoney': '65','typeName': '胆拖','type': 'groupDuplex','text': ''},
                {'name': '选三前组','limitNumber': 2,'playType': 'foreThree','AmoMoney': '195','typeName': '胆拖','type': 'groupDuplex','text': ''},
            ]
        },
        baiWeiList: [{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false},{'id':10,'state':false},{'id':11,'state':false},{'id':12,'state':false},{'id':13,'state':false},{'id':14,'state':false},{'id':15,'state':false},{'id':16,'state':false},{'id':17,'state':false},{'id':18,'state':false},{'id':19,'state':false},{'id':20,'state':false}],
        qianWeiList: [{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false},{'id':10,'state':false},{'id':11,'state':false},{'id':12,'state':false},{'id':13,'state':false},{'id':14,'state':false},{'id':15,'state':false},{'id':16,'state':false},{'id':17,'state':false},{'id':18,'state':false},{'id':19,'state':false},{'id':20,'state':false}],
        wanWeiList: [{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false},{'id':10,'state':false},{'id':11,'state':false},{'id':12,'state':false},{'id':13,'state':false},{'id':14,'state':false},{'id':15,'state':false},{'id':16,'state':false},{'id':17,'state':false},{'id':18,'state':false},{'id':19,'state':false},{'id':20,'state':false}],
        xystList: [{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false},{'id':10,'state':false},{'id':11,'state':false},{'id':12,'state':false},{'id':13,'state':false},{'id':14,'state':false},{'id':15,'state':false},{'id':16,'state':false},{'id':17,'state':false},{'id':18,'state':false}],
        xyhtList: [{'id':19,'state':false},{'id':20,'state':false}],
        danDallIdx: {'list': 'normalList','index': 0,'SelecNumber': 0,name:'选一数投'},
        oneDallIdx:0,
        twoDallIdx:0,
        threeDallIdx:0,
        onedanNum:0,
        tuoDallIdx:0,
        RouteLeave: false
    };
},
beforeRouteLeave (to, from , next) {
    if (this.RouteLeave) {
        next()
    } else {
        sessionStorage.removeItem('content');
        sessionStorage.removeItem('ssqBetList');
        sessionStorage.removeItem('pay');
        sessionStorage.removeItem('idx');
        sessionStorage.removeItem('list');
        sessionStorage.removeItem('playTypeName');
        sessionStorage.removeItem('name');
        window.removeEventListener('devicemotion',this.motionHandler, false);
        next()
    }
},
created() {
    if (getCookie('logok')) {  //判断是否实名
    	this.logok = true;
    }
    if(getSession('list')){
        this.playTypeName = getSession('playTypeName');
        this.navname = getSession('name');
        this.danDallIdx.list = getSession('list')
        this.danDallIdx.index = getSession('idx')
        this.danDallIdx.name = getSession('name')
    }
	this.setTime();
	this.getHistoryDraws();
	this.getMiss();
    if(getSession("pay") == 0){
        this.cantchose=true;
    }else if(getSession("pay") == 1){   //继续选号
        this.continueChoose();
    }else if(getSession("pay") == 2){   //继续编辑
        this.continueEdit();
    }
},
mounted() {
	this.gpc_gdkl10 = document.querySelector("#gpc_gdkl10");
	this.topMenu = document.querySelector(".topMenu");
	this.navTab = document.querySelector(".nav-Tab");
	this.lastTen = document.querySelector(".last_ten_bjk8");
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
		var lastTen = document.querySelector(".last_ten_bjk8");
		var gpc_hbks = document.querySelector("#gpc_gdkl10");
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
toPlay(){   //  玩法
                // sessionStorage.setItem('play',document.querySelector('.aui-title').innerText);
                // location.href = 'http://www.baidu.com';
                this.$router.push({
                    path:"/goucai/play",
                    query:{
                        isApp:'0',
                        dataType:"gdkl10f"
                    }

                })
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
    continueChoose: function(){   //继续选号
        this.cantchose=false;
        this.setTime();
        this.selectedArr=getSession('ssqBetList');
        this.betConlength=getSession('ssqBetList').length;
    },
    continueEdit: function(){   //继续编辑
        this.setTime();
        var arr=getSession('ssqBetList');
        this.selectedArr=arr;
        this.betConlength=arr.length-1;
        this.compileNum=true;
        this.indexs=getSession('index');
        var arrs= arr[this.indexs];
        console.log(JSON.stringify(arrs));
        this.totalNum=arrs.totalNum;
        this.totalPrice=parseInt(arrs.totalNum)*2;
        if (arrs.type=="normalList") {
            var index=arrs.limitNumber;
            if (index==0) {
                this.danDallIdx.SelecNumber=arrs.redQiu.length;
                for (var i = 0; i<arrs.redQiu.length; i++) {
                    for (var n = 0; n < this.xystList.length; n++) {
                        if (arrs.redQiu[i]==this.xystList[n].id) {
                            this.xystList[n].state=true;
                        }
                    }
                };
            }else if (index==1) {
                this.danDallIdx.SelecNumber=arrs.redQiu.length;
                for (var i = 0; i<arrs.redQiu.length; i++) {
                    for (var n = 0; n < this.xyhtList.length; n++) {
                        if (arrs.redQiu[i]==this.xyhtList[n].id) {
                            this.xyhtList[n].state=true;
                        }
                    }
                };
            }else if (index==7) {
                this.oneDallIdx=arrs.oneQiu.length;
                this.twoDallIdx=arrs.twoQiu.length;
                for (var i = 0; i<arrs.oneQiu.length; i++) {
                    for (var n = 0; n < this.wanWeiList.length; n++) {
                        if (arrs.oneQiu[i]==this.wanWeiList[n].id) {
                            this.wanWeiList[n].state=true;
                        }
                    }
                };
                for (var i = 0; i<arrs.twoQiu.length; i++) {
                    for (var n = 0; n < this.qianWeiList.length; n++) {
                        if (arrs.twoQiu[i]==this.qianWeiList[n].id) {
                            this.qianWeiList[n].state=true;
                        }
                    }
                };
            }else if (index==9) {
                this.oneDallIdx=arrs.oneQiu.length;
                this.twoDallIdx=arrs.twoQiu.length;
                this.threeDallIdx=arrs.threeQiu.length;
                for (var i = 0; i<arrs.oneQiu.length; i++) {
                    for (var n = 0; n < this.wanWeiList.length; n++) {
                        if (arrs.oneQiu[i]==this.wanWeiList[n].id) {
                            this.wanWeiList[n].state=true;
                        }
                    }
                };
                for (var i = 0; i<arrs.twoQiu.length; i++) {
                    for (var n = 0; n < this.qianWeiList.length; n++) {
                        if (arrs.twoQiu[i]==this.qianWeiList[n].id) {
                            this.qianWeiList[n].state=true;
                        }
                    }
                };
                for (var i = 0; i<arrs.threeQiu.length; i++) {
                    for (var n = 0; n < this.baiWeiList.length; n++) {
                        if (arrs.threeQiu[i]==this.baiWeiList[n].id) {
                            this.baiWeiList[n].state=true;
                        }
                    }
                };
            }else {
                this.danDallIdx.SelecNumber=arrs.redQiu.length;
                for (var i = 0; i<arrs.redQiu.length; i++) {
                    for (var n = 0; n < this.baiWeiList.length; n++) {
                        if (arrs.redQiu[i]==this.baiWeiList[n].id) {
                            this.baiWeiList[n].state=true;
                        }
                    }
                };
            }
        }else {
            this.onedanNum=arrs.danQiu.length;
            this.tuoDallIdx=arrs.tuoQiu.length;
            for (var i = 0; i<arrs.danQiu.length; i++) {
                for (var n = 0; n < this.wanWeiList.length; n++) {
                    if (arrs.danQiu[i]==this.wanWeiList[n].id) {
                        this.wanWeiList[n].state=true;
                    }
                }
            };
            for (var i = 0; i<arrs.tuoQiu.length; i++) {
                for (var n = 0; n < this.qianWeiList.length; n++) {
                    if (arrs.tuoQiu[i]==this.qianWeiList[n].id) {
                        this.qianWeiList[n].state=true;
                    }
                }
            };
        }
    },
    setTime: function() {    //请求数据
    	var datas =  this.Qs.stringify({
    		"path":"number/keno/gdklsf"
    	},{allowDots: true});
    
    	this.$ajax.post('/caipiaoshouye/index.php/home/index/getCurrentInfo',
    		datas
    	)
    	.then(res=>{
    		console.log(res);
    		if(res.data.status==200){
                var content=JSON.parse(res.data.content);
                if(content.code==100000){
                    this.EndTime=parseInt(content.data.endedTime)-30000;
                    this.nowTime=parseInt(content.data.nowTime);
                    this.current=content.data.periodNumber;
                    this.setSurplusTime();
                    if (this.EndTime<=0) {
                        this.isShow=false;
                    }
                }
                else if(content.code==201004){
                    this.EndTime=-1;
                    this.isShow=false;
                }
            }
    	})
    	.catch(err=>{
    		console.log(err);
    	})
    },
    getHistoryDraws: function() {    //请求往期开奖数据
        var data = [];
        data["flag"] = false;
        data["page"] = 1;
        data["rows"] = 10;
    	var datas =  this.Qs.stringify({
    		"path":"number/keno/gdklsf",data
    	},{allowDots: true});
    
    	this.$ajax.post('/caipiaoshouye/index.php/home/index/getHistoryDraws',
    		datas
    	)
    	.then(res=>{
    		console.log(res);
    		if(res.data.status==200){
                var content=JSON.parse(res.data.content);
                if(content.code==100000){
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
                    EventUtil.listenTouchDirection(document.getElementById("gpc_gdkl10"))
                }
            }
    	})
    	.catch(err=>{
    		console.log(err);
    	})
    },
    getMiss: function() {    //请求数据
    	var datas =  this.Qs.stringify({
    		"path":"number/keno/gdklsf"
    	},{allowDots: true});
    
    	this.$ajax.post('/caipiaoshouye/index.php/home/index/getMiss',
    		datas
    	)
    	.then(res=>{
    		console.log(res);
    		if(res.data.status==200){
                var content = JSON.parse(res.data.content);
                if (content.code == 100000) {
                    var redMiss = [];
                    for (var i = 1; i < 81; i++) {
                        var str = "ball" + i + "Miss";
                        for (var key in content.data) {
                            if (key == str) {
                                redMiss.push(content.data[key])
                            }
                        }
                    }
                    console.log(JSON.stringify(redMiss));
                    this.redMiss=redMiss;
                }else if(content.code==201004){

                }else {

                }
            }
    	})
    	.catch(err=>{
    		console.log(err);
    	})
    },
    setSurplusTime: function() {
        clearInterval(this.interval);
        this.text='投注剩余时间';
        this.isShow=true;
        var timestamp = this.nowTime;
        var endedTime =  this.EndTime;
        var surTime = endedTime - timestamp;
        if (surTime<=0) {
            var time=30000+surTime;
            this.isShow=false;
            this.$forceUpdate();
            this.sanshimiao(time);
            return
        }
        var sTm = this.formatDuring(surTime)
        if (sTm[0].toString().length<2) {
            this.surTimedays = '0'+sTm[0].toString();
        }else {
            this.surTimedays = sTm[0];
        }
        if (sTm[1].toString().length<2) {
            this.surTimehours = '0'+sTm[1].toString();
        }else {
            this.surTimehours = sTm[1]
        }
        if (sTm[2].toString().length<2) {
            this.surTimeminutes = '0'+sTm[2].toString();
        }else {
            this.surTimeminutes = sTm[2]
        }
        if (sTm[3].toString().length<2) {
            this.surTimeseconds = '0'+sTm[3].toString();
        }else {
            this.surTimeseconds = sTm[3];
        }
        var that = this;
        this.interval = setInterval(function () {
            surTime = surTime - 1000
            if (surTime < 0) {
                clearInterval(that.interval);
                that.sanshimiao();
            }
            var Tm = that.formatDuring(surTime)
            if (Tm[0].toString().length<2) {
                that.surTimedays = '0'+Tm[0].toString();
            }else {
                that.surTimedays = Tm[0];
            }
            if (Tm[1].toString().length<2) {
                that.surTimehours = '0'+Tm[1].toString();
            }else {
                that.surTimehours = Tm[1]
            }
            if (Tm[2].toString().length<2) {
                that.surTimeminutes = '0'+Tm[2].toString();
            }else {
                that.surTimeminutes = Tm[2]
            }
            if (Tm[3].toString().length<2) {
                that.surTimeseconds = '0'+Tm[3].toString();
            }else {
                that.surTimeseconds = Tm[3];
            }
        },1000)
    },
    sanshimiao: function(time){
        clearInterval(this.inter);
        this.text='下期开售时间';
        this.isShow=false;
        var surTimes=time || 30000;
        var that = this;
        this.inter = setInterval(function () {
            var DTm = that.formatDuring(surTimes)
            if (DTm[0].toString().length<2) {
                that.surTimedays = '0'+DTm[0].toString();
            }else {
                that.surTimedays = DTm[0];
            }
            if (DTm[1].toString().length<2) {
                that.surTimehours = '0'+DTm[1].toString();
            }else {
                that.surTimehours = DTm[1]
            }
            if (DTm[2].toString().length<2) {
                that.surTimeminutes = '0'+DTm[2].toString();
            }else {
                that.surTimeminutes = DTm[2]
            }
            if (DTm[3].toString().length<2) {
                that.surTimeseconds = '0'+DTm[3].toString();
            }else {
                that.surTimeseconds = DTm[3];
            }
            surTimes = surTimes - 1000
            if (surTimes < 0) {
                that.setTime();
                clearInterval(that.inter);
            }
        },1000)
    },
    formatDuring: function(mss) {
        var days = parseInt(mss / (1000 * 60 * 60 * 24));
        var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = parseInt((mss % (1000 * 60)) / 1000);
        return [days,hours,minutes,seconds]
    },
    ChoiceType: function(){   //点击选择类型
        if(this.cantchose){
            if(this.navTabStatue){
                this.navTabStatue = false;
            }else{
                this.navTabStatue = true;
                this.menuStatue = false;
            }
            this.lastTen.style.height = "0";
            this.gpc_gdkl10.removeAttribute("style");
			this.bgzhuanhuan=false;
        }else {
            Toast('请选择相同玩法进行投注！')
        }
    },
    OncloseWin: function(){
    	this.$router.go(-1);
    },
    setChoice: function(playname, name, idx, list) {
        this.setClearList();
        if (name) {
            setSession('playTypeName', playname);
            setSession('name', name);
            setSession('list', list);
            setSession('idx', idx);
            this.playTypeName = getSession('playTypeName');
            this.navname = getSession('name');
        }
        this.danDallIdx.list = getSession('list');
        this.danDallIdx.name = getSession('name');
        this.danDallIdx.index = getSession('idx');
        if (getSession('list')=='duplexList') {
            window.removeEventListener('devicemotion',this.motionHandler, false);
        }else {
            window.addEventListener('devicemotion',this.motionHandler, false);
        }
    },
    menuPage: function(){   //点击右上角的三个点
        if (this.menuStatue) {
            this.menuStatue = false;
        } else {
            this.navTabStatue = false;
            this.menuStatue = true;
        }
        this.lastTen.style.height = "0";
        this.gpc_gdkl10.removeAttribute("style");
		this.bgzhuanhuan=false;
    },
    hideChoice: function() {
        this.navTabStatue = false;
    },
    toyilou: function () {
        if (this.yilou) {
            this.yilou = false
        } else {
            this.yilou = true
        }
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    fenx: function(){   //分享
        this.shareStatue = true;
    },
    hideShare: function(){
        this.shareStatue = false;
    },
    // openDownload: function(){   //前往下载
    //     var newData = getCookie('newData');
    //     var link = OverallData().download
    //     if(newData){
    //         window.open(link+'?_userId='+newData.userid);
    //     }else{
    //         window.open(link);
    //     }
    // },
    hidemoc: function() {
        this.menuStatue = false;
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    setClearList: function(){
        for (var i = 0; i < 20; i++) {
            this.baiWeiList[i].state = false
            this.qianWeiList[i].state = false
            this.wanWeiList[i].state = false
        }
        for (var i = 0; i < 18; i++) {
            this.xystList[i].state = false
        }
        for (var i = 0; i < 2; i++) {
            this.xyhtList[i].state = false
        }
        this.danDallIdx.SelecNumber = 0;
        this.totalNum=0;
        this.totalPrice=0;
        this.oneDallIdx=0;
        this.twoDallIdx=0;
        this.threeDallIdx=0;
        this.onedanNum=0;
        this.tuoDallIdx=0;
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    Random: function () {    // 随机选择
        var index=this.danDallIdx.index;
        this.setClearList();
        this.ccarray = [];
        var ind=this.styleList.normalList[index].limitNumber;
        var randomNum=20;
        if (index==1) {
            randomNum=2;
        }else if (index==0) {
            randomNum=18;
        }
        for(var i = 0 ; ; i++){
          if(this.ccarray.length<ind){
                var rand1 = this.generateRandom(randomNum);
                console.log(rand1);
                if (rand1 != null && rand1 < randomNum) {
                    this.ccarray.push(rand1);
                }
            }else{
                break;
           }
        }
        console.log(JSON.stringify(this.ccarray));
        if (index == 7) {
            this.wanWeiList[this.ccarray[0]].state = true;
            this.qianWeiList[this.ccarray[1]].state = true;
            this.oneDallIdx=1;
            this.twoDallIdx=1;
         } else if (index == 9) {
            this.wanWeiList[this.ccarray[0]].state = true;
            this.qianWeiList[this.ccarray[1]].state = true;
            this.baiWeiList[this.ccarray[2]].state = true;
            this.oneDallIdx=1;
            this.twoDallIdx=1;
            this.threeDallIdx=1;
         } else {
            for (var n = 0; n < this.ccarray.length; n++) {
                if (index == 0) {
                    this.xystList[this.ccarray[n]].state = true;
                    this.danDallIdx.SelecNumber++
                } else if (index == 1) {
                    this.xyhtList[this.ccarray[n]].state = true;
                    this.danDallIdx.SelecNumber++
                }else {
                    this.baiWeiList[this.ccarray[n]].state = true;
                    this.danDallIdx.SelecNumber++
                }
            }
        }
        //注数
        if (index == 0 || index == 1) {
            var rnums = this.danDallIdx.SelecNumber;
            if (rnums < 1) {
                this.totalNum = 0;
                this.totalPrice = 0;
            } else {
                this.totalNum = parseInt(rnums);
                this.totalPrice = parseInt(rnums) * 2;
            }
        }else if (index==7) {
            var onums=1;
            var snums=1;
            if(onums<1||snums<1){
                this.totalNum=0;
                this.totalPrice=0;
            }else{
                var totalNum=snums*onums;
                this.totalNum=totalNum;
                this.totalPrice=totalNum*2;
            }
        }else if (index==9) {
            var onums=1;
            var snums=1;
            var tnums=1;
            if(snums<1||onums<1||tnums<1){
                this.totalNum=0;
                this.totalPrice=0;
            }else{
                var totalNum=snums*onums*tnums;
                this.totalNum=totalNum;
                this.totalPrice=totalNum*2;
            }
        } else {
            var rnums = this.danDallIdx.SelecNumber;
            var cnums = parseInt(index);
            if (cnums==6) {
                cnums=2
            }else if (cnums==8) {
                cnums=3
            }
            if (rnums < cnums) {
                this.totalNum = 0;
                this.totalPrice = 0;
            } else {
                var totalNum = parseInt((getfactorial(rnums) / (getfactorial(rnums - cnums) * getfactorial(cnums))));
                this.totalNum = totalNum;
                this.totalPrice = totalNum * 2;
            }
        }
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    setxystList: function (idx) {   // 选择
        var state = this.xystList[idx].state
        if (state) {
            state = false;
            this.danDallIdx.SelecNumber--;
        } else {
            state = true;
            this.danDallIdx.SelecNumber++;
        }
        this.xystList[idx].state = state;
        var rnums=this.danDallIdx.SelecNumber;
        if (rnums<1) {
            this.totalNum=0;
            this.totalPrice=0;
        }else {
            this.totalNum=parseInt(rnums);
            this.totalPrice=parseInt(rnums)*2;
        }
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    setxyhtList: function (idx) {
        var state = this.xyhtList[idx].state
        if (state) {
            state = false;
            this.danDallIdx.SelecNumber--;
        } else {
            state = true;
            this.danDallIdx.SelecNumber++;
        }
        this.xyhtList[idx].state = state;
        var rnums=this.danDallIdx.SelecNumber;
        if (rnums<1) {
            this.totalNum=0;
            this.totalPrice=0;
        }else {
            this.totalNum=parseInt(rnums);
            this.totalPrice=parseInt(rnums)*2;
        }
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    setbaiWeiListp: function (idx,ind) {
        var state = this.baiWeiList[idx].state
        if (state) {
            state = false;
            this.danDallIdx.SelecNumber--;
        } else {
            state = true;
            this.danDallIdx.SelecNumber++;
        }
        this.baiWeiList[idx].state = state;
        var rnums=this.danDallIdx.SelecNumber;
        var cnums=parseInt(ind);
        if (cnums==6) {
            cnums=2
        }else if (cnums==8) {
            cnums=3
        }
        if (rnums<cnums) {
            this.totalNum=0;
            this.totalPrice=0;
        }else {
            var totalNum=parseInt((getfactorial(rnums)/(getfactorial(rnums-cnums)*getfactorial(cnums))));
            this.totalNum=totalNum;
            this.totalPrice=totalNum*2;
        }
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    setwanWeiList: function (idx,ind) {
        var state = this.wanWeiList[idx].state;
        if (state) {
            state = false;
            this.oneDallIdx--;
        } else {
            state = true;
            this.oneDallIdx++;
            if (this.qianWeiList[idx].state) {
                this.qianWeiList[idx].state= false;
                this.twoDallIdx--;
            }
            if (this.baiWeiList[idx].state) {
                this.baiWeiList[idx].state= false;
                this.threeDallIdx--;
            }
        }
        this.wanWeiList[idx].state = state;
        var onums=this.oneDallIdx;
        var snums=this.twoDallIdx;
        var tnums=this.threeDallIdx;
        if (ind==7) {
            if(onums<1||snums<1){
                this.totalNum=0;
                this.totalPrice=0;
            }else{
                var totalNum=snums*onums;
                this.totalNum=totalNum;
                this.totalPrice=totalNum*2;
            }
        }else if (ind==9) {
            if(snums<1||onums<1||tnums<1){
                this.totalNum=0;
                this.totalPrice=0;
            }else{
                var totalNum=snums*onums*tnums;
                this.totalNum=totalNum;
                this.totalPrice=totalNum*2;
            }
        }
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    setqianWeiList: function (idx,ind) {
        var state = this.qianWeiList[idx].state
        if (state) {
            state = false;
            this.twoDallIdx--;
        } else {
            state = true;
            this.twoDallIdx++;
            if (this.wanWeiList[idx].state) {
                this.wanWeiList[idx].state= false;
                this.oneDallIdx--;
            }
            if (this.baiWeiList[idx].state) {
                this.baiWeiList[idx].state= false;
                this.threeDallIdx--;
            }
        }
        this.qianWeiList[idx].state = state;
        var onums=this.oneDallIdx;
        var snums=this.twoDallIdx;
        var tnums=this.threeDallIdx;
        if (ind==7) {
            if(onums<1||snums<1){
                this.totalNum=0;
                this.totalPrice=0;
            }else{
                var totalNum=snums*onums;
                this.totalNum=totalNum;
                this.totalPrice=totalNum*2;
            }
        }else if (ind==9) {
            if(snums<1||onums<1||tnums<1){
                this.totalNum=0;
                this.totalPrice=0;
            }else{
                var totalNum=snums*onums*tnums;
                this.totalNum=totalNum;
                this.totalPrice=totalNum*2;
            }
        }
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    setbaiWeiList: function (idx,ind) {
        var state = this.baiWeiList[idx].state
        if (state) {
            state = false;
            this.threeDallIdx--;
        } else {
            state = true;
            this.threeDallIdx++;
            if (this.qianWeiList[idx].state) {
                this.qianWeiList[idx].state= false;
                this.twoDallIdx--;
            }
            if (this.wanWeiList[idx].state) {
                this.wanWeiList[idx].state= false;
                this.oneDallIdx--;
            }
        }
        this.baiWeiList[idx].state = state;
        var onums=this.oneDallIdx;
        var snums=this.twoDallIdx;
        var tnums=this.threeDallIdx;
        if (ind==7) {
            if(onums<1||snums<1){
                this.totalNum=0;
                this.totalPrice=0;
            }else{
                var totalNum=snums*onums;
                this.totalNum=totalNum;
                this.totalPrice=totalNum*2;
            }
        }else if (ind==9) {
            if(snums<1||onums<1||tnums<1){
                this.totalNum=0;
                this.totalPrice=0;
            }else{
                var totalNum=snums*onums*tnums;
                this.totalNum=totalNum;
                this.totalPrice=totalNum*2;
            }
        }
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    setDanList:function(idx,ind) {  //胆拖玩法---胆
        var maxChose=parseInt(ind)+1;
        if (parseInt(ind)==4) {
            maxChose=1
        }else if (parseInt(ind)==5) {
            maxChose=2
        }
        var isChosed;
        for (var x = 0; x < this.wanWeiList.length; x++) {
          if (this.wanWeiList[x].state) {
        		  isChosed=x;
          }
        }
        var state = this.wanWeiList[idx].state;
        if (state) {
            state = false;
            this.onedanNum--;
        } else {
            if (this.onedanNum<maxChose) {
                state = true;
                this.onedanNum++;
                if (this.qianWeiList[idx].state) {
                    this.qianWeiList[idx].state= false;
                    this.tuoDallIdx--;
                }
            }else {
        		if(maxChose==1){
        			this.wanWeiList[isChosed].state=false;
        			 state = true;
        			if (this.qianWeiList[idx].state) {
        			    this.qianWeiList[idx].state= false;
        			    this.tuoDallIdx--;
        			}
        		}else{
        			 Toast('至多选择'+maxChose+'个红球');
        			return
        		}
               
            }
        }
        this.wanWeiList[idx].state = state;
        var onums=this.onedanNum;
        var snums=this.tuoDallIdx;
        if(onums<1||snums+onums<maxChose+2){
            this.totalNum=0;
            this.totalPrice=0;
        }else{
            var totalNum=parseInt(getfactorial(snums)/(getfactorial((maxChose+1)-onums)*getfactorial(snums-(maxChose+1)+onums)));
            this.totalNum=totalNum;
            this.totalPrice=totalNum*2;
        }
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    setTuoList:function(idx,ind) {  //胆拖玩法---拖
        var maxChose=parseInt(ind)+1;
        if (parseInt(ind)==4) {
            maxChose=1
        }else if (parseInt(ind)==5) {
            maxChose=2
        }
        var state = this.qianWeiList[idx].state
        if (state) {
            state = false;
            this.tuoDallIdx--;
        } else {
            state = true;
            this.tuoDallIdx++;
            if (this.wanWeiList[idx].state) {
                this.wanWeiList[idx].state= false;
                this.onedanNum--;
            }
        }
        this.qianWeiList[idx].state = state;
        var onums=this.onedanNum;
        var snums=this.tuoDallIdx;
        if(onums<1||snums+onums<maxChose+2){
            this.totalNum=0;
            this.totalPrice=0;
        }else{
            var totalNum=parseInt(getfactorial(snums)/(getfactorial((maxChose+1)-onums)*getfactorial(snums-(maxChose+1)+onums)));
            this.totalNum=totalNum;
            this.totalPrice=totalNum*2;
        }
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    generateRandom: function (count){   // 随机数
        var rand = parseInt(Math.random()*count);
        for(var i = 0 ; i < this.ccarray.length; i++){
            if(this.ccarray[i] == rand){
                return null
            }
        }
        return rand
    },
    open_fcsdpay:function (){
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
        // if (getCookie('logok')) {  //判断是否实名
        // 	this.logok = true;
        //     return false;
        // }
		// 	if(this.totalNum>=100){
		//   Toast('注单数量最多100注!');
		//   return false;
		// }
        var index=this.danDallIdx.index;
        var ssqBetArr;
        if (this.betConlength<=0||this.totalNum>0) {
            var ssqBetList={};
            ssqBetList.playType=this.danDallIdx.name;
            ssqBetList.totalNum=this.totalNum;
            ssqBetList.type=this.danDallIdx.list;
            ssqBetList.limitNumber=this.danDallIdx.index;
            ssqBetList.totalPrice=this.totalPrice;
            ssqBetList.current = this.current;
            if (this.danDallIdx.list=='normalList') {
                if (index==0||index==1) {
                    if (this.danDallIdx.SelecNumber<1) {
                        Toast('最少选择1个号码！');
                        return
                    }
                    if (index==0) {
                        var redDallList=this.xystList;
                        var redQiu=[];
                        for (var i = 0; i < redDallList.length; i++) {
                            if (redDallList[i].state) {
                                redQiu.push(redDallList[i].id);
                            }
                        }
                        ssqBetList.redQiu=redQiu;
                    }else if (index==1) {
                        var redDallList=this.xyhtList;
                        var redQiu=[];
                        for (var i = 0; i < redDallList.length; i++) {
                            if (redDallList[i].state) {
                                redQiu.push(redDallList[i].id);
                            }
                        }
                        ssqBetList.redQiu=redQiu;
                    }
                }else if (index==7) {
                    if (this.oneDallIdx<1) {
                        Toast('第一位最少选择1个号码！');
                        return
                    }
                    if(this.twoDallIdx<1){
                        Toast('第二位最少选择1个号码！');
                        return
                    }
                    var wanWeiList=this.wanWeiList;
                    var qianWeiList=this.qianWeiList;
                    var oneQiu=[];
                    var twoQiu=[];
                    for (var i = 0; i < wanWeiList.length; i++) {
                        if (wanWeiList[i].state) {
                            oneQiu.push(wanWeiList[i].id);
                        }
                    }
                    for (var i = 0; i < qianWeiList.length; i++) {
                        if (qianWeiList[i].state) {
                            twoQiu.push(qianWeiList[i].id);
                        }
                    }
                    ssqBetList.oneQiu=oneQiu;
                    ssqBetList.twoQiu=twoQiu;
                }else if (index==9) {
                    if (this.oneDallIdx<1) {
                        Toast('第一位最少选择1个号码！');
                        return
                    }
                    if(this.twoDallIdx<1){
                        Toast('第二位最少选择1个号码！');
                        return
                    }
                    if(this.threeDallIdx<1){
                        Toast('第三位最少选择1个号码！');
                        return
                    }
                    var wanWeiList=this.wanWeiList;
                    var qianWeiList=this.qianWeiList;
                    var baiWeiList=this.baiWeiList;
                    var oneQiu=[];
                    var twoQiu=[];
                    var threeQiu=[];
                    for (var i = 0; i < wanWeiList.length; i++) {
                        if (wanWeiList[i].state) {
                            oneQiu.push(wanWeiList[i].id);
                        }
                    }
                    for (var i = 0; i < qianWeiList.length; i++) {
                        if (qianWeiList[i].state) {
                            twoQiu.push(qianWeiList[i].id);
                        }
                    }
                    for (var i = 0; i < baiWeiList.length; i++) {
                        if (baiWeiList[i].state) {
                            threeQiu.push(baiWeiList[i].id);
                        }
                    }
                    ssqBetList.oneQiu=oneQiu;
                    ssqBetList.twoQiu=twoQiu;
                    ssqBetList.threeQiu=threeQiu;
                }else {
                    if (index==6) {
                        index=2
                    }else if (index==8) {
                        index=3
                    }
                    if (this.danDallIdx.SelecNumber<index) {
                        Toast('最少选择'+index+'个号码！');
                        return
                    }
                    var redDallList=this.baiWeiList;
                    var redQiu=[];
                    for (var i = 0; i < redDallList.length; i++) {
                        if (redDallList[i].state) {
                            redQiu.push(redDallList[i].id);
                        }
                    }
                    ssqBetList.redQiu=redQiu;
                }
            }else {
                if (this.onedanNum==0) {
                    Toast('最少选择1个胆码！');
                    return
                }
                if(index==4){
                    index=0;
                }else if (index==5) {
                    index=1;
                }
                if(index+3-this.onedanNum>this.tuoDallIdx){
                    var num=index+3-this.onedanNum;
                    Toast('最少选择'+num+'个拖码！');
                    return
                };
                var wanWeiList=this.wanWeiList;
                var qianWeiList=this.qianWeiList;
                var oneQiu=[];
                var twoQiu=[];
                for (var i = 0; i < wanWeiList.length; i++) {
                    if (wanWeiList[i].state) {
                        oneQiu.push(wanWeiList[i].id);
                    }
                }
                for (var i = 0; i < qianWeiList.length; i++) {
                    if (qianWeiList[i].state) {
                        twoQiu.push(qianWeiList[i].id);
                    }
                }
                ssqBetList.danQiu=oneQiu;
                ssqBetList.tuoQiu=twoQiu;
            }
            var setArr=[];
            setArr.push(ssqBetList);
            if (this.compileNum) {
                var selectedArrs= this.selectedArr
                selectedArrs[this.indexs]=ssqBetList;
                ssqBetArr=selectedArrs;
                this.compileNum=false;
            }else {
                ssqBetArr=this.selectedArr.concat(setArr);
            }
        }else {
            if (this.compileNum) {
                var selectedArrs= this.selectedArr
                selectedArrs.splice(this.indexs,1);
                ssqBetArr=selectedArrs;
                this.compileNum=false;
            }else {
                ssqBetArr=this.selectedArr;
            }
        }
        this.betConlength=0;
        this.setClearList();
        this.selectedArr=[];
        console.log(JSON.stringify(ssqBetArr));
        this.lastTen.style.height = "0";
        this.gpc_gdkl10.removeAttribute("style");
        window.removeEventListener('devicemotion',this.motionHandler, false);
        this.RouteLeave = true;
        var content = {};
        setSession('ssqBetList',ssqBetArr);
        content["current"] = this.current;
        content["endedTime"] = getTime(this.EndTime,1);
        content["type"] = this.danDallIdx.list;
        content["name"] = this.danDallIdx.name;
        content["limitNumber"] = this.danDallIdx.index;
        setSession('content',content);
        this.$router.push({
        	name:'goucai_gpc_gdkl10pay'
        });
    },
    
}
}
</script>

<style scoped>
@import "../../css/goucai_szc.css";
header{
    position: fixed !important;
}
#gpc_gdkl10{
    margin-top: 2.25rem;
}
</style>
