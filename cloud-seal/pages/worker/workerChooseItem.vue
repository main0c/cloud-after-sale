<template>
	<view class="pd-list">
		<view class="bean-li" v-for="bean in list" :key="bean.id">
			<view class="bean-title">{{bean.userName}}</view>
			<view class="bean-item">
				<text class="left-content">地址：</text>
				<text class="right-content">{{bean.addDetail}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">工单数：</text>
				<text class="right-content">{{bean.orderNumber}}个</text>
			</view>
			<view class="bean-item">
				<text class="left-content">状态：</text>
				<text :class="[bean.orderNumber > 0 ? 'right-content pg' : 'right-content kx']">{{bean.stateName}}</text>
			</view>
			<view class="bean-bottom">
				<button @click="chooseServiceUser(bean.id)">选择</button>
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
			},
			backParam: { // 数据列表
				type: String,
				default(){
					return 'serviceUser'
				}
			}
		},
		methods: {
			chooseServiceUser: function(id){
				for(let i = 0; i < this.list.length; i++){
					if(id == this.list[i].id){
						var pages = getCurrentPages();
						var prevPage = pages[pages.length - 2];  //上一个页面
						prevPage.$vm[this.backParam] = [{
							id: this.list[i].userId,
							name: this.list[i].userName
						}];
						uni.navigateBack()
						break;
					}
				}
			}
		}
	}
</script>

<style>
	.pg{
		color: #FF0000 !important;
	}
	
	.kx{
		color: #1AAD19 !important;
	}
</style>
