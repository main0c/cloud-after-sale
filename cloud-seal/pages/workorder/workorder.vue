<template>
	<view class="content">
		<view v-for="bean in typeList">
			<uni-view class="uni-section">
				<uni-view class="uni-section__head">
					<uni-view class="line"></uni-view>
				</uni-view>
				<uni-view class="uni-section__content">
					<uni-text class="distraction"><span>{{bean.title}}</span></uni-text>
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
					title: "新增工单1",
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
