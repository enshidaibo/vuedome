<template>
	<div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="closeWin()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">消息</div>
		</header>
		<section class="information_details">
			<div class="information_details_main" v-show="contentKg">
				<div class="title">
					{{ content.headline }}
				</div>
				<div class="content">
					<div class="top">
						{{ content.particularsHaed }}
					</div>
					<div class="pc">
						 <p>{{ content.particulars }}</p>
					</div>
					<div class="footer">
						<p class="p1">美奇彩运营团队</p>
						<p class="p2">{{ content.createTime|getTime() }}</p>
					</div>
				</div>
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
	export default {
		data() {
			return {
				userId: '',
				porId: '',
				content: {
					headline: '',
					particularsHaed: '',
					particulars: '',
					createTime: '',
					
				},
				contentKg:false,
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
			Indicator.open("加载中");
			this.getContent();
		},
		methods: {
			closeWin: function() {
				this.$router.go(-1);
			},
			getContent: function() {
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
								// console.log(this.contentKg);
								this.contentKg = true;
							} else {
								Toast(data.message);
							}
						}
						Indicator.close();
					})
					.catch(err => {
						console.log(err);
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
			}
		}
	}
</script>

<style scoped>
	header {
		position: fixed !important;
	}

	.information_details{
		padding-top: 2.25rem;
		background-color: #FFFFFF;
		min-height: 100vh;
	}
	.information_details_main{
		padding: 0 0.5rem;
		padding-top: 0.5rem;
	}
	.information_details_main .title{
		padding: 1rem 0;
		padding-left: 2.25rem;
		border-bottom: 1px solid #ECECEC;
		background-image: url(../../../../static/information/laba.png);
		background-repeat: no-repeat;
		background-position: left 50%;
		background-size: 1.4rem 1.4rem;
		font-size: 0.8rem;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: rgb(51,51,51);
		line-height: 1.125rem;
	}
	.information_details_main .content{
		width: 100%;
		height: auto;
		padding-top: 1.2rem;
	}
	.information_details_main .content .top{
		font-size: 0.7rem;
		font-family: PingFangSC;
		color: rgb(51,51,51);
		line-height: 1rem;
	}
	.information_details_main .content .pc{
		margin-top: 0.5rem;
	}
	.information_details_main .content .pc>p{
		font-size: 0.7rem;
		font-family: PingFangSC;
		color: rgb(136,136,136);
		line-height: 1.25rem;
	}
	.information_details_main .content .footer{
		margin-top: 1.3rem;
		text-align: right;
	}
	.information_details_main .content .footer>p{
		font-size: 0.7rem;
		font-family: PingFangSC;
		color: rgb(51,51,51);
		line-height: 1.4rem;
	}
	.information_details_main .content .footer .p2{
		font-size: 0.7rem;
		font-family: PingFangSC;
		color: rgb(136,136,136);
		line-height: 1.2rem;
	}
	
</style>
