<template>
	<view>
		<view>
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item">
					<view class="title">
						<view class="must">*</view>服务类型
					</view>
					<view class="content">
						<picker mode="selector" :value="typeIndex" :range="serviceTypeList" range-key="name" @change="bindServiceTypeChange">
							<view class="uni-input">{{serviceTypeList[typeIndex].name}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">
						<view class="must">*</view>报单时间
					</view>
					<view class="content">
						<picker mode="date" :value="declarationTime" @change="bindDateChange">
							<view class="uni-input">{{declarationTime}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">
						客户
					</view>
					<view class="content">
						<input class="uni-input" placeholder="请选择客户" name="customerId" :value="customer.name" />
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">
						<view class="must">*</view>联系人
					</view>
					<view class="content">
						<input class="uni-input" placeholder="请输入联系人" name="contacts" :value="customer.contacts" />
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">
						<view class="must">*</view>联系电话
					</view>
					<view class="content">
						<input class="uni-input" placeholder="请输入联系电话" name="phone" :value="customer.phone" />
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">
						邮箱
					</view>
					<view class="content">
						<input class="uni-input" placeholder="请输入邮箱" name="email" :value="customer.email" />
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">
						QQ
					</view>
					<view class="content">
						<input class="uni-input" placeholder="请输入QQ" name="qq" :value="customer.qq" />
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">
						<view class="must">*</view>所在地区
					</view>
					<view class="content">

					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">
						<view class="must">*</view>详细地址
					</view>
					<view class="content">
						<textarea placeholder="请输入详细地址" auto-height name="addressDetailed"/>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">产品名称</view>
					<view class="content">
						<input class="uni-input" placeholder="请选择产品" name="productName"/>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">规格型号</view>
					<view class="content">
						<input class="uni-input" placeholder="请输入规格型号" name="productNorms"/>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">序列号</view>
					<view class="content">
						<input class="uni-input" placeholder="请输入序列号" name="productSerialNum"/>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">质保类型</view>
					<view class="content">
						<picker mode="selector" :value="productWarrantyIndex" :range="productWarrantyList" range-key="name" @change="bindProductWarrantyChange">
							<view class="uni-input">{{productWarrantyList[productWarrantyIndex].name}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>紧急程度</view>
					<view class="content">
						<picker mode="selector" :value="urgencyIndex" :range="urgencyList" range-key="name" @change="bindUrgencyChange">
							<view class="uni-input">{{urgencyList[urgencyIndex].name}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>处理方式</view>
					<view class="content">
						<picker mode="selector" :value="modeIndex" :range="modeList" range-key="name" @change="bindModeChange">
							<view class="uni-input">{{modeList[modeIndex].name}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>服务内容</view>
					<view class="content">
						<textarea placeholder="请输入服务内容" auto-height name="content"/>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">工单接收人</view>
					<view class="content">
						
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">工单协助人</view>
					<view class="content">
						
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">相关照片</view>
					<view class="content">
						<robby-image-upload v-model="imageData" @delete="deleteImage" @add="addImage" :server-url-delete-image="imageUrlDelete"
							:server-url="imageServerUrl" :form-data="imageformData" :show-upload-progress="true"></robby-image-upload>
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
					<button type="default" form-type="reset">取消</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	//文件上传
	import Attachment from '@/components/jin-attachment/jin-attachment.vue'
	//图片上传
	import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue'
	
	export default {
		components: {
			Attachment,
			robbyImageUpload
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				serviceTypeList: [
					{
						id:"1",
						name:"类型1"
					},
					{
						id:"2",
						name:"类型2"
					}
				],//服务类型
				typeIndex: 0,//选择的服务类型在集合中的下标
				
				declarationTime: currentDate,//报单时间
				
				customer: {},//已经选择的客户信息，包括客户名称，客户id，联系人，联系电话，邮箱，QQ
				product: {},//选择的产品信息，包括产品id，产品名称，规格型号，序列号
				
				productWarrantyList: [
					{id: "", name: "请选择"},
					{id: "1", name: "保内"},
					{id: "2", name: "保外"}
				],//质保类型
				productWarrantyIndex: 0,//选择的质保类型在集合中的下标
				
				urgencyList: [{id: "", name: "请选择"}],//紧急程度
				urgencyIndex: 0,//选择的紧急程度在集合中的下标
				
				modeList: [{id: "", name: "请选择"}],//处理方式
				modeIndex: 0,//选择的处理方式在集合中的下标
				
				imageData: [],//图片回显数据
				imageServerUrl: 'http://localhost:1234/work/uploadWorkPicture',//图片上传地址
				imageUrlDelete: 'http://localhost:1234/work/uploadWorkPicture',//图片删除地址
				imageLimit: 10,
				imageformData: {
					userId: 2
				},//图片上传时传递的参数
				
				fileData: [],//附件回显数据
				fileServerUrl: 'http://localhost:1234/work/uploadWorkPicture',//附件上传地址
				fileLimit: 10,
				fileformData: {
					userId: 2
				},//附件上传时传递的参数
				
			}
		},
		onLoad() {
			
		},
		methods: {
			
			deleteImage: function(e){
				console.log(e)
			},
			
			addImage: function(e){
				console.log(e)
			},
			
			//服务类型变化事件
			bindServiceTypeChange: function(e) {
				this.typeIndex = e.target.value
			},
			
			//质保类型变化事件
			bindProductWarrantyChange: function(e) {
				this.productWarrantyIndex = e.target.value
			},
			
			//紧急程度变化事件
			bindUrgencyChange: function(e) {
				this.urgencyIndex = e.target.value
			},
			
			//处理方式变化事件
			bindModeChange: function(e) {
				this.modeIndex = e.target.value
			},
			
			//报单时间变化
			bindDateChange: function(e) {
				this.declarationTime = e.target.value
			},
			
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			
			//提交
			formSubmit: function(e) {
				let loginRules = [
					{name: 'tel', required: true, type: 'phone', errmsg: '请输入正确的手机号'},
					{name: 'pwd', type: 'required', errmsg: '请输入密码'},
					{name: 'pwd', type: 'pwd', errmsg: '密码须是6～16位字符'},
					{name: 'pwd2', type: 'eq', eqName: 'pwd', required: true, errmsg: '两次输入密码不一致'},
				]
				let valLoginRes = this.$validate.validate(e.detail, loginRules)
				if (!valLoginRes.isOk) {
				  uni.showToast({
					icon: 'none',
					title: valLoginRes.errmsg
				  })
				  return false
				}
			},
			formReset: function(e) {
				console.log('清空数据')
			}
		}
	}
	
</script>

<style>
</style>
