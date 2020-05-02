<template>
	<view>
		<view>
			<form>
				<view class="uni-form-item">
					<view class="title">学生姓名：</view>
					<view class="content">
						{{rowMation.studentName}}
						<image :src="userPhoto" class="user-photo"></image>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">学号：</view>
					<view class="content">
						{{rowMation.studentNo}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">学校：</view>
					<view class="content">
						{{rowMation.schoolName}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">班级：</view>
					<view class="content">
						{{rowMation.gradeName}} {{rowMation.className}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">性别：</view>
					<view class="content">
						{{rowMation.stuSex}}
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">特长：</view>
					<view class="content">
						{{rowMation.speciality}}
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
				userPhoto: '../../static/mine/no-userphoto.png',
				//个人信息
				rowMation: {},
			}
		},
		onLoad(options) {
			//获取个人信息
			this.$api.get("schooluser004", {}).then((res)=>{
				if(res.returnCode == 0){
					if(res.bean.studentImg && res.bean.studentImg != null){
						this.userPhoto = this.$fileBasePath + res.bean.studentImg;
					}
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
