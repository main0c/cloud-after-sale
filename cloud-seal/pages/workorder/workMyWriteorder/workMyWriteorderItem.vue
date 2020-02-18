<template>
	<view class="pd-list">
		<view class="bean-li" v-for="bean in list" :key="bean.id" @click="rowDetails(bean.id)">
			<view class="bean-title">
				<text class="left-content">工单号：</text>
				<text class="">{{bean.orderNum}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">客户名称：</text>
				<text class="right-content">{{bean.customerName}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">产品名称：</text>
				<text class="right-content">{{bean.productName}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">报单时间：</text>
				<text class="right-content">{{bean.declarationTime}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">服务类型：</text>
				<text class="right-content">{{bean.serviceTypeName}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">{{bean.stateName}}</text>
			</view>
			<view class="bean-bottom">
				<button @click.native.stop="editRow(bean.id)" v-if="bean.state == 1 || bean.state == 2" class="normor">编辑</button>
				<button @click.native.stop="deleteRow(bean.id)" v-if="bean.state == 1 || bean.state == 2" class="danger">删除</button>
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
			
			//工单详情
			rowDetails: function(id){
				uni.navigateTo({
					url: '/pages/workorder/workorderDetail?id=' + id
				})
			},
			
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
