<template>
	<div class="setupDom">
		<nav-bar title="新鲜资讯"></nav-bar>
		<section class="aui-refresh-content">
			<div class="aui-content">
				<div class="main" v-if="content">
					<div class="mainContent1" v-if="content.length>0" >
						<div class="news" v-for="(item,index) in content" @click="openNewsDetails(item.articleid,item.clicks)">
							<div class='newsBox1' v-if="item.imgUrlArr.length==1" >
								<div class="newsContent">
									<h3 :class="item.flag?'sh3':''">{{item.title}}</h3>
									<div class="title">
										<span class="sp1">{{item.typeName}}</span>
										<img src="../../assets/home/eyes.png" alt="">
										<span class="sp2">{{item.clicks|tranNumber(1)}}人</span>
										<div>
											<span class="sp3">{{item.createTime|getTimes()}}</span>
										</div>
									</div>			
								</div>
								<div class="newsImg1">
									<div v-for='items in item.imgUrlArr'>
										<img :src="items" alt="">
									</div>
								</div>
							</div>
							<div class='newsBox2' v-if="item.imgUrlArr.length!=1" >
								<!-- 有图，2，3张 -->
								<h3 :class="item.flag?'sh3':''">{{item.title}}</h3>
								<div class="newsImg" :class="item.imgUrlArr.length==2?'new_active':''">
									<div v-for='items in item.imgUrlArr'>
										<img :src="items" alt="">
									</div>
								</div>
								<div class="newsTiem">
									<div class="title">
										<span class="sp1">{{item.typeName}}</span>
										<img src="../../assets/home/eyes.png" alt="">
										<span class="sp2">{{item.clicks|tranNumber(1)}}人</span>
										<div>
											<span class="sp3">{{item.createTime|getTimes()}}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<no-more v-show='bool' ></no-more>
			</div>
		</section>
	</div>
</template>
<script>
	import {
		MessageBox,
		Toast
	} from 'mint-ui';
	import {
		OverallData,
		getSession,
		setSession,
		getCookie,
		setCookie
	} from "../../js/common.js"
	export default {
		data() {
			return {
				content: [],
				articleId:["000"],
				clicks:{},
				page:1,
				limit:10,
				auiScroll:false,
				bool:false,
			}
		},

		created() {
			this.NewInformationgetList();
			if(getSession('articleId')){
				this.articleId=getSession('articleId')
			}
			if(getCookie('clicks')){
				this.clicks=getCookie('clicks')
			}
		},
		mounted() {
			var that = this;
				var pullToRefresh = new auiPullToRefresh({ //下拉刷新
					container: document.querySelector('.aui-refresh-content'), //下拉容器
					triggerDistance: 80 //下拉高度
				}, function(ret) {
					if (ret.status == "success") {
						that.page = 1;
						that.bool=false;
						that.$ajax.defaults.timeout  =  49527;//49527这个值控制没有showLonding
						that.NewInformationgetList();
						setTimeout(() => {
							pullToRefresh.cancelLoading(); //刷新成功后调用此方法隐藏
						}, 1500)
					}
				});
				var scroll = new auiScroll({ //上拉加载
					listen: false, //是否监听滚动高度，开启后将实时返回滚动高度
					distance: 0 //判断到达底部的距离，isToBottom为true
				}, function(ret) {
					console.log("saddas")
					if (ret.isToBottom == true && that.auiScroll) {
						that.auiScroll = false;
						that.page++;
						that.NewInformationgetList();
						console.log(1)
					}
				});	
		},
		methods: {
			openNewsDetails:function(i,s){
					var thas=this;
					var nums=0;
					var numc=0;
				thas.articleId.map(function(item){
					if(item==i){
					nums++;	
				}})
				if(nums<1){
					thas.articleId.push(i);
				}
				for(var k in thas.clicks){
					console.log(k)
					if(k==i){
						this.clicks[k]=s+1;
						numc++;
					}
				}
				if(numc<1){
					this.clicks[i]=s+1;
				}
				setSession('articleId',this.articleId);
				setCookie("clicks",JSON.stringify(this.clicks),'3-D');
				this.$router.push({
					name:'information_news_details',
					query:{
						articleId:i,
					}
				})
			},
			NewInformationgetList:function(){
					let uid = getCookie('newData');
					var userId = uid.userid;
					var thas = this
					var data = [];
					// data['type'] = 1;
					data['page'] = thas.page;
					data['limit'] = thas.limit;
				
					var datas = this.Qs.stringify({
						data
					}, {
						allowDots: true
					});
					var thas = this;
					console.log(datas)
					thas.$ajax.post('/caipiaoshouye/index.php/home/index/NewInformationgetList',
							datas
						)
						.then(res => {
							console.log(res)
							var content = res.data.content
							console.log(content)
							if (content.code == '1000') {
								if(content.obj.length>0){
                                	thas.auiScroll = true;
                                }
								else{
									thas.bool=true;
								}
								if(thas.page==1){
								  thas.content = content.obj;
								}
								else{
								  thas.content = thas.content.concat(content.obj);                      
								}
								thas.content.map(function(item){
									thas.articleId.map(function(items){
										if(item.articleid===items){
											item.flag=1;
										}
									})
								})
								thas.content.map(function(item){
									for(var k in thas.clicks){
										if(k==item.articleid){
											if(item.clicks<thas.clicks[k]){
												item.clicks=thas.clicks[k]
											}
										}
									}
								})
							}
						})

			}
		},
		filters:{
			 getTimes : function(matchDate) {
				matchDate=matchDate.replace(/-/g,'/');//ios不兼容，需要转/
				var time = new Date(matchDate);
				var y = time.getFullYear();
				var m = time.getMonth() + 1 >= 10 ? parseInt(time.getMonth() + 1) : "0" + parseInt(time.getMonth() + 1);
				var d = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
				var h = time.getHours() >= 10 ? time.getHours() : "0" + time.getHours();
				var mm = time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes();
				 //月日时分
				return m + "-" + d + " " + h + ":" + mm;
			},
			 tranNumber:function(num, point) {
			          var numStr = num.toString()
			           // 千以内直接返回
			           if (numStr.length <= 4) {
			               return numStr;
			           }
			           //大于8位数是亿
			           else if (numStr.length > 11) {
			               let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
			               return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿';
			           }
			           //大于4位数是万 (以1W分割 1W以下全部显示)
			           else if (numStr.length > 4) {
			               let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
			               return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万';
			    }
			}
		}
	}
