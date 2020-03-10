<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			if(uni.getStorageSync("userMation") != null && uni.getStorageSync("userMation") != ''
				&& uni.getStorageSync("userToken") != null && uni.getStorageSync("userToken") != ''){
				uni.switchTab({
					url:"/pages/workbench/workbench"
				})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("/static/css/uni.css");
	/*自己的样式文件*/
	@import url("/static/css/common.css");
	/*树组件*/
	@import url("components/ly-tree/ly-tree.css");
</style>
