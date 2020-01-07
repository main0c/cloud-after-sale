<template>
	<view class="content">
		<view v-for="(bean, i) in typeList" :key="i">
			<uni-view class="uni-section">
				<uni-view class="uni-section__head">
					<uni-view class="line"></uni-view>
				</uni-view>
				<uni-view class="uni-section__content">
					<uni-text class="uni-list-item__content-title"><span>{{bean.title}}</span></uni-text>
				</uni-view>
			</uni-view>
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
						number: "12",
						url: "workorderAdd"
					}, {
						name: "微信报单",
						iconPath: "../../static/workordericon/workorder-add.png",
						number: "10",
						url: "workorderAdd"
					}]
				}, {
					title: "工单状态",
					list: [{
						name: "待派工",
						iconPath: "../../static/workordericon/workorder-add.png",
						number: "12",
						url: "workorderState/workorderState"
					}, {
						name: "待接单",
						iconPath: "../../static/workordericon/workorder-add.png",
						number: "10",
						url: "workorderAdd"
					}, {
						name: "待签到",
						iconPath: "../../static/workordericon/workorder-add.png",
						number: "10",
						url: "workorderAdd"
					}, {
						name: "待完成",
						iconPath: "../../static/workordericon/workorder-add.png",
						number: "10",
						url: "workorderAdd"
					}, {
						name: "待评价",
						iconPath: "../../static/workordericon/workorder-add.png",
						number: "10",
						url: "workorderAdd"
					}, {
						name: "待审核",
						iconPath: "../../static/workordericon/workorder-add.png",
						number: "10",
						url: "workorderAdd"
					}]
				}, {
					title: "所有工单",
					list: [{
						name: "已完成工单",
						iconPath: "../../static/workordericon/workorder-add.png",
						number: "12",
						url: "workorderAdd"
					}, {
						name: "全部待办",
						iconPath: "../../static/workordericon/workorder-add.png",
						number: "10",
						url: "workorderAdd"
					},  {
						name: "所有工单",
						iconPath: "../../static/workordericon/workorder-add.png",
						number: "",
						url: "workorderAdd"
					}]
				}]
			}
		},
		onLoad() {

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
