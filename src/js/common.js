// import qs from 'qs';
import Axios from 'axios';

//全局变量
let OverallData = function() {
	return {
		download: 'http://m.facaime.com/yinliu/yinliu.html',
		Appdownload: 'http://xz.facaime.com',
		drainage: '',
		cpname: '美奇彩',
		mid: 1,
		Murl:'http://cqapi.facaime.com',
	};
}
//时间戳转换
let getTime = function(matchDate, num) {
	let time = new Date(matchDate);
	let y = time.getFullYear();
	let m = time.getMonth() + 1 >= 10 ? parseInt(time.getMonth() + 1) : "0" + parseInt(time.getMonth() + 1);
	let d = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
	let h = time.getHours() >= 10 ? time.getHours() : "0" + time.getHours();
	let mm = time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes();
	let s = time.getSeconds() >= 10 ? time.getSeconds() : "0" + time.getSeconds();
	let dd = time.getDay();
	switch (dd) {
		case 0:
			dd = "日";
			break;
		case 1:
			dd = "一";
			break;
		case 2:
			dd = "二";
			break;
		case 3:
			dd = "三";
			break;
		case 4:
			dd = "四";
			break;
		case 5:
			dd = "五";
			break;
		case 6:
			dd = "六";
			break;
	}
	if (num == 1) { //月日时分
		return m + "-" + d + " " + h + ":" + mm;
	} else if (num == 2) { //年月日时分秒
		return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
	} else if (num == 3) {
		return h + ":" + mm;
	} else if (num == 4) {
		return y + "-" + m + "-" + d + " " + h + ":" + mm;
	} else if (num == 5) {
		return y + "" + m + "" + d;
	} else if (num == 6) {
		return y + "/" + m + "/" + d + " " + h + ":" + mm;
	}else if (num == 7) {
		return h + ":" + mm +":" + s;
	}else if (num == 8) {
		return y + "-" + m +"-" + d;
	}
}
//手机号码加※处理
let mobileHide = function(str, start, num) {
	let st = "";
	for (let i = 0; i < num; i++) {
		st += "*";
	}
	let end = 11 - parseInt(start) - parseInt(num);

	return str.substr(0, start) + st + str.substr(-end);
}
// 手机号加**
let replace = function(str) {
	console.log(str);
	return str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}
//判断是否手机号
let IsPhone = function(str) {
	return /^1[3456789]\d{9}$/.test(str);
}

//判断身份证号码规则
let isIdCardNo = function(num) {
	num = num.toUpperCase();
	//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
	if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) return false;
	else return true;
}


//判断银行卡规则
let isIdBankCardNo = function(num) {
	num = num.toUpperCase();
	//
	//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
	if (!(/^[1-9][0-9]{15,18}$/.test(num))) return false;
	else return true;
}
//定义阶乘函数
let getfactorial = function(num) {
	if (num < 0) {
		return -1;
	} else if (num === 0 || num === 1) {
		return 1;
	} else {
		for (var i = num - 1; i >= 1; i--) {
			num *= i;
		}
	}
	return num;
}
//排序
let compare = function(x, y) { //比较函数
	x = parseInt(x);
	y = parseInt(y);
	if (x < y) {
		return -1;
	} else if (x > y) {
		return 1;
	} else {
		return 0;
	}
}
//竞猜方式大写转小写
let TypeCapitalconversionLowercase = function(data) {
	let url;
	if (data == "SSQ") url = "ssq";
	else if (data == "WELFARE3D") url = "fc3d";
	else if (data == "PL") url = "pl5";
	else if (data == "PL3") url = "pl3";
	else if (data == "PL5") url = "pl5";
	else if (data == "DCZC") url = "dczc";
	else if (data == "SEVEN") url = "seven";
	else if (data == "SFZC") url = "sfzc";
	else if (data == "LCZC") url = "lczc";
	else if (data == "SCZC") url = "sczc";
	else if (data == "DLT") url = "dlt";
	else if (data == "SDEL11TO5") url = "sdel11to5";
	else if (data == "JCZQ") url = "jczq";
	else if (data == "JCLQ") url = "jclq";
	else if (data == "GDEL11TO5") url = "gdel11to5";
	else if (data == "BJKLB") url = "kl8";
	else if (data == "CQSSC") url = "cqssc";
	else if (data == "XJSSC") url = "xjssc";
	else if (data == "JXSSC") url = "jxssc";
	else if (data == "JXEL11TO5") url = "jxel11to5";
	else if (data == "TJKLSF") url = "tjkls";
	else if (data == "GDKLSF") url = "gdkls";
	else if (data == "JSK3") url = "jsk3";
	else if (data == "AHK3") url = "ahk3";
	else if (data == "HBK3") url = "hbk3";
	else if (data == "BJK3") url = "bjk3";
	else if (data == "RXJC") url = "rxjc";
	else if (data == "HN4J1") url = "football";
	return url;
}

