 <template>
<div > 

<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="bake()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title">
				方案详情
			</div>
			
		</header>
 <div class="content_img" id="vue_det">
            <img :src="url" alt="暂无">
   </div>
 </div>
</div>
</template>
<script>
export default {
    data(){
        return {
		url:''
        }
    }, 
    created(){
		this.url=this.$route.query.url;
	
            },
    methods:{
		 bake:function () {
		this.$router.go(-1); //根据浏览器记录返回上一次
		 }
    }
}
</script>
<style scoped>
    .content_img{

          width: 100%;
          height: auto;
          padding: 1rem 1rem;
        }
            .content_img img{
              width: 100%;
              height: auto;
            }
</style> 
