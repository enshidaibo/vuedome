<template>
	<div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="bake()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">充值详情</div>
		</header>
		<section>
			<div class="body-header">
				<img src="../../assets/recharge/rechargeSc.png" />
			</div>
			<div class="p1">{{mssg}}</div>
			<div class="p2">充值金额（元）</div>
			<div class="p3">+{{(recharge*1.05)|numberFormat}}</div>
			<div class="Btn" @click="bake()">完成</div>
		</section>
	</div>
</template>
<script>
	export default {
		data() {
			return {
               recharge:0.00,
			   mssg:'充值成功',
			   cardBind: '-1',
			   closeRout: false,
			}
		},
		beforeRouteLeave (to, from , next) {
			console.log(this.closeRout);
			if (this.closeRout) {
				next();
				return false;
			}
			this.closeRout = true;
			if (this.cardBind == '0') {
				this.$router.go(-2);
			} else{
				this.$router.go(-3);
			}
		},
		created() {
			this.recharge=this.$route.query.money;
			this.mssg=this.$route.query.message;
			this.cardBind=this.$route.query.cardBind;
			console.log(this.cardBind);
		},
		methods: {
			bake: function() {
				this.closeRout = true;
				if (this.cardBind == '0') {
					this.$router.go(-2);
				} else{
					this.$router.go(-3);
				}
			}
		},
		filters: {
			numberFormat: function(number) {
				var data = Math.floor(number * 100) / 100;
				return data.toFixed(2);
			}
		}
	}
</script>
<style scoped>
	.body-header{
		margin-top: 3.6rem;
	}
	.body-header img{
		width: 4.6rem;
		height: auto;
		margin: auto;
	}
	.p1{
		margin-top: 0.6rem;
		font-size: 1.1rem;
		font-weight: 550;
		color: #3F3F3F;
		line-height: 1.6rem;
		text-align: center;
	}
	.p2{
		font-size: 0.76rem;
		color: #A3A3A3;
		line-height: 1.9rem;
		text-align: center;
	}
	.p3{
		font-family: PingFangSC-Medium;
		font-size: 1.6rem;
		font-weight: 550;
		color: #DF191E;
		line-height: 2rem;
		text-align: center;
	}
	.Btn{
		width: 90%;
		height: 2.45rem;
		margin: 0.9rem auto;
		margin-top: 1.5rem;
		line-height: 2.45rem;
		text-align: center;
		font-size: 0.9rem;
		color: #fff;
		background-color: #43A4F1;
		border-radius: 0.35rem;
	}
</style>
