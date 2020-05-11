<template>
	<div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="bake()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title home-header">
				<img src="../../assets/userinfo/in_header.png" alt="" style="height: 1rem; display: inline-block">
			</div>

			<!-- <div class="aui-btn aui-pull-right" @click="xiazai()">
				<img src="../../assets/userinfo/in_fenxiang.png" />
			</div> -->
		</header>
		<section class="aui-refresh-content">
			<div class="aui-content">
				<div class="information">
					<div class="main">
						<div class="title">
							<h3>{{content.title}}</h3>
						</div>
						<div class="timer">
							<span>{{content.createusername}}</span>
							<span>{{content.lastmodifytime}}</span>
						</div>
						<div class="content">
							<div v-html='content.content'></div>
						</div>
					</div>

					<div class="comment"  v-if="bool!='home'">
						<div class="commentHeader">
							<h3 v-if="flag2">热门评论</h3>
						</div>
						<div class="commentMain" v-if="flag" v-for="item in user">
							<div class="mainBox">
								<div class="mainBoxLeft">
									<img src="../../assets/userinfo/in_user.png" alt="">
								</div>
								<div class="mainBoxRight">
									<p class="p1">用户{{item.username.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</p>
									<p class="p2">{{item.content}}</p>
									<p class="p3">{{item.createtime}}</p>
								</div>
							</div>
						</div>
						<div class="commentImg" v-if='!flag'>
							<img src="../../assets/userinfo/in_zanwuxx.png" alt="">
							<p>暂无评论消息，赶快来抢占沙发</p>
						</div>
						<!-- 	<div class="flag1" v-if='flag1'>
					<p id="not_info_two" class="not_info">没有更多数据了</p>
				</div> -->

					</div>
				</div>

			</div>
		</section>

		<div class="commentTc" v-if="flag1">
			<p>您尚未登录，是否去登陆</p>
			<div>
				<button @click="enter()">确定</button>
				<button @click="close()">取消</button>
			</div>

		</div>


		<!-- <div class="loding" v-if=flag1>
			<img src="../../assets/userinfo/loding.gif" alt="">加载中
		</div> -->
		<div class="info_input" v-if="bool!='home'">
			<input type="text" id="info_service" v-model="str" placeholder="请输入评论内容" :maxlength="num" @input="ms()" />
			<div class="Send_out" @click="issueInput('input')">
				发布
			</div>
		</div>
	</div>
</template>
<script>
	import {
		getCookie
	} from "../../js/common.js"
	import {
		Toast
	} from 'mint-ui';
	export default {
		data() {
			return {
				content: {},
				user: [],
				str: '',
				auiScroll: true,
				flag: true,
				page: 1,
				limit: 20,
				flag1: false,
				flag2: false,
				articleId: '',
				num: 50,
				num1: 0,
				num2: 0,
				bool:'',

			}
		},
		created() {
			this.articleId = this.$route.query.articleId;
			this.bool=this.$route.query.bool;
			console.log(this.bool=='home')
			if(this.bool!='home'){
			
				this.selectCommentByArticleId();
			}
				this.selectArticleById();
		},
		mounted() {
			var that = this;
			if(that.bool){
				var pullToRefresh = new auiPullToRefresh({ //下拉刷新
					container: document.querySelector('.aui-refresh-content'), //下拉容器
					triggerDistance: 80 //下拉高度
				}, function(ret) {
					if (ret.status == "success") {
						that.page = 1;
						that.user = [];
						that.$ajax.defaults.timeout  =  49527;//49527这个值控制没有showLonding
						that.selectCommentByArticleId();
						setTimeout(() => {
							pullToRefresh.cancelLoading(); //刷新成功后调用此方法隐藏
						}, 1500)
					}
				});
				var scroll = new auiScroll({ //上拉加载
					listen: false, //是否监听滚动高度，开启后将实时返回滚动高度
					distance: 0 //判断到达底部的距离，isToBottom为true
				}, function(ret) {
					console.log("saddas")
					if (ret.isToBottom == true && that.auiScroll) {
						that.auiScroll = false;
						console.log(1)
						that.page++;
						that.selectCommentByArticleId();
					}
				});
			}		
		},
		methods: {
			bs: function() {},
			bake: function() {
				this.$router.go(-1);
			},
			ms: function() {
				var thas = this;
				var len = 0;
				for (var i = 0; i < thas.str.length; i++) {
					var c = thas.str.charCodeAt(i);
					if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) { //英文
						thas.num2++;
					} else { //汉字
						thas.num1++;
					}
				}
				var sum = thas.num1 + (thas.num2 / 2)
				console.log(sum)
				if (sum < 50) {
					console.log(1)
					thas.num = 50 + thas.num2
				} else {
					thas.num = thas.str.length
				}
				thas.num1 = 0;
				thas.num2 = 0;
			},
			issueInput: function() {
				var regRule = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$");//禁止输入

					var uid = getCookie('newData');
					if (!uid) {
						this.flag1 = true
					} else {
						if (!this.str.match(regRule)) {
							// this.str = this.str.replace(regRule, "");
							Toast("只允许输入中/英文和数字");
						} else {
							this.articleCommentAdd();
						}
					}


			},
			enter: function() {
				this.$router.push({
					name: 'login'
				})
			},
			close: function() {
				this.flag1 = false;

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
				thas.uri = []
				thas.imgs = []
				thas.url = ''
				console.log(datas)
				thas.$ajax.post('/caipiaoshouye/index.php/home/index/articleCommentAdd',
						datas
					)
					.then(res => {
						console.log(res)
						var content = res.data.content
						console.log(content)
						if (content.code == '1000') {
							thas.str = '';
							thas.page = 1;
							thas.user = [];
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
						if (content.code == '1000') {
							this.content = content.obj
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
				thas.uri = []
				thas.imgs = []
				thas.url = ''
				console.log(datas)
				thas.$ajax.post('/caipiaoshouye/index.php/home/index/selectCommentByArticleId',
						datas
					)
					.then(res => {
						console.log(res)
						var content = res.data.content
						console.log(content)
						if (content.code == '1000') {
							if (thas.page == 1 && content.obj.length == 0) {
								thas.flag = false
							}
							if (content.obj.length != 0) {
								thas.flag = true
								thas.auiScroll = true
								content.obj.map(function(item) {
									thas.user.push(item)
								})
							}
							// 								else {
							// 									thas.flag1=true;
							// 								}
						}
					})
			},
		}
	}
</script>
<style scoped>

	header {
		position: fixed;
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

	.information {
		width: 92%;
		margin: 0 4%;
		padding: 0 0 2.89rem 0;
		overflow-y: scroll;
	}

	.main {
	}

	.title {
		margin-top: 1.15rem;
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
		margin: 1.55rem 0 3rem 0;
	}

	.content p {
		font-size: 0.7rem;
		line-height: 1.05rem;
		color: #333333;
		letter-spacing: 1px;
		text-align: justify;
	}

	.comment {
		padding-top: 1.5rem;
		border-top: 1px solid #F4F4F4;
	}

	.commentHeader h3 {
		font-size: 0.75rem;
		line-height: 1.15rem;
		color: #000000;
		font-weight: bold;
	}

	.commentImg {
		margin-top: 0.9rem;
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

	.commentMain .mainBox {
		display: flex;
		margin-bottom: 1.25rem;
		/* justify-content: space-between; */
	}

	.mainBox .mainBoxLeft {
		flex: 1.1;
	}

	.mainBox .mainBoxRight {
		flex: 8.8;
		padding-left: 0.475rem;
	}

	.mainBoxRight .p1 {
		font-size: 0.65rem;
		line-height: 1.15rem;
		color: #04378C;
		margin-bottom: 0.6rem;
	}

	.mainBoxRight .p2 {
		font-size: 0.7rem;
		line-height: 1rem;
		color: #333;
		margin-bottom: 0.65rem;
	}

	.mainBoxRight .p3 {
		font-size: 0.6rem;
		line-height: 1.15rem;
		color: #999;
		text-align: right;
	}

	.info_input {
		width: 100%;
		height: 2.825rem;
		position: fixed;
		bottom: 0;
		background-color: #fff;
		padding: 0.5rem 0;
		padding-left: 13.7vw;
		padding-right: 24.5vw;
		box-shadow: 0 1px 5px #d1d1d1;
		background-image: url(../../assets/userinfo/inputBut.png);
		background-repeat: no-repeat;
		background-position: 0.8rem 50%;
		background-size: 1.2rem auto;
		z-index: 1;
	}

	.info_input input {
		display: block;
		height: 1.89rem;
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
</style>
