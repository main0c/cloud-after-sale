<template>
	<view class="pd-list">
		<view class="bean-li" v-for="bean in list" :key="bean.id">
			<view class="bean-title">{{bean.name}}</view>
			<view class="bean-item">联系人：{{bean.contacts}}</view>
			<view class="bean-item">联系电话：{{bean.mobilePhone}} </view>
			<view class="bean-item">邮箱：{{bean.email}}</view>
			<view class="bean-item">QQ：{{bean.qq}}</view>
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
