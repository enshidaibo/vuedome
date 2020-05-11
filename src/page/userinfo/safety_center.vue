<template>
	<div>
		<nav-bar title="安全中心"></nav-bar>
		<div class="safety_center" id="safety_center">
			<div class="realInfo">
				<div class="top">实名信息</div>
				<ul class="list">
					<li>
						<div class="left">真实姓名</div>
						<div :class="['value',centification==2?'on':'']">{{centification==2?'未绑定':idCardName}}</div>
					</li>
					<li>
						<div class="left">身份证号码</div>
						<div :class="['value',centification==2?'on':'']">{{centification==2?'未绑定':idCard}}</div>
					</li>
				</ul>
				<div class="realAut" v-if="centification==2" @click="impCentif">实名认证</div>
			</div>
			<div class="bankInfo">
				<div class="top">银行卡信息</div>
				<div class="list" v-if="bankSteh">
					<ul v-for="(item,index) in bankList">
						<li>
							<div class="left">所属银行</div>
							<div class="value">{{contents[index]}}</div>
						</li>
						<li>
							<div class="left">银行卡号码</div>
							<div class="value">**** **** **** {{item.cardLastNum}}</div>
						</li>
					</ul>
					<div class="addBank" @click="addBank">添加银行卡</div>
				</div>
				<div class="list" v-else>
					<ul>
						<li>
							<div class="left">所属银行</div>
							<div class="value on">未绑定</div>
						</li>
						<li>
							<div class="left">银行卡号码</div>
							<div class="value on">未绑定</div>
						</li>
					</ul>
					<div class="addBank" @click="addBank">添加银行卡</div>
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
				userId: '',
				idCardName: '',
				idCard: '',
				bankSteh: false,
				centification: '',
				bankList: [],
				contents: [],
				allbanksz: [{
						name: "ccb",
						obj: {
							"text": "中国建设银行",
							"short": "建行"
						}
					},
					{
						name: "ccb",
						obj: {
							"text": "中国邮政储蓄",
							"short": "邮政"
						}
					}, {
						name: "abc",
						obj: {
							"text": "中国农业银行",
							"short": "农行"
						}
					}, {
						name: "icbc",
						obj: {
							"text": "中国工商银行",
							"short": "工商"
						}
					}, {
						name: "boc",
						obj: {
							"text": "中国银行",
							"short": "中行"
						}
					}, {
						name: "cmbc",
						obj: {
							"text": "中国民生银行",
							"short": "民生"
						}
					}, {
						name: "cmb",
						obj: {
							"text": "招商银行",
							"short": "招商"
						}
					}, {
						name: "cib",
						obj: {
							"text": "兴业银行",
							"short": "兴业"
						}
					}, {
						name: "bob",
						obj: {
							"text": "北京银行",
							"short": "北京"
						}
					}, {
						name: "comm",
						obj: {
							"text": "交通银行",
							"short": "交通"
						}
					}, {
						name: "ceb",
						obj: {
							"text": "中国光大银行",
							"short": "光大"
						}
					}, {
						name: "citic",
						obj: {
							"text": "中信银行",
							"short": "中信"
						}
					}, {
						name: "gdb",
						obj: {
							"text": "广发银行",
							"short": "广发"
						}
					}, {
						name: "sdb",
						obj: {
							"text": "深圳发展银行",
							"short": "深发"
						}
					}, {
						name: "hzb",
						obj: {
							"text": "杭州银行",
							"short": "杭州"
						}
					}, {
						name: "bos",
						obj: {
							"text": "上海银行",
							"short": "上海"
						}
					}, {
						name: "pab",
						obj: {
							"text": "平安银行",
							"short": "平安"
						}
					}, {
						name: "bod",
						obj: {
							"text": "东莞银行",
							"short": "东莞"
						}
					}, {
						name: "cbhb",
						obj: {
							"text": "渤海银行",
							"short": "渤海"
						}
					}, {
						name: "czb",
						obj: {
							"text": "浙商银行",
							"short": "浙商"
						}
					}, {
						name: "gzb",
						obj: {
							"text": "广州银行",
							"short": "广州"
						}
					}, {
						name: "hxb",
						obj: {
							"text": "华夏银行",
							"short": "华夏"
						}
					}, {
						name: "spdb",
						obj: {
							"text": "浦发银行",
							"short": "浦发"
						}
					}, {
						name: "bjrcb",
						obj: {
							"text": "北京农商银行",
							"short": "农商"
						}
					}
				]
			}
		},
		created() {
			let uid = getCookie('newData');
			if (!uid) {
				this.$router.push({
					name: 'login'
				})
				return false;
			}
			this.userId = uid.userid;
			Indicator.open('加载中');
			this.centification = !getSession('logok');
			this.safetyCenterUserInfo();
			this.getbanks();
			Indicator.close();
		},
		methods: {
			safetyCenterUserInfo: function() {
				var data = [];
				data["userId"] = this.userId;
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
						if (content.code == 100000) {
							this.idCardName = content.data.idCardName;
							this.idCard = content.data.idCard;
							this.bankSteh = content.data.bank;
						} else if (content.code == "201010") {
							Toast("账户已被锁定，请联系客服");
							setCookie('newData', '', '0-S');
							this.$router.push({
								name: 'login'
							})
						} else {
							Toast("请检查网络连接！");
						}
					})
					.catch(err => {
						Toast("请检查网络连接！");
						console.log(err);
					})
			},
			getbanks: function() {
				var data = [];
				data["userId"] = this.userId;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});

				this.$ajax.post('/caipiaoshouye/index.php/home/index/getBanks',
						datas
					)
					.then(res => {
						if (res.data.status == 200) {
							var content = JSON.parse(res.data.content);
							if (content.code == 100000) {
								console.log(JSON.stringify(content));
								if (content.data.length > 0) {
									this.bankList = content.data;
									this.contents = this.allcardulilstobg(content.data);
								}
							} else {
								Toast(content.message)
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
			addBank: function() {
				if (this.centification == 2) {
					this.$router.push({
						name: 'userinfo_task_real'
					})
				} else {
					this.$router.push({
						name: 'userinfo_addbank'
					})
				}
			},
			allcardulilstobg: function(data) {
				var alllist = [];
				for (var i = 0; i < data.length; i++) {
					var name = this.GetNameFormBank(data[i].bankName);
					alllist.push(name);
				}
				console.log(alllist);
				return alllist;
			},
			GetNameFormBank: function(name) {

				for (var i = 0; i < this.allbanksz.length; i++) {
					if (name == this.allbanksz[i].name) {
						return this.allbanksz[i].obj.text;
					}
				}
			}
		},
	}
</script>

<style>
	@import "../../css/personal_data.css";
</style>