</script>
<style scoped>
	.aui-content {
		min-height: 90vh;
		margin-top: 2.25rem;
	}
	
	.main {
		margin: 0 4%;
	}

	.mainContent1 .news {
		padding-top: 0.8rem;
		border-bottom: 1px dotted #E5E5E5;
	}

	.news h3 {
		font-size: 0.7rem;
		line-height: 1.1rem;
		margin-bottom: 0.5rem;
		color: #333;
		font-weight: bold;
	}

	.new_active div:nth-child(2) {
		margin-right: 34.5%;
	}



	.newsImg {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
	}

	.newsImg div {
		width: 31%;
	}

	.newsImg img {
		height: 3.45rem;
		margin: 0 auto;
	}

	/* 3图 */
	.newsTiem {
		margin-top: 0.425rem;
	}

		.newsTiem .title {
			height: 1rem;
			margin-bottom: 0.75rem;
			font-size: 0;
		}
		
		.title div {
			height: 1rem;
			float: right;
		}
		
		.newsTiem img {
			display: inline-block;
			width: 0.7rem;
			height: 0.425rem;
			margin-right: 0.15rem;
			vertical-align: super;
		}
		
		.newsTiem .sp1 {
			font-size: 0.6rem;
			height: 1rem;
			line-height: 1rem;
			color: #63B6DC;
			vertical-align: super;
			display: inline-block;
			margin-right: 0.725rem;
			min-width: 3rem;
		}
		
		.newsTiem .sp2 {
			font-size: 0.55rem;
			height: 1rem;
			line-height: 1rem;
			color: #999;
			vertical-align: super;
			display: inline-block;

		}
		
		.newsTiem .sp3 {
			font-size: 0.55rem;
			height: 1rem;
			line-height: 1rem;
			color: #999;
			display: inline-block;
			vertical-align: super;

		}
        /* 1图 */

        .newsContent {
            display: inline-block;
            width: 65%;
        }
		.newsContent .title {
			height: 1rem;
			margin-bottom: 0.75rem;
		}
		
		.title div {
			height: 1rem;
			float: right;
		}

        .newsContent h3 {
            font-size: 0.7rem;
            line-height: 1.1rem;
            /* color: #333; */
        }

        .newsContent img {
            display: inline-block;
            width: 0.7rem;
            height: 0.425rem;
			margin-right: 0.15rem;
			text-align: center;
			vertical-align: super;
        }

        .newsContent .sp1 {
            font-size: 0.6rem;
            height: 1rem;
			line-height: 1rem;
            color: #63B6DC;
			vertical-align: super;
			display: inline-block;
            margin-right: 0.725rem;
			min-width: 3rem;
        }

        .newsContent .sp2 {
            font-size: 0.55rem;
            height: 1rem;
			line-height: 1rem;
            color: #999;
			vertical-align: super;
			display: inline-block;
        }

        .newsContent .sp3 {
            font-size: 0.55rem;
            height: 1rem;
			line-height: 1rem;
            color: #999;
			vertical-align: super;
			display: inline-block;			
        }

	.newsImg1 {
		/* display: inline-block; */
		width: 31%;
		float: right;
		overflow: hidden;
	}

	.newsImg1 img {
		/* width: 5.375rem; */
		height: 3.45rem;
		margin: 0 auto;
	}
	
	.news .sh3 {
		color: #BBBBBB;
	}
	
</style>
