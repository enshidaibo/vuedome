<template>
	<div class="bodybg">
		<nav-bar title="好友充值"></nav-bar>
		<section class="aui-refresh-content">
			<div class="aui-content">
				<div class="topUpBox">
					<div class="topUpTotalBox">
						<div class="topUpTextup">好友充值赠送收益(元)</div>
						<div class="topUpTextdown">{{(1*directRechargeBonus+1*indirectRechargeBonus).toFixed(2)}}</div>
					</div>
					<div class="topUpGivingBox">
						<div class="givingBox directlyGiving">
							<div class="directlyTextup">直接好友赠送</div>
							<div class="directlyTextdown">{{(1*directRechargeBonus).toFixed(2)}}</div>
						</div>
						<div class="givingBox">
							<div class="directlyTextup">间接好友赠送</div>
							<div class="directlyTextdown">{{(1*indirectRechargeBonus).toFixed(2)}}</div>
						</div>
					</div>
				</div>
				<!-- <div class="topUpBox bgbutong">
					<div class="topUpTotalBox">
						<div class="topUpTextup">好友累计充值888元奖励收益(元)</div>
						<div class="topUpTextdown">{{(1*directRechargeBonusSum+1*indirectRechargeBonusSum).toFixed(2)}}</div>
					</div>
					<div class="topUpGivingBox">
						<div class="givingBox directlyGiving">
							<div class="directlyTextup">直接好友奖励</div>
							<div class="directlyTextdown">{{(1*directRechargeBonusSum).toFixed(2)}}</div>
						</div>
						<div class="givingBox">
							<div class="directlyTextup">间接好友奖励</div>
							<div class="directlyTextdown">{{(1*indirectRechargeBonusSum).toFixed(2)}}</div>
						</div>
					</div>
				</div> -->
				<ul class="ulBox">
					<li class="liTitle">
						<div @click="choseType()">好友类型

							<ul class="choseUl" v-if="choseBox">
								<li @click.stop="choseTypeAll()">全部</li>
								<li @click.stop="choseTypeZhi()">直接好友</li>
								<li @click.stop="choseTypeJian()">间接好友</li>
							</ul>

						</div>
						<div>好友账户</div>
						<div>充值收益</div>
					</li>
					<!-- <div v-if="dataslength" class="londNull"><img src="../../assets/userinfo/yiyiyi.png">
						<p>还没有记录…</p>
					</div> -->
					<lini-page v-if="dataslength"  :prompt='"暂无数据"' :zheight='"55vh"' :zwidth='"100%"'  :tpyes="'record'"></lini-page>
					<li v-for="(item,index) in datalist" :key='index'>
						<div>{{item.remark}}</div>
						<div>{{item.userName|mobileHide(3,4)}}</div>
						<div>{{item.money}}</div>
					</li>
				</ul>
				<no-more v-show='nomore' ></no-more>
			</div>
		</section>
	</div>
</template>

