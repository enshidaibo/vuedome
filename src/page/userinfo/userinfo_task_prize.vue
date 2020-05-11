<template>
    <div>
        <header class="aui-bar aui-bar-nav">
            <div class="aui-pull-left aui-btn" @click="OncloseWin()">
                <span class="aui-iconfont aui-icon-left"></span>
            </div>
            <div>
                <div class="aui-title">抽奖</div>
            </div>
            <div class="aui-pull-right">
                <div class="ruleBut" @click="hideRuleDom = true;hideMaskDom = true">规则</div>
            </div>
        </header>
        <div class="userinfo_task_prize">
            <div class="task_prize_hade">
                <img src="../../assets/task/ttyjx.png" />
            </div>
            <div class="cont">
                <div class="task_prize_top">最高可得500元</div>
                <div class="task_prize_p1">每天5次免费抽奖机会间隔时间过期作废</div>
                <div class="task_prize_p2">{{promoTime?'免费抽奖时段中':'距离免费抽奖还有'}}</div>
                <div class="task_prize_time1" v-if="promoTime">
                    {{startTime|getTime()}} - {{endTime|getTime()}}
                </div>
                <div class="task_prize_time2" v-else>
                    <span class="ri">{{surTimehours[0]}}</span><span class="ri">{{surTimehours[1]}}</span><span>:</span>
                    <span class="ri">{{surTimeminutes[0]}}</span><span class="ri">{{surTimeminutes[1]}}</span><span>:</span>
                    <span class="ri">{{surTimeseconds[0]}}</span><span class="ri">{{surTimeseconds[1]}}</span>
                </div>
                <img src="../../assets/task/1.png" id="shan-img" style="display:none;">
                <img src="../../assets/task/2.png" id="sorry-img" style="display:none;">
                <div class="task_prize_banner">
                    <div class="task_prize_turnplate">
                        <canvas class="task_prize_item" width="422" height="422" id="wheelcanvas"></canvas>
                        <img v-if="promoCount>0" class="task_prize_pointer" src="../../assets/task/turnplate-pointer.png"
                            @click="cjonclic()">
                        <img v-else class="task_prize_pointer" src="../../assets/task/turnplate-pointer-one.png" />
                    </div>
                </div>
                <div class="task_prize_p3">
                    剩余抽奖次数:<span style="font-size: 0.94rem;color: #E40004;"> {{promoCount}} </span>次
                </div>
                <div class="task_prize_p4">
                    <img src="../../assets/task/turnplateBut.png" @click="taskInvitation" />
                </div>
            </div>
        </div>
        <div v-if="hidePrizeDom" :class="[ 'task_prize_zhongjiang',  {'active':zhong_state}]" id="prize">
            <div class="task_prize_zjtext" id="prize_text">{{prizeText}}</div>
            <div class="task_prize_continue" @click="jxonclic()"></div>
            <div class="task_prize_close_btn" @click="closePrize()"></div>
        </div>
        <div v-if="hideRuleDom" class="task_prize_rule" id="rule">
            <div class="task_prize_rule_poptop">
                <p>每日上线送惊喜，</p>
                <p>最高可以获得500元大奖哦~</p>
            </div>
            <div class="task_prize_rule_popmain">活动说明：参与每日抽奖即有机会获得高额奖励，每天5次免费抽奖机会间隔时间过期作废</div>
            <div class="prize_rule_list">
                <span v-for="item in timeList.drawTimeList">{{item.startTime|getTime()}} - {{item.endTime|getTime()}}</span>
            </div>
            <div class="task_prize_rule_popfoot">
                  <p>惊喜一：<span>500元</span>红包</p>
                <p>惊喜二：<span>100元</span>红包</p>
                <p>惊喜三：<span>50元</span>红包</p>
                <p>惊喜四：<span>20元</span>红包</p>
                <p>惊喜五：<span>10元</span>红包</p>
                <p>惊喜六：<span>2元</span>红包</p>
                <p>惊喜七：<span>1元</span>红包</p>
                <p>惊喜八：<span>0.5元</span>红包</p>
            </div>
            <div class="task_prize_rule_closebtn" @click="closeRule()"></div>
        </div>
        <div v-if="hideMaskDom" class="task_prize_mask" id="mask" @click="closeMask()"></div>
    </div>
