<template>
    <div>
        <nav-bar title="选择银行卡"></nav-bar>
        <section class="coneten">
            <div id="allcardmain" class="allcardmain">
                <ul id="allcardul" class="allcardul">
                    <li v-for='(d,i) in datas' @click="selectbank_back(i)" :data-id="d.id" :data-mob="d.cardLastNum"
                        :data-name="contents[i]" :data-imgname="d.bankName">
                        <!-- <span :class="[d.defaultCard ?'check':'']"></span> -->
                        <div class="imgBox">
                            <img class="imgClass" :src="'http://mi.facaime.com/caipiaoshouye/Public/images/'+ d.bankName + '.png'"
                                alt="">
                        </div>
                        <div>
                            <p>{{contents[i]}}</p>
                            <p>**** **** **** {{d.cardLastNum}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <p id="addcardbtn" class="addcardbtn" @click="addbank()" tapmode><span>+新增银行卡</span></p>
        </section>
    </div>
</template>
<script>
    import {
        Toast,
        Indicator
    } from 'mint-ui';
    import {
        getCookie,
        setSession,
        setCookie,
        TypeCapitalconversionLowercase
    } from "../../js/common";
    export default {
        data() {
            return {
                allcardulilst: '',
                datas: '',
                contents: '',
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
            this.getbanks(userId);
            Indicator.close();
        },
        methods: {
            getbanks: function(userId) {
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


                        if (res.data.status == 200) {
                            var content = JSON.parse(res.data.content);

                            if (content.code == 100000) {
                                console.log(JSON.stringify(content));
                                if (content.data.length > 0) {
                                    var datas = content.data;
                                    console.log(JSON.stringify(datas));
                                    this.allcardulilst = content;
                                    this.datas = datas;
                                    this.contents = this.allcardulilstobg(content);
                                }
                            } else if (content.code == "201010") {
                                Toast("账户已被锁定，请联系客服");
                                setCookie('newData', '', '0-S');
                                this.$router.push({
                                    name: 'login'
                                })
                            }
                        } else {
                            Toast("服务器异常，请稍后重试！");
                        }
                    })
                    .catch(err => {
                        Toast("请检查网络连接！");
                        console.log(err);
                    })
            },
            allcardulilstobg: function(obg) {
                var alllist = [];
                var data = obg.data;
                for (var i = 0; i < data.length; i++) {
                    var name = this.GetNameFormBank(data[i].bankName);
                    alllist.push(name);
                }
                console.log(alllist);
                return alllist;
            },
            GetNameFormBank: function(name) {
                for (var i = 0; i < this.allbanksz.length; i++) {
                    if (name == this.allbanksz[i].name) {
                        return this.allbanksz[i].obj.text;
                    }
                }
            },
            selectbank_back: function(i) {
                var banklist = {
                    bankname: this.datas[i].id,
                    bankcard: this.contents[i],
                    mobile: this.datas[i].cardLastNum,
                    bankimgname: this.datas[i].bankName
                }
                setSession("banklist", banklist);
                this.$router.go(-1);
            },
            addbank: function() {
                this.$router.push({
                    name: 'userinfo_addbank'
                })
            }
        }
    }
