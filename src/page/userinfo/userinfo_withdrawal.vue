<template>
    <div>
        <header class="aui-bar aui-bar-nav">
            <div class="aui-pull-left aui-btn" @click="bake()" tapmode>
                <span class="aui-iconfont aui-icon-left"></span>
            </div>
            <div class="aui-title">提现</div>
            <div class="withdrawal_help" @click="to_help();"><span>帮助</span></div>
        </header>
        <div id="vue-withdrawal">
            <div class="bgBox">
                <div class="bgBox_top">
                    <div class="ktmoneyBox_f">
                        <div class="ktyue" id="ktyues" @click="withdrawal_help();" tapmode>可提现余额</div>
                        <p class="balance" id='balances'>{{balance}}</p>
                        <span class="allDeposit" @click="allwithdrawal();" tapmode></span>
                    </div>
                    <div class="moneyBox">
                        <div class="cubox">
                            <p>账户余额</p>
                            <p class="balances" id='balance'>{{balances}}</p>
                        </div>
                        <div class="cubox">
                            <p class="gosih" id="ktyuesbb" @click="ktyuesbbAlt()" tapmode>需消费金额</p>
                            <p class="balances" id="asigoi">{{xbalance}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tx_jinginput">
                <span>提现金额</span>
                <input type="number" placeholder="输入提现金额(最低50元)" ref="input1" id="getmoneynum">
            </div>
            <div class="mod_fgx"></div>
            <p class="pFirst" @click="userinfo_select_banklist();">
                到账银行卡
                <span id="bankid">{{bankName}}</span>
                <span id="bankidhiden" style="display:none">{{bankId}}</span>
                <span class="mod_fhyh"></span>
            </p>
            <p class="getmoneytip4">
                收款人姓名
                <span>{{banUserName}}</span>
            </p>
            <div class="mod_fgx"></div>
            <p class="phoneP">
                预留手机号
                <span id="gettkpw_tel">{{mobile}}</span>
                <span id="gettkpw_telhidden" style="display:none">{{mobilehidden}}</span>
            </p>
            <p class="yanZhengMaP">
                <span class="yanZhengMaNum">提款验证</span>
                <input type="number" placeholder="输入验证码" ref="pcode" id="gettkpw_code">
                <span v-if="yamcode=='获取验证码'" id="gettkpw_codebtn" @click="getWithdrawalCode()">{{yamcode}}</span>
                <span v-else-if="yamcode!='获取验证码'" class="yanzheng" id="gettkpw_codebtn" @click="getWithdrawalCode()">{{yamcode}}</span>
            </p>
            <div class="mod_fgx"></div>
            <div class="getmoneytip3">
                <div>贴心提醒 :</div>

                <div>
                    需消费金额为0即可提领总资产
                </div>
            </div>
            <p id="getmoneybtnok" @click="withdrawalOfH5();">提现</p>


        </div>
        <div style="clear:both; height:0.5rem"></div>
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
        getSession,
        getCookie,
        setCookie,
        TypeCapitalconversionLowercase
    } from "../../js/common";
	 
    export default {
        data() {
            return {
                bankName: '',
                banUserName: '',
                mobile: '',
                mobilehidden: '',
                bankId: '',
                balance: '',
                balances: '',
                xbalance: '',
                resinput: '',
                m_snum2: 120,
                m_stimer2: null,
                yamcode: '获取验证码',
                allbanksz: [{
                        name: "ccb",
                        obj: {
                            "text": "中国建设银行",
                            "short": "建行"
                        }
                    },
                    {
                        name: "psbc",
                        obj: {
                            "text": "中国邮政储蓄",
                            "short": "邮政"
                        }
                    }, {
                        name: "abc",
                        obj: {
                            "text": "中国农业银行",
                            "short": "农行"
                        }
                    }, {
                        name: "icbc",
                        obj: {
                            "text": "中国工商银行",
                            "short": "工商"
                        }
                    }, {
                        name: "boc",
                        obj: {
                            "text": "中国银行",
                            "short": "中行"
                        }
                    }, {
                        name: "cmbc",
                        obj: {
                            "text": "中国民生银行",
                            "short": "民生"
                        }
                    }, {
                        name: "cmb",
                        obj: {
                            "text": "招商银行",
                            "short": "招商"
                        }
                    }, {
                        name: "cib",
                        obj: {
                            "text": "兴业银行",
                            "short": "兴业"
                        }
                    }, {
                        name: "bob",
                        obj: {
                            "text": "北京银行",
                            "short": "北京"
                        }
                    }, {
                        name: "comm",
                        obj: {
                            "text": "交通银行",
                            "short": "交通"
                        }
                    }, {
                        name: "ceb",
                        obj: {
                            "text": "中国光大银行",
                            "short": "光大"
                        }
                    }, {
                        name: "citic",
                        obj: {
                            "text": "中信银行",
                            "short": "中信"
                        }
                    }, {
                        name: "gdb",
                        obj: {
                            "text": "广发银行",
                            "short": "广发"
                        }
                    }, {
                        name: "sdb",
                        obj: {
                            "text": "深圳发展银行",
                            "short": "深发"
                        }
                    }, {
                        name: "hzb",
                        obj: {
                            "text": "杭州银行",
                            "short": "杭州"
                        }
                    }, {
                        name: "bos",
                        obj: {
                            "text": "上海银行",
                            "short": "上海"
                        }
                    }, {
                        name: "pab",
                        obj: {
                            "text": "平安银行",
                            "short": "平安"
                        }
                    }, {
                        name: "bod",
                        obj: {
                            "text": "东莞银行",
                            "short": "东莞"
                        }
                    }, {
                        name: "cbhb",
                        obj: {
                            "text": "渤海银行",
                            "short": "渤海"
                        }
                    }, {
                        name: "czb",
                        obj: {
                            "text": "浙商银行",
                            "short": "浙商"
                        }
                    }, {
                        name: "gzb",
                        obj: {
                            "text": "广州银行",
                            "short": "广州"
                        }
                    }, {
                        name: "hxb",
                        obj: {
                            "text": "华夏银行",
                            "short": "华夏"
                        }
                    }, {
                        name: "spdb",
                        obj: {
                            "text": "浦发银行",
                            "short": "浦发"
                        }
                    }, {
                        name: "bjrcb",
                        obj: {
                            "text": "北京农商银行",
                            "short": "农商"
                        }
                    }
                ]

            }
        },

        created() {
            Indicator.open("加载中");
            let uid = getCookie('newData');
            if (!uid) {
                this.$router.push({
                    name: 'login'
                })
                return false;
            }
            var userId = uid.userid;
            var data = [];
            this.getBanks(userId);
            this.showCanWithdrawMoney(userId);

            Indicator.close();
        },
        methods: {
            getBanks: function(userId) {
                var banklist = getSession(banklist)

                var data = [];
                data["userId"] = userId;
                var datas = this.Qs.stringify({
                    data
                }, {
                    allowDots: true
                });

                this.$ajax.post('/caipiaoshouye/index.php/home/index/getBanks',
                        datas
                    )
                    .then(res => {
                        var content = res.data;
                        // console.log(JSON.stringify(content));
                        if (content.status == 500) {
                            Toast('服务器异常，请稍后重试');
                            return;
                        }
                        var data = JSON.parse(content.content);;
                        if (data.code == 100000) {
                            this.bankName = this.GetNameFormBank(data.data[0].bankName) + '尾号(' + data.data[0].cardLastNum +
                                ')';
                            this.banUserName = data.data[0].cardName.replace(/.(?=.)/g, '*');
                            this.mobile = '*******' + data.data[0].mobile;
                            this.mobilehidden = data.data[0].mobile;
                            this.bankId = data.data[0].id;
                            if (banklist) {
                                this.bankId = banklist.bankname;
                            }


                        } else if (data.code == "201010") {
                            Toast("账户已被锁定，请联系客服");
                            setCookie('newData', '', '0-S');
                            this.$router.push({
                                name: 'login'
                            })
                        } else {
                            Toast('服务器异常，请稍后重试');
                        }

                    })
                    .catch(err => {
                        Toast('请检查网络连接！');
                    })
            },
            showCanWithdrawMoney: function(userId) {
                var data = [];
                data["userId"] = userId;
                var datas = this.Qs.stringify({
                    data
                }, {
                    allowDots: true
                });

                this.$ajax.post('/caipiaoshouye/index.php/home/index/showCanWithdrawMoney',
                        datas
                    )
                    .then(res => {
                        var content = res.data;
                        console.log(JSON.stringify(content));
                        if (content.status == 200) {
                            var strcon = JSON.parse(content.content)
                            if (strcon.code == 100000)

								this.balance = parseFloat(strcon.data.ableToWithdraw).toFixed(2);
							this.getUserInfo(userId);
						}

                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            getUserInfo: function(userId) {
                var data = [];
                data["userId"] = userId;
				data = this.Encrypt({...data});
                var datas = this.Qs.stringify({
                    data
                }, {
                    allowDots: true
                });

                this.$ajax.post('/caipiaoshouye/index.php/home/index/getUserInfo',
                        datas
                    )
                    .then(res => {
                        var content = res.data;
                        console.log(JSON.stringify(content));
                        if (content.status == 200) {
                            var strcon = JSON.parse(content.content);
                            if (strcon.code == 100000) {
                                this.balances = parseFloat(strcon.data.money).toFixed(2);
                                this.xbalance = Math.floor((this.balances - this.balance) * 100) / 100;
                                this.resinput = this.balance;

                            } else {
                                MessageBox('提示', strcon.message);
                            }
                        } else {
                            Toast('服务器错误，请稍后重试！')
                        }

                    })
                    .catch(err => {
                        Toast('请检查网络设置！')
                    })
            },
            ktyuesbbAlt: function() {
                MessageBox('贴心提示', '【需消费金额】是指您还需要投注多少金额，才可将总资产提出，否则仅能提出【可提现余额】');
            },
            withdrawal_help: function() {
                MessageBox('贴心提示', '单笔提款金额不得低于50元、高于50000元。');
            },
            allwithdrawal: function(userid) {
                this.$refs.input1.value = this.resinput;
            },
            getWithdrawalCode: function() {
                var money = this.$refs.input1.value;
                if (money < 50 || money > 50000) {
                    alert("请输入50~50000之间的数字");
                    return false;
                }
                if (this.yamcode != "获取验证码") {
                    Toast("获取验证码间隔不得少于90s");

                    return;
                }
                if (!money) {
                    Toast("请输入提现金额");

                    return;
                }
                let uid = getCookie('newData');
                if (!uid) {
                    this.$router.push({
                        name: 'login'
                    })
                    return false;
                }
                var userId = uid.userid;
                var data = [];
                var data = [];
                data["userId"] = userId;
                data["bankId"] = this.bankId;

                var datas = this.Qs.stringify({
                    data
                }, {
                    allowDots: true
                });

                this.$ajax.post('/caipiaoshouye/index.php/home/index/getWithdrawalCode',
                        datas
                    )
                    .then(res => {
                        var content = res.data;
                        if (content.status == 200) {
                            var strcon = JSON.parse(content.content);
                            console.log(JSON.stringify(strcon));
                            if (strcon.code == 100000) {

                                Toast(strcon.message);
                                this.mobilehidden = strcon.data.vid;
                                this.ScoreTime2Star();

                            }
                        }
                    })
                    .catch(err => {
                        Toast("请检查网络连接！")
                    })


            },

            ScoreTime2: function() {
                this.m_snum2--;
                this.yamcode = this.m_snum2 + "s";

                if (this.m_snum2 == 0) {
                    clearInterval(this.m_stimer2);
                    this.m_snum2 = 120;
                    this.yamcode = '获取验证码'
                }
                return 1;
            },
            ScoreTime2Star: function() {
                clearInterval(this.m_stimer2);
                this.yamcode = '90s';
                this.m_snum2 = 90;
                var that = this;
                this.m_stimer2 = setInterval(() => {
                    this.ScoreTime2();
                }, 1000)
            },
            withdrawalOfH5: function() {

                let uid = getCookie('newData');
                if (!uid) {
                    this.$router.push({
                        name: 'login'
                    })
                    return false;
                }
                var userId = uid.userid;
                var data = {};
                var money = this.$refs.input1.value;
                data["userId"] = userId;
                data["money"] = money;
                data["bankId"] = this.bankId;
                data["pvid"] = this.mobilehidden;
                data["pcode"] = this.$refs.pcode.value;
				data = this.Encrypt(data);
                var datas = this.Qs.stringify({
                    data
                }, {
                    allowDots: true
                });

                if (!money) {
                    alert("请输入提现金额");
                    return false;
                }
                if (money < 50 || money > 50000) {
                    alert("请输入50~50000之间的数字");
                    return false;
                }
                if (!this.$refs.pcode.value) {
                    alert("请输入验证码");
                    return false;
                }
                this.$ajax.post('/caipiaoshouye/index.php/home/index/withdrawalOfH5',
                        datas
                    )
                    .then(res => {
                        var content = res.data;
                        console.log(JSON.stringify(content));
                        var datacon = JSON.parse(content.content);
                        if (content.status == 200) {
                            if (datacon.code == 100013) {
                                this.$router.push({
                                    path: '/userinfo/userinfo_withdrawal_success',
                                    query: {
                                        money: money,
                                        banknames_page: this.bankName
                                    }
                                })
                            } else {
                                alert("服务器异常！");
                            }
                        } else {
                            alert("网络错误！");
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            userinfo_select_banklist: function() {
                this.$router.push({
                    name: 'userinfo_select_banklist'
                })
            },
            GetNameFormBank: function(name) {
                for (var i = 0; i < this.allbanksz.length; i++) {
                    if (name == this.allbanksz[i].name) {
                        return this.allbanksz[i].obj.text;
                    }
                }
            },

            bake: function() {
                sessionStorage.removeItem("banklist");
                this.$router.go(-1); //根据浏览器记录返回上一次

            },
            to_help: function() {
                this.$router.push({
                    name: 'withdrawal_help'
                })
            },
        }
    }
</script>
<style scoped>
    body {
        background: #fff !important;
    }

    header {
        position: fixed !important;
    }

    .active {
        color: #5fa3eb;
    }

    .withdrawal_help span {
        font-size: .8rem;
        color: #fff;
        display: block;
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: right;
        padding-right: 0.5rem;

    }

    .bgBox {
        width: 100%;
        height: 9rem;
        padding-top: 0.5rem;
        background-image: url(../../assets/userinfo/top_tximg.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-bottom: 3rem;
        margin-top: 2.25rem;
    }

    .bgBox_top {
        width: 95%;
        height: 11rem;
        background-image: url(../../assets/userinfo/top_tximgxy.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin: auto;
    }


    .moneyBox {
        width: 100%;
        text-align: center;

    }

    .ktmoneyBox_f {
        width: 100%;
        height: 6.5rem;
        padding: 1.2rem 1.2rem 0.6rem 1.2rem;
        position: relative;
    }

    .ktmoneyBox_f .ktyue {
        width: 6rem;
        letter-spacing: 2px;
        font-size: 0.5rem;
        text-align: left;
        line-height: 1.4rem;
        /* background-image: url(../../assets/userinfo/top_txwh.png); */
        background-repeat: no-repeat;
        background-position: 68% 50%;
        background-size: 0.7rem 0.7rem;
        ;
        color: #A9C1C9;
    }

    .ktmoneyBox_f .allDeposit {
        position: absolute;
        top: 3rem;
        right: 1.5rem;
        width: 3.8rem;
        height: 1.2rem;
        z-index: 1;
        display: block;
        background-image: url(../../assets/userinfo/to_txbtn.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
    }

    .ktmoneyBox_f .balance {
        font-size: 1.6rem;
        line-height: 2.4rem;
        color: #324958;
    }

    .ktmoneyBox_f .balance .currency {
        font-size: 0.5rem;
        line-height: 0.7rem;
    }


    .ktmoneyBox {
        width: 100%;
        margin-top: 0.6rem;
        margin-left: -3%;
        text-align: center;
        font-weight: bold;
    }

    .currency {
        font-size: .28rem;
        color: #fff;
    }

    .currencys {
        font-size: .28rem;
        color: #98d0ff;
    }


    .balance {
        font-size: .9rem;
        color: #fff;
    }


    .balances {
        font-size: .4rem;
        color: #98d0ff;
    }

    .bgBox .moneyBox {
        width: 93%;
        height: auto;
        margin: auto;
        display: flex;
        justify-content: center;
        border-top: 1px dashed #E6EBED;
    }

    .bgBox .moneyBox .cubox {
        padding: .8rem 0;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        height: 4rem;
        text-align: center;
    }

    .bgBox .moneyBox .cubox:first-child {
        border-right: 1px dashed #E6EBED;
    }

    .bgBox .moneyBox .cubox p {
        font-size: 0.5rem;
        color: #A9C1C9;
        letter-spacing: 2px;
        letter-spacing: 1px;
        text-align: center;
        line-height: 1rem;
    }

    .bgBox .moneyBox .cubox p.balances {
        font-size: 0.75rem;
        color: #324958;
        line-height: 1.4rem;

    }

    .gosih {
        /* background-image: url(../../assets/userinfo/top_txwh.png); */
        background-repeat: no-repeat;
        background-position: 78% 50%;
        background-size: 0.7rem 0.7rem;

    }


    .tx_jinginput {
        width: 92%;
        height: 3rem;
        line-height: 3rem;
        padding-left: 4%;
        display: flex;
    }

    .tx_jinginput span {
        width: 30%;
        color: #000000;
        font-size: 0.75rem;
    }

    .tx_jinginput #getmoneynum {
        width: 70%;
        height: 3rem;
        font-size: 0.7rem;
        border: none;
        text-align: left;
        background-color: #fff;

    }

    .mod_fgx {
        width: 100%;
        height: 0.2rem;
        background-image: url(../../assets/userinfo/mod_fgx.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .pFirst {
        width: 92%;
        height: 3rem;
        line-height: 3rem;
        color: #000000;
        font-size: 0.75rem;
        margin-left: 4%;
        margin-right: 0.5rem;
        padding-right: 1rem;
        position: relative;
        border-bottom: 1px solid #EEF6FA;
    }

    .pFirst #bankid {
        color: #18427E;
        font-size: 0.72rem;
        text-align: right;
        float: right;
    }

    .mod_fhyh {
        position: absolute;
        top: 1rem;
        right: 0.1rem;
        width: 0.4rem;
        height: 0.8rem;
        background-image: url(../../assets/userinfo/mod_fhyh.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }


    .getmoneytip4 {
        width: 92%;
        height: 3rem;
        line-height: 3rem;
        color: #000000;
        font-size: 0.75rem;
        margin-left: 4%;
        margin-right: 0.5rem;
    }

    .getmoneytip4>span {
        color: #18427E;
        font-size: 0.71rem;
        text-align: right;
        float: right;
    }

    .phoneP {
        width: 92%;
        height: 3rem;
        line-height: 3rem;
        color: #000000;
        font-size: 0.75rem;
        margin-left: 4%;
        margin-right: 0.5rem;

        border-bottom: 1px solid #EEF6FA;

    }

    .phoneNum {
        display: inline-block;
        width: 25%;
        font-weight: bold;
    }

    #gettkpw_tel {
        color: #18427E;
        font-size: 0.71rem;
        text-align: right;
        float: right;
    }

    .yanZhengMaP {
        width: 92%;
        height: 3rem;
        line-height: 3rem;
        color: #000000;
        font-size: 0.75rem;
        margin-left: 4%;
        margin-right: 0.5rem;
        display: flex;
        position: relative;
    }

    .yanZhengMaNum {
        display: inline-block;
        width: 25%;
        font-size: 0.75rem;
    }

    #gettkpw_code {
        display: inline-block;
        width: 45%;
        height: 3rem;
        font-size: 0.71rem;
        border: none;
        background: #fff;

    }

    #gettkpw_codebtn {
        position: absolute;
        top: 0.7rem;
        right: 0;
        width: 4.5rem;
        height: 1.6rem;
        font-size: 0.6rem;
        text-align: center;
        text-align: center;
        background-image: url(../../assets/userinfo/mod_txbottyzm.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        line-height: 1.6rem;
        color: #ffffff;
    }

    .yanzheng {
        background-image: url(../../assets/userinfo/mod_txbottyzmhui.png) !important;
    }

    .getmoneytip3 {
        width: 100%;
        text-align: center;
        top: 8rem;
    }

    .getmoneytip3 {
        width: 100%;
        font-size: 0.28rem;
        text-align: center;
        padding-top: 1rem;
        line-height: 0.8rem;
    }

    .getmoneytip3>div {
        color: #B4B4B4;
        font-size: .48rem;
    }



    #getmoneybtnok {
        width: 90%;
        height: 2.4rem;
        margin-top: 1rem;
        margin-left: 5%;
        font-size: 1rem;
        text-align: center;
        line-height: 2.4rem;
        background-color: #43A4F1;
        border-radius: 0.2rem;
        color: #ffffff;

    }


    /* 帮助*/

    .help {
        width: 100%;
        height: auto;
        padding-top: 3.5rem;
        padding-bottom: 2.5rem;
    }

    .help>p {
        width: 100%;
        height: auto;
        padding: 0.8rem 1.2rem;
        font-size: 0.74rem;
        text-align: left;
        line-height: 1.7em;
        color: #000;
        border-bottom: 1px solid #e1dddd;
    }

    /*提现成功*/

    .box_success {
        background: #f2f2f2;
        height: 92.5vh;
    }

    .stateBox {
        width: 100%;
        position: absolute;
        padding-bottom: .3rem;
        background: #fff;
    }

    .imgBox {
        width: 100%;
        height: 2rem;
        background: #fff;
        margin-top: 1.5rem;
    }

    .imgBox>img {
        display: block;
        margin: 0 auto;
        margin-top: .6rem;
        width: 4.8rem;
        height: 4.8rem;
    }

    .yiTiJiao {
        width: 100%;
        background: #fff;
        text-align: center;
        color: #747474;
        font-size: 1.2rem;
        height: 5.5rem;
        line-height: 8.9rem;
    }

    .finance {
        width: 100%;
        background: #fff;
        text-align: center;
        color: #E0A444;
        font-size: .65rem;
        height: 1.2rem;
        line-height: 1.2rem;
    }

    .moneyDetialBox {
        width: 100%;
        position: absolute;
        top: 10.9rem;
    }

    .moneyDetialBox>div {
        width: 100%;
        background: #fff;
        height: .8rem;
        line-height: .8rem;
        border-bottom: 1px solid #f2f2f2;
    }

    .bankCardBox>span:first-child {
        display: inline-block;
        width: 30%;
        padding-left: .9rem;
        font-size: .78rem;
        color: #747474;
    }

    .bankCardBox>span:last-child {
        display: inline-block;
        width: 65%;
        padding-left: .3rem;
        font-size: .78rem;
        color: #18427E;
        text-align: right;
    }

    .moneyDetialBox>div {
        width: 100%;
        background: #fff;
        height: 2.5rem;
        line-height: 2.5rem;
        border-bottom: 1px solid #f2f2f2;
    }

    .moneySumBox>span:first-child {
        display: inline-block;
        width: 30%;
        padding-left: .9rem;
        font-size: .78rem;
        color: #747474;
    }

    .moneySumBox>span:last-child {
        display: inline-block;
        width: 65%;
        padding-left: .9rem;
        font-size: .78rem;
        color: #D65665;
        text-align: right;
    }

    #txWanCheng {
        width: 94%;
        height: 2.2rem;
        border-radius: 0.3rem;
        font-size: 0.82rem;
        text-align: center;
        line-height: 2.2rem;
        background: #60A2EB;
        color: #fff;
        display: inline-block;
        position: absolute;
        bottom: 0.6rem;
        left: 2%;
        top: 22rem;
    }
</style>
