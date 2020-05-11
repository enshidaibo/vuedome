<template>
    <div>
        <nav-bar title="添加银行卡"></nav-bar>
        <section id="stop_scroll">
            <div class="task task10">

                <div class="headbg"><img src="../../assets/userinfo/addbank-copy.png"></div>
				            <div class="task10_box">
                <div class="tthc"></div>
                <div class="add-name">
                    <span>持卡人</span>
                    <div class="uname">{{kaname}}</div>
                </div>
                <div class="add-slide">
                    <span>银行卡号</span>
                    <input type="number" v-model="bankName" placeholder="暂不支持信用卡" class="uphone" id="addcardnum">
                </div>
                <div class="add-slide">
                    <span>所属银行</span>
                    <select v-model="cardNo" id="info_bankname">
                <option value="">请选择银行卡</option>
                <option value ="ccb">中国建设银行</option>
                <option value ="psbc">中国邮政银行</option>
                <option value="abc">中国农业银行</option>
                <option value="icbc">中国工商银行</option>
                <option value="boc">中国银行</option>
                <option value="cmbc">中国民生银行</option>
                <option value="cmb">招商银行</option>
                <option value="cib">兴业银行</option>
                <option value="bob">北京银行</option>
              
                <option value="comm">交通银行</option>
                <option value="ceb">中国光大银行</option>
                <option value="citic">中信银行</option>
                <option value="gdb">广发银行</option>
                <option value="sdb">深圳发展银行</option>
                <option value="hzb">杭州银行</option>
                <option value="bos">上海银行</option>
                <option value="pab">平安银行</option>
                <option value="cbhb">东莞银行</option>
                <option value="boc">渤海银行</option>
                <option value="czb">浙商银行</option>
                <option value="gzb">广州银行</option>
                <option value="hxb">华夏银行</option>
                <option value="spdb">浦发银行</option>
                <option value="bjrcb">北京农商银行</option>
              </select>
             <!-- <div class="jiantou">

              </div> -->
                </div>
                <div class="tthc"></div>
                <div class="add-slide">
                    <span>预留手机号</span>
                    <input class="uid" id="mobile" v-model="mobile" placeholder="银行预留手机号" type="number">
                </div>
            </div>

                <div class="okselect"  :class="{ 'ssactive': bankName.length>15&&mobile.length==11&&cardNo!='' }"  @click="okselect()">
                    确定
                </div>
                <div style="width: 100%;height: 1rem;"></div>
            </div>
        </section>
    </div>
