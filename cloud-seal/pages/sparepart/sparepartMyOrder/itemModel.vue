<template>
	<view class="pd-list">
		<view class="pd-li" v-for="pd in list" :key="pd.id" @click="rowDetail(pd.id)">
			<view class="pd-order-num">
				<text class="left-content">申领单单号：</text>
				<text class="">{{pd.applyNum}}</text>
			</view>
			<view class="pd-name">
				<text class="left-content">所属工单：</text>
				<text class="right-content">{{pd.orderNum}}</text>
			</view>
			<view class="pd-pro-name">
				<text class="left-content">客户名称：</text>
				<text class="right-content">{{pd.customerName}}</text>
			</view>
			<view class="pd-pro-type">
				<text class="left-content">申领时间：</text>
				<text class="right-content">{{pd.applyTime}}</text>
			</view>
			<view class="pd-bottom">
				<text class="pd-state-name">{{pd.stateName}}</text>
				<view class="pd-operator">
					<button @click.stop="editRow(pd.id)" v-if="pd.state == 0 || pd.state == 2" class="normor">编辑</button>
					<button @click.stop="deleteRow(pd.id)" v-if="pd.state == 0 || pd.state == 2" class="danger">删除</button>
				</view>
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
			
			//编辑
			editRow: function(id){
				uni.navigateTo({
					url: '/pages/sparepart/sparepartOrderEdit?id=' + id
				})
			},
			
			//删除
			deleteRow: function(id){
				var _this = this;
				uni.showModal({
				    title: '提示',
				    content: '确定删除该申领单吗？',
				    success: function (res) {
				        if (res.confirm) {
							_this.$api.post("sealseservice025", {rowId: id}).then((res)=>{
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
			},
			
			//申领单详情
			rowDetail: function(id){
				uni.navigateTo({
					url: '/pages/sparepart/sparepartOrderDetail?id=' + id
				})
			}
			
		}
	}
</script>

<style>
</style>
