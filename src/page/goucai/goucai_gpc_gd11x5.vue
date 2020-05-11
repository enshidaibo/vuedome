<template>
<div>
<header class="aui-bar aui-bar-nav">
    <div class="aui-pull-left aui-btn" @click="OncloseWin()">
        <span class="aui-iconfont aui-icon-left"></span>
    </div>
    <div>
        <div class="aui-title" @click="ChoiceType()"><span>广东11选5</span> <span id="pagetitle">{{navname}}{{playTypeName}}</span> <img src="../../assets/goucai/jjc/xiajiantou.png" /></div>
    </div>
    <div class="aui-pull-right aui-btn top-more" @click="menuPage()">
        <span></span><span></span><span></span>
    </div>
</header>

<div id="gpc_gd11x5" v-cloak>
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
            <!-- <li @click='toHeMai()'>合买</li> -->
                    <li @click='toPlay("11_5")'>玩法</li>
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
            <div class="fgr">{{text}}:<span></span><span>{{surTimeminutes}}</span>分<span>{{surTimeseconds}}</span>秒</div>
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
        <div v-if="danDallIdx.list == 'normalList'&&danDallIdx.index != 8&&danDallIdx.index != 10" class="mc_cont mc_cont2">
			<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
            <div class="yaoyiyao" @click="Random()"><p>摇一摇机选</p></div>
            <div class="jieshao">{{ styleList.normalList[danDallIdx.index].text }}</div>
            <div class="baiwei">
                <!-- <div class="titl"><div>请至少选1个号码</div></div> -->
                <div class="battle battle_red">
                    <div class="battle_icon flr">号码<div class="right_arror"></div></div>
                    <div class="battle_shuz flr">
                        <ul>
                            <template v-for="(item,index) in baiWeiList">
                                <li v-if='navname=="前一"' :class="{ 'active': item.state }" @click="setbaiWeiList(index)"><span class="sp1">{{ item.id }}</span><span class="sp2" v-if="yilou">{{ foreOneyilouData[index] }}</span></li>
                                <li v-else  :class="{ 'active': item.state }" @click="setbaiWeiList(index)"><span class="sp1">{{ item.id }}</span><span class="sp2" v-if="yilou">{{ randomyilouData[index] }}</span></li>
                            </template>
                            <li style="border: 0;"></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 直选内容 -->
        <div v-if="danDallIdx.list == 'duplexList'" class="mc_cont mc_cont2">
			<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
            <!-- <div class="yaoyiyao" @click="Random()"><p>摇一摇机选</p></div> -->
            <div class="jieshao">{{ styleList.duplexList[danDallIdx.index].text }}</div>
            <div class="baiwei">
                <div class="titl"><div>请至少选1个号码<template v-if="danDallIdx.index > 0&&danDallIdx.index < 7">,最多{{ styleList.duplexList[danDallIdx.index].limitNumber }}个</template></div></div>
                <div class="battle battle_red">
                    <div class="battle_icon flr">胆码<div class="right_arror"></div></div>
                    <div class="battle_shuz flr">
                        <ul>
                            <template v-for="(item,index) in wanWeiList">
                                <li :class="{ 'active': item.state }" @click="setDanList(index)"><span class="sp1">{{ item.id }}</span><span class="sp2" v-if="yilou">{{ randomyilouData[index] }}</span></li>
                            </template>
                            <li style="border: 0;"></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="shiwei">
                <div class="titl"><div><template v-if="danDallIdx.index >= 0&&danDallIdx.index < 7">请至少选择2个号码，最多10个</template><template v-else>请至少选择1个号码</template></div></div>
                <div class="battle battle_red">
                    <div class="battle_icon flr">拖码<div class="right_arror"></div></div>
                    <div class="battle_shuz flr">
                        <ul>
                            <template v-for="(item,index) in qianWeiList">
                                <li :class="{ 'active': item.state }" @click="setTuoList(index)"><span class="sp1">{{ item.id }}</span><span class="sp2" v-if="yilou">{{ randomyilouData[index] }}</span></li>
                            </template>
                            <li style="border: 0;"></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 直选内容 -->
        <template v-if="danDallIdx.list == 'normalList'">
			
            <div v-if="danDallIdx.index == 8||danDallIdx.index == 10" class="mc_cont mc_cont2">
				<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
                <div class="yaoyiyao" @click="Random()"><p>摇一摇机选</p></div>
                <div class="jieshao">{{ styleList.normalList[danDallIdx.index].text }}</div>
                <div class="baiwei">
                    <div class="titl"><div>请至少选1个号码</div></div>
                    <div class="battle battle_red">
                        <div class="battle_icon flr">万位<div class="right_arror"></div></div>
                        <div class="battle_shuz flr">
                            <ul>
                                <template v-for="(item,index) in wanWeiList">
                                    <li :class="{ 'active': item.state }" @click="setwanWeiList(index)"><span class="sp1">{{ item.id }}</span><span class="sp2" v-if="yilou">{{ foreOneyilouData[index] }}</span></li>
                                </template>
                                <li style="border: 0;"></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="shiwei">
                    <div class="titl"><div>请至少选1个号码</div></div>
                    <div class="battle battle_red">
                        <div class="battle_icon flr">千位<div class="right_arror"></div></div>
                        <div class="battle_shuz flr">
                            <ul>
                                <template v-for="(item,index) in qianWeiList">
                                    <li :class="{ 'active': item.state }" @click="setqianWeiList(index)"><span class="sp1">{{ item.id }}</span><span class="sp2" v-if="yilou">{{ foreTwodirecttwoyilouData[index] }}</span></li>
                                </template>
                                <li style="border: 0;"></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div v-if="danDallIdx.index == 10" class="gewei">
                    <div class="titl"><div>请至少选1个号码</div></div>
                    <div class="battle battle_red">
                        <div class="battle_icon flr">百位<div class="right_arror"></div></div>
                        <div class="battle_shuz flr">
                            <ul>
                                <template v-for="(item,index) in baiWeiList">
                                    <li :class="{ 'active': item.state }" @click="setbaiWeiList(index)"><span class="sp1">{{ item.id }}</span><span class="sp2" v-if="yilou">{{foreThreedirectthreeyilouData[index]}}</span></li>
                                </template>
                                <li style="border: 0;"></li>
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
			<footer v-if="text == '投注剩余时间' && title">
				<div class="ft_money flr">
					<p>合计金额：<span>¥{{totalNum*2|numberFormat}}</span></p>
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
<!--    <footer v-if="text == '投注剩余时间' && title"> 
        <div class="ft_money flr">共<span>{{totalNum}}</span>注<span>{{totalNum*2}}</span>元</div>
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
			var gpc_gd11x5 = document.querySelector("#gpc_gd11x5");
            switch (event.type){
                case "touchstart":
                    startY = event.touches[0].pageY;
                    scrollTops=gpc_gd11x5.scrollTop
                    break;
                case "touchend":
                    var spanY = event.changedTouches[0].pageY - startY;
                    if(spanY > 50 && scrollTops < 3){
						lastTen.style.height = "16rem";
						gpc_gd11x5.style.overflow = "hidden";
						xiedajian(0);

                    } else if (spanY < -50) {
						lastTen.style.height = "0";
						gpc_gd11x5.removeAttribute("style");
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
		gpc_gd11x5: '',
		tb_mco: '',
		navTab: '',
		lastTen: '',
        interval: '',
        inter: '',
        rnums:0,
        onums:0,//第一位小球个数
        snums:0,//第二位小球个数
        bnums:0,//第三位小球个数
        totalNum:0,//注数
        text:'投注剩余时间',
        title:true,//当前期是否截止
        nowTime:0,//开始时间
        EndTime:0,//结束时间
        periodNumber:0,//期数
        addlist:'',//继续选号回来的存数组
        addset:'',//继续选号回来的继续编辑数组
        addsetindex:0,
        totalPrice:0,//金额
        surTimedays: 0,
        surTimehours: 0,
        surTimeminutes: 0,
        surTimeseconds: 0,
        yilou: false,
        PastPerShow: true,
        ccarray: [],
        betConlength:0,
        HistoryDraws: [],
        foreOneyilouData:[],
        randomyilouData:[],
        foreTwodirectoneyilouData:[],
        foreTwodirecttwoyilouData:[],
        foreTwogroupyilouData:[],
        foreThreedirectoneyilouData:[],
        foreThreedirecttwoyilouData:[],
        foreThreedirectthreeyilouData:[],
        foreThreegroupyilouData:[],
        styleList: {
            'normalList': [
                {'name': '任选二','limitNumber': 2,'playType': 'randomTwo','AmoMoney': '6','typeName': '普通','type': 'normal','text': '至少选2个号码，猜对2个开奖号即中6元'},
                {'name': '任选三','limitNumber': 3,'playType': 'randomThree','AmoMoney': '19','typeName': '普通','type': 'normal','text': '至少选3个号码，猜对3个开奖号即中19元'},
                {'name': '任选四','limitNumber': 4,'playType': 'randomFour','AmoMoney': '78','typeName': '普通','type': 'normal','text': '至少选4个号码，猜对4个开奖号即中78元'},
                {'name': '任选五','limitNumber': 5,'playType': 'randomFive','AmoMoney': '540','typeName': '普通','type': 'normal','text': '至少选5个号码，猜对5个开奖号即中540元'},
                {'name': '任选六','limitNumber': 6,'playType': 'randomSix','AmoMoney': '90','typeName': '普通','type': 'normal','text': '至少选6个号码，选号包含5个开奖号即中90元'},
                {'name': '任选七','limitNumber': 7,'playType': 'randomSeven','AmoMoney': '26','typeName': '普通','type': 'normal','text': '至少选7个号码，选号包含5个开奖号即中26元'},
                {'name': '任选八','limitNumber': 8,'playType': 'randomEight','AmoMoney': '9','typeName': '普通','type': 'normal','text': '至少选8个号码，选号包含5个开奖号即中9元'},
                {'name': '前二组选','limitNumber': 2,'playType': 'foreTwo','AmoMoney': '65','typeName': '','type': 'group','text': '至少选2个号码，猜对前2个开奖号即中65元'},
                {'name': '前二直选','limitNumber': 1,'playType': 'foreTwo','AmoMoney': '130','typeName': '','type': 'direct','text': '每位至少选1个号码，猜对前2个开奖号即中130元'},
                {'name': '前三组选','limitNumber': 3,'playType': 'foreThree','AmoMoney': '130','typeName': '','type': 'group','text': '至少选3个号码，猜对3个开奖号即中195元'},
                {'name': '前三直选','limitNumber': 1,'playType': 'foreThree','AmoMoney': '1170','typeName': '','type': 'direct','text': '至少选1个号码，按位猜对前3个开奖号即中1170元'},
            ],
            'duplexList': [
                {'name': '任选二','limitNumber': 1,'playType': 'randomTwo','AmoMoney': '6','typeName': '胆拖','type': 'duplex','text': '猜对2个开奖号即中6元'},
                {'name': '任选三','limitNumber': 2,'playType': 'randomThree','AmoMoney': '19','typeName': '胆拖','type': 'duplex','text': '猜对3个开奖号即中19元'},
                {'name': '任选四','limitNumber': 3,'playType': 'randomFour','AmoMoney': '78','typeName': '胆拖','type': 'duplex','text': '猜对4个开奖号即中78元'},
                {'name': '任选五','limitNumber': 4,'playType': 'randomFive','AmoMoney': '540','typeName': '胆拖','type': 'duplex','text': '猜对5个开奖号即中540元'},
                {'name': '任选六','limitNumber': 5,'playType': 'randomSix','AmoMoney': '90','typeName': '胆拖','type': 'duplex','text': '选号包含5个开奖号即中90元'},
                {'name': '任选七','limitNumber': 6,'playType': 'randomSeven','AmoMoney': '26','typeName': '胆拖','type': 'duplex','text': '选号包含5个开奖号即中26元'},
                {'name': '任选八','limitNumber': 7,'playType': 'randomEight','AmoMoney': '9','typeName': '胆拖','type': 'duplex','text': '选号包含5个开奖号即中9元'},
                {'name': '前二组选','limitNumber': 1,'playType': 'foreTwo','AmoMoney': '65','typeName': '胆拖','type': 'groupDuplex','text': '猜对任意2个开奖号即中65元'},
                {'name': '前三组选','limitNumber': 2,'playType': 'foreThree','AmoMoney': '195','typeName': '胆拖','type': 'groupDuplex','text': '猜对3个开奖号即中195元'},
            ]
        },
        navname:'任选二',
        playTypeName: '普通',
        baiWeiList: [{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false},{'id':10,'state':false},{'id':11,'state':false}],
        qianWeiList: [{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false},{'id':10,'state':false},{'id':11,'state':false}],
        wanWeiList: [{'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false},{'id':10,'state':false},{'id':11,'state':false}],
        danDallIdx: {'list': 'normalList','index': 0,'SelecNumber': 0},
        wanarr:[],//万注数arr
        qianarr:[],//千注数
        baiarr:[],//百注数
        RouteLeave: false
    };
},
beforeRouteLeave (to, from , next) {
    if (this.RouteLeave) {
        next()
    } else {
        sessionStorage.removeItem('content');
        sessionStorage.removeItem('data');
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
	}
	this.setTime();
	this.getHistoryDraws();
	this.yilou_flag();
	if(getSession("pay") == 1){   //继续选号
	    this.continueChoose();
	}else if(getSession("pay") == 2){
	    this.continueEdit();
	}
},
mounted() {
	this.gpc_gd11x5 = document.querySelector("#gpc_gd11x5");
	this.topMenu = document.querySelector(".topMenu");
	this.navTab = document.querySelector(".nav-Tab");
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
		var gpc_hbks = document.querySelector("#gpc_gd11x5");
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
                        dataType:"11_5"
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
        this.setClearList();
        this.addlist=[];
        this.addset=[];
        this.addlist = getSession("content").data;
        this.betConlength=this.addlist.length;
        // this.addsetindex = ret.value.index;
        console.log(JSON.stringify( this.addlist ) );
    },
    continueEdit: function(){   //继续编辑
        this.setClearList();
        this.addlist=[];
        this.addset=[];
        this.setTime();
        this.addset = getSession("content").data;
        this.addsetindex = getSession("index");
        this.betConlength=this.addset.length-1;
        console.log(JSON.stringify(this.addset));
        this.totalNum=this.addset[this.addsetindex].totalNum;
        if (this.addset[this.addsetindex].wanarr.length>0) {
            for (var i = 0; i <this.wanWeiList.length; i++) {
                for (var j = 0; j <this.addset[this.addsetindex].wanarr.length; j++) {
                    if (this.wanWeiList[i].id==this.addset[this.addsetindex].wanarr[j]){
                        this.wanWeiList[i].state=true;
                        this.onums++;
                    }
                }
            }
        }
        if (this.addset[this.addsetindex].qianarr.length>0) {
            for (var i = 0; i <this.qianWeiList.length; i++) {
                for (var j = 0; j <this.addset[this.addsetindex].qianarr.length; j++) {
                    if (this.qianWeiList[i].id==this.addset[this.addsetindex].qianarr[j]){
                        this.qianWeiList[i].state=true;
                        this.snums++;
                    }
                }
            }
        }
        if (this.addset[this.addsetindex].baiarr.length>0) {
            for (var i = 0; i <this.baiWeiList.length; i++) {
                for (var j = 0; j <this.addset[this.addsetindex].baiarr.length; j++) {
                    if (this.baiWeiList[i].id==this.addset[this.addsetindex].baiarr[j]){
                        this.baiWeiList[i].state=true;
                        this.rnums++;
                        this.bnums++;
                    }
                }
            }
        }
    },
	setTime: function() {    //请求数据
		var datas =  this.Qs.stringify({
			"path":"number/keno/gdel11to5"
		},{allowDots: true});

		this.$ajax.post('/caipiaoshouye/index.php/home/index/getCurrentInfo',
			datas
		)
		.then(res=>{
			console.log(res);
			if(res.data.status==200){
				var content=JSON.parse(res.data.content);
				if(content.code==100000){
					this.EndTime=parseInt(content.data.endedTime-30000);
					this.nowTime=parseInt(content.data.nowTime);
					this.periodNumber=content.data.periodNumber;
					this.setSurplusTime();
				}
				else if(content.code==201004){
					this.title=false;
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
        var timestamp = this.nowTime;
        var endedTime =  this.EndTime;
        var surTime = endedTime - timestamp;
        if (surTime<=0) {
            var time=30000+surTime;
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
	yilou_flag: function() {    //请求遗漏数据
		var datas =  this.Qs.stringify({
			path:'number/keno/gdel11to5'
		},{allowDots: true});

		this.$ajax.post('/caipiaoshouye/index.php/home/index/getMiss',
			datas
		)
		.then(res=>{
			console.log(res);
			if(res.data.status==200){
				var content=JSON.parse(res.data.content);
				if(content.code==100000){
					var allyilouData=content.data;
				}
			}	
			if(allyilouData){
				for(var i=1;i<12;i++){
					this.randomyilouData.push(allyilouData.random["ball"+i+"Miss"]);
					this.foreOneyilouData.push(allyilouData.foreOne["ball"+i+"Miss"]);
					this.foreTwodirectoneyilouData.push(allyilouData.foreTwoDirect["oneBall"+i+"Miss"]);
					this.foreTwodirecttwoyilouData.push(allyilouData.foreTwoDirect["twoBall"+i+"Miss"]);
					this.foreTwogroupyilouData.push(allyilouData.foreTwoGroup["ball"+i+"Miss"]);
					this.foreThreedirectoneyilouData.push(allyilouData.foreThreeDirect["oneBall"+i+"Miss"]);
					this.foreThreedirecttwoyilouData.push(allyilouData.foreThreeDirect["twoBall"+i+"Miss"]);
					this.foreThreedirectthreeyilouData.push(allyilouData.foreThreeDirect["threeBall"+i+"Miss"]);
					this.foreThreegroupyilouData.push(allyilouData.foreThreeGroup["ball"+i+"Miss"]);
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
			path:'number/keno/gdel11to5',data
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
                  this.HistoryDraws = content.data
                  EventUtil.listenTouchDirection(document.getElementById("gpc_gd11x5"));
                }
            }
		})
		.catch(err=>{
			console.log(err);
		})
	},
	OncloseWin: function(){
		window.history.go(-1);
	},
	ChoiceType: function(){  //点击类型
		if (this.addset.length>0||this.addlist.length>0) {
			Toast('请选择相同玩法进行投注！')
			return false;
		}else {
			if(this.navTabStatue){
			    this.navTabStatue = false;
			}else{
			    this.navTabStatue = true;
			    this.menuStatue = false;
			}
			this.lastTen.style.height = "0";
			this.gpc_gd11x5.removeAttribute("style");
			this.bgzhuanhuan=false;
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
		this.gpc_gd11x5.removeAttribute("style");
		this.bgzhuanhuan=false;
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
        if (getSession('list')=="duplexList") {
            window.removeEventListener('devicemotion',this.motionHandler, false);
        }else {   // 监听摇一摇
            window.addEventListener('devicemotion',this.motionHandler, false);
        }
        this.navname=name;
        this.rnums=0;
        this.totalNum=0;
        for (var i = 0; i < this.baiWeiList.length; i++) {
            this.baiWeiList[i].state=false;
            this.qianWeiList[i].state=false;
            this.wanWeiList[i].state=false;
        }
        this.danDallIdx.list = getSession('list')
        this.danDallIdx.index = getSession('idx')
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
	setClearList: function(){
		this.rnums=0,
		this.onums=0,//第一位小球个数
		this.snums=0,//第二位小球个数
		this.bnums=0,//第三位小球个数
		this.totalNum=0,
		this.wanarr=[],//万注数arr
		this.qianarr=[],//千注数
		this.baiarr=[];//百注数
		for (var i = 0; i < this.baiWeiList.length; i++) {
			this.baiWeiList[i].state = false
			this.qianWeiList[i].state = false
			this.wanWeiList[i].state = false
		}
		this.danDallIdx.SelecNumber = 0;
    },
    Random: function () {   // 随机选择
		for (var i = 0; i < 11; i++) {this.baiWeiList[i].state = false}
		for (var i = 0; i < 11; i++) {this.wanWeiList[i].state = false}
		for (var i = 0; i < 11; i++) {this.qianWeiList[i].state = false}
		this.snums=0;
		this.onums=0;
		this.bnums=0;
		this.wanarr=[];
		this.qianarr=[];
		this.baiarr=[];
		var rand1;    //万位
		var rand2;     // 千位
		var rand3=[];  // 百位
		if (this.navname=="任选二"||this.navname=="任选三"||this.navname=="任选四"||this.navname=="任选五"||this.navname=="任选六"||this.navname=="任选七"||this.navname=="任选八"||this.navname=="前二组选"||this.navname=="前三组选"||this.navname=="前一") {
			this.rnums=0;
			var nuom=0;
			if (this.navname=="任选二"||this.navname=="前二组选") {nuom=2}
			else if (this.navname=="任选三"||this.navname=="前三组选") {nuom=3}
			else if (this.navname=="任选四") {nuom=4}
			else if (this.navname=="任选五") {nuom=5}
			else if (this.navname=="任选六") {nuom=6}
			else if (this.navname=="任选七") {nuom=7}
			else if (this.navname=="任选八") {nuom=8}
			else if (this.navname=="前一") {nuom=1}
			rand3= this.getRandom(rand3,nuom);
			console.log(rand3);
			for (var i = 0; i <rand3.length; i++) {
				this.baiWeiList[rand3[i]-1].state = true;
				this.rnums++;
			}
			if (this.navname=="前一") {
				this.totalNum=parseInt(this.rnums);
			}else {
				this.totalNum=parseInt((this.getfactorial(this.rnums)/(this.getfactorial(this.rnums-nuom)*this.getfactorial(nuom))));
			}
		}else if (this.navname=="前二直选") {
            rand1= this.generateRandom(11,1);
            rand2= this.generateRandom(11,1);
            for (let i = 0; ; i++) {
                if (rand1 == rand2) {
                	rand2= this.generateRandom(11,1);
                } else{
                	break;
                }                
            }
            this.wanWeiList[rand1-1].state = true;
            this.qianWeiList[rand2-1].state = true;
            this.snums++;
            this.onums++;
            this.wanarr.push(this.wanWeiList[rand1-1].id);
            this.qianarr.push(this.wanWeiList[rand2-1].id);
            this.totalNum=this.snums*this.onums;
            for(var i=0;i<this.wanarr.length;i++){
                for(var j=0;j<this.qianarr.length;j++){
                    if(this.wanarr[i]==this.qianarr[j]){
                        this.totalNum-=1;
                    }
                }
            }
		}else if (this.navname=="前三直选") {
			var arr=[];
			var str=this.getRandom(arr,3);
			rand1=arr[0];
			rand2= arr[1];
			rand3= arr[2];
			this.wanWeiList[rand1-1].state = true;
			this.qianWeiList[rand2-1].state = true;
			this.baiWeiList[rand3-1].state = true;
			this.snums++;
			this.onums++;
			this.bnums++;
			this.wanarr.push(this.wanWeiList[rand1-1].id);
			this.qianarr.push(this.wanWeiList[rand2-1].id);
			this.baiarr.push(this.baiWeiList[rand3-1].id);
			this.totalNum=this.snums*this.onums*this.bnums;
			for(var i=0;i<this.wanarr.length;i++){
				for(var j=0;j<this.qianarr.length;j++){
					for(var k=0;k<this.baiarr.length;k++){
						if(this.wanarr[i]==this.qianarr[j]||this.wanarr[i]==this.baiarr[k]||this.baiarr[k]==this.qianarr[j]){
							this.totalNum-=1;
						}
					}
				}
			}
		}
    },
	setwanWeiList: function (idx) {   // 选择
		if (this.navname=="前二直选") {
            if (this.wanWeiList[idx].state) {
				this.wanWeiList[idx].state = false
                this.onums--;
				this.wanarr.splice(idx, 1);
            }else {
				this.wanWeiList[idx].state = true
				this.onums++;
				this.wanarr.push(this.wanWeiList[idx].id);
				for (var i = 0; i < this.wanWeiList.length; i++) {
					if (this.qianWeiList[idx].state) {
						this.qianWeiList[idx].state = false
						this.qianarr.splice(i,1);
						if (this.snums==0) {
							this.snums=0;
						}else {
						this.snums--;
						}
					}
				}
            }
            if (this.snums<1&&this.onums<1) {
				this.totalNum=0;
            }else {
				this.totalNum=this.snums*this.onums;
            }
        }else if (this.navname=="前三直选") {
            if (this.wanWeiList[idx].state) {
				this.wanWeiList[idx].state = false
                this.onums--;
				this.wanarr.splice(idx, 1);
            }else {
				this.wanWeiList[idx].state = true
				this.onums++;
				this.wanarr.push(this.wanWeiList[idx].id);
				for (var i = 0; i < this.wanWeiList.length; i++) {
					if (this.qianWeiList[idx].state) {
						this.qianWeiList[idx].state = false
						this.qianarr.splice(i,1);
						if (this.snums==0) {
							this.snums=0;
						}else {
							this.snums--;
						}
					}
				}
				for (var i = 0; i < this.wanWeiList.length; i++) {
					if (this.baiWeiList[idx].state) {
						this.baiWeiList[idx].state = false
						this.baiarr.splice(i,1);
						if (this.bnums==0) {
							this.bnums=0;
						}else {
							this.bnums--;
						}
					}
				}
            }
            if (this.snums<1&&this.onums<1&&this.bnums<1) {
				this.totalNum=0;
            }else {
				this.totalNum=this.snums*this.onums*this.bnums;
			}
        }
		// FastClick.attach(document.body);
    },
	setqianWeiList: function (idx) {
		if (this.navname=="前二直选") {
			if (this.qianWeiList[idx].state) {
				this.qianWeiList[idx].state = false
				this.snums--;
				this.qianarr.splice(idx, 1);
			} else {
				this.qianWeiList[idx].state = true
				this.snums++;
				this.qianarr.push(this.qianWeiList[idx].id);
				for (var i = 0; i < this.qianWeiList.length; i++) {
					if (this.wanWeiList[idx].state) {
						this.wanWeiList[idx].state = false
						this.wanarr.splice(i,1);
						if (this.onums==0) {
							this.onums=0;
						}else {
							this.onums--;
						}
					}
				}
			}
			if (this.snums<1&&this.onums<1) {
				this.totalNum=0;
			}else {
				this.totalNum=this.snums*this.onums;
			}
		}else if (this.navname=="前三直选") {
			if (this.qianWeiList[idx].state) {
				this.qianWeiList[idx].state = false
				this.snums--;
				this.qianarr.splice(idx, 1);
			} else {
				this.qianWeiList[idx].state = true
				this.snums++;
				this.qianarr.push(this.qianWeiList[idx].id);
				for (var i = 0; i < this.qianWeiList.length; i++) {
					if (this.wanWeiList[idx].state) {
						this.wanWeiList[idx].state = false
						this.wanarr.splice(i,1);
						if (this.onums==0) {
							this.onums=0;
						}else {
							this.onums--;
						}
					}
				}
				for (var i = 0; i < this.qianWeiList.length; i++) {
					if (this.baiWeiList[idx].state) {
						this.baiWeiList[idx].state = false
						this.baiarr.splice(i,1);
						if (this.bnums==0) {
							this.bnums=0;
						}else {
							this.bnums--;
						}
					}
				}
			}
			if (this.snums<1&&this.onums<1&&this.bnums<1) {
				this.totalNum=0;
			}else {
				this.totalNum=this.snums*this.onums*this.bnums;
			}
		}
		// FastClick.attach(document.body);
    },
	setbaiWeiList: function (idx) {
		console.log(this.navname);
		if (this.navname=="任选二"||this.navname=="任选三"||this.navname=="任选四"||this.navname=="任选五"||this.navname=="任选六"||this.navname=="任选七"||this.navname=="任选八"||this.navname=="前二组选"||this.navname=="前三组选"||this.navname=="前一") {
			var nuom=0;
			if (this.navname=="任选二"||this.navname=="前二组选") {nuom=2}
			else if (this.navname=="任选三"||this.navname=="前三组选") {nuom=3}
			else if (this.navname=="任选四") {nuom=4}
			else if (this.navname=="任选五") {nuom=5}
			else if (this.navname=="任选六") {nuom=6}
			else if (this.navname=="任选七") {nuom=7}
			else if (this.navname=="任选八") {nuom=8}
			else if (this.navname=="前一") {nuom=1}
			if (this.baiWeiList[idx].state) {
				this.rnums--;
			}else {
				this.rnums++;
			}
			if (this.rnums<nuom) {
				this.totalNum=0;
			}else {
				if (this.navname=="前一") {
					this.totalNum=parseInt(this.rnums);
				}else {
					this.totalNum=parseInt((this.getfactorial(this.rnums)/(this.getfactorial(this.rnums-nuom)*this.getfactorial(nuom))));
				}
			}
			if (this.baiWeiList[idx].state) {
				this.baiWeiList[idx].state = false
			} else {
				this.baiWeiList[idx].state = true
			}
		}else if (this.navname=="前三直选") {
			if (this.baiWeiList[idx].state) {
				this.baiWeiList[idx].state = false
				this.bnums--;
				this.baiarr.splice(idx, 1);
			} else {
				this.baiWeiList[idx].state = true
				this.bnums++;
				this.baiarr.push(this.baiWeiList[idx].id);
				for (var i = 0; i < this.baiWeiList.length; i++) {
					if (this.wanWeiList[idx].state) {
						this.wanWeiList[idx].state = false
						this.wanarr.splice(i,1);
						if (this.onums==0) {
							this.onums=0;
						}else {
							this.onums--;
						}
					}
				}
				for (var i = 0; i < this.qianWeiList.length; i++) {
					if (this.qianWeiList[idx].state) {
						this.qianWeiList[idx].state = false
						this.qianarr.splice(i,1);
						if (this.snums==0) {
							this.snums=0;
						}else {
							this.snums--;
						}
					}
				}
			}
			if (this.snums<1&&this.onums<1&&this.bnums<1) {
				this.totalNum=0;
			}else {
				this.totalNum=this.snums*this.onums*this.bnums;
			}
		}
		// FastClick.attach(document.body);
    },
	setDanList:function (idx) {
		if (this.navname=="任选二"||this.navname=="任选三"||this.navname=="任选四"||this.navname=="任选五"||this.navname=="任选六"||this.navname=="任选七"||this.navname=="任选八") {
			var nuom=0;
			var isChosed;
			for (var x = 0; x < this.wanWeiList.length; x++) {
			  if (this.wanWeiList[x].state) {
					  isChosed=x;
			  }
			}
			if (this.navname=="任选二") {nuom=1;}
			else if(this.navname=="任选三") {nuom=2;}
			else if (this.navname=="任选四") {nuom=3;}
			else if (this.navname=="任选五") {nuom=4;}
			else if (this.navname=="任选六") {nuom=5;}
			else if (this.navname=="任选七") {nuom=6;}
			else if (this.navname=="任选八") {nuom=7;}
			if (this.wanWeiList[idx].state) {
				this.wanWeiList[idx].state = false
				this.onums--;
			} else {
				if (this.onums>=nuom) {
					if(nuom==1){
						this.wanWeiList[isChosed].state = false;
						this.wanWeiList[idx].state = true;
					}else{
						Toast("最多只能选择"+nuom+"个！");
						return false;
					}
				}else {
					this.wanWeiList[idx].state = true;
					this.onums++;
				}
				for (var i = 0; i < this.wanWeiList.length; i++) {
					if (this.qianWeiList[idx].state) {
						this.qianWeiList[idx].state = false
						this.qianarr.splice(i,1);
						if (this.snums==0) {
							this.snums=0;
						}else {
							this.snums--;
						}
					}
				}
			}
			if(this.onums<1||this.snums+this.onums<nuom+2){
				this.totalNum=0;
			}else{
				this.totalNum=parseInt(this.getfactorial(this.snums)/(this.getfactorial(nuom+1-this.onums)*this.getfactorial(this.snums-nuom-1+this.onums)));
			}
		}else if (this.navname=="前二组选") {
			var nuom=0;
			var isChosed;
			for (var x = 0; x < this.wanWeiList.length; x++) {
			  if (this.wanWeiList[x].state) {
					  isChosed=x;
			  }
			}
			if (this.wanWeiList[idx].state) {
				this.wanWeiList[idx].state = false
				this.onums--;
			} else {
				if (this.onums>nuom) {
					this.wanWeiList[isChosed].state = false;
					this.wanWeiList[idx].state = true;
					// Toast("最多只能选择1个！");
					// return false;
				}else {
					this.wanWeiList[idx].state = true;
					this.onums++;
				}
				for (var i = 0; i < this.wanWeiList.length; i++) {
					if (this.qianWeiList[idx].state) {
						this.qianWeiList[idx].state = false
						this.qianarr.splice(i,1);
						if (this.snums==0) {
							this.snums=0;
						}else {
							this.snums--;
						}
					}
				}
			}
			if(this.onums<1||this.snums<2){
				this.totalNum=0;
			}else{
				this.totalNum=this.snums;
			}
		}else if (this.navname=="前三组选") {
			var nuom=1;
			if (this.wanWeiList[idx].state) {
				this.wanWeiList[idx].state = false
				this.onums--;
			} else {
				if (this.onums>nuom) {
					Toast("最多只能选择2个！");
					return false;
				}else {
					this.wanWeiList[idx].state = true;
					this.onums++;
				}
				for (var i = 0; i < this.wanWeiList.length; i++) {
					if (this.qianWeiList[idx].state) {
						this.qianWeiList[idx].state = false
						this.qianarr.splice(i,1);
						if (this.snums==0) {
							this.snums=0;
						}else {
							this.snums--;
						}
					}
				}
			}
			if(this.onums<1||this.snums+this.onums<4){
				this.totalNum=0;
			}else{
				if (this.onums==2) {
					this.totalNum=this.snums;
				}else if (this.onums==1) {
					this.totalNum=parseInt(this.snums*(this.snums-1)/2);
				}
			}
		}
		// FastClick.attach(document.body);
    },
	setTuoList:function (idx) {
		console.log(this.navname);
		if (this.navname=="任选二"||this.navname=="任选三"||this.navname=="任选四"||this.navname=="任选五"||this.navname=="任选六"||this.navname=="任选七"||this.navname=="任选八") {
			var nuom=0;
			if (this.navname=="任选二") {nuom=1;}
			else if(this.navname=="任选三") {nuom=2;}
			else if (this.navname=="任选四") {nuom=3;}
			else if (this.navname=="任选五") {nuom=4;}
			else if (this.navname=="任选六") {nuom=5;}
			else if (this.navname=="任选七") {nuom=6;}
			else if (this.navname=="任选八") {nuom=7;}
			if (this.qianWeiList[idx].state) {
				this.qianWeiList[idx].state = false
					this.snums--;
			} else {
				this.qianWeiList[idx].state = true;
				this.snums++;
				for (var i = 0; i < this.wanWeiList.length; i++) {
					if (this.wanWeiList[idx].state) {
						this.wanWeiList[idx].state = false
						this.wanarr.splice(i,1);
						if (this.onums==0) {
							this.onums=0;
						}else {
							this.onums--;
						}
					}
				}
			}
			if(this.onums<1||this.snums+this.onums<nuom+2){
				this.totalNum=0;
			}else{
				this.totalNum=parseInt(this.getfactorial(this.snums)/(this.getfactorial(nuom+1-this.onums)*this.getfactorial(this.snums-nuom-1+this.onums)));
			}
		}else if (this.navname=="前二组选") {
			var nuom=0;
			if (this.qianWeiList[idx].state) {
				this.qianWeiList[idx].state = false
				this.snums--;
			} else {
				this.qianWeiList[idx].state = true;
				this.snums++;
				for (var i = 0; i < this.wanWeiList.length; i++) {
					if (this.wanWeiList[idx].state) {
						this.wanWeiList[idx].state = false
						this.wanarr.splice(i,1);
						if (this.onums==0) {
							this.onums=0;
						}else {
							this.onums--;
						}
					}
				}
			}
			if(this.onums<1||this.snums<2){
				this.totalNum=0;
			}else{
				this.totalNum=this.snums;
			}
		}else if (this.navname=="前三组选") {
			var nuom=1;
			if (this.qianWeiList[idx].state) {
				this.qianWeiList[idx].state = false
				this.snums--;
			} else {
				this.qianWeiList[idx].state = true;
				this.snums++;
				for (var i = 0; i < this.wanWeiList.length; i++) {
					if (this.wanWeiList[idx].state) {
						this.wanWeiList[idx].state = false
						this.wanarr.splice(i,1);
						if (this.onums==0) {
							this.onums=0;
						}else {
							this.onums--;
						}
					}
				}
			}
			if(this.onums<1||this.snums+this.onums<4){
				this.totalNum=0;
			}else{
				if (this.onums==2) {
					this.totalNum=this.snums;
				}else if (this.onums==1) {
					this.totalNum=parseInt(this.snums*(this.snums-1)/2);
				}
			}
		}
		// FastClick.attach(document.body);
    },
	open_fcsdpay : function () {  //点击投注
		var wanarr=[];
        var qianarr=[];
        var baiarr=[];
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
        var data;
        if (this.betConlength>0&&this.totalNum<1) {
            if (this.addset.length>0) {
                this.addset.splice(this.addsetindex,1);
                data= this.addset;
            }else {
                data= this.addlist;
            }
            this.addlist=[];
            this.addset=[];
            this.betConlength=0;
            this.lastTen.style.height = "0";
            this.gpc_gd11x5.removeAttribute("style");
             var content = {};
             setSession('data',data);
            content["data"] = data;
            content["navname"] = this.navname;
            content["danlist"] = this.danDallIdx.list;
            console.log(content);
            setSession('content',content);
            window.removeEventListener('devicemotion',this.motionHandler, false);
            this.RouteLeave = true;
            this.$router.push({
            	name:'goucai_gpc_gd11x5pay'
            });
        }else {
            if (this.danDallIdx.list=='normalList'&&this.totalNum<1) {
                Toast("请至少选择1注！")
                return false;
            }else if (this.danDallIdx.list=='duplexList'&&this.totalNum<2) {
                Toast("胆拖玩法，请至少选择2注！")
                return false;
            }
            for (var i = 0; i < this.baiWeiList.length; i++) {
                if (this.baiWeiList[i].state) {
                    baiarr.push(this.baiWeiList[i].id);
                }
                if (this.wanWeiList[i].state) {
                    wanarr.push(this.wanWeiList[i].id);
                }
                if (this.qianWeiList[i].state){
                    qianarr.push(this.qianWeiList[i].id);
                }
            }
            var data=[];
            if (this.addlist.length>0){
                data=this.addlist;
            }
            if (this.addset.length>0) {
                this.addset[this.addsetindex]={
                    wanarr:wanarr,
                    qianarr:qianarr,
                    baiarr:baiarr,
                    totalNum:this.totalNum
                };
                data=this.addset;
            }else {
                data.push({
                    wanarr:wanarr,
                    qianarr:qianarr,
                    baiarr:baiarr,
                    totalNum:this.totalNum
                })
            }
            this.lastTen.style.height = "0";
            this.gpc_gd11x5.removeAttribute("style");
            window.removeEventListener('devicemotion',this.motionHandler, false);
            this.RouteLeave = true;
            var content = {};
            setSession('data',data);
            content["data"] = data;
            content["navname"] = this.navname;
            content["danlist"] = this.danDallIdx.list;
            setSession('content',content);
            this.$router.push({
            	name:'goucai_gpc_gd11x5pay'
            });
        }
	},
    generateRandom: function (count,nun){  // 随机数
		var rand = parseInt(((Math.random()*count)+nun));
		for(var i = 0 ; i < this.ccarray.length; i++){
			if(this.ccarray[i] == rand){
				return null
			}
		}
		return rand
    },
	// 随机数
    getRandom: function (count,index){
		while(count.length<index){
			var num=parseInt(((Math.random()*11)+1));
			if(count.indexOf(num)<0){
				count.push(num);
			}
		}
        return count;
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
}
}
</script>

<style scoped>
@import "../../css/goucai_szc.css";
header{
    position: fixed !important;
}
#gpc_gd11x5{
    margin-top: 2.25rem;
}
</style>
