<style scoped>
  body{
      background: #fff;
  }
  .aui-bar-nav{
    background: #fff;
    border-bottom: 1px solid rgba(238, 238, 238, 0.52);
        position: fixed;
  }
  .aui-bar-nav .aui-btn .aui-iconfont{
    color: #333;
  }
  .aui-title{
    color: #333;
  }
  .box{
      width: 96%;
      margin: 10px auto;
      margin-top: 0px;
  }
  table{
    width: 100%;
    border: 1px solid #999;   
  }
  table td,table th{
    border: 1px solid #999;
    text-align: center;
    padding: 5px 0px;
    width: 10%;
    font-size: .7rem;
  }
  p{
    color: rgba(51, 51, 51, 0.79) !important ;
        line-height: 1.2rem;
    font-size: .7rem;
  }
  .content span{
    text-indent: 1.4rem;
    word-break: break-all;
  }
  .ljContent{
    font-size: .8rem;
  }
 
  .oneP{
    font-size: .8rem;
  }
  .ljTitle{
    font-size: .8rem;
  }
  .playzContent{
    margin-top:0rem;
    color: #000;
  }
  .playzContent p{
    margin-top: 0rem;
    color: #000;
  }

  .playzContent h4{
    margin-top: 0rem;

  }
  .hs4{
    font-weight: bold;
    color: #333;
    margin: .5rem 0px;
  }
  .hs3{
    /*font-weight: bold;*/
    color: #333;
    margin: .2rem 0px;
    font-size: .7rem;
  }
  .no3{
    position: relative;
    top: 3.5rem;
  }
</style>
<template>
	<div id="play">
    <header v-if='head' class="aui-bar aui-bar-nav" id="headers">
        <div class="aui-pull-left aui-btn" tapmode @click="back()">
          <span class="aui-iconfont aui-icon-left"></span>
        </div>
        <div>
          <div class="aui-title">
            <span>玩法规则</span>
          </div>
        </div>
    </header> 
    <div :class='head?"no3":""' >
      <div class="box">

        <div v-if='dataList.content' v-for='(item,index) in dataList.content'>
          <h4 v-if='item.title' class="hs4">
            {{index}}.{{item.title}}
          </h4>
          <div v-if='item.children' v-for='(i,n) in item.children'>
            <span class="hs3" style="display: block;">
              {{i.title}}
            </span>
            <p v-if='i.arrp' v-html='t' v-for='(t,d) in i.arrp'>
              {{t}}
            </p>
          </div>
        </div>


        <p v-if='dataList.kjsj' class="oneP"><span>{{dataList.kjsj.name}}</span><span>{{dataList.kjsj.content}}</span></p>
        <p v-if='dataList.endTime'><span>{{dataList.endTime.name}}</span><span>{{dataList.endTime.content}}</span></p>
        <div>
          <div v-if='dataList.playz' >
            <p>
              <span  v-html='dataList.playz.name'>{{dataList.playz.name}}</span>
              <div class="playzContent" v-html='dataList.playz.content'>{{dataList.playz.content}}</div>
            </p>
          </div>
        </div>
       
        <p  v-if='dataList.normal' style="margin-top: .8rem;"><span style="font-size: .8rem;font-weight: bold;">奖项设置:</span></p>
        <table v-if='dataList.normal'>
          <tr v-for='(item,index) in dataList.normal' v-if='item.thead'>
            <th v-for='(ihead,indexs) in item.thead'>{{ihead.name}}</th>
          </tr>
          <tr v-for='(item,index) in dataList.normal' v-if='item.tdName'>
            <td v-for='(tdName,indexs) in item.tdName' :rowspan='tdName.rowspan'>{{tdName.name}}</td>
          </tr>
        </table>
        <div v-html='dataList.htmlContent' v-if='dataList.htmlContent'>
          {{dataList.htmlContent}}
        </div>
        
        <div v-if='dataList.lj'  style="    margin-top: .8rem;">
          <p><span class="ljTitle" v-html='dataList.lj.name'>{{dataList.lj.name}}</span></p>
          <p class="content ljContent"  v-html='dataList.lj.content'><span>{{dataList.lj.content}}</span></p>
        </div>
        <div v-if='dataList.lz' style="    margin-top: .8rem;">
           <p><span  v-html='dataList.lz.name'>{{dataList.lz.name}}</span></p>
            <p class="content"><span v-html='dataList.lz.content'>{{dataList.lz.content}}</span></p>
        </div>


        

      </div>
    </div>
  </div>
