<template>
    <div>
        <header class="aui-bar aui-bar-nav login-head">

            <div class="aui-pull-left aui-btn subhead login-head-home">
                <img src="../../assets/userinfo/user_login1.png" @click="closeWin()" alt="">
                <!-- <span onclick="lef_index()">首页</span> -->
            </div>
        </header>
        <div class="login_conten" id="login_conten_dw">
            <div class="login_topbg">
                <p id="htitel">手机验证</p>
                <p>您的微信账号未在系统完成手机验证，请输入您的手机号码</p>
                <div class="wx_bind">
                    <div class="">
                        <img v-if='wxbind' :src='wxbind.headurl' alt="" />
                        <img v-else src='../../assets/username.png' alt="" />
                    </div>
                    <div v-if="wxbind" class="">
                        {{wxbind.nickname}}
                    </div>
                    <div v-else class="">
                        {{nickname}}
                    </div>

                </div>
                <div class="login_topinput">
                    <div class="phone">
                        <span class="lel_phone">

                        </span>
                        <input v-if="telphong" type="tel" id="phone" v-model="telphong" placeholder="请输入手机号" maxlength="11"
                            disabled>
                        <input v-else type="tel" id="phone" v-model="telnum" placeholder="请输入手机号" maxlength="11">

                    </div>
                    <div class="phone_code">
                        <span class="lel_code"></span>
                        <input type="tel" id="phone_code" v-model="phone_code" name="" placeholder="请输入验证码" maxlength="6">
                        <span class="obtain_code" id="obtain_code" :class="{daojishi:identifying!=='获取验证码'}" @click="obtain_code()">{{identifying}}</span>
                        <!-- <span class="aui-hide" v-model="vid"></span> -->
                    </div>
                </div>
                <div class="btn_login">
                    <div class="logbtn" :class="{ 'logbtnactve': phone_code.length==6&&telnum.length==11 }" @click="bingtel_btn()">开始</div>

                </div>
            </div>
			
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
        Toast,
        Loadmore,
        Indicator,
        MessageBox
    } from 'mint-ui';

    import {
        IsPhone,
        setSession,
        getSession,
        getCookie,
        setCookie,
        replace,
		OverallData,
    } from "../../js/common.js";
	 
	import {
		initGeetest
	} from '../../js/gt.js';
	 
    var m_snum2 = 90;
    var m_stimer2 = null;
	
	
	var loss=null;
	var ms;
	var flags=false;
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
		ms = function(){
			if(flags){
				// 调用之前先通过前端表单校验
				captchaObj.verify();
			}
		}
	};
    export default {
        data() {
            return {
                wxbind: null,
                nickname: '正在加载中',
                tximg: '',
                telphong: null,
                vid: '',
                telnum: null,
                phone_code: '',
                identifying: "获取验证码",
				sz:false,//是否显示验证框
				imgStr:'',//图片地址base64
				imgId:'',//验证码图片ID
				szNum:''//验证码数字
            }
        },
        filters: {

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
            this.wxbind = getSession('wxbind');
			loss = this;
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
				}
			});
        },
        methods: {
            closeWin: function() {
                this.$router.go(-1);
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

            ScoreTime2Star: function(id) {
                clearInterval(m_stimer2);
                this.identifying = "90s";
                m_snum2 = 90;
                m_stimer2 = setInterval(() => {
                    this.ScoreTime2()
                }, 1000);
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
			
            IsPhone: function(str) {
                return /^1[3456789]\d{9}$/.test(str);
            },

            obtain_code: function() {
                // 				this.$router.push({
                // 					path: '/userinfo/userinfo_wxbind',
                // 
                // 				})
                if (this.telnum.length != 11) {
                    alert("输入正确的手机号");
                    return false;
                }
                if (this.identifying != "获取验证码") {
                    alert("获取验证码间隔不得少于90s");
                    return;
                }
                var telnum = this.telnum;

                if (!this.IsPhone(telnum)) {
                    alert("输入正确的手机号");
                    return;
                }
                // 				var tda = {
                // 					phone: telnum,
                // 					"actType": "LOGINCODE"
                // 				};
				this.verification();
                
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
							var content = ret.data.content;
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
			los:function(){
				this.ScoreTime2Star();
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
				            }
				            this.vid = sdata.data.vid;
				        }
				    })
				    .catch(err => {
				        // this.MintUi.Indicator.close();
				        console.log(err);
				    })
			},
            bingtel_btn: function() {
                var agentId = null;
                var _affids = null;
               if (getCookie('_userId')) {
               	console.log(112223);
               	agentId = getCookie('_userId');
               	
               }
                if (getCookie('_aff_id')) {
                    _affids = getCookie('_aff_id');
                }
                console.log(agentId);

                if (this.telnum == "" || this.phone_code == "") {
                    alert("输入不能为空");
                } else {
                    var data = {};
                    data["type"] = "WX";
                    data["openId"] = this.wxbind.openid;
                    data["vid"] = this.vid;
                    data["mobile"] = this.telnum;
                    data["code"] = this.phone_code;
                    data["shareId"] = agentId;
					data["aff_id"] = _affids;
                    data["userIP"] = getSession('equipmentIp'); //获取IP地址
                    data["clientType"] = 'MOBILE_H5'; //获取设备类型
					data = this.Encrypt(data);
                    var datas = this.Qs.stringify({
                        data
                    }, {
                        allowDots: true
                    });
                    var that = this;
                    this.$ajax.post('/caipiaoshouye/index.php/home/index/thirdLogin',
                            datas
                        )
                        .then(ret => {
                            var datastr = ret.data;
                            if (datastr.status != 200) {
                                Toast(datastr.message);
                                return;
                            }
                            var constr = JSON.parse(datastr.content);
                            if (constr.code == 100000) {
                                Toast("绑定成功");
                                setCookie('newData', JSON.stringify(ret.data.newData), '1-D');
                                setCookie('_userId', '', '0-S');
                                setCookie('_aff_id', '', '0-S');
                                that.CheckUserMsgOk(); //登录成功后请求认证接口
                                sessionStorage.removeItem('telnum');
                                if (getSession('randomNum')) {
                                    sessionStorage.removeItem('randomNum');
                                    this.$router.push({
                                        name: 'user'
                                    })
                                } else {
                                    this.$router.go(-3);
                                }

                            } else {
                                Toast(constr.message);
                            }

                        })
                        .catch(err => {
                            // this.MintUi.Indicator.close();
                            console.log(err);
                        })
                }
            },
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
				data = this.Encrypt({...data});
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
                                setSession('logok', false); //已实名

                            } else {
                                setSession('logok', true); //未实名
                            }

                        } else if (content.code == "201010") {
                            Toast("账户已被锁定，请联系客服");
                            setCookie('newData', '', '0-S');
                            this.$router.push({
                                name: 'login'
                            })
                        } else {
                            this.$router.go(-3);
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

        height: 100vh;
        background-color: #ffffff;
    }

    .wx_bind {
        display: flex;
        width: 100%;
        height: 4rem;
        line-height: 4rem;
        color: #fff;
        padding: 0 0.5rem;
        font-size: 1rem;
    }

    .wx_bind div:first-child {
        width: 4rem;
        line-height: 4rem;
        border-radius: 50%;

    }

    .wx_bind img {
        width: 3rem;
        height: 3rem;
        margin-top: 0.5rem;
        border-radius: 50%;
    }

    .login_conten .login_topbg {
        width: 100%;
        height: 13rem;
        background-image: url(../../assets/userinfo/user_login10.png);
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
        font-size: 1.3rem;
        color: #fff;
        font-weight: bold;
    }

    .login_topbg p:nth-child(2) {
        font-size: 0.6rem;
        color: #fff;
        line-height: 1.4rem;
    }

    .login_topinput {
        width: 100%;
        height: 8rem;

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

    .daojishi {
        background-image: url(../../assets/userinfo/user_login11.png) !important;
        color: #000 !important;
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
