<template>
    <div>
        <!-- <nav-bar title="追号记录详情"></nav-bar> -->
        <header class="aui-bar aui-bar-nav">
            <div class="aui-pull-left aui-btn" @click="bake()">
                <span class="aui-iconfont aui-icon-left"></span>
            </div>
            <div class="aui-title">追号记录详情</div>
           <!--  <div class="aui-pull-right" @click='gorecord()'>
                <img src="../../assets/userinfo/recharges.png" alt="">
            </div> -->
        </header>
        <section id="data_list">
			<section class="aui-refresh-content">
				<div class="aui-content">
            <div class="data_list" v-for='(d,i) in datas' @click="fa_info(d);" :data-lotteryTypeKey="d.lotteryTypeKey"
                :data-schemeId="d.schemeId">
                <div class="">{{d.periodNumber}}</div>
                <div class="">{{d.lotteryTypeKey|getlotteryType()}}</div>
                <div class="chengong">成功</div>
                <div class="all_bets_right"></div>
            </div>
			<no-more v-show='nomore' ></no-more>
			</div>
			</section>
        </section>
    </div>
</template>
<script>
	var pullToRefreshs;
    import {
        Toast
    } from 'mint-ui';
    import {
        Indicator
    } from 'mint-ui';
    import {
        MessageBox
    } from 'mint-ui';
    import {
        getCookie,
        setCookie
    } from "../../js/common";
    export default {
        data() {
            return {
                datas: [],
				auiScroll: true,
				page:1,
				nomore:false
            }
        },
        filters: {
            getlotteryType: function(type) {
                switch (type) {
                    case "ssq":
                        name = "双色球";
                        break;
                    case "dlt":
                        name = "大乐透";
                        break;
                    case "pl":
                        name = "排列5";
                        break;
                    case "pl3":
                        name = "排列3";
                        break;
                    case "pl5":
                        name = "排列5";
                        break;
                    case "welfare3d":
                        name = "福彩3D";
                        break;
                    case "seven":
                        name = "七乐彩";
                        break;
                    case "bjklb":
                        name = "北京快乐8";
                        break;
                    case "sdel11to5":
                        name = "山东11选5";
                        break;
                    case "cqssc":
                        name = "重庆时时彩";
                        break;
                    case "xjssc":
                        name = "新疆时时彩";
                        break;
                    case "gdel11to5":
                        name = "广东11选5";
                        break;
                    case "jxel11to5":
                        name = "江西11选5";
                        break;
                    case "gdklsf":
                        name = "广东快乐十分";
                        break;
                    case "tjklsf":
                        name = "天津快乐十分";
                        break;
                    case "ahk3":
                        name = "安徽快3";
                        break;
                    case "hbk3":
                        name = "湖北快3";
                        break;
                    case "jsk3":
                        name = "江苏快3";
                        break;
					case "bjk3":
					    name = "北京快3";
					    break;
                    case "jczq":
                        name = "竞彩足球";
                        break;
                    case "jclq":
                        name = "竞彩篮球";
                        break;
                    case "dczc":
                        name = "北京单场";
                        break;
                    case "sczc":
                        name = "四场进球";
                        break;
                    case "sfzc":
                        name = "胜负彩";
                        break;
                    case "lczc":
                        name = "六场半全场";
                        break;
                    case "rxjc":
                        name = "任选九场";
                        break;
                    case "sfzc14":
                        name = "任选十四场";
                        break;
                }
                return name;
            }
        },
        created() {
            Indicator.open('加载中');
            this.schemeChase();
            Indicator.close();
        },
		beforeDestroy() {
			//离开页面就还原刷新状态
			this.$ajax.defaults.timeout  = 50000;
			// pullToRefreshs.cancelLoading(); //刷新成功后调用此方法隐藏
			 this.auiScroll=false;//取消上拉监听
		},
		mounted(){
			var that = this;
					    pullToRefreshs = new auiPullToRefresh({ //下拉刷新
						container: document.querySelector('.aui-refresh-content'), //下拉容器
						triggerDistance: 80 //下拉高度
					}, function(ret) {
						if (ret.status == "success") {
							that.auiScroll = false;
			// 				that.imgUrls = [];
			// 				that.datas = [];
							that.page = 1;
							that.$ajax.defaults.timeout  =  49527;//49527这个值控制没有showLonding
							that.schemeChase();
							setTimeout(() => {
								that.$ajax.defaults.timeout  = 50000;
								pullToRefreshs.cancelLoading(); //刷新成功后调用此方法隐藏
							}, 1500)
						}
					});
			var scrolls = new auiScroll({ //上拉加载
				listen: false, //是否监听滚动高度，开启后将实时返回滚动高度
				distance: 200 //判断到达底部的距离，isToBottom为true
			}, function(ret) {
				if (ret.isToBottom == true && that.auiScroll&&!that.nomore) {
					that.auiScroll = false;
					that.page++
					// console.log(this.page++)
					that.schemeChase();
				}
			});
		},
		
        methods: {
            bake: function() {
                this.$router.go(-1); //根据浏览器记录返回上一次
            },
            schemeChase: function() {
                let newData = getCookie('newData');
                if (!newData) {
                    this.$router.push({
                        name: 'login'
                    })
                    return false;
                }
                var userId = newData.userid;
                var data = [];
                data["userId"] = userId;
                data["id"] = this.$route.query.id;
                data["rows"] = 20;
                data["page"] = this.page;
                data["lotteryType"] = this.$route.query.lotteryType;
                var datas = this.Qs.stringify({
                    data
                }, {
                    allowDots: true
                });
                this.$ajax.post('/caipiaoshouye/index.php/home/index/schemeChase',
                        datas
                    )
                    .then(res => {
                        var content = JSON.parse(res.data.content);
                        console.log(JSON.stringify(content));
                        if (res.data.status == 200) {
                            if (content.code == 100000) {
								if(this.page==1){
									this.nomore=false;
									this.auiScroll=true;
									 this.datas = content.data.obj;
									 this.auiScroll=true;
								}else{
									this.datas=this.datas.concat(content.data.obj);
									 this.auiScroll=true;
									if(content.data.obj.length==0){
										this.nomore=true;
										this.auiScroll=false;
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

                            Toast('服务器异常，请稍后重试！')
                        }

                    })
                    .catch(err => {

                        Toast('请检查你的网络链接状态！')
                    })
            },
            fa_info: function(obj) {

                var key = obj.lotteryTypeKey;
                var id = obj.schemeId;
                this.$router.push({
                    path: '/userinfo/scheme_detail_alone_shuzicai',
                    query: {
                        key,
                        id
                    }
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
    .data_titel {
        width: 100%;
        height: 3rem;
        display: flex;
        background: #fff;
        padding: 0rem 5%;
        text-align: center;
        line-height: 3rem;
        font-size: 0.9rem;
        font-weight: bold;
        border-bottom: 1px solid #CFCFCF;
        color: #6D6D6D;
    }

    .data_titel div {
        flex: 1;
    }

    .btn_ju {
        width: 100%;
        height: 0.5rem;
        background-color: #f7f7f7;
    }

    #data_list {
        /*margin-top: 2.25rem;*/
    }

    .data_list {
        width: 100%;
        height: 3rem;
        display: flex;
        background: #fff;
        padding: 0rem 5%;
        text-align: center;
        line-height: 3rem;
        font-size: 0.8rem;
        font-weight: 500;
        border-bottom: 1px solid #CFCFCF;
        color: #6B6B6B;
        position: relative;
    }

    .data_list div {
        flex: 1;
        color: #6B6B6B;
    }

    .data_list span {
        display: block;
        position: absolute;
        right: 1rem;
        height: 3rem;
        line-height: 3rem;
    }

    .data_list .chengong {
        color: #FE0F18;
    }

    .data_list .shibai {
        color: #B0B0B0;
    }

    .all_bets_right {
        content: '';
        width: 0.5rem;
        right: 1rem;
        height: 0.5rem;
        position: absolute;
        top: 50%;
        margin-top: -0.2rem;
        background: transparent;
        border: 1px solid #c5c0c0;
        border-top: none;
        border-right: none;
        z-index: 2;
        -webkit-border-radius: 0;
        border-radius: 0;
        -webkit-transform: rotate(-135deg);
        transform: rotate(-135deg);
    }
</style>
