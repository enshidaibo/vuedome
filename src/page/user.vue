
<style  scoped>
	.aui-bar-nav {
        background: #fff;
        position: fixed;
        top: 0;
        left: 0;
      }

      .aui-title {
        color: #333;
      }

      /*.aui-bar-nav .aui-pull-left .aui-iconfont{
        color: #333 !important;
      }*/
      .aui-btn img{
        height: 1rem;

      }
      #screen1 img{
        height: 1rem;
        margin-left: .8rem;
      }
      .newInform {
        width: 0.3rem;
        height: 0.3rem;
        padding: 0!important;
        position: absolute;
        bottom: 1.4rem;
        right: 2.2rem;
        z-index: 2;
        border-radius: 50%;
        background-color: #e21500;
      }
    .top_rush {
        width: 100%;
        min-height: 100vh;
        /*background-image: url(../images/user19.png);*/
        background-size: 100% auto;
        background-repeat: no-repeat;
        top: 2.25rem;
        position: relative;
    }
    .top_content{
      width: 90%;
      margin: .5rem auto;
      /*border-radius: .5rem;*/
      box-shadow: 0px 0px 15px rgba(212, 212, 212, 0.79);
      display: table;
      padding-top: .7rem;
      position: relative;
    }
    .top_user{
      width: auto;
      display: table;
      float: left;
    }
    .top_user span{
      display: table;
      position: relative;
      margin: .5rem;
    }
    .uso{
          height: 3rem;
          border-radius: 50%;
    }
    .top_user span span{
      position: absolute;
      bottom: 0px;
      right: 0px;
      margin: 0px;
    }
    .top_user span span img{
          width: 1rem;
    }
    .user_info{
      	float: left;
	    margin: 1rem 0rem;
	    margin-top: .7rem;
    }
    .user_info span{
      display: block;
      font-size: 1rem;
      font-weight: bold;
      color: #333;
    }
    .user_info span:nth-of-type(2){
      font-weight: normal;
      font-size: .6rem;
    }
    .user_info em{
      display: block;
      width: auto;
      font-size: .6rem;
    }
    .top_qd{
      float: right;
      /*width: 4.5rem;*/
      height: 1.4rem;
      position: absolute;
      right: 0;
      top: 1.6rem;
      border-radius: 1rem 0px 0px 1rem;
      margin: auto;
      background: -webkit-linear-gradient(left, #FFDF63 , #FFB82F); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right, #FFDF63, #FFB82F); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right, #FFDF63, #FFB82F); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right, #FFDF63 , #FFB82F); /* 标准的语法（必须放在最后） */
    }
    .top_qd span:nth-of-type(1){
      float: left;
    }
    .top_qd span:nth-of-type(1) img{ 
      width: .8rem;
      margin: .2rem;
      margin-left: .6rem;
    }
    .top_qd span:nth-of-type(2){
      float: right;
      line-height: 1.5rem;
      font-size: .5rem;
      color: #fff;
      margin-right: .5rem;
    }
    .user_info em{
      display: table;
      padding: 0px .2rem;
      color: #fff;
      font-size: .5rem;
    }
    .sm{
      background: #02E8C8;
      border-radius: .2rem;
    }
    .user_box{
      width: 100%;
      padding: 1rem 0px;
    }
    .user_box ul{
      width: 100%;
      display: table;
    }
    .user_box ul li{
      float: left;
      position: relative;
      width: 50%;
    }
    .user_box ul li strong{
      display: block;
      margin: 0px auto;
      width: 100%;
      text-align: center;
      color:#038EF4;
      font-size: 1.1rem;
    }
    .user_box ul li span{
      display: block;
      margin: 0px auto;
      width: 100%;
      text-align: center;
      font-size: .5rem;
      color: #999999;
    }
    .user_box ul li em{
      position: absolute;
      right: .8rem;
      bottom: 0px;
      top: 0px;
      margin: auto;

    }
    .user_box ul li em img{
      height: .6rem;
      margin-top: .8rem;
    }
    .user_box ul li:nth-of-type(2) strong{
      color: #FA3A51;
    }
      .fi{
            display: table;
      }
      .ul{
        width: 100%;
        margin: 0px auto;
        padding: 3rem 5%;
        background: #fff;
        padding-bottom: 0.1rem;
      }
      .ul ul{
        display: table;
        width: 100%;
      }
      .ul ul li{
        width: 50%;
        padding: 0.5rem 0px;
        float: left;
        position: relative;
      }
      .ul ul li span{
        float: left;
        display: table;
        font-size: .8rem;
        color: #444444;
        line-height: 1.1rem;
        margin: 0px ;
        margin-right: .2rem;
      }
      .ul ul li span:nth-of-type(2){
        font-weight: bold;
      }
      .ul ul li span img{
        height: 1rem;
        display: block;
        margin:0px .2rem;
        margin-right: 0px;
      }
      .ul ul li span em{
        color: #FA3A51;
      }
      .ul ul li span:nth-of-type(3){
        font-size: .6rem;
        line-height: 1.1rem;
        color: #999999;
      }
      .ul ul li:nth-of-type(2){
        padding-left: 1.2rem;
      }
      .top_mi{
      	position: relative;
      	top: 2.3rem;
      }


      .cj_box{
            padding: 0.2rem .5rem;
      }
      .xyun{
        width: 70%;
        float: left;
      }
      .pp1,.pp2{
        display: table;
        line-height: 1rem;
        width: 100%;
        position: relative;
      }
        .pp1{
          margin-top: .3rem;
        }
      .pp1 span:nth-of-type(1){
        font-weight: bold;
        font-size: 0.9rem;
        color: #333;
        /* line-height: 2rem; */
        display: table;
        float: left;
        margin-top: .3rem;
        margin-bottom: .2rem;
      }
      .pp1 span:nth-of-type(2){
        font-size: .6rem;
        background: #333;
        color: #fff;
        line-height: .6rem;
        margin: .1rem 0px;
        display: table;
        background: #FF1B36;
        padding: .1rem;
        margin-left: .5rem;
        float: left;
        margin: .4rem .5rem;
        margin-bottom: .3rem;
      }
      .pp1 span:nth-of-type(2) em:nth-of-type(1){
        font-size: .6rem;
        line-height: .6rem;
      }
      .pp1 span:nth-of-type(2) em{
        display: table;
        float: left;
        margin-right: -.1rem;
        margin-left: .2rem;
        font-size: .4rem;
        line-height: .6rem;

      }
      .pp2 span{
        color: #999999;
        font-size: .7rem;
      }
      .pp2 span em{
        color: #FA3A51;
      }
      .cj_zpan{
        width: 30%;
        float: right;
      }
      .cj_zpan img{
        width: 5rem;
        display: block;
        margin: 0px auto;
      }
      .otherservers {
        background: #fff;
        width: 100%;
        padding: .5rem 5%;
      }
      .otherservers h4{
        color: #666666;
        font-size: .7rem;
        margin: .6rem 0px;
        margin-top: 0rem;
      }
      .otherservers ul{
        width: 100%;
        display: table;
      }
      .otherservers ul li{
        float: left;
        width: 50%;
        padding: .6rem 0px;
        border-bottom: 1px solid rgba(247, 247, 247, 0.64);
        border-right: 1px solid rgba(247, 247, 247, 0.64);
      }
      .li_lf,.li_rg{
        float: left;
        display: table;
        margin-right: .5rem;
      }
      .li_lf span{
        display: block;
        /*height: 2rem;*/
      }
      .li_lf span img{
        display: block;
        height: 1.4rem;
        margin: .1rem;
      }
      .li_rg span{
        display: block;
        text-align: left;
      }
      .li_rg span:nth-of-type(1){
        color: #333;
        font-size: .7rem;
        line-height: .8rem;
        margin: .1rem 0px;
      }
      .li_rg span:nth-of-type(2){
        font-size: .5rem;
        color: #BDBDBD;
        line-height: .5rem;
        margin: .1rem 0px;
      }
      .aui-bar-nav {
        background: #fff;
        position: fixed;
        top: 0;
        left: 0;
      }

      .aui-title {
        color: #333 !important;
      }

      /*.aui-bar-nav .aui-pull-left .aui-iconfont{
        color: #fff!important;
      }*/
      .aui-btn img{
        height: 1rem;

      }
      #screen1 img{
        height: 1rem;
        margin-left: .8rem;
      }
      .newInform {
        width: 0.3rem;
        height: 0.3rem;
        padding: 0!important;
        position: absolute;
        bottom: 1.4rem;
        right: 2.2rem;
        z-index: 2;
        border-radius: 50%;
        background-color: #e21500;
      }
      .schong{
        position: absolute;
        top: -.3rem;
        left: 0px;
        right: .3rem;
        margin: auto;
        height: .8rem;
      }
	  
	  .tcBox {
	  	top: 60%;
	  		right: 0;
	  	margin: auto;
	  	position: fixed;
	  	right: 0;
	  	z-index: 1001;
	  }
	  
	  .tcimg1 {
	  	width: 3rem;
	  		display: inline-block;
	  }

