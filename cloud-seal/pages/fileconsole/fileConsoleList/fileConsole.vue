<template>
	<view class="content">
		<!-- 菜单 -->
		<view class="top-warp">
			<view class="nav">
				<view v-for="(tab, i) in tabs" :key="i" :class="{'active':curIndex===i}" @click="changeTab(i)">{{tab}}</view>
			</view>
		</view>
		<!-- 收藏夹 -->
		<mescroll-item :i="0" :index="curIndex" ref="favorites"></mescroll-item>
		<!-- 我的文档 -->
		<mescroll-item :i="1" :index="curIndex" ref="myDocuments"></mescroll-item>
		<!-- 企业网盘 -->
		<mescroll-item :i="2" :index="curIndex" ref="enterpriseSkyDrive"></mescroll-item>
		
		<uni-fab
			:pattern="pattern"
			:content="content"
			:horizontal="horizontal"
			:vertical="vertical"
			:direction="direction"
			@trigger="trigger"
		></uni-fab>
		
		<chunLei-modal v-model="showModel" :mData="data" :type="type" @onConfirm="onConfirm" @cancel="cancel" :navHeight="0">
		</chunLei-modal>
		
	</view>
	
</template>

<script>
	import MescrollItem from './fileConsoleItem.vue';
	
	//悬浮按钮
	import uniFab from '@/components/uni-fab/uni-fab.vue';
	
	export default {
		components: {
			MescrollItem,
			uniFab
		},
		data() {
			return {
				tabs: ["收藏夹", "我的文档", "企业网盘"],
				curIndex: 1,// 当前tab的下标
				
				//悬浮球属性
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF'
				},//可选样式配置项
				horizontal: 'right',//水平对齐方式。left:左对齐，right：右对齐
				vertical: 'bottom',//垂直对齐方式。bottom:下对齐，top：上对齐
				direction: 'vertical',//展开菜单显示方式。horizontal:水平显示，vertical：垂直显示
				content: [{
					iconPath: '/static/fileconsole/new-folder.png',
					selectedIconPath: '/static/fileconsole/new-folder.png',
					text: '新建目录',
					active: false
				}, {
					iconPath: '/static/fileconsole/my-share.png',
					selectedIconPath: '/static/fileconsole/my-share.png',
					text: '我的分享',
					active: false
				}, {
					iconPath: '/static/fileconsole/my-recycle-bin.png',
					selectedIconPath: '/static/fileconsole/my-recycle-bin.png',
					text: '回收站',
					active: false
				}],
				
				//模态框
				showModel: false,//是否显示
				type: 'input',
				data: {}
				
			}
		},
		onLoad(option) {
			if(option.type != undefined){
				this.curIndex = option.type * 1;
			}
		},
		methods: {
			// 切换菜单
			changeTab (i) {
				this.curIndex = i
			},
			
			//展开菜单点击事件，返回点击信息
			trigger: function(item){
				if(item.index == 0){
					//新建目录
					this.showModel = !this.showModel
					this.data = {
						title:'新建目录',
						content:[
							{title:'目录名', content:'', placeholder:'请输入目录名'}
						]
					}
				}
			},
			
			//模态框提交
			onConfirm(e){
				var folderId = "2";
				if(this.curIndex == 0){//收藏夹
					folderId = "1";
				}else if(this.curIndex == 1){//我的文档
					folderId = "2";
				}else if(this.curIndex == 2){//企业网盘
					folderId = "3";
				}
				var param = {
					parentId: folderId,
					catalogName: (e[0].content == '' || e[0].content == null || e[0].content == 'undefined') ? '新建目录' : e[0].content
				}
				this.$api.post('fileconsole002', param).then((res)=>{
					if(res.returnCode == 0){
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: '新建成功'
						});
						if(this.curIndex == 0){//收藏夹
							this.$refs.favorites.refresh()
						}else if(this.curIndex == 1){//我的文档
							this.$refs.myDocuments.refresh()
						}else if(this.curIndex == 2){//企业网盘
							this.$refs.enterpriseSkyDrive.refresh()
						}
					}else{
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res.returnMessage
						});
					}
				})
			},
			//模态框取消
			cancel(){
			},
			
		}
	}
</script>

<style>
	.top-warp{
		z-index: 998;
		position: fixed;
		top: --window-top; /* css变量 */
		left: 0;
		width: 100%;
		background-color: white;
	}
	.top-warp .tip{
		font-size: 28upx;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
	}
	.top-warp .nav{
		text-align: center;
		height: 80upx;
		border-bottom: 1upx solid #ddd;
	}
	.top-warp .nav view{
		display: inline-block;
		width: auto;
		line-height: 80upx;
		font-size: 28upx;
		padding: 0px 20upx;
	}
	.top-warp .nav .active{
		border-bottom: 2upx solid #FF6990;
		color: #FF6990;
	}
</style>
