<template>
	<view>
		<view>
			<form @submit="formSubmit">
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
						<view class="must">*</view>单据日期
					</view>
					<view class="content">
						<picker mode="date" :value="operTime" @change="bindDateChange">
							<view class="uni-input">{{operTime}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">
						<view class="must">*</view>售后工单
					</view>
					<view class="content">
						{{serviceMation.orderNum}}
						<view class="chooseBtn" @click="chooseOrderPage" style="margin-top: 0upx;">
							选择
						</view>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">备注</view>
					<view class="content">
						<textarea placeholder="请输入备注" name="remark" style="height: 160upx;" :value="rowMation.remark"/>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">相关附件</view>
					<view class="content">
						<Attachment mode="create" :canUploadFile="true" :uploadFileUrl="fileServerUrl" :header="fileformData" :limit="fileLimit"
							:attachmentList.sync="fileData"></Attachment>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">共计金额</view>
					<view class="content">
						{{allPrice}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>配件明细</view>
					<view class="content">
						<view class="chooseBtn" @click="addSparePart()" style="float: left; margin-top: 0upx;">
							新增明细
						</view>
					</view>
				</view>
				<view class="item-box" v-for="(bean, index) in sparePartList" :key="index">
					<view class="item-line">
						<view class="line-left"><view class="must">*</view>仓库：</view>
						<view class="line-right">
							<picker mode="selector" :value="bean.mation.defailtDepotIndex" :range="bean.mation.depotList" range-key="name" v-model="bean.mation.defailtDepotIndex" @change="bindDepotChange($event, bean.number)">
								<view class="uni-input">{{bean.mation.depotList[bean.mation.defailtDepotIndex].name}}</view>
							</picker>
							<view class="chooseBtn" @click="removeSparePart(bean.number)">
								移除
							</view>
						</view>
					</view>
					<view class="item-line">
						<view class="line-left"><view class="must">*</view>配件：</view>
						<view class="line-right">
							{{bean.mation.name}}
							<view class="chooseBtn" @click="chooseSparePart(bean.number)" style="margin-top: 0upx;">
								选择
							</view>
						</view>
					</view>
					<view class="item-line">
						<view class="line-left"><view class="must">*</view>单位：</view>
						<view class="line-right">
							<picker mode="selector" :value="bean.mation.defaultIndex" :range="bean.mation.unitList" range-key="name" v-model="bean.mation.defaultIndex" @change="bindUnitChange($event, bean.number)">
								<view class="uni-input">{{bean.mation.unitList[bean.mation.defaultIndex].name}}</view>
							</picker>
						</view>
					</view>
					<view class="item-line">
						<view class="line-left">库存：</view>
						<view class="line-right">{{bean.mation.currentTock}}</view>
					</view>
					<view class="item-line">
						<view class="line-left"><view class="must">*</view>数量：</view>
						<view class="line-right">
							<input class="uni-input" placeholder="请输入数量" v-model="bean.mation.number" @blur="partNumberChange($event, bean.number)"/>
						</view>
					</view>
					<view class="item-line">
						<view class="line-left">单价：</view>
						<view class="line-right">{{bean.mation.retailPrice}} 元</view>
					</view>
					<view class="item-line">
						<view class="line-left">金额：</view>
						<view class="line-right">{{bean.mation.allRetailPrice}} 元</view>
					</view>
					<view class="item-line">
						<view class="line-left">备注：</view>
						<view class="line-right">
							<textarea placeholder="请输入备注" style="height: 160upx;" v-model="bean.mation.remark" @blur="partRemarkChange($event, bean.number)"/>
						</view>
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
			const currentDate = this.getDate({
				format: true
			})
			return {
				operTime: currentDate,//单据时间
				
				customer: {
					id: ''
				},//已经选择的客户信息，包括客户名称，客户id，联系人，联系电话，邮箱，QQ
				
				fileData: [],//附件回显数据fileName: "客户档案.png",id: "d6c44d88357441a8b1c7788329d91b37",url: "/images/upload/enclosurefile/300b878c5c6744f2b48e6bc40beefd11/1581591367754.png"
				fileServerUrl: this.$api.config.baseUrl + 'sysenclosure011',//附件上传地址
				fileLimit: 10,
				fileformData: {
					"userToken": uni.getStorageSync("userToken") || '',
					"requestType": "2"
				},//附件上传时传递的参数
				
				//共计金额
				allPrice: 0,
				
				//工单信息
				serviceMation: {
					id: '',
					orderNum: '请选择'
				},
				
				//配件列表明细存储集合
				//结构[{number: 0, mation: {}}]
				sparePartList: [],
				//记录明细集合索引
				sparePartIndex: 1,
				
				//仓库
				depotList: [{id: "", name: "请选择"}],
				
				//配件列表信息-在此处用于单位回显
				material: [],
				
				//申领单信息
				rowId: '',
				rowMation: {}
			}
		},
		onLoad(options) {
			if(!options.id){
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '缺少申领单id',
					success:function(){
						setTimeout(function(){
							uni.navigateBack()
						}, 2000)
					}
				});
			}
			
			//申领单id赋值
			this.rowId = options.id;
			
			//获取申领单信息
			this.$api.get("sealseservice026", {rowId: this.rowId}).then((res)=>{
				if(res.returnCode == 0){
					this.rowMation = res.bean;
					//单据时间赋值
					this.operTime = this.rowMation.applyTime.substring(0, 10)
					//共计金额
					this.allPrice = this.rowMation.allPrice
					//客户信息
					this.customer = {
						id: this.rowMation.customerId,
						name: this.rowMation.customerName
					}
					//工单信息
					this.serviceMation = {
						id: this.rowMation.serviceId,
						orderNum: this.rowMation.orderNum
					}
					//附件
					for(let i = 0; i < this.rowMation.enclosureInfo.length; i++){
						this.fileData.push({
							id: this.rowMation.enclosureInfo[i].id,
							fileName: this.rowMation.enclosureInfo[i].name,
							url: this.rowMation.enclosureInfo[i].fileAddress,
							type: 'file'
						});
					}
					//加载仓库
					this.loadDepot();
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
			
			//加载仓库列表
			loadDepot: function(){
				this.$api.get("storehouse008", {}).then((res)=>{
					if(res.returnCode == 0){
						for(let i = 0; i < res.rows.length; i++){
							this.depotList.push(res.rows[i]);
						}
						//加载配件
						this.loadMaterial()
					}else{
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res.returnMessage
						});
					}
				})
			},
			//加载配件列表
			loadMaterial: function(){
				this.$api.get("parts010", {}).then((res)=>{
					if(res.returnCode == 0){
						//配件赋值
						this.material = res.rows
						this.loadSparePartDetail()
					}else{
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res.returnMessage
						});
					}
				})
			},
			//加载明细列表
			loadSparePartDetail: function(){
				//加载配件明细
				for(let i = 0; i < this.rowMation.materials.length; i++){
					var item = this.rowMation.materials[i]
					//获取仓库选中项坐标
					var depotIndex = 0;
					for(let j = 0; j < this.depotList.length; j++){
						if(this.depotList[j].id == item.depotId){
							depotIndex = j;
						}
					}
					
					var unitList = [{id: "", name: "请选择"}]
					var unitIndex = 0
					//配件单位回显
					for(let j = 0; j < this.material.length; j++){
						if(this.material[j].id == item.materialId){
							for(let k = 0; k < this.material[j].unitList.length; k++){
								unitList.push(this.material[j].unitList[k])
								if(this.material[j].unitList[k].id == item.mUnitId){
									unitIndex = k + 1
								}
							}
						}
					}
					
					this.sparePartList.push({
						number: this.sparePartIndex++,
						mation: {
							//id
							id: item.materialId,
							//名称
							name: item.materialName,
							//仓库
							depotList: this.depotList,
							defailtDepotIndex : depotIndex,
							//单位信息
							unitList: unitList,
							defaultIndex: unitIndex,
							//库存
							currentTock: item.currentTock,
							//数量
							number: item.operNum,
							//单价
							retailPrice: item.unitPrice,
							//总价
							allRetailPrice: item.allPrice,
							//备注
							remark: item.remark
						}
					});
				}
			},
			//仓库变化事件
			bindDepotChange: function(e, number){
				for(let i = 0; i < this.sparePartList.length; i++){
					//判断是第几个使用明细
					if(number == this.sparePartList[i].number){
						this.sparePartList[i].mation.defailtDepotIndex = e.detail.value
						//加载库存
						this.loadDepotKcJudge(i);
					}
				}
			},
			//配件单位选择变化
			bindUnitChange: function(e, number){
				for(let i = 0; i < this.sparePartList.length; i++){
					//判断编辑的是第几个使用明细
					if(number == this.sparePartList[i].number){
						this.sparePartList[i].mation.defaultIndex = e.detail.value
						//加载库存
						this.loadDepotKcJudge(i);
					}
				}
			},
			
			//加载库存的判断
			loadDepotKcJudge: function(i){
				//判断单位和仓库是否选择
				if(this.sparePartList[i].mation.defaultIndex != 0
					&& this.sparePartList[i].mation.defailtDepotIndex != 0){
					//单位和仓库都不为空
					//加载我的配件库存
					this.loadDepotKc(this.sparePartList[i].mation.unitList[this.sparePartList[i].mation.defaultIndex].id,
										this.sparePartList[i].mation.depotList[this.sparePartList[i].mation.defailtDepotIndex].id,
										'',
										i);
					this.sparePartList[i].mation.retailPrice = this.sparePartList[i].mation.unitList[this.sparePartList[i].mation.defaultIndex].retailPrice
				}else{
					//库存设置为0
					this.sparePartList[i].mation.currentTock = 0;
					//设置单价
					if(this.sparePartList[i].mation.defaultIndex != 0){
						this.sparePartList[i].mation.retailPrice = this.sparePartList[i].mation.unitList[this.sparePartList[i].mation.defaultIndex].retailPrice
					}else{
						this.sparePartList[i].mation.retailPrice = 0
					}
				}
				//计算价格
				this.comItemPrice();
			},
			//加载库存  mUnitId:规格id;depotId:仓库id;rowId:工单id，可为空;i:第i项
			loadDepotKc: function(mUnitId, depotId, rowId, i){
				var params = {
					depotId: depotId,
					mUnitId: mUnitId,
					rowId: rowId
				}
				//实时请求后台获取精准库存
				this.$api.get("parts011", params).then((res)=>{
					if(res.returnCode == 0){
						if(res.bean && res.bean.currentTock){
							this.sparePartList[i].mation.currentTock = res.bean.currentTock
						}else{
							this.sparePartList[i].mation.currentTock = 0
						}
					}else{
						uni.showToast({icon: 'none', position: 'bottom', title: res.returnMessage});
					}
				})
			},
			
			//数量变化事件
			partNumberChange($event, number){
				for(let i = 0; i < this.sparePartList.length; i++){
					//判断是第几个使用明细
					if(number == this.sparePartList[i].number){
						this.sparePartList[i].mation.number = $event.detail.value * 1
					}
				}
				this.comItemPrice();
			},
			//备注变化事件
			partRemarkChange($event, number){
				for(let i = 0; i < this.sparePartList.length; i++){
					//判断是第几个使用明细
					if(number == this.sparePartList[i].number){
						this.sparePartList[i].mation.remark = $event.detail.value
					}
				}
			},
			
			//计算价格
			comItemPrice: function(){
				//所有材料费
				var allRetailPrice = 0
				for(let i = 0; i < this.sparePartList.length; i++){
					//判断数量是否为数字
					if(/^-?[1-9][0-9]?.?[0-9]*$/.test(this.sparePartList[i].mation.number)){
						//是
						this.sparePartList[i].mation.allRetailPrice = this.sparePartList[i].mation.retailPrice * this.sparePartList[i].mation.number
					}else{
						//否
						this.sparePartList[i].mation.allRetailPrice = this.sparePartList[i].mation.retailPrice * 0
					}
					allRetailPrice += this.sparePartList[i].mation.allRetailPrice
				}
				this.allPrice = allRetailPrice
			},
			
			//新增配件使用明细
			addSparePart: function(){
				this.sparePartList.push({
					number: this.sparePartIndex++,
					mation: {
						//id
						id: '',
						//名称
						name: '请选择',
						//仓库
						depotList: this.depotList,
						defailtDepotIndex : 0,
						//单位信息
						unitList: [{id: "", name: "请选择"}],
						defaultIndex: 0,
						//库存
						currentTock: 0,
						//数量
						number: 0,
						//单价
						retailPrice: 0.00,
						//总价
						allRetailPrice: 0.00,
						//备注
						remark: ''
					}
				});
			},
			//移除
			removeSparePart: function(number){
				var _this = this
				uni.showModal({
				    title: '提示',
				    content: '确定移除吗？',
				    success: function (res) {
				        if (res.confirm) {
							var sparePartList = []
							for(let i = 0; i < _this.sparePartList.length; i++){
								//判断删除的是第几个使用明细
								if(number != _this.sparePartList[i].number){
									sparePartList.push(_this.sparePartList[i])
								}
							}
							_this.sparePartList = sparePartList
							_this.comItemPrice();
						}
					},
				})
			},
			
			//打开选择客户页面
			chooseCustomerPage: function(){
				uni.navigateTo({
					url: '/pages/customer/customerChoose'
				})
			},
			
			//打开选择工单页面
			chooseOrderPage: function(){
				uni.navigateTo({
					url: '/pages/workorder/workorderChoose/workorderChoose?backParam=serviceMation'
				})
			},
			
			//打开选择配件页面
			chooseSparePart: function(number){
				for(let i = 0; i < this.sparePartList.length; i++){
					if(number == this.sparePartList[i].number){
						uni.navigateTo({
							url: '/pages/sparepart/sparepartChoose/sparepartChoose?number=' + i
						})
					}
				}
			},
			
			//单据时间变化
			bindDateChange: function(e) {
				this.operTime = e.target.value
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
			
			//提交
			formSubmit: function(e) {
				if(this.operTime == '' || this.operTime == null){
					uni.showToast({icon: 'none', title: '请选择单据时间'})
					return false
				}
				
				if(this.serviceMation.id == 0){
					uni.showToast({icon: 'none', title: '请选择工单'})
					return false
				}
				
				//配件申领明细判断
				var parts = [];
				for(let i = 0; i < this.sparePartList.length; i++){
					if(this.sparePartList[i].mation.id == '' || this.sparePartList[i].mation.id == undefined || this.sparePartList[i].mation.id == null){
						uni.showToast({icon: 'none', title: '请选择配件'})
						return false
					}
					if(this.sparePartList[i].mation.defaultIndex == '' || this.sparePartList[i].mation.defaultIndex == undefined || this.sparePartList[i].mation.defaultIndex == null){
						uni.showToast({icon: 'none', title: '请选择单位'})
						return false
					}
					if(this.sparePartList[i].mation.defailtDepotIndex == '' || this.sparePartList[i].mation.defailtDepotIndex == undefined || this.sparePartList[i].mation.defailtDepotIndex == null){
						uni.showToast({icon: 'none', title: '请选择仓库'})
						return false
					}
					if(this.sparePartList[i].mation.number == 0){
						uni.showToast({icon: 'none', title: '配件申领数量不能为0'})
						return false
					}
					if(this.sparePartList[i].mation.number > this.sparePartList[i].mation.currentTock){
						uni.showToast({icon: 'none', title: '超过库存数量'})
						return false
					}
					
					//判断选中的备件是否也在数组中
					for(let j = 0; j < parts.length; j++){
						var item = parts[j]
						if(item.depotId === this.sparePartList[i].mation.depotList[this.sparePartList[i].mation.defailtDepotIndex].id
							&& item.mUnitId === this.sparePartList[i].mation.unitList[this.sparePartList[i].mation.defaultIndex].id 
							&& item.materialId === this.sparePartList[i].mation.id) {
							uni.showToast({icon: 'none', title: '一张单中不允许出现相同当库的备件信息，且单位不能重复.'});
							return false;
						}
					}
					parts.push({
						materialId: this.sparePartList[i].mation.id,
						depotId: this.sparePartList[i].mation.depotList[this.sparePartList[i].mation.defailtDepotIndex].id,
						mUnitId: this.sparePartList[i].mation.unitList[this.sparePartList[i].mation.defaultIndex].id,
						rkNum: this.sparePartList[i].mation.number,
						remark: this.sparePartList[i].mation.remark
					});
				}
				
				if(parts.length == 0){
					uni.showToast({icon: 'none', title: '请选择配件'})
					return false
				}
				
				var params = {
					customerId: this.customer.id,//客户id-可为空
					applyTime: this.operTime,//单据时间，不可为空
					remark: e.detail.value.remark,//备注，不可为空
					applyMaterialStr: JSON.stringify(parts),//所选配件信息
					enclosureInfo: "",//附件，可为空
					serviceId: this.serviceMation.id,//工单id
					rowId: this.rowId
				};
				
				//附件
				var enclosureInfo = "";
				for(var i = 0; i < this.fileData.length; i++){
					enclosureInfo += this.fileData[i].id + ',';
				}
				params.enclosureInfo = enclosureInfo;
				
				this.$api.post("sealseservice027", params).then((res)=>{
					if(res.returnCode == 0){
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: '申领单编辑成功。',
							success:function(){
								setTimeout(function(){
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
				
			},
			
		}
	}
	
</script>

<style>
</style>
