<template>
	<view class="content">
		<!-- 菜单 -->
		<view class="top-warp">
			<view class="nav">
				<view v-for="(tab, i) in tabs" :key="i" :class="{'active':curIndex===i}" @click="changeTab(i)">{{tab}}</view>
			</view>
		</view>
		<!-- 待接单 -->
		<mescroll-item :i="0" :index="curIndex" ref="receipt"></mescroll-item>
		<!-- 待签到 -->
		<mescroll-item :i="1" :index="curIndex" ref="signIn"></mescroll-item>
		<!-- 待完工 -->
		<mescroll-item :i="2" :index="curIndex" ref="complate"></mescroll-item>
		<!-- 待评价 -->
		<mescroll-item :i="3" :index="curIndex" ref="evaluate"></mescroll-item>
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
				tabs: ["待接单", "待签到", "待完工", "待评价"],
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
				this.$refs.receipt.refresh()
			},
			
			//签到操作时，刷新待签到
			refreshSignIn: function(){
				this.$refs.signIn.refresh()
			},
			
			//完工操作时，刷新待完工
			refreshComplate: function(){
				this.$refs.complate.refresh()
			},
			
			//评价操作时，刷新待评价
			refreshEvaluate: function(){
				this.$refs.evaluate.refresh()
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
		height: 80upx;
		line-height: 80upx;
		text-align: center;
	}
	.top-warp .nav{
		text-align: center;
		height: 80upx;
		border-bottom: 1upx solid #ddd;
	}
	.top-warp .nav view{
		display: inline-block;
		width: auto;
		line-height: 80upx;
		font-size: 28upx;
		padding: 0px 20upx;
	}
	.top-warp .nav .active{
		border-bottom: 2upx solid #FF6990;
		color: #FF6990;
	}
</style>
