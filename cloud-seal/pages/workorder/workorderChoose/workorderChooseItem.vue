<template>
	<view class="pd-list">
		<view class="bean-li" v-for="bean in list" :key="bean.id" @click="rowDetails(bean.id)">
			<view class="bean-title">{{bean.orderNum}}</view>
			<view class="bean-item">
				<text class="left-content">服务类型：</text>
				<text class="right-content">{{bean.serviceTypeName}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">报单时间：</text>
				<text class="right-content">{{bean.declarationTime}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">客户名称：</text>
				<text class="right-content">{{bean.customerName}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">联系人：</text>
				<text class="right-content">{{bean.contacts}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">联系电话：</text>
				<text class="right-content">{{bean.phone}}</text>
			</view>
			<view class="bean-bottom">
				<button @click.stop="chooseBeans(bean.id)">选择</button>
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
					return 'serviceMation'
				}
			}
		},
		methods: {
			
			chooseBeans: function(id){
				for(let i = 0; i < this.list.length; i++){
					if(id == this.list[i].id){
						var pages = getCurrentPages();
						var prevPage = pages[pages.length - 2];  //上一个页面
						prevPage.$vm[this.backParam] = {
							id: this.list[i].id,
							orderNum: this.list[i].orderNum
						};
						uni.navigateBack()
						break;
					}
				}
			},
			
			//工单详情
			rowDetails: function(id){
				uni.navigateTo({
					url: '/pages/workorder/workorderDetail?id=' + id
				})
			},
			
		}
	}
</script>

<style>
</style>
