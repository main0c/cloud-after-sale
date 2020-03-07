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
				<view class="uni-form-item">
					<view class="title">审批意见</view>
					<view class="content">
						<textarea placeholder="请输入审批意见" name="opinion" v-model="opinion" style="height: 160upx;"/>
					</view>
				</view>
			</view>
			<view class="uni-btn-v">
				<button @click="noPass()" class="sub-btn" style="background-color: #FF0000;">拒绝</button>
				<button @click="pass()" class="sub-btn" style="background-color: #007AFF;">通过</button>
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
				
				opinion: '',//意见
				
				rowId: '',
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
			
			this.rowId = options.id

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
			
			//审核不通过
			noPass: function(){
				var _this = this;
				uni.showModal({
				    title: '提示',
				    content: '确定拒绝该申领单吗？',
				    success: function (res) {
				        if (res.confirm) {
							_this.$api.post("sealseservice030", {rowId: _this.rowId, opinion: _this.opinion, isAgree: 2}).then((res)=>{
								if(res.returnCode == 0){
									uni.showToast({
										icon: 'success',
										position: 'bottom',
										title: '审核成功',
										complete:function(){
											setTimeout(function(){
												var pages = getCurrentPages();
												var prevPage = pages[pages.length - 2];  //上一个页面
												prevPage.refreshItemZero()
												uni.navigateBack()
											}, 2000)
										}
									});
								}else{
									uni.showToast({
										icon: 'none',
										position: 'bottom',
										title: res.returnMessage
									});
								}
							})
				        }
				    }
				});
			},
			
			//审核通过
			pass: function(){
				var _this = this;
				uni.showModal({
				    title: '提示',
				    content: '确定同意该申领单吗？',
				    success: function (res) {
				        if (res.confirm) {
							_this.$api.post("sealseservice030", {rowId: _this.rowId, opinion: _this.opinion, isAgree: 1}).then((res)=>{
								if(res.returnCode == 0){
									uni.showToast({
										icon: 'success',
										position: 'bottom',
										title: '审核成功',
										complete:function(){
											setTimeout(function(){
												var pages = getCurrentPages();
												var prevPage = pages[pages.length - 2];  //上一个页面
												prevPage.refreshItemZero()
												uni.navigateBack()
											}, 2000)
										}
									});
								}else{
									uni.showToast({
										icon: 'none',
										position: 'bottom',
										title: res.returnMessage
									});
								}
							})
				        }
				    }
				});
			}
			
		}
	}
</script>

<style>
	.tabbody {
		position: relative;
		width: 100%;
	}
	
	.sub-btn{
		width: 50%;
		float: left;
		border: 0px;
		border-radius: 0px;
		color: white;
	}
	
</style>
