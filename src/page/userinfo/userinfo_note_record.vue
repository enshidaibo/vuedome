<template>
	<div class="contop">

		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="bake()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title" @click="record()"> {{record_text}}
				<img src="../../assets/userinfo/retope1.png" />
			</div>
			<div id="record_text" class="aui-pull-right" @click="screen()">
				<img src="../../assets/userinfo/retope2.png" />
			</div>
		</header>
		<!-- <div id="record_time" class=" record_time">
            <div v-for="(d,index) in tabtime" class="btn_record_time " :class="{'active':d.state}" @click="tabtimeon(index)">{{d.name}}</div>
        </div> -->
		<div class="record_titel" id="record_titel">
			<div v-for="(d,index) in tab_noto" class=" tapmode " :class="{'active':d.state}" @click="tab_notoli(index)">{{d.neme}}</div>
		</div>
		<section class="aui-refresh-content">
			<div class="aui-content">
				<ul class="record_all_bets" id="record_all_bets">
					<!-- <div v-if="dataslength" class="londNull"><img src="../../assets/userinfo/retope4.png">
						<p>{{datastent}}…</p>
						<p>首次投注即可获得<span>1.88元</span></p>
						<p>二次投注即可获得<span>3.88元</span></p>
						<p @click="goucaiopen()">立即投注</p>
					</div> -->
					<lini-page :tpyes="'record'" :prompt='datastent' :zheight='"100vh"' :zwidth='"100vw"' :goText='"立即投注"' @tonewpage='goucaiopen'
					 v-if="dataslength"></lini-page>
					<li v-for='(d,i) in datas' :id=d.lotteryTypeKey :type=d.schemeId :title=d.shareType @click="toDetail(d.lotteryTypeKey,d.schemeId,d.shareType)"
					 class="li">
						<div class="li_toplist">
							<div class="all_bets_left">
								<img :src="require('../../assets/userinfo/'+d.lotteryTypeKey+'.png')" alt="暂无">

							</div>
							<div class="all_bets_in">
								<p>{{d.lotteryTypeText}}</p>
								<p>{{time[i]}}</p>
							</div>
						</div>
						<div class="all_bets_right">
							<p v-if='d.shareType=="SELF"'><span>自购：</span><span>{{d.subscribedCost}}元</span></p>
							<p v-else><span>合购：</span><span>{{d.subscribedCost}}元</span></p>
						</div>
						<div class="all_bets_btn">
							<p v-if='d.schemeStateHtml=="已中奖"' class="yizhongjiang"><span class="fonbw">{{d.schemeStateHtml}}</span> <span>+{{d.prizeAfterTax|getmoney()}}</span></p>
							<p v-else-if='d.schemeStateHtml=="已出票"' class="yichupiao"><span class="fonbw">{{d.schemeStateHtml}}</span></p>
							<p v-else-if='d.schemeStateHtml=="未中奖"' class="weizhongjiang"><span class="fonbw">{{d.schemeStateHtml}}</span></p>
							<p v-else-if='d.schemeStateHtml=="未出票"' class="weichupiao"><span class="fonbw">{{d.schemeStateHtml}}</span></p>
							<p v-else-if='d.schemeStateHtml=="撤单"' class="chedan"><span class="fonbw">{{d.schemeStateHtml}}</span></p>

						</div>
					</li>

				</ul>
				<no-more v-show='nomore' :bgcolor='"#EFF5FB"'></no-more>
			</div>
		</section>

		<div class="show_mengcheng" @click="record()" v-show="record_list">
		</div>
		<div class="show_list " id='show_list' v-show="record_list">

			<div v-for="(itemt,index) in tab_type" class=" caiborder " :class="{'active':itemt.state}" @click="tab_typelist(index)">{{itemt.neme}}</div>


		</div>
		<!-- 时间弹窗 -->
		<div v-if="popupVisible" class="maskBox" @click="hidePopup()"></div>
		<div v-if="popupVisible" class="timeDom">
			<p v-for="(item,index) in tabtime" @click="tabtimeon(index)">{{item.name}}</p>
			<!-- :class="{'active':item.state}" 用于变红 -->

		</div>
	</div>
