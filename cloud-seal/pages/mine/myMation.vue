<template>
	<view>
		<view>
			<form @submit="formSubmit">
				<view class="uni-form-item">
					<view class="title">真实姓名：</view>
					<view class="content">
						{{rowMation.userName}}
						<image :src="basePath + rowMation.userPhoto" class="user-photo"></image>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">当前帐号：</view>
					<view class="content">
						{{rowMation.userCode}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">职位：</view>
					<view class="content">
						{{rowMation.companyName}} {{rowMation.departmentName}} {{rowMation.jobName}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">身份证件：</view>
					<view class="content">
						{{rowMation.userIdCard}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">性别：</view>
					<view class="content">
						<block v-if="rowMation.userSex == 1">男</block>
						<block v-else-if="rowMation.userSex == 2">女</block>
						<block v-else>保密</block>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">邮箱：</view>
					<view class="content">
						{{rowMation.userEmail}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">手机号：</view>
					<view class="content">
						{{rowMation.userPhone}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">签名：</view>
					<view class="content">
						{{rowMation.userSign}}
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
				basePath: this.$fileBasePath,
				//个人信息
				rowMation: {},
			}
		},
		onLoad(options) {
			//获取个人信息
			this.$api.get("sys032", {}).then((res)=>{
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
			
			//提交
			formSubmit: function(e) {
				if(this.latitude == '' || this.latitude == null
					|| this.longitude == '' || this.longitude == null){
					uni.showToast({icon: 'none', title: '请打开定位获取位置信息'})
					return false
				}
				
			}
			
		}
	}
	
</script>

<style>
	.user-photo{
		width: 60upx;
		height: 60upx;
		border-radius: 30upx;
		float: right;
		margin-right: 40upx;
	}
</style>
