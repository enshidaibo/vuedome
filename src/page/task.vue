<style scoped>
    /* @import "../css/userinfo_task.css"; */

    header {
        position: fixed;
		background: #fff;
		color: #333;
		font-size: 0.9rem;
    }
    .taskDom {
        min-height: 100vh;
        background-color: #f4f4f4;
    }

    a {
        color: #000;
    }
    .active {
        color: #5fa3eb;
    }
	.noviceTask{
		margin: 0 auto;
		margin-top: 3rem;
		overflow: hidden;
		width: 94.5%;
		height: 7.95rem;
		box-shadow:0px 4px 20px 0px rgba(0, 0, 0, 0.05);
		-moz-box-shadow:0px 4px 20px 0px rgba(0, 0, 0, 0.05);/*firefox*/
	    -webkit-box-shadow:0px 4px 20px 0px rgba(0, 0, 0, 0.05);/*webkit*/
        border-radius:0.2rem;
		background: #fff;
	}
	.noviceTaskTitle{
		width: 100%;
		height: 0.75rem;
		margin-top: 0.75rem;
		padding-left: 0.5rem;
		font-size: 0.8rem;
		color: #333;
		font-weight: bold;
	}
	.noviceTaskTitle span{
		color: #666;
		font-size: 0.6rem;
		font-weight: normal;
	}
	.noviceTaskTitle span em{
		color: #F82A5B;

	}
	.progressBox{
		width: 100%;
		height: 5.15rem;
		padding: 0 0.5rem;
		overflow:hidden;
		position:relative;

	}
	.progressBox .progressBg{
		width: 13.5rem;
		height: 0.3rem;
		background:#EFEFEF;
		margin: 0 auto;
		margin-top: 1.7rem;

	}
	.progressBox .progress{
		width: 16.675rem;
		position: absolute;
		height: 100%;
		top: 0;
		left: .5rem;
		z-index: 2;
		display: flex;
		display:-webkit-flex;
		justify-content: space-between;
	}
	.progressBox .progress .progressItem{
		width: 2.75rem;
	}

	.progressBox .progress .progressItem .itemImg{
		width: 100%;
		padding-top: 1.15rem;
		position: relative;
	}
	.progressBox .progress .progressItem .itemImg img{
		width: 1.4rem;
		height: 1.4rem;
		margin: 0 auto;

	}
	.progressBox .progress .progressItem .itemText{
		width: 100%;
		text-align: center;
		color: #999;
		padding-top: 0.675rem;
		font-size: 0.6rem;
	}
	.theMore{
		width: 100%;
		padding:0 .5rem;
		display: flex;
		display: -webkit-flex;
		justify-content:space-between
	}
	.theMore .obtainMoney{
		color: #666;
		font-size: 0.6rem;

	}
	.theMore .obtainMoney i{
		color: #F82A5B;
	}
	.theMore .lookMore{
		width: 3.4rem;
		color: #03A9F4;
		font-size: 0.6rem;
		background-image:url("../../static/task/jiantou.png") ;
		background-repeat:no-repeat;
		background-size:0.55rem 0.55rem ;
		background-position: 2.6rem .15rem;
	}
	.jiaobiaonum{
		position: absolute;
		width: 0.55rem;
		height: 0.55rem;
		background: #FF5F15;
		line-height: .55rem;
		text-align: center;
		border-radius: 50%;
		font-size: 0.45rem;
		color: #fff;
		top: 1.8rem;
		left: 1.55rem;
	}
	.huodongTitle{
		color: #333333;
		font-size: 0.8rem;
		margin-top: 1rem;
		padding-left: 1rem;
	}
	.specialBox{
		width: 94.6%;
		margin: 0 auto;
		/* margin-top: 2.25rem; */
		margin-bottom:3.5rem;
		overflow: hidden;

	}
	.dandu{
		margin-top: 2.25rem;
	}
	.specialItem{
		width: 100%;
		height: 7.5rem;
		box-shadow:0px 4px 12px 0px rgba(0, 0, 0, 0.1);
		-moz-box-shadow:0px 4px 12px 0px rgba(0, 0, 0, 0.1);
		-webkit-box-shadow:0px 4px 12px 0px rgba(0, 0, 0, 0.1);
        border-radius:0.2rem;
		margin-top: 0.7rem;
		background: #fff;
	}
	.specialItem>div:first-child{
		height: 5.75rem;
		border-top-left-radius:0.2rem;
		border-top-right-radius: 0.2rem;
	}
	.specialItem>div:first-child img{
		width: 100%;
		height: 100%;
		border-top-left-radius:0.2rem;
		border-top-right-radius: 0.2rem;
	}
	.specialItem>div:last-child{
		height: 1.75rem;
		line-height: 1.75rem;
		padding-left: 0.5rem;
		font-size: 0.7rem;
		color: #333;
	}
