<template>
	<div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="closeWin()" tapmode>
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">推广收益</div>
			<!-- <div @click="timechange()" tapmode class="aui-pull-right aui-btn">
				<span id="timeda">{{timeda}}</span>
			</div> -->
		</header>
		<section id="zjyy_main">
			<section class="statist">
				<div class="statist_Profit">
					<canvas id="Profit" width="330" height="330" style="width: 8.25rem;height: 8.25rem;"></canvas>
				</div>
				<div class="statist_bot">
					<div class="bot_1">
						<p class="p1">{{data.friendCount}}</p>
						<p class="p2">好友总人数</p>
					</div>
					<div class="bot_2">
						<p class="p1">{{(redEnvelope*1).toFixed(2)}}</p>
						<div class="bbox">
							<div class="box1"></div>
							<p class="p2">累计红包收益</p>
						</div>
					</div>
					<div class="bot_3">
						<p class="p1">{{(cash*1).toFixed(2)}}</p>
						<div class="bbox">
							<div class="box1"></div>
							<p class="p2">累计现金收益</p>
						</div>
					</div>
				</div>
			</section>

			<section class="extension">
				<div class="extension_cont">
					<div class="extension_list bg1" @click="listJump('userinfo_task_friends')">
						<div class="icon"><img src="../../assets/userinfo/tg01.png" /></div>
						<div class="p1">{{(data.rechargeBonus*1).toFixed(2)}}</div>
						<div class="p2">好友充值奖励收益</div>
					</div>
					<div class="extension_list bg2" @click="listJump('userinfo_task_goucai')">
						<div class="icon"><img src="../../assets/userinfo/tg02.png" /></div>
						<div class="p1">{{(data.betReturn*1).toFixed(2)}}</div>
						<div class="p2">好友购彩返现收益</div>
					</div>
					<div class="extension_list bg3" @click="listJump('userinfo_task_friend_real')">
						<div class="icon"><img src="../../assets/userinfo/tg03.png" /></div>
						<div class="p1">{{(data.realBonus*1).toFixed(2)}}</div>
						<div class="p2">好友实名奖励</div>
					</div>
					<!-- <div class="extension_list bg4">
						<div class="icon"><img src="../../assets/userinfo/tg04.png" /></div> -->
						<!-- <div class="p1">{{(data.realBonusSum*1).toFixed(2)}}</div> -->
						<!--  @click="listJump('userinfo_task_friend_real')" -->
					<!-- 	<div class="p1">3.00</div>
						<div class="p2">好友首次累计充值</div>
						<div class="p2">满30元奖励</div>

					</div> -->
				</div>
			</section>
			<section class="nav" @click="top_tj">
				<img src="../../assets/userinfo/tgbanner.png" alt="">
			</section>
		</section>
	</div>
</template>

<script>
	import {
		getCookie,
		setCookie,
		OverallData
	} from "../../js/common.js";
	import {
		Toast
	} from 'mint-ui';
	export default {
		data() {
			return {
				userId: '',
				data: {
					betReturn: 0,
					cash: 0,
					friendCount: 0,
					realBonus: 0,
					realBonusSum: 0,
					realCount: 0,
					rechargeBonus: 0,
					rechargeBonusSum: 0,
					redEnvelope: 0,
				},
				redEnvelope: '0',
				cash: '0',
				cheaktimes: 'whole',
				timeda: '今日',
				profitTitle: '总收益'
			};
		},
		created() {
			var user = getCookie('newData');
			if (!user) {
				this.$router.push({
					name: 'login'
				})
				return false;
			}
			this.userId = user.userid;
		},
		mounted() {
			this.onLoading('whole');
		},
		methods: {
			closeWin: function() {
				this.$router.go(-1);
			},
			top_tj: function() {
				this.$router.push({
					name: 'special_friends'
				})
			},
			onLoading: function(cheakt) {
				var sdTime = '';
				if (cheakt == 'today') {
					sdTime = this.getTime();
				}
				let data = [];
				data['uid'] = this.userId;
				data["mid"] = OverallData().mid;
				data['date'] = sdTime;
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
								this.data = data.data;
								this.redEnvelope = data.data.redEnvelope;
								this.cash = data.data.cash;
								this.paintProfit(this.redEnvelope, this.cash);
							} else {
								Toast(data.message);
							}
						}
					}).catch(err => {
						this.nopyan = true;
						console.log(err);
					})
			},
			listJump: function(url) {
				this.$router.push({
					name: url
				})
			},
