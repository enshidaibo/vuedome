<template>
	<div class="feedback">
		<nav-bar title="意见反馈"></nav-bar>
		<div class="main">
			<div class="mainType">
				<div class="typeTop">
					<h4>反馈类型</h4>
				</div>
				<div class="typeBottom">
					<div v-for="(item,index) in type">
						<button class="btn1" value="index" @click="ms(index)" :class="num==index?'active':''">
							<p>{{item.typeName}}</p>
						</button>
					</div>
				</div>
			</div>
			<div class="mainContent">
				<div class="contentTop">
					<h4>反馈内容</h4>
				</div>
				<div class="contentBottom">
					<textarea name="name" placeholder="请描述您的问题，最多限100字。" :maxlength="num3" v-model="str" @input="add_flag()"></textarea>
				<!-- 	<div v-if="flag2" class="tc2">
						<p>反馈内容不能为空</p>
					</div> -->
				</div>
			</div>
			<div class="toImg">
				<input type="file" id="sc" accept="image/png, image/jpeg, image/jpg" @change="add_img()" ref='imgInput'>
				<label for="sc" @change="add_img()"><img src="../../assets/userinfo/tjimg.png" alt=""></label>
				<div v-if="imgs.length>0" v-for='(item ,index ) in imgs'>
					<img :src="item">
					<img src="../../assets/userinfo/fkclose.png" alt="" class="img3" @click="imgClose(index)">
				</div>
			</div>
			<button @click="submit" :class="flag1 ?'active1 submit':'submit' ">提交</button>
			
		</div>
		<div class="box" v-if="flag">
			<div class="feedbackTc">
				<div class="tcConter">
					<img src="../../assets/userinfo/fktc.png" alt="">
					<div class="tcMain">
						<h2>反馈成功</h2>
						<p class="tcp1">您的反馈我们会认真查看，并尽快修复及完善 感谢您对平台一如既往的支持</p>
						<p class="tcp2">{{n}}秒后自动跳转</p>

					</div>
				</div>
				<div class="tcClose" @click="close">
					<img src="../../assets/userinfo/fkclose.png" alt="">
				</div>
			</div>
		</div>
		<canvas width="200" height="200"></canvas>

	</div>
</template>
<script>
	import {
		MessageBox,
		Toast
	} from 'mint-ui';
	import {
		OverallData,
		getCookie,
		setCookie
	} from "../../js/common.js"
	export default {
		data() {
			return {
				// type: ["功能异常", "产品建议", "体验问题", "智商问题", "其他"],
				type: [],//问题类型
				num: 0,
				str: '',
				imgs: [],//图片本地的地址
				flag: false,//是否显示弹窗
				flag1: false, //判断提交按钮的样式
				flag2:false,//弹窗是否开始倒计时
				n: 3,
				url: '',
				uri: [],//图片的链接
				num1:0,
				num2:0,
				num3:100,
			}
		},

		created() {
			this.getLotteryUserFeedbackType()
			const timer=setInterval(this.times,1000)	
				this.$once('hook:beforeDestroy', function(){    //监听vue，关闭后停止定时器        
					clearInterval(timer);                                    
			})
		},
		mounted() {

		},
		methods: {
			ms: function(i) {
				this.num = i
			},
			add_flag: function() {
				if (this.str != '') {
					this.flag1 = true
				} else if (this.str == '' && this.imgs.length == 0) {
					this.flag1 = false
				}
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
					if (sum < 100) {
						console.log(1)
						thas.num3 = 100 + thas.num2
					} else {
						thas.num3 = thas.str.length
					}
					thas.num1 = 0;
					thas.num2 = 0;
			},
			submit: function() {
				var uid = getCookie('newData');
				var userId = uid.userid;
				console.log(userId)
				var thas = this
				if (thas.str == '') {
					Toast("反馈内容不能为空")
				} else {
					for (var i = 0; i < thas.uri.length; i++) {
						if (thas.url == '') {
							thas.url = thas.uri[i]
						} else {
							thas.url = thas.url + ',' + thas.uri[i]
						}
						console.log(thas.url)
					}
					var data = [];
					data['mid'] = 1;
					data['uid'] = userId
					data['typeName'] = thas.type[thas.num].typeName
					data['typeId'] = thas.type[thas.num].id
					data['content'] = thas.str
					data['imgUrl'] = thas.url
					var datas = this.Qs.stringify({
						data
					}, {
						allowDots: true
					});
					thas.uri = []
					thas.imgs = []
					thas.url = ''
					console.log(datas)
					thas.$ajax.post('/caipiaoshouye/index.php/home/index/insertFeedbackRecord',
							datas
						)
						.then(res => {
							console.log(res)
							var content = res.data.content
							console.log(content)
							if (content.code == '1000') {
								thas.flag = !thas.flag
								thas.flag2=!thas.flag2
							}
						})
				}
			},
			close: function() {//关闭弹窗
				this.flag = !this.flag
				this.n=1
			},
			imgClose: function(i) {//删除图片
				this.imgs.splice(i,1)
				this.uri.splice(i,1)
				if (this.imgs.length == 0 && this.str == '') {
					this.flag1 = false
				}
			},
			times: function() {//弹窗倒计时3秒
				if(this.flag2){		
					this.n--;
					console.log(this.n)
					if (this.n == 0) {
						this.$router.go(-1);
// 						this.$router.push({
// 							name: 'userinfo_setup'
// 						})
					}
				}		
			},
			getLotteryUserFeedbackType: function() {//获取问题类型
				var data = [];
				data['mid'] = 1;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				var thas = this;
				console.log(datas)
				thas.$ajax.post('/caipiaoshouye/index.php/home/index/getLotteryUserFeedbackType',
						datas
					)
					.then(res => {
						console.log(res)
						var content = res.data.content
						console.log(content)
						if (content.code == '1000') {
							thas.type = content.data
							console.log(thas.type)
						}
					})

			},

			add_img(event) {//对上传的图片进行处理
				if (this.imgs.length == 3) {
					Toast('最多只能选择三张！');
					setTimeout(function() {
						this.flag2 = true
					}, 1000)
				} else {
					var reader = new FileReader();
					console.log(reader)
					var img1 = this.$refs.imgInput.files[0]; //获取图片的路径
					 reader.readAsDataURL(img1); //转化图片路径
					 var file
					 var imgType
					 var that=this
					 reader.onloadend = function (e) {
						 var bs    	 //图片转化为base64后赋值给file  e.target.result是完整的base64码
						 bs=e.target.result.split(',')
						 console.log(bs[0].split(';')[0].split(':')[1].split('/')[1])
						 file=bs[1]
						 imgType=bs[0].split(';')[0].split(':')[1].split('/')[1]
						 console.log(file)
						 var ms = window.URL.createObjectURL(img1)
						 console.log(ms)
						 that.imgCl(file,imgType,ms)
						that.imgs.push(ms);
					}
					
					var size = img1.size; //文件的大小，判断图片的大小
					if (size > 3145728) {
						Toast('请选择3M以内的图片！');
						return false;
					}
					
				}
			}, 
			
			imgCl:function(i,t,ms){
				var uri = ''
				var data = [];				
// 				console.log(i)
// 				console.log(t)
				data['imgFile'] = i;
				data['imgFileType']= t
				// console.log(ms)
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/appupload', datas, {
				}).then(response => {
					console.log(response.data.content)
					uri = response.data.content.obj
					var uriHeader = response.data.content.other
// 					console.log(uri)
// 					console.log(uriHeader)
					uri = uriHeader + uri //拼接图片地址
					// reader.readAsDataURL(img1);
					console.log(uri)
					this.uri.push(uri)
					this.$refs.imgInput.value=''

					
				})
			}
		}
	}
