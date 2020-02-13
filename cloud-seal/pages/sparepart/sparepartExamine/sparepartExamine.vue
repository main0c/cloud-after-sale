<template>
	<view class="content">
		<!-- 菜单 -->
		<view class="top-warp">
			<view class="nav">
				<view v-for="(tab, i) in tabs" :key="i" :class="{'active':curIndex===i}" @click="changeTab(i)">{{tab}}</view>
			</view>
		</view>
		<!-- 待审核 -->
		<sparepart-examine-item :i="0" :index="curIndex"></sparepart-examine-item>
		<!-- 已审核 -->
		<sparepart-examine-item :i="1" :index="curIndex"></sparepart-examine-item>
	</view>
</template>

<script>
	import SparepartExamineItem from './sparepartExamineItem.vue';
	export default {
		components: {
			SparepartExamineItem
		},
		data() {
			return {
				tabs: ["待审核", "已审核"],
				curIndex: 0// 当前tab的下标
			}
		},
		onLoad(option) {
			
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
		padding: 0px 20upx;
	}
	.top-warp .nav .active{
		border-bottom: 2upx solid #FF6990;
		color: #FF6990;
	}
</style>
