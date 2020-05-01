<template>
	<view class="">
		<view class="mask">
			<!-- <view class="top-operator">
			</view>
			<view class="top-operator-show">
				<uni-icons type="refresh" size="30" color="white" @click="screenSwitching()"></uni-icons>
			</view> -->
			<swiper @change="changeSwiper" class="my_swiper" :current="current" :circular="circular" :indicator-dots="indicatorDots"
			 :autoplay="autoplay" :duration="duration">
				<swiper-item v-for="(x, y) in picList" :key="y">
					<view class="bg_img" :style="{ backgroundImage: 'url('+x.picPath+')'}"></view>
				</swiper-item>
			</swiper>
		</view>
		<view class="page" v-if="picList.length > 0">{{ current + 1 }} / {{ picList.length }}</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	
	export default {
		components: {uniIcons},
		data() {
			return {
				picList: [],
				indicatorDots: false,
				autoplay: false,
				duration: 500,
				circular: true,
				current: 0,
				isShowSwiper: false
			};
		},
		onLoad(option) {
			var list = option.picList.split(',');
			for(var str in list){
				this.picList.push({
					picPath: list[str]
				});
			}
		},
		methods: {
			clickPic(index) {
				this.current = index;
				this.isShowSwiper = true;
			},
			changeSwiper(e) {
				this.current = e.target.current;
			},
			
			//横竖屏切换---未测试
			screenSwitching: function(){
				uni.getSystemInfo({
					success: function(res) {
						if (res.windowWidth > res.windowHeight) {
							plus.screen.lockOrientation('landscape-secondary');
						} else {
							plus.screen.lockOrientation('landscape-primary');
						}
					}
				});
			}
			
		}
	};
</script>

<style lang="scss" scoped>
	.page {
		position: fixed;
		z-index: 6;
		color: #fff;
		bottom: 20rpx;
		text-align: center;
		width: 100%;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #000;
		z-index: 5;
		
		>.top-operator{
			top: 88upx;
			height: 90upx;
			width: 100%;
			position: absolute;
			background-color: gainsboro;
			filter: alpha(opacity = 50);
			/* CSS3 standard */
			opacity: 0.5;
			line-height: 90upx;
		}
		
		>.top-operator-show{
			top: 88upx;
			height: 90upx;
			width: 100%;
			position: absolute;
			line-height: 90upx;
			
			.uni-icons{
				margin: 0px 10upx;
			}
			
		}
		
		>.my_swiper {
			width: 100%;
			height: 60vh;

			.bg_img {
				background-size: 100% auto;
				background-repeat: no-repeat;
				background-position: center;
				width: 100%;
				height: 100%;
			}
		}
	}

	.pic_list {
		display: flex;
		flex-flow: row wrap;

		>view {
			flex: 0 0 33.3vw;
			height: 33.3vw;
			padding: 1vw;

			>image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
