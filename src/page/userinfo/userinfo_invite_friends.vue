<template>
	<div class="invite">
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="closeWin()" tapmode>
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">邀友充值</div>
		</header>
		<div class="main">
			<div class="mainBtn">
				<img src="../../assets/task/invite_btn.png" alt=""  @click="gotypename">
			</div>
			<div class="mainTitle">
				<h4>活动说明</h4>
				<p>邀请好友-好友充值后赠送您充值金额的30%现金，最高赠送300元</p>
				<p>用户充值-用户首次充值赠送充值金额的10%现金，最高赠送888元</p>
				<span @click="Gorecharge">多充多送  查看更多充值优惠</span>				
			</div>
			<div class="boxa"></div>
		</div>
		<div v-if="WXshareStatue" class="WXshare_box" id="share_box" @click="WXhideShare"></div>
		<div v-if="shareStatue" class="share_box" @click="hideShare()">
			<div class="share_cont">
				<div class="quxiao">取消</div>
				<div class="down" @click="openDownload()">前往下载</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		getCookie,
		OverallData
	} from "../../js/common.js"
	import {
		Toast
	} from 'mint-ui';
	var ms
	var _userId
	export default {
		data() {
			return {
				WXshareStatue: false,
				shareStatue:false
			}
		},
		created() {
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
			Gorecharge:function(){
				this.$router.push({
					name: 'userinfo_recharge_preferential'
				})
			},
			gotypename:function(){
				this.shareWeb();
			},
			shareWeb: function() {
				var ua = window.navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i) == 'micromessenger') { //判断是否为微信浏览器
					this.WXshareStatue = true;
				} else {
					this.shareStatue = true;
				}
			},
			WXhideShare: function() {
				this.WXshareStatue = false;
			},
			hideShare: function() {
				this.shareStatue = false;
			},
			openDownload: function() { //前往下载
				var newData = getCookie('newData');
				var link = OverallData().download
				if (newData) {
					window.open(link + '?_userId=' + newData.sportId);
				} else {
					window.open(link);
				}
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
		color: #333 ;
	}

	.aui-title {
		color: #333;
	}

	.main {
		margin-top: 2.25rem;
		min-height: calc(100vh - 2.25rem);
		background: url(../../assets/task/invite_header.jpg) no-repeat;
		background-size: 100% 100%;
	}
	
	.mainBtn {
		padding-top: 130%;
	}
	
	.mainBtn img{
		width: 100%;
	}
	
	.mainTitle {
		height: 6.95rema;
		margin: 0 0.7rem;
		padding: 0.65rem 1.125rem;
		border: 0.05rem solid #FFE8BD;
		border-radius: 0.5rem;
		font-size: 0;
	}
	
	.mainTitle h4 {
		color: #FFE8BD;
		font-size: 0.65rem;
		margin-bottom: 0.725rem;
	}
	
	.mainTitle p {
		color: #FFE8BD;
		font-size: 0.55rem;
		margin-bottom: 0.6rem;
	}
	
	.mainTitle span {
		color: #FFE8BD;
		font-size: 0.55rem;
		border-bottom: 1px solid #FFE8BD;
	}
	
	.boxa {
		height: 0.85rem;
	}
	
	/* 微信分享 */
	.WXshare_box {
	    width: 100%;
	    height: 100%;
	    background: url(../../assets/task/sharepic.png)0 0 no-repeat;
	    background-size: 100% 100%;
	    z-index: 1000;
	    position: fixed;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	}
	
	
	/* 浏览器分享 */
	.share_box {
	    width: 100%;
	    height: 100%;
	    background: url(../../assets/goucai/sharepic1.png) 0 0 no-repeat;
	    background-size: 100% auto;
	    z-index: 99999;
	    position: fixed;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    background-color: rgba(0, 0, 0, 0.8);
	    font-family: "微软雅黑", "黑体";
	}
	
	.share_box .share_cont {
	    position: fixed;
	    bottom: 0.6rem;
	    width: 100%;
	    display: flex;
	}
	
	.share_box .quxiao {
	    background-color: #fb6b63;
	    width: 42.5%;
	    height: 2rem;
	    line-height: 2rem;
	    color: #fff;
	    text-align: center;
	    font-size: 0.75rem;
	    margin-left: 5%;
	    border-radius: 0.3rem;
	}
	
	.share_box .down {
	    background-color: #f5a623;
	    width: 42.5%;
	    height: 2rem;
	    line-height: 2rem;
	    text-align: center;
	    color: #fff;
	    font-size: 0.75rem;
	    margin-left: 5%;
	    border-radius: 0.3rem;
	}
	
	/* 分享end */
	

</style>
