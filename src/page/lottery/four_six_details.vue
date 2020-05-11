<template>
	<div class="football_details">
		<header class="aui-bar aui-bar-nav" id="aui-header">
			<a class="aui-btn aui-pull-left" @click="back()">
				<span class="aui-iconfont aui-icon-left"></span>
			</a>
			<div class="aui-title ball_name">{{ballTitName}}开奖详情</div>
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
		<section class="aui-refresh-content" id="app" v-cloak v-show="flag1">
			<div class="kj_jjc_sixnav">
				<p>
					<span class="">第{{periodDataDTO.periodNumber}}期</span>
					<span class="">{{periodDataDTO.prizeTime | getTime(7)}}</span>
				</p>
				<div v-if="ball_name=='lczc'">
					<span v-for="(item,index) in periodDataDTO.result"> <i>{{item}}</i></span>
				</div>
				<div v-else-if="ball_name=='sczc'">
					<span v-for="(item,index) in periodDataDTO.result"> <i>{{item}}</i></span>
				</div>
				<div v-else>
					<span v-for="(item,index) in periodDataDTO.result"> <i>{{item}}</i></span>
				</div>
			</div>
			<!-- 奖金奖池 -->
			<div class="kj_jjc_sixmoeny" v-if="periodDataDTO.firstPrize_14||periodDataDTO.firstPrize_14 == 0">
				<div>
					<p>{{periodDataDTO.totalSales_14}}</p>
					<p>胜负彩销量(元)</p>
				</div>
				<div>
					<p>{{periodDataDTO.totalSales}}</p>
					<p>任选九销量(元)</p>
				</div>
			</div>
			<div class="kj_jjc_sixmoeny" v-else>
				<div>
					<p>{{periodDataDTO.totalSales}}</p>
					<p>本期销量(元)</p>
				</div>
				<div>
					<p>{{periodDataDTO.prizePool}}</p>
					<p>奖池奖金(元)</p>
				</div>
			</div>
			<!-- 中奖等级 -->
			<!-- 任选九胜负彩 -->
			  <div v-if="periodDataDTO.firstPrize_14||periodDataDTO.firstPrize_14 == 0">
                <ul class="kj_jjc_sixlistmoeny">
                    <li>
                        <div>任选九</div>
                        <div>中奖注数</div>
                        <div>每注奖金(元)</div>
                    </li>

                    <li>
                        <div>一等奖</div>
                        <div>{{periodDataDTO.firstWinUnits}}</div>
                        <div>{{periodDataDTO.firstPrize}}</div>
                    </li>
                    <li v-if="periodDataDTO.secondWinUnits!=='null'">
                        <div>二等奖</div>
                        <div>{{periodDataDTO.secondWinUnits}}</div>
                        <div>{{periodDataDTO.secondPrize}}</div>
                    </li>

                </ul>
                <ul class="kj_jjc_sixlistmoeny" v-if="periodDataDTO.firstPrize_14||periodDataDTO.firstPrize_14 == 0">
                    <li>
                        <div>胜负彩</div>
                        <div>中奖注数</div>
                        <div>每注奖金(元)</div>
                    </li>
                    <li>
                        <div>一等奖</div>
                        <div>{{periodDataDTO.firstWinUnits_14}}</div>
                        <div>{{periodDataDTO.firstPrize_14}}</div>
                    </li>
                    <li v-if="periodDataDTO.secondWinUnits_14||periodDataDTO.secondWinUnits_14 == 0">
                        <div>二等奖</div>
                        <div>{{periodDataDTO.secondWinUnits_14}}</div>
                        <div>{{periodDataDTO.secondPrize_14}}</div>
                    </li>

                </ul>
            </div>
			<!--四场六场 -->
			<div v-else>

				<ul class="kj_jjc_sixlistmoeny">
					<li>
						<div>奖项</div>
						<div>中奖注数</div>
						<div>每注奖金(元)</div>
					</li>

					<li>
						<div>一等奖</div>
						<div>{{periodDataDTO.firstWinUnits}}</div>
						<div>{{periodDataDTO.firstPrize}}</div>
					</li>
					<li v-if="periodDataDTO.secondWinUnits!=='null'">
						<div>二等奖</div>
						<div>{{periodDataDTO.secondWinUnits}}</div>
						<div>{{periodDataDTO.secondPrize}}</div>
					</li>

				</ul>

			</div>
			<!-- 场次详情列表 -->
			<div v-if="ball_name=='lczc'">
				<ul class="kj_jjc_six_machlist kj_jjc_six_machlistbt">
					<li>
						<div>场次</div>
						<div>对阵</div>
						<div>比分</div>
						<div>赛果</div>
					</li>
				</ul>
				<ul class="kj_jjc_six_machlist" v-for="(item,index) in four_six_data">
					<li>
						<div>{{index+1}}</div>
						<div>{{item.homeTeamName}}vs{{item.guestTeamName}}</div>
						<div>
							{{item.homeScore}}:{{item.guestScore}}
						</div>
						<div>
							{{item.result1}}
						</div>
					</li>
					<li v-if="item.halfHomeScore||item.halfHomeScore==0">
						<div></div>
						<div>{{item.homeTeamName}}vs{{item.guestTeamName}}</div>
						<div>{{item.halfHomeScore}}:{{item.halfGuestScore}}</div>
						<div>{{item.result2}}</div>
					</li>
				</ul>
			</div>
			<div v-else>
				<ul class="kj_jjc_six_machlist kj_jjc_six_machlistbt">
					<li>
						<div>场次</div>
						<div>对阵</div>
						<div>比分</div>
						<div>赛果</div>
					</li>
				</ul>
				<ul class="kj_jjc_six_machlist" v-for="(item,index) in four_six_data">
					<li>
						<div>{{index+1}}</div>
						<div>{{item.homeTeamName}}vs{{item.guestTeamName}}</div>
						<div>
							{{item.homeScore}}:{{item.guestScore}}
						</div>
						<div>
							{{item.result}}
						</div>
					</li>
					<li v-if="item.halfHomeScore||item.halfHomeScore==0">
						<div></div>
						<div>{{item.homeTeamName}}vs{{item.guestTeamName}}</div>
						<div>{{item.halfHomeScore}}:{{item.halfGuestScore}}</div>
						<div>{{item.result}}</div>
					</li>
				</ul>
			</div>

			<!-- <ul class="lists">
				<li class="list">
					<div class="title">
						<span class="left">第{{periodDataDTO.periodNumber}}期</span>
						<div class="right">
							<span class="date">{{periodDataDTO.prizeTime | getTime(5)}}</span>
						</div>
					</div>
					<table class="table" v-if="ball_name=='lczc'">
						<tbody v-for="item in four_six_data">
							<tr>
								<td>{{item.homeScore}}:{{item.guestScore}}</td>
								<td v-if="item.halfHomeScore||item.halfHomeScore==0">{{item.halfHomeScore}}:{{item.halfGuestScore}}</td>
							</tr>
							<tr>
								<td>{{item.result1}}</td>
								<td v-if="item.halfHomeScore||item.halfHomeScore==0">{{item.result2}}</td>
							</tr>
							<tr>
								<td>{{item.homeTeamName}}</td>
								<td v-if="item.halfHomeScore||item.halfHomeScore==0">{{item.homeTeamName}}</td>
							</tr>
							<tr>
								<td>{{item.guestTeamName}}</td>
								<td v-if="item.halfHomeScore||item.halfHomeScore==0">{{item.guestTeamName}}</td>
							</tr>
						</tbody>
					</table>
					<table class="table" v-else>
						<tbody v-for="item in four_six_data">
							<tr>
								<td>{{item.homeScore}}:{{item.guestScore}}</td>
								<td v-if="item.halfHomeScore||item.halfHomeScore==0">{{item.halfHomeScore}}:{{item.halfGuestScore}}</td>
							</tr>
							<tr>
								<td>{{item.result}}</td>
								<td v-if="item.halfHomeScore||item.halfHomeScore==0">{{item.result}}</td>
							</tr>
							<tr>
								<td>{{item.homeTeamName}}</td>
								<td v-if="item.halfHomeScore||item.halfHomeScore==0">{{item.homeTeamName}}</td>
							</tr>
							<tr>
								<td>{{item.guestTeamName}}</td>
								<td v-if="item.halfHomeScore||item.halfHomeScore==0">{{item.guestTeamName}}</td>
							</tr>
						</tbody>
					</table>
				</li>
			</ul> -->
			<!-- <div class="middle" v-if="periodDataDTO.firstPrize_14||periodDataDTO.firstPrize_14 == 0">
				<div class="sales">
					<span class="number">{{periodDataDTO.totalSales_14}}</span>
					<span class="desc">胜负彩销量(元)</span>
				</div>
				<div class="lottery">
					<span class="number">{{periodDataDTO.totalSales}}</span>
					<span class="desc">任选九销量(元)</span>
				</div>
			</div>
			<div class="middle" v-else>
				<div class="sales">
					<span class="number">{{periodDataDTO.totalSales}}</span>
					<span class="desc">本期销量(元)</span>
				</div>
				<div class="lottery">
					<span class="number">{{periodDataDTO.prizePool}}</span>
					<span class="desc">奖池奖金(元)</span>
				</div>
			</div>
			<div class="bottom" v-if="periodDataDTO.firstPrize_14||periodDataDTO.firstPrize_14 == 0">
				<div class="lottery_desc">
					<span>任选九</span>
					<span>中奖注数</span>
					<span>每注奖金(元)</span>
				</div>
				<div class="first_prize">
					<span>一等奖</span>
					<span>{{periodDataDTO.firstWinUnits}}</span>
					<span>{{periodDataDTO.firstPrize}}</span>
				</div>
				<div class="first_prize" v-if="periodDataDTO.secondWinUnits!=='null'">
					<span>二等奖</span>
					<span>{{periodDataDTO.secondWinUnits}}</span>
					<span>{{periodDataDTO.secondPrize}}</span>
				</div>
				<div class="lottery_desc sf">
					<span>胜负彩</span>
					<span>中奖注数</span>
					<span>每注奖金(元)</span>
				</div>
				<div class="first_prize">
					<span>一等奖</span>
					<span>{{periodDataDTO.firstWinUnits_14}}</span>
					<span>{{periodDataDTO.firstPrize_14}}</span>
				</div>
				<div class="first_prize" v-if="periodDataDTO.secondWinUnits_14||periodDataDTO.secondWinUnits_14 == 0">
					<span>二等奖</span>
					<span>{{periodDataDTO.secondWinUnits_14}}</span>
					<span>{{periodDataDTO.secondPrize_14}}</span>
				</div>
			</div>
			<div v-else class="bottom">
				<div class="lottery_desc">
					<span>奖项</span>
					<span>中奖注数</span>
					<span>每注奖金(元)</span>
				</div>
				<div class="first_prize">
					<span>一等奖</span>
					<span>{{periodDataDTO.firstWinUnits}}</span>
					<span>{{periodDataDTO.firstPrize}}</span>
				</div>
				<div class="first_prize" v-if="periodDataDTO.secondWinUnits!=='null'">
					<span>二等奖</span>
					<span>{{periodDataDTO.secondWinUnits}}</span>
					<span>{{periodDataDTO.secondPrize}}</span>
				</div>
			</div> -->
		</section>
		<div class="buttons_wrap">
			<input type="button" name="" value="立即投注" class="button" @click="typeball()">
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
				shareStatue: false, //分享状态
				indexs: -1,
				flag1: false,
				four_six_data: [],
				periodDataDTO: {},
				jc_content: {},
				ball_name: '',
				ballTitName: '',
				imgs: {
					'SSQ': 'ssq',
					'WELFARE3D': 'fc3d',
					'PL': 'pl5',
					'PL3': 'pl3',
					'PL5': 'pl5',
					'DCZC': 'bjdc',
					'SEVEN': 'seven',
					'SFZC': 'sfzc',
					'LCZC': 'lczc',
					'SCZC': 'sczc',
					'DLT': 'dlt',
					'SDEL11TO5': 'sdel11to5',
					'JCZQ': 'jczq',
					'JCLQ': 'jclq',
					'GDEL11TO5': 'gdel11to5',
					'BJKLB': 'kl8',
					'CQSSC': 'cqssc',
					'XJSSC': 'xjssc',
					'JXSSC': 'jxssc',
					'JXEL11TO5': 'jxel11to5',
					'TJKLSF': 'tjkls',
					'GDKLSF': 'gdkls',
					'JSK3': 'jsk3',
					'AHK3': 'ahk3',
					'HBK3': 'hbk3',
					'RXJC': 'rxjc',
					'HN4J1': 'football',
				},
				lotteryType: {
					'BJKLB': '北京快乐八',
					'CQSSC': '重庆时时彩',
					'XJSSC': '新疆时时彩',
					'JXSSC': '江西时时彩',
					'JXEL11TO5': '江西11选5',
					'TJKLSF': '天津快乐十分',
					'GDKLSF': '广东快乐十分',
					'GDEL11TO5': '广东11选5',
					'SDEL11TO5': '山东11运夺金',
					'JSK3': '江苏快3',
					'AHK3': '安徽快3',
					'HBK3': '湖北快3',
					'RXJC': '任选九场',
					'HN4J1': '海南4+1',
					'SCZC': '四场进球',
					'SFZC': '胜负彩/任选九',
				},
			};
		},
		created() {
			sessionStorage.removeItem('play');
			sessionStorage.removeItem('name');
			this.ballTitName = this.$route.query.change_text;
			this.ball_name = this.$route.query.ball_name;
			this.periodId = this.$route.query.periodId;
			this.fourSixData(this.ball_name, this.periodId);
		},
		mounted() {
			var that = this;
			var pullToRefresh = new auiPullToRefresh({ //下拉刷新
				container: document.querySelector('.aui-refresh-content'), //下拉容器
				triggerDistance: 80 //下拉高度
			}, function(ret) {
				if (ret.status == "success") {
					that.page = 1;
					// that.football_data=[];
					that.$ajax.defaults.timeout = 49527; //49527这个值控制没有showLonding
					that.fourSixData(that.ball_name, that.periodId);
					setTimeout(() => {
						that.$ajax.defaults.timeout = 50000;
						pullToRefresh.cancelLoading(); //刷新成功后调用此方法隐藏
					}, 1500)
				}
			});
			var scroll = new auiScroll({ //上拉加载
				listen: false, //是否监听滚动高度，开启后将实时返回滚动高度
				distance: 0 //判断到达底部的距离，isToBottom为true
			}, function(ret) {
				console.log("saddas")
				if (ret.isToBottom == true && that.auiScroll) {
					that.auiScroll = false;
					console.log(1)
					that.page++;
					that.fourSixData(that.ball_name, that.periodId);
				}
			});
		},
		beforeDestroy() {
			this.auiScroll = false;
			this.$ajax.defaults.timeout = 50000;
		},
		filters: {
			getTime: function(matchDate, num) {
				if (!matchDate) {
					return
				}
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
				} else if (num == 7) {
					return y + "/" + m + "/" + d + " " + '周' + dd;
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
			fourSixData: function(ball_name, periodId) { //请求数据  
				var data = [];
				data["periodId"] = periodId;
				data["code"] = ball_name;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});

				this.$ajax.post('/caipiaoshouye/index.php/home/index/getDrawResultDetailByPeriod',
						datas
					)
					.then(res => {
						console.log(res);
						if (res.data.status == 500) {
							alert("服务器异常，请稍后重试");
						} else if (res.data.status == 200) {
							this.flag1 = true;
							var jc_content = JSON.parse(res.data.content);
							if (this.ball_name == 'lczc') {
								var theBackgroundShitty = jc_content.data.periodDataDTO.result.split('');
								console.log(theBackgroundShitty);
								var sbleng = theBackgroundShitty.length;
								var matchs = jc_content.data.matchs;
								var mleg = matchs.length;


								for (var x = 0; x < mleg; x++) {
									if (x == 0) {
										matchs[x].result1 = theBackgroundShitty[0];
										matchs[x].result2 = theBackgroundShitty[1]
									} else if (x == 1) {
										matchs[x].result1 = theBackgroundShitty[2];
										matchs[x].result2 = theBackgroundShitty[3]
									} else if (x == 2) {
										matchs[x].result1 = theBackgroundShitty[4];
										matchs[x].result2 = theBackgroundShitty[5]
									} else if (x == 3) {
										matchs[x].result1 = theBackgroundShitty[6];
										matchs[x].result2 = theBackgroundShitty[7]
									} else if (x == 4) {
										matchs[x].result1 = theBackgroundShitty[8];
										matchs[x].result2 = theBackgroundShitty[9]
									} else if (x == 5) {
										matchs[x].result1 = theBackgroundShitty[10];
										matchs[x].result2 = theBackgroundShitty[11]
									}
								}
								this.four_six_data = matchs;
								console.log(JSON.stringify(this.four_six_data));
							} else {
								this.four_six_data = jc_content.data.matchs;
								console.log(JSON.stringify(this.four_six_data));
							}

							this.periodDataDTO = jc_content.data.periodDataDTO;
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			back: function() {
				window.history.go(-1);
			},
			typeball: function() {
				switch (this.ball_name) {
					case 'sczc':
						this.Jumpgoucai('goucai_jjc_sc', 'scjq', '四场进球', '3')
						break;
					case 'lczc':
						this.Jumpgoucai('goucai_jjc_sc', 'lcb', '六场半全场', '0')
						break;
					case 'sfzc':
						this.Jumpgoucai('goucai_jjc_sc', 'rxjc', '胜负彩', '2')
						break;
					default:
						this.Jumpgoucai('goucai_jjc_sc', 'scjq', '四场进球', '3')
				}
			},
			Jumpgoucai: function(id, path, name, patyInd) {
				this.$router.push({
					name: id,
					query: {
						name: name,
						path: path,
						'patyInd': patyInd
					}
				})
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
	@import "../../css/lottery_four_six_details.css";

	.aui-refresh-content {
		top: 2.75rem;
	}

	.kj_jjc_sixnav {
		width: 100%;
		height: auto;
		background-color: #FFFFFF;
		padding: 0 0.75rem;
	}

	.kj_jjc_sixnav p:first-child {
		display: flex;
		justify-content: space-between;
		color: #444444;
		font-size: 0.55rem;
		line-height: 0.75rem;
		padding-top: 0.75rem;

	}

	.kj_jjc_sixnav div {
		padding: 0.65rem 0;
		display: flex;
	}

	.kj_jjc_sixnav div:last-child span {
		display: flex;

	}

	.kj_jjc_sixnav div:last-child span i {
		font-style: normal;
		width: 0.6rem;
		height: 1.2rem;
		line-height: 1.2rem;
		background-color: rgb(55, 209, 111);
		border-radius: 0.1rem;
		color: #fff;
		font-size: 0.6rem;
		text-align: center;

		margin-right: 0.2rem;
		display: inline-block;
	}

	.kj_jjc_sixmoeny {
		padding: 0.6rem 0.75rem;
		display: flex;
		background-color: #FFFFFF;
		border-bottom: 1px solid #F4F4F4;
		border-top: 1px solid #F4F4F4;

	}

	.kj_jjc_sixmoeny div {
		width: 100%;

	}

	.kj_jjc_sixmoeny div p:first-child {
		text-align: center;
		height: 1.15rem;
		font-size: 0.8rem;
		color: #F82A5B;
	}

	.kj_jjc_sixmoeny div p:last-child {
		text-align: center;
		line-height: 0.75rem;
		font-size: 0.55rem;
		font-weight: 400;
		color: #999999;
		margin-top: 0.35rem;
	}

	.kj_jjc_sixlistmoeny {
		width: 100%;
		background-color: #FFFFFF;
	}

	.kj_jjc_sixlistmoeny li {
		width: 100%;
		display: flex;
		padding: 0.4rem 0;
		border-bottom: 1px solid #F4F4F4;

	}

	.kj_jjc_sixlistmoeny li:first-child {
		background-color: #FCFCFC;

	}

	.kj_jjc_sixlistmoeny li div {
		width: 33.33%;
		line-height: 0.85rem;
		font-size: 0.5rem;
		font-weight: 400;
		color: #444444;
		text-align: center;
	}
	.kj_jjc_sixlistmoeny li:first-child div {
		width: 33.33%;
		line-height: 0.85rem;
		font-size: 0.5rem;
		font-weight: 400;
		color: #999999;
		text-align: center;
	}


	.kj_jjc_six_machlist {
		width: 100%;
		background-color: #FFFFFF;

	}

	.kj_jjc_six_machlist li {
		display: flex;
		padding: 0.45rem 0;
		border-bottom: 1px solid #F4F4F4;
	}

	.kj_jjc_six_machlist li div {
		line-height: 0.7rem;
		font-size: 0.55rem;
		font-weight: 400;
		text-align: center;
		color: #444444;
	}

	.kj_jjc_six_machlistbt li:first-child {
		background-color: #FCFCFC;
	}

	.kj_jjc_six_machlistbt li:first-child div {
		line-height: 0.7rem;
		font-size: 0.5rem;
		font-weight: 400;
		color: #999999;

	}



	.kj_jjc_six_machlist li div:nth-child(1) {
		width: 13.33%;

	}

	.kj_jjc_six_machlist li div:nth-child(2) {
		width: 40%;

	}

	.kj_jjc_six_machlist li div:nth-child(4) {
		width: 23.4%;

	}

	.kj_jjc_six_machlist li div:nth-child(3) {
		width: 23.4%;

	}
</style>
