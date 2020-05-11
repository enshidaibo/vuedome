<template>

	<div>
		<router-view></router-view>
		<!-- <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view> -->
	</div>
</template>
<script>
	export default {
		data() {
			return {
				// text:'123',
				// value:false
			}
		},
		creatd() {},
		mounted() {
			const script = document.createElement('script')
			script.src = 'https://s5.cnzz.com/z_stat.php?id=1276145652&web_id=1276145652'
			script.language = 'JavaScript'
			document.body.appendChild(script);
			// this.weixin()
		},
		watch: {
			'$route'() {
				if (window._czc) {
					let location = window.location
					let contentUrl = location.pathname + location.hash
					let refererUrl = '/'
					window._czc.push(['_trackPageview', contentUrl, refererUrl])
				}
			}
		},
		methods: {
			weixin: function() {
				/*微信浏览器里的一些操作*/
				this.$ajax.post('/caipiaoshouye/index.php/home/Apicoud/pushign')
					.then(res => {
						this.$ajax.defaults.timeout = 49527; //49527这个值控制没有showLonding
						// console.log(res.data)
						// var content = res.data.content
						let obj = res.data
						this.$ajax.defaults.timeout = 50000; //49527这个值控制没有showLonding
						wx.config({
							debug: true,
							appId: obj.appId,
							timestamp: obj.timestamp,
							nonceStr: obj.nonceStr,
							signature: obj.signature,
							jsApiList: [
								'updateAppMessageShareData', 'updateTimelineShareData', 'hideMenuItems'
							]
						});
							wx.ready(function() { //需在用户可能点击分享按钮前就先调用
							alert('初始化成功！');
								wx.updateAppMessageShareData({
									title: '美奇彩票', // 分享标题
									desc: '线上购彩,线下真实出票,点击链接免费领取优惠!', // 分享描述
									link: 'http://mi.facaime.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
									imgUrl: './assets/icon.png', // 分享图标
									success: function() {
										// 设置成功
										alert('设置成功！');
									}
								})
								wx.updateTimelineShareData({
									title: '美奇彩票', // 分享标题
									//desc: '线上购彩,线下真实出票,点击链接免费领取优惠!', // 分享描述
									link: 'http://mi.facaime.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
									imgUrl: './assets/icon.png', // 分享图标
									success: function() {
										// 设置成功
									}
								})
								wx.hideMenuItems({
									menuList: [
										"menuItem:copyUrl",
										"menuItem:openWithQQBrowser",
										"menuItem:openWithSafari"
									] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
								})
							});
							
					

						wx.error(function(res) {
							alert(JSON.stringify(res))
							alert('初始化失败！');
						});
					})
			}

			// handleClose(){
			//     Toast('提示信息');
			// }
		}
	}
</script>
<style>

</style>
