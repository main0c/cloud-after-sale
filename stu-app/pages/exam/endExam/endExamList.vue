<!-- 已考试列表 -->
<template>
	<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
		<EndExamListItem :list="list"></EndExamListItem>
	</mescroll-body>
</template>

<script>
	//上拉加载，下拉刷新
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js"
	import EndExamListItem from "./endExamListItem.vue"
	
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			EndExamListItem
		},
		data() {
			return {
				list: [],//列表
			}
		},
		onLoad() {
		},
		methods: {
			/**
			 * 加载列表
			 */
			upCallback(page){
				var params = {
					limit: page.size,
					page: page.num
				};
				this.$api.get("schoolstuexam002", params).then((res)=>{
					if(res.returnCode == 0){
						this.mescroll.endSuccess(res.rows.length, res.total);
						//设置列表数据
						if(page.num == 1) this.list = []; //如果是第一页需手动制空列表
						this.list = this.list.concat(res.rows); //追加新数据
					}else{
						this.mescroll.endErr();
					}
				})
			}
		}
	}
	
</script>

<style>
</style>
