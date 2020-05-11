<template>
	<div class="fbg">
		<header class="aui-bar aui-bar-nav" id="aui-header">
			<a class="aui-btn aui-pull-left" tapmode @click="bake()">
				<span class="aui-iconfont aui-icon-left"></span>
			</a>
			<div class="aui-title"><span :class="active == '0'?'title-actives':''" @click='tab(0)'>我定制的</span><span :class="active == '1'?'title-actives':''" @click='tab(1)'>定制我的</span></div>
			 <div class="aui-pull-right" @click="selects()" tapmode>
                      <span class="aui-font-size-16">筛选</span>
                  </div>
			<!-- <div class="aui-title">定制我的用户</div> -->
			<!-- <div class="aui-pull-right" @click="to_dinzi()">
				<span class="aui-font-size-16">助手</span>
			</div> -->
		</header>
		<div class="record_titel" id="record_titel">
			<div v-for="(d,index) in tab_noto" class=" tapmode " :class="{'active':d.state}" @click="tab_notoli(index,d)">
				<div class="span">
                  <span class="record">{{d.name}}</span>
                    <div class="triangle" id="hot-record">
                        <span :class="d.sort == 'desc'?'triangle_border_up border_active':'triangle_border_up'"></span>
                        <span :class="d.sort == 'asc'?'triangle_border_down border_active1':'triangle_border_down'"></span>
                    </div>
                </div>
			</div>
		</div>
		<div  class=" aui-refresh-content"  v-if='isShuaxin'>
		<!-- <mt-loadmore  @top-status-change="handleTopChange" :top-method="loadTop" :bottom-method="loadBottom"
		 :bottom-all-loaded="allLoaded" :autoFill='false' @bottom-status-change='handleBottomChange' ref="loadmore"> -->
		<!-- 	<div slot="top" class="mint-loadmore-top">
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
			</div> -->
			<ul class="lists" id="app" v-cloak>
				<!-- <div v-if="data_data.length == 0 && dataslength" class="londNull"><img src="../../../assets/userinfo/yiyiyi.png">
					<p>暂无定制我的用户…</p>
				</div> -->
				<lini-page v-if="data_data.length == 0 && dataslength" :prompt='"暂无定制我的用户..."' :zheight='"100vh"' :zwidth='"100%"'  :tpyes="'record'"></lini-page>
				<li class="list" v-for="item in data_data">
					<span class="name">{{item.lotteryPlay}}</span>
					<div class="list_info">
						<div class="left">
							<span class="phone">{{(item.followUserName).replace(/(\d{3})(\d{8})/, '$1********')}}</span><span class="date">{{item.lastModifyTime|getTime(2)}}</span>
						</div>
						<div class="middle">
							<span class="type">跟单类型</span>
							<span v-if="item.followType =='PERCEND'" class="scale">{{item.followType_text}}</span>
							<span v-if="item.followType =='FUND'" class="scale">{{item.followType_text}}</span>
						</div>
						<div class="right">
							<span v-if="item.followType =='PERCEND'" class="type">单方案定制比例 (%)</span>
							<span v-if="item.followType =='FUND'" class="type">单方案定制金额 (元)</span>
							<span v-if="item.followType =='PERCEND'" class="scale">{{item.followPercent}}%</span>
							<span v-if="item.followType =='FUND'" class="scale">{{item.followCost}}元</span>
						</div>
					</div>
				</li>
			</ul>
        <p class="nomore" v-if='nodata'>没有更多数据了...</p>

		<!-- </mt-loadmore> -->
		</div>
		<div v-show="pupudz_show" @click="to_dinzi()" class="mengchen"></div>
		<div v-show="pupudz_show" class="pupudz">
			<ul>
				<li @click="to_dinziwim(1)">我定制的用户</li>
				<li @click="to_dinziwim(2)">定制我的用户</li>
			</ul>
		</div>
		<div class="layer" v-if="isshow">
            <span class="mask" @click="close_layer()"></span>
            <span class="empty"></span>
            <ul class="contain">
                <li  :class="title == '全部彩种'?'item actives':'item'" @click = 'setPattern("全部彩种")'  tapmode>全部彩种</li>
                <li  :class="title == '双色球'?'item actives':'item'" @click = 'setPattern("双色球")'  tapmode>双色球</li>
                <li  :class="title == '大乐透'?'item actives':'item'" @click = 'setPattern("大乐透")'   tapmode>大乐透</li>
                <li  :class="title == '福彩3D'?'item actives':'item'" @click = 'setPattern("福彩3D")'   tapmode>福彩3D</li>
                <li  :class="title == '七乐彩'?'item actives':'item'" @click = 'setPattern("七乐彩")'   tapmode>七乐彩</li>
                <li  :class="title == '排列三'?'item actives':'item'" @click = 'setPattern("排列三/排列五")'   tapmode>排列三/排列五</li>
                <!-- <li  :class="title == '排列五'?'item actives':'item'" @click = 'setPattern("排列五")'  tapmode>排列五</li> -->
                <li  :class="title == '竞彩足球'?'item actives':'item'" @click = 'setPattern("竞彩足球")'   tapmode>竞彩足球</li>
                <li  :class="title == '竞彩篮球'?'item actives':'item'" @click = 'setPattern("竞彩篮球")'   tapmode>竞彩篮球</li>
                <li  :class="title == '六场半全场'?'item actives':'item'" @click = 'setPattern("六场半全场")'   tapmode>六场半全场 </li>
                <li  :class="title == '北京单场'?'item actives':'item'" @click = 'setPattern("北京单场")'   tapmode>北京单场</li>
                <li  :class="title == '任选九场'?'item actives':'item'" @click = 'setPattern("任选九场")'   tapmode>任选九场</li>
                <li  :class="title == '胜负彩'?'item actives':'item'" @click = 'setPattern("胜负彩")'   tapmode>胜负彩</li>
                <li  :class="title == '四场进球'?'item actives':'item'" @click = 'setPattern("四场进球")'  tapmode>四场进球</li>
            </ul>
            
        </div>
	</div>
