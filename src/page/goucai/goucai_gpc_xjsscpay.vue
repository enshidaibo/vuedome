<template>
<div>
<!-- <header class="aui-bar aui-bar-nav">
    <div class="aui-pull-left aui-btn" @click="closeWindos()">
        <span class="aui-iconfont aui-icon-left"></span>
    </div>
    <div class="aui-title">新疆时时彩</div>
    <div class="share_btn aui-pull-right" @click="fenx()">
        <span class="aui-iconfont aui-icon-share" ></span>
    </div>
</header> -->
         <header class="aui-bar aui-bar-nav">
             <div class="aui-pull-left aui-btn" tapmode @click="closeWindos()">
               <span class="aui-iconfont aui-icon-left"></span>
             </div>
             <div>
               <div class="aui-title"  tapmode>新疆时时彩
				<span  class="type">{{pageParam.titleName}}</span>
			   </div>
             </div>
         <div class=" aui-pull-right" @click="fenx()">
             <span class="aui-iconfont aui-icon-share" ></span>
         </div>
         </header>

<div id="mc_ssqpay">
    <!-- 分享模态框 -->
    <div v-if="shareStatue" class="share_box" @click="hideShare()">
        <div class="share_cont">
            <div class="quxiao">取消</div>
            <div class="down" @click="openDownload()">前往下载</div>
        </div>
    </div>
    <!-- 顶部期数 -->
    <div v-cloak class="szcpay_head">
        <p><span>第{{ current }}期</span> <span class="jiez">{{ surTimedays }}截止</span></p>
    </div>
    <!-- 注数 -->
    <div v-cloak class="zhus_nav">
        <div @click="randomone()">+随机一注</div>
        <div @click="randomfour()">+随机五注</div>
        <div @click="addlist()">+继续选号</div>
    </div>
	<!-- 红包返现 -->
	<div class="szchn_head">
		<div>现金投注即返<i>5%</i>的现金&nbsp;&nbsp;本次投注可返现金<i>{{(totalNum*2*multiple*qishu*0.05).toFixed(2)}}</i>元</div>
		<!--<img @click="hongbaogzbox" src="../../assets/goucai/jjc/hbwenhao.png" />-->
	</div>
    <!-- 内容 -->
    <div v-cloak class="ssqpay">
        <template v-for="(item,cindex) in pageParam.betContent">
        <div class="cont">
            <div class="shanc" @click="deletesList(cindex)"><img src="../../assets/goucai/jjc/close_btnre.png" /> </div>
            <div class="xuanh">
                <div class="hao">
                    <template v-for="(thal,rindex) in item.wan"><span>{{ thal }}</span></template>
                    <template v-if="pageParam.danDallIdx == 6 || pageParam.danDallIdx == 7">|</template>
                    <template v-for="(thal,rindex) in item.qian"><span>{{ thal }}</span></template>
                    <template v-if="pageParam.danDallIdx == 6 || pageParam.danDallIdx == 7">|</template>
                    <template v-for="(thal,rindex) in item.bai"><span>{{ thal }}</span></template>
                    <template v-if="pageParam.danDallIdx == 3 || pageParam.danDallIdx == 6 || pageParam.danDallIdx == 7">|</template>
                    <template v-for="(thal,rindex) in item.shi"><span>{{ thal }}</span></template>
                    <template v-if="pageParam.danDallIdx == 1 || pageParam.danDallIdx == 3 || pageParam.danDallIdx == 6 || pageParam.danDallIdx == 7 || pageParam.danDallIdx == 8">|</template>
                    <template v-for="(thal,rindex) in item.ge"><span>{{ thal }}</span></template>
                </div>
                <p><span>{{ pageParam.titleName }}<i> {{ item.totalNum }}</i>注</span><span>共<i> {{ item.totalNum * 2 }} </i>元</span></p>
            </div>
            <div class="jiant" @click="editThis(cindex)"></div>
        </div>
        </template>
    </div>
    <!-- 底部倍数 -->
    <div v-cloak class="bottom">
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
<!--        <footer>
            <div class="delete flr" @click="allDeletes"></div>
            <div class="total flr"><p>共<span>{{totalNum*qishu*multiple*2}}</span>元</p><p class="p2"><span>{{totalNum}}</span>注<span>{{multiple}}</span>倍<span>{{qishu}}</span>期</p></div>
            <div class="pay fgr" @click="openSuccessWin()">付款</div>
        </footer> -->
						<footer>
			<div class="ft_money flr">
				<p>合计金额：<span>¥{{(totalNum*qishu*multiple*2).toFixed(2)}}</span></p>
				<p class="p2"><span>{{totalNum}}</span>注<span>{{multiple}}</span>倍<span>{{qishu}}</span>期</p>
			</div>
			<div class="ft_btn fgr">
				<div class="flr" tapmode >
		
				</div>
				<div class="flr" tapmode @click="openSuccessWin()">付款</div>
			</div>
		</footer>
    </div>
    <!-- 模拟数字键盘 -->
    <div v-cloak v-if="showkeyboard" class="keyboard">
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
            <footer>
            	<div class="ft_money flr">
            		<p>合计金额：<span>¥{{(totalNum*qishu*multiple*2).toFixed(2)}}</span></p>
            		<p class="p2"><span>{{totalNum}}</span>注<span>{{multiple}}</span>倍<span>{{qishu}}</span>期</p>
            	</div>
            	<div class="ft_btn fgr">
            		<div class="flr" tapmode >
            
            		</div>
            		<div class="flr" tapmode @click="openSuccessWin()">付款</div>
            	</div>
            </footer>
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
		 :opnenWeixinP='opnenWeixin' :opnenBankopenP='opnenBankopen' :hasHongbaoP='false' :typeName='"新疆时时彩"' @payPopupC="payPopupC" @RouteLeaveC='RouteLeaveC'
		 @paybtn='paybtn' @paylogok='paylogok'>
		</module-pay>
		<checkok-nav :logokz='logok' @showbox="showbox"></checkok-nav>
		<homngbaogz :hongbaogz='hongbaogz' @hongbaogzbox="hongbaogzbox"></homngbaogz>
