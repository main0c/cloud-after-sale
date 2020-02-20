<template>
	<view class="pd-list">
		<view class="bean-li" v-for="bean in list" :key="bean.id" @click="rowDetail(bean.id)">
			<view class="bean-title">{{bean.name}}</view>
			<view class="bean-item">
				<text class="left-content">所属组：</text>
				<text class="right-content">{{bean.groupName}}</text>
			</view>
			<view class="bean-item">
				<text class="left-content">单位类型：</text>
				<text class="right-content" v-if="bean.unit == 1">非多单位</text>
				<text class="right-content" v-else>多单位</text>
			</view>
			<view class="bean-bottom">
				<button @click.stop="chooseSparePart(bean.id)">选择</button>
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
			number: { // 配件在页面上的集合number
				type: Number,
				default(){
					return 0
				}
			}
		},
		
		methods: {
			chooseSparePart: function(id){
				for(let i = 0; i < this.list.length; i++){
					if(id == this.list[i].id){
						var pages = getCurrentPages();
						var prevPage = pages[pages.length - 2];  //上一个页面
						prevPage._data.sparePartList[this.number].mation.id = this.list[i].id;
						prevPage._data.sparePartList[this.number].mation.name = this.list[i].name;
						//单位
						var unitList = [{id: "", name: "请选择"}]
						for(let j = 0; j < this.list[i].unitList.length; j++){
							unitList.push(this.list[i].unitList[j]);
						}
						prevPage._data.sparePartList[this.number].mation.unitList = unitList;
						prevPage._data.sparePartList[this.number].mation.defaultIndex = 0;
						prevPage._data.sparePartList[this.number].mation.retailPrice = 0;
						prevPage._data.sparePartList[this.number].mation.allRetailPrice = 0;
						uni.navigateBack()
						return false
					}
				}
			},
			
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
