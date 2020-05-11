<template>
	<div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn">
				<span class="aui-iconfont aui-icon-left" @click="bake()"></span>
			</div>
			<div class="aui-title">追号记录</div>
			<div class="aui-btn aui-pull-right" id="cp_name" @click="tkrecord()">
				{{record_text}}
			</div>
		</header>
		<div class="show_mengcheng" v-show="record_list" @click="tkrecord()">
		</div>
		<div class="show_list" id="cp_type" v-show="record_list">
			<div v-for="(itemt,index) in tab_type" class="aui-col-xs-4 caiborder " :class="{'active':itemt.state}" @click="tab_typelist(index)">{{itemt.neme}}</div>
		</div>
		<div class="record_titel" id="record_titel">
			<div v-for="(d,index) in tab_noto" class=" tapmode " :class="{'active':d.state}" @click="tab_notoli(index)">{{d.neme}}</div>

		</div>
		<section class="aui-refresh-content">
			<div class="aui-content">
				<ul class="record_all_bets" id="record_all_bets" style="display:block">

				<!-- 	<div v-if="dataslength" class="londNull"><img src="../../assets/userinfo/yiyiyi.png">
						<p>还没有追号记录…</p>
					</div> -->
					<lini-page v-if="dataslength"  :prompt='"您还没有追号记录..."' :zheight='"100vh"' :zwidth='"100%"'  :tpyes="'record'"></lini-page>
					<li v-for='(d,i) in datas' :data-id="d.id" :data-lotteryType="d.lotteryType" @click="userinfo_track_data(i)">
						<div class="all_bets_left">
							<img :src="require('../../assets/userinfo/'+imgUrls[i]+'.png')" alt="暂无">
						</div>
						<div class="all_bets_in">
							<p>
								<span>自购</span>
								<span><span style="color:#FF0000;background:none;" v-if='d.chaseStateText=="已停止"'>{{d.chasedCost}}</span><span
									 style="background:none;color:#09A9F3;" v-else>{{d.chasedCost}}</span>/{{d.totalCost}}元 - <span style="color:#FF0000;background:none;"
									 v-if='d.chaseStateText=="已停止"'>{{d.chasedSize}}</span><span style="background:none;color:#09A9F3;" v-else>{{d.chasedSize}}</span>/{{d.chaseTotalSize}}期</span>
							</p>
							<p>
								<span>
									{{d.createTime|formatDate(2)}}
								</span>
								<span style="color:#FF0000" v-if='d.chaseStateText=="已停止"'>
									（{{d.chaseStateText}}）
								</span>
								<span style="color:#09A9F3;" v-else>
									（{{d.chaseStateText}}）
								</span>
							</p>
						</div>
						<div class="all_bets_right">

						</div>
					</li>
				</ul>
				<no-more v-show='nomore' ></no-more>
			</div>
		</section>
	</div>
