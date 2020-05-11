<template>
	<div>
		<header class="aui-bar aui-bar-nav hemai-win">
			<div class="aui-pull-left aui-btn" tapmode @click="closeWin()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">{{herderText}}</div>
			<div class="aui-pull-right aui-btn hemai-icon">
				<span class="aui-iconfont aui-icon-share" @click='fenx()'></span>
			</div>
		</header>
        <!-- 分享模态框 -->
        <div v-if="shareStatue" class="share_box" @click="hideShare()">
            <div class="share_cont">
                <div class="quxiao">取消</div>
                <div class="down" @click="openDownload()">前往下载</div>
            </div>
        </div>
		<div class="jjc_hemai" id="goucai_hemai">
			<div class="jjc_hmtop">
				<div class="flr">方案金额：<span id="flr_span">{{flr_span}}</span>元</div>
				<div class="fgr">份数：<span id="fgr_span">{{fgr_span}}</span>份</div>
			</div>
			<div class="line"></div>
			<div class="jjc_hmtext">
				<div class="tit">中奖佣金</div>
				<div class="cont">
					<ul>
						<li v-for=" (item,index) in extractList " :class="{ 'active': index == extractIdx }" @click="extractIdx = index;">
							{{ item.text }} </li>
					</ul>
				</div>
			</div>
			<div class="jjc_hmtext">
				<div class="tit">购买份数：</div>
				<p class="notice">注：发起人至少认购方案金额的10%</p>
				<div class="fens_cont">
					<div class="flr progress">
						<div class="pret">{{ progress1 }}</div>
						<div class="tiao">
							<div class="tiao_con" :style="'width: ' + progress1"></div>
						</div>
						<div class="tiao_bom"><i>0%</i><i>50%</i><i>90%</i></div>
					</div>
					<div class="fgr number">
						<div class='input' @click="keyboardtop = 1;showkeyboard = true;">{{ message1 }}</div> 份
					</div>
				</div>
			</div>
			<div class="jjc_hmtext">
				<div class="tit baodi_tit">保底份数：</div>
				<p class="notice">注：网站合买方案保底10%，发起人至少保方案金额的5%</p>
				<div class="fens_cont">
					<div class="flr progress">
						<div class="pret">{{ progress2 }}</div>
						<div class="tiao">
							<div class="tiao_con" :style="'width: ' + progress2"></div>
						</div>
						<div class="tiao_bom"><i>0%</i><i>50%</i><i>90%</i></div>
					</div>
					<div class="fgr number">
						<div class='input' @click="keyboardtop = 2;showkeyboard = true;">{{ message2 }}</div> 份
					</div>
				</div>
			</div>
			<div class="jjc_hmtext ">
				<div class="tit">保密设置：</div>
				<div class="cont">
					<ul class="baomi">
						<li v-for="(item,index) in baomiList" :class="{ 'active': baomiIdx == index }" @click="baomiIdx = index">{{ item.text }}</li>
					</ul>
				</div>
			</div>
			<div class="baomis">

			</div>
			<footer class="hm_foot">
				<div class="flr hm_yuan">
					<p><span id="gatherNum">{{gatherNum}}</span>份&nbsp;x&nbsp;1元&nbsp;=&nbsp;<span id="gathermoney">{{gathermoney}}</span>元</p>
				</div>
				<div class="fgr hm_pay" tapmode @click="open_jjcsuceess()">付款</div>
			</footer>

			<!-- 模拟数字键盘 -->
			<div v-if="showkeyboard" class="keyboard">
				<div class="hidekey" @click="showkeyboard = false"></div>
				<div class="cont-f">
					<div class="jjc_hmtext">
						<div v-if="keyboardtop == 1" class="fens_cont">
							<div class="flr progress">
								<div class="pret">{{ progress1 }}</div>
								<div class="tiao">
									<div class="tiao_con" :style="'width: ' + progress1"></div>
								</div>
								<div class="tiao_bom"><i>0%</i><i>50%</i><i>90%</i></div>
							</div>
							<div class="fgr number">
								<div class='input'>{{ message1 }}</div> 份
							</div>
						</div>
						<div v-else class="fens_cont">
							<div class="flr progress">
								<div class="pret">{{ progress2 }}</div>
								<div class="tiao">
									<div class="tiao_con" :style="'width: ' + progress2"></div>
								</div>
								<div class="tiao_bom"><i>0%</i><i>50%</i><i>90%</i></div>
							</div>
							<div class="fgr number">
								<div class='input'>{{ message2 }}</div> 份
							</div>
						</div>
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
		 :opnenWeixinP='opnenWeixin' :opnenBankopenP='opnenBankopen' :hasHongbaoP='false'  :typeName='herderText' @payPopupC="payPopupC" @RouteLeaveC='RouteLeaveC'
		 @paybtn='paybtn' @paylogok='paylogok'>
		</module-pay>
		<checkok-nav :logokz='logok' @showbox="showbox"></checkok-nav>
	</div>
