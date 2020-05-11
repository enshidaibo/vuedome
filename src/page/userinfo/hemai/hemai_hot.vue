<template>
    <div class="bgfff">
        <header class="aui-bar aui-bar-nav" id="aui-header">
            <a class="aui-btn aui-pull-left" tapmode @click="bake()">
                <span class="aui-iconfont aui-icon-left"></span>
            </a>
                    <div class="aui-title"><span :class="active == '0'?'title-actives':''" @click='tab(0)'>合买红人</span><span :class="active == '1'?'title-actives':''" @click='tab(1)'>所有发起人</span></div>

            <!-- <div class="aui-title">合买红人</div> -->
            <div class="aui-pull-right" @click="to_dinzi()">
                <span class="aui-font-size-16">定制</span>
            </div>
        </header>

        <div class="aui-searchbar searches" id="search">
            <div class="aui-searchbar-input aui-border-radius search_input" tapmode>
                <i class="aui-iconfont aui-icon-search"></i>
                    <input type="text" placeholder="搜索合买发起人" v-model="search_input" id="search_input" maxlength="11"
                        v-on:keyup="search_inputclic($event)"  >
            </div>
        </div>
 <!-- v-show='isShow' -->
        <div class="nav" id="tab">

            <div v-for="(d,index) in tab_redod" class="aui-tab-item tapmode item"  @click="tabtimeon(index,d)">
                
                <div :class="show == index?'span actives':'span'">
                  <span class="record">{{d.name}}</span>
                    <div class="triangle" id="hot-record">
                        <span :class="d.sort == 'desc'?'triangle_border_up border_active':'triangle_border_up'"></span>
                        <span :class="d.sort == 'asc'?'triangle_border_down border_active1':'triangle_border_down'"></span>
                    </div>
                </div>  
                <!-- <span class="record">{{d.name}}</span> -->
                
            </div>


        </div>

        <div class="helper" id="helper">
            <div class="main">
                <span class="triangle_min"></span>
                <span class="had_made" onclick="had_made()">我定制的用户</span>
                <span class="hadnot_made" onclick="hadnot_made()">定制我的用户</span>
            </div>
        </div>
        <div class="helper" id="helper">
            <span class="layer" onclick="close_layer()"></span>
        </div>
        <div class="aui-refresh-content" :class='isShow?"aui-refresh-content":"aui-refresh-content tos"'>
            <!-- <mt-loadmore @top-status-change="handleTopChange" :top-method="loadTop" :bottom-method="loadBottom"
                :bottom-all-loaded="allLoaded" :autoFill='false' @bottom-status-change='handleBottomChange' ref="loadmore"> -->
                <!-- <div slot="top" class="mint-loadmore-top">
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
				<!-- <div v-if='!progress_data' class="londNull"><img src="../../../assets/yiyiyi.png">
					<p>还没有合买红人...</p>
				</div> -->
				<lini-page v-if='progress_data.length == 0 && isK == true'  :prompt='tit' :zheight='"100vh"' :zwidth='"100%"'  :tpyes="'record'"></lini-page>
                <ul class="lists" id="app" v-else>
                    <li class="list" :data-id="item.id" @click="hot_details(index)" v-for="(item, index) in progress_data">
                      <div class="left ">
                        <div class="header">
                          <img class="user_icon" src="../../../assets/userinfo/poplo.png" alt="">
                          <!-- <span class="phone">{{(item.userName).replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')}}</span> -->
                          <span class="phone">{{(item.userName).replace(/(\d{3})(\d{4})(\d{4})/, '$1********')}}</span>
                        </div>
                        <ul class="dot">

                        </ul>
                      </div>
                      <ul class="right ">
                        <li class="have_dot">
                          <!-- <span class="low_icon"></span> -->
                          <span class="name">定制人数：</span>
                          <span class="number">{{item.followCount}}人</span>
                        </li>
                        <li class="have_dot">
                          <!-- <span class="low_icon"></span> -->
                          <span class="name">中奖总次数：</span>
                            <span class="number">{{item.allPrizeCount}}次</span>
                         
                        </li>
                          <li class="have_dot">
                            <!-- <span class="low_icon"></span> -->
                             <span class="name">发单次数：</span>
                          <span class="number">{{item.createCount}}次</span>
                          </li>
                          <li class="have_dot">
                            <!-- <span class="low_icon"></span> -->
                            <span class="name">中奖总金额：</span>
                            <span class="number">{{item.allPrizeMoney}}元</span>
                          </li>
                          <li class="have_dot">
                            <!-- <span class="low_icon"></span> -->
                            <span class="name">发单成功率：</span>
                            <span class="number" style="color:#E45869;">{{Math.floor(item.createSuccessCount/(item.createCount == 0?"1":item.createCount)* 100)}}%</span>
                          </li>
                      </ul>
                    </li>


                   <!--  <li class="list" :data-id="item.id" @click="hot_details(index)" v-for="(item, index) in progress_data"
                        :key='index'>
                        <div class="left ">
                            <div class="header">
                                <img class="user_icon" src="../../../assets/userinfo/user_icon01.png" alt="">
                                <span class="phone">{{(item.userName).replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')}}</span>
                            </div>
                            <ul class="dot">
                                <li class="have_dot">
                                    <span class="low_icon"></span>
                                    <span class="name">定制人数：</span>
                                    <span class="number">{{item.followCount}}人</span>
                                </li>
                                <li class="have_dot">
                                    <span class="low_icon"></span>
                                    <span class="name">发单次数：</span>
                                    <span class="number">{{item.createCount}}次</span>
                                </li>
                            </ul>
                        </div>
                        <ul class="right ">
                            <li class="have_dot">
                                <span class="low_icon"></span>
                                <span class="name">发单成功率：</span>
                                <span class="number">{{Math.floor(item.createSuccessCount/item.createCount* 100)}}%</span>
                            </li>
                            <li class="have_dot">
                                <span class="low_icon"></span>
                                <span class="name">中奖总次数：</span>
                                <span class="number">{{item.allPrizeCount}}次</span>
                            </li>
                            <li class="have_dot">
                                <span class="low_icon"></span>
                                <span class="name">中奖总金额：</span>
                                <span class="number">{{item.allPrizeMoney}}元</span>
                            </li>
                        </ul>
                    </li> -->
                </ul>
				
            <!-- </mt-loadmore> -->
        <p v-if='notData' class="nomore">没有更多数据了...</p>
        </div>
        <!-- div v-show="pupudz_show" @click="to_dinzi()" class="mengchen"></div>
        <div v-show="pupudz_show" class="pupudz">
            <ul>
                <li @click="to_dinziwim(1)">我定制的用户</li>
                <li @click="to_dinziwim(2)">定制我的用户</li>
            </ul>
        </div> -->

        <div class="zg" v-if='shows'>
          <span class="jf" @click='hide()'></span>
          <div class='jfBox'>
            <h3>定制选择</h3>
            <ul>
              <li @click="had_made">我定制的用户</li>
              <li @click="hadnot_made">定制我的用户</li>
            </ul>
            <h3 @click='hide()'>取消</h3>
          </div>
        </div>
        <div class="data_no hide"><span>还没有该彩种合买，快去发起一单吧</span></div>
    </div>
</template>

<script>
    import {
        Toast,
        Loadmore,
        Indicator,
        MessageBox
    } from 'mint-ui';
    /* 	import {
    		IsPhone,
    		setSession,
    		getSession,
    		getCookie
    	} from '../../../../static/js/common'; */
    import {
        IsPhone,
        setSession,
        getSession,
        getCookie,
        setCookie,
        TypeCapitalconversionLowercase
    } from "../../../js/common";
    export default {
        data() {
            return {
                shows:false,
                notData:false,
                show:"0",
                topStatus: '',
                allLoaded: false,
                isK:false,
                bottomStatus: '',
                indexs: -1,
                tit:'暂无合买红人...',
                data: [], //总数据
                month_data: {
                    hmPrizeCount: null,
                    allPrizeCount: 0
                },
                progress_data: [],
                sortpx: 0, //查询类型
                userName: '',
                auiScroll: true,
                page: 0,
                search_input: "",
                pupudz_show: false,
                statisticsByLotteryType: [],
                imgs: {
                    'SSQ': 'ssq',
                    'WELFARE3D': 'fc3d',
                    'PL': 'pl5',
                    'PL3': 'pl3',
                    'PL5': 'pl5',
                    'DCZC': 'bjdc',
                    'SEVEN': 'seven',
                    'SFZC': 'sfzc',
                    'LCZC': 'lczc',
                    'SCZC': 'sczc',
                    'DLT': 'dlt',
                    'SDEL11TO5': 'sdel11to5',
                    'JCZQ': 'jczq',
                    'JCLQ': 'jclq',
                    'GDEL11TO5': 'gdel11to5',
                    'BJKLB': 'kl8',
                    'CQSSC': 'cqssc',
                    'XJSSC': 'xjssc',
                    'JXSSC': 'jxssc',
                    'JXEL11TO5': 'jxel11to5',
                    'TJKLSF': 'tjkls',
                    'GDKLSF': 'gdkls',
                    'JSK3': 'jsk3',
                    'AHK3': 'ahk3',
                    'HBK3': 'hbk3',
                    'RXJC': 'rxjc',
                    'HN4J1': 'football',

                },
                tab_redod: [{
                        'id': 1,
                        'sort':"desc",
                        'state': true,
                        'name': '按金额'
                    },
                    {
                        'id': 2,
                        'sort':"desc",
                        'state': false,
                        'name': '按人气'
                    }
                ],
                active:"0",
                order:'desc',
                isQh:true,
                isShow:true
            }
        },
        created() {
            Indicator.open('加载中');
            this.requestData();
            Indicator.close();
        },
        mounted(){
            var that = this;
            var pullToRefreshs = new auiPullToRefresh({ //下拉刷新
                container: document.querySelector('.aui-refresh-content'), //下拉容器
                triggerDistance: 80 //下拉高度
            }, function(ret) {
                if (ret.status == "success") {
                    that.auiScroll = false;
    //              that.imgUrls = [];
    //              that.datas = [];
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
        methods: {
            tab:function(ops){
                if(!this.isQh){
                  return
                }
                this.isK = false
                this.progress_data = []
                if(ops == 0){
                    this.isShow = true
                }else{
                    this.isShow = false
                }
                this.active = ops
                this.userName = ''
                this.isQh = false
                this.loadTop()
               
            },
            had_made:function(){
                this.$router.push({
                        path: '/userinfo/hemai/had_made',
                    })
            },
            hadnot_made:function(){
                this.$router.push({
                        path: '/userinfo/hemai/hadnot_made',
                    })
            },
            hide:function(){
              this.shows = false
            },
            loadTop() {
                // this.datas = [];
                this.page = 0;
                this.notData = false
                this.requestData();
                // setTimeout(() => {
                //     this.$refs.loadmore.onTopLoaded();
                // }, 2000)

                // 加载更多数据

            },
            handleTopChange(status) {
                this.topStatus = status;
            },
            loadBottom() {
                if(this.progress_data.length != 0){
                    this.page++
                }
                // console.log(this.page++)

                this.requestData();
                // setTimeout(() => {
                //     this.$refs.loadmore.onBottomLoaded();
                // }, 2000)
            },
            handleBottomChange(status) {
                // console.log(status)
                this.bottomStatus = status;
            },
            to_dinzi: function() {
                this.$router.push({
                        path: '/userinfo/hemai/had_made',
                        query:{
                            goPage:'-1'
                        }
                    })
                return
                if (this.shows) {
                    this.shows = false;
                } else {
                    this.shows = true;
                }
            },
            to_dinziwim: function(index) {
                if (this.pupudz_show) {
                    this.pupudz_show = false;
                } else {
                    this.pupudz_show = true;
                }
                if (index == 1) {
                    this.$router.push({
                        path: '/userinfo/hemai/had_made',
                    })
                } else {
                    this.$router.push({
                        path: '/userinfo/hemai/hadnot_made',
                    })
                }

            },
            tabtimeon: function(index,item) {
                this.show = index
                console.log(index);
                this.allLoaded = false
                this.isK = false;
                this.progress_data = []; 
                item['sort'] == 'desc'?item['sort'] = 'asc':item['sort'] = 'desc';
                for (var n = 0; n < this.tab_redod.length; n++) {
                    this.tab_redod[n].state = false;
                }
                this.tab_redod[index].state = true;
                this.page = 0;
                this.sortpx = index;
                console.log(this.tab_redod[index])
                this.order = item['sort']
                Indicator.open('加载中');
                this.loadTop();
                Indicator.close();
            },
            search_inputclic: function(e) {
                this.userName = this.search_input;
                console.log(e.keyCode);
                if(e.keyCode == 13){
                    // this.sortpx = 0;
                    this.page = 0;
                    this.notData = false
                    this.requestData();
                }
                // 				if (this.userName.length != 11) {
                // 					return;
                // 				}
                // 				if (!IsPhone(this.userName)) {
                // 					Toast("填写正确的手机号");
                // 					return;
                // 				}
            },
            requestData: function() {
                let uid = getCookie('newData');
                // alert(this.notData)
                if(this.notData){   //没有更多了
                    return
                }
                if (!uid) {
                    this.$router.push({
                        name: 'login'
                    })
                    return false;
                }
                var userId = getCookie('newData').userid;
                var data = [];
                data["userId"] = userId;
                // var data = [];
                // data["userId"] = userId;
                data["userName"] = this.userName;
                data["sort"] = this.sortpx;
                data["size"] = 6;
                data["page"] = this.page;
                data["order"] = this.order;
                console.log(data)
                var datas = this.Qs.stringify({
                    data
                }, {
                    allowDots: true
                });
                if(this.active == 0){
                     this.$ajax.post('/caipiaoshouye/index.php/home/index/getCelebrityList',
                        datas
                    )
                    .then(res => {
                        this.tit = '暂无合买红人...'
                        if(this.page == 0){
                            this.notData = false
                            this.progress_data = [];   
                        }

                        this.isQh = true
                        this.auiScroll = true
                            console.log(res)
                        if (res.data.status == 200) {
                            var content = JSON.parse(res.data.content);
                            console.log(content)
                            if (content.code == 100000) {
                                var datatent = content.data.content;
                                if(content.data != ''){
                                    if(datatent.length == '0' && this.page != 0){
                                        // alert("489:/"+this.progress_data)
                                        if(this.progress_data.lengh != 0){
                                            this.notData = false;
                                            this.page = -1;
                                        }else{
                                            this.notData = true;
                                        }
                                    }else{

                                        this.notData = false;
                                    }
                                }
                               
                                if (this.page > 0 || this.page == -1) {
                                    this.progress_data = this.progress_data.concat(datatent);
                                } else {
                                    this.progress_data = [];
                                    this.progress_data = datatent;
                                    this.notData = false;

                                }
                                        // alert("4:/"+datatent.length)

                                if (datatent.length == 0) {
                                    this.allLoaded = true;
                                    this.auiScroll = false
                                        // this.notData = true;

                                    // Toast('没有更多数据了！')
                                }
                                if(this.progress_data){
                                    this.isK = true;
                                }

                            } else if (content.code == "201010") {
                                Toast("账户已被锁定，请联系客服");
                                setCookie('newData', '', '0-S');
                                this.$router.push({
                                    name: 'login'
                                })
                            }else if(content.code == "200000"){
                                this.isK = true;
                            }
                        } else if (res.data.status == 500) {
                            Toast('服务器异常，请稍后重试！')
                            this.isK = true;
                        }


                    })
                    .catch(err => {
                        console.log(err);
                    })
                }else if(this.active == 1){
                     this.$ajax.post('/caipiaoshouye/index.php/home/index/getSponsors',
                        datas
                    )
                    .then(res => {
                        this.tit = '暂无合买发起人...'
                        if(this.page == 0){
                            this.notData = false
                            this.progress_data = [];   
                        }

                        this.isQh = true
                        this.auiScroll = true


                        console.log(content);
                        
                        if (res.data.status == 200) {
                        var content = JSON.parse(res.data.content);
                            if (content.code == 100000) {
                                var datatent = content.data.content;
                                if(content.data != ''){
                                    if(datatent.length == '0' && this.page != 0){
                                        // alert("489:/"+this.progress_data)
                                        if(this.progress_data.lengh != 0){
                                            this.notData = false;
                                            this.page = -1;
                                        }else{
                                            this.notData = true;
                                        }
                                    }else{

                                        this.notData = false;
                                    }
                                }
                               
                                if (this.page > 0 || this.page == -1) {
                                    this.progress_data = this.progress_data.concat(datatent);
                                } else {
                                    this.progress_data = [];
                                    this.progress_data = datatent;
                                    this.notData = false;

                                }
                                        // alert("4:/"+datatent.length)

                                if (datatent.length == 0) {
                                    this.allLoaded = true;
                                    this.auiScroll = false
                                        // this.notData = true;

                                    // Toast('没有更多数据了！')
                                }
                                if(this.progress_data){
                                    this.isK = true;
                                }

                            } else if (content.code == "201010") {
                                Toast("账户已被锁定，请联系客服");
                                setCookie('newData', '', '0-S');
                                this.$router.push({
                                    name: 'login'
                                })
                            }else if(content.code == "200000"){
                                this.isK = true;
                            }
                        } else if (res.data.status == 500) {
                            Toast('服务器异常，请稍后重试！')
                            this.isK = true;
                        }


                    })
                    .catch(err => {
                        console.log(err);
                    })
                }
               

            },
            hot_details: function(index) {

                var itme = {
                    followCount: this.progress_data[index].followCount,
                    allPrizeCount: this.progress_data[index].allPrizeCount,
                    allPrizeMoney: this.progress_data[index].allPrizeMoney,
                    userName: this.progress_data[index].userName
                };

                setSession('itme', itme);
                console.log(getSession('itme'));
                this.$router.push({
                    path: '/userinfo/hemai/hot_details',
                    query: {
                        id: this.progress_data[index].id,
                    }
                })
            },
            bake: function() {
                this.$router.go(-1); //根据浏览器记录返回上一次
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
      bottom:0rem;
          background: #f2f2f2;
    }
    html {
        background-color: #f2f2f2;
    }

    .bgfff {
        background-color: #f2f2f2;
        min-height: 100vh;
    }

    header {
        position: fixed !important;
    }
    .border_active{
        border-color: transparent transparent #03A9F4 !important;
    }
    .border_active1{
        border-color:#03A9F4 transparent transparent !important;
    }
    .mengchen {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background: rgba(95, 163, 235, 0.5);
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

    .aui-bar-nav {
        height: 2.25rem;
        line-height: 2.25rem;
    }

    .aui-bar-nav .aui-btn {
        height: 2.25rem;
        line-height: 2.25rem;
    }

    .nav {
        padding-bottom: 0 !important;
        display: flex;
        position: fixed;
        top: 4.4rem;
        left: 0;
        width: 100%;
    }

    .mintscrll {
        top: 6.8rem;
        min-height: 95vh;

    }

    .searches {
        background-color: rgb(169, 203, 239);
        position: fixed;
        top: 2.25rem;
        left: 0;
        width: 100%;
        z-index: 3;
    }

    .search_input {
        /*border-radius: 1rem;*/
    }

    .record,
    .renqi {
        margin-right: 2px;
    }

    .nav {
        border-bottom: 3px solid #f2f2f2;
        padding-bottom: 2px;
        background-color: white;
        z-index: 3;
    }

    .item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
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
        top: 2.8rem;
        display: flex;
        flex-direction: column;
        align-items: center;

    }

    .triangle_min {
        width: 0;
        height: 0;
        border-width: 0 8px 10px;
        border-style: solid;
        border-color: transparent transparent rgb(0, 118, 195);
        margin: 0 auto;
        position: relative;
        right: -2.2rem;
    }

    .had_made,
    .hadnot_made {
        width: 7rem;
        height: 2.2rem;
        line-height: 2.2rem;
        background-color: rgb(0, 118, 195);
        border-radius: 0.3rem 0.3rem 0 0;
        color: white;
        font-weight: 600;
        text-align: center;
    }

    .hadnot_made {
        border-radius: 0 0 0.3rem 0.3rem;
        margin-top: 0.05rem;
    }

    .lists {
        display: block;
      background-color: #f2f2f2;
    }

    .list {
        /*display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;*/
      background-color: white;
      margin: 2% 0;
      padding: 3% 3%;
      padding-top: 2%;
    }

    .list:first-child {
        margin-top: 0;
    }

    .left {
        width: 100%;
      /*margin-right: 1rem;*/
      display: block;
    }

    .header {
        display: flex;
        width: 100%;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        border-bottom: 1px #D7DEE0;
        border-style: dashed;
        padding: .3rem 0px;
        padding-bottom: .5rem;
    }

    .user_icon {
        width: 0.65rem;
        height: 0.65rem;
    }

    .phone {
        color: #4A4A4A;
        font-size: .8rem;
        margin-left: 0.2rem;
        /* margin: .3rem .1rem; */
        width: 80%;
        line-height: .8rem;
    }

    .dot {}

    .have_dot {
        display: table;
    width: 50%;
    float: left;
    }
    .have_dot span{
        margin: 0.2rem;
        font-size: .6rem;
        margin-bottom: 0;

    }
    .low_icon {
        width: 0.2rem;
        height: 0.2rem;
        background-color: #999;
        margin-right: 0.5rem;
        margin: .2rem .2rem .2rem 0px;
    }

    .name {
          color: #999;
        font-size: 0.7rem;
        margin: .2rem .2rem .2rem 0px;
        font-weight: normal;
    }

    .number {
        color: #03A9F4;
        font-size: 0.6rem;
        margin: .2rem .2rem .2rem 0px;
        font-weight: normal;

    }

    .right {
        width: 100%;
        display: table;
        /*display: flex;
        flex-direction: column;
        justify-content: center;*/
        padding-top: 1.5%;
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

    #tab .active {
        border-bottom-color: #0076C3;
        color: #0076c3;
        border-bottom: 2px solid #0076C3;
    }
    .span {
        padding: 0px .5rem;
        display: flex;
        align-items: center;
      }
      .actives{
        border-bottom: 2px solid #03A9F4;
        color: #03A9F4;
      }
	.londNull {
			width: 100%;
			height: 100vh;
			box-sizing: border-box;
			padding-top: 4rem;
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
        .zg{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        z-index: 101;
      }
      .jf{
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        top: 0px;
        left: 0px;
      }
      .jfBox{
        position: fixed;
        bottom: 0px;
        left: 0px;
        background: #fff;
        width: 100%;
      }
      .jfBox h3{
        height: 2.5rem;
        line-height: 2.5rem;
        font-size: .8rem;
        color: #999999;
        width: 90%;
        text-align: center;
        margin: 0px auto;
        display: block;
        border-bottom: .5px solid rgba(225, 230, 235, 0.32);
      }
      .jfBox ul{
        display: block;
        width: 100%;
        background: #fff;
      }
      .jfBox ul li{
        width: 90%;
        text-align: center;
        height: 2.5rem;
        line-height: 2.5rem;
        font-size: .8rem;
        margin: .3rem auto;
        color: #4A4A4A;
                border-bottom: .5px solid rgba(225, 230, 235, 0.32);

      }
      .jfBox ul li:active{
        background: #E45869;
        color: #fff;
      }
      .jfBox h3:nth-of-type(2){
        background: #EBEBEB;
        color: #4a4a4a;
        height: 2.5rem;
        line-height: 2.5rem;
        width: 100%;
        border-bottom: 0px;
        font-size: .8rem;
      }
      .aui-refresh-content{
        top: 7rem;
      }
      .aui-title{
          border: 1px solid #fff;
          color: #fff;
        }

        .aui-title span{
            float: left;
            /* padding: 0px 1rem; */
           /* height: 1.23rem;
            line-height: 1.23rem;*/
            font-size: .7rem;
            width: 50%;
            display: table;
            position: absolute;
            height: 100%;
            line-height: 1.2rem;
            bottom: -1px;
        }
         .aui-title span:nth-of-type(1){
            left: 0px;

         }
         .aui-title span:nth-of-type(2){
            /*left: 50%;*/
            right:-1px;
         }
        .title-actives{
            color: #03A9F4;
            background: #fff;
            border: 1px solid #fff;
        }
        .aui-bar-nav .aui-title{
            background: none;
           border-radius: 1rem;
            width: auto !important;
            border: 1px solid #fff;
            color: #fff;
            min-height: 1.25rem !important;
            left: 4rem !important;
            margin: .5rem auto!important;
            position: fixed;
            right: 4rem;
            left: 0rem;
            margin: 0;
            height: 1.35rem;
            line-height: 1.24rem;
            overflow:hidden;
        }
        /*.tos{
            top: 4.6rem !important;
        }*/
</style>
