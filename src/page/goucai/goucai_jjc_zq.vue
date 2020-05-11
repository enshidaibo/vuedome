<template>
	<div>
    <header class="aui-bar aui-bar-nav">
      <div class="aui-pull-left aui-btn" tapmode  @click="closeWin()">
        <span class="aui-iconfont aui-icon-left"></span>
      </div>
      <div>
        <div class="aui-title" id="pagetitle"  @click="ChoiceType()" data-type="0" tapmode><span>{{playTypeName}}</span>  <img src="../../assets/goucai/jjc/xiajiantou.png" /></div>
      </div>
      <div class="aui-pull-right aui-btn">
          <span tapmode  @click="saixun()"><img src="../../assets/goucai/jjc/shaixuan.png" /></span>
          <div class="top-more"  @click="menuPage()" tapmode>
            <span></span><span></span><span></span>
          </div>
      </div>
  </header>
		<div class="jjc_zq" id="jjc_zq">
			<!-- 筛选 -->
			<div class="shaixuan" v-show="shaiXuanShow">
				<div class="title">
					共有<span id="totalList">{{add}}</span>场比赛可投
				</div>
				<div class="wrap">
					<div class="biaoti">赛事选择</div>
					<div class="nav">
						<ul>
							<li :class="{ 'active': Totalselection }" @click="TotalselectionFun">全选</li>
							<li :class="{ 'active': Reveselection }" @click="ReveselectionFun">反选</li>
							<li :class="{ 'active': lianselection }" @click="lianselectionFun">仅五大联赛</li>
						</ul>
					</div>
					<div class="box">
						<ul>
							<li v-for="(item, index) in saixunList" :class="{ 'active': item.state }" @click="clicksaixun(index)">{{ item.name }}</li>
							<li v-if="saixunList.length%3 == 2" style="border: 0;background: none;"></li>
						</ul>
					</div>
				</div>
				<div class="Determine" @click="sxDetermine">
					完成
				</div>
			</div>
			<!-- 菜单 -->
			<div class="topMenu" @click='hidemoc()' v-show='topMenuShow'>
				<ul>
					<li @click='toKaiJiang()'>开奖信息</li>
					<li @click='fenx()'>分享</li>
					<li @click='toHeMai()'>合买</li>
					<li @click='toPlay("jczq")'>玩法</li>
				</ul>
			</div>
            <!-- 分享模态框 -->
            <div v-if="shareStatue" class="share_box" @click="hideShare()">
                <div class="share_cont">
                    <div class="quxiao">取消</div>
                    <div class="down" onclick="openDownload()">前往下载</div>
                </div>
            </div>
			<!-- 购彩类型 -->
			<div class="nav-Tab" @click.stop="hideChoice()" v-show="tabIsShow">
				<div class="list">
					<li v-for='item in typeList' @click.stop="setChoice(item.play,item.name,item.path)" :class="{ select: play == item.play }">{{ item.name }}</li>
				</div>
			</div>
			
			<router-view v-if='isShuaxin' class="routerView"></router-view>
			
		</div>
         <!-- 未实名弹窗 -->
        <!-- <div id="sdApp" v-show="logok">
        	<div id="logok" v-show="logok">
        		<div class="renzcont">
        			<div>
        				<img src="../../assets/Group14@2x.png" alt="">
                        <p class="text">实名认证</p>
        				<div class="title2">为了您的账户安全，请帐户实名认证</div>
        				<div class="content">实名认证后，可有效保护账号的资金安全</div>
                        <p class="renz_text">认证即可获得6.88元现金</p>
        				<div class="logokbtn">
        					<p id="logokbtn1" @click="logokbtn1()">立即认证</p>
        				</div>
        			</div>
        		</div>
                <div class="qux_btn" @click="logokbtn2()"><img src="../../assets/quxiao.png" alt=""></div>
        	</div>
        </div> -->
		<!--<checkok-nav :logokz='logok' @showbox="showbox"></checkok-nav>-->
        <!-- 未实名弹窗end -->
