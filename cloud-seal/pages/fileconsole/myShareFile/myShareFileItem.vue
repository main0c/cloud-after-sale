<template>
	<view class="pd-list">
		<view class="bean-li" v-for="bean in list" :key="bean.id">
			<view class="bean-title">{{bean.shareName}}</view>
			<view class="bean-item">
				<text class="left-content">分享类型：</text>
				<text class="right-content">{{bean.shareType}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">文件类型：</text>
				<text class="right-content">{{bean.fileType}}个</text>
			</view>
			<view class="bean-item">
				<text class="left-content">分享时间：</text>
				<text class="right-content">{{bean.createTime}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">状态：</text>
				<text class="right-content">{{bean.stateName}}</text>
			</view>
			<view class="bean-bottom">
				<button @click="copyMation(bean.id)">复制</button>
				<button @click="cancleShare(bean.id)" class="danger">取消分享</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			list: { // 数据列表
				type: Array,
				default(){
					return []
				}
			}
		},
		methods: {
			
			//复制分享信息
			copyMation: function(id){
				
			},
			
			//取消分享
			cancleShare: function(id){
				var _this = this;
				uni.showModal({
				    title: '取消分享',
				    content: '确定取消分享吗？',
				    success: function (res) {
				        if (res.confirm) {
							//默认为私密分享
							_this.$api.post("fileconsole018", {rowId: id}).then((res)=>{
								if(res.returnCode == 0){
									uni.showToast({
										icon: 'success',
										position: 'bottom',
										title: '取消成功',
										complete:function(){
											_this.$emit("ToRefresh")
										}
									});
								}else{
									uni.showToast({
										icon: 'none',
										position: 'bottom',
										title: res.returnMessage
									});
								}
							})
				        }
				    }
				});
			}
			
		}
	}
</script>

<style>
</style>
