<template>
	<div>

		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="bake()" tapmode>
				<span class="aui-iconfont aui-icon-left active"></span>
			</div>
			<div class="aui-title">邀请好友</div>
		</header>
		<div class="sf_banner">
			<img src="../../assets/userinfo/special_friends01.png" />
		</div>
		<div class="sf_tab ">
			<div class="sf_tab_left" @click="promotion_income()">
				<img src="../../assets/userinfo/special_friends05.png" />
				<div>
					<p>我的累计收益</p>
					<p><span>{{ promot.redEnvel.toFixed(2) }}</span><span>元</span></p>
				</div>
				<img src="../../assets/userinfo/special_friends10.png" />
			</div>
			<div class="sf_tab_left  sf_tab_right" @click="userinfo_task_friend_real()">
				<img src="../../assets/userinfo/special_friends06.png" />
				<div>
					<p>累计邀请好友</p>
					<p><span>{{ promot.friendCount }}</span><span>人</span></p>
				</div>
				<img src="../../assets/userinfo/special_friends10.png" />
			</div>
		</div>
		<div class="sf_imglist">
			<img src="../../assets/userinfo/special_friends02.png" />

		</div>
		<div class="sf_imglist">
			<img src="../../assets/userinfo/special_friends03.png" />

		</div>
		<div class="sf_imglist mbttm">
			<img src="../../assets/userinfo/special_friends04.png" />

		</div>
		<div class="sf_nav" v-if="flag">
			<div @click="shareWeb()">
				<img src="../../assets/userinfo/special_friends07.png" />
				<p>分享微信好友</p>
			</div>
			<div @click="shareWeb()">
				<img src="../../assets/userinfo/special_friends08.png" />
				<p>分享朋友圈</p>
			</div>
			<div>
				<img src="../../assets/userinfo/special_friends09.png" />
				<p class="btnurl" style="cursor: pointer"  :data-clipboard-text="lj_url">分享链接</p>
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
		var clipboard;
	import {
		Toast,
		Loadmore,
		Indicator,
		MessageBox,
		DatetimePicker
	} from 'mint-ui';
	// Vue.component(DatetimePicker.name, DatetimePicker);
	import Clipboard from 'clipboard';
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
				datas: '1234',
				shareStatue: false, //分享状态
				lj_url: '',
				WXshareStatue: false,
				promot: {
					redEnvel: 0,
					friendCount: 0
				},
				flag:false
			}
		},
		beforeDestroy() {
			document.querySelector('html').removeAttribute('style');
			document.querySelector('body').removeAttribute('style');
		},
		created() {
			window.addEventListener('scroll', this.handleScroll, true);
			document.querySelector('html').setAttribute('style', 'background-color:#F84215');
			document.querySelector('body').setAttribute('style', 'background-color:#F84215;');
			this.start();
			this.promotionIn();

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
			// 推广收益  人数
			promotionIn: function() {
				let newdata = getCookie('newData');
				if (!newdata) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
				let data = [];
				
				data['uid'] = newdata.userid;
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
			bake: function() {
				this.$router.go(-1); //根据浏览器记录返回上一次
			},
			handleScroll:function (){
				var scrolltop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
				  if(scrolltop>200){
					this.flag=true;
				}
				  else{
					this.flag=false;
				}
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
			promotion_income:function(){
				this.$router.push({
					name: 'myincome',
					query:{
                        pageId:0
                    }
				})
			},
			userinfo_task_friend_real:function(){
				this.$router.push({
					name: 'myfriend'
				})
			}
		}
	}
</script>
<style scoped>
	@import "../../css/userinfo_task.css";
	header {
		position: fixed !important;
		background-color: #FFFFFF;
	}

	.aui-bar-nav .aui-btn .aui-iconfont {
		color: #333333;
	}

	.aui-bar-nav .aui-title {
		color: #333333;
	}

	.sf_banner {
		width: 100%;
		height: auto;
		margin-top: 2.25rem;
	}

	.sf_banner img {
		width: 100%;
		height: auto;
	}

	.sf_tab {
		width: 100%;
		padding: 0.75rem 0;
		display: flex;
		background-color: #FFFFFF;
	}

	.sf_tab_left {
		width: 50%;
		display: flex;
		align-items: center;
		border-right: 1px #F5EFE1 solid;
	}

	.sf_tab_right {
		border: none;
	}

	.sf_tab_left img:first-child {
		width: 1.8rem;
		height: 1.8rem;
		margin: 0 0.6rem;
	}

	.sf_tab_left div:nth-child(2) {
		width: 59%;
	}

	.sf_tab_left img:last-child {
		width: 0.2rem;
		height: 0.4rem;
	}

	.sf_tab_left div:nth-child(2) p:first-child {
		font-size: 0.6rem;
		color: #6B3908;
	}

	.sf_tab_left div:nth-child(2) p:last-child {
		font-size: 0.55rem;
		color: #E70406;
	    display: flex;
	}

	.sf_tab_left div:nth-child(2) p:last-child span {
		display: inline-block;
		height: 1rem;
		line-height: normal;
		
	}
	.sf_tab_left div:nth-child(2) p:last-child span:last-child{
		padding-top: 0.14rem;
	
	}
.sf_tab_left div:nth-child(2) p:last-child span:first-child{
	font-size: 0.95rem;
	font-weight: bold;
}
	.sf_imglist {
		width: 100%;
		height: auto;
		padding-top: 1.25rem;
	}

	.sf_imglist img {
		width: 100%;
		height: auto;
	}
	.sf_nav {
		position: fixed;
		bottom: 0;
		left: 0;
		/* margin-top: 1.25rem; */
		width: 100%;
		padding:0.4rem 0 ;
		display: flex;
		text-align: center;
		background: linear-gradient(180deg, rgba(255, 182, 61, 1) 0%, rgba(254, 157, 51, 1) 100%);
	}
	.sf_nav div {
		width: 33.3333%;
		text-align: center;
	}

	.sf_nav img {
		display: block;
		margin: auto;
		width: 1.2rem;
		height: 1.2rem;
	}

	.sf_nav p {
		color: #FFFFFF;
		font-size: 0.5rem;
		padding-top: 0.2rem;
	}
	.mbttm{
		padding-bottom: 4rem;
	}
</style>
