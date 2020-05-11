<template>
<div class="version">  
<nav-bar title="版本"></nav-bar>

<div class="header">
    <div class="content">
        <img src="../../assets/userinfo/tu13.png" alt="">
        <span>{{cpname}}版本全面升级</span>
        <span>随时随地-轻松购彩</span>
    </div>
</div>
<div class="lists">
    <div class="list_math">
        <img src="../../assets/userinfo/tu9.png" alt="">
        <span>新版本增加了微信快捷登录的功能，您可一键绑定微信，随时随地分享二维码到微信朋友圈。</span>
    </div>
    <div class="list_math">
        <img src="../../assets/userinfo/tu10.png" alt="">
        <span>下载后，您无需存款也能通过分享，推荐好友领取红包！</span>
    </div>
   <!-- <div class="list_math">
        <img src="../../assets/userinfo/tu11.png" alt="">
        <span>购彩晒单后可领取奖励红包，每日免费五次抽奖机会，赢取500元红包大奖。</span>
    </div> -->
    <div class="list_math">
        <img src="../../assets/userinfo/tu11.png" alt="">
        <span>每日签到，玩转摇一摇，每日送零钱让你精彩HIGH不停，从此玩转彩票，赢取大奖不是梦！即刻下载，体验一下吧！</span>
    </div>
</div>
<input type="button" class="button" value="APP下载" @click="xiazai()">
</div>
</template>
<script>
		import {
		OverallData,getCookie
	} from "../../js/common.js";
export default {
    data(){
        return {
       cpname:OverallData().cpname,
        }
    },
    
    created(){
     },
    methods:{
    xiazai:function(){
    	var newData = getCookie('newData');
    	var link = OverallData().download
    	if(newData){
    	    window.open('http://xz.facaime.com?_userId='+newData.sportId);
    	}else{
    	    window.open('http://xz.facaime.com');
    	}
    },
    }
}
</script>
<style scoped>
@import "../../css/userinfo_updated_version.css";
</style> 