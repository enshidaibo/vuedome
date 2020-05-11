<template>
	<div id='hemai'>
		<header class="aui-bar aui-bar-nav" id="aui-header">
			<a class="aui-btn aui-pull-left" tapmode @click="backreo()">
				<span class="aui-iconfont aui-icon-left"></span>
			</a>
			<div class="aui-title " @click="start_hemai"><span>{{title}}</span> <img src="../../assets/userinfo/triangle.png"> </div>
			<div class="aui-pull-right" @click="hemai_hot()">
				<img class="user_icon" src="../../assets/userinfo/user_icon_white.png" alt=""><span class="aui-font-size-14 title_right">合买红人</span>
			</div>
		</header>
		<div class="aui-searchbar searches" id="search" >
	     <div class="aui-searchbar-input aui-border-radius search_input" tapmode >
	         <i class="aui-iconfont aui-icon-search" ></i>
	         <div style="width: 90%;">
	             <input type="text" placeholder="输入用户名进行搜索" id="search_input" maxlength="20" @keyup="search($event)" autocomplete="off">
	         </div>
	     </div>
	   </div>
		<div class="aui-tab nav" id="tab"> 
			<!-- <div class="aui-tab-item tapmode item shaixun" @click="allPay('progressRate')" :class="{'active':allPays}" >全部合买</div> -->
			<div class="aui-tab-item tapmode item shaixun" @click="progress_sort('progressRate')" :class="{'active':progress}">
				<span class="progress">进度排序</span>
				<div class="triangle" id="progress-order">
					<span class="triangle_border_up" :class="progress_d?'gray':'red'"></span>
					<span class="triangle_border_down" :class="progress_d?'red':'gray'"></span>
				</div>
			</div>
			<div class="aui-tab-item tapmode item shaixun" @click="date_s('createTime')" :class="{'active':date_sort}">
				<span class="date">时间排序</span>
				<div class="triangle" id="date-order">
					<span class="triangle_border_up" :class="date_sort_d?'gray':'red'"></span>
					<span class="triangle_border_down" :class="date_sort_d?'red':'gray'"></span>
				</div>
			</div>
		</div>
		<router-view class='routerView' :key='routerView'  :page_s='pages' :searchName = 'searchName' v-if='isShuaxin'></router-view>
		<input id='Fbutton' @click="fqhm()" class="button" type="button" name="" value="发起合买" style="">
		<div class="layer" v-if="isshow">
			<span class="mask" @click="close_layer()"></span>
			<span class="empty"></span>
			<ul class="contain">
				<li  :class="title == '全部彩种'?'item actives':'item'" @click = 'setPattern("全部彩种")'  tapmode>全部彩种</li>
		        <li  :class="title == '双色球'?'item actives':'item'" @click = 'setPattern("双色球")'  tapmode>双色球</li>
		        <li  :class="title == '大乐透'?'item actives':'item'" @click = 'setPattern("大乐透")'   tapmode>大乐透</li>
		        <li  :class="title == '福彩3D'?'item actives':'item'" @click = 'setPattern("福彩3D")'   tapmode>福彩3D</li>
		        <li  :class="title == '七乐彩'?'item actives':'item'" @click = 'setPattern("七乐彩")'   tapmode>七乐彩</li>
		        <li  :class="title == '排列三'?'item actives':'item'" @click = 'setPattern("排列三")'   tapmode>排列三</li>
		        <li  :class="title == '排列五'?'item actives':'item'" @click = 'setPattern("排列五")'  tapmode>排列五</li>
		        <li  :class="title == '竞彩足球'?'item actives':'item'" @click = 'setPattern("竞彩足球")'   tapmode>竞彩足球</li>
		        <li  :class="title == '竞彩篮球'?'item actives':'item'" @click = 'setPattern("竞彩篮球")'   tapmode>竞彩篮球</li>
		        <li  :class="title == '六场半全场'?'item actives':'item'" @click = 'setPattern("六场半全场")'   tapmode>六场半全场 </li>
		        <li  :class="title == '北京单场'?'item actives':'item'" @click = 'setPattern("北京单场")'   tapmode>北京单场</li>
		        <li  :class="title == '任选九场'?'item actives':'item'" @click = 'setPattern("任选九场")'   tapmode>任选九场</li>
		        <li  :class="title == '胜负彩'?'item actives':'item'" @click = 'setPattern("胜负彩")'   tapmode>胜负彩</li>
		        <li  :class="title == '四场进球'?'item actives':'item'" @click = 'setPattern("四场进球")'  tapmode>四场进球</li>
			</ul>
			
		</div>

	</div>

