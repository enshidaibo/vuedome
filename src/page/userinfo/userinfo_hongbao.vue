<template>
	<div>
		<header class="aui-bar aui-bar-nav top_heder">
			<div class="aui-pull-left aui-btn" @click="bake()" tapmode>
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">我的红包</div>
			<span class="sp1" @click="hongbao"><img src="../../assets/userinfo/hongbao-03.png" alt=""></span>
		</header>
		<div class="content">
			<section class="aui-refresh-content">
				<div class="aui-content">
					<div class="top_kp">
						<div class="top_kp_con">
							<div class="top_kp_tei">
								<p>{{numberFormat(coinsMoney)}}</p>
								<span>当前红包余额(元)</span>
							</div>
							<div class="top_kp_list">
								<div>
									<p>{{numberFormat(subscription*1+goldToMoney*1+coinsMoney*1)}}</p>
									<span>红包总计(元)</span>
								</div>
								<!-- <div>
									<p>{{numberFormat(goldToMoney)}}</p>
									<span>已变现(元)</span>
								</div> -->
								<div>
									<p>{{numberFormat(subscription)}}</p>
									<span>已购彩(元)</span>
								</div>
							</div>
						</div>
						<div class="top_btn" @click="goucai()">
							<img  class='wumenkana' src="../../assets/userinfo/wumenkanya.png" />
							<img src="../../assets/userinfo/hongbaothow4.png" alt="">
						</div>
						<div class="con_teitel">
							<div class="con_teitel_teitel">// 如何获取红包 //</div>
							<div class="con_teitel_list">
								<div class="con_one"  @click="userinfo_task_invitation()">
									<p>邀好友</p>
									<span>好友实名即赠2.88元红包</span>
									<img src="../../assets/userinfo/hongbaothow3.png" alt="">
								</div>
								<div class="con_tow" @click="userinfo_task_sign()">
									<p>每周签到</p>
									<span>累计赠送3.84元红包</span>
								</div>

							</div>
							<div class="con_teitel_list">
								<div class="con_th" @click="userinfo_task_prize()">
									<p>每日抽奖</p>
									<span>可中500元红包大奖</span>
								</div>
								<div class="con_fr" @click="userinfo_task_sunburn()">
									<p>晒单即返</p>
									<span>返投注金额的5%红包</span>
								</div>

							</div>
						</div>
					</div>

					<div class="listyear">
						<div class="auitime_list">
							<div class="time_tlel_l">
								{{time_y}}年{{time_m}}月<img src="../../assets/userinfo/hongbaoion10.png" />
								<label class="mothlabel" for="input_th"></label>
								<input class="mothinput" id="input_th" type="month" v-model="time" />
							</div>

							<div class="time_tlel_r">
								<p>收入¥{{numberFormat(other.incomeSum)}}元</p>
								<!-- <p>变现 ¥{{numberFormat(other.expenditureSum)}}元</p> -->
							</div>

						</div>

						<lini-page :tpyes="'record'" :prompt='"还没有红包明细…"' :zheight='"auto"' :zwidth='"100%"' v-if="dataslength"></lini-page>
						<div v-if="datas.length>0">
							<div class="list_content" v-for='d in datas'>
								<div class="list_content_img">
									<img v-if="d.type=='FRIEND_FIRST_RECHARGE'" src="../../assets/userinfo/hongbao_ion1.png" />
									<img v-else-if="d.type=='FRIEND_ADDUP_RECHARGE'" src="../../assets/userinfo/hongbao_ion1.png" />
									<img v-else-if="d.type=='FRIEND_ADDUP_COUNT'" src="../../assets/userinfo/hongbao_ion14.png" />

									<img v-else-if="d.type=='FRIEND_FIRST_SHARE_BET'" src="../../assets/userinfo/hongbao_ion2.png" />

									<img v-else-if="d.type=='FRIEND_CERTIFICATION'" src="../../assets/userinfo/hongbao_ion3.png" />

									<img v-else-if="d.type=='DIRECT_USER_BET'" src="../../assets/userinfo/hongbao_ion4.png" />
									<img v-else-if="d.type=='INDIRECT_USER_BET'" src="../../assets/userinfo/hongbao_ion4.png" />

									<img v-else-if="d.type=='FRIEND_REGISTER'" src="../../assets/userinfo/hongbao_ion5.png" />

									<img v-else-if="d.type=='GOLD_TO_MONEY'" src="../../assets/userinfo/hongbao_ion6.png" />

									<img v-else-if="d.type=='USER_FIRST_RECHARGE'" src="../../assets/userinfo/hongbao_ion7.png" />
									<img v-else-if="d.type=='USER_RECHARGE_RANGE'" src="../../assets/userinfo/hongbao_ion7.png" />
									<img v-else-if="d.type=='EXTRA_REWARD'" src="../../assets/userinfo/hongbao_ion7.png" />

									<img v-else-if="d.type=='USER_DRAW_LOTTERY'" src="../../assets/userinfo/hongbao_ion8.png" />

									<img v-else-if="d.type=='USER_FIRST_BET'" src="../../assets/userinfo/hongbao_ion9.png" />
									<img v-else-if="d.type=='USER_SECOND_BET'" src="../../assets/userinfo/hongbao_ion9.png" />

									<img v-else-if="d.type=='USER_SIGN'" src="../../assets/userinfo/hongbao_ion10.png" />

									<img v-else-if="d.type=='USER_SHARE_BET'" src="../../assets/userinfo/hongbao_ion11.png" />
									<img v-else-if="d.type=='USER_FIRST_SHARE_BET'" src="../../assets/userinfo/hongbao_ion11.png" />

									<img v-else-if="d.type=='USER_CERTIFICATION'" src="../../assets/userinfo/hongbao_ion12.png" />

									<img v-else-if="d.type=='USER_REGISTER'" src="../../assets/userinfo/hongbao_ion13.png" />

									<img v-else-if="d.type=='PAY'" src="../../assets/userinfo/hongbao_ion15.png" />
									<img v-else-if="d.type=='ADMINPAY'" src="../../assets/userinfo/hongbao_ion16.png" />
									<img v-else-if="d.type=='SUBSCRIPTION'" src="../../assets/userinfo/hongbao_ion17.png" />
									<img v-else-if="d.type=='SCHEME_BONUS'" src="../../assets/userinfo/hongbao_ion18.png" />
									<img v-else-if="d.type=='CHASE'" src="../../assets/userinfo/hongbao_ion19.png" />
									<img v-else src="../../assets/userinfo/hongbao_ion16.png" />
								</div>
								<div class="com_titel">
									<div>{{d.typeText}}</div>
									<div>{{GetTimeStrfromnum(d.createTime*1)}}</div>
								</div>
								<div v-if="d.modeText=='收入'" class="com_right add">
									+{{d.money}}
								</div>
								<div v-else class="com_right jian">
									-{{d.money}}
								</div>
							</div>
							<no-more v-show='nomore'></no-more>
						</div>

					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
	import {
		Toast,
		Loadmore,
		Indicator,
		MessageBox,
		DatetimePicker
	} from 'mint-ui';
	// Vue.component(DatetimePicker.name, DatetimePicker);
	import {
		setSession,
		getSession,
		getCookie,
		setCookie
	} from "../../js/common.js";
	export default {
		data() {
			return {
				nomore: false,
				coinsMoney: 0,
				dateVal: '',
				selectedValue: '',
				coinstc_true: false,
				datas: [],
				time: '',
				time_y: '2019',
				time_m: '1',
				alert_text: true,
				dataslength: false,
				fundDetailType: '',
				type: 0,
				// 查询的天数
				day: 1,
				// 开始时间
				startTime: '',
				// 结束时间
				endTime: '',
				// 方案类型
				mode: '',
				// 页数
				page: 1,
				auiScroll: true,
				other: {
					"incomeSum": 0.00,
					"expenditureSum": 0.00,
					"prepaymentsSum": 0.00
				},
				goldToMoney: 0, //红包变现金额
				subscription: 0 //红包购彩金额

			}
		},
		filters: {

		},
		watch: {
			// 如果 `question` 发生改变，这个函数就会运行
			time: function() {
				this.datas = [];
				this.page = 1;
				this.rendering_data(this.time);

				// alert(this.time);
			}
		},
		created() {
			if (getSession('userindata')) {
				this.coinsMoney = getSession('userindata').coinsMoney;
			}
			// this.getUserInfo();
			this.getRemainGoldByUid();
			var time;
			if (this.time == '') {
				time = '';
			} else {
				time = this.time;
			}

			this.rendering_data(time);

		},
		beforeDestroy() {

			this.auiScroll = false; //取消上拉监听
		},

		mounted() {

			var that = this;
			var pullToRefreshs = new auiPullToRefresh({ //下拉刷新
				container: document.querySelector('.aui-refresh-content'), //下拉容器
				triggerDistance: 80 //下拉高度
			}, function(ret) {
				if (ret.status == "success") {
					that.auiScroll = false;
					that.page = 1;
					that.datas = [];
					that.rendering_data(that.time);
					setTimeout(() => {
						pullToRefreshs.cancelLoading(); //刷新成功后调用此方法隐藏
					}, 1500)
				}
			});
			var scrolls = new auiScroll({ //上拉加载
				listen: false, //是否监听滚动高度，开启后将实时返回滚动高度
				distance: 200 //判断到达底部的距离，isToBottom为true
			}, function(ret) {
				if (ret.isToBottom == true && that.auiScroll) {
					that.auiScroll = false;
					that.page++
					console.log(that.page)
					that.rendering_data(that.time);
				}
			});

		},
		methods: {

			Get0pad: function(num, n) {
				var len = num.toString().length;
				while (len < n) {
					num = "0" + num;
					len++;
				}
				return num;
			},
			//时间节点转换
			numberFormat: function(number) {
				var data = Math.floor(number * 100) / 100;
				return data.toFixed(2);
			},
			GetTimeStrfromnum: function(time, num) {

				var now = new Date(time);
				if (num == 1) return now.getFullYear() + "-" + this.Get0pad(now.getMonth() + 1, 2) + "-" + this.Get0pad(
					now.getDate(),
					2);
				else if (num == 3) return now.getFullYear() + "-" + this.Get0pad(now.getMonth() + 1, 2) + "-" +
					this.Get0pad(now.getDate(),
						2) + "<br/> " + this.Get0pad(now.getHours(), 2) + ":" + this.Get0pad(now.getMinutes(),
						2) + ":" + this.Get0pad(
						now.getSeconds(), 2);
				else return now.getFullYear() + "/" + this.Get0pad(now.getMonth() + 1, 2) + "/" + this.Get0pad(now.getDate(),
						2) +
					" " + this.Get0pad(now.getHours(), 2) + ":" + this.Get0pad(now.getMinutes(), 2) + ":" +
					this.Get0pad(now.getSeconds(),
						2);
			},
			tohongbaolist: function() {
				if (this.coinstc_true == false) {
					this.coinstc_true = true;
				} else {
					this.coinstc_true = false;
				}

			},
			userinfo_task_invitation: function() {
				this.$router.push({
					name: 'special_friends'
				})

			},

			userinfo_task_sign: function() {
				this.$router.push({
					name: 'userinfo_task_sign'
				})

			},
			userinfo_task_prize: function() {
				this.$router.push({
					name: 'userinfo_task_prize'
				})

			},
			userinfo_task_sunburn: function() {
				this.$router.push({
					name: 'userinfo_task_sunburn'
				})

			},
			//红包
			hongbao: function() {
				this.$router.push({
					name: 'userinfo_hongbao_rule',
				})
			},

			goucai: function() {
				this.$router.push({
					name: 'goucai'
				})
			},
			task: function() {
				this.$router.push({
					name: 'task'
				})
			},
			bake: function() {
				this.$router.go(-1);
			},
			getRemainGoldByUid: function() {
				let uid = getCookie('newData');
				if (!uid) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
				var userId = uid.userid;
				var data = [];
				data["userId"] = userId;
				var datas = this.Qs.stringify({
					"mid": 1,
					"appId": 1,
					data
				}, {
					allowDots: true
				});

				this.$ajax.post('/caipiaoshouye/index.php/home/index/getLotteryUserRemainGoldByUid',
						datas
					)
					.then(res => {
						console.log(JSON.stringify(res.data));
						var content = res.data.content;

						if (res.data.status == "200") {
							if (content.code == "1000") {
								if (content.data !== ''&&content.data!=null) {
									this.goldToMoney = content.data.goldToMoney;
									this.subscription = content.data.subscription;
								}

							} else if (content.code == "201010") {
								Toast("账户已被锁定，请联系客服");
								setCookie('newData', '', '0-S');
								this.$router.push({
									name: 'login'
								})
							}
						}
						paintProfit(this.coinsMoney, this.goldToMoney, this.subscription);
						// this.img_url = getCookie("newData").headurl;
					})
					.catch(err => {
						console.log(err);
					})

			},
			getUserInfo: function() {
				let uid = getCookie('newData');
				if (!uid) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
				var userId = uid.userid;
				var data = [];
				data["userId"] = userId;
				data = this.Encrypt({...data});
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});

				this.$ajax.post('/caipiaoshouye/index.php/home/index/getUserInfo',
						datas
					)
					.then(res => {
						var content = JSON.parse(res.data.content);
						console.log(JSON.stringify(content));
						if (res.data.status != "200") {

							return;
						} else {
							if (content.code == "100000") {
								console.log(content.data.coinsMoney);
								this.coinsMoney = content.data.coinsMoney;
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
						console.log(err);
					})

			},
			rendering_data: function(time) {

				if (time == '') {
					var nowt = new Date();
					var getyeur = nowt.getFullYear();
					var getmonth = nowt.getMonth() + 1;
					var getday = new Date(getyeur, getmonth, 0).getDate();
					this.time_y = getyeur;
					this.time_m = getmonth;
					if (getmonth < 10) {
						getmonth = "0" + getmonth;
					}
					this.startTime = getyeur + "-" + getmonth + "-01";
					this.endTime = getyeur + "-" + getmonth + "-" + getday;

				} else {

					var result = time.split("-");
					var getyeur = result[0];
					var getmonth = result[1];
					this.time_y = getyeur;
					this.time_m = getmonth;
					var getday = new Date(getyeur, getmonth, 0).getDate();
					this.startTime = time + "-01";
					this.endTime = time + "-" + getday;
				}


				let uid = getCookie('newData');
				if (!uid) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
				var userId = uid.userid;
				var data = [];
				data["userId"] = userId;
				data["type"] = '';
				data["mode"] = this.mode;
				data["size"] = 10;
				data["fundDetailType"] = this.fundDetailType;
				data["page"] = this.page;
				data["moneyType"] = 1;
				data["startTime"] = this.startTime;
				data["endTime"] = this.endTime;




				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				// console.log(JSON.stringify(tda));
				this.fundDetailList(datas)
			},
			fundDetailList: function(datas) {


				this.$ajax.post('/caipiaoshouye/index.php/home/index/fundDetailList',
						datas
					)
					.then(res => {
						var content = res.data.content;
						console.log(JSON.stringify(content));
						if (res.data.status == 200) {
							if (content.code == 1000) {
								if (content.data.other !== '' && content.data.other != null) {
									this.other = content.data.other;
								} else {
									this.other = {
										"incomeSum": 0.00,
										"expenditureSum": 0.00,
										"prepaymentsSum": 0.00
									};
								}
								if (content.data.obj == [] || content.data.obj == null || content.data.obj == "") {
									console.log(1223)
									this.nomore = true;
									this.auiScroll = false;
									if (this.page == 1) {
										this.dataslength = true;
										console.log(111);
									}
								} else {
									var data = content.data.obj;
									this.nomore = false;
									this.auiScroll = true;
									if (this.page == 1) {
										this.datas = data;
									} else {
										this.datas = this.datas.concat(data);
									}

									console.log(JSON.stringify(this.datas));
									if (this.page == 1 && this.datas.length == 0) {
										this.dataslength = true
									} else {
										this.dataslength = false
									}
								}

							}
						} else if (res.data.status == 500) {
							if (this.page == 1) {
								this.dataslength = true
							}
							Toast('服务器异常，请稍后重试！')
						}

					})
					.catch(err => {
						console.log(err);
					})

			}
		}
	}

	function paintProfit(redEnvelopes, cash, rngig) {
		var all = (redEnvelopes * 1) + (cash * 1) + (rngig * 1);
		var text1 = all.toFixed(2);
		if (all == 0) {
			all = 3;
			redEnvelopes = 1;
			cash = 1;
			text1 = '0.00'
			rngig = 1;
		}
		var pRate = 360 * (redEnvelopes / all);
		var bCost = 360 * (cash / all) + pRate;

		var rngth = 360 * (rngig / all) + bCost;

		console.log(rngth);
		var text2 = '红包总额';
		var innWidth = 330;
		var sttWidth = innWidth / 2;
		var canvas = document.getElementById('Profit');
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, 330, 330);
		var deg = Math.PI / 180;

		ctx.fillStyle = "#FEC957";
		ctx = sector(ctx, sttWidth, sttWidth, sttWidth, 0 * deg, pRate * deg);
		ctx.fill();


		ctx.fillStyle = "#04F6EF";
		ctx = sector(ctx, sttWidth, sttWidth, sttWidth, pRate * deg, bCost * deg);
		ctx.fill();


		ctx.fillStyle = "#FE5880";
		ctx = sector(ctx, sttWidth, sttWidth, sttWidth, bCost * deg, rngth * deg);
		ctx.fill();

		var lingrad = ctx.createLinearGradient(0, 0, 0, 330);
		lingrad.addColorStop(0, '#12A5F9');
		lingrad.addColorStop(1, '#0982F6');
		ctx.fillStyle = lingrad;
		ctx = sector(ctx, sttWidth, sttWidth, sttWidth - 45, 0, 360 * deg);
		ctx.fill();
		//				this.clearArc(ctx, sttWidth, sttWidth, sttWidth-50, 1);
		ctx.font = "bold 38px PingFang-SC-Regular";
		ctx.fillStyle = "#FFFFFF";
		var tWidth1 = sttWidth - (ctx.measureText(text1).width / 2);
		ctx.fillText(text1, tWidth1, sttWidth - 12);
		ctx.font = "30px PingFang-SC-Bold";
		ctx.fillStyle = "#FFFFFF";
		var tWidth2 = sttWidth - (ctx.measureText(text2).width / 2);
		ctx.fillText(text2, tWidth2, sttWidth + 32);

	};

	function sector(obj, x, y, radius, sDeg, eDeg) {
		// 初始保存
		obj.save();
		// 位移到目标点
		obj.translate(x, y);
		obj.beginPath();
		// 画出圆弧
		obj.arc(0, 0, radius, sDeg, eDeg);
		// 再次保存以备旋转
		obj.save();
		// 旋转至起始角度
		obj.rotate(eDeg);
		// 移动到终点，准备连接终点与圆心
		obj.moveTo(radius, 0);
		// 连接到圆心
		obj.lineTo(0, 0);
		// 还原
		obj.restore();
		// 旋转至起点角度
		obj.rotate(sDeg);
		// 从圆心连接到起点
		obj.lineTo(radius, 0);
		obj.closePath();
		// 还原到最初保存的状态
		obj.restore();
		return obj;
	}
