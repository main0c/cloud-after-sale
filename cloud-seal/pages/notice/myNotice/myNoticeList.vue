<template>
	<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
		<MyNoticeListItem :list="beans" v-on:ToRefresh="refresh()"></MyNoticeListItem>
	</mescroll-body>
</template>

<script>
	//上拉加载，下拉刷新
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js"
	import MyNoticeListItem from "./myNoticeListItem.vue"
	
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			MyNoticeListItem
		},
		data() {
			return {
				beans: []//我的通知列表
			}
		},
		onLoad(option) {
		},
		methods: {
			/**
			 * 加载我的通知列表
			 */
			upCallback(page){
				this.$api.get("syseveusernotice001", {limit: page.size, page: page.num}).then((res)=>{
					if(res.returnCode == 0){
						this.mescroll.endSuccess(res.rows.length, res.total);
						//设置列表数据
						if(page.num == 1) this.beans = []; //如果是第一页需手动制空列表
						this.beans = this.beans.concat(res.rows); //追加新数据
					}else{
						this.mescroll.endErr();
					}
				})
			},
			
			//子组件主动刷新页面数据
			refresh: function(){
				this.mescroll.triggerDownScroll()
			},
			
		}
	}
	
</script>

<style>
</style>
