<template>
	<view class="pd-list">
		<view class="bean-li" v-for="bean in list" :key="bean.id">
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
				<button @click="chooseCustomer(bean.id)">选择</button>
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
			chooseCustomer: function(id){
				for(let i = 0; i < this.list.length; i++){
					if(id == this.list[i].id){
						var pages = getCurrentPages();
						var prevPage = pages[pages.length - 2];  //上一个页面
						prevPage._data.customer = this.list[i];
						uni.navigateBack()
						break;
					}
				}
			}
		}
	}
</script>

<style>
</style>
