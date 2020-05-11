<template>
	<div id='hemai2'>
		<section class="mintscrll">
			<mt-loadmore @top-status-change="handleTopChange" :top-method="loadTop" :bottom-method="loadBottom"
			 :bottom-all-loaded="allLoaded" :autoFill='false' @bottom-status-change='handleBottomChange' ref="loadmore">
				<div slot="top" class="mint-loadmore-top">
					<span class="shaxinc" v-show="topStatus !== 'loading'"><img src="../../../assets/shuaxin/logo3.png" /></span>
					<span class="shaxinc" v-show="topStatus === 'loading'">
						<div class="almosh"><img src="../../../assets/shuaxin/xuanzhuan80.png" /></div>
					</span>
				</div>
				<div slot="bottom" class="mint-loadmore-bottom">
					<span class="shaxinc" v-show="bottomStatus === 'pull'"><img src="../../../assets/shuaxin/pagex.png" /></span>
					<span class="shaxinc" v-show="bottomStatus === 'loading'">
						<div class="almosh"><img src="../../../assets/shuaxin/pagez.png" /></div>
					</span>
					<span class="shaxinc" v-show="bottomStatus === 'drop'"><img src="../../../assets/shuaxin/pages.png" /></span>
				</div>
		<ul class="wrapper" id="wrapper" style="min-height: 1px;" >
			<li class="content" v-for="(item,index) in progress_data" :key='index' :id="item.schemeId" :type="item.lotteryType" tapmode
			 @click='hemai_details(item.lotteryType,item.schemeId)'>
				<div class="left">
					<span class="name">{{item.lotteryType_text}}</span>
					<div class="circle">
						<canvas :id="'circle'+index" width="240" height="240" style="width: 120px;height: 120px;"></canvas>
