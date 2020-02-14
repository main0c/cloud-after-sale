<template>
	<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
		<WorkerChooseItem :list="serviceUserList" :backParam="backParam"></WorkerChooseItem>
	</mescroll-body>
</template>

<script>
	//上拉加载，下拉刷新
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js"
	import WorkerChooseItem from "./workerChooseItem.vue"
	
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			WorkerChooseItem
		},
		data() {
			return {
				serviceUserList: [],//工单接收人列表
				backParam: 'serviceUser'//数据要返回时赋值的对象,默认为serviceUser
			}
		},
		onLoad(option) {
			if(option.backParam != '' && option.backParam != null && option.backParam != undefined){
				this.backParam = option.backParam;
			}
		},
		methods: {
			/**
			 * 加载工单接收人的列表
			 */
			upCallback(page){
				this.$api.get("sealseserviceworker006", {userName: "", limit: page.size, page: page.num}).then((res)=>{
					if(res.returnCode == 0){
						this.mescroll.endSuccess(res.rows.length, res.total);
						//设置列表数据
						if(page.num == 1) this.serviceUserList = []; //如果是第一页需手动制空列表
						this.serviceUserList = this.serviceUserList.concat(res.rows); //追加新数据
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
