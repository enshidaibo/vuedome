<template>
	<div class="bge">
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn">
				<span class="aui-iconfont aui-icon-left" @click="bakey()"></span>
			</div>
			<div class="aui-title">推广中心</div>
		</header>
		<div class="main">
			<div class="main1">
				<div class="main1Box1"><img src="../../assets/ag06.png" alt=""><span>推广总收益(元)</span></div>
				<h4>{{((redEnvelope*1)+(cash*1)).toFixed(2)}}</h4>
				<div class="main1Box2">
					<div>
						<p class="p1">红包收益(元)</p>
						<p class="p2">{{(redEnvelope*1).toFixed(2)}}</p>
					</div>
					<div>
						<p class="p1">现金收益(元)</p>
						<p class="p2">{{(cash*1).toFixed(2)}}</p>
					</div>
				</div>
			</div>
			<div class="main2">
				<div class="main2Box1">
					<img src="../../assets/ag07.png" alt="">
					<span>推广总人数</span>
					<div>
						<p>{{data.friendCount}}人</p>
					</div>
				</div>
				<div class="main2Box2">
					<div class="main2Item1">
						<div class="box3" @click="tgsy()">
							<img src="../../assets/ag01.png" alt="">
							<p>推广收益</p>
							<div class="box1"></div>
						</div>
						<div @click="myuser()">
							<img src="../../assets/ag02.png" alt="">
							<p>我的好友</p>
							<div class="box2"></div>
						</div>
					</div>
					<div class="main2Item2">
						<div class="box4" @click="tgzl()">
							<img src="../../assets/ag03.png" alt="">
							<p>推广资料</p>
						</div>
						<div @click="sysm()">
							<img src="../../assets/ag04.png" alt="">
							<p>盈利说明</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		getCookie,
		setCookie,
		OverallData
	} from "../../js/common.js";
	export default {
		data() {
			return {
				userId: '',
				data: {
					friendCount: 0, //总人数
				},
				redEnvelope: 0, //红包
				cash: 0, //现金
			}
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
			this.onLoading();
		},
		methods: {
			//推广收益
			tgsy: function() {
				this.$router.push({
                        path: '/userinfo/myincome',
                        query:{
                            pageId:0
                        }
                    })
			},
			//我的用户/好友
			myuser: function() {
				this.$router.push({
					name: 'myfriend'
				})
			},
			//推广资料
			tgzl: function() {
				this.$router.push({
					name: 'materials'
				})
			},
			//盈利说明
			sysm: function() {
				this.$router.push({
					name: 'explain'
				})
			},
			bakey: function() {
				this.$router.go(-1)
			},
			onLoading: function() {
				var sdTime = '';
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
		}
	}
</script>
<style scoped>
	.aui-bar-nav {
		top: 0;
		line-height: 2.25rem;
		background-color: #fff;
		color: #000;
		position: fixed;
	}

	.aui-bar-nav .aui-btn .aui-iconfont {
		font-size: 0.9rem;
		line-height: 1.25rem;
		padding: 0;
		margin: 0;
		color: #000;
	}

	.main {
		padding-top: 2.25rem;
		background: #F4F4F4;
		min-height: 100vh;
	}

	.main1 {
		height: 11.275rem;
		background: url(../../assets/ag05.png) no-repeat;
		background-size: cover;
	}

	.main1 .main1Box1 {
		padding-top: 1.275rem;
		margin-left: 1.125rem;
		margin-bottom: 0.475rem;
	}

	.main1 .main1Box1 img {
		width: 0.7rem;
		height: 0.7rem;
		display: inline-block;
		margin-right: 0.4rem;
	}

	.main1 .main1Box1 span {
		font-size: 0.65rem;
		color: #CEE0FF;
	}

	.main1 h4 {
		font-size: 2.25rem;
		line-height: 2.6rem;
		color: #fff;
		text-align: center;
		margin-bottom: 0.45rem;
		font-weight: bold;
	}

	.main1 .main1Box2 {
		display: flex;
	}

	.main1Box2 div {
		flex: 1;
		text-align: center;
	}

	.main1Box2 .p1 {
		font-size: 0.65rem;
		color: #CEE0FF;
		line-height: 0.925rem;
	}

	.main1Box2 .p2 {
		font-size: 1rem;
		color: #fff;
		line-height: 1.4rem;
	}


	.main2 {
		margin: 0 4%;
		margin-top: 0.7rem;
	}

	.main2Box1 {
		background: #fff;
		padding: 0.65rem 1.075rem 0.55rem 1rem;
		margin-bottom: 0.75rem;
		border-radius: 8px;
	}

	.main2Box1 img {
		width: 1.6rem;
		height: 1.6rem;
		display: inline-block;
	}

	.main2Box1 div {
		float: right;
	}

	.main2Box1 p {
		font-size: 0.8rem;
		color: #666;
		line-height: 1.6rem;
	}

	.main2Box1 span {
		font-size: 0.75rem;
		color: #666;
		line-height: 1.6rem;
	}

	.main2Box2 {
		background: #fff;
		padding-top: 0.875rem;
		padding-bottom: 1.025rem;
		border-radius: 8px;
	}

	.main2Box2 img {
		width: 1.8rem;
		height: 1.8rem;
		margin: 0 auto;
		margin-bottom: 0.75rem;
	}

	.main2Box2 p {
		font-size: 0.75rem;
		color: #666666;
		text-align: center;
	}

	.main2Box2 .main2Item1 {
		display: flex;
	}

	.main2Item1 .box1 {
		height: 1.025rem;
		margin-left: 1.375rem;
		border-bottom: 1px solid #f4f4f4;
	}

	.main2Item1 .box2 {
		height: 1.025rem;
		margin-right: 1.375rem;
		border-bottom: 1px solid #f4f4f4;
	}

	.main2Item1 div {
		flex: 1;
	}

	.main2Box2 .main2Item2 {
		display: flex;
	}

	.main2Item2 img {
		margin-top: 0.85rem;
	}

	.main2Item2 div {
		flex: 1;
	}

	.main2 .box3 {
		border-right: 1px solid #f4f4f4;
	}

	.main2 .box4 {
		border-right: 1px solid #f4f4f4;
	}
</style>
