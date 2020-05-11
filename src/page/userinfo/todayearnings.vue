  <style scoped>
      #app{
        padding-bottom: 5rem;
        min-height: 100vh;
        /*background: #fff;*/
      }
      [v-cloak] {
        opacity:0 !important;
      }
      .w{
        width: 100%;
        background: #fff;
        position: relative;
      }
      canvas {
        margin: 0px auto;
        background: #fff;
        display: block;
      }
      #cavans{

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
        /*margin-top: -.6rem;*/
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
        width: 90%;
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
        margin-top: .8rem;
      }
      .userlist ul{
        width: 100%;
        display: table;
        position: relative;
      }
      .tops_title li{
         position: relative;
        
        border-right: 1px solid #f7f7f7;

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
        width: 33.333%;
        float: left;
            margin: .6rem 0px;
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
        width: .65rem !important;
        display: block;
      }
      .user_l{
        border-bottom: 1px solid #f7f7f7;
      }
      .user_l span,.user_l p{
        color:#444444 !important;
        font-size: .6rem !important;
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
      .item_ul{
        position: absolute;
        right:0rem;
        top: 0px;
        bottom: 0px;
        margin: auto;
        width: 50%;
        height: 60%;
      }
      .item_ul ul li{
        display: table;
        margin: .5rem auto;
        width: 100%;
        text-align: center;
        padding-left: 1rem;
      }
      .item_ul ul li span{
        float: left;
        margin-right: .8rem;
        font-size: .6rem;
        line-height: .7rem;
        text-align: center;
        color: #777777;
      }
      .logo_ote{
        width: .3rem;
        height: .3rem;
        border-radius: 100%;
        margin: .2rem 0px;
        background: #478EFF;
        box-shadow: 0px 0px 5px #478EFF;
        float: right;
      }
      .s{
        background: #FF618B !important;
        box-shadow: 0px 0px 5px #FF618B !important;
      }
      .n{
        background: #02DBA4 !important;
        box-shadow: 0px 0px 5px #02DBA4 !important;
      }
      .o{
        background: #FFC02E !important;
        box-shadow: 0px 0px 5px #FFC02E !important;
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
        left: 0px;
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
         <div id="app"  v-cloak >
                <div class="appBox"  @click='hides($event)' >
        <div class="w">
          <canvas id="cavans"  height="150hv"></canvas>
          <div class="item_ul">
            <ul>
              <li>
                <span class="logo_ote"></span>
                <span>充值</span>
                <span>{{deposit}}</span>
              </li>
              <li>
                <span class="logo_ote s"></span>
                <span>购彩</span>
                <span>{{betting}}</span>
              </li>
              <li>
                <span class="logo_ote n"></span>
                <span>实名</span>
                <span>{{realName}}</span>
              </li>
              <li>
                <span class="logo_ote o"></span>
                <span>其他</span>
                <span>{{other}}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="sy" >
          <ul>
            <li v-for='(itemd,indexd) in childrenData'>
              <div class="sy_canvas">
                <canvas :id="indexd + 'sy_canvas'" class='sy_vas'  height="100hv"></canvas>
              </div>
              <p v-if='itemd.hbsy'>
                <span class="sy_o red"></span><span class="hbsy">红包收益:</span><span class="moneysy">{{itemd.hbsy}}元</span>
              </p>
              <p v-if='itemd.xjsy'>
                <span class="sy_o yellow"></span><span class="hbsy">现金收益:</span><span class="moneysy">{{itemd.xjsy}}元</span>
              </p>
              <p v-if='itemd.zjsy'>
                <span class="sy_o zs1"></span><span class="hbsy">直接好友收益:</span><span class="moneysy">{{itemd.zjsy}}元</span>
              </p>
              <p v-if='itemd.jjsy'>
                <span class="sy_o  zs"></span><span class="hbsy">间接好友收益:</span><span class="moneysy">{{itemd.jjsy}}元</span>
              </p>
            </li>
          </ul>
        </div>


        <div class="userlist">
            <ul class="tops_title">
              <li @click='hideShow'>
                <div class="f">
                  <span class='li'>用户</span>
                  <span class="num li">({{userList.length}})</span>
                  <span class='li'><img class='li' src='../../assets/xl7.png' /></span>
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
              <li>
                <div class="f">
                  <span>红包/现金</span>
                </div>
              </li>
              <li>
                <div class="f">
                  <span>总收益</span>
                </div>
              </li>
            </ul>
            <ul  class="user_l" @click='jump(item.friendId,item.userName)' v-for="(item,index) in userList">
              <li>
                <div class="f">
                  <span class="mimg" v-if='item.types == 0'><img src='../../assets/zj8.png' /></span>
                  <span class="mimg" v-if='item.types == 1'><img src='../../assets/jj8.png' /></span>
                  <span>{{(item.userName).replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')}}</span>
                </div>
              </li>
              <li>
                <div class="f">
                  <p>{{(item.moneyHB?item.moneyHB:0).toFixed(2)}}</p>
                  <p>{{(item.money?item.money:0).toFixed(2)}}</p>
                </div>
              </li>
              <li>
                <div class="f">
                  <span>{{((item.moneyHB?item.moneyHB:0)+(item.money?item.money:0)).toFixed(2)}}</span>
                </div>
              </li>
              <img src="../../assets/q43.png"  class='rightJt' alt="">
            </ul>

            <!-- <ul  class="user_l">
              <li>
                <div class="f">
                  <span class="mimg"><img src='../images/jj8.png' /></span>
                  <span>13013245678</span>
                </div>
              </li>
              <li>
                <div class="f">
                  <p>23.00</p>
                  <p>300.00</p>
                </div>
              </li>
              <li>
                <div class="f">
                  <span style="color:#FE4A82 !important;">未实名</span>
                </div>
              </li>

              <img src="../images/q43.png"  class='rightJt' alt="">
            </ul>
            <ul  class="user_l">
              <li>
                <div class="f">
                  <span class="mimg"><img src='../images/zj8.png' /></span>
                  <span>13013245678</span>
                </div>
              </li>
              <li>
                <div class="f">
                  <p>23.00</p>
                  <p>300.00</p>
                </div>
              </li>
              <li>
                <div class="f">
                  <span style="color:#02DBA4 !important;">已实名</span>
                </div>
              </li>
              <img src="../images/q43.png"  class='rightJt' alt="">
            </ul> -->
        </div>
        <p class="more" v-if='userList.length && isShow' @click='lookMore'>查看更多好友</p>
        <p class="nomore" v-if='userList.length == 0 && isShow'  >暂无收益</p>

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
              isShow:false,
                    isShow_sx:false,

              titles:[
                {
                  'name':"全部",
                  'class':'',
                  'arcData':[
                      {
                        color:'#478EFF',  //颜色
                        proportion:'25',  //比例。例如（25%）
                        texts:[
                          {
                            lineHeight:'0',
                            texts:'100%',
                            // textColor:'red'  //字体颜色（可选）
                          }
                        ],
                        scale:'1',      //缩放
                      },
                      {
                        color:'#FF618B',  //颜色
                        proportion:'25',  //比例。例如（25%）
                        texts:[
                          {
                            lineHeight:'0',
                            texts:'100%',
                            // textColor:'red'  //字体颜色（可选）
                          }
                        ],
                        scale:'1',      //缩放
                      },
                      {
                        color:'#02DBA4',  //颜色
                        proportion:'25',  //比例。例如（25%）
                        texts:[
                          {
                            lineHeight:'0',
                            texts:'100%',
                            // textColor:'red'  //字体颜色（可选）
                          }
                        ],
                        scale:'1',      //缩放
                      },
                      {
                        color:'#FFC02E',  //颜色
                        proportion:'25',  //比例。例如（25%）
                        texts:[
                          {
                            lineHeight:'0',
                            texts:'100%',
                            // textColor:'red'  //字体颜色（可选）
                          }
                        ],
                        scale:'1',      //缩放
                      }
                    ],
                    'alignConten':[
                      {
                        content:'0.00',
                        fontsize:'15 ',
                          fontWeight:'bold',
                        lineHeight:'8',
                        color:"#333"
                      },
                      {
                        content:'今日收益',
                        fontsize:'8 ',
                          fontWeight:'normal',
                        lineHeight:'8',
                        color:"#333"
                      },
                    ]
                }
              ],
              pageData:'',
              childrenData:[//子级小圆 2个
                {
                  'hbsy':'0.00',
                  'xjsy':'0.00',
                  'data':[
                    {
                      color:'#FF7882',  //颜色
                      proportion:'0',  //比例。例如（25%）
                      texts:[
                        {
                          lineHeight:'0',
                          texts:'',
                          // textColor:'red'  //字体颜色（可选）
                        }
                      ],
                      scale:'1',      //缩放
                      fontColor:"#FFCE29" //文字字体
                    },
                    {
                      color:'#FFCE29',  //颜色
                      proportion:'0',  //比例。例如（25%）
                      texts:[
                        {
                          lineHeight:'0',
                          texts:'',
                          // textColor:'red'  //字体颜色（可选）
                        }
                      ],
                      scale:'1',      //缩放
                      fontColor:"#FFCE29" //文字字体
                    }
                  ],
                  'childrenAlignconten':[
                    {
                      content:'0%',
                        fontsize:'10',
                        fontWeight:'bold',
                      lineHeight:'6',
                      color:"#FF7882"
                    },
                    {
                      content:'0%',
                        fontsize:'10',
                        fontWeight:'bold',
                      lineHeight:'10',
                      color:"#FFCE29"
                    },
                  ]
                },
                {
                  'zjsy':'0.00',
                  'jjsy':'0.00',
                  'data':[
                    {
                      color:'#E27FFD',  //颜色
                      proportion:'0',  //比例。例如（25%）
                      texts:[
                        {
                          lineHeight:'0',
                          texts:'',
                          // textColor:'red'  //字体颜色（可选）
                        }
                      ],
                      scale:'1',      //缩放
                      fontColor:"#E27FFD" //文字字体
                    },
                    {
                      color:'#9390FF',  //颜色
                      proportion:'0',  //比例。例如（25%）
                      texts:[
                        {
                          lineHeight:'0',
                          texts:'',
                          // textColor:'red'  //字体颜色（可选）
                        }
                      ],
                      scale:'1',      //缩放
                      fontColor:"#9390FF" //文字字体
                    }
                  ],
                  'childrenAlignconten':[
                    {
                      content:'0%',
                        fontsize:'10',
                        fontWeight:'bold',
                      lineHeight:'6',
                      color:"#E27FFD"
                    },
                    {
                      content:'0%',
                        fontsize:'10',
                        fontWeight:'bold',
                      lineHeight:'10',
                      color:"#9390FF"
                    },
                  ]
                },
              ],
              realName:"0.00",  //实名返现
              other:"0.00", //其他返现
              betting:"0.00", //投注返现
              deposit:"0.00", //充值返现
              page:"1",
              limit:"10",
              screens:"0",
              userList:''  //用户列表

            };
        },
        created() {
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
          lookMore:function(){  //分页
            this.page++;
            this.getData()
          },
          getData:function(){  //获取数据
            var that = this;
            that.dataShow = false;

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
            this.$ajax.post('/caipiaoshouye/index.php/home/index/toDayProfitByUid',
                datas
            ).then(ret => {
                console.log(ret)
                if (ret.data.status == 200) {
                    if(ret.data.content.code == 1000){
                      if(ret.data.content.obj){
                        // if(ret.content.obj.userList){  //用户列表
                        //   that.userList = ret.content.obj.userList
                        // }
                          that.isShow = true
                          if(ret.data.content.obj.userList.length < that.limit && ret.data.content.obj.userList.length > 0){
                            that.isShow = false
                          }
                          if(that.page == 1){
                            that.userList = ret.data.content.obj.userList;

                          }else{  //下一页不再执行绘画
                            if(ret.data.content.obj.userList == ''){  //下一页等于空 返回之前page
                              that.page--;
                              return
                            }else{
                              for(var m = 0;m<ret.data.content.obj.userList.length;m++){
                                that.userList.push(ret.data.content.obj.userList[m])
                              }
                              return
                            }
                          }
                          if(ret.data.content.obj.summary){
                            var res = ret.data.content.obj.summary;
                            if(res.allMoney != 0){
                              that.titles[0].arcData[0]['proportion'] = (res.deposit/res.allMoney)*100  //充值总收益占比
                              that.titles[0].arcData[1]['proportion'] = (res.betting/res.allMoney)*100  //购彩总收益占比
                              that.titles[0].arcData[2]['proportion'] = (res.realName/res.allMoney)*100 //实名总收益占比
                              that.titles[0].arcData[3]['proportion'] = (res.other/res.allMoney)*100    //其他总收益占比
                            }
                            that.titles[0].alignConten[0]['content'] = (res.allMoney).toFixed(2)
                            that.realName = (res.realName).toFixed(2)  //实名返现
                            that.other = (res.other).toFixed(2)  //其他返现
                            that.betting = (res.betting).toFixed(2)  //投注返现
                            that.deposit = (res.deposit).toFixed(2)   //充值返现
                            that.childrenData[0].xjsy = (res.cash).toFixed(2)   //现金收益
                            that.childrenData[0].hbsy = (res.hb).toFixed(2)   //红包收益
                            that.childrenData[0].data[0].proportion = res.hb / (res.cash + res.hb) * 100   //红包占比
                            that.childrenData[0].data[1].proportion = res.cash / (res.cash + res.hb) * 100 //现金占比
                              if(res.cash + res.hb == 0){
                                that.childrenData[0].childrenAlignconten[0].content = '0%'
                                that.childrenData[0].childrenAlignconten[1].content = '0%'
                              }else{
                                that.childrenData[0].childrenAlignconten[0].content = (isNaN(res.hb / (res.cash + res.hb)) ? '0' :(res.hb / (res.cash + res.hb)* 100).toFixed(0))  + "%" //红包占比text
                                that.childrenData[0].childrenAlignconten[1].content =  (isNaN(res.cash / (res.cash + res.hb)) ? '0' :(res.cash / (res.cash + res.hb)* 100).toFixed(0))  + "%" //现金占比text
                              }
                          }
                          if(ret.data.content.obj.directAndIndirecte){  //直接间接收益
                            var directAndIndirecte = ret.data.content.obj.directAndIndirecte;
                            that.childrenData[1].zjsy = (directAndIndirecte.direct).toFixed(2)   //直接收益
                            that.childrenData[1].jjsy = (directAndIndirecte.indirecte).toFixed(2)   //间接收益
                            that.childrenData[1].data[0].proportion = directAndIndirecte.direct / (directAndIndirecte.direct + directAndIndirecte.indirecte)   * 100 //直接占比
                            that.childrenData[1].data[1].proportion = directAndIndirecte.indirecte / (directAndIndirecte.direct + directAndIndirecte.indirecte)  * 100 //间接占比
                              if(res.direct + res.direct == 0){
                                that.childrenData[1].childrenAlignconten[0].content = '0%'
                                that.childrenData[1].childrenAlignconten[1].content = '0%'
                              }else{
                                that.childrenData[1].childrenAlignconten[0].content = (isNaN(directAndIndirecte.direct / (directAndIndirecte.direct + directAndIndirecte.indirecte)) ? '0' :(directAndIndirecte.direct / (directAndIndirecte.direct + directAndIndirecte.indirecte)* 100).toFixed(0))  + "%" //直接占比text
                                that.childrenData[1].childrenAlignconten[1].content =  (isNaN(directAndIndirecte.direct / (directAndIndirecte.direct + directAndIndirecte.indirecte)) ? '0' :(directAndIndirecte.indirecte / (directAndIndirecte.direct + directAndIndirecte.indirecte)* 100).toFixed(0))  + "%" //间接占比text
                              }
                            }

                          that.drawms()   //绘制

                      }else{
                        that.drawms()   //绘制
                        alert(ret.content.message);
                      }
                    }else{
                      that.drawms()   //绘制
                      alert(ret.content.message);
                    }
                } else {
                    alert( JSON.stringify( err ) );
                    that.drawms()   //绘制
                }
            })
            .catch(err => {
              console.log(err);
            })
            
          },
          jump:function(friendId,name){
              this.$router.push({name:"myincomedetail",params:{'friendId':friendId,'name':name}})
          },
          draw:function(index,els,arcX,arcY,arcR,width,arcscal,font,arc,middleText){  //画圆
            circle({
              el:index+els,
              type:"0",
              arcX:arcX,
              arcY:arcY,
              arcR:arcR,  //半径
              width:width,  //圆宽度
              arcscal:arcscal,
              font:font,  //文字描述字号
              arc:arc,
              middleText:middleText
            }).then(function(res){

            })
          },
          drawms:function(){
            //主图
            this.draw(
              '',
              'cavans',
              document.getElementById('cavans').clientWidth / 3.8,
              document.getElementById('cavans').clientHeight / 2,
              45,
              16,
              '1',
              '0.7rem',
              this.titles[0]['arcData'],
              this.titles[0]['alignConten']
            )

            //子级圆 2个园
            for(var j = 0;j<this.childrenData.length;j++){
                // alert(JSON.stringify(this.childrenData[j]['data']))
                this.draw(
                  j,
                  'sy_canvas',
                  document.getElementById(j+'sy_canvas').clientWidth / 1.2,
                  document.getElementById(j+'sy_canvas').clientHeight / 1.2,
                  35,
                  8,
                  '1',
                  '0.7rem',
                  this.childrenData[j]['data'],
                  this.childrenData[j]['childrenAlignconten']
                )

            }
          }

        }
    }
</script>


