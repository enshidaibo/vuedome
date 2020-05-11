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
      #app{
        padding-bottom: 5rem;
        min-height: 100vh;
        /*background: #fff;*/
      }
      [v-cloak] {
        opacity:0 !important;
      }
      canvas {
        margin: 0px auto;
        display: block;
        /*margin-top: -1.2rem;*/
        background: #fff;
      }
      .swiper-container{
        background: #fff;
      }
      .title_li{
        width: 100%;
        position: relative;
      }
      .title_li ul{
        width: 100%;
        display: flex;
        background: #F4F4F4;
      }
      .title_li ul li{
        justify-content: center;
        align-items: center;
        line-height: 2.5rem;
        margin: .1rem 0px;
        text-align: center;
        padding: 0px 0.78rem;
        font-size: .7rem;
      }
      .oi{
        display: block;
        width: 5px;
        height: 5px;
        float: left;
        background: #3A3A3A;
        border-radius: 100%;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);
        margin: 1.1rem .3rem;
      }
      .cz{
        background: #478EFF !important;
        box-shadow: 0px 0px 5px #478EFF !important;
      }
      .gc{
        background: #FF618B !important;
        box-shadow: 0px 0px 5px #FF618B !important;
      }
      .sm{
        background: #02DBA4 !important;
        box-shadow: 0px 0px 5px #02DBA4 !important;
      }
      .other{
        background: #FFC02E !important;
        box-shadow: 0px 0px 5px #FFC02E !important;
      }
      .swiper-button-next,.swiper-button-prev{
        background-image: none !important;

      }
      .swiper-button-next{
        width: 0.7rem;
        height: 0.7rem;
        border: 2px solid #666;
        transform: rotate(-45deg);
        border-left: 0px;
        border-top: 0px;
        right: 1.2rem;
      }
      .swiper-slide{
        /*height: 30vh;*/
      }
      .swiper-button-prev{
        width: 0.7rem;
        height: 0.7rem;
        border: 2px solid #666;
        transform: rotate(45deg);
        border-right: 0px;
        border-top: 0px;
        left: 1.2rem;
      }
      .transX{
        position: absolute;
        width: 0px;
        height: 0px;
        /*background: #fff;*/
        /*transform: rotate(45deg);*/
        bottom: 0px;
        border-bottom: .5rem solid  #fff;
        transition: .3s;
        border-left: .5rem solid transparent;
        border-right: .5rem solid transparent;
      }
      .sy{
        width: 100%;
        background: #fff;
        margin-top: -.6rem;
        padding-bottom: .5rem;
        overflow: hidden;
      }
      .sy ul{
        width: 100%;
        display: table;
      }
      .sy ul li{
        width: 50%;
        float: left;
        text-align: center;
      }
      .sy ul li p{
        display: table;
        text-align: center;
        margin: .2rem auto;
      }
      .sy ul li span{
        float: left;
        display: table;
        text-align: center;
      }
      .sy_o{
        width: .3rem;
        height: .3rem;
        background: #000;
        margin: 0.3rem;
      }
      .red{
        background: #FF7882 !important;
      }
      .yellow{
        background: #FFD863 !important;
      }
      .sy_vas{
        display: block;
        width: 100%;
      }
      .hbsy{
        font-size: .6rem;
        color: #333;
        margin-right: .1rem;
      }
      .moneysy{
        font-size: .6rem;
        color: #000;
        font-weight: bold;
      }
      .zs{
        background: #9390FF !important;
      }
      .zs1{
        background: #E27FFD !important;
      }
      .userlist{
        width: 100%;
        background: #fff;
        margin-top: .5rem;
      }
      .userlist ul{
        width: 100%;
        display: table;
        position: relative;
      }

      .tops_title li{
        width: 33.333%;
        float: left;
         margin: .6rem 0px;
         position: relative;
        /*border-right: 1px solid #f7f7f7;*/

      }
      .tops_title li:nth-of-type(3){
        border: 0px;
      }
      .tops_title  li > .f span{
        line-height: 1.2rem !important;

      }
      .tops_title li > .f span img{
        margin: .5rem 0.2rem !important;

        }
      .userlist ul li{
        float: left;
      }
      .userlist ul li > .f{
        display: table;
        margin: 0px auto;
      }
      .userlist ul li > .f span{
        display: block;
        float: left;
        text-align: center;
        line-height: 2.2rem;
        font-size: .7rem;
      }
      .userlist ul li > .f span img{
        margin: 1rem 0.2rem;
        width: .3rem;
        display: block;
      }
      .num{
        color: #666;
        font-size: .5rem !important;
      }
      .tops_title{
        border-bottom: 1px solid #f7f7f7;
      }
      .mimg{
      }
      .mimg img{
        margin: .75rem 0.1rem !important;
        width: 1.5rem !important;
        display: block;
        border-radius: 50%;
      }
      .user_l span,.user_l p{
        color:#444444;
        font-size: .6rem;
      }
      .user_l p {
        margin: .3rem 0px;
        line-height: .8rem;
        font-weight: bold;
        text-align: center;
      }
      .user_l p:nth-of-type(1){
        color: #FF4646 !important;
        margin-bottom: 0px !important;
      }
      .user_l p:nth-of-type(2){
        color: #FFC146 !important;
        margin-top: 0px !important;
      }
      .rightJt{
        position: absolute;
        width: .3rem;
        right: 1rem;
        top: 0px;
        bottom: 0px;
        margin: auto;
      }
      .pList {
            margin-top: .8rem;
        display: block;
        width: 100%;
        background: #fff;
      }
      .pList ul{
        width: 100%;
        height: auto;
        display: table;
      }
      .pList ul li{
        width: 100%;
        display: block;
        padding: .5rem 0px;
        border-bottom: 1px solid #f7f7f7;
      }
      .pList ul li p{
        width: 98%;
        display: table;
        margin: 0px;
        padding: 0px 1%;
      }
      .pList ul li p span:nth-of-type(1){
        float: left;
      }
      .pList ul li p span:nth-of-type(2){
        float: right;
      }
      .pList ul li p:nth-of-type(1) span{
        font-size: .7rem;
      }
      .pList ul li p:nth-of-type(1) span:nth-of-type(1){
        color: #333;
      }
      .pList ul li p:nth-of-type(1) span:nth-of-type(2){
        font-size: .9rem !important;
      }
      .pList ul li p:nth-of-type(2){
        font-size: .5rem;
        color: #B6B6B6;
      }
      .xj{
        color: #FFD345;
      }
      .hb{
        color: #FF6132;
      }
      .friend_title{
        width: auto;
        display: table;
        margin: 0px auto;
        /*margin-top: -1.2rem;*/
      }
      .friend_title ul{
        width: auto;
        display: table;
        margin: 0px auto;
      }
      .friend_title ul li{
        padding: .4rem 1rem;
        font-size: .6rem;
        float: left;
        display: block;
        color: #fff;
      }
      .friend_title ul li:nth-of-type(1){
        background: #7C78FF;
      }
      .friend_title ul li:nth-of-type(2){
        background: #D17FFD;
      }
      .mid{
        margin-top: 0px !important;
      }
      .mid li{
        background: none !important;
        color: #666 !important;
      }
      .friend_box{
        width: 100%;
        background: #fff;
        display: table;
        position: relative;
      }
      .userName{
        line-height: 1.3rem !important;
        margin-top: .5rem !important;
        margin-left: .2rem !important;
      }
      .isSm{
        line-height: .6rem !important;
        margin-left: .2rem !important;
        background: #02E8C8;
        padding: .1rem;
        font-size: .5rem !important;
        border-radius: .2rem;
        color: #fff !important;
      }
      .user_l li:nth-of-type(1){
        margin: 0px !important;
      }
      .user_l li{
        width: 100% !important;
        display: table;
        border-bottom: 1px solid #f7f7f7;
      }
      .userImg{
        float: left;
        height: 1.8rem !important;
        border-radius: 100%;
        margin: .6rem;
        margin-right: .5rem;
      }
      .userImg img{
        width: auto;
        height: 100%;
        display: block;
      }
      .user_info{
        float: left;
        margin: .6rem 0px;
        height: 1.8rem;
      }
      .user_info span{
        display: block;
        color: #333;
        font-size: .7rem;
        font-weight: bold;
        /* line-height: .7rem; */
        /* margin: .2rem 0px; */
        margin-bottom: 0px;
        /* margin-top: .1rem; */
      }
      .user_info span:nth-of-type(2){
        display: table !important;
        color: #fff;
        background: #02E8C8;
        font-weight: normal;
        font-size: .5rem !important;
        border-radius: .2rem;
        padding: 0rem .2rem;
        /* margin-top: .2rem; */
      }
      .syInfo{
        float: right;
        height: 1.8rem;
        margin: .6rem;
      }
      .syInfo span{
        display: block;
        text-align: right;
        color: #999999;
      }
      .syInfo span:nth-of-type(1){
        color: #333;
        font-size: .7rem;
      }
      .noSm{
        background: #D6D6D6 !important;
        color: #fff;
      }
      .more{
        width: 85%;
        margin: 0px  auto;
        line-height: 2rem;
        color: #fff;
        background: #05A9F5;
        border-radius: .4rem;
        text-align: center;
        margin-top: 1rem;
      }
      .nomore{
        width: 85%;
        margin: 0px  auto;
        line-height: 2rem;
        color: #333;
        border-radius: .4rem;
        text-align: center;
        margin-top: 1rem;
      }
      .sx_right{
        position: absolute;
        top: 1.5rem;
        right: 0px;
        left: 1.5rem;
        margin: auto;
        width: 70%;
        z-index: 10;
      }
      .sx_right div{
        width: 10px;
        height: 10px;
        background: #fff;
        position: absolute;
        z-index: 5px solid red;
        /* border-left: 8px solid transparent; */
        /* border-bottom: 10px solid #fff; */
        /* border-right: 8px solid transparent; */
        /* z-index: 999; */
        right: 1rem;
        border-radius: .1rem;
        top: -3px;
        transform: rotate(45deg);
        float: right;
        box-shadow: 0px 0px 5px rgb(153, 153, 153);
      }
      .sx_right ul{
        width: 100%;
        text-align: center;
        background: #fff;
        border-radius: .2rem;
        box-shadow: 0px 0px 5px rgba(153, 153, 153, 0.44);

      }
      .sx_right ul li{
        width: 100%;
        text-align: center;
        color: #666;
        line-height: .8rem;
        font-size: .7rem;
        margin: 0;
        padding: .5rem 0px;
        position: relative;
        z-index: 9999;
      }
      .sx_right ul li:active{
        background: #f7f7f7;
      }
      .top_wir{
        box-shadow: 0 0 0 #fff !important;
        z-index: 999;
        top: -4px !important;
      }
      .appBox{
        min-height: 100vh;
      }
  </style>

