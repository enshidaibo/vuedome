<template>
    <div>
        <header class="aui-bar aui-bar-nav">
            <div class="aui-pull-left aui-btn" @click="closeWin()" tapmode>
                <span class="aui-iconfont aui-icon-left"></span>
            </div>
            <div class="aui-title">我的用户</div>
            <div @click="changeuser()" tapmode class="aui-pull-right aui-btn">
                <span id="xzyh">{{userTypes}}</span>
            </div>
        </header>
        <div class="aui-tab" id="tab">
            <div class="aui-tab-item tapmode">账户</div>
            <div class="aui-tab-item tapmode">类型</div>
            <div class="aui-tab-item tapmode" style="font-size:0.6rem">
                <div style="height:1.1rem; line-height:1.3rem; color:#5FA3EB">投注金额<span>/</span></div>
                <div style="height:1.1rem; line-height:0.9rem;">充值金额</div>
            </div>
            <div class="aui-tab-item tapmode">佣金</div>
        </div>
        <section class="mintscrll mui-content mui-scroll-wrapper" id="refreshContainer">
            <!-- <mt-loadmore @top-status-change="handleTopChange" :top-method="loadTop" :bottom-method="loadBottom"
			 :bottom-all-loaded="allLoaded"  @bottom-status-change='handleBottomChange' ref="loadmore">
				<div slot="top" class="mint-loadmore-top">
					<span class="shaxinc" v-show="topStatus !== 'loading'"><img src="../../assets/shuaxin/logo3.png" /></span>
					<span class="shaxinc" v-show="topStatus === 'loading'">
						<div class="almosh"><img src="../../assets/shuaxin/xuanzhuan80.png" /></div>
					</span>
				</div>
				<div slot="bottom" class="mint-loadmore-bottom">
					<span class="shaxinc" v-show="bottomStatus === 'pull'"><img src="../../assets/shuaxin/pagex.png" /></span>
					<span class="shaxinc" v-show="bottomStatus === 'loading'">
						<div class="almosh"><img src="../../assets/shuaxin/pagez.png" /></div>
					</span>
					<span class="shaxinc" v-show="bottomStatus === 'drop'"><img src="../../assets/shuaxin/pages.png" /></span>
				</div> -->
            <div class="mui-scroll">
                <div id='myuser_list'>
                    <div v-if="dataslength" class="londNull"><img src="../../assets/yiyiyi.png">
                        <p>暂无数据</p>
						<!-- <p>还没有推广用户…</p> -->
                    </div>
                    <ul class="aui-list aui-list-in userul">
                        <li v-for='(d,i) in datas' :key="d.ids">
                            <ul>
                                <li class="aui-list-item user_list " @click="user_w(i)" tapmode>
                                    <div class="aui-list-item-inner">
                                        <div class="aui-list-item-title user_item">
                                            {{d.phone}}
                                        </div>
                                        <div class="aui-list-item-title user_item">
                                            <div class="aui-btn-outlined user_yh" :class="[d.type=='直接用户'?'user_origin':'user_blue']">{{d.type}}</div>
                                        </div>
                                        <div class="aui-list-item-title user_item">
                                            <div class="user_acount1 user_blue_r">{{d.betTotal}}</div>
                                            <div class="user_acount2">{{d.rechargeTotal}}</div>
                                        </div>
                                        <div class="aui-list-item-title user_item user_red">{{d.commission}}</div>
                                        <div class="aui-list-item-title user_item "><img src="../../assets/arr_down.png"></div>
                                    </div>
                                </li>
                                <li class="aui-list-item user_list user_black" v-show="d.xiaji">
                                    <div class="aui-list-item-inner">
                                        <div class="aui-list-item-title user_item">
                                            <img class="avtar" src="../../assets/user_icon2.png"><span style="float:left">
                                                {{d.phone}}</span>
                                        </div>
                                        <div class="aui-list-item-title user_item">
                                        </div>
                                        <div class="aui-list-item-title user_item">
                                        </div>
                                        <div class="aui-list-item-title user_item">
                                        </div>
                                        <div class="aui-list-item-title user_item">
                                            <div class="aui-btn aui-btn-block user_ckbb" @click="check_user_bb(d.userId,d.phone)">查看报表</div>
                                        </div>
                                        <div class="aui-list-item-title user_item ">
                                            <div class="aui-btn aui-btn-block user_qx" @click="user_f(i)">取消</div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <div id="new_tgtype_box" v-if="isShow">
            <p></p>
            <div>
                <p @click.stop="zhijieuser()" tapmode>直接用户</p>
                <p @click.stop="jianjieuser()" tapmode>间接用户</p>
                <p @click.stop="changeuser()" tapmode>取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消</p>
            </div>
        </div>
    </div>
</template>

