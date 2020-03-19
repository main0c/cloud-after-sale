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
			//打开连接
			console.log('App Show')
			this.$sockect.connect()
		},
		onHide: function() {
			//关闭连接
			console.log('App Hide')
			this.$sockect.cls()
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