</script>
<style scoped>
    html {
        height: 100%
    }

    html body {
        height: 100%;
        background: #fff;
    }

    .coneten {
        padding-top: 2.25rem;
    }

    #allcardbox {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
        background: #fff;
        z-index: 20;
        display: none;
    }

    .allcardmain {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        overflow-y: scroll;
        background-color: #fff;
    }

    .allcardul {
        width: 100%;
    }

    .allcardul>li {
        width: 88%;
        margin: 0 auto;
        margin-top: .5rem;
        height: 5.3rem;
        position: relative;
        padding-left: 2.4rem;
        border-radius: 0.5rem;
        background-color: #1A8BE5;
        /* 标准的语法 */
        /*border-bottom: 1px solid #e4e4e4;*/
        background-image: url("../../assets/userinfo/bj.png");
        background-position: 6% 31%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-bottom: 0.5rem;
    }

    /*.allcardul>li>span:first-child {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: 32%;
  right: 2%;
  z-index: 10;
  background: url("../../../images/mqc/gou_xz2.png") left center no-repeat;
  background-size: 1.2rem 1.2rem;
}*/

    /*.allcardul>li>span:first-child.check {
    background: url("../../../images/mqc/gou_xz.png") left center no-repeat;
    background-size: 1.2rem 1.2rem;
}*/
    .imgBox {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        position: absolute;
        top: 1.5rem;
        background: #fff;
        left: 1rem;
    }

    .imgClass {
        position: absolute;
        top: .35rem;
        left: .35rem;
        width: 1.3rem;
        height: 1.3rem;
        border-radius: 50%;
    }

    .allcardul>li>div:nth-child(2) {
        margin-left: 2rem;
    }

    .allcardul>li>div:nth-child(2) {
        width: 80%;
        height: 100%;
        padding: 1rem 0;
    }

    .allcardul>li>div:nth-child(2)>p:first-child {
        text-align: left;
        height: 1.1rem;
        line-height: 1.1rem;
        font-size: 0.9rem;
        color: #fff;

    }

    .allcardul>li>div:nth-child(2)>p:nth-child(2) {
        height: 1.6rem;
        padding-top: .6rem;
        text-align: left;
        line-height: 1.6rem;
        font-size: 1.15rem;
        font-weight: bold;
        color: #fff;
    }

    .addcardbtn {
        width: 90%;
        height: 2.5rem;
        line-height: 2.5rem;
        text-align: center;
        font-size: 0.9rem;
        color: #fff;
        background-color: #43A4F1;
        border-radius: 0.2rem;
        bottom: 20%;
        position: fixed;
        text-align: center;
        margin-left: 5%;
    }

    /*.addcardbtn>span:first-child {
  display: inline-block;
      width: 5rem;
      height: 1.4rem;
      font-size: 1.5rem;
      text-align: center;
      line-height: 2.3rem;
      position: absolute;
      top: 0.3rem;
      left: 18%;
      color: #fff;
}*/

    /*.addcardbtn>span:nth-child(2) {
  display: inline-block;
  width: 100%;
  height: 1.4rem;
  font-size: 1.1rem;
  text-align: left;
  line-height: 2.9rem;
  position: absolute;
  top: 0;
  left: 38%;
  color: #fff;
}*/

    /*.addcardbtn>span:nth-child(3) {
    display: inline-block;
    width: 1rem;
    height: 1.4rem;
    font-size: 0.5rem;
    text-align: center;
    line-height: 1.4rem;
    position: absolute;
    top: 0;
    right: 0.1rem;
    color: #cccccc;
    display: none;
}*/

    .addcardbtn strong {
        font-size: 0.6rem;
        color: #fff;
    }

    .weiXinBangDing {
        background: #fff;
        margin: auto;
        width: 90%;
        height: 14rem;
        border-radius: .1rem;
        -moz-box-shadow: 2px 2px 5px #969696;
        -webkit-box-shadow: 2px 2px 5px #969696;
        box-shadow: 2px 2px 5px #969696;
        padding-top: .2rem;
        position: relative;
    }

    .wxunbind {
        width: 40%;
        left: 30%;
    }

    .wx2imgboximg {
        width: 2.5rem;
        height: 2.5rem;
        position: absolute;
        top: 30%;
        left: 35%;
    }

    .wx2imgboxnick {
        display: inline-block;
        width: 3.4rem;
        height: 0.4rem;
        position: absolute;
        top: 50%;
        left: 30%;
        text-align: center;
        line-height: 0.4rem;
        font-size: 0.5rem;
        color: #444;
        z-index: 2;
    }

    .wxunbind {
        width: 5rem;
        height: 1.4rem;
        border-radius: 0.2rem;
        font-size: 0.6rem;
        text-align: center;
        line-height: 1.4rem;
        background: #43a4f1;
        color: #fff;
        display: inline-block;
        position: absolute;
        top: 56%;
        left: 21%;
        z-index: 10;
    }

    .erWeiMaBox {
        position: relative;
        background: #fff;

        width: 90%;
        margin: auto;
        border: 0;
        height: 12rem;
        border-radius: .1rem;
        -moz-box-shadow: 2px 2px 5px #969696;
        -webkit-box-shadow: 2px 2px 5px #969696;
        box-shadow: 2px 2px 5px #969696;
        padding-top: .2rem;
    }

    .my2imgboximg {
        border: 1px solid #979797;
        position: absolute;
        top: 15%;
        right: 20%;
    }

    .changan {
        width: 100%;
        font-size: 0.5rem;
        color: #9B9B9B;
        font-weight: bold;
        text-align: center;
        position: absolute;
        top: 60%;

    }

    .allcardmain_btn {
        width: 60%;
        height: 3rem;
        margin: 2rem auto;

    }

    .allcardmain_btn div {
        font-size: 0.6rem !important;
        height: 2rem;
        line-height: 2rem;
    }
</style>
