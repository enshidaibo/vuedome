  <style scoped>
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
      }
      .swiper-container{
        /*background: #fff;*/
        background: none;
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
        /*padding: 0px 0.7rem;*/
        width: 25%;
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
        max-width: 3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block !important;
        white-space: nowrap;
        word-break: break-all;
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
        border-right: 1px solid #f7f7f7;
         position: relative;


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
        width: 92%;
        display: block;
        margin: 0px auto;
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
      .fius{
        display: table;
        margin: 0px auto;
      }
      .mint-indicator{
        z-index: 9999;
        position: relative;
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
           <div id="app"  v-cloak>
                  <div class="appBox"  @click='hides($event)' >
        <div class="title_li">
          <ul>
            <li v-for='(item,index) in titles' @click='tap(index)'>
              <div class="fius">
                <span :class="'oi ' + item.class"></span>
                <span>{{item.name}}</span>
              </div>
            </li>
          </ul>
          <span class="transX" id="transX"></span>
        </div>
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for='(items,indexs) in titles'><canvas :id="indexs +'cavans'"  height="200hv"></canvas></div>
            <!-- <div class="swiper-slide">slider2</div>
            <div class="swiper-slide">slider3</div> -->
          </div>
          <div class="swiper-button-prev"></div><!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
          <div class="swiper-button-next"></div><!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
        </div>
        <div class="sy">
          <ul>
            <li v-for='(itemd,indexd) in childrenData'>
              <!-- <div class="sy_canvas"> -->
                <canvas :id="indexd + 'sy_canvas'" class='sy_vas'  height="100hv"></canvas>
                <!-- <canvas v-if='pageIndex == 1' :id="indexd + 'sy_canvas'+pageIndex" class='sy_vas'  height="100hv"></canvas>
                <canvas v-if='pageIndex == 2' :id="indexd + 'sy_canvas'+pageIndex" class='sy_vas'  height="100hv"></canvas>
                <canvas v-if='pageIndex == 3' :id="indexd + 'sy_canvas'+pageIndex" class='sy_vas'  height="100hv"></canvas>
                <canvas v-if='pageIndex == 4' :id="indexd + 'sy_canvas'+pageIndex" class='sy_vas'  height="100hv"></canvas> -->
              <!-- </div> -->
              <p v-if='itemd.hbsy'>
                <span class="sy_o red"></span><span class="hbsy">红包收益:</span><span class="moneysy">{{itemd.hbsy}}元</span>
              </p>
              <p v-if='itemd.xjsy'>
                <span class="sy_o yellow"></span><span class="hbsy">现金收益:</span><span class="moneysy">{{itemd.xjsy}}元</span>
              </p>
              <p v-if='itemd.zjsy'>
                <span class="sy_o zs"></span><span class="hbsy">直接好友收益:</span><span class="moneysy">{{itemd.zjsy}}元</span>
              </p>
              <p v-if='itemd.jjsy'>
                <span class="sy_o zs1"></span><span class="hbsy">间接好友收益:</span><span class="moneysy">{{itemd.jjsy}}元</span>
              </p>
            </li>
          </ul>
        </div>


        <div class="userlist"  v-if='pageIndex != 4'>
            <ul class="tops_title">
              <li @click='hideShow'>
                <div class="f">
                  <span  class='li'>用户</span>
                  <span class="num li">({{userList.length}})</span>
                  <span  class='li'><img  class='li' src='../../assets/xl7.png' /></span>
                </div>
                <div class="sx_right" v-show='isShow_sx'>
                  <div class="top_jc">
                  </div>
                  <div class="top_jc top_wir">
                  </div>
                  <ul>
                    <li class='li' @click='screenType(0)'>全部</li>
                    <li class='li' @click='screenType(1)'>{{friendName1}}</li>
                    <li class='li' @click='screenType(2)'>{{friendName2}}</li>
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
            <ul  class="user_l" @click='jump(item.friendId,item.userName)' v-if='pageIndex == 0 || pageIndex == 1 || pageIndex == 2' v-for="(item,index) in userList">
              <li>
                <div class="f">
                  <!-- <span class="mimg"><img src='../images/zj8.png' /></span> -->
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
            <ul  class="user_l" @click='jump(item.friendId,item.userName)' v-if='pageIndex == 3' v-for="(item,index) in userList">
              <li>
                <div class="f">
                  <!-- <span class="mimg"><img src='../images/zj8.png' /></span> -->
                  <!-- <span class="mimg" v-if='item.types == 0'><img src='../images/zj8.png' /></span>
                  <span class="mimg" v-if='item.types == 1'><img src='../images/jj8.png' /></span> -->
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
                  <span v-if='item.realId == 1' style="color:#02DBA4 !important;">已实名</span>
                  <span v-if='item.realId == 0' style="color:#FE4A82 !important;">未实名</span>
                </div>
              </li>
              <img src="../../assets/q43.png"  class='rightJt' alt="">
            </ul>
        </div>

        <div class="pList" v-if='pageIndex == 4'>
            <ul class="plistUl">
              <li v-for='(item,index) in userList'>
                <p class="ulP1"><span>{{item.type}}{{(item.money).toFixed(2)}}元奖励</span><span class="xj">+{{(item.money).toFixed(2)}}</span></p>
                <p class="ulP2"><span  >{{item.createTime}}</span><span v-if='item.moneyType == 0'>现金</span ><span v-if='item.moneyType == 1'>红包</span></p>
              </li>
              <!-- <li>
                <p class="ulP1"><span>直接好友累计充值888元奖励</span><span class="hb">+8.88</span></p>
                <p class="ulP2"><span>2019/05/09 20:30:00</span><span >红包</span></p>
              </li> -->
            </ul>
        </div>
        <p class="more" v-if='userList.length'  v-show='!pages && isShow' @click='lookMore()'>查看更多好友</p>
        <p class="nomore" v-if='userList.length' v-show='pages'>没有更多数据了...</p>
        <p class="nomore" v-if='userList.length == 0  && !isShow'>暂无收益</p>
    </div>
</div>
    </div>
</template>

<script>

    import {
        mobileHide,
        getSession,
        getCookie,
    } from "../../js/common"
    import Swiper from 'swiper';
    export default {
        data() {
            return {
                mySwiper:"",
                pageIndex:"0",  //类型types
                pages:false,
                isShow:true,
                      isShow_sx:false,
                friendName1:"直接好友",
                friendName2:"间接好友",
                titles:[
                  {
                    'name':"全部",
                    'class':'',
                    'arcData':[
                        {
                          color:'#438BFF',  //颜色
                          proportion:'25',  //比例。例如（25%）
                          texts:[
                            {
                              lineHeight:'0',
                              texts:'25%',
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
                              texts:'25%',
                              // textColor:'red'  //字体颜色（可选）
                            }
                          ],  //文字描述
                        },
                        {
                          color:'#02DBA4',  //颜色
                          proportion:'25',  //比例。例如（25%）
                          texts:[
                            {
                              lineHeight:'0',
                              texts:'25%',
                              // textColor:'red'  //字体颜色（可选）
                            }
                          ],
                          // fontColor:"#999" //文字字体
                        },
                        {
                          color:'#FFCE29',  //颜色
                          proportion:'25',  //比例。例如（25%）
                          texts:[
                            {
                              lineHeight:'0',
                              texts:'25%',
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
                          content:'总收益',
                          fontsize:'8',
                          lineHeight:'12',
                          fontWeight:'normal',
                          color:"#333"
                        },
                      ]
                  },
                  {
                    'name':"充值",
                    'class':'cz',
                    'arcData':[
                      {
                        color:'#478EFF',  //颜色
                        proportion:'10',  //比例。例如（25%）
                        texts:[
                          {
                            lineHeight:'0',
                            texts:'25%',
                            // textColor:'red'  //字体颜色（可选）
                          }
                        ],  //文字描述
                        scale:'1.15',     //缩放
                        // fontColor:"#999" //文字字体
                      },

                    ],
                    'alignConten':[
                        {
                          content:'0.00',
                          fontsize:'15 ',
                          fontWeight:'bold',
                          lineHeight:'8',
                          color:"#478EFF"
                        },
                        {
                          content:'充值收益',
                          fontsize:'8 ',
                          fontWeight:'normal',
                          lineHeight:'12',
                          color:"#478EFF"
                        },
                      ]
                  },
                  {
                    'name':"购彩",
                    'class':'gc',
                    'arcData':[
                      {
                        color:'#FF618B',  //颜色
                        texts:[
                          {
                            lineHeight:'0',
                            texts:'20%',
                            // textColor:'red'  //字体颜色（可选）
                          }
                        ],
                        proportion:'20',  //比例。例如（25%）
                        scale:'1.15',     //缩放
                        // fontColor:"#999" //文字字体
                      }
                    ],
                    'alignConten':[
                        {
                          content:'0.00',
                          lineHeight:'8',
                          fontsize:'15 ',
                          fontWeight:'bold',
                          color:"#FF618B"
                        },
                        {
                          content:'购彩收益',
                          lineHeight:'12',
                          fontsize:'8 ',
                          fontWeight:'normal',
                          color:"#FF618B"
                        },
                      ]
                  },
                  {
                    'name':"实名",
                    'class':'sm',
                    'arcData':[
                      {
                        color:'#02DBA4',  //颜色
                        texts:[
                          {
                            lineHeight:'0',
                            texts:'30%',
                            // textColor:'red'  //字体颜色（可选）
                          }
                        ],
                        proportion:'30',  //比例。例如（25%）
                        scale:'1.15',     //缩放
                        // fontColor:"#999" //文字字体
                      },
                    ],
                    'alignConten':[
                        {
                          content:'0.00',
                          fontsize:'15 ',
                          fontWeight:'bold',
                          lineHeight:'8',
                          color:"#02DBA4"
                        },
                        {
                          content:'实名收益',
                          lineHeight:'12',
                          fontsize:'8 ',
                          fontWeight:'normal',
                          color:"#02DBA4"
                        },
                      ]
                  },
                  {
                    'name':"其他",
                    'class':'other',
                    'arcData':[
                      {
                        color:'#FFCE29',  //颜色
                        proportion:'40',  //比例。例如（25%）
                        texts:[
                          {
                            lineHeight:'0',
                            texts:'40%',
                            // textColor:'red'  //字体颜色（可选）
                          }
                        ],
                        scale:'1.15',     //缩放
                        // fontColor:"#999" //文字字体
                      },
                    ],
                    'alignConten':[
                        {
                          content:'0.00',
                          fontsize:'15 ',
                          fontWeight:'bold',
                          lineHeight:'8',
                          color:"#FFCE29"
                        },
                        {
                          content:'其他收益',
                          fontsize:'8 ',
                          fontWeight:'normal',
                          lineHeight:'12',
                          color:"#FFCE29"
                        },
                      ]
                  },
                ],
                userList:'',
                childrenData:[//子级小圆 2个
                  {
                    'hbsy':'0.00',
                    'xjsy':'0.00',
                    'data':[
                      {
                        color:'#FF7882',  //颜色
                        proportion:'0', //比例。例如（25%）
                        texts:[
                          {
                            lineHeight:'0',
                            texts:'50',
                            // textColor:'red'  //字体颜色（可选）
                          }
                        ],
                        scale:'1',      //缩放
                        fontColor:"#FFCE29" //文字字体
                      },
                      {
                        color:'#FFCE29',  //颜色
                        proportion:'0', //比例。例如（25%）
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
                        lineHeight:'12',
                        color:"#FFCE29"
                      },
                    ]
                  },
                  {
                    'zjsy':'0.00',
                    'jjsy':'0.00',
                    'data':[
                      {
                        color:'#9390FF ', //颜色
                        proportion:'0', //比例。例如（25%）
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
                        color:'#E27FFD',  //颜色
                        proportion:'0', //比例。例如（25%）
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
                        color:"#9390FF"
                      },
                      {
                        content:'0%',
                        fontsize:'10',
                        fontWeight:'bold',
                        lineHeight:'12',
                        color:"#E27FFD"
                      },
                    ]
                  },
                ],
                page:"1",
                screens:"0",
                limit:"10"



            };
        },
        created() {
          this.getData(0)

        },
        mounted() {
                          // this.drawms(0)

            this.animations(0);
            var that = this;
            this.mySwiper = new Swiper('.swiper-container', {
              loop : false,  //环路
              autoplay: false,//可选选项，自动滑动
              initialSlide:"0",  //默认显示第几页
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
              on:{
                slideChange: function(){
                  that.userList = []
                  console.log(this.activeIndex);

                  // alert(JSON.stringify(vm.titles[this.activeIndex]))
                  // alert(JSON.stringify(vm.titles[this.activeIndex]['canvas']))
                  // alert(vm.titles[this.activeIndex].hasOwnProperty('cavans'))
                  that.isShow_sx = false;
                if(this.activeIndex == 3){
                  that.friendName1 = '已实名'
                  that.friendName2 = '未实名'
                }else{
                  that.friendName1 = '直接好友'
                  that.friendName2 = '间接好友'
                }
                  that.animations(this.activeIndex)
                  // if(!vm.titles[this.activeIndex].hasOwnProperty('statusIndex')){
                  //   vm.titles[this.activeIndex]['statusIndex'] = '1'
                  //   vm.getData(this.activeIndex)
                  // }
                  that.getData(this.activeIndex)

                  // if(!vm.titles[this.activeIndex].hasOwnProperty('cavans')){
                  //   vm.draw(
                  //     this.activeIndex,
                  //     'cavans',
                  //     document.getElementById(this.activeIndex+'cavans').clientWidth / 2,
                  //     document.getElementById(this.activeIndex+'cavans').clientHeight / 2,
                  //     65,
                  //     24,
                  //     '0.7rem',
                  //     vm.titles[this.activeIndex]['arcData'],
                  //     vm.titles[this.activeIndex]['alignConten'],
                  //   )
                  // }

                },
                // slideNextTransitionStart: function(){//下一页
                //   // console.log(this.realIndex);
                //   console.log(this.activeIndex);
                // },
                // slidePrevTransitionStart: function(){  //返回上一页
                //   // console.log(this.realIndex);
                //   console.log(this.activeIndex);
                //   vm.animations(this.activeIndex)
                // },
              },
            })
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
            screenType:function(ops){
              this.screens = ops;
              this.page = 1;
              this.getData(this.pageIndex);
            },
            lookMore:function(){  //分页
              this.page++;
              this.getData(this.pageIndex)
            },
            getData:function(types){
              // alert(this.page)
                //获取数据
              this.pageIndex = types;
              // showLoading();
              var that = this;
              var data = this.Encrypt({
                            userId:getCookie('newData').userid,
                            type:types,
                            page:that.page,
                            limit:that.limit,
                            // screen:0
                          });
              var datas = this.Qs.stringify({
                data
              }, {
                allowDots: true
              })
              this.$ajax.post('/caipiaoshouye/index.php/home/index/cumulativeProfit',
                datas
              )
              .then(ret => {
                console.log(ret)
                if (ret) {
                      if(ret.data.status == 200){
                        if(ret.data.content.code == 1000){
                          var obj = ret.data.content.obj;
                          if( obj.userList.length < that.limit ){
                            that.isShow = false;  //隐藏查看更多
                          }
                          if(that.page == 1){  //分页判断
                            that.userList = obj.userList;

                          }else{  //下一页不再执行绘画
                            if(obj.userList == ''){  //下一页等于空 返回之前page
                              that.pages = true;  //提示没更多数据
                              that.page--;
                              return
                            }else{
                              for(var m = 0;m<obj.userList.length;m++){
                                that.userList.push(obj.userList[m])
                              }
                              return
                            }
                          }
                          // obj.summary.deposit   //充值
                          // obj.summary.betting   //购彩
                          // obj.summary.realName   //实名
                          // obj.summary.other   //其他
                          // var count = obj.summary.deposit + obj.summary.betting + obj.summary.realName + obj.summary.other
                          var onesProportion;
                          switch (types) {  //展现类型
                            case 0:
                              onesProportion = 'deposit'
                              that.titles[types]['alignConten'][0]['content'] = (obj.summary.allMoney).toFixed(2)   //总收益
                              break;
                            case 1:
                              onesProportion = 'deposit'
                              that.titles[types]['alignConten'][0]['content'] = (obj.summary.deposit).toFixed(2)   //总收益
                                break;
                            case 2:
                              onesProportion = 'betting'
                              that.titles[types]['alignConten'][0]['content'] = (obj.summary.betting).toFixed(2)   //总收益
                              break;
                            case 3:
                              onesProportion = 'realName'
                              that.titles[types]['alignConten'][0]['content'] = (obj.summary.realName).toFixed(2)   //总收益
                              break;
                            case 4:
                              onesProportion = 'other'
                              that.titles[types]['alignConten'][0]['content'] = (obj.summary.other).toFixed(2)   //总收益
                              break;
                            default:
                          }
                          // alert(onesProportion)
                          // alert(obj.summary[onesProportion])
                          that.titles[types]['arcData'][0] ? (that.titles[types]['arcData'][0]['proportion'] = isNaN(obj.summary[onesProportion] / obj.summary.allMoney)?'0':(obj.summary[onesProportion] / obj.summary.allMoney) * 100) : '';  //充值占比
                          that.titles[types]['arcData'][1] ? (that.titles[types]['arcData'][1]['proportion'] = isNaN(obj.summary.betting / obj.summary.allMoney)?'0':(obj.summary.betting / obj.summary.allMoney) * 100) : '';  //购彩占比
                          that.titles[types]['arcData'][2] ? (that.titles[types]['arcData'][2]['proportion'] = isNaN(obj.summary.realName / obj.summary.allMoney)?'0':(obj.summary.realName / obj.summary.allMoney) * 100) : '';  //实名占比
                          that.titles[types]['arcData'][3] ? (that.titles[types]['arcData'][3]['proportion'] = isNaN(obj.summary.other / obj.summary.allMoney)?'0':(obj.summary.other / obj.summary.allMoney) * 100) : '';  //其他占比

                        

                          //现金，红包收益数据 ->小圆
                          // alert(obj.summary.hb + obj.summary.cash)

                          that.childrenData[0]['hbsy'] = (obj.summary.hb).toFixed(2)  //红包收益
                          that.childrenData[0]['xjsy'] = (obj.summary.cash).toFixed(2)   //现金收益
                          that.childrenData[0]['data'][0]['proportion'] = obj.summary.hb / (obj.summary.hb + obj.summary.cash)  * 100 //红包占比
                          that.childrenData[0]['data'][1]['proportion'] = obj.summary.cash / (obj.summary.hb + obj.summary.cash)  * 100 //现金占比
                          if((obj.summary.hb + obj.summary.cash ) == 0){//分母不可为0
                            that.childrenData[0]['childrenAlignconten'][0]['content'] = '0%'
                            that.childrenData[0]['childrenAlignconten'][1]['content'] = '0%'
                          }else{
                            that.childrenData[0]['childrenAlignconten'][0]['content'] = (isNaN(obj.summary.hb / (obj.summary.hb + obj.summary.cash)) ? '0':(obj.summary.hb / (obj.summary.hb + obj.summary.cash) * 100).toFixed(0)) + "%";
                            that.childrenData[0]['childrenAlignconten'][1]['content'] = (isNaN(obj.summary.cash / (obj.summary.hb + obj.summary.cash)) ? '0':(obj.summary.cash / (obj.summary.hb + obj.summary.cash) * 100).toFixed(0)) +"%";
                          }

                          //间接，直接收益数据 ->小圆
                          // alert(obj.directAndIndirecte.direct+"/"+obj.directAndIndirecte.indirecte)
                          that.childrenData[1]['zjsy'] = (obj.directAndIndirecte.direct).toFixed(2)   //直接好友
                          that.childrenData[1]['jjsy'] = (obj.directAndIndirecte.indirecte).toFixed(2)   //间接好友
                          that.childrenData[1]['data'][0]['proportion'] = obj.directAndIndirecte.direct / (obj.directAndIndirecte.indirecte + obj.directAndIndirecte.direct) * 100   //直接好友占比
                          that.childrenData[1]['data'][1]['proportion'] = obj.directAndIndirecte.indirecte / (obj.directAndIndirecte.indirecte + obj.directAndIndirecte.direct) * 100  //间接好友占比
                          if((obj.directAndIndirecte.indirecte + obj.directAndIndirecte.direct) == 0){  //分母不可为0
                            that.childrenData[1]['childrenAlignconten'][0]['content'] = "0%"
                            that.childrenData[1]['childrenAlignconten'][1]['content'] = "0%"
                          }else{
                            that.childrenData[1]['childrenAlignconten'][0]['content'] = (isNaN(obj.directAndIndirecte.direct / (obj.directAndIndirecte.indirecte + obj.directAndIndirecte.direct))? '0':(obj.directAndIndirecte.direct / (obj.directAndIndirecte.indirecte + obj.directAndIndirecte.direct) * 100).toFixed(0)) +"%"
                            that.childrenData[1]['childrenAlignconten'][1]['content'] = (isNaN(obj.directAndIndirecte.indirecte / (obj.directAndIndirecte.indirecte + obj.directAndIndirecte.direct))? '0':(obj.directAndIndirecte.indirecte / (obj.directAndIndirecte.indirecte + obj.directAndIndirecte.direct) * 100).toFixed(0))  +"%"
                          }
                          //
                          that.drawms(types)
                          // alert(JSON.stringify(that.userList) )
                        }else{
                          alert(ret.data.content.message)
                          that.drawms(types)
                        }
                      }else{
                        alert('网络错误.');
                        that.drawms(types)
                      }
                  } else {
                      alert( JSON.stringify( err ) );
                      that.drawms(types)
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
            tap:function(index){
              if(index == this.pageIndex){  //不可点击自己
                return
              }
              this.userList = [];
              this.isShow = true;  //隐藏更多，查看更多
              this.mySwiper.slideToLoop(index,500,false)
              this.animations(index)

            },
            animations:function(index){
              var wid = document.querySelector('.title_li').clientWidth;
              var leftX = wid  / this.titles.length/2 +  wid  / this.titles.length * index;
              var transX = document.querySelector('#transX');
              transX.style.transform = 'translateX(' + leftX + 'px)';
            },
            draw:function(index,els,arcX,arcY,arcR,width,font,arc,middleText){  //画圆
              var that = this;
              circle({
                el:index+els,
                type:"0",
                arcX:arcX,
                arcY:arcY,
                arcR:arcR,  //半径
                width:width,  //圆宽度
                font:font,  //文字描述字号
                arc:arc,
                middleText:middleText
              }).then(function(res){
                console.log(res.result)
                if(res.result){
                  that.titles[index][els] = '1';
                }
              })
            },
            drawms:function(index){
              //主图
              this.draw(
                index,
                'cavans',
                document.documentElement.clientWidth / 2,
                66 + 33,
                66,
                24,
                '0.7rem',
                this.titles[index]['arcData'],
                this.titles[index]['alignConten']
              )
              //子级圆 2个园
              for(var j = 0;j<this.childrenData.length;j++){
                  // alert(JSON.stringify(this.childrenData[j]['data']))
                  // alert(document.getElementById(j+'sy_canvas').clientHeight / 2)
                  // alert(document.getElementById(j+'sy_canvas'+this.pageIndex).clientWidth)
                  this.draw(
                    j,
                    'sy_canvas',
                    document.getElementById(j+'sy_canvas').clientWidth,
                    32 + 16,
                    32,
                    8,
                    '1rem',
                    this.childrenData[j]['data'],
                    this.childrenData[j]['childrenAlignconten']

                  )
              }
            }

        }
    }
</script>


