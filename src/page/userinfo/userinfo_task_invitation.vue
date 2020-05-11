<template>
<div>
<div id="app" class="share_content">
        <header class="aui-bar aui-bar-nav">
            <div class="aui-pull-left aui-btn">
                <span class="aui-iconfont aui-icon-left" @click="bakey()" ></span>
            </div>
            <div class="aui-title">邀请好友</div>
        </header>
    <div class="top_img">
      <img src="../../assets/sharebanner.png" />
    </div>
    <div class="share_bottmo">
      <div class="share_list">
	        <div class="share_title">
	          <p>立即分享</p>
	        </div>
	        <ul>
	          <li>
	            <span><img src='../../assets/wbdwxcopy.png'  @click='fenx()'  /></span>
	            <span class="tites">微信好友</span>
	          </li>
	          <li>
	            <span><img src='../../assets/pengyouquancopy2.png' @click='fenx()'  /></span>
	            <span class="tites">微信朋友圈</span>
	          </li>
	          <li class="task_invitation_copy_btn" style="cursor: pointer" onclick="">
	            <span><img src='../../assets/connact.png' /></span>
	            <input readonly="readonly"  type="text" style="opacity: 0;position: absolute;top: 0;left: 0;" name="" id="link" v-model = 'lj_url'>
	            <span class="tites ">复制链接</span>
	          </li>
	        </ul>
          <p class="motle">分享到微信好友、朋友圈、微博等社交平台</p>
          <div class="ljbg">
            <img src="../../assets/lj.png" />
          </div>
      </div>

      <div class="ms_list">

        <div class="share_title">
          <p>邀请说明</p>
        </div>
      <div>
        <p class="ms_tltle">直接好友</p>
        <ul class="ms_listul">
          <li>
            <span><img src='../../assets/fivexing.png' /></span>
            <span>好友注册实名后送<b>5.88元</b>红包,且送<b>1次</b>抽奖机会</span>
          </li>
          <li>
            <span><img src='../../assets/fivexing.png' /></span>
              <span>好友首次累计充值满30元即送<b>3</b>元现金</span>
          </li>
          <li>
            <span><img src='../../assets/fivexing.png' /></span>
              <span>好友充值即送充值金额<b>4%</b>的现金</span>
          </li>
          <li>
            <span><img src='../../assets/fivexing.png' /></span>
             <span>好友现金投注即返投注金额<b>2%</b>的现金</span>
          </li>
        </ul>
      </div>
        <p class="ms_tltle">间接好友</p>
        <ul class="ms_listul">
            <li>
              <span><img src='../../assets/fivexing.png' /></span>
               <span>好友现金投注即返投注金额的<b>1%</b>现金</span>
            </li>
        </ul>
      </div>
    <p class='ybottom'>— 本次活动最终解释权归美奇彩所有 —</p>
    </div>
    <!-- 分享模态框 -->
            <div v-if="shareStatue" class="share_box" @click="hideShare()">
                <div class="share_cont">
                    <div class="quxiao">取消</div>
                    <div class="down" @click="openDownload()">前往下载</div>
                </div>
            </div>
  </div>
