<template>
	<view>
		<view>
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>服务类型</view>
					<view class="content">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>报单时间</view>
					<view class="content">
						<picker mode="date" :value="date" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>客户</view>
					<view class="content">
						<picker mode="date" :value="date" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>联系人</view>
					<view class="content">
						<input class="uni-input" placeholder="请输入联系人" />
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>联系电话</view>
					<view class="content">
						<picker mode="date" :value="date" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>所在地区</view>
					<view class="content">
						<picker mode="date" :value="date" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>详细地址</view>
					<view class="content">
						<textarea placeholder="请输入详细地址" auto-height />
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>产品名称</view>
					<view class="content">
						<picker mode="date" :value="date" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>规格型号</view>
					<view class="content">
						<picker mode="date" :value="date" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>序列号</view>
					<view class="content">
						<picker mode="date" :value="date" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>质保类型</view>
					<view class="content">
						<picker mode="date" :value="date" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>紧急程度</view>
					<view class="content">
						<picker mode="date" :value="date" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>服务内容</view>
					<view class="content">
						<textarea placeholder="请输入服务内容" auto-height />
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>处理方式</view>
					<view class="content">
						<picker mode="date" :value="date" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>工单接收人</view>
					<view class="content">
						<picker mode="date" :value="date" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>工单协助人</view>
					<view class="content">
						<picker mode="date" :value="date" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>上传照片</view>
					<view class="content">
						<picker mode="date" :value="date" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-form-item">
					<view class="title"><view class="must">*</view>上传附件</view>
					<view class="content">
						<picker mode="date" :value="date" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
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
			const currentDate = this.getDate({
				format: true
			})
			return {
				array: ['中国', '美国', '巴西', '日本'],
				index: 0,
				date: currentDate,
			}
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			
			bindDateChange: function(e) {
				this.date = e.target.value
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
