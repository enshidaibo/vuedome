<template>
	<div>
		<header class="aui-bar aui-bar-nav top_heder">
			<div class="aui-pull-left aui-btn" @click="bake()" tapmode>
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">提现记录</div>
		</header>
		<div class="record_titel" id="record_titel">
			<div v-for="(d,index) in tab_noto" class=" tapmode " :class="{'active':d.state}" @click="tab_notoli(index)">{{d.neme}}</div>
		</div>
		<div class="content">
			<section class="aui-refresh-content">
				<div class="aui-content">				
					<div class="listyear">
						<div class="auitime_list">
							<div class="time_tlel_l">
								{{time_y}}年{{time_m}}月<img src="../../assets/userinfo/hongbaoion10.png" />
								<label class="mothlabel" for="input_th"></label>
								<input class="mothinput" id="input_th" type="month" v-model="time" />
							</div>

							<!-- <div class="time_tlel_r">
								<p>累计充值 ¥{{numberFormat(other.incomeSum)}}元</p>				
							</div> -->

						</div>
						<div v-if="content">
							 <ul v-for='item in content' class="main">
								<li>
									<div class="mainImg">
										<img src="../../assets/recharge/withdrawal_record.png" alt="" class="Img1">
									</div>
									<div class="content">
										<div class="contentL">
											<p class="p1">+{{numberFormat(item.money)}}</p>
											<p class="p2">提现金额</p>
										</div>
										<div class="contentR">
											<p class="p1" id="pa1">{{item.state_text}}</p>
											<P class="p2">{{GetTimeStrfromnum((item.createTime)*1,2)}}</P>
										</div>
									</div>
								</li>
							</ul>
							<no-more v-show="flag" ></no-more>
						</div>
						
						<lini-page :tpyes="'record'" :prompt='"还没有提现记录..."' :zheight='"75vh"' :zwidth='"100%"' v-if="dataslength"></lini-page>

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
				time_y: '2019',//年份
				time_m: '1',//月份
				alert_text: true,
				dataslength: false,
				content:[],//内容
				status :"PASS",
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
				flag:false,
				auiScroll: true,
				tab_noto: [{
						'id': 1,
						'state': true,
						'neme': '审核中'
					}, {
						'id': 2,
						'state': false,
						'neme': '汇款中'
					}, {
						'id': 3,
						'state': false,
						'neme': '提款成功'
					}, {
						'id': 4,
						'state': false,
						'neme': '提款失败'
					}, {
						'id': 5,
						'state': false,
						'neme': '已通过'
					}, {
						'id': 6,
						'state': false,
						'neme': '未通过'
					}
				
				],
			}
		},
		filters: {

		},
		watch: {
			// 如果 `question` 发生改变，这个函数就会运行
			time: function() {
				this.content = [];
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
			// this.getRemainGoldByUid();
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
					// that.content = [];
					that.dataslength=false;
					that.flag=false;
					that.rendering_data(that.time);
					that.$ajax.defaults.timeout  =  49527;//49527这个值控制没有showLonding
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
					that.page++;
					that.rendering_data(that.time);
				}
			});

		},
		methods: {
			tab_notoli: function(index) {//切换状态
				if (this.clicsaix) {
					return false;
				}	
				for (var n = 0; n < this.tab_noto.length; n++) {
					this.tab_noto[n].state = false;
				}//所有变灰
				this.tab_noto[index].state = true;//选中变蓝
			
				if (index == 0) {
					this.status = "CHECKING";
					this.type = "0";
				} else if (index == 1) {
					this.status = "PASSCHECK";//成功
			
				} else if (index == 2) {
					this.status = "PASS";//失败
			
				} else if (index == 3) {
					this.status = "FAILCHECK";//成功
			
				} else if (index == 4) {
					this.status = "FIRSTPASSCHECK";//失败
			
				} else if (index == 5) {
					this.status = "FIRSTFAILCHECK";//成功
				}
				this.page=1;
				this.time='';
				this.content=[];
				this.dataslength=false;
				this.flag=false;
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
// 			tohongbaolist: function() {
// 				if (this.coinstc_true == false) {
// 					this.coinstc_true = true;
// 				} else {
// 					this.coinstc_true = false;
// 				}
// 
// 			},
			bake: function() {
				this.$router.go(-1);
			},
			rendering_data: function(time) {

				if (time == '') {
					var nowt = new Date();
					var getyeur = nowt.getFullYear();
					var getmonth = nowt.getMonth() + 1;
					var getday = new Date(getyeur, getmonth, 0).getDate();
					this.time_y = getyeur;
					this.time_m = getmonth;//月份
					if (getmonth < 10) {
						getmonth = "0" + getmonth;
					}
					this.time_m = getmonth;//月份
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
				console.log(this.startTime)
				console.log(typeof(this.startTime))
				var userId = uid.userid;
				var data = [];
				data["userId"] = userId;
				data["row"] = 10;
				data["page"] = this.page;
				data["status"] = this.status;
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
				var thas=this;
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getDrawingStatus',
						datas
					)
					.then(res => {
						console.log(res)
						var content = JSON.parse(res.data.content);
						console.log(content);
						if (res.data.status == 200) {
							if (content.code == 100000) {
								var data = content.data.content;
								if(data.length>0){
									this.dataslength=false;
									if(this.page==1){
										this.content=data
									}
									else{
										data.map(function(item){
											thas.content.push(item)
										})
									}
								}
								else{
									if(this.page==1){
										this.dataslength=true;
									}
									else {
										this.flag=true;
									}

								}
								console.log(this.content)
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

</script>

<style scoped>
	html{
		background: #F4F4F4;
	}
	
	.top_heder {
		background: #03a9f4;
	}
	
	header {
		position: fixed;
	}
	
	.aui-content {
		margin-top: 6.75rem;
		min-height: 90vh;
	}
	
		.record_titel {
		width: 100%;
		height: 4.5rem;
		text-align: center;
		display: flex;
		padding: 0 3%;
		position: fixed;
		top: 2.25rem;
		left: 0;
		background-color: #fff;
		z-index: 20;
		flex-wrap:wrap;
		margin-top: 0.1rem;
	}
	
	.record_titel div {
		width: 27%;
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

	.mui-scroll-wrapper {
		top: 2.05rem;
		padding-bottom: 3rem;
	}

	.listyear {
		width: 100%;
		position: relative;
		padding-top: 2.7rem;
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
		margin-top: 1rem;
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
	
	
	
	.listyear .content {
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
</style>
