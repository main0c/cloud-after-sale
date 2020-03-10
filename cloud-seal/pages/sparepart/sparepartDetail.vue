<template>
	<view>
		<luBarTabNav :tabList="tabList" :barHeight="barHeight" ref="barTabNav">
			<view id="item1" class="tabbody">
				<view class="uni-form-title">基础信息</view>
				<view class="uni-form-item">
					<view class="title">配件名称：</view>
					<view class="content">
						{{rowMation.partsName}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">型号：</view>
					<view class="content">
						{{rowMation.model}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">一级类型：</view>
					<view class="content">
						{{rowMation.categoryName}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">二级类型：</view>
					<view class="content">
						{{rowMation.categorySecName}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">备注：</view>
					<view class="content">
						{{rowMation.remark}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">附件资料：</view>
					<view class="content">
						<view class="uni-form-file" v-for="(bean, i) in rowMation.enclosureInfo" :key="i">{{bean.name}}</view>
					</view>
				</view>
			</view>
			<view id="item2" class="tabbody">
				<view class="uni-form-title">价格信息</view>
				<view class="uni-form-item">
					<view class="title">单位类型：</view>
					<view class="content">
						{{rowMation.unitType}}
					</view>
				</view>
				<!-- 非多单位 -->
				<block v-if="rowMation.unit == 1">
					<view class="uni-form-item">
						<view class="title">当前存量：</view>
						<view class="content">
							{{rowMation.norms[0].currentTock}}
						</view>
					</view>
					<view class="uni-form-item">
						<view class="title">安全存量：</view>
						<view class="content">
							{{rowMation.norms[0].safetyTock}}
						</view>
					</view>
					<view class="uni-form-item">
						<view class="title">初始库存：</view>
						<view class="content">
							<view v-if="!rowMation.norms[0].normStock || rowMation.norms[0].normStock.length == 0" style="color: gray;">暂无初始库存</view>
							<view class="item-box" v-else v-for="(bean, index) in rowMation.norms[0].normStock" :key="index">
								<view class="item-line">
									<view class="line-left">仓库</view>
									<view class="line-right">{{bean.depotName}}</view>
								</view>
								<view class="item-line">
									<view class="line-left">数量</view>
									<view class="line-right">{{bean.initialTock}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="uni-form-item">
						<view class="title">单位：</view>
						<view class="content">
							{{rowMation.unitName}}
						</view>
					</view>
					<view class="uni-form-item">
						<view class="title">零售价：</view>
						<view class="content">
							{{rowMation.norms[0].retailPrice}}
						</view>
					</view>
					<view class="uni-form-item">
						<view class="title">最低售价：</view>
						<view class="content">
							{{rowMation.norms[0].lowPrice}}
						</view>
					</view>
					<view class="uni-form-item">
						<view class="title">预计采购价：</view>
						<view class="content">
							{{rowMation.norms[0].estimatePurchasePrice}}
						</view>
					</view>
					<view class="uni-form-item">
						<view class="title">销售价：</view>
						<view class="content">
							{{rowMation.norms[0].salePrice}}
						</view>
					</view>
				</block>
				<!-- 多单位 -->
				<block v-else>
					<view class="uni-form-item">
						<view class="title">单位：</view>
						<view class="content">
							{{rowMation.unitGroupName}}
						</view>
					</view>
					<view class="uni-form-item">
						<view class="title">首选入库单位：</view>
						<view class="content">
							{{rowMation.firstInUnit}}
						</view>
					</view>
					<view class="uni-form-item">
						<view class="title">首选出库单位：</view>
						<view class="content">
							{{rowMation.firstOutUnit}}
						</view>
					</view>
					<view class="uni-form-item">
						<view class="title">价格表：</view>
					</view>
					<view class="item-box" v-for="(bean, index) in rowMation.norms" :key="index">
						<view class="item-line">
							<view class="line-left">单位类型：</view>
							<view class="line-right">{{bean.baseUnit}}</view>
						</view>
						<view class="item-line">
							<view class="line-left">计量单位：</view>
							<view class="line-right">{{bean.unitName}}</view>
						</view>
						<view class="item-line">
							<view class="line-left">安全存量：</view>
							<view class="line-right">{{bean.safetyTock}}</view>
						</view>
						<view class="item-line">
							<view class="line-left">初始库存：</view>
							<view class="line-right">
								<view v-if="!bean.normStock || bean.normStock.length == 0" style="color: gray;">暂无初始库存</view>
								<view class="item-box" v-else v-for="(item, i) in bean.normStock" :key="i">
									<view class="item-line">
										<view class="line-left">仓库</view>
										<view class="line-right">{{item.depotName}}</view>
									</view>
									<view class="item-line">
										<view class="line-left">数量</view>
										<view class="line-right">{{item.initialTock}}</view>
									</view>
								</view>
							</view>
						</view>
						<view class="item-line">
							<view class="line-left">当前存量：</view>
							<view class="line-right">{{bean.currentTock}}</view>
						</view>
						<view class="item-line">
							<view class="line-left">零售价：</view>
							<view class="line-right">{{bean.retailPrice}}</view>
						</view>
						<view class="item-line">
							<view class="line-left">最低售价：</view>
							<view class="line-right">{{bean.lowPrice}}</view>
						</view>
						<view class="item-line">
							<view class="line-left">预计采购价：</view>
							<view class="line-right">{{bean.estimatePurchasePrice}}</view>
						</view>
						<view class="item-line">
							<view class="line-left">销售价：</view>
							<view class="line-right">{{bean.salePrice}}</view>
						</view>
					</view>
				</block>
			</view>
			<view id="item3" class="tabbody">
				<view class="uni-form-title">扩展信息</view>
				<view v-if="!rowMation.extends || rowMation.extends.length == 0" class="empty-box">
					<image src="../../static/common/empty.png" class="empty-icon"></image>
					<view class="empty-tip">暂无扩展信息</view>
				</view>
				<view class="uni-form-item" v-else v-for="(bean, i) in rowMation.extends" :key="i">
					<view class="title">{{bean.lableName}}：</view>
					<view class="content">
						{{bean.content}}
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
					text: "价格信息",
					navTarget: "#item2",
				}, {
					text: "扩展信息",
					navTarget: "#item3",
				}],
				
				rowMation: {},//配件信息
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
					title: '缺少配件id',
					success: function() {
						setTimeout(function() {
							uni.navigateBack()
						}, 2000)
					}
				});
			}

			//获取配件信息
			this.$api.get("parts007", {rowId: options.id}).then((res) => {
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