<template>
    <div>
              <div class="appBox"  @click='hides($event)' >
           <header class="aui-bar aui-bar-nav">
                <div class="aui-pull-left aui-btn">
                    <span class="aui-iconfont aui-icon-left" @click="bake()"></span>
                </div>
                <div class="aui-title">我的好友</div>
                <!-- <div class="aui-btn aui-pull-right" id="cp_name" onclick="alert('加急开发中...')">
                    <img src="../images/wh.png" alt="">
                </div> -->
            </header>
            <div id="app"  v-cloak>
      
        <canvas id="cavans"   height="225hv"></canvas>
      <div class="friend_box">
        <div class="friend_title">
          <ul>
            <li>直接好友({{directCount}})</li>
            <li>间接好友({{indirecteCount}})</li>
          </ul>
        </div>
        <div class="friend_title mid">
          <ul>
            <li>未实名: {{notrealCount}}</li>
            <li>已实名: {{realCount}}</li>
          </ul>
        </div>
      </div>
        <div class="userlist">
            <ul class="tops_title">
              <li @click='hideShow'>
                <div class="f">
                  <span  class='li'>按收益排行</span>
                  <span  class='li'><img src='../../assets/xl7.png' /></span>
                </div>
                <div class="sx_right" v-show='isShow_sx'>
                  <div class="top_jc">
                  </div>
                  <div class="top_jc top_wir">
                  </div>
                  <ul>
                    <li class='li' @click='screenType(0)'>全部</li>
                    <li class='li' @click='screenType(1)'>已实名</li>
                    <li class='li' @click='screenType(2)'>未实名</li>
                  </ul>
                </div>
              </li>
            </ul>
            <ul  class="user_l">
                <li v-for='(item,index) in userList' @click='jump(item.uid,item.userName)'>
                  <div class="userImg">
                    <img src="../../assets/toux.png" />
                  </div>
                  <div class="user_info">
                    <span>{{(item.userName).replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')}}</span>
                    <span v-if= 'item.realid == 1'>已实名</span>
                    <span  class="noSm" v-if= 'item.realid == 0'>未实名</span>
                  </div>
                  <div class="syInfo">
                    <span>总收益: {{(item.money).toFixed(2)}}</span>
                    <span>注册时间: {{(item.createTime).split(' ')[0]}}</span>
                  </div>
                </li>
                <!--
                <li>
                  <div class="userImg">
                    <img src="../images/toux.png" />
                  </div>
                  <div class="user_info">
                    <span>130****5678</span>
                    <span class="noSm">未实名</span>
                  </div>
                  <div class="syInfo">
                    <span>总收益:132.00</span>
                    <span>注册时间:2019-05-09</span>
                  </div>
                </li> -->
            </ul>


        </div>
        <p class="more" v-if='userList.length'  v-show='!pages && isShow' @click='lookMore()'>查看更多好友</p>
        <p class="nomore" v-if='userList.length' v-show='pages'>没有更多数据了...</p>
        <p class="nomore" v-if='userList.length == 0  && !isShow'>暂无好友收益</p>
        <!-- <div class="pList">
            <ul class="plistUl">
              <li>
                <p class="ulP1"><span>直接好友累计充值888元奖励</span><span class="xj">+8.88</span></p>
                <p class="ulP2"><span>2019/05/09 20:30:00</span><span>现金</span></p>
              </li>
              <li>
                <p class="ulP1"><span>直接好友累计充值888元奖励</span><span class="hb">+8.88</span></p>
                <p class="ulP2"><span>2019/05/09 20:30:00</span><span >红包</span></p>
              </li>

            </ul>
        </div> -->
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
                  mySwiper:"",
                  pages:false,
                  isShow:true,
                        isShow_sx:false,
                  titles:[
                    {
                      'name':"全部",
                      'class':'',
                      'arcData':[
                        {
                    color:'#D17FFD',    //颜色
                    proportion:'50',    //比例。例如（25%）
                    texts:[
                        {
                              lineHeight:'0',   //行高
                              texts:'间接好友收益',   //内容
                              textColor:'#999999'   //字体颜色
                            },
                            {
                              lineHeight:'25',
                              texts:'0.00元',
                              textColor:'#D17FFD'   //字体颜色
                            },
                          ],    //文字描述
                          scale:'1',            //缩放
                          distance:35       //字体园新距离

                        },
                        {
                          color:'#7C78FF',  //颜色
                          texts:[
                            {
                              lineHeight:'0',
                              texts:'直接好友收益',
                              textColor:'#999999'   //字体颜色（可选）
                            },
                            {
                              lineHeight:'25',
                              texts:'0.00元',
                              textColor:'#7C78FF'   //字体颜色（可选）

                            },
                          ],    //文字描述
                          proportion:'50',  //比例。例如（25%）
                          distance:35   //字体园新距离
                        }
                        ],
                        'alignConten':[
                          {
                            content:'0',
                            fontsize:'15 ',
                          fontWeight:'bold',
                            lineHeight:'8',
                            color:"#333"
                          },
                          {
                            content:'总人数',
                            fontsize:'8 ',
                          fontWeight:'normal',
                            lineHeight:'12',
                            color:"#333"
                          },
                        ]
                    },
                  ],
                  userList:'',
                  page:"1",
                  limit:"10",
                  realCount:"0",//实名人数
                  notrealCount:"0",//未实名人数
                  directCount:"0",  //直接好友人数
                        screens:"0",

                  indirecteCount:"0"  //间接好友人数

            };
        },
        created() {
            this.title = this.$route.query.pageId
            this.getData()
        },
        mounted() {
        },
        methods: {
            hides:function(event){
                // console.log(event.target)
                // alert(event.target.className)
                if((event.target.className).indexOf('li')<0){
                  this.isShow_sx = false
                }
              },
              hideShow:function(){    //  筛选
                this.isShow_sx ? this.isShow_sx = false:this.isShow_sx = true;
              },
              screenType:function(ops){  //变化列表类型
                this.screens = ops;
                this.page = 1;
                this.getData();
              },
            tap:function(index){
                this.title = index
                this.jump()
            },
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
            lookMore:function(){  //分页查看更多
                this.page++;
                this.getData()
              },
              getData:function(){
                var that =  this;

                    console.log({userId:getCookie('newData').userid,
                            page:that.page,
                            limit:that.limit,
                            screens:that.screens})
                    var data = this.Encrypt({
                            userId:getCookie('newData').userid,
                            page:that.page,
                            limit:that.limit,
                            screen:that.screens
                          });
                    var datas = this.Qs.stringify({
                        data
                    }, {
                        allowDots: true
                    })
                    this.$ajax.post('/caipiaoshouye/index.php/home/index/myFriendProfit',
                        datas
                    )
                      .then(ret => {
                        console.log(ret)
                        if (ret) {
                          // alert( JSON.stringify( ret ) );
                          if(ret.data.status == 200){
                            if(ret.data.content.code == 1000){
                              if(ret.data.content.obj){

                                var obj = ret.data.content.obj;
                                that.realCount = obj.realCount //实名人数
                                that.notrealCount = obj.notrealCount,//未实名人数
                                that.directCount = obj.directCount,  //直接好友人数
                                that.indirecteCount = obj.indirecteCount  //间接好友人数
                                // that.userList = obj.profitRank;  //好友列表
                                if( obj.profitRank.length < that.limit && obj.profitRank.length > 0){
                                  that.isShow = false;  //隐藏查看更多
                                }
                                if(that.page == 1){  //分页判断
                                  that.userList = obj.profitRank;
                                  if(obj.profitRank.length  == 0){
                                    that.isShow = false;  //显示缺省页
                                  }
                                }else{  //下一页不再执行绘画
                                  if(obj.profitRank == ''){  //下一页等于空 返回之前page
                                    that.pages = true;  //提示没更多数据
                                    that.page--;
                                    return
                                  }else{
                                    for(var m = 0;m<obj.profitRank.length;m++){
                                      that.userList.push(obj.profitRank[m])
                                    }
                                    return
                                  }
                                }
                                if( (obj.direct + obj.indirecte) == 0){
                                  that.titles[0]['arcData'][0]['proportion'] =  "50" //间接好友占比
                                  that.titles[0]['arcData'][1]['proportion'] =  "50" //直接好友占比
                                }else{
                                  // alert((((obj.indirecte / (obj.direct + obj.indirecte)).toFixed(2)) == '0.00'?'0':(obj.indirecte / (obj.direct + obj.indirecte)).toFixed(2)) * 100)
                                  // alert((((obj.direct / (obj.direct + obj.indirecte)).toFixed(2)) == '0.00'?'0':(obj.direct / (obj.direct + obj.indirecte)).toFixed(2)) * 100)
                                  that.titles[0]['arcData'][0]['proportion'] = (((obj.indirecte / (obj.direct + obj.indirecte)).toFixed(2)) == '0.00'?'0':(obj.indirecte / (obj.direct + obj.indirecte)).toFixed(2)) * 100   //间接好友占比
                                  that.titles[0]['arcData'][1]['proportion'] = (((obj.direct / (obj.direct + obj.indirecte)).toFixed(2)) == '0.00'?'0':(obj.direct / (obj.direct + obj.indirecte)).toFixed(2)) * 100   //直接好友好友占比
                                }
                                that.titles[0]['arcData'][0]['texts'][1]['texts'] = (obj.indirecte).toFixed(2)//间接好友收益
                                that.titles[0]['arcData'][1]['texts'][1]['texts'] = (obj.direct).toFixed(2)//直接好友收益
                                that.titles[0]['alignConten'][0]['content'] = obj.allCount//总好有人数
                                that.drawing()
                              }else{
                                alert('数据获取为空.')
                                that.drawing()
                              }
                            }else{
                               that.isShow = false  //显示缺省页 => 暂无收益
                              alert('暂无好友收益')
                              that.drawing()
                            }
                          }else{
                            alert('网络请求失败.')
                            that.drawing()
                          }
                      } else {
                          alert( JSON.stringify( err ) );
                          that.drawing()
                      }
                      })
                      .catch(err => {
                        console.log(err);
                      })
              },
                jump:function(uId,name){
                  this.$router.push({
                    path: '/userinfo/myincomedetail',
                    query: {
                        'friendId':uId,
                        'name':name
                    }
                  })
                },
                draw:function(index,els,arcX,arcY,arcR,width,font,arc,middleText){  //画圆
                  circle({
                    el:index+els,
                    type:"0",
                    arcX:arcX,
                    arcY:arcY,
                    arcR:arcR,  //半径
                            width:width,    //圆宽度
                            font:font,  //文字描述字号
                            arc:arc,
                            middleText:middleText
                  }).then(function(res){
                    console.log(res.result)
                    if(res.result){
                      if(index){
                        vm.titles[index][els] = '1';
                      }
                    }
                  })
                },
                drawing:function(){
                  //主图
                  this.draw(
                    '',
            'cavans',
            document.documentElement.clientWidth / 2,
            50 + 25,
            50,
            20,
            '0.5rem',
            this.titles[0]['arcData'],
            this.titles[0]['alignConten']
          )
        }

        }
    }
</script>


