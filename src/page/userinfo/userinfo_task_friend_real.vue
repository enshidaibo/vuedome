<template>
	<div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="bake()" tapmode>
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">{{title}}</div>
		</header>
	
			<section class="aui-refresh-content">
				<div class="aui-content">
						<div class="task_friend_real">
					<div class="friend_real_main">
						<div class="real_main_left">
							<p>好友实名总收益(元)</p>
							<h3>{{(Number(zsy)+Number(jsy))|tofixed()}}</h3>
							<div class="box1">
								<p>直接收益</p><span>{{(zsy*1)|tofixed()}}</span>
							</div>
							<div class="box1">
								<p>间接收益</p><span>{{(jsy*1)|tofixed()}}</span>
							</div>
						</div>
						<div class="real_main_right">
							<p>好友总人数(人)</p>
							<h3>{{friendCount}}</h3>
							<div class="box1">
								<p>已实名人数</p><span>{{yism}}</span>
							</div>
							<div class="box1">
								<p>未实名人数</p><span>{{weism}}</span>
							</div>
						</div>
					</div>
					<div class="friend_real_main1">
						<div class="main1_header">
							<span class="main1_left">好友账户</span>
							<span class="main1_conter">好友类型</span>
							<span class="main1_right" @click="friendRealTc">当前状态<img src="../../assets/task/task-frn-xl.png" alt=""></span>

							<!-- 弹窗saaaaaa -->
							<div class="friend_tc" v-if="flag">
								<div class="friend_tc_qb" @click="friendRealQb()">
									<p>全部</p>
								</div>
								<div class="friend_tc_yism" @click="friendRealYsm()">
									<p>已实名</p>
								</div>
								<div class="friend_tc_weism" @click="friendRealWsm()">
									<p>未实名</p>
								</div>
							</div>
						</div>
						<div class="main1_content" v-for="(item,index) in arr">
							<div class="main1-box">
								<div class="main1_left">
									<p>{{item.userName|mobileHide(3,4)}}</p>
								</div>
								<div class="main1_conter">
									<p>{{item.type=='41'?"直接用户":"间接用户"}}</p>
								</div>
								<div class="main1_right">
									<button :class="item.realId=='0'?'active':''">{{item.realId==0?'未实名':'已实名'}}</button>
								</div>
							</div>
						</div>
						<!-- <div class="londNull" v-if="arr.length==0">
							<img src="../../assets/yiyiyi.png" alt="">
							<p>您目前没有任何好友记录</p>
						</div> -->
						<lini-page :tpyes="'record'" :prompt='"暂无数据"' :zheight='"50vh"' :zwidth='"100%"'  v-if="arr.length==0"></lini-page>
						<no-more v-show='flag2' ></no-more>
					</div>
					</div>
				</div>
			</section>
		

	</div>
