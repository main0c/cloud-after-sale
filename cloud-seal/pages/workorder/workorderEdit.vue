<template>
	<view>
		<view>
			<form @submit="formSubmit">
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
						<input class="uni-input" placeholder="请选择客户" name="customerName" :value="customer.name" />
						<view class="chooseBtn" @click="chooseCustomerPage">
							选择
						</view>
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
						<input class="uni-input" placeholder="请输入联系电话" name="phone" :value="customer.mobilePhone" />
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
						<pickerAddress @change="addressChooseChange">{{txt}}</pickerAddress>
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
						<input class="uni-input" placeholder="请选择产品" name="productName" :value="product.productName"/>
						<view class="chooseBtn" @click="chooseProductPage">
							选择
						</view>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">规格型号</view>
					<view class="content">
						<input class="uni-input" placeholder="请输入规格型号" name="productNorms" :value="product.productModel"/>
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
						<textarea placeholder="请输入服务内容" name="content" style="height: 160upx;"/>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">工单接收人</view>
					<view class="content">
						<robby-tags v-model="serviceUser" defaultText="请选择工单接收人"></robby-tags>
						<view class="chooseBtn" @click="chooseServiceUserPage">
							选择
						</view>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">工单协助人</view>
					<view class="content">
						<robby-tags v-model="userList" defaultText="请选择工单协助人"></robby-tags>
						<view class="chooseBtn" @click="chooseServiceXzUserPage">
							选择
						</view>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">相关照片</view>
					<view class="content">
						<robby-image-upload v-model="imageData" :server-url="imageServerUrl" :form-data="imageformData" :show-upload-progress="true"></robby-image-upload>
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
	//图片上传
	import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue'
	//地区选择
	import pickerAddress from '@/components/pickerAddress/pickerAddress.vue'
	//标签-此处用于工单协助人选择
	import robbyTags from '@/components/robby-tags/robby-tags.vue'
	
	export default {
		components: {
			Attachment,
			robbyImageUpload,
			pickerAddress,
			robbyTags
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				serviceTypeList: [{id: "", name: "请选择"}],//服务类型
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
				
				serviceUser: [],//工单接收人
				
				imageData: [],//图片回显数据数组：[{0: "/images/upload/order/1581591580676.png"}]
				imageServerUrl: this.$api.config.baseUrl + 'common003',//图片上传地址
				imageLimit: 10,
				imageformData: {
					type: 14
				},//图片上传时传递的参数
				
				fileData: [],//附件回显数据fileName: "客户档案.png",id: "d6c44d88357441a8b1c7788329d91b37",url: "/images/upload/enclosurefile/300b878c5c6744f2b48e6bc40beefd11/1581591367754.png"
				fileServerUrl: this.$api.config.baseUrl + 'sysenclosure011',//附件上传地址
				fileLimit: 10,
				fileformData: {
					"userToken": uni.getStorageSync("userToken") || '',
					"requestType": "2"
				},//附件上传时传递的参数
				
				//地区选咋相关参数
				txt: '选择地址',
				txtData: [],
				
				//工单协作人
				userList: []
			}
		},
		onLoad(options) {
			console.log(options)
			//获取服务类型列表
			this.loadServiceType();
			
			//获取紧急程度列表
			this.loadUrgencyType();
			
			//获取处理方式列表
			this.loadModeType();
			
		},
		methods: {
			
			//加载服务类型列表
			loadServiceType: function(){
				this.$api.get("sealseservicetype008", {}).then((res)=>{
					if(res.returnCode == 0){
						for(let i = 0; i < res.rows.length; i++){
							this.serviceTypeList.push(res.rows[i]);
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
			
			//加载紧急程度列表
			loadUrgencyType: function(){
				this.$api.get("sealseserviceurgency008", {}).then((res)=>{
					if(res.returnCode == 0){
						for(let i = 0; i < res.rows.length; i++){
							this.urgencyList.push(res.rows[i]);
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
			
			//加载处理方式列表
			loadModeType: function(){
				this.$api.get("sealseservicemode008", {}).then((res)=>{
					if(res.returnCode == 0){
						for(let i = 0; i < res.rows.length; i++){
							this.modeList.push(res.rows[i]);
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
			
			//打开选择客户页面
			chooseCustomerPage: function(){
				uni.navigateTo({
					url: '/pages/customer/customerChoose'
				})
			},
			
			//打开选择产品页面
			chooseProductPage: function(){
				uni.navigateTo({
					url: '/pages/product/productChoose'
				})
			},
			
			//打开选择接收人页面
			chooseServiceUserPage: function(){
				uni.navigateTo({
					url: '/pages/worker/workerChoose?backParam=serviceUser'
				})
			},
			
			//打开选择协助人页面
			chooseServiceXzUserPage: function(){
				uni.navigateTo({
					url: '/pages/user/userChoose/userChooseState?backParam=userList'
				})
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
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			
			//省市区三级联动选择
			addressChooseChange(data) {
				var s = "";
				for(let i = 0; i < data.data.length; i++){
					if(data.data[i].name != undefined){
						s += data.data[i].name + ' ';
					}
				}
				this.txt = s
				this.txtData = data.data
			},
			
			//提交
			formSubmit: function(e) {
				let loginRules = [
					{name: 'contacts', required: true, errmsg: '请输入联系人'},
					{name: 'phone', required: true, type: 'phone', max: 11, errmsg: '请输入正确的手机号'},
					{name: 'addressDetailed', required: true, errmsg: '请输入详细地址'},
					{name: 'content', required: true, errmsg: '请输入服务内容'}
				]
				if(this.typeIndex == 0){
					uni.showToast({icon: 'none', title: '请选择服务类型'})
					return false
				}
				
				if(this.declarationTime == '' || this.declarationTime == null){
					uni.showToast({icon: 'none', title: '请选择报单时间'})
					return false
				}
				
				if(this.urgencyIndex == 0){
					uni.showToast({icon: 'none', title: '请选择紧急程度'})
					return false
				}
				
				if(this.modeIndex == 0){
					uni.showToast({icon: 'none', title: '请选择处理方式'})
					return false
				}
				
				if(this.txtData.length == 0){
					uni.showToast({icon: 'none', title: '请选择地区'})
					return false
				}
				
				let valLoginRes = this.$validate.validate(e.detail.value, loginRules)
				if (!valLoginRes.isOk) {
					uni.showToast({icon: 'none', title: valLoginRes.errmsg})
					return false
				}
				
				var params = {
					typeId: this.serviceTypeList[this.typeIndex].id,//服务类型，不可为空
					declarationTime: this.declarationTime,//报单时间，不可为空
					customerId: this.customer.id,//客户-可为空
					customerName: e.detail.value.customerName,//客户名称-可为空
					contacts: e.detail.value.contacts,//联系人，不可为空
					phone: e.detail.value.phone,//联系电话，不可为空
					email: e.detail.value.email,//联系邮箱，不可为空
					qq: e.detail.value.qq,//联系QQ，不可为空
					provinceId: this.txtData[0].id != undefined ? this.txtData[0].id : '',//省，不可为空
					cityId: this.txtData[1].id != undefined ? this.txtData[1].id : '',//市，可为空
					areaId: this.txtData[2].id != undefined ? this.txtData[2].id : '',//区县，可为空
					townshipId: '',//乡镇，可为空
					addressDetailed: e.detail.value.addressDetailed,//详细地址，不可为空
					productId: this.product.id,//产品id，可为空
					productName: e.detail.value.productName,//产品名称，可为空
					productNorms: e.detail.value.productNorms,//规格型号，可为空
					productSerialNum: e.detail.value.productSerialNum,//序列号，可为空
					productWarranty: this.productWarrantyList[this.productWarrantyIndex].id,//质保类型，可为空
					urgencyId: this.urgencyList[this.urgencyIndex].id,//紧急程度，不可为空
					modeId: this.modeList[this.modeIndex].id,//处理方式，不可为空
					content: e.detail.value.content,//服务内容，不可为空
					serviceUserId: "",//工单接收人，可为空
					cooperationUserId: "",//工单协助人，可为空
					sheetPicture: '',//相关照片，可为空
					enclosureInfo: ""//附件，可为空
				};
				
				//工单接收人
				params.serviceUserId = this.serviceUser.length > 0 && this.serviceUser[0].id != undefined ? serviceUser[0].id : '';
				
				//工单协助人
				var cooperationUserId = "";
				for(var i = 0; i < this.userList.length; i++){
					cooperationUserId += this.userList[i].id + ',';
				}
				params.cooperationUserId = cooperationUserId;
				
				//相关照片
				var sheetPicture = "";
				for(var i = 0; i < this.imageData.length; i++){
					sheetPicture += this.imageData[i] + ',';
				}
				params.sheetPicture = sheetPicture;
				
				//附件
				var enclosureInfo = "";
				for(var i = 0; i < this.fileData.length; i++){
					enclosureInfo += this.fileData[i].id + ',';
				}
				params.enclosureInfo = enclosureInfo;
				
				this.$api.post("sealseservice011", params).then((res)=>{
					if(res.returnCode == 0){
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: '工单填报成功。',
							success:function(){
								uni.navigateTo({
									url: 'workMyWriteorder/workMyWriteorder'
								});
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
				
			},
			
		}
	}
	
</script>

<style>
</style>
