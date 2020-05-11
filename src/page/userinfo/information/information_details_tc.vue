<template>
	<div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="closeWin()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">账单详情</div>
		</header>
		<section class="information_details_tc">
			<div class="content_1">
				<div class="icon" v-if="type==0">
					<img src="../../../../static/information/tx.png" width="100%" />
				</div>
				<div class="icon" v-else>
					<img src="../../../../static/information/cz.png" width="100%" />
				</div>
				<div class="name">{{ typeText }}成功</div>
				<div class="latbo">{{ typeText }}金额（元）</div>
				<div class="money">{{ (moneyData.money*1).toFixed(2) }}</div>
			</div>
			<div class="content_2">
				<div class="li li1">
					<div class="title">{{ typeText }}时间</div>
					<div class="time">{{ content.createTime|getTime() }}</div>
				</div>
				<div class="li li2">
					<div class="title">{{ typeText }}方式</div>
					<div class="mode" v-if="type == 2">{{ moneyData.BankName|getBankName() }}</div>
					<div class="mode" v-else>{{ moneyData.bankName }}</div>
				</div>
			</div>
			<div class="information_details_tc_but" @click="detailsJump">
				查看更多
			</div>
		</section>
	</div>
</template>

<script>
	import {
		getCookie,
		OverallData
	} from "../../../js/common";
	import {
		Toast,
		Indicator
	} from 'mint-ui';
	var allbanksz = [{
			name: "ccb",
			"text": "中国建设银行",
		},
		{
			name: "psbc",
			"text": "中国邮政储蓄",
		}, {
			name: "abc",
			"text": "中国农业银行",
		}, {
			name: "icbc",
			"text": "中国工商银行",
		}, {
			name: "boc",
			"text": "中国银行",
		}, {
			name: "cmbc",
			"text": "中国民生银行",
		}, {
			name: "cmb",
			"text": "招商银行",
		}, {
			name: "cib",
			"text": "兴业银行",
		}, {
			name: "bob",
			"text": "北京银行",
		}, {
			name: "comm",
			"text": "交通银行",
		}, {
			name: "ceb",
			"text": "中国光大银行",
		}, {
			name: "citic",
			"text": "中信银行",
		}, {
			name: "gdb",
			"text": "广发银行",
		}, {
			name: "sdb",
			"text": "深圳发展银行",
		}, {
			name: "hzb",
			"text": "杭州银行",
		}, {
			name: "bos",
			"text": "上海银行",
		}, {
			name: "pab",
			"text": "平安银行",
		}, {
			name: "bod",
			"text": "东莞银行",
		}, {
			name: "cbhb",
			"text": "渤海银行",
		}, {
			name: "czb",
			"text": "浙商银行",
		}, {
			name: "gzb",
			"text": "广州银行",
		}, {
			name: "hxb",
			"text": "华夏银行",
		}, {
			name: "spdb",
			"text": "浦发银行",
		}, {
			name: "bjrcb",
			"text": "北京农商银行",
		}
	];
	export default {
		data() {
			return {
				userId: '',
				porId: '',
				content: {
					headline: '',
					particularsHaed: '',
					particulars: '',
					createTime: '2019-01-01T00:00:00.000+0000'
				},
				typeText: '充值',
				type: 0,
				moneyData: {
					BankName: 'SDPAY',
					money: '0.00'
				}
			}
		},
		created() {
			
		},
		mounted() {
			var user = getCookie('newData');
			if (!user) {
				this.$router.push({
					name: 'login'
				})
				return false;
			}
			this.userId = user.userid;
			this.porId = this.$route.query.id;
			this.type = this.$route.query.type;
			this.getContent();
			if (this.type == 0) {
				this.typeText = '提现';
			} else {
				this.typeText = '充值';
			}
		},
		methods: {
			closeWin: function() {
				this.$router.go(-1);
			},
			getContent: function() {
				Indicator.open("加载中");
				var data = [];
				data["mid"] = OverallData().mid;
				data["uid"] = this.userId;
				data["yesOrNo"] = false;
				data["id"] = this.porId;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getUserMessageNotification',
						datas
					)
					.then(res => {
						if (res.data.status != 200) {
							Toast("服务器连接失败,请稍后重试");
						} else {
							var data = res.data.content;
							if (data.code == '1000') {
								this.content = data.data[0];
								this.moneyData = JSON.parse(data.data[0].content);
							} else {
								Toast(data.message);
							}
						}
						Indicator.close();
					})
					.catch(err => {
						console.log(err);
					})
			},
			detailsJump: function() {
				this.$router.push({
					name: 'userinfo_account_details'
				})
			}
		},
		filters: {
			getTime: function(matchDate) {
				var timeArr = matchDate.split('T');
                timeArr[0] = timeArr[0].replace(/-/g,"/");
                // var time = new Date(matchDate);
                // var y = time.getFullYear();
                // var m = time.getMonth() + 1 >= 10 ? parseInt(time.getMonth() + 1) : "0" + parseInt(time.getMonth() + 1);
                // var d = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
                // return y + '/' + m + '/' + d;
                return timeArr[0];
			},
			getBankName: function(bankname) {
				bankname = bankname.toLowerCase();
				for (let i = 0; i < allbanksz.length; i++) {
					if (bankname == allbanksz[i].name) {
						return allbanksz[i].text;
					}
				}
				if (bankname == 'sdpay') {
                    return '银联支付';
                }
				return '微信支付';
			}
		}
	}
