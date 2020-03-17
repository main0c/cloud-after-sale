<template>
	<view class="pd-list">
		<view class="bean-li" v-for="bean in list" :key="bean.id">
			<view class="bean-title">{{bean.recycleName}}</view>
			<view class="bean-item">
				<text class="left-content">文件类型：</text>
				<text class="right-content">{{bean.fileType}}个</text>
			</view>
			<view class="bean-item">
				<text class="left-content">删除时间：</text>
				<text class="right-content">{{bean.createTime}}</text>
			</view>
			<view class="bean-bottom">
				<button @click="reduction(bean.id)">还原</button>
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
			
			//还原
			reduction: function(id){
				var _this = this;
				uni.showModal({
				    title: '还原',
				    content: '确定还原吗？',
				    success: function (res) {
				        if (res.confirm) {
							//默认为私密分享
							_this.$api.post("fileconsole015", {rowId: id}).then((res)=>{
								if(res.returnCode == 0){
									uni.showToast({
										icon: 'success',
										position: 'bottom',
										title: '还原成功',
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
