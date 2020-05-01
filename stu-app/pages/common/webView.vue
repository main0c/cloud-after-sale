<template>

	<view>
		<web-view :webview-styles="webviewStyles" :src="pageUrl" sandbox="allow-scripts allow-top-navigation allow-same-origin"></web-view>
	</view>

</template>

<script>
	
	export default {
		data() {
			return {
				webviewStyles: {
					progress: { //进度条颜色
						color: '#FF3333'
					}
				},
				pageUrl: ''
			}
		},
		
		onLoad(option) {
			if(option.pageUrl != '' && option.pageUrl != null && option.pageUrl != undefined){
				this.pageUrl = option.pageUrl;
			}else{
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '页面配置错误',
					success:function(){
						setTimeout(function(){
							uni.navigateBack()
						}, 2000)
					}
				});
			}
		}
	}
	
</script>

<style>
</style>
