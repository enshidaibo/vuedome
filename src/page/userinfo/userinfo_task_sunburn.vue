<template>
    <div>
        <!-- <nav-bar title="我的晒单"></nav-bar> -->
        <header class="aui-bar aui-bar-nav">
            <div class="aui-pull-left aui-btn">
                <span class="aui-iconfont aui-icon-left" @click="OncloseWin()"></span>
            </div>
            <div class="aui-title">我的晒单</div>
            <div class="aui-pull-right aui-btn">
                <span id="screen" @click="screen()"><img src="../../assets/task/day.png" alt="" ></span>
            </div>
        </header>

        <div class="userinfo_task_sunburn">
            <div class="userinfo_task_sunburn_tab" id="task_sunburn">
                <div :class="[ 'task_sunburn_tab_item',  {'sunburn_tab_active':statusTwo}]" id='wei' data-type=0 @click="changeSunburn(0)">未晒单
                    <span>{{weiShaiDan}}</span></div>
                <div :class="[ 'task_sunburn_tab_item',  {'sunburn_tab_active':statusOne}]" data-type=1 @click="changeSunburn(1)">已晒单<span>{{yiShaiDan}}</span></div>
            </div>
            <!-- <section class="mintscrll"> -->
            <section class="aui-refresh-content">
         
                 
                    <!-- <section class="userinfo_task_sunburn_content"> -->
                    <!-- 切换到已晒，class名active_sunburn_already，未晒class名active_sunburn_not-->
                    <div id="sunburn_list" class="userinfo_task_sunburn_list" v-if='detailEd&&details'>
                        
                        
                        <!--未晒-->
                        <div v-if="sunNoDom" class="sunburn_not" id="sunburn_not">
                           <!-- <div v-if="details.length == 0 " class="londNull">
                                <div v-if="cwsaidan&&cwgoucai">
                                    <img src="../../assets/task/shaidanque.png">
                                    <p class="cwsaidan_p">您没有单晒～</p>
                                    <div class="cwsaidan_div" @click="goucaiopen()">首次购彩成功即可获得<span>1.88元</span></div>
									  <div class="cwsaidan_div" @click="goucaiopen">
									    立即购彩
									</div>
                                </div>
                                  <div v-else-if="cwsaidan">
                                    <img src="../../assets/task/shaidanque.png">
                                    <p class="cwsaidan_p">您没有单晒～</p>
									  <div class="cwsaidan_div" @click="goucaiopen">
									    立即购彩
									</div>
                                </div>
                                <div  v-else-if="dataslength">
                                    <img src="../../assets/task/shaidanque.png">
                                    <p>还没有晒单记录…</p>
									  <div class="cwsaidan_div" @click="goucaiopen">
									    立即购彩
									</div>
                                </div>
                            </div> -->
                            <lini-page v-if="details.length == 0 &&cwsaidan"  :goText='"立即购彩"' @tonewpage='goucaiopen'  :prompt='"您没有单晒..."' :zheight='"100vh"' :zwidth='"100%"'  :tpyes="'record'"></lini-page>
                            <lini-page v-else-if="details.length == 0 &&dataslength"  :goText='"立即购彩"' @tonewpage='goucaiopen'  :prompt='"还没有晒单记录..."' :zheight='"100vh"' :zwidth='"100%"'  :tpyes="'record'"></lini-page>
                            <div class="sb_list" v-for='(d,i) in details'>
                                <div class="sb_list_left">
                                    <img :src="imgUrl[i]" />
                                    <div>
                                        <p>{{d.shareType|payType()}} {{d.schemeCost}}元</p>
                                        <p>{{d.betTime|capitalize()}}</p>
                                    </div>
                                </div>
                                <div class="sb_list_right" v-if='detailEd&&details'>
                                    <div class="bs">
                                         <p>￥{{d.canWinMoney}}</p>
                                        <p>可得金额</p>   
                                    </div>
                                    <div class="ss">
                                        <button :id="d.schemeId" :data-shareType="d.shareType" :data-lotteryType="d.lotteryType"
                                            @click="Bask_single(this)" :class="d.schemePrintState=='SUCCESS'?'':'active'">{{d.schemePrintState=='SUCCESS'?'晒单':'未出票'}}</button>
                                    </div>
                                </div>
                            </div>
							<no-more v-show="notInfoOne&&details.length>0" ></no-more>
                            <!-- <p v-if="notInfoOne&&details.length>0" id="not_info_one" class="not_info">没有更多数据了</p> -->
                        </div>

                        <!--已晒-->
                        <div v-if="sunAlyDom" class="sunburn_already" id="sunburn_already">
                            <!-- <div v-if="detailEd.length == 0" class="londNull">
                                <div v-if="cwsaidan&&cwgoucai">
                                    <img src="../../assets/task/shaidanque.png">
                                    <p class="cwsaidan_p">您没有晒单～</p>
                                    <div class="cwsaidan_div" @click="goucaiopen()">首次购彩成功即可获得<span>1.88元</span></div>
									<div class="cwsaidan_div" @click="changeSunburn(0)">
									    立即晒单
									</div>
                                </div>
                                <div v-else-if="cwsaidan">
                                    <img src="../../assets/task/shaidanque.png">
                                    <p class="cwsaidan_p">您没有晒单～</p>
                                    <div class="cwsaidan_div" @click="changeSunburn(0)">
                                        首次晒单成功即可获得<span>1.88元</span>
                                        立即晒单
                                    </div>
                                </div>
                                <div v-else-if="dataslength">
                                    <img src="../../assets/task/shaidanque.png">
                                    <p>还没有晒单记录…</p>
									<div class="cwsaidan_div" @click="changeSunburn(0)">
									    立即晒单
									</div>
                                </div>
                            </div> -->
							<lini-page v-if="detailEd.length == 0 &&cwsaidan"  :goText='"立即购彩"' @tonewpage='goucaiopen'  :prompt='"您没有单晒..."' :zheight='"100vh"' :zwidth='"100%"'  :tpyes="'record'"></lini-page>
							<lini-page v-else-if="detailEd.length == 0 &&dataslength"  :goText='"立即购彩"' @tonewpage='goucaiopen'  :prompt='"还没有晒单记录..."' :zheight='"100vh"' :zwidth='"100%"'  :tpyes="'record'"></lini-page>
                            <div class="sb_list" v-for='(l,index) in detailEd'>
                                <div class="sb_list_left">
                                    <img :src="imgUrlEd[index]" />
                                    <div>
                                        <p>{{l.shareType|payType()}} {{l.schemeCost}}元</p>
                                        <p>{{l.betTime|capitalize()}}</p>
                                    </div>
                                </div>
                                <div class="sb_list_right" v-if='detailEd&&details'>
                                    <div class="">
                                        <p>￥{{l.canWinMoney}}元</p>
                                        <p>所得金额</p>
                                    </div>
                                   <!-- <div class="ysd">

                                    </div> -->
                                </div>
                            </div>		
							<no-more v-show="notInfoTwo&&detailEd.length>0" ></no-more>
								<!-- <p v-if="notInfoTwo&&detailEd.length>0" id="not_info_two" class="not_info">没有更多数据了</p> -->

                        </div>
                    </div>
                    <!-- </section> -->
          
            </section>
            <div v-if="popupVisible" class="maskBox" @click="hidePopup()"></div>
            <div v-if="popupVisible" class="timeDom">
                <p v-for="(item,index) in timeList"  @click="timeChange(index)">{{item}}</p>
				<!-- :class="{'active':num==index}" 用于变红 -->
                <!-- <p>今天</p>
    <p>昨天</p>
    <p>本月</p>
    <p>上月</p>
    <p>全部</p>
    <p>取消</p> -->
            </div>
        </div>

    </div>
