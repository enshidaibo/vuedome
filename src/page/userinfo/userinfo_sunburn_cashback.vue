<template>
	<div class="cashback">
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="closeWin()" tapmode>
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">晒单返现</div>
		</header>
		<div class="main">
			<div class="mainHeader">
				<img src="../../assets/task/cashback_header.png" alt="">
			</div>
			<div class="mainConent">
				<div class="conentLeft">
					<h4>{{(wsd*1).toFixed(2)}}</h4>
					<span>未晒单</span>
					<p>您晒单后能获得的红包</p>
				</div>
				<img src="../../assets/task/cashback_right.png" alt="" class="img1">
				<div class="conentRight">
					<h4>{{(ysd*1).toFixed(2)}}</h4>
					<span>已晒单</span>
					<p>您已获的晒单红包</p>
				</div>
				<img src="../../assets/task/cashback_btn.png" alt="" class="img2" @click="gotypename()">
				<div class="conentP">
					<img src="../../assets/task/cashback_title.png" alt="" class="img3">
					<div>
						<img src="../../assets/task/cashback_rule.png" alt="">
						<p>晒单即送投注金额<span>5%</span>的红包</p>
					</div>
					<div>
						<img src="../../assets/task/cashback_rule.png" alt="">
						<p>无论是现金投注、红包投注都可领红包,所有彩种都参与晒单送红包活动</p>
					</div>
					<div>
						<img src="../../assets/task/cashback_rule.png" alt="">
						<p>送的红包进入红包余额可直接用于投注</p>
					</div>
					<div>
						<img src="../../assets/task/cashback_rule.png" alt="">
						<p>通过您分享的链接进行下载注册的用户将会成为您的好友，好友进行实名、充值、购彩等动作，您都会得到相应的奖励</p>
					</div>
				</div>
			</div>
			<div class="mainFooter">
				<p>本次活动最终解释权归平台所有</p>
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
				ysd: 10.88,
				wsd: 0,
				money: 0,
				username: "13848424350"
			}
		},
		created() {
			this.getDryingListHbMoney();
		},
		mounted() {

		},
		methods: {
			closeWin: function() {
				this.$router.go(-1);
			},
			gotypename: function() {
				this.$router.push({
					name: 'userinfo_task_sunburn'
				})
			},
			//已晒单累计总额，未晒单累计总额
			getDryingListHbMoney: function() { 
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
			    this.$ajax.post('/caipiaoshouye/index.php/home/index/getDryingListHbMoney',
			           datas
			        )
			        .then(res => {
						console.log(res)
			            if (res.data.status == 200) {
			                var content = res.data.content;
			                console.log(content)
			                if (content.code == 1000) {
			                    var data = content.obj;
								this.ysd=data.isSharedMoney;
								this.wsd=data.notSharedMoney;
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
	.cashback {
		background:linear-gradient(0deg,rgba(255,186,85,1),rgba(255,185,58,1));
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
	
	.mainConent {
		margin: 0 0.625rem;
		height: 26.425rem;
		background: url(../../assets/task/cashback_kuang.png) no-repeat;
		background-size: 100% 100%;
		position: relative;
		margin-top: -2rem;
	}
	
	.mainConent .img1 {
		width: 0.95rem;
		height: 0.85rem;
		position: absolute;
		top: 5.5rem;
		left: 50%;
		margin-left: -0.4525rem;
	}
	
	.mainConent div {
	}
	
	.mainConent .conentLeft {
		width: 6.375rem;
		height: 6.475rem;
		background: url(../../assets/task/cashback_sunburn.png) no-repeat;
		background-size: 100%;
		display: inline-block;
		margin-top: 1.65rem;
		padding: 0 0.45rem;
		padding-top: 1.5rem;
		text-align: center;
		margin-left: 1.1rem;
	}
	
	.conentLeft p{
      padding: 0 0.6rem;
    }
	
	.mainConent .conentRight {
		width: 6.375rem;
		height: 6.475rem;
		background: url(../../assets/task/cashback_sunburn.png) no-repeat;
		background-size: 100%;
		display: inline-block;
		margin-top: 1.65rem;
		text-align: center;
		float: right;
		margin-right: 1.1rem;
		padding: 0 0.45rem;
		padding-top: 1.5rem;
	}
	
	.conentRight p {
		padding: 0 1rem;
	}
	
	.mainConent h4 {
		font-size: 1.25rem;
		color: #F19A25;
		font-weight: bold;
	}
	
	.conentRight h4 {
		color: #FA181D;
	}
	
	.mainConent p {
		font-size: 0.75rem;
		color: #FFFFFF;
		line-height: 1rem;
		opacity: 0.7;
	}
	
	.mainConent span {
		font-size: 0.6rem;
		color: #F19A25;
	}
	
	.mainConent .conentP {
		margin: 0 1.575rem;
		margin-top: 3.125rem;
	}
	
	.mainConent .img2 {
		width: 11.5rem;
		height: 2.15rem;
		margin: 0 auto;
		margin-top: 1.25rem;
	}
	
	.mainConent .img3 {
		width: 8.375rem;
		height: 0.95rem;
		margin: 0 auto;
		margin-bottom: 1rem;
	}
	
	.conentP div {
		font-size: 0;
	}
	
	.conentP p {
		font-size: 0.65rem;
		color: #723B06;
		width: 95%;
		display: inline-block;
		margin-bottom: 0.575rem;
	}
	
	.conentP span {
		color: #F3534C;
	}
	
	.conentP div img {
		width: 0.25rem;
		height: 0.25rem;
		margin-top: 0.3rem;
		margin-right: 0.2rem;
		float: left;
	}
	
	.mainFooter {
		text-align: center;
	}
	
	.mainFooter p {
		font-size: 0.5rem;
		color: #C57500;
		line-height: 1.5rem;
	}
	
	


</style>
