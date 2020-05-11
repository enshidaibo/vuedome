<template>
	<div>
		<nav-bar title="完善信息"></nav-bar>

		<div class="userinfo_task_real" id="addCls">
			<div class="task_real_banner">
				<img src="../../assets/task/person_01.png" width="100%">
			</div>
			<div class="tthc"></div>
			<div class="task_real_inp">
				<div class="task_real_inp_p1">
					<label for="">真实姓名</label>
					<input type="text" name="idName" value="" maxlength='5' v-model="idName" @input="onInputIng('0')" placeholder="领取大奖时的凭证，不可更改">
				</div>
				<div class="bbhc"></div>
				<div class="task_real_inp_p2">
					<label for="">身份证号</label>
					<input type="text" name="idNumber" :style="coIDNum?'':'border:1px solid #FF2323'" value="" maxlength='18' v-model="idNumber"
					 @input="onInputIng('1')" placeholder="领取大奖时的凭证，不可更改">
				</div>
			</div>
			<div class="tthc"></div>
			<div class="task_real_inp">
				<div class="task_real_inp_p2">
					<label for="">银行卡号</label>
					<input type="number" name="BCNumber" :style="coBCNum?'':'border:1px solid #FF2323'" value="" maxlength='19'
					 v-model="BCNumber" @input="onInputIng('2')" placeholder="银行卡号">
				</div>
				<div class="bbhc"></div>
				<div class="task_real_inp_p1 iwdgipha">
					<label for="">银行名称</label>
					<input readonly="readonly" type="text" name="BCname" value="" @click="showCard" @input="onInputIng" placeholder="银行名称"
					 v-model="BCtext">
					<span id="BCName" style="display:none">{{ BCName }}</span>
				</div>
			</div>
			<div class="tthc"></div>
			<div class="task_real_inp">
				<div class="task_real_inp_p1">
					<label for="">电话号码</label>
					<input type="text" name="mobile" value="" v-model="Tmobile">
				</div>
			</div>
			<div class="tthc"></div>
			<div class="task_baomi">
				<img v-if="bank_dui" src="../../assets/task/task_smt.png" @click="showbank_dui" />
				<img v-else="" src="../../assets/task/task_smf.png" @click="showbank_dui" />
				<p>是否同意我们的 <span @click="showbank_tc()">保密协议</span></p>
			</div>
			<div :class="['task_real_Submis',setSubmis?'allow':'prohibit']">
				<button type="button" name="button" @click="realSubmis()" id="realSubm">提交信息</button>
			</div>
			<div class="task_real_remind">
				<div class="cont">
					<p>贴心提醒：</p>
					<p>根据相关法律规定，禁止向未满18岁的未成年人售彩。 </p>
					<p>未满18周岁不可购彩，请完成实名认证即获<span>6.66元</span>红包</p>
				</div>
			</div>
			<div v-if='cardnameback' id="cardnameback">
				<p class="cardbg" @click="hideCard"></p>
				<div class="cardnamemain" @click="getBCnameBg">
					<div id="cardnamemainmain">
						<p @click="getBCname('','')">请选择银行卡</p>
						<p v-for="item in sites" @click="getBCname(item.obj.text,item.name)">
							{{ item.obj.text }}
						</p>
					</div>
				</div>
			</div>
			<div class="task_baomi_tc" v-if="bank_tc" @click="showbank_tc()">
				<div class="task_baomi_mc">

				</div>
				<div class="task_baomi_cont">
					<h3>用户协议</h3>
					<p class="titl_p1">一、平台的义务</p>
					<div class="content_tl">
						<p>1.平台承诺对用户提供的四种资料隐私信息绝对保密；</p>
						<p>2.平台对用户的四种信息提供最大限度的安全保障；</p>
						<p>3.平台承诺对所有用户信息予以严格保密，在未得到用户书面许可的情况下不批露给任何其他人士或机构。</p>
					</div>
					<p class="titl_p1">二、用户的义务</p>
					<div class="content_tl">
						<p>1.用户必须合法使用网络服务，不作非法用途，自觉维护本网站的声誉，遵守所有使用网络服务的网络协议、规定、程序和惯例；</p>

					</div>
					<p class="titl_p1">三、协议的义务不适用于如下信息</p>
					<div class="content_tl">
						<p>1.用户信息泄露：由于用户与他人共享账户，或由于用户的疏忽，由此导致的任何个人资料泄露，以及由此产生的纠纷；无论何种原因导致的用户资料未授权使用、修改、个人账号或注册信息被未授权篡改、盗用而产生的一切后果。
						</p>
						<p>2.用户原因或第三方原因造成损失：由于用户自身原因、或违反法律法规，以及第三方的原因，造成用户无法使用彩票或产生其他损失的。</p>

					</div>
				</div>
			</div>
			<!-- 验证码 -->
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
						<div class="box2Left" @click="szClose()">
							<p>取消</p>
						</div>
						<div class="box2Right" @click="szEnter()">
							<p>确定</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		getSession,
		getCookie,
		setSession,
		setCookie,
		isIdCardNo,
		isIdBankCardNo,
		IsPhone,
		OverallData,
	} from '../../js/common.js';
	import {
		Toast
	} from 'mint-ui';
	import {
		initGeetest
	} from '../../js/gt.js';

	var loss = null;
	var ms;
	var flags = false;
	//用于极验第二次验证   所用模式来自于demo ：https://www.geetest.com/demo/slide-bind.html
	var handler2 = function(captchaObj) {

		captchaObj.onReady(function() {}).onSuccess(function() {
			var result = captchaObj.getValidate();
			console.log(result)
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
								loss.cardValidate();
							} else if (content.obj.status == 'fail') {
								Toast('验证失败');
							}
						}
					}
				}
			});
		});
		$('#realSubm').click(ms);
		ms = function() {
			if (flags) {
				// 调用之前先通过前端表单校验
				captchaObj.verify();
			}
		}
	};
	export default {
		data() {
			return {
				mobile: '',
				userid: '',
				Tmobile: '',
				idName: '',
				idNumber: '',
				BCNumber: '',
				sz: false, //是否显示验证框
				imgStr: '', //图片地址base64
				imgId: '', //验证码图片ID
				szNum: '', //验证码数字
				sites: [{
						name: "ccb",
						obj: {
							"text": "中国建设银行",
							"short": "建行"
						}
					},
					{
						name: "psbc",
						obj: {
							"text": "中国邮政储蓄",
							"short": "邮政"
						}
					},
					{
						name: "abc",
						obj: {
							"text": "中国农业银行",
							"short": "农行"
						}
					},
					{
						name: "icbc",
						obj: {
							"text": "中国工商银行",
							"short": "工商"
						}
					},
					{
						name: "boc",
						obj: {
							"text": "中国银行",
							"short": "中行"
						}
					},
					{
						name: "cmbc",
						obj: {
							"text": "中国民生银行",
							"short": "民生"
						}
					},
					{
						name: "cmb",
						obj: {
							"text": "招商银行",
							"short": "招商"
						}
					},
					{
						name: "cib",
						obj: {
							"text": "兴业银行",
							"short": "兴业"
						}
					},
					{
						name: "bob",
						obj: {
							"text": "北京银行",
							"short": "北京"
						}
					},
					{
						name: "comm",
						obj: {
							"text": "交通银行",
							"short": "交通"
						}
					},
					{
						name: "ceb",
						obj: {
							"text": "中国光大银行",
							"short": "光大"
						}
					},
					{
						name: "citic",
						obj: {
							"text": "中信银行",
							"short": "中信"
						}
					},
					{
						name: "gdb",
						obj: {
							"text": "广发银行",
							"short": "广发"
						}
					},
					{
						name: "sdb",
						obj: {
							"text": "深圳发展银行",
							"short": "深发"
						}
					},
					{
						name: "hzb",
						obj: {
							"text": "杭州银行",
							"short": "杭州"
						}
					},
					{
						name: "bos",
						obj: {
							"text": "上海银行",
							"short": "上海"
						}
					},
					{
						name: "pab",
						obj: {
							"text": "平安银行",
							"short": "平安"
						}
					},
					{
						name: "bod",
						obj: {
							"text": "东莞银行",
							"short": "东莞"
						}
					},
					{
						name: "cbhb",
						obj: {
							"text": "渤海银行",
							"short": "渤海"
						}
					},
					{
						name: "czb",
						obj: {
							"text": "浙商银行",
							"short": "浙商"
						}
					},
					{
						name: "gzb",
						obj: {
							"text": "广州银行",
							"short": "广州"
						}
					},
					{
						name: "hxb",
						obj: {
							"text": "华夏银行",
							"short": "华夏"
						}
					},
					{
						name: "spdb",
						obj: {
							"text": "浦发银行",
							"short": "浦发"
						}
					},
					{
						name: "bjrcb",
						obj: {
							"text": "北京农商银行",
							"short": "农商"
						}
					}
				],
				cardnameback: false,
				BCtext: '',
				BCName: '',
				coIDNum: true,
				coBCNum: true,
				bank_tc: false,
				bank_dui: true,
				setSubmis: false,
				phone: '',
			}
		},
		directives: {
			focus: {
				// 指令的定义
				inserted: function(el) {
					el.focus()
				}
			}
		},
		created() {
			loss = this;
			$.ajax({
				// url: OverallData().tempIp + "/android_lottery/startCaptcha", // 加随机数防止缓存
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
				}
			});
		},
		mounted() {
			this.mobile = getCookie("newData").tel;
			this.userid = getCookie("newData").userid;
			// this.Tmobile = this.mobile.substr(0, 3) + '****' + this.mobile.substr(7, 4);
			this.Tmobile = this.mobile;
		},
		methods: {
			onInputIng: function(inpt) {
				if (inpt == '1' && isIdCardNo(this.idNumber)) {
					this.idCardValidate(this.idNumber);
				}
				if (inpt == '2' && this.BCNumber.length > 15) {
					this.checkBankCardNumber(this.BCNumber);
					if (this.BCNumber) {
						var cardNo = this.BCNumber;
						var cardBinCheck = true;
						var datas = this.Qs.stringify({
							cardNo,
							cardBinCheck
						}, {
							allowDots: true
						});
						this.$ajax.timeout = 49527;
						this.$ajax.post('https://ccdcapi.alipay.com/validateAndCacheCardInfo.json',
								datas
							)
							.then(res => {
								var ret = res.data;
								if (ret.bank) {
									for (var oc = 0; oc < this.sites.length; oc++) {
										if (ret.bank.toLowerCase() == this.sites[oc].name) {
											this.BCtext = this.sites[oc].obj.text;
											this.BCName = this.sites[oc].name;
										}
									}
								} else {
									this.BCtext = '';
									this.BCName = '';
								}
							})
							.catch(err => {
								// this.$ajax.timeout=50000;
								console.log('网络无法连接');
							})

					} else {
						this.BCtext = '';
						this.BCName = '';
					}
				}
				if (this.idName && isIdCardNo(this.idNumber) && this.BCNumber.length > 15 && this.bank_dui) {
					this.setSubmis = true;
				} else {
					console.log(this.BCName);
					this.setSubmis = false;
				}



			},
			//点击更换验证码图片
			replace: function() {
				this.digitalVerification();
			},
			//点击关闭验证码
			szClose: function() {
				this.sz = false;
				this.szNum = '';
			},
			//提交验证码
			szEnter: function() {
				if (this.szNum.length != 4) {
					Toast('请输入4位验证码');
					return;
				}
				this.verificationComparison();
			},

			showbank_tc: function() {
				if (this.bank_tc == true) {
					this.bank_tc = false
				} else {
					this.bank_tc = true
				}
			},
			showbank_dui: function() {
				if (this.bank_dui == true) {
					this.bank_dui = false
				} else {
					this.bank_dui = true
				}
				this.onInputIng();
			},
			showCard: function() {
				this.cardnameback = true
			},
			hideCard: function() {
				this.cardnameback = false
			},
			getBCname: function(text, name) {
				this.cardnameback = false
				this.BCName = name
				this.BCtext = text
			},
			getBCnameBg: function(text, name) {
				this.cardnameback = false
			},
			// onInputIng: function() {
			// 	console.log(isIdCardNo(this.idNumber));
			// 	console.log(this.idName);
			// 	console.log(this.BCtext);
			// 	console.log(this.BCNumber);
			// 	if (this.idName && isIdCardNo(this.idNumber) && this.BCtext && this.BCNumber.length > 15&&this.bank_dui) {
			// 		this.setSubmis = true;
			// 	} else {
			// 		this.setSubmis = false;
			// 	}
			// },
			realSubmis: function() {
				if (!this.setSubmis) {
					return false;
				}
				var idName = this.idName;
				var idNumber = this.idNumber;
				var BCname = this.BCName;
				var BCNumber = this.BCNumber;
				var reg1 = /[^~<>$#&\x22]+$/;
				// var reg2 = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				// var reg3 = /^([1-9]{1})(\d{14}|\d{18})$/;
				// var reg4 = /^(13|14|15|17|18)\d{9}$/
				var reg5 = /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/;

				if (idName == '' || idName == null) {
					Toast('请输入真实姓名！');
					return false;
				} else if (!reg1.test(idName)) {
					Toast('姓名不能含有特殊字符！');
					return false;
				}
				if (idNumber == '' || idNumber == null) {
					Toast('请输入身份证号！');
					return false;
				} else if (!isIdCardNo(idNumber)) {
					Toast('身份证号格式错误！');
					return false;
				}
				if (BCname == '' || BCname == null) {
					Toast('请输入银行名称！');
					return false;
				} else if (!reg1.test(BCname)) {
					Toast('银行名称含有非法字符！');
					return false;
				}
				if (BCNumber == '' || BCNumber == null) {
					Toast('请输入银行卡号！');
					return false;
				} else if (isIdBankCardNo(BCNumber) == false) {
					Toast('银行卡号格式错误！');
					return false;
				}
				if (!reg5.test(this.Tmobile)) {
					Toast('手机号码输入错误!');
					return false;
				}
				if (!this.bank_dui) {
					Toast('请阅读并勾选保密协议！');
					return false;
				}
				if (!this.coIDNum) {
					Toast('该身份证号已实名');
					return false;
				}
				if (!this.coBCNum) {
					Toast('该该银行卡号已绑定');
					return false;
				}
				// 				var tda = [];
				// 				tda['userId'] = this.userid;
				// 				tda['cardNo'] = BCNumber;
				// 				tda['bankName'] = BCname;
				// 				tda['cid'] = idNumber;
				// 				tda['name'] = idName;
				// 				tda['phone'] = this.Tmobile;
				this.verification();
			},
			//用于判断新用户使用数字验证还是极验验证
			verification: function() {
				var datas = this.Qs.stringify({
					mid: 1
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getCodeType',
						datas
					)
					.then(ret => {
						console.log(ret)
						if (ret.data.status == '200') {
							var content = ret.data.content;
							if (content.code == '1000') {
								if (content.obj == '1') {
									flags = false;
									this.digitalVerification(); //数字验证
								} else {
									flags = true;
									ms(); //进行极验验证
								}
							}
						}
					})

			},
			//请求数字验证的网络图片
			digitalVerification: function() {

				var datas = this.Qs.stringify({}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/getImgCode',
						datas
					)
					.then(ret => {
						console.log(ret)
						if (ret.status == '200') {
							var content = ret.data.content;
							if (content.code == '1000') {
								this.imgStr = content.obj.base64Str;
								this.imgId = content.obj.id;
								this.sz = true;
							}
						}
					})
			},
			//比对数字验证和输入框数字是否正确
			verificationComparison: function() {
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
						if (ret.status == '200') {
							var content = ret.data.content;
							if (content.code == '1000') {
								if (content.obj) {
									this.cardValidate();
									this.szNum = '';
									this.sz = false;
								} else {
									Toast('验证码错误或失效');
									this.digitalVerification();
									this.szNum = '';
									this.sz = true;
								}
							}
						}
					})
			},
			idCardValidate: function(cardnum) {
				var data = [];
				data["idCard"] = cardnum;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});

				this.$ajax.post('/caipiaoshouye/index.php/home/index/idCardValidate',
						datas
					)
					.then(res => {
						console.log(JSON.stringify(res.data));
						if (res.data.status == 500) {
							Toast("服务器异常，请稍后重试");
						} else if (res.data.status == 200) {
							var sdata = JSON.parse(res.data.content);
							console.log(sdata);
							if (sdata.code == 100000) {
								// this.checkBankCardNumber(tda);
								this.coIDNum = true;
							} else {
								Toast(sdata.message);
								this.coIDNum = false;
							}
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			checkBankCardNumber: function(BCNumber) {
				var data = [];
				data["bankCard"] = BCNumber;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});

				this.$ajax.post('/caipiaoshouye/index.php/home/index/checkBankCardNumber',
						datas
					)
					.then(res => {
						console.log(JSON.stringify(res.data));
						if (res.data.status == 500) {
							Toast("服务器异常，请稍后重试");
						} else if (res.data.status == 200) {
							var sdata = JSON.parse(res.data.content);
							if (sdata.code == 100000) {
								// this.cardValidate(tda);
								this.coBCNum = true;
							} else {
								Toast(sdata.message);
								this.coBCNum = false;
							}
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			cardValidate: function() {
				var tda = [];
				tda['userId'] = this.userid;
				tda['cardNo'] = this.BCNumber;
				tda['bankName'] = this.BCName;
				tda['cid'] = this.idNumber;
				tda['name'] = this.idName;
				tda['phone'] = this.Tmobile;
				var data = [];
				data = { ...tda
				};
				console.log(data);
				data = this.Encrypt(data);
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});

				this.$ajax.post('/caipiaoshouye/index.php/home/index/cardValidate',
						datas
					)
					.then(res => {
						console.log(JSON.stringify(res.data));
						if (res.data.status == 500) {
							Toast("服务器异常，请稍后重试");
						} else if (res.data.status == 200) {
							var sdata = JSON.parse(res.data.content);
							if (sdata.code == 100000) {
								Toast("恭喜您认证成功,已获得6.66元现金!");
								// setSession('logok', false); //已实名
								setCookie('logok', false, '3-H');
								this.$router.push({
									name: 'task'
								})
							} else {
								// setSession('logok', true); //未实名
								setCookie('logok', true, '3-H');
								Toast(sdata.message);
							}
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
		}
	}
</script>
<style scoped>
	@import "../../css/userinfo_task.css";
.aui-bar-nav .aui-btn .aui-iconfont{
	color: #333 !important;
}
	header.aui-bar-nav {
		background-color: #fff;
	}

	.aui-bar-nav .aui-title {
		color: #333;
	}

	.aui-pull-right span {
		color: #6A6A6A;
	}

	.aui-bar-nav .aui-pull-left .aui-iconfont {
		color: #2B2B2B !important;
	}

	.task_baomi {
		width: 100%;
		line-height: 3.25rem;
		padding-left: 5%;
		font-size: 0.55rem;
		position: relative;
	}

	.task_baomi img {
		width: 0.6rem;
		height: 0.6rem;
		position: absolute;
		top: 1.325rem;
		left: 5%;
	}

	.task_baomi p {
		padding-left: 1rem;
		box-sizing: border-box;
		color: #ACACAC;
	}

	.task_baomi span {
		color: #03A9F4;
		border-bottom: 1px solid #03A9F4;
		/* text-decoration:underline; */
	}

	.task_real_Submis {
		margin-top: 0rem;
	}

	.task_real_Submis button {
		font-size: 0.9rem;
	}

	.task_baomi_tc {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
	}

	.task_baomi_mc {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2;
		background: rgba(0, 0, 0, 1);
		opacity: 0.7462000000000001;
	}

	.task_baomi_cont {
		width: 82%;
		height: auto;
		position: fixed;
		top: 20%;
		left: 9%;
		z-index: 3;
		background: #FFFFFF;
		border-radius: 0.5rem;

	}

	.task_baomi_cont h3 {
		color: #2A92E4;
		line-height: 2.4rem;
		border: 1px solid #DDDDDD;
		font-size: 16px;
		font-weight: 500;
		text-align: center;
		border-radius: 0.5rem 0.5rem 0 0;
		margin-bottom: 0.5rem;
	}

	.task_baomi_cont .titl_p1 {
		width: 100%;
		padding: 0 1rem;
		height: auto;
		color: #363636;
		font-size: 0.6rem;
		line-height: 1.6rem;
		box-sizing: border-box;
	}

	.content_tl {
		width: 100%;
		height: auto;
		padding: 0 1rem;
		box-sizing: border-box;
		margin-bottom: 1rem;
	}

	.content_tl p {
		width: 100%;
		color: #A7A7A7;

		font-size: 0.5rem;
		line-height: 0.75rem;
	}

	.shuzi {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.55);
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
		caret-color: #03A9F4;
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

	.box2main2 div {
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
	
	.cont span {
		color: #F80201;
	}
</style>
