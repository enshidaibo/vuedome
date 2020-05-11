 <template>
    <div>  
      <div class="nomore" :style="{background:bg}">{{content}}</div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
             content:'没有更多数据了...',
			 bg:'rgba(0,0,0,0)'
            }
        },
        props:['title','bgcolor'],//声明接收父组件参数
        created(){
			this.bg=this.bgcolor
			if(this.title){
				this.content=this.title;
			}
         },
        methods:{
        }
    }
</script>
<style scoped>
    .nomore{
      background: rgba(0,0,0,0);
	  height: 2rem;
	  line-height: 2rem;
	  font-size: .7rem;
	  color:#9B9B9B;
	  width: 100%;
	  border: 0;
	  text-align: center;
    }
</style> 