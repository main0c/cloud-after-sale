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
					title: "工单状态",
					list: [{
						name: "待派工",
						iconPath: "../../static/workordericon/workorder-waitperson.png",
						number: "12",
						url: "workorderState/workorderState?type=1"
					}, {
						name: "待接单",
						iconPath: "../../static/workordericon/workorder-recepit.png",
						number: "10",
						url: "workorderState/workorderState?type=2"
					}, {
						name: "待签到",
						iconPath: "../../static/workordericon/workorder-sign.png",
						number: "10",
						url: "workorderState/workorderState?type=3"
					}, {
						name: "待完成",
						iconPath: "../../static/workordericon/workorder-complate.png",
						number: "10",
						url: "workorderState/workorderState?type=4"
					}, {
						name: "待评价",
						iconPath: "../../static/workordericon/workorder-evaluate.png",
						number: "10",
						url: "workorderState/workorderState?type=5"
					}, {
						name: "待审核",
						iconPath: "../../static/workordericon/workorder-examine.png",
						number: "10",
						url: "workorderState/workorderState?type=6"
					}]
				}, {
					title: "所有工单",
					list: [{
						name: "已完成工单",
						iconPath: "../../static/workordericon/workorder-success.png",
						number: "12",
						url: "workorderAdd"
					}, {
						name: "全部待办",
						iconPath: "../../static/workordericon/workorder-do.png",
						number: "10",
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
