<template>
	<view class="pd-list">
		<view class="pd-li" v-for="pd in list" :key="pd.id">
			<view class="pd-order-num">工单号：{{pd.orderNum}}</view>
			<view class="pd-name">客户名称：{{pd.customerName}}</view>
			<view class="pd-pro-name">产品名称：{{pd.productName}} </view>
			<view class="pd-pro-type">服务类型：{{pd.serviceTypeName}}</view>
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
	/*数据列表*/
	.pd-li {
		position: relative;
		height: auto;
		padding: 20upx 16upx 20upx 16upx;
		border-bottom: 1upx solid #eee;
	}
	
	.pd-li .pd-order-num{
		font-size: 30upx;
		line-height: 40upx;
		background-color: #E8E8E8;
		width: calc(100% + 40upx);
		margin-left: -20upx;
		padding-left: 20upx;
		padding-top: 14upx;
		padding-bottom: 14upx;
	}
	
	.pd-li .pd-name, .pd-li .pd-pro-name, .pd-li .pd-pro-type {
		font-size: 26upx;
		line-height: 40upx;
		height: auto;
		margin-bottom: 16upx;
		overflow: hidden;
	}
	
	.pd-li .pd-bottom .pd-state-name {
		font-size: 24upx;
		color: gray;
	}
	
	.pd-li .pd-bottom .pd-operator{
		float: right;
	}
	
	.pd-li .pd-bottom .pd-operator button{
		font-size: 24upx;
		padding: 10upx 10upx;
		line-height: 24upx;
		float: left;
		margin-right: 10upx;
		color: cornflowerblue;
		border-color: cornflowerblue;
	}
</style>
