<template>
	<view>
		<luBarTabNav :tabList="tabList" :barHeight="barHeight" ref="barTabNav">
			<view id="item1" class="tabbody">
				<view class="uni-form-title">基本信息</view>
				<view class="uni-form-item">
					<view class="title">客户名称：</view>
					<view class="content">
						{{rowMation.name}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">拼音：</view>
					<view class="content">
						{{rowMation.combine}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">分类：</view>
					<view class="content">
						{{rowMation.typeId}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">客户来源：</view>
					<view class="content">
						{{rowMation.fromId}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">所属行业：</view>
					<view class="content">
						{{rowMation.industryId}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">客户网址：</view>
					<view class="content">
						{{rowMation.cusUrl}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">国家/地区：</view>
					<view class="content">
						{{rowMation.country}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">所在城市：</view>
					<view class="content">
						{{rowMation.city}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">详细地址：</view>
					<view class="content">
						{{rowMation.detailAddress}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">邮政编码：</view>
					<view class="content">
						{{rowMation.postalCode}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">传真：</view>
					<view class="content">
						{{rowMation.fax}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">联系人：</view>
					<view class="content">
						{{rowMation.contacts}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">部门：</view>
					<view class="content">
						{{rowMation.department}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">职务：</view>
					<view class="content">
						{{rowMation.job}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">办公电话：</view>
					<view class="content">
						{{rowMation.workPhone}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">移动电话：</view>
					<view class="content">
						{{rowMation.mobilePhone}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">邮件：</view>
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
					<view class="title">法人代表：</view>
					<view class="content">
						{{rowMation.corRepresentative}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">注册资本：</view>
					<view class="content">
						{{rowMation.regCapital}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">附加说明：</view>
					<view class="content">
						{{rowMation.addDesc}}
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
				<view class="uni-form-title">财务信息</view>
				<view class="uni-form-item">
					<view class="title">银行账户：</view>
					<view class="content">
						{{rowMation.bankAccount}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">开户名称：</view>
					<view class="content">
						{{rowMation.accountName}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">开户银行：</view>
					<view class="content">
						{{rowMation.bankName}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">银行地址：</view>
					<view class="content">
						{{rowMation.bankAddress}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">税号：</view>
					<view class="content">
						{{rowMation.dutyParagraph}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">电话：</view>
					<view class="content">
						{{rowMation.financePhone}}
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
					text: "基本信息",
					navTarget: "#item1",
				}, {
					text: "财务信息",
					navTarget: "#item2",
				}],
				
				rowMation: {},//客户信息
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
					title: '缺少客户id',
					success: function() {
						setTimeout(function() {
							uni.navigateBack()
						}, 2000)
					}
				});
			}

			//获取客户信息
			this.$api.get("customer005", {rowId: options.id}).then((res) => {
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
