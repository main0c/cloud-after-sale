<template>
	<view class="content">
		<!-- 菜单 -->
		<view class="top-warp">
			<view class="nav">
				<view v-for="(tab, i) in tabs" :key="i" :class="{'active':curIndex===i}" @click="changeTab(i)">{{tab}}</view>
			</view>
		</view>
		<!-- 全部 -->
		<mescroll-item :i="0" :index="curIndex"></mescroll-item>
		<!-- 待派工 -->
		<mescroll-item :i="1" :index="curIndex"></mescroll-item>
		<!-- 待接单 -->
		<mescroll-item :i="2" :index="curIndex"></mescroll-item>
		<!-- 待签到 -->
		<mescroll-item :i="3" :index="curIndex"></mescroll-item>
		<!-- 待完成 -->
		<mescroll-item :i="4" :index="curIndex"></mescroll-item>
		<!-- 待评价 -->
		<mescroll-item :i="5" :index="curIndex"></mescroll-item>
		<!-- 待审核 -->
		<mescroll-item :i="6" :index="curIndex"></mescroll-item>
	</view>
</template>

<script>
	import MescrollItem from './workorderStateItem.vue';
	export default {
		components: {
			MescrollItem
		},
		data() {
			return {
				tabs: ["全部", "待派工", "待接单", "待签到", "待完成", "待评价", "待审核"],
				curIndex: 0// 当前tab的下标
			}
		},
		onLoad(option) {
			this.curIndex = option.type * 1;
		},
		methods: {
			// 切换菜单
			changeTab (i) {
				this.curIndex = i
			}
		}
	}
</script>

<style>
	.top-warp{
		z-index: 9990;
		position: fixed;
		top: --window-top; /* css变量 */
		left: 0;
		width: 100%;
		background-color: white;
	}
	.top-warp .tip{
		font-size: 28upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
	}
	.top-warp .nav{
		text-align: center;
		height: 60upx;
		border-bottom: 1upx solid #ddd;
	}
	.top-warp .nav view{
		display: inline-block;
		width: auto;
		line-height: 60upx;
		font-size: 28upx;
		padding: 0px 10upx;
	}
	.top-warp .nav .active{
		border-bottom: 2upx solid #FF6990;
		color: #FF6990;
	}
</style>
