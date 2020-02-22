<template>
	<view class="pd-list">
		<view class="bean-li" v-for="bean in list" :key="bean.id" @click="rowDetail(bean.id)">
			<view class="bean-title">{{bean.name}}</view>
			<view class="bean-item">
				<text class="left-content">规格型号：</text>
				<text class="right-content">{{bean.model}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">所属组：</text>
				<text class="right-content">{{bean.groupName}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">单位类型：</text>
				<text class="right-content" v-if="bean.unit == 1">非多单位</text>
				<text class="right-content" v-else>多单位</text>
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
			//配件详情
			rowDetail: function(id){
				uni.navigateTo({
					url: '/pages/sparepart/sparepartDetail?id=' + id
				})
			}
			
		}
	}
</script>

<style>
</style>
