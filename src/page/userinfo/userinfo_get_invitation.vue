<template>
	<div>
		<nav-bar title="分享邀请码"></nav-bar>
		<section class="get_invitation" id="get_invitation">
			<div class="main">
				<div class="invitation-numder">
					{{ numder }}
				</div>
				<div class="invitation-butt" id="codeBtn" @click="" :data-clipboard-text="numder">
					复制
				</div>
				<div class="invitation-QR">
					<img :src="QR_img" width="100%" height="100%">
				</div>
				<div class="invitation-text">
					<p class="p1">扫码下载APP</p>
					<p class="p2">每成功邀请一位好友实名即可获得2.88元红包，且送1次抽奖机会</p>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	var clipboard;
	import Clipboard from 'clipboard';
	import {
		getCookie
	} from "../../js/common.js";
	import {
		Toast
	} from 'mint-ui';
	export default {
		data() {
			return {
				userId: '',
				numder: '',
				QR_img: require('../../../static/no_picture.jpg')
			};
		},
		mounted() {
			let uid = getCookie('newData');
			if (!uid) {
				this.$router.push({
					name: 'login'
				})
				return false;
			}
			this.userId = uid.userid;
			this.getInvitNum();
			this.my2imgboxfun();
			
			clipboard = new Clipboard('#codeBtn', {
				target: function() {
					return this.numder;
				}
			});
			clipboard.on('success', function(e) {
				Toast("复制成功");
			});
			clipboard.on('error', function(e) {
				Toast("复制失败");
			});
		},
		methods: {
			getInvitNum: function() {
				var data = [];
				data["encryId"] = this.userId;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getEncryption',
						datas
					)
					.then(res => {
						if (res.data.status == 200) {
							if (res.data.content.code == '1000') {
								this.numder = res.data.content.obj.enctyIdEnd;
							} else {
								Toast(res.data.content.message);
							}
						} else {
							Toast("服务器异常，请稍后重试！");
						}
					})
					.catch(err => {
						Toast("请检查网络连接！");
						console.log(err);
					})
			},
			my2imgboxfun: function() {
				var data = [];
				data["uid"] = this.userId;
				data["url"] = "index";
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.get('/caipiaoshouye/index.php/home/index/Shareqrcode?uid='+this.userId+'&url=index')
					.then(res => {
						console.log(res.data);
						if (res.data.status == 1) {
							this.QR_img = res.data.url;
						}
					})
					.catch(err => {
						Toast("请检查网络连接！");
					})
			},
		}
	}
</script>

<style scoped>
	@import "../../css/invitation_numder.css";
</style>
