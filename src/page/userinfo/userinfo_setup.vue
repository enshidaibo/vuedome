 <template>
<div class="setupDom">
<nav-bar title="设置"></nav-bar>
<div class="userinfo_setup" id="setup">
    <p class="userinfo_setup_btn userinfo_setup_help" @click="helpCenter()"><span>常见问题</span><span></span></p>
    <p class="userinfo_setup_btn userinfo_setup_wx" @click="onlineService()"><span>在线客服</span><span></span></p>
	<p class="userinfo_setup_btn userinfo_setup_feed" @click="feedback()"><span>意见反馈</span><span> </span></p>
    <p class="userinfo_setup_btn userinfo_setup_new" @click="updatedVersion()"><span>客户端下载</span><span></span></p>
    <!-- <span class="version">当前版本：{{appVersion}}</span><span class="userinfo_setup_red"></span> -->
    <!-- <p class="userinfo_setup_btn userinfo_setup_share" @click="openfx()"><span>好友分享</span><span> </span></p> -->
    <!-- <p class="userinfo_setup_btn userinfo_setup_share" @click="openfx()"><span>清除缓存</span><span> </span></p> -->
	<p class="userinfo_setup_btn userinfo_platform" @click="platform()"><span>购彩政策</span><span> </span></p>
    <p class="userinfo_setup_btn userinfo_setup_us" @click="aboutUs()"><span>关于我们</span><span> </span></p>
    <p class="userinfo_setup_ebg" @click="dropout()">  <span class="userinfo_login_out">退出登录</span></p>
</div>

<!-- <div v-if="flag">
    <div class="box"></div>
    <div class="main">
        <img src="../../assets/userinfo/gx-header.png" alt="" class="img1">

            <h3>发现新版本</h3>
            <div class="content">
            <div><img src="../../assets/userinfo/gx-lx.png" alt=""><p >全新改版给你不一样的体验</p></div>
            <div><img src="../../assets/userinfo/gx-lx.png" alt=""><p >掌握全新方式</p></div>
            <div><img src="../../assets/userinfo/gx-lx.png" alt=""><p >最新版本0.0.32</p></div>
            <button>立即更新0.0.32</button>
        </div>
        <div class="box2">
            <img src="../../assets/userinfo/gx-close.png" alt="" class="img2" @click="close()">
        </div>
    </div>
</div> -->

</div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import {OverallData,getCookie,setCookie,setSession } from "../../js/common.js"
export default {
    data(){
        return {
            appVersion: '1.0.0',
            zxappVersion:[],
            flag:false,
        }
    },

    created(){
    },
    methods:{
        close:function(){
            this.flag=!this.flag
        },
        helpCenter: function(){
            this.$router.push({
            	name:'userinfo_help_center'
            })
        },
        openfx: function(){
            this.$router.push({
            	name:'special_friends'
            })
        },
		feedback: function(){
		    this.$router.push({
		    	name:'userinfo_feedback'
		    })
		},
        updatedVersion: function(){
           // this.flag=!this.flag
            this.$router.push({
           	name:'userinfo_updated_version'
           })
        },
        aboutUs: function(){
            this.$router.push({
            	name:'userinfo_about_us'
            })
        },
		//购彩相关
		platform: function(){
		    this.$router.push({
		    	name:'userinfo_platform'
		    })
		},
        customerService: function(){
            this.$router.push({
            	name:'userinfo_customer_service'
            })
        },
		onlineService: function(){
			this.$router.push({
				name:'online_service'
			})
		},
        wxFollow: function(){
            this.$router.push({
            	name:'userinfo_wx_follow'
            })
        },
     dropout: function(){
        MessageBox({
            title: '提示',
            message: '确认是否退出?',
            showCancelButton: true
        });
        MessageBox.confirm('确定执行此操作?').then(action => {
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
			// data = this.Encrypt({...data});
			var datas = this.Qs.stringify({
				data:userId
			}, {
				allowDots: true
			});

			this.$ajax.post('/caipiaoshouye/index.php/home/index/SignOutToken',
					datas
				)
				.then(res => {
				})
				.catch(err => {

				})
			// return false
		   setSession('homeTc','1');
           setCookie('newData', '','0-S');
		   setCookie('logok', '','0-S');
    	   // sessionStorage.removeItem('logok');
    	   sessionStorage.removeItem('logokduke');
            sessionStorage.removeItem('userindata');
		    sessionStorage.removeItem('makeMon');
    	   this.$router.replace({
    		   name:'login'
    	   })
            alert("退出成功！");
        });
    },
    }
}
</script>
<style scoped>
@import "../../css/userinfo_setup.css";

.box{
    background: #000 ;
    opacity: 0.5;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}

.main {
    position: fixed;
    top: 6.1rem;
    left: 2.95rem;
    color: #000;
}

img {
    width: 0.3rem;
    height: 0.4rem;
    display: inline-block;
}
.img1 {
    width: 12.5rem;
    height: 8.825rem;
    margin: 0 auto;
}

 h3 {
    font-size: 0.8rem;
    color: #E45869;
    background: #fff;
    text-align: center;
    padding-bottom: 0.375rem;
}

.content {
    background: #fff;
    color: #666;
    padding-left: 1.875rem ;
    border-radius: 0 0 0.5rem 0.5rem;
}

.content img {
    margin:0 0.325rem 0 0.3rem;
}
.content p {
    display: inline-block;
    font-size: 0.65rem;
}

.content button {
    border-radius: 1rem;
    background: #03A9F4;
    color: #fff;
    font-size: 0.75rem;
    height: 2rem;
    width: 9rem;
    margin: 1.4rem 0 1.3rem 0;
}

.box2 {
    width: 12.5rem;
    text-align: center;
    margin-top: 1.3rem;
}
.img2 {
    width: 1.25rem;
    height: 1.25rem;
}
</style>
