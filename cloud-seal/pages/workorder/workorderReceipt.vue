<template>
	<view>
		<view>
			<form @submit="formSubmit">
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
				<view class="uni-form-item">
					<view class="title">所在地区：</view>
					<view class="content">
						{{rowMation.addressProvince}} {{rowMation.addressCity}} {{rowMation.addressArea}} {{rowMation.addressTownship}} {{rowMation.addressDetailed}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>预约时间</view>
					<view class="content">
						<picker mode="date" :value="subscribeTime" @change="bindDateChange" style="width: 40%; float: left;">
							<view class="uni-input" v-if="subscribeTime != ''">{{subscribeTime}}</view>
							<view class="uni-input" v-else>年-月-日</view>
						</picker>
						<picker mode="time" :value="subscribeTime2" @change="bindDateChange2" style="width: 40%; float: left;">
							<view class="uni-input" v-if="subscribeTime2 != ''">{{subscribeTime2}}</view>
							<view class="uni-input" v-else>时:分</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">签收备注</view>
					<view class="content">
						<textarea placeholder="请输入备注" name="remark" style="height: 160upx;"/>
					</view>
				</view>
				<view class="uni-btn-v">
					<button form-type="submit">接单</button>
				</view>
			</form>
		</view>
	</view>
	
</template>

<script>
	
	export default {
		data() {
			return {
				//预约开始时间 年月日
				subscribeTime: '',
				//预约开始时间 时分
				subscribeTime2: '',
				//工单id
				rowId: '',
				//工单信息
				rowMation: {}
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
			this.$api.get("sealseservice016", {rowId: this.rowId}).then((res)=>{
				if(res.returnCode == 0){
					this.rowMation = res.bean;
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
			
			//预约开始时间 年月日
			bindDateChange: function(e) {
				this.subscribeTime = e.target.value
			},
			
			//预约开始时间 时分
			bindDateChange2: function(e) {
				this.subscribeTime2 = e.target.value
			},
			
			//提交
			formSubmit: function(e) {
				if(this.subscribeTime == '' || this.subscribeTime == null
					|| this.subscribeTime2 == '' || this.subscribeTime2 == null){
					uni.showToast({icon: 'none', title: '请选择预约时间'})
					return false
				}
				
				var params = {
					remark: e.detail.value.remark,//备注
					subscribeTime: this.subscribeTime + ' ' + this.subscribeTime2 + ':00',//预约开始时间
					rowId: this.rowId//工单id
				};
				
				this.$api.post("sealseservice017", params).then((res)=>{
					if(res.returnCode == 0){
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: '接单成功。',
							success:function(){
								setTimeout(function(){
									//刷新待接单列表并返回
									var pages = getCurrentPages();
									var prevPage = pages[pages.length - 2];  //上一个页面
									prevPage.refreshReceipt()
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
	}
	
</script>

<style>
</style>
