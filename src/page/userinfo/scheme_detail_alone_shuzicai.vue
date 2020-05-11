<template>
	<div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" tapmode @click="OncloseWin()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">方案详情 </div>
			<div class="aui-pull-right aui-btn subhead">
				<span @click="shaidan()">晒单</span>
			</div>
		</header>
		<!-- 分享模态框 -->
		<div v-if="shareStatue" class="share_box" @click="hideShare()">
			<div class="share_cont">
				<div class="quxiao">取消</div>
				<div class="down" @click="openDownload()">前往下载</div>
			</div>
		</div>
		<section class="aui-refresh-content">
			<div class="aui-content">
				<section id='main'>
					<div class="main w-100 bg-w" id='main1' v-if='details'>
						<div class="refactorHeader">
							<div class="w-100 mr-0 flex-box  headerbox" id='headerbox'>
								<div class="box_left w-65">
									<div class="l_topbox w-100 flex-box">
										<div class="icon_box w-30">
											<img class="w-100" :src="require('../../assets/userinfo/'+icons)" />
										</div>
										<div class="type_box w-70 flex-box ">
											<span class="fs-17 fs-we w-100 tal pd-l-26 v-bon">{{details.lottery}}</span>
											<span class="fs-13 tal c-cc pd-l-26 v-bon pd-t-5">第{{details.periodNumber}}期</span>
										</div>
									</div>

								</div>
								<div class="box_right w-35">
									<img class="w-90" :src="require('../../assets/userinfo/'+imgType+'.png')" />
								</div>
							</div>
							<div class="refactorwin">
								<div class="refactorwinxiji flex-box mr-0">
									<div class="money_box">
										<span class="dis-bl w-100 fs-13 c-33 tac fs-we">{{(details.schemeCost*1).toFixed(2)}}元</span>
										<span class="dis-bl w-100 fs-12 c-99 tac ">方案金额</span>
									</div>
									<div class="money_box">
										<span class="dis-bl w-100 fs-13 tac c-f8  fs-we" v-if="baodiType=='已中奖'">{{baodiType}}</span>
										<span class="dis-bl w-100 fs-13  tac c-f8 fs-we" v-else-if="baodiType=='未中奖'">{{baodiType}}</span>
										<span class="dis-bl w-100 fs-13  tac c-f8 fs-we" v-else-if="baodiType=='已撤单'">{{baodiType}}</span>
										<span class="dis-bl w-100 fs-13 c-f8 tac fs-we" v-else>未开奖</span>
										<span class="dis-bl w-100 fs-12 c-99 tac">方案状态</span>
									</div>
									<div class="winmoney_box">
										<span v-if="!details.prizeAfterTax||details.prizeAfterTax=='--'" class="dis-bl w-100 fs-13 c-99 tac fs-we">-
											-</span>
										<span v-else class="dis-bl w-100 fs-13 c-f8 tac c-re fs-we">{{(details.prizeAfterTax*1).toFixed(2)}}元</span>
										<span class="dis-bl w-100 fs-12 c-99 tac ">中奖金额</span>
									</div>
								</div>
							</div>
						</div>
						<ul class="w-100  pd-b-5 bd-b-10-f4 ulbox">
							<li class="flex-box" v-if='details.result'>
								<span class="dis-bl fs-14">开奖号码</span>
								<span class="dis-bl  fs-12 c-re" v-if='details.lottery=="双色球"||details.lottery=="七乐彩"'>
									<i class="haossqi" v-for='hao in details.result.split(" ")[0].split(",")'>{{hao}}</i>
									<i class="haossqi b-blue">{{details.result.split(" ")[1]}}</i>
								</span>
								<span class="dis-bl  fs-12 c-re" v-else-if='details.lottery=="大乐透"'>
									<i class="haossqi" v-for='haod1 in details.result.split(" ")[0].split(",")'>{{haod1}}</i>
									<i class="haossqi b-blue" v-for='haod2 in details.result.split(" ")[1].split(",")'>{{haod2}}</i>
								</span>
								<span class="dis-bl  fs-12 c-re" v-else>
									<i class="haossqi" v-for='haod2 in details.result.split(",")'>{{haod2}}</i>
									<!-- {{details.result.replace(/,/g, " ")}} -->
								</span>
							</li>
							<li class="flex-box expect" v-if="details.prizeSendTime">
								<span class="dis-bl fs-14">预计派奖</span>
								<span class="dis-bl w-70 fs-14 c-66">{{details.prizeSendTime|capitalize(2)}}</span>
							</li>
						</ul>
						<div class="content_box w-100">
							<div class="detaillist">
								<div class="content_detail  fs-14 c-33" :class="closes?'bd-b-1':''" @click="closess()">
									投注内容
									<i v-if="baodiType=='未出票'" class="c-03">(&nbsp;{{baodiType}}&nbsp;)</i>
									<i v-else-if="baodiType=='已撤单'" class="c-03">(&nbsp;{{baodiType}}&nbsp;)</i>
									<i v-else class="c-03">(&nbsp;已出票&nbsp;)</i>
									<span class="fr dis-bl w-60 tar text-hide-1 c-bl" :class="closes?'close':''">
										<!-- {{lengths}}条 -->
									</span>
								</div>
								<table class="shuzitable" :class="closes?'':'dis-no'">
									<tr class="w-100" v-for='(d,index) in data'>
										<!-- td1 -->
										<td class="w-30 tac bg-f0 c-33">
											<div>{{d.playType.replace('【','').replace('】','')}}</div>
											<div>{{d.multiple}}倍</div>
											<div>{{d.units}}注</div>
										</td>
										<!-- td2 -->
										<td class="w-70 pd-l-1rem c-9b">
											<div v-for='(list,ies) in lists[index]'>{{list}}</div>
										</td>
									</tr>
								</table>
							</div>
							<div class="w-100 bd-b-10-f4"></div>
							<div class="content_title   fs-14" :class="nsmbzly?'bd-b-1':''" @click="nsmbzl()">更多信息
								<span class="fr dis-bl w-60 tar text-hide-1 c-f8" :class="nsmbzly ?'close':''"></span>
							</div>
							<ul class="w-100  pd-b-10" id="message" :class="nsmbzly?'':'dis-no'">
								<li class=" mr-0 flex-box ">
									<span class="dis-bl w-30">出票详情</span>
									<template v-if='isgplotterytype==1||details.moneyType=="COINS"'>
										<span class="dis-bl w-70 fs-13 c-03" v-if="details.schemePrintState == 'SUCCESS'">已出票</span>
										<span class="dis-bl w-70 fs-13 c-99" v-if="details.schemePrintState == 'UNPRINT'">未出票</span>
										<span class="dis-bl w-70 fs-13 c-99" v-if="details.schemePrintState == 'FAILED'">出票失败</span>
									</template>
									<template v-else-if='details.lottery=="双色球"||details.lottery=="福彩3D"'>
										<span class="dis-bl w-70 fs-12 c-03 text-line-b" v-if="details.schemePrintState == 'SUCCESS'&& details.imgUrl[0]&&isDaYuWuBai"><i
											 @click="hasTrueImgGai()" tapmode>查看实票</i></span>
										<span class="dis-bl w-70 fs-12 c-03 text-line-b" v-else-if="details.schemePrintState == 'SUCCESS'&& details.imgUrl[0]&&details.payOrNot"><i
											 @click="hasTrueImgGai()" tapmode>查看实票</i></span>
										<span class="dis-bl w-70 fs-12 c-03 text-line-b" v-else-if="details.schemePrintState == 'SUCCESS'&& !details.payOrNot&&!isDaYuWuBai"><i
											 @click="hasTrueImgNoPay()" tapmode>查看实票</i></span>
										<span class="dis-bl w-70 fs-12 c-03 text-line-b" v-else-if="details.schemePrintState == 'SUCCESS'&& !details.imgUrl[0]&&isDaYuWuBai"><i
											 @click="noTrueImg()" tapmode>实票上传中...</i></span>
										<span class="dis-bl w-70 fs-12 c-03 text-line-b" v-else-if="details.schemePrintState == 'SUCCESS'&& !details.imgUrl[0]&&details.payOrNot"><i
											 @click="noTrueImg()" tapmode>实票上传中...</i></span>
										<span class="dis-bl w-70 fs-12 c-99" v-if="details.schemePrintState == 'UNPRINT'">未出票</span>
										<span class="dis-bl w-70 fs-13 c-99" v-if="details.schemePrintState == 'FAILED'">出票失败</span>
									</template>
									<template v-else>
										<span class="dis-bl w-70 fs-12 c-03" v-if="details.schemePrintState == 'SUCCESS'">已出票</span>
										<span class="dis-bl w-70 fs-12 c-99" v-if="details.schemePrintState == 'UNPRINT'">未出票</span>
										<span class="dis-bl w-70 fs-13 c-99" v-if="details.schemePrintState == 'FAILED'">出票失败</span>
									</template>

								</li>
								<li class=" mr-0 flex-box ">
									<span class="dis-bl w-30  ">支付时间</span>
									<span class="dis-bl w-70 fs-13 c-99">{{payTime}}</span>
								</li>
								<li class="w-85 mr-0 flex-box ">
									<span class="dis-bl w-30  ">方案编号</span>
									<span class="dis-bl w-70 fs-13 c-99">{{details.screenNumber}}</span>
								</li>
								<li class="w-85 mr-0 flex-box ">
									<span class="dis-bl w-30  ">温馨提示</span>
									<span class="dis-bl w-70 fs-13 c-99">奖金直接打入您的账户</span>
								</li>
							</ul>
							<div class="w-100 bd-b-10-f4"></div>
						</div>
					</div>
					<!-- 查看实票 -->
					<div class="tishi_box" v-if='payBox'>
						<div class="tishi_info">因{{cpname}}票在索要实票的过程中有一定费用的产生，若您的方案金额未达500元时要查看实票，需要支付1元手续费后即可查看。</div>
						<div class="btn_box">
							<div class="quxiao" @click="qiongbi()" tapmode>取消</div>
							<div class="queding" @click="payApi()" tapmode>确定</div>
						</div>
					</div>

				</section>
			</div>

		</section>
		<div class="img_bg" v-if='hasTrueImg'>
			<div class="box_tab">
				<div class="img_box">
					<div class="border_box">
						<div class="swiper-container">
							<div class="swiper-wrapper">
								<div class="swiper-slide" v-for='(img,i) in tureImgUrl'>
									<img @click='closeImgBox()' tapmode :src="img" />
								</div>
							</div>
							<div class="swiper-pagination"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	let path = "";
	let _uid;
	let isgplotterytype = 0;
	let _schemeId_;
	let _lotteryTypeKey_;
	var pullToRefreshs;
	import {
		_ImgUrl_,
		getTime,
		getIcon,
		getCookie,
		setCookie,
		OverallData
	} from "../../js/common.js";
	import Swiper from 'swiper';
	import {
		Toast
	} from 'mint-ui';
	export default {
		data() {
			return {
				shareStatue: false, //分享状态
				data: '',
				lists: [],
				lengths: '',
				cpname: OverallData().cpname,
				closes: true,
				details: '',
				times: '',
				imgUrl: '',
				icons: '',
				payTime: '',
				hasTrueImg: false,
				payBox: false,
				tureImgUrl: '',
				baodiType: '',
				imgType: '',
				isgplotterytype: 0,
				isDaYuWuBai: false,
				topStatus: '',
				refreshSwitch: false,
				nsmbzly: true,
				starRefresh: false
			};
		},
		created() {
			document.querySelector('html').setAttribute('style', 'background-color:#f4f4f4;');
			_schemeId_ = this.$route.query.id;
			_lotteryTypeKey_ = this.$route.query.key;
			var newData = getCookie('newData');
			if (newData) {
				_uid = newData.userid;
			} else {
				this.$router.push({
					name: 'login'
				})
				return false;
			}

			GETurl(_schemeId_, _lotteryTypeKey_);
			this.getDetails(_schemeId_, _uid);
		},
		mounted() {
			let mySwiper = new Swiper('.swiper-container', {
				loop: true,
				width: window.innerWidth,
				autoHeight: true, //高度随内容变化
				pagination: {
					el: '.swiper-pagination',
					type: 'fraction',
				},
				autoplayDisableOnInteraction: false,
				observer: true, //修改swiper自己或子元素时，自动初始化swiper
				observeParents: true, //修改swiper的父元素时，自动初始化swiper
			});
			let that = this;
			pullToRefreshs = new auiPullToRefresh({ //下拉刷新
				container: document.querySelector('.aui-refresh-content'), //下拉容器
				triggerDistance: 80 //下拉高度
			}, function(ret) {
				if (ret.status == "success") {
					that.$ajax.defaults.timeout = 49527; //49527这个值控制没有showLonding
					that.refreshSwitch = false; //数据是否加载完成的开关==》关
					that.starRefresh = true; //开始下拉刷新
					that.getDetails(_schemeId_, _uid);
					if (that.refreshSwitch1 && that.refreshSwitch2) {
						that.$ajax.defaults.timeout = 50000;
						pullToRefreshs.cancelLoading(); //刷新成功后调用此方法隐藏
					}

				}
			});
		},
		watch: {
			//监听刷新开关refreshSwitch状态
			refreshSwitch(val) {
				console.log(val);
				if (val == true && this.starRefresh) {
					this.$ajax.defaults.timeout = 50000;
					pullToRefreshs.cancelLoading(); //刷新成功后调用此方法隐藏
				}
			}
		},
		beforeDestroy() {
			//离开页面就还原刷新状态
			document.querySelector('html').removeAttribute('style');
			this.$ajax.defaults.timeout = 50000;
			// pullToRefreshs.cancelLoading(); //刷新成功后调用此方法隐藏
		},
		methods: {
			shaidan: function() { //分享
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
			/* loadTop() {
			    this.getDetails(_schemeId_, _uid);
			    setTimeout(() => {
			        this.$refs.loadmore.onTopLoaded();
			    }, 1000)
			    // 加载更多数据
			},
			handleTopChange(status) {
			    this.topStatus = status;
			}, */
			getDetails: function() {
				var playType;
				var lotType;
				/*方案信息*/
				let data = [];
				data['schemeId'] = _schemeId_;
				data['userId'] = _uid;
				let dataes = this.Qs.stringify({
					'path': path,
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getSchemeDetail',
						dataes
					)
					.then(ret => {
						if (ret.status == 200) {
							var datas = JSON.parse(ret.data.content);
							console.log(datas.code)
							if (datas.code == 100000) {
								playType = datas;
								var details = datas.data;

								if (parseInt(details.schemeCost) > 500) {
									this.isDaYuWuBai = true;
								} else {
									this.isDaYuWuBai = false;
								}

								this.isgplotterytype = isgplotterytype;
								this.details = details;
								this.times = getTime(details.prizeSendTime, 1);
								console.log(details.lottery)
								this.icons = getIcon(details.lottery);
								// console.log('lailelaodic')
								this.imgUrl = getIcon(details.lottery);
								this.payTime = getTime(details.createTime, 2);
								if (details.imgUrl) {
									var tureImgUrl = [];
									if (typeof(details.imgUrl) == 'string') {
										var arrImgS = details.imgUrl.split(',');
										console.log(arrImgS);
										for (let i = 0; i < arrImgS.length; i++) {
											tureImgUrl.push(_ImgUrl_ + arrImgS[i])
										}
										this.tureImgUrl = tureImgUrl;
									} else {
										for (let s = 0; s < details.imgUrl.length; s++) {
											tureImgUrl.push(_ImgUrl_ + details.imgUrl[s])
										}
										this.tureImgUrl = tureImgUrl;
									}
									console.log(this.tureImgUrl);
								}
								//出票状态
								var baodiType;
								var imgType;
								if (details.schemePrintState == "SUCCESS") {
									imgType = 'detail_s04';
									if (details.winningUpdateStatus == "NONE") {
										baodiType = '已出票';
									} else if (details.winningUpdateStatus == "PRICE_UPDATED") {
										if (details.isWon) {
											baodiType = '已中奖';
											imgType = 'detail_s08';
										} else if (!details.isWon) {
											baodiType = '未中奖';
											imgType = 'detail_s07';
										}
									} else if (details.winningUpdateStatus == "WINNING_UPDATED") {
										if (details.isWon) {
											baodiType = '已中奖';
											imgType = 'detail_s08';
										} else if (!details.isWon) {
											baodiType = '未中奖';
											imgType = 'detail_s07';
										}
									}
								} else if (details.schemePrintState == "UNPRINT") {
									baodiType = '未出票';
									imgType = 'detail_s05';
									if (details.schemeState == "CANCEL" || details.state == "CANCEL") {
										imgType = 'detail_s06';
										baodiType = '已撤单';
									}
								} else if (details.schemeState == "CANCEL" || details.state == "CANCEL") {
									imgType = 'detail_s06';
									baodiType = '已撤单';
								};
								this.baodiType = baodiType;
								this.imgType = imgType;
							} else if (datas.code == "201010") {
								Toast("账户已被锁定，请联系客服");
								setCookie('newData', '', '0-S');
								this.$router.push({
									name: 'login'
								})
							};
							this.contents(lotType);
						} else {
							alert('网络错误！')
						}
					})
					.catch(err => {
						//this.MintUi.Indicator.close();
						console.log(err);
					})
			},
			contents: function(lotType) {
				let data = [];
				data['schemeId'] = _schemeId_;
				data['userId'] = _uid;
				let dataes = this.Qs.stringify({
					'path': path,
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getSchemeContent',
						dataes
					)
					.then(res => {
						this.refreshSwitch = true; //数据是否加载完成的开关==》开
						if (res.status == 200) {
							var dataes = JSON.parse(res.data.content);
							if (dataes.code == 100000) {
								console.log(11);
								var data = dataes.data;
								this.data = data;
								var lists = LongStrAdd(data);
								this.lists = lists;
								this.lengths = lists.length;
							}
						} else {
							alert('网络错误！')
						}
					})
					.catch(err => {
						this.refreshSwitch = true; //数据是否加载完成的开关==》开
						//this.MintUi.Indicator.close();
						console.log(err);
					})
			},
			closess: function() {
				var close = this.closes;
				if (close == false) {
					this.closes = true;
				} else {
					this.closes = false;
				}
			},
			hasTrueImgNoPay: function() {
				this.payBox = true;
			},
			hasTrueImgGai: function() {
				this.hasTrueImg = true;
			},
			noTrueImg: function() {
				Toast('实票图片正在上传，请您耐心等待！')
			},
			closeImgBox: function() {
				this.hasTrueImg = false;
			},
			qiongbi: function() {
				this.payBox = false;
			},
			nsmbzl: function() {
				var nsmbzly = this.nsmbzly;
				if (nsmbzly) {
					this.nsmbzly = false;
				} else {
					this.nsmbzly = true;
				}
			},
			payApi: function() {
				let data = [];
				data['sponsorId'] = this.details.sponsorId;
				data['schemeNumber'] = this.details.schemeNumber;
				let dataes = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/checkHandleFee',
						dataes
					)
					.then(ret => {
						if (ret.status == 200) {
							var payMess = JSON.parse(ret.data.content);
							console.log(JSON.stringify(payMess));
							if (payMess.code == '100000') {
								this.payBox = false;
								this.getDetails(_schemeId_, _uid);
							} else {
								alert(payMess.data.message)
							}
						} else {
							alert(payMess.data.message)
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			OncloseWin: function() {
				this.$router.go(-1)
			}
		},
		filters: {
			capitalize: function(matchDate, num) {
				let time = new Date(matchDate);
				let y = time.getFullYear();
				let m = time.getMonth() + 1 >= 10 ? parseInt(time.getMonth() + 1) : "0" + parseInt(time.getMonth() + 1);
				let d = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
				let h = time.getHours() >= 10 ? time.getHours() : "0" + time.getHours();
				let mm = time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes();
				let s = time.getSeconds() >= 10 ? time.getSeconds() : "0" + time.getSeconds();
				let dd = time.getDay();
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
				if (num == 1) {
					return m + "-" + d + " " + h + ":" + mm;
				} else if (num == 2) {
					return y + "/" + m + "/" + d + " " + h + ":" + mm;
				} else {
					return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
				}
			},
		}
	}

	function GETurl(_schemeId_, _lotteryTypeKey_) {
		console.log(_lotteryTypeKey_);
		console.log(_schemeId_);
		if (_schemeId_) {
			if (_lotteryTypeKey_ == "rxjc" || _lotteryTypeKey_ == "sfzc14") {
				_lotteryTypeKey_ = "sfzc";
			}
			switch (_lotteryTypeKey_) {
				case "ssq":
					path = "number/lows/ssq";
					break;
				case "dlt":
					path = "number/lows/dlt";
					break;
				case "pl":
					path = "number/lows/pl";
					break;
				case "pl3":
					path = "number/lows/pl";
					break;
				case 'fc3d':
					path = 'number/lows/welfare3d';
					break;
				case "pl5":
					path = "number/lows/pl";
					break;
				case "welfare3d":
					path = "number/lows/welfare3d";
					break;
				case "seven":
					path = "number/lows/seven";
					break;
				case "bjklb":
					path = "number/keno/bjklb";
					isgplotterytype = 1;
					break;
				case 'kl8':
					path = "number/keno/bjklb";
					isgplotterytype = 1;
					break;
				case "sdel11to5":
					path = "number/keno/sdel11to5";
					isgplotterytype = 1;
					break;

				case "cqssc":
					path = "number/keno/cqssc";
					isgplotterytype = 1;
					break;
				case "xjssc":
					path = "number/keno/xjssc";
					isgplotterytype = 1;
					break;
				case "gdel11to5":
					path = "number/keno/gdel11to5";
					isgplotterytype = 1;
					break;
				case "jxel11to5":
					path = "number/keno/jxel11to5";
					isgplotterytype = 1;
					break;
				case "gdklsf":
					path = "number/keno/gdklsf";
					isgplotterytype = 1;
					break;
				case "gdkls":
					path = "number/keno/gdklsf";
					isgplotterytype = 1;
					break;
				case "tjklsf":
					path = "number/keno/tjklsf";
					isgplotterytype = 1;
					break;
				case "tjkls":
					path = "number/keno/tjklsf";
					isgplotterytype = 1;
					break;

				case "ahk3":
					path = "number/keno/ahk3";
					isgplotterytype = 1;
					break;
				case "hbk3":
					path = "number/keno/hbk3";
					isgplotterytype = 1;
					break;
				case "jsk3":
					path = "number/keno/jsk3";
					isgplotterytype = 1;
					break;
					case "bjk3":
						path = "number/keno/bjk3";
						break;
				case "jczq":
					path = "jc/jczq";
					break;
				case "jclq":
					path = "jc/jclq";
					break;
				case "dczc":
					path = "jc/dczc";
					break;
				case "sczc":
					path = "jc/sczc";
					break;
				case "sfzc":
					path = "jc/sfzc";
					break;
				case "lczc":
					path = "jc/lczc";
					break;
				case "rxjc":
					path = "jc/sfzc";
					break;
				case "sfzc14":
					path = "jc/sfzc";
					break;
			}
			// schemeId = _schemeId_;
			console.log(path)
		};


	}

	function LongStrAdd(array, n) {
		var arr = [];
		for (var i = 0; i < array.length; i++) {
			arr.push(array[i].content.replace(/<br>/g, "</br>").split('</br>'));
		}
		console.log(arr);
		return arr;
	}
</script>

<style scoped>
	@import "../../css/scheme_detail_alone.css";

	header {
		position: fixed;
		background: #03A9F4;
	}
</style>