</template>
<script>
    var interval = ''
    import {
        getCookie,
        setCookie,
        getUid
    } from "../../js/common.js";

    import {
        Toast
    } from 'mint-ui';
    export default {
        data() {
            return {
                userId: '',
                hidePrizeDom: false,
                hideRuleDom: false,
                hideMaskDom: false,
                zhong_state: false,
                noclick: true, //连续点击禁止
                promoCount: '0',
                promoTime: true,
                restaraunts: '', //大转盘奖品名称
                colors: [], //大转盘奖品区块对应背景颜色
                outsideRadius: 192, //大转盘外圆的半径
                textRadius: 164, //大转盘奖品位置距离圆心的距离
                insideRadius: 0, //大转盘内圆的半径
                startAngle: 0, //开始角度
                randomRate: [], //控制获奖率，百分制(相加需等于100%)，对应restaraunts(顺序需要保持一致)，
                bRotate: false, //false:停止;ture:旋转
                canvas: '',
                offOn: false,
                prizeText: '',
                notShareActivityCount: 0,
                surTimedays: 0,
                surTimehours: 0,
                surTimeminutes: 0,
                surTimeseconds: 0,
                startTime: 0,
                endTime: 0,
                isFreeDrawLottery: false,
                timeList: {
                    currentTime: '1551068460000',
                    drawTimeList: []
                }
            }
        },
        beforeRouteLeave(to, from, next) {
            clearInterval(interval);
            next()
        },
        created() {
            let uid = getCookie('newData');
            if (!uid) {
                this.$router.push({
                    name: 'login'
                })
                return false;
            }
            this.userId = uid.userid;
        },
        mounted() {
            this.canvas = document.querySelector('#wheelcanvas');
            this.start();
            this.getLucyDrawInfo()
        },
        methods: {
            OncloseWin: function() {
                this.$router.go(-1);
            },
            start: function() {
                this.randomRate = ["11.5%", '6.25%', '10.5%', '6.25%', '6.25%', '6.25%', '6.25%', '6.25%', '6.25%',
                    '6.25%',
                    '6.25%', '2%', '6.25%', '1%'
                ];
                this.restaraunts = ["500元", "再接再厉", "100元", "再接再厉", "50元", "再接再厉", "20元 ", "再接再厉", "10元", "再接再厉",
                    "2元 ", "再接再厉",
                    "1元", "再接再厉", "0.5元 ", "再接再厉"
                ];
                this.colors = ["#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF", "#FFF4D6",
                    "#FFFFFF", "#FFF4D6",
                    "#FFFFFF", "#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF"
                ];
                var img = document.getElementById("sorry-img");
                const thal = this;
                img.onload = function() {
                    thal.drawRouletteWheel()
                };
            },
            closeMask: function() {
                this.hidePrizeDom = false;
                this.zhong_state = false;
                this.hideRuleDom = false;
                this.hideMaskDom = false;
            },
            showRule: function() {
                this.hideRuleDom = true;
                this.hideMaskDom = true;
            },
            closeRule: function() {
                this.hideRuleDom = false;
                this.hideMaskDom = false;
            },
            closePrize: function() {
                this.hideMaskDom = false;
                this.hidePrizeDom = false;
                this.zhong_state = false;
            },
            calculate: function(a, b, c) {
                var val1 = b * b - 4 * a * c;
                var x1 = 0;
                var x2 = 0;
                if (val1 >= 0) {
                    x1 = (-1 * b + Math.sqrt(val1)) / (2 * a);
                    x2 = (-1 * b - Math.sqrt(val1)) / (2 * a);
                } else {
                    val1 = val1 * -1;
                    var i1 = Math.round((Math.sqrt(val1) / (2 * a)) * 10000) / 10000;
                    x1 = (-1 * b / (2 * a)) + '+' + i1 + 'i';
                    x2 = (-1 * b / (2 * a)) + '-' + i1.toFixed(4) + 'i';
                }
                return x1;
            },
            cjonclic: function() { // 抽奖点击方法
                if (this.noclick) {
                    this.noclick = false;
                    this.luckDraw();
                } else {
                    return;
                }
            },
            jxonclic: function() { // 继续抽奖
                if (this.noclick) {
                    this.noclick = false;
                    this.closePrize();
                    this.luckDraw();
                } else {
                    return;
                }
            },
            luckDraw: function() {
                if (this.promoCount < 1) {
                    Toast("你当前没有抽奖次数！");
                    this.noclick = true;
                } else {
                    var drawLotteryType = 0;
                    if (!this.isFreeDrawLottery) {
                        drawLotteryType = 1
                    }
                    var data = {};
                    data["userId"] = this.userId;
                    data["drawLotteryType"] = drawLotteryType;
					data = this.Encrypt(data);
                    var datas = this.Qs.stringify({
                        data
                    }, {
                        allowDots: true
                    });

                    this.$ajax.post('/caipiaoshouye/index.php/home/index/doLucydraw',
                            datas
                        )
                        .then(res => {
                            var content = JSON.parse(res.data.content);
                            if (content.code == "100000") {
                                if (content.data.hasOwnProperty('winMoney')) {
                                    this.notShareActivityCount = content.data.winMoney
                                }
                                this.promoCount = content.data.promoCount;
                                this.rotateFn(content.data.index, content.data.winMoney, content.data.activityRecordId);
                                setTimeout(function() {
                                    this.noclick = true;
                                }, 4800)
                            } else if (content.code == "201010") {
                                Toast("账户已被锁定，请联系客服");
                                setCookie('newData', '', '0-S');
                                this.$router.push({
                                    name: 'login'
                                })
                            } else {
                                this.promoCount = 0;
                                Toast("你当前没有抽奖次数！");
                                this.noclick = true;
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            this.noclick = true;
                        })
                }
            },
            getLucyDrawInfo: function() {
                var data = [];
                data["userId"] = this.userId;
				data = this.Encrypt({...data});
                var datas = this.Qs.stringify({
                    data
                }, {
                    allowDots: true
                });
                this.$ajax.post('/caipiaoshouye/index.php/home/index/getLucyDrawInfo',
                        datas
                    )
                    .then(res => {
                        if (res.data.status == 200) {
                            var content = JSON.parse(res.data.content);
                            console.log(content)
                            if (content.code == "100000") {
                                this.timeList.currentTime = content.data.serverCurrentTime;
                                this.timeList.drawTimeList = content.data.drawTimeList;
                                this.isFreeDrawLottery = content.data.isFreeDrawLottery;
                                if (this.isFreeDrawLottery) {
                                    this.promoCount = content.data.promoCount + 1;
                                } else {
                                    this.promoCount = content.data.promoCount;
                                }
                                for (var i = 0; i < this.timeList.drawTimeList.length; i++) {
                                    if (this.timeList.currentTime < this.timeList.drawTimeList[i].startTime) {
                                        this.promoTime = false;
                                        var surTime = this.timeList.drawTimeList[i].startTime * 1 - this.timeList
                                            .currentTime * 1;
                                        this.setSurplusTime(surTime);
                                        break;
                                    } else if (this.timeList.currentTime < this.timeList.drawTimeList[i].endTime) {
                                        if (this.isFreeDrawLottery) {
                                            this.promoTime = true;
                                            this.startTime = this.timeList.drawTimeList[i].startTime;
                                            this.endTime = this.timeList.drawTimeList[i].endTime;
                                        } else if (i < 4) {
                                            this.promoTime = false;
                                            var surTime = this.timeList.drawTimeList[i + 1].startTime * 1 -
                                                this.timeList.currentTime * 1;
                                            this.setSurplusTime(surTime);
                                        } else {
                                            this.promoTime = false;
                                            var surTime = this.timeList.drawTimeList[0].startTime * 1 +
                                                86400000 - this.timeList.currentTime * 1;
                                            this.setSurplusTime(surTime);
                                        }
                                        break;
                                    } else {

                                    }
                                }
                                if (this.timeList.currentTime > this.timeList.drawTimeList[4].endTime) {
                                    this.promoTime = false;
                                    var surTime = this.timeList.drawTimeList[0].startTime * 1 + 86400000 - this
                                        .timeList.currentTime * 1;
                                    this.setSurplusTime(surTime);
                                }
                            }
                        } else {
                            Toast("服务器异常");
                            return false;
                        }
                    })
            },
            taskInvitation: function() {
                if (this.noclick) {
                    this.$router.push({
                        name: 'special_friends'
                    })
                }
            },
            rotateFn: function(item, money) {
                if (this.offOn) return false;
                var oTurntable = document.getElementById("wheelcanvas");
                console.log(oTurntable);
                oTurntable.style.transform = "rotate(0deg)";
                var timer = null;
                var rdm = 0;
                var angles = item * (360 / this.restaraunts.length) - (360 / (this.restaraunts.length * 2));
                if (angles < 270) {
                    angles = 270 - angles;
                } else {
                    angles = 360 - angles + 270;
                }
                var a = 10;
                var b = 3;
                var c = parseFloat(parseFloat(-(angles + 1080)) * 2 + 0.2);
                var i = parseFloat(this.calculate(a, b, c)).toFixed(1);
                clearInterval(timer);
                this.offOn = true;
                const that = this;
                timer = setInterval(function() {
                    oTurntable.style.transform = "rotate(" + rdm + "deg)";
                    var y = angles - rdm;
                    if (rdm > (angles + 1080)) {
                        oTurntable.style.transform = "rotate(" + angles + "deg)";
                        clearInterval(timer);
                        setTimeout(function() {
                            that.offOn = !that.offOn;
                            that.hideMaskDom = true;
                            that.hidePrizeDom = true;
                            if (money == 0) {
                                that.prizeText = '';
                                that.noclick = true;
                            } else {
                                that.zhong_state = true;
                                that.prizeText = money + '元';
                                that.noclick = true;
                            }
                            that.getLucyDrawInfo()
                        }, 300);
                    }

                    rdm = parseFloat(rdm) + parseFloat(i);
                    i = parseFloat(i) - parseFloat(0.1);
                    if (i < 0.2) {
                        i = 0.2;
                    }
                }, 30);
            },
            drawRouletteWheel: function() {
                // console.log(this.canvas);
                if (this.canvas.getContext) {
                    //根据奖品个数计算圆周角度

                    var arc = Math.PI / (this.restaraunts.length / 2);

                    var ctx = this.canvas.getContext("2d");
                    //在给定矩形内清空一个矩形
                    ctx.clearRect(0, 0, 422, 422);
                    //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
                    ctx.strokeStyle = "#FFBE04";
                    //font 属性设置或返回画布上文本内容的当前字体属性
                    ctx.font = '16px Microsoft YaHei';
                    for (var i = 0; i < this.restaraunts.length; i++) {
                        var angle = this.startAngle + i * arc;
                        ctx.fillStyle = this.colors[i];
                        ctx.beginPath();
                        //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
                        ctx.arc(211, 211, this.outsideRadius, angle, angle + arc, false);
                        ctx.arc(211, 211, 0, angle + arc, angle, true);
                        ctx.stroke();
                        ctx.fill();
                        //锁画布(为了保存之前的画布状态)
                        ctx.save();

                        //----绘制奖品开始----
                        ctx.fillStyle = "#E5302F";
                        var text = this.restaraunts[i];
                        var line_height = 17;
                        //translate方法重新映射画布上的 (0,0) 位置
                        ctx.translate(211 + Math.cos(angle + arc / 2) * this.textRadius, 211 + Math.sin(angle + arc /
                            2) * this.textRadius);

                        //rotate方法旋转当前的绘图
                        ctx.rotate(angle + arc / 2 + Math.PI / 2);

                        /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
                        //流量包
                        if (text.indexOf("M") > 0) {
                            var texts = text.split("M");
                            for (var j = 0; j < texts.length; j++) {
                                ctx.font = j == 0 ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei';
                                if (j == 0) {
                                    ctx.fillText(texts[j] - +"M", -ctx.measureText(texts[j] + "M").width / 2, j *
                                        line_height);
                                } else {
                                    ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                                }
                            }
                        } else if (text.indexOf("M") == -1 && text.length > 6) {
                            //奖品名称长度超过一定范围
                            text = text.substring(0, 6) + "||" + text.substring(6);
                            var texts = text.split("||");
                            for (var j = 0; j < texts.length; j++) {
                                ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                            }
                        } else {
                            //在画布上绘制填色的文本。文本的默认颜色是黑色
                            //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
                            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                        }

                        //添加对应图标
                        if (text.indexOf("元") > 0) {
                            var img = document.getElementById("shan-img");
                            ctx.drawImage(img, -15, 10);
                        } else if (text.indexOf("再接再厉") >= 0) {
                            var img = document.getElementById("sorry-img");
                            ctx.drawImage(img, -15, 10);
                        }
                        //把当前画布返回（调整）到上一个save()状态之前
                        ctx.restore();
                        //----绘制奖品结束----

                    }
                }
            },
            setSurplusTime: function(surTime) {
                var sTm = this.formatDuring(surTime);
                this.surTimedays = sTm[0]
                this.surTimehours = sTm[1]
                this.surTimeminutes = sTm[2]
                this.surTimeseconds = sTm[3]
                var thal = this;
                interval = setInterval(function() {
                    surTime = surTime - 1000
                    if (surTime <= 0) {
                        thal.$router.go(0);
                        clearInterval(interval);
                    }
                    var Tm = thal.formatDuring(surTime);
                    thal.surTimedays = Tm[0]
                    thal.surTimehours = Tm[1]
                    thal.surTimeminutes = Tm[2]
                    thal.surTimeseconds = Tm[3]
                }, 1000);
            },
            formatDuring: function(mss) {
                var days = parseInt(mss / (1000 * 60 * 60 * 24)) + '';
                var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + '';
                var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60)) + '';
                var seconds = parseInt((mss % (1000 * 60)) / 1000) + '';
                if (hours.toString().length < 2) {
                    hours = '0' + hours.toString();
                }
                if (minutes.toString().length < 2) {
                    minutes = '0' + minutes.toString();
                }
                if (seconds.toString().length < 2) {
                    seconds = '0' + seconds.toString();
                }
                return [days, hours, minutes, seconds];
            }
        },
        filters: {
            getTime: function(matchDate) {
                let time = new Date(matchDate * 1);
                let h = time.getHours() >= 10 ? time.getHours() : "0" + time.getHours();
                let m = time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes();
                return h + ":" + m;
            }
        }
    }
</script>
<style scoped>
    @import "../../css/userinfo_task.css";

    .aui-bar-nav {
        background-color: #F97611;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
    }

    .ruleBut {
        width: 2.6rem;
        height: 1.2rem;
        margin-top: 0.5rem;
        background-color: rgba(255, 255, 255, 0.27);
        border-radius: 0.7rem;
        text-align: center;
        font-size: 0.6rem;
        line-height: 1.2rem;
        color: #fff;
    }

    .userinfo_task_prize {
        background-image: url(../../assets/task/bj.png);
        background-repeat: no-repeat;
        background-position: 50% top;
        background-attachment: fixed;
        background-size: cover;
    }

    .userinfo_task_prize .cont {
        margin-left: 1rem;
        margin-right: 1rem;
        margin-top: 1.08rem;
        background-color: #fef7e3;
        border-radius: 0.4rem;
    }
    .task_prize_rule_popfoot span{
      color: #F80201;
    }
    .ruleBut:active{
        background-color: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.5);
    }
</style>
