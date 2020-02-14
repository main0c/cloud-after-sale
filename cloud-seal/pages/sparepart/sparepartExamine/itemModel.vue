<template>
	<view class="pd-list">
		<view class="pd-li" v-for="pd in list" :key="pd.id">
			<view class="pd-order-num">
				<text class="left-content">单号：</text>
				<text class="right-content">{{pd.applyNum}}</text>
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
