<template>
<div>
<header class="aui-bar aui-bar-nav">
    <div class="aui-pull-left aui-btn" @click="OncloseWin()">
        <span class="aui-iconfont aui-icon-left"></span>
    </div>
    <div>
        <div class="aui-title" @click="ChoiceType()"><span>新疆时时彩</span> <span id="pagetitle">{{playTypeName}}</span> <img src="../../assets/goucai/jjc/xiajiantou.png" /></div>
    </div>
    <div class="aui-pull-right aui-btn top-more" @click="menuPage()">
        <span></span><span></span><span></span>
    </div>
</header>

<div id="gpc_xjssc">

    <!-- 购彩类型 -->
    <div v-if="navTabStatue" class="nav-Tab" @click="hideChoice()">
        <div class="list">
            <li v-for='(item,index) in typeList' :class="{ select: danDallIdx == index }" @click="setChoice(item.play,item.name,index)">{{ item.name }}</li>
        </div>
    </div>
    <!-- 菜单 -->
    <div v-if="menuStatue" class="topMenu" @click='hidemoc()'>
        <ul>
            <li @click='toyilou()'>遗漏投注</li>
            <li @click='fenx()'>分享</li>
            <!-- <li @click='toHeMai()'>合买</li> -->
            <li @click='toPlay("xjssc")'>玩法</li>
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
        <div class="fgr"><template v-if="TimeText">下期开售时间</template><template v-else>投注剩余时间</template>:<span>{{surTimeminutes}}</span>分<span>{{surTimeseconds}}</span>秒</div>
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
                    <td style="width: 44%;">第{{ item.periodNumber }}期<span></span></td>
                    <td><span v-for="thal in item.result">{{ thal }}</span><span></span></td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- 大小单双内容 -->
    <div v-if="danDallIdx == 8" class="mc_cont mc_cont2">
		<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
        <div class="yaoyiyao" @click="RandomDxds()"><p>摇一摇机选</p></div>
        <div class="jieshao">{{ typeList[danDallIdx].text }}</div>
        <div class="shiwei">
            <div class="titl">请至少选1个号码</div>
            <div class="battle battle_red">
                <div class="battle_icon flr">十位<div class="right_arror"></div></div>
                <div class="battle_shuz flr">
                  <ul>
                    <template v-for="(item,index) in dxdxShiList">
                    <li :class="{ 'active': item.state }" @click="setdxdxShiList(index)"><span class="sp1">{{ item.id }}</span><span class="sp2" v-if="yilou">{{ redMiss.dxds.one[index] }}</span></li>
                    </template>
                    <!-- <li style="border: 0;"></li><li style="border: 0;"></li> -->
                  </ul>
                </div>
            </div>
        </div>
        <div class="gewei">
            <div class="titl">请至少选1个号码</div>
            <div class="battle battle_red">
                <div class="battle_icon flr">个位<div class="right_arror"></div></div>
                <div class="battle_shuz flr">
                    <ul>
                        <template v-for="(item,index) in dxdxGeList">
                            <li :class="{ 'active': item.state }" @click="setdxdxGeList(index)"><span class="sp1">{{ item.id }}</span><span class="sp2" v-if="yilou">{{ redMiss.dxds.two[index] }}</span></li>
                        </template>
                        <!-- <li style="border: 0;"></li><li style="border: 0;"></li> -->
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- 组选内容 -->
    <div v-else-if="danDallIdx == 2 || danDallIdx == 4 || danDallIdx == 5" class="mc_cont mc_cont2">
		<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
        <div v-if="danDallIdx == 4 || danDallIdx == 2" class="yaoyiyao" @click="RandomExzux()"><p>摇一摇机选</p></div>
        <div v-else class="yaoyiyao" @click="RandomSxzl()"><p>摇一摇机选</p></div>
        <div class="jieshao">{{ typeList[danDallIdx].text }}</div>
        <div class="gewei">
            <div class="battle battle_red">
                <div class="battle_icon flr">号码<div class="right_arror"></div></div>
                <div class="battle_shuz flr">
                    <ul>
                        <template v-for="(item,index) in geWeiList">
                            <li :class="{ 'active': item.state }" @click="setgeWeiList(index)"><span class="sp1">{{ item.id }}</span><span class="sp2" v-if="yilou">{{ MissDirect[index] }}</span></li>
                        </template>
                        <!-- <li style="border: 0;"></li><li style="border: 0;"></li> -->
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- 直选内容 -->
    <div v-else class="mc_cont mc_cont2">
		<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
        <div class="yaoyiyao" @click="Random()"><p>摇一摇机选</p></div>
        <div class="jieshao">{{ typeList[danDallIdx].text }}</div>
        <div v-if="danDallIdx == 6 || danDallIdx == 7" class="wanwei">
            <div class="titl">请至少选1个号码</div>
            <div class="battle battle_red">
                <div class="battle_icon flr">万位<div class="right_arror"></div></div>
                <div class="battle_shuz flr">
                    <ul>
                        <template v-for="(item,index) in wanWeiList">
                            <li :class="{ 'active': item.state }" @click="setwanWeiList(index)"><span class="sp1">{{ item.id }}</span><span class="sp2" v-if="yilou">{{ MissList.one[index] }}</span></li>
                        </template>
                        <!-- <li style="border: 0;"></li><li style="border: 0;"></li> -->
                    </ul>
                </div>
            </div>
        </div>
        <div v-if="danDallIdx == 6 || danDallIdx == 7" class="qianwei">
            <div class="titl">请至少选1个号码</div>
            <div class="battle battle_red">
                <div class="battle_icon flr">千位<div class="right_arror"></div></div>
                <div class="battle_shuz flr">
                    <ul>
                        <template v-for="(item,index) in qianWeiList">
                            <li :class="{ 'active': item.state }" @click="setqianWeiList(index)"><span class="sp1">{{ item.id }}</span><span class="sp2" v-if="yilou">{{ MissList.two[index] }}</span></li>
                        </template>
                        <!-- <li style="border: 0;"></li><li style="border: 0;"></li> -->
                    </ul>
                </div>
            </div>
        </div>
        <div v-if="danDallIdx == 6 || danDallIdx == 7 || danDallIdx == 3" class="baiwei">
            <div class="titl">请至少选1个号码</div>
            <div class="battle battle_red">
                <div class="battle_icon flr">百位<div class="right_arror"></div></div>
                <div class="battle_shuz flr">
                    <ul>
                        <template v-for="(item,index) in baiWeiList">
                            <li :class="{ 'active': item.state }" @click="setbaiWeiList(index)"><span class="sp1">{{ item.id }}</span><span class="sp2" v-if="yilou">{{ MissList.three[index] }}</span></li>
                        </template>
                        <!-- <li style="border: 0;"></li><li style="border: 0;"></li> -->
                    </ul>
                </div>
            </div>
        </div>
        <div v-if="danDallIdx == 6 || danDallIdx == 7 || danDallIdx == 3 || danDallIdx == 1" class="shiwei">
            <div class="titl">请至少选1个号码</div>
            <div class="battle battle_red">
                <div class="battle_icon flr">十位<div class="right_arror"></div></div>
                <div class="battle_shuz flr">
                    <ul>
                        <template v-for="(item,index) in shiWeiList">
                            <li :class="{ 'active': item.state }" @click="setshiWeiList(index)"><span class="sp1">{{ item.id }}</span><span class="sp2" v-if="yilou">{{ MissList.four[index] }}</span></li>
                        </template>
                        <!-- <li style="border: 0;"></li><li style="border: 0;"></li> -->
                    </ul>
                </div>
            </div>
        </div>
        <div class="gewei">
            <div class="titl">请至少选1个号码</div>
            <div class="battle battle_red">
                <div class="battle_icon flr">个位<div class="right_arror"></div></div>
                <div class="battle_shuz flr">
                    <ul>
                        <template v-for="(item,index) in geWeiList">
                            <li :class="{ 'active': item.state }" @click="setgeWeiList(index)"><span class="sp1">{{ item.id }}</span><span class="sp2" v-if="yilou">{{ MissList.five[index] }}</span></li>
                        </template>
                        <!-- <li style="border: 0;"></li><li style="border: 0;"></li> -->
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
		<footer  v-if="!TimeText && EndTime != -1">
		<div class="ft_money flr">
			<p>合计金额：<span>¥{{totalNum*2|numberFormat}}</span></p>
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
<!-- <footer v-if="!TimeText && EndTime != -1"> 
    <div class="ft_money flr">共<span>{{ totalNum }}</span>注<span>{{ totalNum*2 }}</span>元</div>
    <div class="ft_btn fgr"><div class="flr" @click="setClearList()">清除</div><div class="flr" @click="open_ssqpay()">投注<span v-if="betConlength > 0" class="pay_b">{{ betConlength > 99?"99":betConlength }}</span></div></div>
