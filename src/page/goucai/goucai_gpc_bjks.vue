<template>
<div>
<header class="aui-bar aui-bar-nav">
    <div class="aui-pull-left aui-btn" @click="OncloseWin()">
        <span class="aui-iconfont aui-icon-left"></span>
    </div>
    <div>
        <div style="width:60%;left:4rem" class="aui-title" @click="ChoiceType()"><span>北京快三</span> <span id="pagetitle">{{playTypeName}}</span> <img src="../../assets/goucai/jjc/xiajiantou.png" /></div>
    </div>
    <div class="aui-pull-right aui-btn top-more" @click="menuPage()">
        <span></span><span></span><span></span>
    </div>
</header>

<div id="gpc_hbks" v-cloak>
    <!-- 购彩类型 -->
    <div v-if="navTabStatue" class="nav-Tab" @click="hideChoice()">
        <div class="list">
            <li v-for='(item,index) in typeList' :class="{ select: danDallIdx == index }" @click="setChoice(item.play,item.name,index)">{{ item.name }}</li>
        </div>
    </div>
    <!-- 菜单 -->
    <div v-if="menuStatue" class="topMenu" @click='hidemoc()'>
        <ul>
            <!-- <li @click='toyilou()'>遗漏投注</li> -->
            <li @click='fenx()'>分享</li>
            <!-- <li @click='toHeMai()'>合买</li> -->
                    <li @click='toPlay("k3")'>玩法</li>
        </ul>
    </div>
    <!-- 分享模态框 -->
    <div v-if="shareStatue" class="share_box" @click="hideShare()">
        <div class="share_cont">
            <div class="quxiao">取消</div>
            <div class="down" @click="openDownload()">前往下载</div>
        </div>
    </div>
    <div class="mc_content ks_content">
        <!-- 顶部期数 -->
        <div class="top_mc" v-if='EndTime>0||EndTime==0'>
            <div class="flr">第{{current}}期</div>
            <div class="fgr">{{text}}:<span>{{surTimeminutes}}</span>分<span>{{surTimeseconds}}</span>秒</div>
			<span class="icon_down"></span>
			<!-- icon_down :class="[ishide[index]?'icon_up':'icon_down']"-->
        </div>
		
        <div class="top_mc" v-else>
            <div class="flr">当前期已截止</div>
			<span  class="icon_down"></span>
			<!-- icon_down :class="[ishide[index]?'icon_up':'icon_down']"-->
        </div>
		
        <!-- 往期开奖 -->
        <div class="last_ten" style="display: block;">
            <table>
                <tbody>
                    <tr v-for="item in HistoryDraws">
                        <td style="width: 44%;">第{{ item.periodNumber }}期<span></span></td>
                        <td><span v-for="thal in item.result">{{ thal }}</span><span></span></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 和值内容 -->
        <div v-if="danDallIdx == 0" class="mc_cont ks_cont">
			<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
            <div class="yaoyiyao" @click="Random(0)"><p>摇一摇机选</p></div>
            <div class="battle">
                <div class="jieshao">猜开奖号码相加的和</div>
                <div class="battle_ks">
                    <ul id="hez">
                        <template v-for="(item,index) in heZhiList">
                            <li :class="{ 'active': item.state }" @click="setheZhiList(index)"><span>{{ item.id }}</span><br />奖金{{item.money}}元 </li>
                        </template>
                    </ul>
                </div>
            </div>
            <div class="battle">
                <div class="jieshao">快速选号</div>
                <div class="battle_ks xuan_h">
                    <ul class="xuanh">
                        <template v-for="(item,index) in xuanHaoList">
                            <li id='liDb' :class="{ 'active': item.state }" @click="setxuanHaoList(index)"><span>{{ item.id }}</span></li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 三同号通选内容 -->
        <div v-else-if="danDallIdx == 1" class="mc_cont ks_cont">
			<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
            <div class="battle">
                <div class="battle_ks battle_sthtx">
                    <ul>
                        <template v-for="(item,index) in sthtxList">
                            <li :class="{ 'active': item.state }" @click="setsthtxList(index)"><span>三同号通选</span><br /> 任意一个豹子开出即中{{item.money}}元</li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 三同号单选内容 -->
        <div v-else-if="danDallIdx == 2" class="mc_cont ks_cont">
			<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
            <div class="yaoyiyao" @click="Random(1)"><p>摇一摇机选</p></div>
            <div class="battle">
                <div class="battle_ks battle_sthdx">
                    <ul>
                        <template v-for="(item,index) in sthdxList">
                            <li :class="{ 'active': item.state }" @click="setsthdxList(index)"><span>{{item.id}}</span><br/> 奖金{{item.money}}元</li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 三不同号内容 -->
        <div v-else-if="danDallIdx == 3" class="mc_cont ks_cont">
			<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
            <div class="yaoyiyao" @click="Random(2)"><p>摇一摇机选</p></div>
            <div class="jieshao">选3个不同号码，与开奖相同即中40元</div>
            <div class="battle">
                <div class="battle_ks battle_sbth">
                    <ul>
                        <template v-for="(item,index) in sbthList">
                            <li :class="{ 'active': item.state }" @click="setsbthList(index)"><span>{{item.id}}</span></li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 三连号通选内容 -->
        <div v-else-if="danDallIdx == 4" class="mc_cont ks_cont">
			<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
            <div class="battle">
                <div class="jieshao slhtx_tit">123,234,345,456任意开出即中10元</div>
                <div class="battle_ks battle_slhtx">
                    <ul>
                        <template v-for="(item,index) in slhtxList">
                            <li :class="{ 'active': item.state }" @click="setslhtxList(index)"><span>三连号通选</span></li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 二同号复选内容 -->
        <div v-else-if="danDallIdx == 5" class="mc_cont ks_cont">
			<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
            <div class="yaoyiyao" @click="Random(3)"><p>摇一摇机选</p></div>
            <div class="jieshao">复选  猜开奖中2个指定的相同号码，奖金15元</div>
            <div class="battle">
                <div class="battle_ks battle_ethfx">
                    <ul>
                        <template v-for="(item,index) in ethfxList">
                            <li :class="{ 'active': item.state }" @click="setethfxList(index)"><span>{{item.id}}</span></li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 二同号单选内容 -->
        <div v-else-if="danDallIdx == 6" class="mc_cont ks_cont">
			<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
            <div class="yaoyiyao" @click="Random(4)"><p>摇一摇机选</p></div>
            <div class="jieshao">单选  选择同号和不同号的组合，奖金80元</div>
            <div class="battle">
                <div class="jieshao tit_ethdx">同号</div>
                <div class="battle_ks battle_ethdx">
                    <ul>
                        <template v-for="(item,index) in ethdxThList">
                            <li :class="{ 'active': item.state }" @click="setethdxThList(index)"><span>{{item.id}}</span></li>
                        </template>
                    </ul>
                </div>
            </div>
            <div class="battle">
                <div class="jieshao tit_ethdx">不同号</div>
                <div class="battle_ks battle_ethdx">
                    <ul>
                        <template v-for="(item,index) in ethdxBthList">
                            <li :class="{ 'active': item.state }" @click="setethdxBthList(index)"><span>{{item.id}}</span></li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 二不同号内容 -->
        <div v-else-if="danDallIdx == 7" class="mc_cont ks_cont">
			<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
            <div class="yaoyiyao" @click="Random(5)"><p>摇一摇机选</p></div>
            <div class="jieshao">选2个不同号码，猜中开奖的任意2位即中8元</div>
            <div class="battle">
                <div class="battle_ks battle_ebth">
                    <ul>
                        <template v-for="(item,index) in ebthList">
                            <li :class="{ 'active': item.state }" @click="setebthList(index)"><span>{{item.id}}</span></li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 三不同号胆拖内容 -->
        <div v-else-if="danDallIdx == 8" class="mc_cont ks_cont ks_dan_cont">
			<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
            <div class="jieshao">选3个不同号码，与开奖相同即中40元</div>
            <div class="battle battle_ntop">
                <div class="jieshao">最多只能选2个</div>
                <div class="battle_icon">胆码<div class="right_arror"></div></div>
                <div class="battle_ks battle_sbthdt">
                    <ul>
                        <template v-for="(item,index) in thdtDmList">
                            <li :class="{ 'active': item.state }" @click="setthdtDmList(index,3)"><span>{{ item.id }}</span></li>
                        </template>
                    </ul>
                </div>
            </div>
            <div class="battle">
                <div class="jieshao">最多只能选5个</div>
                <div class="battle_icon">拖码<div class="right_arror"></div></div>
                <div class="battle_ks battle_sbthdt">
                    <ul>
                        <template v-for="(item,index) in thdtTmList">
                            <li :class="{ 'active': item.state }" @click="setthdtTmList(index,3)"><span>{{ item.id }}</span></li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 二不同号胆拖内容 -->
        <div v-else class="mc_cont ks_cont ks_dan_cont">
			<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
            <div class="jieshao">选2个不同号码，猜中开奖的任意2位即中8元</div>
            <div class="battle battle_ntop">
                <div class="jieshao">最多只能选1个</div>
                <div class="battle_icon">胆码<div class="right_arror"></div></div>
                <div class="battle_ks battle_sbthdt">
                    <ul>
                        <template v-for="(item,index) in thdtDmList">
                            <li :class="{ 'active': item.state }" @click="setthdtDmList(index,2)"><span>{{ item.id }}</span></li>
                        </template>
                    </ul>
                </div>
            </div>
            <div class="battle">
                <div class="jieshao">最多只能选5个</div>
                <div class="battle_icon">拖码<div class="right_arror"></div></div>
                <div class="battle_ks battle_sbthdt">
                    <ul>
                        <template v-for="(item,index) in thdtTmList">
                            <li :class="{ 'active': item.state }" @click="setthdtTmList(index,2)"><span>{{ item.id }}</span></li>
                        </template>
                    </ul>
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
				<footer v-if='isShow'>
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
<!--    <footer v-if='isShow'>  
        <div class="ft_money flr">共<span>{{totalNum}}</span>注<span>{{totalPrice}}</span>元</div>
        <div class="ft_btn fgr"><div class="flr" @click="setClearList">清除</div><div class="flr" @click="open_ssqpay" >投注<span v-if="betConlength > 0" class="pay_b">{{ betConlength > 99?"99":betConlength }}</span></div></div>
    </footer> -->
