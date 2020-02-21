<template>
	<view class="content">
		<!-- 菜单 -->
		<view class="top-warp">
			<view class="nav">
				<view v-for="(tab, i) in tabs" :key="i" :class="{'active':curIndex===i}" @click="changeTab(i)">{{tab}}</view>
			</view>
		</view>
		<!-- 所有工单 -->
		<mescroll-item :i="0" :index="curIndex" ref="allOrder"></mescroll-item>
		<!-- 待派工 -->
		<mescroll-item :i="1" :index="curIndex" ref="worker"></mescroll-item>
		<!-- 待评价 -->
		<mescroll-item :i="2" :index="curIndex" ref="evaluate"></mescroll-item>
		<!-- 待审核 -->
		<mescroll-item :i="3" :index="curIndex"></mescroll-item>
		<!-- 已完工 -->
		<mescroll-item :i="4" :index="curIndex"></mescroll-item>
	</view>
</template>

<script>
	import MescrollItem from './workAllorderStateItem.vue';
	export default {
		components: {
			MescrollItem
		},
		data() {
			return {
				tabs: ["全部", "待派工", "待评价", "待审核", "已完工"],
				curIndex: 0// 当前tab的下标
			}
		},
		onLoad(option) {
			if(option.type != undefined){
				this.curIndex = option.type * 1;
			}
		},
		methods: {
			// 切换菜单
			changeTab (i) {
				this.curIndex = i
			},
			
			//接单操作时，刷新待接单
			refreshReceipt: function(){
				this.$refs.allOrder.refresh()
			},
			
			//签到操作时，刷新待签到
			refreshSignIn: function(){
				this.$refs.allOrder.refresh()
			},
			
			//完工操作时，刷新待完工
			refreshComplate: function(){
				this.$refs.allOrder.refresh()
			},
			
			//评价操作时，刷新待评价
			refreshEvaluate: function(){
				this.$refs.evaluate.refresh()
			},
			
			//派工操作时，刷新待派工
			refreshWorker: function(){
				this.$refs.worker.refresh()
			}
			
		}
	}
</script>

<style>
	.top-warp{
		z-index: 998;
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
