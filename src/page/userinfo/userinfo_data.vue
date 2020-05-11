<template>
	<div>
		<nav-bar title="个人资料"></nav-bar>
		<div class="userinfo_data" id="userinfo_data">
			<div style="width:100%;height:0.5rem;"></div>
			<div class="myInfo">
				<div class="myPortrait">
					<img :src="img_url" width="100%" height="100%">
				</div>
				<div class="myId">
					{{userName}}
				</div>
			</div>
			<div style="width:100%;height:0.5rem;"></div>
			<div class="myDataList">
				<div class="li">
					<div class="left">
						手机号
					</div>
					<div class="value">
						{{mobile}}
					</div>
				</div>
				<div class="li" @click="impWxBind">
					<div class="left">
						微信绑定
					</div>
					<div class="value" :style="wxBind?'':'color: #FF8100'">
						{{wxBind?'已绑定':'未绑定'}}
					</div>
				</div>
				<div class="li" @click="impCentif">
					<div class="left">
						安全中心
					</div>
					<div class="value" :style="centification==1?'':'color: #FF8100'">
						{{centification==1?'已实名':'未实名'}}
					</div>
				</div>
				<div style="width:100%;height:0.5rem;"></div>
				<div class="li QR_code" @click="getInvitation">
					<div class="left">
						分享邀请码
					</div>
					<div class="value">
						<img src="../../../static/userinfo/erweima.png">
					</div>
				</div>
				<div class="li" @click="inputInvitation">
					<div class="left">
						邀请码
					</div>
					<div class="value">
						填写兑换码
					</div>
				</div>
				<!-- <div class="li">
                <div class="left">
                    兑换码
                </div>
                <div class="value">
                    填写兑换码
                </div>
            </div> -->
			</div>
			<div class="impWxPopup1" v-if="impWxPopup==1">
				<div class="cont">
					<div class="text">
						是否解绑微信？解绑后， 微信将不能登录
					</div>
					<div class="but">
						<div class="b1" @click="impBind">
							确定
						</div>
						<div class="b2" @click="impWxPopup=0">
							取消
						</div>
					</div>
				</div>
			</div>
			<div class="impWxPopup2" v-if="impWxPopup==2">
				<div class="cont">
					<div class="text">
						是否绑定微信？绑定后， 微信可直接登录
					</div>
					<div class="but">
						<div class="b1" @click="impWxPopup=0">
							取消
						</div>
						<div class="b2" @click="impBind">
							绑定
						</div>
					</div>
				</div>
			</div>
			<div v-if="QR_codePopup" class="share_box" @click="QR_codePopup=false">
				<div class="share_cont">
					<div class="quxiao">取消</div>
					<div class="down" @click="openDownload()">前往下载</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		Toast
	} from 'mint-ui';
	import {
		Indicator,
		MessageBox
	} from 'mint-ui';
	import {
		getCookie,
		setCookie,
		getSession,
		OverallData
	} from "../../js/common";
	export default {
		data() {
			return {
				wxBind: false,
				impWxPopup: 0,
				userName: '',
				mobile: '',
				img_url: require('../../assets/toux552.png'),
				centification: '',
				QR_img: '',
				QR_codePopup: false,
			}
		},

		created() {
			this.centification = !getSession('logok');
			this.safetyCenterUserInfo();
		},
		methods: {
			impWxBind: function() {
				if (this.wxBind) {
					this.impWxPopup = 1;
				} else {
					this.impWxPopup = 2;
				}
			},
			impBind: function() {
				this.impWxPopup = 0;
				if (this.wxBind) {
					this.jcwxdind();
				} else {
					this.thirdAccountBind();
				}
			},
			impCentif: function() {
				if (this.centification) {
					if (this.centification == 1) {
						this.$router.push({
							name: 'safety_center'
						})
					} else {
						this.$router.push({
							name: 'userinfo_task_real'
						})
					}
				}
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
			safetyCenterUserInfo: function() {
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
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/safetyCenterUserInfo',
						datas
					)
					.then(res => {
						var content = JSON.parse(res.data.content);
						// console.log(JSON.stringify(content));
						if (content.code == 100000) {
							this.userName = content.data.userName;
							this.mobile = content.data.mobile;
							this.wxBind = content.data.wxBind;
							if (getCookie("newData").headurl) {
								this.img_url = getCookie("newData").headurl;
							}
						} else if (content.code == "201010") {
							Toast("账户已被锁定，请联系客服");
							setCookie('newData', '', '0-S');
							this.$router.push({
								name: 'login'
							})
						} else {
							Toast("请检查网络连接！");
						}
						// this.img_url = $api.getStorage("newData").headurl;
					})
					.catch(err => {
						Toast("请检查网络连接！");
						console.log(err);
					})
			},
			jcwxdind: function() {
				var userId = getCookie('newData').userid;
				var data = [];
				data["userId"] = userId;
				data["category"] = "WX";
				data["openId"] = "";
				data["type"] = 2;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/thirdAccountBind',
						datas
					)
					.then(res => {
						console.log(JSON.stringify(res.data));
						if (res.data.status == 200) {
							var content = JSON.parse(res.data.content);
							if (content.code == 100000) {
								console.log(JSON.stringify(content));
								this.safetyCenterUserInfo();
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
			thirdAccountBind: function() {
				var ua = window.navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i) == 'micromessenger') {

				} else {
					MessageBox.alert('非微信环境，暂时无法绑定微信').then(action => {});
					return false;
				}
				var userId = getCookie('newData').userid;
				var data = [];
				data["userId"] = userId;
				data["category"] = "WX";
				data["openId"] = getCookie('newData').openid;
				data["type"] = 1;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/thirdAccountBind',
						datas
					)
					.then(res => {
						console.log(JSON.stringify(res.data));
						if (res.data.status == 200) {
							var content = JSON.parse(res.data.content);
							if (content.code == 100000) {
								console.log(JSON.stringify(content));
								this.safetyCenterUserInfo();
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
			getInvitation: function() {
				this.$router.push({
					name: 'userinfo_get_invitation'
				})
			},
			inputInvitation: function() {
				this.$router.push({
					name: 'userinfo_input_invitation'
				})
			}
		}
	}
</script>
<style scoped>
	@import "../../css/personal_data.css";

	.share_box {
		width: 100%;
		height: 100%;
		background: url(../../assets/goucai/sharepic1.png) 0 0 no-repeat;
		background-size: 100% 100%;
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
</style>