</template>
<script>
	var interval = ''
	import {
		getCookie,
		setCookie,
		OverallData,
		getUid,
	} from "../../js/common.js"
	import {
		Toast
	} from 'mint-ui';
	export default {
		data() {
			return {
				arr: [],
				flag: false,
				data: {},
				yism: '0',
				weism: '0',
				type: '2',
				zsy: '0', //直接收益
				jsy: '0', //间接收益
				page: '1',
				limit: '10',
				num: '1',
				flag2:false,
				auiScroll: true,
				title: '我的好友',
				friendCount:0,
			}
		},
		created() {
			this.getUserInfo();
			this.getUserInfo1();
			console.log(this.$route.query.id)
			var ms = this.$route.query.id
			if (ms == 1) {
				this.title = '好友实名'
			}
		},
		mounted() {
			var that = this;
			var pullToRefresh = new auiPullToRefresh({ //下拉刷新
				container: document.querySelector('.aui-refresh-content'), //下拉容器
				triggerDistance: 80 //下拉高度
			}, function(ret) {
				if (ret.status == "success") {
					that.auiScroll = true;
					that.limit = 10;
					that.$ajax.defaults.timeout  =  49527;//49527这个值控制没有showLonding
					that.getUserInfo1()
					setTimeout(() => {
						that.$ajax.defaults.timeout  = 50000;
						pullToRefresh.cancelLoading(); //刷新成功后调用此方法隐藏
					}, 1500)
				}
			});
			var scroll = new auiScroll({ //上拉加载
				listen: false, //是否监听滚动高度，开启后将实时返回滚动高度
				distance: 0 //判断到达底部的距离，isToBottom为true
			}, function(ret) {
				if (ret.isToBottom && ret.scrollTop > 0 && that.auiScroll) {
					that.auiScroll = false
					console.log(2)
					setTimeout(() => {
						app.page++;
						getUserInfo1(userId, mid);
					}, 1000)
				}
			});

		},
		beforeDestroy() {
			this.$ajax.defaults.timeout  = 50000;
			this.auiScroll = false; //取消上拉监听
		},
		methods: {
			bake: function() {
				this.$router.go(-1); //根据浏览器记录返回上一次
			},
			//弹窗的显现隐藏
			friendRealTc: function() {
				this.flag = !this.flag
			},
			//全部数据
			friendRealQb: function() {
				this.type = '2'
				this.getUserInfo1()
				this.flag = !this.flag
			},
			//已实名的
			friendRealYsm: function() {
				this.type = '1'
				this.getUserInfo1();
				this.arr = this.arr.filter(function(item) {
					return item.realId == '1'
				})
				this.flag = !this.flag
			},
			//未实名的
			friendRealWsm: function() {
				this.type = '0'
				this.getUserInfo1();
				this.arr = this.arr.filter(function(item) {
					return item.type == '0'
				})
				this.flag = !this.flag
			},
			//头部数据
			getUserInfo: function() {
				let uid = getCookie('newData');
				let mid = OverallData().mid;
				if (!uid) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
				var userId = uid.userid;
				var data = [];
				data["uid"] = userId;
				data["mid"] = mid;

				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});

				this.$ajax.post('/caipiaoshouye/index.php/home/index/realFriend',
						datas
					)
					.then(res => {
						var content = res.data.content;
						console.log(content)

						if (res.data.status != "200") {
							return;
						} else {
							if (content.code == "1000") {
								console.log(content.data);
								this.data = content.data;
								this.yism = this.data.indirectRealCount + this.data.directRealCount; //直接实名+间接实名
								this.weism = this.data.friendCount - this.yism; //总好友-已实名
								this.friendCount=this.data.friendCount;
								this.zsy = this.data.directRealBonus
								this.jsy = this.data.indirectRealBonus
							} else if (content.code == "201010") {
								Toast("账户已被锁定，请联系客服");
								setCookie('newData', '', '0-S');
								this.$router.push({
									name: 'login'
								})
							}

						}

						this.img_url = getCookie("newData").headurl;
					})
					.catch(err => {

					})

			},
			//列表数据
			getUserInfo1: function() {
				let uid = getCookie('newData');
				let mid = OverallData().mid;
				if (!uid) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
				var userId = uid.userid;
				var data = [];
				console.log(this.type)
				data["uid"] = userId;
				data["mid"] = mid;
				data["userType"] = 3; //查询类型：直接间接用户
				data["realId"] = this.type //查询类型：已实名还是未实名
				data["page"] = this.page //当前页数
				data["limit"] = this.limit //每页长度
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});

				this.$ajax.post('/caipiaoshouye/index.php/home/index/getLotteryAutonymList',
						datas
					)
					.then(res => {
						console.log(res)
						var content = res.data.content;
						console.log(content)

						if (res.data.status != "200") {
							return;
						} else {
							if (content.code == "1000") {
								var ms = content.data.autonym

								if (this.page == 1) {
									this.arr = ms; //赋值
									if (this.arr.length == 0) {
										this.flag1 = true
									}
									this.scrollS = true;
								} else {
									if (ms.length == 0) {
										this.flag2 = true
									}
									this.arr = this.arr.concat(ms);
									this.scrollS = true;
								}
							} else if (content.code == "201010") {
								Toast("账户已被锁定，请联系客服");
								setCookie('newData', '', '0-S');
								this.$router.push({
									name: 'login'
								})
							}
						}

						this.img_url = getCookie("newData").headurl;
					})
					.catch(err => {})
			},
		},
		filters: {
			goTime: function(matchDate) {
				matchDate = Number(matchDate)
				let time = new Date(matchDate);
				let y = time.getFullYear();
				let m = time.getMonth() + 1 >= 10 ? parseInt(time.getMonth() + 1) : "0" + parseInt(time.getMonth() +
					1);
				let d = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
				let h = time.getHours() >= 10 ? time.getHours() : "0" + time.getHours();
				let mm = time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes();
				return y + "." + m + "." + d + " " + h + ":" + mm; //年月日时分秒

			},
			mobileHide: function(str, start, num) {
				let st = "";
				for (let i = 0; i < num; i++) {
					st += "*";
				}
				let end = 11 - parseInt(start) - parseInt(num);

				return str.substr(0, start) + st + str.substr(-end);
			},
			tofixed: function(num) {
				// console.log(num.toFixed(2))
				var ms = parseFloat(num).toFixed(2)
				return ms
			}
		}
	}
