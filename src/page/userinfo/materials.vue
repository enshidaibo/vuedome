<template>
	<div class="ms">
		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="closeWin()" tapmode>
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">推广资料</div>
			<div @click="change_cz()" tapmode class="aui-pull-right aui-btn">
				<span id="cz_name">{{types}}</span>
			</div>
		</header>
		<ul class="aui-list aui-media-list bcc" v-if="imgArr.length">
			<li class="aui-list-item bcc imgarr" v-for="(d,i) in imgArr" :key='i'>
				<div class="aui-list-item-inner">
					<div class="aui-row aui-row-padded imgarr" id="imgarr">
						<img @click.stop="imgclick(d)" :src="d" />
					</div>
				</div>
			</li>
		</ul>
		<div v-if='noTuiGuang&&imgArr.length==0' class="londNull"><img src="../../assets/yiyiyi.png">
			<p>暂未找到推广…</p>
		</div>
		<div id="widget_bu" v-show="isShow" @click.stop="imgclickhide">
			<img @click.stop="imgclickhide" :src="imgShow" />
			<img id='qrcode' :src="erImg" />
		</div>
		<div class="caizhong" v-if='caizhong'>
			<div class="aui-bar aui-bar-nav">
				<div class="aui-title">彩种选择</div>
			</div>
			<section class="aui-content">
				<div class="aui-bar aui-bar-btn aui-bar-btn-full change_main">
					<div :class="types=='双色球'?'select':''" class="aui-bar-btn-item change_item" tapmode @click.stop="changeexe('SSQ','双色球',this)">双色球</div>
					<div :class="types=='福彩3D'?'select':''" class="aui-bar-btn-item change_item" tapmode @click.stop="changeexe('WELFARE3D','福彩3D',this)">福彩3D</div>
					<div :class="types=='排列三/五'?'select':''" class="aui-bar-btn-item change_item" tapmode @click.stop="changeexe('PL','排列三/五',this)">排列三/五</div>
				</div>
				<div class="aui-bar aui-bar-btn aui-bar-btn-full change_main">
					<div :class="types=='七乐彩'?'select':''" class="aui-bar-btn-item change_item" tapmode @click.stop="changeexe('SEVEN','七乐彩')">七乐彩</div>
					<div :class="types=='大乐透'?'select':''" class="aui-bar-btn-item change_item" tapmode @click.stop="changeexe('DLT','大乐透')">大乐透</div>
					<div :class="types=='广东11选5'?'select':''" class="aui-bar-btn-item change_item" tapmode @click.stop="changeexe('GDEL11TO5','广东11选5')">广东11选5</div>
				</div>
				<div class="aui-bar aui-bar-btn aui-bar-btn-full change_main">
					<div :class="types=='江西11选5'?'select':''" class="aui-bar-btn-item change_item" tapmode @click.stop="changeexe('JXEL11TO5','江西11选5')">江西11选5</div>
					<div :class="types=='山东11运夺金'?'select':''" class="aui-bar-btn-item change_item" tapmode @click.stop="changeexe('SDEL11TO5','山东11运夺金')">山东11运夺金</div>
					<!-- <div :class="types=='北京快乐八'?'select':''" class="aui-bar-btn-item change_item" tapmode @click.stop="changeexe('BJKLB','北京快乐八')">北京快乐八</div> -->
					<div :class="types=='重庆时时彩'?'select':''" class="aui-bar-btn-item change_item" tapmode @click.stop="changeexe('CQSSC','重庆时时彩')">重庆时时彩</div>
				</div>
				<div class="aui-bar aui-bar-btn aui-bar-btn-full change_main">
					
					<div :class="types=='新疆时时彩'?'select':''" class="aui-bar-btn-item change_item" tapmode @click.stop="changeexe('XJSSC','新疆时时彩')">新疆时时彩</div>
					<div :class="types=='天津快乐十分'?'select':''" class="aui-bar-btn-item change_item" tapmode @click.stop="changeexe('TJKLSF','天津快乐十分')">天津快乐十分</div>
					<div :class="types=='广东快乐十分'?'select':''" class="aui-bar-btn-item change_item" tapmode @click.stop="changeexe('GDKLSF','广东快乐十分')">广东快乐十分</div>
				</div>
				<div class="aui-bar aui-bar-btn aui-bar-btn-full change_main">
					
					<div :class="types=='江苏快3'?'select':''" class="aui-bar-btn-item change_item" tapmode @click.stop="changeexe('JSK3','江苏快3')">江苏快3</div>
					<div :class="types=='安徽快3'?'select':''" class="aui-bar-btn-item change_item" tapmode @click.stop="changeexe('AHK3','安徽快3')">安徽快3</div>
					<div :class="types=='湖北快3'?'select':''" class="aui-bar-btn-item change_item" tapmode @click.stop="changeexe('HBK3','湖北快3')">湖北快3</div>
				</div>
				<div class="aui-bar aui-bar-btn aui-bar-btn-full change_main">
					
					<div :class="types=='北京单场'?'select':''" class="aui-bar-btn-item change_item" tapmode @click.stop="changeexe('DCZC','北京单场')">北京单场</div>
					<div :class="types=='胜负彩'?'select':''" class="aui-bar-btn-item change_item" tapmode @click.stop="changeexe('SFZC','胜负彩')">胜负彩</div>
					<div :class="types=='六场半全场'?'select':''" class="aui-bar-btn-item change_item " tapmode @click.stop="changeexe('LCZC','六场半全场')">六场半全场</div>
				</div>
				<div class="aui-bar aui-bar-btn aui-bar-btn-full change_main">
					
					<div :class="types=='四场进球'?'select':''" class="aui-bar-btn-item change_item " tapmode @click.stop="changeexe('SCZC','四场进球')">四场进球</div>
					<div :class="types=='竞彩足球'?'select':''" class="aui-bar-btn-item change_item " tapmode @click.stop="changeexe('JCZQ','竞彩足球')">竞彩足球</div>
					<div :class="types=='竞彩篮球'?'select':''" class="aui-bar-btn-item change_item " tapmode @click.stop="changeexe('JCLQ','竞彩篮球')">竞彩篮球</div>
				</div>
				<div class="aui-bar aui-bar-btn aui-bar-btn-full change_main">
					
					<div :class="types=='任选九场'?'select':''" class="aui-bar-btn-item change_item " tapmode @click.stop="changeexe('RXJC','任选九场')">任选九场</div>
					<div class="aui-bar-btn-item change_item "></div>
					<div class="aui-bar-btn-item change_item "></div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
	import {
		_ImgUrl_,getCookie
	} from '../../js/common';
	export default {
		data() {
			return {
				imgArr: [],
				isShow: false,
				caizhong: false,
				noTuiGuang:false,
				erImg: '',
				imgShow: '',
				types: '双色球',
			};
		},
		created() {
			this.TgMsgImg('双色球');
		},
		methods: {
			closeWin: function() {
				this.$router.go(-1);
			},
			TgMsgImg: function(name) {
				var newData = getCookie("newData");
				if (!newData) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
				// var userId = $api.getStorage("newData").userid;
				let userId =newData.userid;
				let imger = "";
				let namenum = ZhuanName(name);
				console.log(namenum);
				let url = GetHtmlUrlFormName(name);
				let data = [];
				data['uid'] = userId;
				data['name'] = name;
				data['url'] = GetHtmlUrlFormName(name);
				let dataes = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.get('/caipiaoshouye/index.php/home/index/Shareqrcode?uid=' + userId + '&name=' + name + '&url=' + url)
					.then(res => {
						if (res.data.status == 1) {
							let imger = res.data.url;
							this.erImg = imger
                            console.log(imger)
							this.promotionList(namenum, imger, 1);
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			promotionList: function(namenum, imger, page) {

				let data = [];
				data['type'] = namenum;
				data['page'] = page;
				data['size'] = 20;
				let dataes = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/promotionList',
						dataes
					)
					.then(res => {
						if (res.status == 500) {
							toastMsg("服务器异常，请稍后重试");
						} else if (res.status == 200) {
							console.log(res);
							var content = JSON.parse(res.data.content);
							var imgArr = content.data.pageData[0];
							if (imgArr) {
								for (let i = 0; i < imgArr.length; i++) {
									imgArr[i] = _ImgUrl_ + imgArr[i];
								}
							}else{
								this.noTuiGuang=true;
							}
							this.imgArr = this.imgArr.concat(imgArr)
							console.log(imgArr);
						}
					})
					.catch(err => {
						this.noTuiGuang=true;
						console.log(err);
					})
			},
			imgclick: function(url) {
				this.isShow = !this.isShow;
				this.imgShow = url;
			},
			imgclickhide: function() {
				this.isShow = !this.isShow;
			},
			changeexe: function(type, name) {
				this.caizhong = false;
				this.imgArr = [];
				this.noTuiGuang = false;
				this.types = name;
				this.TgMsgImg(name);
			},
			change_cz: function() {
				this.caizhong = true;
			}
		}
	}

	function ZhuanName(namen) {
		var namenum = 1;
		if (namen == "双色球") namenum = 1;
		if (namen == "福彩3D") namenum = 2;
		if (namen == "七乐彩") namenum = 3;
		if (namen == "大乐透") namenum = 4;
		if (namen == "排列五") namenum = 5;
		if (namen == "排列三/五") namenum = 6;
		if (namen == "广东11选5") namenum = 7;
		if (namen == "江西11选5") namenum = 8;
		if (namen == "山东11运夺金") namenum = 9;
		if (namen == "重庆时时彩") namenum = 10;
		if (namen == "新疆时时彩") namenum = 11;
		if (namen == "天津快乐十分") namenum = 12;
		if (namen == "广东快乐十分") namenum = 13;
		if (namen == "北京快乐八") namenum = 14;
		if (namen == "江苏快3") namenum = 15;
		if (namen == "安徽快3") namenum = 16;
		if (namen == "湖北快3") namenum = 17;
		if (namen == "竞彩足球") namenum = 18;
		if (namen == "竞彩篮球") namenum = 19;
		if (namen == "北京单场") namenum = 20;
		if (namen == "足球彩票") namenum = 21;
		if (namen == "任选九场" || namen == "胜负彩") namenum = 22;

		return namenum
	}

	function GetHtmlUrlFormName(name) {
		var url = "";
		if (name == "双色球") url = "doubleball";
		if (name == "福彩3D") url = "fucai3d";
		if (name == "排列三") url = "pailiesan";
		if (name == "排列五") url = "pailiewu";
		if (name == "重庆时时彩") url = "cqssc";
		if (name == "新疆时时彩") url = "xjssc";
		if (name == "江西时时彩") url = "cqssc";
		if (name == "竞彩篮球") url = "jclq";
		if (name == "山东11选5") url = "sdel11to5";
		if (name == "广东11选5") url = "gdel11to5";
		if (name == "江西11选5") url = "jxel11to5";
		if (name == "天津快乐十分") url = "tjkls";
		if (name == "广东快乐十分") url = "gdkls";
		if (name == "大乐透") url = "daletou";
		if (name == "七乐彩") url = "seven";
		if (name == "北京快乐八") url = "bjklb";
		if (name == "江苏快3") url = "jsk3";
		if (name == "安徽快3") url = "ahk3";
		if (name == "湖北快3") url = "hbk3";
		if (name == "北京单场") url = "bjdc";
		if (name == "胜负彩") url = "lcbqc";
		if (name == "六场半全场") url = "lcbqc";
		if (name == "四场进球") url = "lcbqc";
		if (name == "竞彩足球") url = "jczq";
		if (name == "任选九场") url = "lcbqc";
		return url;;
	}
</script>

<style scoped>
		.aui-bar-nav {
		top: 0;
		line-height: 2.25rem;
		background-color: #fff;
		color: #000;
		position: fixed;
	}
	
	.aui-bar-nav .aui-btn .aui-iconfont {
		font-size: 0.9rem;
		line-height: 1.25rem;
		padding: 0;
		margin: 0;
		color: #000;
	}
	
	.text-white {
		color: #ffffff !important;
	}

	.aui-grid [class*=aui-col-] {
		padding: 0.75rem 0;
	}
	.ms {
		background: #f4f4f4;
		min-height: 100vh;
	}

	body,
	html {
		background: #f4f4f4 !important;
	}
	header{
		position: fixed;
	}
	.select{
		background-color: #F5A623 !important;
		color: #fff !important;
	}
	
	.bcc {
		background: none !important;
		border: none !important;
	}
	.aui-media-list{
		padding-top: 2.25rem;
	}
	.change_main {
		background: #FFFFFF !important;
	}

	.change_item {
		background: #FFFFFF;
		border: 1px solid #f0f0f0;
		height: 3rem;
		width: 33.33%;
	}

	.change_main .aui-active {
		background: #43a4f1 !important;
	}

	.londNull {
		width: 100%;
		height: 100vh;
		box-sizing: border-box;
		padding-top: 5rem;
	}

	.londNull img {
		width: 64%;
		height: auto;
		margin: auto;
	}

	.londNull p {
		width: 100%;
		height: auto;
		margin-top: 2rem;
		text-align: center;
		font-size: 0.7rem;
		color: #62A1BE;
		line-height: 1rem;
	}

	#widget_bu {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 10;
		transition: all 0.5s ease;
		top: 0;
		left: 0;
		/* display: none; */
		background: rgba(0, 0, 0, 0.6);

	}
	#widget_bu img{
		width: 320px;
		height: auto;
		position: absolute;
		z-index:99;
		top: 0;
		left: 50%;
		margin-left: -160px;
	}
	#qrcode{
		width: 100px !important;
		height:  100px !important;
		z-index:999 !important;
		top: 391px !important;
		left:50% !important;
		margin-left: -50px !important;
	}

	#mqcimg_bg {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
		position: relative;
	}

	.imgarr {
		width: 6rem;
		float: left;
		height: 6rem;
	}

	.imgarr img {
		width: 100%;
		height: 100%;
	}

	.caizhong {
		position: fixed;
		top: 2.3rem;
		width: 100%;
	}
</style>