</style>
<template>









	<div>
		<header class="aui-bar aui-bar-nav">
		      <!-- <div class="aui-pull-left aui-btn" onclick="closeWin()" tapmode>
		          <span class="aui-iconfont aui-icon-left"></span>
		      </div> -->
		       <div class="aui-title">我的</div>
		       <div class="aui-pull-right aui-btn">
		       		<div class="newInform" id="newInform" v-if='newInform'></div>
		           <span id="screen"   @click="information()"><img src="../assets/systems001.png" alt=""></span>
		           <span id="screen1"  @click="userinfo_setup()" ><img src="../assets/shezhi0012.png" alt=""></span>
		       </div>
		</header>

		<div class="top_mi">
	        <div class="top_content" style="border-radius:.5rem;">
	            <div class="fi">
	              <div class="top_user"  @click="userinfo_data()">
	                <span>
	                  <img v-if='img_url' :src='img_url'  class='uso' alt="" />
	                  <img v-else  src="../assets/toux552.png" class='uso' alt="">
	                  <span><img src="../assets/user04.png" alt=""></span>
	                </span>
	              </div>
	              <div class="user_info">
	                <span>{{userName}}</span>
	                <span><em class="sm">{{centification}}</em></span>
	              </div>
	              <div class="top_qd"  @click="taskSign">
	                <span><img src="../assets/qian1dao5.png" alt=""></span>
	                <span v-if="task_icon4 == 0">立即签到</span>
	                <span v-if="task_icon4 == 1 || task_icon4 == 2">已签到</span>
	              </div>
	            </div>
	            <div class="user_box">
	              <ul>
	                <li  @click='detalist' tapmode='tabactv'>
	                  <strong>{{numberFormat(money)}}</strong>
	                  <span>现金余额(元)</span>
	                  <em><img src="../assets/right011.png" alt=""></em>
	                </li>
	                <li  @click='tohongbaolist' tapmode='tabactv'>
	                  <strong>{{numberFormat(coinsMoney)}}</strong>
	                  <span>红包余额(元)</span>
	                  <em><img src="../assets/right011.png" alt=""></em>
	                </li>
	              </ul>
	            </div>
	        </div>
	    </div>

	    <div class="ul"  >
	        <ul>
	          <li  @click="userinfo_recharge()" >
	            <span> <img src="../assets/cz01.png" /></span>
	            <span>充值</span>
	            <img v-if='rechargeCount == 1' src="../assets/schong.png" class='schong' alt="">
	            <span>充值返<em v-if='rechargeCount == 1'>10%</em><em  v-if='rechargeCount == 0'>5%</em>现金</span>
	            <!-- <span>充值返<em>5%</em>现金</span> -->
	          </li>
	          <li @click="userinfo_withdrawal()">
	            <span> <img src="../assets/xz3.png" /></span>
	            <span>提现</span>
	            <span>提现无门槛</span>
	          </li>
	        </ul>
	      </div>

	    <div class="top_content cj_box" @click='taskPrize'>
	        <div class="xyun">
	          <div class="pp1">
	            <span>幸运抽奖</span>
	            <span ><em>立即抽奖</em>  <em>〉</em></span>
	          </div>
	          <div class="pp2">
	            <span>每日免费抽奖5次 最高可中<em>500元</em></span>
	          </div>
	        </div>
	        <div class="cj_zpan">
	          <img src="../assets/dz1p01.png" />
	        </div>
	      </div>


	    <div class="otherservers">
		        <h4>其他服务</h4>
		        <ul>
		          <li  @click="userinfo_note_record_min()" style='border-top:1px solid rgba(247, 247, 247, 0.64);' tapmode>
		            <div class="li_lf">
		              <span><img src="../assets/tzjl015.png" alt=""></span>
		            </div>
		            <div class="li_rg">
		              <span>投注记录</span>
		              <span>查看投注记录</span>
		            </div>
		          </li>
		          <li  @click="userinfo_track_record()" style='padding-left:1.5rem;border-right:0px;border-top:1px solid rgba(247, 247, 247, 0.64);' tapmode>
		            <div class="li_lf">
		              <span><img src="../assets/zh01555.png" alt=""></span>
		            </div>
		            <div class="li_rg">
		              <span>追号记录</span>
		              <span>查看追号记录</span>
		            </div>
		          </li>
		          <!-- <li onclick="hemai_hot_win()">
		            <div class="li_lf" >
		              <span><img src="../images/tz011.png" alt=""></span>
		            </div>
		            <div class="li_rg">
		              <span>定制跟单</span>
		              <span>查看全部记录</span>
		            </div>
		          </li> -->
		          <li  @click="hemai()" tapmode>
		            <div class="li_lf">
		              <span><img src="../assets/he101.png" alt=""></span>
		            </div>
		            <div class="li_rg">
		              <span>合买大厅</span>
		              <span>查看全部合买</span>
		            </div>
		          </li>
		          <li @click="userinfo_task_sunburn_min()"  style='padding-left:1.5rem;border-right:0px;'>
		            <div class="li_lf">
		              <span><img src="../assets/sd011.png" alt=""></span>
		            </div>
		            <div class="li_rg">
		              <span>我的晒单</span>
		              <span>查看晒单记录</span>
		            </div>
		          </li>
		           <!-- onclick="myincome_min()" -->
		          <li @click="generalize()">
		            <div class="li_lf">
		              <span><img src="../assets/tg0111.png" alt=""></span>
		            </div>
		            <div class="li_rg">
		              <span>推广中心</span>
		              <span>查看推广中心</span>
		            </div>
		          </li>
		        </ul>
		        <div class="bottom_img_fr">
		          <!-- <img onclick="top_tj()" tapmode src="../images/user08.png" /> -->
		            <img  @click="top_tj" tapmode src="../assets/yqshares.png" />
		        </div>
		        <div class="bottom_img_fL" >
		            <img @click="welfare()" tapmode src="../assets/we_user.png" />
		        </div>
		      </div>



		<footer class="pos-fi b-0 w-100  footers">
			<ul class="flex-box w-100">
				<li class="foot_li w-20 cornav" @click='gohome'>
					<div class="w-100 imgBox"><img src="../assets/backIcon01_c.png" /></div>
					<div class="w-100"><span class="w-100 tac dis-bl fs-10 text_span">首页</span></div>
				</li>
				<li class="foot_li w-20 cornav" @click='gogoucai'>
					<div class="w-100 imgBox"><img src="../assets/backIcon02.png" /></div>
					<div class="w-100"><span class="w-100 tac dis-bl fs-10 text_span">购彩</span></div>
				</li>
				<!-- <li class="foot_li w-20 " @click='golottery'>
					<div class="w-100 imgBox"><img src="../assets/backIcon03.png" /></div>
					<div class="w-100"><span class="w-100 tac dis-bl fs-10 text_span">开奖</span></div>
				</li> -->
				<li class="foot_li w-20 cornav " @click='goscratch'>
					<div class="w-100 imgBox"><img src="../assets/backIcon7.png" /></div>
					<div class="w-100"><span class="w-100 tac dis-bl fs-10 text_span">资讯</span></div>
				</li>
				<li class="foot_li w-20 cornav " @click='gotask'>
					<div class="w-100 imgBox "><img src="../assets/backIcon04.png" /></div>
					<div class="w-100 cornav"><span class="w-100 tac dis-bl fs-10 text_span">活动</span></div>
				</li>
				<li class="foot_li w-20 active" @click='gouser'>
					<div class="w-100 imgBox"><img src="../assets/backIcon05_c.png" /></div>
					<div class="w-100 "><span class="w-100 tac dis-bl fs-10 text_span">我的</span></div>
				</li>
			</ul>
		</footer>
		<!-- 登录弹窗 -->
		<div class="tcBox" v-if="flagtc">
			<img src="../assets/home/userinfo_tc.png" alt="" class="tcimg1" @click="gonovite">
		</div>
		<!-- 未实名认证弹框 -->
		<div id="sdApp" v-show="logok">
			<div id="logok" v-show="logok">
				<div class="renzcont">
					<div>
						<img src="../assets/Group14@2x.png" alt="">
						<p class="text">实名认证</p>
						<div class="title2">为了您的账户安全，请帐户实名认证</div>
						<div class="content">实名认证后，可有效保护账号的资金安全</div>
						<p class="renz_text">认证即可获得<span>6.66</span>元红包</p>
						<div class="logokbtn">
							<p id="logokbtn1" @click="logokbtn1()">立即认证</p>
							<!-- <p id="logokbtn2" @click="logokbtn2()">暂不认证</p> -->
						</div>
					<div class="qux_btn" @click="logokbtn2()"><img src="../assets/quxiao.png" alt=""></div>
					</div>
				</div>
			</div>
			<div  v-show="logok" class="zz" @click="logokbtn2()"></div>
		</div>
		<!-- 未实名认证弹框end -->
		<div class="CashTips" v-if="CashTips">
			<div class="cont">
				<div class="close" @click="CashTips = false"></div>
				<p class="h1">安全提示</p>
				<p class="p1">尊敬的用户，<span style="color: #1bb1ff;">为了保障您的资金安全</span></p>
				<p class="p2">请下载APP版本进行提款</p>
				<div class="butt" @click="Download">
					立即下载
				</div>
			</div>
		</div>
		<div class="coinstc" v-if="coinstc_true">
			<p @click="tohongbaolist"></p>
			<div class="coinstc_text">
				<div class="coinstc_h1">
					红包余额
				</div>
				<div class="coinstc_h2">
					使用说明：
				</div>
				<div class="coinstc_h3">
					比如10元红包购彩5元，才有5元进入可提现金额，购彩n元红包n元进入提现。
				</div>
			</div>
		</div>
		<div id="recharge" v-show="recharge">
			<div class="renzcont_box">
				<div class="renzcont">
					<div class="ab-img">
						<!-- <img src="../assets/recharge/Group.png" alt=""> -->
						<img src="../assets/recharge/oupbaibgti.png" alt="">
					</div>
					<div class="ab_content" @click="recharge_back">
						<div class="ab_left">
							<img v-if='hasBankopen' src="../assets/recharge/zhifupingtai-yinlian-copy.png" alt="">
							<img v-if='hasKuaiJie' src="../assets/recharge/zhifupingtai-yinlian-copy.png" alt="">
							<img v-else src="../assets/recharge/zhifupingtaiyinlianhui.png" alt="">
						</div>
						<div class='ab_right'>
							<span>快捷支付</span>
							<span v-if='hasBankopen'>支持各大银行卡，操作方便又迅捷！</span>
							<span v-if='hasKuaiJie'>支持各大银行卡，操作方便又迅捷！</span>
							<span v-else>即将恢复，敬请期待!</span>
						</div>
						<span class="icon_right"></span>
					</div>
					<div class="ab_content ab_2" @click="recharge_weixin">
						<div class="ab_left ab_3">
							<img v-if='hasWeixin' src="../assets/recharge/weixinzhifu-copy.png" alt="">
							<img v-if='!hasWeixin' src="../assets/recharge/weixinzhifuhui.png" alt="">
						</div>
						<div class='ab_right'>
							<span>微信支付</span>
							<span v-if='!hasWeixin'>即将开放，敬请期待!</span>
							<span v-if='hasWeixin'>微信支付，安全有保障!</span>
						</div>
						<span class="icon_right"></span>
					</div>
				</div>
				<div class="qux_btn" @click="recharge = false"><img src="../assets/task/p11-04.png" alt=""></div>
			</div>
		</div>
		<!-- 		<div class="recharge" v-if="recharge">
			<div class="close" @click="recharge = false"></div>
			<div class="cont" :class="hasWeixin? '':'openWx'">
				<div class="st1" @click="recharge_back">
					<p class="h1">资金托管</p>
					<p class="text">
						根据监管要求您的购彩资金由持牌第三方公司和银行托管
					</p>
				</div>
				<div class="st2" @click="recharge_weixin">
					<p class="h1">微信支付</p>
					<p class="text">
						快捷支付，安全有保障
					</p>
				</div>
			</div>
		</div> -->
	</div>