</template>

<script>
	var setData;
	import {
		getSession,
		setSession,
		getCookie,
		getTime, 
		OverallData
	} from '../../js/common.js';
	 import checkokNav from '../../common/checkok.vue';
	 import modulePay from '../../common/modulepay.vue';
	import {
		Toast,
		MessageBox
	} from 'mint-ui';
	export default {
		components: {
			checkokNav,
			modulePay,
			
		},
		data() {
			return {
				logok: false, //未实名标志
                shareStatue: false,  //分享状态
				datas: '',
				payid: '',
				pageName: '',
				showkeyboard: false,
				keyboardtop: 1,
				herderText: '',
				fgr_span: '',
				flr_span: '',
				extractList: [{
					'text': '无提成',
					'num': 0
				}, {
					'text': '1%',
					'num': 0.01
				}, {
					'text': '2%',
					'num': 0.02
				}, {
					'text': '3%',
					'num': 0.03
				}, {
					'text': '4%',
					'num': 0.04
				}, {
					'text': '5%',
					'num': 0.05
				}, {
					'text': '6%',
					'num': 0.06
				}, {
					'text': '7%',
					'num': 0.07
				}, {
					'text': '8%',
					'num': 0.08
				}, {
					'text': '9%',
					'num': 0.09
				}, {
					'text': '10%',
					'num': 0.1
				}],
				baomiList: [{
					'text': '完全公开',
					'type': 'FULL_PUBLIC'
				}, {
					'text': '开奖后公开',
					'type': 'DRAWN_PUBLIC'
				}, {
					'text': '跟单人公开',
					'type': 'FOLLOW_PUBLIC'
				}, {
					'text': '完全保密',
					'type': 'FULL_SECRET'
				}],
				extractIdx: 0,
				baomiIdx: 0,
				Fnumber: 0,
				message1: 0,
				message2: 0,
				progress1: '20%',
				progress2: '0%',
				gatherNum: '',
				periodNumber:'',
				gathermoney: '',
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
		updated: function() {
			this.payMoney = this.message1+ this.message2 ;
		
		},
		created() {
			var pageName = this.$route.query.pageName;
			var Fnumber = this.$route.query.Fnumber;
			var payid = this.$route.query.payid;
			var arr = this.$route.query.arr;
			var datas = sessionStorage.getItem('hemaiData');
			let data = this.Qs.parse(
				datas
			);
			console.log(data);
			this.payid = payid;
			this.periodNumber=this.$route.query.periodNumber;
			this.setTitle(pageName, Fnumber);
			this.Fnumber = Fnumber;
			this.pageName = pageName;
			this.datas = data.data;
			setData=data.data;
			console.log(setData);
			this.payid = payid;
			this.message1 = Math.ceil(Fnumber * 0.1);
			this.gatherNum = Math.ceil(Fnumber * 0.1);
			this.gathermoney = Math.ceil(Fnumber * 0.1) * 1;
			var progress1 = (this.message1 / Fnumber) * 100
			progress1 = progress1.toFixed(2) + '%'
			this.progress1 = progress1;
			this.setFnumber(Fnumber);
			this.getUserInfo();
			
		},
		methods: {
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
			closeWin: function() {
				sessionStorage.removeItem('hemaiData');
				this.$router.go(-1);
			},
			keyinputidx: function(re) {
				var Fnumber = this.Fnumber * 1
				var message1 = this.message1 * 1
				var message2 = this.message2 * 1
				var progress1 = this.progress1
				var progress2 = this.progress2;
				if (this.keyboardtop == 1) {
					message1 = (message1 + re) * 1
					var num = message1 + message2
					if (num > Fnumber) {
						message1 = Fnumber - message2
						Toast('已达最高购买数量');
					}
					progress1 = (message1 / Fnumber) * 100
					progress1 = progress1.toFixed(2) + '%'
					this.message1 = message1
					this.progress1 = progress1
					var gatherNum = message1 + message2
					if (!gatherNum) {
						gatherNum = 0;
					}
					this.gatherNum = gatherNum
					var gathermoney = gatherNum * 1;
					this.gathermoney = gathermoney
				} else {
					message2 = (message2 + re) * 1;
					var num = message1 + message2;
					if (num > Fnumber) {
						message2 = Fnumber - message1;
						Toast('已达最高购买数量');
					}
					progress2 = (message2 / Fnumber) * 100;
					progress2 = progress2.toFixed(2) + '%';
					this.message2 = message2;
					this.progress2 = progress2;
					var gatherNum = message1 + message2;
					var gathermoney = gatherNum * 1;
					this.gatherNum = gatherNum;
					this.gathermoney = gathermoney
				}
			},
			keybackspace: function() {
				var message1 = this.message1 * 1
				var message2 = this.message2 * 1
				if (this.keyboardtop == 1) {
					message1 = message1 + ''
					if (message1.length > 1) {
						message1 = message1.slice(0, -1)
						this.message1 = message1 * 1
					} else {
						if (parseInt(message1) != 0) {
							this.message1 = 0
						}
					}
				} else {
					message2 = message2 + ''
					if (message2.length > 1) {
						message2 = message2.slice(0, -1)
						this.message2 = message2 * 1
					} else {
						if (parseInt(message2) != 0) {
							this.message2 = 0
						}
					}
				}
				this.keyinputidx('')
			},
			setTitle: function(pageName, Fnumber) {
				console.log(pageName);
				let text;
				switch (pageName) {
					case 'jc/jczq':
						text = '竞彩足球合买'
						break;
					case 'jc/jclq':
						text = '竞彩篮球合买'
						break;
					case 'jc/sczc':
						text = '四场进球合买'
						break;
					case 'jc/dczc':
						text = '北京单场合买'
						break;
					case 'jc/lczc':
						text = '六场半全场合买'
						break;
					case 'jc/sfzc':
						text = '任选九场合买'
						break;
					case 'sfc':
						text = '胜负彩合买'
						break;
					case 'number/lows/pl':
						if (this.payid == 'pl3') {
							text = '排列三合买'
						} else {
							text = '排列五合买'
						}

						break;
					case 'number/lows/welfare3d':
						text = '福彩3D合买'
						break;
					case 'number/lows/ssq':
						text = '双色球合买'
						break;
					case 'number/lows/dlt':
						text = '大乐透合买'
						break;
					case 'number/lows/seven':
						text = '七乐彩合买'
						break;
					default:
						text = '竞彩足球合买'
				}
				this.herderText = text;
			},
			setFnumber: function(Fnumber) {
				var flr_span = 1 * Fnumber;
				this.flr_span = flr_span;
				this.fgr_span = Fnumber;
			},
			open_jjcsuceess: function() {
				var data = this.datas;
				console.log(data);
				var commissionRate = parseFloat(this.extractList[this.extractIdx].num);
				var sponsorSubscriptionCost = parseInt(this.message1);
				var sponsorBaodiCost = parseInt(this.message2);
				if (!parseInt(this.message1)) {
					sponsorSubscriptionCost = 0;
					Toast('请输入认购份数');
					return
				}
				if (sponsorSubscriptionCost + sponsorBaodiCost < Math.ceil(this.Fnumber * 0.1)) {
					Toast('请至少认购10%');
					return
				}
				this.payPopup = true;
		
			},
			paybtn: function() {
				var data = this.datas;
				console.log(data);
				var commissionRate = parseFloat(this.extractList[this.extractIdx].num);
				var sponsorSubscriptionCost = parseInt(this.message1);
				var sponsorBaodiCost = parseInt(this.message2);
				if (!parseInt(this.message1)) {
					sponsorSubscriptionCost = 0;
					Toast('请输入认购份数');
					return
				}
				if (sponsorSubscriptionCost + sponsorBaodiCost < Math.ceil(this.Fnumber * 0.1)) {
					Toast('请至少认购10%');
					return
				}
				data['minSubscriptionCost'] = 1;
				//data.baodiAmount=baodiAmount+"";
				data.commissionRate = commissionRate + "";
				
				if (this.pageName.substring(0, 1) == "n") {
					data.subscribedAmount = sponsorSubscriptionCost + "";
					data.baodiAmount = sponsorBaodiCost + "";
				} else {
					data.sponsorSubscriptionCost = sponsorSubscriptionCost + "";
					data.sponsorBaodiCost = sponsorBaodiCost + "";
				}
				
				data.shareType = "TOGETHER";
				var secretType = this.baomiList[this.baomiIdx].type;
				data.secretType = secretType;
				console.log(JSON.stringify(data));
				console.log(this.pageName);
				var pathPageName = this.pageName;
				// data = this.Encrypt(data);
				// let dataes = this.Qs.stringify({
				// 	'path': pathPageName,
				// 	data
				// }, {
				// 	// allowDots: true
				// });
				// 
				let _data = {...data};
				console.log(_data.ticketContent);
				data = this.Encrypt(_data);
				console.log(this.Decrypt(data));
				let dataes = this.Qs.stringify({
					'path': pathPageName,
					 data
				}, {
					allowDots: true
				})
				
				this.$ajax.post('/caipiaoshouye/index.php/home/index/createScheme',
						dataes
					)
					.then(ret => {
						
						if (ret.status == 200) {
							var content = JSON.parse(ret.data.content);
							var schemeId;
						    var types;
							if (content.code == "100000") {
								
									if (this.pageName.substring(0, 1) == "n") {
									schemeId = content.data.id;
									types='shuzi';
									console.log(setData);
									var datacontent=setData.content;
									for(var i=0;i<datacontent.length;i++){
										var datacontentC =datacontent[i]
									     datacontent[i]=[];
										 var dataArrs=[];
										for(var key in datacontentC){
											dataArrs[key]=datacontentC[key];
											// 
										}
										datacontent[i]=dataArrs;
									}
									console.log(datacontent);
									var data=[];
									var myDate = new Date();
									myDate=getTime(myDate,2);
									var CitySN;
									if(getSession('equipmentIp')){
										CitySN=getSession('equipmentIp');
									}
									// obj.id=;
									data["mid"]=1;
									data["lotteryType"]=this.getctype(this.payid);
									data['periodNumber']=this.periodNumber;
									data["shareType"]=0;
									data["shareTime"]=myDate;
									data["uid"]=getCookie('newData').userid;
									data["multiple"]=1;
									data["schemeCost"]=this.flr_span;
									data["subscriptionMoney"]=sponsorSubscriptionCost;
									data["content"]=datacontent;
									data["quipmentiIp"]=CitySN;		//投注IP 
									data["quipmentTeype"]=10 ;         // 投注设备类型
									data["quipmentNumber"]='';          //投注设备号
									data["quipmentUid"]=getCookie('newData').userid;           // 投注UID
									data["quipmentOrderId"] =  content.data.schemeNumber;
									let object = {...data}
									setSession('obj', object);
									
								} else {
									if(this.payid=='jczq'||this.payid=='jclq'||this.payid=='dczc'){
										var datacontent=this.datas.ticketContent;
									}else{
										var datacontent=this.datas.content;
									}
									for(var n=0;n<datacontent.length;n++){
										var datacontentCope =datacontent[n]
									     datacontent[n]=[];
										 var dataArr=[];
										for(var keys in datacontentCope){
											dataArr[keys]=datacontentCope[keys];
											// 
										}
										datacontent[n]=dataArr;
									}
									var data=[];
									var myDate = new Date();
									myDate=getTime(myDate,2);
									var CitySN;
									if(getSession('equipmentIp')){
										CitySN=getSession('equipmentIp');
									}
									// obj.id=;
									data["mid"]=1;
									data["lotteryType"]=this.getctype(this.payid);
									data['periodNumber']='';
									data["shareType"]=1; 
									data["shareTime"]=myDate;
									data["uid"]=getCookie('newData').userid;
									data["multiple"]=1;
									data["schemeCost"]=this.flr_span;;
									data["subscriptionMoney"]=sponsorSubscriptionCost;
									data["content"]=datacontent;
									data['prizeAwards']='';
									data["quipmentiIp"]=CitySN;		//投注IP 
									data["quipmentTeype"]=10 ;         // 投注设备类型
									data["quipmentNumber"]='';          //投注设备号
									data["quipmentUid"]=getCookie('newData').userid;           // 投注UID
									data["quipmentOrderId"] =  content.data.schemeNumber;
									let object = {...data}
									setSession('obj', object);
									types='jingji';
									schemeId = content.data.schemeId;
								}
								sessionStorage.removeItem('hemaiData');
								sessionStorage.removeItem('arr');
								setSession('moneyType', 'LOTTERYMONEY');
								this.$router.push({
									path: '/goucai/goucai_success',
									query: {
										success: this.payid,
										schemeId: schemeId,
										wcj_totalPrice: sponsorSubscriptionCost,
										from: 'hemai',
										types:types
									}
								})
							} else {
								alert(content.message);
				
							}
						} else {
							console.log(JSON.stringify(ret));
							alert('网络错误！')
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			getctype:function(payid){
				var path;
				switch (payid) {
					case "ssq":
						path =0;
						break;
					case "dlt":
						path = 13;
						break;
					case "pl":
						path = 6;
						break;
					case "pl3":
						path = 6;
						break;
					case "pl5":
						path =6;
						break;
					case 'fc3d':
						path = 5;
						break;
					case "welfare3d":
						path =5;
						break;
					case "seven":
						path = 8;
						break;
					
					case "jczq":
						path = 17;
						break;
					case "jclq":
						path = 18;
						break;
					case "dczc":
						path = 7;
						break;
					case "sczc":
						path = 11;
						break;
					case "sfzc":
						path = 9;
						break;
					case "lczc":
						path = 10;
						break;
					case "rxjc":
						path = 28;
						break;
					case "sfzc14":
						path = 9;
						break;
				}
				return path;
			}
		}
	}
</script>

<style scoped>
	@import "../../css/goucai_jjcpay.css";
	header {
		position: fixed;
	}
	.jjc_hemai{
		margin-top: 2.25rem;
		}
</style>
