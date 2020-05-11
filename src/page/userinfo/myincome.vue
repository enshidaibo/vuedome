  <style scoped>
      .aui-bar-nav {
        top: 0;
        line-height: 2.25rem;
        background-color: #fff;
        color: #333;
        border-bottom: 1px solid #eee;
      }
      .aui-bar-nav .aui-btn .aui-iconfont{
        font-size: 0.9rem;
        line-height: 1.25rem;
        padding: 0;
        margin: 0;
        color: #333;
      }
      .aui-title{
        border: 1px solid #03A9F4;
        color: #fff;
      }

      .aui-title span{
        float: left;
        padding: 0px 1rem;
        height: 1.45rem;
        line-height: 1.45rem;
        font-size: .7rem;
        width: 50%;
      }
      .title-actives{
        color:#03A9F4;
        background: #fff;
        border: 1px solid #fff;
      }
      .aui-bar-nav .aui-title{
        border-radius: 1rem;
        width: 54% !important;
        border: 1px solid #03A9F4;
        color: #fff;
        min-height: 1.45rem !important;
        left: 4rem !important;
        margin: .35rem 0px !important;
        color: #03A9F4;
      }
      .aui_active{
        background: #03A9F4 !important;
        color: #fff !important;
      }
  </style>

<template>
    <div>
           <header class="aui-bar aui-bar-nav" id='app'>
                <div class="aui-pull-left aui-btn">
                    <span class="aui-iconfont aui-icon-left" @click="bake()"></span>
                </div>
                <div class="aui-title"><span @click='tap(0)' :class="title == 0?'aui_active':''">今日收益</span><span @click='tap(1)' :class="title == 1?'aui_active':''">累计收益</span></div>
                <!-- <div class="aui-btn aui-pull-right" id="cp_name" onclick="alert('加急开发中...')">
                    <img src="../images/wh.png" alt="">
                </div> -->
            </header>
            <router-view class='routerView'></router-view>
    </div>
</template>

<script>
    import {
        mobileHide,
        getCookie,
        setCookie,
    } from "../../js/common"
    export default {
        data() {
            return {
                title:'0'

            };
        },
        created() {
            this.title = this.$route.query.pageId
        },
        mounted() {
        },
        methods: {
            tap:function(index){
                this.title = index
                this.jump()
            },
            jump:function(){
                if(this.title == 1){
                    this.$router.replace({
                        path: 'myincomeContent',
                        query: {
                            pageId:"1"
                        }
                    })
                }else{
                    this.$router.replace({
                        path: 'todayearnings',
                        query: {
                            pageId:"0"
                        }
                    })
                }
            },
            bake:function(){
                this.$router.go(-1);
            }

        }
    }
</script>


