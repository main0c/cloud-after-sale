<template>
	<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
		<ly-tree :tree-data="serviceUserList" node-key="id" ref="tree" show-checkbox :props="defaultProps">
		</ly-tree>
	</mescroll-body>
</template>

<script>
	//上拉加载，下拉刷新
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js"
	//树组件
	import LyTree from '@/components/ly-tree/ly-tree.vue'
	
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			LyTree
		},
		data() {
			return {
				serviceUserList: [],//所有员工列表
				backParam: 'userList',//数据要返回时赋值的对象,默认为serviceUser
				//树加载
				defaultProps: {
					children: 'children',
					label: 'name'
				},
				userList: []
			}
		},
		onLoad(option) {
			var pages = getCurrentPages();
			var prevPage = pages[pages.length - 2]; //上一个页面
			//获取数据回显
			this.userList = prevPage._data[this.backParam];
			if(option.backParam != '' && option.backParam != null && option.backParam != undefined){
				this.backParam = option.backParam;
			}
		},
		
		onNavigationBarButtonTap() {
			var pages = getCurrentPages();
			var prevPage = pages[pages.length - 2]; //上一个页面
			var userList = [];
			for(let i = 0; i < this.$refs.tree.getCheckedNodes().length; i++){
				if(this.$refs.tree.getCheckedNodes()[i].folderType == "isPeople"){
					userList.push({
						id: this.$refs.tree.getCheckedNodes()[i].id,
						name: this.$refs.tree.getCheckedNodes()[i].name
					});
				}
			}
			prevPage._data[this.backParam] = userList;
			uni.navigateBack()
		},
		
		methods: {
			
			/**
			 * 加载所有员工列表
			 */
			upCallback(page){
				this.$api.get("commonphone002", {chooseOrNotMy: 1, chooseOrNotEmail: 2}).then((res)=>{
					if(res.returnCode == 0){
						this.mescroll.endSuccess(res.rows.length, res.total);
						//设置列表数据
						this.serviceUserList = res.rows;
						var checkNodes = [];
						for(let i = 0; i < this.userList.length; i++){
							checkNodes.push(this.userList[i].id)
						}
						this.$refs.tree.setCheckedKeys(checkNodes);
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
