<template>
	<view>
		<luBarTabNav :tabList="tabList" :barHeight="barHeight" ref="barTabNav">
			<view id="item1" class="tabbody">
				<view class="uni-form-title">基础信息</view>
				<view class="uni-form-item">
					<view class="title">客户：</view>
					<view class="content">
						{{rowMation.customerName}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">单据日期：</view>
					<view class="content">
						{{rowMation.applyTime}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">售后工单：</view>
					<view class="content">
						{{rowMation.orderNum}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">申领单号：</view>
					<view class="content">
						{{rowMation.applyNum}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">状态：</view>
					<view class="content">
						{{rowMation.stateName}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">备注：</view>
					<view class="content">
						{{rowMation.remark}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">相关附件：</view>
					<view class="content">
						<view class="uni-form-file" v-for="(bean, i) in rowMation.enclosureInfo" :key="i">{{bean.name}}</view>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">共计金额：</view>
					<view class="content">
						{{rowMation.allPrice}}
					</view>
				</view>
			</view>
			<view id="item2" class="tabbody">
				<view class="uni-form-title">配件明细</view>
				<view v-if="!rowMation.materials || rowMation.materials.length == 0" class="empty-box">
					<image src="../../static/common/empty.png" class="empty-icon"></image>
					<view class="empty-tip">暂无明细</view>
				</view>
				<view class="item-box" v-else v-for="(bean, index) in rowMation.materials" :key="index">
					<view class="item-line">
						<view class="line-left">仓库：</view>
						<view class="line-right">{{bean.depotName}}</view>
					</view>
					<view class="item-line">
						<view class="line-left">配件名称：</view>
						<view class="line-right">{{bean.materialName}}</view>
					</view>
					<view class="item-line">
						<view class="line-left">单位：</view>
						<view class="line-right">{{bean.unitName}}</view>
					</view>
					<view class="item-line">
						<view class="line-left">数量：</view>
						<view class="line-right">{{bean.operNum}}</view>
					</view>
					<view class="item-line">
						<view class="line-left">单价：</view>
						<view class="line-right">{{bean.unitPrice}}</view>
					</view>
					<view class="item-line">
						<view class="line-left">金额：</view>
						<view class="line-right">{{bean.allPrice}}</view>
					</view>
					<view class="item-line">
						<view class="line-left">备注：</view>
						<view class="line-right">{{bean.remark}}</view>
					</view>
				</view>
			</view>
		</luBarTabNav>
	</view>
</template>

<script>
	
	import luBarTabNav from "@/components/lu-bar-tab-nav/lu-bar-tab-nav.vue";
	
	export default {
		components:{
			luBarTabNav
		},
		data() {
			return {
				barHeight: "30",
				tabList: [{
					text: "基础信息",
					navTarget: "#item1",
				}, {
					text: "配件明细",
					navTarget: "#item2",
				}],
				
				rowMation: {}//申领单信息
			}
		},
		onPageScroll: function(e) {
			this.$refs.barTabNav._selectedTab(e.scrollTop);
		},
		onLoad(options) {
			if (!options.id) {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '缺少申领单id',
					success: function() {
						setTimeout(function() {
							uni.navigateBack()
						}, 2000)
					}
				});
			}

			//获取申领单信息
			this.$api.get("sealseservice028", {rowId: options.id}).then((res) => {
				if (res.returnCode == 0) {
					this.rowMation = res.bean;
				} else {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: res.returnMessage
					});
				}
			})

		},
		methods: {
		}
	}
</script>

<style>
	.tabbody {
		position: relative;
		width: 100%;
	}
</style>