</script>
<style scoped>
.aui-bar-nav .aui-btn .aui-iconfont{
	color: #333 !important;
}
	header {
		position: fixed !important;
	}

	.active {
		color: #5fa3eb;
	}

	.aui-content {
		margin-top: 2.25rem;
		min-height: 90vh;
	}

	.task_friend_real {
		overflow: hidden;
		background: #F3F8FD;
		min-height: 100vh;
	}

	.task_friend_real .friend_real_main {
		width: 94%;
		height: 8.1rem;
		background: url(../../assets/task/task-frn-bg.png) no-repeat;
		background-size: cover;
		margin: 0 auto;
		margin-top: 0.8rem;
		display: flex;
		color: #FFF;
		position: relative;
		z-index: 11;
		border-radius: 5px;
	}

	.friend_real_main h3 {
		font-size: 1.5rem;
		margin-bottom: 2rem;
	}

	.friend_real_main p {
		font-size: 0.65rem;
		color: #fff;
	}

	.real_main_left {
		height: 8.1rem;
		border-right: 2px solid #FFC393;
		box-sizing: border-box;
		padding: 0.9rem 0 0 1.3rem;
		flex: 1;
	}

	.box1 p {
		font-size: 0.6rem;
		display: inline-block;
		margin-right: 0.375rem;
		line-height: 0.575rem;
	}

	.box1 span {
		font-size: 0.8rem;
		font-weight: bold;
		vertical-align: middle;
		line-height: 0.625rem;
	}

	.real_main_right {
		height: 8.1rem;
		flex: 1;
		padding: 0.9rem 0 0 1.3rem;
	}

	.friend_real_main1 {
		width: 94%;
		margin: 0 auto;
		margin-top: 0.8rem;
		background: #fff;
	}

	.main1_header {
		display: flex;
		border-bottom: 1px solid #F3F8FD;
		height: 2.225rem;
		position: relative;
	}

	.main1_header span {
		font-size: 0.65rem;
		color: #333;
		font-weight: bold;
		line-height: 2.225rem;
	}

	.main1_header img {
		width: 0.35rem;
		height: 0.25rem;
		display: inline-block;
		margin-left: 0.15rem;
	}

	.main1_left {
		flex: 35%;
		padding-left: 0.5rem;
	}

	.main1_conter {
		flex: 35%;
		text-align: center;
	}

	.main1_right {
		flex: 40%;
		text-align: right;
		margin-right: 0.5rem;
	}

	.main1-box {
		display: flex;
		border-top: 1px solid #F3F8FD;
		height: 2.5rem;
		box-sizing: border-box;
	}

	.main1-box p {
		line-height: 2.5rem;
		font-size: 0.7rem;
		color: #333;
	}

	.main1-box button {
		background: #99E1FF;
		border-radius: 0.1rem;
		width: 3.1rem;
		height: 1.2rem;
		line-height: 1.2rem;
		margin-top: 0.65rem;
		color: #fff;
		font-size: 0.6rem;
	}

	.main1-box .active {
		background: #FE913B;
	}


	/* 弹窗 */
	.friend_tc {
		width: 5.25rem;
		height: 6.075rem;
		position: absolute;
		background: url(../../assets/task/task-frn-tc.png) no-repeat;
		background-size: cover;
		top: 65%;
		right: 0;
		z-index: 1;
	}

	.friend_tc div {
		height: 2rem;
		text-align: center;
	}

	.friend_tc p {
		font-size: 0.65rem;
		line-height: 2rem;
		color: #fff;
	}

	.firend_tc_qb p {
		line-height: 2.4rem;
	}

	.friend_tc_yism {
		border-top: 1px solid #82D1FF;
		border-bottom: 1px solid #82D1FF;
		box-sizing: border-box;
	}

	.friend_tc_weism {}

	.aui-refresh-content {
		top: 0;
	}

	.londNull {
		width: 100%;
		height: 50vh;
		box-sizing: border-box;
		padding-top: 5rem;
	}

	.londNull img {
		width: 64%;
		height: auto;
		margin: auto;
	}

	.londNull p {
		width: 100%;
		height: auto;
		margin-top: 1rem;
		text-align: center;
		/*font-size: 0.36rem;*/
		color: #62A1BE;
		line-height: 0.6rem;
	}
	
	  .flag2 {
          text-align: center;
          margin-top: 0.4rem;
          margin-bottom: 0.3rem
        }
</style>
