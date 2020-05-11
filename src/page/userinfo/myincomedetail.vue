  <style scoped>
   .aui-bar-nav {
        top: 0;
        line-height: 2.25rem;
        background-color: #fff;
        color: #333;
        border-bottom: 1px solid #eee;
      }
      .aui-bar-nav .aui-btn .aui-iconfont{
        font-size: 0.9rem;
        line-height: 1.25rem;
        padding: 0;
        margin: 0;
        color: #333;
      }
      body{
        width: 100%;
        min-height: 100vh;
        background: #fff;
        padding-bottom: 1rem;
      }
      .top_{
        width: 100%;
        height: 30vh;
        overflow: hidden;
        position: relative;
      }
      .bg_blue{
        width: 200%;
        height: 200%;
        position: absolute;
        border-radius: 100%;
        bottom: 0px;
        left: -50%;
        margin: auto;
        background: -webkit-linear-gradient(rgba(34, 160, 255, .5), rgba(42, 85, 255, .9)); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(rgba(34, 160, 255, .5), rgba(42, 85, 255, .9)); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(rgba(34, 160, 255, .5), rgba(42, 85, 255, .9)); /* Firefox 3.6 - 15 */
        background: linear-gradient(rgba(34, 160, 255, .5), rgba(42, 85, 255, .9)); /* 标准的语法 */
      }
      .ra1,.ra2,.ra3{
          width: 20vh;
          height: 20vh;
          position: absolute;
          left: 20%;
          top: 44%;
          border-radius: 100%;
          background: rgba(255, 255, 255, 0.037);
      }
      .ra2{
        left: initial;
        right: 30% !important;
        width: 10vh;
        height: 10vh;
        top: 62%;
      }
      .ra3{
        left: initial;
        right: 22% !important;
        width: 16vh;
        height: 16vh;
        top: 70%;
      }
      .content{
        width: 100%;
        display: block;
        position: relative;
      }
      .content h4{
        font-size: .7rem;
        color: #fff;
        text-align: center;
        position: relative;
        z-index: 999;
        padding: 1rem 0px;
        padding-bottom: 0px;
      }
      .content strong{
        color: #fff;
        margin: 0px auto;
        text-align: center;
        font-size: 1.8rem;
        padding: 0px;
        width: 100%;
        display: block;
      }
      .content ul{
        width: 100%;
        height: auto;
        display: table;
        margin-top: .5rem;
      }
      .content ul li{
        width: 50%;
        float: left;
        text-align: center;
        color: #fff;
      }
      .content ul li p:nth-of-type(1){
        color: rgba(206, 224, 255, 1);
        font-size: .7rem;

      }
      .content ul li p{
        color: rgba(255, 255, 255, 1);
        font-size: 1rem;
      }
      .smStatus{
        position: absolute;
        left: 2vh;
        top: 0px;
        width: 4vh;
        z-index: 999;
      }
      .items{
        width: 100%;
        height: auto;
        display: table;
        position: relative;
        top: -2rem;
      }

      .items ul{
        width: 100%;
        display: table;

      }
      .items ul li{
        width: 90%;
        margin: 0px auto;
        background: #fff;
        box-shadow: 0px 0px .8rem rgb(208, 207, 207);
        border-radius: .3rem;
        padding-bottom: .5rem;
        /*margin-top: 1rem;*/
        margin-bottom: 1rem;
      }
      .items ul li h4{
        font-size: 1.5rem;
        color: #000;
        font-weight: bold;
        /* height: 2rem; */
        line-height: 1rem;
        text-align: center;
        padding-top: 1.5rem;
      }
      .items ul li strong{
        padding-top: .5rem;
        font-size: .7rem;
        font-weight: bold;
        color: #000;
        text-align: center;
        margin: 0px auto;
        width: 100%;
      }
      .items p:nth-of-type(1){
        width: 90%;
        display: table;
        margin: 0px auto;
        padding: .5rem 0px;
        padding-top: 1rem;
      }
      .items p span:nth-of-type(1){
        float: left;
      }
      .items p span:nth-of-type(2){
        float: right;
      }
      .items p span em{
        font-style: normal;
        font-size: .8rem;
        color: rgba(102, 102, 102, 1);
        line-height: 1rem;
      }
      .items p span:nth-of-type(1) em:nth-of-type(1),.items p span:nth-of-type(2) em:nth-of-type(1){
        font-size: .6rem;
        color: rgba(102, 102, 102, 1);
      }
      .hb{
        font-size: .7rem !important;
        font-weight: bold;
        line-height: 1rem;
        color: rgba(255, 97, 50, 1) !important;
      }
      .xj{
        font-size: .7rem !important;
        line-height: 1rem;
        font-weight: bold;
        color: rgba(2, 164, 255, 1) !important;
      }
      .jd{
        width: 90%;
        margin: 0px auto;
        height: .6rem;
        border-radius: 1rem;
        position: relative;
        overflow: hidden;
      }
      .jdhb{
        /*display: block;
        position: absolute;
        min-width: 14%;
        width: 0%;
        height: 50vh;
        max-width: 86%;
        bottom: 0px;
        left: 116px;
        transform: skewX(-35deg) translateX(0rem);
        -moz-transform: skewX(-35deg) translateX(0rem);
        background: rgba(255, 97, 50, 1);
        transition: 1s;*/
        display: block;
        position: absolute;
        min-width: 12%;
        width: 0%;
        height: 50vh;
        max-width: 88%;
        bottom: 0px;
        left: 0;
        /*transform: skewX(0deg) translateX(0rem);*/
        /*-moz-transform: skewX(-35deg) translateX(0rem);*/
        background: rgba(255, 97, 50, 1);
        transition: 1s;
      }
      .jdxj{
        /*display: block;
        position: absolute;
        height: 50vh;
        min-width: 14%;
        max-width: 86%;
        width: 0%;
        top: 0px;
        right: 0px;
        background: rgba(2, 164, 255, 1);
        transform: skewX(-35deg) translateX(0rem);
        -moz-transform: skewX(-35deg) translateX(0rem);
        right: 116px;
        transition: 1s;
        background: rgba(2, 164, 255, 1);*/
        display: block;
        position: absolute;
        height: 50vh;
        min-width: 12%;
        max-width: 88%;
        width: 0%;
        top: 0px;
        right: 0px;
        background: rgba(2, 164, 255, 1);
        /* transform: skewX(-35deg) translateX(0rem); */
        /*-moz-transform: skewX(-35deg) translateX(0rem);*/
        right: 0;
        transition: 1s;
        background: rgba(2, 164, 255, 1);
      }
      .jdhb em{
        /*position: absolute;
        right: .2rem;
        font-size: .5rem;
        color: #fff;
        bottom: 0px;
        font-style: normal !important;
        line-height: 0.6rem;
        transform: skewX(35deg);
        -moz-transform: skewX(35deg);*/

        position: absolute;
        right: .2rem;
        font-size: .5rem;
        color: #fff;
        bottom: 0px;
        font-style: normal !important;
        line-height: 0.6rem;

      }
      .jdxj em{
        /*position: absolute;
        left:.3rem;
        font-size: .5rem;
        color: #fff;
        top: 0px;
        font-style: normal !important;
        line-height: 0.6rem;
        transform: skewX(35deg);
        -moz-transform: skewX(35deg);*/
        position: absolute;
        left: .3rem;
        font-size: .5rem;
        color: #fff;
        top: 0px;
        font-style: normal !important;
        line-height: 0.6rem;
      }
      .zjhy{
        left: 2.5rem;
      }
      [v-cloak] {
        display: none;
      }
  </style>

