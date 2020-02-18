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
						{{rowMation.addressProvince}} {{rowMation.addressCity}} {{rowMation.addressArea}} {{rowMation.addressTownship}}
						{{rowMation.addressDetailed}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">
						<view class="must">*</view>位置
					</view>
					<view class="content">
						{{address}}
						<view class="chooseBtn" @click="loadAddress()">
							重新定位
						</view>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">签到备注</view>
					<view class="content">
						<textarea placeholder="请输入备注" name="remark" style="height: 160upx;" />
						</view>
				</view>
				<view class="uni-btn-v">
					<button form-type="submit">签到</button>
				</view>
			</form>
		</view>
	</view>
	
</template>

<script>
	
	import permision from "@/components/wa-permission/permission.js"
	
	export default {
		data() {
			return {
				//工单id
				rowId: '',
				//工单信息
				rowMation: {},
				//经度
				longitude: '',
				//纬度
				latitude: '',
				//地址
				address: '获取失败'
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
			this.$api.get("sealseservice018", {rowId: this.rowId}).then((res)=>{
				if(res.returnCode == 0){
					this.rowMation = res.bean;
					this.loadAddress();
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
			
			//加载位置
			loadAddress: function(){
				var _this = this;
				//获取设备类型
				var platform = uni.getSystemInfoSync().platform;
				switch(platform){
					case 'android':{
						//返回值为数字，包括-1、0、1这3个数字。{1:已获取授权,0:未获取授权,-1:被永久拒绝授权}
						if(permision.requestAndroidPermission("android.permission.ACCESS_FINE_LOCATION") == 1){
							//获取当前手机是否开启或关闭了定位服务 true:开启， false:关闭
							if(permision.checkSystemEnableLocation()){
								uni.getLocation({
									geocode: true,
									success: function (res) {
										if(res.errMsg == 'getLocation:ok'){
											_this.longitude = res.longitude
											_this.latitude = res.latitude
											_this.address = res.address.province + res.address.city
															+ res.address.district + res.address.poiName
										}else{
											uni.showToast({icon: 'none', title: '获取定位失败，请重新获取'})
										}
									}
								})
							}else{
								uni.showToast({icon: 'none', title: '获取定位失败，请重新获取'})
							}
						}else{
							uni.showModal({
								title: '提示',
								content: '请打开定位服务功能',
								success: function (res) {
									if (res.confirm) {
										//打开当前App的权限设置界面。可用于引导用户赋权,不区分iOS和Android
										permision.gotoAppPermissionSetting();
									}else{
										uni.navigateBack()
									}
								}
							});
						}
						break;
					}
					case 'ios':{
						//判断iOS上是否给予位置权限，有权限返回true，否则返回false
						if(permision.judgeIosPermission("location")){
							//获取当前手机是否开启或关闭了定位服务 true:开启， false:关闭
							if(permision.checkSystemEnableLocation()){
								uni.getLocation({
									geocode: true,
									success: function (res) {
										if(res.errMsg == 'getLocation:ok'){
											_this.longitude = res.longitude
											_this.latitude = res.latitude
											_this.address = res.address.province + res.address.city
															+ res.address.district + res.address.poiName
										}else{
											uni.showToast({icon: 'none', title: '获取定位失败，请重新获取'})
										}
									}
								})
							}else{
								uni.showToast({icon: 'none', title: '获取定位失败，请重新获取'})
							}
						}else{
							uni.showModal({
								title: '提示',
								content: '请打开定位服务功能',
								success: function (res) {
									if (res.confirm) {
										//打开当前App的权限设置界面。可用于引导用户赋权,不区分iOS和Android
										permision.gotoAppPermissionSetting();
									}else{
										uni.navigateBack()
									}
								}
							});
						}
						break;
					}
					default:{
						console.log('运行在开发者工具上')
						break;
					}
				}
			},
			
			//提交
			formSubmit: function(e) {
				if(this.latitude == '' || this.latitude == null
					|| this.longitude == '' || this.longitude == null){
					uni.showToast({icon: 'none', title: '请打开定位获取位置信息'})
					return false
				}
				
				var params = {
					remark: e.detail.value.remark,//备注
					longitude: this.longitude,//经度
					latitude: this.latitude,//纬度
					address: this.address,//地址
					rowId: this.rowId//工单id
				};
				
				this.$api.post("sealservicephone002", params).then((res)=>{
					if(res.returnCode == 0){
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: '签到成功。',
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
			}
			
		}
	}
	
</script>

<style>
</style>