</template>
<script>

  function GetQueryString(name){
       var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
       var hrefArr = window.location.hash.substr(1).split("?")[1].split("&");
       for(var i=0 ;i<hrefArr.length;i++){
       	if(hrefArr[i].indexOf(name)>=0){
       		return hrefArr[i].split("=")[1]
       	}
       }
//     var r = window.location.hash.substr(1).match(reg);//search,查询?后面的参数，并匹配正则
//     if(r!=null)return  unescape(r[2]); return null;

  }
  
  import {
    play
  } from '../../../js/play.js';
	export default {
		name:"play",
		data(){
			return {
				title:sessionStorage.getItem('play'),
        head:true,
        dataType:'dlt',
        dataList:""
			}
		},
		created(){
      console.log("dataType:"+GetQueryString('dataType'))
      console.log("isApp:"+GetQueryString('isApp'))
      GetQueryString('isApp') == 1?this.head = false:this.head = true
      // alert(GetQueryString('isApp'))
      this.dataType = GetQueryString('dataType');
      for(var i = 0;i<play.length;i++){
        if(this.dataType == play[i].playType){
          this.dataList = play[i]
          // console.log(document.getElementsByTagName('h4').length)
          // for(var i = 0 ;i<document.getElementsByTagName('h4').length;i++){
          //   console.log(document.querySelectorAll('h4')[i])
          // }
          break;
        }
      }

      console.log( this.dataList)
      // apiready = function(){
      //   // vm.head = false
      //   // alert("72："+vm.head)
      // }
		},
		mounted(){
     
		},
		methods:{
			back(){
				this.$router.go(-1);
			}
		},
    watch:{
      // head(cur,op){
      //   var loading = document.getElementsByClassName('pageloading')[0];
      //   // alert(document.getElementsByClassName('pageloading')[0])
      //   // loading.style.opacity = 0;
      //   document.body.removeChild(loading)
      //   return
      // }
    },
    update(){

    }
	}
//创建Dom
  var creatDom = function(headerH,callback){
    var h = 3 + 'px',w = 0;
    var div = document.createElement('div');
    div.className = 'pageloading';
    div.style.height = h;
    div.style.width = w + '%';
    div.style.position = 'absolute';
    div.style.top = headerH + 'px';
    div.style.left = '0px';
    div.style.zIndex = '999';
    div.style.backgroundColor = '#82dc82';
    div.style.transition = 'all .5s';
    // document.body.style.marginTop =  h;
    document.body.appendChild(div)
    callback(div)
  }
  //销毁Dom
  var destruction = function(){
    var loading = document.getElementsByClassName('pageloading')[0] ;
    // loading.style.opacity = 0;
    setTimeout(function(){
      document.body.removeChild(loading)
    },500)
  }
     //监听状态
      document.onreadystatechange = function(){
        console.log(document.readyState)
        // console.log(document.getElementById('headers').clientHeight)
        var querDom,headerH = GetQueryString('isApp') == 1?"0": document.getElementById('headers').clientHeight;
        creatDom(headerH,function(dom){
                querDom = dom
        })
        if(document.readyState == 'interactive'){
            
            setTimeout(function(){
              querDom.style.width = 30 + '%';
            },0)
             
        } 
        if(document.readyState == 'complete'){
          setTimeout(function(){
            document.getElementsByClassName('pageloading')[0].style.width = 100 + '%';
            console.log('完成')
            setTimeout(function(){
              destruction()
            },560)
          },100)
        }
      }



</script>
