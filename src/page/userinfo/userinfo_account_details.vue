<template>
	<div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="bake()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">
				账户明细
			</div>
			<div id="record_text" class="aui-pull-right" @click="screen()">
				筛选
			</div>
		</header>
		<!-- <div id="record_time" class=" record_time">
            <div v-for="(d,index) in tabtime" class="btn_record_time " :class="{'active':d.state}" @click="tabtimeon(index)">{{d.name}}</div>
        </div> -->
		<div class="record_titel" id="record_titel">
			<div v-for="(d,index) in tab_noto" class=" tapmode " :class="{'active':d.state}" @click="tab_notoli(index)">{{d.neme}}</div>

		</div>
		<div v-if="datastr.length>0">
			<div class="time_tlel" id='ssss' v-if="htmltltel">
				<div class="time_tlel_l" @click="time_show(htmltltel.timey,htmltltel.timem)">
					{{htmltltel.timey}}年{{htmltltel.timem}}月<img src="../../assets/userinfo/retope5.png" />
					<!-- <label class="mothlabel" for="input1"></label> -->
					<input class="mothinput" id="input1" v-model="time1" type="month" />
				</div>
				<div class="time_tlel_r">
					<p>收入¥{{numberFormat(htmltltel.other.incomeSum)}}元</p>
					<p>支出¥{{numberFormat(htmltltel.other.expenditureSum)}}元</p>
				</div>
			</div>
			<div class="time_tlel" v-else>
				<div class="time_tlel_l" @click="time_show(datastr[0].timey,datastr[0].timem)">
					{{datastr[0].timey}}年{{datastr[0].timem}}月<img src="../../assets/userinfo/retope5.png" />
					<!-- <label class="mothlabel" for="input1"></label> -->
					<input class="mothinput" id="input1" v-model="time1" type="month" />
				</div>
				<div class="time_tlel_r">
					<p>收入¥{{numberFormat(datastr[0].other.incomeSum)}}元</p>
					<p>支出¥{{numberFormat(datastr[0].other.expenditureSum)}}元</p>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="time_tlel">
				<div class="time_tlel_l" @click="time_show(time_y,time_m)">
					{{time_y}}年{{time_m}}月<img src="../../assets/userinfo/retope5.png" />
					<!-- <label class="mothlabel" for="input1"></label> -->
					<input class="mothinput" id="input1" v-model="time1" type="month" />
				</div>
				<div class="time_tlel_r">
					<p>收入¥{{numberFormat(0)}}元</p>
					<p>支出¥{{numberFormat(0)}}元</p>
				</div>
			</div>

		</div>
		<section class="aui-refresh-content" id="aui-refreshdr">
			<div class="aui-content">
				<div v-if="datastr.length>0&&!dataslength">
					<div v-for=" (th, cindex) in datastr">
						<div class="auitime_list" :id="cindex" v-show="cindex>0">
							<div class="time_tlel_l" @click="time_show(th.timey,th.timem)">
								{{th.timey}}年{{th.timem}}月<img src="../../assets/userinfo/retope5.png" />
								<!-- <label class="mothlabel" :for="'inputt'+cindex"></label> -->
								<input @click="clicmoth(cindex)" :id="'inputt'+cindex" class="mothinput" v-model="th.time" type="month" />
							</div>

							<div class="time_tlel_r">
								<p>收入¥{{numberFormat(th.other.incomeSum)}}元</p>
								<p>支出¥{{numberFormat(th.other.expenditureSum)}}元</p>
							</div>
						</div>
						<div class="moto_vh">
							<!-- <div v-if="dataslength" class="londNull"><img src="../../assets/userinfo/yiyiyi.png">
								<p>还没有账户明细…</p>
							</div> -->
							<!-- <lini-page v-if="dataslength" :prompt='"还没有账户明细..."' :zheight='"100vh"' :zwidth='"100%"' :tpyes="'record'"></lini-page> -->
							<ul class="record_all_bets" id="record_all_bets">

								<li v-for='d in th.datas'>
									<div class="all_bets_left">
										<img v-if="d.type=='SUBSCRIPTION'" src="./../../assets/userinfo/details/icon01.png" />
										<img v-else-if='d.type=="CANCEL_SUBSCRIPTION"' src="./../../assets/userinfo/details/icon02.png" alt="撤销认购">
										<img v-else-if='d.type=="BAODI"' src="./../../assets/userinfo/details/icon03.png" alt="保底">
										<img v-else-if='d.type=="CANCEL_BAODI"' src="./../../assets/userinfo/details/icon04.png" alt="撤销保底">
										<img v-else-if='d.type=="REFUNDMENT_SCHEME"' src="./../../assets/userinfo/details/icon06.png" alt="方案撤单">
										<img v-else-if='d.type=="SCHEME_COMMISSION"' src="./../../assets/userinfo/details/icon05.png" alt="方案退款">
										<img v-else-if='d.type=="SCHEME_COMMISSION"' src="./../../assets/userinfo/details/icon06.png" alt="方案佣金">
										<img v-else-if='d.type=="SCHEME_BONUS"' src="./../../assets/userinfo/details/icon10.png" alt="奖金分红">
										<img v-else-if='d.type=="CHASE"' src="./../../assets/userinfo/details/icon12.png" alt="追号">
										<img v-else-if='d.type=="DRAWING"' src="./../../assets/userinfo/details/icon13.png" alt="用户提款">
										<img v-else-if='d.type=="STOP_CHASE"' src="./../../assets/userinfo/details/icon17.png" alt="停止追号">
										<img v-else-if='d.type=="DRAWINGFAIL"' src="./../../assets/userinfo/details/icon16.png" alt="提款失败返回">
										<img v-else-if='d.type=="PAY"' src="./../../assets/userinfo/details/icon20.png" alt="在线充值">
										<img v-else-if='d.type=="ADMINPAY"' src="./../../assets/userinfo/details/icon18.png" alt="系统操作">
										<img v-else-if='d.type=="CANCEL_PRIZE"' src="./../../assets/userinfo/details/icon14.png" alt="撤销">
										<img v-else-if='d.type=="HANDLING_FEES"' src="./../../assets/userinfo/details/icon15.png" alt="实票手续费">
										<img v-else-if='d.type=="GGC_PRIZE"' src="./../../assets/userinfo/details/icon11.png" alt="刮刮卡中奖">
										<img v-else src="./../../assets/userinfo/details/icon19.png" alt="其他">
									</div>
									<div class="all_bets_in">
										<p>{{d.typeText}}</p>
										<p>{{GetTimeStrfromnum(d.createTime*1,2)}}</p>
									</div>
									<div class="all_bets_right">
										<p v-if='d.modeText=="收入"' class="red">+{{d.money}}</p>
										<p v-else class="yellow">-{{d.money}}</p>
										<div>账户余额:&nbsp&nbsp&nbsp&nbsp{{d.resultMoney}}</div>
									</div>
								</li>

							</ul>
						</div>
					</div>
				</div>
				<div v-else-if="dataslength&&datastr.length<1">
					<!-- <div  class="londNull"><img src="../../assets/userinfo/yiyiyi.png">
						<p>还没有账户明细…</p>
					</div> -->
					<lini-page :prompt='"暂无数据"' :zheight='"100vh"' :zwidth='"100%"' :tpyes="'record'"></lini-page>
				</div>
			</div>
		</section>
		<!-- 时间弹窗 -->
		<div v-if="popupVisible" class="maskBox" @click="hidePopup()"></div>
		<div class="show_list" id="loveyou">
			<p>选择类别</p>
			<div class="caiborder" v-for="(item,index) in sxtab_noto" :class="{'active':item.state}" @click="tabtimeon(index,item.id)">{{item.name}}</div>
			<p @click="hidePopup()">取消</p>
		</div>
		<div class="time_mc" v-show="timeshow" @click="time_hide()">

		</div>
		<div class="swiperdeta_tr" id="swiperdeta_tr">
			<div class="btn_top">
				<p @click="time_hide()">取消</p>
				<p @click="time_index()">确定</p>
			</div>
			<div class="swiperdeta_con">
				<div class="swiperdeta_con_l">
					<div class=" swiperdeta1 swiper-container">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="c in time_yeurlist">{{c.str}}</div>

						</div>
					</div>
				</div>
				<div class="swiperdeta_con_r">
					<div class="swiperdeta2  swiper-container">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="d in time_mothlist">
								{{d.index*1+1}}
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	var myswiperleft;
	var myswiperright;
	import Swiper from 'swiper';
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
		setCookie,
		TypeCapitalconversionLowercase,
		details
	} from "../../js/common";
	export default {
		data() {
			return {
				topStatus: '',
				auiScroll: true,
				bottomStatus: '',
				searchBarFixed: false,
				other: {
					"incomeSum": 0.00,
					"expenditureSum": 0.00,
					"prepaymentsSum": 0.00
				},
				datas: [],
				datastr: [],
				time: [],
				time1: [],
				popupVisible: false,
				alert_text: true,
				dataslength: false,
				fundDetailType: '',
				time_y: '2019',
				time_m: '1',
				type: '',
				listcx: 0,
				time_kz: true,
				refsh:false,
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
				tabtime: [{
					'id': 1,
					'state': true,
					'name': '今天'
				}, {
					'id': 2,
					'state': false,
					'name': '昨天'
				}, {
					'id': 3,
					'state': false,
					'name': '七天'
				}, {
					'id': 4,
					'state': false,
					'name': '三十天'
				}],
				tab_noto: [{
						'id': 1,
						'state': true,
						'neme': '全部'
					}, {
						'id': 2,
						'state': false,
						'neme': '收入'
					}, {
						'id': 3,
						'state': false,
						'neme': '支出'
					}

				],
				sxtab_noto: [{
						'id': '',
						'state': true,
						'name': '全部'
					}, {
						'id': 0,
						'state': false,
						'name': '认购'
					}, {
						'id': 9,
						'state': false,
						'name': '追号'
					},
					{
						'id': 13,
						'state': false,
						'name': '充值'
					},
					{
						'id': 10,
						'state': false,
						'name': '提现'
					}
				],
				htmltltel: '',
				clicsaix: false,
				timeshow: false,
				time_mothlist: [{
						'index': '0'
					}, {
						'index': '1'
					}, {
						'index': '2'
					},
					{
						'index': '3'
					},
					{
						'index': '4'
					}, {
						'index': '5'
					}, {
						'index': '6'
					}, {
						'index': '7'
					},
					{
						'index': '8'
					},
					{
						'index': '9'
					},
					{
						'index': '10'
					},
					{
						'index': '11'
					}
				],
				time_yeurlist: [{
						str: 2018
					},
					{
						str: 2019
					},
				]
			}
		},
		watch: {
			// 如果 `question` 发生改变，这个函数就会运行
			time: function() {

				console.log(this.time_kz);

				if (this.time_kz) {
					this.datastr = [];
					this.page = 1;
					this.htmltltel = '';
					this.auiScroll = false;
					console.log(this.time);
					// alert()
					this.rendering_data(this.time);
				}

				// alert(this.time);
			},
			time1: function() {
				if (this.time1_kz) {
					this.datastr = [];
					this.page = 1;
					this.htmltltel = '';
					this.auiScroll = false;
					// alert()
					this.rendering_data(this.time1);
				}


			},
			datastr: {
				handler(newdatastr, olddatastr) {
					if (this.datastr.length > 0) {

						if (this.datastr.length > 0) {

							if (this.listcx > 0) {

								this.auiScroll = false;
								this.time_kz = false;
								console.log(this.datastr[this.listcx].time);
								this.time = this.datastr[this.listcx].time;
								this.datastr = [];
								this.page = 1;
								this.htmltltel = '';
								// alert()
								this.rendering_data(this.time);
								this.listcx = 0;
							}

						}
					}

				},
				immediate: true,
				deep: true

			}
		},

		beforeDestroy() {

			this.auiScroll = false; //取消上拉监听

			window.removeEventListener('scroll', this.handleScroll);

		},

		created() {
			var time;
			if (this.time1 == '') {
				time = '';
			} else {
				time = this.time1;
			}
			Indicator.open('加载中');
			this.rendering_data(time);
			Indicator.close();
			var strlist = [];
			for (var i = 0; i < 6; i++) {
				var strdata = {
					str: this.time_y * 1 - i
				};
				strlist.push(strdata);
			}
			this.time_yeurlist = strlist;
		},
		mounted() {

			var that = this;
			var pullToRefreshs = new auiPullToRefresh({ //下拉刷新
				container: document.querySelector('.aui-refresh-content'), //下拉容器
				triggerDistance: 80 //下拉高度
			}, function(ret) {
				if (ret.status == "success") {
					that.time_hide();
					that.auiScroll = true;
					that.page = 1;
					// that.datastr = [];
					var time = '';
                    
                    if (that.refsh) {
                      time=that.time1;
					  this.refsh=false;
                    }
					that.rendering_data(time);
					setTimeout(() => {
						pullToRefreshs.cancelLoading(); //刷新成功后调用此方法隐藏
					}, 1500)
				}
			});
			var scrolls = new auiScroll({ //上拉加载
				listen: false, //是否监听滚动高度，开启后将实时返回滚动高度
				distance: 200 //判断到达底部的距离，isToBottom为true
			}, function(ret) {
				if (ret.isToBottom == true && that.auiScroll && that.datastr.length > 0) {
					that.auiScroll = false;
					that.page++
					console.log(that.page)
					that.rendering_data(that.time);
				}
			});
			// 监听滚动
			window.addEventListener('scroll', this.handleScroll);
			myswiperright = new Swiper('.swiperdeta2', {
				direction: 'vertical',

				slidesPerView: 3,
				centeredSlides: true,

			});
			myswiperleft = new Swiper('.swiperdeta1', {
				direction: 'vertical',
				slidesPerView: 3,
				centeredSlides: true,

			});

		},
		methods: {
			handleScroll: function function_name() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				var div_list = document.getElementsByClassName('auitime_list')
				for (var i = 0; i < div_list.length; i++) {
					var offsetTop = div_list[i].offsetTop;
					if (scrollTop > offsetTop) {
						// console.log(div_list[i].innerHTML);

						this.htmltltel = this.datastr[div_list[i].id];
						var time = this.htmltltel.timey + '-' + this.htmltltel.timem;
						console.log(this.htmltltel);
						this.time_kz = false;

						this.time1_kz = false;
						this.time1 = time;
					}

				}



			},
			time_hide: function() {
				this.timeshow = false;
				var bottomDom = document.getElementById('swiperdeta_tr');
				var bottomDomInitial = window.getComputedStyle(bottomDom).height.replace('px', '') * 1 * -1;
				details(document.getElementById('swiperdeta_tr'), bottomDomInitial);
				this.auiScroll = true;
				// document.getElementById('swiperdeta_tr').style.bottom = "-8rem";
			},
			time_show: function(y, m) {

				var index = m * 1 - 1;
				var cindex = y;
				for (var i = 0; i < this.time_yeurlist.length; i++) {
					if (cindex == this.time_yeurlist[i].str) {
						myswiperleft.slideTo(i);
					}
				}
				myswiperright.slideTo(index);

				this.auiScroll = false;

				details(document.getElementById('swiperdeta_tr'), 0);

				// document.getElementById('swiperdeta_tr').style.bottom = "0rem";
				this.timeshow = true;
			},
			time_index: function() {
				var bottomDom = document.getElementById('swiperdeta_tr');
				var bottomDomInitial = window.getComputedStyle(bottomDom).height.replace('px', '') * 1 * -1;
				details(document.getElementById('swiperdeta_tr'), bottomDomInitial);
				// document.getElementById('swiperdeta_tr').style.bottom = "-8rem";
				this.timeshow = false;
				this.time1_kz = true;
				var yeur = myswiperleft.activeIndex;
				var moth = myswiperright.activeIndex + 1;
				if (moth < 10) {
					moth = "0" + moth;
				}

				this.time_y = this.time_yeurlist[yeur].str;
				this.time_m = moth;
				this.time1_kz = true;
				this.time1 = this.time_yeurlist[yeur].str + "-" + moth;
				this.refsh=true;

			},
			clicmothtime1: function() {
				this.time1_kz = true;
			},
			clicmoth: function(index) {
				this.listcx = index;
			},

			// 显示弹窗
			screen: function() {
				
				details(document.getElementById('loveyou'), 0);
				this.popupVisible = true;
			},
			hidePopup: function() {
               var lv = document.getElementById('loveyou');
               var lvInitial = window.getComputedStyle(lv).height.replace('px', '') * 1 * -1;
               details(document.getElementById('loveyou'), lvInitial);
				this.popupVisible = false;
			},
			timeChange: function(index) {

				var index = index;
				console.log(index);
				this.popupVisible = false;

			},
			numberFormat: function(number) {
				var data = Math.floor(number * 100) / 100;
				return data.toFixed(2);
			},
			tabtimeon: function(index, id) {
				// id标识认购，追号序列号
				var lv = document.getElementById('loveyou');
				var lvInitial = window.getComputedStyle(lv).height.replace('px', '') * 1 * -1;
				details(document.getElementById('loveyou'), lvInitial);
				this.popupVisible = false;
				for (var n = 0; n < this.sxtab_noto.length; n++) {
					this.sxtab_noto[n].state = false;
				}
				this.sxtab_noto[index].state = true;
				this.fundDetailType = id;
				this.datastr = [];
				this.dataslength = false;
				var nowt = new Date();
				var fgetyeur = nowt.getFullYear();
				var fgetmonth = nowt.getMonth() + 1;
				if (fgetmonth < 10) {
					fgetmonth = "0" + fgetmonth;
				}
				var time = fgetyeur + "-" + fgetmonth;
				this.time_kz = false;
				this.page = 1;

				this.auiScroll = false;
				this.htmltltel = '';
				this.time = time;
				this.rendering_data(this.time);
			},
			bake: function() {
				this.$router.go(-1); //根据浏览器记录返回上一次
			},
			tab_notoli: function(index) {
				if (this.clicsaix) {
					return false;
				}
				// 筛选支出还是收入0全部1收入2支出
				for (var n = 0; n < this.tab_noto.length; n++) {
					this.tab_noto[n].state = false;
				}
				this.tab_noto[index].state = true;

				if (index == 0) {
					this.mode = "";
					this.type = "0";
				} else if (index == 1) {
					this.mode = "0";

				} else if (index == 2) {
					this.mode = "1";

				}
				this.datastr = [];
				this.dataslength = false;
				var nowt = new Date();
				var fgetyeur = nowt.getFullYear();
				var fgetmonth = nowt.getMonth() + 1;
				if (fgetmonth < 10) {
					fgetmonth = "0" + fgetmonth;
				}
				var time = fgetyeur + "-" + fgetmonth;
				this.time_kz = false;
				this.time = time;
				this.htmltltel = '';
				this.auiScroll = false;
				this.page = 1;
				this.rendering_data(this.time);
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
			NumLength2: function(num) {
				if (num < 10) return "0" + num;
				else return num;
			},
			// 调用渲染数据的方法
			rendering_data: function(time) {
				console.log(time)
				this.dataslength = false;
				if (time == '') {
					var nowt = new Date();
					var getyeur = nowt.getFullYear();
					var getmonth = nowt.getMonth() + 1;
					var getday = new Date(getyeur, getmonth, 0).getDate();


					if (getmonth < 10) {
						getmonth = "0" + getmonth;
					}
					this.time_y = getyeur;
					this.time_m = getmonth;
					this.time1_kz = false;
					this.time1 = time;
					var startTime = getyeur + "-" + getmonth + "-01";
					var endTime = getyeur + "-" + getmonth + "-" + getday;
					if (this.startTime == startTime) {} else {
						this.startTime = getyeur + "-" + getmonth + "-01";
						this.endTime = getyeur + "-" + getmonth + "-" + getday;
					}

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
				data["size"] = 20;
				data["fundDetailType"] = this.fundDetailType;
				data["page"] = this.page;
				data["moneyType"] = 0;
				data["startTime"] = this.startTime;
				data["endTime"] = this.endTime;

				var datas = this.Qs.stringify({
					"mid": 1,
					"appId": 1,
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
						// console.log(JSON.stringify(content));
						this.time_kz = true;
						if (res.data.status == 200) {

							if (content.code == 1000) {
								var data = content.data.obj;
								//当月总流水
								if (content.data.other !== '') {
									this.other = content.data.other;
								} else {
									this.other = {
										"incomeSum": 0.00,
										"expenditureSum": 0.00,
										"prepaymentsSum": 0.00
									};
								}
								var result = this.startTime.split("-");
								var getyeur = result[0];
								var getmonth = result[1];
								this.alert_text = false;

								var nowt = new Date();
								var fgetyeur = nowt.getFullYear();
								var fgetmonth = nowt.getMonth() + 1;

								// 判断是否为2018
								if (getyeur < 2019) {
									this.clicsaix = false;
                                      this.refsh=false;
									  this.dataslength = true
									return false;
								}
								// 是否为当前月？
								if (getyeur == fgetyeur && getmonth == fgetmonth) {
									console.log(data.length);

									if (data.length == 20) {
										if (this.page == 1) {
											this.datastr = [{
												timey: getyeur,
												timem: getmonth,
												time: getyeur + "-" + getmonth,
												other: this.other,
												datas: data
											}]
										} else {
											this.datastr[0].datas = this.datastr[0].datas.concat(data);
										}
										this.clicsaix = false;
										this.auiScroll = true;
									} else {
										if (data.length > 0) {
											if (this.page == 1) {
												this.datastr = [{
													timey: getyeur,
													timem: getmonth,
													time: getyeur + "-" + getmonth,
													other: this.other,
													datas: data
												}];

											} else {
												this.datastr[0].datas = this.datastr[0].datas.concat(data);
											}

										}
										this.time_y = getyeur;
										this.time_m = getmonth;
										if (getmonth * 1 == 1) {
											getyeur = getyeur * 1 - 1;
											getmonth = 12;
										} else {
											getmonth = getmonth * 1 - 1;
										}
										if (getmonth < 10) {
											getmonth = "0" + getmonth;
										}

										var time = getyeur + "-" + getmonth;
										this.time_kz = false;
										this.time = time;
										this.page = 1;
										console.log(time);
										this.auiScroll = false;
										this.clicsaix = true;
										this.rendering_data(time);

									}

								} else {
									console.log(data.length);
									if (data.length == 20) {

										if (this.page == 1) {
											var datastr = {
												timey: getyeur,
												timem: getmonth,
												time: getyeur + "-" + getmonth,
												other: this.other,
												datas: data
											};
                                           if (this.refsh) {
                                      var timedata=[];
                                        timedata.push(datastr);
                                      this.datastr=timedata;
									  this.refsh=false;
                                    }else {
                                      this.datastr.push(datastr);
                                    }
											
										} else {
											for (let i = 0; i < this.datastr.length; i++) {
												if (this.datastr[i].timem == getmonth) {
													this.datastr[i].datas = this.datastr[i].datas.concat(data);
												}
											}
										}
										this.clicsaix = false;
										this.auiScroll = true;
									} else {
										if (data.length > 0) {
											if (this.page == 1) {
												var datastr = {
													timey: getyeur,
													timem: getmonth,
													other: this.other,
													time: getyeur + "-" + getmonth,
													datas: data
												};
												 if (this.refsh) {
												  var timedata=[];
												    timedata.push(datastr);
												  this.datastr=timedata;
												  this.refsh=false;
												}else {
												  this.datastr.push(datastr);
												}
											} else {
												for (let i = 0; i < this.datastr.length; i++) {
													if (this.datastr[i].timem == getmonth) {
														this.datastr[i].datas = this.datastr[i].datas.concat(data);
													}
												}
											}

										}
										if (getyeur == fgetyeur) {
											if (1 * getmonth > 1 * fgetmonth) {
												this.auiScroll = true;
												this.clicsaix = false;
												if (this.datastr.length < 1) {
													this.dataslength = true
												}
												return false;
											} else {
												var num = (1 * fgetmonth) - (1 * getmonth);

												if (num >= 1) {
													console.log(num);
													if (this.datastr.length > 0) {

													} else {
														this.auiScroll = true;
														var time = fgetyeur + "-" + fgetmonth;
														this.time_y = fgetyeur;
														this.time_m = fgetmonth;
														this.time1_kz = false;
														this.time1 = time;

														this.clicsaix = false;
														if (this.datastr.length < 1) {
															this.dataslength = true
														}
														return false;
													}

												}
											}

										}
										// 										if (getyeur == fgetyeur) {
										// 											var num = (1 * getmonth + 10) - (1 * getmonth + 10);
										// 											console.log(num);
										// 											if (num > 2) {
										// 												this.clicsaix = false;
										// 												return false;
										// 											}
										// 										} else {
										// 											if (getmonth * 1 == 1) {} else {
										// 												var num = (1 * fgetmonth + 10) - (1 * getmonth + 10);
										// 												console.log(num);
										// 												if (num > 2) {
										// 													this.clicsaix = false;
										// 													return false;
										// 												}
										// 											}
										// 
										// 										}
										if (getmonth * 1 == 1) {
											getyeur = getyeur - 1;
											getmonth = 12;
										} else {
											getmonth = getmonth * 1 - 1;

										}
										if (getmonth < 10) {
											getmonth = "0" + getmonth;
										}
										if (getyeur < 2019) {
											this.clicsaix = false;
											if (this.datastr.length < 1) {
												this.dataslength = true
											}
											return false;
										}

										var time = getyeur + "-" + getmonth;
										this.time_kz = false;
										this.time = time;
										console.log(time);
										this.auiScroll = false;
										this.page = 1;
										this.clicsaix = true;
										this.rendering_data(time);

									}

								}

								console.log(JSON.stringify(this.datastr));
							} else if (content.code == "201010") {
								Toast("账户已被锁定，请联系客服");
								setCookie('newData', '', '0-S');
								this.$router.push({
									name: 'login'
								})
							}
						} else if (res.data.status == 500) {
							this.clicsaix = false;
							this.auiScroll = true;
							if (this.page == 1) {
								this.dataslength = true
							}
							Toast('服务器异常，请稍后重试！')
						}
						// console.log(JSON.stringify(this.datastr) );

					})
					.catch(err => {
						console.log(err);
					})
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

	.isFixed {
		position: fixed;
		top: 5rem;
		z-index: 999;
	}

	.aui-refresh-content {
		top: 7.8rem;
	}

	.aui-pull-right {
		font-size: 0.7rem;
		padding-right: 0.8rem;
	}

	.content_str {
		/* padding-top: 7.05rem; */
		min-height: 80vh;
	}

	.mui-scroll-wrapper {
		top: 7.7rem;
		/* padding-bottom: 6rem; */
		background: rgba(239, 245, 251, 1);
	}

	.moto_vh {
		width: 100%;
		min-height: 20vh;
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



	.record_time {
		width: 100%;
		height: 2rem;
		text-align: center;
		font-size: 0px;
		letter-spacing: -4px;
		z-index: 1;
		position: fixed;
		top: 2.25rem;
		left: 0;
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
		height: 2.75rem;
		text-align: center;
		display: flex;
		padding: 0 3%;

		position: fixed;
		top: 2.25rem;
		left: 0;
		background-color: #fff;
		z-index: 20;
	}

	.record_titel div {
		flex: 1;
		margin: 0 auto;
		height: 2.8rem;
		line-height: 2.8rem;
		font-size: 0.8rem;
		color: rgba(109, 109, 109, 1);
		margin: 0 3%;
	}



	.record_titel .active {
		border-bottom: #03A9F4 3px solid;
		color: rgba(3, 169, 244, 1);
		font-weight: bold;
		font-weight: 500;
	}

	.time_tlel {
		position: fixed;
		top: 5rem;
		left: 0;
		width: 100%;
		height: 2.7rem;
		background-color: rgba(239, 245, 251, 1);
		z-index: 30;

	}

	.time_tlel .time_tlel_l {
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

	.time_tlel .time_tlel_r {
		width: 50%;
		float: right;
		margin-top: 0.5rem;
		margin-right: 0.75rem;
		border-radius: 0.8rem;

		text-align: right;
	}

	.time_tlel .time_tlel_r p {
		font-size: 0.55rem;
		color: #929598;
	}

	.time_tlel .time_tlel_l img {
		display: inline-block;
		width: 0.4rem;
	}

	.auitime_list {

		width: 100%;
		height: 2.7rem;
		background-color: rgba(239, 245, 251, 1);
		position: relative;
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
		margin-top: 0.5rem;
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

	/*全部投注*/

	.record_all_bets {
		width: 100%;
		height: auto;
		background: #fff;


	}

	.record_all_bets li {
		width: 100%;
		height: 2.75rem;
		display: flex;

		padding-top: 0.5rem;

		position: relative;
	}

	.all_bets_left {
		width: 20%;
		display: flex;
	}

	.all_bets_left img {
		height: 1.85rem;
		margin: 0 auto;
	}

	.all_bets_in {
		width: 80%;
		height: auto;

	}

	.all_bets_in p:first-child {
		width: 100%;
		color: #4A4A4A;
		height: 1.05rem;
		font-size: 0.75rem;
		font-weight: 500;
		color: rgba(54, 54, 54, 1);
		line-height: 1.05rem;
	}

	.all_bets_in p:last-child {
		width: 100%;
		height: auto;
		color: #B6B6B6;
		font-size: 0.5rem;
		font-weight: 500;
		line-height: 0.75rem;
		padding-bottom: 0.4rem;
		border-bottom: 0.05rem #EAEDEF solid;
	}

	.all_bets_right {
		width: 40%;
		text-align: right;

		position: absolute;
		right: 0.75rem;
		top: 0;
	}




	.all_bets_right p {
		width: 100%;
		text-align: right;
		line-height: 1.05rem;
		padding-top: 0.45rem;
	}

	.all_bets_right div {
		font-size: 0.55rem;
		color: #6D6D6D;
	}


	/*状态显示颜色*/

	.all_bets_right .yellow {
		font-size: 0.75rem;
		font-weight: 500;
		color: #525252;
	}

	.all_bets_right .red {
		font-size: 0.75rem;
		color: #F84F15;
	}

	.mothlabel {

		width: 30%;
		height: 2rem;
		position: absolute;
		top: 0;
		left: 0;
	}

	.mothinput {
		opacity: 0;
		width: 5%;
		height: 2rem;
		position: absolute;
		top: 0;
		left: 0;
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
		width: 30%;
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

	.show_list {
		width: 100%;
		height: auto;
		position: fixed;
		bottom: -12rem;
		left: 0;
		z-index: 999;
		display: flex;
		flex-wrap: wrap;
		background: #FFFFFF;


	}

	.show_list p:first-child {
		width: 100%;
		line-height: 2rem;
		text-align: center;
		border-bottom: 1px #E1E6EB solid;
		margin: 0 2.2%;
		margin-bottom: 0.6rem;
	}

	.caiborder {
		width: 30%;
		margin: 1.5% 0;
		text-align: center;
		height: 2.2rem;
		box-sizing: border-box;
		line-height: 2.2rem;
		z-index: 2;
		font-size: 0.65rem;
		background: rgba(245, 250, 255, 1);
		margin-left: 2.46%;
	}

	.show_list .active {
		background: rgba(228, 88, 105, 1);
		color: #FFFFFF;
	}

	.show_list p:last-child {
		width: 100%;
		line-height: 2rem;
		text-align: center;
		background: #EBEBEB;
		color: #4A4A4A;
		margin-top: 0.6rem;
	}

	.caiborder:active {
		background: rgba(228, 88, 105, 1);
		color: #fff;
	}

	.swiperdeta_tr {
		position: fixed;
		left: 0;
		bottom: -15rem;

		background: #f4f4f4;
		width: 100%;
		z-index: 99;
	}

	.swiperdeta_con {
		padding-top: 1rem;
		background: #f4f4f4;
		width: 100%;
		display: flex;
		padding-bottom: 1rem;
	}

	.swiperdeta_con_l {
		width: 50%;


		text-align: center;
	}

	.swiperdeta_con_r {
		width: 50%;


		text-align: center;
	}

	.swiperdeta1 {
		height: 8rem;
		line-height: 2.5rem;

	}

	.swiperdeta2 .swiper-slide-active,
	.swiperdeta1 .swiper-slide-active {
		font-weight: 400 !important;
		font-size: 1rem;
	}

	.swiperdeta2 {
		height: 8rem;
		line-height: 2.5rem;

	}

	.lint_list {
		width: 100%;

		line-height: 2rem;
		text-align: center;
	}

	.btn_top {
		width: 100%;
		line-height: 2rem;

		background: #03A9F4;
		text-align: center;
		display: flex;

	}

	.btn_top p {
		width: 50%;
		color: #ffffff;
	}

	.time_mc {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		z-index: 98;
		background: rgba(0, 0, 0, .5);
	}
</style>