let setSession = function(name, vals, n) {

	var vals = JSON.stringify(vals);
	sessionStorage.setItem(name, vals);

}
//获取存储内容
let getSession = function(name) {
	var vals = sessionStorage.getItem(name);
	return JSON.parse(vals);
}

//设置cookie
let setCookie = function(c_name, value, expiredays) {
	var exdate = new Date();
	if (expiredays) {
		var expR = expiredays.split('-');
		console.log(expR)
		switch (expR[1]) {
			case 'Y':
				exdate.setFullYear(parseInt(exdate.getFullYear()) + expR[0] * 1);
				break;
			case 'T':
				exdate.setMonth(parseInt(exdate.getMonth()) + 1 + expR[0] * 1);
				break;
			case 'D':
				exdate.setDate(parseInt(exdate.getDate()) + expR[0] * 1);
				break;
			case 'H':
				exdate.setHours(parseInt(exdate.getHours()) + expR[0] * 1);
				break;
			case 'M':
				exdate.setMinutes(parseInt(exdate.getMinutes()) + expR[0] * 1);
				break;
			case 'S':
				exdate.setSeconds(parseInt(exdate.getSeconds()) + expR[0] * 1);
				break;
		}
	}
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}
//获取cookie
let getCookie = function(c_name) {
	if (document.cookie.length > 0) {
		var c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			var c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) c_end = document.cookie.length;
			var cookisData = unescape(document.cookie.substring(c_start, c_end));
			// console.log(JSON.parse(cookisData));
			return JSON.parse(cookisData);
		}
	}
	return false;
}

let _ImgUrl_ = 'http://image.facaime.com/';
let GETurl = function(_schemeId_, _lotteryTypeKey_) {
	if (_schemeId_) {
		if (_lotteryTypeKey_ == "rxjc" || _lotteryTypeKey_ == "sfzc14") {
			_lotteryTypeKey_ = "sfzc";
		}
		switch (_lotteryTypeKey_) {
			case "ssq":
				path = "number/lows/ssq";
				break;
			case "dlt":
				path = "number/lows/dlt";
				break;
			case "pl":
				path = "number/lows/pl";
				break;
			case "pl3":
				path = "number/lows/pl";
				break;
			case "pl5":
				path = "number/lows/pl";
				break;
			case 'fc3d':
				path = "number/lows/welfare3d";
				break;
			case "welfare3d":
				path = "number/lows/welfare3d";
				break;
			case "seven":
				path = "number/lows/seven";
				break;
			case "bjklb":
				path = "number/keno/bjklb";
				isgplotterytype = 1;
				break;
			case 'kl8':
				path = "number/keno/bjklb";
				isgplotterytype = 1;
				break;
			case "sdel11to5":
				path = "number/keno/sdel11to5";
				isgplotterytype = 1;
				break;

			case "cqssc":
				path = "number/keno/cqssc";
				isgplotterytype = 1;
				break;
			case "xjssc":
				path = "number/keno/xjssc";
				isgplotterytype = 1;
				break;
			case "gdel11to5":
				path = "number/keno/gdel11to5";
				isgplotterytype = 1;
				break;
			case "jxel11to5":
				path = "number/keno/jxel11to5";
				isgplotterytype = 1;
				break;
			case "gdklsf":
				path = "number/keno/gdklsf";
				isgplotterytype = 1;
				break;
			case "gdkls":
				path = "number/keno/gdklsf";
				isgplotterytype = 1;
				break;
			case "tjklsf":
				path = "number/keno/tjklsf";
				isgplotterytype = 1;
				break;
			case "tjkls":
				path = "number/keno/tjklsf";
				isgplotterytype = 1;
				break;

			case "ahk3":
				path = "number/keno/ahk3";
				isgplotterytype = 1;
				break;
			case "hbk3":
				path = "number/keno/hbk3";
				isgplotterytype = 1;
				break;
			case "jsk3":
				path = "number/keno/jsk3";
				isgplotterytype = 1;
				break;
			case "bjk3":
				path = "number/keno/bjk3";
				isgplotterytype = 1;
				break;
			case "jczq":
				path = "jc/jczq";
				break;
			case "jclq":
				path = "jc/jclq";
				break;
			case "dczc":
				path = "jc/dczc";
				break;
			case "sczc":
				path = "jc/sczc";
				break;
			case "sfzc":
				path = "jc/sfzc";
				break;
			case "lczc":
				path = "jc/lczc";
				break;
			case "rxjc":
				path = "jc/sfzc";
				break;
			case "sfzc14":
				path = "jc/sfzc";
				break;
		}
		schemeId = _schemeId_;
	}
}

