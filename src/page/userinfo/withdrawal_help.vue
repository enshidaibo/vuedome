<template>
	<div class="helpBox">
		<header class="aui-bar aui-bar-nav" style="position: fixed;">
            <div class="aui-pull-left aui-btn"   @click="closeWin()">
                <span class="aui-iconfont aui-icon-left"></span>
            </div>
            <div class="aui-title">帮助</div>
        </header>
        <section>
          <div class="help" >

    <p>1、单笔提现最低50元,最高为50000元。</p>
    <p>2、<span style="color: #ef2626;">锁定金额:</span> 充值金额累计数值即是锁定金额的数值，用户投注后投注金额的数值会1:1抵消锁定金额的数值。</p>
    <p>3、<span style="color: #ef2626;">可提现金额：</span>可提现金额 = 账户余额 - 锁定金额</p>
    <p>4、提现发起成功后，将在48小时内到账</p>
    <p>5、晚上22:00~次日1：00为系统结算时间，不可提现</p>
	<p>6、如有任何疑问请联系客服</p>
    <!-- <p>6、投注金额满足充值金额10%,即可全部提现,否则部分提现</p> -->
    <!-- <p>6.投注金額 - 活动赠送金额 - (充值金額 x 10％) &gt; 0,即可提领账户余额</p>
    <p>7.投注金額 - 活动赠送金额 - (充值金額 x 10％) &lt; 0,仅能提取部份金额</p>
    <p>8.部份金额 = 余额 + (投注金額 - 活动赠送金额 - (充值金額 x 10％))</p>
    <p>9.充值100元，投注总金额为10元，中奖90元。你若提款1000元，系统会自动扣除您提款金额的10%(1000*10%=100元)，您最终到账金额为900元</p>
    <p>10.实名认证送18元，若您在提款时，投注金额低于18元，系统将驳回您的提款申请</p> -->
                          </div>

        </section>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			closeWin:function(){
				this.$router.go(-1)
			}
		}
		
	}
</script>

<style scoped>
	  .helpBox{
    height: 100%;
    width: 100%;
    background-color: #f0f0f0;
  }
  body{
    background-color: #f0f0f0;
  }
    .help{
      background: #f0f0f0;
      margin-top: 0;
      padding-top: 2.25rem
    }
    .help>p {
      border: 0;
      margin-top: 0.6rem;
      background: #fff;
    }
		.help {
		width: 100%;
		height: auto;
		padding-top: 2.5rem;
		padding-bottom: 2.5rem;
	}
	
	.help>p {
		width: 100%;
		height: auto;
		padding: 0.8rem 1.2rem;
		font-size: 0.74rem;
		text-align: left;
		line-height: 1.7em;
		color: #000;
		border-bottom: 1px solid #e1dddd;
	}
</style>
