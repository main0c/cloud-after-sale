<template>
	<view class="pd-list">
		<view class="bean-li" v-for="bean in list" :key="bean.id">
			<view class="bean-title">{{bean.materialName}}</view>
			<view class="bean-item">
				<text class="left-content">单位：</text>
				<text class="right-content">{{bean.unitName}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">规格型号：</text>
				<text class="right-content">{{bean.materialModel}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">剩余数量：</text>
				<text class="right-content">{{bean.operNumber}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">单价：</text>
				<text class="right-content">{{bean.unitPrice}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">负责组：</text>
				<text class="right-content">{{bean.groupName}}</text>
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
		}
	}
</script>

<style>
</style>
