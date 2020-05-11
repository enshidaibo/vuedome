<template>
	<div>
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" tapmode @click="OncloseWin()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">购彩成功</div>
		</header>
		<div class="concent_box">
			<img class="success_img" src='../../assets/goucai/img_success.png' />
			<div class="success_text">恭喜您购彩成功</div>
			<div class="success_money"><i class="iconI">-</i><i>{{(pageParam.wcj_totalPrice*1).toFixed(2)}}</i></div>
			<div class="big_box">
				<div class="tab_box">
					<div class="top_text">彩种</div>
					<div class="down_text">{{betName}}</div>
				</div>
				<div class="tab_box">
					<div class="top_text">赠送现金</div>
					<div class="down_text red" v-if="flag1" v-show="hongbao!=999999999999999">+{{(pageParam.wcj_totalPrice*1*0.05).toFixed(2)}}</div>
					<div class="down_text red" v-else>+0.00</div>
				</div>
			</div>
			<div class="Img" v-if="num==0" @click="openas('userinfo_task_prize')"><img src="../../assets/goucai/choujiang.png" alt=""></div>
			<div class="Img" v-if="num==1" @click="openas('task')"><img src="../../assets/goucai/hongbao.png" alt=""></div>
			<div class="Img" v-if="num==2" @click="openas('userinfo_task_sign')"><img src="../../assets/goucai/qiandao.png" alt=""></div>
			<div class="Img" v-if="num==3" @click="openas('special_friends')"><img src="../../assets/goucai/yaoqing.png" alt=""></div>
			<div class="Img" v-if="num==4" @click="openas('special_friends')"><img src="../../assets/goucai/yaoqing1.png" alt=""></div>
			<div class="btn_sunburn" @click="task_sunburn()">立即晒单 可获得{{(1*pageParam.wcj_totalPrice*5/100).toFixed(2)}}元</div>
			<div class="btn_two">
				<div class="btn_xiao" @click="OncloseWin()">继续购彩</div>
				<div class="btn_xiao" @click="detail_alone()">查看详情</div>
			</div>
			<div class="tc" v-if="flag" v-show="hongbao!=999999999999999">
				<div class="tcBox">
					<img src="../../assets/goucai/suess.png" alt="" class="tcImg">
					<p class="tcp1">在购买彩票活动中获赠现金</p>
					<p class="tcp2">+{{(pageParam.wcj_totalPrice*1*0.05).toFixed(2)}}<span>元</span></p>
					<p class="tcp3">出票后存入账户余额</p>
				</div>
				<img src="../../assets/goucai/imgclose.png" alt="" class="tcImg1" @click="closeTc()">
			</div>

		</div>

		<!-- 		<div class="jjc_success" id="jjc_success">
			<div class="jjc_success_top active" @click="change_text()">
				<p class="p1">晒单赚取彩金</p><i :class="{active:isShow}"><img src='../../assets/goucai/jjc/arrow.png' /> </i>
			</div>
			<div class="jjc_success_content" v-if="isShow">
				<p>1.晒单即可<span>获取投注金额5%的红包</span></p>
				<p>2.您的直接用户完成投注，即可<span>获取投注金额2%的红包</span></p>
				<p>3.您的间接用户完成投注，即可<span>获取投注金额1%的红包</span></p>
			</div>
			<div class="jjc_success_text">
				<img src="../../assets/goucai/jjc/ok_icon.png" />
				<p>恭喜你购彩成功！</p>
				<span id="successspan">你将获得投注金额20%的红包变现</span>
			</div>
			<div class="jjc_success_btn">
				<div class="btn1" @click="task_sunburn()">立即晒单 获得{{pageParam.wcj_totalPrice*5/100}}元</div>
				<div class="btn2" @click="OncloseWin()">继续购彩</div>
				<div class="btn3" @click="detail_alone()">查看详情</div>
			</div>
		</div> -->
	</div>
</template>