</style>
<template>
    <div class="taskDom">
        <header class="aui-bar aui-bar-nav">
            <div class="aui-pull-left aui-btn">
            </div>
            <div class="aui-title home-header" @click="betting_cashback()">
            	活动
            	<span id="service" class="service"></span>
            </div>
            <div class="aui-btn aui-pull-right" @click="makemoney()">
		            攻略
		        </div>
        </header>
		<div class="noviceTask" v-if="isshow">
			<div class="noviceTaskTitle">
				新手任务
				<span>
                 完成新手任务至少可获得<em>18</em>元
				</span>
			</div>
			<div class="progressBox">
				<div class="progressBg"></div>
				<div class="progress">
					<div class="progressItem" v-for="(item,indexs) in noviceTaskList" :key='item.id' >
						<div class="itemImg">
							<img v-if="!item.typef" @click="gotypename(indexs)" :src="item.imgUrl" />
							<img v-else src="../../static/task/yiwancheng.png" />
							<!-- <div v-if="indexs==1&&true" class="jiaobiaonum">{{1}}</div> -->
						</div>
						<div class="itemText">{{item.title}}</div>
					</div>
				</div>
			</div>
			<div class="theMore">
				<div class="obtainMoney">您已获得新手任务奖励<i>{{gotPrize}}</i>元 </div>
				<div class="lookMore" @click="goToTaskNovice">去做任务</div>
			</div>

		</div>
    <div class="huodongTitle" v-if='isshow'>热门活动</div>
	<div class="specialBox" :class="{dandu:!isshow}">
		<div class="specialItem" v-for="(item,index) in specialList" :key='item.id' @click="goToSpecial(item.name)">
			<div>
				<img :src="item.imgUrl" />
			</div>
			<div>{{item.text}}</div>
		</div>
	</div>
	<checkok-nav :logokz='logok' @showbox="showbox"></checkok-nav>
	<footer class="pos-fi b-0 w-100  footers">
	    <ul class="flex-box w-100">
	        <li class="foot_li w-20" @click='gohome'>
	            <div class="w-100 imgBox"><img src="../assets/backIcon01_c.png" /></div>
	            <div class="w-100"><span class="w-100 tac dis-bl fs-10 text_span">首页</span></div>
	        </li>
	        <li class="foot_li w-20" @click='gogoucai'>
	            <div class="w-100 imgBox"><img src="../assets/backIcon02.png" /></div>
	            <div class="w-100"><span class="w-100 tac dis-bl fs-10 text_span">购彩</span></div>
	        </li>
	        <li class="foot_li w-20 " @click='goscratch'>
	            <div class="w-100 imgBox"><img src="../assets/backIcon7.png" /></div>
	            <div class="w-100"><span class="w-100 tac dis-bl fs-10 text_span">资讯</span></div>
	        </li>
	        <li class="foot_li w-20 active" @click='gotask'>
	            <div class="w-100 imgBox "><img src="../assets/backIcon04_c.png" /></div>
	            <div class="w-100"><span class="w-100 tac dis-bl fs-10 text_span">活动</span></div>
	        </li>
	        <li class="foot_li w-20" @click='gouser'>
	            <div class="w-100 imgBox"><img src="../assets/backIcon05.png" /></div>
	            <div class="w-100"><span class="w-100 tac dis-bl fs-10 text_span">我的</span></div>
	        </li>
	    </ul>
	</footer>
	</div>
</template>

