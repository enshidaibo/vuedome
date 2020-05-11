import Vue from 'vue';
import Router from 'vue-router';
// 主页面
const Home = () => import('@/page/home.vue');
const Goucai = () => import('@/page/goucai.vue');
const Lottery = () => import('@/page/lottery.vue');
const scratch = () => import('@/page/scratch.vue');
const Task = () => import('@/page/task.vue');
const User = () => import('@/page/user.vue');
const tourist = () => import('@/page/tourist.vue');
// 主页面结束
//APP下载
const Download = () => import('@/page/download.vue');
//维护页面
const maintenance = () => import('@/page/maintenance.vue');
// 个人中心页面
const Generalize = () => import('../page/userinfo/generalize.vue');
const UserinfoData = () => import('../page/userinfo/userinfo_data.vue');
const userinfo_get_invitation = () => import('../page/userinfo/userinfo_get_invitation.vue');
const userinfo_input_invitation = () => import('../page/userinfo/userinfo_input_invitation.vue');
const safety_center = () => import('../page/userinfo/safety_center.vue');
const notice = () => import('../page/userinfo/notice.vue');
const information_news = () => import('../page/userinfo/information_news.vue');
const information_news_details = () => import('../page/userinfo/information_news_details.vue');
const information_bulletin = () => import('../page/userinfo/information_bulletin.vue');
const userinfo_platform = () => import('../page/userinfo/userinfo_platform.vue');
const userinfo_about_us = () => import('../page/userinfo/userinfo_about_us.vue');
const userinfo_account_details = () => import('../page/userinfo/userinfo_account_details.vue');
const userinfo_addbank = () => import('../page/userinfo/userinfo_addbank.vue');
const userinfo_customer_service = () => import('../page/userinfo/userinfo_customer_service.vue');
const userinfo_feedback = () => import('../page/userinfo/userinfo_feedback.vue');
const userinfo_hongbao_rule = () => import('../page/userinfo/userinfo_hongbao_rule.vue');
const userinfo_hongbao_betting = () => import('../page/userinfo/userinfo_hongbao_betting.vue');
const userinfo_help_center = () => import('../page/userinfo/userinfo_help_center.vue');
const userinfo_help_details = () => import('../page/userinfo/userinfo_help_details.vue');
const userinfo_help_drawing = () => import('../page/userinfo/userinfo_help_drawing.vue');
const userinfo_help_other = () => import('../page/userinfo/userinfo_help_other.vue');
const userinfo_help_prize = () => import('../page/userinfo/userinfo_help_prize.vue');
const userinfo_help_purchase = () => import('../page/userinfo/userinfo_help_purchase.vue');
const userinfo_help_recharge = () => import('../page/userinfo/userinfo_help_recharge.vue');
const userinfo_help_register = () => import('../page/userinfo/userinfo_help_register');
const userinfo_note_record = () => import('../page/userinfo/userinfo_note_record.vue');
const userinfo_recharge = () => import('../page/userinfo/userinfo_recharge.vue');
const userinfo_recharge_record = () => import('../page/userinfo/userinfo_recharge_record.vue');
const userinfo_recharge_weixin= ()=>import  ('../page/userinfo/userinfo_recharge_weixin.vue');
const userinfo_welfare_introduction= ()=>import  ('../page/userinfo/userinfo_welfare_introduction.vue');
const userinfo_recharge_weixin_kj= ()=>import  ('../page/userinfo/userinfo_recharge_weixin_kj.vue');
const userinfo_recharge_preferential= ()=>import  ('../page/userinfo/userinfo_recharge_preferential.vue');
const userinfo_recharge_weixin_success= ()=>import  ('../page/userinfo/userinfo_recharge_weixin_success.vue');
const userinfo_recharge_binding_verif= ()=>import  ('../page/userinfo/userinfo_recharge_binding_verif.vue');
const userinfo_recharge_payment_verif= ()=>import  ('../page/userinfo/userinfo_recharge_payment_verif.vue');
const userinfo_select_banklist = ()=>import  ('../page/userinfo/userinfo_select_banklist.vue');
const userinfo_setup = ()=>import ('../page/userinfo/userinfo_setup.vue');
const userinfo_sunburn_cashback = ()=>import ('../page/userinfo/userinfo_sunburn_cashback.vue');
const userinfo_task_invitation= ()=>import  ('../page/userinfo/userinfo_task_invitation.vue');
const userinfo_task_prize= ()=>import  ('../page/userinfo/userinfo_task_prize.vue');
const userinfo_task_real= ()=>import  ('../page/userinfo/userinfo_task_real.vue');
const userinfo_task_friend_real= ()=>import  ('../page/userinfo/userinfo_task_friend_real.vue');
const userinfo_task_sign= ()=>import  ('../page/userinfo/userinfo_task_sign.vue');
const userinfo_task_sunburn= ()=>import  ('../page/userinfo/userinfo_task_sunburn.vue');
const userinfo_task_friends =()=>import ('../page/userinfo/userinfo_task_friends.vue');
const userinfo_task_goucai =()=>import ('../page/userinfo/userinfo_task_goucai');
const userinfo_task_more= ()=>import  ('../page/userinfo/userinfo_task_more.vue');
const userinfo_task_novice= ()=>import  ('../page/userinfo/userinfo_task_novice.vue');
const userinfo_track_data= ()=>import  ('../page/userinfo/userinfo_track_data.vue');
const userinfo_track_record= ()=>import  ('../page/userinfo/userinfo_track_record.vue');
const userinfo_invite_friends= ()=>import  ('../page/userinfo/userinfo_invite_friends.vue');
const userinfo_updated_version = ()=>import ('../page/userinfo/userinfo_updated_version.vue');
// const userinfo_withdrawal_record = () => import('../page/userinfo/userinfo_withdrawal_record.vue');
const userinfo_withdrawal_success= ()=>import  ('../page/userinfo/userinfo_withdrawal_success.vue');
// const userinfo_withdrawal= ()=>import  ('../page/userinfo/userinfo_withdrawal.vue');
const withdrawal_help= ()=>import  ('../page/userinfo/withdrawal_help.vue');
const userinfo_wx_follow= ()=>import  ('../page/userinfo/userinfo_wx_follow.vue');
const explain = ()=>import ('../page/userinfo/explain.vue');
const materials =()=>import ('../page/userinfo/materials.vue');
const promotion_income =()=>import ('../page/userinfo/promotion_income.vue');
const myuser =()=>import ('../page/userinfo/myuser.vue');
const heimai_lobby =()=>import ('../page/userinfo/heimai_lobby.vue');
const progress_sort =()=>import ('../page/userinfo/hemai/progress_sort.vue');
const date_sort =()=>import ('../page/userinfo/hemai/date_sort.vue');
const select =()=>import ('../page/userinfo/hemai/select.vue');
const hemai_hot =()=>import ('../page/userinfo/hemai/hemai_hot.vue');
const scheme_detail_alone =()=>import ('../page/userinfo/scheme_detail_alone.vue');
const scheme_detail_alone_shuzicai =()=>import ('../page/userinfo/scheme_detail_alone_shuzicai');
const chipped_detail_alone_shuzicai =()=>import ('../page/userinfo/chipped_detail_alone_shuzicai');
const chipped_detail_alone =()=>import ('../page/userinfo/chipped_detail_alone.vue');
const home_scheme_detail_alone =()=>import ('../page/userinfo/home_scheme_detail_alone.vue');
const home_scheme_detail_alone_shuzicai =()=>import ('../page/userinfo/home_scheme_detail_alone_shuzicai');
//const home_chipped_detail_alone_shuzicai =()=>import ('../page/userinfo/home_chipped_detail_alone_shuzicai');
//const home_chipped_detail_alone =()=>import ('../page/userinfo/home_chipped_detail_alone.vue');
const hot_details =()=>import ('../page/userinfo/hemai/hot_details.vue');
const hadnot_made =()=>import ('../page/userinfo/hemai/hadnot_made.vue');
const had_made =()=>import ('../page/userinfo/hemai/had_made.vue');
const login =()=>import ('../page/userinfo/login.vue');
const online_service =()=>import ('../page/userinfo/online_service.vue');
const userinfo_wxbind =()=>import ('../page/userinfo/userinfo_wxbind.vue');
const userinfo_hongbao =()=>import ('../page/userinfo/userinfo_hongbao.vue');
const userinfo_guizexq =()=>import ('../page/userinfo/userinfo_guizexq.vue');
const ranking_img =()=>import ('../page/userinfo/ranking_img.vue');//首页中奖打开页面
//信息页面
const information =()=>import ('../page/userinfo/information/information.vue');
const information_system_list =()=>import ('../page/userinfo/information/information_system_list.vue');
const information_user_list =()=>import ('../page/userinfo/information/information_user_list.vue');
const information_friend_list =()=>import ('../page/userinfo/information/information_friend_list.vue');
const information_details =()=>import ('../page/userinfo/information/information_details.vue');
const information_details_tc =()=>import ('../page/userinfo/information/information_details_tc.vue');
const payment_options =()=>import ('../page/userinfo/payment_options.vue');
// 返现专题
const special_friends =()=>import ('../page/userinfo/special_friends.vue');
// 邀请好友专题
const betting_cashback =()=>import ('../page/userinfo/betting_cashback.vue');
// 个人中心页面END