<script>
	import {
		TypeCapitalconversionLowercase,
		getSession,
		setSession,
		setCookie,
		getCookie
	} from "../../js/common.js";
	import {
		Toast
	} from 'mint-ui';
	export default {
		data() {
			return {
				pageParam: '',
				isShow: false,
				'RouteLeave': 0,
				path: '',
				betName: '',
				hongbao: 999999999999999,
				num: 0,
				flag:true,//弹窗
				flag1:true,
				Img: [{
						imgUrl: '',
						url: 'userinfo_task_prize'
					},
					{
						imgUrl: '../../assets/goucai/hongbao.png',
						url: 'task'
					},
					{
						imgUrl: '../../assets/goucai/qiandao.png',
						url: 'userinfo_task_sign'
					},
					{
						imgUrl: '../../assets/goucai/yaoqing.png',
						url: 'special_friends'
					},
				]
			};
		},
		beforeRouteLeave(to, from, next) {
			console.log(to);
			console.log(from);
			console.log(next);
			console.log(this.pageParam.from);
			if (this.RouteLeave === 1) {
				next()
			} else if (this.RouteLeave === 2) {
				if (this.pageParam.from == 'hemai') {
					this.RouteLeave = 1;
					this.$router.go(-2)

				} else {
					this.RouteLeave = 1;
					this.$router.go(-1)
				}
			} else {
				if (this.pageParam.from == 'hemai') {
					this.RouteLeave = 1;
					this.$router.go(-2)
				} else {
					this.RouteLeave = 1;
					this.$router.go(-1)
				}
			}
		},
		created() {
			this.pageParam = this.$route.query;
			var ms=getSession('moneyType')//获取缓存
			var nums=getSession('nums')
			var flag1=getSession('flag1')
// 			console.log(flag1)
// 			console.log(ms=='')
			if(nums){
				this.num=nums;//回退的时候，获取轮播的图
			}
			if(flag1!=null){
				this.flag1=flag1//保存现金和红包返利的值
			}
			if(ms=='LOTTERYMONEY'){//判断缓存，是否为现金
				var Num1 = Math.random()*4;//随机数
				var ms=Math.round(Num1);
				this.num=ms;
				setSession('nums',ms);
				this.flag=true;
				this.flag1=true;
				setSession('flag1',this.flag1);//缓存是由红包付款的状态
			}
			else if(ms=='COINS'){
				this.flag=false;
				this.flag1=false;
				setSession('flag1',this.flag1);//缓存是由红包付款的状态
			}
			else if(ms=='no'){
				this.flag=false;
			}
			else{
				this.flag=true;
				this.flag1=true;
				setSession('flag1',this.flag1);//缓存是由红包付款的状态
			}
			var mon = this.$route.query.wcj_totalPrice * 1 * 20 / 100;
			this.getUserInfo(mon, this.$route.query.from)
			this.typeQufen();
		},

		mounted() {
			var data = getSession('obj');
			console.log(JSON.stringify(data))
			let _data = {...data};
			data = this.Encrypt(_data);
			let dataes = this.Qs.stringify({
				data
			}, {
				allowDots: true
			});
			if (this.pageParam.types == 'shuzi') {


				this.$ajax.post('/caipiaoshouye/index.php/home/index/digitaLinsert',
						dataes
					)
					.then(res => {

					})
					.catch(err => {
						console.log(err);

					})
			} else {
				this.$ajax.post('/caipiaoshouye/index.php/home/index/competitiveLinsert',
						dataes
					)
					.then(res => {

					})
					.catch(err => {
						console.log(err);

					})
			}
			/* if (window.history && window.history.pushState) {
				history.pushState(null, null, document.URL);
				window.addEventListener('popstate', this.OncloseWins, false);
			} */
		},
		methods: {
			change_text: function() {
				this.isShow = !this.isShow;
			},
			OncloseWin: function() {
				setSession('moneyType','');//清除缓存
				this.RouteLeave = 2;
				this.$router.go(-1);
			},
			closeTc:function(){
				this.flag=false;
				setSession('moneyType','');//清除缓存
			},
			openas: function(i) {
				this.RouteLeave = 1;
				this.flag=false;//隐藏弹窗
				setSession('moneyType','no');//清除缓存
				this.$router.push({
				name: i,
			})
			},
			detail_alone: function() {
				var path = this.path;
				let key = this.pageParam.success;
				let id = this.pageParam.schemeId
				console.log(path);
				setSession('moneyType','no');//清除缓存
				if (this.pageParam.from == 'hemai') {
					if (path == 1) {
						this.RouteLeave = 1;
						this.$router.push({
							path: '/userinfo/chipped_detail_alone_shuzicai',
							query: {
								key,
								id
							}
						})
					} else {
						this.RouteLeave = 1;
						this.$router.push({
							path: '/userinfo/chipped_detail_alone',
							query: {
								key,
								id
							}
						})
					}
				} else {
					if (path == 1) {
						this.RouteLeave = 1;
						this.$router.push({
							path: '/userinfo/scheme_detail_alone_shuzicai',
							query: {
								key,
								id
							}
						})
					} else {
						this.RouteLeave = 1;
						this.$router.push({
							path: '/userinfo/scheme_detail_alone',
							query: {
								key,
								id
							}
						})
					}

				}
			},
			task_sunburn: function() {
				this.RouteLeave = 1;
				setSession('moneyType','no');//清除缓存
				this.$router.push({
					name: 'userinfo_task_sunburn'
				})
			},
			getUserInfo: function(money, type) {
				let uid = getCookie('newData');
				// 				if (!uid) {
				// 					this.$router.push({
				// 						name: 'login'
				// 					})
				// 					return false;
				// 				}
				var userId = uid.userid;
				var data = {};
				data["userId"] = userId;
				data = this.Encrypt(data);
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

								var coinsMoney = content.data.coinsMoney * 1;
								if (type == 'hemai') {
									if (coinsMoney < 0.2) {
										money = 0.00;
									} else if (coinsMoney <= money) {
										money = coinsMoney;
									}
								} else {
									if (coinsMoney < 0.4) {
										money = 0.00;
									} else if (coinsMoney <= money) {
										money = coinsMoney;
									}
								}
								console.log(money)
								// if(money==0){
								// 	this.flag=false;
								// }
								this.hongbao = money;
							} else if (content.code == "201010") {
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
			typeQufen: function() {
				let betType = TypeCapitalconversionLowercase(this.pageParam.success);
				var keys = this.pageParam.success;
				if (betType) {
					keys = betType
				}
				var path;
				var betName;
				switch (keys) {
					case "ssq":
						path = "1";
						betName = '双色球';
						break;
					case "dlt":
						path = "1";
						betName = '大乐透';
						break;
					case "pl":
						path = "1";
						betName = '排列三/五';
						break;
					case "pl3":
						path = "1";
						betName = '排列三';
						break;
					case "pl5":
						path = "1";
						betName = '排列五';
						break;
					case 'tjkls':
						path = "1";
						betName = '天津快乐10分';
						break;
					case 'kl8':
						path = "1";
						betName = '北京快乐八';
						break;
					case 'gdkls':
						path = "1";
						betName = '广东快乐10分';
						break;
					case 'fc3d':
						path = "1";
						betName = '福彩3D';
						break;
					case "welfare3d":
						path = "1";
						betName = '福彩3D';
						break;
					case "seven":
						path = "1";
						betName = '七乐彩';
						break;
					case "bjklb":
						path = "1";
						betName = '北京快乐八';
						break;
					case "sdel11to5":
						path = "1";
						betName = '山东11运夺金';
						break;
					case "cqssc":
						path = "1";
						betName = '重庆时时彩';
						break;
					case "xjssc":
						path = "1";
						betName = '新疆时时彩';
						break;
					case "gdel11to5":
						path = "1";
						betName = '广东11选5';
						break;
					case "jxel11to5":
						path = "1";
						betName = '江西11选5';
						break;
					case "gdklsf":
						path = "1";
						betName = '广东快乐10分';
						break;
					case "tjklsf":
						path = "1";
						betName = '天津快乐10分';
						break;
					case "ahk3":
						path = "1";
						betName = '安徽快三';
						break;
					case "hbk3":
						path = "1";
						betName = '湖北快三';
						break;
					case "jsk3":
						path = "1";
						betName = '江苏快三';
						break;
					case "bjk3":
						path = "1";
						betName = '北京快三';
						break;
					case "jczq":
						path = "2";
						betName = '竞彩足球';
						break;
					case "jclq":
						path = "2";
						betName = '竞彩篮球';
						break;
					case "dczc":
						path = "2";
						betName = '北京单场';
						break;
					case "fc3d":
						path = "1";
						betName = '福彩3D';
						break;
					case "sczc":
						path = "2";
						betName = '四场进球';
						break;
					case "sfzc":
						path = "2";
						betName = '胜负彩';
						break;
					case "lczc":
						path = "2";
						betName = '六场半全场';
						break;
					case "rxjc":
						path = "2";
						betName = '任选九场';
						break;
					case "sfzc14":
						path = "2";
						betName = '胜负彩';
						break;
				}
				this.path = path;
				this.betName = betName;
			}
		},


	}
</script>

<style scoped>
	@import "../../css/goucai_jjc.css";

	header {
		position: fixed;
	}

	.jjc_success {
		margin-top: 2.25rem;
	}

	.iconI {
		vertical-align: text-bottom;
	}

	#successspan {
		font-size: 0.99rem;
		color: #5FA3EB;
		line-height: 1.4rem;
	}

	.concent_box {
		width: 100%;
	}

	.success_img {
		width: 2.8rem;
		height: 2.8rem;
		display: block;
		margin: 0 auto;
		margin-top: 5.225rem;
	}

	.success_text {
		width: 100%;
		margin: 0 auto;
		margin-top: 0.725rem;
		text-align: center;
		color: #03A9F4;
		font-size: 0.85rem;
	}

	.success_money {
		width: 100%;
		margin: 0 auto;
		margin-top: 0.4625rem;
		height: 2.15rem;
		line-height: 2.15rem;
		text-align: center;
		color: #333333;
		font-size: 1.25rem;
		font-weight: bold;
	}

	.success_money i {
		font-style: normal;
		font-size: 1.95rem;
	}

	.big_box {
		width: 100%;
		margin-top: 2.425rem;
		display: flex;
		display: -webkit-flex;
	}

	.tab_box {
		width: 50%;
	}

	.top_text {
		width: 100%;
		color: #666666;
		text-align: center;
		height: 0.775rem;
		line-height: 0.775rem;
		font-size: 0.8rem;
	}

	.down_text {
		width: 100%;
		color: #333333;
		text-align: center;
		height: 0.775rem;
		line-height: 0.775rem;
		margin-top: 0.725rem;
		font-size: 0.8rem;
	}

	.down_text.red {
		color: #E45869;
	}

	.btn_sunburn {
		width: 92%;
		height: 2.25rem;
		line-height: 2.25rem;
		background: rgba(3, 169, 244, 1);
		border-radius: 0.15rem;
		margin: 0 auto;
		margin-top: 0.85rem;
		text-align: center;
		color: #FFFFFF;
		font-size: 0.9rem;
	}

	.btn_two {
		width: 92%;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		margin: 0 auto;
		margin-top: 0.9rem;
	}

	.btn_xiao {
		width: 48.5%;
		border: 1px solid #03A9F4;
		color: #03A9F4;
		border-radius: 0.15rem;
		height: 2.25rem;
		text-align: center;
		font-size: 0.9rem;
		line-height: 2.25rem;
	}

	.Img {
		margin: 0 auto;
		margin-top: 2.2rem;
		width: 92%;
	}
    .Img img {
		width: 100%;
	}
	.tc {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	.tc .tcBox {
		width: 14.15rem;
		height: 17.6rem;
		margin: 0 auto;
		margin-top: 5.75rem;
		position: relative;
	}

	.tc .tcImg {
		/* 		width: 14.15rem;
		height: 17.6rem; */

	}

	.tc .tcp1 {
		position: absolute;
		font-size: 0.8rem;
		line-height: 1rem;
		color: #FF4E1F;
		top: 8rem;
		text-align: center;
		width: 6.5rem;
		left: 50%;
		margin-left: -3.25rem;
	}

	.tc .tcp2 {
		position: absolute;
		color: #fff;
		font-size: 1.8rem;
		top: 10.8rem;
		left: 50%;
		transform: translateX(-50%);
	}

	.tcp2 span {
		font-size: 1rem;
		vertical-align: middle;
	}

	.tc .tcp3 {
		position: absolute;
		color: #FF4E1F;
		font-size: 0.5rem;
		top: 14.1rem;
		left: 50%;
		transform: translateX(-50%);
	}

	.tc .tcImg1 {
		width: 1.35rem;
		height: 1.35rem;
		margin: 0 auto;
	}
</style>
