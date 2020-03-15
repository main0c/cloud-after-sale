<template>
	<view>
		<view>
			<form @submit="formSubmit">
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
				<view class="uni-form-title">产品信息</view>
				<view class="uni-form-item">
					<view class="title">产品名称：</view>
					<view class="content uni-click-item" v-if="rowMation.productId != '' && rowMation.productId" @click="toProductDetail(rowMation.productId)">
						{{rowMation.productName}}
					</view>
					<view class="content" v-else>
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
				
				
				<view class="uni-form-title">完工信息</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>开工时间</view>
					<view class="content">
						<picker mode="date" :value="comStartTime" @change="bindStartDateChange" style="width: 40%; float: left;">
							<view class="uni-input" v-if="comStartTime != ''">{{comStartTime}}</view>
							<view class="uni-input" v-else>年-月-日</view>
						</picker>
						<picker mode="time" :value="comStartTime2" @change="bindStartDateChange2" style="width: 40%; float: left;">
							<view class="uni-input" v-if="comStartTime2 != ''">{{comStartTime2}}</view>
							<view class="uni-input" v-else>时:分</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>完工时间</view>
					<view class="content">
						<picker mode="date" :value="comTime" @change="bindDateChange" style="width: 40%; float: left;">
							<view class="uni-input" v-if="comTime != ''">{{comTime}}</view>
							<view class="uni-input" v-else>年-月-日</view>
						</picker>
						<picker mode="time" :value="comTime2" @change="bindDateChange2" style="width: 40%; float: left;">
							<view class="uni-input" v-if="comTime2 != ''">{{comTime2}}</view>
							<view class="uni-input" v-else>时:分</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>故障类型</view>
					<view class="content">
						<picker mode="selector" :value="faultTypeIndex" :range="faultTypeList" range-key="name" @change="bindFaultTypeChange">
							<view class="uni-input">{{faultTypeList[faultTypeIndex].name}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>工时</view>
					<view class="content">
						<input class="uni-input" placeholder="请输入工时" name="comWorkTime"/>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">故障关键组件</view>
					<view class="content">
						<picker mode="selector" :value="partsIndex" :range="partsList" range-key="name" @change="bindPartsChange">
							<view class="uni-input">{{partsList[partsIndex].name}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">真实故障</view>
					<view class="content">
						<textarea placeholder="请输入真实故障" name="actualFailure" style="height: 160upx;" maxlength="200"/>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">解决方案</view>
					<view class="content">
						<textarea placeholder="请输入解决方案" name="solution" style="height: 160upx;" maxlength="200"/>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>完工情况</view>
					<view class="content">
						<textarea placeholder="请输入完工情况" name="comExecution" style="height: 160upx;"/>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">完工照片</view>
					<view class="content">
						<robby-image-upload v-model="imageData" :server-url="imageServerUrl" :form-data="imageformData" :show-upload-progress="true"></robby-image-upload>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">完工附件</view>
					<view class="content">
						<Attachment mode="create" :canUploadFile="true" :uploadFileUrl="fileServerUrl" :header="fileformData" :limit="fileLimit"
							:attachmentList.sync="fileData"></Attachment>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">完工备注</view>
					<view class="content">
						<textarea placeholder="请输入备注" name="comRemark" style="height: 160upx;"/>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>服务费</view>
					<view class="content">
						<input class="uni-input" placeholder="请输入应收服务费" name="coverCost" v-model="coverCost" @input="coverCostChange"/>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>其他费</view>
					<view class="content">
						<input class="uni-input" placeholder="请输入应收其他费" name="otherCost" v-model="otherCost" @input="otherCostChange"/>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">材料费：</view>
					<view class="content">
						{{materialCost}} 元
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">合计费：</view>
					<view class="content">
						{{allPrice}} 元
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">配件明细：</view>
					<view class="content">
						<view class="chooseBtn" @click="addSparePart()" style="float: left; margin-top: 0upx;">
							新增明细
						</view>
					</view>
				</view>
				<view class="item-box" v-for="(bean, index) in sparePartList" :key="index">
					<view class="item-line">
						<view class="line-left"><view class="must">*</view>配件：</view>
						<view class="line-right">
							{{bean.mation.name}}
							<view class="chooseBtn" @click="removeSparePart(bean.number)" style="margin-top: 0upx;">
								移除
							</view>
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
							<textarea placeholder="请输入备注" name="remark" style="height: 160upx; width: 100%;" v-model="bean.mation.remark" @blur="partRemarkChange($event, bean.number)"/>
						</view>
					</view>
				</view>
				<view class="uni-btn-v">
					<button form-type="submit">完工</button>
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
				
				//故障类型
				faultTypeList: [{id: "", name: "请选择"}],
				faultTypeIndex: 0,//选择的故障类型在集合中的下标
				
				//故障关键组件
				partsList: [{id: "", name: "请选择"}],
				partsIndex: 0,//选择的故障关键组件在集合中的下标
				
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
				
				//开工时间 年月日
				comStartTime: currentDate,
				//开工时间 时分
				comStartTime2: '10:00',
				
				//完工时间 年月日
				comTime: currentDate,
				//完工时间 时分
				comTime2: '15:00',
				
				//材料费
				materialCost: 0.00,
				//服务费
				coverCost: 0.00,
				//其他费用
				otherCost: 0.00,
				//合计费
				allPrice: 0.00,
				
				//配件使用明细存储集合
				//结构[{number: 0, mation: {}}]
				sparePartList: [],
				//记录明细集合索引
				sparePartIndex: 1,
				
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
			this.$api.get("sealseservice033", {rowId: this.rowId}).then((res)=>{
				if(res.returnCode == 0){
					this.rowMation = res.bean;
					//加载故障类型列表
					this.loadFaultType();
					//加载故障关键组件列表
					this.loadParts();
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
			
			//产品详情
			toProductDetail: function(id){
				uni.navigateTo({
					url: '/pages/product/productDetail?id=' + id
				})
			},
			
			//加载故障类型列表
			loadFaultType: function(){
				this.$api.get("sealseservicefaulttype008", {}).then((res)=>{
					if(res.returnCode == 0){
						for(let i = 0; i < res.rows.length; i++){
							this.faultTypeList.push(res.rows[i]);
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
			
			//加载故障关键组件列表
			loadParts: function(){
				this.$api.get("parts010", {}).then((res)=>{
					if(res.returnCode == 0){
						for(let i = 0; i < res.rows.length; i++){
							this.partsList.push(res.rows[i]);
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
			
			//新增配件使用明细
			addSparePart: function(){
				this.sparePartList.push({
					number: this.sparePartIndex++,
					mation: {
						//id
						id: '',
						//名称
						name: '请选择',
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
			//配件单位选择变化
			bindUnitChange: function(e, number){
				for(let i = 0; i < this.sparePartList.length; i++){
					//判断编辑的是第几个使用明细
					if(number == this.sparePartList[i].number){
						this.sparePartList[i].mation.defaultIndex = e.detail.value
						//加载库存
						if(this.sparePartList[i].mation.defaultIndex == 0){
							this.sparePartList[i].mation.currentTock = 0;
							//加载单价
							this.sparePartList[i].mation.retailPrice = 0
						}else{
							//加载单价
							this.sparePartList[i].mation.retailPrice = this.sparePartList[i].mation.unitList[this.sparePartList[i].mation.defaultIndex].retailPrice
							//加载我的配件库存
							var params = {
								mUnitId: this.sparePartList[i].mation.unitList[this.sparePartList[i].mation.defaultIndex].id,
								servierId: this.rowId
							}
							//实时请求后台获取精准库存
							this.$api.get("sealseservice034", params).then((res)=>{
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
						}
						this.comItemPrice();
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
				//所有材料费
				this.materialCost = allRetailPrice
				//所有费用 = 材料费 + 服务费 + 其他费用
				this.allPrice = this.materialCost * 1 + this.coverCost * 1 + this.otherCost * 1
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
			//打开配件选择页面
			chooseSparePart: function(number){
				for(let i = 0; i < this.sparePartList.length; i++){
					if(number == this.sparePartList[i].number){
						uni.navigateTo({
							url: '/pages/sparepart/sparepartChoose/sparepartChoose?number=' + i
						})
					}
				}
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
			
			//服务费变化事件
			coverCostChange: function(e){
				this.coverCost = e.detail.value * 1
				this.comItemPrice();
			},
			
			//其他费变化事件
			otherCostChange: function(e){
				this.otherCost = e.detail.value * 1
				this.comItemPrice();
			},
			
			//故障类型变化事件
			bindFaultTypeChange: function(e) {
				this.faultTypeIndex = e.target.value
			},
			
			//故障关键组件变化事件
			bindPartsChange: function(e) {
				this.partsIndex = e.target.value
			},
			
			//完工时间 年月日
			bindDateChange: function(e) {
				this.comTime = e.target.value
			},
			
			//完工时间 时分
			bindDateChange2: function(e) {
				this.comTime2 = e.target.value
			},
			
			//开工时间 年月日
			bindStartDateChange: function(e) {
				this.comStartTime = e.target.value
			},
			
			//开工时间 时分
			bindStartDateChange2: function(e) {
				this.comStartTime2 = e.target.value
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
				
				//开工时间判断
				if(this.comStartTime == '' || this.comStartTime == null
					|| this.comStartTime2 == '' || this.comStartTime2 == null){
					uni.showToast({icon: 'none', title: '请选择开工时间'})
					return false
				}
				
				//完工时间判断
				if(this.comTime == '' || this.comTime == null
					|| this.comTime2 == '' || this.comTime2 == null){
					uni.showToast({icon: 'none', title: '请选择完工时间'})
					return false
				}
				
				//故障类型判断
				if(this.faultTypeIndex == 0){
					uni.showToast({icon: 'none', title: '请选择故障类型'})
					return false
				}
				
				//工时判断
				if(e.detail.value.comWorkTime == '' || e.detail.value.comWorkTime == null){
					uni.showToast({icon: 'none', title: '请填写工时'})
					return false
				}
				
				//完工情况判断
				if(e.detail.value.comExecution == '' || e.detail.value.comExecution == null){
					uni.showToast({icon: 'none', title: '请填写完工情况'})
					return false
				}
				
				//配件使用明细判断
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
					if(this.sparePartList[i].mation.number == 0){
						uni.showToast({icon: 'none', title: '配件使用数量不能为0'})
						return false
					}
					if(this.sparePartList[i].mation.number > this.sparePartList[i].mation.currentTock){
						uni.showToast({icon: 'none', title: '超过库存数量'})
						return false
					}
					
					for(let j = 0; j < parts.length; j++){
						var item = parts[j]
						if(item.mUnitId === this.sparePartList[i].mation.unitList[this.sparePartList[i].mation.defaultIndex].id
							&& item.materialId === this.sparePartList[i].mation.id) {
							uni.showToast({icon: 'none', title: '一张单中不允许出现相同的配件信息，且单位不能重复.'});
							return false;
						}
					}
					parts.push({
						materialId: this.sparePartList[i].mation.id,
						mUnitId: this.sparePartList[i].mation.unitList[this.sparePartList[i].mation.defaultIndex].id,
						rkNum: this.sparePartList[i].mation.number,
						remark: this.sparePartList[i].mation.remark
					});
				}
				
				var params = {
					serviceId: this.rowId,//工单id
					faultTypeId: this.faultTypeList[this.faultTypeIndex].id,//故障类型
					comTime: this.comTime + ' ' + this.comTime2 + ':00',//完工时间
					comWorkTime: e.detail.value.comWorkTime,//工时
					comExecution: e.detail.value.comExecution,//完成情况
					comPic: '',//完工图片
					enclosureInfo: '',//附件
					comRemark: e.detail.value.comRemark,//完工备注
					coverCost: e.detail.value.coverCost,//服务费
					otherCost: e.detail.value.otherCost,//其他费用
					useStr: JSON.stringify(parts),//配件使用明细
					subType: '2',//提交类型  1.暂存，2.完工
					comStarTime: this.comStartTime + ' ' + this.comStartTime2 + ':00',//开工时间
					actualFailure: e.detail.value.actualFailure,//真实故障
					solution: e.detail.value.solution,//解决方案
					faultKeyPartsId: this.partsList[this.partsIndex].id,//故障关键组件id
				};
				
				//完工图片
				var comPic = "";
				for(var i = 0; i < this.imageData.length; i++){
					comPic += this.imageData[i] + ',';
				}
				params.comPic = comPic;
				
				//附件
				var enclosureInfo = "";
				for(var i = 0; i < this.fileData.length; i++){
					enclosureInfo += this.fileData[i].id + ',';
				}
				params.enclosureInfo = enclosureInfo;
				
				this.$api.post("sealseservice035", params).then((res)=>{
					if(res.returnCode == 0){
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: '完工成功。',
							success:function(){
								setTimeout(function(){
									//刷新待完工列表并返回
									var pages = getCurrentPages();
									var prevPage = pages[pages.length - 2];  //上一个页面
									if(prevPage.$vm.refreshComplate){
										prevPage.$vm.refreshComplate()
									}
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
