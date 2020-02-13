<template>
	<view class="pd-list">
		<view class="pd-li" v-for="pd in list" :key="pd.id">
			<view class="pd-order-num">单号：{{pd.applyNum}}</view>
			<view class="pd-name">所属工单：{{pd.orderNum}}</view>
			<view class="pd-pro-name">客户名称：{{pd.customerName}} </view>
			<view class="pd-pro-type">申领人：{{pd.applyUserName}}</view>
			<view class="pd-pro-type">申领时间：{{pd.applyTime}}</view>
			<view class="pd-bottom">
				<text class="pd-state-name">{{pd.stateName}}</text>
				<view class="pd-operator">
					<button @click="test()">接单</button>
					<button>派工</button>
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
			test: function(){
				console.log(1);
			}
		}
	}
</script>

<style>
</style>
