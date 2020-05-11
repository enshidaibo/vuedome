<template>
	<div @click="toLogin">
		<div class="userinfo_header" id="userinfo_header">
			<div class="userinfo_header_tltel">{{userName}}</div>
			<div class="userinfo_header_content">
				<div class="header_content_up">
					<div class="content_up_left">
						<img v-if='img_url' :src='img_url' alt="" />
						<img v-else src='../assets/username.png' alt="" />
					</div>
					<div class="content_up_right">
						<div class="up_right_title">现金余额</div>
						<div class="moneyes">
							<div>￥{{money}}</div>
							<div  class="reflash" id="reflash">
								<img src="../assets/reflash.png" alt="">
							</div>
						</div>

					</div>
				</div>
				<div class="header_content_lower">
					<div class="topUp" >
						充值
					</div>
					<div class="withDraw">
						提现
					</div>
				</div>
			</div>
		</div>
		<div class="userinfo_list">
			<p>
				推广中心
				<span> </span>
			</p>
			<p >
				投注记录
				<span> </span>
			</p>
			<p>
				追号记录
				<span> </span>
			</p>
			<p>
				账户明细
				<span> </span>
			</p>
			<p >
				合买
				<span> </span>
			</p>
			<!-- <p onclick="guaguale()" tapmode>
            刮刮乐
            <span>  </span>
        </p> -->
			<p>
				设置
				<i id="Version_up"></i>
				<span></span>
			</p>
		</div>
	<!-- 	<footer class="pos-fi b-0 w-100  footers">
			<ul class="flex-box w-100">
				<li class="foot_li w-20" @click='gohome'>
					<div class="w-100 imgBox"><img src="../assets/backIcon01_c.png"/></div>
					<div class="w-100"><span class="w-100 tac dis-bl fs-12 text_span">首页</span></div>
				</li>
				<li class="foot_li w-20" @click='gogoucai'>
					<div class="w-100 imgBox"><img src="../assets/backIcon02.png"/></div>
					<div class="w-100"><span class="w-100 tac dis-bl fs-12 text_span">购彩</span></div>
				</li>
				<li class="foot_li w-20 " @click='golottery'>
					<div class="w-100 imgBox"><img src="../assets/backIcon03.png"/></div>
					<div class="w-100"><span class="w-100 tac dis-bl fs-12 text_span">开奖</span></div>
				</li>
				<li class="foot_li w-20 " @click='gotask'>
					<div class="w-100 imgBox "><img src="../assets/backIcon04.png"/></div>
					<div class="w-100"><span class="w-100 tac dis-bl fs-12 text_span">任务</span></div>
				</li>
				<li class="foot_li w-20 active" @click='gouser'>
					<div class="w-100 imgBox"><img src="../assets/backIcon05_c.png"/></div>
					<div class="w-100"><span class="w-100 tac dis-bl fs-12 text_span">我的</span></div>
				</li>
			</ul>
		</footer> -->
	</div>
</template>
<script>
	//在js部分所有变量都是模块作用域
	//如果需要使用就必须引入
	import {
		setSession,
		getSession
	} from "../js/common.js";
	import {
		Toast
	} from 'mint-ui';

	export default {
		data() {
			return {
				userName: '',
				money: 33,
				img_url: '',
				logok: false
			}
		},
		created() {
			
		this.randomNum();
		
		var datas = this.Qs.stringify({
		   mid:2
		}, {
		    allowDots: true
		});
		this.$ajax.post('http://103.97.225.218:8099/merchantConfig/updateAccess',
		        datas
		    )
		    .then(ret => {
				
			})
				
		},
		mounted(){
		const script = document.createElement("script");
          script.src ="https://s96.cnzz.com/z_stat.php?id=1276088739&web_id=1276088739";
          script.language = "JavaScript";
	   	},
   watch: {
    '$route' () {
      if (window._czc) {
        let location = window.location
        let contentUrl = location.pathname + location.hash
        let refererUrl = '/'
        window._czc.push(['_trackPageview', contentUrl, refererUrl])
      }
    }
  },
		methods: {
			toLogin:function(){
				// setSession('tourist',true);
				this.$router.push({
					name:'login'
				})
			},
			randomNum:function(){
				var randomNum='游客'+parseInt(Math.random()*100000);
				if(!getSession('randomNum')){
					setSession('randomNum',randomNum)
					}
				this.userName=getSession('randomNum')
			}
		},
	
	}
