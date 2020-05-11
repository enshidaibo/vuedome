<template>
<div>
<header class="aui-bar aui-bar-nav" id="box">
    <div class="aui-pull-left aui-btn" @click="OncloseWin()">
        <span class="aui-iconfont aui-icon-left"></span>
    </div>
    <div>
        <div class="aui-title" @click="ChoiceType()"><span>北京快乐8</span> <span id="pagetitle"> {{playTypeName}}</span> <img src="../../assets/goucai/jjc/xiajiantou.png" /></div>
    </div>
    <div class="aui-pull-right aui-btn top-more" @click="menuPage()">
        <span></span><span></span><span></span>
    </div>
</header>

<div id="gpc_bjk8" v-cloak>
    <!-- 购彩类型 -->
    <div v-if="navTabStatue" class="nav-Tab" @click="hideChoice()">
        <div class="list">
            <li v-for='(item,index) in styleList' :class="{ select: item.state }" @click="setChoice(item.limitNumber,item.name,index)">{{ item.name }}</li>
        </div>
    </div>
    <!-- 菜单 -->
    <div v-if="menuStatue" class="topMenu" @click='hidemoc()'>
        <ul>
            <li @click='toyilou()'>遗漏投注</li>
            <li @click='fenx()'>分享</li>
            <!-- <li @click='toHeMai()'>合买</li> -->
        </ul>
    </div>
    <!-- 分享模态框 -->
    <div v-if="shareStatue" class="share_box" @click="hideShare()">
        <div class="share_cont">
            <div class="quxiao">取消</div>
            <div class="down" @click="openDownload()">前往下载</div>
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
                        <td>第{{ item.periodNumber }}期<span></span></td>
                        <td><span v-for="thal in item.result">{{ thal }}</span><span></span></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="mc_cont">
			<span :class="bgzhuanhuan?'iconbg_up':'iconbg_down'" @click="changebg"></span>
            <div class="yaoyiyao" @click="Random()"><p>摇一摇机选</p></div>
            <div class="titl">至少选择{{ styleList[redDallIdx].limitNumber }}个号码，猜对任{{ styleList[redDallIdx].limitNumber }}个开奖号即中{{ styleList[redDallIdx].AmoMoney }}元</div>
            <div class="battle battle_red">
                <ul>
                    <template v-for="(item,index) in redDallList">
                        <li :class="{ 'active': item.state }" @click="setredDallList(index)"><span class="sp1">{{ item.id }}</span><span class="sp2" v-if="yilou">{{  redMiss[index]  }}</span></li>
                    </template>
                    <li style="border: 0;"></li><li style="border: 0;"></li><li style="border: 0;"></li><li style="border: 0;"></li>
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
            var lastTen = document.querySelector(".last_ten_bjk8");
            var gpc_bjk8 = document.querySelector("#gpc_bjk8");
            switch (event.type){
                case "touchstart":
                    startY = event.touches[0].pageY;
                    scrollTops= gpc_bjk8.scrollTop
                    break;
                case "touchend":
                    var spanY = event.changedTouches[0].pageY - startY;
                    if(spanY > 50 && scrollTops < 3){
						var heig = document.documentElement.clientHeight - document.getElementsByTagName("header")[0].offsetHeight
                        lastTen.style.height = "15.2rem";
                        gpc_bjk8.style.overflow = "hidden";
                        gpc_bjk8.style.height = heig + 'px';
						xiedajian(0);
                    } else if (spanY < -50) {
                        lastTen.style.height = "0";
                        gpc_bjk8.removeAttribute("style");
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
        compileNum: false,
        menuStatue: false,
        navTabStatue: false,
        indexs: '',
        playTypeName: '任选一',
        lastTen: '',
        gpc_bjk8: '',
        text:'投注剩余时间',
        interval: '',
        inter: '',
        cantchose: true,
        isShow:true,
        current:0,
        betConlength:0,
        nowTime:0,
        EndTime:0,
        surTimedays: 0,
        surTimehours: 0,
        surTimeminutes: 0,
        surTimeseconds: 0,
        ccarray: [],
        redMiss:[],
        totalNum:0,
        totalPrice:0,
        selectedArr:[],
        yilou: false,
        redDallIdx: 0,
        HistoryDraws: [],
        redDallList: [
            {'id':1,'state':false},{'id':2,'state':false},{'id':3,'state':false},{'id':4,'state':false},{'id':5,'state':false},{'id':6,'state':false},{'id':7,'state':false},{'id':8,'state':false},{'id':9,'state':false},{'id':10,'state':false},
            {'id':11,'state':false},{'id':12,'state':false},{'id':13,'state':false},{'id':14,'state':false},{'id':15,'state':false},{'id':16,'state':false},{'id':17,'state':false},{'id':18,'state':false},{'id':19,'state':false},{'id':20,'state':false},
            {'id':21,'state':false},{'id':22,'state':false},{'id':23,'state':false},{'id':24,'state':false},{'id':25,'state':false},{'id':26,'state':false},{'id':27,'state':false},{'id':28,'state':false},{'id':29,'state':false},{'id':30,'state':false},
            {'id':31,'state':false},{'id':32,'state':false},{'id':33,'state':false},{'id':34,'state':false},{'id':35,'state':false},{'id':36,'state':false},{'id':37,'state':false},{'id':38,'state':false},{'id':39,'state':false},{'id':40,'state':false},
            {'id':41,'state':false},{'id':42,'state':false},{'id':43,'state':false},{'id':44,'state':false},{'id':45,'state':false},{'id':46,'state':false},{'id':47,'state':false},{'id':48,'state':false},{'id':49,'state':false},{'id':50,'state':false},
            {'id':51,'state':false},{'id':52,'state':false},{'id':53,'state':false},{'id':54,'state':false},{'id':55,'state':false},{'id':56,'state':false},{'id':57,'state':false},{'id':58,'state':false},{'id':59,'state':false},{'id':60,'state':false},
            {'id':61,'state':false},{'id':62,'state':false},{'id':63,'state':false},{'id':64,'state':false},{'id':65,'state':false},{'id':66,'state':false},{'id':67,'state':false},{'id':68,'state':false},{'id':69,'state':false},{'id':70,'state':false},
            {'id':71,'state':false},{'id':72,'state':false},{'id':73,'state':false},{'id':74,'state':false},{'id':75,'state':false},{'id':76,'state':false},{'id':77,'state':false},{'id':78,'state':false},{'id':79,'state':false},{'id':80,'state':false}
        ],
        MissList: {},
        styleList: [
            {'name': '任选一','limitNumber': 1,'state': true,'SelecNumber': 0,'AmoMoney': '4'},
            {'name': '任选二','limitNumber': 2,'state': false,'SelecNumber': 0,'AmoMoney': '16'},
            {'name': '任选三','limitNumber': 3,'state': false,'SelecNumber': 0,'AmoMoney': '30'},
            {'name': '任选四','limitNumber': 4,'state': false,'SelecNumber': 0,'AmoMoney': '40'},
            {'name': '任选五','limitNumber': 5,'state': false,'SelecNumber': 0,'AmoMoney': '250'},
            {'name': '任选六','limitNumber': 6,'state': false,'SelecNumber': 0,'AmoMoney': '600'},
            {'name': '任选七','limitNumber': 7,'state': false,'SelecNumber': 0,'AmoMoney': '8000'},
            {'name': '任选八','limitNumber': 8,'state': false,'SelecNumber': 0,'AmoMoney': '20000'},
            {'name': '任选九','limitNumber': 9,'state': false,'SelecNumber': 0,'AmoMoney': '50000'},
            {'name': '任选十','limitNumber': 10,'state': false,'SelecNumber': 0,'AmoMoney': '500万'},
        ],
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
        sessionStorage.removeItem('index');
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
        this.redDallIdx = getSession('idx');
        for(var i=0;i<this.styleList.length;i++){
            this.styleList[i].state = false;
        }
        this.styleList[getSession('idx')].state = true;
    }
	this.setTime();
    this.getMiss();
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
    if(window.DeviceMotionEvent) {
        window.addEventListener('devicemotion',this.motionHandler, false);
    } else {
        console.log("你的设备不支持位置感应!");
		
    }
	 window.xiedajian = this.xiedajian;
    this.lastTen = document.querySelector(".last_ten_bjk8");
    this.gpc_bjk8 = document.querySelector("#gpc_bjk8");
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
		var gpc_hbks = document.querySelector("#mc_ssq");
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
        this.styleList[this.redDallIdx].SelecNumber=arrs.redQiu.length;
        this.totalNum=arrs.totalNum;
        this.totalPrice=parseInt(arrs.totalNum)*2;
        for (var i = 0; i<arrs.redQiu.length; i++) {
            for (var n = 0; n < this.redDallList.length; n++) {
                if (arrs.redQiu[i]==this.redDallList[n].id) {
                    this.redDallList[n].state=true;
                }
            }
        };
    },
    setTime: function() {    //请求数据
    	var datas =  this.Qs.stringify({
    		"path":"number/keno/bjklb"
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
                    console.log( this.EndTime);
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
    getMiss: function() {    //请求数据
    	var datas =  this.Qs.stringify({
    		"path":"number/keno/bjklb"
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
    getHistoryDraws: function() {    //请求往期开奖数据
        var data = [];
        data["flag"] = false;
        data["page"] = 1;
        data["rows"] = 6;
    	var datas =  this.Qs.stringify({
    		"path":"number/keno/bjklb",data
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
                    EventUtil.listenTouchDirection(document.getElementById("gpc_bjk8"))
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
            this.gpc_bjk8.removeAttribute("style");
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
        this.gpc_bjk8.removeAttribute("style");
		this.bgzhuanhuan=false;
    },
    setChoice: function(play, name, idx) {
        this.setClearList();
        this.styleList[this.redDallIdx].state = false
        if (name) {
            setSession('playTypeName', name);
            setSession('name', play);
            setSession('idx', idx);
            this.playTypeName = getSession('playTypeName');
            this.redDallIdx = getSession('idx');
        }
        this.styleList[idx].state = true;
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
    setClearList: function(){
        for (var i = 0; i < 80; i++) {
            this.redDallList[i].state = false
        }
        for (var i = 0; i < 10; i++) {
            this.styleList[i].SelecNumber = 0
        };
        this.totalNum=0;
        this.totalPrice=0;
    },
    Random: function () {   // 随机选择
        this.setClearList();
        this.ccarray = [];
        var ind = this.styleList[this.redDallIdx].limitNumber
        for(var i = 0 ; ; i++){
            if(this.ccarray.length<ind){
                var rand1 = this.generateRandom(80);
                console.log(rand1);
                if (rand1 != null && rand1 < 80) {
                    this.ccarray.push(rand1);
                }
            }else{
                break;
            }
        }
        for (var i = 0; i < ind; i++) {
            this.redDallList[this.ccarray[i]].state = true
            this.styleList[this.redDallIdx].SelecNumber++
        }
        var page_num=parseInt(this.redDallIdx)+1;
        var rnums=this.styleList[this.redDallIdx].SelecNumber;
        if(rnums<page_num){
            this.totalNum=0;
            this.totalPrice=0;
        }else {
            var totalNum=parseInt((getfactorial(rnums)/(getfactorial(rnums-page_num)*getfactorial(page_num))));
            this.totalNum=totalNum;
            this.totalPrice=totalNum*2;
        }
    },
    setredDallList: function (idx) {   // 选择
        var state = this.redDallList[idx].state
        if (state) {
            state = false
            this.styleList[this.redDallIdx].SelecNumber--
        } else {
            state = true
            this.styleList[this.redDallIdx].SelecNumber++
        }
        this.redDallList[idx].state = state;
        var page_num=parseInt(this.redDallIdx)+1;
        var rnums=this.styleList[this.redDallIdx].SelecNumber;
        if(rnums<page_num){
            this.totalNum=0;
            this.totalPrice=0;
        }else {
            var totalNum=parseInt((getfactorial(rnums)/(getfactorial(rnums-page_num)*getfactorial(page_num))));
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
		// 	if(this.totalNum>100){
		//   Toast('注单数量最多100注!');
		//   return false;
		// }
        var ssqBetArr;
        if (this.betConlength<=0||this.totalNum>0) {
            var page_num=parseInt(this.redDallIdx)+1;
            var rnums=this.styleList[this.redDallIdx].SelecNumber;
            if(rnums<page_num){
                Toast('最少选择'+page_num+'个红球');
                return
            }
            var ssqBetList={};
            var redDallList=this.redDallList;
            var redQiu=[];
            for (var i = 0; i < redDallList.length; i++) {
                if (redDallList[i].state) {
                    redQiu.push(redDallList[i].id);
                }
            }
            ssqBetList.playType=this.styleList[this.redDallIdx].name;
            ssqBetList.totalNum=this.totalNum;
            ssqBetList.totalPrice=this.totalPrice;
            ssqBetList.current = this.current;
            ssqBetList.redQiu=redQiu;
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
        this.lastTen.style.height = "0";
        this.gpc_bjk8.removeAttribute("style");
        window.removeEventListener('devicemotion',this.motionHandler, false);
        this.RouteLeave = true;
        var content = {};
        setSession('ssqBetList',ssqBetArr);
        content["current"] = this.current;
        content["endedTime"] = getTime(this.EndTime,1);
        content["type"] = this.styleList[this.redDallIdx].name;
        content["limitNumber"] = this.styleList[this.redDallIdx].limitNumber;
        setSession('content',content);
           this.$router.push({
            name:'goucai_gpc_bjk8pay'
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
#gpc_bjk8{
    margin-top: 2.25rem;
}
</style>