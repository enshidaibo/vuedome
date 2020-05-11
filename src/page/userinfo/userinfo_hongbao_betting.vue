<template>
	<div class="betting">
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="closeWin()" tapmode>
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">红包投注</div>
		</header>
		<div class="main">
			<div class="mainHeader">
				<img src="../../assets/task/betting_header.png" alt="">
				<div class="divP">
					<p class="p1"><span>￥</span>{{numberFormat(coinsMoney)}}</p>
				</div>
				<div class="divP1">
					<p>用户{{username|mobileHide(3,4)}}使用红包购买<span>{{type}}</span>中了<span>{{(money*1).toFixed(2)}}元</span>大奖</p>
				</div>
			</div>
			<div class="mainBtn">
				<img src="../../assets/task/betting_btn.png" alt=""  @click="gotypename('goucai')">
			</div>
			<div class="mainTitle">
				<img src="../../assets/task/betting_title.png" alt="">
			</div>
			<ul class="mainConent">
				<li @click="gotypename('special_friends')">
					<img src="../../assets/task/betting_yq.png" />
					<div class="li_right">
						<h4>邀请好友</h4>
						<p>好友实名、充值和购彩即有红包</p>
					</div>
					<div class="right_fh"></div>
				</li>
				<li @click="gotypename('userinfo_task_prize')">
					<img src="../../assets/task/betting_prize.png" />
					<div class="li_right">
						<h4>每日抽奖</h4>
						<p>每日免费抽奖<span>5</span>次,最高<span>500</span>元红包</p>
					</div>
					<div class="right_fh"></div>
				</li>
				<li @click="gotypename('userinfo_task_sunburn')">
					<img src="../../assets/task/betting_sunburn.png" />
					<div class="li_right">
						<h4>晒单有礼</h4>
						<p>分享成功即得<span>5%</span>投注金额的红包</p>
					</div>
					<div class="right_fh"></div>
				</li>
				<li @click="gotypename('userinfo_task_sign')">
					<img src="../../assets/task/betting_sign.png" />
					<div class="li_right">
						<h4>每日签到</h4>
						<p>每日<span>0.28</span>元，每周<span>3.84</span>元红包</p>
					</div>
					<div class="right_fh"></div>
				</li>
			</ul>
			<div class="mainFooter">
				<p>———  本次活动最终解释权归平台所有  ———</p>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		getCookie,
	} from "../../js/common.js"
	import {
		Toast
	} from 'mint-ui';
	var ms
	var _userId
	export default {
		data() {
			return {
				balance: 0,
				type: '双色球',
				money: 0,
				username: "13848424350",
				coinsMoney:0,
			}
		},
		created() {
			this.getUserInfo();
			this.getDaysWonMaxUser();
		},
		mounted() {

		},
		methods: {
			numberFormat: function(number) {
				var data = Math.floor(number * 100) / 100;
				return data.toFixed(2);
			},
			closeWin: function() {
				this.$router.go(-1);
			},
			gotypename: function(i) {
				this.$router.push({
					name: i
				})
			},
			//红包余额
			getUserInfo: function() {
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
								this.coinsMoney = content.data.coinsMoney;
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
			//采用红包购彩后，中奖的
			getDaysWonMaxUser: function() { //未晒单
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
			   console.log(data);
			    var datas = this.Qs.stringify({
			        	 data
			    }, {
			        allowDots: true
			    });

			    this.$ajax.post('/caipiaoshouye/index.php/home/index/getDaysWonMaxUser',
			           datas
			        )
			        .then(res => {
						console.log(res)
			            if (res.data.status == 200) {
			                var content = res.data.content;
			                console.log(content)
			                if (content.code == 1000) {
			                    var data = content.obj;
								this.username =data.userName;
								this.money = data.prize;
								this.type=data.lotteryType;
			                }
			            }
			        })
			        .catch(err => {
			            console.log(err);
			    })
			},
		},
		filters: {
			mobileHide: function(str, start, num) {
				let st = "";
				for (let i = 0; i < num; i++) {
					st += "*";
				}
				var end = 11 - parseInt(start) - parseInt(num);

				return str.substr(0, start) + st + str.substr(-end);
			}
		}
	}
</script>
<style scoped>
	.betting {
		background: linear-gradient(0deg, rgba(236, 73, 45, 1), rgba(255, 171, 74, 1));
	}

	header {
		position: fixed;
		background: #fff;
	}

	.aui-bar-nav .aui-btn .aui-iconfont {
		color: #333;
	}

	.aui-title {
		color: #333;
	}

	.main {
		margin-top: 2.25rem;
	}

	.mainHeader {
		position: relative;
	}

	.mainHeader img {
		width: 100%;
	}

	.mainHeader .divP {
		width: 100%;
		position: absolute;
		top: 39%;
		text-align: center;
	}

	.mainHeader .p1 {
		font-size: 2rem;
		color: #FFAA0A;

	}

	.mainHeader .p1 span {
		font-size: 1.2rem;
	}

	.mainHeader .divP1 {
		width: 6.75rem;
		position: absolute;
		top: 61%;
		left: 50%;
		margin-left: -3.625rem;
	}

	.divP1 p {
		font-size: 0.75rem;
		color: #FFFFFF;
		text-align: center;
	}

	.divP1 span {
		font-size: 0.75rem;
		color: #FFDF5A;
	}

	.mainBtn {
		width: 12rem;
		height: 2.95rem;
		margin: 0 auto;
		position: relative;
		z-index: 2;
		margin-top: -1.8rem;
	}

	.mainTitle {
		margin: 0 0.75rem;
		margin-top: 0.875rem;
	}

	.mainTitle img {
		width: 100%;
	}

	.mainConent {
		margin: 0 0.75rem;
		margin-top: 0.825rem;
	}

	.mainConent li {
		background: url(../../assets/task/betting_kuang.png) no-repeat;
		background-size: 100% 100%;
		height: 4rem;
		display: flex;
		/* align-items: center; */
		position: relative;
		padding-left: 0.625rem;
		margin-bottom: 0.55rem;
	}

	.mainConent .li_right {
		display: inline-block;
		margin-top: 1rem;
		margin-left: 0.375rem;

	}

	.mainConent h4 {
		font-size: 0.85rem;
		color: #BF3601;
	}

	.mainConent p {
		margin-top: 0.25rem;
		font-size: 0.55rem;
		color: #666666;
	}

	.mainConent span {
		font-size: 0.55rem;
		color: #FF2601;
	}

	.mainConent img {
		width: auto;
		height: 3.4rem;
		display: inline-block;
		margin-top: 0.325rem;
	}

	.mainConent .right_fh {
		width: 0.35rem;
		height: 0.65rem;
		background: url(../../assets/task/betting_right.png) no-repeat;
		background-size: cover;
		position: absolute;
		top: 50%;
		margin-top: -0.325rem;
		right: 1rem;
	}

	.mainFooter {
		text-align: center;
		padding-bottom: 0.9rem;
	}

	.mainFooter p {
		font-size: 0.55rem;
		color: #FFAFA7;
	}
</style>
