<template>
	<div>
	<header class="aui-bar aui-bar-nav">
        <div class="aui-pull-left aui-btn" tapmode @click="bake()">
          <span class="aui-iconfont aui-icon-left"></span>
        </div>
        <div>
          <div class="aui-title" id="pagetitle" @click="ChoiceType()" data-type="0" tapmode><span>{{navname}}</span>  <img src="../../assets/goucai/jjc/xiajiantou.png" /></div>
        </div>
        <div class="aui-pull-right aui-btn">
            <span tapmode @click="saixun()"><img src="../../assets/goucai/jjc/shaixuan.png" /></span>
            <div class="top-more" @click="menuPage()" tapmode>
              <span></span><span></span><span></span>
            </div>
        </div>
    </header>
		<div class="jjc_lq" id="jjc_lp" v-cloak>
			<!-- 筛选 -->
			<div class="shaixuan" v-show="shaixuanshow" >
				<div class="title">
					共有<span id="totalList">{{sxcc}}</span>场比赛可投
				</div>
				<div class="wrap">
					<div class="biaoti">赛事选择</div>
					<div class="nav lq_nav">
						<ul>
							<li :class="{ 'active': Totalselection }" @click="TotalselectionFun">全选</li>
							<li :class="{ 'active': Reveselection }" @click="ReveselectionFun">反选</li>
							<!-- <li :class="{ 'active': lianselection }" @click="lianselectionFun">仅五大联赛</li> -->
						</ul>
					</div>
					<div class="box">
						<ul>
							<li v-for="(item, index) in sxlist" :class="{ 'active': item.state }" @click="clicksaixun(index,'item.state')">{{ item.name }}</li>
							<li v-if="saixunList.length%3 == 2" style="border: 0;background: none;"></li>
						</ul>
					</div>
				</div>
				<div class="Determine" @click="sxDetermine">
					完成
				</div>
			</div>
			<!-- 菜单 -->
			<div class="topMenu" v-show="topMenushow" @click='hidemoc()'>
				<ul>
					<li @click='toKaiJiang()'>开奖信息</li>
					<li @click='fenx()'>分享</li>
					<li @click='toHeMai()'>合买</li>
					<li @click='toPlay("竞技篮球")'>玩法</li>
				</ul>
			</div>
            <!-- 分享模态框 -->
            <div v-if="shareStatue" class="share_box" @click="hideShare()">
                <div class="share_cont">
                    <div class="quxiao">取消</div>
                    <div class="down" onclick="openDownload()">前往下载</div>
                </div>
            </div>
			<!-- 头部模态框 -->
			<div class="nav-Tab" v-show="myChoiceshow" @click="hideChoice()">
				<div class="list">
					<li :class="{ select: navPlay == item.play }" v-for='item in typeList' @click.stop="setChoice(item.play,item.name,item.pash)">{{ item.name }}</li>
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
<!-- 		<footer id="footers">
			<div class="delete flr" @click="close_match()" ></div>
			<div class="total flr">
				<p>已选择<span id="chosenField">{{chosenField}}</span>场</p>
				<p>请至少选择<span>{{totalField}}</span>场比赛</p>
			</div>
			<div class="pay fgr" @click="setBetting()" >投注</div>
		</footer> -->
		    <footer id='footers'>
        <div class="ft_money flr">
          <p>已选择<span id="chosenField">{{chosenField}}</span>场</p>
          <p>请至少选择<span>{{totalField}}</span>场比赛</p>
        </div>
        <div class="ft_btn fgr">
            <div class="flr" tapmode @click="close_match()">
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
	import {phoneLQ} from "../../js/connector.js";
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
				chosenField: 0,
				totalField: 2,
				sfcchoose: [], //sfc选中的初选
				sfcchoosesp: [], //sfc初选sp
				sfc: '', //sfc点击更多投注项的数据
				cindex: '', //当前数据的index
				rindex: '', //当前数据的index
				sfcchoose_qx: [], //取消数组
				sfcchoose_qxtext: [], //取消数组
				sxlist: [], //赛选数组
				sxlistdata: [],
				sxcc:0, //赛选的场次
				lqpay: [], //投注页面的存值
				matchListdata: [], //保存页面的值
				LoadDone1: false,
				genduo: false,
				myChoiceshow: false, //控制彩种弹窗的显示隐藏
				shaixuanshow:false,//控制筛选的显示隐藏
				topMenushow:false,//分享合买的显示隐藏
				saixunList:[],
				typeList: [{
					'id': '0',
					'name': '大小分',
					pash:'goucai_jjc_lq_dxf',
					'play': 'DXF'
				}, {
					'id': '1',
					pash:'goucai_jjc_lq_rfsf',
					'name': '让分胜负',
					'play': 'RFSF'
				}, {
					'id': '2',
					'name': '胜负',
					pash:'goucai_jjc_lq_sf',
					'play': 'SF'
				}, {
					'id': '3',
					'name': '胜分差',
					pash:'goucai_jjc_lq_sfx',
					'play': 'SFC'
				}, {
					'id': '4',
					'name': '混合过关',
					pash:'goucai_jjc_lq_hhgg',
					'play': 'HHGG'
				}, {
					'id': '5',
					'name': '单关固赔',
					pash:'goucai_jjc_lq_dggp',
					'play': 'DGGP'
				}],
				RQSPFlist: [],
               isShuaxin : true,
				navPlay: 'RFSF',
				navname: '让分胜负',
				PopupsfcIdx: '0',
				PopuphhggIdx: '0',
				PopupdggpIdx: '0',
				Totalselection: true,
				Reveselection: false,
				lianselection: false,
				PopupArr: {
					Popupsfc: false,
					Popuphhgg: false,
					Popupdggp: false,
				},
				bqcTZinfo: [{
					0: false,
					1: false
				}, {
					0: false,
					1: false
				}],
				
			};
		},
		created() {
            if (getCookie('logok')) {  //判断是否实名
                this.logok = true;
            }

			if(getSession('play')){
				this.navPlay = getSession('play');
				this.navname = getSession('playTypeName');
			}else{
				setSession("play",this.navPlay);
				setSession("playTypeName",this.navname);
			}
		    	console.log(this.navname);
			if(this.navPlay=='SFC'){
				this.totalField='1';
			}else if(this.navPlay=='DGGP'){
					this.totalField='1';
			}
		},
		mounted() {
			phoneLQ.$on('lengths', (val) => {
				this.chosenField = val;
			
			});
			
           phoneLQ.$on('sxcc', (val) => {
				this.sxcc = val;
			});
			phoneLQ.$on('saixunList', (val) => {
				this.sxlist = val;
			});
			window.openDownload=openDownload;
			phoneLQ.$on('mataleng', (val) => {
				
				this.setChoice('DGGP', '单关固赔','goucai_jjc_lq_dggp');
			});
// 			if (getSession('play')) {
// 				this.play = getSession('play');
// 				this.playTypeName = getSession('playTypeName');
// 			}else{
// 				setSession('play',"RQSPF");
// 				setSession('playTypeName',"让球胜平负");
// 			}
		},
		beforeDestroy () {
		     phoneLQ.$off('delete');
					
		      },
		     
		filters: {
			GetTimeStr: function(matchDate, num) {
				var now = new Date(matchDate);
				if (num == 0 || num == 1) {
					var dayss = "";
					if (now.getDay() == 0) dayss = "周日";
					else if (now.getDay() == 1) dayss = "周一";
					else if (now.getDay() == 2) dayss = "周二";
					else if (now.getDay() == 3) dayss = "周三";
					else if (now.getDay() == 4) dayss = "周四";
					else if (now.getDay() == 5) dayss = "周五";
					else if (now.getDay() == 6) dayss = "周六";
					else dayss = "周日";
					return now.getFullYear() + "-" + Get0pad(now.getMonth() + 1, 2) + "-" + Get0pad(now.getDate(), 2) + " " + dayss;
				} else if (num == 2) {
					var dayss = "";
					if (now.getDay() == 0) dayss = "周日";
					else if (now.getDay() == 1) dayss = "周一";
					else if (now.getDay() == 2) dayss = "周二";
					else if (now.getDay() == 3) dayss = "周三";
					else if (now.getDay() == 4) dayss = "周四";
					else if (now.getDay() == 5) dayss = "周五";
					else if (now.getDay() == 6) dayss = "周六";
					else dayss = "周日";
					return dayss;
				} else return Get0pad(now.getHours(), 2) + ":" + Get0pad(now.getMinutes(), 2);
			},
			gamesShow: function(name) {
				var shaixuan = getSession('shaixuan');
				if (!shaixuan) {
					shaixuan = [];
				}
				if (shaixuan.indexOf(name) > -1) {
					return true;
				} else {
					return false;
				}
			}
		},
		methods: {
			 toPlay(name){	//	玩法
				sessionStorage.setItem('play',name);
				// location.href = 'http://www.baidu.com';
				this.$router.push({
					path:"/goucai/play",
					query:{
						isApp:'0',
						dataType:"jclq"
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
			reload: function() {
				this.isShuaxin = false;
				this.$nextTick(() => {
					this.isShuaxin = true;
				})
			},
			bake: function() {
				sessionStorage.removeItem('shaixuan')
				sessionStorage.removeItem('arr');
				sessionStorage.removeItem('passTypes');
				sessionStorage.removeItem('passTypesnum');
				sessionStorage.removeItem('playTypeName');
				sessionStorage.removeItem('play');
				sessionStorage.removeItem('matchDate');
				sessionStorage.removeItem('mataces');
				this.$router.go(-1); //根据浏览器记录返回上一次
			},
			close_match:function(){
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
						this.chosenField=0;
						sessionStorage.removeItem('arr');
						sessionStorage.removeItem('matchDate');
						this.reload();
					} else {
						// next(false)
						
					}
				})
				
			},
			ChoiceType:function(){
				if(this.myChoiceshow){
					this.myChoiceshow=false;
				}else{
					this.myChoiceshow=true;
				}
				
			},
			setChoice: function(play, name,path) {
				this.myChoiceshow=false;
				setSession('play', play);
				setSession('playTypeName', name)
				this.navPlay = getSession('play');
				this.navname = getSession('playTypeName');
				sessionStorage.removeItem('shaixuan');
				sessionStorage.removeItem('arr');
				sessionStorage.removeItem('passTypes');
				sessionStorage.removeItem('passTypesnum');
				this.chosenField=0;
				console.log(this.navPlay);
				if(this.navPlay=='SFC'){
					this.totalField=1;
					console.log(this.totalField);
				}else if(this.navPlay=='DGGP'){
					this.totalField=1;
					console.log(this.totalField);
				}else{
					this.totalField=2;
					console.log(this.totalField);
				}
				this.reload();
				this.$router.replace({
					path,
					query: {
						play
					}
				})
				
			},
            fenx: function(){   //分享
                this.shareStatue = true;
            },
            hideShare: function(){
                this.shareStatue = false;
            },
            // openDownload: function(){   //前往下载
            //     var newData = getCookie('newData');
            //     var link = OverallData().download
            //     if(newData){
            //         window.open(link+'?_userId='+newData.userid);
            //     }else{
            //         window.open(link);
            //     }
            // },
			hideChoice: function() {
		
					this.myChoiceshow=false;
				
			
			},
			saixun:function(){
				   this.topMenushow=false;
				if(this.shaixuanshow){
					this.shaixuanshow=false;
				}else{
					this.shaixuanshow=true;
				}
				
			},
			TotalselectionFun: function() {
				this.Totalselection = true
				this.Reveselection = false
				// this.lianselection = false
				for (var i = 0; i < this.sxlist.length; i++) {
					this.sxlist[i].state = true
				}


			},
			ReveselectionFun: function() {
				this.Totalselection = false
				this.Reveselection = true
				// this.lianselection = false
				for (var i = 0; i < this.sxlist.length; i++) {
					if (this.sxlist[i].state) {
						this.sxlist[i].state = false
					} else {
						this.sxlist[i].state = true
					}
				}
			},
           menuPage:function(){
           	this.shaixuanshow = false
			   if(this.topMenushow){
				   this.topMenushow=false;
			   }else{
				    this.topMenushow=true;
			   }
		   },
			clicksaixun: function(idx, key) {
				this.Reveselection = false
				this.lianselection = false
				this.sxlistdata = JSON.parse(JSON.stringify(this.sxlist));
				if (this.sxlist[idx].state) {
					this.Totalselection = false
					this.$set(this.sxlist[idx], 'state', false);
				
				} else {
					this.$set(this.sxlist[idx], 'state', true);
					
				}


			},
			sxDetermine: function() {
				var sxlist = this.sxlist;
			
				this.sxlistdata = JSON.parse(JSON.stringify(sxlist));
				this.shaixuanshow=false;
				var shaixuan = [];
				var num = 0;
				for (var i = 0; i < sxlist.length; i++) {
					if (sxlist[i].state) {
						this.$set(this.sxlist[i], 'state', true);
						shaixuan.push(sxlist[i].name);
						num += 1;
					}else{
						this.$set(this.sxlist[i], 'state', false);
					}
				}
				if (num == sxlist.length) {
					this.Totalselection = true
				}
				
				this.chosenField=0;
				sessionStorage.removeItem('arr');
				setSession('shaixuan', shaixuan);
				this.reload();
			},
		hidemoc:function(){
			if(this.topMenushow){
				this.topMenushow=false;
			}else{
				this.topMenushow=true;
			}
			},
			toHeMai:function(){
				sessionStorage.removeItem('shaixuan');
				sessionStorage.removeItem('arr');
				this.$router.push({
					name:'heimai_lobby',
				})
			},
			toKaiJiang: function() {
			    var name = "JCLQ";
				var data=[];
				data['lotteryType']=["JCLQ"];
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
						    if (!pernum.data['JCLQ']) {
						        Toast("暂无开奖信息！");
						        return false;
						    }
						    this.topMenuShow=false;
							sessionStorage.removeItem('shaixuan');
							sessionStorage.removeItem('arr');
							this.$router.push({
								path:'/lottery/football_details',
								query:{
									"change_text": '竞彩篮球',
									 'matchTime': getTime(pernum.data.JCLQ.matchTime, 5),
									 'ball_name': 'jclq'
								}
							})
						  
						} else {
						    Toast("服务器异常，请稍后重试");
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			setBetting:function(){
				let uid=getCookie('newData');
				if(!uid){
					this.$router.push({
						name:'login'
					})
					return false;
				}
                // if (getCookie('logok')) {  //判断是否实名
                // 	this.logok = true;
                //     return false;
                // }
				if(this.navPlay=='SFC'||this.navPlay=='DGGP'){
					if(this.chosenField<1){
						Toast('请至少选择一场比赛！');
						return false;
					}
					if(this.chosenField>8){
						Toast('单场投注只能选择8场比赛！');
						return false;
					}
				}else{
						if(this.chosenField<2){
						Toast('请至少选择两场比赛！');
						return false;
					}
					if(this.chosenField>8){
						Toast('单场投注只能选择8场比赛！');
						return false;
					}
				}
				this.$router.push({
					path: '/goucai/goucai_jjc_lqpay',
				})
				
			}
			

		}

	}
</script>
<style scoped>
	@import "../../css/goucai_jjc.css";

	header {
		position: fixed;
	}

	.routerView {
		margin-top: 2.25rem;
		margin-bottom: 3.8rem;
	}
</style>