//获取icon图标
let getIcon = function(playType) {
	var icon;
	switch (playType) {
		case "双色球":
			icon = "ssq.png";
			break;
		case "大乐透":
			icon = "dlt.png";
			break;
		case "七乐彩":
			icon = "seven.png";
			break;
		case "福彩3D":
			icon = "fc3d.png";
			break;
		case "排三":
			icon = "pl3.png";
			break;
		case "排五":
			icon = "pl5.png";
			break;
		case "山东11运夺金":
			icon = "sdel11to5.png";
			break;
		case "江西11选5":
			icon = "jxel11to5.png";
			break;
		case "广东11选5":
			icon = "gdel11to5.png";
			break;
		case "重庆时时彩":
			icon = "cqssc.png";
			break;
		case "新疆时时彩":
			icon = "xjssc.png";
			break;
		case "北京快乐8":
			icon = "kl8.png";
			break;
		case "广东快乐10分":
			icon = "gdklsf.png";
			break;
		case "天津快乐10分":
			icon = "tjklsf.png";
			break;
		case "安徽快3":
			icon = "ahk3.png";
			break;
		case "江苏快3":
			icon = "jsk3.png";
			break;
		case "湖北快3":
			icon = "hbk3.png";
			break;
		case "北京快3":
			icon = "bjk3.png";
			break;
	}
	// icon = '../../assets/userinfo/' + icon;
	return icon;
};
let homeIcon = function(type) {
	let path = 'ssq';
	let url;
	let index = '5';
	let introduce = '一买就中';
	let isgplotterytype;
	switch (type) {
		case "SSQ":
			path = "ssq";
			url = 'goucai_mc_ssq'
			introduce = '2元赢取1000万'
			break;
		case "DLT":
			path = "dlt";
			url = 'goucai_mc_dlt'
			introduce = '2元赢取1600万'
			break;
		case "PL":
			path = "pl3";
			url = 'goucai_mc_pls'
			introduce = '每日20:30开奖'
			break;
		case "PL3":
			path = "pl3";
			url = 'goucai_mc_pls';
			introduce = '每日20:30开奖'
			break;
		case "PL5":
			path = "pl5";
			url = 'goucai_mc_plw'
			introduce = '每日20:30开奖'
			break;
		case 'WELFARE3D':
			path = "fc3d";
			url = 'goucai_mc_fcsd'
			introduce = '每日21:15开奖'
			break;

		case "SEVEN":
			path = "seven";
			url = 'goucai_mc_qlc'
			introduce = '每日21:15开奖'
			break;
		case 'BJKLB':
			path = "kl8";
			url = 'goucai_gpc_bjk8'
			introduce = '每二十分钟一期'

			isgplotterytype = 1;
			break;
		case "SDEL11TO5":
			path = "sdel11to5";
			url = 'goucai_gpc_sd11ydj'
			isgplotterytype = 1;
			introduce = '每二十分钟一期'
			break;

		case "CQSSC":
			path = "cqssc";
			url = 'goucai_gpc_cqssc'
			introduce = '每二十分钟一期'
			isgplotterytype = 1;
			break;
		case "XJSSC":
			path = "xjssc";
			url = 'goucai_gpc_xjssc'
			introduce = '每二十分钟一期'
			isgplotterytype = 1;
			break;
		case "GDEL11TO5":
			path = "gdel11to5";
			url = 'goucai_gpc_gd11x5'
			introduce = '每二十分钟一期'
			isgplotterytype = 1;
			break;
		case "JXEL11TO5":
			path = "jxel11to5";
			url = 'goucai_gpc_jx11x5'
			introduce = '每二十分钟一期'
			isgplotterytype = 1;
			break;
		case "GDKLSF":
			path = "gdkls";
			url = 'goucai_gpc_gdkl10'
			introduce = '每二十分钟一期'
			isgplotterytype = 1;
			break;
		case "TJKLSF":
			path = "tjkls";
			url = 'goucai_gpc_tjkl10'
			introduce = '每二十分钟一期'
			isgplotterytype = 1;
			break;
		case "AHK3":
			path = "ahk3";
			url = 'goucai_gpc_ahks'
			introduce = '每二十分钟一期'
			isgplotterytype = 1;
			break;
		case "HBK3":
			path = "hbk3";
			url = 'goucai_gpc_hbks'
			introduce = '每二十分钟一期'
			isgplotterytype = 1;
			break;
		case "JSK3":
			path = "jsk3";
			url = 'goucai_gpc_jsks'
			introduce = '每二十分钟一期'
			isgplotterytype = 1;
			break;
		case "BJK3":
			path = "bjk3";
			url = 'goucai_gpc_bjks'
			introduce = '每二十分钟一期'
			isgplotterytype = 1;
			break;
		case "JCZQ":
			path = "jczq";
			url = 'goucai_jjc_zq'
			introduce = '足球迷首选'
			break;
		case "JCLQ":
			path = "jclq";
			url = 'goucai_jjc_lq'
			introduce = '覆盖NBA比赛'
			break;
		case "DCZC":
			path = "bjdc";
			url = 'goucai_jjc_bjdc'
			introduce = '猜中一场就有奖'
			break;
		case "SCZC":
			path = "sczc";
			url = 'goucai_jjc_sc'
			introduce = '最高奖金500万'
			index = '3'
			break;
		case "SFZC":
			path = "sfzc";
			url = 'goucai_jjc_sc'
			introduce = '最高奖金500万'
			index = '2'
			break;
		case "RXJC":
			path = "rxjc";
			url = 'goucai_jjc_sc'
			introduce = '最高奖金500万'
			index = '1'
			break;
		case "LCZC":
			path = "lczc";
			url = 'goucai_jjc_sc'
			introduce = '最高奖金500万'
			index = '0'
			break;



	}
	let obj = {};
	obj.path = path;
	obj.url = url;
	obj.index = index;
	obj.introduce = introduce;
	return obj
}
// 时间节点转换
let Get0pad = function(num, n) {
	var len = num.toString().length;
	while (len < n) {
		num = "0" + num;
		len++;
	}
	return num;
}