<script>
	import checkokNav from '../common/checkok.vue';
    import {
        getCookie,
        getUid,
        setCookie,
        OverallData,
        maintenance
    } from "../js/common.js";
    import {
        Toast
    } from 'mint-ui';
	var interval;
    export default {
		components: {
			checkokNav
		},
        data() {
            return {
				specialList:[
					{
						id:0,
						imgUrl:'../../static/task/yaoyouxhongzhi.png',
						text:'邀友充值，立即赠送您好友充值金额的30%',
						name:'userinfo_invite_friends',
						
					},
					{
						id:1,
						imgUrl:'../../static/task/yaoqinghy.png',
						text:'独乐乐不如众乐乐，坐着等钱来这种好事，不能独享~',
						name:'special_friends'
					},
					{
						id:2,
						imgUrl:'../../static/task/chongzhifx.png',
						text:'首充返现10%，之后充值返现5%',
						name:'userinfo_recharge_preferential'
					},
					{
						id:3,
						imgUrl:'../../static/task/touzhufanxian.png',
						text:'现金投注，多投多得',
						name:'betting_cashback'
					},
					{
						id:4,
						imgUrl:'../../static/task/hongbaogc.png',
						text:'我们是认真的，给你不花钱就中大奖的机会',
						name:'userinfo_hongbao_betting'
					},
					{
						id:5,
						imgUrl:'../../static/task/shaidande.png',
						text:'晒单赚红包',
						name:'userinfo_sunburn_cashback'
					}
				],
				noviceTaskList:[
					{
						id:0,
						imgUrl:'../../static/task/shiming.png',
						title:'实名认证',
						typef:false,
					},
					{
						id:1,
						imgUrl:'../../static/task/qiandao.png',
						title:'签到',
						typef:false,
					},
					{
						id:2,
						imgUrl:'../../static/task/chongzhi.png',
						title:'充值',
						typef:false,
					},
					{
						id:3,
						imgUrl:'../../static/task/goucai.png',
						title:'现金购彩',
						typef:false,
					},
					{
						id:4,
						imgUrl:'../../static/task/shaidan.png',
						title:'晒单',
						typef:false,
					}
				],
				gotPrize:0,
				isshow:false,
				zc:false,
				certification:false,
				logok:false
            }
        },
		beforeRouteLeave(to, from, next) {
			document.querySelector('html').setAttribute('style', 'background-color:#fff;');
			document.querySelector('body').setAttribute('style', 'background-color:#fff;');
		    next()
		},
        created() {
			document.querySelector('body').setAttribute('style', 'background-color:#F4F4F4;');
			document.querySelector('html').setAttribute('style', 'background-color:#F4F4F4;');
            maintenance(this); //维护页面
			let uid = getCookie('newData');
			if (!uid) {
				this.$router.push({
					name: 'login'
				})
				return false;
			}
			this.openChest();
        },
		mounted() {

		},
        methods: {
			showbox: function(msg) {
				this.logok = msg;
			},
			gotypename:function(i){
				if(i==0){
				this.$router.push({
					name:'userinfo_task_real'
				})	
				}else if(i==1){
					this.$router.push({
						name:'userinfo_task_sign'
					})	
				}else if(i==2){
					if(!this.certification){
						this.logok=true;
						return false
					}
					this.$router.push({
						name: 'payment_options'
					})
				}else if(i==3){
					this.$router.push({
						name:'goucai'
					})	
				}else if(i==4){
					this.$router.push({
						name:'userinfo_task_sunburn'
					})	
				}
			},
			goToTaskNovice:function(){
				this.$router.push({
					name:'userinfo_task_novice'
				})
			},
			goToSpecial:function(name){
				this.$router.push({
					name
				})
			},
			betting_cashback:function(){	//打开投注返利
				// this.$router.push({name:'special_friends'})邀请好友

				// this.$router.push({name:'betting_cashback'})投注返现

			},
        	makemoney:function(){	//打开攻略
        		this.$router.push({name:'userinfo_makemoney'})
        	},
        	hideMons:function(){	//隐藏
        		this.makeMon = false
        		sessionStorage.setItem("makeMon","1");
        	},
        	openGlv:function(){ //打开攻略
        		this.$router.push({name:'userinfo_makemoney'})
        	},
			//点击问号显示规则
			rulesMark:function(){
				this.rulesMarks=true;
			},
			//点击隐藏规则
			hideRules:function(){
				this.rulesMarks=false;
			},
			upFinish: function() {
				this.finishTask = 0;
				for (var i = 0; i < 5; i++) {
					if (this.progressList[i].state) {
						this.finishTask++;
					}
				}
			},
			// 
			openChest: function () {
					var data = [];
					
					data["userId"] = getCookie('newData').userid;
					var datas = this.Qs.stringify({
					    data
					}, {
					    allowDots: true
					});
					this.$ajax.post('/caipiaoshouye/index.php/home/index/getExtraRewardCriteria',
					        datas
					    )
					    .then(res => {
					        if (res.data.status != 200) {
					            Toast("服务器连接失败,请稍后重试");
					        } else {
					            var data = JSON.parse(res.data.content);
					            console.log(data);

					            if (data.code == 100000) {
					                  if(data.data.bet){
										  this.noviceTaskList[3].typef=true;
									  } if(data.data.share){
										  this.noviceTaskList[4].typef=true; 
									  } if(data.data.certification){
										  this.noviceTaskList[0].typef=true; 
										  this.certification=data.data.certification
									  } if(data.data.recharge){
										  this.noviceTaskList[2].typef=true; 
									  } if(data.data.signIn){
										  this.noviceTaskList[1].typef=true; 
									  }
									  this.gotPrize=data.data.gotPrize;
									  console.log(getCookie('newData').regdate.split(' ')[0]>'2019-03-01')
									  if((getCookie('newData').regdate.split(' ')[0]>='2019-07-01')&&!data.data.isOver){
										  this.isshow=true;
									  }
									// Toast(data.data.message);
					            }
					        }
					    })
					    .catch(err => {
					        console.log(err);
					    })
				
			},
			topJump: function (url) {
				this.$router.push({
				    name: url
				})
			},
            gouser: function() {
                if (this.$router.name !== 'user') {
                    this.$router.push({
                        name: 'user'
                    })
                }
            },
            goscratch: function() {
                if (this.$router.name !== 'scratch') {
                    this.$router.push({
                        name: 'scratch'
                    })
                }
            },
			userinfo_task_more:function(){
				this.$router.push({
				    name: 'userinfo_task_more'
				})
			},
            menuJump: function(url) {
                //判断登录过期
                var user = getCookie('newData');
                if (!user) {
                    this.$router.push({
                        name: 'login'
                    })
                    return false;
                }
                this.$router.push({
                    name: url
                })
            },
            gohome: function() {
                if (this.$router.name !== 'home') {
                    this.$router.push({
                        name: 'home'
                    })
                }
            },
            gogoucai: function() {
                if (this.$router.name !== 'goucai') {
                    this.$router.push({
                        name: 'goucai'
                    })
                }
            },
            golottery: function() {
                if (this.$router.name !== 'lottery') {
                    this.$router.push({
                        name: 'lottery'
                    })
                }
            },
            gotask: function() {
                if (this.$router.name !== 'task') {
                    this.$router.push({
                        name: 'task'
                    })
                }
            },
            taskSign: function() { // 每日签到
				var _sign_in = '',
					ityCount = 0;
				if (this.sign_in) {
					if (this.SignDay.notShareActivityCount > 0) {
						_sign_in = '立即领取';
						ityCount = 1
					} else {
						_sign_in = '已签到';
						ityCount = 2
					}
				} else {
					_sign_in = '签到领取红包'
				}
				this.$router.push({
					name: 'userinfo_task_sign',
					query: {
						sign_in: _sign_in,
						ityCount: ityCount,
						qianDaoMoney: this.SignDay.activityPrize,
						activityId: this.activityId
					}
				})
// 				if (this.task_icon4 == 1) {
// 					this.sign_popup1 = true;
// 					this.clickDom = 'SignDay'
// 				} else {
//
// 				}
            },
			taskInvitation: function() { // 邀请好友
			    this.$router.push({
			        name: 'special_friends'
			    })
			},
			taskSunburn: function() { // 晒单有礼
			    this.$router.push({
			        name: 'userinfo_task_sunburn'
			    })
			},
			taskPrize: function() { // 每日抽奖
// 				if (this.promoTime == 1) {
// 					this.$router.push({
// 						name: 'userinfo_task_prize'
// 					})
// 				} else{
// 					this.sign_popup2 = true;
// 				}
				this.$router.push({
					name: 'userinfo_task_prize'
				})
			},
			taskReal: function() { // 实名认证
			    if (this.real_name == false) {
			        this.$router.push({
			            name: 'userinfo_task_real'
			        })
			    } else {
			        Toast("已完成实名认证");
			    }
			},
			toTopUp: function() { // 首充优惠
			    if (this.real_name) {

			       this.$router.push({
			       					name: 'payment_options'
			       	})
			    } else {
			        this.issShiMing = false;
			    }
			},
            logokbtn2: function() { //暂不认证
                this.issShiMing = true;
            },
            logokbtn1: function() { //立即认证
                this.issShiMing = true;
                this.$router.push({
                    name: 'userinfo_task_real'
                })
            },
            download: function() {
                var newData = getCookie('newData');
                var link = OverallData().download
                if (newData) {
                    window.open(link + '?_userId=' + newData.sportId);
                } else {
                    window.open(link);
                }
            },
            closedowPopup: function() {
                this.sign_popup1 = false;
                this.sign_popup2 = false;
            },
			// 获取推广收益
			promotionIn: function() {
				let data = [];
				data['uid'] = this.userId;
				data["mid"] = OverallData().mid;
				let dataes = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/promotionIncome2', dataes)
					.then(ret => {
						if (ret.status == 200) {
							console.log(ret);
							var data = ret.data.content;
							if (data.code == '1000') {
								this.promot.friendCount = data.data.friendCount;
								this.promot.redEnvel =  (data.data.redEnvelope*1) + (data.data.cash*1);
							} else {
								Toast(data.message);
							}
						}
					}).catch(err => {
						this.nopyan = true;
						console.log(err);
					})
			},
			//签到状态
			getSignDay: function() {
			    var data = [];
			    data["userId"] = this.userId;
			    // data["activityId"] = activityId;
				data = this.Encrypt({...data});
			    var datas = this.Qs.stringify({
			        data
			    }, {
			        allowDots: true
			    });

			    this.$ajax.post('/caipiaoshouye/index.php/home/index/getUserSignInfo',
			            datas
			        )
			        .then(res => {
			            if (res.data.status != 200) {
			                Toast("服务器连接失败,请稍后重试");
			            } else {
			                var data = JSON.parse(res.data.content);
			                console.log(data);
			                if (data.code == 100000) {
			                    if (!data.data.signStatus) {
			                        this.SignDay.activityPrize = 1.88;
			                        this.sign_in = false;
									this.task_icon4 = 0;
			                    } else if (data.data.signStatus && data.data.activityRecordId) {
			                        this.SignDay.notShareActivityCount = data.data.activityRecordId
			                        this.SignDay.activityPrize = data.data.awardContent.amount;
			                        this.sign_in = true;
									this.task_icon4 = 1;
			                    } else {
			                        this.SignDay.activityPrize = 1.88;
			                        this.sign_in = true;
									this.task_icon4 = 2;
			                    }
			                } else if (data.code == "201010") {
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
			//抽奖状态
			getLucyDrawInfo: function() {
			    var data = [];
			    data["userId"] = this.userId;
				data = this.Encrypt({...data});
			    var datas = this.Qs.stringify({
			        data
			    }, {
			        allowDots: true
			    });
			    this.$ajax.post('/caipiaoshouye/index.php/home/index/getLucyDrawInfo',
			            datas
			        )
			        .then(res => {
			            if (res.data.status == 200) {
			                var content = JSON.parse(res.data.content);
			                console.log(content)
			                if (content.code == "100000") {
			                    this.timeList.currentTime = content.data.serverCurrentTime;
			                    this.timeList.drawTimeList = content.data.drawTimeList;
			                    this.isFreeDrawLottery = content.data.isFreeDrawLottery;
			                    if (this.isFreeDrawLottery) {
			                        this.promoCount = content.data.promoCount + 1;
			                    } else {
			                        this.promoCount = content.data.promoCount;
			                    }
			                    for (var i = 0; i < this.timeList.drawTimeList.length; i++) {
			                        if (this.timeList.currentTime < this.timeList.drawTimeList[i].startTime) {
			                            this.promoTime = 0;
			                            var surTime = this.timeList.drawTimeList[i].startTime * 1 - this.timeList.currentTime * 1;
			                            this.setSurplusTime(surTime);
			                            break;
			                        } else if (this.timeList.currentTime < this.timeList.drawTimeList[i].endTime) {
			                            if (this.isFreeDrawLottery) {
			                                this.promoTime = 1;
			                                this.startTime = this.timeList.drawTimeList[i].startTime;
			                                this.endTime = this.timeList.drawTimeList[i].endTime;
			                            } else if (i < 4) {
                                            this.promoTime = 0;
                                            var surTime = this.timeList.drawTimeList[i + 1].startTime * 1 -
                                                this.timeList.currentTime * 1;
                                            this.setSurplusTime(surTime);
                                        } else {
                                            this.promoTime = 0;
                                            var surTime = this.timeList.drawTimeList[0].startTime * 1 +
                                                86400000 - this.timeList.currentTime * 1;
                                            this.setSurplusTime(surTime);
                                        }
			                            break;
			                        } else {

			                        }
			                    }
			                    if (this.timeList.currentTime > this.timeList.drawTimeList[4].endTime) {
			                        this.promoTime = 0;
			                        var surTime = this.timeList.drawTimeList[0].startTime * 1 + 86400000 - this
			                            .timeList.currentTime * 1;
			                        this.setSurplusTime(surTime);
			                    }
			                }
			            } else {
			                Toast("服务器异常");
			                return false;
			            }
			        })
			},
			// 获取每日任务完成信息
			taskInfo: function () {
				var data = [];
				data["mid"] = OverallData().mid;
				data["userId"] = this.userId;
				data = this.Encrypt({...data});
				var datas = this.Qs.stringify({
				    data
				}, {
				    allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getExtraRewardCriteria',
				        datas
				    )
				    .then(res => {
				        if (res.data.status != 200) {
				            Toast("服务器连接失败,请稍后重试");
				        } else {
				            var data = JSON.parse(res.data.content);
				            console.log(data);
				            if (data.code == 100000) {
				                this.progressList[0].state = data.data.isSignIn;
								this.progressList[1].state = data.data.isLuckDraw;
								this.progressList[2].state = data.data.isBetted;
								this.progressList[3].state = data.data.isSchemeShared;
								this.progressList[4].state = data.data.isFriendInvited;
								this.upFinish();
								this.finishTaskChest = data.data.isExtraRewardReceived;
								this.remainGold = data.data.remainGold;
								this.shareRece = data.data.shareSchemeRewardReceivable;
				            } else if (data.code == "201010") {
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
			// 判断是否实名认证
			CheckUserMsgOk: function() {
			    var data = [];
			    data["userId"] = this.userId;
				data = this.Encrypt({...data});
			    var datas = this.Qs.stringify({
			        data
			    }, {
			        allowDots: true
			    });
			    this.$ajax.post('/caipiaoshouye/index.php/home/index/validateUserInfo',
			            datas
			        )
			        .then(res => {
			            console.log(res);
			            var content = JSON.parse(res.data.content);
			            if (res.status != "200") {
			                return;
			            } else {
			                if (content.code == "100000") {
			                    if (content.data.certification) {
			                        this.real_name = true;
			                    } else {
			                        this.real_name = false;
			                    }
			                }
			            }
			        })
			        .catch(err => {
			            console.log(err);
			        })
			},
			// 倒计时
			setSurplusTime: function(surTime) {
				clearInterval(interval);
			    var sTm = this.formatDuring(surTime);
				this.surTimehours = sTm[1]
			    this.surTimeminutes = sTm[2]
			    this.surTimeseconds = sTm[3]
			    var thal = this;
			    interval = setInterval(function() {
			        surTime = surTime - 1000
			        if (surTime <= 0) {
			            thal.$router.go(0);
			            clearInterval(interval);
			        }
			        var Tm = thal.formatDuring(surTime);
					thal.surTimehours = Tm[1]
			        thal.surTimeminutes = Tm[2]
			        thal.surTimeseconds = Tm[3]
			    }, 1000);
			},
			formatDuring: function(mss) {
				var days = parseInt(mss / (1000 * 60 * 60 * 24)) + '';
			    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + '';
			    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60)) + '';
			    var seconds = parseInt((mss % (1000 * 60)) / 1000) + '';
			    if (hours.toString().length < 2) {
			        hours = '0' + hours.toString();
			    }
			    if (minutes.toString().length < 2) {
			        minutes = '0' + minutes.toString();
			    }
			    if (seconds.toString().length < 2) {
			        seconds = '0' + seconds.toString();
			    }
			    return [days, hours, minutes, seconds];
			}
        }
    }
</script>