</footer> -->
</div>
</div>
</template>

<script>
    import checkokNav from '../../common/checkok.vue';
const SHAKE_SPEED = 300;
let lastTime = 0;//上次变化的时间
let x =0,y=0,z=0,lastX =0,lastY=0,lastZ=0;//位置变量初始化
import {getSession,setSession,getCookie,OverallData,openDownload} from '../../js/common.js';
import {Toast} from 'mint-ui';
// 监听滑动
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
            var gpc_xjssc = document.querySelector("#gpc_xjssc");
            switch (event.type){
                case "touchstart":
                    startY = event.touches[0].pageY;
                    scrollTops = gpc_xjssc.scrollTop;
                    break;
                case "touchend":
                    var spanY = event.changedTouches[0].pageY - startY;
                    if(spanY > 50 && scrollTops < 5){
						var heig = document.documentElement.clientHeight - document.getElementsByTagName("header")[0].offsetHeight
                        lastTen.style.height = "16rem";
                        gpc_xjssc.style.overflow = "hidden";
                        gpc_xjssc.style.height = heig+"px";
						xiedajian(0);
                    } else if (spanY < -50) {
                        lastTen.style.height = "0";
                        gpc_xjssc.removeAttribute("style");
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
        menuStatue: false,
        navTabStatue: false,
        playTypeName: '一星直选',
        gpc_xjssc: '',
        tb_mco: '',
        navTab: '',
        lastTen: '',
        interval: '',
        scrollTops: '',
        interval1: '',
        EndTime: 0,
        nowTime: 0,
        TimeText: false,
        current: 0,
        surTimedays: 0,
        surTimehours: 0,
        surTimeminutes: 0,
        surTimeseconds: 0,
        yilou: false,
        PastPerShow: true,
        ccarray: [],
        HistoryDraws: [],
        editThis: false,
        thisbetContent: 0,
        betConlength: 0,
        typeList: [
           {
           	'id': '0',
           	'name': '一星直选',
           	'play': 'one',
           	'playMethod': 'fixed',
           	'text': '至少选1个号码,猜对开奖号码最后一位即中10元'
           }, {
           	'id': '1',
           	'name': '二星直选',
           	'play': 'twoDirect',
           	'playMethod': 'direct',
           	'text': '每位至少选择1个号码，猜对开奖号后2位即中100元'
           }, {
           	'id': '2',
           	'name': '二星组选',
           	'play': 'twoGroup',
           	'playMethod': 'group',
           	'text': '至少选2个号码,猜对开奖号码后2位(顺序不限)即中50元'
           }, {
           	'id': '3',
           	'name': '三星直选',
           	'play': 'threeDirect',
           	'playMethod': 'direct',
           	'text': '每位至少选择1个号码，按位猜对开奖号码后3位即中1000元'
           }, {
           	'id': '4',
           	'name': '三星组三',
           	'play': 'threeGroup',
           	'playMethod': 'group3',
           	'text': '至少选择2个号码，猜对开奖号后3位(顺序不限)即中320元'
           }, {
           	'id': '5',
           	'name': '三星组六',
           	'play': 'threeGroup',
           	'playMethod': 'group6',
           	'text': '至少选择3个号码，猜对开奖号后3位(顺序不限)即中160元'
           }, {
           	'id': '6',
           	'name': '五星直选',
           	'play': 'five',
           	'playMethod': 'direct',
           	'text': '每位至少选择1个号码，按位猜对开奖号码即中100000元'
           }, {
           	'id': '7',
           	'name': '五星通选',
           	'play': 'five',
           	'playMethod': 'entire',
           	'text': '每位至少选择1个号码，按位猜对开奖号码最高奖20440元'
           }, {
           	'id': '8',
           	'name': '大小单双',
           	'play': 'dxds',
           	'playMethod': 'normal',
           	'text': '每位至少选择1个号码，猜对开奖后两位的属性即中4元'
           }
        ],
        redMiss: {'dxds': {'one': [0,0,0,0],'two': [0,0,0,0]}},
        MissList: {'one': [0,0,0,0,0,0,0,0,0],'two': [0,0,0,0,0,0,0,0,0],'three': [0,0,0,0,0,0,0,0,0],'four': [0,0,0,0,0,0,0,0,0],'five': [0,0,0,0,0,0,0,0,0]},
        MissDirect: [0,0,0,0,0,0,0,0,0],
        wanWeiList: [{'id':0,'state':false},{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},
                {'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false}],
        qianWeiList: [{'id':0,'state':false},{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},
                {'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false}],
        baiWeiList: [{'id':0,'state':false},{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},
                {'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false}],
        shiWeiList: [{'id':0,'state':false},{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},
                {'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false}],
        geWeiList: [{'id':0,'state':false},{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},
                {'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false}],
        dxdxShiList: [{'id':'大','state':false},{'id':'小','state':false},{'id':'单','state':false},{'id':'双','state':false}],
        dxdxGeList: [{'id':'大','state':false},{'id':'小','state':false},{'id':'单','state':false},{'id':'双','state':false}],
        wanlimitNumber: 0,
        qianlimitNumber: 0,
        bailimitNumber: 0,
        shilimitNumber: 0,
        gelimitNumber: 0,
        danDallIdx: 0,
        totalNum: 0,
        betContent: [],
        RouteLeave: false
    };
},
beforeRouteLeave (to, from , next) {
    if (this.RouteLeave) {
        next()
    } else {
        sessionStorage.removeItem('content');
        sessionStorage.removeItem('pageParam');
        sessionStorage.removeItem('betContent');
        sessionStorage.removeItem('pay');
        sessionStorage.removeItem('idx');
        sessionStorage.removeItem('list');
        sessionStorage.removeItem('noContinueNum');
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
        this.navname = getSession('name');
        this.danDallIdx = getSession('idx');
    }
	this.setTime();
	this.getHistoryDraws();
	this.getMiss();
    if(getSession("pay") == 1){   //继续选号
        this.continueChoose();
    }else if(getSession("pay") == 2){
        this.continueEdit();
    }
},
mounted() {
	this.gpc_xjssc = document.querySelector("#gpc_xjssc");
	this.lastTen = document.querySelector(".last_ten");
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
		var gpc_hbks = document.querySelector("#gpc_xjssc");
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
            if (speed > SHAKE_SPEED) {   //摇一摇触发随机事件
                if(this.danDallIdx == 8){
                    this.RandomDxds();
                }else if(this.danDallIdx == 2 || this.danDallIdx == 4){
                    this.RandomExzux();
                }else if(this.danDallIdx == 5){
                    this.RandomSxzl();
                }else{
                    this.Random();
                }
            }
            lastX = x;
            lastY = y;
            lastZ = z;
        }
    },
    continueChoose: function(){
        if(getSession('pageParam')){
            this.betContent = getSession('pageParam').betContent
            this.editThis = false;
            this.betConlength = this.betContent.length;
            this.setClearList();
        }else{
            this.betContent = [];
            this.betConlength = 0;
            this.editThis = false;
            this.setClearList();
            this.setTime();
        }
    },
    continueEdit: function(){
        if(getSession('pageParam')){
            this.setClearList();
            var betContent = getSession('pageParam').betContent;
            var index = getSession('index');
            this.betContent = betContent;
            this.editThis = true;
            this.thisbetContent = index;
            this.totalNum = betContent[index].totalNum
            this.betConlength = betContent.length - 1
            if (this.danDallIdx == 8) {
                for (var i = 0; i < betContent[index].ge.length; i++) {
                    for (var j = 0; j < this.dxdxGeList.length; j++) {
                        if (this.dxdxGeList[j].id == betContent[index].ge[i]) {
                            this.dxdxGeList[j].state = true;
                            this.gelimitNumber++
                            break;
                        }
                    }
                }
                for (var i = 0; i < betContent[index].shi.length; i++) {
                    for (var j = 0; j < this.dxdxShiList.length; j++) {
                        if (this.dxdxShiList[j].id == betContent[index].shi[i]) {
                            this.dxdxShiList[j].state = true;
                            this.shilimitNumber++
                            break;
                        }
                    }
                }
            } else {
                for (var i = 0; i < betContent[index].ge.length; i++) {
                    for (var j = 0; j < this.geWeiList.length; j++) {
                        if (this.geWeiList[j].id == betContent[index].ge[i]) {
                            this.geWeiList[j].state = true;
                            this.gelimitNumber++
                            break;
                        }
                    }
                }
                for (var i = 0; i < betContent[index].shi.length; i++) {
                    for (var j = 0; j < this.shiWeiList.length; j++) {
                        if (this.shiWeiList[j].id == betContent[index].shi[i]) {
                            this.shiWeiList[j].state = true;
                            this.shilimitNumber++
                            break;
                        }
                    }
                }
                for (var i = 0; i < betContent[index].bai.length; i++) {
                    for (var j = 0; j < this.baiWeiList.length; j++) {
                        if (this.baiWeiList[j].id == betContent[index].bai[i]) {
                            this.baiWeiList[j].state = true;
                            this.bailimitNumber++
                            break;
                        }
                    }
                }
                for (var i = 0; i < betContent[index].qian.length; i++) {
                    for (var j = 0; j < this.qianWeiList.length; j++) {
                        if (this.qianWeiList[j].id == betContent[index].qian[i]) {
                            this.qianWeiList[j].state = true;
                            this.qianlimitNumber++
                            break;
                        }
                    }
                }
                for (var i = 0; i < betContent[index].wan.length; i++) {
                    for (var j = 0; j < this.wanWeiList.length; j++) {
                        if (this.wanWeiList[j].id == betContent[index].wan[i]) {
                            this.wanWeiList[j].state = true;
                            this.wanlimitNumber++
                            break;
                        }
                    }
                }
            }
        }else{
            this.setClearList();
            this.editThis = true;
            this.betConlength = 0;
        }
    },
    setTime: function() {    //请求数据
    	var datas =  this.Qs.stringify({
    		"path":"number/keno/xjssc"
    	},{allowDots: true});
    
    	this.$ajax.post('/caipiaoshouye/index.php/home/index/getCurrentInfo',
    		datas
    	)
    	.then(res=>{
    		console.log(res);
    		if(res.data.status==200){
                var content=JSON.parse(res.data.content);
                if(content.code==100000){
                    this.EndTime=parseInt(content.data.endedTime) - 30000;
                    this.nowTime=parseInt(content.data.nowTime);
                    this.current=content.data.periodNumber;
                    this.setSurplusTime();
                }
                else if(content.code==201004){
                    this.EndTime=-1;
                }
            }
    	})
    	.catch(err=>{
    		console.log(err);
    	})
    },
    getMiss: function() {    //请求遗漏投注数据
    	var datas =  this.Qs.stringify({
    		"path":"number/keno/xjssc"
    	},{allowDots: true});
    
    	this.$ajax.post('/caipiaoshouye/index.php/home/index/getMiss',
    		datas
    	)
    	.then(res=>{
    		console.log(res);
    		if(res.data.status==200){
                var content = JSON.parse(res.data.content);
                if (content.code == 100000) {
                    var redMiss = {}
                    redMiss['dxds'] = {
                        'one': [content.data.dxds.onebigMiss,content.data.dxds.onesmallMiss,content.data.dxds.onesingleMiss,content.data.dxds.onedualMiss],
                        'two': [content.data.dxds.twobigMiss,content.data.dxds.twosmallMiss,content.data.dxds.twosingleMiss,content.data.dxds.twodualMiss]
                    }
                    redMiss['one'] = []
                    redMiss['twoDirect'] = {one:[],two:[]};
                    redMiss['twoGroup'] = [];
                    redMiss['threeDirect'] = {one:[],two:[],three:[]};
                    redMiss['threeGroup'] = [];
                    redMiss['five'] = {one:[],two:[],three:[],four:[],five:[]}
                    for (var i = 0; i < 10; i++) {
                        var onestr = "ball" + i + "Miss";
                        var twoDirone = "oneBall" + i + "Miss";
                        var twoDirtwo = "twoBall" + i + "Miss";
                        var twoGroup = "ball" + i + "Miss";
                        var threeDirOne = "oneBall" + i + "Miss";
                        var threeDirTwo = "twoBall" + i + "Miss";
                        var threeDirThree = "threeBall" + i + "Miss";
                        var threeGroup = "ball" + i + "Miss";
                        var fiveOne = "oneBall" + i + "Miss";
                        var fiveTwo = "twoBall" + i + "Miss";
                        var fiveThree = "threeBall" + i + "Miss";
                        var fiveFour = "fourBall" + i + "Miss";
                        var fiveFive = "fiveBall" + i + "Miss";
                        redMiss.one.push(content.data.one[onestr]);
                        redMiss.twoDirect.one.push(content.data.twoDirect[twoDirone]);
                        redMiss.twoDirect.two.push(content.data.twoDirect[twoDirtwo]);
                        redMiss.twoGroup.push(content.data.twoGroup[twoGroup]);
                        redMiss.threeDirect.one.push(content.data.threeDirect[threeDirOne]);
                        redMiss.threeDirect.two.push(content.data.threeDirect[threeDirTwo]);
                        redMiss.threeDirect.three.push(content.data.threeDirect[threeDirThree]);
                        redMiss.threeGroup.push(content.data.threeGroup[threeGroup]);
                        redMiss.five.one.push(content.data.five[fiveOne]);
                        redMiss.five.two.push(content.data.five[fiveTwo]);
                        redMiss.five.three.push(content.data.five[fiveThree]);
                        redMiss.five.four.push(content.data.five[fiveFour]);
                        redMiss.five.five.push(content.data.five[fiveFive]);
                    }
                    this.redMiss = redMiss
                    this.MissList.five = redMiss.one
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
    		"path":"number/keno/xjssc",data
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
                  EventUtil.listenTouchDirection(document.getElementById("gpc_xjssc"))
                }
            }
    	})
    	.catch(err=>{
    		console.log(err);
    	})
    },
    OncloseWin: function(){
        this.$router.go(-1);
    },
    setSurplusTime: function() {
        clearInterval(this.interval);
        this.TimeText = false;
        var endedTime = this.EndTime
        var surTime = endedTime - parseInt( this.nowTime/1000)*1000
        if (surTime <= 0) {
            surTime = surTime*1 + 30000
            this.setXiaqiTime(surTime);
            return false;
        }
        var sTm = this.formatDuring(surTime)
        this.surTimedays = sTm[0]
        this.surTimehours = sTm[1]
        this.surTimeminutes = sTm[2]
        this.surTimeseconds = sTm[3]
        var that = this
        this.interval = setInterval(function () {
            surTime = surTime - 1000
            if (surTime <= 0) {
                that.setXiaqiTime(30000);
                clearInterval(that.interval);
            }
            var Tm = that.formatDuring(surTime)
            that.surTimedays = Tm[0]
            that.surTimehours = Tm[1]
            that.surTimeminutes = Tm[2]
            that.surTimeseconds = Tm[3]
        },1000)
    },
    formatDuring: function(mss) {
        var days = parseInt(mss / (1000 * 60 * 60 * 24));
        var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = (mss % (1000 * 60)) / 1000;
        if (hours.toString().length<2) {
          hours = '0'+hours.toString();
        }
        if (minutes.toString().length<2) {
          minutes = '0'+minutes.toString();
        }
        if (seconds.toString().length<2) {
          seconds = '0'+seconds.toString();
        }
        return [days,hours,minutes,seconds]
    },
    setXiaqiTime: function(surTime) {
        clearInterval(this.interval1);
        this.TimeText = true;
        this.surTimeseconds = surTime/1000
        var that = this
        this.interval1 = setInterval(function () {
            surTime = surTime - 1000
            if (surTime <= 0) {
                that.setTime();
                clearInterval(that.interval1);
            }
            that.surTimeseconds = surTime/1000
        },1000)
    },
    ChoiceType: function(){   //点击筛选类型
        if (this.betContent.length > 0) {
            Toast('请选择同样的玩法进行投注');
            return false;
        }else{
            if(this.navTabStatue){
                this.navTabStatue = false;
            }else{
                this.navTabStatue = true;
                this.menuStatue = false;
            }
            this.lastTen.style.height = "0";
            this.gpc_xjssc.removeAttribute("style");
			this.bgzhuanhuan=false;
        }
    },
    menuPage: function(){   //点击右上角三个点
        if (this.menuStatue) {
            this.menuStatue = false;
        } else {
            this.navTabStatue = false;
            this.menuStatue = true;
        }
        this.lastTen.style.height = "0";
        this.gpc_xjssc.removeAttribute("style");
		this.bgzhuanhuan=false;
    },
    setChoice: function(play, name, idx) {
        this.setClearList()
        if (name) {
            setSession('playTypeName', name);
            setSession('name', play);
            setSession('idx', idx);
            this.playTypeName = getSession('playTypeName');
            this.danDallIdx = getSession('idx');
        }
        if (idx == 2) {
            this.MissDirect = this.redMiss.twoGroup
        } else if (idx == 4 || idx == 5) {
            this.MissDirect = this.redMiss.threeGroup
        }else if (idx == 0) {
            this.MissList.five = this.redMiss.one
        } else if (idx == 1) {
            this.MissList.four = this.redMiss.twoDirect.one
            this.MissList.five = this.redMiss.twoDirect.two
        } else if (idx == 3) {
            this.MissList.three = this.redMiss.threeDirect.one
            this.MissList.four = this.redMiss.threeDirect.two
            this.MissList.five = this.redMiss.threeDirect.three
        } else if (idx == 6 || idx == 7) {
            this.MissList = this.redMiss.five
        }
        //消除点击延时
        // FastClick.attach(document.body);
    },
    hideChoice: function() {
        this.navTabStatue = false;
    },
    toPlay(){   //  玩法
                // sessionStorage.setItem('play',document.querySelector('.aui-title').innerText);
                // location.href = 'http://www.baidu.com';
                this.$router.push({
                    path:"/goucai/play",
                    query:{
                        isApp:'0',
                        dataType:"xjssc"
                    }

                })
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
    },
    Random: function () {  // 随机选择
        if (this.danDallIdx == 6 || this.danDallIdx == 7) {
            var rand1 = this.generateRandom(10)   // 万位
            for (var i = 0; i < 10; i++) {
                this.wanWeiList[i].state = false
            }
            this.wanWeiList[rand1].state = true
            var rand2 = this.generateRandom(10)   // 千位
            for (var i = 0; i < 10; i++) {
                this.qianWeiList[i].state = false
            }
            this.qianWeiList[rand2].state = true
            this.wanlimitNumber = 1
            this.qianlimitNumber = 1
        }
        if (this.danDallIdx == 3 || this.danDallIdx == 6 || this.danDallIdx == 7) {
            var rand3 = this.generateRandom(10)   // 百位
            for (var i = 0; i < 10; i++) {
                this.baiWeiList[i].state = false
            }
            this.baiWeiList[rand3].state = true
            this.bailimitNumber = 1
        }
        if (this.danDallIdx == 1 || this.danDallIdx == 3 || this.danDallIdx == 6 || this.danDallIdx == 7) {
            var rand4 = this.generateRandom(10)   // 十位
            for (var i = 0; i < 10; i++) {
                this.shiWeiList[i].state = false
            }
            this.shiWeiList[rand4].state = true
            this.shilimitNumber = 1
        }
        var rand5 = this.generateRandom(10)    // 个位
        for (var i = 0; i < 10; i++) {
            this.geWeiList[i].state = false
        }
        this.geWeiList[rand5].state = true
        this.gelimitNumber = 1
        this.setTotalNum()
        //消除点击延时
        // FastClick.attach(document.body);
    },
    RandomExzux: function () {  // 二星组选随机选择
        for(var i = 0 ; ; i++){
            if(this.ccarray.length<2){
                var randZ = this.generateRandom(10)
                if (randZ != null && randZ < 10) {
                    this.ccarray.push(randZ);
                }
            }else{
                break;
            }
        }
        for (var i = 0; i < 10; i++) {
            this.geWeiList[i].state = false
        }
        for (var i = 0; i < 2; i++) {
            this.geWeiList[this.ccarray[i]].state = true
        }
        this.ccarray = []
        this.gelimitNumber = 2
        this.setTotalNum()
        //消除点击延时
        // FastClick.attach(document.body);
    },
    RandomSxzl: function () {   // 三星组六随机选择
        for(var i = 0 ; ; i++){
            if(this.ccarray.length<3){
                var randZ = this.generateRandom(10)
                if (randZ != null && randZ < 10) {
                    this.ccarray.push(randZ);
                }
            }else{
                break;
            }
        }
        for (var i = 0; i < 10; i++) {
            this.geWeiList[i].state = false
        }
        for (var i = 0; i < 3; i++) {
            this.geWeiList[this.ccarray[i]].state = true
        }
        this.ccarray = []
        this.gelimitNumber = 3
        this.setTotalNum()
        //消除点击延时
        // FastClick.attach(document.body);
    },
    RandomDxds: function () {   // 大小单双随机选择
        var randD = this.generateRandom(4)
        for (var i = 0; i < 4; i++) {
            this.dxdxShiList[i].state = false
        }
        this.dxdxShiList[randD].state = true
        var randX = this.generateRandom(4)
        for (var i = 0; i < 4; i++) {
            this.dxdxGeList[i].state = false
        }
        this.dxdxGeList[randX].state = true
        this.shilimitNumber = 1
        this.gelimitNumber = 1
        this.setTotalNum()
        //消除点击延时
        // FastClick.attach(document.body);
    },
    setwanWeiList: function (idx) {   // 选择
        var state = this.wanWeiList[idx].state
        if (state) {
            state = false
            this.wanlimitNumber--
        } else {
            state = true
            this.wanlimitNumber++
        }
        this.wanWeiList[idx].state = state
        this.setTotalNum()
        //消除点击延时
        // FastClick.attach(document.body);
    },
    setqianWeiList: function (idx) {
        var state = this.qianWeiList[idx].state
        if (state) {
            state = false
            this.qianlimitNumber--
        } else {
            state = true
            this.qianlimitNumber++
        }
        this.qianWeiList[idx].state = state
        this.setTotalNum()
        //消除点击延时
        // FastClick.attach(document.body);
    },
    setbaiWeiList: function (idx) {
        var state = this.baiWeiList[idx].state
        if (state) {
            state = false
            this.bailimitNumber--
        } else {
            state = true
            this.bailimitNumber++
        }
        this.baiWeiList[idx].state = state
        this.setTotalNum()
        //消除点击延时
        // FastClick.attach(document.body);
    },
    setshiWeiList: function (idx) {
        var state = this.shiWeiList[idx].state
        if (state) {
            state = false
            this.shilimitNumber--
        } else {
            state = true
            this.shilimitNumber++
        }
        this.shiWeiList[idx].state = state
        this.setTotalNum()
        //消除点击延时
        // FastClick.attach(document.body);
    },
    setgeWeiList: function (idx) {
        var state = this.geWeiList[idx].state
        if (state) {
            state = false
            this.gelimitNumber--
        } else {
            state = true
            this.gelimitNumber++
        }
        this.geWeiList[idx].state = state
        this.setTotalNum()
        //消除点击延时
        // FastClick.attach(document.body);
    },
    setdxdxShiList: function (idx) {
        var state = this.dxdxShiList[idx].state
        for (var i = 0; i < 4; i++) {
            this.dxdxShiList[i].state = false
        }
        if (state) {
            state = false
            this.shilimitNumber = 0
        } else {
            state = true
            this.shilimitNumber = 1
        }
        this.dxdxShiList[idx].state = state
        this.setTotalNum()
        //消除点击延时
        // FastClick.attach(document.body);
    },
    setdxdxGeList: function (idx) {
        var state = this.dxdxGeList[idx].state
        for (var i = 0; i < 4; i++) {
            this.dxdxGeList[i].state = false
        }
        if (state) {
            state = false
            this.gelimitNumber = 0
        } else {
            state = true
            this.gelimitNumber = 1
        }
        this.dxdxGeList[idx].state = state
        this.setTotalNum()
        //消除点击延时
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
        this.wanlimitNumber = 0
        this.qianlimitNumber = 0
        this.bailimitNumber = 0
        this.shilimitNumber = 0
        this.gelimitNumber = 0
        this.totalNum = 0
        for (var i = 0; i < 10; i++) {
            this.wanWeiList[i].state = false
            this.qianWeiList[i].state = false
            this.baiWeiList[i].state = false
            this.shiWeiList[i].state = false
            this.geWeiList[i].state = false
        }
        for (var i = 0; i < 4; i++) {
            this.dxdxShiList[i].state = false
            this.dxdxGeList[i].state = false
        }
        //消除点击延时
        // FastClick.attach(document.body);
    },
    setTotalNum: function () {   //注数计算
        var totalNum = 0;
        switch (this.danDallIdx) {
            case 0:
                totalNum = this.gelimitNumber*1
                break;
            case 1:
                totalNum = this.gelimitNumber*this.shilimitNumber
                break;
            case 2:
                totalNum = parseInt(this.getfactorial(this.gelimitNumber)/(this.getfactorial(this.gelimitNumber-2)*this.getfactorial(2)))
                break;
            case 3:
                totalNum = this.gelimitNumber*this.shilimitNumber*this.bailimitNumber
                break;
            case 4:
                totalNum = this.gelimitNumber*(this.gelimitNumber-1)
                break;
            case 5:
                totalNum = parseInt(this.getfactorial(this.gelimitNumber)/(this.getfactorial(this.gelimitNumber-3)*this.getfactorial(3)))
                break;
            case 6:
                totalNum = this.gelimitNumber*this.shilimitNumber*this.bailimitNumber*this.qianlimitNumber*this.wanlimitNumber
                break;
            case 7:
                totalNum = this.gelimitNumber*this.shilimitNumber*this.bailimitNumber*this.qianlimitNumber*this.wanlimitNumber
                break;
            case 8:
                totalNum = this.gelimitNumber*this.shilimitNumber
                break;
            default:
        }
        this.totalNum = totalNum
    },
    getfactorial: function(num){   //定义阶乘函数
        if (num < 0) {
            return -1;
        } else if (num === 0 || num === 1) {
            return 1;
        } else {
            for (var i = num - 1; i >= 1; i--) {
                num *= i;
            }
        }
        return num;
    },
    open_ssqpay: function(){   //点击投注
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
		// 	if(this.totalNum>100){
		//   Toast('注单数量最多100注!');
		//   return false;
		// }
        if (this.betConlength > 0 && this.totalNum < 1) {
            if (this.editThis) {
                this.betContent.splice(this.thisbetContent,1)
            }
            this.lastTen.style.height = "0";
            this.gpc_xjssc.removeAttribute("style");
            window.removeEventListener('devicemotion',this.motionHandler, false);
            this.RouteLeave = true;
            var content = {};
            setSession('betContent',this.betContent);
            content["betContent"] = this.betContent;
            content["danDallIdx"] = this.danDallIdx;
            content["playType"] = this.typeList[this.danDallIdx].play;
            content["titleName"] = this.typeList[this.danDallIdx].name;
            content["playMethod"] = this.typeList[this.danDallIdx].playMethod;
            console.log(content);
            setSession('content',content);
            this.$router.push({
            	name:'goucai_gpc_xjsscpay'
            });
        } else {
            if (this.totalNum < 1) {
                if (this.danDallIdx == 0) {
                    Toast('至少选择1组号码');
                    return false;
                } else if (this.danDallIdx == 1 || this.danDallIdx == 8) {
                    if (this.shilimitNumber == 0) {
                        Toast('十位至少选择1个号码');
                        return false;
                    } else {
                        Toast('个位至少选择1个号码');
                        return false;
                    }
                } else if (this.danDallIdx == 2 || this.danDallIdx == 4) {
                    Toast('至少选择2个号码');
                    return false;
                } else if (this.danDallIdx == 3) {
                    if (this.bailimitNumber == 0) {
                        Toast('百位至少选择1个号码');
                        return false;
                    } else if (this.shilimitNumber == 0) {
                        Toast('十位至少选择1个号码');
                        return false;
                    } else {
                        Toast('个位至少选择1个号码');
                        return false;
                    }
                } else if (this.danDallIdx == 5) {
                    Toast('至少选择3个号码');
                    return false;
                } else if (this.danDallIdx == 6 || this.danDallIdx == 7) {
                    if (this.wanlimitNumber == 0) {
                        Toast('万位至少选择1个号码');
                        return false;
                    } else if (this.qianlimitNumber == 0) {
                        Toast('千位至少选择1个号码');
                        return false;
                    } else if (this.bailimitNumber == 0) {
                        Toast('百位至少选择1个号码');
                        return false;
                    } else if (this.shilimitNumber == 0) {
                        Toast('十位至少选择1个号码');
                        return false;
                    } else {
                        Toast('个位至少选择1个号码');
                        return false;
                    }
                } else{
                    Toast('至少选择1组号码');
                    return false;
                }
            }
            // showLoading();
            var betContent = {wan:[],qian:[],bai:[],shi:[],ge:[],totalNum: this.totalNum,playType: this.typeList[this.danDallIdx].play,playMethod: this.typeList[this.danDallIdx].playMethod};
            if (this.danDallIdx == 8) {
                for (var i = 0; i < 4; i++) {
                    if (this.dxdxShiList[i].state) {
                        betContent.shi.push(this.dxdxShiList[i].id)
                    }
                    if (this.dxdxGeList[i].state) {
                        betContent.ge.push(this.dxdxGeList[i].id)
                    }
                }
            } else {
                for (var i = 0; i < 10; i++) {
                    if (this.geWeiList[i].state) {
                        betContent.ge.push(this.geWeiList[i].id)
                    }
                    if (this.shiWeiList[i].state) {
                      betContent.shi.push(this.shiWeiList[i].id)
                    }
                    if (this.baiWeiList[i].state) {
                      betContent.bai.push(this.baiWeiList[i].id)
                    }
                    if (this.qianWeiList[i].state) {
                      betContent.qian.push(this.qianWeiList[i].id)
                    }
                    if (this.wanWeiList[i].state) {
                      betContent.wan.push(this.wanWeiList[i].id)
                    }
                }
            }
            if (this.editThis) {
              this.betContent[this.thisbetContent] = betContent;
            } else {
              this.betContent.push(betContent);
            }
            // hideLoading();
            this.lastTen.style.height = "0";
            this.gpc_xjssc.removeAttribute("style");
            window.removeEventListener('devicemotion',this.motionHandler, false);
            this.RouteLeave = true;
            var content = {};
            setSession('betContent',this.betContent);
            content["betContent"] = this.betContent;
            content["danDallIdx"] = this.danDallIdx;
            content["playType"] = this.typeList[this.danDallIdx].play;
            content["titleName"] = this.typeList[this.danDallIdx].name;
            content["playMethod"] = this.typeList[this.danDallIdx].playMethod;
            console.log(content);
            setSession('content',content);
            this.$router.push({
            	name:'goucai_gpc_xjsscpay'
            });
        }
    },
},
}
</script>

<style scoped>
@import "../../css/goucai_szc.css";
header{
    position: fixed !important;
}
#gpc_xjssc{
    margin-top: 2.25rem;
}
</style>