</div>
</template>

<script>
import {getSession,setSession,getCookie,OverallData,getTime} from '../../js/common.js';
 
import {Toast,MessageBox} from 'mint-ui';
import checkokNav from '../../common/checkok.vue';
	import modulePay from '../../common/modulepay.vue';
	import homngbaogz from '../../common/homngbaogz.vue';
	export default {
		components: {
			checkokNav,
			modulePay,
			homngbaogz
		},
data() {
    return {
		logok: false, //未实名标志
        shareStatue: false,  //分享状态
		coverage:true,//键盘第一次唤起
        xuanzStatue: true,
        'EndTime': 0,
        'nowTime': 0,
        'current': 0,
        'surTimedays': '',
        'content': [],
        'pageParam': '',
        'multiple': '1',
        'showkeyboard': false,
        'Userprotocol': true,
        'showMask': false,
        'zhuihDom': false,
        'totalNum': 0,
        'multiple': 1,
        'qishu': 1,
        'keyboardAsc': 0,
        'ccarray': [],
        'zuihao': false,
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
		sjhongbao: 0,
		hongbaogz: false
    };
},
beforeRouteEnter (to, from, next) {
    if (from.matched.length > 0) {
        var lint = from.matched[0].name + 'pay'
        if (to.name == lint) {
            var arr=getSession('betContent');
            if (arr) {
                next();
            } else {
                window.history.go(-1);
            }
        } else {
            next();
        }
    }else{
        next();
    }
},
beforeRouteLeave (to, from , next) {
    if (this.RouteLeave||to.name=='goucai_hemai'||to.name=='agreement'||this.pageParam.betContent.length == 0) {
        next()
    } else {
        MessageBox({
            title:'',
            message: '是否保存当前注单',
            showCancelButton: true,
        }).then(action => {
            if (action == 'confirm') {
                setSession('pay',1);
                setSession('pageParam',this.pageParam);
                next()
            }else{
                sessionStorage.removeItem("pageParam");
                sessionStorage.removeItem("pay");
                setSession('noContinueNum',0);
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
    this.pageParam = getSession("content");
    this.pageParam.betContent = getSession("betContent");
    var totalNum = 0;
    for (var i = 0; i < this.pageParam.betContent.length; i++) {
        totalNum = totalNum + this.pageParam.betContent[i].totalNum
    }
    this.totalNum = totalNum;
},
watch: {
			coinsMoney: function() {
				this.sjhongbaostr();
			}
		},
		
		
updated: function() {
			this.payMoney = this.totalNum * 2 * this.multiple * this.qishu;
			console.log(this.payMoney);
				this.$nextTick(function() {
				this.sjhongbaostr();
			})
		},
methods:{
	sjhongbaostr: function() {
		let hongbaobianxian = this.totalNum * 2 * this.multiple * this.qishu * 20 / 100;
		if (this.coinsMoney < 0.4) {
			hongbaobianxian = 0.00;
		} else if (this.coinsMoney <= hongbaobianxian) {
			hongbaobianxian = this.coinsMoney;
		}
		this.sjhongbao = hongbaobianxian;
	},
	hongbaogzbox: function(msg) {
		this.RouteLeave = true;
		this.hongbaogz = msg;
	},
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
    setTime: function() {    //请求截至时间数据
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
                    this.EndTime=parseInt(content.data.endedTime);
                    this.nowTime=parseInt(content.data.nowTime)
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
    setSurplusTime: function() {
        //  var timestamp = Date.parse(new Date());
        var endedTime = this.EndTime
        var surTime = endedTime - parseInt( this.nowTime/1000)*1000
        var sTm = this.formatDuring(endedTime)
        if (sTm[3] < 10) {
            sTm[3] = '0' + sTm[3]
        }
        if (sTm[2] < 10) {
            sTm[2] = '0' + sTm[2]
        }
		  if (sTm[1] < 10) {
    sTm[1] = '0' + sTm[1]
  }
  if (sTm[0] < 10) {
    sTm[0] = '0' + sTm[0]
  }
        this.surTimedays = sTm[0] + '-' + sTm[1] + ' ' + sTm[2] + ':' + sTm[3];
        var that = this;
        var interval = setInterval(function () {
            surTime = surTime - 1000
            if (surTime < 0) {
                that.setTime();
                clearInterval(interval);
            }
        },1000)
    },
    formatDuring: function(mss) {
        var mssc = new Date(mss);
        var year=mssc.getFullYear();
        var month=mssc.getMonth()+1;
        var date=mssc.getDate();
        var hour=mssc.getHours();
        var minute=mssc.getMinutes();
        var second=mssc.getSeconds();
        return [month,date,hour,minute,second]
    },
    closeWindos: function(){
        if (this.pageParam.betContent.length > 0) {
            this.$router.go(-1);
        } else {
            setSession('noContinueNum',0);
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
    increase: function () {
        if (this.multiple < 9999) {
            this.multiple = this.multiple*1 + 1 + ''
        }
      //消除点击延时
      // FastClick.attach(document.body);
    },
    reduce: function () {
        if (this.multiple > 1) {
            this.multiple = this.multiple*1 - 1 + ''
        }
      //消除点击延时
      // FastClick.attach(document.body);
    },
    increase_qs: function () {
        if (this.qishu < 100) {
            this.qishu = this.qishu*1 + 1 + ''
        }
        this.zhuihDom = true
        //消除点击延时
        // FastClick.attach(document.body);
    },
    reduce_qs: function () {
        if (this.qishu > 1) {
            this.qishu = this.qishu*1 - 1 + ''
        }
        if(this.qishu==1){
            this.zhuihDom = false
        }
        //消除点击延时
        // FastClick.attach(document.body);
    },
    xuanZ: function(){
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
					}  else {
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
					}  else {
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
        //消除点击延时
        // FastClick.attach(document.body);
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
        //消除点击延时
        // FastClick.attach(document.body);
    },
    closekeyboard: function () {
        this.showkeyboard = false;
        if (this.multiple == '0') {
            this.multiple = '1'
        }
        if (this.qishu == '0') {
            this.qishu = '1'
        }
        //消除点击延时
        // FastClick.attach(document.body);
    },
    onUserprotocol: function () {
        if (this.Userprotocol) {
            this.Userprotocol = false
        } else {
            this.Userprotocol = true
        }
        //消除点击延时
        // FastClick.attach(document.body);
    },
    deletesList: function (idx) {   //删除号码
        var totalNum = 0;
        this.pageParam.betContent.splice(idx,1);
        for (var i = 0; i < this.pageParam.betContent.length; i++) {
            totalNum = totalNum + this.pageParam.betContent[i].totalNum;
        }
        this.totalNum = totalNum;
        setSession('betContent',this.pageParam.betContent);
        //消除点击延时
        // FastClick.attach(document.body);
    },
    allDeletes: function () {   //删除所有
        if (this.pageParam.betContent.length > 0) {
            MessageBox({
                title:'',
                message: '是否清空所有注单',
                showCancelButton: true,
            }).then(action => {
                if (action == 'confirm') {
                    this.pageParam.betContent = [];
                    this.totalNum = 0;
                    setSession('betContent',this.pageParam.betContent);
                }else{
                    return false;
                }
            })
        }
        //消除点击延时
        // FastClick.attach(document.body);
    },
    editThis: function (idx) {   //修改投注号码
        setSession('pay',2);
        setSession('pageParam',this.pageParam);
        setSession('index',idx);
        this.RouteLeave = true;
        this.$router.go(-1)
    },
    addlist: function () {   //继续选号
        setSession('pay',1);
        setSession('pageParam',this.pageParam);
        this.RouteLeave = true;
        this.$router.go(-1)
    },
    randomone: function () {   //随机选择
	// if(parseInt(this.totalNum)>=100){
	// 	 Toast('注单数量最多100注！');
	// 	 return
	// }
        var danDallIdx = this.pageParam.danDallIdx;
        var betContent = {wan:[],qian:[],bai:[],shi:[],ge:[],totalNum: 1};
        var totalNum = 0;
        this.ccarray = []
        if (danDallIdx == 0) {
            var rand = this.generateRandom(10,9);
            betContent.ge.push(rand)
        } else if (danDallIdx == 1) {
            var rand1 = this.generateRandom(10,9);
            var rand2 = this.generateRandom(10,9);
            betContent.shi.push(rand1)
            betContent.ge.push(rand2)
        } else if (danDallIdx == 2 || danDallIdx == 4) {
            for(var i = 0 ; ; i++){
                if(this.ccarray.length<2){
                    var rand = this.generateRandom(10,9);
                    if (rand != null) {
                        this.ccarray.push(rand);
                        betContent.ge.push(rand);
                    }
                }else{
                    break;
                }
            }
            betContent.totalNum = danDallIdx / 2
        } else if (danDallIdx == 3) {
            var rand1 = this.generateRandom(10,9);
            var rand2 = this.generateRandom(10,9);
            var rand3 = this.generateRandom(10,9);
            betContent.bai.push(rand1);
            betContent.shi.push(rand2);
            betContent.ge.push(rand3);
        } else if (danDallIdx == 5) {
            for(var i = 0 ; ; i++){
                if(this.ccarray.length<3){
                    var rand = this.generateRandom(10,9);
                    if (rand != null && rand < 10) {
                        this.ccarray.push(rand);
                        betContent.ge.push(rand);
                    }
                }else{
                    break;
                }
            }
        } else if (danDallIdx == 6 || danDallIdx == 7) {
            var rand1 = this.generateRandom(10,9);
            var rand2 = this.generateRandom(10,9);
            var rand3 = this.generateRandom(10,9);
            var rand4 = this.generateRandom(10,9);
            var rand5 = this.generateRandom(10,9);
            betContent.wan.push(rand1);
            betContent.qian.push(rand2);
            betContent.bai.push(rand3);
            betContent.shi.push(rand4);
            betContent.ge.push(rand5);
        } else if (danDallIdx == 8) {
            var DXarr = ['大','小','单','双'];
            var rand1 = this.generateRandom(4,3);
            var rand2 = this.generateRandom(4,3);
            betContent.shi.push(DXarr[rand1]);
            betContent.ge.push(DXarr[rand2]);
        } else {
            Toast('玩法选择错误，请返回重新投注');
            return false;
        }
        this.pageParam.betContent.push(betContent);
        for (var i = 0; i < this.pageParam.betContent.length; i++) {
            totalNum = totalNum + this.pageParam.betContent[i].totalNum
        }
        this.totalNum = totalNum;
        setSession('betContent',this.pageParam.betContent);
        //消除点击延时
        // FastClick.attach(document.body);
    },
    randomfour: function () {
        for (var i = 0; i < 5; i++) {
			// if(parseInt(this.totalNum)>=100){
			// 	 Toast('注单数量最多100注！');
			// 	 return
			// }
            this.randomone()
        }
    },
    generateRandom: function (count,max){   // 随机数
        var rand = parseInt(Math.random()*count);
        for(var i = 0 ; i < this.ccarray.length; i++){
            if(this.ccarray[i] == rand){
                return null
            }
        }
        return rand
    },
    openSuccessWin: function() {
        if (!this.Userprotocol) {
            Toast('请阅读并勾选委托投注规则!');
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
        if (parseInt(this.totalNum) < 1) {
            Toast('注数不能小于1注!');
            return
        }
	// if(parseInt(this.totalNum)>100){
	//   Toast('注单数量最多100注!');
	//   return false;
	// }
	this.payPopup = true;
     
    },
		paybtn: function() {
			this.payPopup=false;
		   var data= this.setData();
		   let _data = {...data};
		   console.log(_data);//eas加密
		   data = this.Encrypt(_data);
		   console.log(data);//eas加密
		var datas =  this.Qs.stringify({
		    "path":"number/keno/xjssc",data
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
					data["lotteryType"]=23;
					data["shareTime"]=myDate;
					data['periodNumber']=this.current;
					data["shareType"]=1;
					data["uid"]=getCookie('newData').userid;
					data["multiple"]=this.multiple;
					data["schemeCost"]=this.totalNum*2*this.multiple*this.qishu;
					data["subscriptionMoney"]=this.totalNum*2*this.multiple*this.qishu;
					data["content"]=datacontent;
					data["quipmentiIp"]=CitySN;		//投注IP 
					data["quipmentTeype"]=10 ;         // 投注设备类型
					data["quipmentNumber"]='';          //投注设备号
					data["quipmentUid"]=getCookie('newData').userid;           // 投注UID
					data["quipmentOrderId"] =  content.data.schemeNumber;
					let object = {...data}
					setSession('obj', object);
					setSession('moneyType', 'LOTTERYMONEY');
		            this.RouteLeave = true;
		            this.$router.push({
		            	name:'goucai_success',
		                query: {
		                	success: 'xjssc',
		                	schemeId: content.data.id,
		                	wcj_totalPrice: this.totalNum * this.qishu * 2 * this.multiple,
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
    setData: function(){
        var data=[];
        var uid = getCookie('newData').userid;
        data.userId=uid;   //拼接uid
        if(parseInt(this.qishu)>1){   
            if (this.xuanzStatue) {   //判断是否追号
                data.winstopstyle=true;
            } else {
                data.winstopstyle=false;
            }
            data.chase=true;
        }else{
            data.chase=false;
            data.winstopstyle=true;
        }
        var chaseMultipleList=[];   //追号列表
        var qi = parseInt(this.qishu);
        var bei= parseInt(this.multiple);
        for(var i=0;i<qi;i++){
            chaseMultipleList.push(bei);
        }
        data.chaseMultipleList=chaseMultipleList;
        var content=[]
        for(var i=0;i<this.pageParam.betContent.length;i++){
            var obj = [];
            var betContent = '',betContentGe = '',betContentShi = '',betContentBai = '',betContentQian = '',betContentWan = ''
            if (this.pageParam.betContent[i].ge.length > 0) {
                for (var n = 0; n < this.pageParam.betContent[i].ge.length; n++) {
                    betContentGe = betContentGe + ',' + this.pageParam.betContent[i].ge[n]
                }
                betContentGe = betContentGe.slice(1,betContentGe.length);
            }
            if (this.pageParam.betContent[i].shi.length > 0) {
                for (var n = 0; n < this.pageParam.betContent[i].shi.length; n++) {
                    betContentShi = betContentShi + ',' + this.pageParam.betContent[i].shi[n]
                }
                betContentShi = betContentShi.slice(1,betContentShi.length);
            }
            if (this.pageParam.betContent[i].bai.length > 0) {
                for (var n = 0; n < this.pageParam.betContent[i].bai.length; n++) {
                    betContentBai = betContentBai + ',' + this.pageParam.betContent[i].bai[n]
                }
                betContentBai = betContentBai.slice(1,betContentBai.length);
            }
            if (this.pageParam.betContent[i].qian.length > 0) {
                for (var n = 0; n < this.pageParam.betContent[i].qian.length; n++) {
                    betContentQian = betContentQian + ',' + this.pageParam.betContent[i].qian[n]
                }
                betContentQian = betContentQian.slice(1,betContentQian.length);
            }
            if (this.pageParam.betContent[i].wan.length > 0) {
                for (var n = 0; n < this.pageParam.betContent[i].wan.length; n++) {
                    betContentWan = betContentWan + ',' + this.pageParam.betContent[i].wan[n]
                }
                betContentWan = betContentWan.slice(1,betContentWan.length);
            }
            if (this.pageParam.danDallIdx == 0 || this.pageParam.danDallIdx == 2 || this.pageParam.danDallIdx == 4 || this.pageParam.danDallIdx == 5) {
                betContent = betContentGe
            } else if (this.pageParam.danDallIdx == 1 || this.pageParam.danDallIdx == 8) {
                betContent = betContentShi + '|' + betContentGe
            } else if (this.pageParam.danDallIdx == 3) {
                betContent = betContentBai + '|' + betContentShi + '|' + betContentGe
            } else if (this.pageParam.danDallIdx == 6 || this.pageParam.danDallIdx == 7) {
                betContent = betContentWan + '|' + betContentQian + '|' + betContentBai + '|' + betContentShi + '|' + betContentGe
            }
            obj.betContent = betContent;
            obj.playMethod = this.pageParam.playMethod;
            obj.playType = this.pageParam.playType;
            obj.schemeUnits = this.pageParam.betContent[i].totalNum;
            // content.push({'betContent': betContent,'playMethod': this.pageParam.playMethod,'playType': this.pageParam.playType,'schemeUnits': this.pageParam.betContent[i].totalNum})
            content.push({...obj});
        }
        data.content=content;
        data.isSingle="normal";   //isSingle
        var schemeMultiple=bei;   //投注倍数
        data.schemeMultiple=schemeMultiple;
        data.secretType="FULL_PUBLIC";   //方案保密类型
        data.shareType="SELF";    //自购|合买
        data.moneyType="LOTTERYMONEY";   //币种
        console.log(data);
        return data;
    },
    JumpUserprotocol: function() {
        this.RouteLeave = true;
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
#mc_ssqpay{
    font-size: 0.8rem;
    margin-top: 2.25rem;
    background: #f2f2f2;
    min-height: 100vh;
}
</style>