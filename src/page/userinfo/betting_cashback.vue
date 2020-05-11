<template>
	<div>

		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="bake()" tapmode>
				<span class="aui-iconfont aui-icon-left active"></span>
			</div>
			<div class="aui-title">投注返现</div>
		</header>
		<div class="bc_banner">
			<img src="../../assets/userinfo/betting_02.png" />
		</div>
		<div class="bc_teltei">
			<img src="../../assets/userinfo/betting_03.png" />
			<div>
				活动期间，凡使用现金进行投注，可参与投注红包返现活动；每次购彩成功即返投注金额的5%的现金；
				多投多得，返现无上限。
			</div>
		</div>
		<div class="bc_content">
			<div class="bc_content_top">
				今日已有
				<span v-for="d in datas">
					{{d}}
				</span>

				人返现
			</div>
			<p class="bc_fgx"></p>
			<div class="bc_content_bot">
				<img src="../../assets/userinfo/betting_05.png" />
				<div class="inset">
					<p>您的累计返现金额</p>
					<p>现金投注返投注金额5%</p>
				</div>
				<div class="bot_right">{{tranNumber(moeny,2)}}元</div>
			</div>
			<div class="bc_content_list">
				<p class="scx"></p>
				<ul>
					<li>
						<img src="../../assets/userinfo/betting_06.png" />
						<div>
							<p>下载APP</p>
							<p>下载APP，上传个人身份证以及银行卡信息，进行实名认证；</p>
						</div>
					</li>
					<li>
						<img src="../../assets/userinfo/betting_07.png" />
						<div>
							<p>在线投注</p>
							<p>在购彩页面选择相应彩种进行投注，投注时需选择现金支付；</p>
						</div>
					</li>
					<li>
						<img src="../../assets/userinfo/betting_08.png" />
						<div>
							<p>返现成功</p>
							<p>购彩成功即返现投注金额的5%，可到余额账户查看明细</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		  <div class="btn_bottmjuli">

        </div>
     
		<div class="btn_bottm">
			<img src="../../assets/userinfo/betting_09.png"  @click="goucai()" v-if='flag'>
		</div>
	</div>

