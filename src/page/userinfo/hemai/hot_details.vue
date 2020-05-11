<template>
    <div>
        <nav-bar title="红人详情"></nav-bar>
        <div class="content" id="content">
            <div class="header">
                <div class="user_phone">
                    <img class="user_icon" src="../../../assets/userinfo/user_icon_red.png" alt=""><span class="phone">{{prev_item.userName|replace()}}</span>
                </div>
                <div class="user_info">
                    <div class=" left ">
                        <div class="">中奖总次数：<span class="color">{{prev_item.allPrizeCount}}次</span></div>
                        <div class="">最近一月中奖次数：<span class="color">{{month_data.allPrizeCount}}次</span></div>
                    </div>
                    <div class=" right ">
                        <div class="">中奖总金额：<span class="color">{{prev_item.allPrizeMoney}}元</span></div>
                        <div class="">最近一月中奖金额：<span class="color">{{month_data.allPrizeMoney}}元</span></div>
                        <div class="">定制人数：<span class="color">{{prev_item.followCount}}人</span></div>
                    </div>

                </div>
                     <span class="bottoms"></span>

            </div>
            <div class="titles">
              <div class="tlebox">
                <span class="hex"></span>
                <span class="tlt">定制跟单</span>
                <span class="hex"></span>
              </div>
            </div>
            <ul class="contain" v-for="(item,index) in statisticsByLotteryType">
                <li class="lists" :class="index==indexs?'asdfsdfs':''">
                    <div class="left_img">
                      <img class="image_big" :src="img_src(item.lotteryType)" alt="">
                      <!-- <span class="border"></span> -->
                    </div>
                    <div class="middle middle_list">
                      <div class="lists_left dz_box">
                        <span class="left_name">定制人数：</span>
                        <span class="right_name">{{item.followNum}}人</span>
                      </div>
                      <div class="lists_right dz_box">
                        <span class="left_name">累计中奖金额：</span>
                        <span class="right_name">{{item.winTotalCost}}元</span>
                      </div>
                      <div class="lists_right dz_box">
                        <span class="left_name">近月中奖金额：</span>
                        <span class="right_name">{{item.winMonthCost}}元</span>
                      </div>
                    </div>
                    <div class="rightest" @click="sliders(index)">
                      <span class="rightest_name">立即跟单</span>
                      <img :class="index == indexs?'':'rotate'" class="image down_icon" src="../../../assets/userinfo/triangle.png" alt="">
                    </div>
                  </li>

              <div class="scale " :class="[index==indexs?'':'dis-no']" >
                <div class="select">
                  <span v-if="typetext[index].money=='金额'" class="scale_text select_two active" @click="select(index)">按金额定制</span>
                        <span v-else class="scale_text select_two " @click="select(index)">按金额定制</span>
                        <span v-if="typetext[index].money=='比例'" class="scale_text select_two active" @click="select(index)">按比例定制</span>
                        <span v-else class="scale_text select_two" @click="select(index)">按比例定制</span>
                </div>
                <div class="number">
                   <span class="scale_text">每天认购方案个数：</span>
                        <input class="input" name="" v-model="item.input_number" type="text"><span class="scale_text">个</span>
                        <span class="only">(至少认购1个)</span>
                </div>

                <div class="money">
                  <span class="scale_text">每个方案跟单<span class="scale_text change_text">{{typetext[index].money}}</span>：</span>
                        <input class="input" name="" v-model="item.input_money" type="text">
                        <span class="scale_text change_symbol">{{typetext[index].dwf}}</span>
                </div>
                <div class="less_money">
                    <input type="checkbox" name="check1" value="">
                    <span class="scale_text">当用户余额≤</span>
                    <input class="input" name="" v-model="item.input_less_money" type="text">
                    <span class="scale_text">元时不进行自动认购</span>
                </div>
                <input class="input_button" type="button" name="" value="定制跟单" @click="submit(item,index)" tapmode>
              </div>
            </ul>
        </div>
    </div>

</template>

