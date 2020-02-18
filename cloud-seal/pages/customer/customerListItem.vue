<template>
	<view class="pd-list">
		<view class="bean-li" v-for="bean in list" :key="bean.id" @click="rowDetails(bean.id)">
			<view class="bean-title">{{bean.name}}</view>
			<view class="bean-item">
				<text class="left-content">客户分类：</text>
				<text class="right-content">{{bean.typeName}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">客户来源：</text>
				<text class="right-content">{{bean.fromName}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">所属行业：</text>
				<text class="right-content">{{bean.industryName}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">售后服务数：</text>
				<text class="right-content">{{bean.serviceNum}}</text>
			</view>
			<view class="bean-bottom">
				<button @click.stop="editRow(bean.id)" class="normor">编辑</button>
				<button @click.stop="deleteRow(bean.id)" class="danger">删除</button>
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
			
			//编辑
			editRow: function(id){
				
			},
			
			//删除
			deleteRow: function(id){
				
			},
			
			//客户详情
			rowDetails: function(id){
				uni.navigateTo({
					url: '/pages/customer/customerDetail?id=' + id
				})
			},
			
		}
	}
</script>

<style>
</style>
