<template>
	<view class="pd-list">
		<view class="bean-li" v-for="bean in list" :key="bean.id" @click="rowDetail(bean.id, bean.state)">
			<view class="bean-title">{{bean.title}}</view>
			<view class="bean-item">
				<text class="left-content">简介：</text>
				<text class="right-content">{{bean.desc}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">提醒时间：</text>
				<text class="right-content">{{bean.createTime}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">状态：</text>
				<text :class="[bean.state == '未读' ? 'right-content pg' : 'right-content kx']">{{bean.state}}</text>
			</view>
			<view class="bean-bottom">
				<button @click.stop="deleteRow(bean.id)" class="danger">删除</button>
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
			//通知详情
			rowDetail: function(id, state){
				var _this = this;
				this.$api.post("syseveusernotice003", {rowId: id}).then((res)=>{
					if(res.returnCode == 0){
						uni.navigateTo({
							url: '/pages/notice/noticeDetail?id=' + id,
							complete:function(){
								if(state == '未读'){
									_this.$emit("ToRefresh")
								}
							}
						})
					}else{
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res.returnMessage
						});
					}
				})
			},
			
			//删除
			deleteRow: function(id){
				var _this = this;
				uni.showModal({
				    title: '提示',
				    content: '确定删除该信息吗？',
				    success: function (res) {
				        if (res.confirm) {
							_this.$api.post("syseveusernotice004", {rowId: id}).then((res)=>{
								if(res.returnCode == 0){
									uni.showToast({
										icon: 'success',
										position: 'bottom',
										title: '删除成功',
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
	.pg{
		color: #FF0000 !important;
	}
	
	.kx{
		color: #1AAD19 !important;
	}
</style>
