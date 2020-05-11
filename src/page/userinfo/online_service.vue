<template>
	<div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="OncloseWin()">
				<span class="aui-icon-left"></span>
			</div>
			<div>
				<div class="aui-title">在线客服</div>
			</div>
		</header>
		<div class="information" id="information">
			<div class="info_list" id="info_list">
				<div v-for="(item,index) in infoList" :class="['info_list_li', item.object=='the'?'left':'right']">
					<div v-if="item.object=='the'" class="head_portrait">
						<img src="../../assets/userinfo/head_portrait.png" />
						<!--客服-->
					</div>
					<div v-else class="head_portrait">
						<img v-if='img_url' :src='img_url' />
						<img v-else src="../../assets/userinfo/head_portrait2.png" />
						<!--用户-->
					</div>
					<div v-if="item.type=='TEXT'" class="text">
						<!--问题？回答为文本-->
						<template v-for="(thil,index) in item.content"><template v-if="index != 0"><br /></template>{{thil}}</template>
						<!-- 客服回答的内容 -->
						<div v-if="item.SendState == 'Loading'" class="Loading"></div>
						<div v-else-if="item.SendState == 'fail'" class="fail"></div>
					</div>
					<div v-else class="img">
						<!--为图片-->
						<img :src="item.content[0]" />
					</div>
				</div>
				<div class="info_list_li left">
					<div class="head_portrait">
						<img src="../../assets/userinfo/head_portrait.png" />
					</div>
					<div class="text">
						你好，我是智能客服小美，请问有什么可以帮到您？
				
					</div>
				</div>
				<div v-if="initialAjax" class="info_list_li left">
					<div class="head_portrait">
						<img src="../../assets/userinfo/head_portrait.png" />
					</div>
					<div class="initial-text">
						<p class="head">您可能想问：</p>
						<p v-for="(item,index) in initialInfo" @click="issueInput('initial',index)">{{item}}</p>
					</div>
				</div>
				<div v-for="(item,index) in infoList1" :class="['info_list_li', item.object=='the'?'left':'right']">
					<div v-if="item.object=='the'" class="head_portrait">
						<img src="../../assets/userinfo/head_portrait.png" />
						<!--客服-->
					</div>
					<div v-else class="head_portrait">
						<img v-if='img_url' :src='img_url' />
						<img v-else src="../../assets/userinfo/head_portrait2.png" />
						<!--用户-->
					</div>
					<div v-if="item.type=='TEXT'" class="text">
						<!--问题？回答为文本-->
						<template v-for="(thil,index) in item.content"><template v-if="index != 0"><br /></template>{{thil}}</template>
						<!-- 客服回答的内容 -->
						<div v-if="item.SendState == 'Loading'" class="Loading"></div>
						<div v-else-if="item.SendState == 'fail'" class="fail"></div>
					</div>
					<div v-else class="img">
						<!--为图片-->
						<img :src="item.content[0]" />
					</div>
				</div>
			</div>
		</div>
		<div class="loding" v-if=flag1>
			<img src="../../assets/userinfo/loding.gif" alt="">
		</div>
		<div class="info_input">
			<input type="text" id="info_service" v-model="content" placeholder="请输入内容" />
			<div class="Send_out" @click="issueInput('input')">
				发送
			</div>
		</div>
		<div class="box" v-if="flag2">
			<div>			
				<img src="../../assets/userinfo/loding.gif" alt="">
				<p>客服准备中...</p>
			</div>

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
	export default {
		data() {
			return {
				initialAjax: false,
				content: '', //提问的问题
				userId: '', //客户ID
				img_url: '', //客户头像
				initialInfo: [],
				infoList: [], //存放的是问题与答案，infoList中的object的own代表客户问题，the代表客服答案
				infoList1:[],
				page: 1,
				size: 10,
				auiScroll: true,
				n:'',
				flag:true,
				flag1:false,
				flag2:true,
			}
		},
		created() {
			let uid = getCookie('newData');
// 			if (!uid) {
// 				this.$router.push({
// 					name: 'login'
// 				})
// 				return false;
// 			}
			this.img_url = uid.headurl;
// 			console.log(getSession('infoList'))
// 			this.infoList=getSession('infoList')
// 			this.mtimes()
            this.jzInput()
			var thas=this
			
			
		},
		mounted() {
			var datas = this.Qs.stringify({
				mid: 1
			}, {
				allowDots: true
			});
			this.content = '';
			this.$ajax.post('/caipiaoshouye/index.php/home/index/getUserServerKeywordAllList',
					datas
				)
				.then(res => {
					if (res.data.content.code == '1000') {
						var list = res.data.content.obj;
						console.log(list)
						this.initialInfo = JSON.parse(JSON.stringify(list));
						this.initialAjax = true;
					} else {
						Toast("网络异常！");
						return false;
					}

				})
			
			const timer=setInterval(this.dfInput,5000)
			this.$once('hook:beforeDestroy', function(){    //监听vue，关闭后停止定时器        
                clearInterval(timer);                                    
            })
			var that=this
			var listDome = document.getElementById("information");
			listDome.onscroll = function() {
				var t = listDome.scrollTop; //获取距离页面顶部的距离
				if (t == 0) {
					that.auiScroll=false //第一次加载变为false,
					that.page++;         //页面++
					that.jzInput() 
					that.flag1 = true
                    setTimeout(function() {
                       that.flag1 = false
                    }, 1000)//获取接口数据
				}
			}
// 		this.$router.afterEach((to, from, next) => {
// 			window.scrollTo(listDome.scrollTop, 0)
// 		})

		},
		methods: {
			bs: function() {},
			OncloseWin: function() {
				window.history.go(-1);
			},
			issueInput: function(thas, index) {
				if (thas == 'initial') { //判断问的问题是不是  您可能想问这是数字里面的
					console.log(this.initialInfo[index])
					this.content = this.initialInfo[index]
				}
				console.log(this.content)
				 // var regRule = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$");//禁止输入
                // if (!this.content.match(regRule)) {
                    // this.content = this.content.replace(regRule, "");
//                     Toast("只允许输入中/英文和数字");
// 					return false;
//                 }
				if (this.content) {
					var minfo = {
						object: 'own',
						content: [this.content],
						type: 'TEXT',
						SendState: 'Loading'
					}
					this.n++;
					this.infoList1.push(minfo);
					console.log(this.infoList1)
					this.mtimes()
					let uid = getCookie('newData');
					if (!uid) {
						this.$router.push({
							name: 'login'
						})
						return false;
					}
					var userId = uid.userid;
					var data=[];
					data['userContent']=this.content;
					data['uid']=uid.userid
					var Listleng = this.infoList1.length
					var datas = this.Qs.stringify({
						data
					}, {
						allowDots: true
					});
					this.content = '';
					var thas = this;
					setTimeout(function() {
						thas.$ajax.post('/caipiaoshouye/index.php/home/index/autoResponseMessage',
								datas
							)
							.then(res => {
								console.log(res)
								if (res.data.content.code == '1000') {
									console.log(res.data.content.obj)
									var content = res.data.content.obj.serverContent.split('<br>');
									var rtinfo = {
										object: 'the',
										content: content,
										type: res.data.content.obj.type,
										SendState: 'success'
									}
									thas.n++;//输入一次数据，n++
									thas.infoList1.push(rtinfo);
									thas.infoList1[Listleng - 1].SendState = 'success'
									thas.mtimes()
								} else {
									Toast("请输入有效内容！");
									thas.infoList1[Listleng - 1].SendState = 'fail'
									return false;
								}
							})
					}, 500)
				}
			},
			mtimes: function() {
				setTimeout(function() {
					var listDome = document.getElementById("information");
					var listDome1 = document.getElementById("info_list");
					listDome.scrollTop = listDome1.scrollHeight;
				}, 100)
			},
			jzInput: function() {
				let uid = getCookie('newData');
				console.log(uid)
				if (!uid) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
				var userId = uid.userid;
				console.log(userId)
				var data = [];
				data['uid'] = userId;
				data['page'] = this.page;
				data['size'] = this.size;
				data['appId'] = '';
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				var thas = this;
				console.log(datas)
				setTimeout(function() {
					thas.$ajax.post('/caipiaoshouye/index.php/home/index/historyChatRecord',
							datas
						)
						.then(res => {
							console.log(res)
							var content = res.data.content
							if (content.code == '1000') {
								var obj = content.data.objc
								console.log(obj)
								thas.infoList = thas.infoList.reverse()
								console.log(thas.infoList)
								obj.map(function(item) { //遍历接口对象中的数据
								if(thas.page==1&&thas.flag){
									thas.n=item.id
									thas.flag=false
								}
									var objms
									var type = item.type
									if (type == 0) { //判断数据类型
										type = 'TEXT'
									} else if (type == 1) {
										type = 'IMG'
									} else if (type == 2) {
										type = 'LINK'
									} else {
										type = 'FILE'
									}
									if (item.userOrCustomerService == 1) { //判断是客服还是用户发送的历史消息
										var objms = 'the' //客服
									} else {
										objms = 'own' //用户
									}
									if (item.serverContent) {
										var content = item.serverContent.split('<br>') //将内容转变为数组//客服信息					
										// console.log(content);
										var rtinfo = {
											object: 'the', //类型
											content: content, //内容
											type: type, //诗句类型
											SendState: 'success' //成功回调
										}
										thas.infoList.push(rtinfo);
									}
									if (item.userContent) {
										var content = item.userContent.split('<br>') //将内容转变为数组//客服信息
										// console.log(content);
										var rtinfo = {
											object: 'own', //类型
											content: content, //内容
											type: 'TEXT', //诗句类型
											SendState: 'success' //成功回调
										}
										thas.infoList.push(rtinfo);
									}
								})
								thas.infoList = thas.infoList.reverse()
								console.log(thas.infoList)
								console.log(thas.auiScroll)
								if(thas.auiScroll){
									thas.mtimes()
								}
                              setTimeout(function(){
                              	thas.flag2=false
                              },500)
							}
						})
				}, 500)
			},
			dfInput: function() {
				let uid = getCookie('newData');				
				console.log(13232)
				var userId = uid.userid;
				console.log(userId)
				var data = [];
				data['uid'] = userId;
				data['page'] = 1;
				data['size'] = 30;
				data['appId'] = '';
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				var thas = this;
				console.log(datas)
				setTimeout(function() {
					thas.$ajax.post('/caipiaoshouye/index.php/home/index/historyChatRecord',
							datas
						)
						.then(res => {
							var content = res.data.content
							if (content.code == '1000') {
							var obj = content.data.objc
							console.log(obj)
							// thas.infoList = thas.infoList.reverse()
							console.log(obj[0].id)
							console.log(thas.n)
							if(obj[0].id!=thas.n){
								var ms=(obj[0].id-thas.n)
								console.log(ms)
								thas.n=obj[0].id
								var objs=[]
								for(var i=0;i<ms;i++){
									objs.push(obj[i])
								}
								obj=objs
								console.log(obj)
								obj.reverse()
								obj.map(function(item) { //遍历接口对象中的数据
									var objms
									var type = item.type
									if (type == 0) { //判断数据类型
										type = 'TEXT'
									} else if (type == 1) {
										type = 'IMG'
									} else if (type == 2) {
										type = 'LINK'
									} else {
										type = 'FILE'
									}
									if (item.userOrCustomerService == 1) { //判断是客服还是用户发送的历史消息
										var objms = 'the' //客服
									} else {
										objms = 'own' //用户
									}
									if (item.serverContent) {
										var content = item.serverContent.split('<br>') //将内容转变为数组//客服信息					
										var rtinfo = {
											object: 'the', //类型
											content: content, //内容
											type: type, //诗句类型
											SendState: 'success' //成功回调
										}
										thas.infoList1.push(rtinfo);
									}
									if (item.userContent) {
										var content = item.userContent.split('<br>') //将内容转变为数组//客服信息
										var rtinfo = {
											object: 'own', //类型
											content: content, //内容
											type: 'TEXT', //诗句类型
											SendState: 'success' //成功回调
										}
										thas.infoList1.push(rtinfo);
									}
									
								})
								// thas.infoList = thas.infoList.reverse()
							}						
						}
						})
				}, 500)
			},
		},
	}
