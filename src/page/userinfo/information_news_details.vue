<template>
	<div :class="mflag==1?'htmls':''" id="div">
		<nav-bar title="资讯详情" v-if='mflag!=1'></nav-bar>
		<!-- <header class="aui-bar aui-bar-nav" v-if='mflag==1'>
					<div class="aui-pull-left aui-btn" @click="bakeHome()" tapmode>
						首页
					</div>
					<div class="aui-title">资讯详情</div>
		  </header> -->
		<div class="header" v-if="content.promotionImgUrl&&mflag==1">
		  	<img :src="content.promotionImgUrl[0].imgUrl+'?'+timer" alt="" @click="openyingliu()">					
		</div>
		<section class="aui-refresh-content">
            <div class="aui-content" :class="mflag==1?'aui-ms':''">
                <div class="information" id="information">
                    <div class="main" id="main">
                        <div class="title">
							<!-- {{ms.sd}} -->
                            <h3>{{content.title}}</h3>
                        </div>
                        <div class="timer">
                            <span>{{content.createusername}}</span>
                            <span>{{content.lastmodifytime}}</span>
                        </div>
						<div class="banner" v-if="content.promotionImgUrl&&mflag!=1">
							<img :src="content.promotionImgUrl[0].imgUrl+'?'+timer" alt="" @click="openyingliu()">					
						</div>
                        <div class="content">
                          <!-- {{content.html}} -->
                          <div v-html='content.content'></div>
                            <!-- <p>周二022竞彩:比利时轮换阵容无力穿盘，周二022竞彩:比利时轮换阵容无力穿盘</p>
                            <img src="../images/yingchao.png" alt="">
                            <p>周二022竞彩:比利时轮换阵容无力穿盘，周二022竞彩:比利时轮换阵容无力穿盘周二022竞彩:比利时轮换阵容无力穿盘，周二022竞彩:比利时轮换阵容无力 穿盘周二022竞彩:比利时轮换阵容无力穿盘，周二022竞彩:比利时轮换阵容无力穿盘周二022竞彩:比利时轮换阵容无力穿盘，周二022竞彩:比利时轮换阵容无力穿盘</p> -->
                        </div>
						<div class="banner1" v-if="content.promotionImgUrl&&content.promotionImgUrl.length>1">
							<img :src="content.promotionImgUrl[1].imgUrl+'?'+timer" alt="" @click='openyingliu()'>					
						</div>
                    </div>

                   <div class="comment">
                        <div class="commentHeader">
                            <h3 v-if='flag2'>精彩评论</h3>
                        </div>
                        <div class="commentMain" v-if="flag" v-for="item in user">
                            <div class="mainBox">
                                <div class="mainBoxLeft">
                                    <img src="../../assets/userinfo/in_user.png" alt="">
                                </div>
                                <div class="mainBoxRight">
                                    <p class="p1">用户{{item.username.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</p>
                                    <p class="p2">{{item.content}}</p>
                                    <span class="p3">{{item.lastmodifytime}}</span>
									<!-- <span class="p4">{{item.num}}</span>
									<img src="../../assets/userinfo/news_zan2.png" alt="" class="boxImg" > -->

                                </div>
                            </div>
                        </div>
                        <div class="commentImg" v-if='!flag'>
                            <img src="../../assets/userinfo/in_zanwuxx.png" alt="">
                            <p style="margin-bottom: 1rem;">暂无评论消息，赶快来抢占沙发</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
        <div class="info_input" v-if="flag1">
            <input type="text" id="info_service" v-model="str" placeholder="请输入内容" maxlength="50" />
			<!-- :maxlength="num" @input="ms()" -->
            <div class="Send_out" @click="issueInput()">
                发送
            </div>
        </div>
		<div class="xiazai" v-if="mflag==1">
			<div class="Top" @click="goTop()" :class="flag4?'tops':''">
				<img src="../../assets/home/intop.png" alt="">
			</div>
			<img src="../../assets/home/xiazaibanner.png" alt=""  @click='openyingliu()'>
		</div>
	</div>
</template>
<script>
	import {
		getCookie,
	} from "../../js/common.js"
	import {
		Toast
	} from 'mint-ui';
	var ms
	var _userId
	export default {
		data() {
			return {
				userid: '',
				// content: {title:'周二022竞彩:比利时轮换阵容无力穿盘',createusername:'官方发布',createtime:'2019.04.10 16:40',html:'</p>'}, //文章内容
				content:{
// 					title:'周二022竞彩:比利时轮换阵容无力穿盘',
// 					createusername:'官方发布',
// 					createtime:'2019.04.10 16:40',
// 					html:'<p>周二022竞彩:比利时轮换阵容无力穿盘，周二022竞彩:比利时轮换阵容无力穿盘</p><img src="../../assets/home/yingchao.png" alt=""><p>周二022竞彩:比利时轮换阵容无力穿盘，周二022竞彩:比利时轮换阵容无力穿盘周二022竞彩:比利时轮换阵容无力穿盘，周二022竞彩:比利时轮换阵容无力 穿盘周二022竞彩:比利时轮换阵容无力穿盘，周二022竞彩:比利时轮换阵容无力穿盘周二022竞彩:比利时轮换阵容无力穿盘，周二022竞彩:比利时轮换阵容无力穿盘'
				},
				user:[
// 					{
// 					username:'13048424350',
// 					content:'我是你爸爸真伟大',
// 					createtime:'04-11 18:20',
// 					num:'2890',
// 					type:'1'
// 					}
				],
				str: '',
				auiScroll: false,//上拉加载
				flag: true,//缺省页
				page: 1,
				limit: 20,
				flag1: false,//弹窗
				flag2: false,//热门评论
				flag3:false,//滚动加载评论位置
				flag4:false,
				articleId: '',
				num: 50,//评论字数
				num1: 0,//中
				num2: 0,//英
				mflag:'',
				userid:'',
				timer:'',
			}
		},
		beforeDestroy(){
			document.title='美奇彩'
		},
		created() {
		this.mflag=ms;
		if(!_userId&&getCookie('newData')){
			_userId=getCookie('newData').sportId
		}
		if(!_userId&&getCookie('_userId')){
			_userId=getCookie('_userId')
		}
		this.userid=_userId;
        this.articleId = this.$route.query.articleId;
        this.selectArticleById();
		this.selectCommentByArticleId();
		var  uid = getCookie('newData');
		if(uid){
			this.flag1=true
		}
		var thas=this;
		const timers=setInterval(function(){
			thas.timer=new Date().getTime();
			console.log(thas.timer)
		},1000)
		this.$once('hook:beforeDestroy', function(){    //监听vue，关闭后停止定时器        
		    clearInterval(timers);                                    
		})
		},
		mounted() {		
			window.addEventListener('scroll', this.handleScroll, true); 
			var that = this;
				var pullToRefresh = new auiPullToRefresh({ //下拉刷新
					container: document.querySelector('.aui-refresh-content'), //下拉容器
					triggerDistance: 80 //下拉高度
				}, function(ret) {
					if (ret.status == "success") {
						that.page = 1;
						that.user = [];
						that.flag3=false;
						that.$ajax.defaults.timeout  =  49527;//49527这个值控制没有showLonding
						that.selectArticleById();
						that.selectCommentByArticleId();
						setTimeout(() => {
							pullToRefresh.cancelLoading(); //刷新成功后调用此方法隐藏
						}, 1500)
					}
				});
				var scroll = new auiScroll({ //上拉加载
					listen: true, //是否监听滚动高度，开启后将实时返回滚动高度
					distance: 0 //判断到达底部的距离，isToBottom为true
				}, function(ret) {
					if (ret.isToBottom == true && that.auiScroll) {
						that.auiScroll = false;
						that.page++;
						that.selectCommentByArticleId();
					}
				});
		},
		methods: {
			 handleScroll: function () {
				var scrolltop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;			
				if(scrolltop>500){
					this.flag4=true;
				}
				else{
					this.flag4=false;
				}
        },
			bs: function() {
				var listDome1 = document.getElementById("main");
				window.scrollTo(0, listDome1.scrollHeight)
			},
			goTop:function(){
				window.scrollTo(0,0);
			},
			bakeHome:function(i){
				this.$router.push({
					name:'home'
				})
			},
			OncloseWin: function() {
				window.history.go(-1);
			},
			openyingliu:function(){
				window.open('http://mi.facaime.com/yinliu/yinliu.html?_userId=' +_userId);
			},
// 			ms: function() {
// 				var thas = this;
// 				var len = 0;
// 				for (var i = 0; i < thas.str.length; i++) {
// 					var c = thas.str.charCodeAt(i);
// 					if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) { //英文
// 						thas.num2++;
// 					} else { //汉字
// 						thas.num1++;
// 					}
// 				}
// 				var sum = thas.num1 + (thas.num2 / 2)
// 				console.log(sum)
// 				if (sum < 50) {
// 					console.log(1)
// 					thas.num = 50 + thas.num2
// 				} else {
// 					thas.num = thas.str.length
// 				}
// 				thas.num1 = 0;
// 				thas.num2 = 0;
// 			},
			issueInput: function() {
				if(this.str.length==0){
					Toast("请输入评论内容")
				}
				else{
					var regRule=/[`~@#$%^&*()_\-+=<>?:"{}|\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》：“”【】、；‘’、]/im
					var uid = getCookie('newData');					
					if (this.str.match(regRule)) {
						this.str = this.str.replace(regRule, "");
							Toast("请输入中文,英文和数字!");
					} else {	
						this.articleCommentAdd();
					}	
				}		
			},
					//添加文章评论
			articleCommentAdd: function() {
				let uid = getCookie('newData');
				var userId = uid.userid;
				var thas = this
				var data = [];
				data['userId'] = userId;
				data['articleId'] = thas.articleId;
				data['content'] = thas.str;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				var thas = this;
				this.str='';
				thas.$ajax.post('/caipiaoshouye/index.php/home/index/articleCommentAdd',
						datas
					)
					.then(res => {
						thas.$ajax.defaults.timeout  =  49527;//49527这个值控制没有showLonding
						console.log(res)
						var content = res.data.content
						if (content.code == '1000') {
							thas.page = 1;
							thas.selectCommentByArticleId()
							Toast("评论成功")	
						}
					})
			},
						//获取文章内容
			selectArticleById: function() {
				var thas = this
				var data = [];
				data['articleId'] = thas.articleId;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				var thas = this;
				thas.uri = []
				thas.imgs = []
				thas.url = ''
				console.log(datas)
				thas.$ajax.post('/caipiaoshouye/index.php/home/index/selectArticleById',
						datas
					)
					.then(res => {
						console.log(res)
						thas.flag2 = true
						var content = res.data.content
						console.log(content)
						console.log(content.obj.promotionImgUrl)
						console.log(1)
						if(content.obj.promotionImgUrl){
							content.obj.promotionImgUrl =JSON.parse(content.obj.promotionImgUrl);
						}
						console.log(content.obj.promotionImgUrl[0]);
						console.log(content.obj.affiliateEncryption)
						if (content.code == '1000') {
							this.content = content.obj;
							document.title=content.obj.title
						}
					})
			},
			
					//获取文章评论
			selectCommentByArticleId: function() {
				let uid = getCookie('newData');
				var userId = uid.userid;
				var thas = this
				var data = [];
				data['articleId'] = thas.articleId;
				data['page'] = thas.page;
				data['limit'] = thas.limit;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				var thas = this;
				console.log(datas)
				thas.$ajax.post('/caipiaoshouye/index.php/home/index/selectCommentByArticleId',
						datas
					)
					.then(res => {
						console.log(res)
						var content = res.data.content
						console.log(content)
						if (content.code == '1000') {
							if (thas.page == '1' && content.obj.length == 0) {
								thas.flag = false;
							}
							else if (thas.page != '1' && content.obj.length == 0) {//下拉不了了,没有更多数据了
							}
							if(thas.page==1&&content.obj.length!=0){
								thas.flag = true
								thas.auiScroll = true
								thas.user=content.obj
							}
							if(thas.flag3&&thas.auiScroll){//只有发送评论才执行,flag3让刷新时，不会执行滚动，auiScroll让下拉时，不会执行
								thas.$nextTick(function(){
								thas.bs()
								})	
							}
							if (thas.page!=1 && content.obj.length != 0) {
								thas.flag = true
								thas.auiScroll = true
								content.obj.map(function(item) {
									thas.user.push(item)
								})
							}
							
							thas.flag3=true
						}

					})
			},

		},
		filters:{
			 getTimes : function(matchDate) {
				matchDate=matchDate.replace(/-/g,'/');//ios不兼容，需要转/
				var time = new Date(matchDate);
				var y = time.getFullYear();
				var m = time.getMonth() + 1 >= 10 ? parseInt(time.getMonth() + 1) : "0" + parseInt(time.getMonth() + 1);
				var d = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
				var h = time.getHours() >= 10 ? time.getHours() : "0" + time.getHours();
				var mm = time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes();
				 //月日时分
				return y + "-"+ m + "-" + d + " " + h + ":" + mm;
			}
		},
		beforeRouteEnter (to, from, next) {	
				ms=to.query.mflag
				_userId=to.query._userId
			next()
			},
// 		watch: {
// 		  '$route' (to, from) {
// 			console.log(to);
// 			console.log(from)
// 			
// 		  }
// 		}
	}
</script>
<style scoped>
	header {
		position: fixed;
	}
	
	@media only screen and (min-width: 800px) {
		.htmls {
			max-width: 375px;
			margin: 0 auto;
		}
		.xiazai {
			max-width: 375px;
			margin: 0 auto;
		}
		
		.Top {
			max-width: 375px;
			margin:  0 auto;
		}
	}
	
	.header{
		position: relative;
		z-index: 1000;
	}
	
	.header img {
		width: 100%;
	}

	.flag1 {
		text-align: center;
		margin-top: 0.4rem;
		margin-bottom: 0.3rem
	}
	.aui-refresh-pull-down ..aui-refresh-load {
		display: none !important;
	}

	.aui-content {
		min-height: 90vh;
		margin-top: 2.25rem;
	}
	
	.aui-ms {
		margin-top: 0;
	}
	
	.aui-btn{
		font-size: ;
	}
	
	.aui-btn:active {
		color: #e5e5e5;
	}

	.information {
		background: #F4F4F4;
	}

	.main {
		padding: 0 4%;
		padding-bottom: 0.5rem;
		background: #fff;
		margin-bottom: 0.5rem;
		padding-top: 1.125rem;
	}

	.title {
		margin-bottom: 0.675rem;
	}

	.title h3 {
		font-size: 0.85rem;
		line-height: 1rem;
		color: #333;
		font-weight: bold;
	}

	.timer span {
		font-size: 0.6rem;
		line-height: 1.15rem;
		color: #999999;
	}

	.timer span:nth-child(1) {
		margin-right: 0.6rem;
	}

	.content {
		margin: 1.15rem 0 0 0;
	}

    .content p {
         font-size: 0.65rem !important;
            line-height: 1.225rem !important;
            color: #666 !important;

    }

    .content img {
        width: 100% !important;
    }

	.comment {
		padding: 0 4%;
		padding-top: 1rem;
		border-top: 1px solid #F4F4F4;
		background: #fff;
	}

	.commentHeader h3 {
		font-size: 0.75rem;
		line-height: 1.15rem;
		color: #000000;
		font-weight: bold;
	}

	.commentImg {
		margin-top: 0.9rem;
		margin-bottom: 4rem;
	}

	.commentImg img {
		width: 40%;
		height: 40%;
		margin: 0 auto;
	}

	.commentImg p {
		font-size: 0.65rem;
		line-height: 1.05rem;
		color: #666666;
		text-align: center;
	}

	.commentMain {
		margin-top: 1.25rem;
	}
	.commentMain:last-child{
		padding-bottom: 2.825rem;
	}

	.commentMain .mainBox {
		display: flex;
		margin-bottom: 1.25rem;
		/* justify-content: space-between; */
	}

	.mainBox .mainBoxLeft {
		flex: 1.2;
	}

	.mainBox .mainBoxRight {
		flex: 8.7;
		padding-left: 0.475rem;
	}

	.mainBoxRight .p1 {
		font-size: 0.65rem;
		line-height: 0.925rem;
		color: #04378C;
		margin-bottom: 0.25rem;
	}

	.mainBoxRight .p2 {
		font-size: 0.7rem;
		line-height: 1rem;
		color: #333;
		margin-bottom: 0.3rem;
	}

	.mainBoxRight .p3 {
		font-size: 0.6rem;
		line-height: 0.825rem;
		color: #999;
		vertical-align: top;
	}
	.mainBoxRight .boxImg {
		widows: 0.675rem;
		height: 0.65rem;
		float: right;
		margin-right: 0.2rem;
	}
	.mainBoxRight .p4 {
		font-size: 0.6rem;
		line-height: 0.825rem;
		color: #999;
		float: right;
	}

	.info_input {
		width: 100%;
		height: 2.875rem;
		position: fixed;
		bottom: 0;
		background-color: #fff;
		padding: 0.11rem 0;
		padding-left: 13.7vw;
		padding-right: 24.5vw;
		box-shadow: 0 1px 5px #d1d1d1;
		background-image: url(../../assets/userinfo/inputBut.png);
		background-repeat: no-repeat;
		background-position: 0.8rem 50%;
		background-size: 0.9rem 1.075rem;
		z-index: 1;
		font-size: 0.65rem;
	}

	.info_input input {
		display: block;
		height: 2.6rem;
	}

	.Send_out {
		width: 3.5rem;
		height: 1.4rem;
		position: absolute;
		right: 0.775rem;
		top: 0.725rem;
		background-color: #5FA9FF;
		border-radius: 0.93rem;
		text-align: center;
		font-size: 0.8rem;
		color: #fff;
		line-height: 1.4rem;
	}
	
	.Send_out:active{
		background-color: #2487fb;
	}

	.loding {
		position: fixed;
		top: 2.25rem;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100
	}

	.loding img {
		width: 1.5rem;
		height: 1.5rem;
		position: absolute;
		left: 50%;
		margin-left: -0.75rem;
	}

	.commentTc {
		position: fixed;
		width: 60%;
		height: 5rem;
		background: #dcdbdb;
		margin-top: -2.5rem;
		top: 50%;
		left: 20%;
		border-radius: 6px;
	}

	.commentTc p {
		text-align: center;
		line-height: 1.5rem;
		margin-bottom: 0.5rem;
		margin-top: 1rem;
	}

	.commentTc div {
		text-align: center;
	}

	.commentTc button {
		width: 3rem;
		height: 1.5rem;
		line-height: 1.5rem;
		background: #e5e5e5;
	}
	
	.banner,.banner1 {
		margin-top: 0.5rem;
	}
	
	.banner img,.banner1 img{
		max-width: 100%;
		margin: 0 auto;
	}
	
	.Top {
		width: 1.8rem;
		height: 1.8rem;
		float: right;
		margin: 0 0.5rem 0.5rem 0;
		opacity: 0;
		transform: scale(0);
		transition: 1s;
	}
	.Top img{
		width: 100%;
	}
	
	.tops{
		transform: scale(1);
		opacity: 1;
		transition: 1s;
	}
	
	.xiazai {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}
	
	.xiazai img {
		width:100%;
	}
</style>