</template>
<script>
	//在js部分所有变量都是模块作用域
	//如果需要使用就必须引入
	import {
		getSession,
		getCookie,
		setCookie,
		getUid,
		setSession,
		OverallData,
		maintenance,

	} from "../js/common.js";
	import {
		Toast,
		MessageBox
	} from 'mint-ui';

	export default {
		data() {
			return {
				userName: '****',
				money: 0.00,
				coinsMoney: 0.00,
				img_url: '',
				centification:"未实名",
				logok: false,
				CashTips: false,
				recharge: false,
				coinstc_true: false,
				hasWeixin: false,
				hasBankopen: false,
				newInform: false,
				reflash: false,
				hasKuaiJie:false,
				sign_in: false,
				flagtc:false,
				rechargeCount:"0",
				SignDay: {
				    notShareActivityCount: 0,
				    activityPrize: 1.88
				},
				task_icon4: 0,
			}
		},
		created() {
			maintenance(this); //维护页面
			let uid = getCookie('newData');
			if (!uid) {
				this.$router.push({
					name: 'login'
				})
				return false;
			}
			if (getSession('userindata')) {
				this.userName = getSession('userindata').userName;
				this.money = getSession('userindata').money;
				this.coinsMoney = getSession('userindata').coinsMoney;

				this.img_url = getCookie("newData").headurl;
			}
			this.CheckUserMsgOk();
			this.getUserInfo();
			this.checkIsWx();
			this.onLoading();
			this.getSignDay();
			this.getSchong();
			this.getExtraRewardCriteria();
		},
		methods: {
				//跳转到新手任务
			gonovite:function(){
				this.$router.push({
					name:'userinfo_task_novice'
				})
			},
			getSchong:function(){	//是否首充
				let uid = getCookie('newData');
				if (!uid) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
				var date = new Date();
				console.log(data)
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				var ms = year + '-' + month + '-' + strDate;
				console.log(ms)
				var userId = uid.userid;
				var data = [];
				data["userId"] = userId;
				data["status"] = 'successful';
				data["payway"] = ''; //中国银联:UNIONPAY ,微信:WEIXIN
				data["page"] = '1';
				data["row"] = "1";
				data["startTime"] = '2017-01-01';
				data["endTime"] = ms;
				var datas = this.Qs.stringify({
					"mid": 1,
					"appId": 1,
					data
				}, {
					allowDots: true
				});
				var thas = this;
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getIpsorderStatus',
						datas
					)
					.then(res => {
						var content = JSON.parse(res.data.content);
						if (res.data.status == 200) {
							if (content.code == 100000) {
								console.log(content)
								var data = content.data.content;
								if(data!=''){
		                                  this.rechargeCount = 0; //是否首次充值
		                              }
		                              else {
		                                  this.rechargeCount = 1; //是否首次充值
		                              }
							}
						} else if (res.data.status == 500) {
							Toast('服务器异常，请稍后重试！')
						}
					})
					.catch(err => {
						console.log(err);
					})



				
			},
			taskPrize: function() { // 每日抽奖
// 				if (this.promoTime == 1) {
// 					this.$router.push({
// 						name: 'userinfo_task_prize'
// 					})
// 				} else{
// 					this.sign_popup2 = true;
// 				}
				this.$router.push({
					name: 'userinfo_task_prize'
				})
			},
			taskSign: function() { // 每日签到
				var _sign_in = '',
					ityCount = 0;
				if (this.sign_in) {
					if (this.SignDay.notShareActivityCount > 0) {
						_sign_in = '立即领取';
						ityCount = 1
					} else {
						_sign_in = '已签到';
						ityCount = 2
					}
				} else {
					_sign_in = '签到领取红包'
				}
				this.$router.push({
					name: 'userinfo_task_sign',
					query: {
						sign_in: _sign_in,
						ityCount: ityCount,
						qianDaoMoney: this.SignDay.activityPrize,
						activityId: this.activityId
					}
				})
// 				if (this.task_icon4 == 1) {
// 					this.sign_popup1 = true;
// 					this.clickDom = 'SignDay'
// 				} else {
// 					
// 				}
            },
            //签到状态
			getSignDay: function() {
			    var data = [];
			    let uid = getCookie('newData');
				if (!uid) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
				var userId = uid.userid;
			    data["userId"] = userId;
			    // data["activityId"] = activityId;
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
			                Toast("服务器连接失败,请稍后重试");
			            } else {
			                var data = JSON.parse(res.data.content);
			                console.log(data);
			                if (data.code == 100000) {
			                    if (!data.data.signStatus) {
			                        this.SignDay.activityPrize = 1.88;
			                        this.sign_in = false;
									this.task_icon4 = 0;
			                    } else if (data.data.signStatus && data.data.activityRecordId) {
			                        this.SignDay.notShareActivityCount = data.data.activityRecordId
			                        this.SignDay.activityPrize = data.data.awardContent.amount;
			                        this.sign_in = true;
									this.task_icon4 = 1;
			                    } else {
			                        this.SignDay.activityPrize = 1.88;
			                        this.sign_in = true;
									this.task_icon4 = 2;
			                    }
			                } else if (data.code == "201010") {
			                    Toast("账户已被锁定，请联系客服");
			                    setCookie('newData', '', '0-S');
			                    this.$router.push({
			                        name: 'login'
			                    })
			                }
			            }
			        })
			        .catch(err => {
			            console.log(err);
			        })
			},
			onLoading: function() {
				let uid = getCookie('newData');
				if (!uid) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
				var userId = uid.userid;
				var data = [];
				data["uid"] = userId;
				data["yesOrNo"] = true;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getUserMessageNotification',
						datas
					).then(res => {

						var content = res.data.content;
						if (content.code == "1000") {
							var infoNumber = (content.data.system * 1) + (content.data.user * 1) + (content.data.friend * 1)
							if (infoNumber > 0) {
								this.newInform = true;
							} else {
								this.newInform = false;
							}
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			// 保存两位小数
			numberFormat: function(number) {
				var data = Math.floor(number * 100) / 100;
				return data.toFixed(2);
			},
			//邀请好友
			top_tj: function() {
				this.$router.push({
					name: 'userinfo_invite_friends'
				})
			},
			//福利说明
			welfare: function() {
				this.$router.push({
					name: 'userinfo_welfare_introduction'
				})
			},
			information: function() {
				this.$router.push({
					name: 'information'
				})
			},
			tohongbaolist: function() {
				// 				if(this.coinstc_true==false){
				// 					this.coinstc_true=true;
				// 				}else{
				// 					this.coinstc_true=false;
				// 				}

				this.$router.push({
					name: 'userinfo_hongbao'
				})
			},
			detalist: function() {

				this.$router.push({
					name: 'userinfo_account_details'
				})
			},
			logokbtn1: function() {
				this.logok = false;
				this.$router.push({
					name: 'userinfo_task_real'
				})
			},
			logokbtn2: function() {
				this.logok = false;

			},
			gouser: function() {
				if (this.$router.name !== 'user') {
					this.$router.push({
						name: 'user'
					})
				}
			},
			gohome: function() {
				if (this.$router.name !== 'home') {
					this.$router.push({
						name: 'home'
					})
				}
			},
			goscratch: function() {
				if (this.$router.name !== 'scratch') {
					this.$router.push({
						name: 'scratch'
					})
				}
			},
			gogoucai: function() {
				if (this.$router.name !== 'goucai') {
					this.$router.push({
						name: 'goucai'
					})
				}
			},
			golottery: function() {
				if (this.$router.name !== 'lottery') {
					this.$router.push({
						name: 'lottery'
					})
				}
			},
			goscratch: function() {
				if (this.$router.name !== 'scratch') {
					this.$router.push({
						name: 'scratch'
					})
				}
			},
			gotask: function() {
				if (this.$router.name !== 'task') {
					this.$router.push({
						name: 'task'
					})
				}
			},
			reflashfn: function() {
				this.reflash = true;
				this.getUserInfo();
				setTimeout(() => {
					this.reflash = false;
				}, 1500);

			},
			//是否完成新手任务
			getExtraRewardCriteria: function() {
				if(getCookie('newData').regdate.split(' ')[0]>='2019-07-01'){
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
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
			
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getExtraRewardCriteria',
						datas
					)
					.then(res => {
						console.log(res)
						var content = JSON.parse(res.data.content);
						this.flagtc=!content.data.isOver;
						
					})
					.catch(err => {
						console.log(err);
					})
				}
			},

			getUserInfo: function() {

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

				this.$ajax.post('/caipiaoshouye/index.php/home/index/getUserInfo',
						datas
					)
					.then(res => {

						var content = JSON.parse(res.data.content);
						console.log(JSON.stringify(content));
						if (res.data.status != "200") {

							return;
						} else {
							if (content.code == "100000") {
								setSession('userindata', content.data);
								this.centification = content.data.certification?'已实名':'未实名';
								console.log(this.centification)
								this.userName = content.data.userName;
								this.money = content.data.money;
								this.coinsMoney = content.data.coinsMoney;
							} else if (content.code == "201010") {
								Toast("账户已被锁定，请联系客服");
								setCookie('newData', '', '0-S');
								sessionStorage.removeItem('userindata');
								this.$router.push({
									name: 'login'
								})
							}
						}
						this.img_url = getCookie("newData").headurl;
					})
					.catch(err => {
						console.log(err);
					})

			},
			lotteryUserJudge: function() {
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

				this.$ajax.post('/caipiaoshouye/index.php/home/index/validateUserInfo',
						datas
					)
					.then(res => {

						var content = JSON.parse(res.data.content);
						console.log(JSON.stringify(content));

						// this.img_url = $api.getStorage("newData").headurl;
					})
					.catch(err => {
						console.log(err);
					})
			},
			CheckUserMsgOk: function() {
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

				this.$ajax.post('/caipiaoshouye/index.php/home/index/validateUserInfo',
						datas
					)
					.then(res => {
						var content = JSON.parse(res.data.content);
						console.log(JSON.stringify(content));
						if (content.code == "100000") {
							if (content.data.certification) {
								this.logok = false;
								setSession('logok', this.logok);

							} else {
								this.logok = true;
								setSession('logok', this.logok);
								if (getSession('logokduke')) {
									this.logok = false;
								}
								setSession('logokduke', true);
							}

						}

					})
					.catch(err => {
						console.log(err);
					})
			},
			checkIsWx: function() {
				this.$ajax.timeout = 49527; //不要加载状态
				this.$ajax.post('/caipiaoshouye/index.php/home/index/checkIsWx')
					.then(res => {
						this.$ajax.timeout = 50000;
						if (res.data.isopen == 0) {
							this.hasWeixin = false;
						} else if (res.data.isopen == 1) {
							this.hasWeixin = true;
						}
						if (res.data.isbankopen == 0) {
							this.hasBankopen = false;
						} else if (res.data.isbankopen == 1) {
							this.hasBankopen = true;
							this.hasKuaiJie = false;
						}else if(res.data.isbankopen == 2){
							this.hasBankopen = false;
							this.hasKuaiJie = true;
						}
					})
					.catch(err => {
						this.$ajax.timeout = 50000;
						console.log(err);
					})
			},
			userinfo_data: function() {
				// 个人资料详情
				this.$router.push({
					name: 'userinfo_data'
				})
			},
			// 			userinfo_recharge: function() {
			// 				// 充值页
			// 				this.$router.push({
			// 					name: 'userinfo_recharge'
			// 				})
			// 				return false;
			// 				if (getCookie('logok')) {
			// 
			// 					this.logok = true;
			// 
			// 					console.log(this.logok);
			// 
			// 				} else {
			// 					this.$router.push({
			// 						name: 'userinfo_recharge'
			// 					})
			// 				}
			// 
			// 			},
			userinfo_recharge: function() {
				// 充值页
				
				
				if (getCookie('logok')) {
					this.logok = true;
				} else {
					this.$router.push({
										name: 'payment_options'
						})
					// this.recharge = true
				}
			},
			recharge_back: function() {
				this.recharge = false;
				if (this.hasBankopen||this.hasKuaiJie) {
					if(this.hasBankopen){
						this.$router.push({
							name: 'userinfo_recharge'
						})
					}else if(this.hasKuaiJie){
						this.$router.push({
							name: 'userinfo_recharge_weixin_kj'
						})
					}
					
				} else {
					MessageBox({
						title: '',
						message: '快捷支付暂时无法使用，给您带来的不便敬请谅解!',
						showCancelButton: false,
						confirmButtonText: "我知道了",

						// cancelButtonText:"知道了"
					}).then(action => {
						if (action == 'confirm') {
							this.recharge = true
							return false;
							// this.$router.push({
							// 	name: 'userinfo_recharge'
							// })
						} else {
							this.recharge = true
							return false;
						}
					})
				}

			},
			recharge_weixin: function() {
				this.recharge = false;
				if (this.hasWeixin) {
					this.$router.push({
						name: 'userinfo_recharge_weixin'
					})
				} else {
					MessageBox({
						title: '',
						message: '微信充值暂时无法使用，给您带来的不便敬请谅解!',
						showCancelButton: false,
						confirmButtonText: "我知道了",

						// cancelButtonText:"知道了"
					}).then(action => {
						if (action == 'confirm') {
							this.recharge = true
							return false;
							// this.$router.push({
							// 	name: 'userinfo_recharge'
							// })
						} else {
							this.recharge = true
							return false;
						}
					})
				}
			},
			userinfo_withdrawal: function() {
				// 提现页
				if (getCookie('logok')) {
					this.logok = true;
					return false;
				} else {
					this.CashTips = true
					// 										this.$router.push({
					// 											name: 'userinfo_withdrawal'
					// 										})
				}

			},
			generalize: function() {
				// 推广中心
				this.$router.push({
					name: 'generalize'
				})
			},
			userinfo_note_record: function() {
				// 投注记录
				this.$router.push({
					name: 'userinfo_note_record'
				})
			},
			userinfo_track_record: function() {
				// 追号记录
				this.$router.push({
					name: 'userinfo_track_record'
				})
			},
			userinfo_account_details: function() {
				// 账户明细
				this.$router.push({
					name: 'userinfo_account_details'
				})
			},
			hemai: function() {
				// 合买
				this.$router.push({
					name: 'heimai_lobby'
				})
			},
			userinfo_setup: function() {
				// 设置
				this.$router.push({
					name: 'userinfo_setup'
				})
			},
			Download: function() {
				var link = OverallData().Appdownload
				window.open(link);
			},
			userinfo_note_record_min:function(){	//投注记录
				this.$router.push({
					name: 'userinfo_note_record'
				})
			},
			userinfo_track_record:function(){	//追号记录
				this.$router.push({
					name: 'userinfo_track_record'
				})
			},
			hemai:function(){	//合买大厅
				this.$router.push({
					name: 'heimai_lobby'
				})
			},
			userinfo_task_sunburn_min:function(){	//我的晒单
				this.$router.push({
					name: 'userinfo_task_sunburn'
				})
			},
			tgzx:function(){	//推广收益
				this.$router.push({
					name: 'promotion_income'
				})
			},
		}
	}
