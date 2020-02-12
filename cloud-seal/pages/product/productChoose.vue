<template>
	<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
		<ProductChooseItem :list="productList"></ProductChooseItem>
	</mescroll-body>
</template>

<script>
	//上拉加载，下拉刷新
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js"
	import ProductChooseItem from "./productChooseItem.vue"
	
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			ProductChooseItem
		},
		data() {
			return {
				productList: [],//产品列表
			}
		},
		onLoad() {
		},
		methods: {
			/**
			 * 加载产品的列表
			 */
			upCallback(page){
				this.$api.get("othersealservice001", {limit: page.size, page: page.num}).then((res)=>{
					if(res.returnCode == 0){
						this.mescroll.endSuccess(res.rows.length, res.total);
						//设置列表数据
						if(page.num == 1) this.productList = []; //如果是第一页需手动制空列表
						this.productList = this.productList.concat(res.rows); //追加新数据
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
