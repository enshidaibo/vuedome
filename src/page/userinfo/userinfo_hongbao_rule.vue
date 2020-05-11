 <template>
<div class="helpcenterDom"> 
<!-- <div class="header">
    <nav-bar title="常见问题"></nav-bar>
</div> -->
<header class="aui-bar aui-bar-nav">
            <div class="aui-pull-left aui-btn" @click="bake()" tapmode>
                <span class="aui-iconfont aui-icon-left active"></span>
            </div>
            <div class="aui-title">规则说明</div>
  </header>
 <div class="box">
    <div class="bodys">
        <div class="main" >
              <p class="ti"><span><img src='../../assets/left.png' /></span><span>规则说明</span><span><img src='../../assets/right.png' /></span></p>
                <h3>{{title[0]}}:</h3>
                <div class="tips" v-for="(item,index) in tipsList">
                    <img src="../../assets/title_img.png" alt="">
                    <p v-html='item' >{{item}}</p>
                </div>
                <h3 class="sp1">{{title[1]}}:</h3>
                <div class="tips" v-for="(item,trdex) in content">
                    <img src="../../assets/title_img.png" alt="">
                    <p  v-html='item' >{{item}}</p>
                </div>
                <!-- <img src="../images/mqc/userinfo/hongbao_01.png" alt="">
                <p>{{content}}</p> -->
        </div>
        <div class="footer">
            <p>最终解释权归平台所有</p>
			
        </div>
    </div>
</div> 
 </div>
</div>
</template>
<script>
export default {
    data(){
        return {
  			  tipsList: [
                'APP用户实名认证即可获得<b style="color:#FD7039">6.66</b>元红包',
                '晒单分享成功即返投注金额的<b style="color:#FD7039">5%</b>的红包',
			    '每天在签到即可获得<b style="color:#FD7039">0.28</b>元红包，连续7天额外赠送<b style="color:#FD7039">1.88</b>元红包，总计<b style="color:#FD7039">3.84</b>元红包”。',
               
                '完成新手任务即可获得<b style="color:#FD7039">10.00</b>元红包',
                '每日免费赠送<b style="color:#FD7039">5</b>次抽奖机会，赢得惊喜大礼包',
				'邀请的好友实名后可得<b style="color:#FD7039">2.88</b>元红包'
            ],
            title: ['红包获取', '红包使用'],
            content: ['红包可以作为部分彩种的投注金',
                /* '现金投注即返投注金额的<b style="color:#FD7039">20%</b>红包变现<br/><i style="font-size:0.4rem;" >注：红包余额小于返现金额时，实际返现金额为当前的红包余额</i>',
				
                '直接好友充值即返充值金额的<b style="color:#FD7039">5%</b>红包变现',
                '直接好友现金投注即返投注金额的<b style="color:#FD7039">2%</b>现金',
                '间接好友现金投注即返投注金额的<b style="color:#FD7039">1%</b>现金' */
            ],
            num: ''
        }
    }, 
    created(){
        
     },
    methods:{
		 bake:function () {
		this.$router.go(-1); //根据浏览器记录返回上一次
		 }
    }
}
</script>
<style scoped>
.aui-bar-nav .aui-btn .aui-iconfont{
    color: #000;
}

  header{
  position: fixed !important;
  background: #fff;
  color: #000;
  }
   p {
          width: 100%;
            display: inline-block;
            font-size: 0.6rem;
            color: #4F4F4F;
            line-height: 1.15rem;
        }
        p b{
            color: #FD7039 !important;
        }
        img {
            display: inline-block;
            width: 0.225rem;
            height: 0.275rem;
            margin-right: 0.25rem;
            margin-top: 0.4rem;
        }

        h3 {
          font-size: 0.75rem;
          color: #ff9613;
          margin-bottom: 0.25rem;
          font-weight: bold;
        }

        #box {
            background: #fff;
        }
        .box{
                padding-top: 2.25rem;

        }

        .header {
            background: #fff;
        }

        .bodys {
          /*height: 100vh;*/
          background: url(../../assets/hb_bg.png);
          background-size: 100%;
          background-repeat: no-repeat;
          background-color: #f76d4c;
          position: relative;
          padding-top: 80%;
        }

        .main {
          background: #fff1e3;
          margin: 0rem 0.975rem 0 0.975rem;
          border-radius: 0.25rem;
          box-shadow: 0 0 0.15rem #ffffff;
          padding: 1.2rem 1.175rem 2rem 1.275rem;

        }

        .main .tips {
            display: flex;
        }

        .sp1 {
            margin-top: 1.35rem;
        }

        .footer {
            padding: 0.5rem 0px;
            text-align: center;
        }

        .footer p {
            font-size: 0.5rem;
            color: #FFAFAF;
        }
        .ti{
          width: auto;
          display: table;
          margin: 0px auto;
              margin-bottom: 1rem;
        }
        .ti span{
          float: left;
          line-height: .3rem;
          font-size: .9rem;
          display: table;
          margin: .5rem .2rem;
          color: #FD7039;
          font-weight: bold;
        }
        .ti span img{
          width: auto;
          display: block;
          margin: 0px auto;
        }
		.fanhi{
			font-style: normal;
			font-size:0.4rem;
		}
        
</style> 
