<template>
	<div class="notice">
		<nav-bar title="近期公告"></nav-bar>
		<section class="aui-refresh-content">
	        <div class="aui-content">
	           <ul class="main">
	           	<li v-for="item in ggtext" @click="openIn(item.articleid)" >
					<p class="p1" :class="item.flag?'p2':''">{{item.articleTitle}}</p>
					<div>
						<span class="sp1">美奇彩官方运营团队</span>
						<div class="spRight">
							<span class="sp2">{{item.createTime}}</span>
						</div>
					</div>
	           	</li>
	           </ul>	           
	        </div>
	    </section>
		
	</div>
	</div>
</template>
<script>
	import {
		getCookie,
		setSession,
		getSession
	} from "../../js/common.js"
	import {
		Toast
	} from 'mint-ui';
	export default {
		data() {
			return {
				ggtext:[],
				page:1,
				limit:10,
				status:1,
				not:[],
			}
		},
		created() {
			this.articleId = this.$route.query.articleId;
			if(getSession('noticeId')){
				this.not=getSession('noticeId')
			}
			this.getUserInfo();
		},
		mounted() {	
			var that = this;
				var pullToRefresh = new auiPullToRefresh({ //下拉刷新
					container: document.querySelector('.aui-refresh-content'), //下拉容器
					triggerDistance: 80 //下拉高度
				}, function(ret) {
					if (ret.status == "success") {
						that.getUserInfo();
						setTimeout(() => {
							pullToRefresh.cancelLoading(); //刷新成功后调用此方法隐藏
						}, 1500)
					}
				});
		},
		methods: {
			bs: function() {},
			bake: function() {
				this.$router.go(-1);
			},
			openIn: function(i) {
				var nums=0;
				this.not.map(function(item){
					if(item==i){
						nums++;
					}
				})
				if(nums==0){
					this.not.push(i)
				}
				setSession('noticeId',this.not);
				this.$router.push({
					name: 'information_bulletin',
					query: {
						articleId: i,
						bool: 'home'
					}
				})
			},
			getUserInfo: function() {
				var data = [];
				data['page'] = this.page;
				data['limit'] = this.limit;
				data['status'] = this.status;
				var datas = this.Qs.stringify({
					data
				}, {
					allowDots: true
				});
				var thas=this;
				this.$ajax.post('/caipiaoshouye/index.php/home/index/noticeWebselect',
						datas
					).then(res => {
						console.log(res)
						var content = res.data.content;					
						console.log(content)   
						console.log(content.data)
						if (res.data.status != "200") {
							return;
						} else {
							if (content.code == "1000") {
								console.log(content.data);
								thas.ggtext = content.data.lotteryNoticeList;
								console.log(thas.ggtext)
								thas.ggtext.map(function(item){
									thas.not.map(function(items){
										if(item.articleid===items){
											item.flag=1
										}
									})
								})
								console.log(thas.ggtext)
							} else if (content.code == "201010") {
								Toast("账户已被锁定，请联系客服");
								setCookie('newData', '', '0-S');
								this.$router.push({
									name: 'login'
								})
							}
			
						}
					})
			},
		}
	}
</script>
<style scoped>
	.notice {
	background: #F4F4F4;
	min-height: 100vh;
	}
	.aui-content {
		min-height: 90vh;
		margin-top: 2.25rem;
	}
  .main {
	  background: #fff;
  }
  
  .main li {
	  padding: 0.4rem 4% 0.5rem 4%;
	  border-bottom: 1px solid #EDEDED;
  }
  
  .main li div {
  }
  .main li:active{
	  background:#F6F6F6;
  }
  
  .main .p1 {
	  font-size: 0.7rem;
	  color: #333;
	  line-height: 1.1rem;
	  font-weight: bold;
	  margin-bottom: 0.15rem;
  }
  
  .main .p2 {
	  color: #BBBBBB;
  }
  
  .main .sp1 {
	font-size: 0.55rem;
	color: #999;
  }
  
  .main .spRight {
	  float: right;
  }
  .main .sp2 {
	font-size: 0.55rem;
	color: #999;
  }

</style>