</template>

<script>
	import {
		setSession
	} from "../../js/common.js"
	export default {
		data() {
			return {
				title:'全部彩种',
				progress: true,
				progress_d: true,
				date_sort: false,
				date_sort_d: true,
				activeDate: '',
				isShuaxin: true,
				pages:'1',
				routerView:true,
				searchs:"",
				isshow:false,
				routerView:new Date().getTime(),
				searchName:''
				// allPays:true
			};
		},
		created() {
			sessionStorage.removeItem('play');
			sessionStorage.removeItem('shaixuan');
			sessionStorage.removeItem('selected');
			sessionStorage.removeItem('playTypeName');
			sessionStorage.removeItem('name');
			this.activeDate = (new Date()).toString();
		},
		methods: {
			search(e){
		   		if(e.keyCode == 13){
		   			this.searchName = this.searchs
		   			this.routerView = new Date().getTime()
		   		}else{
					this.searchs = e.target.value
		   		}
		  	},
			reload: function() {
				this.isShuaxin = false;
				this.$nextTick(() => {
					this.isShuaxin = true;
					this.pages = 1;
				})
			},
			allPay:function(orders){
				this.reload();
				window.scrollTo(0,0)
				this.allPays = true
				this.progress = false;
				this.date_sort = false;
				this.$router.replace({
					path: 'progress_sort',
					query: {
						paixu:'asc',
						order:orders
					}
				})
			},
			progress_sort: function(orders) {
				this.reload();
				window.scrollTo(0,0)
				this.allPays = false
				this.progress = true;
				this.date_sort = false;
				this.progress_d = !this.progress_d;
				var paixu;
				if (this.progress_d) {
					paixu = 'asc'
				} else {
					paixu = 'desc'
				}
				this.$router.replace({
					path: 'progress_sort',
					query: {
						paixu,
						order:orders
					}
				})

			},
			date_s: function(orders) {
				window.scrollTo(0,0)
				this.reload();
				this.allPays = false
				this.progress = false;
				this.date_sort = true;
				this.date_sort_d = !this.date_sort_d;
				var paixu;
				if (this.date_sort_d) {
					paixu = 'asc'
				} else {
					paixu = 'desc'
				}
				this.$router.replace({
					path: 'progress_sort',
					query: {
						paixu,
						order:orders
					}
				})


			},
			backreo: function() {
				sessionStorage.removeItem('selected')
				this.$router.go(-1);
			},
			shaixuncaizhong:function(){
				this.$router.push({
					name:'select'
				})
			},
			start_hemai:function(){
				this.isshow?this.isshow=false:this.isshow=true

			},
			close_layer:function(){
				this.isshow=false
			},
			hemai_hot:function(){
				sessionStorage.removeItem('selected')
				this.$router.push({
					name:"hemai_hot",
				})
			},
			fqhm:function(){
				this.$router.push({
						path:'/userinfo/hemai/select'
					})
			},
			goGouCai:function(name,patyInd){
				if(patyInd){
					this.$router.push({
						path:'/goucai/goucai_jjc_sc',
						query: {
							'patyInd': patyInd
						}
					})
				}else{
					this.$router.push({
						name
					})
				}
			},
			setPattern(ops){
				this.isshow=false
		        this.title = ops;
		          var selected = []
		          selected.push(ops)
		          if(ops != '全部彩种'){
		           	setSession('selected', selected);
		          }else{
					sessionStorage.removeItem('selected')
		          }
		          	this.reload()

	        }
		},
		
    
	}
    
</script>

