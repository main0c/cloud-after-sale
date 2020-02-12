<template>
	<view class="content">
		<view v-for="(bean, i) in typeList" :key="i">
			<view class="uni-section">
				<view class="uni-section__head">
					<view class="line"></view>
				</view>
				<view class="uni-section__content">
					<text class="uni-list-item__content-title"><span>{{bean.title}}</span></text>
				</view>
			</view>
			<uni-list v-for="(item, index) in bean.list" :key="index">
				<uni-list-item :title="item.name" :thumb="item.iconPath" show-badge="true" :badge-text="item.number" badge-type="primary"
				 @click="toPage(item.url)"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				title: 'Hello',
				typeList: [{
					title: "新增工单",
					list: [{
						name: "新增工单",
						iconPath: "../../static/workordericon/workorder-add.png",
						number: "",
						url: "workorderAdd"
					}, {
						name: "微信报单",
						iconPath: "../../static/workordericon/workorder-wechat.png",
						number: "",
						url: "workorderAdd"
					}]
				}, {
					title: "我的工单",
					list: [{
						name: "待接单",
						iconPath: "../../static/workordericon/workorder-recepit.png",
						number: "",
						url: "workorderState/workorderState?type=0"
					}, {
						name: "待签到",
						iconPath: "../../static/workordericon/workorder-sign.png",
						number: "",
						url: "workorderState/workorderState?type=1"
					}, {
						name: "待完工",
						iconPath: "../../static/workordericon/workorder-complate.png",
						number: "",
						url: "workorderState/workorderState?type=2"
					}, {
						name: "待评价",
						iconPath: "../../static/workordericon/workorder-evaluate.png",
						number: "",
						url: "workorderState/workorderState?type=3"
					}]
				}, {
					title: "所有工单",
					list: [{
						name: "待派工",
						iconPath: "../../static/workordericon/workorder-waitperson.png",
						number: "",
						url: "workorderState/workorderState?type=1"
					}, {
						name: "待审核",
						iconPath: "../../static/workordericon/workorder-examine.png",
						number: "",
						url: "workorderState/workorderState?type=6"
					}, {
						name: "已完工工单",
						iconPath: "../../static/workordericon/workorder-success.png",
						number: "",
						url: "workorderAdd"
					}, {
						name: "全部待办",
						iconPath: "../../static/workordericon/workorder-do.png",
						number: "",
						url: "workorderAdd"
					},  {
						name: "所有工单",
						iconPath: "../../static/workordericon/workorder-all.png",
						number: "",
						url: "workorderAdd"
					}]
				}]
			}
		},
		onLoad() {
			this.$api.get("sealservicephone001", {}).then((res)=>{
				if(res.returnCode == 0){
					for(let i = 0; i < res.rows.length; i++){
						let state = res.rows[i].state;
						let stateNumber = res.rows[i].stateNumber;
						if(state == 1){//待派工
							this.typeList[2].list[0].number = stateNumber;
						}else if(state == 2){//待接单
							this.typeList[1].list[0].number = stateNumber;
						}else if(state == 3){//待签单
							this.typeList[1].list[1].number = stateNumber;
						}else if(state == 4){//待完工
							this.typeList[1].list[2].number = stateNumber;
						}else if(state == 5){//待评价
							this.typeList[1].list[3].number = stateNumber;
						}else if(state == 6){//待审核
							this.typeList[2].list[1].number = stateNumber;
						}else if(state == 7){//已完工
							this.typeList[2].list[2].number = stateNumber;
						}
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
		methods: {
			toPage: function(url) {
				//navigateTo, redirectTo 只能打开非 tabBar 页面。
				//switchTab 只能打开 tabBar 页面。
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>

<style>
	/deep/ .uni-list-item__container {
		padding: 8px 15px;
	}

	/deep/ .uni-list-item {
		border-bottom: 1px #c8c7cc solid;
	}

	/deep/ .uni-list-item__icon-img {
		top: 3px;
	}
</style>
