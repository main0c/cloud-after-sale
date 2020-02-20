<template>
	<view>
		<view>
			<form>
				<view class="uni-form-title">基础信息</view>
				<view class="uni-form-item">
					<view class="title">工单号：</view>
					<view class="content">
						{{rowMation.orderNum}}
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
				<view class="uni-form-title">
					情况反馈单
					<view class="chooseBtn" @click="addFeedBack()" style="float: right; margin-top: 0upx;">
						新增
					</view>
				</view>
				<view v-if="!feedBackList || feedBackList.length == 0" class="empty-box">
					<image src="/static/common/empty.png" class="empty-icon"></image>
					<view class="empty-tip">暂无反馈信息</view>
				</view>
				<view class="item-box" v-else v-for="(bean, index) in feedBackList" :key="index">
					<view class="item-line">
						<view class="line-left">反馈类型：</view>
						<view class="line-right">
							{{bean.typeName}}
							<view class="chooseBtn" @click="removeFeedBack(bean.id)" style="margin-top: 0upx;">
								删除
							</view>
							<view class="chooseBtn" @click="editFeedBack(bean.id)" style="margin-top: 0upx;">
								编辑
							</view>
						</view>
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
			</form>
		</view>
	</view>
	
</template>

<script>
	
	export default {
		data() {
			return {
				//工单id
				rowId: '',
				//工单信息
				rowMation: {},
				//情况反馈列表
				feedBackList: []
			}
		},
		onLoad(options) {
			if(!options.id){
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '缺少工单id',
					success:function(){
						setTimeout(function(){
							uni.navigateBack()
						}, 2000)
					}
				});
			}
			
			//工单id赋值
			this.rowId = options.id;
			
			//获取工单信息
			this.$api.get("sealseservice039", {rowId: this.rowId}).then((res)=>{
				if(res.returnCode == 0){
					this.rowMation = res.bean;
					//加载反馈列表
					this.loadFeedBackList();
				}else{
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: res.returnMessage
					});
				}
			})
			
		},
		methods: {
			
			//加载反馈列表
			loadFeedBackList: function(){
				//获取反馈列表信息
				this.$api.get("sealservicephone003", {serviceId: this.rowId}).then((res)=>{
					if(res.returnCode == 0){
						this.feedBackList = res.rows;
					}else{
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res.returnMessage
						});
					}
				})
			},
			
			//新增
			addFeedBack: function() {
				uni.navigateTo({
					url: '/pages/workorder/workorderFeedBack/workorderFeedBackAdd?id=' + this.rowId
				})
			},
			
			//编辑
			editFeedBack: function(id) {
				uni.navigateTo({
					url: '/pages/workorder/workorderFeedBack/workorderFeedBackEdit?id=' + this.rowId + '&feedBackId=' + id
				})
			},
			
			//删除
			removeFeedBack: function(id) {
				var _this = this;
				uni.showModal({
				    title: '提示',
				    content: '确定删除该信息吗？',
				    success: function (res) {
				        if (res.confirm) {
							_this.$api.post("feedback006", {rowId: id}).then((res)=>{
								if(res.returnCode == 0){
									uni.showToast({
										icon: 'success',
										position: 'bottom',
										title: '删除成功',
										complete:function(){
											_this.loadFeedBackList()
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
			
		}
	}
	
</script>

<style>
</style>