<!-- 						<div class="circle-text">
							<span class="blue">购{{(item.progressRate).toFixed(2)}}%</span>
							<span v-show="item.baodiCost" class="red">保{{(item.baodiCost/item.schemeCost*100).toFixed(2)}}%</span>
						</div> -->
					</div>
				</div>
				<div class="right">
					<div class="header">
						<span class="phone ">{{(item.sponsorName).replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')}}</span>
						<span class="end_time">{{item.endedTime|getTime(1)}} </span> <span class="end_time_end">截止</span>
					</div>
					<ul class="bottom ">
						<li class="items aui-col-xs-4">
							<span class="first">总金额</span>
							<span class="second">{{item.schemeCost}}元</span>
						</li>
						<li class="items aui-col-xs-4">
							<span class="first">参与人数</span>
							<span class="second">{{item.subscribedNumber}}人</span>
						</li>
						<li class="items aui-col-xs-4">
							<span class="first">剩余</span>
							<span class="second">{{item.schemeCost-item.subscribedCost}}元</span>
						</li>
					</ul>
				</div>
				<a class=" aui-pull-right" tapmode>
					<span class="aui-iconfont aui-icon-right icon_right"></span>
				</a>
				{{circles(index,item)}}
			</li>

		</ul>
		<div v-if='nopyan&&progress_data.length==0' class="londNull"><img src="../../../assets/queshengb.png">
			<p>暂无数据</p>
			<!-- <p>还没有该彩种合买，快去发起一单吧！</p> -->
		</div>
		<!-- <lini-page v-if='nopyan&&progress_data.length==0' :bg='"true"'  :prompt='"还没有该彩种合买，快去发起一单吧！"' :zheight='"auto"' :zwidth='"100%"'  :tpyes="'record'"></lini-page> -->
		</mt-loadmore>
		</section>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
   // import { getSession } from '../../../../static/js/common.js';
   	import {
   	getSession,
   	TypeCapitalconversionLowercase
   } from "../../../js/common";
// 	let change_sort; //监听到的排序正反
// 	let sort = 'asc'; //默认排序
	let page_num = 1; //默认第几页
	let rows = 7;
	export default {
		data() {
			return {
				nopyan:false,
				progress_data: [],
				sort:'asc',
				newprogress_data:[],
				topStatus: '',
				allLoaded: false,
				bottomStatus: '',
			};
		},
		created() {
			let sort=this.$route.query.paixu;
			this.sort=sort;
			page_num=1
			this.requestData(sort);
		},
		methods: {
			loadTop() {
				page_num=1;
				let sort=this.sort;
				this.requestData(sort);
				setTimeout(() => {
					this.$refs.loadmore.onTopLoaded();
				}, 2000)
			},
			handleTopChange(status) {
				this.topStatus = status;
			},
			loadBottom() {
				if(this.newprogress_data.length==0){
					 Toast('没有更多数据！');
					 this.$refs.loadmore.onBottomLoaded();
					return
				}
				page_num++
				let sort=this.sort;
				this.requestData(sort);
				setTimeout(() => {
					this.$refs.loadmore.onBottomLoaded();
				}, 2000)
			},
			handleBottomChange(status) {
				// console.log(status)
				this.bottomStatus = status;
			},
			//cavas进度条
			circles: function(index, item) {
				this.$nextTick(function() {
					var pRate = 360 * (item.progressRate / 100) - 90
					if (item.baodiCost&&item.baodiCost > 0) {
						var bCost = 360 * ((item.baodiCost / item.schemeCost).toFixed(2)) + pRate
					} else {
						var bCost = pRate
						item.baodiCost = 0
					}
					var text1 = '购' + item.progressRate.toFixed(2) + '%';
					var text2 = '保' + (item.baodiCost/item.schemeCost*100).toFixed(2) + '%';
					var innWidth = parseInt((document.documentElement.clientWidth / 100) * 42);
					var sttWidth = innWidth / 2;
					
					var canvas = document.getElementById('circle' + index);
					var ctx = canvas.getContext('2d');
					var deg = Math.PI / 180;
					ctx.fillStyle = "#5FA3EB";
					ctx.sector(sttWidth, sttWidth, sttWidth, -90 * deg, pRate * deg).fill();
					ctx.fillStyle = "#E8E8DF";
					ctx.sector(sttWidth, sttWidth, sttWidth, bCost * deg, 270 * deg).fill();
					ctx.fillStyle = "#E45869";
					ctx.sector(sttWidth, sttWidth, sttWidth, pRate * deg, bCost * deg).fill();
					ctx.fillStyle = "#FFFFFF";
					ctx.sector(sttWidth, sttWidth, sttWidth-10, 0, 2*Math.PI).fill();
					ctx.font="20px Arial";
					ctx.fillStyle = "#5FA3EB";
					var tWidth1 = sttWidth - (ctx.measureText(text1).width/2);
					ctx.fillText(text1,tWidth1,sttWidth-12);
					ctx.font="20px Arial";
					ctx.fillStyle = "#E45869";
					var tWidth2 = sttWidth - (ctx.measureText(text2).width/2);
					ctx.fillText(text2,tWidth2,sttWidth+20);

				});
			},
			hemai_details:function(key, id){
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
					case 'fc3d':
						path = "1";
						break;
					case "welfare3d":
						path = "1";
						break;
					case "seven":
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
			},
			requestData: function(sort) { //加载数据的方法
				console.log(page_num);
				// console.log(progressRate);
				if(getSession('selected')&&getSession('selected').length>0){
					rows=99999999;
				}
				console.log(sort);
				let data = [];
				data['page'] = page_num;
				data['rows'] = rows;
				data['lotteryName'] = '';
				data['iszhuiq'] = false;
				data['sort'] = 'createTime';
				data['order'] = sort;
				console.log(data);
				let dataes = this.Qs.stringify({
					path: 'cooperation',
					data
				}, {
					allowDots: true
				});
				console.log(dataes);
				this.$ajax.post('/caipiaoshouye/index.php/home/index/hmlist', dataes)
					.then(ret => {
						if (ret.status == 200) {
							// console.log(JSON.stringify(ret));
							var data = JSON.parse(ret.data.content);
							// console.log(JSON.stringify(data));
							if (data) {
								var progress_data = data.data.content;
								// console.log(JSON.stringify(progress_data));
								var selected=getSession('selected');
								console.log(JSON.stringify(selected));
								if (selected) {
									var new_data = [];

									for (var i = 0; i < selected.length; i++) {
										var item = selected[i];
										for (var j = 0; j < progress_data.length; j++) {
											if (progress_data[j].lotteryType_text == item) {
												new_data.push(progress_data[j]);
											}
										}
									}
									progress_data = new_data;
								}
								this.newprogress_data=progress_data;
								
								if(page_num==1){
									this.progress_data =progress_data;
									if(this.progress_data.length<1){
										this.nopyan=true;
									}
								}else{
									this.progress_data =this.progress_data.concat(progress_data) ;
								}

								if (progress_data.length > 0) {
									var button = document.querySelector('.button');
									button.style.marginTop = "1rem";
								}

							}

							if (!data || progress_data.length == 0) {
								// Toast('还没有该彩种合买，快去发起一单吧！');
							}
							progress_data = null;
						}
					})
					.catch(err => {
						this.nopyan=true;
						console.log(err);
					})
			}

		},
		filters: {
			getTime: function(matchDate, num) {
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
				if (num == 1) { //月日时分
					return m + "-" + d + " " + h + ":" + mm;
				} else if (num == 2) { //年月日时分秒
					return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
				} else if (num == 3) {
					return h + ":" + mm;
				} else if (num == 4) {
					return y + "-" + m + "-" + d + " " + h + ":" + mm;
				}
			},
		}
	}
	CanvasRenderingContext2D.prototype.sector = function(x, y, radius, sDeg, eDeg) {
		// 初始保存
		this.save();
		// 位移到目标点
		this.translate(x, y);
		this.beginPath();
		// 画出圆弧
		this.arc(0, 0, radius, sDeg, eDeg);
		// 再次保存以备旋转
		this.save();
		// 旋转至起始角度
		this.rotate(eDeg);
		// 移动到终点，准备连接终点与圆心
		this.moveTo(radius, 0);
		// 连接到圆心
		this.lineTo(0, 0);
		// 还原
		this.restore();
		// 旋转至起点角度
		this.rotate(sDeg);
		// 从圆心连接到起点
		this.lineTo(radius, 0);
		this.closePath();
		// 还原到最初保存的状态
		this.restore();
		return this;
	}
</script>

<style scoped>
	html {
		background: rgb(242, 242, 242);
	}

#hemai2{
	background: rgb(242, 242, 242);
}
.mint-loadmore-top {
		z-index: -99;
	}
	.content {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 1% 3%;
		margin-bottom: 0.5rem;
		background-color: #fff;

	}
.londNull {
		width: 100%;
		/* height: 100vh; */
		box-sizing: border-box;
		padding-top: 4rem;
	}
	.londNull img {
		width: 7.5rem;
		height: 7.5rem;
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
	/*.content:last-child{
        margin-bottom: 1.5rem;
      }*/
	.left {
		width: 26%;
		display: flex;
		flex-direction: column;
		align-items: center;

	}

	.name {
		width: auto;
		padding: 0 0.3rem;
		border: 1px solid #e3e3e3;
		margin-bottom: 0.2rem;
		color: #999;
		text-align: center;
		margin-top: 0.2rem;
	}

	.left .circle {
		position: relative;
		width: 4.1rem;
		height: 4.1rem;
	}
	@media screen and (min-width:320px) {

		.left .circle-text {
			position: absolute;
			top: 0.2rem;
			left: 0.2rem;
			width: 3.38rem;
			height: 3.38rem;
			border-radius: 50%;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}

	}

	@media screen and (min-width:410px) {

		.left .circle-text {
			position: absolute;
			top: 0.37rem;
			left: 0.375rem;
			width: 3.15rem;
			height: 3.15rem;
			border-radius: 50%;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}

	}

	.blue,
	.red {
		font-size: 0.6rem;
		display: block;
	}

	.blue {
		color: blue;
		margin-bottom: 0.1rem;
	}

	.red {
		color: red;
	}

	.right {
		width: 65%;
		color: #333;
	}

	.header {
		padding-left: 0.5rem;
		padding-bottom: 0.5rem;
		border-bottom: 2px dotted #f2f2f2;
		margin-top: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.phone {
		color: #E45869;
		font-weight: bold;
		margin-right: 1.5rem;
	}

	.end_time {
		font-size: 0.6rem;
		color: #4A4A4A;
	}

	.end_time_end {
		font-size: 0.6rem;
		color: #9B9B9B;
		margin-right: 0.5rem;
	}

	.bottom {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 1rem;
	}

	.items {
		display: flex;
		flex-direction: column;
		align-items: center;

	}

	.first {
		color: #999;
		font-size: 0.6rem;
	}

	.second {
		font-size: 0.6rem;
		color: #333;
		font-weight: bold;
	}

	.icon_right {
		color: #999;
		font-size: 0.6rem;
	}

	.button {
		/*position: fixed;
        bottom: 0;
        left: 0;*/
		width: 90%;
		margin-left: 5%;
		border-radius: 0.4rem;
		color: #fff;
		height: 2rem;
		background-color: rgb(228, 88, 105);
		outline: 0px;
		-webkit-appearance: none;
		margin-top: 10rem;
		margin-bottom: 0.5rem;
		z-index: 100;
	}

	.data_no {
		position: fixed;
		top: 50%;
		width: 100%;
		text-align: center;
		color: white;
	}

	.data_no span {
		background-color: rgba(0, 0, 0, 0.5);
	}

	.hide {
		display: none;
	}

	.layer {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 999;
		display: none;
		background-color: rgb(242, 242, 242);

	}

	.mask {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 10;
	}

	/*.empty {
        height: 13%;
        width: 100%;
        background-color: white;
        margin-bottom: 1rem;
      }*/
	.contain {
		position: fixed;
		top: 20%;
		left: 0;
		width: 100%;
		bottom: 30%;
		z-index: 100;
		padding: 0 2%;
		background-color: rgb(242, 242, 242);
		padding-top: 1rem;
	}

	.item {
		width: 30%;
		position: relative;
		float: left;
		text-align: center;
		height: 1.5rem;
		line-height: 1.5rem;
		font-size: 0.6rem;
		background-color: white;
		margin-bottom: 0.5rem;
		margin-right: 0.8rem;
	}

	.item:nth-child(3n+3) {
		margin-right: 0;
	}
</style>