</template>
<script>
    import {
        Popup,
        MessageBox
    } from 'mint-ui';
    import {
        getCookie,
        setCookie,
        TypeCapitalconversionLowercase,
        OverallData
    } from '../../js/common.js'
    export default {
        data() {
            return {
                topStatus: '',
                allLoaded: false,
                bottomStatus: '',
                statusOne: false,
                statusTwo: true,
                yiShaiDan: 0,
                weiShaiDan: 0,
                screenText: '全部',
                sunNoDom: true,
                sunAlyDom: false,
                popupVisible: false,
                timeList: ["今天", "昨天", "本月", "上月", "全部", "取消"],
				num:4,
                detailEd: [],
                //有晒单还是没有
                cwsaidan: false,
                cwgoucai: false,
                /*已晒单*/
                imgUrlEd: [],
                details: [],
                /*未晒单*/
                imgUrl: [],
                dataslength: false,
                notInfoOne: false,
                notInfoTwo: false,
                myDateTime: '',
                myTime_y: '',
                myTime_m: '',
                myTime_d: '',
                startTime: '1999-01-01',
                endTime: '',
                yspage: 1,
                wspage: 1,
                page: 1,
                userid: '',
                size: 10,
                ajaxtype: 0,
                auiScroll:true,
            }
        },
        created() {
            let uid = getCookie('newData');
            if (!uid) {
                this.$router.push({
                    name: 'login'
                })
                return false;
            }
            this.userid = uid.userid;
            this.myDateTime = new Date();
            this.myTime_y = this.myDateTime.getFullYear();
            this.myTime_m = this.myDateTime.getMonth() + 1;
            this.myTime_d = this.myDateTime.getDate();
            this.endTime = this.myTime_y + '-' + this.myTime_m + '-' + (this.myTime_d + 1);
            this.getShareLsit();
            this.sgaiDanNum();
        },
        mounted(){
                   var that = this;
            var pullToRefresh = new auiPullToRefresh({ //下拉刷新
                container: document.querySelector('.aui-refresh-content'), //下拉容器
                triggerDistance: 80 //下拉高度
            }, function(ret) {
                if (ret.status == "success") {
                    that.auiScroll = true;
                    that.page = 1;
					that.$ajax.defaults.timeout  =  49527;//49527这个值控制没有showLonding
                    that.sgaiDanNum()
                    setTimeout(() => {
						that.$ajax.defaults.timeout  = 50000;
                        pullToRefresh.cancelLoading(); //刷新成功后调用此方法隐藏
                    }, 1500)
                }
            });
            var scroll = new auiScroll({ //上拉加载
                listen: false, //是否监听滚动高度，开启后将实时返回滚动高度
                distance: 0 //判断到达底部的距离，isToBottom为true
            }, function(ret) {
                if (ret.isToBottom && ret.scrollTop > 0 && that.auiScroll ) {
                    that.auiScroll = false
               
                    setTimeout(() => {
                        console.log(3)                           
                            // that.page++; 
                            console.log(that.yspage)
                            console.log(that.wspage)
                           if(that.ajaxtype=='1'){
                               that.yspage++
                               that.yishaidanlist(that.ajaxtype)
                           }
                           else{
                               that.wspage++
                               that.weishaidanlist(that.ajaxtype)
                           }
                            that.auiScroll = true;
 
                    }, 1000)
                }
            });
        },
		beforeDestroy() {
			this.$ajax.defaults.timeout  = 50000;
			this.auiScroll=false
		},
        filters: {
            payType: function(type) {
                if (type == 'SELF') {
                    return '自购'
                } else {
                    return '合买'
                }
            },
            capitalize: function(matchDate, num) {
                var time = new Date(matchDate);
                var y = time.getFullYear();
                var m = time.getMonth() + 1 >= 10 ? parseInt(time.getMonth() + 1) : "0" + parseInt(time.getMonth() +
                    1);
                var d = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
                var h = time.getHours() >= 10 ? time.getHours() : "0" + time.getHours();
                var mm = time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes();
                var s = time.getSeconds() >= 10 ? time.getSeconds() : "0" + time.getSeconds();
                // var sm=time.getSeconds()=> 10 ? time.getSeconds() : "0" + time.getSeconds();
                var dd = time.getDay();
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
                if (num == 1) {
                    return m + "-" + d + " " + h + ":" + mm + ":" + s;
                } else {
                    return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
                }
            },
        },
        methods: {
            OncloseWin: function() {
                this.$router.go(-1);
            },
//             loadTop() {
//                 // this.datas = [];
//                 if (this.ajaxtype == 1) {
//                     this.yspage = 1;
//                     this.yishaidanlist(this.ajaxtype);
//                 } else {
//                     this.wspage = 1;
//                     this.weishaidanlist(this.ajaxtype);
//                 }
//                 setTimeout(() => {
//                     this.$refs.loadmores.onTopLoaded();
//                 }, 2000)
//                 // 加载更多数据
//             },
            handleTopChange(status) {
                this.topStatus = status;
            },
            loadBottom() {
                // console.log(this.page++)
                this.gettypelist();
                setTimeout(() => {
                    this.$refs.loadmores.onBottomLoaded();
                }, 2000)
            },
            handleBottomChange(status) {
                // console.log(status)
                this.bottomStatus = status;
            },
            //         OncloseWin: function(){
            //             this.$router.go(-1);
            //         },
            gettypelist: function() {
                if (this.ajaxtype == 1) {
                    this.yspage++;
                    this.yishaidanlist(this.ajaxtype);
                } else {
                    this.wspage++;
                    this.weishaidanlist(this.ajaxtype);
                }

            },
            changeSunburn: function(type) {
                this.allLoaded = false;
                if (type == 1) {
                    this.ajaxtype = type;
                    this.sunAlyDom = true;
                    this.sunNoDom = false;
                    this.statusOne = true;
                    this.statusTwo = false;
                } else {
                    this.ajaxtype = type;
                    this.sunAlyDom = false;
                    this.sunNoDom = true;
                    this.statusOne = false;
                    this.statusTwo = true;
                }
            },
            goucaiopen: function() {
                this.$router.push({
                    name: 'goucai'
                })
            },
            sgaiDanNum: function() { //未晒单
                var data = [];
                data["sponsorId"] = this.userid;
                data["isShared"] = 0;
                data["page"] = this.page;
                data["size"] = this.size;
                data["startTime"] = this.startTime;
                data["endTime"] = this.endTime;
                console.log(data);
                var datas = this.Qs.stringify({
                    data
                }, {
                    allowDots: true
                });

                this.$ajax.post('/caipiaoshouye/index.php/home/index/shareSchemeDetailListh5',
                        datas
                    )
                    .then(res => {
                        if (res.data.status == 200) {
                            var content = JSON.parse(res.data.content);
                            console.log(content)
                            if (content.code == 100000) {
                                var data = content.data;
                                this.yiShaiDan = data.canNotShareTotal;
                                this.weiShaiDan = data.canShareTotal;
                                if (this.yiShaiDan < 1) {
                                    this.cwsaidan = true
                                }
                                if (this.weiShaiDan < 1) {
                                    this.cwgoucai = true
                                }
                            } else {

                            }
                        } else {

                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            screen: function() {
                this.popupVisible = true;
            },
            timeChange: function(index) {
                this.allLoaded = false;
                var index = index;
                console.log(index);
                this.popupVisible = false;
                if (index == this.timeList.length - 1) {
                    return false;
                } else {
					this.num=index;
                    this.screenText = this.timeList[index];
                    this.startTime = this.getDateType(index + 1, 1);
                    this.endTime = this.getDateType(index + 1);
                    this.sgaiDanNum();
                    this.getShareLsit();
                }
            },
            hidePopup: function() {
                this.popupVisible = false;
            },

            yishaidanlist: function(ajaxtype) { //已晒单
                var data = [];
                data["sponsorId"] = this.userid;
                data["isShared"] = ajaxtype;
                data["page"] = this.yspage;
                data["size"] = this.size;
                data["startTime"] = this.startTime;
                data["endTime"] = this.endTime;
                console.log(data);
                var datas = this.Qs.stringify({
                    data
                }, {
                    allowDots: true
                });

                this.$ajax.post('/caipiaoshouye/index.php/home/index/shareSchemeDetailListh5',
                        datas
                    )
                    .then(res => {
                        if (res.data.status == 200) {
                            var content = JSON.parse(res.data.content);
                            console.log(content)
                            if (content.code == 100000) {
                                if (content.data.obj.length > 0) {
                                    var data = content.data;
                                    var imgUrlEd = this.GetIconFormType(data.obj);
                                    if (this.yspage === 1) {
                                        this.detailEd = data.obj;
                                        this.imgUrlEd = imgUrlEd;
                                    } else {
                                        this.detailEd = this.detailEd.concat(data.obj);
                                        this.imgUrlEd = this.imgUrlEd.concat(imgUrlEd);
                                    }

                                } else {
                                    this.allLoaded = true;
                                    this.yspage--;
                                    this.notInfoTwo = true;
                                }
                            } else {
                                this.yspage--;
                            }
                        } else {
                            this.yspage--;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            weishaidanlist: function(ajaxtype) { //未晒单
                var data = [];
                data["sponsorId"] = this.userid;
                data["isShared"] = ajaxtype;
                data["page"] = this.wspage;
                data["size"] = this.size;
                data["startTime"] = this.startTime;
                data["endTime"] = this.endTime;
                var datas = this.Qs.stringify({
                    data
                }, {
                    allowDots: true
                });

                this.$ajax.post('/caipiaoshouye/index.php/home/index/shareSchemeDetailListh5',
                        datas
                    )
                    .then(res => {
                        if (res.data.status == 200) {
                            var content = JSON.parse(res.data.content);
                            console.log(content)
                            if (content.code == 100000) {
                                if (content.data.obj.length > 0) {
                                    var data = content.data;
                                    var imgUrl = this.GetIconFormType(data.obj);
                                    if (this.wspage === 1) {
                                        this.details = data.obj;
                                        this.imgUrl = imgUrl;
                                    } else {
                                        this.details = this.details.concat(data.obj);
                                        this.imgUrl = this.imgUrl.concat(imgUrl);
                                    }

                                } else {
                                    this.allLoaded = true;
                                    this.wspage--;
                                    this.notInfoOne = true;
                                }
                            } else if (content.code == "201010") {
                                Toast("账户已被锁定，请联系客服");
                                setCookie('newData', '', '0-S');
                                this.$router.push({
                                    name: 'login'
                                })
                            } else {
                                this.wspage--;
                                this.notInfoOne = true;
                            }
                        } else {
                            this.wspage--;
                            this.notInfoOne = true;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            getShareLsit: function() {
                var data = [];
                data["sponsorId"] = this.userid;
                data["isShared"] = 0;
                data["page"] = 1;
                data["size"] = this.size;
                data["startTime"] = this.startTime;
                data["endTime"] = this.endTime;
                var datas = this.Qs.stringify({
                    data
                }, {
                    allowDots: true
                });

                this.$ajax.post('/caipiaoshouye/index.php/home/index/shareSchemeDetailListh5',
                        datas
                    )
                    .then(res => {
                        if (res.data.status == 200) {
                            var content = JSON.parse(res.data.content);
                            console.log(content);
                            if (content.code == 100000) {
                                var data = content.data;
                                this.details = data.obj;
                                var imgUrl = this.GetIconFormType(data.obj);
                                this.imgUrl = imgUrl;
                                this.dataslength = true

                            } else if (content.code == "201010") {
                                Toast("账户已被锁定，请联系客服");
                                setCookie('newData', '', '0-S');
                                this.$router.push({
                                    name: 'login'
                                })
                            } else {
                                alert("暂无数据");
                                this.dataslength = true;


                            }
                        } else {
                            alert("暂无数据");
                            this.dataslength = true
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });

                var data = [];
                data["sponsorId"] = this.userid;
                data["isShared"] = 1;
                data["page"] = 1;
                data["size"] = this.size;
                data["startTime"] = this.startTime;
                data["endTime"] = this.endTime;
                var datas = this.Qs.stringify({
                    data
                }, {
                    allowDots: true
                });

                this.$ajax.post('/caipiaoshouye/index.php/home/index/shareSchemeDetailListh5',
                        datas
                    )
                    .then(res => {
                        if (res.data.status == 200) {
                            var content = JSON.parse(res.data.content);
                            console.log(content);
                            if (content.code == 100000) {
                                var data = content.data;
                                console.log(data);
                                this.detailEd = data.obj;
                                var imgUrlEd = this.GetIconFormType(data.obj);
                                this.imgUrlEd = imgUrlEd;
                            } else {

                            }
                        } else {

                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });

            },
            GetDateStr: function(day, AddDay) {
                console.log(day);
                var dd = new Date(day.replace(new RegExp(/-/gm), "/"));
                dd.setDate(dd.getDate() + AddDay); //获取AddDayCount天后的日期
                var y = dd.getFullYear();
                var m = dd.getMonth() + 1; //获取当前月份的日期
                var d = dd.getDate();
                if (m < 10) m = "0" + m;
                if (d < 10) d = "0" + d;
                return y + "-" + m + "-" + d;
            },
            NumLength2: function(num) {
                if (num < 10) return "0" + num;
                else return num;
            },
            getDaysInOneMonth: function(year, month) { //获取你所需的天数
                month = parseInt(month, 10);
                var d = new Date(year, month, 0);
                return d.getDate();
            },
            getDateType: function(i, num) {
                var nowt = new Date().getFullYear() + "-" + this.NumLength2(new Date().getMonth() + 1) + "-" + this
                    .NumLength2(new Date()
                        .getDate());
                switch (i) {
                    case 1:
                        this.startTime = nowt
                        this.endTime = nowt
                        break;
                    case 2:
                        this.startTime = this.GetDateStr(nowt, -1);
                        this.endTime = this.GetDateStr(nowt, -1);
                        break;
                    case 3:
                        this.startTime = this.myTime_y + '-' + this.myTime_m + '-01'
                        this.endTime = this.myTime_y + '-' + this.myTime_m + '-' + this.getDaysInOneMonth(this.myTime_y,
                            this.myTime_m)
                        break;
                    case 4:
                        this.startTime = this.myTime_y + '-' + (this.myTime_m - 1) + '-01'
                        this.endTime = this.myTime_y + '-' + (this.myTime_m - 1) + '-' + this.getDaysInOneMonth(
                            this.myTime_y, (this.myTime_m -
                                1))
                        break;
                    case 5:
                        this.startTime = '1999-01-01';
                        this.endTime = this.myTime_y + '-' + this.myTime_m + '-' + (this.myTime_d + 1);
                        break;
                }
                if (num == 1) {
                    return this.startTime;
                } else {
                    return this.endTime;
                }
            },
            GetIconFormType: function(data, num) {
                var url = "";
                var urlArr = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].lotteryType == "SSQ") url = "ssq";
                    else if (data[i].lotteryType == "WELFARE3D") url = "fc3d";
                    else if (data[i].lotteryType == "PL") url = "pl5";
                    else if (data[i].lotteryType == "PL3") url = "pl3";
                    else if (data[i].lotteryType == "PL5") url = "pl5";
                    else if (data[i].lotteryType == "DCZC") url = "bjdc";
                    else if (data[i].lotteryType == "SEVEN") url = "seven";
                    else if (data[i].lotteryType == "SFZC") url = "sfzc";
                    else if (data[i].lotteryType == "LCZC") url = "lczc";
                    else if (data[i].lotteryType == "SCZC") url = "sczc";
                    else if (data[i].lotteryType == "DLT") url = "dlt";
                    else if (data[i].lotteryType == "SDEL11TO5") url = "sdel11to5";
                    else if (data[i].lotteryType == "JCZQ") url = "jczq";
                    else if (data[i].lotteryType == "JCLQ") url = "jclq";
                    else if (data[i].lotteryType == "GDEL11TO5") url = "gdel11to5";
                    else if (data[i].lotteryType == "BJKLB") url = "kl8";
                    else if (data[i].lotteryType == "CQSSC") url = "cqssc";
                    else if (data[i].lotteryType == "XJSSC") url = "xjssc";
                    else if (data[i].lotteryType == "JXSSC") url = "jxssc";
                    else if (data[i].lotteryType == "JXEL11TO5") url = "jxel11to5";
                    else if (data[i].lotteryType == "TJKLSF") url = "tjkls";
                    else if (data[i].lotteryType == "GDKLSF") url = "gdkls";
                    else if (data[i].lotteryType == "JSK3") url = "jsk3";
                    else if (data[i].lotteryType == "AHK3") url = "ahk3";
                    else if (data[i].lotteryType == "HBK3") url = "hbk3";
					else if (data[i].lotteryType == "BJK3") url = "bjk3";
                    else if (data[i].lotteryType == "RXJC") url = "rxjc";
                    else if (data[i].lotteryType == "HN4J1") url = "football";
                    url = require('../../assets/lottery/' + url + '.png')
                    urlArr.push(url)
                }
                return urlArr;
            },
            Bask_single: function(obj) { //立即晒单按钮
            console.log(this.details)
                MessageBox({
                    title: '提示',
                    message: '下载' + OverallData().cpname + 'app，晒单分享即可获得奖励金额',
                    showCancelButton: true
                }).then(action => {
                    var link = OverallData().download
                    if (action == 'confirm') {
                        window.open(link + "?_userId=" + getCookie('newData').sportId);
                    } else {}
                })
            },
        }
    }
</script>
<style scoped>
    @import "../../css/userinfo_task.css";

    header {
        position: fixed !important;
    }
    .aui-bar-nav{
        background: #03a9f4 !important;

    }
    .aui-title {
        color: #fff !important;
     }
      .aui-refresh-pull-arrow {
        width: 1.2rem;
        height: 1.2rem;
        /*background-size: 0.6rem 0.6rem;*/
    }
	
	#screen img {
		width: 0.9rem;
		height: 0.9rem;
	}

    .aui-refresh-load {
        width: 100%;
        height: 1.4rem;
        position: absolute;
        top: -2.2rem;
        left: 0;
        padding: 0.35rem 0;
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
        margin-top: 1.25rem;
        text-align: center;
        font-size: 0.8rem;
        color: #62A1BE;
    }

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
        width: 100%;
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

    #sunburn_list {
        margin-top: 4.075rem;
    }

    .mint-loadmore-top {
        margin-top: -60px;
    }

    .mint-loadmore-bottom {
        margin-bottom: -102px;
    }

    .cwsaidan_p {
        font-family: PingFangTC-Regular;
        font-size: 0.85rem;
        color: #77A7F7;
        text-align: center;
        margin-left: 0.45rem;
    }

    .cwsaidan_div {
        border-radius: 1.1rem;
        width: 14rem;
        height: 2.2rem;
        line-height: 2.2rem;
        text-align: center;
        margin: auto;
        color: #fff;
        background: #E45869;
        margin-top: 2.85rem;
    }

    .cwsaidan_div span {
        font-size: 0.85rem;
    }
		.aui-refresh-content{
		top:2rem
		}
</style>
