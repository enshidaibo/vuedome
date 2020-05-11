<template>
	<div id='hemai1'>
		
		<!-- 进度排序 -->
		<section class=" aui-refresh-content">
			<!-- <mt-loadmore @top-status-change="handleTopChange" :top-method="loadTop" :bottom-method="loadBottom"
			 :bottom-all-loaded="allLoaded" :autoFill='false' @bottom-status-change='handleBottomChange' ref="loadmore"> -->
			 <div>
				
		<ul class="wrapper" id="wrapper" style="min-height: 1px;" >


			<li class="content" v-for="(item,index) in progress_data" :key='index' :id="item.schemeId" :type="item.lotteryType"
			  @click='hemai_details(item.lotteryType,item.schemeId)'>
		       <div class="left">
		         <!-- <span class="name">{{item.lotteryType_text}}</span> -->

		        <div class="circle">
						<canvas :id="'circle'+index" width="240" height="240" style="width: 100px;height: 100px;"></canvas>
		          <!-- <canvas :id="'circle'+index" width="100%" height="100%"></canvas> -->
		         <!--  <div class="circle-text">
		            <span class="blue">购{{(item.progressRate).toFixed(2)}}%</span>
		            <span v-show="item.baodiCost" class="red">保{{(item.baodiCost/item.schemeCost*100).toFixed(2)}}%</span>
		          </div> -->
		        </div>
		        <span class="end_time">{{item.endedTime|getTime(1)}} 截止</span>
		         <!-- <span class="end_time_end"></span> -->

		       </div>
		       <div class="right" >
		        <div class="header">
		          <span class="name">{{item.lotteryType_text}}</span>
		          <span class="phone "><span style="font-size:0.6rem;color:#818181;">发起人:</span>{{(item.sponsorName).replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')}}</span>
		          <!-- <span class="end_time">{{getTime(item.endedTime, 1)}} </span> <span class="end_time_end">截止</span> -->
		        </div>
		        <ul class="bottom ">
		          <li class="items aui-col-xs-4">
		            <span class="second">{{item.schemeCost}}元</span>
		            <span class="first">总金额</span>
		          </li>
		          <li class="items aui-col-xs-4" style="    align-items: center;">
		            <span class="second">{{item.subscribedNumber}}人</span>
		            <span class="first">参与人数</span>
		          </li>
		          <li class="items aui-col-xs-4" style="    align-items: flex-end;">
		            <span class="second">{{item.schemeCost-item.subscribedCost}}元</span>
		            <span class="first">剩余</span>
		          </li>
		        </ul>
		       </div>
		        <a class=" aui-pull-right" tapmode >
		            <span class="aui-iconfont aui-icon-right icon_right"></span>
		        </a>
		        {{circles(index,item)}}
		    </li>




			<!-- <li class="content" v-for="(item,index) in progress_data" :key='index' :id="item.schemeId" :type="item.lotteryType"
			  @click='hemai_details(item.lotteryType,item.schemeId)'>
				<div class="left">
					<span class="name">{{item.lotteryType_text}}</span>
					<div class="circle">
						<canvas :id="'circle'+index" width="240" height="240" style="width: 120px;height: 120px;"></canvas>
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
			</li> -->

		</ul>
		<div v-if='nopyan&&progress_data.length==0' class="londNull"><img src="../../../assets/queshengb.png">
			<p>暂无数据</p>
			<!-- <p>还没有合买订单...</p> -->
		</div>
		<!-- <lini-page v-if='nopyan&&progress_data.length==0' :bg='"true"' :prompt='"还没有该彩种合买，快去发起一单吧！"' :zheight='"auto"' :zwidth='"100%"'  :tpyes="'record'"></lini-page> -->
	</div>
		<!-- </mt-loadmore> -->
		<p class="nomore" v-if='nodata'>没有更多数据了...</p>

		</section>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
		import {
		getSession,
		getCookie,
		TypeCapitalconversionLowercase
	} from "../../../js/common";
   // import { getSession } from '../../../../static/js/common.js';
	// let change_sort; //监听到的排序正反
	// let sort = 'asc'; //默认排序
	let page_num = 1; //默认第几页
	let rows = 7;
	export default {
		data() {
			return {
				progress_data: [],
				sort:'asc',
				newprogress_data:[],
				topStatus: '',
				allLoaded: false,
				nopyan: false,
				bottomStatus: '',
				dataslength: false,
				nodata:false,
				page:"1",
				sponsorName:"",	//搜索的账户名
				auiScroll: true,
			};
		},
		props:['page_s','searchName'],
		created() {
			let sort=this.$route.query.paixu ? this.$route.query.paixu :'asc';
			console.log(this.$route.query.order)
			this.sort=sort;
			// page_num=1;
			this.page = this.page_s
			this.sponsorName = this.searchName
			console.log(this.searchName)
			this.requestData(sort);
			console.log(getCookie('newData').userid)
		},
		mounted(){
			var that = this;
		   var pullToRefreshs = new auiPullToRefresh({ //下拉刷新
			container: document.querySelector('.aui-refresh-content'), //下拉容器
			triggerDistance: 80 //下拉高度
		}, function(ret) {
			if (ret.status == "success") {
				that.auiScroll = false;
// 				that.imgUrls = [];
// 				that.datas = [];
				// that.page = 1;
				that.$ajax.defaults.timeout  =  49527;//49527这个值控制没有showLonding
				// that.zh_track_record();
				that.loadTop()
				setTimeout(() => {
					that.$ajax.defaults.timeout  = 50000;
					pullToRefreshs.cancelLoading(); //刷新成功后调用此方法隐藏
				}, 1500)
			}
		});
		var scrolls = new auiScroll({ //上拉加载
			listen: false, //是否监听滚动高度，开启后将实时返回滚动高度
			distance: 0 //判断到达底部的距离，isToBottom为true
		}, function(ret) {

			console.log(that.auiScroll)
			console.log(ret.isToBottom)
			if (ret.isToBottom == true && that.auiScroll) {
				that.auiScroll = false;
				// that.page++
				// console.log(this.page++)
				// that.zh_track_record();
				that.loadBottom()
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
			
			loadTop() {	//下拉刷新
				// this.datas = [];
				this.page=1;
				let sort=this.sort;
				this.requestData(sort);
				
				this.nodata = false
			
				// 加载更多数据
			
			},
			handleTopChange(status) {
				this.topStatus = status;
			},
			loadBottom() {	//下拉加载更多
				this.page++
				this.nodata = false
				let sort=this.sort;
				this.requestData(sort);
				// alert(1)
				
				
				
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
					var text1 = item.progressRate.toFixed(2) + '%';
					var text2 = '保' + (item.baodiCost/item.schemeCost*100).toFixed(2) + '%';
					var innWidth = parseInt((document.documentElement.clientWidth / 100) * 42);
					var sttWidth = innWidth / 2;

					var canvas = document.getElementById('circle' + index);
					var ctx = canvas.getContext('2d');
					var deg = Math.PI / 180;
					ctx.fillStyle = "#5FA3EB";
					ctx.sector(sttWidth+10, sttWidth+15, sttWidth, -90 * deg, pRate * deg).fill();
					ctx.fillStyle = "#E8E8DF";
					ctx.sector(sttWidth+10, sttWidth+15, sttWidth, bCost * deg, 270 * deg).fill();
					ctx.fillStyle = "#E45869";
					ctx.sector(sttWidth+10, sttWidth+15, sttWidth, pRate * deg, bCost * deg).fill();
					ctx.fillStyle = "#FFFFFF";
					ctx.sector(sttWidth+10, sttWidth+15, sttWidth-10, 0, 2*Math.PI).fill();
					ctx.font="20px Arial";
					ctx.fillStyle = "#5FA3EB";
					var tWidth1 = sttWidth - (ctx.measureText(text1).width/2);
					ctx.fillText(text1,tWidth1+10,sttWidth+5);
					ctx.font="20px Arial";
					ctx.fillStyle = "#E45869";
					var tWidth2 = sttWidth - (ctx.measureText(text2).width/2);
					ctx.fillText(text2,tWidth2+10,sttWidth+35);
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
				// if(this.page == 1){page_num = this.page}
				console.log(getCookie('newData').userid );
				if(!getCookie('newData').userid){
                    // Toast("暂未登陆~");
					this.$router.push({
                        name: 'login'
                  	})
                  	return
				}
				if(getSession('selected')&&getSession('selected').length>0){
					rows=99999999;
				}
				// console.log(progressRate);
				console.log(sort);
				let data=[];
				let path={path:'cooperation'};
				// alert(this.page)
				if(this.page == 1){
						this.auiScroll = false
					window.scrollTo(0,0)
				}
				// alert(getCookie('newData').userid)
				console.log(getCookie('newData'))
				// alert(JSON.parse(sessionStorage.getItem('userindata'))['userId'])
				data['page']=this.page;
				data['rows']=rows;
				data['lotteryName']='';
				data['iszhuiq']=false;
				data['sort']= this.$route.query.order ? this.$route.query.order: 'progressRate';
				data['order']=sort;
				data['userId']= getCookie('newData').userid;
				data['phone']=  getCookie('newData').tel;
				data['sponsorName']= this.sponsorName;
				data['schemenumber']= '';
				data['state']= '0';
				console.log(data);
				let dataes = this.Qs.stringify({
					path:'cooperation',data
				}, {
					allowDots: true
				});
			console.log(dataes);
				this.$ajax.post('/caipiaoshouye/index.php/home/index/hmlist',dataes)
					.then(ret => {
						console.log(ret)
						this.auiScroll = true
											if (ret.status == 200) {
												// console.log(JSON.stringify(ret));
												var data = JSON.parse(ret.data.content);
												console.log(data);
												if (data) {
													var progress_data = data.data.content;
													console.log(progress_data);
													var selected=getSession('selected');
													// console.log(JSON.stringify(selected));
													if(progress_data.length != 0){
														if (selected) {
															var new_data = [];
															for (var j = 0; j < progress_data.length; j++) {
																for (var i = 0; i < selected.length; i++) {
																	var item = selected[i];
																	if (progress_data[j].lotteryType_text == item) {
																		new_data.push(progress_data[j]);
																	}
																}
															}
															progress_data = new_data;
														}
													}
													this.newprogress_data=progress_data;
													if(this.newprogress_data.length==0){
														 // Toast('没有更多数据！');
														 if(this.page != 1){
														 	this.nodata = true;
														 }else{
															this.nopyan=true;
														 }
														 this.auiScroll = false
														return
													}
													if(this.page==1){
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
														button.style.display = "block";
													}
					
												}
					
												if (!data || progress_data.length == 0) {
													var button = document.querySelector('.button');
													// button.style.display = "none";
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
		filters:{
			getTime:function (matchDate, num) {
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
			    }if (num==1) { //月日时分
			        return m + "-" + d + " " + h + ":" + mm;
			    } else if (num == 2) { //年月日时分秒
			        return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
			    }else if (num == 3) {
			           return h + ":" + mm;
			   }else if (num == 4) {
			        return y + "-" + m + "-" + d + " " + h + ":" + mm;
			  }
			},
		},
	
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
.nomore{
        display: block;
        width: 100%;
        /* margin: 0; */
        padding: 0;
        border: 0;
        height: 2rem;
        line-height: 2rem;
        padding-top: 0rem;
        background: rgba(0,0,0,0);
        border: 0;
        color: #9B9B9B;
        font-size: .7rem;
        text-align: center;
        position: relative;
        bottom: .5rem;
      }
	html {
		background: rgb(242, 242, 242);
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
		/*color: #62A1BE;*/
		color: #333;
		line-height: 1rem;
	}
	#hemai1{
		background: rgb(242, 242, 242);
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
      /*.content:last-child{
        margin-bottom: 1.5rem;
      }*/
      .left {
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;

      }
      .name {
        width: auto;
        padding: 0 0.3rem;
        /*border: 1px solid #e3e3e3;*/
        margin-bottom: 0.2rem;
        color: #4E4E4E;
        text-align: left;
        margin-top: 0.2rem;
        margin-right: 0rem;
        float: left;
        padding: 0px;
        margin-left: 0px;
        width: 40%;
        font-size: .7rem;
        /*overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;*/

      }
      .left .circle {
        position: relative;
        width: 4.5rem;
        height: 4rem;
      }

      @media screen and (max-width:414px) {

        .left .circle-text {
          position: absolute;
          top: 0rem;
          left: -.6rem;
          width: 2.8rem;
          height: auto;
          display: table;
          text-align: center;
          bottom: 0;
          border-radius: 50%;
          background-color: none;
          /* display: flex; */
          /* flex-direction: column; */
          /* align-items: center; */
          /* justify-content: center; */
          right: 0;
          margin: auto;
        }

      }

      @media screen and (max-width:375px) {

        .left .circle-text {
          position: absolute;
          top: 0rem;
          left: -.6rem;
          width: 2.8rem;
          height: auto;
          display: table;
          text-align: center;
          bottom: 0;
          border-radius: 50%;
          background-color: none;
          /* display: flex; */
          /* flex-direction: column; */
          /* align-items: center; */
          /* justify-content: center; */
          right: 0;
          margin: auto;
        }

      }
      .blue, .red {
        font-size: 0.6rem;
        display: block;
      }
      .blue {
        color: blue;
        line-height: .8rem;
        margin-bottom: 0.1rem;
      }
      .red {
        color: red;
        font-size: .5rem;
        line-height: .5rem;
      }

      .right {
        width: 60%;
        color: #333;
      }
      .header {
        /*padding-left: 0.5rem;*/
        padding-bottom: 0.3rem;
        border-bottom: 2px dotted #f2f2f2;
        margin-top: 0.7rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .phone {
        color: #818181;
        margin-right: 0rem;
        width: 60%;
        font-size: .6rem;
        text-align: right;
      }
      .end_time {
        font-size: 0.6rem;
        color: #939393;
        margin-bottom: .2rem;
      }
      .end_time_end {
        font-size: 0.6rem;
        color: #9B9B9B;
        margin-right: 0rem;
      }
      .bottom {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: .3rem;
      }

	.items {
		display: flex;
		flex-direction: column;
		/*align-items: center;*/
		    align-items: flex-start;
		        margin-top: .2rem;
    margin-bottom: .2rem;

	}
	.items span  {
	}

	.first {
		color: #999;
		font-size: 0.6rem;
	}

	.second {
		font-size: 0.6rem;
		color: #03A9F4;
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
		margin-top: 0rem;
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
	.mintscrll {
	    overflow: scroll;
	    height: 100%;
	    padding-bottom: 1.5rem;
	}
	.aui-refresh-pull-arrow img{
		display: none !important;
	}

	.aui-refresh-content{
		padding-bottom: 1.5rem;
	}
/* 	canvas{
		position: a;
		transform: scale(0.5,0.5);
		-ms-transform: scale(0.5,0.5);
		-webkit-transform: scale(0.5,0.5);
		-o-transform: scale(0.5,0.5);
		-moz-transform: scale(0.5,0.5);
	} */
	.aui-searchbar{
		    background-color: rgb(169, 203, 239) !important;
	}
</style>