</div>
</div>
</template>

<script>
    import checkokNav from '../../common/checkok.vue';
const SHAKE_SPEED = 300;
let lastTime = 0;//上次变化的时间
let x =0,y=0,z=0,lastX =0,lastY=0,lastZ=0;//位置变量初始化
import {getSession,setSession,getCookie,getfactorial,getTime,OverallData} from '../../js/common.js';
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
            var lastTen = document.querySelector(".last_ten");
            var gpc_hbks = document.querySelector("#gpc_hbks");
            switch (event.type){
                case "touchstart":
                    startY = event.touches[0].pageY;
                    scrollTops=gpc_hbks.scrollTop;
                    break;
                case "touchend":
                    var spanY = event.changedTouches[0].pageY - startY;
                    if(spanY > 50 && scrollTops  < 3){
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
        logok: false,  //未实名标志
        shareStatue: false,  //分享状态
        compileNum: false,//
		bgzhuanhuan:false,//箭头控制
        menuStatue: false,
        navTabStatue: false,
        playTypeName: '和值',
        indexs: '',
        gpc_hbks: '',
        tb_mco: '',
        navTab: '',
        lastTen: '',
        interval: '',
        inter: '',
        text:'投注剩余时间',
        current:0,
        isShow:true,
        cantchose: true,
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
        HistoryDraws: [],
        totalNum:0,
        totalPrice:0,
        selectedArr:[],
        typeList: [{'id': '0','name': '和值','play': 'hz'},{'id': '1','name': '三同号通选','play': 'sthtx'},{'id': '2','name': '三同号单选','play': 'sthdx'},
                  {'id': '3','name': '三不同号','play': 'sbth'},{'id': '4','name': '三连号通选','play': 'slhtx'},{'id': '5','name': '二同号复选','play': 'ethfx'},
                  {'id': '6','name': '二同号单选','play': 'ethdx'},{'id': '7','name': '二不同号','play': 'ebth'},
                  {'id': '8','name': '三不同号胆拖','play': 'sbthdt'},{'id': '9','name': '二不同号胆拖','play': 'ebthdt'}],
        heZhiList: [{'id':3,'money':240,'state':false},{'id':4,'money':80,'state':false},{'id':5,'money':40,'state':false},{'id':6,'money':25,'state':false},{'id':7,'money':16,'state':false},
                    {'id':8,'money':12,'state':false},{'id':9,'money':10,'state':false},{'id':10,'money':9,'state':false},{'id':11,'money':9,'state':false},{'id':12,'money':10,'state':false},
                    {'id':13,'money':12,'state':false},{'id':14,'money':16,'state':false},{'id':15,'money':25,'state':false},{'id':16,'money':40,'state':false},{'id':17,'money':80,'state':false},
                    {'id':18,'money':240,'state':false}],
        xuanHaoList: [{'id':'大','state':false},{'id':'小','state':false},{'id':'单','state':false},{'id':'双','state':false}],
        sthtxList: [{'money':40,'state':false}],
        sthdxList: [{'id':111,'money':240,'state':false},{'id':222,'money':240,'state':false},{'id':333,'money':240,'state':false},{'id':444,'money':240,'state':false},{'id':555,'money':240,'state':false},{'id':666,'money':240,'state':false}],
        sbthList: [{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false}],
        slhtxList: [{'id':1,'state':false}],
        ethfxList: [{'id':11,'state':false},{'id':22,'state':false},{'id':33,'state':false},{'id':44,'state':false},{'id':55,'state':false},{'id':66,'state':false}],
        ethdxThList: [{'id':11,'state':false},{'id':22,'state':false},{'id':33,'state':false},{'id':44,'state':false},{'id':55,'state':false},{'id':66,'state':false}],
        ethdxBthList: [{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false}],
        ebthList: [{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false}],
        thdtDmList: [{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false}],
        thdtTmList: [{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false}],
        danDallIdx: 0,
        choseLeng:0,
        tongChoseLeng:0,
        BuTchoseLeng:0,
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
    if(getSession('playTypeName')){
        this.playTypeName = getSession('playTypeName');
        this.danDallIdx = getSession('idx');
    }
	this.setTime();
	this.getHistoryDraws();
    if(getSession("pay") == 0){
        this.cantchose=true;
    }else if(getSession("pay") == 1){   //继续选号
        this.continueChoose();
    }else if(getSession("pay") == 2){   //继续编辑
        this.continueEdit();
    }
},
mounted() {
	this.gpc_hbks = document.querySelector("#gpc_hbks");
	this.topMenu = document.querySelector(".topMenu");
	this.navTab = document.querySelector(".nav-Tab");
	this.lastTen = document.querySelector(".last_ten");
    if(window.DeviceMotionEvent) {
        window.addEventListener('devicemotion',this.motionHandler, false);
    } else {
        console.log("你的设备不支持位置感应!");
    }
	 window.xiedajian = this.xiedajian;
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
		var gpc_hbks = document.querySelector("#gpc_hbks");
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
                        dataType:"k3"
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
    continueChoose: function(){
        this.cantchose=false;
        this.setTime();
        this.selectedArr= getSession('ssqBetList');
        this.betConlength= getSession('ssqBetList').length;
    },
    continueEdit: function(){
        this.cantchose=false;
        this.setTime();
        var arr=getSession('ssqBetList');
        this.selectedArr=arr;
        this.betConlength=arr.length-1;
        this.compileNum=true;
        this.indexs=getSession('index');
        var arrs= arr[this.indexs];
        this.totalNum=arrs.totalNum;
        this.totalPrice=parseInt(arrs.totalNum)*2;
        var index=arrs.limitNumber;
        if (index==0) {
            var thisArr=this.heZhiList;
            this.choseLeng=arrs.redQiu.length;
            for (var i = 0; i<arrs.redQiu.length; i++) {
                for (var n = 0; n < thisArr.length; n++) {
                    if (arrs.redQiu[i]==thisArr[n].id) {
                        thisArr[n].state=true;
                    }
                }
            };
        }else if (index==1) {
            this.sthtxList[0].state=true;
            this.choseLeng=1;
        }else if (index==2) {
            var thisArr=this.sthdxList;
            this.choseLeng=arrs.redQiu.length;
            for (var i = 0; i<arrs.redQiu.length; i++) {
                for (var n = 0; n < thisArr.length; n++) {
                    if (arrs.redQiu[i]==thisArr[n].id) {
                        thisArr[n].state=true;
                    }
                }
            };
        }else if (index==3) {
            var thisArr=this.sbthList;
            this.choseLeng=arrs.redQiu.length;
            for (var i = 0; i<arrs.redQiu.length; i++) {
                for (var n = 0; n < thisArr.length; n++) {
                    if (arrs.redQiu[i]==thisArr[n].id) {
                        thisArr[n].state=true;
                    }
                }
            };
        }else if (index==4) {
            this.slhtxList[0].state=true;
            this.choseLeng=1;
        }else if (index==5) {
            var thisArr=this.ethfxList;
            this.choseLeng=arrs.redQiu.length;
            for (var i = 0; i<arrs.redQiu.length; i++) {
                for (var n = 0; n < thisArr.length; n++) {
                    if (arrs.redQiu[i]==thisArr[n].id) {
                        thisArr[n].state=true;
                    }
                }
            };
        }else if (index==6) {
            var thisArr=this.ethdxThList;
            this.tongChoseLeng=arrs.tongArr.length;
            for (var i = 0; i<arrs.tongArr.length; i++) {
                for (var n = 0; n < thisArr.length; n++) {
                    if (arrs.tongArr[i]==thisArr[n].id) {
                        thisArr[n].state=true;
                    }
                }
            };
            var thisArr1=this.ethdxBthList;
            this.BuTchoseLeng=arrs.bTongArr.length;
            for (var x = 0; x<arrs.bTongArr.length; x++) {
                for (var y = 0; y < thisArr1.length; y++) {
                    if (arrs.bTongArr[x]==thisArr1[y].id) {
                        thisArr1[y].state=true;
                    }
                }
            };
        }else if (index==7) {
            var thisArr=this.ebthList;
            this.choseLeng=arrs.redQiu.length;
            for (var i = 0; i<arrs.redQiu.length; i++) {
                for (var n = 0; n < thisArr.length; n++) {
                    if (arrs.redQiu[i]==thisArr[n].id) {
                        thisArr[n].state=true;
                    }
                }
            };
        }else if (index==8||index==9) {
            var thisArr=this.thdtDmList;
            this.tongChoseLeng=arrs.danArr.length;
            for (var i = 0; i<arrs.danArr.length; i++) {
                for (var n = 0; n < thisArr.length; n++) {
                    if (arrs.danArr[i]==thisArr[n].id) {
                        thisArr[n].state=true;
                    }
                }
            };
            var thisArr1=this.thdtTmList;
            this.BuTchoseLeng=arrs.tuoArr.length;
            for (var x = 0; x<arrs.tuoArr.length; x++) {
                for (var y = 0; y < thisArr1.length; y++) {
                    if (arrs.tuoArr[x]==thisArr1[y].id) {
                        thisArr1[y].state=true;
                    }
                }
            };
        }
    },
    setTime: function() {    //请求数据
    	var datas =  this.Qs.stringify({
    		"path":"number/keno/bjk3"
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
                    if (this.EndTime<=0) {
                        this.isShow=false;
                    }
                    this.nowTime=parseInt(content.data.nowTime);
                    this.current=content.data.periodNumber;
                    this.setSurplusTime();
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
    		"path":"number/keno/bjk3",data
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
                  EventUtil.listenTouchDirection(document.getElementById("gpc_hbks"));
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
        console.log(this.EndTime);
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
    OncloseWin: function(){
    	this.$router.go(-1);
    },
    ChoiceType: function(){   //选择类型 
        if(this.cantchose){
            if(this.navTabStatue){
                this.navTabStatue = false;
            }else{
                this.navTabStatue = true;
                this.menuStatue = false;
            }
            this.lastTen.style.height = "0";
            this.gpc_hbks.removeAttribute("style");
			this.bgzhuanhuan=false;
        }else {
            Toast('请选择相同玩法进行投注！')
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
        this.gpc_hbks.removeAttribute("style");
		this.bgzhuanhuan=false;
    },
    setChoice: function(play, name, idx) {
        this.setClearList();
        if(idx==1||idx==4||idx==8||idx==9){
            window.removeEventListener('devicemotion',this.motionHandler, false);
        }else {
            window.addEventListener('devicemotion',this.motionHandler, false);
        }
        if (name) {
            setSession('playTypeName', name);
            setSession('name', play);
            setSession('idx', idx);
            this.playTypeName = getSession('playTypeName');
            this.danDallIdx = getSession('idx');
        }
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
    hidemoc: function() {
        this.menuStatue = false;
    },
    Random: function (e) {   // 随机选择
        this.setClearList();
        this.choseLeng=0;
        var e=this.danDallIdx;
        if (e==0) {  // 和值
            var rand = parseInt(Math.random()*16)
            this.heZhiList[rand].state = true;
            this.choseLeng=1;
            this.totalNum=1;
            this.totalPrice=2;
        }else if (e==2) {  // 三同号单选
            var rand = parseInt(Math.random()*6)
            this.sthdxList[rand].state = true;
            this.choseLeng=1;
            this.totalNum=1;
            this.totalPrice=2;
        }else if (e==3) {//三不同号
            var arr=[];
            while (arr.length<3) {
                var rand = parseInt(Math.random()*6);
                if (arr.indexOf(rand)<0) {
                    arr.push(rand)
                }
            }
            for (var x = 0; x < arr.length; x++) {
                this.sbthList[arr[x]].state = true;
            }
            this.choseLeng=3;
            this.totalNum=1;
            this.totalPrice=2;
        }else if (e==5) {  // 二同号复选
            var rand = parseInt(Math.random()*6)
            this.ethfxList[rand].state = true;
            this.choseLeng=1;
            this.totalNum=1;
            this.totalPrice=2;
        }else if (e==6) {//二同号单选
            var arr=[];
            while (arr.length<2) {
                var rand = parseInt(Math.random()*6);
                if (arr.indexOf(rand)<0) {
                    arr.push(rand)
                }
            }
            this.ethdxThList[arr[0]].state = true;
            this.ethdxBthList[arr[1]].state = true;
            this.tongChoseLeng=1;
            this.BuTchoseLeng=1;
            this.totalNum=1;
            this.totalPrice=2;
        }else if (e==7) {//三不同号
            var arr=[];
            while (arr.length<2) {
                var rand = parseInt(Math.random()*6);
                if (arr.indexOf(rand)<0) {
                    arr.push(rand)
                }
            }
            for (var x = 0; x < arr.length; x++) {
                this.ebthList[arr[x]].state = true;
            }
            this.choseLeng=2;
            this.totalNum=1;
            this.totalPrice=2;
        }
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    setheZhiList: function (idx) {     //和值选择
        var state = this.heZhiList[idx].state
        if (state) {
            state = false;
            this.choseLeng--;
        } else {
            state = true;
            this.choseLeng++;
        }
        this.heZhiList[idx].state = state;
        var rnums=parseInt(this.choseLeng);
        this.totalNum=rnums;
        this.totalPrice=rnums*2;
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    setxuanHaoList: function (idx) {  //和值快选
        for (var i = 0; i < this.heZhiList.length; i++) {
            this.heZhiList[i].state = false
        }
        this.totalNum=0;
        this.totalPrice=0;
        this.choseLeng=0;
        var state = this.xuanHaoList[idx].state;
        if (state) {
            state = false;
            this.xuanHaoList[idx].state = state;
        } else {
            state = true
            this.xuanHaoList[idx].state = state;
            if (idx==0) {this.xuanHaoList[1].state = false;}
            else if (idx==1) {this.xuanHaoList[0].state = false;}
            else if (idx==2) {this.xuanHaoList[3].state = false;}
            else if (idx==3) {this.xuanHaoList[2].state = false;}
        }
        var xuanZe;
        if (this.xuanHaoList[0].state===false&&this.xuanHaoList[1].state===false&&this.xuanHaoList[2].state===false&&this.xuanHaoList[3].state===false) {
            xuanZe=[];
        }else if (this.xuanHaoList[0].state&&this.xuanHaoList[2].state) {
            xuanZe=[8,10,12,14];
        }else if (this.xuanHaoList[0].state&&this.xuanHaoList[3].state) {
            xuanZe=[9,11,13,15];
        }else if (this.xuanHaoList[1].state&&this.xuanHaoList[2].state) {
            xuanZe=[0,2,4,6];
        }else if (this.xuanHaoList[1].state&&this.xuanHaoList[3].state) {
            xuanZe=[1,3,5,7];
        }else if (this.xuanHaoList[0].state) {
            xuanZe=[8,9,10,11,12,13,14,15];
        }else if (this.xuanHaoList[1].state) {
            xuanZe=[0,1,2,3,4,5,6,7];
        }else if (this.xuanHaoList[2].state) {
            xuanZe=[0,2,4,6,8,10,12,14];
        }else if (this.xuanHaoList[3].state) {
            xuanZe=[1,3,5,7,9,11,13,15];
        }
        for (var z = 0; z < xuanZe.length; z++) {
            this.heZhiList[xuanZe[z]].state = true;
        };
        this.totalNum=xuanZe.length;
        this.totalPrice=parseInt(xuanZe.length)*2;
        this.choseLeng=xuanZe.length;
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    setsthtxList:function(idx){   //三同号通选
        var state = this.sthtxList[idx].state
        if (state) {
            state = false;
            this.choseLeng--;
        } else {
            state = true;
            this.choseLeng++;
        }
        this.sthtxList[idx].state = state;
        var rnums=parseInt(this.choseLeng);
        this.totalNum=rnums;
        this.totalPrice=rnums*2;
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    setsthdxList:function(idx){   //三同号单选
        var state = this.sthdxList[idx].state
        if (state) {
            state = false;
            this.choseLeng--;
        } else {
            state = true;
            this.choseLeng++;
        }
        this.sthdxList[idx].state = state;
        var rnums=parseInt(this.choseLeng);
        this.totalNum=rnums;
        this.totalPrice=rnums*2;
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    setsbthList:function(idx){  //三同号单选
        var state = this.sbthList[idx].state
        if (state) {
            state = false;
            this.choseLeng--;
        } else {
            state = true;
            this.choseLeng++;
        }
        this.sbthList[idx].state = state;
        var rnums=parseInt(this.choseLeng);
        if (rnums<3){
            this.totalNum=0;
            this.totalPrice=0;
        }else {
            var totalNum=getfactorial(rnums)/(getfactorial(3)*getfactorial(rnums-3))
            this.totalNum=totalNum;
            this.totalPrice=totalNum*2;
        }
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    setslhtxList:function(idx){  //三连号通选
        var state = this.slhtxList[idx].state
        if (state) {
            state = false;
            this.choseLeng--;
        } else {
            state = true;
            this.choseLeng++;
        }
        this.slhtxList[idx].state = state;
        var rnums=parseInt(this.choseLeng);
        this.totalNum=rnums;
        this.totalPrice=rnums*2;
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    setethfxList:function(idx){  //二同号复选
        var state = this.ethfxList[idx].state
        if (state) {
            state = false;
            this.choseLeng--;
        } else {
            state = true;
            this.choseLeng++;
        }
        this.ethfxList[idx].state = state;
        var rnums=parseInt(this.choseLeng);
        this.totalNum=rnums;
        this.totalPrice=rnums*2;
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    setethdxThList:function(idx){  //二同号单选  同号
        var state = this.ethdxThList[idx].state
        if (state) {
            state = false;
            this.tongChoseLeng--;
        } else {
            state = true;
            this.tongChoseLeng++;
        }
        this.ethdxThList[idx].state = state;
        var rnums=parseInt(this.tongChoseLeng);
        var tnums=parseInt(this.BuTchoseLeng);
        if (rnums<1||tnums<1){
            this.totalNum=0;
            this.totalPrice=0;
        }else {
            var totalNum=rnums*tnums
            this.totalNum=totalNum;
            this.totalPrice=totalNum*2;
        }
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    setethdxBthList:function(idx){  //二同号单选  不同号
        var state = this.ethdxBthList[idx].state
        if (state) {
            state = false;
            this.BuTchoseLeng--;
        } else {
            state = true;
            this.BuTchoseLeng++;
        }
        this.ethdxBthList[idx].state = state;
        var rnums=parseInt(this.tongChoseLeng);
        var tnums=parseInt(this.BuTchoseLeng);
        if (rnums<1||tnums<1){
            this.totalNum=0;
            this.totalPrice=0;
        }else {
            var totalNum=rnums*tnums
            this.totalNum=totalNum;
            this.totalPrice=totalNum*2;
        }
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    setebthList:function(idx){   //二不同号
        var state = this.ebthList[idx].state
        if (state) {
            state = false;
            this.choseLeng--;
        } else {
            state = true;
            this.choseLeng++;
        }
        this.ebthList[idx].state = state;
        var rnums=parseInt(this.choseLeng);
        if (rnums<2){
            this.totalNum=0;
            this.totalPrice=0;
        }else {
            var totalNum=getfactorial(rnums)/(getfactorial(2)*getfactorial(rnums-2))
            this.totalNum=totalNum;
            this.totalPrice=totalNum*2;
        }
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    setthdtDmList:function(idx,i){   // 二 三不同号胆
        var state = this.thdtDmList[idx].state;
		var isChosed;
		for (var x = 0; x < this.thdtDmList.length; x++) {
		  if (this.thdtDmList[x].state) {
				  isChosed=x;
		  }
		}
        if (state) {
            state = false;
            this.tongChoseLeng--;
        } else {
            if (this.tongChoseLeng<i-1) {
                state = true;
                this.tongChoseLeng++;
                if (this.thdtTmList[idx].state) {
                    this.thdtTmList[idx].state=false;
                    this.BuTchoseLeng--;
                }
            }else {
				if(i==2){
					this.thdtDmList[isChosed].state = false;
					 state = true;
					if (this.thdtTmList[idx].state) {
					    this.thdtTmList[idx].state=false;
					    this.BuTchoseLeng--;
					}
				}else{
					Toast('最多选择'+(i-1)+'个胆码！');
					return
				}
                
            }
        }
        this.thdtDmList[idx].state = state;
        var dnums=parseInt(this.tongChoseLeng);
        var tnums=parseInt(this.BuTchoseLeng);
        if (dnums>0&&dnums+tnums>=i){
            var totalNum=getfactorial(tnums)/(getfactorial(i-dnums)*getfactorial(tnums-i+dnums));
            this.totalNum=totalNum;
            this.totalPrice=totalNum*2;
        }else {
            this.totalNum=0;
            this.totalPrice=0;
        }
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    setthdtTmList:function(idx,i){   //二 三不同号拖
        var state = this.thdtTmList[idx].state
        if (state) {
            state = false;
            this.BuTchoseLeng--;
        } else {
            if (this.BuTchoseLeng<5) {
                state = true;
                this.BuTchoseLeng++;
                if (this.thdtDmList[idx].state) {
                  this.thdtDmList[idx].state=false;
                    this.tongChoseLeng--;
                   }
            }else {
                Toast('最多选择5个拖码！');
                return
            }
        }
        this.thdtTmList[idx].state = state;
        var dnums=parseInt(this.tongChoseLeng);
        var tnums=parseInt(this.BuTchoseLeng);
        if (dnums>0&&dnums+tnums>=i){
            var totalNum=getfactorial(tnums)/(getfactorial(i-dnums)*getfactorial(tnums-i+dnums));
            this.totalNum=totalNum;
            this.totalPrice=totalNum*2;
        }else {
            this.totalNum=0;
            this.totalPrice=0;
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
    setClearList: function(){   // 清除
        for (var i = 0; i < this.heZhiList.length; i++) {
            this.heZhiList[i].state = false
        }
        for (var i = 0; i < this.xuanHaoList.length; i++) {
            this.xuanHaoList[i].state = false
        }
        for (var i = 0; i < this.sthtxList.length; i++) {
            this.sthtxList[i].state = false
        }
        for (var i = 0; i < this.slhtxList.length; i++) {
            this.slhtxList[i].state = false
        }
        for (var i = 0; i < 6; i++) {
            this.sthdxList[i].state = false
            this.sbthList[i].state = false
            this.ethfxList[i].state = false
            this.ethdxThList[i].state = false
            this.ethdxBthList[i].state = false
            this.ebthList[i].state = false
            this.thdtDmList[i].state = false
            this.thdtTmList[i].state = false
        };
        this.choseLeng=0;
        this.totalNum=0;
        this.totalPrice=0;
        this.tongChoseLeng=0;
        this.BuTchoseLeng=0;
        //消除点击300毫秒延时
        // FastClick.attach(document.body);
    },
    open_ssqpay:function (){
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
		if(this.totalNum>100){
        Toast('注单数量最多100注!');
        return false;
      }
        var index=this.danDallIdx;
        var choseLeng=this.choseLeng;
        var ssqBetArr;
        if (this.betConlength<=0||this.totalNum>0) {
            var ssqBetList={};
            ssqBetList.playType=this.typeList[index].name;
            ssqBetList.totalNum=this.totalNum;
            ssqBetList.limitNumber=index;
            ssqBetList.totalPrice=this.totalPrice;
            ssqBetList.current = this.current;
            if (index==0) {
                if(choseLeng<1){
                    Toast('最少选择1注！');
                    return
                };
                var redDallList=this.heZhiList;
                var redQiu=[];
                for (var i = 0; i < redDallList.length; i++) {
                    if (redDallList[i].state) {
                        redQiu.push(redDallList[i].id);
                    }
                }
                ssqBetList.redQiu=redQiu;
            }else if (index==1) {
                if(choseLeng<1){
                    Toast('最少选择1注！');
                    return
                };
                var redDallList=this.sthtxList;
                var redQiu=[];
                for (var i = 0; i < redDallList.length; i++) {
                    if (redDallList[i].state) {
                        redQiu=[111,222,333,444,555,666];
                    }
                }
                ssqBetList.redQiu=redQiu;
            }else if (index==2) {
                if(choseLeng<1){
                    Toast('最少选择1注！');
                    return
                };
                var redDallList=this.sthdxList;
                var redQiu=[];
                for (var i = 0; i < redDallList.length; i++) {
                    if (redDallList[i].state) {
                        redQiu.push(redDallList[i].id);
                    }
                }
            ssqBetList.redQiu=redQiu;
            }else if (index==3) {
                if(choseLeng<3){
                    Toast('最少选择3个不同号码！');
                    return
                };
                var redDallList=this.sbthList;
                var redQiu=[];
                for (var i = 0; i < redDallList.length; i++) {
                    if (redDallList[i].state) {
                        redQiu.push(redDallList[i].id);
                    }
                }
                ssqBetList.redQiu=redQiu;
            }else if (index==4) {
                if(choseLeng<1){
                    Toast('最少选择1注！');
                    return
                };
                var redDallList=this.slhtxList;
                var redQiu=[];
                for (var i = 0; i < redDallList.length; i++) {
                    if (redDallList[i].state) {
                        redQiu=[123,234,345,456];
                    }
                }
                ssqBetList.redQiu=redQiu;
            }else if (index==5) {
                if(choseLeng<1){
                    Toast('最少选择1注！');
                    return
                };
                var redDallList=this.ethfxList;
                var redQiu=[];
                for (var i = 0; i < redDallList.length; i++) {
                    if (redDallList[i].state) {
                        redQiu.push(redDallList[i].id);
                    }
                }
                ssqBetList.redQiu=redQiu;
            }else if (index==6) {
                if(this.tongChoseLeng<1){
                    Toast('最少选择1个同号！');
                    return
                };
                if(this.BuTchoseLeng<1){
                    Toast('最少选择1个不同号！');
                    return
                };
                var redDallList=this.ethdxThList;
                var redQiu=[];
                for (var i = 0; i < redDallList.length; i++) {
                    if (redDallList[i].state) {
                        redQiu.push(redDallList[i].id);
                    }
                }
                ssqBetList.tongArr=redQiu;
                var redDallList1=this.ethdxBthList;
                var redQiu1=[];
                for (var i = 0; i < redDallList1.length; i++) {
                    if (redDallList1[i].state) {
                        redQiu1.push(redDallList1[i].id);
                    }
                }
                ssqBetList.bTongArr=redQiu1;
            }else if (index==7) {
                if(choseLeng<2){
                    Toast('最少选择2个不同号码！');
                    return
                };
                var redDallList=this.ebthList;
                var redQiu=[];
                for (var i = 0; i < redDallList.length; i++) {
                    if (redDallList[i].state) {
                        redQiu.push(redDallList[i].id);
                    }
                }
                ssqBetList.redQiu=redQiu;
            }else if (index==8||index==9) {
                var num;
                if (index==8) {
                    num=4;
                }else {
                    num=3;
                }
                if(this.tongChoseLeng<1){
                    Toast('最少选择1个胆码！');
                    return
                };
                if(this.tongChoseLeng+this.BuTchoseLeng<num){
                    var i=num-this.tongChoseLeng;
                    Toast('最少选择'+i+'个拖码！');
                    return
                };
                var redDallList=this.thdtDmList;
                var redQiu=[];
                for (var i = 0; i < redDallList.length; i++) {
                    if (redDallList[i].state) {
                        redQiu.push(redDallList[i].id);
                    }
                }
                ssqBetList.danArr=redQiu;
                var redDallList1=this.thdtTmList;
                var redQiu1=[];
                for (var i = 0; i < redDallList1.length; i++) {
                    if (redDallList1[i].state) {
                        redQiu1.push(redDallList1[i].id);
                    }
                }
                ssqBetList.tuoArr=redQiu1;
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
        this.setClearList();
        this.selectedArr=[];
        this.betConlength=0;
        this.lastTen.style.height = "0";
        this.gpc_hbks.removeAttribute("style");
        window.removeEventListener('devicemotion',this.motionHandler, false);
        this.RouteLeave = true;
        var content = {};
        setSession('ssqBetList',ssqBetArr);
        content["current"] = this.current;
        content["endedTime"] = getTime(this.EndTime,1);
        content["name"] = this.typeList[index].name;
        content["limitNumber"] = index;
        setSession('content',content);
        this.$router.push({
            name:'goucai_gpc_bjkspay'
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
#gpc_hbks{
    margin-top: 2.25rem;
}
</style>
