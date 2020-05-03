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
			this.loadUrl(option.params);
		},
		methods:{
			loadUrl: function(params){
				//解码
				const item = JSON.parse(decodeURIComponent(params));
				if(!item.url || item.url == null || item.url == ''){
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
				}else{
					//判断是加?还是加&
					var judgeMark = false;
					var url = item.url;
					for(var key in item){
						if(key != 'url'){
							if(!judgeMark){
								judgeMark = true;
								url += '?' + key + '=' + item[key];
							}else{
								url += '&' + key + '=' + item[key];
							}
						}
					}
					this.pageUrl = url;
					if(item.title || item.title != null || item.title != ''){
						uni.setNavigationBarTitle({
							title: item.title
						});
					}
				}
			}
		}
	}
	
</script>

<style>
</style>
