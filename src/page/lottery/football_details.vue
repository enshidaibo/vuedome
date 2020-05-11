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
		<!-- 选择期数 -->

		<div class="ki_jjc_tab " v-if="ball_name== 'jczq'">
			<div class="clearfix">
				<p>选择期数</p>
				<p @click="screen()">
					<span>{{matchTime}}期</span>
					<span class="aui-iconfont icon_down aui-icon-down"></span>
				</p>
			</div>
			<div>
				<ul>
					<li>胜平负</li>
					<li>让球胜平负</li>
					<li>比分</li>
					<li>半全场</li>
					<li>总球数</li>

				</ul>
			</div>
		</div>
		<div class="ki_jjc_tab " v-else-if="ball_name== 'dczc'">
                <div class="clearfix">
                    <p>选择期数</p>
                    <p @click="screen()">
                        <span>{{matchTime}}期</span>
                        <span class="aui-iconfont icon_down aui-icon-down"></span>
                    </p>
                </div>
                <div>
                    <ul>
                        <li>让球胜平负</li>
                        <li>比分</li>
                        <li>进球数</li>
                        <li>半全场</li>
                        <li>上下单双</li>

                    </ul>
                </div>
            </div>
		<div class="ki_jjc_tab ki_jjc_tablq" v-else-if="ball_name == 'jclq'">
			<div class="clearfix">
				<p>选择期数</p>
				<p @click="screen()">
					<span>{{matchTime}}期</span>
					<span class="aui-iconfont icon_down aui-icon-down"></span>
				</p>
			</div>
			<div>
				<ul>
					<li>胜负</li>
					<li>让球胜负</li>
					<li>胜负差</li>
					<li>大小分</li>
				</ul>
			</div>
		</div>
		<section class="aui-refresh-content" id="app" v-cloak v-show="flag1">
			<template v-if="ball_name== 'jczq'||ball_name== 'dczc'">
			<ul class="kj_jjc_list" v-if="football_data">
				<li class="jl" v-for="(item, index) in football_data" @click="sliders(index)">
					<p>
						
						<span>{{item.lineId|xuhao()}} </span>
						<span>{{item.gameName}}</span>
					</p>
					<div>
						<div>{{item.homeTeamName}}</div>
						<div>
							<span>{{item.score}}</span>
							<span>半({{item.halfScore}})</span>
						</div>
						<div>{{item.guestTeamName}}</div>
					</div>
					<ul class="jjc_list_sp">

						<li v-for="(bt,index) in item.result.split(',')">
							<span v-if="ball_name== 'dczc'&&index==2">{{bt}}球</span>
              <span v-else>{{bt}}</span>

					
						</li>

					</ul>
					<ul class="jjc_list_sp boder_none_top ">
						<li v-for="(sp,index) in item.resultSP.split(',')">
							<span v-if="sp==''">--</span>
							<span v-else>{{sp}}</span>

						</li>
					</ul>
				</li>
			</ul>
			</template>
			<template v-if="ball_name== 'jclq'">
				<ul class="kj_jjc_list kj_jjc_lq" v-if="football_data">
					<li class="jl" v-for="(item, index) in football_data" @click="sliders(index)">
						<p>
							<span>{{item.lineId|xuhao()}} </span>
							<span>{{item.gameName}}</span>
						</p>
						<div>
							<div>{{item.homeTeamName}}</div>
							<div>
								<span>{{score_svg(item.score)}}</span>
								<span></span>
							</div>
							<div>{{item.guestTeamName}}</div>
						</div>
						<ul class="jjc_list_sp">
							<li v-for="(bt,index) in item.result.split(',')"  v-if='item.resultSP.split(",")[index]!=""'>
								<span v-if="bt==''">--</span>
								<span v-else>{{bt}}</span>
							</li>
						</ul>
						<ul class="jjc_list_sp boder_none_top ">
							<li v-for="(sp,index) in item.resultSP.split(',')" v-if='item.resultSP.split(",")[index]!=""'>
								<span v-if="sp==''">--</span>
								<span v-else>{{sp}}</span>
				
							</li>
						</ul>
					</li>
				</ul>
			</template>	
			<!-- <ul class="sports_lottery" v-if="football_data">
					<li class="lottery_title">
					<span class="date" v-if='football_data.length>0'>{{football_data[0].matchTime|getTime(3)}}</span>
					<span class="games">{{football_data.length}}场 比赛已开奖</span>
				</li>
				<li class="list_content" v-for="(item, index) in football_data" @click="sliders(index)">
					<div class="football_content">
						<div class="left">
							<span :class="jc_content.data.lottery == 'JCZQ' || !jc_content.data.lottery?'':'black'" class="match_type">{{item.gameName}}</span>
							<span class="number">({{item.lineId}})</span>
						</div>
						<div class="right">
							<div class="top">
								<span class="name">{{item.homeTeamName}}</span>
								<span class="score" v-html="score_svg(item.score,jc_content.data.lottery)"></span>
								<span class="name">{{item.guestTeamName}}</span>
							</div>
							<div class="bottom">
								<span v-if="jc_content.data.lottery == 'JCZQ'|| !jc_content.data.lottery" class="half">半场 {{item.halfScore}}</span>
								<span v-if="jc_content.data.lottery == 'JCLQ'" class="half">总分{{parseInt(item.score.split(':')[0])+parseInt(item.score.split(':')[1])}}分
									差{{Math.abs(parseInt(item.score.split(':')[0])-parseInt(item.score.split(':')[1]))}}</span>
							</div>
						</div>
						<span :class="index == indexs?'aui-icon-top':'aui-icon-down'" class="aui-iconfont icon_down"></span>
					</div>
					<div class="scale" :class="[index==indexs?'':'dis-no']">
						<div class="columns">
							<template v-for="(ball_name,index) in item.resultSP.split(',')">
								<div class="items" v-if="ball_name!==''">
									<div class="item">
										<span class="ball_name">{{item.result.split(',')[index]}}</span>
										<span class="ball_score">{{item.resultSP.split(',')[index]}}</span>
									</div>
								</div>`
								<span v-if="ball_name!==''" :class="((index == item.resultSP.split(',').length-2)&&(item.resultSP.split(',')[index+1]=='')) || ((index == item.resultSP.split(',').length-1)&&(ball_name!==''))? 'dis-no':'border'"></span>
							</template>
						</div>
					</div>
				</li>
			</ul> -->
			<no-more v-show='nomore'></no-more>
		</section>
		<!-- 时间弹窗 -->
		<div v-show="popupVisible" class="maskBox" @click="hidePopup()"></div>
		<div v-show="popupVisible" class="timeDom">
			<p v-for="(item,index) in tabtime" :class="{'active':item.state}" @click="tabtimeon(index)">{{item.name}}</p>
			<p  @click="tabtimeon('取消')">取消</p>

		</div>
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
				nomore: false,
				shareStatue: false, //分享状态
				page: 1,
				rows: 30,
				indexs: -1,
				flag1: false,
				football_data: [],
				jc_content: {},
				ball_name: '',
				ballTitName: '',
				matchTime: '',
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
				tabtime: [
				],
				popupVisible: false,
			};
		},
		created() {
			sessionStorage.removeItem('play');
			sessionStorage.removeItem('shaixuan');
			sessionStorage.removeItem('playTypeName');
			sessionStorage.removeItem('name');
			this.ballTitName = this.$route.query.change_text;
			this.ball_name = this.$route.query.ball_name;
			this.matchTime = this.$route.query.matchTime;
			this.footballData(this.ball_name, this.page, this.rows, this.matchTime);
			var strlist = [];
			for (var i = 0; i < 7; i++) {
				if(i==0){
					var strdata = {
						'id': i,
						'state': true,
						'name': this.matchTime*1-i
					};
				}else{
					var strdata = {
						'id': i,
						'state': false,
						'name': this.matchTime*1-i
					};
				}
				
				strlist.push(strdata);
			}
			this.tabtime = strlist;
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
					that.footballData(that.ball_name, that.page, that.rows, that.matchTime);
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
				if (ret.isToBottom == true && that.auiScroll && !that.nomore) {
					that.auiScroll = false;
					console.log(1)
					that.page++;
					that.footballData(that.ball_name, that.page, that.rows, that.matchTime);
				}
			});
		},
		beforeDestroy() {
			this.auiScroll = false;
			this.$ajax.defaults.timeout = 50000;
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
			},
			xuhao :function(str){
				var strobg=str.toString();
				if(strobg.length==3){
					return strobg;
				}else if(strobg.length==2){
					 strobg='0'+strobg;
				return strobg;
				}else if(strobg.length==1){
					 strobg='00'+strobg;
				return strobg;
				}else{
					return strobg;
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
			score_svg: function(str) {
				var ret =str;
				if (str) {
					var arr = str.split(':');
					if (arr.length == 2) {
						var bet=arr[1]+':'+arr[0];
						return bet;
					}else{
						return ret;
					}
				}else{
					return ret;
				}
				
			},
			// 显示隐藏弹窗
			screen: function() {
				this.popupVisible = true;
			},
			hidePopup: function() {
				this.popupVisible = false;
			},
			tabtimeon:function(index){
				console.log(index);
				this.popupVisible = false;
				if (index == '取消') {
					return;
				}

				this.dataslength = false;
		
				for (var n = 0; n < this.tabtime.length; n++) {
					this.tabtime[n].state = false;
				}
				this.tabtime[index].state = true;
				this.page = 1;
			    this.matchTime=this.tabtime[index].name;
				this.footballData(this.ball_name, this.page, this.rows, this.matchTime);
			},
			sliders: function(i) {
				if (i == this.indexs) {
					this.indexs = -1
				} else {
					this.indexs = i
				}
			},
			footballData: function(ball_name, page, rows, matchTime) { //请求数据 
				this.nomore = false;
				var data = [];
				data["lotteryType"] = ball_name;
				data["page"] = page;
				data["rows"] = rows;
				data["matchTime"] = matchTime;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});

				this.$ajax.post('/caipiaoshouye/index.php/home/index/getDrawResultsByDate',
						datas
					)
					.then(res => {
						console.log(res);
						if (res.data.status == 500) {
							alert("服务器异常，请稍后重试");
						} else if (res.data.status == 200) {
							var jc_content = JSON.parse(res.data.content);
							this.jc_content = jc_content;
							if (jc_content) {
								if (jc_content.code == 100000) {
									this.flag1 = true;
									if (jc_content.data.matchList == [] || jc_content.data.matchList == null || jc_content.data.matchList == "") {

										if (this.football_data.length > 0) {
											this.nomore = true;
										}
									} else {
										this.auiScroll = true;
										var data = jc_content.data.matchList;
										if (page == 1) {
											this.football_data = data
										} else {
											this.football_data = this.football_data.concat(data);
										}


									}
								}
							} else {
								alert("服务器异常，请稍后重试");
							}
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
					case 'jczq':
						this.Jumpgoucai('goucai_jjc_zq', 'JCZQ', '竞彩足球')
						break;
					case 'jclq':
						this.Jumpgoucai('goucai_jjc_lq', 'JCLQ', '竞彩篮球')
						break;
					case 'dczc':
						this.Jumpgoucai('goucai_jjc_bjdc', 'BJDC', '北京单场')
						break;
					default:
						this.Jumpgoucai('goucai_jjc_zq', 'JCZQ', '竞彩足球')
				}
			},
			Jumpgoucai(id, path, name) {
				this.$router.push({
					name: id,
					query: {
						name: name,
						path: path
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
	@import "../../css/lottery_football_details.css";

	.ki_jjc_tab {
		width: 100%;
		position: fixed;
		top: 2.25rem;
		left: 0;
		z-index: 96;
	}

	.aui-refresh-content {
		top: 5.7rem
	}

	.ki_jjc_tab div:first-child {
		width: 100%;
		padding: 0.6rem 0.7rem;
		color: #444444;
		background: linear-gradient(180deg, rgba(246, 244, 244, 1) 0%, rgba(255, 255, 255, 1) 100%);
	}

	.ki_jjc_tab div:first-child p:first-child {
		float: left;
		font-size: 0.6rem;
		line-height: 0.75rem;
		font-weight: 400;
	}

	.ki_jjc_tab div:first-child p:last-child {
		float: right;
		font-size: 0.6rem;
		line-height: 0.75rem;
		font-weight: 400;
	}

	.ki_jjc_tab div:first-child p:last-child span:last-child {
		padding-left: 0.2rem;
		font-size: 0.4rem;
		color: #444444;
	}

	.clearfix:after {
		content: ".";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}

	.ki_jjc_tab div:last-child {
		width: 100%;
		background-color: #FCFCFC;
	}

	.ki_jjc_tab div:last-child ul {
		width: 100%;
		padding: 0 0.5rem;
		display: flex;
	}

	.ki_jjc_tab div:last-child ul li {
		width: 20%;
		padding: 0.4rem 0;
		line-height: 0.7rem;
		font-size: 0.5rem;
		color: #888888;
		text-align: center;
	}
   .ki_jjc_tablq div:last-child ul li{
	   width: 25%;
   }
	.kj_jjc_list {
		width: 100%;


	}

	.kj_jjc_list .jl {
		padding: 0.5rem;
		background: #FFFFFF;
		margin-top: 0.4rem;
	}


	.kj_jjc_list li p:first-child {
		line-height: 0.85rem;
		color: #666666;
		font-size: 0.6rem;
		padding: 0 0.2rem;


	}

	.kj_jjc_list li p:first-child span:first-child {
		padding-right: 0.2rem;
	}

	.kj_jjc_list li div:nth-child(2) {
		display: flex;
		text-align: center;
		margin-bottom: 0.3rem;
	}

	.kj_jjc_list li div:nth-child(2) div:nth-child(1) {
		width: 38%;
		line-height: 0.9rem;
		font-size: 0.65rem;
		font-weight: 500;
		color: #333333;
		padding: 0.4rem 0;
	}

	.kj_jjc_list li div:nth-child(2) div:nth-child(2) {
		width: 24%;
		padding: 0.4rem 0;
		line-height: 0.9rem;
		font-weight: 500;
		margin: 0;
		display: flex;
		justify-content: center;
	}

	.kj_jjc_list li div:nth-child(2) div:nth-child(2) span:first-child {
		font-size: 0.6rem;
		color: #F82A5B;
		font-weight: 500;
		padding-right: 0.1rem;
	}

	.kj_jjc_list li div:nth-child(2) div:nth-child(2) span:last-child {
		font-size: 0.6rem;
		color: #666666;
	}

	.kj_jjc_list li div:nth-child(2) div:nth-child(3) {
		width: 38%;
		line-height: 0.9rem;
		font-size: 0.65rem;
		font-weight: 500;
		color: #333333;
		padding: 0.4rem 0;
	}

	.jjc_list_sp {
		display: flex;
		text-align: center;
		border: 1px solid #E3E3E3;
		padding: 0.2rem 0;
	}
   
	.jjc_list_sp li {
		width: 20%;
		border-right: 1px solid #E3E3E3;
		font-size: 0.55rem;
		color: #333333;
		line-height: 1rem;
	}
 .kj_jjc_lq .jjc_list_sp li {
		width: 25%;
		
	}
	.jjc_list_sp li:last-child {
		border: none;
	}

	.boder_none_top {
		border-top: none;
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
		color: #333333;
		background-color: #F7F7F7;
		font-size:0.7rem;
font-weight:400;
	}

	.timeDom p {
		width: 100%;
		height: 2.2rem;
		text-align: center;
		line-height: 2.2rem;
		background: #fff;
		border-bottom: 1px solid #F4F4F4;
		color: #666666;
		font-size:0.7rem;
font-weight:400;
letter-spacing:1px;
	}

	.timeDom p:nth-child(1) {
		border-top-left-radius: 0.3rem;
		border-top-right-radius: 0.3rem;
	}

	.timeDom p:nth-child(7) {
		border-bottom-left-radius: 0.3rem;
		border-bottom-right-radius: 0.3rem;
	}

	.timeDom p:last-child {
		margin-top: 3%;
		border-radius: 0.3rem;
		color: #333333;
	}
</style>
