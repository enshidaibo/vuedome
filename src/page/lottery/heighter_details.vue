<template>
	<div class="heighter_details">
		<header class="aui-bar aui-bar-nav" id="aui-header">
			<a class="aui-btn aui-pull-left" @click="back()">
				<span class="aui-iconfont aui-icon-left"></span>
			</a>
			<div class="aui-title ball_name">{{change_text}}开奖详情</div>
			<div class="aui-btn aui-pull-right" @click="fenx()">
				<span class="aui-iconfont aui-icon-share"></span>
			</div>
		</header>

		<!-- 分享模态框 -->
		<div v-if="shareStatue" class="share_box" @click="hideShare()">
			<div class="share_cont">
				<div class="quxiao">取消</div>
				<div class="down" @click="openDownload()">前往下载</div>
			</div>
		</div>
		<section class=" aui-refresh-content" id="wrap" v-cloak  v-show="flag1">
			<div style="width: 100%;height: 0.5rem;"></div>
			<ul class="content" v-for="(item,index) in details_data" >
				<li class="list" @click="scale_details(item,index)" v-if="item.result">
					<div class="title">
						<div class="title_left">
							<span class="stage">第<span>{{item.periodNumber}}</span>期</span>
						</div>
						<span class="dates day">{{item.prizeTime|getTime(6)}}</span>
					</div>
					<div class="bottom">
						<div class="redball_left" :class="index==0?'content0ge':''" v-if="item.lotteryType == 'SSQ'">
							<span class="circle_ball" v-for="result_data in (item.result.split(' ')[0].split(','))">
								<i v-if='result_data*1<10'>0{{result_data}}</i>
								<i v-else>{{result_data}}</i></span>
							 <span class="circle_ball blue_ball"
							 v-for="result_data in (item.result.split(' ')[1]?item.result.split(' ')[1].split(','):[])">
							 <i v-if='result_data*1<10'>0{{result_data}}</i>
							 <i v-else>{{result_data}}</i></span>
							 </span>
						</div>
						<div class="redball_left" :class="index==0?'content0ge':''" v-else>
							<span :class="(item.lotteryType == 'JSK3' || item.lotteryType == 'AHK3' || item.lotteryType == 'HBK3')? 'kuaisan': 'circle_ball'"
							 v-for="result_data in (item.result.split(' ')[0].split(','))">{{result_data}}</span>
							 <span class="circle_ball blue_ball"
							 v-for="result_data in (item.result.split(' ')[1]?item.result.split(' ')[1].split(','):[])">{{result_data}}</span>
						</div>
						<div class="redball_right" :class="name == 'lows'?'laijia':''">
							<div class="right_size" v-if="item.lotteryType == 'XJSSC' || item.lotteryType == 'CQSSC'">
								<div class="single">
									<span v-if="(item.result).split(',')[0]>4" class="adj">大</span>
									<span v-else class="adj">小</span>
									<span class="border_low">|</span>
									<span v-if="(item.result).split(',')[0]%2 == 1">单</span>
									<span v-else>双</span>
								</div>
							</div>
							<div v-else class="right_size" v-show="item.lotteryType == 'JSK3' || item.lotteryType == 'AHK3' || item.lotteryType == 'HBK3'">
								<span class="sum">和值:{{sum(item.result)}}</span>
							</div>
							<img :class="index == indexs?'rotate':''" src="../../assets/runlottery/yellow_arr.png" class="aui-icon-right icon_right">
						</div>
					</div>
				</li>
				<div class="scale" :class="[index==indexs?'':'dis-no']">
					<div class="top" v-if="name == 'lows'">
						<div class="sales">
							<span v-if="change_text == '排列5'" class="number">{{scale_content.p5TotalSales}}</span>
							<span v-else class="number">{{scale_content.totalSales}}</span>
							<span class="desc">本期销量(元)</span>
						</div>
						<!-- <span class="border" v-if="scale_content.prizePool || scale_content.prizePool == 0"></span> -->
						<div class="lottery" v-if="scale_content.prizePool || scale_content.prizePool == 0">
							<span class="number">{{scale_content.prizePool}}</span>
							<span class="desc">奖池奖金(元)</span>
						</div>
					</div>
					<div class="contents">
						<table class="table" v-if="name == 'lows'" cellpadding="30">
							<thead>
								<th>奖项</th>
								<th>中奖条件</th>
								<th>中奖注数</th>
								<th>每注奖金(元)</th>
							</thead>
							<tbody v-if="lotteryType =='ssq' || lotteryType =='seven'" class="math_grade">
								<tr v-if="scale_content.firstWinUnits||scale_content.firstWinUnits == 0">
									<td>一等奖</td>
									<td v-if="lotteryType =='ssq'">6+1</td>
									<td v-else>7+0</td>
									<td>{{scale_content.firstWinUnits}}</td>
									<td>{{scale_content.firstPrize}}</td>
								</tr>
								<tr v-if="scale_content.secondWinUnits||scale_content.secondWinUnits == 0">
									<td>二等奖</td>
									<td v-if="lotteryType =='ssq'">6+0</td>
									<td v-else>6+1</td>
									<td>{{scale_content.secondWinUnits}}</td>
									<td>{{scale_content.secondPrize}}</td>
								</tr>
								<tr v-if="scale_content.thirdWinUnits||scale_content.thirdWinUnits == 0">
									<td>三等奖</td>
									<td v-if="lotteryType =='ssq'">5+1</td>
									<td v-else>6+0</td>
									<td>{{scale_content.thirdWinUnits}}</td>
									<td>{{scale_content.thirdPrize}}</td>
								</tr>
								<tr v-if="scale_content.fourthWinUnits||scale_content.fourthWinUnits == 0">
									<td>四等奖</td>
									<td v-if="lotteryType =='ssq'">5+0,4+1</td>
									<td v-else>5+1</td>
									<td>{{scale_content.fourthWinUnits}}</td>
									<td>{{scale_content.fourthPrize}}</td>
								</tr>
								<tr v-if="scale_content.fifthWinUnits||scale_content.fifthWinUnits == 0">
									<td>五等奖</td>
									<td v-if="lotteryType =='ssq'">4+0,3+1</td>
									<td v-else>5+0</td>
									<td>{{scale_content.fifthWinUnits}}</td>
									<td>{{scale_content.fifthPrize}}</td>
								</tr>
								<tr v-if="scale_content.sixthWinUnits||scale_content.sixthWinUnits == 0">
									<td>六等奖</td>
									<td v-if="lotteryType =='ssq'">2+1,1+1,0+1</td>
									<td v-else>4+1</td>
									<td>{{scale_content.sixthWinUnits}}</td>
									<td>{{scale_content.sixthPrize}}</td>
								</tr>
								<tr v-if="scale_content.seventhWinUnits||scale_content.seventhWinUnits == 0">
									<td>七等奖</td>
									<td>4+0</td>
									<td>{{scale_content.seventhWinUnits}}</td>
									<td>{{scale_content.seventhPrize}}</td>
								</tr>
							</tbody>
							<tbody v-if="lotteryType =='dlt'" class="math_grade">
								<tr v-if="scale_content.first_win_units||scale_content.first_win_units == 0">
									<td>一等奖</td>
									<td>5+2</td>
									<td>{{scale_content.first_win_units}}</td>
									<td>{{scale_content.first_prize}}</td>
								</tr>
								<tr v-if="scale_content.second_win_units||scale_content.second_win_units == 0">
									<td>二等奖</td>
									<td>5+1</td>
									<td>{{scale_content.second_win_units}}</td>
									<td>{{scale_content.second_prize}}</td>
								</tr>
								<tr v-if="scale_content.third_win_units||scale_content.third_win_units == 0">
									<td>三等奖</td>
									<td>5+0</td>
									<td>{{scale_content.third_win_units}}</td>
									<td>{{scale_content.third_prize}}</td>
								</tr>
								<tr v-if="scale_content.fourth_win_units||scale_content.fourth_win_units == 0">
									<td>四等奖</td>
									<td>4+2</td>
									<td>{{scale_content.fourth_win_units}}</td>
									<td>{{scale_content.fourth_prize}}</td>
								</tr>
								<tr v-if="scale_content.fifth_win_units||scale_content.fifth_win_units == 0">
									<td>五等奖</td>
									<td>4+1</td>
									<td>{{scale_content.fifth_win_units}}</td>
									<td>{{scale_content.fifth_prize}}</td>
								</tr>
								<tr v-if="scale_content.sixth_win_units||scale_content.sixth_win_units == 0">
									<td>六等奖</span>
									<td>3+2</td>
									<td>{{scale_content.sixth_win_units}}</td>
									<td>{{scale_content.sixth_prize}}</td>
								</tr>
								<tr v-if="scale_content.seventh_win_units||scale_content.seventh_win_units == 0">
									<td>七等奖</span>
									<td>4+0</td>
									<td>{{scale_content.seventh_win_units}}</td>
									<td>{{scale_content.seventh_prize}}</td>
								</tr>
								<tr v-if="scale_content.eighth_win_units||scale_content.eighth_win_units == 0">
									<td>八等奖</td>
									<td>3+1,2+2</td>
									<td>{{scale_content.eighth_win_units}}</td>
									<td>{{scale_content.eighth_prize}}</td>
								</tr>
								<tr v-if="scale_content.ninth_win_units||scale_content.ninth_win_units == 0">
									<td>九等奖</td>
									<td>3+0,2+1,1+2,0+2</td>
									<td>{{scale_content.ninth_win_units}}</td>
									<td>{{scale_content.ninth_prize}}</td>
								</tr>
							</tbody>
							<tbody v-if="lotteryType =='welfare3d'" class="math_grade">
								<tr v-if="scale_content.winUnits||scale_content.winUnits == 0">
									<td>直选</td>
									<td>号码按位相符</td>
									<td>{{scale_content.winUnits}}</td>
									<td>{{scale_content.unitPrize}}</td>
								</tr>
								<tr v-if="scale_content.g3WinUnits||scale_content.g3WinUnits == 0">
									<td>组选三</td>
									<td>号码相符（2同号）</td>
									<td>{{scale_content.g3WinUnits}}</td>
									<td>{{scale_content.g3UnitPrize}}</td>
								</tr>
								<tr v-if="scale_content.g6WinUnits||scale_content.g6WinUnits == 0">
									<td>组选六</td>
									<td>号码相符（无同号）</td>
									<td>{{scale_content.g6WinUnits}}</td>
									<td>{{scale_content.g6UnitPrize}}</td>
								</tr>
							</tbody>
							<tbody v-if="lotteryType =='pl'&&change_text == '排列5'" class="math_grade">
								<tr v-if="scale_content.p5WinUnits||scale_content.p5WinUnits == 0">
									<td>直选</td>
									<td>号码按位相符</td>
									<td>{{scale_content.p5WinUnits}}</td>
									<td>{{scale_content.p5UnitPrize}}</td>
								</tr>
							</tbody>
							<tbody v-if="lotteryType =='pl'&&change_text == '排列3'" class="math_grade">
								<tr v-if="scale_content.p3WinUnits||scale_content.p3WinUnits == 0">
									<td>直选</td>
									<td>号码按位相符</td>
									<td>{{scale_content.p3WinUnits}}</td>
									<td>{{scale_content.p3UnitPrize}}</td>
								</tr>
								<tr v-if="scale_content.p3DirectSumUnits||scale_content.p3DirectSumUnits == 0">
									<td>和值</td>
									<td>所选和值相符</td>
									<td>{{scale_content.p3DirectSumUnits}}</td>
									<td>{{scale_content.p3DirectSumPrize}}</td>
								</tr>
								<tr v-if="scale_content.p3G3WinUnits||scale_content.p3G3WinUnits == 0">
									<td>组选三</td>
									<td>号码相符（2同号）</td>
									<td>{{scale_content.p3G3WinUnits}}</td>
									<td>{{scale_content.p3G3UnitPrize}}</td>
								</tr>
								<tr v-if="scale_content.p3G6WinUnits||scale_content.p3G6WinUnits == 0">
									<td>组选六</td>
									<td>号码相符（无同号）</td>
									<td>{{scale_content.p3G6WinUnits}}</td>
									<td>{{scale_content.p3G6UnitPrize}}</td>
								</tr>
							</tbody>
						</table>
						<table class="table math_grade" v-if="name == 'keno'">
							<thead class="gray_title">
								<th>奖项</th>
								<th>每注奖金(元)</th>
							</thead>
							<tbody>
								<tr v-for="item in scale_content">
									<td>{{item.name}}</td>
									<td>{{item.prize}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</ul>
			<no-more v-show='nomore'></no-more>
		</section>
		<div class="buttons_wrap" @click="typeball()">
			<input type="button" name="" value="立即投注" class="button">
		</div>
	</div>
</template>

<script>
	import {
		getCookie,
		OverallData
	} from "../../js/common.js";
	export default {
		data() {
			return {
				nomore:false,
				shareStatue: false, //分享状态
				name: '',
				indexs: -1,
				details_data: [], //其他彩数据
				scale_content: '',
				indexs: -1,
				name: '', //高频彩或数字彩
				lotteryType: '', //双色球的英文缩写
				change_text: '', //头部标题文字
				imgs: {
					'SSQ': 'ssq',
				},
				lotteryType: {
					'BJKLB': '北京快乐八',
				},
				flag: true,
				page: 1,
				rows: 10,
				auiScroll:true,
				flag1:false,
			};
		},
		created() {
			sessionStorage.removeItem('play');
			sessionStorage.removeItem('name');
			this.change_text = this.$route.query.change_text;
			this.name = this.$route.query.name;
			this.lotteryType = this.$route.query.ball_name.toLowerCase();
			this.requestData(this.name, this.lotteryType, this.flag, this.page, this.rows);
		},
		mounted() {
			var that = this;
			var pullToRefresh = new auiPullToRefresh({ //下拉刷新
				container: document.querySelector('.aui-refresh-content'), //下拉容器
				triggerDistance: 80 //下拉高度
			}, function(ret) {
				if (ret.status == "success") {
					that.page = 1;
					that.$ajax.defaults.timeout  =  49527;//49527这个值控制没有showLonding
					that.requestData(that.name, that.lotteryType, that.flag, that.page, that.rows);
					setTimeout(() => {
						that.$ajax.defaults.timeout  =  50000;
						pullToRefresh.cancelLoading(); //刷新成功后调用此方法隐藏
					}, 1500)
				}
			});
			var scroll = new auiScroll({ //上拉加载
				listen: false, //是否监听滚动高度，开启后将实时返回滚动高度
				distance: 0 //判断到达底部的距离，isToBottom为true
			}, function(ret) {
				console.log("saddas")
				if (ret.isToBottom == true && that.auiScroll&&!that.nomore) {
					that.auiScroll = false;
					console.log(1)
					that.page++;
					that.requestData(that.name, that.lotteryType, that.flag, that.page, that.rows);
				}
			});
		},
		beforeDestroy() {
			this.auiScroll=false;
		   this.$ajax.defaults.timeout  = 50000;
		},
		filters: {
			getTime: function(matchDate, num) {
				var time = new Date(matchDate);
				var y = time.getFullYear();
				var m = time.getMonth() + 1 >= 10 ? parseInt(time.getMonth() + 1) : "0" + parseInt(time.getMonth() + 1);
				var d = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
				var h = time.getHours() >= 10 ? time.getHours() : "0" + time.getHours();
				var mm = time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes();
				var s = time.getSeconds() >= 10 ? time.getSeconds() : "0" + time.getSeconds();
				var dd = time.getDay();
				switch (dd) {
					case 0:
						dd = "日";
						break;
					case 1:
						dd = "一";
						break;
					case 2:
						dd = "二";
						break;
					case 3:
						dd = "三";
						break;
					case 4:
						dd = "四";
						break;
					case 5:
						dd = "五";
						break;
					case 6:
						dd = "六";
						break;
				}
				if (num == 1) { //月日时分
					return m + "-" + d + " " + h + ":" + mm;
				} else if (num == 2) { //年月日时分秒
					return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
				} else if (num == 3) { //年月日
					return y + "-" + m + "-" + d;
				} else if (num == 4) { //星期
					return '周' + dd;
				} else if (num == 5) { // 年月日时分
					return y + "-" + m + "-" + d + " " + h + ":" + mm;
				} else if (num == 6) {
					return y + "-" + m + "-" + d + " " + '周' + dd;
				}
			}
		},
		methods: {
			img_src: function(type) { //图片
				return require('../../assets/lottery' + this.imgs[type] + '.png');
			},
			sum: function(result) { //求和
				var results = result.split(',').map(Number);
				var sums = 0;
				for (var i = 0; i < results.length; i++) {
					sums += results[i];
				}
				return sums;
			},
			requestData: function(name, lotteryType, flag, page, rows) { //请求数据  
			 this.nomore=false;
				var data = [];
				data["flag"] = flag;
				data["page"] = page;
				data["rows"] = rows;
				var datas = this.Qs.stringify({
					path: 'number/' + name + '/' + lotteryType,
					data
				}, {
					allowDots: true
				});

				this.$ajax.post('/caipiaoshouye/index.php/home/index/getHistoryDraws',
						datas
					)
					.then(res => {
						console.log(res);
						if (res.data.status == 500) {
							alert("服务器异常，请稍后重试");
						} else if (res.data.status == 200) {
							var content = JSON.parse(res.data.content);
							if (content) {
								if (content.code == 100000) {
									this.flag1=true;
									if (content.data == [] || content.data == null || content.data == "") {
										if(this.details_data.length>0){
											this.nomore=true;
										}
									} else {
										this.auiScroll=true;
										var data = content.data;
										if(page==1){
											this.details_data = data
										}else{
											this.details_data = this.details_data.concat(data);
										}
										
									}
								}
							} else {
								alert("服务器异常，请稍后重试")
							}
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			scale_details: function(item, i) { //请求数据  
				if (i == this.indexs) {
					this.indexs = -1
				} else {
					this.indexs = i
				}
				var periodNumber = item.periodNumber;
				if (this.indexs !== -1) {
					var data = [];
					data["periodNumber"] = periodNumber;
					var datas = this.Qs.stringify({
						path: 'number/' + this.name + '/' + this.lotteryType,
						data
					}, {
						allowDots: true
					});

					this.$ajax.post('/caipiaoshouye/index.php/home/index/findResultsDetail',
							datas
						)
						.then(res => {
							console.log(res);
							var scale_content = JSON.parse(res.data.content);
							// var addConditions=scale_content.data.prize;
							// if(this.lotteryType=='ssq'){
							// 	 addConditions.con1='6+1';
							// 	 addConditions.con2='6+0';
							// 	 addConditions.con3='5+1';
							// 	 addConditions.con4='5+0,4+1';
							// 	 addConditions.con5='4+0,3+1';
							// 	 addConditions.con6='2+1,1+1,0+1';
							// }
							
							this.scale_content = scale_content.data.prize;
						})
						.catch(err => {
							console.log(err);
						})
				}
			},
			back: function() {
				window.history.go(-1);
			},
			typeball: function() {
				if (this.lotteryType == 'ssq') {
					this.$router.push({
						name: 'goucai_mc_ssq'
					})
				} else if (this.lotteryType == 'dlt') {
					this.$router.push({
						name: 'goucai_mc_dlt'
					})
				} else if (this.lotteryType == 'welfare3d') {
					this.$router.push({
						name: 'goucai_mc_fcsd'
					})
				} else if (this.lotteryType == 'seven') {
					this.$router.push({
						name: 'goucai_mc_qlc'
					})
				} else if (this.lotteryType == 'pl' && this.change_text == '排列3') {
					this.$router.push({
						name: 'goucai_mc_pls'
					})
				} else if (this.lotteryType == 'pl' && this.change_text == '排列5') {
					this.$router.push({
						name: 'goucai_mc_plw'
					})
				}

				if (this.lotteryType == 'bjklb') {
					this.$router.push({
						name: 'goucai_gpc_bjk8'
					})
				} else if (this.lotteryType == 'cqssc') {
					this.$router.push({
						name: 'goucai_gpc_cqssc'
					})
				} else if (this.lotteryType == 'xjssc') {
					this.$router.push({
						name: 'goucai_gpc_xjssc'
					})
				} else if (this.lotteryType == 'jxel11to5') {
					this.$router.push({
						name: 'goucai_gpc_jx11x5'
					})
				} else if (this.lotteryType == 'tjklsf') {
					this.$router.push({
						name: 'goucai_gpc_tjkl10'
					})
				} else if (this.lotteryType == 'gdklsf') {
					this.$router.push({
						name: 'goucai_gpc_gdkl10'
					})
				} else if (this.lotteryType == 'gdel11to5') {
					this.$router.push({
						name: 'goucai_gpc_gd11x5'
					})
				} else if (this.lotteryType == 'sdel11to5') {
					this.$router.push({
						name: 'goucai_gpc_sd11ydj'
					})
				} else if (this.lotteryType == 'jsk3') {
					this.$router.push({
						name: 'goucai_gpc_jsks'
					})
				} else if (this.lotteryType == 'ahk3') {
					this.$router.push({
						name: 'goucai_gpc_ahks'
					})
				} else if (this.lotteryType == 'hbk3') {
					this.$router.push({
						name: 'goucai_gpc_hbks'
					})
				}
				 else if (this.lotteryType == 'bjk3') {
					this.$router.push({
						name: 'goucai_gpc_bjks'
					})
				}
			},
			fenx: function() { //分享
				this.shareStatue = true;
			},
			hideShare: function() {
				this.shareStatue = false;
			},
			openDownload: function() { //前往下载
				var newData = getCookie('newData');
				var link = OverallData().download
				if (newData) {
					window.open(link + '?_userId=' + newData.sportId);
				} else {
					window.open(link);
				}
			},
		}
	}
</script>

<style scoped>
	@import "../../css/lottery_heighter_details.css";
</style>