<template>
    <div>
        <header class="aui-bar aui-bar-nav" id="app">
            <div class="aui-pull-left aui-btn">
                <span class="aui-iconfont aui-icon-left" @click="bake()"></span>
            </div>
            <div class="aui-title">好友返利</div>
            <!-- <div class="aui-btn aui-pull-right" id="cp_name" onclick="alert('加急开发中...')">
                <img src="../images/wh.png" alt="">
            </div> -->
        </header>
        <div class="" id='app' v-cloak>

      <div class="top_">
        <img v-if='realId != 1' src="../../assets/nosm.png" class='smStatus' alt="">
        <img  v-if='realId == 1' src="../../assets/yessm.png" class='smStatus' alt="">
        <img v-if='isDirect == 0' src="../../assets/zjhy.png" class='smStatus zjhy' alt="">
        <img v-if='isDirect == 1' src="../../assets/jjhy02.png" class='smStatus zjhy' alt="">

        <div class="bg_blue">
          <div class="ra1"></div>
          <div class="ra2"></div>
          <div class="ra3"></div>
        </div>
        <div class="content">
          <h4 v-if='isDirect == 0'>直接好友总收益(元)</h4>
          <h4 v-if='isDirect == 1'>间接好友总收益(元)</h4>
          <strong>{{allMoney}}</strong>
          <ul>
            <li>
              <p>红包收益(元)</p>
              <p>{{hb}}</p>
            </li>
            <li>
              <p>现金收益(元)</p>
              <p>{{cash}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="items">
        <ul>
          <li v-for='(item,index) in datas'>
            <h4>{{item.allMoney}}</h4>
            <strong>好友{{item.name}}收益(元)</strong>
            <p>
              <span><em>红包收益:</em><em class="hb">{{(item.hbsy*1).toFixed(2)}}元</em></span>
              <span><em>现金收益:</em><em class="xj">{{(item.xjsy*1).toFixed(2)}}元</em></span>
            </p>
            <div class="jd">
              <span class="jdhb" :id='"jdhb"+index ' ref='jdhb'>
                <em>{{item.hbsybf}}%</em>
              </span>
              <span class="jdxj " :id='"jdxj"+index' ref='jdxj'>
                <em>{{item.xjsybf}}%</em>
              </span>
            </div>
          </li>

        </ul>
      </div>
    </div>
    </div>
</template>

<script>
    import {
        mobileHide,
        getCookie,
        setCookie,
    } from "../../js/common"
    export default {
        data() {
            return {
                datas:[
                    {
                      'name':"充值",
                      'allMoney':'0.00',
                      'hbsy':"0",
                      'hbsybf':"50",
                      'xjsy':"0",
                      'xjsybf':"50",
                    },
                    {
                      'name':"购彩",
                      'allMoney':'0.00',
                      'hbsy':"0",
                      'hbsybf':"50",
                      'xjsy':"0",
                      'xjsybf':"50",
                    },
                    {
                      'name':"实名",
                      'allMoney':'0.00',
                      'hbsy':"0",
                      'hbsybf':"50",
                      'xjsy':"0",
                      'xjsybf':"50",
                    },
                    {
                      'name':"其他",
                      'allMoney':'0.00',
                      'hbsy':"0",
                      'hbsybf':"50",
                      'xjsy':"0",
                      'xjsybf':"50",
                    }
                  ],
                  isDirect:"",  //直接间接受益
                  realId:"",  //是否实名
                  allMoney:"0.00",//总收益
                  hb:"0.00",//红包收益
                  cash:"0.00",//现金收益

            };
        },
        created() {
            //this.title = this.$route.params.friendId
            console.log(this.$route)
            this.getData(this.$route.query.friendId,this.$route.query.name)
        },
        mounted() {
            this.animate()
        },
        methods: {
            jump:function(){
                if(this.title == 1){
                    this.$router.replace({
                        path: 'myincomeContent',
                        query: {
                            pageId:"1"
                        }
                    })
                }else{
                    this.$router.replace({
                        path: 'todayearnings',
                        query: {
                            pageId:"0"
                        }
                    })
                }
            },
            bake:function(){
                this.$router.go(-1);
            },
            getData:function(friendIds){
                var that = this;

                    var data = this.Encrypt({

                              friendId:friendIds,
                            userId:getCookie('newData').userid
                          });
                    var datas = this.Qs.stringify({
                        data
                    }, {
                        allowDots: true
                    })
                    this.$ajax.post('/caipiaoshouye/index.php/home/index/friendProfitDetails',
                        datas
                    ).then(ret => {
                        console.log(ret)
                        if (ret) {
                            // alert( JSON.stringify( ret ) );
                            if(ret.data.status == 200){
                              if(ret.data.content.code == 1000){
                                var obj = ret.data.content.obj;
                                if(obj){
                                  that.realId = obj.realId
                                  that.isDirect = obj.isDirect
                                  that.allMoney = (obj.summary.allMoney).toFixed(2)
                                  that.hb = (obj.summary.hb).toFixed(2)
                                  that.cash = (obj.summary.cash).toFixed(2)

                                  //充值
                                  that.datas[0]['allMoney'] = (obj.summary.deposit).toFixed(2)
                                  that.datas[0]['hbsy'] = (obj.summary.depositHB)
                                  that.datas[0]['xjsy'] = (obj.summary.depositCash)
                                  // alert(obj.summary.depositHB + obj.summary.depositCash)
                                  // alert(obj.summary.bettingHB + obj.summary.bettingCash)
                                  // alert(obj.summary.realNameHB + obj.summary.realNameCash)
                                  //   alert(obj.summary.otherHB + obj.summary.otherCash)
                                  if((obj.summary.depositHB + obj.summary.depositCash) != 0){
                                    that.datas[0]['hbsybf'] = (obj.summary.depositHB /  (obj.summary.depositHB + obj.summary.depositCash)*100).toFixed(2)
                                    that.datas[0]['xjsybf'] = (obj.summary.depositCash /  (obj.summary.depositHB + obj.summary.depositCash)*100).toFixed(2)
                                  }else{
                                    that.datas[0]['hbsybf'] = '50.00'
                                    that.datas[0]['xjsybf'] = '50.00'
                                  }
                                    //购彩
                                  that.datas[1]['allMoney'] = (obj.summary.betting).toFixed(2)
                                  that.datas[1]['hbsy'] = (obj.summary.bettingHB)
                                  that.datas[1]['xjsy'] = (obj.summary.bettingCash)
                                  if((obj.summary.bettingHB + obj.summary.bettingCash)  != 0){
                                    that.datas[1]['hbsybf'] = (obj.summary.bettingHB /  (obj.summary.bettingHB + obj.summary.bettingCash)*100).toFixed(2)
                                    that.datas[1]['xjsybf'] = (obj.summary.bettingCash /  (obj.summary.bettingHB + obj.summary.bettingCash)*100).toFixed(2)
                                  }else{
                                    that.datas[1]['hbsybf'] = '50.00'
                                    that.datas[1]['xjsybf'] = '50.00'
                                  }
                                    //实名
                                  that.datas[2]['allMoney'] = (obj.summary.realName).toFixed(2)
                                  that.datas[2]['hbsy'] = (obj.summary.realNameHB)
                                  that.datas[2]['xjsy'] = (obj.summary.realNameCash)

                                  if((obj.summary.realNameHB + obj.summary.realNameCash) != 0){
                                    that.datas[2]['hbsybf'] = (obj.summary.realNameHB /  (obj.summary.realNameHB + obj.summary.realNameCash)*100).toFixed(2)
                                    that.datas[2]['xjsybf'] = (obj.summary.realNameCash /  (obj.summary.realNameHB + obj.summary.realNameCash)*100).toFixed(2)
                                  }else{
                                    that.datas[2]['hbsybf'] = '50.00'
                                    that.datas[2]['xjsybf'] = '50.00'
                                  }
                                  //其他
                                  that.datas[3]['allMoney'] = (obj.summary.other).toFixed(2)
                                  that.datas[3]['hbsy'] = (obj.summary.otherHB)
                                  that.datas[3]['xjsy'] = (obj.summary.otherCash)
                                  if((obj.summary.otherHB + obj.summary.otherCash) != 0){
                                    that.datas[3]['hbsybf'] = (obj.summary.otherHB /  (obj.summary.otherHB + obj.summary.otherCash) * 100).toFixed(2)
                                    that.datas[3]['xjsybf'] = (obj.summary.otherCash /  (obj.summary.otherHB + obj.summary.otherCash) * 100).toFixed(2)
                                  }else{
                                    that.datas[3]['hbsybf'] = '50.00'
                                    that.datas[3]['xjsybf'] = '50.00'
                                  }
                                  that.animate()
                                }else{
                                  alert('数据请求为空.')
                                  that.animate()
                                }

                              }else{
                                alert(ret.content.message)
                                that.animate()
                              }
                            }else{
                              alert("网络请求失败.")
                              that.animate()
                            }
                        } else {
                            alert( JSON.stringify( err ) );
                            that.animate()
                        }
                      })
                      .catch(err => {
                        console.log(err);
                      })

              },
              animate:function(){
                for(var i = 0;i<this.datas.length;i++){
                  (function(i,that){
                    var class1 = 'jdhb'+i, class2 = 'jdxj'+i,j = i;
                    setTimeout(function(){
                      // alert(that.datas[j]['hbsybf'] +"/"+that.datas[j]['xjsybf'])
                      document.getElementById(class1).style.width = that.datas[j]['hbsybf']+'%';
                      document.getElementById(class2).style.width = that.datas[j]['xjsybf']+'%';
                    },100)
                  })(i,this)
                }
              }

        }
    }
</script>


