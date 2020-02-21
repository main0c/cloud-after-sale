<template>
	<view class="pd-list">
		<view class="pd-li" v-for="pd in list" :key="pd.id" @click="rowDetail(pd.id)">
			<view class="pd-order-num">
				<text class="left-content">单号：</text>
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
				<text class="left-content">申领人：</text>
				<text class="right-content">{{pd.applyUserName}}</text>
			</view>
			<view class="pd-pro-type">
				<text class="left-content">申领时间：</text>
				<text class="right-content">{{pd.applyTime}}</text>
			</view>
			<view class="pd-bottom">
				<text class="pd-state-name">{{pd.stateName}}</text>
				<view class="pd-operator">
					<button @click.stop="rowExamine(pd.id)" v-if="pd.state == 0">审核</button>
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
			
			//审核
			rowExamine: function(id){
				uni.navigateTo({
					url: '/pages/sparepart/sparepartExamine/sparepartExaminePage?id=' + id
				})
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