<script>
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
        IsPhone,
        setSession,
        getSession,
        getCookie,
        setCookie,
        replace
    } from '../../../js/common.js';

    export default {
        data() {
            return {
                indexs: -1,
                data: [], //总数据
                month_data: {}, //接口返回的数据
                druserid: '',
                userName: '',
                search_input: "",
                prev_item: '', //上个页面的数据传参
                typetext: [],
                statisticsByLotteryType: [],

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
            }
        },
        filters: {

            replace(str) {

                return replace(str);
            }

        },
        created() {
            this.druserid = this.$route.query.id;
            this.prev_item = getSession('itme');
            this.getCelebrityDetail();
            console.log(JSON.stringify(getSession('itme')));
        },
        methods: {
            select: function(index) {
                if (this.typetext[index].money == '金额') {
                    this.typetext[index].money = '比例';
                    this.typetext[index].dwf = '%';
                    this.typetext[index].type = 'PERCEND';
                } else {
                    this.typetext[index].money = '金额';
                    this.typetext[index].dwf = '元';
                    this.typetext[index].type = 'FUND';
                }
            },
            img_src: function(type) {


                return require('../../../assets/userinfo/' + this.imgs[type] + '.png');
            },
            sliders: function(i) {
                if (i == this.indexs) {
                    this.indexs = -1
                } else {
                    this.indexs = i
                }
            },
            submit: function(item, index) {
                if (!item.input_number) {
                    Toast('请填写认购个数！');
                    return;

                } else if (!(/^[0-9]*$/.test(item.input_number)) || (item.input_number) < 1) {
                    Toast('请填写正确的认购个数！');
                    return;
                } else if (!item.input_money) {
                    Toast('请填写金额！');
                    return;
                } else if (!(/^[0-9]*$/.test(item.input_money)) || parseInt(item.input_money) < 1) {
                    Toast('请填写正确的金额！');
                    return;
                }
                if (item.input_less_money < 1) {
                    Toast('用户余额不能为负！');
                    return;
                }
                let uid = getCookie('newData');
                if (!uid) {
                    this.$router.push({
                        name: 'login'
                    })
                    return false;
                }
                var userId = getCookie('newData').userid;
                var data = [];
                var autoFollowOrder = [];

                autoFollowOrder["sponsorUserId"] = this.druserid;
                autoFollowOrder["lotteryType"] = item.lotteryType;
                autoFollowOrder["followUserId"] = userId;
                autoFollowOrder["followType"] = this.typetext[index].type;
                autoFollowOrder["followCost"] = item.input_money;
                autoFollowOrder["followPercent"] = item.input_money;
                autoFollowOrder["followUserMaxCount"] = item.input_number;
                autoFollowOrder["followUserMinremainMoney"] = item.input_less_money;
                data["autoFollowOrder"] = autoFollowOrder;

                console.log(this.druserid);

                var datas = this.Qs.stringify({
                    data
                }, {
                    allowDots: true
                });
                this.$ajax.post('/caipiaoshouye/index.php/home/index/saveFollowSetting',
                        datas
                    )
                    .then(res => {
                        var content = JSON.parse(res.data.content);
                        console.log(JSON.stringify(content));
                        if (res.data.status == 200) {
                            if (content.code == 100000) {
                                MessageBox.confirm('是否跳转查看详情?', '定制成功').then(action => {
                                    this.$router.push({
                                        path: '/userinfo/hemai/had_made',
                                        query:{
                                            id: content.data,
                                            goPage:'-1'
                                        }
                                    })
                                });
                            } else if (content.code == 201033) {
                                MessageBox.confirm('是否跳转查看详情?', content.message).then(action => {
                                    this.$router.push({
                                        path: '/userinfo/hemai/had_made',
                                        query:{
                                            goPage:'-1'
                                        }
                                    })
                                });
                            } else if (content.code == 201002) {
                                Toast('不能定制自己的跟单！');
                            } else if (content.code == 200000) {
                                Toast('定制失败！');
                            } else if (content.code == "201010") {
                                Toast("账户已被锁定，请联系客服");
                                setCookie('newData', '', '0-S');
                                this.$router.push({
                                    name: 'login'
                                })
                            }
                        } else {
                            Toast('服务器错误请稍后重试！');
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            getCelebrityDetail: function() {
                var data = [];
                data["userId"] = this.druserid;


                var datas = this.Qs.stringify({
                    data
                }, {
                    allowDots: true
                });

                this.$ajax.post('/caipiaoshouye/index.php/home/index/getCelebrityDetail',
                        datas
                    )
                    .then(res => {
                        var content = JSON.parse(res.data.content);
                        // console.log(JSON.stringify(content));
                        if (res.data.status == 200) {
                            if (content.code == 100000) {
                                this.month_data = content.data.monthlyRecord;
                                this.statisticsByLotteryType = content.data.statisticsByLotteryType;
                                console.log(JSON.stringify(this.statisticsByLotteryType));
                                for (var i = 0; i < this.statisticsByLotteryType.length; i++) {
                                    this.typetext.push({
                                        money: '金额',
                                        dwf: '元',
                                        type: 'FUND'
                                    })
                                }

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
    .bottoms{
        width: 0px;
        height: 0px;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid #ffffff;
        position: absolute;
        bottom: -8px;
        right: 0px;
        left: 0px;
        margin: auto;
      }
    .content {
        padding-bottom: 2%;
        position: fixed;
        top: 2.7rem;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #EFF5FB;
        overflow: scroll;
        -webkit-overflow-scrolling : touch;
    }
      .header {
        background: #fff;
        position: relative;
      }
      .user_phone {
        color: #000;
        /* font-weight: 600; */
        padding-bottom: 2%;
        border-bottom: 1px solid rgba(215, 222, 224, 0.49);
        border-style: dashed;
        margin: 0 3%;
        display: flex;
        font-size: .8rem;
        flex-direction: row;
        align-items: center;
      }
      .user_icon {
        width: 5%;
      }
      .phone {
        margin-left: 0.2rem;
      }
      .user_info {
        width: 100%;
        /*height: auto;*/
        /*display: flex;
        flex-direction: row;
        align-items: center;*/
        justify-content: space-between;
        padding: 2%;
      }
      .left {
        width: 100%;
        display: table;
        margin: .1rem 0px;
        /*display: flex;
        flex-direction: column;
        align-items: center;*/
        /*padding-left: 1%;*/
        box-sizing: border-box;
      }
       .left div{
        width: 50%;
        float: left;
        font-size: .6rem;
       }
       .color{
        color: #03A9F4;
       }
      .have_dot {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }

      .low_icon {
        width: 0.2rem;
        height: 0.2rem;
        background-color: #999;
        margin-right: 0.3rem;
      }
      .name {
        color: #999;
        font-size: 0.6rem;
      }
      .right {
        margin-top: .1rem;
        width: 100%;
        display: table;

      }
      .right div{
        float: left;
        width: 50%;
        font-size: .6rem;
        margin: .1rem 0px;

      }
      .contain {
            background: #fff;
        margin-bottom: 0.5rem;
      }
      .contain:first{
        margin: 0.5rem;
      }
      .lists {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        /* border: 1px solid #a7a7a7; */
        /* background-color: #F4F4F4; */
        margin: 0 3%;
        padding: 3% 0;
        margin-top: .5rem;
      }
      .lists:first-child {
        margin-top: 0;
      }
      .left_img {
        width: 20%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
            border-right: 1px solid rgba(224, 224, 224, 0.5);
      }
      .image {
        width: 12%;
        height: auto;
        display: inline-block;
      }
      .down_icon {
        width: 8%;
        display: inline-block;
        transform: rotate(180deg);
      }
      .down_icon.rotate{
        transform: rotate(0deg);
      }
      .image_big {
        width: 80%;
        margin: 0px auto;
      }
      .border {
        width: 0.05rem;
        height: 0.2rem;
        border-top: 2.5rem solid #999;
      }
      .middle {
        /*display: flex;
        flex-direction: row;*/
      }
      .lists_left {
        width: 50%;
        /*display: flex;
        flex-direction: column;
        align-items: flex-end;*/
        font-size: 0.6rem;
        color: #9b9b9b;
        font-weight: 600;
      }
      .left_name, .right_name {
        line-height: 1rem;
        color:#7C7C7C;
      }
      .user_info .right_name {
        font-weight: normal;
        color: #03A9F4;
      }
      .list_right, .list_left {
        font-weight: normal;
        float: left;
      }

      .lists_right  {
        font-size: 0.6rem;
        font-weight: normal;
        width: 50%;
      }

      .rightest {
        width: 4rem;
        height: 1.5rem;
        background-color: #FDC10A;
        color: white;
        line-height: 1.5rem;
        text-align: center;
        font-size: 0.6rem;
        border-radius: 1rem;
      }
      .rightest_name {
        margin-right: 0.1rem;
        margin-left: 0.3rem;
      }
      .scale {
        background-color: #fff;
        padding-top: 1rem;
        margin: 0 3%;
        text-align: center;
        padding-bottom: 0.5rem;
        /*border: 1px solid #a7a7a7;*/
        border-top: 0;
      }
      .money  input,.number  input,.input{
        border-left: 0px !important;
        border-right: 0px !important;
        border-bottom: 1px solid #8BA4AD;
        border-top: 0px !important;
        text-align: center;
        background: none !important;
      }
      .dis-no{
        display: none;
      }
      .number, .money, .less_money {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .number, .select, .money  {
        margin-bottom: 0.6rem;
      }
      .number, .money {
        margin-bottom: 0.8rem;
        text-align: left;
        margin-left: 4%;

      }
      .less_money {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-bottom: 1.5rem;
        margin-left: 4%;
      }
      .less_money input[type=checkbox]{
        display: block;
        border: 1px solid #4a4a4a;
        background: #fff;
        margin-right:  1%;

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
        background-color: none !important;
        border: 0px solid #a7a7a7 !important;
        border-bottom: 1px solid #8BA4AD !important;
        color: #999 !important;
        font-size: 0.6rem !important;
        line-height: 1rem !important;
        outline:0px;
        -webkit-appearance:none;

      }
      .input::-webkit-input-placeholder{
            color: #999;
            font-size: 0.6rem;
        }
      .scale_text {
        font-size: 0.6rem;
      }
      .only {
        font-size: 0.6rem;
        color: #999;
      }
      .select_two{
        color: #999;
        border: 1px solid #a7a7a7;
        padding: 0.2rem 0.6rem;
        background-color: white;
        margin-right: 0.4rem;
      }

    .active {
        color: #333;
        border: 1px solid #f00;
        background-image: url(../../../assets/userinfo/select_red.png);
        background-size: 1rem 108%;
        background-repeat: no-repeat;
        background-position: 100% 100%;
        background-size: 13px 13px;
        color: #f00;
    }

    .input_button {
        background-color: #E45869;
        color: white;
        width: 80%;
        height: 2.5rem;
        border-radius: 0.3rem;
        font-weight: bold;
        outline: 0px;
        -webkit-appearance: none;
    }

    .data_no {
        position: fixed;
        top: 50%;
        width: 100%;
        text-align: center;
        color: white;
    }

    .data_no span,
    .inputMoney span,
    .inputNumber span,
    .all span {
        width: 50%;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .hide {
        display: none;
    }

    .asdfsdfs {
        border-bottom: 1px dashed #a7a7a7 !important;
    }
    .input_button {
        background-color: #E45869;
        color: white;
        width: 80%;
        height: 2.5rem;
        border-radius: 0.3rem;
        font-weight: bold;
        outline:0px;
        -webkit-appearance:none;
      }
      .data_no {
        position: fixed;
        top: 50%;
        width: 100%;
        text-align: center;
        color: white;
      }
      .data_no span, .inputMoney span, .inputNumber span, .all span{
        width: 50%;
        background-color: rgba(0,0,0,0.5);
      }
      .hide{
        display: none;
      }
      .asdfsdfs {
          border-bottom: 1px dashed #a7a7a7 !important;
      }
      .bottom{
        position: absolute;
        bottom: -5px;
        left: 0px;
        right: 0px;
        /* top: 0px; */
        margin: auto;
        width: 0px;
        height: 0px;
        /* background: red; */
        border-left: 14px solid transparent;
        border-top: 7px solid white;
        /* border-bottom: transparent; */
        border-right: 14px solid transparent;
        /* border-color: #000; */
      }
      .titles{
        width: 100%;
        display: table;
        margin: 5% 0px;
      }
      .titles span{
        float: left;
      }
      .tlebox{
        width: 80%;
        margin: 0px auto;
        display: table;
      }
      .hex{
        width: 30%;
        height: 1px;
        border-bottom: 1px solid #AEB5BC;
            margin: .5rem 0px;
      }
      .tlt{
        width: 40%;
        text-align: center;
        color: #A8B0B8;
      }
      .dz_box{
        width: 100%;
      }
      .middle_list{
        width: 40%;
      }
</style>