</script>



<style scoped>
	.mint-tabbar {
		position: fixed;
	}

	a {
		color: #000;
	}

	.active {
		color: #5fa3eb;
	}

	.userinfo_header {
		height: 8rem;
		width: 100%;
		background-image: url(../assets/blue_background.png);
		background-size: 100% 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		padding-top: 1rem;
	}

	.userinfo_header_tltel {
		font-size: 1rem;
		color: #fff;
		font-weight: bold;
		display: inline-block;
		width: 88%;
		height: 1rem;
		padding-left: 6rem;
	}

	.userinfo_header_content {
		width: 88%;
		height: 140px;
		margin: 0 auto;
		background: #fff;
		border: 1px solid #979797;
		border-radius: 0.4rem;
	}



	.header_content_up {
		width: 100%;
		height: 4rem;
		padding: .2rem 0;
		position: relative;
	}

	.content_up_left {
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 50%;
		position: absolute;
		background-color: #fff;
		top: -1.3rem;
		left: 1rem;
	}

	.content_up_left img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.content_up_right {
		width: 68%;
		padding: .2rem 0;
		margin-left: 5rem;

	}

	.moneyes {
		display: flex;
	}

	.reflash {
		width: 1.6rem;
		height: 1.6rem;

	}

	.up_right_title {
		color: #000;
		height: 1.2rem;
		font-size: 0.6rem;
		line-height: 1.2rem;
		font-weight: bold;

	}

	.moneyes {
		color: #E45869;
		height: 1.6rem;
		font-size: 1rem;
		line-height: 1.6rem;
		font-weight: bold;
	}

	.header_content_lower {
		width: 100%;
		padding: 0 0 .4rem 0;
		position: relative;
		font-size: 0;
	}

	.header_content_lower div {
		width: 50%;
		display: inline-block;
		font-size: 0.9rem;
		font-weight: bold;
		height: 2rem;
		line-height: 2rem;

		text-align: center;
		letter-spacing: normal;
	}

	.topUp {
		border-right: 1px solid #9b9b9b;
		background: #fff url(../assets/icon_my08.png) no-repeat;
		background-size: 1.4rem 1.4rem;
		background-position: 20% .2rem;
	}

	.withDraw {
		background: #fff url(../assets//icon_my09.png) no-repeat;
		background-size: 1.4rem 1.4rem;
		background-position: 20% .2rem;
	}

	.userinfo_list {
		width: 100%;
		background: #fff;
		margin-top: 9.5rem;
        margin-bottom: 2.75rem;
	}

	.userinfo_list p {
		width: 100%;
		height: 3.5rem;
		line-height: 3.5rem;
		text-align: left;
		padding: 0 2rem;
		padding-left: 3.3rem;
		font-size: 0.8rem;
		font-weight: 800;
		position: relative;
		border-top: 1px solid #E1E1E1;

	}

	.userinfo_list>p:first-child {
		background: url(../assets/icon_my01.png) 1.6rem center no-repeat;
		background-size: 1.4rem 1.4rem;
		border-top: 0;
	}

	.userinfo_list>p:nth-child(2) {
		background: url(../assets/icon_my02.png) 1.6rem center no-repeat;
		background-size: 1.4rem 1.4rem;
	}

	.userinfo_list>p:nth-child(3) {
		background: url(../assets/icon_my03.png) 1.6rem center no-repeat;
		background-size: 1.4rem 1.4rem;
	}

	.userinfo_list>p:nth-child(4) {
		background: url(../assets/icon_my04.png) 1.6rem center no-repeat;
		background-size: 1.4rem 1.4rem;
	}

	.userinfo_list>p:nth-child(5) {
		background: url(../assets/icon_my05.png) 1.6rem center no-repeat;
		background-size: 1.4rem 1.4rem;
	}

	.userinfo_list>p:nth-child(6) {
		background: url(../assets/icon_my07.png) 1.6rem center no-repeat;
		background-size: 1.4rem 1.4rem;
	}

	.userinfo_list p span::before {
		content: '';
		width: 0.5rem;
		height: 0.5rem;
		position: absolute;
		top: 50%;
		right: 8%;
		margin-top: -0.2rem;
		background: transparent;
		border: 1px solid #dddddd;
		border-top: none;
		border-right: none;
		z-index: 2;
		-webkit-border-radius: 0;
		border-radius: 0;
		-webkit-transform: rotate(-135deg);
		transform: rotate(-135deg);

	}

	/*未实名弹窗*/
	#logok {
		width: 100%;
		height: 100%;
		
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2000;
		background: rgba(0, 0, 0, .4);
	}

	#logok>div {
		width: 85%;
		height: 17.2rem;
		position: absolute;
		top: 20%;
		left: 7.5%;
		z-index: 2;
		border-radius: 0.6rem;
		background-color: #fff;
	}

	#logok>div>div {
		width: 100%;

	}

	#logok>div>div>img {
		display: block;
		width: 100%;
		/*height: 3.2rem;*/
		margin: 0 auto 0.2rem;
	}

	#logok>div>div>.title2 {
		width: 100%;
		height: .9rem;
		line-height: .9rem;
		font-size: 0.65rem;
		text-align: center;
		color: #7a7a7a;
		margin-top: 0.8rem;
	}

	#logok>div>div>.content {
		width: 100%;
		line-height: .9rem;
		font-size: 0.65rem;
		text-align: center;
		padding: 0 1rem;
		color: #7a7a7a;
		margin: 0 auto;
	}

	.dis-bl {
		display: block !important;
	}

	.reflashimg {
		animation: rotating 1.2s linear infinite;
	}

	/*未实名弹窗2*/
	#logok2 {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2000;
		background: rgba(0, 0, 0, .4);
	}

	#logok2>div {
		width: 85%;
		height: 17.2rem;
		position: absolute;
		top: 20%;
		left: 7.5%;
		z-index: 2;
		border-radius: 0.6rem;
		background-color: #fff;
	}

	#logok2>div>div {
		width: 100%;

	}

	#logok2>div>div>img {
		display: block;
		width: 100%;
		/*height: 3.2rem;*/
		margin: 0 auto 0.2rem;
	}

	#logok2>div>div>.title2 {
		width: 100%;
		height: .9rem;
		line-height: .9rem;
		font-size: 0.65rem;
		text-align: center;
		color: #7a7a7a;
		margin-top: 0.8rem;
	}

	#logok2>div>div>.content {
		width: 100%;
		line-height: .9rem;
		font-size: 0.65rem;
		text-align: center;
		color: #7a7a7a;
		margin: 0 auto;
	}

	#logokbtn1,
	#logokbtn2 {
		width: 40%;
		height: 1.8rem;
		line-height: 1.8rem;
		border-radius: 0.2rem;
		text-align: center;
		font-size: 0.7rem;
	}

	#logokbtn1 {
		margin-right: 0.3rem;
		background-color: #5fa3eb;
		color: #fff;
	}

	#logokbtn2 {
		margin-left: 0.3rem;
		background-color: #9b9b9b;
		color: #fff;
	}

	#logok .logokbtn {
		width: 100%;
		height: auto;
		margin-top: 0.5rem;
		display: flex;
		justify-content: center;
	}

	#logok2 .logokbtn {
		width: 100%;
		height: auto;
		margin-top: 0.5rem;
		display: flex;
		justify-content: center;
	}
</style>
