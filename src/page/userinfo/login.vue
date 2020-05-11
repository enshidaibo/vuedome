<template>
	<div>
		<header class="aui-bar aui-bar-nav login-head">

			<div class="aui-pull-left aui-btn subhead login-head-home">
				<img src="../../assets/userinfo/user_login1.png" @click="lef_index()" alt="">
				<!-- <span onclick="lef_index()">首页</span> -->
			</div>
		</header>
		<div class="login_conten" id="login_conten">
			<div class="login_topbg">
				<p id="htitel">手机验证</p>
				<p>请输入您的手机号码，登录或是注册您的{{cpname}}票账号</p>
				<div class="login_topinput">
					<div class="phone">
						<span class="lel_phone">
						</span>
						<input type="tel" id="phone" v-model="telnum" placeholder="请输入手机号" maxlength="11">
					</div>
					<div class="phone_code">
						<span class="lel_code"></span>
						<input type="tel" id="phone_code" v-model="phone_code" name="" placeholder="请输入验证码" maxlength="6">
						<span class="obtain_code" id="obtain_code" :class="{daojishi:identifying!=='获取验证码'}" @click="obtain_code()">{{identifying}}</span>
						<!-- <span class="aui-hide" v-model="vid"></span> -->
					</div>
				</div>
				<!-- 				<div class="xiazaibox">
					<span>APP首次注册新用户即可获赠现金<b>3.88</b>元<i @click="xiazai()">立即下载</i></span>
				</div> -->
				<div class="btn_login">
					<div class="logbtn" :class="{ 'logbtnactve': phone_code.length==6&&telnum.length==11 }" @click="ftellogin_logbtn()">开始</div>
					<p><span>登录即代表你同意我们的</span><span @click="mainboxfwmsg()">《服务条款》</span></p>
				</div>
			</div>
			<!-- <div class="login_bot">
				<div class="wx_login" id="wx_login" v-if="isWeixin">
					<p @click="auth()"></p>
					<span id="wx_login_span">使用微信账号一键登录</span>
				</div>
				<div class="moeny_img" id="moeny_img">
				</div>
			</div> -->
			<!-- 数字验证 -->
			<div class="shuzi" v-if="sz">
				<div class="szBox1"></div>
				<div class="szBox2">
					<h3>图形验证</h3>
					<input type="tel" placeholder="请输入图形验证" v-focus v-model="szNum" maxlength="4">
					<div class="box2main1">
						<div>
							<img :src="'data:image/png;base64,'+imgStr" alt="">			
						</div>
						<div>
							<span @click="replace()">看不清，换一张</span>
						</div>
					</div>
					<div class="box2main2">
						<div class="box2Left" @click="szClose()"><p>取消</p></div>
						<div class="box2Right" @click="szEnter()"><p>确定</p></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		initGeetest
	} from '../../js/gt.js'
	import {
		Toast,
		Loadmore,
		Indicator,
		MessageBox
	} from 'mint-ui';
	import {
		setCookie,
		setSession,
		getCookie,
		getSession,
		OverallData,
	} from "../../js/common.js";

	var wxuserinfo = [];
	var userinfo_name = [];
	var _apiwx = null;
	var loss = null;
	var _ali = null;
	var _wxinstall = false;
	var _wx_share_title = OverallData().cpname + "票";
	var _wx_share_desc = "线上购彩,线下真实出票,点击链接免费领取优惠!";
	var webbrowser = null;
	var _UIMediaScanner = null;
	var browser = null;
	var screenClip = null;
	// 定时器
	var m_snum2 = 90;
	var m_stimer2 = null;
	var Ip = localStorage.getItem('Ip');
	var flags = false;
	let code;
	var ms

	//用于极验第二次验证   所用模式来自于demo ：https://www.geetest.com/demo/slide-bind.html
	var handler2 = function(captchaObj) {

		captchaObj.onReady(function() {}).onSuccess(function() {
			var result = captchaObj.getValidate();
			console.log(result)
			console.log(Ip)
			if (!result) {
				return alert('请完成验证');
			}
			var data = {};
			data["challenge"] = result.geetest_challenge;
			data["validate"] = result.geetest_validate;
			data["seccode"] = result.geetest_seccode;
			data["clientType"] = "h5";
			// data["ip"] = "192.168.31.101";
			data = loss.Encrypt(data);
			var datas = loss.Qs.stringify({
				data
			}, {
				allowDots: true
			});
			$.ajax({
				url: OverallData().Murl+'/caipiaoshouye/index.php/home/index/verifyLogin',
				type: 'POST',
				dataType: 'json',
				data: datas,
				success: function(data) {
					console.log(data)
					if (data.status == '200') {
						var content = data.content;
						if (content.code == '1000') {
							if (content.obj.status == 'success') {
								Toast('验证成功');
								loss.los();
							} else if (content.obj.status == 'fail') {
								Toast('验证失败'); 
							}
						}
					}
				}
			});
		});
		$('#obtain_code').click(ms);
		ms=function(){
			if (flags) {
				// 调用之前先通过前端表单校验
				captchaObj.verify();
			}
		}

	};

	export default {
		data() {
			return {
				telnum: '',
				phone_code: '',
				vid: '',
				identifying: "获取验证码",
				cpname: OverallData().cpname,
				isWeixin: false,
				sz:false,//是否显示验证框
				imgStr:'',//图片地址base64
				imgId:'',//验证码图片ID
				szNum:'',//验证码数字
				flas:false,
				timer:''
			};
		},
		  directives: {
          focus: {
              // 指令的定义
                inserted: function (el) {
                    el.focus()
                }
            }
        },
		created() {
			loss = this;
			console.log(handler2);
			console.log(ms)
			console.log(this.$route)
			console.log(localStorage.getItem('Ip'));
			console.log(localStorage.getItem('model'))
			console.log(localStorage.getItem('os'))
			setCookie('newData', '', '0-S');
			setCookie('userindata', '', '0-S');
			if (getSession('telnum')) {
				this.telnum = getSession('telnum');
			}
			code = this.getParam('code');

			if (code) {
				this.auth();
			}
			//初加载极验，用于配置弹窗
			this.timer=setInterval(this.timers,100)
			
		},
		mounted() {
			var ua = window.navigator.userAgent.toLowerCase();

			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				this.isWeixin = true;
			}
			// this.getIp();
		},
		beforeRouteEnter(to, from, next) {
			// 在导航完成前获取数据
			console.log(from)
			next()
		},
		methods: {
			timers:function(){
				var bss=this;
				console.log(this.flas)
				if(this.flas){
					clearInterval(this.timer)
					return false;
				}
				$.ajax({
					// url: OverallData().tempIp+"/android_lottery/startCaptcha", // 加随机数防止缓存
					url:OverallData().Murl+'/caipiaoshouye/index.php/home/index/startCaptcha',
					type: "get",
					dataType: "json",
					success: function(data) {
						// 调用 initGeetest 初始化参数
						// 参数1：配置参数
						// 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
						initGeetest({
							gt: data.gt,
							challenge: data.challenge,
							new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
							offline: !data.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
							product: "bind", // 产品形式，包括：float，popup//点击验证码，弹出滑块
							width: "300px",
							https: true
							// 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
						}, handler2);
					},
				});
				this.flas=true;
			},
			lef_index: function() {
				// alert(getSession('fromhemai'))
				// alert(getSession('randomNum'))
				// window.opener = null;
				// window.open("about:blank", "_top").close()
				if (getSession('randomNum') || getSession('fromhemai')) {
					sessionStorage.removeItem('fromhemai')
					this.$router.go(-1);
				} else {
					this.$router.push({
						path: '/home',
					})
				}
			},
			mainboxfwmsg: function() {
				this.RouteLeave = true;
				setSession('telnum', this.telnum);
				this.$router.push({
					name: 'agreement'
				})
			},
			xiazai: function() {
				var newData = getCookie('newData');
				var link = OverallData().download
				if (newData) {
					window.open('http://xz.facaime.com?_userId=' + newData.sportId);
				} else {
					window.open('http://xz.facaime.com');
				}
			},
			ScoreTime2: function(id) {
				m_snum2--;
				this.identifying = m_snum2 + "s";

				if (m_snum2 == 0) {
					clearInterval(m_stimer2);
					m_snum2 = 90;
					this.identifying = "获取验证码"
					/* $api.html($api.byId(id), "获取验证码");
					$api.css($api.byId(id), "color: #03A9F4");
					$api.css($api.byId(id), "background-image: url(../image/user_login9.png)"); */
				}
			},
			//点击更换验证码图片
			replace:function(){
				this.digitalVerification();
			},
			//点击关闭验证码
			szClose:function(){
				this.sz=false;
				this.szNum='';
			},
			//提交验证码
			szEnter:function(){
				if(this.szNum.length!=4){
					Toast('请输入4位验证码');
					return;
				}
				this.verificationComparison();
			},

			ScoreTime2Star: function(id) {
				clearInterval(m_stimer2);
				this.identifying = "90s";
				m_snum2 = 90;
				m_stimer2 = setInterval(() => {
					this.ScoreTime2()
				}, 1000);
			},
			// 手机号对比正则
			IsPhone: function(str) {
				return /^1[3456789]\d{9}$/.test(str);
			},
			//获取IP地址
			getIp: function() {
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getUserIp')
					.then(ret => {
						setSession('equipmentIp', ret.data.ip)
						console.log(ret.data.ip);
					})
					.catch(err => {

					})
			},
			obtain_code: function() {
				// 					 this.$router.push({
				// 					path: '/userinfo/userinfo_wxbind',
				// 					
				// 				})
				if (this.telnum.length != 11) {
					MessageBox('提示', '输入正确的手机号');

					return false;
				}
				if (this.identifying != "获取验证码") {
					MessageBox('提示', '获取验证码间隔不得少于90s');

					return;
				}
				var telnum = this.telnum;

				if (!this.IsPhone(telnum)) {
					MessageBox('提示', '请输入正确的手机号');

					return;
				}
				var data = {};
				data["phoneNumber"] = telnum;
				data = this.Encrypt(data);
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/newUserCheck',
						datas
					)
					.then(ret => {
						console.log(ret)
						if (ret.status == '200') {
							var content = ret.data.content;
							if (content.code == '1000') {
								if (content.obj.isnewuser) {
									this.verification();
								} 
								else {	
									flags = false;
									this.los();
								}
							}
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			//用于判断新用户使用数字验证还是极验验证
			verification:function(){
				var datas = this.Qs.stringify({
					mid:1
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getCodeType',
						datas
					)
					.then(ret => {
						console.log(ret)
						if(ret.data.status=='200'){
							var content=ret.data.content;
							if(content.code=='1000'){
								if(content.obj=='1'){
									this.digitalVerification();
								}
								else {
									flags = true;
									ms();//进行极验验证
								}
							}
						}
					})
					
			},
			//请求数字验证的网络图片
			digitalVerification:function(){	
				var datas = this.Qs.stringify({
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getImgCode',
						datas
					)
					.then(ret => {
						console.log(ret)
						if(ret.status=='200'){
							var content=ret.data.content;
							if(content.code=='1000'){
								this.imgStr=content.obj.base64Str;
								this.imgId=content.obj.id;
								this.sz=true;
							}
						}
					})
			},
			//比对数字验证和输入框数字是否正确
			verificationComparison:function(){
				var data = {};
				data["codeId"] = this.imgId;
				data["codeValue"] = this.szNum;
				data = loss.Encrypt(data);
				var datas = loss.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/imgCodeValidate',
						datas
					)
					.then(ret => {
						console.log(ret)
						if(ret.status=='200'){
							var content=ret.data.content;
							if(content.code=='1000'){
								if(content.obj){
									this.los();
									this.szNum='';
									this.sz=false;
								}
								else {
									Toast('验证码错误或失效');
									this.digitalVerification();
									this.szNum='';
									this.sz=true;
								}
							}
						}
					})
			},
			
			//手机登录验证
			los: function() {
				var telnum = this.telnum;
				var data = [];
				data["phone"] = telnum;
				data["actType"] = "LOGINCODE";
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/sendPhoneCode',
						datas
					)
					.then(ret => {
						if (ret.status == 500 || ret.status == 404) {
							alert("服务器错误！请稍后重试！")
							console.log(1);
						} else {
							var sdata = JSON.parse(ret.data.content);
							console.log(sdata);
							if (sdata.code != 100000) {
								alert(sdata.message);
								return;
							} else {
								this.ScoreTime2Star();
							}
							this.vid = sdata.data.vid;
						}
					})
					.catch(err => {
						// this.MintUi.Indicator.close();
						console.log(err);
					})
			},

			downloadLoginLogsave: function() {
				let uid = getCookie('newData');
				var tel = uid.tel;
				var affd = '';
				var superior = '';
				// var Ip='';
				var phoneType = '';
				var phoneSystem = '';

				// Ip=localStorage.getItem('Ip')//IP
				phoneType = localStorage.getItem('model') //手机型号
				phoneSystem = localStorage.getItem('os') //系统版本
				if (getCookie('_userId')) {
					affd = getCookie('_userId');
					superior = 'user';
				}
				if (getCookie('_aff_id')) {
					affd = getCookie('_aff_id');
					superior = 'aff';
				}
				var data = [];
				data["phoneNumber"] = tel; //手机号
				data["ip"] = '';
				data["phoneType"] = phoneType; //手机型号
				data["phoneSystem"] = phoneSystem; //系统类型
				data["upId"] = affd;
				data["operation"] = 1;
				data["mobaltype"] = 'h5';
				data["superior"] = superior;
				console.log(data)
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/downloadLoginLogsave',
						datas
					)
					.then(res => {
						var content = res.data.content;
						console.log(content);
					})
			},
			/**手机快捷登陆*/
			ftellogin_logbtn: function() {
				var agentId = null;
				var _affids = null;
				if (getCookie('_userId')) {
					agentId = getCookie('_userId');
				}
				if (getCookie('_aff_id')) {
					_affids = getCookie('_aff_id');
				}

				var telnum = this.telnum;
				console.log(telnum);
				if (telnum.length != 11) {
					return false;
				}
				if (this.phone_code.length != 6) {
					return false;
				}

				if (!telnum || !phone_code) {
					alert("输入不能为空");
					return;
				}


				var data = {};
				data["vid"] = this.vid;
				data["mobile"] = telnum;
				data["code"] = this.phone_code;
				data["shareId"] = agentId;
				data["aff_id"] = _affids;
				data["userIP"] = getSession('equipmentIp'); //获取IP地址
				data["clientType"] = 'MOBILE_H5'; //获取设备类型
				console.log(data);
				data = this.Encrypt(data);
				console.log(data);
				var datas = this.Qs.stringify({
					data,
					'mobile': this.telnum
				}, {
					allowDots: true
				});
				var that = this;
				this.$ajax.post('/caipiaoshouye/index.php/home/index/telkuailogin',
						datas
					)
					.then(ret => {
						if (ret.status == 500) {
							MessageBox('提示', "服务器异常，请稍后重试");

						} else if (ret.status == 200) {
							var content = JSON.parse(ret.data.content);
							if (content) {
								if (content.code == 100000) {
									setSession('homeTc', '1');
									setCookie('newData', JSON.stringify(ret.data.newData), '1-D');
									setCookie('_userId', '', '0-S');
									setCookie('_aff_id', '', '0-S');
									that.CheckUserMsgOk(); //登录成功后请求认证接口
									that.downloadLoginLogsave();
									sessionStorage.removeItem('telnum');
									if (getSession('randomNum')) {
										sessionStorage.removeItem('randomNum');
										this.$router.push({
											name: 'user'
										})
									} else {
										this.$router.go(-1)
									}

								} else {
									MessageBox('提示', content.message);
									// alert(content.message);
									console.log(decodeURI(content.message));

								}
							}
						}
					})
					.catch(err => {
						// this.MintUi.Indicator.close();
						alert("登录失败!");
						console.log(err);
					})

			},
			// 登陆所需的方法

			//请求认证接口
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
				data = this.Encrypt({ ...data
				});
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
								// setSession('logok', false);   //已实名
								setCookie('logok', false, '1-D');

							} else {
								// setSession('logok', true);  //未实名
								setCookie('logok', true, '1-D');
							}

						} else {
							this.$router.go(-1)
						}
					})
					.catch(err => {
						console.log(err);
					})
			},


			setCookie: function(name, value, sec) {
				var str = name + "=" + escape(value);
				if (sec > 0) {
					var date = new Date();
					var ms = sec * 1000;
					date.setTime(date.getTime() + ms);
					str += "; expires=" + date.toGMTString();
				}
				document.cookie = str;
			},

			getCookie: function(name) {
				var arr = document.cookie.split("; ");
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].split("=")[0] == name) {
						return arr[i].split("=")[1];
					}
				}
				return '';
			},
			//app信息

			SetHistory: function(key, user) {
				$api.setStorage(key, user);
			},
			GetHistory: function(key) {
				return $api.getStorage(key);
			},
			auth: function() {
				console.log(window.location.href);

				var datas;
				if (code) {
					datas = this.Qs.stringify({
						code: code
					}, {
						allowDots: true
					});
				} else {
					var domain = window.location.host;
					datas = this.Qs.stringify({
						"url": 'http://' + domain + '#/userinfo/login'
					}, {
						allowDots: true
					});
				}

				this.$ajax.post('/caipiaoshouye/index.php/home/index/wxindex',
						datas
					)
					.then(ret => {

						var condata = ret.data;
						if (ret.data.status != 250) {
							if (ret.data.url) {
								window.location.replace(ret.data.url);

								// window.location.replace = ret.data.url;
							} else if (condata.data || condata.data.openid) {
								this.checkOpenId(condata.data);
							}
						} else {
							window.location.replace('http://' + window.location.host + '#/userinfo/login');
						}
					})
					.catch(err => {
						// this.MintUi.Indicator.close();
						console.log(err);
					})

			},
			getParam: function(paramName) {
				let paramValue = "";
				let isFound = !1;
				if (window.location.search.indexOf("?") == 0 && window.location.search.indexOf("=") > 1) {
					let arrSource = unescape(window.location.search).substring(1, window.location.search.length).split("&"),
						i = 0;
					while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() ==
						paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
				}
				return paramValue == "" && (paramValue = null), paramValue
			},
			checkAuth: function() {
				showLoading();
				var openId = getCookie("openId");
				if (openId == "") {
					auth();
					return;
				}
				var accessToken = getCookie("accessToken");
				alert(accessToken);
				if (accessToken != "") {
					getInfo(accessToken, openId);
					console.log(1);
					return;
				}
				var dynamicToken = getCookie("dynamicToken");
				if (dynamicToken != "") {
					refreshToken();
					console.log(2);
					return;
				}
				console.log(8);
				auth();
			},

			checkOpenId: function(obg) {
				// showLoading();
				var data = {};
				data["type"] = "WX";
				data["openId"] = obg.openid;
				data = this.Encrypt(data);
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				this.$ajax.post("/caipiaoshouye/index.php/home/index/checkOpenId",
						datas
					)
					.then(ret => {

						var datastr = ret.data;
						var daconten = datastr.content;
						var sdata = JSON.parse(ret.data.content);
						if (sdata.data.exitsOpenId) {
							var agentId = null;
							var _affids = null;
							if (getCookie('_userId')) {
								console.log(112223);
								agentId = getCookie('_userId');
								
							}
							if (getCookie('_aff_id')) {
								_affids = getCookie('_aff_id');
							}
							let data = [];
							console.log(agentId)
							data["type"] = "WX";
							data["openId"] = obg.openid;
							data["shareId"] = agentId;
							data["aff_id"] = _affids;
							data["userIP"] = getSession('equipmentIp'); //获取IP地址
							data["clientType"] = 'MOBILE_H5'; //获取设备类型
							let datas = this.Qs.stringify({
								data
							}, {
								allowDots: true
							});
							this.$ajax.post('/caipiaoshouye/index.php/home/index/thirdLogin',
									datas
								)
								.then(ret => {

									var datastr = ret.data;
									if (datastr.status != 200) {
										Toast(datastr.message);
										return;
									}
									let strconten = JSON.parse(datastr.content);

									if (strconten.code == 100000) {
										console.log(1)
										setCookie('newData', JSON.stringify(ret.data.newData), '1-D');
										setCookie('_userId', '', '0-S');
										setCookie('_aff_id', '', '0-S');
										sessionStorage.removeItem('telnum');
										if (getSession('randomNum')) {
											sessionStorage.removeItem('randomNum');
											this.$router.push({
												name: 'user'
											})
										} else {
											this.$router.go(-2);
										}
									} else {
										Toast(strconten.message);
									}
								})
								.catch(err => {
									// this.MintUi.Indicator.close();
									console.log(err);
								})

						} else {
							setSession('wxbind', obg);
							this.$router.push({
								path: '/userinfo/userinfo_wxbind',

							})
						}
					})
					.catch(err => {
						// this.MintUi.Indicator.close();
						console.log(err);
					})

			},

			/* WXLogin: function() {
				var agentId = null;
				var tda = {
					"type": "WX",
					"openId": wxuserinfo.info.openid,
					agentId: agentId
				};

				console.log(JSON.stringify(tda));
				// showLoading();
				api.ajax({
					url: _AjaxUrl_ + "/caipiaoshouye/index.php/home/Apicoud/thirdLogin",
					method: 'post',
					data: {
						values: {
							data: tda
						}
					}
				}, function(ret, err) {
					if (ret) {
						var sdata = JSON.parse(ret.content);

						if (ret.status == 500) {
							//api调用异常
							alert("服务器异常，请稍后重试");

						} else if (ret.status == 200) {

							var content = JSON.parse(ret.content);
							if (content) {
								if (content.code == 100000) {


									$api.setStorage('newData', ret.newData);
									console.log(JSON.stringify(ret.newData));
									$api.setStorage('m_Content_Data', content.data);
									$api.setStorage('m_szUserData', ret.newData);
									$api.rmStorage('yiXianShi');
									if (!content.data.certification) $api.setStorage("onecount", 1);
									if ($api.getStorage('wxbd')) {
										$api.rmStorage('wxbd');

										api.closeWin();
									} else {
										api.openWin({
											name: 'userinfo',
											url: 'userinfo.html',
										});
										api.addEventListener({
											name: 'viewdisappear'
										}, function(ret, err) {
											api.closeWin({
												name: 'login_min'
											});
											api.closeWin({
												name: 'userinfo_wxbind_min'
											});
										});
									}

									api.sendEvent({
										name: 'reflash_user'
									});
								} else {
									console.log(content.message);
								}
							}
						} else {
							alert("账号或密码错误");
						}
					} else {
						console.log(JSON.stringify(err));
					}
				});


			}, */
			wxdata: function(wxuserinfo_name) {
				showLoading();
				console.log(JSON.stringify(wxuserinfo_name));
				api.ajax({
					url: _AjaxUrl_ + "/caipiaoshouye/index.php/home/Apicoud/AddUserInfo",
					method: 'post',
					data: {
						values: {
							data: wxuserinfo_name
						}

					}
				}, function(ret, err) {
					hideLoading();
					if (ret) {
						console.log(JSON.stringify(ret));
					} else {
						console.log(JSON.stringify(err));
					}
				});

			}
		}
	};
