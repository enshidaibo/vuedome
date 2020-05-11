<template>
	<div>
		<nav-bar title="邀请码"></nav-bar>
		<section class="input_invitation" id="input_invitation">
			<div class="top">
				<img src="../../../static/userinfo/input_invitation_title.png" width="100%" height="auto">
			</div>
			<div class="main">
				<div class="input">
					<input type="text" v-model="encry" placeholder="填写好友给您的邀请码">
					<!-- <p>注：邀请码只能通过代理或特殊活动获得</p> -->
				</div>
				<div class="qs"></div>
				<div class="butt" @click="sixmi">
					兑换
				</div>
				<div class="explain-title">
					邀请说明
				</div>
				<div class="explain-ul">
					<div class="h1">
						直接好友
					</div>
					<div class="explain-li">
						<p>好友注册实名后送<span>2.88元</span>红包，且送<span>1次</span>抽奖机会</p>
					</div>
					<!-- <div class="explain-li">
						<p>好友首次累计充值满30元即送<span>3元</span>现金</p>
					</div> -->
					<div class="explain-li">
						<p>好友首次充值，您即可获得充值金额的<span>30%</span>，最高可获得<span>300元</span>现金。以后每次充值可获得充值金额<span>4%</span>现金</p>
					</div>
					<div class="explain-li">
						<p>好友现金投注即返投注金额<span>2%</span>的现金</p>
					</div>
				</div>
				<div class="explain-ul">
					<div class="h1">
						间接好友
					</div>
					<div class="explain-li">
						<p>好友现金投注即返投注金额<span>1%</span>的现金</p>
					</div>
				</div>
				<div class="money-icon">
					<img src="../../../static/userinfo/input_invitation_moy.png" width="100%" height="100%">
				</div>
			</div>
		</section>
	</div>
</template>

<script>
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
				encry: ''
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
		},
		methods: {
			estaRelat: function(res) {
				if (res == this.userId) {
					Toast('请输入他人的邀请码');
					return false;
				}
				var data = [];
				data["userId"] = this.userId;
				data["shareId"] = res;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/bindShareUser',
						datas
					)
					.then(res => {
						if (res.data.status == 200) {
							var data = JSON.parse(res.data.content);
							if (data.code == 100000) {
								Toast("兑换成功");
								this.downloadLoginLogsave(datas, data)
							} else {
								Toast(data.message);
							}
						} else {
							Toast("兑换失败");
						}
					})
					.catch(err => {
						Toast("请检查网络连接！");
						console.log(err);
					})
			},
			sixmi: function() {
				var sn = this.encry;
				if (sn == '') {
					Toast('请输入邀请码');
					return false;
				}
				var r = ['q', 'w', 'e', '8', 's', '2', 'd', 'z', 'x', '9', 'c', '7', 'p', '5', 'k', '3', 'm', 'j', 'u', 'f', 'r',
					'4', 'v', 'y', 't', 'n', '6', 'b', 'g', 'h'
				];
				var res;
				var b = 'a';
				var binLen = r.length;
				var chs = sn.toLowerCase();
				for (var i = 0; i < chs.length; i++) {
					var ind = 0;
					for (var j = 0; j < binLen; j++) {
						if (chs[i] == r[j]) {
							ind = j;
							break;
						}
					}
					if (chs[i] == b) {
						break;
					}
					if (i > 0) {
						res = res * binLen + ind;
					} else {
						res = ind;
					}
				}
				this.estaRelat(res);
			},
			downloadLoginLogsave: function(dataM, callback) {
				let uid = getCookie('newData');
				var tel = uid.tel;
				var affd = '';
				var superior = '';
				// var Ip='';
				var phoneType = '';
				var phoneSystem = '';

				// Ip=localStorage.getItem('Ip')//IP
				phoneType = localStorage.getItem('model') //手机型号
				phoneSystem = localStorage.getItem('os') //系统版本
				if (getCookie('_userId')) {
					affd = getCookie('_userId');
					superior = 'user';
				}
				if (getCookie('_aff_id')) {
					affd = getCookie('_aff_id');
					superior = 'aff';
				}
				var data = [];
				data["phoneNumber"] = tel; //手机号
				data["ip"] = '';
				data["phoneType"] = phoneType; //手机型号
				data["phoneSystem"] = phoneSystem; //系统类型
				data["upId"] = affd;
				data["operation"] = 4;
				data["mobaltype"] = 'h5';
				data["superior"] = superior;
				data["datas"] = dataM;
				data["callback"] = callback;
				console.log(data)
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/downloadLoginLogsave',
						datas
					)
					.then(res => {
						var content = res.data.content;
						console.log(content);
					})
			},
		},
	}
</script>

<style>
	@import "../../css/invitation_numder.css";
</style>