</div>
</template>
<script>
    var clipboard
    import {getCookie,getUid,OverallData} from "../../js/common.js";
    import Clipboard from 'clipboard';
    import {Toast} from 'mint-ui';
	export default {
		data() {
			return {
                shareStatue: false,  //分享状态
                lj_url: '',
                // WXshareStatue: false,
			}
		},
		created() {
           this.start();
        },
        mounted() {
        	var that = this;
        	clipboard = new Clipboard('.task_invitation_copy_btn', {
        	    target: function() {
        	       return document.getElementById('link');
        	    }
        	});
             clipboard.on('success', function(e) {
                
                Toast("复制成功");
            });
            clipboard.on('error', function(e) {
                Toast("复制失败");
            });
              console.log(clipboard)
        },
		methods: {
      fenx: function(){   //分享
                this.shareStatue = true;
            },
            hideShare: function(){
                this.shareStatue = false;
            },
            openDownload: function(){   //前往下载
                var link = OverallData().download
                if(getCookie('newData')){
                    window.open(link+'?_userId='+getCookie('newData').sportId);
                }else{
                    window.open(link);
                }
            },
      bakey:function(){
        this.$router.go(-1)
      },
			shareBox:function(msg){
				this.shareStatue = msg;
			},
			bake:function(){
				this.$router.go(-1)
			},
            start: function(){
				let uid=getCookie('newData');
				if (!uid) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
                var userId=uid.sportId; 
                this.lj_url = 'http://mi.facaime.com/yinliu/yinliu.html?_userId='+userId;
            },
            shareWeb: function(scene){
				// 设置所需数据
				let wx_share_title = "美奇彩票";
				let wx_share_desc = "线上购彩,线下真实出票,点击链接免费领取优惠!";
				let uid = getCookie('newData').sportId || 5;
				/*  if (!uid) {
				  	this.$router.push({
				  		name: 'login'
				  	})
				  	return false;
				  } */
				let shareurl = 'http://mi.facaime.com/yinliu/yinliu.html?_userId=' + uid;
				// alert(shareurl)
				let shareData = {
					type: 'news',
					thumbImage: 'http://cqapi.facaime.com'+require('../../assets/icon.png?v=1') , //消息的Thumb图像，可以是uri或资源id
					title: wx_share_title,
					description: wx_share_desc,
					messageAction: 'undefined',
					messageExt: 'undefined',
					webpageUrl: shareurl, //如果type为image,则使用此分享url
				}
					
				if (scene == 'timeline') {
					var dataw = {
						type: 'shareToTimeline',
						data: shareData
					}
				} else {
					var dataw = {
						type: 'shareToSession',
						data: shareData
					}
				}
				// alert('data:' + JSON.stringify(dataw))
				WebViewBridge.send(JSON.stringify(dataw));
				WebViewBridge.onMessage = (res) => {
					// alert(res == 'shareSuccess');
					if (res) {
						if (res == 'shareSuccess') {
				
						}
					}
				}

            },
            WXhideShare: function(){
                this.WXshareStatue = false;
            },
            hideShare: function(){
                this.shareStatue = false;
            },
            openDownload: function(){   //前往下载
                var newData = getCookie('newData');
                var link = OverallData().download
                if(newData){
                    window.open(link+'?_userId='+newData.sportId);
                }else{
                    window.open(link);
                }
            },
		}
	}
</script>
<style scoped>
	header{
		position: fixed;
	}