// 开奖页面
const football_details =()=>import ('../page/lottery/football_details.vue');
const four_six_details =()=>import ('../page/lottery/four_six_details.vue');
const heighter_details =()=>import ('../page/lottery/heighter_details.vue');
// 开奖页面结束
// 数字彩页面
// 快彩
const goucai_gpc_ahks =()=>import ('../page/goucai/goucai_gpc_ahks.vue');
const goucai_gpc_ahkspay =()=>import ('../page/goucai/goucai_gpc_ahkspay.vue');
const goucai_gpc_bjks =()=>import ('../page/goucai/goucai_gpc_bjks.vue');
const goucai_gpc_bjkspay =()=>import ('../page/goucai/goucai_gpc_bjkspay.vue');
const goucai_gpc_bjk8 =()=>import ('../page/goucai/goucai_gpc_bjk8.vue');
const goucai_gpc_bjk8pay =()=>import ('../page/goucai/goucai_gpc_bjk8pay.vue');
const goucai_gpc_cqssc =()=>import ('../page/goucai/goucai_gpc_cqssc.vue');
const goucai_gpc_cqsscpay =()=>import ('../page/goucai/goucai_gpc_cqsscpay.vue');
const goucai_gpc_gd11x5 =()=>import ('../page/goucai/goucai_gpc_gd11x5.vue');
const goucai_gpc_gd11x5pay =()=>import ('../page/goucai/goucai_gpc_gd11x5pay.vue');
const goucai_gpc_gdkl10 =()=>import ('../page/goucai/goucai_gpc_gdkl10.vue');
const goucai_gpc_gdkl10pay =()=>import ('../page/goucai/goucai_gpc_gdkl10pay.vue');
const goucai_gpc_hbks =()=>import ('../page/goucai/goucai_gpc_hbks.vue');
const goucai_gpc_hbkspay =()=>import ('../page/goucai/goucai_gpc_hbkspay.vue');
const goucai_gpc_jsks =()=>import ('../page/goucai/goucai_gpc_jsks.vue');
const goucai_gpc_jskspay =()=>import ('../page/goucai/goucai_gpc_jskspay.vue');
const goucai_gpc_jx11x5 =()=>import ('../page/goucai/goucai_gpc_jx11x5.vue');
const goucai_gpc_jx11x5pay =()=>import ('../page/goucai/goucai_gpc_jx11x5pay.vue');
const goucai_gpc_sd11ydj =()=>import ('../page/goucai/goucai_gpc_sd11ydj.vue');
const goucai_gpc_sd11ydjpay =()=>import ('../page/goucai/goucai_gpc_sd11ydjpay.vue');
const goucai_gpc_tjkl10 =()=>import ('../page/goucai/goucai_gpc_tjkl10.vue');
const goucai_gpc_tjkl10pay =()=>import ('../page/goucai/goucai_gpc_tjkl10pay.vue');
const goucai_gpc_xjssc =()=>import ('../page/goucai/goucai_gpc_xjssc.vue');
const goucai_gpc_xjsscpay =()=>import ('../page/goucai/goucai_gpc_xjsscpay.vue');
// 合买
const goucai_hemai =()=>import ('../page/goucai/goucai_hemai.vue');
// 慢彩
const goucai_mc_dlt =()=>import ( '../page/goucai/goucai_mc_dlt.vue');
const goucai_mc_dltpay =()=>import ( '../page/goucai/goucai_mc_dltpay.vue');
const goucai_mc_fcsd =()=>import ( '../page/goucai/goucai_mc_fcsd.vue');
const goucai_mc_fcsdpay =()=>import ( '../page/goucai/goucai_mc_fcsdpay.vue');
const goucai_mc_pls =()=>import ( '../page/goucai/goucai_mc_pls.vue');
const goucai_mc_plspay =()=>import ( '../page/goucai/goucai_mc_plspay.vue');
const goucai_mc_plw =()=>import ( '../page/goucai/goucai_mc_plw.vue');
const goucai_mc_plwpay =()=>import ( '../page/goucai/goucai_mc_plwpay.vue');
const goucai_mc_qlc =()=>import ( '../page/goucai/goucai_mc_qlc.vue');
const goucai_mc_qlcpay =()=>import ( '../page/goucai/goucai_mc_qlcpay.vue');
const goucai_mc_ssq =()=>import ( '../page/goucai/goucai_mc_ssq.vue');
const goucai_mc_ssqpay =()=>import ( '../page/goucai/goucai_mc_ssqpay.vue');
// 数字彩页面结束
// 竞技彩页面
const goucai_jjc_bjdc =()=>import ( '../page/goucai/goucai_jjc_bjdc.vue');
// 北京单场子路由
const goucai_jjc_bjdc_bf =()=>import ( '../page/goucai/beijing/goucai_jjc_bjdc_bf.vue');
const goucai_jjc_bjdc_bqc =()=>import ( '../page/goucai/beijing/goucai_jjc_bjdc_bqc.vue');
const goucai_jjc_bjdc_rqspf =()=>import ( '../page/goucai/beijing/goucai_jjc_bjdc_rqspf.vue');
const goucai_jjc_bjdc_sxds =()=>import ( '../page/goucai/beijing/goucai_jjc_bjdc_sxds.vue');
const goucai_jjc_bjdc_zjqs =()=>import ( '../page/goucai/beijing/goucai_jjc_bjdc_zjqs.vue');
// 北京单场子路由结束
const goucai_jjc_bjdcpay =()=>import ( '../page/goucai/goucai_jjc_bjdcpay.vue');
const goucai_jjc_lq =()=>import ( '../page/goucai/goucai_jjc_lq.vue');
// 竞彩篮球子路由
const goucai_jjc_lq_sfx =()=>import ( '../page/goucai/lanqiu/goucai_jjc_lq_sfx.vue');
const goucai_jjc_lq_sf =()=>import ( '../page/goucai/lanqiu/goucai_jjc_lq_sf.vue');
const goucai_jjc_lq_rfsf =()=>import ( '../page/goucai/lanqiu/goucai_jjc_lq_rfsf.vue');
const goucai_jjc_lq_hhgg =()=>import ( '../page/goucai/lanqiu/goucai_jjc_lq_hhgg.vue');
const goucai_jjc_lq_dxf =()=>import ( '../page/goucai/lanqiu/goucai_jjc_lq_dxf.vue');
const goucai_jjc_lq_dggp =()=>import ( '../page/goucai/lanqiu/goucai_jjc_lq_dggp.vue');
// 竞彩篮球子路由结束
const goucai_jjc_lqpay =()=>import ( '../page/goucai/goucai_jjc_lqpay.vue');
const goucai_jjc_sc =()=>import ( '../page/goucai/goucai_jjc_sc.vue');
const goucai_jjc_scpay =()=>import ( '../page/goucai/goucai_jjc_scpay.vue');
const goucai_jjc_zq =()=>import ( '../page/goucai/goucai_jjc_zq.vue');
const goucai_jjc_zqpay =()=>import ( '../page/goucai/goucai_jjc_zqpay.vue');
// 竞彩足球子路由
const goucai_jjc_zq_bf =()=>import ( '../page/goucai/zuqiu/goucai_jjc_zq_bf.vue');
const goucai_jjc_zq_bqq =()=>import ( '../page/goucai/zuqiu/goucai_jjc_zq_bqq.vue');
const goucai_jjc_zq_dggp =()=>import ( '../page/goucai/zuqiu/goucai_jjc_zq_dggp.vue');
const goucai_jjc_zq_erxy =()=>import ( '../page/goucai/zuqiu/goucai_jjc_zq_erxy.vue');
const goucai_jjc_zq_hhgg =()=>import ( '../page/goucai/zuqiu/goucai_jjc_zq_hhgg.vue');
const goucai_jjc_zq_jqs =()=>import ( '../page/goucai/zuqiu/goucai_jjc_zq_jqs.vue');
const goucai_jjc_zq_rqspf =()=>import ( '../page/goucai/zuqiu/goucai_jjc_zq_rqspf.vue');
const goucai_jjc_zq_spf =()=>import ( '../page/goucai/zuqiu/goucai_jjc_zq_spf.vue');
const goucai_jjc_zq_yczs =()=>import ( '../page/goucai/zuqiu/goucai_jjc_zq_yczs.vue');
const goucai_success =()=>import ( '../page/goucai/goucai_success.vue');
const agreement =()=>import ( '../page/goucai/agreement.vue');
//竞猜四场
const goucai_jjc_zq_sc =()=>import ( '../page/goucai/sichang/goucai_jjc_zq_sc.vue');
const goucai_jjc_zq_lcb =()=>import ( '../page/goucai/sichang/goucai_jjc_zq_lcb.vue');
const goucai_jjc_zq_sfc =()=>import ( '../page/goucai/sichang/goucai_jjc_zq_sfc.vue');
const goucai_jjc_zq_rxjc =()=>import ( '../page/goucai/sichang/goucai_jjc_zq_rxjc.vue');


