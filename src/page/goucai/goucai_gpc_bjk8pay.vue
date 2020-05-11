<template>
<div>
<header class="aui-bar aui-bar-nav">
    <div class="aui-pull-left aui-btn" @click="closeWindos()">
        <span class="aui-iconfont aui-icon-left"></span>
    </div>
    <div class="aui-title">北京快乐8</div>
    <div class="share_btn aui-pull-right" @click="fenx()">
        <span class="aui-iconfont aui-icon-share" ></span>
    </div>
</header>

<div id="mc_qlcpay" v-cloak>
    <!-- 分享模态框 -->
    <div v-if="shareStatue" class="share_box" @click="hideShare()">
        <div class="share_cont">
            <div class="quxiao">取消</div>
            <div class="down" @click="openDownload()">前往下载</div>
        </div>
    </div>
    <!-- 顶部期数 -->
    <div class="szcpay_head">
        <p>第<span>{{current}}</span>期 <span class="jiez">{{endedTime}}截止</span></p>
    </div>
    <!-- 注数 -->
    <div class="zhus_nav">
        <div @click='randomone'>+随机一注</div>
        <div @click='randomfive'>+随机五注</div>
        <div @click='continueNum'>+继续选号</div>
    </div>
    <!-- 内容 -->
    <div class="ssqpay">
        <div class="cont"  v-for='(d,i) in ssqBetList'>
          <div class="shanc" @click='deletes(i)' ><img src="../../assets/goucai/jjc/close_btnre.png" /> </div>
          <div class="xuanh" @click='compileNum(i)'>
            <div class="hao"><span v-for='red in d.redQiu'>{{red}}</span></div>
            <p><span>{{d.playType}}<i> {{d.totalNum}}</i>注</span><span>共<i> {{d.totalPrice}} </i>元</span></p>
          </div>
          <div class="jiant" @click='compileNum(i)'></div>
        </div>
    </div>
    <!-- 底部倍数 -->
    <div class="bottom">
        <div class="agree">
            <div class="check"><i :class="[ 'flr' , { 'active': Userprotocol }]" @click="onUserprotocol"></i><p>我已阅读并同意<span @click="JumpUserprotocol()">《委托投注规则》</span></p></div>
        </div>
        <div class="bt_text">
            <div class="zhuiq flr">
                <div class="flr word_z">追 </div>
                <div class="flr multiple">
                  <div class="jian flr" @click="reduce_qs"></div>
                  <div class="beishu flr" @click=" showkeyboard = true,keyboardAsc = 0 ,coverage=true"><span>{{ qishu }}</span></div>
                  <div class="jia flr" @click="increase_qs"></div>
                </div>
                <div class="flr word_q"> 期</div>
            </div>
            <div class="toub fgr">
                <div class="flr word_t">投</div>
                <div class="flr multiple">
                  <div class="jian flr" @click="reduce"></div>
                  <div class="beishu flr" @click=" showkeyboard = true,keyboardAsc = 1 ,coverage=true"><span>{{ multiple }}</span></div>
                  <div class="jia flr" @click="increase"></div>
                </div>
                <div class="flr word_b">倍</div>
            </div>
        </div>
        <div v-if='qishu > 1' class="tingz"><span @click="xuanZ" :class="['xuanz',{'active':xuanzStatue}] "></span>中奖后停止追号</div>
        <footer>
            <div class="delete flr" @click='deleteAll'></div>
            <div class="total flr"><p>共<span>{{noteNum*2*multiple*qishu}}</span>元</p><p class="p2"><span>{{noteNum}}</span>注<span>{{multiple}}</span>倍<span>{{ qishu }}</span>期</p></div>
            <div class="pay fgr" @click="openSuccessWin()">付款</div>
        </footer>
    </div>
    <!-- 模拟数字键盘 -->
    <div v-if="showkeyboard" class="keyboard">
        <div class="hidekey" @click="closekeyboard"></div>
        <div class="cont-f">
            <div class="bt_text">
                <div class="zhuiq flr">
                    <div class="flr word_z">追 </div>
                    <div class="flr multiple">
                        <div class="jian flr" @click="reduce_qs"></div>
                        <div :class="['beishu', 'flr', { 'selec': keyboardAsc == 0 }]" @click="keyboardAsc = 0,coverage=true"><span>{{ qishu }}</span></div>
                        <div class="jia flr" @click="increase_qs"></div>
                    </div>
                    <div class="flr word_q"> 期</div>
                </div>
                <div class="toub fgr">
                    <div class="flr word_t">投</div>
                    <div class="flr multiple">
                        <div class="jian flr" @click="reduce"></div>
                        <div :class="['beishu', 'flr', { 'selec': keyboardAsc == 1 }]" @click="keyboardAsc = 1,coverage=true"><span>{{ multiple }}</span></div>
                        <div class="jia flr" @click="increase"></div>
                    </div>
                    <div class="flr word_b">倍</div>
                </div>
            </div>
            <div class="bt_pay">
                <div class="total flr"><p>共<span>{{noteNum*2*multiple*qishu}}</span>元</p><p class="p2"><span>{{noteNum}}</span>注<span>{{multiple}}</span>倍<span>{{ qishu }}</span>期</p></div>
                <div class="pay fgr" @click="openSuccessWin()">付款</div>
            </div>
            <div class="Key_li">
                <ul>
                    <li @click="keyinputidx('1')">1</li>
                    <li @click="keyinputidx('2')">2</li>
                    <li @click="keyinputidx('3')">3</li>
                    <li @click="keyinputidx('4')">4</li>
                    <li @click="keyinputidx('5')">5</li>
                    <li @click="keyinputidx('6')">6</li>
                    <li @click="keyinputidx('7')">7</li>
                    <li @click="keyinputidx('8')">8</li>
                    <li @click="keyinputidx('9')">9</li>
                    <li @click="keyinputidx('00')">00</li>
                    <li @click="keyinputidx('0')">0</li>
                    <li class="del" @click="keybackspace"><img src="../../assets/goucai/jjc/biaoqingshanchujian.png" /></li>
                </ul>
            </div>
        </div>
    </div>