</template>
<script>
	var pullToRefreshs;
	import {
		getTime
	} from "../../js/common";
	import {
		Toast,
		Loadmore,
		Indicator,
		MessageBox
	} from 'mint-ui';
	import {
		getCookie,
		TypeCapitalconversionLowercase
	} from "../../js/common";
	export default {
		data() {
			return {
				nomore:false,
				topStatus: '',
				auiScroll: true,
				bottomStatus: '',
				datas: [],
				imgUrls: [],
				dataslength: false,
				record_list: false,
				record_text: '全部彩种',
				type: '',
				// 查询的天数
				day: 1,
				state: '',
				// 方案类型
				schemestate: 0,
				// 页数
				page: 1,

				tab_noto: [{
					'id': 1,
					'state': true,
					'neme': '全部'
				}, {
					'id': 2,
					'state': false,
					'neme': '追号中'
				}, {
					'id': 3,
					'state': false,
					'neme': '已完结'
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
						'neme': '竞彩蓝球',
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

			formatDate(time, num) {
				var date = new Date(time);
				return getTime(date, num);
			}

		},
		created() {
			Indicator.open('加载中');
			this.zh_track_record();
			Indicator.close();
		},

		mounted() {
			var that = this;
		    pullToRefreshs = new auiPullToRefresh({ //下拉刷新
			container: document.querySelector('.aui-refresh-content'), //下拉容器
			triggerDistance: 80 //下拉高度
		}, function(ret) {
			if (ret.status == "success") {
				that.auiScroll = false;
// 				that.imgUrls = [];
// 				that.datas = [];
				that.page = 1;
				that.$ajax.defaults.timeout  =  49527;//49527这个值控制没有showLonding
				that.zh_track_record();
				setTimeout(() => {
					that.$ajax.defaults.timeout  = 50000;
					pullToRefreshs.cancelLoading(); //刷新成功后调用此方法隐藏
				}, 1500)
			}
		});
		var scrolls = new auiScroll({ //上拉加载
			listen: false, //是否监听滚动高度，开启后将实时返回滚动高度
			distance: 200 //判断到达底部的距离，isToBottom为true
		}, function(ret) {
			if (ret.isToBottom == true && that.auiScroll&&!that.nomore&&!that.dataslength) {
				that.auiScroll = false;
				that.page++
				// console.log(this.page++)
				that.zh_track_record();
			}
		});
			
		},
		beforeDestroy() {
			//离开页面就还原刷新状态
			this.$ajax.defaults.timeout  = 50000;
			// pullToRefreshs.cancelLoading(); //刷新成功后调用此方法隐藏
			 this.auiScroll=false;//取消上拉监听
		},
		methods: {
			
			tab_notoli: function(index) {
				
				this.dataslength = false
				for (var n = 0; n < this.tab_noto.length; n++) {
					this.tab_noto[n].state = false;
				}
				this.tab_noto[index].state = true;
				if (index == 0) {
					this.state = "";
				} else if (index == 1) {
					this.state = "RUNNING";
				} else if (index == 2) {
					this.state = "STOPED";
				}
				this.page = 1;
				this.imgUrls = [];
				this.datas = [];
				Indicator.open('加载中');
				this.zh_track_record();
				Indicator.close();
			},
			tkrecord: function() {
				if (this.record_list) {
					this.record_list = false;
				} else {
					this.record_list = true;
				}
			},
			tab_typelist: function(index) {
				
				this.dataslength = false
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
				this.imgUrls = [];
				this.datas = [];
				Indicator.open('加载中');
				this.zh_track_record();
				Indicator.close();
			},
			zh_track_record: function() {
				var nowt = new Date().getFullYear() + "-" + this.NumLength2(new Date().getMonth() + 1) + "-" + this.NumLength2(new Date()
					.getDate());
				// this.dataslength = false
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
				data["state"] = this.state;
				data["rows"] = 10;
				data["page"] = this.page;
				data["startTime"] = "2017-01-01";
				data["endTime"] = nowt;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.chasePlanlist(datas);

			},
			chasePlanlist: function(datas) {
				this.nomore=false;
				this.$ajax.post('/caipiaoshouye/index.php/home/index/chasePlanlist',
						datas
					)
					.then(res => {
						var content = JSON.parse(res.data.content);
						console.log(JSON.stringify(content));
						if (res.data.status == 200) {
							if (content.code == 100000) {
								var data = content.data.obj;
								var imgUrls = content.data.obj;
								// console.log(JSON.stringify(data));
								if (data.length < 1) {
									this.auiScroll = true;
									// Toast('没有更多数据了！')
									if(this.datas.length>5){
										this.nomore=true;
									}
								}
								if (content.data.pages == 0) {
									if (this.page == 1) {
										this.dataslength = true
									}
								} else {
									this.alert_text = false;
									this.auiScroll = true;
									if (this.page == 1) {
										if (data.length == 0) {
											this.dataslength = true
										} else {
										this.dataslength = false
									}
										this.datas = data;
										
										imgUrls = this.Typese(imgUrls);
										this.imgUrls = imgUrls;
										console.log(data.length)
									} else{
										this.datas = this.datas.concat(data);
										imgUrls = this.Typese(imgUrls);
										this.imgUrls = this.imgUrls.concat(imgUrls);
									}
									if (this.datas.length == 0 && this.page == 1) {
										this.dataslength = true
									} else {
										this.dataslength = false
									}
								}

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
			NumLength2: function(num) {
				if (num < 10) return "0" + num;
				else return num;
			},
			Typese: function(datas) {
				var imgUrls = [];
				for (var i = 0; i < datas.length; i++) {
					var data = datas[i].lotteryType;
					var url;
					if (data == "SSQ") url = "ssq";
					else if (data == "WELFARE3D") url = "welfare3d";
					else if (data == "PL") url = "pl5";
					else if (data == "PL3") url = "pl3";
					else if (data == "PL5") url = "pl5";
					else if (data == "DCZC") url = "dczc";
					else if (data == "SEVEN") url = "seven";
					else if (data == "SFZC") url = "sfzc";
					else if (data == "LCZC") url = "lczc";
					else if (data == "SCZC") url = "sczc";
					else if (data == "DLT") url = "dlt";
					else if (data == "SDEL11TO5") url = "sdel11to5";
					else if (data == "JCZQ") url = "jczq";
					else if (data == "JCLQ") url = "jclq";
					else if (data == "GDEL11TO5") url = "gdel11to5";
					else if (data == "BJKLB") url = "kl8";
					else if (data == "CQSSC") url = "cqssc";
					else if (data == "XJSSC") url = "xjssc";
					else if (data == "JXSSC") url = "jxssc";
					else if (data == "JXEL11TO5") url = "jxel11to5";
					else if (data == "TJKLSF") url = "tjkls";
					else if (data == "GDKLSF") url = "gdkls";
					else if (data == "JSK3") url = "jsk3";
					else if (data == "AHK3") url = "ahk3";
					else if (data == "HBK3") url = "hbk3";
					else if (data == "BJK3") url = "bjk3";
					else if (data == "RXJC") url = "rxjc";
					else if (data == "HN4J1") url = "football";
					else url = data;

					imgUrls.push(url);
				}
				return imgUrls;
			},
			userinfo_track_data: function(index) {

				this.$router.push({
					path: '/userinfo/userinfo_track_data',
					query: {
						id: this.datas[index].id,
						lotteryType: this.datas[index].lotteryType,
					}
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
	header {
		position: fixed !important;
	}
.aui-refresh-content {
    top: 5rem;
}
	.show_mengcheng {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.8;
		z-index: 2;
	}

	.content {
		width: 100%;
		min-height: 6rem;
		background-color: #c4c4c4;
	}
	.aui-col-xs-4 {
	    width: 30.33333333%;
	    margin: 1.5% 0%;
	    margin-left: 2.46%;
	}
	.show_list {
		width: 100%;
		height: auto;
		position: fixed;
		top: 2.25rem;
		left: 0;
		z-index: 3;
		background: #fff;
	}

	.caiborder {
		    /* border: 1px solid #f0f0f0; */
		    text-align: center;
		    height: 2.4rem;
		    -webkit-box-sizing: border-box;
		    box-sizing: border-box;
		    line-height: 2.4rem;
		    background-color: rgba(245, 250, 255, 1);
		    z-index: 2;
		        font-size: 0.65rem;
	}

	.show_list .active {
		/*background-image: url(../../assets/userinfo/Triangle03.png);
		background-repeat: no-repeat;
		background-size: 98% 98%;*/
		color: #fff;
		background: rgba(228, 88, 105, 1);
	}

	/*投注状态筛选*/

	.record_titel {
		width: 100%;
		height: 2.8rem;
		text-align: center;
		display: flex;
		padding: 0 3%;
		border-bottom: 1px solid #CCCCCC;
		background-color: #fff;
		position: fixed;
		top: 2.25rem;
		left: 0;
		z-index: 2;
	}

	.record_titel div {
		flex: 1;
		margin: 0 auto;
		height: 2.8rem;
		line-height: 2.8rem;
		font-size: 0.8rem;
		color: #4A4A4A;

	}

	.record_titel div:nth-child(2) {
		margin: 0 5%;
	}

	.record_titel .active {
		border-bottom: #03A9F4 2px solid;
		color: #03A9F4;
		font-weight: bold;
	}

	.record_all_bets {
		min-height: 80vh;
		width: 100%;
		height: auto;
		background: #fff;
		display: none;
		margin-top: 5.05rem;

	}

	.record_all_bets li {
		width: 100%;
		height: 5rem;
		display: flex;
		border-bottom: 1px solid #CCCCCC;
		padding: 0.5rem 2% 0.5rem 3%;
		position: relative;
	}

	.all_bets_left {
		width: 25%;
		height: 4rem;
		display: flex;
	}

	.all_bets_left img {
		width: 60%;
		margin: auto;
	}

	.all_bets_in {
		width: 75%;
		height: 4rem;
		padding-top: 0.5rem;
	}

	.all_bets_in p {
		height: 1.5rem;

	}

	.all_bets_in p:first-child span:first-child {

		padding: 0rem 0.2rem;
		background-color: #FEB32B;
		color: #fff;
		border-radius: 0.25rem;
	}

	.all_bets_in p:first-child span:nth-child(2) {}

	.all_bets_in p:first-child span:last-child {
		color: #232323;
		font-size: 0.7rem;
		line-height: 1.5rem;
		margin-left: 0.4rem;
	}

	.all_bets_in p:last-child {
		line-height: 2rem;
	}

	.all_bets_in p:last-child span:last-child {}

	.all_bets_in p:last-child span:last-child {
		font-size: 0.8rem;
		color: #09A9F3;
		font-weight: bold;
	}

	.all_bets_right {
		content: '';
		width: 0.5rem;
		height: 0.5rem;
		position: absolute;
		top: 50%;
		right: 5%;
		margin-top: -0.2rem;
		background: transparent;
		border: 1px solid #dddddd;
		border-top: none;
		border-right: none;
		z-index: 1;
		-webkit-border-radius: 0;
		border-radius: 0;
		-webkit-transform: rotate(-135deg);
		transform: rotate(-135deg);
	}

	.londNull {
		width: 100%;
		height: 100vh;
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
		margin-top: 2rem;
		text-align: center;
		font-size: 0.7rem;
		color: #62A1BE;
		line-height: 1rem;
	}

	.mui-scroll-wrapper {
		top: 2.25rem;
	}

	.record_all_bets {
		margin-top: 0;
	}
</style>