<style scoped>
.aui-bar-nav {
    background-color: #03a9f4 !important;
    color: #ffffff;
}
.aui-title {
	    color: #fff !important;
	}
	html {
		background: rgb(242, 242, 242);
	}

	#hemai {
		background: rgb(242, 242, 242);
		min-height: 100vh;
	}

	header {
		position: fixed;
	}

	.shaixun.active {
		border-bottom: 2px solid #03A9F4;
    	color: #03A9F4;
	}

	.aui-bar-nav {
		height: 2.25rem;
		line-height: 2.25rem;
	}

	.aui-bar-nav .aui-btn {
		height: 2.25rem;
		line-height: 2.25rem;
	}

	.nav {
		padding-bottom: 0 !important;
	}

	.user_icon {
		width: 16%;
		margin-right: 0.2rem;
	}

	.title_right {
		font-weight: normal;
	}

	.nav {
		border-bottom: 3px solid #f2f2f2;
		padding-bottom: 2px;
	}

	.item {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.triangle {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-left: 0.2rem;
		margin-top: -.1rem.
	}

	.triangle_border_up {
		width: 0;
		height: 0;
		border-width: 0 4px 4px;
		border-style: solid;
		border-color: transparent transparent #e2e2e2;
		margin: 2.5px auto;
		position: relative;
	}

	.triangle_border_up.red {
		border-color: transparent transparent #f73f3f;
	}

	.triangle_border_down {
		width: 0;
		height: 0;
		border-width: 4px 4px 0;
		border-style: solid;
		border-color: #f73f3f transparent transparent;
		margin: 0px auto;
		position: relative;
	}

	.triangle_border_down.gray {
		border-color: #e2e2e2 transparent transparent;
	}

	.progress,
	.date {
		margin-right: 2px;
	}

	.aui-tab-item {
		font-size: 0.8rem;
		font-weight: normal;
		color: #6D6D6D;
	}

	.aui-title {}

	.aui-tab-item.aui-active {
		color: #f73f3f;
	}

	.aui-bar-nav .aui-pull-right {
		justify-content: center;
	}

	.aui-bar-nav .aui-title .aui-btn {
		height: 2.25rem;
		line-height: 2.25rem;
	}
	.aui-bar-nav .aui-title{
	    right: 7rem;
	    left: 7rem;
	}
	.aui-title  span{
	    float: left;
	    width: 82%;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;

	    text-align: center;
	  }
	  .aui-title img{
	    float: left;
	    width: 6px;
	    margin: 1rem .2rem;
	  }
	.layer {
		position: fixed;
		top: 2.25rem;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 999;
		/* display: none; */
		background-color: rgb(242, 242, 242);

	}

	.mask {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 10;
	}

	.contain {
		position: fixed;
	    top: 2.25rem;
	    left: 0;
	    width: 100%;
	    /* bottom: 30%; */
	    z-index: 100;
	    /* padding: 0 2%; */
	    background-color: #FFFFFF;
	    padding-top: 3%;
	    padding-bottom: 3%;
	}

	.contain .item {
		width: 30%;
	    position: relative;
	    float: left;
	    text-align: center;
	    height: 2rem;
	    color: #4A4A4A;
	    line-height: 2rem;
	    font-size: 0.6rem;
	    background-color: #F5FAFF;
	    margin-bottom: 0.5rem;
	    /* margin-right: 0.8rem; */
	    margin-left: 3%;
	}
	.actives{
		background: #E45869 !important;
    	color: #fff !important;
	}
	.item:nth-child(3n+3) {
		margin-right: 0;
	}

	.button {
		width: 100%;
	    margin-left: 0%;
	    border-radius: 0px;
	    color: #fff;
	    height: 2rem;
	    background-color: rgb(228, 88, 105);
	    outline: 0px;
	    -webkit-appearance: none;
	    margin-top: 10rem;
	    margin-bottom: 0px;
	    z-index: 100;
	    position: fixed;
	    bottom: 0px;
	}

	.data_no {
		position: fixed;
		top: 50%;
		width: 100%;
		text-align: center;
		color: white;
	}

	.data_no span {
		background-color: rgba(0, 0, 0, 0.5);
	}

	.hide {
		display: none;
	}

	#tab {
		position: fixed;
		top: 4.25rem !important;
		width: 100%;
		z-index: 99;
	}
	.routerView{
		top: 6.45rem;
		position: relative;
	}
	.aui-searchbar{
		position: fixed;
	    top: 2.25rem;
	    z-index: 999;
	}
	.aui-tab-item {
	    /* width: 100%; */
	    height: 2.2rem;
	    margin: 0px 20%;
	    line-height: 2.2rem;
	    position: relative;
	    font-size: 0.7rem;
	    text-align: center;
	    color: #212121;
	    margin-left: -1px;
	    -webkit-box-flex: 1;
	    box-flex: 1;
	    margin: 0px 12%;
	    padding: 0 2%;
	}
	.aui-searchbar{
		background-color: rgb(169, 203, 239) !important;
	}
</style>
