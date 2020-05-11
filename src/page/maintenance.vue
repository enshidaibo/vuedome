<template>
  <div id="mydata">
    <div class="weihu">
      <div class="weihu_img"><img src="../assets/weihu.png" /> </div>
      <p class="p1">系统升级维护中</p>
      <p>{{starttime}}——{{endtime}}</p>
      <p>我们正在加入更多新功能</p>
      <p>敬请期待...</p>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return{
        starttime: this.$route.params.starttime,
        endtime: this.$route.params.endtime,
      }
    },
		created() {
			
			setInterval(()=>{this.maintenance()},5000)
			
		},
	methods: {
	 maintenance:function(){
		 	this.$ajax.post('/caipiaoshouye/index.php/home/index/stoptoAPP')
		 	.then(res => {
		    
		 		if (res.data.status==1) {   //跳转到维护页面
				this.starttime=res.data.starttime;
					this.endtime=res.data.endtime
		           this.$router.push({
		           	name:'maintenance'
		           });
		         }else{
							 this.$router.push({
							 		 name:'home'
							 });
						 }
		 		
		 	})
		 	.catch(err => {
		 		console.log(err);
		 	})
	 }   
	}
  }

</script>

<style scoped>

  .weihu{
    padding-top: 45%;
  }
  .weihu_img{
    width: 80%;
    margin-left: 10%;
  }
  .weihu_img img{
    width: 100%;
  }
  .weihu p{
    text-align: center;
    line-height: 1rem;
  }
  .weihu p.p1{
    margin-top: 10%;
    font-size: 0.8rem;
    line-height: 1.2rem;
    font-weight: bold;
  }
</style>