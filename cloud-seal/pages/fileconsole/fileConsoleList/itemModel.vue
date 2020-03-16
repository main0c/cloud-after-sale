<template>
	
	<view>
		<view class="pd-list">
			<view class="file-item" @longpress="onLongPress" v-for="pd in list" :key="pd.id" 
				@click="rowDetails(pd.id, pd.name, pd.fileType, pd.icon)" :data-id="pd.id" :data-filetype="pd.fileType">
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
		
		<view class="shade" v-show="showShade" @tap="hidePop">
			<view class="pop" :style="popStyle" :class="{'show':showPop}">
				<view v-for="(item, index) in popButton" :key="index" @click="pickerMenu" :data-id="pickerId" :data-method="item.method"
					 :data-filetype="filetype">{{item.text}}</view>
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
				fileBasePath: this.$fileBasePath,
				//长按弹框样式
				winSize: {},//窗口尺寸
				showShade: false,//显示遮罩
				showPop: false,//显示操作弹窗
				popButton: [],//弹窗按钮列表
				popStyle: "",//弹窗定位样式
				pickerId: "",//选择的数据id
				filetype: "",//选择的数据类型
			}
		},
		onLoad() {
			this.getWindowSize();
		},
		methods: {
			
			//点击事件
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
			},
			
			/* 获取窗口尺寸 */
			getWindowSize() {
				uni.getSystemInfo({
					success: (res) => {
						this.winSize = {
							"witdh": res.windowWidth,
							"height": res.windowHeight
						}
					}
				})
			},
			
			//根据不同的文件类型展示不同的按钮
			resetBtn: function(fileType){
				var popButton = [];
				popButton.push({
					method: 'reFileName',
					text: '重命名'
				})
				popButton.push({
					method: 'deleteFile',
					text: '删除'
				})
				if(fileType == 'folder'){
					
				}else if(this.$imageType.indexOf(fileType) >= 0){
					
				}else if(this.$officeType.indexOf(fileType) >= 0){
					
				}else if(this.$vedioType.indexOf(fileType) >= 0){
					
				}else if(this.$packageType.indexOf(fileType) >= 0){
					
				}else if(this.$epubType.indexOf(fileType) >= 0){
					
				}else if(this.$aceType.indexOf(fileType) >= 0){
					
				}
				this.popButton = popButton;
			},
			
			/* 长按监听 */
			onLongPress(e) {
				let [touches, style, chooseId, filetype] = [e.touches[0], "", e.currentTarget.dataset.id, e.currentTarget.dataset.filetype];
				
				//根据不同的文件类型展示不同的按钮
				this.resetBtn(filetype);
				
				/* 因 非H5端不兼容 style 属性绑定 Object ，所以拼接字符 */
				if (touches.clientY > (this.winSize.height / 2)) {
					style = `bottom:${this.winSize.height - touches.clientY}px;`;
				} else {
					style = `top:${touches.clientY}px;`;
				}
				if (touches.clientX > (this.winSize.witdh / 2)) {
					style += `right:${this.winSize.witdh - touches.clientX}px`;
				} else {
					style += `left:${touches.clientX}px`;
				}
				this.popStyle = style;
				this.pickerId = chooseId;
				this.filetype = filetype;
				this.showShade = true;
				this.$nextTick(() => {
					setTimeout(() => {
						this.showPop = true;
					}, 10);
				});
			},
			/* 隐藏弹窗 */
			hidePop() {
				this.showPop = false;
				this.pickerId = '';
				this.filetype = '';
				setTimeout(() => {
					this.showShade = false;
				}, 250);
			},
			/* 选择菜单 */
			pickerMenu(e) {
				//文件或文件夹id
				let rowId = e.currentTarget.dataset.id;
				//类型
				let filetype = e.currentTarget.dataset.filetype;
				//执行的方法事件
				let method = e.currentTarget.dataset.method;
				switch(method){
					case 'reFileName':{//重命名
						console.log("重命名")
						break;
					}
					case 'deleteFile':{//删除
						this.deleteFile(rowId, filetype);
						break;
					}
					default:{
						break;
					}
				}
				this.hidePop();
			},
			
			//删除文件或文件夹
			deleteFile: function(id, filetype){
				var _this = this;
				uni.showModal({
				    title: '提示',
				    content: '确定删除吗？',
				    success: function (res) {
				        if (res.confirm) {
							var deleteArray = [];
							deleteArray.push({
								rowId: id,
								fileType: filetype
							});
							var param = {
								fileList: JSON.stringify(deleteArray)
							}
							_this.$api.post("fileconsole004", param).then((res)=>{
								if(res.returnCode == 0){
									uni.showToast({
										icon: 'success',
										position: 'bottom',
										title: '删除成功',
										complete:function(){
											_this.$emit("ToRefresh")
										}
									});
								}else{
									uni.showToast({
										icon: 'none',
										position: 'bottom',
										title: res.returnMessage
									});
								}
							})
				        }
				    }
				});
			}
			
		}
	}
</script>

<style scoped lang="scss">
	
	/* 遮罩 */
	.shade {
		position: fixed;
		z-index: 100;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		-webkit-touch-callout: none;
	
		.pop {
			position: fixed;
			z-index: 101;
			width: 260upx;
			box-sizing: border-box;
			font-size: 28upx;
			text-align: left;
			color: #333;
			background-color: #fff;
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
			line-height: 80upx;
			transition: transform 0.15s ease-in-out 0s;
			user-select: none;
			-webkit-touch-callout: none;
			transform: scale(0, 0);
	
			&.show {
				transform: scale(1, 1);
			}
	
			&>view {
				padding: 0 20upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				user-select: none;
				-webkit-touch-callout: none;
	
				&:active {
					background-color: #f3f3f3;
				}
			}
		}
	}
	
</style>
