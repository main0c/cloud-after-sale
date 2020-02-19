<template>
	<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
		<SparepartChooseItem :list="beans" :number="number"></SparepartChooseItem>
	</mescroll-body>
</template>

<script>
	//上拉加载，下拉刷新
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js"
	import SparepartChooseItem from "./sparepartChooseItem.vue"
	
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			SparepartChooseItem
		},
		data() {
			return {
				beans: [],//配件列表
				number: 0//配件在页面上的集合number
			}
		},
		onLoad(option) {
			this.number = option.number * 1
		},
		methods: {
			/**
			 * 加载配件的列表
			 */
			upCallback(page){
				this.$api.get("parts010", {}).then((res)=>{
					if(res.returnCode == 0){
						this.mescroll.endSuccess(res.rows.length, res.total);
						//设置列表数据
						if(page.num == 1) this.beans = []; //如果是第一页需手动制空列表
						this.beans = this.beans.concat(res.rows); //追加新数据
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
