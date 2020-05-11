 <template>


    <div>  
<header class="aui-bar aui-bar-nav">
            <div class="aui-pull-left aui-btn" @click="bake()" tapmode>
                <span class="aui-iconfont aui-icon-left"></span>
            </div>
            <div class="aui-title">{{title}}</div>
  </header>
    </div>
</template>
<script>

    export default {
        data(){
            return {
             
            }
        },
        props:['title'],//声明接收父组件参数
        created(){
         },
        methods:{
            bake:function () {
           this.$router.go(-1); //根据浏览器记录返回上一次
            }
        }
    }
</script>
<style scoped>
  header{
  position: fixed !important;
  }
  .aui-bar-nav{
    background: #fff;
  }
  .aui-title{
    color: #333 !important;
  }
    .active{
      color:#5fa3eb;
    }
    .aui-icon-left{
      color: #333 !important;
    }
</style> 