// 			timechange: function() {
// 				if (this.cheaktimes == 'whole') {
// 					this.cheaktimes = 'today';
// 					this.timeda = '全部';
// 					this.profitTitle = '今日收益';
// 					this.onLoading('today');
// 				} else {
// 					this.cheaktimes = 'whole';
// 					this.timeda = '今日';
// 					this.profitTitle = '总收益';
// 					this.onLoading('whole');
// 				}
// 			},
			paintProfit: function(redEnvelopes, cash) {
				var all = (redEnvelopes * 1) + (cash * 1);
				var text2 = all.toFixed(2);
				if (all == 0) {
					all = 2;
					redEnvelopes = 1;
					cash = 1;
					text2 = '0.00'
				}
				var pRate = 360 * (cash / all) + 90
				var bCost = 360 * (redEnvelopes / all) + pRate;
				var text1 = this.profitTitle;
				var innWidth = 330;
				var sttWidth = innWidth / 2;
				var canvas = document.getElementById('Profit');
				var ctx = canvas.getContext('2d');
				ctx.clearRect(0, 0, 330, 330);
				var deg = Math.PI / 180;
				if (pRate >= 90) {
					ctx.fillStyle = "#20F9FC";
					ctx.sector(sttWidth, sttWidth, sttWidth, 90 * deg, pRate * deg).fill();
				}
				if (bCost >= 90) {
					ctx.fillStyle = "#FEC957";
					ctx.sector(sttWidth, sttWidth, sttWidth, pRate * deg, bCost * deg).fill();
				}
				var lingrad = ctx.createLinearGradient(0, 0, 0, 330);
				lingrad.addColorStop(0, '#12A5F9');
				lingrad.addColorStop(1, '#0982F6');
				ctx.fillStyle = lingrad;
				ctx.sector(sttWidth, sttWidth, sttWidth - 50, 0, 360 * deg).fill();
				//				this.clearArc(ctx, sttWidth, sttWidth, sttWidth-50, 1);
				ctx.font = "30px PingFang-SC-Regular";
				ctx.fillStyle = "#FFFFFF";
				var tWidth1 = sttWidth - (ctx.measureText(text1).width / 2);
				ctx.fillText(text1, tWidth1, sttWidth - 12);
				ctx.font = "38px PingFang-SC-Bold";
				ctx.fillStyle = "#FFFFFF";
				var tWidth2 = sttWidth - (ctx.measureText(text2).width / 2);
				ctx.fillText(text2, tWidth2, sttWidth + 32);

			},
			getTime: function() {
				let time = new Date();
				let y = time.getFullYear();
				let m = time.getMonth() + 1 >= 10 ? parseInt(time.getMonth() + 1) : "0" + parseInt(time.getMonth() + 1);
				let d = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
				let h = time.getHours() >= 10 ? time.getHours() : "0" + time.getHours();
				let mm = time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes();
				let s = time.getSeconds() >= 10 ? time.getSeconds() : "0" + time.getSeconds();
				return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
			}
			// 			clearArc: function (ctx,x,y,radius,stepClear){
			// 				var calcWidth=radius-stepClear;
			// 				var calcHeight=Math.sqrt(radius*radius-calcWidth*calcWidth);
			//
			// 				var posX=x-calcWidth;
			// 				var posY=y-calcHeight;
			//
			// 				var widthX=2*calcWidth;
			// 				var heightY=2*calcHeight;
			//
			// 				if(stepClear<=radius){
			// 					ctx.clearRect(posX,posY,widthX,heightY);
			// 					stepClear+=1;
			// 					this.clearArc(ctx,x,y,radius,stepClear);
			// 				}
			// 			}
		},
		filters: {

		}
	}
	CanvasRenderingContext2D.prototype.sector = function(x, y, radius, sDeg, eDeg) {
		// 初始保存
		this.save();
		// 位移到目标点
		this.translate(x, y);
		this.beginPath();
		// 画出圆弧
		this.arc(0, 0, radius, sDeg, eDeg);
		// 再次保存以备旋转
		this.save();
		// 旋转至起始角度
		this.rotate(eDeg);
		// 移动到终点，准备连接终点与圆心
		this.moveTo(radius, 0);
		// 连接到圆心
		this.lineTo(0, 0);
		// 还原
		this.restore();
		// 旋转至起点角度
		this.rotate(sDeg);
		// 从圆心连接到起点
		this.lineTo(radius, 0);
		this.closePath();
		// 还原到最初保存的状态
		this.restore();
		return this;
	}
