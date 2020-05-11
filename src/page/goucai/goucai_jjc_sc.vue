<template>
	<div>
<!-- 		<header class="aui-bar aui-bar-nav">
			<div class="aui-pull-left aui-btn" @click="closeWin()">
				<span class="aui-iconfont aui-icon-left"></span>
			</div>
			<div class="aui-title" id="pagetitle" @click="ChoiceType()" data-type="0" tapmode><span>{{typeList[palyIndex].name}}</span> <img src="../../assets/goucai/jjc/xiajiantou.png" /></div>
			<div class="aui-pull-right aui-btn">
				<span @click="menuPage()"><img src="../../assets/goucai/jjc/menu.png" /> </span>
			</div>
		</header> -->
		<header class="aui-bar aui-bar-nav">
      <div class="aui-pull-left aui-btn" tapmode @click="closeWin()">
        <span class="aui-iconfont aui-icon-left"></span>
      </div>
      <div>
        <div class="aui-title" id="pagetitle" @click="ChoiceType()" data-type="0" tapmode><span>{{typeList[palyIndex].name}}</span>  <img src="../../assets/goucai/jjc/xiajiantou.png" /></div>
      </div>
      <div class="aui-pull-right aui-btn">
          <!-- <span tapmode onclick="saixun()"><img src="../image/frame1/jjc/shaixuan.png" /></span> -->
          <div class="top-more" @click="menuPage()" tapmode>
            <span></span><span></span><span></span>
          </div>
      </div>
  </header>
		<div class="jjc_zq" id="jjc_zq">
			<!-- 菜单 -->
			<div class="topMenu" @click='hidemoc()' v-show='topMenuShow'>
				<ul>
					<li @click='toKaiJiang()'>开奖信息</li>
					<li @click='fenx()'>分享</li>
					<li @click='toHeMai()'>合买</li>
					<li @click='toPlay("")'>玩法</li>
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
					<li v-for='(item,index) in typeList' @click.stop="setChoice(item.path,index)" :class="{ select: palyIndex == index }">{{ item.name }}</li>
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
				<p>请至少选择<span id="totalField">{{typeList[palyIndex].id}}</span>场比赛</p>
			</div>
			<div class="pay fgr" @click="setBetting()">投注</div>
		</footer> -->
		<footer >
    <div class="ft_money flr">
          <p>已选择<span id="chosenField">{{num}}</span>场</p>
          <p>请至少选择<span id="totalField">{{typeList[palyIndex].id}}</span>场比赛</p>
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
				num: 0,
				palyIndex: 3,
				add: 0,
				isShuaxin: true,
				Totalselection: true,
				Reveselection: false,
				lianselection: false,
				tabIsShow: false, //玩法切换列表显示与隐藏
				cunSaiXuanList: [],
				topMenuShow: false,
				typeList: [
					{
						'id': 6,
						'name': '六场半全场',
						'path': 'goucai_jjc_zq_lcb',
						'play': 'LCZC',
						'type':'6cbqc'
					},
					{
						'id': 9,
						'name': '任选九场',
						'path': 'goucai_jjc_zq_rxjc',
						'play': 'RXZC',
						'type':'rx9'
					},
					{
						'id': 14,
						'name': '胜负彩',
						'path': 'goucai_jjc_zq_sfc',
						'play': 'SFZC',
						'type':'sfc'
					},
					{
						'id': 4,
						'name': '四场进球',
						'path': 'goucai_jjc_zq_sc',
						'play': 'SCZC',
						'type':'4cjq'
					}
				],
			};
		},
		beforeRouteLeave (to, from , next) {
			next();
		},
		created() {
            if (getCookie('logok')) {  //判断是否实名
                this.logok = true;
            }
			if (this.$route.query.patyInd){
				this.palyIndex = parseInt(this.$route.query.patyInd);
				setSession('palyIndex',this.palyIndex);
				this.$router.replace({
					path: this.typeList[this.palyIndex].path
				})
			}
		},
		mounted() {
			phone.$on('sclengths', (val) => {
				this.num = val;
			});
			let idx = getSession('palyIndex')
			if (idx == null) {
				setSession('palyIndex',3);
			} else {
				this.palyIndex = idx;
			}
			window.openDownload=openDownload;
		},
		beforeDestroy () {
		    phone.$off('delete');
		},
		methods: {
			toPlay(){	//	玩法
				
				// sessionStorage.setItem('play',document.querySelector('.aui-title').innerText);
				// location.href = 'http://www.baidu.com';
				this.$router.push({
					path:"/goucai/play",
					query:{
						isApp:'0',
						dataType:this.typeList[this.palyIndex].type
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
				sessionStorage.removeItem('palyIndex');
				sessionStorage.removeItem('arr');
				this.$router.go(-1);
			},
			hidemoc: function() {
				this.topMenuShow = false;
			},
			ChoiceType: function() {
				this.tabIsShow = !this.tabIsShow;
			},
			setChoice: function(path, index) {
				this.palyIndex = index;
				this.tabIsShow = false;
				this.num=0;
				sessionStorage.removeItem('arr');
				setSession('palyIndex', index);
				this.$router.replace({
					path
				})
				phone.$off('delete');
			},
			hideChoice: function() {
				this.tabIsShow = false;
			},
			reload: function() {
				let path = this.typeList[this.palyIndex].path
				this.$router.replace({
					path
				})
				this.isShuaxin = false;
				this.$nextTick(() => {
					this.isShuaxin = true;
				})
			},
			menuPage: function() {
				this.topMenuShow = !this.topMenuShow
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
						phone.$emit('delete', true);
						this.num = 0
					} else {
						// next(false)
						
					}
				})
				
			},
			setBetting: function() {
				let uid=getCookie('newData');
				if (!uid) {
					this.$router.push({
						name: 'login'
					})
					return false;
				}
                // if (getCookie('logok')) {  //判断是否实名
                // 	this.logok = true;
                //     return false;
                // }
				var arr=getSession('arr');
				if(this.num < this.typeList[this.palyIndex].id){
					Toast('最少请选择'+this.typeList[this.palyIndex].id+'场!');
					return
				} else if (arr) {
					this.$router.push({
						name: 'goucai_jjc_scpay'
					})
				} else {
					Toast('数据异常，请重新投注!');
					return
				}
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
				sessionStorage.removeItem('arr');
				this.$router.push({
					name:'heimai_lobby',
				})
			},
			toKaiJiang: function() {
			    var name="",xname="",change_text="四场进球";
				switch (this.palyIndex) {
					case 3:
					  name = 'SCZC'
					  xname = 'sczc'
					  break;
					case 0:
					  name = 'LCZC'
					  xname = 'lczc'
					  change_text = '六场半全场'
					  break;
					case 1:
					  name = 'SFZC'
					  xname = 'sfzc'
					  change_text = '胜负彩/任选九'
					  break;
					case 2:
					  name = 'SFZC'
					  xname = 'sfzc'
					  change_text = '胜负彩/任选九'
					  break;
				}
				var data=[];
				data['lotteryType']=[name];
				let dataes = this.Qs.stringify({
					"path": "winnumbers",
					data 
				}, {
					allowDots: true
				});
				this.$ajax.post('/caipiaoshouye/index.php/home/index/findResultsMenu',dataes).then(ret => {
					if (ret.status == 200) {
						var pernum = JSON.parse(ret.data.content); //转换为json对象
						console.log(JSON.stringify(pernum));
						if(JSON.stringify(pernum.data[name]).length < 3){
							Toast("暂无开奖信息！");
							return false;
						}
						this.topMenuShow=false;
						sessionStorage.removeItem('arr');
						this.$router.push({
							path:'/lottery/four_six_details',
							query:{
								change_text: change_text,
								ball_name: xname,
								periodId: pernum.data[name].periodId,
							}
						})
					  
					} else {
						Toast("服务器异常，请稍后重试");
					}
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped>
	@import "../../css/goucai_jjc.css";
	header{
		position: fixed;
	}
	.routerView{
		margin-top: 2.25rem;
		margin-bottom: 3.8rem;
	}
</style>
