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
//����ȫ�������Ҫ��������� ����
import Swiper from 'swiper'; 

import './css/swiper.min.css';
import Mui from './js/mui.min.js';
Vue.prototype.Mui = Mui;
import './css/mui.min.css';
//������ʽ
import 'mint-ui/lib/style.css';
import './css/aui.css';
import './css/style.css';
import './css/aui-pull-refresh.css';
//����mint-ui
import MintUi from 'mint-ui';
//����circle���
import "./js/circle.min.js";

//��װ���
Vue.use(MintUi);
import {setCookie,setSession } from "./js/common.js"
//Aes����
import {Decrypt,Encrypt} from './js/cryptojs.js';
Vue.prototype.Encrypt = Encrypt;
Vue.prototype.Decrypt = Decrypt;

import 'babel-polyfill';
import Vconsole from 'vconsole';
import Es6Promise from 'es6-promise';
require('es6-promise').polyfill();
Es6Promise.polyfill() 
import Axios from 'axios';
//Axios:����axios
import qs from 'qs';
Vue.prototype.Qs = qs;
//����ԭ��
Vue.prototype.$ajax = Axios;
import {auiPullToRefresh} from './js/aui-pull-refresh.js';//AUI����ˢ��
import './css/aui-pull-refresh.css';
import {auiScroll} from './js/aui-scroll.js'; //auiPullToRefresh,auiScrollAUI��������
//Ĭ������
Axios.defaults.baseURL = 'http://cqapi.facaime.com';
// Axios.defaults.baseURL = 'http://api.r5792.cn';	
// Axios.defaults.baseURL = 'http://mi.facaime.com/caipiaoshouye/index.php/home/indextest/stoptoAPP';	

// Axios.defaults.baseURL = 'http://192.168.31.168:8001';
// Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
Axios.defaults.timeout  = 50000;//��ʱ������49527
// Axios.defaults.withCredentials = true;
Axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//������
var noLanJie=false;
Axios.interceptors.request.use(function(config) {
	 // config.timeout=='49527'����ʾshowLonding
	
	if(config.timeout==49527||config.url=='https://ccdcapi.alipay.com/validateAndCacheCardInfo.json'||config.url=='/caipiaoshouye/index.php/home/index/historyChatRecord'||config.url=='/caipiaoshouye/index.php/home/index/getMatches'||config.url=='/caipiaoshouye/index.php/home/index/getMatchSPs'||config.url=='http://103.97.225.218:8099/userServer/autoResponseMessage'||config.url=='/caipiaoshouye/index.php/home/index/buddyPurchase'||config.url=='/caipiaoshouye/index.php/home/index/historyChatRecord'||config.url=='/caipiaoshouye/index.php/home/index/getUserMessageNotification'||config.url=='/caipiaoshouye/index.php/home/index/idCardValidate'||config.url=='/caipiaoshouye/index.php/home/index/checkBankCardNumber'){
		
		noLanJie=true;
	}else{
	  // MintUi.Indicator.open("");
	//������֮ǰ  ��ʾloadding
	}
	return config;	
})
Axios.interceptors.response.use(function(config) {
  //����Ӧ����֮������loadding
  // alert(typeof(config.data.content)=='string')
	 // alert(JSON.parse(config.data.content).message)
	// alert(config.data.content.message) 
	if(typeof(config.data.content)=='string'){
		let content=JSON.parse(config.data.content);
		
		if(content.code=='201010'){
			if(content.message){
				MintUi.Toast(content.message)
			}else{
				MintUi.Toast('��¼�ѹ��ڣ������µ�¼��')
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
Vue.component('navBar',NavBar); //ʹ�������nav-barͷ��
Vue.component('noMore',NoMore)//û�и�������
Vue.component('liniPage',LiniPage); //ȱʡҳ
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