<template>
	<div v-if="logoks">
		<div class="hbbox" v-if="logoks">
			<div class="renzcont">
				<div class="hbcont">
					<div class="forlist">
						<img src="../assets/hbwenhao3.png" />
						<p>现金投注即返投注金额的<i>20%</i>，红包投注不参与返现</p>
					</div>
					<div class="forlist">
						<img src="../assets/hbwenhao4.png" />
						<p>当返现金额大于红包余额时，实际到账的金额为当前红包余额</p>
					</div>
					<div class="forlist">
						<img src="../assets/hbwenhao5.png" />
						<p>返现金额以实际到账金额为准</p>
					</div>
					<div class="btn">
					<img @click="logokbtn1" src="../assets/hbwenhao1.png" />
					</div>
				</div>
				<div class="qux_btn" @click="logokbtn2()"><img src="../assets/quxiao.png" alt=""></div>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		getSession
	} from '../js/common.js';
	export default {
		props: ['hongbaogz'], //声明接收父组件参数
		data() {
			return {
				logoks: false, //未实名标志
			}
		},
		created() {},
		methods: {
			logokbtn1: function() { //前往实名
				this.logoks = false;
				this.$emit('hongbaogz', this.logoks); //触发showbox方法，this.logoks为向父组件传递的数据
			this.$router.push({
				name: 'userinfo_hongbao_rule',
			})
			},
			logokbtn2: function() { //取消实名
				this.logoks = false;
				this.$emit('hongbaogz', this.logoks); //触发showbox方法，this.logoks为向父组件传递的数据
			},
		},
		watch: {
			hongbaogz(val) { //logokz即为父组件的值，val参数为值
				this.logoks = val //将父组件的值赋给childrenMessage 子组件的值
			}

		}
	}
</script>
<style scoped>
	/*未实名弹窗*/
	.hbbox {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2000;
		background: rgba(0, 0, 0, .75);
	}

	.hbbox .qux_btn {
		width: 8%;
		position: absolute;
		bottom: -3rem;
		left: 46%;
	}

	.hbbox .qux_btn img {
		width: 100%;
	}

	.hbbox div.renzcont {
		width: 100%;
		height: 22rem;
		position: absolute;
		top: 50%;
		left: 0%;
		margin-top: -13rem;
		z-index: 2;
		border-radius: 0.6rem;
		background-image: url("../assets/hbwenhao2.png");
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.hbbox .hbcont {
		width: 80%;
		padding: 0 0.75rem;
		padding-top: 9.5rem;

		margin: auto;

	}

	.hbbox div.renzcont .hbcont .forlist {
		width: 100%;
		display: flex;
		margin-top: 1rem;
	}

	.hbbox div.renzcont .hbcont .forlist img {
		width: 0.9rem;
		height: 1rem;
		margin: 0 0.4rem;
		margin-top: 0.1rem;

	}

	.hbbox div.renzcont .hbcont .forlist p {
		line-height: 1.25rem;
		color: #7A5B44;
		font-size: 0.7rem;
	}

	.hbbox div.renzcont .hbcont .forlist p i {
		color: #F34802;
	}
.hbbox div.renzcont .hbcont .btn{
	width: 100%;
	margin-top: 0.5rem;
}
.hbbox div.renzcont .hbcont .btn img{
	width: 8.55rem;
	height: 2rem;
	margin: auto;
}

</style>
