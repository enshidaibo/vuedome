 <template>
    <div>  
      <div class="londNull" :style="{height:heighty,width:widthx}" >
		  <img v-if="imageType=='event'" src="../assets/queshenga.png">
		  <img v-else src="../assets/queshengb.png">
      	 <p class="datastent">{{content}}</p>
      
      	<p v-if="goText" @click="goucaiopen()" class="btntext">{{texts}}</p>
      </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
             content:'暂无数据...',
			 imageType:'event',
			 texts:'立即投注',
			 heighty:'100vh',
			 widthx:'100vw',
			
            }
        },
        props:['prompt','tpyes','goText','zheight','zwidth','bg'],//声明接收父组件参数
        created(){
			this.imageType=this.tpyes;//event赛事  record记录
			this.content=this.prompt;
			this.texts=this.goText;
			if(this.zheight){
				this.heighty=this.zheight;
			}
			if(this.zwidth){
				this.widthx=this.zwidth;
			}
			
         },
        methods:{
			goucaiopen:function(){
				this.$emit('tonewpage'); //触发tonewpage方法
			}
        }
    }
</script>
<style scoped>
    .londNull {
    	width: 100vw;
    	height: 100vh;
    	box-sizing: border-box;
    	padding-top: 2.25rem;
		background: #F4F4F4;
    }
    
    .londNull img {
    	width: 7.5rem;
    	height: 7.5rem;
    	margin: auto;
    }
     .londNull p.datastent{
		display: block;
		width: 100%;
		height: 1.05rem;
		line-height: 1.05rem;
		text-align: center;
		color: #333;
		margin-top: 1rem;
		font-size: 0.75rem;
	}

	 .londNull p.btntext{
		display: block;
		width: 92%;
		height: 2.25rem;
		line-height: 2.25rem;
		margin: 0 auto;
		margin-top: 2.425rem;
		text-align: center;
		background: #03A9F4;
		border-radius: 0.25rem;
		color: #FCFCFC;
		font-size: 0.85rem;
		}
</style> 