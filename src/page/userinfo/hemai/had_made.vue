<template>
    <div class="fbg">
        <header class="aui-bar aui-bar-nav" id="aui-header">
            <a class="aui-btn aui-pull-left" tapmode @click="bake()">
                <span class="aui-iconfont aui-icon-left"></span>
            </a>
            <!-- <div class="aui-title">我定制的用户</div> -->
                  <div class="aui-title"><span :class="active == '0'?'title-actives':''" @click='tab(0)'>我定制的</span><span :class="active == '1'?'title-actives':''" @click='tab(1)'>定制我的</span></div>

                  <div class="aui-pull-right" @click="selects()" tapmode>
                      <span class="aui-font-size-16">筛选</span>
                  </div>
            <!-- <div class="aui-pull-right" @click="to_dinzi()">
                <span class="aui-font-size-16">助手</span>
            </div> -->
        </header>
        <div class="record_titel" id="record_titel" >
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

        <div id="app" v-cloak v-if='isShuaxin'>

            <!-- <div class="helper" id="helper">
                <span class="layer" onclick="close_layer()"></span>
            </div> -->


           <!--  <mt-loadmore @top-status-change="handleTopChange" :top-method="loadTop" :bottom-method="loadBottom"
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
                <div class="minto_vh aui-refresh-content">


                    <!-- <div v-if="dataslength" class="londNull">
                        <img src="../../../assets/userinfo/yiyiyi.png">
                        <p>还没有定制用户…</p>
                    </div> -->
					<lini-page v-if="dataslength" :prompt='"暂无定制用户..."' :zheight='"100vh"' :zwidth='"100%"'  :tpyes="'record'"></lini-page>
                    <div v-for="(item,index) in data_data" class="moto_vh">
                        <ul :data-id="item.id" class="lists" v-if="item.state=='RUNNING'">
                            <li class="list">
                                <img class="image" :src="img_src(item.lottery)" alt="">
                                <div class="middle">
                                    <span class="phone">{{(item.sponsorUserName).replace(/(\d{3})(\d{8})/, '$1********')}}</span>
                                    <span class="date">{{((item.followCreateTime).split(" ", 2))[0]}}</span>
                                    <span class="date">{{((item.followCreateTime).split(" ", 2))[1]}}</span>
                                </div>
                                <div class="right">
                                   <div class="box_xo">
                                        <span v-if="item.types=='FUND'" class="right_name">跟单金额</span>
                                    <span v-if="item.types == 'FUND'" class="head_money">￥{{item.followCost}}</span>
                                   </div>
                                    <div class="box_xo">
                                         <span v-if="item.types == 'PERCEND'" class="right_name">跟单比例</span>
                                        <span v-if="item.types == 'PERCEND'" class="head_money">{{item.perFollow}}</span>
                                   </div>
                                    <div class="button">
                                        <div class="item">
                                            <span class="button_name" @click="disables_data(index,item)">查看</span>
                                            <img :class="strshow[index].ckshow?'rotate':''" class="down_icon" src="../../../assets/userinfo/triangle.png"
                                                alt="">
                                        </div>
                                        <div class="item blue">
                                            <span class="button_name" @click="set_data(index,item)">设定</span>
                                            <img :class="strshow[index].sdshow?'rotate':''" class="down_icon" src="../../../assets/userinfo/triangle.png"
                                                alt="">
                                        </div>
                                        <div class="item gray" :data-id="item.id" @click="quit(item.id)">
                                            <span class="button_name ">取消</span>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <div class="scale" :class="[strshow[index].ckshow||strshow[index].sdshow ? ' ':'dis-no']">

                                <div class="select">
                                    <!-- <span class="scale_text type">类型：</span> -->


                                    <span :class="item.type == 'FUND'?'active':''" @click='setType(item,"FUND")' v-show="!item.disable" class="scale_text select_two">按金额定制</span>
            <span :class="item.type == 'FUND'?'active':''" class="scale_text select_two" v-show="item.disable" >按金额定制</span>


                                    <span :class="item.type == 'PERCEND'?'active':''" @click='setType(item,"PERCEND")' v-show="!item.disable" class="scale_text select_two">按比例定制</span>
                                                <span :class="item.type == 'PERCEND'?'active':''" class="scale_text select_two" v-show="item.disable">按比例定制</span>

                                </div>
                                <div class="number">
                                    <span class="scale_text">被跟单人：</span>
                                    <span class="scale_text">{{(item.sponsorUserName).replace(/(\d{3})(\d{8})/, '$1********')}}</span>
                                </div>
                                <div class="less_money">
                                    <span class="scale_text">余额限定：</span>
                                    <span class="scale_text">当用户余额≤</span>

                                    <input v-model="xzmoney" class="input" :class="[strshow[index].inputcls ? 'first ':'gray']"
                                        name="" :disabled="strshow[index].inputkz" type="text">
                                    <span class="scale_text">元时不进行自动购买</span>
                                </div>
                                <div class="number" style="margin-bottom: 0px;">
                                    <span class="scale_text">跟单数量：</span>
                                    <input v-model="item.followNum" ref="followNum" class="input" :class="[strshow[index].inputcls ? 'second ':'gray']"
                                        name="" :disabled="strshow[index].inputkz" name="" type="text">
                                </div>
                                <span class="only desc">(本规则每天跟单的上限数量)</span>

                                <div class="number" style="margin-bottom: 0px;">
                                    <span class="scale_text">跟单彩种：</span>
                                    <span class="scale_text">{{item.lotteryPlay}}</span>
                                </div>
                                <span class="only desc">(跟单的彩种)</span>

                                <div class="number" style="margin-bottom: 0px;">
                                    <span class="scale_text">跟单<span class="scale_text change_text">{{item.type == 'PERCEND'?'比例':item.type == 'FUND'?'金额':''}}</span>：</span>


                                   <!--  <input class="input " name="" v-if='item.followPercent >= 0' v-model="item.followPercent" :class="[strshow[index].inputcls ? 'third ':'gray get_money']"
                                        name="" :disabled="strshow[index].inputkz" type="text"> -->
                                     <input class="input " name=""  v-model="item.perFollow" :class="[strshow[index].inputcls ? 'third ':'gray get_money']"
                                        name="" :disabled="strshow[index].inputkz" type="text">
                                    <span class="scale_text change_symbol">{{item.type == 'PERCEND'?'':item.type == 'FUND'?'元':''}}</span>
                                </div>
                                <span class="only desc" v-if="item.type == 'FUND'">(每个方案跟单金额)</span>
                                <span class="only desc" v-if="item.type == 'PERCEND'">(每个方案跟单比例)</span>

                                <input v-show="strshow[index].sdshow" class="input_button" type="button" name="" value="保存跟单"
                                    :data-id="item.id" @click="submit(index, item)">
                            </div>
                        </ul>
                    </div>
        <p class="nomore" v-if='nodata'>没有更多数据了...</p>
                </div>
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
        replace,
        TypeCapitalconversionLowercase
    } from "../../../js/common";

    export default {
        data() {
            return {
                title:sessionStorage.getItem('selected')?JSON.parse(sessionStorage.getItem('selected'))[0]:'全部彩种',
                isshow:false,
                active:'0',
                isShuaxin:true,
                auiScroll:true,
                topStatus: '',
                allLoaded: false,
                nodata:false,
                bottomStatus: '',
                show:'0',
                val:'',
                data_data: [],
                dataslength: false,
                item_data: {
                    input_less_money: 0,
                },
                orderid: null,
                xzmoney: '',
                xznumber: '',
                strshow: [],
                sort:"1",
    //             0 createTime lastmodifytime //时间
    // 1 followCost      //单方案定制金额
    // 2 followPercent //按照比例
                content: {
                    status: null
                },
                tab_noto: [{
                    'id': 1,
                    'state': true,
                    'sort':'desc',
                    'name': '按金额'
                }, {
                    'id': 2,
                    'sort':'desc',
                    'state': false,
                    'name': '按比例'
                }, {
                    'id': 0,
                    'sort':'desc',
                    'state': false,
                    'name': '按时间'
                }],
                userid: 0, //查询类型
                size: '9999999',
                page: 0,
                pupudz_show: false,
                sort_or: "desc",
                oderid: '',
                imgs: {
                    'SSQ': 'ssq',
                    'WELFARE3D': 'welfare3d',
                    'PL': 'pl5',
                    'PL3': 'pl3',
                    'PL5': 'pl5',
                    'DCZC': 'bjdc',
                    'SEVEN': 'seven',
                    'SFZC': 'sfzc',
                    'LCZC': 'lcbqc',
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
                isQh:true,
                goPage:''
            }
        },
        filters: {

            replace(str) {

                return replace(str);
            }

        },
        created() {
            console.log(this.$route.query)
            this.goPage = this.$route.query.goPage
            this.oderid = this.$route.query.oderid;
            console.log(this.oderid);
            let uid = getCookie('newData');
            if (!uid) {
                this.$router.push({
                    name: 'login'
                })
                return false;
            }
            var userId = getCookie('newData').userid;
            this.userid = getCookie('newData').userid 
            var data = [];
            data["userId"] = userId;
            this.orderid = this.$route.params.id;
            Indicator.open('加载中');
            this.getMyFollowList(userId);
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
                // 
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
                // that.$ajax.defaults.timeout  =  49527;//49527这个值控制没有showLonding
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
                    this.getMyFollowList(userId);
                }
            },
              tab:function(ops){
                    sessionStorage.removeItem('selected')
                  if(!this.isQh){
                    return
                  }
                  this.active = ops;
                  if(ops == 1){
                    
                    this.$router.push({
                        path: '/userinfo/hemai/hadnot_made',
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
            setType:function(item,types){
              item.type = types
              // this.val = item.followCost?item.followCost:item.followPercent
              // alert(this.val)
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
            },
            close_layer:function(){
                this.nodata = false;
                this.isshow=false
                this.data_data = [];
                this.page = 0;
                var userId = getCookie('newData').userid;
                this.getMyFollowList(userId);

            },
            loadTop() {
                // this.datas = [];
                this.page = 0;
                this.nodata = false;
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
                this.orderid = null;
                // this.data_data = [];
                this.getMyFollowList(userId);
                // setTimeout(() => {
                    // this.$refs.loadmore.onTopLoaded();
                // }, 2000)

                // 加载更多数据

            },
            handleTopChange(status) {
                this.topStatus = status;
            },
            loadBottom() {
                this.page++
                // console.log(this.page++)
                var userId = getCookie('newData').userid;
                this.orderid = null;
                this.getMyFollowList(userId);

                // setTimeout(() => {
                //     this.$refs.loadmore.onBottomLoaded();
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
                    })
                } else {
                    sessionStorage.removeItem('selected')
                    this.$router.push({
                        path: '/userinfo/hemai/hadnot_made',
                    })
                }

            },
            bake: function() {
                sessionStorage.removeItem('selected')
                console.log(this.$router)
                // this.$router.push({
                //     path:'/userinfo/hemai/hemai_hot'
                // })
                this.$router.go(this.goPage); //根据浏览器记录返回上一次
            },
            img_src: function(type) {
                return require('../../../assets/userinfo/' + this.imgs[type] + '.png');
            },
            disables_data: function(index,item) {
                item.disable = 'disable'
                console.log(item)
                for (var i = 0; i < this.strshow.length; i++) {
                    this.strshow[i].sdshow = false;
                    this.strshow[i].inputcls = false;
                    this.strshow[i].disable = false;
                    this.strshow[i].inputkz = false;
                }
                if (this.strshow[index].ckshow) {
                    console.log(1)
                    this.auiScroll = true
                    this.strshow[index].ckshow = false;
                    this.strshow[index].disable = false;
                    this.strshow[index].sdshow = false;
                    this.strshow[index].inputkz = false;
                } else {
                    // 					for (var i = 0; i < this.strshow.length; i++) {
                    // 						if (this.strshow[i].ckshow == this.strshow[index].ckshow) {
                    // 							this.strshow[i].ckdshow = true;
                    // 						} else {
                    // 							this.strshow[i].ckshow = false;
                    // 						}
                    // 					}
                    console.log(2)
                    this.auiScroll = false

                    this.strshow[index].inputkz = true;
                    this.strshow[index].sdshow = false;
                    this.strshow[index].ckshow = true;
                    this.strshow[index].disable = true;

                }
                console.log(JSON.stringify(this.strshow[index]));
            },
            set_data: function(index,item) {
                item.disable = ''
                console.log(index);
                for (var i = 0; i < this.strshow.length; i++) {
                    this.strshow[i].ckshow = false;
                }
                if (this.strshow[index].sdshow) {
                    this.strshow[index].sdshow = false;
                    this.strshow[index].inputkz = true;
                    this.strshow[index].inputcls = false;
                    this.strshow[index].disable = false;
                } else {

                    // 					for (var i = 0; i < this.strshow.length; i++) {
                    // 						if (this.strshow[i].sdshow == this.strshow[index].sdshow) {
                    // 							this.strshow[i].sdshow = true;
                    // 						} else {
                    // 							this.strshow[i].sdshow = false;
                    // 						}
                    // 					}
                    this.strshow[index].sdshow = true;
                    this.strshow[index].inputkz = false;
                    this.strshow[index].inputcls = true;
                    this.strshow[index].disable = true;
                    this.auiScroll = false
                }
                console.log(JSON.stringify(this.strshow));
            },
            tab_notoli: function(index,item) {
                if(!this.isQh){
                    return
                }
                this.nodata = false;
                if (index == 0) {
                    this.sort_or = 'DESC';
                    this.page = 0;
                } else if (index == 1) {
                    this.sort_or = 'asc';
                    this.page = 0;
                } else if (index == 0) {
                    // this.isshow = true
                    // this.sort_or = 'DESC';
                    // this.page = 0;
                    // this.$router.push({
                    //     name: 'select'
                    // })
                    // return false;
                    this.sort_or = 'DESC';
                    this.page = 0;
                }
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
                this.data_data = [];
                var data = [];

                data["userId"] = userId;
                Indicator.open('加载中');
                this.getMyFollowList(userId);
                Indicator.close();
            },
            quit: function(id) {
                console.log(id)
                let uid = getCookie('newData');
                if (!uid) {
                    this.$router.push({
                        name: 'login'
                    })
                    return false;
                }
                var userId = getCookie('newData').userid;
                var data = [];
                data["userId"] = userId;

                data["orderId"] = id;
                var datas = this.Qs.stringify({
                    data
                }, {
                    allowDots: true
                });
                MessageBox.confirm('您确定取消定制吗？', '温馨提示').then(action => {
                    this.$ajax.post('/caipiaoshouye/index.php/home/index/cancelFollowSetting',
                            datas
                        )
                        .then(res => {
                            var content = JSON.parse(res.data.content);
                            console.log(JSON.stringify(content));
                            if (res.data.status == 200) {
                                let uid = getCookie('newData');
                                if (!uid) {
                                    this.$router.push({
                                        name: 'login'
                                    })
                                    return false;
                                }
                                var userId = getCookie('newData').userid;
                                var data = [];
                                data["userId"] = userId;
                                // Indicator.open('加载中');
                                this.data_data = [];
                                this.page = 0
                                this.nodata = false;
                                this.getMyFollowList(userId);
                                // Indicator.close();
                            } else if (res.data.status == 500) {

                                Toast('服务器异常，请稍后重试！')
                            }

                        })
                        .catch(err => {
                            console.log(err);
                        })
                });
            },
            getMyFollowList: function(userid, oderid) {
                this.nodata = false;
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
                this.$ajax.post('/caipiaoshouye/index.php/home/index/getMyFollowList',
                        datas
                    )
                    .then(res => {
                        var that = this;
                        this.dataslength = false
                        console.log(res)
                        var content = JSON.parse(res.data.content);
                        console.log(JSON.stringify(content));
                        if (res.data.status == 200) {
                            this.auiScroll = true
                            if (content.code == 100000) {
                                if(this.page == 0){
                                    this.data_data = []
                                }
                                var datascr = [];
                                var datascrs = content.data.content;
                                for (let i = 0; i < datascrs.length; i++) {
                                    if (datascrs[i].state != 'STOPED') {
                                        datascr.push(datascrs[i])
                                    }
                                }
                                var selected = getSession("selected");
                                // console.log(selected);
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
                                        this.auiScroll = false
                                        if(this.page == 0){
                                            this.nodata = false;
                                        }else{
                                            this.nodata = true;
                                        }
                                        // Toast('没有更多数据了！')
                                    }
                                    var lists_data = [];
                                     for (var i = 0; i < new_data.length; i++) {
                                    if (new_data[i].state == 'RUNNING') {
                                      new_data[i].showBox=false;
                                      new_data[i].disable=false;
                                      new_data[i].types=new_data[i].type;
                                      lists_data.push(new_data[i]);
                                    }
                                  }
                                    this.data_data = this.data_data.concat(lists_data);
                                } else {
                                    if (datascr.length < 1) {
                                        this.allLoaded = true;
                                        // Toast('没有更多数据了！')
                                        this.auiScroll = false
                                        if(this.page == 0){
                                            this.nodata = false;
                                        }else{
                                            this.nodata = true;
                                        }
                                    }
                                    var lists_data = [];
                                  for (var i = 0; i < datascr.length; i++) {
                                    if (datascr[i].state == 'RUNNING') {
                                      datascr[i].showBox=false;
                                      datascr[i].disable=false;
                                      datascr[i].types=datascr[i].type;
                                      lists_data.push(datascr[i]);
                                    }
                                  }
                                    this.data_data = this.data_data.concat(lists_data);
                                }


                                console.log(this.data_data);

                                if (this.data_data == 0) {
                                    this.dataslength = true;
                                } else {
                                    this.dataslength = false;
                                }
                                this.strshow = [];


                                for (var i = 0; i < this.data_data.length; i++) {
                                    if (this.data_data[i].id == this.orderid) {
                                        this.strshow.push({
                                            ckshow: true,
                                            sdshow: false,
                                            inputkz: true,
                                            inputcls: false,
                                            disable: false,

                                        })
                                    } else {
                                        this.strshow.push({
                                            ckshow: false,
                                            sdshow: false,
                                            inputkz: false,
                                            inputcls: false,
                                            disable: false,

                                        })
                                    }

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
            submit: function(index, item) {

                var data = [];
                console.log(JSON.stringify(item));
                var autoFollowOrder = [];
                autoFollowOrder["id"] = item.id;
                autoFollowOrder["sponsorUserId"] = item.sponsorUserId;
                autoFollowOrder["sponsorUserName"] = item.sponsorUserName;
                autoFollowOrder["lottery"] = item.lottery;
                autoFollowOrder["type"] = item.type;
                // alert(item.perFollow+"/"+parseInt(item.perFollow))
                autoFollowOrder["value"] = parseInt(item.perFollow);
                autoFollowOrder["followUserMaxCount"] = item.followNum;
                autoFollowOrder["followUserMinremainMoney"] = this.xzmoney;
                data["autoFollowOrder"] = autoFollowOrder;
                let uid = getCookie('newData');
                if (!uid) {
                    this.$router.push({
                        name: 'login'
                    })
                    return false;
                }

                var userId = getCookie('newData').userid;
                data["userId"] = userId;
                console.log(data)
                var datas = this.Qs.stringify({
                    data
                }, {
                    allowDots: true
                });

                if (item.followNum <= 0) {
                    Toast('跟单数量不能小于1个');
                    return;
                } else if (item.perFollow == "") {
                    if (item.type == 'PERCEND') {
                        Toast('请填写跟单比例');
                    } else {
                        Toast('请填写跟单金额');
                    }
                    return;
                }
                console.log(data)
                this.$ajax.post('/caipiaoshouye/index.php/home/index/updateFollowSetting',
                        datas
                    )
                    .then(res => {
                        var content = JSON.parse(res.data.content);
                        console.log(JSON.stringify(content));
                        if (res.data.status == 200) {
                            if (content.code == 100000) {
                                Toast('更改成功！');
                                Indicator.open('加载中');
                                this.data_data = [];
                                this.page = 0
                                this.nodata = false;
                                this.getMyFollowList(userId);
                                Indicator.close();
                            } else if (content.code == 201002) {
                                Toast('更改失败！');
                            }
                        } else if (res.data.status == 500) {

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
    body {
        background: #f2f2f2 !important;
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
        bottom: 0rem;
      }
    .fbg {
        background: #f2f2f2 !important;
        min-height: 100.1%;
        width: 100%;
        position: absolute;
    }

    header {
        position: fixed !important;
    }

    .minto_vh {
        min-height: 65vh;
        width: 100%;
    }

    #app {
        padding-top: 5rem;

        min-height: 100vh;
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
    .box_xo{

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
    .span {
        font-size: .7rem;
        padding: 0px !important;
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
        /*font-weight: bold;*/

    }
    .tapmode{
        margin: 0px 8% !important;
    }
    .record_titel>div:nth-child(2) {
        /*background-image: url(../../../assets/userinfo/arr_01.png);*/
        background-repeat: no-repeat;
        background-size: .5rem .7rem;
        background-position: 4.3rem;
    }

    .record_titel>div:nth-child(3) {
        /*background-image: url(../../../assets/userinfo/arr_01.png);*/
        background-repeat: no-repeat;
        background-size: .5rem .7rem;
        background-position: 4.3rem;
    }

    .record_titel div:nth-child(2) {
        margin: 0 .2rem;
    }

    .record_titel .active {
        color: #03A9F4;
        border-bottom: #03A9F4 2px solid;
    }

    .lists {
        background-color: #f2f2f2;
        margin-bottom: 0.3rem;
        /*padding: 0 2%;*/
    }

    /* .lists>li:nth-child(1){
	margin-top: 0.5rem;
} */

    .list {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 2% 2%;
        padding-bottom: 3%;
        /*margin-bottom: 0.3rem;*/
        background-color: white;

    }

    /*.list.active {
      border-bottom: 1px dashed #a7a7a7;
    }*/
    .image {
        width: 15%;
        height: 15%;
        display: inline-block;
    }

    .middle {
        display: flex;
        flex-direction: column;
    }

    .phone {}

    .date,
    .right_name {
        color: #999;
        font-size: 0.6rem;
    }

    .right {
        display: flex;
        flex-direction: column;
    }

    .right_name {
        color: #999;
        font-size: 0.6rem;
        font-weight: bold;
    }

    .head_money {
        margin: 0.1rem 0;
    }

    .button {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .item {
        height: 1.5rem;
        background-color: #FDC10A;
        color: white;
        line-height: 1.5rem;
        text-align: center;
        font-size: 0.6rem;
        margin-right: 0.3rem;
        width: 2.2rem;
    }

    .dis-no {
        display: none;
    }

    .blue {
        background-color: rgb(94, 163, 235);
    }

    .gray {
        background-color: rgb(195, 195, 195)
    }

    .down_icon {
        width: 14%;
        display: inline-block;
        transform: rotate(180deg);
    }

    .down_icon.rotate {
        transform: rotate(0deg);
    }

    .scale {
        background-color: #fff;
        padding-top: 1rem;
        padding-left: 4%;
        border-top: 1px dashed #a7a7a7;
        padding-bottom: 1rem;

    }

    .select {
        margin-left: -1rem;
    }

    .less_money,
    .number {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .number,
    .select,
    .money,
    .less_money {
        margin-bottom: 0.6rem;
    }

    .select_name {
        font-size: 0.6rem;
        color: #999;
        border: 1px solid #999;
        width: 3.5rem;
        text-align: center;
    }

    .input {
        width: 25% !important;
        height: 1rem !important;
        background-color: white !important;
        border: 1px solid #a7a7a7 !important;
        color: #999 !important;
        font-size: 0.6rem !important;
        line-height: 1rem !important;
        outline: 0px;
        text-align: center;
        -webkit-appearance: none;

    }

    .input::-webkit-input-placeholder {
        color: #999;
        font-size: 0.6rem;
    }

    .scale_text {
        font-size: 0.6rem;
    }

    .only {
        display: block;
        font-size: 0.6rem;
        color: #999;
        margin-top: .2rem;
        margin-left: 2.8rem;
        margin-bottom: 0.6rem;
    }

    .select_two {
        display: inline-block;
        color: #999;
        border: 1px solid #a7a7a7;
        padding: 0.2rem;
        background-color: white;
        width: 30%;
        text-align: center;
        margin-left: 2.5rem;
        margin-right: 0;
    }

    .select_two.active {

        border: 1px solid #f00;
        background-image: url(../../../assets/userinfo/select_red.png);
        background-size: 1rem 108%;
        background-repeat: no-repeat;
        background-position: 100% 100%;
        background-size: 13px 13px;
        color: #f60;
    }

    .input_button {
        background-color: #E45869;
        color: white;
        width: 80%;
        margin-left: 7%;
        height: 2.5rem;
        border-radius: 0.3rem;
        font-weight: bold;
        outline: 0px;
        -webkit-appearance: none;
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

    .input.gray {
        background-color: #ddd !important;
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

    .faill span,
    .lessOne span,
    .inputMoney span {
        width: 50%;
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
        /*background: #E45869 !important;*/
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
        border-radius: 0.4rem;
        color: #fff;
        height: 2rem;
        outline: 0px;
        -webkit-appearance: none;
        margin-top: .5rem;
        margin-bottom: 0rem;
        z-index: 100;
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
</style>