</template>
<script>
	import {
		Toast,
		Loadmore,
		Indicator,
		MessageBox,
		DatetimePicker
	} from 'mint-ui';
	// Vue.component(DatetimePicker.name, DatetimePicker);
	import {
		setSession,
		getSession,
		getCookie,
		OverallData,
		setCookie
	} from "../../js/common.js";
	export default {
		data() {
			return {
				datas: '0',
				moeny: 0.00,
				flag:false
			}
		},
		beforeDestroy() {
			document.querySelector('html').removeAttribute('style');
			document.querySelector('body').removeAttribute('style');
		},
		created() {
			window.addEventListener('scroll', this.handleScroll, true);
			document.querySelector('html').setAttribute('style', 'background-color:#212F62;');
			document.querySelector('body').setAttribute('style', 'background-color:#212F62;');
			var user = getCookie('newData');
			console.log(JSON.stringify(user))
			this.getRebateMoneyByUser();
			this.getRebateCountByNowadays();
		},
		methods: {
			bake: function() {
				this.$router.go(-1); //根据浏览器记录返回上一次
			},
			// 返点数据
			//滚动
		 handleScroll:function (){
		 	var scrolltop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		 	  if(scrolltop>200){
		 		this.flag=true;
		 	}
		 	  else{
		 		this.flag=false;
		 	}
		 },
		 tranNumber:function(num, point) {
			let numStr = num.toString()
			// 十万以内直接返回
			if (numStr.length <= 7) {
				return numStr;
			}
			//大于8位数是亿
			else if (numStr.length > 11) {
				let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
				return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿';
			}
			//大于6位数是十万 (以10W分割 10W以下全部显示)
			else if (numStr.length > 7) {
				let decimal = numStr.substring(numStr.length - 7, numStr.length - 7 + point)
				return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万';
			}
		},
			getRebateMoneyByUser: function() {
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
				data = this.Encrypt({ ...data
				});
				console.log(data);
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getlotteryMoneyByUser',
						datas
					)
					.then(res => {
						console.log(JSON.stringify(res))
						if (res.data.content.code != 1000) {
							Toast("服务器连接失败,请稍后重试");
						} else {

							if (res.data.content.code == 1000) {
								this.moeny = res.data.content.data.toFixed(2);
							} else if (res.data.content.code == "201010") {
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
			getRebateCountByNowadays: function() {
				var datas = this.Qs.stringify({
					mid: OverallData().mid,
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getRebateCountByNowadays',
						datas
					)
					.then(res => {
						if (res.data.content.code != 1000) {
							Toast("服务器连接失败,请稍后重试");
						} else {

							if (res.data.content.code == 1000) {
								this.datas = res.data.content.data.toString();
							} else if (res.data.content.code == "201010") {
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
			goucai: function() {
				this.$router.push({
					name: 'goucai'
				})
			},
			
		}
	}
</script>
<style scoped>
	header {
		position: fixed !important;
		background-color: #FFFFFF;
	}

	.aui-bar-nav .aui-btn .aui-iconfont {
		color: #333333;
	}

	.aui-bar-nav .aui-title {
		color: #333333;
		font-weight: 500;
	}

	.bc_banner {
		width: 100%;
		margin-top: 3.3rem;
		background-image: url(../../assets/userinfo/betting_01.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: center 90%;

	}

	.bc_banner img {
		width: 100%;
		height: auto;
	}

	.bc_teltei {
		width: 100%;
		height: auto;
		margin-top: 0.5rem;
	}

	.bc_teltei img {
		display: block;
		width: 6.5rem;
		height: 1.05rem;
		margin: auto;
	}

	.bc_teltei div {
		width: 15.6rem;
		margin: auto;
		margin-top: 1.05rem;
		font-size: 0.65rem;
		font-weight: 400;
		line-height: 1.2rem;
		color: #FFFFFF;
		text-align: left;
	}

	.bc_content {
		width: 16.05rem;
		height: 25rem;
		margin: auto;
		margin-top: 1.25rem;
		background-image: url(../../assets/userinfo/betting_04.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: center center;
	}

	.bc_content_top {
		text-align: center;
		justify-content: center;
		align-items: center;
		color: #333333;
		padding-top: 1.8rem;
	}

	.bc_content_top span {
		display: inline-block;
		width: 1rem;
		height: 1.5rem;
		margin: 0 0.2rem;
		background-color: #213062;
		color: #FCDA5D;
		line-height: 1.5rem;
		font-size: 1.1rem;
		text-align: center;
		font-weight: bold;
	}

	.bc_fgx {
		margin: auto;
		width: 13.6rem;
		height: 0.05rem;
		background: rgba(252, 218, 93, 1);
		margin: 1.05rem auto;
	}

	.bc_content_bot {
		width: 13.6rem;
		height: auto;
		margin: auto;
		display: flex;
		align-items: center;
	}

	.bc_content_bot img {
		width: 1.5rem;
		height: 1.5rem;

	}

	.bc_content_bot .inset {
		width: 62%;
		padding-left: 2%;
	}

	.bc_content_bot .inset p:first-child {
		color: #333333;
		font-size: 0.7rem;
		font-weight: bold;
	}

	.bc_content_bot .inset p:last-child {
		color: #666666;
		font-size: 0.55rem;
		font-weight: 400;
	}

	.bc_content_bot .bot_right {
		width: 50%;
		font-size: 0.9rem;
		font-weight: bold;
		color: #FF676D;
		text-align: right;
	}

	.bc_content_list {
		width: 12.9rem;
		height: 11.7rem;
		margin: auto;
		margin-top: 5.5rem;
		position: relative;

	}

	.bc_content_list ul {
		width: 100%;
		height: auto;
		position: absolute;
		top: 0;
		left: 0;
	}

	.bc_content_list li {
		width: 100%;
		height: auto;
		display: flex;
		padding-bottom: 0.8rem;

	}

	.bc_content_list li img {
		width: 1.3rem;
		height: 1.3rem;
	}

	.bc_content_list li p:first-child {
		font-size: 0.75rem;
		color: #212F62;
		font-weight: bold;
		padding-bottom: 0.2rem;
	}

	.bc_content_list li p:last-child {
		font-size: 0.55rem;
		font-weight: 400;
		color: #666666;
	}

	.bc_content_list li div {
		padding-left: 0.5rem;
	}

	.scx {
		width: 2px;
		height: 7.8rem;
		position: absolute;
		top: 1rem;
		left: 0.65rem;
		background-color: #FFA700;
	}

	.btn_bottm {
          position: fixed;
          bottom: 0.5rem;
          left: 0;
            width: 100%;
            /*margin-top: 0.5rem;
            padding-bottom: 0.5rem;*/
        }

        .btn_bottm img {
            display: block;
            width: 17.25rem;
            height: 2.2rem;
            line-height: 2.2rem;
            text-align: center;
            margin: auto;
        }
        .btn_bottmjuli{
          height: 3rem;
          width: 100%;
        }
</style>
