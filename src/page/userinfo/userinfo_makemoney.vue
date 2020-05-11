<template>

	<div id="app" class="makemoney">
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn">
				<span class="aui-iconfont aui-icon-left" @click="bakey()" tapmode></span>
			</div>
			<div class="aui-title">赚钱攻略</div>
		</header>
		<div class="bg"></div>
		<div class="makemoney_content">
			<div class="makemoney_item">
				<div class="makemoney_bg">
					<span class="lef"></span>
					<span class="rig"></span>
				</div>
				<div class="makemoney_tovn"></div>
				<div class="makemoney_title">
					<img src="../../assets/t1.png" />
				</div>
				<div class="list_title">
					<div class="listbox">
						<div class="title_p">
							<span><img src='../../assets/sm.png' /></span>
							<span>实名认证</span>
						</div>
						<div class="title_p text">
							下载app注册登录后，用户进行实名认证，平台赠送<b>6.66</b>元红包
						</div>
						<div class="title_p text">
							好友通过链接下载注册实名后，用户即可获得<b>2.88</b>元红包
						</div>
					</div>
					<div class="listbox">
						<div class="title_p">
							<span><img src='../../assets/qd.png' /></span>
							<span>签到</span>
						</div>
						<div class="title_p text">
							每天在签到活动中，平台赠送<b>0.28</b>元红包，连续7天签到额外赠送<b>1.88</b>元红包，每周累计赠送<b>3.84</b>元红包。	
						</div>
					</div>
					<div class="listbox">
						<div class="title_p">
							<span><img src='../../assets/sd.png' /></span>
							<span>晒单</span>
						</div>
						<div class="title_p text">
							投注成功后晒单，即返投注金额的<b>5%</b>红包(不限红包和现金投注)
						</div>
					</div>
					<div class="listbox">
						<div class="title_p">
							<span><img src='../../assets/cj.png' /></span>
							<span>抽奖</span>
						</div>
						<div class="title_p text">
							平台每天免费赠送<b>5</b>次抽奖机会，最高可中<b>500</b>元红包大奖
						</div>
					</div>
				</div>
			</div>
		</div>


		<div class="makemoney_content makemoney_f">
			<div class="makemoney_item">
				<div class="makemoney_bg">
					<span class="lef"></span>
					<span class="rig"></span>
				</div>
				<div class="makemoney_tovn"></div>
				<div class="makemoney_title">
					<img src="../../assets/t2.png" />
				</div>
				<div class="list_title">
					<div class="listbox">
						<div class="title_p">
							<span><img src='../../assets/cz.png' /></span>
							<span>用户收益</span>
						</div>
						<div class="title_p text">
							每次现金购彩即可获得购彩金额的<b>5%</b>现金
						</div>
						<div class="title_p text">
							首次即可获得充值金额的<b>10%</b>现金，最高可返现<b>888</b>元。以后每次充值可获得充值金额<b>5%</b>现金
						<!-- 	每次充值即可获得充值金额的<b>5%</b>现金 -->
						</div>
					</div>
					<div class="listbox">
						<div class="title_p">
							<span><img src='../../assets/geren.png' /></span>
							<span>直接好友</span>
						</div>
						<div class="title_p text">
							推广专属链接，好友通过链接下载注册实名后，现金投注即返投注金额的<b>2%</b>现金。
						</div>
						
						<div class="title_p text">
							好友首次充值，即可获得充值金额的<b>30%</b>现金，最高可获得<b>300</b>元现金
						</div>
						<div class="title_p text">
							好友充值，赠送充值金额<b>4%</b>的现金
						</div>
				<!-- 		<div class="title_p text">
							好友首次累计充值满30元，即送<b>3</b>元现金
						</div> -->

					</div>
					<div class="listbox">
						<div class="title_p">
							<span><img src='../../assets/jj.png' /></span>
							<span>间接好友</span>
						</div>
						<div class="title_p text">
							推广好友的下级，通过好友的链接下载注册实名后，现金投注即返投注金额的<b>1%</b>现金
						</div>
					</div>
				</div>
			</div>
		</div>
		<p class="open" @click='getmoneys'><img src='../../assets/getmoney.png' /></p>
		<p class="bottom">—— 本次活动最终解释权归美奇彩所有 ——</p>
	</div>

	</div>
