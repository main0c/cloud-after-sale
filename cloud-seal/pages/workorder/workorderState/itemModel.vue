<template>
	<view class="pd-list">
		<view class="pd-li" v-for="pd in list" :key="pd.id" @click="rowDetails(pd.id)">
			<view class="pd-order-num">
				<text class="left-content">工单号：</text>
				<text class="">{{pd.orderNum}}</text>
			</view>
			<view class="pd-name">
				<text class="left-content">客户名称：</text>
				<text class="right-content">{{pd.customerName}}</text>
			</view>
			<view class="pd-pro-name">
				<text class="left-content">产品名称：</text>
				<text class="right-content">{{pd.productName}}</text>
			</view>
			<view class="pd-pro-type">
				<text class="left-content">报单时间：</text>
				<text class="right-content">{{pd.declarationTime}}</text>
			</view>
			<view class="pd-pro-type">
				<text class="left-content">服务类型：</text>
				<text class="right-content">{{pd.serviceTypeName}}</text>
			</view>
			<view class="pd-bottom">
				<text class="pd-state-name">{{pd.stateName}}</text>
				<view class="pd-operator">
					<button @click.stop="rowReceipt(pd.id)" v-if="pd.state == 2">接单</button>
					<button @click.stop="rowSignIn(pd.id)" v-if="pd.state == 3">签到</button>
					<button @click.stop="rowComplate(pd.id)" v-if="pd.state == 4">完工</button>
					<button @click.stop="test()" v-if="pd.state == 5">评价</button>
					<button @click.stop="rowFeedBack(pd.id)" v-if="pd.state == 4 || pd.state == 5">情况反馈</button>
					<button @click.stop="editRow(pd.id)" v-if="pd.state == 1 || pd.state == 2" class="normor">编辑</button>
					<button @click.stop="deleteRow(pd.id)" v-if="pd.state == 1 || pd.state == 2" class="danger">删除</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: { // 数据列表
				type: Array,
				default () {
					return []
				}
			}
		},
		methods: {
			test: function(){
				console.log(1);
			},
			
			//情况反馈
			rowFeedBack: function(id){
				uni.navigateTo({
					url: '/pages/workorder/workorderFeedBack/workorderFeedBack?id=' + id
				})
			},
			
			//完工
			rowComplate: function(id){
				uni.navigateTo({
					url: '/pages/workorder/workorderComplate?id=' + id
				})
			},
			
			//签到
			rowSignIn: function(id){
				uni.navigateTo({
					url: '/pages/workorder/workorderSignin?id=' + id
				})
			},
			
			//接单
			rowReceipt: function(id){
				uni.navigateTo({
					url: '/pages/workorder/workorderReceipt?id=' + id
				})
			},
			
			//工单详情
			rowDetails: function(id){
				uni.navigateTo({
					url: '/pages/workorder/workorderDetail?id=' + id
				})
			},
			
			//编辑工单
			editRow: function(id){
				uni.navigateTo({
					url: '/pages/workorder/workorderEdit?id=' + id
				})
			},
			
			//删除工单
			deleteRow: function(id){
				var _this = this;
				uni.showModal({
				    title: '提示',
				    content: '确定删除该工单吗？',
				    success: function (res) {
				        if (res.confirm) {
							_this.$api.post("sealseservice020", {rowId: id}).then((res)=>{
								if(res.returnCode == 0){
									uni.showToast({
										icon: 'success',
										position: 'bottom',
										title: '删除成功',
										complete:function(){
											_this.$emit("ToRefresh")
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
</style>
