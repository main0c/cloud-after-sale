<template>
	<view class="pd-list">
		<view class="bean-li" v-for="bean in list" :key="bean.id">
			<view class="bean-title">{{bean.name}}</view>
			<view class="bean-item">
				<text class="left-content">联系人：</text>
				<text class="right-content">{{bean.contacts}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">联系电话：</text>
				<text class="right-content">{{bean.mobilePhone}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">邮箱：</text>
				<text class="right-content">{{bean.email}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">QQ：</text>
				<text class="right-content">{{bean.qq}}</text>
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