</template>
<script>
	export default {
		data() {
			return {}
		},

		created() {},
		methods: {
			bakey: function() {
				// body...
				this.$router.go(-1)
			},
			getmoneys: function() {
				this.$router.push({
					name: 'task'
				})
			}
		}
	}
</script>
<style scoped>
	header {
		position: fixed;
		z-index: 9999;
	}

	.bg {
		margin-top: 2.25rem;
	}

	.open {
		width: 50%;
		margin: 0px auto;
		display: block;
		margin-bottom: .5rem;
	}

	.aui-bar-nav {
		top: 0;
		line-height: 2.25rem;
		background-color: #fff;
		color: #000;
	}

	.aui-bar-nav .aui-btn .aui-iconfont {
		font-size: 0.9rem;
		line-height: 1.25rem;
		padding: 0;
		margin: 0;
		color: #000;
	}

	.makemoney {
		width: 100%;
		height: auto;
		background: #f84901;
	}

	.bg {
		width: 100%;
		min-height: 100%;
		position: absolute;
		background: url('../../assets/bg.png');
		background-repeat: no-repeat;
		background-size: 100%;
	}

	.makemoney_content {
		width: 90%;
		position: relative;
		margin: 0px auto;
		padding-top: 88%;
		padding-bottom: 1rem;
	}

	.makemoney_item {
		width: 100%;
		height: auto;
		background: #fff;
		border-radius: 4px;
		position: relative;
		border: 1px solid #fff;
		margin-top: 2.55rem;
	}

	.makemoney_bg {
		width: 104%;
		height: 103%;
		/* background: #fff; */
		border: 8px solid rgba(45, 45, 45, 0.1);
		/* box-shadow: 1px 1px 2px #000; */
		border-radius: 4px;
		position: absolute;
		z-index: 0;
		left: -2%;
		top: -1.5%;
		border-top: 0;
	}

	.makemoney_tovn {
		position: absolute;
		width: 100%;
		height: 100%;
		background: #fff;
		z-index: 999;
		left: 0;
		top: 0;
		border-radius: 4px;
	}

	.makemoney_title {
		position: absolute;
		width: 60%;
		/*height: 100%;*/
		left: 0px;
		right: 0px;
		top: -1.3rem;
		margin: auto;
		border: 6px solid rgba(45, 45, 45, 0.1);
		border-radius: 1.4rem;
	}

	.makemoney_title img {
		width: 100%;
		display: block;
		z-index: 999;
		/* border: 2px solid #eee; */
		position: relative;
		padding: 3%;
		padding-top: 3%;
		top: 0px;
		padding-bottom: 0;
		border-radius: 10rem;
		background: #fff;
	}

	.makemoney_imgbg {
		width: 100%;

	}

	.lef {
		width: 20%;
		position: absolute;
		top: 0px;
		left: 0px;
		height: 6px;
		background: rgba(45, 45, 45, 0.1);
		border-right: none;
	}

	.rig {
		width: 20%;
		position: absolute;
		top: 0px;
		right: 0px;
		height: 6px;
		background: rgba(45, 45, 45, 0.1);
		border-right: none;
	}

	.list_title {
		display: block;
		position: relative;
		z-index: 999;
		padding-top: 2rem;
	}

	.listbox {
		padding-top: .8rem;
		padding-bottom: .8rem;
		border-bottom: 1px rgba(238, 238, 238, 0.3);
		border-style: dashed;
	}

	.title_p {
		width: 90%;
		line-height: 1.6rem;
		font-weight: bold;
		margin: 0px auto;
		display: table;
		/*margin-top: .2rem;*/
	}

	.title_p span {
		float: left;
		font-size: .8rem;
		line-height: 1.7rem;
		margin: 0px .6rem;
		display: block;
		margin-left: 0px;
	}

	.title_p span img {
		width: 1.6rem;
		height: auto;
		display: block;
	}

	.text {
		font-weight: normal !important;
		font-size: .7rem;
		line-height: 1.1rem;
		padding-top: .5rem;
		color: #999999;
	}

	.text b {
		color: #f91312;
		font-weight: bold;
	}

	.makemoney_f {
		padding-top: 2rem !important;
	}

	.bottom {
		line-height: 1rem;
		font-size: .7rem;
		text-align: center;
		color: #f97843;
		padding-bottom: 1rem;
	}
</style>
