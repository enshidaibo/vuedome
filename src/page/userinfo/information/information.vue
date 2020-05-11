<template>
	<div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="closeWin()" tapmode>
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">消息</div>
		</header>
		<section class="information_main">
			<div class="main_list">
				<div class="li l1" @click="listJump(1)">
					<p :class="content.system!=0?'p1 lineheight':'p1'">系统通知</p>
					<p class="p2" v-if="content.system==0">暂时还没有最新消息</p>
					<div class="li_tips" v-else>{{ content.system <100?content.system:'99+' }}</div>
				</div>
				<div class="li l2" @click="listJump(2)">
					<p :class="content.user!=0?'p1 lineheight':'p1'">用户</p>
					<p class="p2" v-if="content.user==0">暂时还没有最新消息</p>
					<div class="li_tips" v-else>{{ content.user <100?content.user:'99+' }}</div>
				</div>
				<div class="li l3" @click="listJump(3)">
					<p :class="content.friend!=0?'p1 lineheight':'p1'">好友</p>
					<p class="p2" v-if="content.friend==0">暂时还没有最新消息</p>
					<div class="li_tips" v-else>{{ content.friend <100?content.friend:'99+' }}</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import {
	    getCookie,
		OverallData,
	} from "../../../js/common";
	import {
		Toast,
		Indicator
	} from 'mint-ui';
	export default {
	    data() {
	        return {
	            userId: '',
				content: {
					friend: 0,
					system: 0,
					user: 0
				}
	        };
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
			console.log(user)
			this.userId = user.userid;
			Indicator.open("加载中");
			this.onLoading();
		},
		methods: {
			closeWin: function() {
			    this.$router.go(-1);
			},
			onLoading: function() {
				console.log(this.userId);
				var data = [];
				data["mid"] = OverallData().mid;
				data["uid"] = this.userId;
				data["yesOrNo"] = true;
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
				            console.log(data);
				            if (data.code == '1000') {
								this.content = JSON.parse(JSON.stringify(data.data));
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
			listJump: function(index) {
				if (index == 1) {
					this.$router.push({
					    name: 'information_system_list'
					})
				} else if (index == 2) {
					this.$router.push({
					    name: 'information_user_list'
					})
				} else{
					this.$router.push({
					    name: 'information_friend_list'
					})
				}
				
			}
		}
	}
</script>

<style scoped>
	header {
	    position: fixed !important;
	}
	.lineheight{
	  line-height: 1.7rem !important;
	}
	.information_main{
		padding-top: 2.25rem;
		background-color: #EFF5FB;
		min-height: 100vh;
	}
	.information_main .main_list{
		width: 100%;
		height: auto;
		background-color: #fff;
		padding: 0 0 0 0.5rem;
	}
	.information_main .main_list .li{
		width: 100%;
		height: 3rem;
		border-bottom: 1px solid #EDEDED;
		background-repeat: no-repeat,no-repeat;
		background-position: left 50%, 97% 50%;
		background-size: 2rem auto, 0.35rem auto;
		padding-left: 2.5rem;
		padding-top: 0.7rem;
		position: relative;
	}
	.information_main .main_list .l1{
		background-image: url(../../../../static/information/xttz.png), url(../../../../static/information/arrow.png);
	}
	.information_main .main_list .l2{
		background-image: url(../../../../static/information/yh.png), url(../../../../static/information/arrow.png);
	}
	.information_main .main_list .l3{
		background-image: url(../../../../static/information/hy.png), url(../../../../static/information/arrow.png);
	}
	.information_main .main_list .li .p1{
		font-size:0.75rem;
		font-family: PingFangSC;
		color: rgb(51,51,51);
		line-height: 1.05rem;
	}
	.information_main .main_list .li .p2{
		font-size: 0.5rem;
		font-family: PingFangSC-Regular;
		color: rgb(177,177,177);
		line-height: 0.8rem;
	}
	.information_main .li_tips{
		min-width: 0.875rem;
		height: 0.875rem;
		background-color: #F9455B;
		border-radius: 0.438rem;
		position: absolute;
		top: 50%;
		right: 1.5rem;
		margin-top: -0.438rem;
		font-size: 0.4rem;
		font-family: PingFangSC;
		color: rgb(255,255,255);
		line-height: 0.875rem;
		text-align: center;
	}
	
</style>
