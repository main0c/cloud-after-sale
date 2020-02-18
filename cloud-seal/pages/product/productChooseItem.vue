<template>
	<view class="pd-list">
		<view class="bean-li" v-for="bean in list" :key="bean.id" @click="rowDetail(bean.id)">
			<view class="bean-title">{{bean.productName}}</view>
			<view class="bean-item">
				<text class="left-content">所属组：</text>
				<text class="right-content">{{bean.groupName}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">规格型号：</text>
				<text class="right-content">{{bean.productModel}}</text>
			</view>
			<view class="bean-bottom">
				<button @click.stop="chooseProduct(bean.id)">选择</button>
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
			chooseProduct: function(id){
				for(let i = 0; i < this.list.length; i++){
					if(id == this.list[i].id){
						var pages = getCurrentPages();
						var prevPage = pages[pages.length - 2];  //上一个页面
						prevPage._data.product = this.list[i];
						uni.navigateBack()
						break;
					}
				}
			},
			
			//产品详情
			rowDetail: function(id){
				uni.navigateTo({
					url: '/pages/product/productDetail?id=' + id
				})
			}
			
		}
	}
</script>

<style>
</style>