.aui-bar-nav {
    top: 0;
    line-height: 2.25rem;
    background-color: #fff;
    color: #000;
}
.aui-bar-nav .aui-btn .aui-iconfont {
    font-size: 0.9rem;
    line-height: 1.25rem;
    padding: 0;
    margin: 0;
    color: #000;
}
.share_content{
    width: 100%;
    height: auto;
		margin-top: 2.25rem;
  }
  .top_img{
    width: 100%;
    height: auto;
  }
  .top_img img{
    width: 100%;
    display: block;
  }
  .share_list{
    width: 92%;
    height: auto;
    display: table;
    margin: 0rem auto;
    background: #fff;
    /*overflow: hidden;*/
    border-radius: .6rem;
    position: relative;
  }
  .share_title{
    width: 68%;
    height: .3rem;
    background: #fff1e1;
    position: relative;
    margin:1.6rem auto;
    border-radius: 5px;
    margin-bottom: 1.2rem;
  }
  .share_title p{
    text-align: center;
    font-size: .9rem;
    position: absolute;
    left: 0px;
    bottom: -.1rem;
    right: 0px;
    /*font-weight: bold;*/
    color: #ff791c;
    font-weight: 600;
    margin: auto;
  }
  .share_bottmo{
    width: 100%;
    background: -webkit-linear-gradient(#ffab56, #F75C37); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#ffab56, #F75C37); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#ffab56, #F75C37); /* Firefox 3.6 - 15 */
    background: linear-gradient(#ffab56, #F75C37); /* 标准的语法 */
    height: auto;
    padding: 1rem 0px;
    padding-bottom: 0px;
  }
  .share_list ul{
    width: 94%;
    display: table;
    margin: 0px auto;
  }
  .share_list ul li{
    float:left;
    width: 33.33333%;
    height: auto;
  }
  .share_list ul li span{
    height: auto;
    width: 100%;
    text-align: center;
  }
  .share_list ul li img{
    width: 50%;
    margin: 0px auto;
    display: block;
    margin-left: 1.3rem;
  }
  .tites{
    width: auto !important;
    display: table;
    margin: .8rem auto;
    font-size: .6rem;
    padding:0.1rem 0.5rem;
    border: 1px solid #FF7415;
    border-radius:4px;
    margin-top: .5rem;
    color: #FF7415;
    margin-bottom: .7rem;
  }
  .motle{
    font-size: .7rem;
    text-align: center;
    color: #999;
    padding-bottom: 1.2rem;
  }
  .ms_list{
    width: 92%;
    height: auto;
    display: table;
    margin: 0rem auto;
    background: #fff;
    overflow: hidden;
    border-radius: .6rem;
    margin-top: 1rem;
    position: relative;
  }
  .ms_list > .share_title{
    margin-bottom: .8rem;
  }
  .ms_listul{
    width: 85%;
    height: auto;
    display: table;
    margin: 0px auto;
  }
  .ms_tltle{
    width: 85%;
    margin: 0rem auto;
    color: #ff791c;
    font-weight: bold;
    line-height: 1.5rem;
  }
  .ms_listul li{
    display: table;
    width: 100%;
    line-height: 1.5rem;
    font-weight: bold;
    word-wrap: break-word;
    margin: 1rem  0px;
    margin-top: .5rem;
  }
  .ms_listul li span{
    float: left;
    font-size: .7rem;
    font-weight: normal;
    line-height: 1rem;
    color:#666;
  }
  .ms_listul li span img{
    width: 1rem;
    display: block;
  }
  .ms_listul li span b{
    color: #f93b68;
  }
  .ms_listul span:nth-of-type(1){
    width: 15px;
    float: left;
  }
  .ms_listul span:nth-of-type(2){
    width: 92%;
    padding-left: 2%;
  }
  .ljbg{
    width: 82%;
    position: absolute;
    /* top: 0; */
    bottom: -1.7rem;
    left: 0px;
    right: 0px;
    margin: auto;
    z-index: 999;
  }
  .ljbg img{
    height: 2.5rem;
    display: block;
    margin: 0px auto;
  }
  .ybottom{
    text-align: center;
    font-size: .6rem;
    color: rgba(255, 255, 255, 0.35);
    font-weight: normal;
    /* position: relative; */
    /* bottom: -10px; */
    line-height: 1rem;
    padding-top: .5rem;
    padding-bottom: .5rem;
  }
  .ybottom span{
    float: left;
    display: table;
  }

  /*未实名弹窗2*/
  #logok2 {
      width: 100%;
      height:100%;
      position:fixed;
      top: 0;
      left: 0;
      z-index: 2000;
      background: rgba(0,0,0,.55);
  }
  #logok2 .qux_btn{
      width: 8%;
  		height: 1rem;
  		line-height: 1rem;
      position: absolute;
      bottom: -2rem;
      left: 46%;
      z-index: 2001;
  }
  #logok2 .qux_btn img{
      width: 100%;
  }
  #logok2>div.renzcont {
      width: 85%;
      /*height:17.2rem;*/
      position: absolute;
      top: 20%;
      left: 7.5%;
      z-index: 2;
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
      height: 1rem;
      line-height: 1rem;
      font-size: 0.65rem;
      text-align: center;
      color: #7a7a7a;
  }
  #logok2>div>div>.content {
      width: 100%;
      line-height: 1rem;
      font-size: 0.65rem;
      text-align: center;
      color: #7a7a7a;
      margin: 0 auto;
  }
  #logokbtn1, #logokbtn2 {
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
  #logok .logokbtn{
  	width: 100%;
  	height: auto;
    margin-top: 0.5rem;
  	display: flex;
  	justify-content: center;
  }
  #logok2 .logokbtn{
  	width: 100%;
  	height: auto;
  	margin-top: 3%;
  	margin-bottom: 8%;
  	display: flex;
  	justify-content: center;
  }
  /* 分享 */
.share_box {
  width: 100%;
  height: 100%;
  background: url(../../assets/goucai/sharepic1.png) 0 0 no-repeat;
  background-size: 100% auto;
  z-index: 99999;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.8);
  font-family: "微软雅黑", "黑体";
}
.share_box .share_cont{
  position:fixed; 
  bottom: 0.6rem;
  width: 100%; 
  display: flex;
}
.share_box .quxiao {
  background-color: #fb6b63;
  width: 42.5%;
  height: 2rem;
  line-height: 2rem;
  color: #fff;
  text-align: center;
  font-size: 0.75rem;
  margin-left: 5%;
  border-radius: 0.3rem;
}
.share_box .down {
  background-color: #f5a623;
  width: 42.5%;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  color: #fff;
  font-size: 0.75rem;
  margin-left: 5%;
  border-radius: 0.3rem;
}
/* 分享end */
</style>