</div>
<module-pay :payPopupP='payPopup' :payMoneyP='payMoney' :coinsMoneyP='coinsMoney' :cashMoneyP='cashMoney'
		 :opnenWeixinP='opnenWeixin' :opnenBankopenP='opnenBankopen' :hasHongbaoP='false' :typeName='"北京快乐八"' @payPopupC="payPopupC" @RouteLeaveC='RouteLeaveC'
		 @paybtn='paybtn' @paylogok='paylogok'>
		</module-pay>
		<checkok-nav :logokz='logok' @showbox="showbox"></checkok-nav>
</div>
</template>

<script>
import {getSession,setSession,getCookie,getTime,compare,OverallData} from '../../js/common.js';
 
import {Toast,MessageBox} from 'mint-ui';
import checkokNav from '../../common/checkok.vue';
	import modulePay from '../../common/modulepay.vue';
	export default {
		components: {
			checkokNav,
			modulePay
		},
data() {
    return {
        shareStatue: false,  //分享状态
		coverage:true,//键盘第一次唤起
        xuanzStatue: true,
        ssqBetList: [],
        'content': [],
        current: '',
        endedTime: '',
        playType: '',
        limitNumber: 0,
        'pageParam': '',
        'multiple': '1',
        'showkeyboard': false,
        'Userprotocol': true,
        'showMask': false,
        'zhuihDom': false,
        'totalNum': 0,
        'noteNum': 0,
        'multiple': 1,
        'qishu': 1,
        'keyboardAsc': 0,
        'RouteLeave': false,
		coinsMoney: 0, //红包余额
		cashMoney: 0, //现金余额
		payPopup: false, //红包弹窗
		dianjiChonse: true, //选择红包
		cashdianjiChonse: false, //选择现金
		hongbaoType: false, //红包余额是否充足
		cashType: false, //现金余额是否充足
		opnenWeixin: false, //微信是否开放
		opnenBankopen: false, //银行卡是否开放
		hongbaobianxian: 0,
		payMoney: 0,
    };
},
beforeRouteEnter (to, from, next) {
    if (from.matched.length > 0) {
    	var lint = from.matched[0].name + 'pay'
    	if (to.name == lint) {
    		var arr=getSession('ssqBetList');
    		if (arr) {
    			next();
    		} else {
    			window.history.go(-1);
    		}
    	} else {
    		next();
    	}
    } else{
    	next();
    }
},
beforeRouteLeave (to, from , next) {
    if (this.RouteLeave||to.name=='agreement'||this.ssqBetList.length == 0) {
        next()
    } else {
        MessageBox({
            title:'',
            message: '是否保存当前注单',
            showCancelButton: true,
        }).then(action => {
            if (action == 'confirm') {
                setSession('pay',1);
                setSession('ssqBetList',this.ssqBetList);
                next()
            }else{
                sessionStorage.removeItem("ssqBetList");
                setSession('pay',0);
                next()
            }
        })
    }
},
created() {
	this.setTime();
    sessionStorage.removeItem("pay");
	this.getUserInfo();
	this.checkIsWx();
},
mounted() {
    this.ssqBetList = getSession("ssqBetList");
    this.zhuNum(this.ssqBetList);
    this.playType = getSession("content").type;
    this.limitNumber = getSession("content").limitNumber;
},
updated: function() {
			this.payMoney = this.noteNum * 2 * this.multiple * this.qishu;
			console.log(this.payMoney);
		},
methods:{
	showbox: function(msg) {
		this.RouteLeave = true;
		this.logok = msg;
	},
	paylogok: function(msg) {
		this.logok = msg;
	},
	payPopupC: function(msg) {
		this.payPopup = msg;
	},
	RouteLeaveC: function(msg) {
		this.RouteLeave = msg;
	},
	moneyTypeC: function(msg) {
		this.moneyType = msg;
	},
	checkIsWx: function() {
		this.$ajax.timeout = 49527; //不要加载状态
		this.$ajax.post('/caipiaoshouye/index.php/home/index/checkIsWx')
			.then(res => {
				this.$ajax.timeout = 50000;
				if (res.data.isopen == 0) {
					this.opnenWeixin = false;
				} else if (res.data.isopen == 1) {
					this.opnenWeixin = true;
				}
				if (res.data.isbankopen == 0) {
					this.opnenBankopen = false;
				} else if (res.data.isbankopen == 1) {
					this.opnenBankopen = true;
				}
	
			})
			.catch(err => {
				this.$ajax.timeout = 50000;
				console.log(err);
			})
	},
	getUserInfo: function(money, type) {
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
		data = this.Encrypt({...data});
		var datas = this.Qs.stringify({
			data
		}, {
			allowDots: true
		});
	
		this.$ajax.post('/caipiaoshouye/index.php/home/index/getUserInfo',
				datas
			)
			.then(res => {
	
				var content = JSON.parse(res.data.content);
				console.log(JSON.stringify(content));
				if (res.data.status != "200") {
	
					return;
				} else {
					if (content.code == "100000") {
						var cashMoney = content.data.money * 1;
						var coinsMoney = content.data.coinsMoney * 1;
						this.cashMoney = cashMoney;
						this.coinsMoney = coinsMoney;
	
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
                    this.endedTime=getTime(content.data.endedTime,1);
                    this.current=content.data.periodNumber;
                    this.setSurplusTime();
                }
                else if(content.code==201004){
                    Toast("当前期已截止");
                }
            }
        })
        .catch(err=>{
            console.log(err);
        })
    },
    setSurplusTime: function(time){
        var surTimes=time;
        var that = this;
        var inter = setInterval(function () {
            surTimes = surTimes - 1000
            if (surTimes < 0) {
                clearInterval(inter);
                that.setTime();
            }
        },1000)
    },
    closeWindos: function(){
        if (this.ssqBetList.length > 0) {
            this.$router.go(-1);
        } else {
            sessionStorage.removeItem("ssqBetList");
            setSession('pay',0);
            this.RouteLeave = true;
            this.$router.go(-1);
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
    // 键盘操作
    increase: function() {
        if (this.multiple < 9999) {
            this.multiple = this.multiple * 1 + 1 + ''
        }
    },
    reduce: function() {
        if (this.multiple > 1) {
            this.multiple = this.multiple * 1 - 1 + ''
        }
    },
    increase_qs: function() {
        if (this.qishu < 100) {
            this.qishu = this.qishu * 1 + 1 + ''
        }
        this.zhuihDom = true
    },
    reduce_qs: function() {
        if (this.qishu > 1) {
            this.qishu = this.qishu * 1 - 1 + ''
        }
        if (this.qishu == 1) {
            this.zhuihDom = false
        }
    },
    xuanZ: function() {
        if (this.xuanzStatue) {
            this.xuanzStatue = false;
        } else {
            this.xuanzStatue = true;
        }
    },
    keyinputidx: function (idx) {
        var mun = ''
        if (this.keyboardAsc == 0) {
            if (this.qishu == '0') {
                mun = idx
            }else if(this.coverage){
						mun = idx;
						this.coverage=false;
					} else {
                mun = this.qishu + idx
            }
            if (parseInt(mun) < 101 && parseInt(mun) > 0) {
                this.qishu = mun
            } else if (parseInt(mun) > 100) {
                this.qishu = '100'
            } else {
                this.qishu = '0'
            }
        } else {
            if (this.multiple == '0') {
                mun = idx
            }else if(this.coverage){
						mun = idx;
						this.coverage=false;
					} else {
                mun = this.multiple + idx
            }
            if (parseInt(mun) < 10000 && parseInt(mun) > 0) {
                this.multiple = mun
            } else if (parseInt(mun) > 9999) {
                this.multiple = '9999'
            } else {
                this.multiple = '0'
            }
        }
    },
    keybackspace: function () {
		this.coverage=false;
        if (this.keyboardAsc == 0) {
            var mun = this.qishu
            if (mun.length > 1) {
                this.qishu = mun.slice(0,-1)
            } else {
                if (parseInt(mun) != 0) {
                    if (parseInt(mun) > 1) {
                        this.qishu = '1'
                    } else {
                        this.qishu = '0'
                    }
                }
            }
        } else {
            var mun = this.multiple
            if (mun.length > 1) {
                this.multiple = mun.slice(0,-1)
            } else {
                if (parseInt(mun) != 0) {
                    if (parseInt(mun) > 1) {
                        this.multiple = '1'
                    } else {
                        this.multiple = '0'
                    }
                }
            }
        }
    },
    closekeyboard: function () {
        this.showkeyboard = false;
        if (this.multiple == '0') {
            this.multiple = '1'
        }
        if (this.qishu == '0') {
            this.qishu = '1'
        }
    },
    onStringnumber: function(idx) {
        var state = this.Stringnumber[idx].state
        if (state) {
            state = false
        } else {
            state = true
        }
        this.Stringnumber[idx].state = state
    },
    StringnumberSure: function() {
        this.showMask = false
    },
    onUserprotocol: function() {
        if (this.Userprotocol) {
            this.Userprotocol = false
        } else {
            this.Userprotocol = true
        }
    },
    randomone: function() {
		// if(parseInt(this.noteNum)>=100){
		// 	 Toast('注单数量最多100注！');
		// 	 return
		// }
        var idx = parseInt(this.limitNumber);
        var playType = this.playType;
        var obj = {};
        //生成idx个不重复的1-80的随机数
        var newRedArr = [];
        if (newRedArr.length == 0) {
            while (newRedArr.length < idx) {
                var num = parseInt(Math.random() * 80 + 1);
                if (newRedArr.indexOf(num) < 0) {
                    newRedArr.push(num);
                }
            }
        }
        newRedArr.sort(compare);
        obj.playType = playType;
        obj.totalNum = 1;
        obj.totalPrice = 2;
        obj.current = this.current;
        obj.limitNumber = this.limitNumber
        obj.redQiu = newRedArr;
        this.ssqBetList.push(obj);
        console.log(this.ssqBetList);
        this.zhuNum(this.ssqBetList);
        setSession('ssqBetList',this.ssqBetList);
    },
    randomfive: function() {
        for (var i = 0; i < 5; i++) {
			// if(parseInt(this.noteNum)>=100){
			// 	 Toast('注单数量最多100注！');
			// 	 return
			// }
            var idx = parseInt(this.limitNumber);
            var playType = this.playType;
            var obj = {};
            //生成idx个不重复的1-80的随机数
            var newRedArr = [];
            if (newRedArr.length == 0) {
                while (newRedArr.length < idx) {
                    var num = parseInt(Math.random() * 80 + 1);
                    if (newRedArr.indexOf(num) < 0) {
                        newRedArr.push(num);
                    }
                }
            }
            newRedArr.sort(compare);
            obj.playType = playType;
            obj.totalNum = 1;
            obj.totalPrice = 2;
            obj.current = this.current;
            obj.limitNumber = this.limitNumber
            obj.redQiu = newRedArr;
            this.ssqBetList.push(obj);
            this.zhuNum(this.ssqBetList);
            setSession('ssqBetList',this.ssqBetList);
        }
    },
    deletes: function(index) {
        this.ssqBetList.splice(index, 1);
        this.zhuNum(this.ssqBetList);
        setSession('ssqBetList',this.ssqBetList);
    },
    deleteAll: function() {
        MessageBox({
            title:'',
            message: '是否清空所有注单',
            showCancelButton: true,
        }).then(action => {
            if (action == 'confirm') {
                this.ssqBetList = [];
                this.zhuNum(this.ssqBetList);
                setSession('ssqBetList',this.ssqBetList);
            }else{
                return false;
            }
        })
    },
    continueNum: function() {
        setSession('pay',1);
        setSession('ssqBetList',this.ssqBetList);
        this.RouteLeave = true;
        this.$router.go(-1);
    },
    compileNum: function(i) {
        setSession('pay',2);
        setSession('ssqBetList',this.ssqBetList);
        setSession('index',i);
        this.RouteLeave = true
        this.$router.go(-1);
    },
    openSuccessWin: function() {
        if (!this.Userprotocol) {
            Toast('请阅读并勾选委托投注规则!');
            return
        }
        if (parseInt(this.noteNum) < 1) {
            Toast('注数不能小于1注!');
            return
        }
		if (parseInt(this.qishu) < 1) {
			this.qishu=1;
			Toast('投注期数不能小于1期!');
			return
		}
		if (parseInt(this.multiple) < 1) {
			this.multiple=1;
			Toast('投注倍数不能小于1倍!');
			return
		}
		// if(parseInt(this.noteNum)>100){
		//   Toast('注单数量最多100注!');
		//   return false;
		// }
		this.payPopup = true;
        // MessageBox({
        //     title:'',
        //     message: '确定购买所选注单',
        //     showCancelButton: true,
        // }).then(action => {
        //     if (action == 'confirm') {
        //           
        //     }else{
        //         return false;
        //     }
        // })
    },
	paybtn: function() {
		this.payPopup=false;
		  var data= this.setData();
		  let _data = {...data};
		  data = this.Encrypt(_data);
		var datas =  this.Qs.stringify({
		    path: "number/keno/bjklb",data
		},{allowDots: true});
		
		this.$ajax.post('/caipiaoshouye/index.php/home/index/createScheme',
		    datas
		)
		.then(res=>{
		    console.log(res);
		    if(res.data.status==200){
		        var content=JSON.parse(res.data.content);
		        if(content.code==100000){
					var datacontent=this.setData()['content'];
					var data=[];
					var myDate = new Date();
					myDate=getTime(myDate,2);
					var CitySN;
					if(getSession('equipmentIp')){
						CitySN=getSession('equipmentIp');
					}
					// obj.id=;
					data["mid"]=1;
					data["lotteryType"]=1000;
					data['periodNumber']=this.current;
					data["shareType"]=1;
					data["shareTime"]=myDate;
					data["uid"]=getCookie('newData').userid;
					data["multiple"]=this.multiple;
					data["schemeCost"]=this.noteNum*2*this.multiple*this.qishu;
					data["subscriptionMoney"]=this.noteNum*2*this.multiple*this.qishu;
					data["content"]=datacontent;
					data["quipmentiIp"]=CitySN;		//投注IP 
					data["quipmentTeype"]=10 ;         // 投注设备类型
					data["quipmentNumber"]='';          //投注设备号
					data["quipmentUid"]=getCookie('newData').userid;           // 投注UID
					data["quipmentOrderId"] =  content.data.schemeNumber;
					let object = {...data}
					setSession('obj', object);
					setSession('moneyType', 'LOTTERYMONEY');
		            this.RouteLeave = true
		            this.$router.push({
		            	name:'goucai_success',
		                query: {
		                	success: 'bjklb',
		                	schemeId: content.data.id,
		                	wcj_totalPrice: this.noteNum * 2 * this.multiple * this.qishu,
		                	from: 'pay',
							types:'shuzi'
		                }
		            });
		        }else{
		            Toast(content.message);
		        }
		    }
		})
		.catch(err=>{
		    console.log(err);
		    Toast('服务器繁忙，请稍后重试！')
		})
	},
    zhuNum: function(array) {
        var totalNum = 0;
        for (var i = 0; i < array.length; i++) {
            totalNum += array[i].totalNum;
        }
        this.noteNum = totalNum;
    },
    setData: function() {
        var data = [];
        var uid = getCookie('newData').userid;
        data.userId = uid;    //拼接uid
        if (this.qishu > 1) {   //判断是否追号
            data.chase = true;
        } else {
            data.chase = false;
        }
        var chaseMultipleList = [];   //追号列表
        var qi = this.qishu;
        var bei = this.multiple;
        for (var i = 0; i < qi; i++) {
            chaseMultipleList.push(bei);
        }
        data.chaseMultipleList = chaseMultipleList;
        var content = [];
        var betArr = this.ssqBetList;
        for (var i = 0; i < betArr.length; i++) {
            var obj = [];
            var types = '';
            console.log(parseInt(this.limitNumber));
            switch (parseInt(this.limitNumber)) {
                case 1:types = 'randomOne';break;
                case 2:types = 'randomTwo';break;
                case 3:types = 'randomThree';break;
                case 4:types = 'randomFour';break;
                case 5:types = 'randomFive';break;
                case 6:types = 'randomSix';break;
                case 7:types = 'randomSeven';break;
                case 8:types = 'randomEight';break;
                case 9:types = 'randomNine';break;
                case 10:types = 'randomTen';break;
                default:
            }
            obj.playMethod = types;
            obj.playType = types;
            var str = betArr[i].redQiu.join(',');
            obj.betContent = str;
            obj.schemeUnits = betArr[i].totalNum;
            content.push({...obj});
        }
        data.content = content;
        data.isSingle = "normal";   //isSingle
        var schemeMultiple = bei;   //投注倍数
        data.schemeMultiple = schemeMultiple;
        data.secretType = "FULL_PUBLIC";   //方案保密类型
        data.shareType = "SELF";  //自购|合买
        if (this.xuanzStatue) {   //中奖后停止追号
            data.winstopstyle = true;
        } else {
            data.winstopstyle = false;
        }
        data.moneyType = "LOTTERYMONEY";   //币种
        return data;
    },
    JumpUserprotocol: function() {
        this.RouteLeave = true
        this.$router.push({
            name:'agreement'
        });
    },
    
}
}
</script>

<style scoped>
@import "../../css/goucai_szcpay.css";
header{
    position: fixed !important;
}
#mc_qlcpay{
    font-size: 0.8rem;
    margin-top: 2.25rem;
    background: #f2f2f2;
    min-height: 100vh;
}
</style>