</script>
<style scoped>
	.typeBottom .active {
		background: url(../../assets/userinfo/kuang.png);
		border: none;
		background-size: 5rem 1.55rem;
	}

	.typeBottom .active p {
		color: #FF9C36;
	}

	.main {
		margin-top: 2.25rem;
		padding: 0 4%;
	}

	.typeTop {
		padding-top: 0.9rem;
		border-bottom: 1px solid #EDEDED;
	}

	.main .active1 {
		background: #2EB7F4;
	}

	h4 {
		font-size: 0.7rem;
		color: #6A6A6A;
		line-height: 1rem;
		letter-spacing: 2px;
		margin-bottom: 0.275rem;
	}

	.typeBottom {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.btn1 {
		flex: 1;
		width: 5rem;
		height: 1.55rem;
		border: 1px solid #BFBFBF;
		background: white;
		margin-top: 0.6rem;
		border-radius: 0;
		box-sizing: border-box;
	}

	.btn1 p {
		font-size: 0.65rem;
		line-height: 0.925rem;
		letter-spacing: 0.05rem;
		color: #BFBFBF;
	}

	.contentTop {
		padding-top: 0.9rem;
		border-bottom: 1px solid #EDEDED;
	}
	.contentBottom {
		position: relative;
	}
	
	.contentBottom .tc2 {
        position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}

	textarea {
		/* width: 92%; */
		margin-top: 0.65rem;
		height: 8.75rem;
		background: #F6F6F6;
		border: 1px solid #DFDEDE;
		line-height: 0.925rem;
		letter-spacing: 0.05rem;
		font-size: 0.65rem;
		color: #777;
		padding: 0.475rem 0.375rem;
	}

	textarea::placeholder {
		color: #B8B8B8;
	}

	.toImg {
		margin-top: 0.975rem;
	}

	.toImg img {
		width: 4rem;
		height: 4rem;
		display: inline-block;
	}

	.toImg div {
		display: inline-block;
		position: relative;
	}

	.toImg input {
		display: none;
	}

	.toImg .img3 {
		position: absolute;
		top: 0;
		right: 0;
		width: 0.8rem;
		height: 0.8rem;
		background: rgba(0, 0, 0, 0.49);
		border-radius: 50%;
	}

	.submit {
		margin-top: 1.5rem;
		width: 100%;
		background: #B5BABE;
		border-radius: 0.25rem;
		color: #FCFCFC;
		height: 2.25rem;
		/*  line-height: 2.25rem; */
	}

	.box {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .7);
		/* opacity: 0.6; */
	}

	.feedbackTc {
		width: 80%;
		margin: 40% auto;
		text-align: center;
	}

	.tcConter {
		background: white;
		padding-bottom: 1.375rem;
		border-radius: 0.5rem;
	}

	.tcMain h2 {
		font-size: 1.2rem;
		line-height: 1.675rem;
		color: #363636;
		margin: 0.525rem 0 0.45rem 0;
	}

	.tcMain .tcp1 {
		font-size: 0.65rem;
		line-height: 0.9rem;
		color: #818181;
		text-align: center;
		width: 87%;
		margin: 0 auto;
	}

	.tcMain .tcp2 {
		font-size: 0.65rem;
		line-height: 0.925rem;
		color: #03A9F4;
		margin: 1.25rem 0 0 0;
	}

	.tcClose {
		width: 1.25rem;
		height: 1.25rem;
		margin: 1.3rem auto;
	}
</style>