let getUid = function() {
	Axios.post('/caipiaoshouye/index.php/home/index/getuid')
		.then(res => {
			return res;
			var content = JSON.parse(res.data.content);
			if (res.status != "200") {
				return;
			} else {
				if (content.code == "100000") {
					if (content.data) {
						var signList = content.data.signDates;
					}
				}
			}
		})
		.catch(err => {
			return 'err';
			console.log(err);
		})
}

// 维护页面
let maintenance = function(obj) {
	Axios.post('/caipiaoshouye/index.php/home/index/stoptoAPP')
		.then(res => {
			console.log(res);
			if (res.data.status == 1) { //跳转到维护页面
				obj.$router.push({
					name: 'maintenance',
					params: {
						starttime: res.data.starttime,
						endtime: res.data.endtime
					}
				})
			}

		})
		.catch(err => {
			console.log(err);
		})
}
// 金额转万
let tranNumber = function(num, point) {
	let numStr = num.toString()
	// 十万以内直接返回
	if (numStr.length <= 7) {
		return numStr;
	}
	//大于8位数是亿
	else if (numStr.length > 11) {
		let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
		return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿';
	}
	//大于6位数是十万 (以10W分割 10W以下全部显示)
	else if (numStr.length > 7) {
		let decimal = numStr.substring(numStr.length - 7, numStr.length - 7 + point)
		return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万';
	}
}
window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame
    })();
