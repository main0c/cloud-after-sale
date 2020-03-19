<template>
	<view class="content">
		<view class="page-body">
			<view class="sign-title">
				<view class="sign-title-l">
					<view class="portrait">
						{{name.substr(-2)}}
					</view>
					<view class="text">
						<view class="name">
							{{name}}
						</view>
						<view class="gz">
							<text class="t1">{{jobName}}</text>
						</view>
					</view>
				</view>
				<view class="sign-title-r">
					<view class="date">
						{{date}}
					</view>
				</view>
			</view>
			<!-- <view style="text-align: center;padding: 20upx 0;">当前位置: <text>{{address}}</text></view> -->
			<view class="uni-timeline">
				<view class="uni-timeline-item uni-timeline-first-item">
					<view class="uni-timeline-item-divider" :style="{ background : (!isAm ? '#1AAD19' : '#bbb')}"></view>
					<view class="uni-timeline-item-content">
						<view>
							<view class="uni-timeline-item-content-t1">上班时间{{clockInTime}}</view>
							<view class="desc-pad" v-if="isAm">
								<view class="time uni-timeline-item-content-t">
									打卡时间 {{(amSign.time)}}
								</view>
								<view>
									<uni-icon type="location-filled" /> {{amSign.address}}</view>
							</view>
							<view v-else class="content-show">
								<view class="module CBlue" @click="clickSign">
									<view class="text">上班打卡</view>
									<view class="time">{{time}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-timeline-item uni-timeline-last-item">
					<view class="uni-timeline-item-divider" :style="{ background : (isAm ? '#1AAD19' : '#bbb')}"></view>
					<view class="uni-timeline-item-content">
						<view>
							<view class="uni-timeline-item-content-t1">下班时间{{clockOutTime}}</view>
							<view v-if="isAm" class="desc-pad">
								<view class="desc-pad" v-if="isPm">
									<view class="time uni-timeline-item-content-t">
										打卡时间:{{(pmSign.time)}}
									</view>
									<view>
										<uni-icon type="location-filled" />{{pmSign.address}}</view>
								</view>
								<view v-else class="content-show">
									<view class="module CBlue" @click="clickSign">
										<view class="text">下班打卡</view>
										<view class="time">{{time}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formateDate,
	} from "@/common/util.js"
	export default {
		data() {
			return {
				name: "我的名字",
				jobName: '组织',
				
				//上下班时间
				clockInTime: "09:00",
				clockOutTime: "18:00",
				
				isAm: false, //上班是否打卡
				isPm: false, //下班是否打卡
				amSign: {
					time: "",
					address: "",
				}, //上午打卡信息
				pmSign: {
					time: "",
					address: "",
				}, //下午打卡信息
				isSign: false, //是否打卡
				time: formateDate(new Date(), 'h:min:s'), //当前时分秒
				date: formateDate(new Date(), 'Y-M-D'),
				latitude: "", //当前经度
				longitude: "", //当前维度
				address: "我的位置", //
				signInfo: {
					latitude: "",
					longitude: "",
					address: "",
					time: "",
					remarks: ""
				}, //打卡信息 （模式，经纬度，地址，时间）
			}
		},
		// 初始化
		onLoad() {
			
			//获取用户信息
			this.getUserMation();
			//获取今日的打卡信息
			this.getTodaySignMation();
			
			// 获取当前位置
			this.getLocation();
			//获取实时时间
			this.getTime();
		},
		methods: {
			
			//获取用户信息
			getUserMation(){
				//判断缓存中的用户信息是否为空
				if(uni.getStorageSync("userMation") == null){
					//获取用户信息
					this.$api.post("userphone002", {}).then((res)=>{
						if(res.returnCode == 0){
							uni.setStorageSync("userMation", res.bean);
							this.loadMineMation(uni.getStorageSync("userMation"));
						}else{
							uni.showToast({
								icon: 'none',
								position: 'bottom',
								title: res.returnMessage
							});
						}
					})
				}else{
					this.loadMineMation(uni.getStorageSync("userMation"));
				}
			},
			//加载我的信息
			loadMineMation: function(user){
				this.name = user.userName;
				this.jobName = user.jobName;
			},
			
			//获取今日的打卡信息
			getTodaySignMation(){
				var _this = this;
				_this.$api.get("checkwork013", {}).then((res)=>{
					if(res.returnCode == 0){
						_this.clockInTime = res.bean.clockIn
						_this.clockOutTime = res.bean.clockOut
						//显示按钮设置
						var isCheck = res.bean.isCheck
						if(isCheck == 2){//显示晚卡
							_this.isAm = true;
						}else if(isCheck == 3 || isCheck == 4 ){//不显示打卡按钮
							_this.isAm = true;
							_this.isPm = true;
						}
						_this.amSign.time = res.bean.realClockIn
						_this.pmSign.time = res.bean.realClockOut
					}else{
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: res.returnMessage
						});
					}
				})
			},
			
			// 实时时间
			getTime() {
				var that = this;
				setInterval(function() {
					that.time = formateDate(new Date(), 'h:min:s')
				}, 1000)
			},

			// 获取当前位置
			getLocation() {
				var that = this;
				
				
			},

			// 点击打卡
			clickSign() {
				var _this = this;
				uni.showModal({
				    title: '提示',
				    content: '确定现在打卡吗？',
				    success: function (res) {
				        if (res.confirm) {
							var url = "checkwork001";//默认上班打卡
							if(_this.isAm && !_this.isPm){
								//上班已打卡，下班未打卡
								url = "checkwork002";
							}else if(_this.isAm && _this.isPm){
								uni.showToast({
									icon: 'success',
									position: 'bottom',
									title: '今日已全部打卡'
								});
								return false;
							}
							_this.$api.post(url, {}).then((res)=>{
								if(res.returnCode == 0){
									uni.showToast({
										icon: 'success',
										position: 'bottom',
										title: '打卡成功',
										complete:function(){
											//重置今天的打卡信息
											_this.getTodaySignMation()
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
				});
			},

		}
	}
</script>

<style>

	.uni-timeline {
		padding: 30upx 20upx;
	}

	.uni-timeline-item-content-t {
		font-weight: bold;
	}

	.desc-pad {
		padding: 0 0upx
	}

	.uni-timeline-last-item .uni-timeline-item-divider {
		background: #bbb;
	}

	.CBlue {
		background-color: #007aff;
		box-shadow: 0 5px 5px #007aff;
	}

	.module {
		overflow: hidden;
		margin: 20upx auto;
		width: 220upx;
		height: 220upx;
		border-radius: 50%;
		color: #fff;
		text-align: center;
	}

	.module .text {
		font-size: 20px;
		margin: 50upx auto 10upx;
	}

	.uni-timeline-item .uni-timeline-item-content {
		width: 100%;
		padding-right: 20upx;
	}

	.sign-title {
		display: flex;
		justify-content: space-between;
		padding: 30upx 24upx;
		border-bottom: 1upx solid #333;
	}

	.sign-title .portrait {
		width: 100upx;
		height: 100upx;
		line-height: 100upx;
		border-radius: 50%;
		background-color: #007AFF;
		color: #fff;
		font-size: 28upx;
		text-align: center;
	}

	.sign-title .sign-title-l {
		display: flex;
	}

	.sign-title .sign-title-l .text {
		margin-left: 20upx;
	}

	.sign-title .sign-title-l .text .name {
		font-size: 32upx;
	}

	.sign-title .sign-title-l .text .gz {
		color: darkblue;
		display: inline-flex;
	}

	.sign-title .sign-title-l .text .gz text {
		display: inline-block;
	}

	.sign-title .sign-title-l .text .gz .t1 {
		overflow: hidden;
		/*超出部分隐藏*/
		text-overflow: ellipsis;
		/* 超出部分显示省略号 */
		white-space: nowrap;
		/*规定段落中的文本不进行换行 */
		width: 166upx;
		/*需要配合宽度来使用*/
	}

	.desc-pad .last {
		margin-bottom: 80upx;
	}

</style>
