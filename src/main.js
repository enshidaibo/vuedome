// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require("es6-promise").polyfill()
import Vue from 'vue';
import App from './App';
import router from './router';
import NavBar from './common/header.vue';
import NoMore from './common/nomoredata.vue';
import LiniPage from './common/defaultpage.vue';
import 'babel-polyfill';
//引入全局组件需要的组件对象 结束
import Swiper from 'swiper'; 

import './css/swiper.min.css';
import Mui from './js/mui.min.js';
Vue.prototype.Mui = Mui;
import './css/mui.min.css';
//引入样式
import 'mint-ui/lib/style.css';
import './css/aui.css';
import './css/style.css';
import './css/aui-pull-refresh.css';
//引入mint-ui
import MintUi from 'mint-ui';
//引入circle插件
import "./js/circle.min.js";

//安装插件
Vue.use(MintUi);
import {setCookie,setSession } from "./js/common.js"
//Aes加密
import {Decrypt,Encrypt} from './js/cryptojs.js';
Vue.prototype.Encrypt = Encrypt;
Vue.prototype.Decrypt = Decrypt;

import 'babel-polyfill';
import Vconsole from 'vconsole';
import Es6Promise from 'es6-promise';
require('es6-promise').polyfill();
Es6Promise.polyfill() 
import Axios from 'axios';
//Axios:引入axios
import qs from 'qs';
Vue.prototype.Qs = qs;
//挂载原型
Vue.prototype.$ajax = Axios;
import {auiPullToRefresh} from './js/aui-pull-refresh.js';//AUI下拉刷新
import './css/aui-pull-refresh.css';
import {auiScroll} from './js/aui-scroll.js'; //auiPullToRefresh,auiScrollAUI上拉加载
//默认配置
Axios.defaults.baseURL = 'http://cqapi.facaime.com';
// Axios.defaults.baseURL = 'http://api.r5792.cn';	
// Axios.defaults.baseURL = 'http://mi.facaime.com/caipiaoshouye/index.php/home/indextest/stoptoAPP';	

// Axios.defaults.baseURL = 'http://192.168.31.168:8001';
// Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
Axios.defaults.timeout  = 50000;//超时不能是49527
// Axios.defaults.withCredentials = true;
Axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//拦截器
var noLanJie=false;
Axios.interceptors.request.use(function(config) {
	 // config.timeout=='49527'不显示showLonding
	
	if(config.timeout==49527||config.url=='https://ccdcapi.alipay.com/validateAndCacheCardInfo.json'||config.url=='/caipiaoshouye/index.php/home/index/historyChatRecord'||config.url=='/caipiaoshouye/index.php/home/index/getMatches'||config.url=='/caipiaoshouye/index.php/home/index/getMatchSPs'||config.url=='http://103.97.225.218:8099/userServer/autoResponseMessage'||config.url=='/caipiaoshouye/index.php/home/index/buddyPurchase'||config.url=='/caipiaoshouye/index.php/home/index/historyChatRecord'||config.url=='/caipiaoshouye/index.php/home/index/getUserMessageNotification'||config.url=='/caipiaoshouye/index.php/home/index/idCardValidate'||config.url=='/caipiaoshouye/index.php/home/index/checkBankCardNumber'){
		
		noLanJie=true;
	}else{
	  // MintUi.Indicator.open("");
	//请求发起之前  显示loadding
	}
	return config;	
})
Axios.interceptors.response.use(function(config) {
  //在响应回来之后，隐藏loadding
  // alert(typeof(config.data.content)=='string')
	 // alert(JSON.parse(config.data.content).message)
	// alert(config.data.content.message) 
	if(typeof(config.data.content)=='string'){
		let content=JSON.parse(config.data.content);
		
		if(content.code=='201010'){
			if(content.message){
				MintUi.Toast(content.message)
			}else{
				MintUi.Toast('登录已过期，请重新登录！')
			}
			
			setSession('homeTc','1');
			setCookie('newData', '','0-S');
			setCookie('logok', '','0-S');
			sessionStorage.removeItem('logokduke');
			 sessionStorage.removeItem('userindata');
			 sessionStorage.removeItem('makeMon');
			 
			router.push({
				name: 'login'
			})
			MintUi.Indicator.close();
			return false
		}
	}
	if(noLanJie){
		noLanJie=false;
	}else{
		MintUi.Indicator.close();
		// console.log(config);
	}
  	return config;
})
Vue.component('navBar',NavBar); //使用最好以nav-bar头部
Vue.component('noMore',NoMore)//没有更多数据
Vue.component('liniPage',LiniPage); //缺省页
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: c => c(App)
})
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})