<script>
    let chishipage = 1;
    // 	import {
    // 		InfiniteScroll
    // 	} from 'mint-ui';
    import {
        mobileHide,
        getCookie,
        setCookie,
    } from "../../js/common"
    export default {
        data() {
            return {
                dataslength: false,
                datas: [],
                isShow: false,
                type: 1,
                topStatus: '',
                allLoaded: false,
                loading: false,
                bottomStatus: '',
                page: 1,
                userTypes: '直接用户',
            };
        },
        created() {
            this.onLoading(1);
        },
        mounted() {
            var mui = this.Mui;
            mui("#refreshContainer").on('tap', 'li', function(event) {
                this.click();
            });
            mui("#refreshContainer").on('tap', 'div', function(event) {
                this.click();
            });
            for (var i = mui.hooks.inits.length - 1, item; i >= 0; i--) {
                item = mui.hooks.inits[i];
                if (item.name == "pullrefresh") {
                    item.repeat = true;
                }
            }
            this.Mui.init({
                pullRefresh: {
                    container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                    down: {
                        height: 50, //可选,默认50.触发下拉刷新拖动距离,
                        auto: false, //可选,默认false.首次加载自动下拉刷新一次
                        contentdown: "1", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                        contentover: "2", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                        contentrefresh: "3", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                        //callback: pullfresh - function //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                        callback: () => {
                            // this.page = 1;
                            this.onLoading(this.type, 1);
                            setTimeout(() => {
                                this.Mui('#refreshContainer').pullRefresh().endPulldownToRefresh(
                                    true);
                            }, 2000)

                        },
                    },
                    up: {
                        height: 50, //可选.默认50.触发上拉加载拖动距离
                        auto: false, //可选,默认false.自动上拉加载一次
                        contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                        contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                        callback: () => {
                            let pages = this.page++;
                            // console.log(this.type,pages)
                            this.onLoading(this.type, pages);
                            setTimeout(() => {
                                this.Mui('#refreshContainer1').pullRefresh().endPullupToRefresh(
                                    true);
                            }, 500)

                        }, //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    }
                }
            });
        },
        methods: {
            // 			loadTop() {
            // 				this.onLoading(this.type,1);
            // 				setTimeout(() => {
            // 					this.$refs.loadmore.onTopLoaded();
            // 				}, 2000)
            // 			},
            // 			handleTopChange(status) {
            // 				this.topStatus = status;
            // 			},
            // 			loadBottom() {
            // 				let pages = this.page++;
            // 				 // console.log(this.type,pages)
            // 				this.onLoading(this.type,pages);
            // 				setTimeout(() => {
            // 					this.$refs.loadmore.onBottomLoaded();
            // 				}, 2000)
            // 			},
            // 			handleBottomChange(status) {
            // 				this.bottomStatus = status;
            // 			},
            closeWin: function() {
                this.$router.go(-1);
            },
            onLoading: function(type, page, num) {
                var newData = getCookie("newData");
                if (!newData) {
                    this.$router.push({
                        name: 'login'
                    })
                    return false;
                }
                if (!page) {
                    page = 1;
                }
                if (!num) {
                    num = 30;
                }
                console.log("当前页数：" + page);
                var data = [];
                data["userId"] = newData.userid;
                data["type"] = type;
                data["page"] = page;
                data["size"] = num;
                var dataes = this.Qs.stringify({
                    data
                }, {
                    allowDots: true
                });
                this.$ajax.post('/caipiaoshouye/index.php/home/index/displayMyAccountPage',
                        dataes
                    )
                    .then(res => {
                        if (res.status == 500) {
                            this.dataslength = true
                            this.allLoaded = true
                            alert("服务器异常，请稍后重试");
                        } else if (res.status == 200) {

                            var content = JSON.parse(res.data.content);
                            console.log(content.code);
                            if (content.code == 100000) {
                                var datalists = content.data.obj;
                                if (datalists) {
                                    for (let i = 0; i < datalists.length; i++) {
                                        datalists[i].xiaji = false;
                                        datalists[i].ids = i;
                                        datalists[i].phone = mobileHide(datalists[i].phone, 3, 4);
                                    }
                                }
                                console.log(datalists)
                                if (datalists == '' || datalists.length < 1) {
                                    this.allLoaded = true;
                                    this.dataslength = false
                                }
                                if (page == 1) {
                                    this.datas = datalists
                                } else {
                                    this.datas = this.datas.concat(datalists)
                                }

                                if (this.datas.length > 0) {
                                    this.dataslength = false
                                } else {
                                    this.dataslength = true
                                }
                            } else if (content.code == "201010") {
                                Toast("账户已被锁定，请联系客服");
                                setCookie('newData', '', '0-S');
                                this.$router.push({
                                    name: 'login'
                                })
                            } else {
                                this.allLoaded = true;
                                this.dataslength = true
                            }

                        }
                    })
                    .catch(err => {
                        this.allLoaded = true
                        this.dataslength = false
                        //this.MintUi.Indicator.close();
                        console.log(err);
                    })
            },
            changeuser: function() {
                this.isShow = !this.isShow;
            },
            zhijieuser: function() {
                this.isShow = !this.isShow;
                this.datas = [];
                this.page = 1;
                chishipage = 1;
                this.userTypes = '直接用户';
                this.allLoaded = false
                this.onLoading(1);
                this.type = 1;
            },
            jianjieuser: function() {
                this.isShow = !this.isShow;
                this.datas = [];
                this.page = 1;
                this.type = 2;
                chishipage = 1;
                this.userTypes = '间接用户';
                this.allLoaded = false;
                this.onLoading(2);
            },
            user_w: function(i) {
                this.datas[i].xiaji = !this.datas[i].xiaji;
            },
            user_f: function(i) {
                this.datas[i].xiaji = false;
            },
            check_user_bb: function(id, phone) {
                this.$router.push({
                    name: 'promotion_income',
                    params: {
                        id,
                        phone
                    }
                })
            },
            loadMore: function() {
                console.log(chishipage);
                chishipage++;
                this.onLoading(this.type, chishipage);
            }
        }
    }