</script>

<style scoped>
.aui-bar-nav {
    background-color: #03a9f4 !important;
    color: #ffffff;
}
.aui-title {
	    color: #fff !important;
	}
	header {
		position: fixed !important;
	}

	#zjyy_main {
		padding-top: 2.25rem;
		min-height: 100vh;
		background-color: #EFF5FB;
	}

	.statist {
		width: 100%;
		/* height: 13.1rem; */
		background: linear-gradient(180deg, rgba(20, 173, 250, 1), rgba(3, 105, 244, 1));
	}

	.statist_Profit {
		width: 8.25rem;
		height: 9.42rem;
		margin: auto;
		padding-top: 1.17rem;
	}

	.statist_Profit canvas {}

	.statist_bot {
		width: 100%;
		height: 3.15rem;
		padding: 0.5rem 3.6%;
		margin-top: 1.1rem;
		background: #1096FD;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.statist_bot>div {
		/* flex: 0 1 auto;
		width: auto;
		height: 1.5rem;
		margin: 0 0.65rem;
		font-size: 0.65rem;
		color: #ffffff;
		line-height: 1.5rem; */
		flex: 1;
		position: relative;
		/* padding-left: 0.875rem; */
	}

	.statist_bot .p1 {
		font-size: 0.8rem;
		color: #fff;
		text-align: center;
		font-weight: bold;
		line-height: 1rem;
	}

	.statist_bot .p2 {
		font-size: 0.55rem;
		color: #fff;
		text-align: center;
		display: inline-block;
	}

	.statist_bot .box1 {
		width: 0.5rem;
		height: 0.5rem;
		display: inline-block;
		margin-right: 0.2rem;
		background-color: #FEC957;
	}

	.statist_bot .bot_1 .p2 {
		display: block;
	}

	.statist_bot .bbox {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.statist_bot .bot_3 .box1 {
		background: #20F9FC;
	}

	.statist_bot .bot_1 {
		border-right: 1px solid #74B4FF;
	}

	.statist_bot .bot_2 {
		border-right: 1px solid #74B4FF;
	}


	.extension {
		width: 100%;
		height: auto;
		margin-top: 0.75rem;
	}

	.extension_cont {
		width: 100%;
		height: auto;
		background: #fff;
		display: flex;
		justify-content: start;
		flex-flow: row wrap;
		padding: 0.375rem 0.5rem;
		padding-top: 0.48rem;
	}


	.extension_list {
		flex: 0 1 auto;
		width: 49.5%;
		height: 4.1rem;
		background-color: #fff;
		margin-bottom: 0.1rem;
		position: relative;
		padding-left: 3.2rem;
		padding-top: 1rem;
	}

	.extension_list:active {
	  transform: scale(0.9);
	  -moz-transform:scale(0.9);
	  -webkit-transform:scale(0.9);
	   -o-transform:scale(0.9);
	}

	.extension_list .icon {
		width: 1.75rem;
		height: 1.75rem;
		position: absolute;
		left: 1rem;
		top: 50%;
		margin-top: -0.875rem;
	}

	.extension_list .icon img {
		width: 100%;
		height: auto;
	}

	.extension_list .p1 {
		font-size: 0.9rem;
		color: #FF6161;
		line-height: 1rem;
	}

	.extension_list .p2 {
		/* margin-top: 0.2rem; */
		font-size: 0.6rem;
		color: #999;
		/* line-height: 1rem; */
	}


	.bg1 {
		background: url(../../assets/userinfo/bg01.png) no-repeat;
		background-size: 100% 4.1rem;
	}

	.bg2 {
		background: url(../../assets/userinfo/bg02.png) no-repeat;
		background-size: 100% 4.1rem;
	}

	.bg3 {
		background: url(../../assets/userinfo/bg03.png) no-repeat;
		background-size: 100% 4.1rem;
	}

	.bg4 {
		background: url(../../assets/userinfo/bg04.png) no-repeat;
		background-size: 100% 4.1rem;
	}

	.nav {
		margin: 0 0.75rem;
		margin-top: 0.525rem;
	}
</style>