</template>

<script>
	import {
		Toast,
		Loadmore,
		Indicator,
		MessageBox
	} from 'mint-ui';
	import {
		IsPhone,
		setSession,
		getSession,
		getCookie,
        setCookie,
		getTime,
		replace,
		TypeCapitalconversionLowercase
	} from "../../../js/common";


	export default {
		data() {
			return {
				title:sessionStorage.getItem('selected')?JSON.parse(sessionStorage.getItem('selected'))[0]:'全部彩种',
                isshow:false,
                isShuaxin:true,
                nodata:false,
				topStatus: '',
				allLoaded: false,
				bottomStatus: '',
				active:"1",
				sort:'1',
				userid: 144,
				tab_noto: [{
					'id': 1,
					'state': true,
					'sort':'desc',
					'name': '按金额'
				}, {
					'id': 2,
					'state': false,
					'sort':'desc',
					'name': '按比例'
				}, {
					'id': 0,
					'sort':'desc',
					'state': false,
					'name': '按时间'
				}],
				data_data: [],
				dataslength: false,
				auiScroll:true,
				pupudz_show: false,
				sort_or: 'desc',
				size: 6,
				page: 0,
				show:"0",	
				isQh:true,
				goPage:"-1"
			};
		},
		filters: {
			getTime(matchDate, num) {

				return getTime(matchDate, num);
			}

		},
		created() {
            this.goPage = this.$route.query.goPage
			let uid=getCookie('newData');
			if(!uid){
				this.$router.push({
					name:'login'
				})
				return false;
			}
			this.userid = getCookie('newData').userid;
			var userid = this.userid
			Indicator.open('加载中');
			this.getMyFollowers(userid);
			Indicator.close();
		},
		mounted(){
            var that = this;
           var pullToRefreshs = new auiPullToRefresh({ //下拉刷新
            container: document.querySelector('.aui-refresh-content'), //下拉容器
            triggerDistance: 80 //下拉高度
        }, function(ret) {
            if (ret.status == "success") {
                // that.auiScroll = false;
//              that.imgUrls = [];
//              that.datas = [];
                // that.page = 1;
                that.$ajax.defaults.timeout  =  49527;//49527这个值控制没有showLonding
                // that.zh_track_record();
                that.isQh = false
                that.loadTop()
                setTimeout(() => {
                    that.$ajax.defaults.timeout  = 50000;
                    pullToRefreshs.cancelLoading(); //刷新成功后调用此方法隐藏
                	that.isQh = true
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
                that.$ajax.defaults.timeout  =  49527;//49527这个值控制没有showLonding
                // that.page++
                // console.log(this.page++)
                // that.zh_track_record();
                that.loadBottom()
            }
        });
        },
		methods: {
			selects:function(){
               // sessionStorage.removeItem('selected');
                this.isshow ?this.isshow = false: this.isshow = true;
                if(!this.isshow){
                    this.nodata = false;
                    this.data_data = [];
                    this.page = 0;
                    var userId = getCookie('newData').userid;
                    this.getMyFollowers(userId);
                }
            },
			 tab:function(ops){
                    sessionStorage.removeItem('selected')
                    // alert(this.isQh)
                  if(!this.isQh){
                    return
                  }
                  this.active = ops;
                  if(ops == 0){
                    this.$router.push({
                        path: '/userinfo/hemai/had_made',
                        query:{
                            goPage:--this.goPage
                        }
                    })
                  }
                },
			 reload: function() {
                this.isShuaxin = false;
                this.$nextTick(() => {
                    this.isShuaxin = true;
                })
            },
            setPattern(ops){
                this.title = ops;
                  var selected = []
                  selected.push(ops)
                  if(ops != '全部彩种'){
                    setSession('selected', selected);
                  }else{
                    sessionStorage.removeItem('selected')
                  }
                  this.close_layer()
                  // this.isShuaxin = false
                    // this.reload()

            },
            close_layer:function(){
                this.isshow=false
                this.nodata = false;
                this.page = 0;
                this.data_data = [];
                var userId = getCookie('newData').userid;
                this.getMyFollowers(userId);

            },
			loadTop() {
				// this.datas = [];
				// 
				this.page = 0;
				 this.auiScroll = true
				this.nodata = false
				this.data_data = [];
				this.getMyFollowers(this.userid);
				// setTimeout(() => {
				// 	this.$refs.loadmore.onTopLoaded();
				// }, 2000)

				// 加载更多数据

			},
			handleTopChange(status) {
				this.topStatus = status;
			},
			loadBottom() {
				this.page++
				// console.log(this.page++)

				this.nodata = false

				this.getMyFollowers(this.userid);

				// setTimeout(() => {
				// 	this.$refs.loadmore.onBottomLoaded();
				// }, 2000)
			},
			handleBottomChange(status) {
				// console.log(status)
				this.bottomStatus = status;
			},
			to_dinzi: function() {
				if (this.pupudz_show) {
					this.pupudz_show = false;
				} else {
					this.pupudz_show = true;
				}
			},
			to_dinziwim: function(index) {
				if (this.pupudz_show) {
					this.pupudz_show = false;
				} else {
					this.pupudz_show = true;
				}
				if (index == 1) {
					sessionStorage.removeItem('selected')
					this.$router.push({
						path: '/userinfo/hemai/had_made',
						query:{
							goPage:--this.goPage
						}
					})
				} else {
					sessionStorage.removeItem('selected')
					this.$router.push({
						path: '/userinfo/hemai/hadnot_made',
						query:{
							goPage:--this.goPage
						}
					})
				}

			},
			tab_notoli: function(index,item) {
				if(!this.isQh){
					return
				}
				this.nodata = false;
                 this.page = 0;
                item['sort'] == 'desc'?item['sort'] = 'asc':item['sort'] = 'desc'
                this.sort_or = item['sort']
                this.sort = item['id']
                this.allLoaded = false;
                for (var n = 0; n < this.tab_noto.length; n++) {
                    this.tab_noto[n].state = false;
                }
                this.tab_noto[index].state = true;
                let uid = getCookie('newData');
                if (!uid) {
                    this.$router.push({
                        name: 'login'
                    })
                    return false;
                }
                var userId = getCookie('newData').userid;
                console.log(getCookie('newData').userid)
                this.data_data = [];
                var data = [];

                data["userId"] = getCookie('newData').userid;
                Indicator.open('加载中');
				this.getMyFollowers(getCookie('newData').userid);
				Indicator.close();
			},
			getMyFollowers: function(userid) {
				this.nodata = false;
                console.log(userid);
				var data = [];
				data["userId"] = userid;
				data["order"] = this.sort_or;
				data["size"] = this.size;
				data["page"] = this.page;
				data["sort"] = this.sort;
				console.log(data)
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getMyFollowers',
						datas
					)
					.then(res => {
						console.log(res)
                        this.dataslength = false
						this.auiScroll = true
						var content = JSON.parse(res.data.content);
						console.log(JSON.stringify(content));
						if (res.data.status == 200) {
							if (content.code == 100000) {
								if(this.page == 0){
                                    this.data_data = []
                                }
								var datascr = content.data.content;
								var selected = getSession("selected");

								if (selected) {
									var new_data = [];
									console.log(1);
									for (var j = 0; j < datascr.length; j++) {
										for (var i = 0; i < selected.length; i++) {
											if (datascr[j].lotteryPlay == selected[i]) {
												new_data.push(datascr[j]);
											}
										}
									}
									if (new_data.length < 1) {
										this.allLoaded = true;
										 // this.nodata = true;
										 this.auiScroll = false
										 if(this.page == 0){
                                            this.nodata = false;
                                        }else{
                                            this.nodata = true;
                                        }
										// Toast('没有更多数据了！')
									}
									this.data_data = this.data_data.concat(new_data);

								} else {
									if (datascr.length < 1) {
										this.allLoaded = true;
										 this.auiScroll = false
										 // this.nodata = true;
										if(this.page == 0){
                                            this.nodata = false;
                                        }else{
                                            this.nodata = true;
                                        }
										// Toast('没有更多数据了！')
									}
										  this.data_data = this.data_data.concat(datascr);
								}
								if (this.data_data.length == 0) {
									this.dataslength = true;

								}

							} else if (content.code == "201010") {
                                Toast("账户已被锁定，请联系客服");
                                setCookie('newData', '', '0-S');
                                this.$router.push({
                                    name: 'login'
                                })
                            }else if(content.code == "200000"){
                                Toast(content.data);
                                this.dataslength = true
                            }
						} else if (res.data.status == 500) {
							this.dataslength = true;
							Toast('服务器异常，请稍后重试！')
						}

					})
					.catch(err => {
						this.dataslength = true;
						console.log(err);
					})
			},
			bake: function() {
				sessionStorage.removeItem('selected')
				// this.$router.push({
    //                 path:'/userinfo/hemai/hemai_hot'
    //             })
				this.$router.go(this.goPage); //根据浏览器记录返回上一次
			}
		}
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
        bottom: 0rem;
      }
	html {
		background-color: #f2f2f2;
	}

	header {
		position: fixed !important;
	}
.mint-loadmore{
	
}
	 .fbg {
        background: #f2f2f2 !important;
        min-height: 100.1%;
        width: 100%;
        position: absolute;
    }

	.mengchen {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background: rgba(0, 0, 0, 0.5);
		opacity: 0.6;
		z-index: 10;
	}

	.pupudz {
		position: fixed;
		top: 2rem;
		right: 0.3rem;
		width: 7rem;
		height: 8rem;
		background-image: url(../../../assets/userinfo/blue_pop.png);
		background-position: center;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		z-index: 11;
	}

	.pupudz ul {
		width: 100%;
		height: 100%;
		padding-top: 0.8rem;
	}

	.pupudz ul li {
		width: 100%;
		text-align: center;
		color: #ffffff;
		line-height: 3.6rem;
		font-size: 0.8rem;
	}

	.pupudz ul li:first-child {
		border-bottom: #fff solid 1px;
	}

	.record_titel {
		width: 100%;
		height: 2.4rem;
		text-align: center;
		display: flex;
		padding: 0 3%;
		/* border-bottom: 1px solid #CCCCCC; */
		position: fixed;
		top: 2.25rem;
		left: 0;
		background-color: #fff;
		z-index: 1;
	}

	.record_titel div {
		 padding: 0px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
	
	}
.record_titel>div:nth-child(2){
	/*background-image: url(../../../assets/userinfo/arr_01.png);*/
	background-repeat: no-repeat;
	background-size: .5rem .7rem;
	background-position: 4.3rem;
}
.record_titel>div:nth-child(3){
	/*background-image: url(../../../assets/userinfo/arr_01.png);*/
	background-repeat: no-repeat;
	background-size: .5rem .7rem;
	background-position: 4.3rem;
}
	.record_titel div:nth-child(2) {
		margin: 0 5%;
	}

	.record_titel .active {
		color: #03A9F4;
        border-bottom: #03A9F4 2px solid; 
	}

	.lists {
		background-color: #f2f2f2;
		margin-top: 5rem;
		/* padding-top: 0.5rem; */
		/*min-height: 85vh;*/
	}

	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: center;
		padding: 2% 4%;
		background-color: white;
		margin-bottom: 0.3rem;
		/*margin-top: 1.5%;*/
	}

	.name {
		font-size: 0.6rem;
		color: #999;
		border: 1px solid #999;
		width: 3.5rem;
		text-align: center;
		margin-bottom: 0.2rem;
	}

	.list_info {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		;
		justify-content: space-between;
	}

	.middle,
	.right {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.left {
		font-size: 0;
		display: flex;
		flex-direction: column;
	}

	.phone {
		font-size: 0.8rem;
		font-weight: bold;
	}

	.type {
		font-size: 0.6rem;
		color: #999;
	}

	.date,
	.scale {
		font-size: 0.6rem;
		font-weight: bold;
	}

	.helper {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 999;
		display: none;
	}

	.layer {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(95, 163, 235, 0.5);
		z-index: 100;
	}

	.main {
		z-index: 999;
		position: absolute;
		right: 0.3rem;
		top: 2.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;

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

	[v-cloak] {
		display: none;
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
	 .layer {
        position: fixed;
        top: 2.65rem;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 999;
        /* display: none; */
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

    .contain {
        position: fixed;
        top: 2.65rem;
        left: 0;
        width: 100%;
        /* bottom: 30%; */
        z-index: 100;
        /* padding: 0 2%; */
        background-color: #FFFFFF;
        padding-top: 3%;
        padding-bottom: 3%;
    }

    .contain .item {
        width: 30%;
        position: relative;
        float: left;
        text-align: center;
        height: 2rem;
        color: #4A4A4A;
        line-height: 2rem;
        font-size: 0.6rem;
        background-color: #F5FAFF;
        margin-bottom: 0.5rem;
        /* margin-right: 0.8rem; */
        margin-left: 3%;
        margin-right: 0;
    }
    .actives{
        color: #03A9F4 !important;
    }
    .item:nth-child(3n+3) {
        margin-right: 0;
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
        position: fixed;
        bottom: 0px;
    }
    .aui-title span{
      float: left;
      padding: 0px 1rem;
      height: 1.25rem;
      line-height: 1.25rem;
      font-size: .7rem;
      width: 50%;
    }
    .title-actives{
      color:#03A9F4;
      background: #fff;
    }
    .aui-bar-nav .aui-title{
      border-radius: 1rem;
      width: 54% !important;
      border: 1px solid #fff;
      color: #fff;
      min-height: 1.25rem !important;
      left: 4rem !important;
      margin: .5rem 0px !important;
    }
    .aui-tab-item{
      /* width: 100%; */
      height: 2.2rem;
      margin: 0px 20%;
      line-height: 2.2rem;
      position: relative;
      font-size: 0.7rem;
      text-align: center;
      color: #212121;
      margin-left: -1px;
      -webkit-box-flex: 1;
      box-flex: 1;
      margin: 0px 6%;
      padding: 0 2%;
    }
    .item_active{
      border-color: transparent transparent #03A9F4;
    }
    .triangle {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .triangle_border_up {
        width: 0;
        height: 0;
        border-width: 0 3px 3px;
        border-style: solid;
        border-color: transparent transparent #666;
        margin: 1px auto;
        position: relative;
    }

    .triangle_border_down {
        width: 0;
        height: 0;
        border-width: 3px 3px 0;
        border-style: solid;
        border-color: #666 transparent transparent;
        margin: 1px auto;
        position: relative;
    }

    .triangle_border_up.top {
        border-color: transparent transparent #666;
    }

    .triangle_border_down.bottom {
        border-color: #e2e2e2 transparent transparent;
    }
   .border_active{
        border-color: transparent transparent #03A9F4 !important;
    }
    .border_active1{
        border-color:#03A9F4 transparent transparent !important;
    }
    .tapmode{
        margin: 0px 8% !important;
    }
    .span{
	    padding: 0px !important;
        font-size: .7rem;

	}
	.record_titel div:nth-child(2) {
	    margin: 0 .2rem;
	}
</style>
