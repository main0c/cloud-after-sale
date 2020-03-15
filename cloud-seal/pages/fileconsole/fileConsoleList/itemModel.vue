<template>
	<view class="pd-list">
		<view class="pd-li" v-for="pd in list" :key="pd.id" @click="rowDetails(pd.id)">
			<view class="pd-order-num">
				<text class="left-content">工单号：</text>
				<text class="">{{pd.orderNum}}</text>
			</view>
			<view class="pd-name">
				<text class="left-content">客户名称：</text>
				<text class="right-content">{{pd.customerName}}</text>
			</view>
			<view class="pd-pro-name">
				<text class="left-content">产品名称：</text>
				<text class="right-content">{{pd.productName}}</text>
			</view>
			<view class="pd-pro-type">
				<text class="left-content">报单时间：</text>
				<text class="right-content">{{pd.declarationTime}}</text>
			</view>
			<view class="pd-pro-type">
				<text class="left-content">服务类型：</text>
				<text class="right-content">{{pd.serviceTypeName}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: { // 数据列表
				type: Array,
				default () {
					return []
				}
			}
		},
		methods: {
			//编辑工单
			editRow: function(id){
				uni.navigateTo({
					url: '/pages/workorder/workorderEdit?id=' + id
				})
			},
			
			//删除工单
			deleteRow: function(id){
				var _this = this;
				uni.showModal({
				    title: '提示',
				    content: '确定删除该工单吗？',
				    success: function (res) {
				        if (res.confirm) {
							_this.$api.post("sealseservice020", {rowId: id}).then((res)=>{
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
</style>