</script>
<style scoped>
	.aui-bar-nav {
		position: fixed;
		top: 0;
		z-index: 99;
	}

	section {
		position: relative;
		top: 0;
	}

	.aui-content {
		min-height: 90vh;
	}

	.aui-icon-left {
		background-image: url(../../assets/userinfo/guanbi.png);
		background-repeat: no-repeat;
		background-position: 50% 50%;
		background-size: 68% auto;
		font-size: 0;
		width: 1.5rem;
		height: 1.5rem;
	}

	.information {
		width: 100%;
		height: 100vh;
		padding: 2.25rem 0 2.89rem 0;
		background-color: #F8FCFE;
		overflow-y: scroll;
	}

	.info_list {
		height: auto;
		margin-left: 0.5rem;
		margin-right: 0.5rem;
		padding-top: 1rem;
		overflow-y: scroll;

	}

	.info_list_li {
		width: auto;
		height: auto;
		margin-top: 0.5rem;
		padding: 1rem 2.9rem;
		position: relative;
		zoom: 1
	}

	.info_list_li:after {
		display: block;
		clear: both;
		content: "";
		visibility: hidden;
		height: 0;
	}

	.info_list_li .head_portrait {
		width: 2.2rem;
		height: 2.2rem;
		position: absolute;
		z-index: 1;
		top: 0;
	}

	.info_list_li .head_portrait img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.info_list_li.left .head_portrait {
		left: 0;
	}

	.info_list_li.right .head_portrait {
		right: 0;
	}

	.info_list_li.right .img {
		float: right;
	}

	.info_list_li .initial-text {
		width: auto;
		height: auto;
		padding: 0.6rem 0.6rem;
		background-color: #EFEFEF;
	}

	.info_list_li .initial-text p,
	.info_list_li .initial-text span {
		font-family: PingFangSC;
		font-size: 0.73rem;
		color: #1d72f0;
		text-decoration: underline;
		line-height: 1.5rem;
	}

	.info_list_li .initial-text .head {
		color: #454545;
		text-decoration: none;
	}

	.info_list_li .text {
		width: auto;
		height: auto;
		padding: 0.6rem 0.6rem;
		font-family: PingFangSC;
		font-size: 0.73rem;
		color: #454545;
		line-height: 1.2rem;
	}

	.info_list_li .img {
		width: auto;
		height: auto;
		float: left;
		padding: 0.4rem;
		background-color: #EFEFEF;
		border-radius: 0 0.3rem 0.3rem 0.3rem;
	}

	.info_list_li .img img {
		max-width: 29.5vw;
		height: auto;
	}

	.info_list_li.left .text {
		float: left;
		border-radius: 0 0.3rem 0.3rem 0.3rem;
		background-color: #EFEFEF;
	}

	.info_list_li.right .text {
		float: right;
		border-radius: 0.3rem 0 0.3rem 0.3rem;
		background-color: #5FA9FF;
		color: #fff;
		position: relative;
	}

	.info_list_li.right .text>div {
		content: '';
		width: 0.8rem;
		height: 0.8rem;
		position: absolute;
		bottom: 0.05rem;
		left: -1.2rem;
		background-repeat: no-repeat;
		background-position: 50% 50%;
		background-size: 0.89rem auto;
	}

	.info_list_li.right .text>.Loading {
		background-image: url(../../assets/userinfo/5-121204193933-51.gif);
	}

	.info_list_li.right .text>.fail {
		background-image: url(../../assets/userinfo/shibai-01.png);
	}

	.info_input {
		width: 100%;
		height: 2.89rem;
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
		width: 3.76rem;
		height: 1.86rem;
		position: absolute;
		right: 0.9rem;
		top: 0.52rem;
		background-color: #5FA9FF;
		border-radius: 0.93rem;
		text-align: center;
		font-size: 0.8rem;
		color: #fff;
		line-height: 1.86rem;
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
	
	.box {
		position: fixed;
		top: 2.25rem;
		left: 0;
		right: 0;
		bottom: 0;
		background: #F8FCFE;
		z-index: 12;	
	}
	
	.box div {
		margin-top: 65%;
		text-align: center;
	}
	
	.box img {
		width: 1.5rem;
		height: 1.5rem;
		margin: 0 auto;
		margin-bottom: 0.4rem;
	}
</style>
