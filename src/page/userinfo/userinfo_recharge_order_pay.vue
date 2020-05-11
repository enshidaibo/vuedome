<template>
	<div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="bake()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">
				订单支付
			</div>
			<div id="record_text" class="aui-pull-right">
				中文
			</div>
		</header>
		<div class="promptText"><div class="grayDot"></div>请您在{{overdue}}前完成支付，以后商户订单失败</div>
		<div class="orderInfo" :class="{divdown:!infoShow}">
			<div>
				<div>订单金额：</div>
				<div><span>{{(amount*1).toFixed(2)}}</span>元</div>
			</div>
			<div>
				<div>商户名称：</div>
				<div>成都烨晟祥科技有限公司</div>
			</div>
			<div v-if="infoShow">
				<div>交易时间：</div>
				<div>{{nowTime}}</div>
			</div>
			<div v-if="infoShow">
				<div>订单编号：</div>
				<div>{{orderNum}}</div>
			</div>
			<div  v-if="infoShow">
				<div>收单机构：</div>
				<div>汇潮支付</div>
			</div>
			<span class="arrow" @click="infoShow=!infoShow" :class="{down:!infoShow}"></span>
		</div>

		<div class="fullReduction">
			满减/红包
			<span>(暂无满减或红包)</span>
			<img src="../../../static/recharge/btnmanjian.png" />
		</div>
		<div class="cautiousa">
			<div>
				<div>
					{{bankNames|getBankName()}}
				</div>
				<div>
					储蓄卡&nbsp;&nbsp;****&nbsp;****&nbsp;****&nbsp;{{cardLastNums}}
				</div>
			</div>
			<div>
				<div>
					密码
				</div>
				<div class="passwords" @click="showKey" v-if="placeholderword=='请输入银行卡密码'">
					{{placeholderword}}
				</div>
				<div class="passwords" @click="showKey" v-else>
					{{password}}
				</div>
			</div>
			<div>
				<div>
					手机号
				</div>
				<div>
					{{phone}}
				</div>
			</div>
			<div>
				<div>
					验证码
				</div>
				<div>
				<input type="tel" id="phone_code" v-model="phone_code" name="" placeholder="请输入验证码" maxlength="6">	
				</div>
				<span class="getCode" @click='getCode()'>{{meifeihq}}</span>
			</div>
		</div>
		<div class="payBtna" :class="{pyybglan:!huiBtn}" @click="payyes()">确认支付</div>
		<img class="yinglinloge" src="../../../static/recharge/yinlianjia.png" />
		<div class="fullkeybox" v-if="isShow">
			<div class="yinlianya">
				<img src="../../../static/recharge/caiyinlianjia.png" />
			</div>
		<ul class="fullkeyul">
			<li v-for="(item,index) in fullkeybox" v-if='index<9' :class="{noborder:index==2||index==5||index==8}"  @click='anjian(item)'>{{item}}</li>
			<li class="wancheng" @click="hindkey()">完成</li>
			<li  @click='anjian(fullkeybox[9])'>{{fullkeybox[9]}}</li>
			<li class="shanchujian" @click="deletenum()"><img src='../../../static/recharge/jianpande.png' /></li>
		</ul>
		</div>
	</div>
