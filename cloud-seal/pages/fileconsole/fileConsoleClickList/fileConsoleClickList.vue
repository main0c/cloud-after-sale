<template>
	
	<view class="content">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<FileConsoleClickListItem :list="beansList" v-on:ToRefresh="refresh()"></FileConsoleClickListItem>
		</mescroll-body>
	
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
	//上拉加载，下拉刷新
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js"
	import FileConsoleClickListItem from "./fileConsoleClickListItem.vue"
	
	//悬浮按钮
	import uniFab from '@/components/uni-fab/uni-fab.vue';
	
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			FileConsoleClickListItem,
			uniFab
		},
		data() {
			return {
				beansList: [],//子目录列表
				folderId: '',//父目录id
				
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
			this.folderId = option.id;
		},
		methods: {
			/**
			 * 加载子目录的列表
			 */
			upCallback(page){
				this.$api.get("fileconsole003", {folderId: this.folderId, orderBy: 3}).then((res)=>{
					if(res.returnCode == 0){
						this.mescroll.endSuccess(res.rows.length, false);
						//设置列表数据
						if(page.num == 1) this.beansList = []; //如果是第一页需手动制空列表
						this.beansList = this.beansList.concat(res.rows); //追加新数据
					}else{
						this.mescroll.endErr();
					}
				})
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
				}else if(item.index == 1){
					//我的分享
					uni.navigateTo({
						url: '/pages/fileconsole/myShareFile/myShareFileList'
					})
				}else if(item.index == 2){
					//回收站
					uni.navigateTo({
						url: '/pages/fileconsole/recycleBin/recycleBinList'
					})
				}
			},
			
			//子组件主动刷新页面数据
			refresh: function(){
				this.mescroll.triggerDownScroll()
			},
			
			//模态框提交
			onConfirm(e){
				var param = {
					parentId: this.folderId,
					catalogName: (e[0].content == '' || e[0].content == null || e[0].content == 'undefined') ? '新建目录' : e[0].content
				}
				this.$api.post('fileconsole002', param).then((res)=>{
					if(res.returnCode == 0){
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: '新建成功'
						});
						this.mescroll.triggerDownScroll()
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
</style>