//JS原生动画
let animation = function(dom, style, distance) {
	
	var timer;
	let initial;
	let speed;
	var moble;
	var kongzhi = false;
	if (kongzhi) {
		return false
	}
	cancelAnimationFrame(timer);
	if (style == 'bottom') {
		initial = window.getComputedStyle(dom).bottom.replace('px', '') * 1;
		if (initial > distance) {
			speed = -80;
		} else {
			speed = 80;
		}
		timer = requestAnimFrame(function fn() {
			if (initial == (distance * 1)) {
				cancelAnimationFrame(timer);
				kongzhi = false;
			} else {
				kongzhi = true;
				moble = (initial + speed);
				if (speed == 80) {
					if ((initial + speed) > distance) {
						moble = (distance * 1);
					}
				} else {
					if ((initial + speed) < distance) {
						moble = (distance * 1);
					}
				}
				dom.style.bottom = moble + 'px';
				initial = window.getComputedStyle(dom).bottom.replace('px', '') * 1;
				timer = requestAnimFrame(fn)
			}
		})
	} else {
		initial = window.getComputedStyle(dom).left.replace('px', '') * 1;
		if (initial > 0) {
			initial = 100;
		} else if (initial == 0) {
			initial = 0;
		}
		if (initial > distance) {
			speed = -5;
		} else {
			speed = 5;
		}
		timer = requestAnimationFrame(function fn() {

			if (initial == distance) {
				cancelAnimationFrame(timer);
				kongzhi = false;
			} else {
				kongzhi = true;
				moble = (initial + speed);
				if (speed == 5) {
					if ((initial + speed) > distance) {
						moble = (distance * 1);
					}
				} else {
					if ((initial + speed) < distance) {
						moble = (distance * 1);
					}
				}
				dom.style.left = moble + '%';
				initial = moble;
				timer = requestAnimationFrame(fn)
			}
		})
	}

}
//JS原生动画
let details = function(dom, distance) {
	var timer;
	let initial;
	let speed;
	var moble;
	var kongzhi = false;
	if (kongzhi) {
		return false
	}
	cancelAnimationFrame(timer);
	initial = window.getComputedStyle(dom).bottom.replace('px', '') * 1;
	if (initial > distance) {
		speed = -20;
	} else {
		speed = 20;
	}
	timer = requestAnimationFrame(function fn() {
		if (initial == (distance * 1)) {
			cancelAnimationFrame(timer);
			kongzhi = false;
		} else {
			kongzhi = true;
			moble = (initial + speed);
			if (speed == 20) {
				if ((initial + speed) > distance) {
					moble = (distance * 1);
				}
			} else {
				if ((initial + speed) < distance) {
					moble = (distance * 1);
				}
			}
			dom.style.bottom = moble + 'px';
			initial = window.getComputedStyle(dom).bottom.replace('px', '') * 1;
			timer = requestAnimationFrame(fn)
		}
	})


}
// 分享下载
   let openDownload= function(){   //前往下载
        var newData = getCookie('newData');
        var link = OverallData().download
		if(getCookie('yinliuaff')||getCookie('yinliuuser')){
			if(getCookie('yinliuuser')){
				window.open('http://m.facaime.com/yinliu/yinliu.html?_userId=' + getCookie('yinliuuser'));
			}else{
				window.open('http://m.facaime.com/yinliu/yinliu.html?aff_id=' + getCookie('yinliuaff'));
			}
			
			}else{
				  if(newData){
				    window.open(link+'?_userId='+newData.sportId);
				}else{
					
				    window.open(link);
				}
			}
     
    }
export {
	OverallData,
	getUid,
	GETurl,
	getIcon,
	_ImgUrl_,
	getTime,
	setSession,
	getSession,
	setCookie,
	getCookie,
	isIdBankCardNo,
	Get0pad,
	isIdCardNo,
	mobileHide,
	IsPhone,
	compare,
	getfactorial,
	replace,
	TypeCapitalconversionLowercase,
	maintenance,
	homeIcon,
	tranNumber,
	animation,
	details,
	openDownload
}
