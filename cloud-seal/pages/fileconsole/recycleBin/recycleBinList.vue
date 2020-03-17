<template>
	<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
		<RecycleBinItem :list="beansList" v-on:ToRefresh="refresh()"></RecycleBinItem>
	</mescroll-body>
</template>

<script>
	//上拉加载，下拉刷新
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js"
	import RecycleBinItem from "./recycleBinItem.vue"
	
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			RecycleBinItem
		},
		data() {
			return {
				beansList: []//我的回收站列表
			}
		},
		onLoad(option) {
		},
		methods: {
			
			//子组件主动刷新页面数据
			refresh: function(){
				this.mescroll.triggerDownScroll()
			},
			
			/**
			 * 加载我的回收站列表
			 */
			upCallback(page){
				this.$api.get("fileconsole014", {limit: page.size, page: page.num}).then((res)=>{
					if(res.returnCode == 0){
						this.mescroll.endSuccess(res.rows.length, res.total);
						//设置列表数据
						if(page.num == 1) this.beansList = []; //如果是第一页需手动制空列表
						this.beansList = this.beansList.concat(res.rows); //追加新数据
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
	}
	
</script>

<style>
</style>