</script>

<style scoped>
	header {
		position: fixed !important;
	}

	.information_details_tc {
		box-sizing: border-box;
		padding-top: 2.25rem;
		background-color: #EFF5FB;
		min-height: 100vh;
		overflow: hidden;
	}

	.information_details_tc .content_1 {
		width: 100%;
		background-color: #FFFFFF;
		padding-top: 2.725rem;
		padding-bottom: 2.35rem;
	}

	.information_details_tc .content_1 .icon {
		margin: auto;
		width: 3.75rem;
		height: 3.75rem;
	}

	.information_details_tc .content_1 .name {
		margin-top: 0.5rem;
		font-size: 0.9rem;
		font-family: PingFangSC-Medium;
		color: rgb(3, 169, 244);
		line-height: 1.25rem;
		font-weight: 500;
		text-align: center;
	}

	.information_details_tc .content_1 .latbo {
		margin-top: 0.2rem;
		font-size: 0.7rem;
		font-family: PingFangSC;
		color: rgb(163, 163, 163);
		line-height: 1rem;
		text-align: center;
	}

	.information_details_tc .content_1 .money {
		margin-top: 0.2rem;
		font-size: 1.8rem;
		font-family: PingFangSC-Medium;
		color: ##333333;
		line-height: 2.5rem;
		text-align: center;
		font-weight: 600;
	}

	.information_details_tc .content_2 {
		width: 100%;
		height: auto;
		margin-top: 0.5rem;
		background-color: #ffffff;
		padding: 0 0.5rem;
	}

	.information_details_tc .content_2 .li {
		width: 100%;
		height: 2.2rem;
	}

	.information_details_tc .content_2 .li .title {
		width: auto;
		height: 100%;
		float: left;
		font-size: 0.7rem;
		font-family: PingFangSC;
		color: rgb(137, 137, 137);
		line-height: 2.2rem;
	}

	.information_details_tc .content_2 .li1 {
		border-bottom: 1px solid #ECECEC;
	}

	.information_details_tc .content_2 .li1 .time {
		width: auto;
		height: 2.2rem;
		float: right;
		font-size: 0.7rem;
		font-family: PingFangSC-Regular;
		color: rgb(117, 117, 117);
		line-height: 2.2rem;
	}

	.information_details_tc .content_2 .li2 .mode {
		width: auto;
		height: 2.2rem;
		float: right;
		font-size: 0.7rem;
		font-family: PingFangSC-Regular;
		color: rgb(3, 169, 244);
		line-height: 2.2rem;
	}

	.information_details_tc .information_details_tc_but {
		margin: 2.3rem 0.5rem;
		height: 2.25rem;
		background-color: #03A9F4;
		border-radius: 0.27rem;
		font-size: 0.9rem;
		font-family: PingFangSC;
		color: rgb(252, 252, 252);
		line-height: 2.25rem;
		text-align: center;
	}
</style>
