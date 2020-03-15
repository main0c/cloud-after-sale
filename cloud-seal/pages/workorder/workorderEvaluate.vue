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
					<view class="title">派工时间：</view>
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
					<view class="title">详细地址：</view>
					<view class="content">
						{{rowMation.addressProvince}}  {{rowMation.addressCity}} {{rowMation.addressArea}}  {{rowMation.addressTownship}}  {{rowMation.addressDetailed}}
					</view>
				</view>
				
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>满意程度</view>
					<view class="content">
						<picker mode="selector" :value="evaluateTypeIndex" :range="evaluateTypeList" range-key="name" @change="bindEvaluateTypeChange">
							<view class="uni-input">{{evaluateTypeList[evaluateTypeIndex].name}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>评价内容</view>
					<view class="content">
						<textarea placeholder="请输入评价内容" name="content" style="height: 160upx;"/>
					</view>
				</view>
				<view class="uni-btn-v">
					<button form-type="submit">提交</button>
				</view>
			</form>
		</view>
	</view>
	
</template>

<script>
	
	export default {
		data() {
			return {
				evaluateTypeList: [{id: "", name: "请选择"}],//满意程度
				evaluateTypeIndex: 0,//选择的满意程度在集合中的下标
				
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
			this.$api.get("sealseservice036", {rowId: this.rowId}).then((res)=>{
				if(res.returnCode == 0){
					this.rowMation = res.bean;
					//获取满意程度列表信息
					this.loadEvaluateTypeList();
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
			
			//获取满意程度列表信息
			loadEvaluateTypeList: function() {
				this.$api.get("sealseserviceevaluatetype008", {}).then((res)=>{
					if(res.returnCode == 0){
						for(let i = 0; i < res.rows.length; i++){
							this.evaluateTypeList.push(res.rows[i]);
						}
					}else{
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res.returnMessage
						});
					}
				})
			},
			
			//满意程度变化事件
			bindEvaluateTypeChange: function(e) {
				this.evaluateTypeIndex = e.target.value
			},
			
			//提交
			formSubmit: function(e) {
				if(this.evaluateTypeIndex == 0){
					uni.showToast({icon: 'none', title: '请选择满意程度'})
					return false
				}
				if(e.detail.value.content == '' || e.detail.value.content == null){
					uni.showToast({icon: 'none', title: '请填写反馈内容'})
					return false
				}
				
				var params = {
					evaluateType: this.evaluateTypeList[this.evaluateTypeIndex].id,//满意程度，不可为空
					content: e.detail.value.content,//反馈内容，不可为空
					rowId: this.rowId//工单id
				};
				
				this.$api.post("sealseservice037", params).then((res)=>{
					if(res.returnCode == 0){
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: '评价成功。',
							success:function(){
								setTimeout(function(){
									//刷新待评价列表并返回
									var pages = getCurrentPages();
									var prevPage = pages[pages.length - 2];  //上一个页面
									if(prevPage.$vm.refreshEvaluate){
										prevPage.$vm.refreshEvaluate()
									}
									uni.navigateBack();
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
