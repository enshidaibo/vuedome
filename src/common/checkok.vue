<template>
	<div id="sdApp" v-if="logoks">
		<div id="logok" v-if="logoks">
			<div class="renzcont">
				<div>
					<img src="../assets/Group14@2x.png" alt="">
					<p class="text">实名认证</p>
					<div class="title2">为了您的账户安全，请帐户实名认证</div>
					<div class="content">实名认证后，可有效保护账号的资金安全</div>
					<p class="renz_text">认证即可获得<span>6.66</span>元红包</p>
					<div class="logokbtn">
						<p id="logokbtn1" @click="logokbtn1()">立即认证</p>
						<!-- <p id="logokbtn2" @click="logokbtn2()">暂不认证</p> -->
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
		props: ['logokz', 'shouye'], //声明接收父组件参数
		data() {
			return {
				logoks: false, //未实名标志
			}
		},
		created() {
			this.logoks = this.logokz;
			if (this.shouye) {
				// this.logoks = false;
			} else {
				// if (getSession('logok')) { //判断是否实名
				// 	this.logoks = true;
				// }
			}

			console.log(this.shouye);
		},
		methods: {
			logokbtn1: function() { //前往实名
				this.logoks = false;
				this.$emit('showbox', this.logoks); //触发showbox方法，this.logoks为向父组件传递的数据
				this.$router.push({
					name: 'userinfo_task_real'
				})
			},
			logokbtn2: function() { //取消实名
				this.logoks = false;
				this.$emit('showbox', this.logoks); //触发showbox方法，this.logoks为向父组件传递的数据
			},
		},
		watch: {
			logokz(val) { //logokz即为父组件的值，val参数为值
				this.logoks = val //将父组件的值赋给childrenMessage 子组件的值
			}

		}
	}
</script>
<style scoped>
	/*未实名弹窗*/
	#logok {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2000;
		background: rgba(0, 0, 0, .75);
	}

	#logok .qux_btn {
		width: 8%;
		position: absolute;
		bottom: -2rem;
		left: 46%;
	}

	#logok .qux_btn img {
		width: 100%;
	}

	#logok>div.renzcont {
		width: 85%;
		height: 17.2rem;
		position: absolute;
		top: 50%;
		left: 7.5%;
		z-index: 2;
		margin-top: -8.75rem;
		border-radius: 0.6rem;
		background-color: #fff;
	}

	#logok>div p.text {
		text-align: center;
		line-height: 1.2rem;
		padding: 5% 0;
		font-size: 1.2rem;
		color: #363636;
		font-weight: bold;
	}

	#logok>div p.renz_text {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 1.8rem;
		font-size: 0.8rem;
		text-align: center;
		color: #43A4F1;
		font-weight: bold;
	}

	#logok>div p.renz_text span {
		display: inline-block;
		margin-top: -0.2rem;
		font-size: 1.75rem;
		color: #FF2323;
	}

	#logok>div>div {
		width: 100%;

	}

	#logok>div>div>img {
		display: block;
		width: 100%;
		/*height: 3.2rem;*/
		margin: 0 auto 0.2rem;
	}

	#logok>div>div>.title2 {
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.65rem;
		text-align: center;
		color: #7a7a7a;
	}

	#logok>div>div>.content {
		width: 100%;
		line-height: 1rem;
		font-size: 0.65rem;
		text-align: center;
		color: #7a7a7a;
		margin: 0 auto;
	}

	#logokbtn1,
	#logokbtn2 {
		width: 85%;
		/* height: 2.2rem; */
		line-height: 1.2rem;
		padding: 3% 0;
		border-radius: 0.2rem;
		text-align: center;
		font-size: 0.7rem;
	}

	#logokbtn1 {
		margin-right: 0.3rem;
		background-color: #5fa3eb;
		color: #fff;
	}

	#logokbtn2 {
		margin-left: 0.3rem;
		background-color: #9b9b9b;
		color: #fff;
	}

	#logok .logokbtn {
		width: 100%;
		height: auto;
		margin-top: 3%;
		margin-bottom: 8%;
		display: flex;
		justify-content: center;
	}

	#logok2 .logokbtn {
		width: 100%;
		height: auto;
		margin-top: 0.5rem;
		display: flex;
		justify-content: center;
	}
</style>
