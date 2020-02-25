<template>
	<view>
		<view>
			<form @submit="formSubmit">
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>旧密码</view>
					<view class="content">
						<input class="uni-input" placeholder="请输入旧密码" type="password" v-model="oldPwd" name="oldPwd" :value="oldPwd"/>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>新密码</view>
					<view class="content">
						<input class="uni-input" placeholder="请输入新密码" type="password" v-model="newPwd" name="newPwd" :value="newPwd"/>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>重复密码</view>
					<view class="content">
						<input class="uni-input" placeholder="请再次输入新密码" type="password" v-model="newPwdTwo" name="newPwdTwo" :value="newPwdTwo"/>
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
				oldPwd: "", //旧密码
				newPwd: "", //新密码
				newPwdTwo: "" //重复新密码
			}
		},
		methods: {
			formSubmit(e) {
				let loginRules = [
					{name: 'oldPwd', required: true, errmsg: '请输入旧密码'},
					{name: 'oldPwd', type: 'pwd', min: 6, max: 16, errmsg: '密码须是6～16位字符'},
					{name: 'newPwd', required: true, errmsg: '请输入新密码'},
					{name: 'newPwd', type: 'pwd', min: 6, max: 16, errmsg: '密码须是6～16位字符'},
					{name: 'newPwdTwo', required: true, type: 'eq', eqName: 'newPwd', errmsg: '两次输入密码不一致'}
				]
				let valLoginRes = this.$validate.validate(e.detail.value, loginRules)
				if (!valLoginRes.isOk) {
					uni.showToast({icon: 'none', title: valLoginRes.errmsg})
					return false
				}
				this.$api.post("login007", {newPassword: e.detail.value.newPwd, oldPassword: e.detail.value.oldPwd}).then((res)=>{
					if(res.returnCode == 0){
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: '修改成功。',
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