<script>
		import {
           Toast
		} from 'mint-ui';

	import {
		getCookie,
// 		setCookie,
// 		TypeCapitalconversionLowercase,
		OverallData
	} from '../../js/common.js'
	export default {
		data() {
			return {
				nomore:false,
				choseBox: false, //筛选框
				"indirectRechargeBonusSum": 0, //间接好友充值累计
				"directRechargeBonus": 0, //直接好友充值获得奖金
				"indirectRechargeBonus": 0, //间接好友充值获得奖金
				"directRechargeBonusSum": 0, //直接好友充值累计
				datalist: [], //列表
				auiScroll:true,
				page:1,
				type:3,
				dataslength:true//缺省页
			}
		},
		// 		beforeCreate() {
		// 			document.querySelector('html').setAttribute('style', 'background-color:#F3F8FD;')
		// 		},
		//销毁前清除
		beforeDestroy() {
			this.$ajax.defaults.timeout  = 50000;
			document.querySelector('html').removeAttribute('style');
				 this.auiScroll=false;//取消上拉监听
		},

		created() {
			document.querySelector('html').setAttribute('style', 'background-color:#F3F8FD;');
			this.getMoney();
			this.getDataList(1, 3)
		},
		mounted() {
			var that = this;
			var pullToRefresh = new auiPullToRefresh({ //下拉刷新
				container: document.querySelector('.aui-refresh-content'), //下拉容器
				triggerDistance: 80 //下拉高度
			}, function(ret) {
				if (ret.status == "success") {
					that.auiScroll=true;
					that.page=1;
					that.$ajax.defaults.timeout  =  49527;//49527这个值控制没有showLonding
					that.getMoney();
					that.getDataList(that.page, that.type)
					setTimeout(() => {
						that.$ajax.defaults.timeout  = 50000;
						pullToRefresh.cancelLoading(); //刷新成功后调用此方法隐藏
					}, 1500)
				}
			});
			var scroll = new auiScroll({//上拉加载
				listen: false, //是否监听滚动高度，开启后将实时返回滚动高度
				distance: 200 //判断到达底部的距离，isToBottom为true
			}, function(ret) {
				if(ret.isToBottom==true&&that.auiScroll&&!that.nomore){
					that.auiScroll=false;
					that.page++;
					that.getDataList(that.page,that.type)
				}
			});
		},
		methods: {
			choseTypeAll: function() { //选取全部
				this.choseBox = false;
				this.type=3;
				this.page=1;
				this.auiScroll=true;
				this.getDataList(this.page, this.type)
			},
			choseTypeZhi: function() { //选取直接
				this.choseBox = false;
				this.type=1;
				this.page=1;
				this.auiScroll=true;
				this.getDataList(this.page, this.type)
			},
			choseTypeJian: function() { //选取间接
				this.choseBox = false;
				this.type=2;
				this.page=1;
				this.auiScroll=true;
				this.getDataList(this.page,this.type)
			},
			choseType: function() { //打开选取框
				this.choseBox = !this.choseBox;
			},
			getMoney: function() { //获取顶部信息
				var data = [];
				data["mid"] = OverallData().mid;
				data["uid"] = getCookie('newData').userid; ////getCookie('newData').userid
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/friendRecharge',
						datas
					)
					.then(res => {
						console.log(res.data);
						if (res.data.content.code == 1000) {
							
							this.directRechargeBonus = parseFloat(res.data.content.data.directRechargeBonus); //直接好友充值获得奖金
							this.directRechargeBonusSum = parseFloat(res.data.content.data.directRechargeBonusSum); //直接好友充值获得奖金累计
							this.indirectRechargeBonus = parseFloat(res.data.content.data.indirectRechargeBonus); //间接好友充值获得奖金
							this.indirectRechargeBonusSum = parseFloat(res.data.content.data.indirectRechargeBonusSum); //间接好友充值累计
						}

					})
					.catch(err => {
						console.log(err);
					})
			},
			getDataList: function(page, type) { //获取列表
			this.nomore=false;
				var data = [];
				data["uid"] =getCookie('newData').userid; //getCookie('newData').userid
				data["page"] = page;
				data["mid"] = OverallData().mid;
				data["userType"] = type;
				data["limit"] = 10;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getLotteryTopUpBenefitList',
						datas
					)
					.then(res => {
						console.log(res.data);
						if (res.data.content.code == 1000) {
							
							var contents=res.data.content.data.congz;
							if(contents.length>0){
								if(page==1){
									this.datalist = contents; //赋值
									this.dataslength=false;
								}else{
									this.datalist=this.datalist.concat(contents);
									this.auiScroll=true;
									this.dataslength=false;
								}
							}else{
								if(page == 1){
									this.dataslength=true;
									this.datalist=[];
								}
								if(this.datalist.length>0){
									this.nomore=true;
								}
							}
							
							
						}

					})
					.catch(err => {
						this.auiScroll=true;
						if(page == 1){
							this.dataslength=true
						}
						console.log(err);
					})
			}
		},
		filters: {
			mobileHide: function(str, start, num) { //手机加*****
				let st = "";
				for (let i = 0; i < num; i++) {
					st += "*";
				}
				var end = 11 - parseInt(start) - parseInt(num);

            return str.substr(0, start) + st + str.substr(-end);
			}
		}

	}
</script>

