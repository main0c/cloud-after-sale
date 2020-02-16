<template>
	<view class="pd-list">
		<view class="pd-li" v-for="pd in list" :key="pd.id">
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
			<view class="pd-bottom">
				<text class="pd-state-name">{{pd.stateName}}</text>
				<view class="pd-operator">
					<button @click="test()" v-if="pd.state == 1">派工</button>
					<button @click="test()" v-if="pd.state == 2">接单</button>
					<button @click="test()" v-if="pd.state == 3">签到</button>
					<button @click="test()" v-if="pd.state == 4">完工</button>
					<button @click="test()" v-if="pd.state == 5">评价</button>
					<button @click="test()" v-if="pd.state == 4 || pd.state == 5">情况反馈</button>
					<button @click="test()" v-if="pd.state == 6">审核</button>
					<button @click="test()" v-if="pd.state == 1 || pd.state == 2" class="normor">编辑</button>
					<button @click="test()" v-if="pd.state == 1 || pd.state == 2" class="danger">删除</button>
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
