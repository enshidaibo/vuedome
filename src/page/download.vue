<template>
	<div>
		<img v-if="isweixin" id="neirong" @click="isweixin = false" class="neirongclassnone" src="../assets/download/neirong.png">
		<div class="stop_scroll" id="stop_scroll">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide"><img src="../assets/download/a01.png" /></div>
					<div class="swiper-slide"><img src="../assets/download/a02.png" /></div>
					<div class="swiper-slide"><img src="../assets/download/a03.png" /></div>
					<div class="swiper-slide"><img src="../assets/download/a04.png" /></div>
				</div>
				<div class="swiper-pagination botnD">
					<!--分页容器-->
				</div>
			</div>
			<p>美奇彩&nbsp;&nbsp;&nbsp;&nbsp;你口袋里的购票机</p>
			<div id="" class="downbtn" @click="downbtnClick">
				{{downbtnText}}
			</div>
			<div id="jixu" class="ioszt" @click="cztShow = true">Ios&nbsp;9及以上运行指导</div>
			<div class="jixu" @click="JumpLink">继续浏览美奇彩票网页版 ></div>
			<div class="czt" v-if="cztShow">
				<div class="imgBox">
					<img src="../assets/download/czt.jpg" id="czt" @click="cztShow = false" />
				</div>
				<div class="lijixianzai" id="lijixianzai" @click="downlick">
					<img src="../assets/download/dop_xj.png" />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Swiper from 'swiper';
	export default {
		data() {
			return {
				downbtnText: '立即下载',
				istype: 'unknown',
				cztShow: false,
				tcimg: false,
				isweixin: false,
				is_weixin: false,
				downlickList: {
					Version: "",
					androidurl: "",
					iosurl: "",
					time: ""
				}
			}
		},
		created() {
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			var isMobile = !u.match(/AppleWebKit.*Mobile.*/);
			var tcimg = false;
			if (isAndroid) {
				this.istype = 'Android';
				this.downbtnText = 'Android版本下载';
			} else if (isiOS) {
				this.istype = 'IOS';
				this.downbtnText = "iPhone版本下载";
			} else if (isMobile) {
				this.istype = 'Mobile';
				this.is_weixin = (function() {
					return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
				})();
			}
			console.log(this.istype)
		},
		mounted() {
			let mySwiper = new Swiper('.swiper-container', {
				loop: true,
				width: window.innerWidth,
				autoHeight: true, //高度随内容变化
				pagination: {
					el: '.swiper-pagination'
				},
				on: {
					click(e) {}
				},
				autoplayDisableOnInteraction: false,
				observer: true, //修改swiper自己或子元素时，自动初始化swiper
				observeParents: true, //修改swiper的父元素时，自动初始化swiper
			});
			let dataes = this.Qs.stringify({

			}, {
				allowDots: true
			});
			this.$ajax.post('/caipiaoshouye/index.php/home/index/checksaveAPPVersion', dataes).then(ret => {
				if (ret.status == 200) {
					this.downlickList = ret.data
				}
			}).catch(err => {
				console.log(err)
			})
		},
		methods: {
			downbtnClick: function() {
				if (this.is_weixin == true) {
					this.isweixin = true
					return false;
				} else if (this.istype == 'Mobile') {
					alert("请在手机中打开下载");
				} else if (this.istype == 'IOS') {
					if (this.tcimg == false) {
						this.cztShow = true
						this.tcimg = true;
					} else {
						var userAgent = navigator.userAgent;
						console.log(userAgent)
						if (userAgent.indexOf("Safari") > -1) {
							window.location.href = this.downlickList.iosurl
						} else {
							alert("请在Safari浏览器中打开下载");
						}
					}
				} else {
					window.location.href = this.downlickList.androidurl
				}
			},
			downlick: function() {
				var userAgent = navigator.userAgent;
				if (userAgent.indexOf("Safari") > -1) {
					window.location.href = this.downlickList.iosurl
				} else {
					alert("请在Safari浏览器中打开下载");
				}
			},
			JumpLink: function() {
				this.$router.push({
					name: 'home'
				})
			}
		}
	}
</script>
<style scoped>
	.swiper-slide {
		height: 100% !important;
	}

	.swiper-slide img {
		width: 100%;
		height: 90%;
	}

	.stop_scroll p {
		text-align: center;
		margin-top: 0.9rem;
		font-family: "微软雅黑", "黑体";
		line-height: 3rem;
		color: #1E3548;
		font-size: 0.68rem;
	}
   
	.botnD {
		bottom: 0px !important;
	}

	.swiper-container {
		height: 75%;
	}

	.downbtn {
		line-height: 2.3rem;
		margin: 0 1.5rem;
		background-color: #43A4F1;
		font-family: "微软雅黑", "黑体";
		text-align: center;
		color: #fff;
		border-radius: 0.3rem;
		font-size: 0.8rem;
	}

	.jixu {
		text-align: center;
		font-family: "微软雅黑", "黑体";
		color: #43a4f1;
		font-size: 0.7rem;
		margin-bottom: 1.2rem;
		margin-top: .6rem;
	}

	.openapp {
		margin-top: 1rem;
		margin-bottom: 1rem;
		text-align: center;
		color: #CECECE;
		font-size: 0.26rem;
	}

	.ioszt {
		line-height: 2.2rem;
		font-family: "微软雅黑", "黑体";
		text-align: center;
		color: #CECECE;
	}

	.czt {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		/* overflow-x: hidden;
		overflow-y: scroll; */
	}
.imgBox{
	   height: 100%;
	   width: 100%;
	  overflow-x: hidden;
	  overflow-y: scroll;
   }
	#neirong {
		width: 100%;
		height: 100%;
		z-index: 100;
		position: absolute;
	}

	.czt img {
		width: 100%;
	}

	.lijixianzai {
		position: fixed;
		width: 4.5rem;
		height: 4.5rem;
		border-radius: 5px;
		top: 0.6rem;
		left: 0.6rem;

	}

	.lijixianzai img {
		width: 100%;
		height: 100%;
	}
</style>