</script>

<style scoped>
	header {
		position: fixed;
	}

	.login-head {
		height: 3rem !important;
	}

	.login-head-title {
		height: 3rem !important;
		line-height: 3rem;
	}

	.login-head-home {
		height: 3rem !important;
		line-height: 3rem !important;
		left: 0.8rem;
		top: 0rem;
	}

	.login-head-home>img {
		max-width: 0.9rem;
		margin-right: 0.5rem;
	}

	.login_conten {
		width: 100%;
		background-color: #ffffff;
		margin-top: 3rem;
	}

	.login_close {
		display: block;
		width: 2rem;
		height: 0.75rem;
		background-image: url(../../assets/userinfo/user_login1.png);
		background-size: .75rem .75rem;
		background-position: 0.25rem center;
		background-repeat: no-repeat;
	}

	.login_conten .login_topbg {
		width: 100%;
		height: 10rem;
		background-image: url(../../assets/userinfo/user_login2.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		padding: 0 0.6rem;
	}

	.login_topbg p {
		width: 100%;
		margin: auto;
		padding: 0 0.5rem;
	}

	.login_topbg p:first-child {
		font-size: 1.2rem;
		color: #fff;
		font-weight: bold;
		line-height: 1.2rem;
	}

	.login_topbg p:nth-child(2) {
		font-size: 0.6rem;
		color: #fff;
		line-height: 1.4rem;
	}

	.login_topinput {
		width: 100%;
		height: 8rem;
		margin-top: 0.8rem;
		background-image: url(../../assets/userinfo/user_login12.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.phone {
		height: 4rem;
		display: flex;
		font-size: 1.1rem;
		color: #4B5458;
		padding-top: 0.5rem;
		border-bottom: #e4e4e4 1px solid;
		margin: 0 0.4rem;
	}

	.phone #phone {
		width: 75%;
		font-size: 1rem;
		margin: auto;
	}

	input::-webkit-input-placeholder {
		color: #DFDFDF;
		font-size: 0.8rem;
	}

	.lel_phone {
		width: 18%;
		height: 1.6rem;
		line-height: 4rem;
		margin: auto;
		color: #4B5458;
		font-size: 0.9rem;
		background-image: url(../../assets/userinfo/user_login3.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 1.1rem 1.5rem;
		border-right: 1px solid #DFDFDF;
	}

	.phone_code {
		height: 3.5rem;
		display: flex;
		font-size: 1.1rem;
		color: #4B5458;
		margin: 0 0.4rem;
		line-height: 3.5rem;
		position: relative;
	}

	.lel_code {
		width: 18%;
		height: 1.6rem;
		line-height: 3.5rem;
		margin: auto;
		color: #4B5458;
		font-size: 0.9rem;
		background-image: url(../../assets/userinfo/user_login4.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 1.2rem 1.3rem;
		border-right: 1px solid #DFDFDF;
	}

	.phone_code #phone_code {
		width: 75%;
		font-size: 1rem;
		margin: auto;
	}

	.obtain_code {
		width: 5rem;
		height: 1.6rem;
		font-size: 0.7rem;
		position: absolute;
		top: 0.85rem;
		right: 0.8rem;
		text-align: center;
		line-height: 1.6rem;
		background-image: url(../../assets/userinfo/user_login9.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%;
		color: #03A9F4;
	}

	.obtain_codeactve {
		background-image: url(../../assets/userinfo/user_login9.png);
	}

	.btn_login {
		width: 100%;
		padding-top: 1rem;
	}

	.login_conten .btn_login .logbtn {
		margin: 0 0.6rem;
		height: 2.4rem;
		background: #B4C4D0;
		border-radius: 51.5px;
		line-height: 2.4rem;
		text-align: center;
		font-size: 1rem;
		color: #FFFFFF;
	}

	.login_conten .btn_login .logbtnactve {
		background-color: #03A9F4;
		color: #fff;
	}

	.login_conten .btn_login p {
		font-size: .6rem;
		margin-top: 0.6rem;
		text-align: center;
		color: #b6b6b6;
	}

	.login_conten .btn_login p span:last-child {
		color: #03A9F4;
	}

	.wx_login {

		width: 100%;
		border-top: 1px solid #cecece;
		position: relative;
		text-align: center;
	}

	.login_bot {
		width: 100%;
		position: relative;
		left: 0;
		bottom: -9rem;
	}

	.login_conten .wx_login p {
		width: 3rem;
		height: 3rem;
		background-color: #fff;
		background-image: url(../../assets/userinfo/user_login7.png);
		background-repeat: no-repeat;
		background-size: 2rem 2rem;
		background-position: center;
		position: absolute;
		top: -1.5rem;
		right: 43%;
	}

	.login_conten .wx_login span {
		line-height: 4.5rem;
		font-size: 0.6rem;
		color: #ACACAC;
	}

	.login_conten .moeny_img {
		width: 100%;
		height: 2rem;
		background-image: url(../../assets/userinfo/wangzhi.png);
		background-repeat: no-repeat;
		background-size: 16.5rem 1.15rem;
		background-position: center;
	}

	.daojishi {
		background-image: url(../../assets/userinfo/user_login11.png) !important;
		color: #000 !important;
	}

	.xiazaibox {
		width: 100%;
		text-align: center;

	}

	.xiazaibox span {
		color: #ED2B47;
		font-size: .6rem;
	}

	.xiazaibox i {
		color: #ED2B47;
		font-size: .6rem;
		padding-left: .5rem;
		text-decoration: underline;
	}

	.xiazaibox b {
		color: #ED2B47;
		font-size: .75rem;
		font-weight: normal;
	}
	
	.shuzi {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0,0,0,0.55);
		z-index: 10;
	}
	
	.szBox2 {
		margin: 0 auto;
		margin-top: 6.6rem;
		width: 15rem;
		/* height: 11.2rem; */
		background: #fff;
		border-radius: 13px;
		padding-top: 0.975rem;
	}
	
	.szBox2 h3 {
		font-size: 0.9rem;
		color: #333333;
		font-weight: bold;
		text-align: center;
		margin-bottom: 1.075rem;
	}
	
	.szBox2 input {
		padding: 0 0.75rem;
		margin-bottom: 0.825rem;
		height: 1.125rem;
		font-size: 0.8rem;
		caret-color:#03A9F4;
	}
	
	.szBox2 .box2main1 {
		border-top: 1px solid #efefef;
		margin: 0 0.75rem;
		display: flex;
		padding-top: 0.65rem;
		margin-bottom: 0.925rem;
		
	}
	
	.box2main1 div {
		flex: 1;
		text-align: center;
		height: 2rem;
	}
	
	.box2main1 img {
		width: 100%;
		height: 2rem;
		
	}
	
	.box2main1 span {
		font-size: 0.6rem;
		color: #999999;
		line-height: 2rem;
		border-bottom: 1px solid #999999;
	}
	
	.szBox2 .box2main2 { 
		border-top: 1px solid #efefef;
		display: flex;
		padding: 0.6rem 0;
	}
	
	.box2main2 div{
		flex: 1;
		text-align: center;
		height: 1.5rem;
	}
	
	.box2main2 p {
		line-height: 1.5rem;
		font-size: 0.8rem;
		color: #666666;
	}
	
	.box2main2 .box2Left {
		border-right: 0.05rem solid #efefef;
	}
	
	.box2main2 .box2Right p {
		color: #03A9F4;
	}
</style>
