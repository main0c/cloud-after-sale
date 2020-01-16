<template>
	<view>
		<view>
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>服务类型</view>
					<view class="content">
						<input class="uni-input" name="tel" placeholder="电话号码" />
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">radio</view>
					<view class="content">
						<radio-group name="radio">
							<label>
								<radio value="radio1" /><text>选项一</text>
							</label>
							<label>
								<radio value="radio2" /><text>选项二</text>
							</label>
						</radio-group>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">checkbox</view>
					<view class="content">
						<checkbox-group name="checkbox">
							<label>
								<checkbox value="checkbox1" /><text>选项一</text>
							</label>
							<label>
								<checkbox value="checkbox2" /><text>选项二</text>
							</label>
						</checkbox-group>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">slider</view>
					<view class="content">
						<slider value="50" name="slider" show-value></slider>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title">input</view>
					<view class="content">
						<input class="uni-input" name="input" placeholder="这是一个输入框" />
					</view>
				</view>
				<view class="uni-btn-v">
					<button form-type="submit">Submit</button>
					<button type="default" form-type="reset">Reset</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
			}
		},
		methods: {
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
