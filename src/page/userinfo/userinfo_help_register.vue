 <template>
<div class="helpcenterDom">  
<nav-bar title="常见问题"></nav-bar>
<div class="userinfo_help_center" >
    <div class="userinfo_help_center_content">
        	<div class="userinfo_help_center_problem">
        	<p class="help_center_info_title">注册问题</p>
        	<div class="help_center_info_cont">
        		<div class="tips"  v-for="(item,index) in tipsList"  @click="is_show(item.tit,item.cont)">
        			<p class="tils">{{item.tit}}</p><span class="sp2"></span>
        		</div>
        	</div>
        </div>
    </div>
</div>
</div>
</template>
<script>
	import {
		OverallData
	} from "../../js/common.js";
export default {
    data(){
        return {
            tipsList: [],
        }
    },
    
    created(){
        this.tipsList = [{status:false,tit:'如何注册成为'+OverallData().cpname+'票会员？',cont:'当您使用手机号获取验证码成功登录系统后，您将默认成为本平台会员。'},
        	{status:false,tit:'用户注册时的注意事项？',cont:'第一次使用新手机号获取验证码登录视为自动注册。'},
        	{status:false,tit:'登录时为什么要填写验证码？',cont:'为确保是您本人登录并且提高您账户的安全性，有效防止针对某个特定账号的暴力破解（即用特定程序进行不断登录尝试），使用验证码也是目前各网站同行的安全措施。'},
        ];
    },
    methods:{
        is_show: function(e,s){
           console.log(e)
           console.log(s)
           this.$router.push({
           	name:'userinfo_help_details',
               query:{
                   title:e,
                   content:s
               }
           }) 
       	
       },
    }
}
</script>
<style scoped>
@import "../../css/userinfo_setup.css";
</style> 