</template>
<script>
	var timer;
	var m_snum2 = 90;
	var m_stimer2 = null;
	var allbanksz = [{
		name: "ccb",
		"text": "建设银行",
	}, {
		name: "psbc",
		"text": "邮政银行",
	}, {
		name: "abc",
		"text": "农业银行",
	}, {
		name: "icbc",
		"text": "工商银行",
	}, {
		name: "boc",
		"text": "中国银行",
	}, {
		name: "cmbc",
		"text": "民生银行",
	}, {
		name: "cmb",
		"text": "招商银行",
	}, {
		name: "cib",
		"text": "兴业银行",
	}, {
		name: "bob",
		"text": "北京银行",
	}, {
		name: "comm",
		"text": "交通银行",
	}, {
		name: "ceb",
		"text": "光大银行",
	}, {
		name: "citic",
		"text": "中信银行",
	}, {
		name: "gdb",
		"text": "广发银行",
	}, {
		name: "sdb",
		"text": "深发展",
	}, {
		name: "hzb",
		"text": "杭州银行",
	}, {
		name: "bos",
		"text": "上海银行",
	}, {
		name: "pab",
		"text": "平安银行",
	}, {
		name: "bod",
		"text": "东莞银行",
	}, {
		name: "cbhb",
		"text": "渤海银行",
	}, {
		name: "czb",
		"text": "浙商银行",
	}, {
		name: "gzb",
		"text": "广州银行",
	}, {
		name: "hxb",
		"text": "华夏银行",
	}, {
		name: "spdb",
		"text": "浦发银行",
	}, {
		name: "bjrcb",
		"text": "北京农商行",
	}];
	import {
		getTime
	} from "../../js/common";
	import {
		Toast,
		Loadmore,
		Indicator,
		MessageBox
	} from 'mint-ui';
	import {
		getCookie,
		setCookie,
		setSession,
		getSession,
		TypeCapitalconversionLowercase,
		details
	} from "../../js/common";
	export default {
		data() {
			return {
				overdue:'',
				nowTime:'',
				fullkeybox:[1,2,3,4,5,6,7,8,9,0],
				isShow:false,
				password:'',
				passwordtrue:'',
				placeholderword:'请输入银行卡密码',
				amount:'',
				bankNames:'',
				phone:'',
				cardLastNums:'',
				infoShow:false,
				orderNum:'',
				bankId:'',
				orderNo:'',
				meifeihq:'免费获取',
				phone_code:'',
				huiBtn:true
			}
		},
       beforeDestroy() {
			document.querySelector('html').setAttribute('style', 'background-color:#fff;');
			document.querySelector('body').setAttribute('style', 'background-color:#fff;');
		},
		created() {
			this.amount=this.$route.query.amount;
			this.bankNames=this.$route.query.bankNames;
			this.phone=this.$route.query.phone;
			this.cardLastNums=this.$route.query.cardLastNums;
			this.bankId=this.$route.query.bankId;
			this.overdue=getTime(new Date().getTime()+3600000,7)
			this.nowTime=getTime(new Date(),8)
			if(getSession('mathRan')){
				this.orderNum=getSession('mathRan')
			}else{
				let mathRan='03'+(Math.random()*10000000000).toFixed(0);
				this.orderNum=mathRan
				setSession('mathRan',mathRan)
			}
			console.log(this.orderNum);
            document.querySelector('body').setAttribute('style', 'background-color:#F4F4F4;');
			document.querySelector('html').setAttribute('style', 'background-color:#F4F4F4;');
		},
		mounted() {
           

	

		},
		watch:{
			phone_code(val){
				if(val.length==6){
					this.huiBtn=false
				}
			}
		},
		methods: {
			bake: function() {
				sessionStorage.removeItem('mathRan');
				this.$router.go(-1); //根据浏览器记录返回上一次
			},
			anjian:function(i){//按键
				if(this.passwordtrue.length==6){
					Toast('最多输入六位数字')
					return false
				}
				this.passwordtrue=this.passwordtrue+i.toString();
				this.password=this.password+'*';
				// console.log(this.passwordtrue)
			},
			hindkey:function(){//完成按钮
				if(this.passwordtrue==''){
					this.placeholderword='请输入银行卡密码'
				}
				this.isShow=false;
			},
			deletenum:function(){//删除
				if(this.passwordtrue.length>0){
					this.passwordtrue=this.passwordtrue.slice(0,this.passwordtrue.length-1);
					this.password=this.password.slice(0,this.password.length-1)
				}
			},
			showKey:function(){//唤起键盘
				this.fullkeybox=this.fullkeybox.sort(randomsort);
				if(this.placeholderword=='请输入银行卡密码'){
					this.placeholderword=''
				}
				this.isShow=true;
			},
			infoShowc:function(){
				this.infoShow=!this.infoShow
			},
	
			getCode:function(){
				var thas=this;
				
				if(this.meifeihq!='免费获取'){
					return false;
					}
					if(this.passwordtrue==''){
						this.placeholderword='请输入银行卡密码'
					}
					this.isShow=false;
				if(this.passwordtrue.length<6){
					Toast('银行卡密码有误！')
					return false;
				}
				if (this.amount == '') {
					Toast("请输入充值金额");
					return false;
				}
				let data = [];
				data["userId"] =getCookie('newData').userid;
				data["bankId"] = this.bankId;
				data["amount"] = this.amount;
				data["bankCardPW"] = this.passwordtrue;
				let datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/payQuickApplyJzfpay',
						datas
					)
					.then(res => {
						console.log(res)
						var content = JSON.parse(res.data.content);
						if (res.data.status == 200) {
				
							if (content.code == 100000) {
								var data = content.data.orderNo;
								console.log(data);
								this.orderNo=data;
								m_snum2=90;
								this.meifeihq=m_snum2+'秒后可再次获取'
								timer=setInterval(()=>{
									if(m_snum2==0){
										clearInterval(timer);
										this.meifeihq='免费获取'
										return 
									}
									m_snum2--;
									this.meifeihq=m_snum2+'秒后可再次获取'
								},1000)
								
								
							} else if (content.code == "201010") {
								Toast("账户已被锁定，请联系客服");
								setCookie('newData', '', '0-S');
								this.$router.push({
									name: 'login'
								})
							}else{
								Toast(content.message);
							}
						} else if (res.data.status == 500) {
							this.clicsaix = false;
							this.auiScroll = true;
							if (this.page == 1) {
								this.dataslength = true
							}
							Toast('服务器异常，请稍后重试！')
						}
				
					})
					.catch(err => {
						console.log(err);
					})
			},
			payyes: function() {
				let data = [];
				// console.log(this.phone_code.length)
				if(this.phone_code.length!=6){
					Toast('请输入正确的验证码！')
					return false
					}
					// if(!this.orderNo){
					// 	Toast('请获取正确的验证码！')
					// 	return false
					// 	}
				data["orderNo"] = this.orderNo;
				data["vCode"] = this.phone_code;
				let dataes = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/payQuickConfirmJzfpay',
						dataes
					)
					.then(res => {
						let contentsr = res.data;
						let concode = contentsr.content;
						concode = JSON.parse(concode);
						console.log(concode);
						var content = JSON.parse(res.data.content);
						
										
							
						if (res.data.status == 200) {
							if (content.code == 100000) {
								if(content.data.orderNo){
									sessionStorage.removeItem('mathRan');
									this.$router.push({
										name: 'userinfo_recharge_weixin_success',
										query: {
											money: this.amount,
											message: '充值成功!'
										}
									})
								}else{
									MessageBox({
										title: '提示',
										message: '充值失败!',
										showCancelButton: true,
										confirmButtonText: '返回',
									
									}).then(action => {
										if (action == 'confirm') {
											this.$router.go(0)
										} else {
											this.$router.go(0)
										}
									})
									
								}
							} else {
							MessageBox({
								title: '提示',
								message: '充值失败!',
								showCancelButton: true,
								confirmButtonText: '返回',
							
							}).then(action => {
								if (action == 'confirm') {
									this.$router.go(0)
								} else {
									this.$router.go(0)
								}
							})
						}
						} else {
							Toast('服务器异常，请稍后重试！')
				
						}
					})
					.catch(err => {
						console.log(err);
					})
			}
		},
		filters:{
			getBankName: function(bankname) {
				for (let i = 0; i < allbanksz.length; i++) {
					if (bankname == allbanksz[i].name) {
						return allbanksz[i].text;
					}
				}
			}
		}
	}
	function randomsort(a, b) {
   return Math.random()>.5 ? -1 : 1; //通过随机产生0到1的数，然后判断是否大于0.5从而影响排序，产生随机性的效果。
}
</script>
<style scoped>
	header {
		position: fixed !important;
	}
	
	.aui-content {
		min-height: 90vh;
	}
	.isFixed {
		position: fixed;
		top: 5rem;
		z-index: 999;
	}

	.aui-refresh-content {
		top: 7.2rem;
	}

	.aui-pull-right {
		font-size: 0.7rem;
		padding-right: 0.8rem;
	}
	.promptText{
		margin-top: 2.25rem;
		width: 100%;
		height: 1.6rem;
		line-height: 1.6rem;
		background: #FBEBB8;
		color: #666;
		font-size: 0.65rem;
		padding-left: 1.675rem;
		position: relative;
	}
	.grayDot{
		width: 0.35rem;
		height: .35rem;
		border-radius: 50%;
		background: #666;
		position: absolute;
		left: 0.85rem;
		top: .625rem;
	}
	.orderInfo{
		width: 100%;
		height: 8.3rem;
		background: #fff;
		 position: relative;
		 overflow: hidden;
	}
	.divdown{
		height:3.65rem;
	}
	.orderInfo>div{
		height: 1rem;
		line-height: 1rem;
		font-size: 0.7rem;
		margin-top: 0.55rem;
		display: -webkit-flex;
		display: flex;
		padding-left: 0.775rem;
	}
	.orderInfo div div:first-child{
		width: 4.5rem;
		text-align: left;
		height: 1rem;
		line-height: 1rem;
		color: #333;
		font-weight: bold;
	}
	.orderInfo div div:last-child{
		text-align: left;
		height: 1rem;
		line-height: 1rem;
		color: #686868;
	}
	.orderInfo div div:last-child span{
		color: #FF6F00;
		padding-right: 0.125rem;
	}
	.arrow{
		display: block;
        position: absolute;
		width: 0.775rem;
		height: 0.4rem;
		background-image:url('../../../static/recharge/fangxiaimg.png') ;
		background-size:100% 100% ;
		background-repeat:no-repeat;
		bottom: 0.85rem;
		right: 0.95rem;
	}
	.down{
		
		background-image:url('../../../static/recharge/shouqiimg.png') ;
	}
	.fullReduction{
		background: #fff;
		width: 100%;
		height: 2.4rem;
		padding-left: 0.775rem;
		line-height: 2.4rem;
		color: #333;
		font-size: 0.7rem;
		position:relative;
		margin-top: 0.7rem;
		font-weight: bold;
	}
	.fullReduction span{
		padding-left: 1.25rem;
		color: #686868;
		font-weight: normal;
	}
	.fullReduction img{
		width: 2.55rem;
		height: 1.35rem;
		position: absolute;
		top: 0.525rem;
		right: 0.75rem;
	}
	.cautiousa{
		width: 100%;
		background: #fff;
		margin-top: 0.7rem;
	}
	.cautiousa>div{
		height: 1.8rem;
		line-height:1.8rem ;
		margin:0 0.775rem;
		display: flex;
		display: -webkit-flex;
		font-size: 0.7rem;
		border-bottom: 1px solid #EFEFF0;
		position: relative;
	}
	.cautiousa>div div input{
		height: 1.8rem;
		line-height:1.8rem;
		font-size: 0.7rem;
	}
	.cautiousa>div div:first-child{
		width: 4.5rem;
		text-align: left;
		color: #333333;
		font-weight: bold;
	}
	.cautiousa>div div:last-child{
		text-align: left;
		color:#686868;
		
	}
	.getCode{
		color: #01A8F4;
		display: block;
		position: absolute;
		height: 1rem;
		line-height: 1rem;
		top: 0.4rem;
		right: 0;
		font-weight: bold;
		}
	.payBtna{
		width: 92%;
		height: 2.25rem;
		line-height: 2.25rem;
		color: #FCFCFC;
		font-size: 0.9rem;
		text-align: center;
		margin: 0 auto;
		margin-top: 1.1rem;
		border-radius:0.275rem;
		background: #B5BABE;
	}
	.pyybglan{
		background: #05A9F5;
	}
	.pyybglan:active{
		width: 90%;
		height: 2.05rem;
		margin-top: 1.2rem;
		font-size: 0.8rem;
		line-height: 2.05rem;
	}
	.yinglinloge{
		margin: 0 auto;
		margin-top: 3.775rem;
		margin-bottom:2rem;
		width: 5.775rem;
		height: 1.45rem;
	}
	.fullkeybox{
		width: 100%;
		background: #2D2D2D;
		position: fixed;
        bottom: 0;
	}
	.fullkeybox .yinlianya{
		width: 100%;
		height: 2rem;
		overflow: hidden;
	}
	.fullkeybox .yinlianya img{
		width:8.5rem ;
		height: 1.1rem;
		margin: 0 auto;
		margin-top: .45rem;
	}
	ul.fullkeyul{
		width: 100%;
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
	}
	ul.fullkeyul li{
		width: 33.33%;
		height: 2.25rem;
		font-size: 1.4rem;
		color: #FFFFFF;
		text-align: center;
		line-height: 2.25rem;
		border-top: 1px solid #535353;
		border-right: 1px solid #535353;
	}
	ul.fullkeyul li.noborder{
		border-right:0;
	}
	ul.fullkeyul li.wancheng{
		color: #05A9F5;
		font-size: 0.9rem;
	}
	ul.fullkeyul li.shanchujian img{
		width: 1.35rem;
		height: 1rem;
		margin: 0 auto;
		margin-top:.625rem ;
	}
	ul.fullkeyul li:active{
		background: #535353;
	}
	.passwords{
		min-width:5rem ;
	}
</style>
