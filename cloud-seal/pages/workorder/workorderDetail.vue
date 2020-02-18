<template>
	<view>
		<luBarTabNav :tabList="tabList" :barHeight="barHeight" ref="barTabNav">
			<view id="item1" class="tabbody">
				<view class="uni-form-title">基础信息</view>
				<view class="uni-form-item">
					<view class="title">工单号：</view>
					<view class="content">
						{{rowMation.orderNum}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">状态：</view>
					<view class="content">
						{{rowMation.stateName}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">服务类型：</view>
					<view class="content">
						{{rowMation.serviceTypeName}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">报单时间：</view>
					<view class="content">
						{{rowMation.declarationTime}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">客户：</view>
					<view class="content">
						{{rowMation.customerName}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">联系人：</view>
					<view class="content">
						{{rowMation.contacts}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">联系电话：</view>
					<view class="content">
						{{rowMation.phone}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">邮箱：</view>
					<view class="content">
						{{rowMation.email}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">QQ：</view>
					<view class="content">
						{{rowMation.qq}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">所在地区：</view>
					<view class="content">
						{{rowMation.addressProvince}} {{rowMation.addressCity}} {{rowMation.addressArea}} {{rowMation.addressTownship}} {{rowMation.addressDetailed}}
					</view>
				</view>
			</view>
			<view id="item2" class="tabbody">
				<view class="uni-form-title">产品信息</view>
				<view class="uni-form-item">
					<view class="title">产品名称：</view>
					<view class="content">
						{{rowMation.productName}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">规格型号：</view>
					<view class="content">
						{{rowMation.productNorms}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">序列号：</view>
					<view class="content">
						{{rowMation.productSerialNum}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">质保类型：</view>
					<view class="content">
						{{rowMation.productWarranty}}
					</view>
				</view>
			</view>
			<view id="item3" class="tabbody">
				<view class="uni-form-title">工单信息</view>
				<view class="uni-form-item">
					<view class="title">紧急程度：</view>
					<view class="content">
						{{rowMation.urgencyName}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">处理方式：</view>
					<view class="content">
						{{rowMation.modeName}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">服务内容：</view>
					<view class="content">
						{{rowMation.content}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">接收人：</view>
					<view class="content">
						{{rowMation.receiver}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">协助人：</view>
					<view class="content">
						<text v-for="(bean, i) in rowMation.cooperationUserId" :key="i">{{bean.name}},</text>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">相关照片：</view>
					<view class="content">
						<image v-for="(bean, i) in rowMation.imageData" :key="i" :src="bean" class="uni-form-image"></image>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">相关附件：</view>
					<view class="content">
						<view class="uni-form-file" v-for="(bean, i) in rowMation.enclosureInfo" :key="i">{{bean.name}}</view>
					</view>
				</view>
			</view>
			<view id="item4" class="tabbody">
				<view class="uni-form-title">接单信息</view>
				<view class="uni-form-item">
					<view class="title">开工时间：</view>
					<view class="content">
						{{rowMation.subscribeTime}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">完工时间：</view>
					<view class="content">
						{{rowMation.comTime}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">接单备注：</view>
					<view class="content">
						{{rowMation.receiptRemark}}
					</view>
				</view>
			</view>
			<view id="item5" class="tabbody">
				<view class="uni-form-title">签到信息</view>
				<view class="uni-form-item">
					<view class="title">签到地址：</view>
					<view class="content">
						{{rowMation.registerAddress}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">签到备注：</view>
					<view class="content">
						{{rowMation.remark}}
					</view>
				</view>
			</view>
			<view id="item6" class="tabbody">
				<view class="uni-form-title">完工信息</view>
				<view class="uni-form-item">
					<view class="title">故障类型：</view>
					<view class="content">
						{{rowMation.faultName}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">工时：</view>
					<view class="content">
						{{rowMation.comWorkTime}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">完工情况：</view>
					<view class="content">
						{{rowMation.comExecution}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">完工拍照：</view>
					<view class="content">
						<image v-for="(bean, i) in rowMation.comImageData" :key="i" :src="bean" class="uni-form-image"></image>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">完工附件：</view>
					<view class="content">
						<view class="uni-form-file" v-for="(bean, i) in rowMation.comEnclosureInfo" :key="i">{{bean.name}}</view>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">完工备注：</view>
					<view class="content">
						{{rowMation.comRemark}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">应收材料费：</view>
					<view class="content">
						{{rowMation.materialCost}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">应收服务费：</view>
					<view class="content">
						{{rowMation.coverCost}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">应收其他费：</view>
					<view class="content">
						{{rowMation.otherCost}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">应收合计：</view>
					<view class="content">
						{{rowMation.allPrice}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">经办人：</view>
					<view class="content">
						{{rowMation.faultName}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">客户结算状态：</view>
					<view class="content">
						<view v-if="rowMation.state == 7">已结算</view>
						<view v-else>待结算</view>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">网点结算状态：</view>
					<view class="content">
						<view v-if="rowMation.state == 7">已结算</view>
						<view v-else>待结算</view>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">员工结算状态：</view>
					<view class="content">
						<view v-if="rowMation.state == 7">已结算</view>
						<view v-else>待结算</view>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">厂商结算状态：</view>
					<view class="content">
						<view v-if="rowMation.state == 7">已结算</view>
						<view v-else>待结算</view>
					</view>
				</view>
			</view>
			<view id="item7" class="tabbody">
				<view class="uni-form-title">评价信息</view>
				<view class="uni-form-item">
					<view class="title">评价类型：</view>
					<view class="content">
						{{rowMation.evaluateTypeName}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">评价内容：</view>
					<view class="content">
						{{rowMation.evaluateContent}}
					</view>
				</view>
			</view>
			<view id="item8" class="tabbody">
				<view class="uni-form-title">配件使用明细</view>
				<view v-if="!rowMation.materialMation || rowMation.materialMation.length == 0" class="empty-box">
					<image src="../../static/common/empty.png" class="empty-icon"></image>
					<view class="empty-tip">暂无使用明细</view>
				</view>
				<view class="item-box" v-else v-for="(bean, index) in rowMation.materialMation" :key="index">
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
						<view class="line-right">{{bean.operNumber}}</view>
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
			<view id="item9" class="tabbody">
				<view class="uni-form-title">情况反馈单</view>
				<view v-if="!rowMation.feedbackMation || rowMation.feedbackMation.length == 0" class="empty-box">
					<image src="../../static/common/empty.png" class="empty-icon"></image>
					<view class="empty-tip">暂无反馈信息</view>
				</view>
				<view class="item-box" v-else v-for="(bean, index) in rowMation.feedbackMation" :key="index">
					<view class="item-line">
						<view class="line-left">反馈类型：</view>
						<view class="line-right">{{bean.typeName}}</view>
					</view>
					<view class="item-line">
						<view class="line-left">反馈人：</view>
						<view class="line-right">{{bean.feedbackUserName}}</view>
					</view>
					<view class="item-line">
						<view class="line-left">反馈时间：</view>
						<view class="line-right">{{bean.feedbackCreateTime}}</view>
					</view>
					<view class="item-line">
						<view class="line-left">反馈内容：</view>
						<view class="line-right">{{bean.content}}</view>
					</view>
					<view class="item-line">
						<view class="line-left">附件：</view>
						<view class="line-right">
							<view class="uni-form-file" v-for="(bean, i) in bean.enclosureInfo" :key="i">{{bean.name}}</view>
						</view>
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
					text: "产品信息",
					navTarget: "#item2",
				}, {
					text: "工单信息",
					navTarget: "#item3",
				}, {
					text: "接单信息",
					navTarget: "#item4",
				}, {
					text: "签到信息",
					navTarget: "#item5",
				}, {
					text: "完工信息",
					navTarget: "#item6",
				}, {
					text: "评价信息",
					navTarget: "#item7",
				}, {
					text: "配件使用明细",
					navTarget: "#item8",
				}, {
					text: "情况反馈单",
					navTarget: "#item9",
				}],
				
				rowMation: {},//工单信息
				imageData: [], //图片回显数据数组：[{0: "/images/upload/order/1581591580676.png"}]

				fileData: [], //附件回显数据fileName: "客户档案.png",id: "d6c44d88357441a8b1c7788329d91b37",url: "/images/upload/enclosurefile/300b878c5c6744f2b48e6bc40beefd11/1581591367754.png"
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
					title: '缺少工单id',
					success: function() {
						setTimeout(function() {
							uni.navigateBack()
						}, 2000)
					}
				});
			}

			//获取工单信息
			this.$api.get("sealseservice010", {rowId: options.id}).then((res) => {
				if (res.returnCode == 0) {
					this.rowMation = res.bean;
					//相关图片
					var imageData = [];
					for(let i = 0; i < res.bean.sheetPicture.split(',').length; i++){
						if(res.bean.sheetPicture.split(',')[i]){
							imageData.push(this.$fileBasePath + res.bean.sheetPicture.split(',')[i]);
						}
					}
					this.rowMation.imageData = imageData;
					
					//完工图片
					var comImageData = [];
					for(let i = 0; i < res.bean.comPic.split(',').length; i++){
						if(res.bean.comPic.split(',')[i]){
							comImageData.push(this.$fileBasePath + res.bean.comPic.split(',')[i]);
						}
					}
					this.rowMation.comImageData = comImageData;
					
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