</script>

<style scoped>
    header {
        position: fixed !important;
    }

    #myuser_list {
        min-height: 28rem;
    }

    .text-white {
        color: #ffffff !important;
    }

    .aui-grid [class*=aui-col-] {
        padding: 0.75rem 0;
    }

    .londNull {
        width: 100%;
        height: 100vh;
        box-sizing: border-box;
        padding-top: 8rem;
    }

    .mint-loadmore-top {
        z-index: -99;
    }

    #tab {
        margin-top: 2.25rem;
        position: fixed;
        width: 100%;
        z-index: 99999;
    }

    .userul {
        /* margin-top:4.5rem; */
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

    .user_list {
        height: 3.6rem !important;
    }

    .user_item {
        color: #9B9B9B !important;
        text-align: center;
    }

    .user_yh {
        padding: 0.2rem !important;
        font-size: 0.65rem !important;
    }

    .user_origin {
        border-color: #F6A92C !important;
        color: #F6A92C !important;
    }

    .user_acount1 {
        font-size: 0.7rem !important;
        height: 1.1rem !important;
        line-height: 1.4rem !important;
    }

    .user_acount2 {
        font-size: 0.7rem !important;
        height: 1.1rem !important;
        line-height: 0.8rem !important;
    }

    .user_red {
        color: #E45869 !important;
    }

    .user_item img {
        width: 0.9rem;
        height: auto;
    }

    .user_item .avtar {
        float: left;
        height: 1.2rem;
        width: auto;
        vertical-align: middle;
        margin-right: 0.4rem
    }

    .user_black {
        background-color: #f4f4f4 !important;
    }

    .user_blue {
        border-color: #5FA3EB !important;
        color: #5FA3EB !important;
    }

    .user_ckbb {
        height: 1.6rem !important;
        line-height: 1.6rem !important;
        font-size: 0.7rem !important;
        background: #5FA3EB !important;
        color: #fff !important;
    }

    .user_qx {
        height: 1.6rem !important;
        line-height: 1.6rem !important;
        font-size: 0.7rem !important;
        background-color: #9B9B9B !important;
        color: #fff !important;
    }

    .user_blue_r {
        color: #5FA3EB !important;
    }

    #new_tgtype_box {
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 30000;
        background: rgba(0, 0, 0, 0.5);
    }

    #new_tgtype_box>p:first-child {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        background: rgba(0, 0, 0, 0.5));
    }

    #new_tgtype_box>div:nth-child(2) {
        width: 100%;
        height: 8rem;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 10;
    }

    #new_tgtype_box>div:nth-child(2)>p {
        width: 94%;
        height: 2.3rem;
        text-align: center;
        line-height: 2.3rem;
        font-size: 0.7rem;
        background: #fff;
        font-weight: 700;
        margin: 0 auto;
    }

    #new_tgtype_box>div:nth-child(2)>p:last-child {
        margin-top: 0.5rem;
        border-radius: .4rem;
        background: #f5f5f5;
        color: #9f9f9f
    }

    #new_tgtype_box>div:nth-child(2)>p:first-child {
        border-bottom: 1px solid #c8c8c8;
        color: #d96472;
        border-top-left-radius: .4rem;
        border-top-right-radius: .4rem
    }

    #new_tgtype_box>div:nth-child(2)>p:nth-child(2) {
        border-bottom-left-radius: .4rem;
        border-bottom-right-radius: .4rem
    }

    /* 	.mint-loadmore-top{
		margin-top:40px;
	} */
    .mui-scroll-wrapper {
        top: 4.5rem
    }
</style>
