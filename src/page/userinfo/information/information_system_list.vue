<template>
	<div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="closeWin()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">系统通知</div>
			<div @click="onadmin()" class="aui-pull-right aui-btn">
				<span id="xzyh">{{ onadminText }}</span>
			</div>
		</header>
		<section class="information_system_list">
			<section class="aui-refresh-content">
				<div class="main_list" v-if="defaultPage">
					<div class="li" v-for="(item,index) in dataList" @click="listJump(index,item.id,item.type)">
						<div :class="['choice',item.choice?'selection':'']" v-if="administration"></div>
						<div class="cont">
							<div :class="['li-icon','li-icon'+item.type]"></div>
							<p class="p1" :class="administration?'p1selection':''">{{ item.headline }}</p>
							<p class="p2" :class="administration?'p2selection':''">{{ item.intro }}</p>
							<span class="time" :class="administration?'timeselection':''">{{ item.createTime|getTime() }}</span>
							<span class="red-dot" :class="administration?'redDotselection':''" v-if="item.status == 1"></span>
						</div>
					</div>
					<div class="li-bott" v-if="administration"></div>
				</div>
				<div class="default" v-else>
					<img src="../../../../static/information/default_icon.png" />
					<p>您暂时还没有任何消息！</p>
				</div>
				<div class="aui-scroll" v-if="defaultPage&&scrollShow&&dataList.length>9">{{scrollText}}</div>
			</section>
			<div class="admin_footer" v-if="administration">
				<div :class="['whole',wholeSelec?'selection':'']" @click="onwhole">全部</div>
				<div class="delete" @click="deleteList">删除</div>
				<div class="read" @click="onRead">一键读取</div>
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
	var interval;
	export default {
		data() {
			return {
				userId: '',
				page: 1,
				size: 10,
				scrollShow: true,
				auiScroll: true,
				scrollText: '上拉加载更多',
				pullRefresh: '',
				defaultPage: true,
				administration: false,
				onadminText: '管理',
				wholeSelec: false,
				dataList: [],
				readNumber: 0,
			};
		},
		beforeRouteLeave(to, from, next) {
			this.auiScroll = false;
		    clearInterval(interval);
		    next();
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
			Indicator.open("加载中");
			this.onLoading();
			// 下拉刷新
			this.pullRefresh = new auiPullToRefresh({
				container: document.querySelector('.aui-refresh-content'),
				triggerDistance: 100
			}, (ret => {
				if (ret.status == "success") {
					setTimeout(() => {
						this.onLoading();
					}, 1000)
				}
			}));
			// 上拉加载更多
			this.scroll = new auiScroll({
				listen: true, //是否监听滚动高度，开启后将实时返回滚动高度
				distance: 0 //判断到达底部的距离，isToBottom为true
			}, (ret => {
				if (ret.isToBottom && ret.scrollTop > 0 && this.auiScroll) {
					this.scrollText = '正在加载...';
					this.auiScroll = false;
					setTimeout(() => {
						this.page++;
						this.puthList();
					}, 500)
				}
			}));
		},
		methods: {
			closeWin: function() {
				this.$router.go(-1);
			},
			// 获取列表数据
			onLoading: function() {
				this.page = 1;
				var data = [];
				data["mid"] = OverallData().mid;
				data["uid"] = this.userId;
				data["yesOrNo"] = false;
				data["page"] = this.page;
				data["size"] = this.size;
				data["notificationType"] = 1;
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
								if (data.data.length == 0) {
									this.scrollShow = false;
                                    this.defaultPage = false;
								} else {
									for (let i = 0; i < data.data.length; i++) {
										data.data[i]["choice"] = false;
									}
								}
								this.dataList = JSON.parse(JSON.stringify(data.data));
								if (this.dataList.length > 9) {
									this.auiScroll = true;
								} else {
									this.auiScroll = false;
									this.scrollText = '没有更多数据了';
								}
								this.onLoadRead();
							} else {
								Toast(data.message);
							}
							Indicator.close();
						}
						this.pullRefresh.cancelLoading(); //刷新成功后调用此方法隐藏
					})
					.catch(err => {
						console.log(err);
						this.pullRefresh.cancelLoading(); //刷新成功后调用此方法隐藏
					})
			},
			// 加载更多数据
			puthList: function() {
				var data = [];
				data["mid"] = OverallData().mid;
				data["uid"] = this.userId;
				data["yesOrNo"] = false;
				data["page"] = this.page;
				data["size"] = this.size;
				data["notificationType"] = 1;
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
								if (data.data.length > 0) {
									for (let i = 0; i < data.data.length; i++) {
										data.data[i]["choice"] = false;
									}
									this.dataList.push(...JSON.parse(JSON.stringify(data.data)));
									this.scrollText = '上划加载更多';
									this.auiScroll = true;
								} else {
									this.auiScroll = false;
									this.scrollText = '没有更多数据了';
								}
							} else {
								Toast(data.message);
								this.scrollText = '上划加载更多';
								this.auiScroll = true;
							}
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			onLoadRead: function() {
				clearInterval(interval);
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
							
				        } else {
				            var data = res.data.content;
				            if (data.code == '1000') {
								this.readNumber = data.data.system;
								interval = setInterval(() => {
									this.getReadNumber();				
								},10000);
				            } else {
								return;
							}
				        }
				    })
				    .catch(err => {
				        console.log(err);
						return;
				    })
			},
			// 获取未读条数
			getReadNumber: function() {
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
							
				        } else {
				            var data = res.data.content;
				            if (data.code == '1000') {
								var newReadNumber = data.data.system*1;
								if (newReadNumber > this.readNumber) {
									var size = newReadNumber - this.readNumber;
									this.newList(size);
									this.readNumber = newReadNumber;
								}
				            } else {
								return;
							}
				        }
				    })
				    .catch(err => {
				        console.log(err);
						return;
				    })
			},
			// 获取新消息
			newList: function(size) {
				console.log(size);
				var data = [];
				data["mid"] = OverallData().mid;
				data["uid"] = this.userId;
				data["yesOrNo"] = false;
				data["page"] = 1;
				data["size"] = size;
				data["notificationType"] = 1;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getUserMessageNotification',
						datas
					)
					.then(res => {
						var data = res.data.content;
						console.log(data);
						if (data.code == '1000') {
							var newDataArr = JSON.parse(JSON.stringify(data.data))
							for (var i = 0; i < newDataArr.length; i++) {
								newDataArr[i]["choice"] = false;
								this.dataList.unshift(newDataArr[i]);
							}
						} else {
							Toast(data.message);
						}
					})
			},
			// 点击管理
			onadmin: function() {
				if (this.administration) {
					this.onadminText = '管理';
					this.administration = false;
					this.wholeSelec = false;
					for (var i = 0; i < this.dataList.length; i++) {
						this.dataList[i].choice = false;
					}
				} else {
					this.onadminText = '完成';
					this.administration = true;
				}
			},
			// 选信息
			onChoice: function(index) {
				console.log(this.dataList[index]);
				if (this.dataList[index].choice) {
					this.dataList[index].choice = false;
				} else {
					this.dataList[index].choice = true;
				}
			},
			// 点击全选
			onwhole: function() {
				this.wholeSelec = !this.wholeSelec;
				for (var i = 0; i < this.dataList.length; i++) {
					this.dataList[i].choice = this.wholeSelec;
				}
			},
			// 删除
			deleteList: function() {
				var deArr = '';
				for (let i = 0; i < this.dataList.length; i++) {
					if (this.dataList[i].choice) {
						deArr = deArr + this.dataList[i].id + ','
					}
				}
				if (deArr == '') {
					Toast("请选择消息！");
					return false;
				}
				var data = [];
				data["mid"] = OverallData().mid;
				data["uid"] = this.userId;
				data["listId"] = deArr;
				data["status"] = 3;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getDeleteOrRead',
						datas
					)
					.then(res => {
						if (res.data.status != 200) {
							Toast("服务器连接失败,请稍后重试");
						} else {
							var data = res.data.content;
							if (data.code == '1000') {
								for (let i = 0; i < this.dataList.length;) {
									if (this.dataList[i].choice) {
										this.dataList.splice(i, 1);
									} else {
										i++
									}
								}
								Toast('删除成功！');
								this.onadmin();
								this.onLoading();
							} else {
								Toast(data.message);
							}
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			// 读取
			onRead: function() {
				var deArr = '';
				for (let i = 0; i < this.dataList.length; i++) {
					if (this.dataList[i].choice) {
						deArr = deArr + this.dataList[i].id + ','
					}
				}
				if (deArr == '') {
					Toast("请选择消息！");
					return false;
				}
				var data = [];
				data["mid"] = OverallData().mid;
				data["uid"] = this.userId;
				data["listId"] = deArr;
				data["status"] = 1;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getDeleteOrRead',
						datas
					)
					.then(res => {
						if (res.data.status != 200) {
							Toast("服务器连接失败,请稍后重试");
						} else {
							var data = res.data.content;
							if (data.code == '1000') {
								for (let i = 0; i < this.dataList.length; i++) {
									if (this.dataList[i].choice) {
										this.dataList[i].status = 2;
									}
								}
								this.onadmin();
								this.onLoadRead();
							} else {
								Toast(data.message);
							}
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			// 跳转
			listJump: function(index, id, type) {
				if (this.administration) {
					this.onChoice(index);
				} else if (this.dataList[index].isSystem) {
					this.$router.push({
						path: '/userinfo/information_bulletin',
						query: {
							'articleId': id,
							'bool': true
						}
					})
				} else {
					this.dataList[index].status = 2;
					switch (type){
						case 0:
							this.$router.push({
								path: '/userinfo/information/information_details_tc',
								query: {
									'id': id,
									'type': 0
								}
							})
							break;
						case 2:
							this.$router.push({
								path: '/userinfo/information/information_details_tc',
								query: {
									'id': id,
									'type': 2
								}
							})
							break;
						default:
							this.$router.push({
								path: '/userinfo/information/information_details',
								query: {
									'id': id
								}
							})
							break;
					}
				}
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
	.aui-refresh-content {
		top: 0;
	}

	.aui-scroll {
		width: 100%;
		height: 1.75rem;
		text-align: center;
		font-size: 0.26rem;
		color: #333;
		line-height: 1.75rem;
	}

	.information_system_list {
		padding-top: 2.25rem;
		background-color: #ffffff;
		min-height: 100vh;
	}

	.information_system_list .main_list {
		width: 100%;
		height: auto;
		background-color: #fff;
		padding: 0 0 0 0.5rem;
	}

	.information_system_list .main_list .li {
		width: 100%;
		height: 4rem;
		border-bottom: 1px solid #EDEDED;
		display: flex;
		overflow: hidden;
	}

	.information_system_list .main_list .li .choice {
		flex: 0 0 auto;
		width: 2.2rem;
		height: 4rem;
		background-image: url(../../../../static/information/choice_false.png);
		background-repeat: no-repeat;
		background-position: 0.7rem 50%;
		background-size: 0.8rem 0.8rem;
	}

	.information_system_list .main_list .li .choice.selection,
	.information_system_list .admin_footer .whole.selection {
		background-image: url(../../../../static/information/choice_true.png);
	}

	.information_system_list .main_list .li .cont {
		flex: 0 0 auto;
		width: 100%;
		height: 4rem;
		padding-left: 2.5rem;
		padding-right: 2.7rem;
		padding-top: 0.7rem;
		position: relative;
	}

	.information_system_list .main_list .li .li-icon {
		width: 2rem;
		height: 2rem;
		position: absolute;
		top: 50%;
		left: 0;
		margin-top: -1rem;
		background-image: url(../../../../static/information/notice.png);
		background-repeat: no-repeat;
		background-position: left 50%;
		background-size: 100% 100%;
	}

	.information_system_list .main_list .li .p1 {
		width: 87%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.75rem;
		font-family: PingFangSC;
		color: #333333;
		line-height: 1.34rem;
	}
    .information_system_list .main_list .li .p1selection{
    	width: 60%;
    }
	.information_system_list .main_list .li .p2 {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.65rem;
		font-family: PingFangSC-Regular;
		color: ##9B9B9B;
		line-height: 1rem;
	}

	.information_system_list .main_list .li .time {
		width: auto;
		height: auto;
		position: absolute;
		right: 0.5rem;
		top: 0.7rem;
		font-size: 0.5rem;
		font-family: PingFangSC;
		color: rgb(178, 178, 178);
		line-height: 1rem;
	}
    .information_system_list .main_list .li .timeselection{
    	right: 2.8rem;
    }
	.information_system_list .main_list .li .red-dot {
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 0.2rem;
		background-color: #F9455B;
		position: absolute;
		right: 0.5rem;
		top: 58%;
	}
	.information_system_list .main_list .li-bott {
		width: 100%;
		height: 3.6rem;
	}
	.information_system_list .admin_footer {
		width: 100%;
		height: 2.5rem;
		background-color: #ffffff;
		padding: 0 0.5rem;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 9;
	}

	.information_system_list .admin_footer .whole {
		width: auto;
		height: 2.5rem;
		float: left;
		padding-left: 2.2rem;
		background-image: url(../../../../static/information/choice_false.png);
		background-repeat: no-repeat;
		background-position: 0.7rem 50%;
		background-size: 0.8rem 0.8rem;
		font-size: 0.7rem;
		font-family: PingFangSC;
		color: rgba(51, 51, 51, 1);
		line-height: 2.5rem;
	}

	.information_system_list .admin_footer .read {
		width: 4.5rem;
		height: 1.35rem;
		margin-top: 0.575rem;
		margin-right: 0.45rem;
		float: right;
		border-radius: 0.125rem;
		border: 1px solid rgba(255, 174, 45, 1);
		font-size: 0.7rem;
		font-family: PingFangSC;
		color: rgba(255, 174, 45, 1);
		line-height: 1.35rem;
		text-align: center;
	}

	.information_system_list .admin_footer .delete {
		width: 3.45rem;
		height: 1.35rem;
		margin-top: 0.575rem;
		float: right;
		border-radius: 0.125rem;
		border: 1px solid rgba(228, 88, 105, 1);
		font-size: 0.7rem;
		font-family: PingFangSC;
		color: rgba(228, 88, 105, 1);
		line-height: 1.35rem;
		text-align: center;
	}

	.information_system_list .main_list .li .li-icon1 {
		background-image: url(../../../../static/information/winning_prize.png);
	}

	.information_system_list .main_list .li .li-icon3,.information_system_list .main_list .li .li-icon24 {
		background-image: url(../../../../static/information/luck_draw.png);
	}

	.information_system_list .main_list .li .li-icon0 {
		background-image: url(../../../../static/information/income.png);
	}

	.information_system_list .main_list .li .li-icon2 {
		background-image: url(../../../../static/information/recharge.png);
	}

	.default {
		width: 100%;
		height: auto;
		padding-top: 5.475rem;
		text-align: center;
	}

	.default img {
		display: block;
		width: 7.5rem;
		height: 7.5rem;
		margin: auto;
	}

	.default p {
		margin-top: 1rem;
		font-size: 0.75rem;
		font-family: PingFangSC;
		color: rgb(51, 51, 51);
		line-height: 1.05rem;
	}
		.information_system_list .main_list .li .redDotselection{
		right: 2.8rem;
	}
	.information_system_list .main_list .li .p2selection{
		width: 80%;
	}
</style>
