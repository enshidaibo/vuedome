<template>
	<div>
		<header class="aui-bar aui-bar-nav aui-bar-light">
			<div class="aui-pull-left aui-btn">
				<span class="aui-iconfont aui-icon-left" @click="closeWin()"></span>
			</div>
			<div class="aui-title">赚取更多</div>
		</header>
		<div class="content_list">
			<ul>
				<li @click="userinfo_task_friend_real()">
					<div class="li_left">
						<img src="../../assets/task/more05.png" />
					</div>
					<div class="li_right">
						<p>好友实名</p>
						<p>好友实名认证赠送<span>5.88</span>红包</p>
						<!-- <p>首次累计充值满30元即<span>3元</span>现金</p> -->
					</div>
					<div class="right_fh"></div>
				</li>
				<li @click="userinfo_task_friends()">
					<div class="li_left">
						<img src="../../assets/task/more03.png" />
					</div>
					<div class="li_right">
						<p>好友充值</p>
						<p>好友充值送充值金额的<span>4%</span>的现金</p>
						<p>首次累计充值满30元即送<span>3元</span>现金</p>
						<!-- <p>累计好友充值888元赠送<span>8.88</span>现金</p> -->
					</div>
					<div class="right_fh"></div>
				</li>
				<li @click="userinfo_task_goucai()">
					<div class="li_left">
						<img src="../../assets/task/more04.png" />
					</div>
					<div class="li_right">
						<p>好友购彩</p>
						<p>直接好友购彩送投注金额<span>2%</span>现金</p>
						<p>间接好友购彩送投注金额<span>1%</span>现金</p>
					</div>
					<div class="right_fh"></div>
				</li>
			</ul>
			<h3 class="content_h3">每日分享</h3>
			<div class="btn_list">
				<div class="btn_list_bar">
					<div>
						<img src="../../assets/task/more02.png" />
						<p @click="shareWeb()">微信好友</p>
					</div>
					<div>
						<img src="../../assets/task/more01.png" />
						<p @click="shareWeb()">朋友圈</p>
					</div>
					<div>
						<img src="../../assets/task/more06.png" />
						<p class="btnurl" style="cursor: pointer" onclick="" :data-clipboard-text="lj_url">复制链接</p>
					</div>
				</div>
				<p>分享到微信好友、朋友圈、微博等社交平台</p>
			</div>
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
	var clipboard
	import {
		getCookie
	} from "../../js/common.js";
	import Clipboard from 'clipboard';
	import {
		Toast
	} from 'mint-ui';
	export default {
		data() {
			return {
				tipsList: [],
				shareStatue: false, //分享状态
				lj_url: '',
				WXshareStatue: false,
			}
		},
		
		created() {
			this.start();
		},
		mounted() {
			clipboard = new Clipboard('.btnurl', {
				target: function() {
					return this.lj_url;
				}
			});
			clipboard.on('success', function(e) {

				Toast("复制成功");
			});
			clipboard.on('error', function(e) {
				Toast("复制失败");
			});
			console.log(clipboard)
		},
		methods: {
			start: function() {
				let uid = getCookie('newData');
				if (!uid) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
				var userId = uid.sportId;
				this.lj_url = 'http://mi.facaime.com/yinliu/yinliu.html?_userId=' + userId;
			},
			 userinfo_task_friends: function() {
			        this.$router.push({
			            name: 'userinfo_task_friends'
			        })
			    
			},
			userinfo_task_goucai:function(){
				 this.$router.push({
				    name: 'userinfo_task_goucai'
				})
							    
			},
			userinfo_task_friend_real:function(){
				 this.$router.push({
				    name: 'userinfo_task_friend_real'
				})
							    
			},
			closeWin: function() {
				this.$router.go(-1);
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
		}
	}
</script>
<style scoped>
	@import "../../css/userinfo_task.css";

	header {
		position: fixed;
		top: 0;
	}

	.aui-bar-nav {
		top: 0;
		line-height: 2.25rem;
		background-color: #03a9f4;
		color: #ffffff;
	}

	.aui-bar-nav.aui-bar-light .aui-iconfont {
		color: #ffffff;
	}

	.content_list {
		width: 100%;
		min-height: 100vh;
		background-color: #f3f8fd;
		padding-top: 2.25rem;
	}

	.content_list ul {
		width: 100%;
		height: auto;
		padding: 0 2.5%;
	}

	.content_list ul li{
		width: 100%;
		display: flex;
    align-items: center;
		background:rgba(255,255,255,1);
        border-radius:0.2rem;
		box-shadow: 1px 1px 1px 1px #f3f8fd;
		margin-top: 4%;
		position: relative;
    padding: 5% 0;
	}
	.content_list .li_left{
		width: 25%;
		height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
	}
	.content_list .li_right{
		width: 75%;
		height: 100%;
	}
	.content_list .li_left img{
	  display: block;
		width: auto;
		height:2.6rem ;


	}

	.content_list .li_right>p:first-child{
    /*margin-top: 0.2rem;*/
		font-size:0.8rem;
		font-weight:500;
		color: #333333;
	}

  .content_list li:nth-child(2) .li_right>p:first-child{
    /*margin-top: 0.7rem;*/
  }

	.content_list .li_right>p:nth-child(2){
		font-size:0.5rem;
		font-weight:400;
		color: #666666;
	}
	.content_list .li_right>p:last-child{
		font-size:0.5rem;
		font-weight:400;
		color: #666666;
	}
	.content_list .li_right>p span{
		color: #FF2323;
	}

	.content_list .right_fh {
		position: absolute;
		width: 0.5rem;
		height: 0.7rem;
		background-image: url(../../assets/task/more07.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		right: 1rem;
		top: 1.95rem;
	}

	.content_h3 {
		width: 100%;
		height: auto;
		font-size: 0.65rem;
		line-height: 2.4rem;
		padding-left: 2.5%;
	}

	.btn_list {
		width: 95%;
		height: 7rem;
		background-color: #FFFFFF;
		margin: auto;
	}

	.btn_list .btn_list_bar {
		width: 100%;
		height: 5rem;
		display: flex;
	}

	.btn_list .btn_list_bar div {
		flex: 1;
	}

	.btn_list .btn_list_bar div img {
		width: auto;
		height: 2.25rem;
		margin: auto;
		margin-top: 1.05rem;
	}

	.btn_list .btn_list_bar div p {
		width: 3.2rem;
		height: 1.1rem;
		border: 1px solid rgba(0, 177, 254, 1);
		border-radius: 0.1rem;
		text-align: center;
		line-height: 1.1rem;
		font-size: 0.6rem;
		font-weight: 500;
		color: rgba(3, 169, 244, 1);
		margin: auto;
		margin-top: 0.6rem;
	}

	.btn_list p {
		font-size: 0.55rem;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		width: 100%;
		line-height: 2rem;
		text-align: center;
	}

	.btn_list button {
		width: 3.2rem;
		height: 1.1rem;
		border: 1px solid rgba(0, 177, 254, 1);
		border-radius: 0.1rem;
		text-align: center;
		line-height: 1.1rem;
		font-size: 0.6rem;
		font-weight: 500;
		color: rgba(3, 169, 244, 1);
		margin: auto;
		margin-top: 0.6rem;
		background-color: #FFFFFF;
	}
</style>