</template>
<script>
	var pullToRefreshs;
	import {
		Toast,
		Loadmore,
		Indicator,
		MessageBox
	} from 'mint-ui';
	import {
		getCookie,
		setCookie,
		TypeCapitalconversionLowercase
	} from "../../js/common";
	export default {
		data() {
			return {
				nomore: false,
				topStatus: '',
				auiScroll: true,
				bottomStatus: '',
				datas: [],
				time: [],
				popupVisible: false,
				alert_text: true,
				"dataslength": false,
				record_list: false,
				record_text: '全部彩种',
				datastent: '暂无数据',
				type: '',
				// 查询的天数
				day: 0,
				// 开始时间
				startTime: '',
				// 结束时间
				endTime: '',
				// 方案类型
				schemestate: 0,
				// 页数
				page: 1,
				tabtime: [{
						'id': 1,
						'state': false,
						'name': '今天'
					}, {
						'id': 2,
						'state': false,
						'name': '昨天'
					}, {
						'id': 3,
						'state': true,
						'name': '本月'
					}, {
						'id': 4,
						'state': false,
						'name': '上月'
					},
					{
						'id': 5,
						'state': false,
						'name': '取消'
					}
				],
				tab_noto: [{
					'id': 1,
					'state': true,
					'neme': '全部投注'
				}, {
					'id': 2,
					'state': false,
					'neme': '未结投注'
				}, {
					'id': 3,
					'state': false,
					'neme': '最近中奖'
				}],
				tab_type: [{
						'id': 1,
						'state': true,
						'neme': '全部',
						recod_text: ''
					}, {
						'id': 2,
						'state': false,
						'neme': '双色球',
						recod_text: 'SSQ'
					}, {
						'id': 3,
						'state': false,
						'neme': '福彩3D',
						recod_text: 'WELFARE3D'
					},
					{
						'id': 4,
						'state': false,
						'neme': '排列三/五',
						recod_text: 'PL'
					},
					{
						'id': 5,
						'state': false,
						'neme': '七乐彩',
						recod_text: 'SEVEN'
					},
					{
						'id': 6,
						'state': false,
						'neme': '大乐透',
						recod_text: 'DLT'
					},
					{
						'id': 7,
						'state': false,
						'neme': '广东11选5',
						recod_text: 'GDEL11TO5'
					},
					{
						'id': 8,
						'state': false,
						'neme': '江西11选5',
						recod_text: 'JXEL11TO5'
					},
					{
						'id': 9,
						'state': false,
						'neme': '山东11运夺金',
						recod_text: 'SDEL11TO5'
					},

					// {
					// 	'id': 10,
					// 	'state': false,
					// 	'neme': '北京快乐八',
					// 	recod_text: 'BJKLB'
					// },
					{
						'id': 11,
						'state': false,
						'neme': '重庆时时彩',
						recod_text: 'CQSSC'
					},
					{
						'id': 12,
						'state': false,
						'neme': '新疆时时彩',
						recod_text: 'XJSSC'
					},
					{
						'id': 13,
						'state': false,
						'neme': '天津快乐十分',
						recod_text: 'TJKLSF'
					},
					{
						'id': 14,
						'state': false,
						'neme': '广东快乐十分',
						recod_text: 'GDKLSF'
					},
					{
						'id': 15,
						'state': false,
						'neme': '江苏快3',
						recod_text: 'JSK3'
					},
					{
						'id': 16,
						'state': false,
						'neme': '安徽快3',
						recod_text: 'AHK3'
					},
					{
						'id': 17,
						'state': false,
						'neme': '湖北快3',
						recod_text: 'HBK3'
					},
					{
						'id': 25,
						'state': false,
						'neme': '北京快3',
						recod_text: 'BJK3'
					},
					{
						'id': 18,
						'state': false,
						'neme': '北京单场',
						recod_text: 'DCZC'
					},
					{
						'id': 19,
						'state': false,
						'neme': '胜负彩',
						recod_text: 'SFZC'
					},
					{
						'id': 20,
						'state': false,
						'neme': '六场半全场',
						recod_text: 'LCZC'
					},
					{
						'id': 21,
						'state': false,
						'neme': '四场进球',
						recod_text: 'SCZC'
					},
					{
						'id': 22,
						'state': false,
						'neme': '竞彩足球',
						recod_text: 'JCZQ'
					},
					{
						'id': 23,
						'state': false,
						'neme': '竞彩篮球',
						recod_text: 'JCLQ'
					},
					{
						'id': 24,
						'state': false,
						'neme': '任选九场',
						recod_text: 'RXJC'
					}
				]
			}
		},
		filters: {
			getmoney: function(arr) {
				var num = (arr * 1).toFixed(2);
				return num;
			}
		},
		created() {
			this.tz_noto_record();
		},
		mounted() {
			var that = this;
			pullToRefreshs = new auiPullToRefresh({ //下拉刷新
				container: document.querySelector('.aui-refresh-content'), //下拉容器
				triggerDistance: 80 //下拉高度
			}, function(ret) {
				if (ret.status == "success") {
					that.auiScroll = false;
					that.$ajax.defaults.timeout = 49527; //49527这个值控制没有showLonding
					that.page = 1;
					that.tz_noto_record();
					setTimeout(() => {
						that.$ajax.defaults.timeout = 50000;
						pullToRefreshs.cancelLoading(); //刷新成功后调用此方法隐藏
					}, 1500)
				}
			});
			var scrolls = new auiScroll({ //上拉加载
				listen: false, //是否监听滚动高度，开启后将实时返回滚动高度
				distance: 200 //判断到达底部的距离，isToBottom为true
			}, function(ret) {
				if (ret.isToBottom == true && that.auiScroll && !that.nomore && !that.dataslength) {
					that.auiScroll = false;
					that.page++;
					that.tz_noto_record();
				}
			});
		},
		beforeDestroy() {
			//离开页面就还原刷新状态
			this.$ajax.defaults.timeout = 50000;
			// pullToRefreshs.cancelLoading(); //刷新成功后调用此方法隐藏
			this.auiScroll = false; //取消上拉监听
		},
		methods: {


			handleBottomChange(status) {
				// console.log(status)
				this.bottomStatus = status;
			},
			toDetail: function(key, id, type) {
				let betType = TypeCapitalconversionLowercase(key);
				if (betType) {
					key = betType
				}
				let path;
				switch (key) {
					case "ssq":
						path = "1";
						break;
					case "dlt":
						path = "1";
						break;
					case "pl":
						path = "1";
						break;
					case "pl3":
						path = "1";
						break;
					case "pl5":
						path = "1";
						break;
					case 'tjkls':
						path = "1";
						break;
					case 'kl8':
						path = "1";
						break;
					case 'gdkls':
						path = "1";
						break;
					case 'fc3d':
						path = "1";
						break;
					case "welfare3d":
						path = "1";
						break;
					case "seven":
						path = "1";
						break;
					case "bjklb":
						path = "1";
						break;
					case "sdel11to5":
						path = "1";
						break;
					case "cqssc":
						path = "1";
						break;
					case "xjssc":
						path = "1";
						break;
					case "gdel11to5":
						path = "1";
						break;
					case "jxel11to5":
						path = "1";
						break;
					case "gdklsf":
						path = "1";
						break;
					case "tjklsf":
						path = "1";
						break;
					case "ahk3":
						path = "1";
						break;
					case "hbk3":
						path = "1";
						break;
					case "jsk3":
						path = "1";
						break;
					case "bjk3":
						path = "1";
						break;
					case "jczq":
						path = "2";
						break;
					case "jclq":
						path = "2";
						break;
					case "dczc":
						path = "2";
						break;
					case "fc3d":
						path = "1";
						break;
					case "sczc":
						path = "2";
						break;
					case "sfzc":
						path = "2";
						break;
					case "lczc":
						path = "2";
						break;
					case "rxjc":
						path = "2";
						break;
					case "sfzc14":
						path = "2";
						break;
				}
				if (type == 'SELF') {
					if (path == 1) {
						this.$router.push({
							path: '/userinfo/scheme_detail_alone_shuzicai',
							query: {
								key,
								id
							}
						})
					} else {
						this.$router.push({
							path: '/userinfo/scheme_detail_alone',
							query: {
								key,
								id
							}
						})
					}
				} else {
					if (path == 1) {
						this.$router.push({
							path: '/userinfo/chipped_detail_alone_shuzicai',
							query: {
								key,
								id
							}
						})
					} else {
						this.$router.push({
							path: '/userinfo/chipped_detail_alone',
							query: {
								key,
								id
							}
						})
					}
				}
			},
			// 跳转购彩页面
			goucaiopen: function() {
				console.log(111);
				this.$router.push({
					name: 'goucai'
				})
			},
			// 显示弹窗
			screen: function() {
				this.popupVisible = true;
			},
			hidePopup: function() {
				this.popupVisible = false;
			},
			timeChange: function(index) {

				var index = index;
				console.log(index);
				this.popupVisible = false;

			},


			handleTopChange(status) {
				this.topStatus = status;
			},
			tabtimeon: function(index) {
				console.log(index);
				this.popupVisible = false;
				if (index == 4) {
					return;
				}

				this.dataslength = false;

				for (var n = 0; n < this.tabtime.length; n++) {
					this.tabtime[n].state = false;
				}
				this.tabtime[index].state = true;
				this.page = 1;
				this.day = index + 1;
				this.datas = [];
				this.time = [];
				Indicator.open('加载中');
				this.tz_noto_record();
				Indicator.close();
			},
			tab_notoli: function(index) {

				this.dataslength = false;
				for (var n = 0; n < this.tab_noto.length; n++) {
					this.tab_noto[n].state = false;
				}
				this.tab_noto[index].state = true;
				this.page = 1;
				if (index == 0) {
					this.schemestate = 0;

					this.datastent = '暂无数据';
				} else if (index == 1) {
					this.schemestate = 7;
					this.datastent = '暂无数据';
				} else if (index == 2) {
					this.schemestate = 1;
					this.datastent = '暂无数据';
				}
				this.datas = [];
				this.time = [];
				Indicator.open('加载中');
				this.tz_noto_record();
				Indicator.close();
			},
			tab_typelist: function(index) {

				this.dataslength = false;
				for (var n = 0; n < this.tab_type.length; n++) {
					this.tab_type[n].state = false;
				}
				this.tab_type[index].state = true;
				this.record_list = false;
				this.type = this.tab_type[index].recod_text;
				if (this.tab_type[index].neme == '全部') {
					this.record_text = '全部彩种';
				} else {
					this.record_text = this.tab_type[index].neme;
				}
				this.page = 1;
				this.datas = [];
				this.time = [];
				Indicator.open('加载中');
				this.tz_noto_record();
				Indicator.close();
			},
			record: function() {
				if (this.record_list) {
					this.record_list = false;
				} else {
					this.record_list = true;
				}
			},

			// 获取时间
			GetDateStr: function(day, AddDay) {
				var dd = new Date(day.replace(new RegExp(/-/gm), "/"));
				dd.setDate(dd.getDate() + AddDay); //获取AddDayCount天后的日期
				var y = dd.getFullYear();
				var m = dd.getMonth() + 1; //获取当前月份的日期
				var d = dd.getDate();
				if (m < 10) m = "0" + m;
				if (d < 10) d = "0" + d;
				return y + "-" + m + "-" + d;
			},

			Get0pad: function(num, n) {
				var len = num.toString().length;
				while (len < n) {
					num = "0" + num;
					len++;
				}
				return num;
			},
			//时间节点转换
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
			// 时间节点二次转换成
			allcardulilst: function allcardulilst(obg) {
				var alllist = [];
				for (var i = 0; i < obg.length; i++) {
					var name = this.GetTimeStrfromnum(obg[i].createTime);
					alllist.push(name);
				}
				return alllist;
			},

			NumLength2: function(num) {
				if (num < 10) return "0" + num;
				else return num;
			},
			tz_noto_record: function() {
				var nowt = new Date().getFullYear() + "-" + this.NumLength2(new Date().getMonth() + 1) + "-" + this
					.NumLength2(new Date()
						.getDate());
				// this.dataslength = false;
				if (this.day == 1) {
					this.startTime = nowt;
					this.endTime = nowt;
				} else if (this.day == 2) {
					this.startTime = this.GetDateStr(nowt, -1);
					this.endTime = this.GetDateStr(nowt, -1);
				} else if (this.day == 3) {
					var notime = new Date();
					var getyeur = notime.getFullYear();
					var getmonth = notime.getMonth() + 1;
					var getday = new Date(getyeur, getmonth, 0).getDate();
					this.startTime = getyeur + "-" + getmonth + "-1";
					this.endTime = getyeur + "-" + getmonth + "-" + getday;
				} else if (this.day == 4) {
					var notime = new Date();
					var getyeur = notime.getFullYear();
					var getmonth = notime.getMonth();
					if (getmonth == 0) {
						getmonth = 12;
					}
					var getday = new Date(getyeur, getmonth, 0).getDate();
					this.startTime = getyeur + "-" + getmonth + "-1";
					this.endTime = getyeur + "-" + getmonth + "-" + getday;
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
				data["type"] = this.type;
				data["schemestate"] = this.schemestate;
				data["rows"] = 10;
				data["page"] = this.page;
				data["startTime"] = this.startTime;
				data["endTime"] = this.endTime;

				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.collectSchemeList(datas);
			},
			collectSchemeList: function(datas) {
				this.nomore = false;
				this.$ajax.post('/caipiaoshouye/index.php/home/index/collectSchemeList',
						datas
					)
					.then(res => {
						var content = JSON.parse(res.data.content);
						if (res.data.status == 200) {
							if (content.code == 100000) {
								var data = content.data.obj;
								var time = content.data.obj;
								var imgefr = content.data.obj;
								var times = this.allcardulilst(time);
								console.log(JSON.stringify(data));
								if (data.length < 1) {
									this.auiScroll = false;
									if (this.datas.length > 0) {
										this.nomore = true;
									}
									// Toast('没有更多数据了！')
								}
								if (content.data.pages == 0) {
									this.auiScroll = false;
									if (this.page == 1) {
										this.dataslength = true
									}
								} else {
									this.auiScroll = true;
									this.alert_text = false;
									if (this.page == 1) {
										this.time = times;
										this.datas = data;
										console.log(data.length)
									} else {
										this.time = this.time.concat(times);
										this.datas = this.datas.concat(data);
										console.log(data.length);

									}
									if (this.datas.length == 0 && this.page == 1) {
										this.dataslength = true
									} else {
										this.dataslength = false
									}
								}

							} else if (content.code == "201010") {
								Toast("账户已被锁定，请联系客服");
								setCookie('newData', '', '0-S');
								this.$router.push({
									name: 'login'
								})
							}
						} else if (res.data.status == 500) {
							this.auiScroll = false;
							if (this.page == 1) {
								this.dataslength = true
							}
							Toast('服务器异常，请稍后重试！')
						}

					})
					.catch(err => {
						console.log(err);
					})
			},
			bake: function() {
				this.$router.go(-1); //根据浏览器记录返回上一次
			}
		}
	}
</script>
<style scoped>
.aui-bar-nav {
    background-color: #03a9f4 !important;
    color: #ffffff;
}
.aui-title {
	    color: #fff !important;
	}
	.contop {
		background: #f4f4f4;
		min-height: 100vh;
	}

	header {
		position: fixed !important;
	}
	
	.aui-refresh-content {

		top: 5.05rem;


	}

	.aui-refresh-pull-down .aui-refresh-pull-arrow {
		top: 30% !important
	}

	.aui-refresh-pull-up .aui-refresh-pull-arrow {
		top: 30% !important
	}

	.aui-refreshing .aui-refresh-pull-arrow {
		top: 30% !important
	}

	.aui-title img {
		display: inline-block;
		width: 0.4rem;
		height: 0.4rem;
	}

	.aui-pull-right {
		padding-top: 0.725rem;
		padding-right: 0.8rem;
	}

	.aui-pull-right img {
		width: 0.8rem;
		height: 0.8rem;
	}

	.show_mengcheng {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.8;
		z-index: 1;

	}

	.show_list {
		width: 100%;
		height: auto;
		position: fixed;
		top: 2.25rem;
		left: 0;
		z-index: 2;
		display: flex;
		flex-wrap: wrap;
		background: #FFFFFF;
		padding: 2.2%;

	}

	.caiborder {
		width: 30%;
		margin: 1.5% 0;
		text-align: center;
		height: 2.4rem;
		box-sizing: border-box;
		line-height: 2.4rem;
		z-index: 2;
		font-size: 0.65rem;
		background: rgba(245, 250, 255, 1);
		margin-left: 2.46%;
	}

	.show_list .active {
		background: rgba(228, 88, 105, 1);
		color: #FFFFFF;
	}

	.record_time {
		width: 100%;
		height: 2rem;
		text-align: center;
		font-size: 0px;
		letter-spacing: -4px;
		position: fixed;
		top: 2.25rem;
		left: 0;
		z-index: 1;
	}

	.btn_record_time {
		display: inline-block;
		width: 25%;
		height: 2rem;
		letter-spacing: normal;
		line-height: 2rem;
		font-size: 0.7rem;
		border-bottom: #0076C3 1px solid;
		vertical-align: top;
		background-color: #f4f4f4;
	}

	.record_time .active {
		background-color: #0076C3;
		color: #fff;
	}


	/*投注状态筛选*/

	.record_titel {
		width: 100%;
		height: 2.8rem;
		text-align: center;
		display: flex;
		padding: 0 3%;
		position: fixed;
		top: 2.25rem;
		left: 0;
		background-color: #fff;
		z-index: 1;
	}

	.record_titel div {
		flex: 1;
		margin: 0 auto;
		height: 2.8rem;
		line-height: 2.8rem;
		font-size: 0.8rem;
		color: #6D6D6D;
	}

	.record_titel div:nth-child(2) {
		margin: 0 5%;
	}

	.record_titel .active {
		border-bottom: #03A9F4 2px solid;
		color: #03A9F4;
		font-weight: bold;
	}


	/*全部投注*/

	.record_all_bets {
		width: 100%;
		height: auto;
		/* margin-top: 7.05rem; */
		/* margin-bottom: 3.6rem; */
		padding: 0% 2% 2% 0%;
		display: flex;
		flex-wrap: wrap;
		background: #EFF5FB;
	}

	.mui-scroll-wrapper {
		top: 5.05rem;
		background-color: #EFF5FB;
	}

	.record_all_bets li {
		width: 48%;
		height: auto;
		background-color: #FFFFFF;
		margin-left: 2%;
		margin-top: 2%;
		padding-top: 0.8rem;
		border-radius: 2px;
		border: 1px solid #EEEEEE;

	}

	.record_all_bets li .li_toplist {
		width: 100%;

		display: flex;
	}

	.all_bets_left {
		width: 35%;
		height: 2rem;
		display: flex;
		/*padding-right:  0.3rem;*/
	}

	.all_bets_left img {
		height: 2rem;
		margin: auto;
	}

	.all_bets_in {
		width: 65%;
		height: 2rem;
		padding: 0.2rem 0rem;
	}

	.all_bets_in p:first-child {
		width: 100%;
		height: 1rem;
		font-size: 0.7rem;
		font-weight: bold;

		color: #4A4A4A;
	}

	.all_bets_in p:last-child {
		height: 0.65rem;
		width: 100%;
		font-size: 0.45rem;

		color: #A5A5A5;
	}

	.all_bets_right {
		width: 100%;
		height: auto;
		line-height: 1.55rem;
		padding-top: 0.2rem;
	}

	.all_bets_right p {
		width: 100%;
		font-size: 0.6rem;
		text-align: center;
		display: flex;
		color: #4A4A4A;
	}


	.all_bets_right p:last-child span:first-child {
		width: 35%;
	}

	.all_bets_right p:last-child span:last-child {
		width: 65%;
		text-align: left;
	}

	.all_bets_btn {
		width: 100%;
		height: auto;
		background: #F0F8FF;

	}

	.all_bets_btn p {
		width: 100%;
		text-align: center;
		line-height: 1.7rem;
		color: #03A9F4;
		font-size: 0.65rem;
	}

	.all_bets_btn p .fonbw {
		font-weight: 500;

	}

	/*状态显示颜色*/

	.all_bets_btn .weichupiao {
		color: #9B9B9B;
	}

	.all_bets_btn .yizhongjiang {
		color: #E45869;
	}

	.all_bets_btn .yichupiao {
		color: #5FA3EB
	}

	.all_bets_btn .weizhongjiang {
		color: #FDC10A;
	}

	.all_bets_btn .chedan {
		color: #170F86;
	}

	.londNull {
		width: 100%;
		height: 100vh;
		box-sizing: border-box;
		padding-top: 3.65rem;
	}

	.londNull img {
		/* width: 64%; */
		height: 5.5rem;
		margin: auto;
	}

	.londNull p:nth-child(2) {
		width: 100%;
		height: auto;
		margin-top: 0.95rem;
		text-align: center;
		font-size: 0.85rem;
		color: #AAE2FC;

	}

	.londNull p:nth-child(3) {
		width: 100%;
		height: auto;
		line-height: 0.85rem;
		text-align: center;
		font-size: 0.6rem;
		color: #8C8C8C;
		padding-top: 1rem;
	}

	.londNull p:nth-child(4) {
		width: 100%;
		height: auto;
		line-height: 0.85rem;
		text-align: center;
		font-size: 0.6rem;
		padding-top: 0.2rem;
		color: #8C8C8C;
	}

	.londNull p:nth-child(5) {
		width: 74.6%;
		margin: auto;
		margin-top: 0.5rem;
		line-height: 2.2rem;
		text-align: center;
		font-size: 0.85rem;
		color: #FFFFFF;
		height: 2.2rem;
		background: rgba(228, 88, 105, 1);
		border-radius: 1.15rem;
	}

	.londNull p span {
		font-weight: 500;
		color: #E45869;
	}

	/* 时间弹窗 */
	.maskBox {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		z-index: 98;
		background: rgba(0, 0, 0, .5);
	}

	.timeDom {
		width: 94%;
		height: auto;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 99;
		margin: 0 3% 3% 3%;
	}

	.timeDom .active {
		color: #E45869;
	}

	.timeDom p {
		width: 100%;
		height: 2.2rem;
		text-align: center;
		line-height: 2.2rem;
		font-size: 14px;
		background: #fff;
		border-bottom: 1px solid #c8c8c8;
		color: #3F93F5;
	}

	.timeDom p:nth-child(1) {
		border-top-left-radius: 0.3rem;
		border-top-right-radius: 0.3rem;
	}

	.timeDom p:nth-child(5) {
		border-bottom-left-radius: 0.3rem;
		border-bottom-right-radius: 0.3rem;
	}

	.timeDom p:last-child {
		margin-top: 3%;
		border-radius: 0.3rem;
	}

	.aui-pull-right:active {
		transform: scale(0.8);
	}

	.li:active {
		background: #f3f1f1;
	}
</style>
