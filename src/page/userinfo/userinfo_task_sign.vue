<template>
    <div class="taskSign">
        <header class="aui-bar aui-bar-nav">
                    <div class="aui-pull-left aui-btn" @click="bake()" tapmode>
                        <span class="aui-iconfont aui-icon-left"></span>
                    </div>
                    <div class="aui-title">每日签到</div>
          </header>
        <div class="userinfo_task_sign">
            <div class="userinfo_task_sign_banner">
                <div class="userinfo_task_sign_content">
                    <img src="../../assets/task/sign-content.png" alt="" class="img1">
                     <h3>已连续签到<span class="sp1">{{continueSign?continueSign:0}}</span>天</h3>
                     <div class="taskSignNav" >
                         <ul class="nav">
                         	<li v-for="(item,index) in temes" v-if="index!=6">
                                <div class="active1" v-if='temes[index]=="true"'>
                                    <p class="p1">第{{index+1}}天</p>
                                   <p class="p2">{{temes[index]=='true'?'已签到':'待签到'}}</p> 
                                </div>
                                <div class="active2" v-else>
                                    <p class="p1">第{{index+1}}天</p>
                                   <p class="p2">{{temes[index]=='true'?'已签到':'待签到'}}</p> 
                                </div>
                            </li>
                         </ul>
                         <div class="navRight active3" v-if="temes[6]">
                             <p class="p1">第7天</p>
                             <p class="p2">{{temes[6]=='true'?'已签到':'待签到'}}</p>
                         </div>
                          <div class="navRight active4" v-else>
                             <p class="p1">第7天</p>
                             <p class="p2">{{temes[6]=='true'?'已签到':'待签到'}}</p>
                         </div>
                     </div>
                     <div class='taskSignFoot' @click="signDay()">
                         <img src="../../assets/task/sign-btn.png" alt="">
                         <p>{{sign_in}}</p>
                         </div>   
                </div>
            </div>
            <div class="userinfoTaskSignFooter">
                    <div class="after"></div>
                    <div class="signFooterConent">  
                        <h3>活动规则</h3>
                        <p>
                            1.每个用户每天只能签到1次！
                        </p>
                        <p>
                            2.连续签到天数不同，对应奖励也就不同：<br>
							&nbsp;&nbsp;&nbsp;每日签到赠送<span>0.28</span>元红包；<br>
							&nbsp;&nbsp;&nbsp;连续签到7天为1个周期；<br>
							&nbsp;&nbsp;&nbsp;签到1个周期额外赠送<span>1.88</span>元红包；<br>
							&nbsp;&nbsp;&nbsp;若已连续签到1个周期至第8天时，从新周<br>
							&nbsp;&nbsp;&nbsp;期的第1天开始计算。                                                                       
                        </p>
                        <p>
                            3.若中途断签则从第1天重新开始计算。
                        </p>
                        <p>
                            4.签到奖励将于签到完成后自动发放至您的红<br>&nbsp;&nbsp;&nbsp;包余额内，可前往我的红包查看详情。
                        </p>
                        <p class="p1">
                            5.本活动最终解释权归本站所有，如有疑问请<br>&nbsp;&nbsp;&nbsp;联系客服。
                        </p>
                    </div>                  
            </div>
            <!-- <div class="userinfo_task_sign_btn" @click="signDay()"><span id="sign_btn">{{sign_in}}</span></div> -->
            <!-- <div class="userinfo_task_sign_bottom" @click="openfx()"></div> -->
            <!-- 弹窗 -->
            <div v-if="sign_popup1" class="dowPopup" @click="closedowPopup()">
                <div class="cont">
                    <p class="money"><span>{{qianDaoMoney}}</span>元</p>
                    <p class="h1" id="dowPopupH1">签到成功!</p>
                    <p class="text">恭喜您，签到成功下载APP立即分享即得现金红包！</p>
                    <div class="butt">
                        <img @click="download()" src="../../assets/task/task-popup-dw.png">
                    </div>
                    <div class="close"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        getCookie,
        setCookie,
        getUid,
        OverallData
    } from "../../js/common.js";
	 
    import {
        Toast
    } from 'mint-ui';
    export default {
        data() {
            return {
                temeqd: [],//签到时间日期
                temes: [],//签到了几次
                pageParam: {},
                continueSign:'',//是从接口中获取到的签到了几天（延续性）
                qianDaoMoney: 0.28,//签到获得金额
                yaonitanchu: false,
                sign_popup1: false,
                activityId: 0,
                sign_in: '',
            }
        },
        created() {
            this.pageParam = this.$route.query
            this.qianDaoMoney = this.$route.query.qianDaoMoney
            this.sign_in = this.$route.query.sign_in;
            this.getMySignDay();
           
        },
        methods: {
             bake:function () {
            this.$router.go(-1); //根据浏览器记录返回上一次
             },
            openfx: function() {
                this.$router.push({
                    name: 'special_friends'
                })
            },
            //      
            getMySignDay: function(userId) {
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
				data = this.Encrypt({...data});
                var datas = this.Qs.stringify({
                    data
                }, {
                    allowDots: true
                });

                this.$ajax.post('/caipiaoshouye/index.php/home/index/getUserSignInfo',
                        datas
                    )
                    .then(res => {
                        if (res.data.status != 200) {
                            return;
                        } else {
                            console.log(this.pageParam)
                            var content = JSON.parse(res.data.content);
							if(content.data.awardContent){
								this.qianDaoMoney = content.data.awardContent.amount;
			 				}
                            this.continueSign=content.data.continueSign;
                            console.log(content)
                            console.log(content.data.signStatus)
                            console.log(content.data.activityRecordId)
                            if (!content.data.signStatus) {
                                this.sign_in = '立即签到';
                                this.pageParam.ityCount = 0;
                            } else if (content.data.signStatus && content.data.activityRecordId) {
                                this.sign_in = '立即领取';
                                this.pageParam.ityCount = 1;
                            } else {
                                this.sign_in = '已签到';
                                this.pageParam.ityCount = 2;
                                
                            }
                            if (content.code == "100000") {
                                if (content.data) {
                                    var signList = content.data.signDates;
                                    console.log(signList)
                                    this.temeqd = [];
                                    this.temes = [];
                                    if (signList) {
                                        for (var j = 0; j < 7; j++) {
                                            if (signList.length >= (j + 1)) {
                                                var str_time = this.GetDateStr(new Date(signList[j]), 0).m +
                                                    "/" + new Date(signList[j]).getDate();
                                                this.temeqd.push(str_time);
                                                this.temes.push("true");
                                                console.log(str_time)
                                                console.log(this.temes);
                                                console.log(this.temeqd)
                                            } else if (signList.length > 0) {
                                                var str_time = this.GetDateStr(new Date(signList[signList.length -
                                                    1]), j - signList.length + 1).m + "/" + this.GetDateStr(
                                                    new Date(signList[signList.length - 1]), j - signList.length +
                                                    1).d;
                                                this.temeqd.push(str_time);
                                                this.temes.push("false");
                                            } else {
                                                var str_time = this.GetDateStr(new Date(), j).m + "/" + this.GetDateStr(
                                                    new Date(), j).d;
                                                this.temeqd.push(str_time);
                                                this.temes.push("false");
                                            }
                                        }
                                    } else {
                                        var TimeDate = new Date().getDate();
                                        for (let i = 0; i < 7; i++) {
                                            if (TimeDate == this.GetDateStr(new Date(), i).d && content.data.signStatus) {
                                                this.temes.push("true");
                                            } else {
                                                this.temes.push("false");
                                            }
                                            var str_time = this.GetDateStr(new Date(), i).m + "/" + this.GetDateStr(
                                                new Date(), i).d;
                                            this.temeqd.push(str_time);
                                        }
                                    }
                                }
                            } else if (content.code == "201010") {
                                Toast("账户已被锁定，请联系客服");
                                setCookie('newData', '', '0-S');
                                this.$router.push({
                                    name: 'login'
                                })
                            } else {
                                Toast(content.message);
                                var TimeDate = new Date().getDate();
                                for (let i = 0; i < 7; i++) {
                                    this.temes.push("false");
                                    var str_time = this.GetDateStr(new Date(), i).m + "/" + this.GetDateStr(new Date(),
                                        i).d;
                                    this.temeqd.push(str_time);
                                }
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            GetDateStr: function(day, AddDay) { // 时间转换返回
                var obj = {};
                var dd = new Date(day);
                dd.setDate(dd.getDate() + AddDay); //获取AddDayCount天后的日期
                var y = dd.getFullYear();
                var m = dd.getMonth() + 1; //获取当前月份的日期
                var d = dd.getDate();
                obj.y = y;
                obj.m = m;
                obj.d = d;
                obj.date = dd.getTime();
                return obj;
            },

            signDay: function() { // 点击签到方法
                if (this.pageParam.ityCount == 0) {
                    let uid = getCookie('newData');
                    if (!uid) {
                        this.$router.push({
                            name: 'login'
                        })
                        return false;
                    }
                    var userId = uid.userid;
                    // var activityId=2;
                    var data = {};
                    data["userId"] = userId;
                    // data["activityId"]= activityId;
					console.log(data);
					data = this.Encrypt(data);
                    var datas = this.Qs.stringify({
                        data
                    }, {
                        allowDots: true
                    });

                    this.$ajax.post('/caipiaoshouye/index.php/home/index/doSign',
                            datas
                        )
                        .then(res => {
							console.log(res)
                            if (res.data.status != 200) return;
                            var data = JSON.parse(res.data.content);
                            if (data.data) {
                                this.sign_in = '立即领取';
                                this.pageParam.activityId = data.data.activityRecordId;
                                //获取签到记录
                                this.getMySignDay();
                                console.log(this.getMySignDay())
                                this.yaonitanchu = true;
                                this.pageParam.ityCount = 1;
                                this.qianDaoMoney = data.data.awardContent.amount;
                            }
                            var content = JSON.parse(res.data.content);
                            if (res.data.status != "200") {
                                return;
                            } else {
                                if (content.data) {
                                    this.getMySignDay();
                                    this.sign_in = "分享给好友激活" + content.data.awardContent.amount + "元现金";
                                    // alert("恭喜你签到成功获得2元奖励!");
                                    this.sign_popup1 = true
                                    //获取签到记录
                                }
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                } else if (this.pageParam.ityCount == 1) {
                    this.sign_popup1 = true
                } else {
                    alert("您今日签到次数已达上限，请明天再试！");
                }
            },
            download: function() {
                var newData = getCookie('newData');
                var link = OverallData().download
                if (newData) {
                    window.open(link + '?_userId=' + newData.sportId);
                } else {
                    window.open(link);
                }
            },
            closedowPopup: function() {
                this.sign_popup1 = false;
            },
        }
    }
</script>
<style scoped>
    @import "../../css/userinfo_task.css";
</style>