<style scoped>
	.bodybg {
		background-color: #F3F8FD;
	}
.aui-content{
         min-height: 90vh;}
	.topUpBox {
		width: 94%;
		height: 7.25rem;
		background-image: url('../../../static/task/fczbgl.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-color: #F3F8FD;
		/* border-radius: .5rem; */
		margin: 0 auto;
		margin-top: .825rem;
		/* display:-webkit-flex;
		display:flex; */
	}

	.bgbutong {
		background-image: url('../../../static/task/fczbgh.png');
		margin-top: 0.825rem;
	}

	.topUpTotalBox {
		width: 100%;
		height: 3.625rem;
		border-bottom: 1px solid #E9E9E9;
	}

	.topUpTextup {
		width: 100%;
		padding-left: 0.775rem;
		font-size: 0.6rem;
		color: #FFFFFF;
		padding-top: 0.625rem;
	}

	.topUpTextdown {
		width: 100%;
		padding-left: 0.775rem;
		font-size: 1.2rem;
		color: #FFFFFF;
		font-weight: 600;
		padding-top: 0.1rem;
	}

	.topUpGivingBox {
		width: 100%;
		height: 3.625rem;
		display: -webkit-flex;
		display: flex;
	}

	.givingBox {
		width: 50%;
		height: 3.625rem;
	}

	.directlyGiving {
		border-right: 1px solid #E9E9E9;
	}

	.directlyTextup {
		padding-top: 0.925rem;
		padding-left: 0.775rem;
		font-size: 0.65rem;
		color: #FFFFFF;
	}

	.directlyTextdown {
		padding-top: 0.1rem;
		padding-left: 0.775rem;
		font-size: 0.85rem;
		color: #FFFFFF;
	}

	.ulBox {
		width: 94%;
		margin: 0 auto;
		background-color: #fff;
		margin-top: 0.8rem;
	}

	.ulBox li {
		display: -webkit-flex;
		display: flex;
		border-bottom: 1px solid #F3F8FD;
		height: 2.5rem;
		line-height: 2.5rem;
	}

	.ulBox li.liTitle {
		height: 2.25rem;
		line-height: 2.25rem;
	}

	.ulBox li.liTitle div {
		font-size: 0.65rem;
		color: #333;
		font-weight: 600;
	}

	.ulBox li div {
		text-align: center;
		font-size: 0.7rem;
	}

	.ulBox li div:nth-child(1) {
		width: 35%;
	}

	.ulBox li div:nth-child(2) {
		width: 35%;
	}

	.ulBox li div:nth-child(3) {
		width: 40%;
		color: #FF5757;
	}

	.ulBox li.liTitle div:nth-child(3) {
		color: #333;
	}

	.ulBox li.liTitle div:nth-child(1) {
		background-image: url('../../../static/task/downIcon.png');
		background-repeat: no-repeat;
		background-size: 0.35rem 0.25rem;
		background-position: 4.3rem 1rem;
		position: relative;
	}

	ul.choseUl {
		width: 5.225rem;
		height: 6.25rem;
		display: block;
		background-image: url('../../../static/task/tanchuangbga.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		position: absolute;
		left: 3.5rem;
		top: 1.5rem;
	}

	ul.choseUl li {
		width: 100%;
		height: 2rem;
		line-height: 2rem;
		display: block;
		font-size: 0.65rem;
		font-weight: 500;
		text-align: center;
		color: #FFFFFF;
		border-bottom: 1px solid #82D1FF;
	}

	ul.choseUl li:nth-child(1) {
		margin-top: 0.25rem;
	}

	ul.choseUl li:nth-child(3) {
		border-bottom: none;
	}
		.londNull {
		width: 100%;
		height: 55vh;
		box-sizing: border-box;
		padding-top: 2rem;
	}
	
	.londNull img {
		width: 64%;
		height: auto;
		margin: auto;
	}
	
	.londNull p {
		width: 100%;
		height: auto;
		margin-top: 1rem;
		text-align: center;
		font-size: 0.7rem;
		color: #62A1BE;
		line-height: 1rem;
	}
	.aui-refresh-content{
		top:2.2rem
		}
</style>
