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
				<view class="uni-btn-v">
					<button form-type="submit">派工</button>
				</view>
			</form>
		</view>
	</view>
	
</template>

<script>
	//标签-此处用于工单协助人选择
	import robbyTags from '@/components/robby-tags/robby-tags.vue'
	
	export default {
		components: {
			robbyTags
		},
		data() {
			return {
				//工单接收人
				serviceUser: [],
				//工单协作人
				userList: [],
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
			this.$api.get("sealseservice013", {rowId: this.rowId}).then((res)=>{
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
			
			//提交
			formSubmit: function(e) {
				if(this.serviceUser.length == 0 || !this.serviceUser[0].id){
					uni.showToast({icon: 'none', title: '请选择接收人'})
					return false
				}
				//工单接收人
				var serviceUserId = this.serviceUser.length > 0 && this.serviceUser[0].id != undefined ? this.serviceUser[0].id : '';
				
				//工单协助人
				var cooperationUserId = "";
				for(var i = 0; i < this.userList.length; i++){
					cooperationUserId += this.userList[i].id + ',';
				}
				
				var params = {
					serviceUserId: serviceUserId,//工单接收人，可为空
					cooperationUserId: cooperationUserId,//工单协助人，可为空
					rowId: this.rowId//工单id
				};
				
				var _this = this;
				this.$api.post("sealseservice014", params).then((res)=>{
					if(res.returnCode == 0){
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: '派工成功。',
							success:function(){
								setTimeout(function(){
									_this.$emit("ToRefresh")
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
