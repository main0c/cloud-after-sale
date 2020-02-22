<template>
	<view>
		<view class="uni-form-title">{{rowMation.title}}</view>
		<view class="uni-form-item">
			<rich-text :nodes="rowMation.content"></rich-text>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				rowMation: {},//通知信息
			}
		},
		onLoad(options) {
			if (!options.id) {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '缺少通知id',
					success: function() {
						setTimeout(function() {
							uni.navigateBack()
						}, 2000)
					}
				});
			}

			//获取通知信息
			this.$api.get("syseveusernotice007", {rowId: options.id}).then((res) => {
				if (res.returnCode == 0) {
					this.rowMation = res.bean;
				} else {
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
</style>
