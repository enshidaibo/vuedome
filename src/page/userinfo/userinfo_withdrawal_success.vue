 <template>
    <div>  
   <header class="aui-bar aui-bar-nav">
            <div class="aui-pull-left aui-btn"  tapmode @click="closeWin()">
                <span class="aui-iconfont aui-icon-left"></span>
            </div>
            <div class="aui-title">提现详情</div>
                <!-- <div class="withdrawal_help" onclick="withdrawal_help_index();" tapmode="onclickgray"><span>首页</span></div> -->
        </header>
        <section>
          <div class="box_success">
            <div class="stateBox">
                        <div class="imgBox">
                           <img src="../../assets/userinfo/Group@2x.png">
                        </div>
                        <div class="yiTiJiao">
                          提现申请已提交
                        </div>
                        <div class="finance">
                          您的提款金额，预计在10分钟之内处理完成
                        </div>
                    </div>
                    <div class="moneyDetialBox">
                      <div class="bankCardBox">
                        <span>银行卡</span>
                        <span id="bankCardType">{{banknames_page}}</span>
                      </div>
                      <div class="moneySumBox">
                        <span>金额</span>
                        <span id="moneySum">￥{{money}}</span>
                      </div>
                  </div>
                  <p id="txWanCheng" @click="closeWin()">完成</p>
          </div>


        </section>
    </div>
</template>
<script>
    export default {
        data(){
            return {
               money:0,
              banknames_page:0
            }
        },
        
        created(){
		  this.money= this.$route.query.money;
	      this.banknames_page= this.$route.query.banknames_page;
         },
        methods:{
        closeWin:function(){
			this.$router.go(-1); //根据浏览器记录返回上一次
		}
        }
    }
</script>
<style scoped>
/*提现成功*/

.box_success {
    background: #f2f2f2;
    height: 92.5vh;
}

.stateBox {
    width: 100%;
    position: absolute;
    padding-bottom: .3rem;
    background: #fff;
}

.imgBox {
    width: 100%;
    height: 2rem;
    background: #fff;
    margin-top: 1.5rem;
}

.imgBox>img {
    display: block;
    margin: 0 auto;
    margin-top: .6rem;
    width: 4.8rem;
    height: 4.8rem;
}

.yiTiJiao {
    width: 100%;
    background: #fff;
    text-align: center;
    color: #747474;
    font-size: 1.2rem;
    height: 5.5rem;
    line-height: 8.9rem;
}

.finance {
    width: 100%;
    background: #fff;
    text-align: center;
    color: #E0A444;
    font-size: .65rem;
    height: 1.2rem;
    line-height: 1.2rem;
}

.moneyDetialBox {
    width: 100%;
    position: absolute;
    top: 10.9rem;
}

.moneyDetialBox>div {
    width: 100%;
    background: #fff;
    height: .8rem;
    line-height: .8rem;
    border-bottom: 1px solid #f2f2f2;
}

.bankCardBox>span:first-child {
    display: inline-block;
    width: 30%;
    padding-left: .9rem;
    font-size: .78rem;
    color: #747474;
}

.bankCardBox>span:last-child {
    display: inline-block;
    width: 65%;
    padding-left: .3rem;
    font-size: .78rem;
    color: #18427E;
    text-align: right;
}

.moneyDetialBox>div {
    width: 100%;
    background: #fff;
    height: 2.5rem;
    line-height: 2.5rem;
    border-bottom: 1px solid #f2f2f2;
}

.moneySumBox>span:first-child {
    display: inline-block;
    width: 30%;
    padding-left: .9rem;
    font-size: .78rem;
    color: #747474;
}

.moneySumBox>span:last-child {
    display: inline-block;
    width: 65%;
    padding-left: .9rem;
    font-size: .78rem;
    color: #D65665;
    text-align: right;
}

#txWanCheng {
    width: 94%;
    height: 2.2rem;
    border-radius: 0.3rem;
    font-size: 0.82rem;
    text-align: center;
    line-height: 2.2rem;
    background: #60A2EB;
    color: #fff;
    display: inline-block;
    position: absolute;
    bottom: 0.6rem;
    left: 2%;
    top: 22rem;
}

</style> 