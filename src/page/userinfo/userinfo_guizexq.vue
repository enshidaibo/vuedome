<template>
	<div>
		<header class="aui-bar aui-bar-nav aui-bar-light">
			<div class="aui-pull-left aui-btn">
				<span class="aui-iconfont aui-icon-left" @click="closeWin()"></span>
			</div>
			<div class="aui-title">任务规则</div>
		</header>
		<div class="content">
			<div class="top_img">
				<img src="../../assets/task/renwugz1.png" />
			</div>
			<div class="con_list">
				<div class="bt_list">
					每日任务
				</div>
		
				<div class="list_telti">
					<div>每日签到：</div>
					<div>
						每天在签到活动中，平台赠送送<span class="list_red">0.28</span>元红包，连续7天签到额外赠送送<span class="list_red">1.88</span>元红包，每周累计赠送送<span class="list_red">3.84</span>元红包
					</div>

				</div>
				<div class="duandain"></div>
				<div class="list_telti">
					<div>每日抽奖：</div>
					<div>平台每日免费赠送您5次抽奖机会，分别在<span class="list_blul">
				<!-- 	09:00-10:59&nbsp;&nbsp;12:00-13:59&nbsp;&nbsp;15:00-16:59
							&nbsp;&nbsp;18:00-19:59&nbsp;&nbsp;21:00-22:59 -->
							09:00-10:59、12:00-13:59、15:00-16:59、18:00-19:59、21:00-22:59
							</span>
						五个时间段使用，赠送次数不会累计，过期作废！
						<span class="list_red">500</span>元惊喜大奖等着你哟。 </div>
				</div>
				<div class="duandain"></div>
			</div>
			<div class="con_list">
				<div class="bt_list">
					分享任务
				</div>
		
				<div class="list_telti">
					<div>邀请好友：</div>
					<div>
						<p>邀请好友注册实名后送<span class="list_red">2.88</span>元红包变现，且送<span class="list_red">1</span>次抽奖机会；</p>
						<p>邀请的直接好友每累计10人注册实名额外赠送<span class="list_red">10</span>元现金；</p>
						<p>邀请的直接好友充值即返充值金额的<span class="list_red">5%</span>红包变现；</p>
						<!-- <p class="duandainone"></p> -->
						<p>邀请的直接好友现金投注即返投注金额的<span class="list_red">2%</span>现金；</p>
						<p>邀请的好友下级现金投注即返投注金额的<span class="list_red">1%</span>现金；</p>
						
						<!-- <p class="duandainone"></p> -->
						<!-- <p>直接好友充值即送投注金额的<span class="list_red">2%</span>现金；</p>
						<p>间接好友充值即送投注金额的<span class="list_red">1%</span>现金；</p>
						<p class="duandainone"></p>
						<p> 直接好友每累计充值<span class="list_red">888元</span>现金赠送<span class="list_red">8.88元</span>现金；</p>
						<p> 间接好友每累计充值<span class="list_red">888元</span>现金赠送<span class="list_red">2.88元</span>现金。</p> -->
					</div>
				</div>
				<div class="duandain"></div>
				<div class="list_telti">
					<div>晒单有礼：</div>
					<div>
						晒单分享成功即返投注金额的<span class="list_red">5%</span>红包。
					</div>
				</div>
				<div class="duandain"></div>
			</div>
			<div class="con_list">
				<div class="bt_list">
					用户优惠
				</div>
		
				<div class="list_telti">
					<div>注册实名：</div>
					<div>
						<p>	用户实名认证后即赠送您<span class="list_red">6.66</span>元红包。</p>	
					</div>
				</div>
				<div class="duandain"></div>
				<div class="list_telti">
					<div>在线充值：</div>
					<div>
						<p>用户首次充值即送充值金额的<span class="list_red">10%</span>现金(最高888元现金)，之后每次充值可获得充值金额的<span class="list_red">5%</span>现金。</p>
					</div>
				</div>
				<div class="duandain"></div>
		
			</div>
			<div class="bottn_con">
				<img src="../../assets/task/renwugz4.png" />
				本次活动最终解释权归美奇彩所有
				<img src="../../assets/task/renwugz4.png" />
			</div>
		</div>
	</div>
</template>
<script>
	import {

	} from "../../js/common.js";
	export default {
		data() {
			return {
				tipsList: [],
			}
		},

		created() {

		},
		methods: {
			closeWin: function() {
				this.$router.go(-1);
			},
		}
	}
</script>
<style scoped>
	header {
		position: fixed;
		top: 0;
	}

	.aui-bar-light {
		color: #000000;
	}

	.aui-iconfont {
		color: #000000 !important;
	}

	.content {
		width: 100%;
		height: auto;
		padding-top: 2.25rem;
		background-image: linear-gradient(-200deg, #73ABF9 4%, #5D62F6 79%);
	}

	.top_img {
		width: 100%;
		height: auto;
	}

	.top_img img {
		width: 100%;
		height: auto;
	}

	.con_list {
		width: 92%;

		margin: auto;
		margin-top: 2.225rem;
		border-radius: 0.675rem;
		background: #FFFFFF;
		position: relative;
		padding-top: 1.775rem;
	}

	.con_list .bt_list {
		width: 45.33%;
		height: 1.725rem;
		position: absolute;
		background-image: url('../../assets/task/renwugz3.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
		top: -1rem;
		left: 28.55%;
		font-size: 0.8rem;
		text-align: center;
		color: #FFFFFF;
	}

	.list_telti {
		/* display: flex; */
		padding-left: 0.825rem;
		color: #6E6D6C;
	}

	.list_telti div:first-child {
		color: #1266FF;
		font-size: 0.65rem;
	}

	.list_telti div p {
		color: #6E6D6C;
		font-size: 0.65rem;
	}

	.list_telti div:last-child {
		width: 79%;
		font-size: 0.65rem;
		margin-top: 0.5rem;
		margin-left: 1.4rem;
	}

	.list_red {
		color: #ff0029;
	}

	.list_blul {
		color: #666EFE;
	}

	.duandain {
		width: 100%;
		height: 1.025rem;
	}

	.duandainone {
		width: 100%;
		height: 0.5rem;
	}

	.juli {
		width: 100%;
		height: 2.225rem;
	}

	.bottn_con {
		width: 100%;
		height: 2.225rem;
		line-height: 2.225rem;
		text-align: center;
		font-size: 0.6rem;
		color: #D3D4FF;
	}

	.bottn_con img {
		display: inline-block;
		width: 0.5rem;
		height: 0.5rem;
		vertical-align: middle;
	}
</style>
