<template>
	<div>
		<header class="aui-bar aui-bar-nav" id="aui-header">
			<a class="aui-btn aui-pull-left" tapmode @click="back()">
				<span class="aui-iconfont aui-icon-left"></span>
			</a>
			<div class="aui-title">选择彩种</div>
			<!-- <div class="aui-pull-right" @click="complates()">
				<span class="aui-font-size-16">完成</span>
			</div> -->
		</header>

		<div class="content">
			<!-- <div class="header">
				<span onclick="selectAll(this)" class="select all active">全选</span>
				<span onclick="selectNoAll(this)" class="select no">反选</span>
			</div> -->
			<ul class="contain">
				<li @click="select('ssq')" :class="pageType == 'ssq'?'item av':'item'">双色球</li>
				<li @click="select('dlt')" :class="pageType == 'dlt'?'item av':'item'">大乐透</li>
				<li @click="select('fc3d')" :class="pageType == 'fc3d'?'item av':'item'">福彩3D</li>
				<li @click="select('qlc')" :class="pageType == 'qlc'?'item av':'item'">七乐彩</li>
				<li @click="select('pl3')" :class="pageType == 'pl3'?'item av':'item'">排列三</li>
				<li @click="select('pl5')" :class="pageType == 'pl5'?'item av':'item'">排列五</li>
				<li @click="select('jczq')" :class="pageType == 'jczq'?'item av':'item'">竞彩足球</li>
				<li @click="select('jclq')" :class="pageType == 'jclq'?'item av':'item'">竞彩篮球</li>
				<li @click="select('lcbqc')" :class="pageType == 'lcbqc'?'item av':'item'">六场半全场 </li>
				<li @click="select('bjdc')" :class="pageType == 'bjdc'?'item av':'item'">北京单场</li>
				<li @click="select('rxjc')" :class="pageType == 'rxjc'?'item av':'item'">任选九场</li>
				<li @click="select('sfc')" :class="pageType == 'sfc'?'item av':'item'">胜负彩</li>
				<li @click="select('sczc')" :class="pageType == 'sczc'?'item av':'item'">四场进球</li>
			</ul>

		</div>
		<div class="btns"  @click="complate()">
		        发起合买
		    </div>
		    <div class='closebtn' @click="back()">取消</div>
	</div>
</template>

<script>
	import {
		setSession
	} from "../../../js/common.js"
	export default {
		data() {
			return {
				pageType:""
			};
		},
		methods: {
			goGouCai:function(name,patyInd){
				if(patyInd){
					this.$router.push({
						path:'../../goucai/goucai_jjc_sc',
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
			back: function() {
				this.$router.go(-1)
			},
			complates: function() {
				complate();
				this.$router.go(-1)
			},
			complate:function(){
				switch (this.pageType) {
				      case 'ssq':
				        this.goGouCai('goucai_mc_ssq')
				        
				        break;
				      case 'dlt':
				        this.goGouCai('goucai_mc_dlt')
				        
				      break;
				      case 'fc3d':
				        this.goGouCai('goucai_mc_fcsd')
				        
				      break;
				      case 'qlc':
				        this.goGouCai('goucai_mc_qlc')
				        
				      break;
				      case 'pl3':
				        this.goGouCai('goucai_mc_pls')
				        
				      break;
				      case 'pl5':
				        this.goGouCai('goucai_mc_plw')
				        
				      break;
				      case 'jczq':
				        this.goGouCai('goucai_jjc_zq')

				      break;
				      case 'jclq':
				        this.goGouCai('goucai_jjc_lq')

				      break;
				      case 'lcbqc':
				        this.goGouCai('','0')

				      break;
				      case 'bjdc':
				        this.goGouCai('goucai_jjc_bjdc')

				      break;
				      case 'rxjc':
				        this.goGouCai('','1')

				      break;
				      case 'sfc':
				        this.goGouCai('','2')

				      break;
				      case 'sczc':
				        this.goGouCai('','3')

				      break;
				      default:
				  }
			},
			select:function(ops){
				this.pageType = ops
			}

		}
	}
	window.select = function(that) {
		if (that.className.indexOf('active') < 0) {
			that.className = 'item active';
		} else {
			that.className = 'item';
		}
	}

	var items = document.querySelectorAll('.contain li');

	window.selectAll = function(that) {

		if (that.className.indexOf('active') < 0) {
			that.className = 'select all active';
			document.querySelector('.content .header span:last-child').className = "select no";
		} else {
			that.className = 'select all';
		}
		var items = document.querySelectorAll('.contain li');
		for (var i = 0; i < items.length; i++) {
			items[i].className = 'item active';

		}
	}

	window.selectNoAll = function(that) {
		var items = document.querySelectorAll('.contain li');
		if (that.className.indexOf('active') < 0) {
			that.className = 'select no active';
			document.querySelector('.content .header span:first-child').className = "select all";
		} else {
			that.className = 'select no';
		}

		for (var i = 0; i < items.length; i++) {
			if (items[i].className.indexOf('active') < 0) {
				items[i].className = 'item active';
			} else {
				items[i].className = 'item';
			}
		}
	}

	function complate() {
		var selected = [];
		var item = document.querySelectorAll('.item')
		for (var i = 0; i < item.length; i++) {
			if (item[i].className.indexOf('active') !== -1) {
				selected.push(item[i].innerHTML);
			}
		}
		console.log(JSON.stringify(selected));
		setSession('selected', selected);
	}
</script>

<style scoped>
	html,
	body {
		background-color: white;
		height: 100%;
	}
.aui-bar-nav {
    background-color: #03a9f4 !important;
    color: #ffffff;
}
.aui-title {
	    color: #fff !important;
	}
	.content {
		padding: 0 3%;
		padding-top: 4%;
	}

	.header {
		display: flex;
		flex-direction: row;
		margin-bottom: 0.5rem;
	}

	.select {
		width: 33.3333%;
		height: 1.5rem;
		border: 1px solid #e2e2e2;
		color: #999;
		text-align: center;
		font-size: 0.6rem;
		line-height: 1.4rem;
	}

	.all {
		border-radius: 0.4rem 0 0 0.4rem;
		border-right: 0;
	}

	.no {
		border-radius: 0 0.4rem 0.4rem 0;
	}

	.contain {
		display: table;
	}

	.item {
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

	.item.active {
		border: 1px solid #f00;
		background-image: url(../../../assets/userinfo/select_red.png);
		background-size: 1rem 108%;
		background-repeat: no-repeat;
		background-position: 100% 100%;
		background-size: 13px 13px;
		color: red;
	}

	.item:nth-child(3n+3) {
		margin-right: 0;
	}

	.content .header span.active {
		border: 1px solid #f00;
		background-color: red;
		color: white;
	}
	.btns{
          width: 80%;
          line-height: 2rem;
          text-align: center;
          color: #fff;
          font-size: .9rem;
          margin: 1rem auto;
          border-radius: 5px;
          background: #E45869;
        }
        .closebtn{
          text-align: center;
          color: #B3B3B3;
          font-size:.8rem;
        }
        .av{
          background: #E45869;
          color: #fff;
        }
</style>