<!-- 		<footer id='footer'>
			<div class="delete flr" @click="deletes()"></div>
			<div class="total flr">
				<p>已选择<span id="chosenField">{{num}}</span>场</p>
				<p>请至少选择<span id="totalField" v-if="play=='BF'||play=='DGGP'||play=='YCZS'">1</span><span id="totalField" v-else>2</span>场比赛</p>
			</div>
			<div class="pay fgr" @click="setBetting()">投注</div>
		</footer>-->
	<footer id='footer'> 
      <div class="ft_money flr">
            <p>已选择<span id="chosenField">{{num}}</span>场</p>
            <p>请至少选择<span id="totalField" v-if="play=='BF'||play=='DGGP'||play=='YCZS'">1</span><span id="totalField" v-else>2</span>场比赛</p>
      </div>
      <div class="ft_btn fgr">
          <div class="flr" tapmode @click="deletes()">
            <img src="../../assets/goucai/jjc/closelj.png" />
            <span>清除</span>
          </div>
          <div class="flr" tapmode @click="setBetting()">投注</div>
      </div>
  </footer>
	</div>
</template>

<script>
	import checkokNav from '../../common/checkok.vue';
	import {phone} from "../../js/connector.js";
	import {
		getSession,
		setSession,
		getCookie,
		getTime,
		OverallData,
		openDownload
	} from '../../js/common.js';
	import {
		Toast,MessageBox
	} from 'mint-ui';
	

	export default {
	components: {
        checkokNav
     },
		data() {
			return {
                logok: false,  //未实名标志
                shareStatue: false,  //分享状态
				play: 'RQSPF',
				playTypeName: '让球胜平负',
				num: 0,
				add: 0,
				isShuaxin: true,
				Totalselection: true,
				Reveselection: false,
				lianselection: false,
				tabIsShow: false, //玩法切换列表显示与隐藏
				shaiXuanShow: false, //筛选显示与隐藏
				saixunList: [], //筛选联赛类型
				cunSaiXuanList: [],
				topMenuShow: false,
				typeList: [{
						'id': '0',
						'name': '让球胜平负',
						path: 'goucai_jjc_zq_rqspf',
						'play': 'RQSPF'
					},
					{
						'id': '8',
						'name': '胜平负',
						path: 'goucai_jjc_zq_spf',
						'play': 'SPF'
					},
					{
						'id': '1',
						'name': '进球数',
						path: 'goucai_jjc_zq_jqs',
						'play': 'JQS'
					}, {
						'id': '2',
						'name': '半全场',
						path: 'goucai_jjc_zq_bqq',
						'play': 'BQQ'
					}, {
						'id': '3',
						'name': '比分',
						path: 'goucai_jjc_zq_bf',
						'play': 'BF'
					}, {
						'id': '4',
						'name': '混合过关',
						path: 'goucai_jjc_zq_hhgg',
						'play': 'HHGG'
					}, {
						'id': '5',
						'name': '一场制胜',
						path: 'goucai_jjc_zq_yczs',
						'play': 'YCZS'
					}, {
						'id': '6',
						'name': '单关固赔',
						path: 'goucai_jjc_zq_dggp',
						'play': 'DGGP'
					}, {
						'id': '7',
						'name': '2选1',
						path: 'goucai_jjc_zq_erxy',
						'play': 'ERXY'
					}
				],
			};
		},
		/* beforeRouteLeave (to, from , next) {
			let lint = from.matched[0].name + 'pay'
			if (to.name == lint) {
				var arr=getSession('arr');
				if (this.play == 'BF' || this.play == 'DGGP' || this.play == 'YCZS') {
					if (!arr) {
						Toast('最少请选择1场!');
						next(false);
						return 
					}
					if (arr.length < 1) {
						Toast('最少请选择1场!');
						next(false);
						return 
					}
				} else {
					if (!arr) {
						Toast('最少请选择2场!');
						next(false);
						return 
					}
					if (arr.length < 2) {
						Toast('最少请选择2场!');
						next(false);
						return 
					}
				}
				if (arr.length > 8) {
					Toast('一次投注最多选择8场!');
					next(false);
					return 
				}
				next();
			} else{
				next();
			}
		}, */
        created() {
            if (getCookie('logok')) {  //判断是否实名
                this.logok = true;
            }
        },
		mounted() {
			
			phone.$on('lengths', (val) => {
				this.num = val;
				if(val>8){
					Toast('一次投注最多选择8场!');
				}
			});
			phone.$on('saixunList', (val) => {
				this.saixunList = val;
			});
			phone.$on('add', (val) => {
				this.add = val;
			});
			if (getSession('play')) {
				this.play = getSession('play');
				this.playTypeName = getSession('playTypeName');
			}else{
				setSession('play',"RQSPF");
				setSession('playTypeName',"让球胜平负");
			}
			window.openDownload=openDownload;
		},
	  beforeRouteEnter(to, from, next){
		   console.log(to.name)
		   next();
		},
		beforeDestroy () {
		     // phone.$off('delete');
					
		      },
		methods: {
		toPlay(){	//	玩法
				// sessionStorage.setItem('play',document.querySelector('.aui-title').innerText);
				// location.href = 'http://www.baidu.com';
				this.$router.push({
					path:"/goucai/play",
					query:{
						isApp:'0',
						dataType:"jjzq"
					}

				})
			},
			showbox:function(msg){
				this.logok = msg;
			},
            logokbtn1: function() {  //前往实名
                this.logok = false;
                this.$router.push({
                    name: 'userinfo_task_real'
                })
            },
            logokbtn2: function() {  //取消实名
                this.logok = false;
            },
			closeWin: function() {
				sessionStorage.removeItem('play');
				sessionStorage.removeItem('playTypeName');
				sessionStorage.removeItem('shaixuan');
				sessionStorage.removeItem('arr');
				sessionStorage.removeItem('HHGG');
				sessionStorage.removeItem('DGGP');
				sessionStorage.removeItem('BF');
				sessionStorage.removeItem('BQQ');
				sessionStorage.removeItem('ERXY');
				sessionStorage.removeItem('JQS');
				sessionStorage.removeItem('RQSPF');
				sessionStorage.removeItem('SPF');
				sessionStorage.removeItem('YCZS');
				this.$router.go(-1);
			},
			TotalselectionFun: function() {
				this.Totalselection = true;
				this.Reveselection = false;
				this.lianselection = false;
				for (let i = 0; i < this.saixunList.length; i++) {
					this.saixunList[i].state = true
				}
			},
			ReveselectionFun: function() {
				this.Totalselection = false;
				this.Reveselection = true;
				this.lianselection = false;
				for (let i = 0; i < this.saixunList.length; i++) {
					this.saixunList[i].state = !this.saixunList[i].state
				}
			},
			lianselectionFun: function() {
				this.Totalselection = false;
				this.Reveselection = false;
				this.lianselection = true;
				var saixunList = this.saixunList;
				for (var i = 0; i < saixunList.length; i++) {
					saixunList[i].state = false;
					if (saixunList[i].name == "英超" || saixunList[i].name == "西甲" || saixunList[i].name == "意甲" || saixunList[i].name ==
						"德甲" || saixunList[i].name == "法甲") {
						saixunList[i].state = true;
					}
				}
			},
			clicksaixun: function(i) {
				this.saixunList[i].state = !this.saixunList[i].state;
			},
			hidemoc: function() {
				this.topMenuShow = false;
			},
			ChoiceType: function() {
				this.tabIsShow = !this.tabIsShow;
			},
			setChoice: function(play, name, path) {
				this.tabIsShow = false;
				// phone.$emit('switchTab',true)
				if(play== getSession('play')){
					return false
				}
				this.num=0;
				
				sessionStorage.removeItem('arr');
				sessionStorage.removeItem('parr');
				setSession('play', play);
				setSession('playTypeName', name)
				this.play = getSession('play');
				this.playTypeName = getSession('playTypeName');
				this.$router.replace({
					path,
					query: {
						play
					}
				})
			},
			hideChoice: function() {
				this.tabIsShow = false;
			},
			saixun: function() {
				this.cunSaiXuanList = JSON.parse(JSON.stringify(this.saixunList));
				let selectedShaiXuan = getSession('shaixuan');
				// console.log(JSON.stringify(this.saixunList[0].name))
				if (selectedShaiXuan) {
					for (let i = 0; i < this.saixunList.length; i++) {
						for (let x = 0; x < selectedShaiXuan.length; x++) {
							if (selectedShaiXuan[x] == this.saixunList[i].name) {
								this.saixunList[i].state = true;
							}
						}
					}
				} else {
					for (let i = 0; i < this.saixunList.length; i++) {
						this.saixunList[i].state = true;
					}
				};
				this.shaiXuanShow = !this.shaiXuanShow;
				this.topMenuShow = false

				if (!this.shaiXuanShow) {
					this.saixunList = JSON.parse(JSON.stringify(this.cunSaiXuanList));
				}
			},
			reload: function() {
				this.isShuaxin = false;
				this.$nextTick(() => {
					this.isShuaxin = true;
				})
			},
			sxDetermine: function() {
				let selectedArr = [];
				for (let i = 0; i < this.saixunList.length; i++) {
					if (this.saixunList[i].state) {
						selectedArr.push(this.saixunList[i].name)
					}
				}
				setSession('shaixuan', selectedArr);
				sessionStorage.removeItem('arr');
				sessionStorage.removeItem('parr');
				this.num=0;
				this.reload();
				this.shaiXuanShow = false;
			},
			menuPage: function() {
				console.log(this.shaiXuanShow )
				this.topMenuShow = !this.topMenuShow
				this.shaiXuanShow = false;

				
			},
			deletes: function() {
				let arr = getSession('arr');
				if(!arr||arr.length<1){
					return
				}
				MessageBox({
					title: '',
					message: '是否清空所有注单',
					showCancelButton: true,
					// confirmButtonText: '',
				
				}).then(action => {
					if (action == 'confirm') {
						this.num=0;
						phone.$emit('delete', true);
						this.reload();
					} else {
						// next(false)
						
					}
				})
				
			},
			setBetting: function() {
				let uid=getCookie('newData');
				if(!uid){
					this.$router.push({
						name:'login'
					})
					return false;
				}
				
     //            if (getCookie('logok')) {  //判断是否实名
     //            	this.logok = true;
					// console.log(this.logok);
     //                return false;
     //            }
				var arr=getSession('arr');
				if (this.play == 'BF' || this.play == 'DGGP' || this.play == 'YCZS') {
					if (!arr) {
						Toast('最少请选择1场!');
						return false
					}
					if (arr.length < 1) {
						Toast('最少请选择1场!');
						return false
					}
				} else {
					if (!arr) {
						Toast('最少请选择2场!');
						return false
					}
					if (arr.length < 2) {
						Toast('最少请选择2场!');
						return false
					}
				}
				if (arr.length > 8) {
					Toast('一次投注最多选择8场!');
					return false
				}
				this.$router.push({
					name: 'goucai_jjc_zqpay'
				})
			},
			fenx: function(){   //分享
			    this.shareStatue = true;
			},
			hideShare: function(){
			    this.shareStatue = false;
			},
			// openDownload: function(){   //前往下载
			// 	var newData = getCookie('newData');
			// 	var link = OverallData().download
			// 	if(newData){
			// 	    window.open(link+'?_userId='+newData.userid);
			// 	}else{
			// 	    window.open(link);
			// 	}
			// },
			toHeMai:function(){
				sessionStorage.removeItem('shaixuan');
				sessionStorage.removeItem('arr');
				this.$router.push({
					name:'heimai_lobby',
				})
			},
			toKaiJiang: function() {
                var name = "JCZQ";
				var data=[];
				data['lotteryType']=["JCZQ"];
				let dataes = this.Qs.stringify({
					"path": "winnumbers",
					data 
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/findResultsMenu',
						dataes
					)
					.then(ret => {
						 if (ret.status == 200) {
						    var pernum = JSON.parse(ret.data.content); //转换为json对象
						    console.log(JSON.stringify(pernum));
						    if (!pernum.data['JCZQ']) {
						        Toast("暂无开奖信息！");
						        return false;
						    }
						    this.topMenuShow=false;
							sessionStorage.removeItem('shaixuan');
							sessionStorage.removeItem('arr');
							this.$router.push({
								path:'/lottery/football_details',
								query:{
									"change_text": '竞彩足球',
									'matchTime': getTime(pernum.data.JCZQ.matchTime, 5),
									 'ball_name': 'jczq'
								}
							})
						  
						} else {
						    Toast("服务器异常，请稍后重试");
						}
					})
					.catch(err => {
						console.log(err)
					})
            }
		}
	}

</script>

<style scoped>
	@import "../../css/goucai_jjc.css";
	/* .flr {
		float: left;
	}
	
	.fgr {
		float: right;
	} */
	header {
		position: fixed;
		height: 2.25rem !important;
	}
	.routerView{
		margin-top: 2.25rem;
		margin-bottom: 3.8rem;
	}
</style>
