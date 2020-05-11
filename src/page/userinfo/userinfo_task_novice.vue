<style scoped>
    /* @import "../css/userinfo_task.css"; */

    header {
        position: fixed;
		background: #fff;
		color: #333;
		font-size: 0.9rem;
    }
    .taskDom {
        min-height: 100vh;
        background-color: #f4f4f4;
    }

   .aui-bar-nav .aui-btn .aui-iconfont{
        color: #000;
    }
    .head_bg{
		margin-top: 2.25rem;
		overflow: hidden;
		background-image:url(../../../static/task/bg.png) ;
		width: 100%;
		height: 8.725rem;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
   .taskItemBox{
	   width: 92%;
	   margin: 0 auto;
	   height: 22.425rem;
	   background: #fff;
	   margin-top: -3.075rem;
	   border-radius: 0.2rem;
   }
   .taskItemTitle{
	   height: 2.425rem;
	   line-height: 2.425rem;
	   width: 100%;
	   padding-left: 0.775rem;
	   color: #333;
	   font-size: 0.85rem;
	   border-bottom:1px solid #F4F4F4;
   }
    .taskItemTitle span{
		color: #999;
		font-size: 0.65rem;
		padding-left: 0.15rem;
	}
	.taskItemTitle span i{
		color: #F82A5B;
		font-style: normal;
	}
	.taskItem{
		height: 4rem;
		width: 16.25rem;
		margin: 0 auto;
		 border-bottom:1px solid #F4F4F4;
		 position: relative;
		 display: flex;
		 display: -webkit-flex;
		 overflow: hidden;
	}

	.taskItem .taskItemImg{
		width: 2rem;
		height: 2rem;
		margin-top: 1rem;
	}
	.taskItem .taskItemImg img{
		width: 100%;
		height: 100%;
	}
	.taskItem .taskItemText{
		margin-top: 1.1rem;
		margin-left: 0.6rem;
		height: 1.8rem;
	}
	.taskItem .taskItemText div:first-child{
		color: #333;
		font-size: 0.75rem;
		font-weight:bold;
	}
	.taskItem .taskItemText div:last-child{
		color: #999;
		width: 10rem;
		margin-bottom: 0rem;
		font-size: 0.6rem;
		font-weight:normal;
		padding-left: 0.8rem;
		background-image: url('../../../static/task/qianqian.png');
		background-repeat: no-repeat;
		background-size: 0.6rem .6rem;
		background-position-y:.1rem ;
	}
	.taskItem .taskItemText div:last-child i{
		color:#F82A5B;
		font-style: normal;
	}
	.taskItem .btngo{
		width: 3.45rem;
		height: 1.8rem;
		text-align: center;
		line-height: 1.8rem;
		font-size: 0.65rem;
		color: #fff;
		top: 1.1rem;
		right: 0.45rem;
		position: absolute;
	}
	.taskItem .weiwancheng{
		background-image: url('../../../static/task/weiwanchengxin.png');
		background-repeat: no-repeat;
		background-size:  100% 100% ;
	}
	.taskItem .yiwancheng{
		background-image: url('../../../static/task/yiwanchengxin.png');
		background-repeat: no-repeat;
		background-size: 100% 100% ;
	}
	.taskItem .dailingqu{
		background-image: url('../../../static/task/ewanweiwancheng.png');
		background-repeat: no-repeat;
		background-size: 100% 100% ;
	}
	.zonggong{
		width: 92%;
		margin: 0 auto;
		height: 4rem;
		background: #fff;
		margin-top: .5rem;
		border-radius: 0.2rem;
	}
</style>
<template>
    <div class="taskDom">
        <header class="aui-bar aui-bar-nav">
           <div class="aui-pull-left aui-btn" @click="bake()" tapmode>
           	<span class="aui-iconfont aui-icon-left"></span>
           </div>
            <div class="aui-title home-header" @click="betting_cashback()">
            	新手任务
            	<span id="service" class="service"></span>
            </div>
            <div class="aui-btn aui-pull-right">
		        </div>
        </header>
		<div class="head_bg"></div>
		<!-- 实名认证 -->
		<div class="taskItemBox">
			<div class="taskItemTitle">
				新手任务<span>(已领取奖励<i>{{gotPrize}}</i>元)</span>
			</div>
			<div class="taskItem">
				<div class="taskItemImg">
					<img src="../../../static/task/shimingxin.png" />
				</div>
				<div class="taskItemText">
					<div>实名认证</div>
					<div>+<i>6.66</i>元红包</div>
				</div>
				<div v-if="!certification" class="btngo weiwancheng" @click="gotypename('userinfo_task_real')">
					去实名
				</div>
				<div v-else class="btngo  yiwancheng">
					已完成
				</div>
			</div>
			<!-- 签到 -->
			<div class="taskItem">
				<div class="taskItemImg">
					<img src="../../../static/task/qiandaoxin.png" />
				</div>
				<div class="taskItemText">
					<div>签到</div>
					<div>+<i>0.28</i>元红包</div>
				</div>
				<div v-if="!signIn" class="btngo weiwancheng"  @click="gotypename('userinfo_task_sign')">
					去签到
				</div>
				<div v-else class="btngo  yiwancheng">
					已完成
				</div>
			</div>
			<!-- 现金充值一次 -->
			<div class="taskItem">
				<div class="taskItemImg">
					<img src="../../../static/task/chongzhixin.png" />
				</div>
				<div class="taskItemText">
					<div>现金充值一次</div>
					<div>至少+<i>1</i>元现金<span v-if="recharge">（已领取<i>{{data.recharge|yilingqu()}}</i>元）</span></div>
				</div>
				<div v-if="!recharge" class="btngo weiwancheng" @click="gopaymentOptions()">
					去充值
				</div>
				<div v-else class="btngo  yiwancheng">
					已完成
				</div>
			</div>
			<!-- 现金购任意彩票一次 -->
			<div class="taskItem">
				<div class="taskItemImg">
					<img src="../../../static/task/goucaixin.png" />
				</div>
				<div class="taskItemText">
					<div>现金购任意彩票一次</div>
					<div>至少+<i>0.1</i>元现金<span v-if="bet">（已领取<i>{{data.bet|yilingqu()}}</i>元）</span></div>
				</div>
				<div v-if="!bet" class="btngo weiwancheng"  @click="gotypename('goucai')">
					去购彩
				</div>
				<div v-else class="btngo  yiwancheng">
					已完成
				</div>
			</div>
			<!-- 完成晒单一次 -->
			<div class="taskItem">
				<div class="taskItemImg">
					<img src="../../../static/task/shaidanxin.png" />
				</div>
				<div class="taskItemText">
					<div>完成晒单一次</div>
					<div>至少+<i>0.1</i>元红包<span v-if="share">（已领取<i>{{data.share|yilingqu()}}</i>元）</span></div>
				</div>
				<div v-if="!share" class="btngo weiwancheng" @click="gotypename('userinfo_task_sunburn')">
					去晒单
				</div>
				<div v-else class="btngo  yiwancheng">
					已完成
				</div>
			</div>
		</div>
		<div class="zonggong">
			<div class="taskItem">
				<div class="taskItemImg">
					<img src="../../../static/task/ewaijianglixin.png" />
				</div>
				<div class="taskItemText">
					<div>完成以上全部任务</div>
					<div>+<i>10</i>元红包</div>
				</div>
				<div v-if="!isComplete" class="btngo  yiwancheng">
					未完成
				</div>
				<div v-else-if="isComplete&&!isOver" class="btngo dailingqu" @click="dailingqu()">
					待领取
				</div>
				
				<div v-else class="btngo  yiwancheng">
					已领取
				</div>
			</div>
		</div>
		<checkok-nav :logokz='logok' @showbox="showbox"></checkok-nav>
	</div>
</template>

<script>
import checkokNav from '../../common/checkok.vue';
    import {
        getCookie,
        getUid,
        setCookie,
        OverallData,
        maintenance
    } from "../../js/common.js";
    import {
        Toast
    } from 'mint-ui';
	var interval;
    export default {
		components: {
			checkokNav
		},
        data() {
            return {
				bet:false,
				share:false,
				certification:false,
				recharge:false,
				signIn:false,
				 gotPrize:0,
				 isOver:false,
				 logok: false, //未实名标志
				 isComplete:false,
				 data:''
            }
        },
		beforeRouteLeave(to, from, next) {
			document.querySelector('html').setAttribute('style', 'background-color:#fff;');
			document.querySelector('body').setAttribute('style', 'background-color:#fff;');
		   
		    next()
		},
        created() {
			document.querySelector('body').setAttribute('style', 'background-color:#F4F4F4;');
			document.querySelector('html').setAttribute('style', 'background-color:#F4F4F4;');
			this.openChest()
        },
		mounted() {
		
		},
        methods: {
			bake:function(){
				this.$router.go(-1)
			},
			gotypename: function(i) {
				this.$router.push({
					name: i
				})
			},
			showbox: function(msg) {
				this.logok = msg;
			},
			gopaymentOptions:function(){
				if(!this.certification){
					this.logok=true;
					return false
				}
				this.$router.push({
					name: 'payment_options'
				})
			},
			dailingqu:function(){
				var data = [];
				data["userId"] = getCookie('newData').userid;
				var datas = this.Qs.stringify({
				    data
				}, {
				    allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/executeReceiveExtraReward',
				        datas
				    )
				    .then(res => {
				        if (res.data.status != 200) {
				            Toast("服务器连接失败,请稍后重试");
				        } else {
				            var data = JSON.parse(res.data.content);
				            console.log(data);
							
				            if (data.code == 100000) {
								Toast(data.data.message);
								if(data.data.message=='额外奖励领取失敗'||data.data.message=='额外奖励领取失败'){
									}else{
										 this.openChest()
									}
				                 
								
				            }
				        }
				    })
				    .catch(err => {
				        console.log(err);
				    })
			},
			openChest: function () {
					var data = [];
					data["userId"] = getCookie('newData').userid;
					var datas = this.Qs.stringify({
					    data
					}, {
					    allowDots: true
					});
					this.$ajax.post('/caipiaoshouye/index.php/home/index/getExtraRewardCriteria',
					        datas
					    )
					    .then(res => {
					        if (res.data.status != 200) {
					            Toast("服务器连接失败,请稍后重试");
					        } else {
					            var data = JSON.parse(res.data.content);
					            console.log(data);
			
					            if (data.code == 100000) {
									this.data=data.data;
					                  if(data.data.bet){
										  this.bet=true;
									  } if(data.data.share){
										  this.share=true; 
									  } if(data.data.certification){
										  this.certification=true; 
									  } if(data.data.recharge){
										  this.recharge=true; 
									  } if(data.data.signIn){
										  this.signIn=true; 
									  }
									  this.gotPrize=data.data.gotPrize;
									  this.isComplete=data.data.isComplete;
									  if(data.data.isOver){
										  this.isOver=true;
									  }
									// Toast(data.data.message);
					            }
					        }
					    })
					    .catch(err => {
					        console.log(err);
					    })
				
			},
		},
		filters:{
			yilingqu:function(num){
				console.log(typeof(num))
				console.log(num.split('_')[0])
				return (num.toString().split('_')[0]*1).toFixed(2)
			}
		}
    }
</script>

