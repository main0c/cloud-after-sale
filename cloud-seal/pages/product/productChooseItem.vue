<template>
	<view class="pd-list">
		<view class="bean-li" v-for="bean in list" :key="bean.id">
			<view class="bean-title">{{bean.productName}}</view>
			<view class="bean-item">所属组：{{bean.groupName}}</view>
			<view class="bean-item">规格型号：{{bean.productModel}} </view>
			<view class="bean-bottom">
				<button @click="chooseProduct(bean.id)">选择</button>
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
			}
		}
	}
</script>

<style>
</style>