</script>



<style scoped>
	.zz{
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
		z-index: 1;
		top: 0px;
		left: 0px;
	}
	#sdApp{
		    position: fixed;
    z-index: 9999;
	}
	.top_head {
		width: 100%;
		height: 8rem;
		background-image: url(../assets/user01.png);
		background-size: 100% auto;
		background-repeat: no-repeat;
		/* 	top: 0;
		left: 0;
		z-index: 999;
		position: fixed; */
		padding-top: 1rem;

	}

	.top_tetle {
		width: 100%;
		height: auto;
		text-align: center;
		font-size: 0.9rem;
		color: #FFFFFF;
		position: relative;
		height: 1rem;
		line-height: 1rem;
	}

	.top_tetle div {


		border-radius: 50%;
		padding-left: 1rem;

	}

	.top_tetle img {
		width: 0.8rem;
		height: 1rem;
		position: absolute;
		top: 0;
		right: 1rem;
	}

	.newInform {
		width: 0.3rem;
	    height: 0.3rem;
	    padding: 0 !important;
	    position: absolute;
	    top: .65rem;
	    right: 2.1rem;
	    z-index: 2;
	    border-radius: 0.15rem;
	    background-color: #e21500;
	}

	.name_img {
		width: 100%;

	}

	.name_img_src {
		width: 3.25rem;
		height: 3.25rem;
		margin: auto;
		margin-top: 2rem;
		border-radius: 50%;
		position: relative;
	}

	.name_img_src img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.name_img_b {
		width: 1rem;
		height: 1rem;
		position: absolute;
		bottom: 0;
		right: 0;

	}

	.name_img_b img {
		width: 100%;
		height: 100%
	}

	.userName_text {
		width: 100%;
		height: 1.1rem;

		text-align: center;
		font-size: 0.6rem;
		color: #788189;
		line-height: 1.18rem;
		position: relative;
	}

	.userName_text div:first-child {
		width: 8rem;
		height: 1.1rem;
		background: rgba(207, 207, 207, 0.1725);
		border-radius: 0.55rem;
		line-height: 1.18rem;
		margin: auto;
	}

	.userName_text div:last-child {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
	}


	.top_head_con {
		margin: auto;
		width: 100%;
		height: 4rem;
		display: flex;
		position: relative;
		border-bottom: 1px dashed #EBE9E9;
	}

	.top_head_con>div {
		width: 50%;
		text-align: center;
		padding-top: 0.9rem;
	}

	.top_head_con>div>p {
		font-size: 0.6rem;
		color: #FA3A51;
	}

	.top_head_con>div:first-child p {
		color: #038EF4;
	}

	.top_head_con>div:first-child p:first-child {
		font-size: 0.9rem;
		font-weight: 500;
		color: #038EF4;
	}

	.top_head_con>div:last-child p:first-child {
		font-size: 0.9rem;
		font-weight: 500;
	}

	.top_head_con>div:last-child {
		background-image: url(../../static/userinfo/red_bubble.png);
		background-repeat: no-repeat;
		background-position: 88% 0.2rem;
		background-size: 2.2rem 0.75rem;
	}

	.xuanx {
		width: 1.1rem;
		height: 1.1rem;
		position: absolute;
		top: 1.45rem;
		right: 8.8rem;
	}

	.top_head_moye {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		width: 100%;
		height: 1.8rem;
		display: flex;
		position: relative;
	}

	.top_head_moye div {
		width: 50%;
		text-align: center;
		font-size: 0.75rem;
	}

	.top_head_moye div img {
		width: 1.8rem;
		height: 1.8rem;
		float: left;
		display: block;
	}

	.top_head_moye .topUp {
		border-right: 1px solid #EBE9E9;
	}

	.topUp span,
	.withDraw span {
		display: block;
		line-height: 1.8rem;
		float: left;
	}

	.tab {
		display: table;
		margin: 0px auto;
	}

	.top_head_moye .topUp {
		border-right: 1px solid #EBE9E9;
	}

	.top_head_moye .withDraw {}

	.juli {
		width: 100%;
		height: 0.5rem;
		background: #F4F4F4;
	}

	a {
		color: #000;
	}

	.cornav {
		color: #666666;
	}

	.active {
		color: #5fa3eb !important;
	}

	.userinfo_list {
		width: 100%;
	}

	.userinfo_list ul {
		width: 100%;
		height: auto;
		display: flex;
		flex-wrap: wrap;
	}

	.userinfo_list ul li {
		width: 33.333333%;
		padding-top: 0.75rem;
		border-bottom: 1px solid #F4F4F4;
		border-right: 1px solid #F4F4F4;
	}

	.userinfo_list ul li img {
		width: 1.8rem;
		height: 1.8rem;
		margin: auto;
	}

	.userinfo_list ul li p {
		width: 100%;
		padding-top: 0.4rem;
		text-align: center;
		padding-bottom: 0.75rem;
		font-size: 0.65rem;
		color: #6F6F6F;
	}

	.bottom_img_fr {
		width: 100%;
		height: auto;
		padding-top: .5rem;
		padding-bottom: .5rem;
	}

	.bottom_img_fr img {
		width: 17.25rem;
		height: 3.05rem;
		margin: auto;
	}
	.bottom_img_fL {
		width: 100%;
		height: auto;
		padding-bottom: 4.15rem;
	}

	.bottom_img_fL img {
		width: 17.25rem;
		height: auto;
		border-radius: 10rem;
		margin: auto;
	}

	.bottom_img_fL{
      width: 100%;
      height: 2.5rem;
      position: relative;
      margin-bottom: 1.15rem;
      /*background: url(../assets/we_user.png);*/
      background-size: cover;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      border-radius: 10rem;
      display: block;
    }
	.header_content_up {
		width: 100%;
		height: 4rem;
		padding: .2rem 0;
		position: relative;
	}

	.content_up_left {
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 50%;
		position: absolute;
		background-color: #fff;
		top: -1.3rem;
		left: 1rem;
	}

	.content_up_left img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.content_up_right {
		width: 68%;
		padding: .2rem 0;
		margin-left: 5rem;

	}

	.moneyes {
		display: flex;
	}

	.reflash {
		width: 1.6rem;
		height: 1.6rem;

	}

	.up_right_title {
		color: #000;
		height: 1.2rem;
		font-size: 0.6rem;
		line-height: 1.2rem;
		font-weight: bold;

	}

	.moneyes {
		color: #E45869;
		height: 1.6rem;
		font-size: 1rem;
		line-height: 1.6rem;
		font-weight: bold;
	}

	.header_content_lower {
		width: 100%;
		padding: 0 0 .4rem 0;
		position: relative;
		font-size: 0;
	}

	.header_content_lower div {
		width: 50%;
		display: inline-block;
		font-size: 0.9rem;
		font-weight: bold;
		height: 2rem;
		line-height: 2rem;

		text-align: center;
		letter-spacing: normal;
	}





	/*未实名弹窗*/
	#logok {
		width: 100%;
	    height: 17.5rem;
	    position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    z-index: 2000;
	    /*background: rgba(0, 0, 0, .75);*/
	    bottom: 0;
	    margin: auto;
	        max-height: 341px;
	}

	#logok .qux_btn {
		width: 8%;
	    position: absolute;
	    bottom: -3rem;
	    left: 46%;
	}

	#logok .qux_btn img {
		width: 100%;
	}

	#logok>div.renzcont {
		width: 85%;
	     height: 100%; 
	    /* position: absolute; */
	    /* top: 0; */
	    /* left: 7.5%; */
	    z-index: 2;
	    margin: 0px auto;
	    border-radius: 0.6rem;
	    background-color: #fff;
	}

	#logok>div p.text {
		text-align: center;
		line-height: 1.2rem;
		padding: 5% 0;
		font-size: 1.2rem;
		color: #363636;
		font-weight: bold;
	}

	#logok>div p.renz_text {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 1.8rem;
		font-size: 0.8rem;
		text-align: center;
		color: #43A4F1;
		font-weight: bold;
	}

	#logok>div p.renz_text span {
		display: inline-block;
		margin-top: -0.2rem;
		font-size: 1.75rem;
		color: #FF2323;
	}

	#logok>div>div {
		width: 100%;

	}

	#logok>div>div>img {
		display: block;
		width: 100%;
		/*height: 3.2rem;*/
		margin: 0 auto 0.2rem;
	}

	#logok>div>div>.title2 {
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.65rem;
		text-align: center;
		color: #7a7a7a;
	}

	#logok>div>div>.content {
		width: 100%;
		line-height: 1rem;
		font-size: 0.65rem;
		text-align: center;
		color: #7a7a7a;
		margin: 0 auto;
	}

	.dis-bl {
		display: block !important;
	}

	.reflashimg {
		animation: rotating 1.2s linear infinite;
	}

	/*未实名弹窗2*/
	#logok2 {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2000;
		background: rgba(0, 0, 0, .4);
	}

	#logok2>div {
		width: 85%;
		height: 17.2rem;
		position: absolute;
		top: 20%;
		left: 7.5%;
		z-index: 2;
		border-radius: 0.6rem;
		background-color: #fff;
	}

	#logok2>div>div {
		width: 100%;

	}

	#logok2>div>div>img {
		display: block;
		width: 100%;
		/*height: 3.2rem;*/
		margin: 0 auto 0.2rem;
	}

	#logok2>div>div>.title2 {
		width: 100%;
		height: .9rem;
		line-height: .9rem;
		font-size: 0.65rem;
		text-align: center;
		color: #7a7a7a;
		margin-top: 0.8rem;
	}

	#logok2>div>div>.content {
		width: 100%;
		line-height: .9rem;
		font-size: 0.65rem;
		text-align: center;
		color: #7a7a7a;
		margin: 0 auto;
	}

	#logokbtn1,
	#logokbtn2 {
		width: 85%;
		/* height: 2.2rem; */
		line-height: 1.2rem;
		padding: 3% 0;
		border-radius: 0.2rem;
		text-align: center;
		font-size: 0.7rem;
	}

	#logokbtn1 {
		margin-right: 0.3rem;
		background-color: #5fa3eb;
		color: #fff;
	}

	#logokbtn2 {
		margin-left: 0.3rem;
		background-color: #9b9b9b;
		color: #fff;
	}

	#logok .logokbtn {
		width: 100%;
		height: auto;
		margin-top: 3%;
		margin-bottom: 8%;
		display: flex;
		justify-content: center;
	}

	#logok2 .logokbtn {
		width: 100%;
		height: auto;
		margin-top: 0.5rem;
		display: flex;
		justify-content: center;
	}

	.CashTips {
		width: 100%;
		height: 100vh;
		position: fixed;
		background-color: rgba(0, 0, 0, .5);
		top: 0;
		left: 0;
		z-index: 1000;
	}

	.CashTips .cont {
		width: 100%;
		height: 95vw;
		padding-top: 44%;
		background-image: url(../assets/task/txpop.png);
		background-repeat: no-repeat;
		background-position: 50% 50%;
		background-size: auto 100%;
		margin-top: 28%;
		text-align: center;
		position: relative;
	}

	.CashTips .close {
		position: absolute;
		top: 0;
		right: 2rem;
		width: 1.4rem;
		height: 1.4rem;
		background-image: url(../assets/task/p11-04.png);
		background-repeat: no-repeat;
		background-position: 50% 50%;
		background-size: 100% 100%;
	}

	.CashTips .cont .h1 {
		height: auto;
		font-size: 1.2rem;
		color: #333;
		line-height: 1.8rem;
	}

	.CashTips .cont .p1 {
		font-size: 0.72rem;
		color: #999;
		line-height: 1.8rem;
	}

	.CashTips .cont .p2 {
		font-size: 0.8rem;
		color: #f56a1f;
		line-height: 1.5rem;
	}

	.CashTips .cont .butt {
		width: 11rem;
		height: 1.8rem;
		position: absolute;
		bottom: 1.5rem;
		left: 50%;
		margin-left: -5.5rem;
		background-color: #169cfe;
		border-radius: 0.8rem;
		text-align: center;
		font-size: 0.8rem;
		color: #fff;
		line-height: 1.8rem;
	}

	/*.recharge {
		width: 100%;
		height: 100vh;
		position: fixed;
		background-color: rgba(0, 0, 0, .5);
		top: 0;
		left: 0;
		z-index: 1000;
	}

	.recharge .cont {
		width: 100%;
		height: 84vw;
		padding-top: 33vw;
		background-image: url(../assets/recharge/rechargeBgxx.png);
		background-repeat: no-repeat;
		background-position: 50% 50%;
		background-size: auto 100%;
		margin-top: 44%;
		text-align: center;
		position: relative;
	}
     .recharge .openWx {
        background-image: url(../assets/recharge/rechargebg.png);
    }
	.recharge .close {
		position: absolute;
		top: 18%;
		right: 1.6rem;
		width: 1.4rem;
		height: 1.4rem;
		background-image: url(../assets/task/p11-04.png);
		background-repeat: no-repeat;
		background-position: 50% 50%;
		background-size: 100% 100%;
	}

	.recharge .cont>div {
		width: 76vw;
		height: 25vw;
		margin: auto;
		padding-left: 18.4vw;
		padding-top: 5.6vw;
		padding-right: 8.6vw;
		background-repeat: no-repeat, no-repeat;
		background-position: 4.4% 50%, 100% 50%;
		background-size: 2.4rem 2.4rem, 1rem auto;
	}

	.recharge .cont>div.st1 {
		background-image: url(../assets/recharge/zhifupingtai-yinlian-copy.png), url(../assets/recharge/jiantou.png);
		padding-top: 3vw;
	}

	.recharge .cont>div.st2 {
		background-image: url(../assets/recharge/weixinzhifu-copy.png), url(../assets/recharge/jiantou.png);
	}
  .recharge .openWx>div.st2 {
        background-image: url(../assets/recharge/weixinzhifuhui.png), url(../assets/recharge/jiantou.png);
    }
	.recharge .cont>div .h1 {
		font-size: 0.83rem;
		font-weight: 600;
		color: #2F2F2F;
		line-height: 1.6rem;
		text-align: left;
	}

	.recharge .cont>div .text {
		font-size: 0.5rem;
		color: #9d9d9d;
		line-height: 0.87rem;
		text-align: left;
	}*/
	#recharge {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2000;
		background: rgba(0, 0, 0, .75);
	}

	#recharge>div.renzcont {
		width: 80%;
		/* height: 17.2rem; */
		position: absolute;
		top: 20%;
		left: 10%;
		z-index: 2;
		border-radius: 0.6rem;
		background-color: #fff;
	}

	.ab-img {
		position: relative;
	}

	.ab-img img {
		border-radius: .5rem;
	}

	.ab_content {
		position: absolute;
		width: 100%;
		top: 38%;
		left: 0px;
		height: 32%;
	}

	.ab_left {
		display: block;
		position: absolute;
		left: 3%;
		width: 3rem;
		height: 3rem;
		top: 0;
		/* right: 0; */
		bottom: 0;
		margin: auto;
	}

	.ab_left img {
		display: block;
		height: 100%;
		margin: 0px auto;
	}

	.ab_right {
		height: auto;
		width: 60%;
		position: absolute;
		left: 57%;
		top: 50%;
		/* bottom: 0; */
		/* right: 0; */
		/* margin: auto; */
		transform: translateX(-50%) translateY(-50%);
	}

	.ab_right span:nth-of-type(1) {
		font-size: .9rem;
		line-height: 1.5rem;
		font-weight: bold;
		color: #2F2F2F;
	}

	.ab_right span {
		font-size: .6rem;
		display: block;
		color: #868686;
		/* line-height: 1.2rem; */
	}

	#recharge .qux_btn {
		width: 8%;
		height: 1rem;
		line-height: 1rem;
		position: absolute;
		bottom: -20%;
		left: 46%;
		z-index: 2001;
	}

	.icon_right {
		width: 5px;
		height: 5px;
		border-left: transparent;
		border-top: transparent;
		border-right: 1px solid #A7A7A7;
		position: absolute;
		border-bottom: 1px solid #A7A7A7;
		right: 1rem;
		bottom: 0px;
		bottom: 0px;
		transform: rotate(-45deg);
		margin: auto;
		top: .5rem;
	}

	.ab_2 {
		top: 68%;
	}

	.ab_3 {
		width: 2.8rem;
		height: 2.8rem;
		left: 5%;
	}

	.renzcont_box {
		position: relative;
		top: 50%;
		width: 82%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
	}

	.coinstc {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2000;
		background: rgba(0, 0, 0, .7);
	}

	.coinstc>p {
		width: 100%;
		height: 1.5rem;
		margin-top: 7.5rem;
		background-image: url(../assets/topdatecoent10.png);
		background-repeat: no-repeat;
		background-position: 15rem 50%;
		background-size: 1.5rem 100%;
	}

	.coinstc_text {
		width: 12.5rem;
		height: 17rem;
		margin: auto;
		background-image: url(../assets/topdatecoent11.png);
		background-repeat: no-repeat;
		background-position: 50% 50%;
		background-size: 100% 100%;
		padding-top: 10rem;
	}

	.coinstc_h1 {
		text-align: center;
		color: #363636;
		font-size: 1rem;

	}

	.coinstc_h2 {
		color: #ED3D21;
		font-size: 0.8rem;
		padding: 1rem 0.8rem 0rem 0.8rem;
	}

	.coinstc_h3 {
		color: #363636;
		font-size: 0.6rem;
		padding: 0.5rem 0.8rem 0rem 0.8rem;
	}

	.ab-img {
		position: relative;
	}

	.ab_content {
		position: absolute;
		width: 100%;
		top: 38%;
		left: 0px;
		height: 32%;
	}

	.ab_left {
		display: block;
		position: absolute;
		left: 3%;
		width: 3rem;
		height: 3rem;
		top: 0;
		/* right: 0; */
		bottom: 0;
		margin: auto;
	}

	.ab_left img {
		display: block;
		height: 74%;
		margin: 12% auto;
	}

	.ab_right {
		height: auto;
		width: 60%;
		position: absolute;
		left: 54%;
		top: 50%;
		/* bottom: 0; */
		/* right: 0; */
		/* margin: auto; */
		transform: translateX(-50%) translateY(-50%);
	}

	.ab_right span:nth-of-type(1) {
		font-size: .9rem;
		line-height: 1.5rem;
		font-weight: bold;
		color: #2F2F2F;
	}

	.ab_right span {
		font-size: .6rem;
		display: block;
		color: #868686;
		/* line-height: 1.2rem; */
	}

	.icon_right {
		width: 7px;
		height: 7px;
		border-left: transparent;
		border-top: transparent;
		border-right: 1px solid #A7A7A7;
		position: absolute;
		border-bottom: 1px solid #A7A7A7;
		right: 1rem;
		bottom: 0px;
		bottom: 0px;
		transform: rotate(-45deg);
		margin: auto;
		top: .5rem;
	}

	.ab_2 {
		top: 68%;
	}

	.ab_3 {
		width: 2.8rem;
		height: 2.8rem;
		left: 5%;
	}

	#recharge>div.renzcont {
		width: 80%;
		/* height: 17.2rem; */
		position: absolute;
		top: 50%;
		left: 50%;
		/* right: 0; */
		z-index: 2;
		border-radius: 0.6rem;
		background-color: #fff;
		/* bottom: 0; */
		margin: auto;
		transform: translateX(-50%) translateY(-50%);
	}

	#recharge {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2000;
		background: rgba(0, 0, 0, .75);
	}

	#recharge .qux_btn {
		width: 8%;
		height: 1rem;
		line-height: 1rem;
		position: absolute;
		/*top: 80%;*/
		bottom: -20%;
		left: 46%;
		z-index: 2001;
	}

	.renzcont_box {
		position: relative;
		top: 50%;
		width: 82%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
	}

	.reflashimgref {
		animation: load8 1.1s infinite linear;
	}

	@keyframes load8 {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		100% {
			-webkit-transform: rotate(-360deg);
			transform: rotate(-360deg);
		}
	}
</style>