</script>

<style scoped>
	.top_heder {
		background: #FF863D;
	}

	header {
		position: fixed;
	}

	.top_kp {
		width: 100%;
		height: 14rem;

		background: #FF863D;
		padding-top: 0.8rem;
		color: #FFFFFF;
		position: relative;
	}

	.top_kp_con {
		width: 92%;
		height: 13.2rem;
		background-image: url(../../assets/userinfo/hongbaothow1.png);
		background-size: 100% 100%;
		margin: auto;
	}

	.top_kp_tei {
		width: 15.5rem;
		height: 4rem;
		margin: auto;
		text-align: center;
		padding-top: 0.8rem;
	}

	.top_kp_tei p {
		line-height: 1.8rem;
		font-weight: bold;
		color: rgba(212, 46, 29, 1);
		font-size: 1.75rem;
	}

	.top_kp_tei span {
		line-height: 1rem;
		color: rgba(212, 46, 29, 1);
		font-size: 0.6rem;
	}

	.top_kp_list {
		width: 15.5rem;
		height: 4rem;
		margin: auto;
		text-align: center;
		padding-top: 1.1rem;
		display: flex;
	}

	.top_kp_list div {
		flex: 1;
	}

	.top_kp_list p {
		font-size: 0.8rem;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		line-height: 0.95rem;

	}

	.top_kp_list span {
		font-size: 0.55rem;
		color: rgba(102, 102, 102, 1);
		line-height: 0.75rem;
	}

	.con_teitel {
		width: 100%;
		height: 11.5rem;
		background-image: url(../../assets/userinfo/hongbaothow2.png);
		background-size: 100% 100%;
		position: absolute;
		left: 0;
		bottom: -11rem;

	}
	.top_btn {
		position: absolute;
		bottom: 1.3rem;
		left: 0;
		width: 100%;
		height: auto;
	}

	.top_btn img {
		width: 7.5rem;
		height: 2rem;
		margin: auto;
		margin-top: .3rem;
	}
	.con_teitel_teitel {
		width: 100%;
		font-size: 0.75rem;
		color: rgba(122, 122, 122, 1);
		line-height: 2rem;
		text-align: center;
		padding-top: 0.6rem;
	}

	.con_teitel_list {
		width: 94%;
		margin: auto;
		display: flex;
	}

	.con_teitel_list div {
		flex: 1;
		height: 4rem;
		text-align: center;
		padding-top: 0.85rem;
	}

	.con_one {
		background-image: url(../../assets/userinfo/hongbaothow5.png);
		background-size: 100% 100%;
		margin-right: 0.2rem;
		margin-bottom: 0.2rem;
		position: relative;
	}
	.con_one img{
		width:0.75rem;
        height:0.9rem;
		position: absolute;
		top: 0.6rem;
		right: 1.2rem;
	}
	.con_tow {
		background-image: url(../../assets/userinfo/hongbaothow8.png);
		background-size: 100% 100%;

		margin-bottom: 0.2rem;
	}

	.con_th {
		background-image: url(../../assets/userinfo/hongbaothow7.png);
		background-size: 100% 100%;
		margin-right: 0.2rem;
	}

	.con_fr {
		background-image: url(../../assets/userinfo/hongbaothow6.png);
		background-size: 100% 100%;
	}

	.con_teitel_list p {
		font-size: 0.9rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		line-height: 1.25rem;
	}

	.con_teitel_list span {
		font-size: 0.6rem;
		color: rgba(255, 255, 255, 1);
		line-height: 0.85rem;
	}

	.content {
		width: 100%;
		padding-top: 2.25rem;

	}

	.mui-scroll-wrapper {
		top: 2.05rem;
		padding-bottom: 3rem;
	}



	.listyear {
		width: 100%;

		position: relative;
		padding-top: 2.7rem;
		margin-top: 11rem;
	}

	.listyear .list_telti {
		width: 100%;
		height: 2rem;
		margin: auto;
		padding: 0rem 1.2rem;
		padding-right: 0;
		background: #eef4fb;
		line-height: 2rem;
		position: relative;
	}

	.listyear .list_telti label {
		width: 0.85rem;
		height: 0.95rem;
		position: absolute;
		right: 1rem;
		top: 0.55rem;
		background-image: url(../../assets/userinfo/hongbao13.png);
		background-size: 100% 100%;
	}

	.listyear .list_telti img {
		width: 0.85rem;
		height: 0.95rem;
		position: absolute;
		right: 1rem;
		top: 0.55rem;
	}

	.list_content {
		width: 100%;
		height: 3rem;
		position: relative;
		padding: 0rem 1.2rem;
		padding-right: 0;
		display: flex;
		padding-top: 0.5rem;
		background: #FFFFFF;
	}

	.list_content_img {
		width: 2.5rem;
		height: auto;

	}

	.list_content_img img {
		width: 2rem;
		height: 2rem;

	}

	.londNull {
		width: 100%;
		height: 30vh;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		padding-top: 1rem;
	}

	.londNull img {
		width: 64%;
		height: auto;
		margin: auto;
	}

	.londNull p {
		width: 100%;
		height: auto;
		margin-top: 2rem;
		text-align: center;
		font-size: 0.7rem;
		color: #62A1BE;
		line-height: 1rem;
		padding-bottom: 1rem;
	}

	.com_titel {
		width: 16rem;

		border-bottom: 1px solid #EAEDEF;
	}

	.com_titel>div:first-child {
		font-size: 0.8rem;
		color: #363636;
	}

	.com_titel>div:last-child {
		font-size: 0.5rem;
		color: #CBCDD0;
	}

	.com_right {
		font-size: 0.8rem;
		width: 50%;
		height: 3rem;
		line-height: 3rem;
		position: absolute;
		right: 1rem;
		top: 0;
		text-align: right;
	}

	.add {
		color: #F84E14;
	}

	.jian {

		color: #525252;
	}

	#mothinput {
		opacity: 0;
	}
	.sp1 {
		float: right;
		margin: 0.5rem 0.5rem 0 0;
		margin-top: 0.455rem;
	}

	.sp1 img {
		width: 0.9rem;
	}



	.auitime_list {
		width: 100%;
		height: 2.7rem;
		background-color: #F4F4F4;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 999;
	}

	.auitime_list .time_tlel_l {
		width: 5rem;
		height: 1.4rem;
		line-height: 1.4rem;
		float: left;
		margin-top: 0.65rem;
		margin-left: 0.75rem;
		border-radius: 0.8rem;
		background: #FFFFFF;
		font-size: 0.65rem;
		text-align: center;
	}

	.auitime_list .time_tlel_r {
		width: 50%;
		float: right;
		margin-top: 0.85rem;
		margin-right: 0.75rem;
		border-radius: 0.8rem;
		text-align: right;
	}

	.auitime_list .time_tlel_r p {
		font-size: 0.55rem;
		color: #929598;
	}

	.auitime_list .time_tlel_l img {
		display: inline-block;
		width: 0.4rem;
	}

	.mothinput {
		opacity: 0;
		width: 5%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.mothlabel {
		width: 30%;
		height: 2rem;
		position: absolute;
		top: 0;
		left: 0;
	}

    img.wumenkana{
		width: 7.75rem;
		height: 1.05rem;
	}
</style>