</template>
<script>
    import {
        Toast,
        Indicator,
        MessageBox
    } from 'mint-ui';
    import {
        IsPhone,
        getCookie,
        setCookie,
        isIdBankCardNo
    } from "../../js/common";
    export default {
        data() {
            return {
                kaname: '',
                info_bankname: '',
                addcardnum: '',
                mobile: '',
                userId: '',
                bankName:'',
                cardNo:'',
   
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
            this.userId = uid.userid;
            this.getBanks(this.userId);
            Indicator.close();
        },
        methods: {
            getBanks: function(userId) {
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
                                    this.kaname = datas[0].cardName;
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
            okselect: function() {

                var bankName = this.info_bankname; //银行名称
                var cardNo = this.addcardnum; //卡号
                var mobile = this.mobile; //手机号码
                var userId = this.userId;
                if (!bankName) {
                    Toast("填写正确的银行");
                    return;
                }
                if (!IsPhone(mobile)) {
                    Toast("填写正确的手机号");
                    return;
                }
                if (!isIdBankCardNo(cardNo)) {
                    Toast("填写正确的银行卡号");
                    return;
                }
                this.addcheckBankCardNumber(userId, cardNo, mobile, bankName);
            },
            addcheckBankCardNumber: function(userId, cardNo, mobile, bankName) {
                var data = [];
                data["bankCard"] = cardNo;
                var datas = this.Qs.stringify({
                    data
                }, {
                    allowDots: true
                });

                this.$ajax.post('/caipiaoshouye/index.php/home/index/checkBankCardNumber',
                        datas
                    )
                    .then(res => {
                        if (res.data.status == 200) {
                            var content = JSON.parse(res.data.content);
                            if (content.code == 100000) {
                                console.log(JSON.stringify(content));
                                this.addBankfun(userId, cardNo, mobile, bankName, );
                            } else {
                                Toast(content.message);
                            }
                        } else {
                            Toast("服务器异常，请稍后重试！");
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            addBankfun: function(userId, cardNo, mobile, bankName) {
                var data = [];
                data["userId"] = userId;
                data["cardNo"] = cardNo;
                data["mobile"] = mobile;
                data["bankCode"] = bankName;
                var datas = this.Qs.stringify({
                    data
                }, {
                    allowDots: true
                });
                this.$ajax.post('/caipiaoshouye/index.php/home/index/addBank',
                        datas
                    )
                    .then(res => {
                        if (res.data.status == 200) {
                            var content = JSON.parse(res.data.content);
                            if (content.code == 100000) {
                                console.log(JSON.stringify(content));
                                Toast(content.message);
                                this.$router.go(-1);
                            } else {
                                Toast(content.message);
                            }
                        } else {
                            Toast("服务器异常，请稍后重试！");
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
   .task10 {
    width: 100%;
	padding-top: 1rem;
}
.tthc{
  width: 100%;
  height: 0.6rem;
  background-color: #f4f4f4;

}
input::-webkit-input-placeholder {
         color: #CCCCCC;

     }
.bbhc{
  margin-left: 1rem;
  margin-right: 1rem;
  height: 0.1rem;
  background-color: #eef6fa;
}
#stop_scroll{
width: 100%;
    background-color: #f4f4f4 !important;
    min-height: 100vh;
}
.headbg {
  width: 100%;
  height: auto;
}
.headbg img{
  width: 100%;
  height: auto;
}

.task10_box {
  width: 100%;
  height: 100%;
  background-color: #ffffff;

}

.task10 .add-name{
  width: 100%;
  height: 3.9rem;
  background-color: #ffffff;
  border-bottom: 1px  solid #E5E5E5 ;
}
.task10 .add-name span{
  display: block;
  width: 30%;
  height: 100%;
  float: left;
  margin-left: 1rem;
  font-size: 0.78rem;
  color: #333333;
  line-height: 3.9rem;
}
.task10 .add-name .uname{
  width: 50%;
  height: 100%;
  float: left;
  font-size: 0.78rem;
  color: #575757;
  line-height: 3.9rem;
}

.task10 .add-slide {
  width: 100%;
  height: 3.9rem;
  border-bottom: 1px  solid #E5E5E5 ;
  background-color: #ffffff;
  position: relative;
}
.jiantou{
  position: absolute;
  top: 1.65rem;
  right: 1.25rem;
  width: 0.6rem;
    height: 0.6rem;
    border-top: 1px solid #999999;
    border-right: 1px solid #999999;
    transform: rotate(135deg);
  }
.task10 .add-slide span {
  display: block;
  width: 30%;
  height: 100%;
  float: left;
  margin-left: 1rem;
  font-size: 0.78rem;
  color: #333333;
  line-height: 3.9rem;
}

.task10 .add-slide #info_bankname{
  background-image: url(../../assets/userinfo/addbank-copy2.png);
  background-repeat: no-repeat;
  background-position: right 50%;
  background-size: 0.8rem auto;
}

.task10 .add-slide #info_bankname, .task10 .add-slide .uphone, .task10 .add-slide .uid {
  width: 60%;
  height: 3.9rem;
  line-height: 1.9rem;
  float: left;
  font-size: 0.8rem;
  color: #666666;
}

.okselect {
  height: 2.2rem;
  margin-top: 1.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  line-height: 2.2rem;
  text-align: center;
  font-size: 0.86rem;
  color: #fff;
  background-color: #B5BABE;
  border-radius: 0.3rem;
}
.ssactive{
  background-color: #43A4F1 !important;
}

</style>
