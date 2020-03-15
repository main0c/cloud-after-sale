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
					<view class="title">客户名称：</view>
					<view class="content">
						{{rowMation.customerName}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">产品名称：</view>
					<view class="content">
						{{rowMation.productName}}
					</view>
				</view>
				
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>反馈类型</view>
					<view class="content">
						<picker mode="selector" :value="feedBacktypeIndex" :range="feedBackTypeList" range-key="name" @change="bindFeedBackTypeChange">
							<view class="uni-input">{{feedBackTypeList[feedBacktypeIndex].name}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>反馈内容</view>
					<view class="content">
						<textarea placeholder="请输入反馈内容" name="content" style="height: 160upx;"/>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">相关附件</view>
					<view class="content">
						<Attachment mode="create" :canUploadFile="true" :uploadFileUrl="fileServerUrl" :header="fileformData" :limit="fileLimit"
							:attachmentList.sync="fileData"></Attachment>
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
	//文件上传
	import Attachment from '@/components/jin-attachment/jin-attachment.vue'
	
	export default {
		components: {
			Attachment
		},
		data() {
			return {
				feedBackTypeList: [{id: "", name: "请选择"}],//反馈类型
				feedBacktypeIndex: 0,//选择的反馈类型在集合中的下标
				
				fileData: [],//附件回显数据fileName: "客户档案.png",id: "d6c44d88357441a8b1c7788329d91b37",url: "/images/upload/enclosurefile/300b878c5c6744f2b48e6bc40beefd11/1581591367754.png"
				fileServerUrl: this.$api.config.baseUrl + 'sysenclosure011',//附件上传地址
				fileLimit: 10,
				fileformData: {
					"userToken": uni.getStorageSync("userToken") || '',
					"requestType": "2"
				},//附件上传时传递的参数
				
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
			this.$api.get("feedback002", {serviceId: this.rowId}).then((res)=>{
				if(res.returnCode == 0){
					this.rowMation = res.bean;
					//获取反馈类型列表信息
					this.loadFeedBackTypeList();
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
			
			//获取反馈类型列表信息
			loadFeedBackTypeList: function() {
				this.$api.get("crmservicefeedbacktype008", {}).then((res)=>{
					if(res.returnCode == 0){
						for(let i = 0; i < res.rows.length; i++){
							this.feedBackTypeList.push(res.rows[i]);
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
			
			//反馈类型变化事件
			bindFeedBackTypeChange: function(e) {
				this.feedBacktypeIndex = e.target.value
			},
			
			//提交
			formSubmit: function(e) {
				if(this.feedBacktypeIndex == 0){
					uni.showToast({icon: 'none', title: '请选择反馈类型'})
					return false
				}
				if(e.detail.value.content == '' || e.detail.value.content == null){
					uni.showToast({icon: 'none', title: '请填写反馈内容'})
					return false
				}
				
				var params = {
					typeId: this.feedBackTypeList[this.feedBacktypeIndex].id,//反馈类型，不可为空
					content: e.detail.value.content,//反馈内容，不可为空
					enclosureInfo: "",//附件，可为空
					customId: this.rowMation.customerId,//客户id
					proId: this.rowMation.productId,//产品id
					serviceId: this.rowId//工单id
				};
				
				//附件
				var enclosureInfo = "";
				for(var i = 0; i < this.fileData.length; i++){
					enclosureInfo += this.fileData[i].id + ',';
				}
				params.enclosureInfo = enclosureInfo;
				
				this.$api.post("feedback003", params).then((res)=>{
					if(res.returnCode == 0){
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: '反馈成功。',
							success:function(){
								setTimeout(function(){
									var pages = getCurrentPages();
									var prevPage = pages[pages.length - 2];  //上一个页面
									if(prevPage.$vm.loadFeedBackList){
										prevPage.$vm.loadFeedBackList()
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
