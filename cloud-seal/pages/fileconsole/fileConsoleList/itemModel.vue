<template>
	<view class="pd-list">
		<view class="file-item" v-for="pd in list" :key="pd.id" @click="rowDetails(pd.id, pd.name, pd.fileType, pd.icon)">
			<view class="item-img-box">
				<image :src="fileBasePath + pd.icon"></image>
				<image class="share-img" src="../../../static/fileconsole/share.png" v-if="pd.isShow == 'block'"></image>
			</view>
			<view class="item-title">
				<text>{{pd.name}}</text>
			</view>
			<view class="item-time-size">
				<text class="time">{{pd.createTime}}</text>
				<text class="size" v-if="pd.fileSize != 0">{{pd.fileSize}}</text>
			</view>
			<view class="item-point">
				<image src="../../../static/common/to.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: { // 数据列表
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				fileBasePath: this.$fileBasePath
			}
		},
		methods: {
			rowDetails: function(id, name, fileType, iconSrc){
				console.log(fileType)
				console.log(this.$imageType)
				if(fileType == 'folder'){
					uni.navigateTo({
						url: '/pages/fileconsole/fileConsoleClickList/fileConsoleClickList?id=' + id
					})
				}else if(this.$imageType.indexOf(fileType) >= 0){
					uni.navigateTo({
						url: '/pages/common/imgPreview?picList=' + this.fileBasePath + iconSrc
					})
				}else if(this.$officeType.indexOf(fileType) >= 0){
					
				}else if(this.$vedioType.indexOf(fileType) >= 0){
					
				}else if(this.$packageType.indexOf(fileType) >= 0){
					
				}else if(this.$epubType.indexOf(fileType) >= 0){
					
				}else if(this.$aceType.indexOf(fileType) >= 0){
					
				}
			}
		}
	}
</script>

<style>
</style>
