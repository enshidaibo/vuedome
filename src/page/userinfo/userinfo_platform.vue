<template>
<div class="about_us">  
<nav-bar title="购彩政策"></nav-bar>
  <div class="platform">
       <img src="../../assets/userinfo/platform.png" alt="">
       <div class="bottomImg" v-if='flag' @click='goGoucai()'><img src="../../assets/userinfo/platform_goucai.png" alt=""></div>
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
		    flag:false
		}
	},
	
	created(){
		window.addEventListener('scroll', this.handleScroll, true);
	 },
	 mounted(){
		 
	 },
	methods:{
			handleScroll:function (){
				var scrolltop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
				  if(scrolltop>100){
					this.flag=true;
				}
				  else{
					this.flag=false;
				}
			},
			goGoucai:function(){
				this.$router.push({
					name:'goucai'
				}) 
			}
	}
}
</script>
<style scoped>
	.platform {
		margin-top: 2.25rem;
	}
	.platform img {
        width: 100%;
    }

     .bottomImg{
       position: fixed;
       left: 3%;
       right: 3%;
       bottom: 0.3rem
     }
	 
     .bottomImg img{
       width: 100%;
     }
</style> 