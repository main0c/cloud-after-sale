<template>
	<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
		<FileConsoleClickListItem :list="beansList"></FileConsoleClickListItem>
	</mescroll-body>
</template>

<script>
	//上拉加载，下拉刷新
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js"
	import FileConsoleClickListItem from "./fileConsoleClickListItem.vue"
	
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			FileConsoleClickListItem
		},
		data() {
			return {
				beansList: [],//子目录列表
				folderId: ''//父目录id
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
			}
		}
	}
	
</script>

<style>
</style>
