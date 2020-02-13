<template>
	<view class="pd-list">
		<view class="bean-li" v-for="bean in list" :key="bean.id">
			<view class="bean-title">{{bean.name}}</view>
			<view class="bean-item">客户分类：{{bean.typeName}}</view>
			<view class="bean-item">客户来源：{{bean.fromName}} </view>
			<view class="bean-item">所属行业：{{bean.industryName}}</view>
			<view class="bean-item">售后服务数：{{bean.serviceNum}}</view>
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
	.bean-li{
		position: relative;
		height: auto;
		padding: 20upx 16upx 20upx 16upx;
		border-bottom: 1upx solid #eee;
	}
	
	.bean-li .bean-title{
		font-size: 30upx;
		line-height: 40upx;
		background-color: #E8E8E8;
		padding-left: 20upx;
		padding-top: 14upx;
		padding-bottom: 14upx;
	}
	
	.bean-li .bean-item{
		font-size: 26upx;
		line-height: 40upx;
		height: auto;
		padding-left: 20upx;
		margin-bottom: 16upx;
		overflow: hidden;
	}
	
	.bean-li .bean-bottom{
		float: right;
		margin-top: -60upx;
	}
	
	.bean-li .bean-bottom button{
		font-size: 24upx;
		padding: 10upx 10upx;
		line-height: 24upx;
		float: left;
		margin-right: 10upx;
		color: cornflowerblue;
		border-color: cornflowerblue;
	}
</style>
