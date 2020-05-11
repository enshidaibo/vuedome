<template>
	<div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="bake()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">
				充值记录
			</div>
			<div id="record_text" class="aui-pull-right" @click="gore()">
				<img src="../../assets/userinfo/record_help.png" alt="">
			</div>
		</header>
		<!-- <div id="record_time" class=" record_time">
            <div v-for="(d,index) in tabtime" class="btn_record_time " :class="{'active':d.state}" @click="tabtimeon(index)">{{d.name}}</div>
        </div> -->
		<div class="record_titel" id="record_titel">
			<div v-for="(d,index) in tab_noto" class=" tapmode " :class="{'active':d.state}" @click="tab_notoli(index)">{{d.neme}}</div>

		</div>
		<div>
			<div class="time_tlel">
				<div class="time_tlel_l" @click="time_show(time_y,time_m)">
					{{time_y}}年{{time_m}}月<img src="../../assets/userinfo/retope5.png" />
					<input class="mothinput" id="input1" v-model="time1" type="month" />
				</div>
				<!-- <div class="time_tlel_r">
					<p>充值总额¥900.00元</p>
				</div> -->
			</div>
		</div>
		<section class="aui-refresh-content" id="aui-refreshdr">
			<div class="aui-content">
				<div v-if="content.length>0">
				    <ul v-for='item in content' class="main">
				    	<li>
							<div class="mainImg">
								<img src="../../../static/information/recharge.png" alt="" class="Img1">
							</div>
							<div class="content">
								<div class="contentL">
									<p class="p1">+{{numberFormat(item.amount)}}</p>
									<p class="p2">充值金额</p>
								</div>
								<div class="contentR">
									<p class="p1" :class="'active'+num">{{title}}</p>
									<P class="p2">{{GetTimeStrfromnum((item.createTime)*1,2)}}</P>
								</div>
							</div>
						</li>
				    </ul>
					<no-more v-show="flag" ></no-more>
				</div>
				<div v-else>
					<!-- <div  class="londNull"><img src="../../assets/userinfo/yiyiyi.png">
						<p>还没有账户明细…</p>
					</div> -->
					<lini-page :prompt='"暂无数据"' :zheight='"100vh"' :zwidth='"100%"' :tpyes="'record'"></lini-page>
				</div>
			</div>
		</section>
		<!-- 时间弹窗 -->
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
				datas: [],
				datastr: [],
				time: [],
				time1: [],
				alert_text: true,
				dataslength: false,
				fundDetailType: '',
				time_y: '2019',
				time_m: '1',
				type: '',
				listcx: 0,
				time_kz: true,
				// 查询的天数
				day: 1,
				// 开始时间
				startTime: '',
				// 结束时间
				endTime: '',
				// 方案类型
				status: 'undisposed',
				// 页数
				page: 1,
				content:[],
				title:'处理中',
				flag:false,//没有更多数据了
				tab_noto: [{
						'id': 1,
						'state': true,
						'neme': '处理中'
					}, {
						'id': 2,
						'state': false,
						'neme': '成功'
					}, {
						'id': 3,
						'state': false,
						'neme': '失败'
					}, {
						'id': 4,
						'state': false,
						'neme': '交易关闭'
					}

				],
				num:1,
				sxtab_noto: [],
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
			time1: function() {
				if (this.time1_kz) {
					this.content = [];
					this.page = 1;
					this.auiScroll = false;
					this.dataslength=false;
					this.flag=false;
					this.rendering_data(this.time1);
				}


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
					that.content = [];
					that.dataslength=false;
					that.flag=false;
					that.rendering_data(that.time1);
					setTimeout(() => {
						pullToRefreshs.cancelLoading(); //刷新成功后调用此方法隐藏
					}, 1500)
				}
			});
			var scrolls = new auiScroll({ //上拉加载
				listen: false, //是否监听滚动高度，开启后将实时返回滚动高度
				distance: 200 //判断到达底部的距离，isToBottom为true
			}, function(ret) {
				console.log(that.auiScroll)
				if (ret.isToBottom == true && that.auiScroll&&that.content.length>0) {
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
						//跳转充值问题
			gore:function(){
				this.$router.push({
					name: 'userinfo_help_recharge'
				})
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
				details(document.getElementById('swiperdeta_tr'), bottomDomInitial)
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

			},
			clicmothtime1: function() {
				this.time1_kz = true;
			},
			clicmoth: function(index) {
				this.listcx = index;
			},

			// 显示弹窗
			numberFormat: function(number) {
				var data = Math.floor(number * 100) / 100;
				return data.toFixed(2);
			},
			bake: function() {
				this.$router.go(-1); //根据浏览器记录返回上一次
			},
			tab_notoli: function(index) {//切换状态
				if (this.clicsaix) {
					return false;
				}
				
				for (var n = 0; n < this.tab_noto.length; n++) {
					this.tab_noto[n].state = false;
				}//所有变灰
				this.tab_noto[index].state = true;//选中变蓝
				if (index == 0) {
					this.status = "undisposed";
					this.title ='处理中';
					this.type = "0";
					this.num=1;
				} else if (index == 1) {
					this.status = "successful";
					this.title='充值成功';
					this.num=2;
				} else if (index == 2) {
					this.status = "failure";
					this.title='充值失败';
					this.num=3;
				}
				 else if (index == 3) {
					this.status = "closed";
					this.title='交易关闭';
					this.num=4;
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
				this.content=[];
				this.dataslength=false;
				this.flag=false;
				this.auiScroll = false;
				this.page = 1;
				this.rendering_data(this.time);
			},
			Get0pad: function(num, n) {//变化月份，日期等，如果是1，2，3变成01，02，03
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
			// 调用渲染数据的方法
			rendering_data: function(time) {
				console.log(time)

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
				data["status"] = this.status;
				data["payway"] = '';//中国银联:UNIONPAY ,微信:WEIXIN
				data["page"] = this.page;
				data["row"] = "10";
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
				var thas=this;
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getIpsorderStatus',
						datas
					)
					.then(res => {
						console.log(res)
						var content = JSON.parse(res.data.content);
						console.log(content);
						this.time_kz = true;
						if (res.data.status == 200) {

							if (content.code == 100000) {
								var data = content.data.content;
								if(data.length>0){
									if(this.page==1){
										this.content=data
									}
									else{
										data.map(function(item){
											thas.content.push(item)
										})
									}
									this.auiScroll=true;
								}
								else{
									if(this.page==1){
										
									}
									else{
										this.flag=true;
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
							this.clicsaix = false;
							this.auiScroll = true;
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
	
	header img {
		width: 1.1rem;
		height: 1.1rem;
		margin-top: 0.55rem;
		margin-left: 0.5rem;
	}
	
	.aui-content {
		min-height: 90vh;
	}
	.isFixed {
		position: fixed;
		top: 5rem;
		z-index: 999;
	}

	.aui-refresh-content {
		top: 7.2rem;
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
		height: 2.25rem;
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
		flex:1;
		margin: 0 auto;
		height: 1.65rem;
		line-height: 1.65rem;
		font-size: 0.6rem;
		color: rgba(109, 109, 109, 1);
		box-sizing: border-box;
		margin: 0.3rem 3%;
		border-radius: 40px;
		background: #eceaea;
	}



	.record_titel .active {
		border: #03A9F4 1px solid;
		background:#fff ;
		color: #03A9F4;
		font-weight: bold;
		border-radius: 40px;
		box-sizing: border-box;
	}

	.time_tlel {
		position: fixed;
		top: 4.5rem;
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

	/*全部投注*/


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
		bottom: 0;
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
	
	.main .mainImg {
		width: 3.45rem;
		float: left;
	}
	
	.main .Img1 {
		margin: 0 auto;
		margin-top: 0.25rem;
		width: 1.85rem;
		height: 1.85rem;
	}
	
	.content {
		margin-left: 3.45rem;
		margin-top: 0.35rem;
		padding-right: 0.75rem;
		border-bottom: 1px solid #E5E5E5;
	}
	
	.contentL {
		margin-left: 0.325rem;
		display: inline-block;
		text-align: left;
		padding-bottom: 0.25rem;
	}
	
	.contentL .p1 {
		font-size: 0.75rem;
		color: #333;
		font-weight: 500;
		line-height: 1.1rem;
	}
	
	.contentL .p2 {
		font-size: 0.5rem;
		color: #666666;
		line-height: 1rem;
	}
	
	.contentR {
		float: right;
		text-align: right;
		padding-bottom: 0.25rem;
	}
	
	.contentR .p1 {
		font-size: 0.55rem;
		color: #03A9F4;
		line-height: 1.1rem;
	}
	
	.contentR .p2 {
		font-size: 0.55rem;
		color: #999999;
		line-height: 1rem;
	}

	.contentR .active2 {
		color: #999999;
	}
	
	.contentR .active3 {
		color: #F82A5B;
	}
	
	.contentR .active4 {
		color: #FE6324;
	}
</style>