//玩法
const play = ()=>import ( '../page/goucai/play/play.vue');
//赚钱攻略
const userinfo_makemoney = ()=>import ( '../page/userinfo/userinfo_makemoney.vue');
const userinfo_recharge_order_pay = ()=>import ( '../page/userinfo/userinfo_recharge_order_pay.vue');

//推广收益
const myincome = ()=>import ( '../page/userinfo/myincome.vue');
const myincomeContent = ()=>import ( '../page/userinfo/myincomeContent.vue');
const todayearnings = ()=>import ( '../page/userinfo/todayearnings.vue');

//我的好友收益
const myfriend = ()=>import ( '../page/userinfo/myfriend.vue');
//收益详情
const myincomedetail = ()=>import ( '../page/userinfo/myincomedetail.vue');


// 竞彩足球子路由结束   userinfo_recharge_order_pay
Vue.use(Router)

export default new Router({
//   mode:'history' ,

  routes: [
    { path: '/', redirect: { name: 'home' }, component: Home }, //重定向
    { name: 'home', path: '/home', component: Home },//首页
	 { name: 'scratch', path: '/scratch', component: scratch },//刮刮乐
    { name:'goucai',path:'/goucai',component: Goucai}, //购彩
    { name: 'lottery',path:'/lottery',component:Lottery}, //开奖
    { name: 'task',path:'/task',component:Task}, //任务
    { name: 'user',path:'/user',component:User}, //个人中心
	{ name: 'tourist',path:'/tourist',component:tourist}, //游客模式
	{ name: 'download',path:'/download',component:Download},//APP下载
    { name: 'maintenance',path:'/maintenance',component:maintenance},//维护页面
    { name: 'generalize',path:'/userinfo/generalize',component:Generalize}, //推广中心	
	{ name: 'information_news',path:'/userinfo/information_news',component:information_news}, //新闻资讯
	{ name: 'information_news_details',path:'/userinfo/information_news_details',component:information_news_details}, //资讯详情
	{ name: 'information_bulletin',path:'/userinfo/information_bulletin',component:information_bulletin}, //公告信息
	{ name: 'notice',path:'/userinfo/notice',component:notice}, //公告列表
    { name: 'userinfo_data',path:'/userinfo/userinfo_data',component:UserinfoData}, //个人资料
	{ name: 'userinfo_get_invitation',path:'/userinfo/userinfo_get_invitation',component:userinfo_get_invitation }, //分享邀请码
	{ name: 'userinfo_input_invitation',path:'/userinfo/userinfo_input_invitation',component:userinfo_input_invitation }, //邀请码 userinfo_Invite_friends
	{ name: 'userinfo_invite_friends',path:'/userinfo/userinfo_invite_friends',component:userinfo_invite_friends }, //邀友充值 
	{ name: 'safety_center',path:'/userinfo/safety_center',component:safety_center},//安全中心
	{ name: 'userinfo_platform',path:'/userinfo/userinfo_platform',component:userinfo_platform}, //购彩相关
    { name: 'userinfo_about_us',path:'/userinfo/userinfo_about_us',component:userinfo_about_us}, //关于我们
    { name: 'userinfo_account_details',path:'/userinfo/userinfo_account_details',component:userinfo_account_details}, //账户明细
    { name: 'userinfo_addbank',path:'/userinfo/userinfo_addbank',component:userinfo_addbank}, //添加银行卡
    { name: 'userinfo_customer_service',path:'/userinfo/userinfo_customer_service',component:userinfo_customer_service}, //
	{ name: 'userinfo_feedback',path:'/userinfo/userinfo_feedback',component:userinfo_feedback}, //问题反馈-
    { name: 'userinfo_hongbao_rule',path:'/userinfo/userinfo_hongbao_rule',component:userinfo_hongbao_rule}, //红包规则-
    { name: 'userinfo_help_center',path:'/userinfo/userinfo_help_center',component:userinfo_help_center}, //帮助中心-
    { name: 'userinfo_help_details',path:'/userinfo/userinfo_help_details',component:userinfo_help_details}, //问题详情-
    { name: 'userinfo_help_drawing',path:'/userinfo/userinfo_help_drawing',component:userinfo_help_drawing}, //帮助中心-
    { name: 'userinfo_help_other',path:'/userinfo/userinfo_help_other',component:userinfo_help_other}, //帮助中心-其他相关问题
    { name: 'userinfo_help_purchase',path:'/userinfo/userinfo_help_purchase',component:userinfo_help_purchase}, //帮助中心-购彩相关问题
    { name: 'userinfo_help_prize',path:'/userinfo/userinfo_help_prize',component:userinfo_help_prize}, //帮助中心-中奖相关问题
    { name: 'userinfo_help_recharge',path:'/userinfo/userinfo_help_recharge',component:userinfo_help_recharge}, //帮助中心-充值相关问题
    { name: 'userinfo_help_register',path:'/userinfo/userinfo_help_register',component:userinfo_help_register}, //帮助中心-注册相关问题
    { name: 'userinfo_note_record',path:'/userinfo/userinfo_note_record',component:userinfo_note_record,meta: { keepAlive: true } }, //投注记录
    { name: 'userinfo_recharge',path:'/userinfo/userinfo_recharge',component:userinfo_recharge}, //充值
	{ name: 'userinfo_recharge_record',path:'/userinfo/userinfo_recharge_record',component:userinfo_recharge_record}, //充值记录
	{ name: 'userinfo_recharge_preferential',path:'/userinfo/userinfo_recharge_preferential',component:userinfo_recharge_preferential}, //充值优惠
	{ name: 'userinfo_recharge_weixin',path:'/userinfo/userinfo_recharge_weixin',component:userinfo_recharge_weixin }, //微信充值
	{ name: 'userinfo_recharge_weixin_kj',path:'/userinfo/userinfo_recharge_weixin_kj',component:userinfo_recharge_weixin_kj }, //微信充值
	{ name: 'userinfo_recharge_weixin_success',path:'/userinfo/userinfo_recharge_weixin_success',component:userinfo_recharge_weixin_success }, //微信充值成功
	{ name: 'userinfo_recharge_binding_verif',path:'/userinfo/userinfo_recharge_binding_verif',component:userinfo_recharge_binding_verif }, //绑定手机号
	{ name: 'userinfo_recharge_payment_verif',path:'/userinfo/userinfo_recharge_payment_verif',component:userinfo_recharge_payment_verif }, //支付验证
    { name: 'userinfo_select_banklist',path:'/userinfo/userinfo_select_banklist',component:userinfo_select_banklist}, //选择银行卡
    { name: 'userinfo_setup',path:'/userinfo/userinfo_setup',component:userinfo_setup}, //设置
	{ name: 'userinfo_wxbind',path:'/userinfo/userinfo_wxbind',component:userinfo_wxbind}, //微信绑定
	{ name: 'userinfo_hongbao',path:'/userinfo/userinfo_hongbao',component:userinfo_hongbao}, //红包详情
	{ name: 'userinfo_hongbao_betting',path:'/userinfo/userinfo_hongbao_betting',component:userinfo_hongbao_betting}, //红包投注
	{ name: 'userinfo_welfare_introduction',path:'/userinfo/userinfo_welfare_introduction',component:userinfo_welfare_introduction}, //福利说明
    { name: 'userinfo_task_invitation',path:'/userinfo/userinfo_task_invitation',component:userinfo_task_invitation}, //任务--邀请好友
    { name: 'userinfo_task_prize',path:'/userinfo/userinfo_task_prize',component:userinfo_task_prize}, //任务--每日抽奖
    { name: 'userinfo_task_real',path:'/userinfo/userinfo_task_real',component:userinfo_task_real}, //任务--实名认证
    { name: 'userinfo_task_friend_real',path:'/userinfo/userinfo_task_friend_real',component:userinfo_task_friend_real}, //任务--实名认证
    { name: 'userinfo_task_sign',path:'/userinfo/userinfo_task_sign',component:userinfo_task_sign}, //任务--每日签到
	{ name: 'userinfo_task_goucai',path:'/userinfo/userinfo_task_goucai',component:userinfo_task_goucai}, //任务--好友购彩
	{ name: 'userinfo_task_friends',path:'/userinfo/userinfo_task_friends',component:userinfo_task_friends}, //任务--好友充值
	{ name: 'userinfo_guizexq',path:'/userinfo/userinfo_guizexq',component:userinfo_guizexq}, //任务--任务规则页面
    { name: 'userinfo_task_sunburn',path:'/userinfo/userinfo_task_sunburn',component:userinfo_task_sunburn}, //任务--我的晒单
	{ name: 'userinfo_sunburn_cashback',path:'/userinfo/userinfo_sunburn_cashback',component:userinfo_sunburn_cashback}, //晒单返现
	{ name: 'userinfo_task_more',path:'/userinfo/userinfo_task_more',component:userinfo_task_more}, //任务--我的晒单
	{ name: 'userinfo_task_novice',path:'/userinfo/userinfo_task_novice',component:userinfo_task_novice}, //任务--新手任务
    { name: 'userinfo_track_data',path:'/userinfo/userinfo_track_data',component:userinfo_track_data}, //追号详情
    { name: 'userinfo_track_record',path:'/userinfo/userinfo_track_record',component:userinfo_track_record}, //追号记录
    { name: 'userinfo_updated_version',path:'/userinfo/userinfo_updated_version',component:userinfo_updated_version}, //版本
	// { name: 'userinfo_withdrawal_record',path:'/userinfo/userinfo_withdrawal_record',component:userinfo_withdrawal_record}, //提现记录
    { name: 'userinfo_withdrawal_success',path:'/userinfo/userinfo_withdrawal_success',component:userinfo_withdrawal_success}, //提现详情
	{ name: 'payment_options',path:'/userinfo/payment_options',component:payment_options}, //充值列表页
	{ name: 'betting_cashback',path:'/userinfo/betting_cashback',component:betting_cashback}, //投注返现专题页
	{ name: 'special_friends',path:'/userinfo/special_friends',component:special_friends}, //邀请好友专题页

	

	
    // { name: 'userinfo_withdrawal',path:'/userinfo/userinfo_withdrawal',component:userinfo_withdrawal}, //提现
	// { name: 'userinfo_withdrawal',path:'/userinfo/userinfo_withdrawal',component:userinfo_withdrawal}, //提现帮助
	// { name: 'userinfo_hongbao_rule',path:'/userinfo/userinfo_hongbao_rule',component:userinfo_hongbao_rule}, //红包规则
	{ name: 'online_service',path:'/userinfo/online_service',component:online_service },//在线客服
    { name: 'withdrawal_help',path:'/userinfo/withdrawal_help',component:withdrawal_help}, //关注公众号
    { name: 'userinfo_wx_follow',path:'/userinfo/userinfo_wx_follow',component:userinfo_wx_follow },//关注公众号
	{ name: 'information',path:'/userinfo/information/information',component:information },//信息
	{ name: 'information_system_list',path:'/userinfo/information/information_system_list',component:information_system_list },//系统信息列表
	{ name: 'information_user_list',path:'/userinfo/information/information_user_list',component:information_user_list },//用户信息列表
	{ name: 'information_friend_list',path:'/userinfo/information/information_friend_list',component:information_friend_list },//用户信息列表
	{ name: 'information_details',path:'/userinfo/information/information_details',component:information_details },//信息详情
	{ name: 'information_details_tc',path:'/userinfo/information/information_details_tc',component:information_details_tc },//充值提现详情 
	{ name: 'userinfo_recharge_order_pay',path:'/userinfo/userinfo_recharge_order_pay',component:userinfo_recharge_order_pay },//充值订单支付
	{ name: 'ranking_img',path:'/userinfo/ranking_img',component:ranking_img },//中奖图片展示详情
		{ name: 'explain',path:'/userinfo/explain',component:explain}, //盈利说明
		{ name: 'materials',path:'/userinfo/materials',component:materials}, //推广资料
		{ name: 'promotion_income',path:'/userinfo/promotion_income',component:promotion_income}, //推广收益
		{ name: 'myuser',path:'/userinfo/myuser',component:myuser}, //我的用户
		{ name: 'select',path:'/userinfo/hemai/select',component:select}, //筛选彩种
		{ name: 'hemai_hot',path:'/userinfo/hemai/hemai_hot',component:hemai_hot}, //合买红人
		{ 
            name: 'heimai_lobby',
            path:'/userinfo/heimai_lobby',
            component:heimai_lobby,
            redirect:{name:'progress_sort'},
            children: [
        		{
                  path: 'progress_sort',
                  name: 'progress_sort',
                  component: progress_sort//合买大厅里进度排序
                },
                {
                  path: 'date_sort',
                  name: 'date_sort',
                  component: date_sort//合买大厅里时间排序
                }
            ],
		}, //合买大厅
        { 
            name: 'myincome',
            path:'/userinfo/myincome',
            component:myincome,
            redirect:{name:'todayearnings'},
            children: [
                {
                  path: 'todayearnings',
                  name: 'todayearnings',
                  component: todayearnings//今日开奖
                },
                {
                  path: 'myincomeContent',
                  name: 'myincomeContent',
                  component: myincomeContent//累计收益
                },
                
            ],
        }, //推广收益

        { name: 'myfriend',path:'/userinfo/myfriend',component:myfriend}, ////我的好友收益

        { name: 'myincomedetail',path:'/userinfo/myincomedetail',component:myincomedetail}, ////好友收益详情



		{ name: 'scheme_detail_alone_shuzicai',path:'/userinfo/scheme_detail_alone_shuzicai',component:scheme_detail_alone_shuzicai}, //自购数字彩方案详情
		{ name: 'scheme_detail_alone',path:'/userinfo/scheme_detail_alone',component:scheme_detail_alone}, //自购竞技彩方案详情
		{ name: 'chipped_detail_alone_shuzicai',path:'/userinfo/chipped_detail_alone_shuzicai',component:chipped_detail_alone_shuzicai}, //合买数字彩方案详情
		{ name: 'chipped_detail_alone',path:'/userinfo/chipped_detail_alone',component:chipped_detail_alone}, //合买竞技彩方案详情
		{ name: 'home_scheme_detail_alone_shuzicai',path:'/userinfo/home_scheme_detail_alone_shuzicai',component:home_scheme_detail_alone_shuzicai}, //首页自购数字彩方案详情
		{ name: 'home_scheme_detail_alone',path:'/userinfo/home_scheme_detail_alone',component:home_scheme_detail_alone}, //首页自购竞技彩方案详情
		//{ name: 'home_chipped_detail_alone_shuzicai',path:'/userinfo/home_chipped_detail_alone_shuzicai',component:home_chipped_detail_alone_shuzicai}, //首页合买数字彩方案详情
		//{ name: 'home_chipped_detail_alone',path:'/userinfo/home_chipped_detail_alone',component:home_chipped_detail_alone}, //首页合买竞技彩方案详情
		{ name: 'hot_details',path:'/userinfo/hemai/hot_details',component:hot_details}, //红人详情
		{ name: 'hadnot_made',path:'/userinfo/hemai/hadnot_made',component:hadnot_made}, //定制我的用户
		{ name: 'had_made',path:'/userinfo/hemai/had_made',component:had_made}, //我定制的用户
		{ name: 'login',path:'/userinfo/login',component:login}, //登录
		{ name: 'football_details',path:'/lottery/football_details',component:football_details}, //足球 篮球 北京单场开奖详情
		{ name: 'four_six_details',path:'/lottery/four_six_details',component:four_six_details}, //四场 六场 九场 胜负彩开奖详情
		{ name: 'heighter_details',path:'/lottery/heighter_details',component:heighter_details}, //数字彩开奖详情
		{ name: 'goucai_gpc_ahks',path:'/goucai/goucai_gpc_ahks',component:goucai_gpc_ahks}, //安徽快三
		{ name: 'goucai_gpc_ahkspay',path:'/goucai/goucai_gpc_ahkspay',component:goucai_gpc_ahkspay}, //安徽快三付款
		{ name: 'goucai_gpc_bjks',path:'/goucai/goucai_gpc_bjks',component:goucai_gpc_bjks}, //北京快三
		{ name: 'goucai_gpc_bjkspay',path:'/goucai/goucai_gpc_bjkspay',component:goucai_gpc_bjkspay}, //北京快三付款
		{ name: 'goucai_gpc_bjk8',path:'/goucai/goucai_gpc_bjk8',component:goucai_gpc_bjk8}, //北京快乐8
		{ name: 'goucai_gpc_bjk8pay',path:'/goucai/goucai_gpc_bjk8pay',component:goucai_gpc_bjk8pay}, //北京快乐8付款
		{ name: 'goucai_gpc_cqssc',path:'/goucai/goucai_gpc_cqssc',component:goucai_gpc_cqssc}, //重庆时时彩
		{ name: 'goucai_gpc_cqsscpay',path:'/goucai/goucai_gpc_cqsscpay',component:goucai_gpc_cqsscpay}, //重庆时时彩付款
		{ name: 'goucai_gpc_gd11x5',path:'/goucai/goucai_gpc_gd11x5',component:goucai_gpc_gd11x5}, //广东11选5
		{ name: 'goucai_gpc_gd11x5pay',path:'/goucai/goucai_gpc_gd11x5pay',component:goucai_gpc_gd11x5pay}, //广东11选5付款
		{ name: 'goucai_gpc_gdkl10',path:'/goucai/goucai_gpc_gdkl10',component:goucai_gpc_gdkl10}, //广东快乐10分
		{ name: 'goucai_gpc_gdkl10pay',path:'/goucai/goucai_gpc_gdkl10pay',component:goucai_gpc_gdkl10pay}, //广东快乐10分付款
		{ name: 'goucai_gpc_hbks',path:'/goucai/goucai_gpc_hbks',component:goucai_gpc_hbks}, //湖北快三
		{ name: 'goucai_gpc_hbkspay',path:'/goucai/goucai_gpc_hbkspay',component:goucai_gpc_hbkspay}, //湖北快三付款
		{ name: 'goucai_gpc_jsks',path:'/goucai/goucai_gpc_jsks',component:goucai_gpc_jsks}, //江苏快三
		{ name: 'goucai_gpc_jskspay',path:'/goucai/goucai_gpc_jskspay',component:goucai_gpc_jskspay}, //江苏快三付款
		{ name: 'goucai_gpc_jx11x5',path:'/goucai/goucai_gpc_jx11x5',component:goucai_gpc_jx11x5}, //江西11选5
		{ name: 'goucai_gpc_jx11x5pay',path:'/goucai/goucai_gpc_jx11x5pay',component:goucai_gpc_jx11x5pay}, //江西11选5付款
		{ name: 'goucai_gpc_sd11ydj',path:'/goucai/goucai_gpc_sd11ydj',component:goucai_gpc_sd11ydj}, //山东11运夺金
		{ name: 'goucai_gpc_sd11ydjpay',path:'/goucai/goucai_gpc_sd11ydjpay',component:goucai_gpc_sd11ydjpay}, //山东11运夺金付款
		{ name: 'goucai_gpc_tjkl10',path:'/goucai/goucai_gpc_tjkl10',component:goucai_gpc_tjkl10}, //天津快乐10分
		{ name: 'goucai_gpc_tjkl10pay',path:'/goucai/goucai_gpc_tjkl10pay',component:goucai_gpc_tjkl10pay}, //天津快乐10分付款
		{ name: 'goucai_gpc_xjssc',path:'/goucai/goucai_gpc_xjssc',component:goucai_gpc_xjssc}, //新疆时时彩
		{ name: 'goucai_gpc_xjsscpay',path:'/goucai/goucai_gpc_xjsscpay',component:goucai_gpc_xjsscpay}, //新疆时时彩付款
		{ name: 'goucai_hemai',path:'/goucai/goucai_hemai',component:goucai_hemai}, //发起合买
		{ name: 'goucai_mc_dlt',path:'/goucai/goucai_mc_dlt',component:goucai_mc_dlt}, //大乐透
		{ name: 'goucai_mc_dltpay',path:'/goucai/goucai_mc_dltpay',component:goucai_mc_dltpay}, //大乐透付款
		{ name: 'goucai_mc_fcsd',path:'/goucai/goucai_mc_fcsd',component:goucai_mc_fcsd}, //福彩3D
		{ name: 'goucai_mc_fcsdpay',path:'/goucai/goucai_mc_fcsdpay',component:goucai_mc_fcsdpay}, //福彩3D付款
		{ name: 'goucai_mc_pls',path:'/goucai/goucai_mc_pls',component:goucai_mc_pls}, //排列三
		{ name: 'goucai_mc_plspay',path:'/goucai/goucai_mc_plspay',component:goucai_mc_plspay}, //排列三付款
		{ name: 'goucai_mc_plw',path:'/goucai/goucai_mc_plw',component:goucai_mc_plw}, //排列五
		{ name: 'goucai_mc_plwpay',path:'/goucai/goucai_mc_plwpay',component:goucai_mc_plwpay}, //排列五付款
		{ name: 'goucai_mc_qlc',path:'/goucai/goucai_mc_qlc',component:goucai_mc_qlc}, //七乐彩
		{ name: 'goucai_mc_qlcpay',path:'/goucai/goucai_mc_qlcpay',component:goucai_mc_qlcpay}, //七乐彩付款
		{ name: 'goucai_mc_ssq',path:'/goucai/goucai_mc_ssq',component:goucai_mc_ssq}, //双色球
		{ name: 'goucai_mc_ssqpay',path:'/goucai/goucai_mc_ssqpay',component:goucai_mc_ssqpay}, //双色球付款
	  { name: 'goucai_jjc_bjdc',path:'/goucai/goucai_jjc_bjdc',component:goucai_jjc_bjdc,redirect:{name:'goucai_jjc_bjdc_rqspf'},children: [
	  	{
	  			path: 'goucai_jjc_bjdc_rqspf',
	  			name: 'goucai_jjc_bjdc_rqspf',
	  			component: goucai_jjc_bjdc_rqspf//北京单场-让球胜平负
	  		},
	  		{
	  			path: 'goucai_jjc_bjdc_zjqs',
	  			name: 'goucai_jjc_bjdc_zjqs',
	  			component: goucai_jjc_bjdc_zjqs//北京单场-总进球数
	  		},
				{
					path: 'goucai_jjc_bjdc_bf',
					name: 'goucai_jjc_bjdc_bf',
					component: goucai_jjc_bjdc_bf//北京单场-比分
				},
				{
					path: 'goucai_jjc_bjdc_bqc',
					name: 'goucai_jjc_bjdc_bqc',
					component: goucai_jjc_bjdc_bqc//北京单场-半全场
				},
				{
					path: 'goucai_jjc_bjdc_sxds',
					name: 'goucai_jjc_bjdc_sxds',
					component: goucai_jjc_bjdc_sxds//北京单场-上下单双
				}
	  	],
	  	}, //北京单场
			{ name: 'goucai_jjc_lq',path:'/goucai/goucai_jjc_lq',component:goucai_jjc_lq,redirect:{name:'goucai_jjc_lq_rfsf'},children: [
				{
						path: 'goucai_jjc_lq_rfsf',
						name: 'goucai_jjc_lq_rfsf',
						component: goucai_jjc_lq_rfsf//竞彩篮球-让分胜负
					},
					{
						path: 'goucai_jjc_lq_sf',
						name: 'goucai_jjc_lq_sf',
						component: goucai_jjc_lq_sf//竞彩篮球-胜负
					},
					{
						path: 'goucai_jjc_lq_sfx',
						name: 'goucai_jjc_lq_sfx',
						component: goucai_jjc_lq_sfx//竞彩篮球-胜分差
					},
					{
						path: 'goucai_jjc_lq_hhgg',
						name: 'goucai_jjc_lq_hhgg',
						component: goucai_jjc_lq_hhgg//竞彩篮球-混合过关
					},
					{
						path: 'goucai_jjc_lq_dxf',
						name: 'goucai_jjc_lq_dxf',
						component: goucai_jjc_lq_dxf//竞彩篮球-大小分
					},
					{
						path: 'goucai_jjc_lq_dggp',
						name: 'goucai_jjc_lq_dggp',
						component: goucai_jjc_lq_dggp//竞彩篮球-单关
					}
				],
				}, //竞彩篮球
				{ name: 'goucai_jjc_zq',path:'/goucai/goucai_jjc_zq',component:goucai_jjc_zq,redirect:{name:'goucai_jjc_zq_rqspf'},meta: { keepAlive: false },children: [
					{
							path: 'goucai_jjc_zq_rqspf',
							name: 'goucai_jjc_zq_rqspf',
							component: goucai_jjc_zq_rqspf,//竞彩足球-让球胜平负
							meta: { keepAlive: true }
						},
						{
							path: 'goucai_jjc_zq_bf',
							name: 'goucai_jjc_zq_bf',
							component: goucai_jjc_zq_bf//竞彩足球-比分
						},
						{
							path: 'goucai_jjc_zq_bqq',
							name: 'goucai_jjc_zq_bqq',
							component: goucai_jjc_zq_bqq//竞彩足球-半全场
						},
						{
							path: 'goucai_jjc_zq_hhgg',
							name: 'goucai_jjc_zq_hhgg',
							component: goucai_jjc_zq_hhgg//竞彩足球-混合过关
						},
						{
							path: 'goucai_jjc_zq_erxy',
							name: 'goucai_jjc_zq_erxy',
							component: goucai_jjc_zq_erxy//竞彩足球-二选一
						},
						{
							path: 'goucai_jjc_zq_dggp',
							name: 'goucai_jjc_zq_dggp',
							component: goucai_jjc_zq_dggp//竞彩足球-单关
						},
						{
							path: 'goucai_jjc_zq_jqs',
							name: 'goucai_jjc_zq_jqs',
							component: goucai_jjc_zq_jqs//竞彩足球-进球数
						},
						{
							path: 'goucai_jjc_zq_spf',
							name: 'goucai_jjc_zq_spf',
							component: goucai_jjc_zq_spf//竞彩足球-胜平负
						},
						{
							path: 'goucai_jjc_zq_yczs',
							name: 'goucai_jjc_zq_yczs',
							component: goucai_jjc_zq_yczs//竞彩足球-一场制胜
						},
					],
					}, //竞彩足球
					{ name: 'goucai_jjc_zqpay',path:'/goucai/goucai_jjc_zqpay',component:goucai_jjc_zqpay},  //竞彩足球付款
					{ name: 'goucai_jjc_lqpay',path:'/goucai/goucai_jjc_lqpay',component:goucai_jjc_lqpay},  //竞彩蓝球付款
					{ name: 'goucai_jjc_bjdcpay',path:'/goucai/goucai_jjc_bjdcpay',component:goucai_jjc_bjdcpay},  //北京单场付款
					{ name: 'goucai_jjc_sc',path:'/goucai/goucai_jjc_sc',component:goucai_jjc_sc,redirect:{name:'goucai_jjc_zq_sc'},children: [
						{
							path: 'goucai_jjc_zq_sc',
							name: 'goucai_jjc_zq_sc',
							component: goucai_jjc_zq_sc //四场进球
						},
						{
							path: 'goucai_jjc_zq_lcb',
							name: 'goucai_jjc_zq_lcb',
							component: goucai_jjc_zq_lcb //六场半全场
						},
						{
							path: 'goucai_jjc_zq_sfc',
							name: 'goucai_jjc_zq_sfc',
							component: goucai_jjc_zq_sfc //胜负彩
						},
						{
							path: 'goucai_jjc_zq_rxjc',
							name: 'goucai_jjc_zq_rxjc',
							component: goucai_jjc_zq_rxjc //任选九场
						},
					]},  //四场进球
					{ name: 'goucai_jjc_scpay',path:'/goucai/goucai_jjc_scpay',component:goucai_jjc_scpay},  //四场进球付款
					{ name: 'goucai_success',path:'/goucai/goucai_success',component:goucai_success},  //购彩成功
					{ name: 'agreement',path:'/goucai/agreement',component:agreement},  //用户协议
                    { name: 'play',path:'/goucai/play',component:play},  //玩法
                    { name: 'userinfo_makemoney',path:'/userinfo/userinfo_makemoney',component:userinfo_makemoney},  //赚钱攻略


  ]      
})
// ,
//   mode:'history' 