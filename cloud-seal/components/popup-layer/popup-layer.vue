<template>
	<view>
		<view v-show="ifshow" @tap="ableClose" @touchmove.stop.prevent class="popup-layer">

		</view>
		<view ref="popRef" class="popup-content" @tap.stop="stopEvent" :style="_location">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'popup-layer',
		model: {
			prop: "showPop",
			event: "change"
		},
		props: {
			showPop: {
				type: Boolean,
				default: false,
			},
			direction: {
				type: String,
				default: 'top', // 方向  top，bottom，left，right 
			},
			autoClose: {
				type: Boolean,
				default: true,
			},
			autoHeight:{
				type: String,
				default: '30',
			}
		},
		data() {
			return {
				ifshow: false, // 是否展示,
				translateValue: -100, // 位移距离
				site: -100,
				timer: null,
				iftoggle: false,

			};
		},
		computed: {
			_translate() {
				const transformObj = {
					'top': `transform:translateY(${-this.translateValue}%)`,
					'bottom': `transform:translateY(${this.translateValue}%)`,
					'left': `transform:translateX(${-this.translateValue}%)`,
					'right': `transform:translateX(${this.translateValue}%)`
				};
				return transformObj[this.direction]
			},
			_location() {
				const positionValue = {
					'top': `bottom:${this.site}%;width:100%;height:${this.autoHeight}%;`,
					'bottom': `top:${this.site}%;width:100%;height:${this.autoHeight}%;`,
					'left': `right:0px;top:0;height:100%;`,
					'right': `left:0px;top:0;height:100%;`,
				};
				return positionValue[this.direction] + this._translate;
			}
		},
		mounted() {
			if (this.showPop) {
				// console.log(222);
				this.show();
			}
		},
		watch: {
			showPop(value) {
				console.log(value)
				if (value) {
					this.show();
				} else {
					this.close();
				}
			}
		},
		methods: {
			stopMove(event) {
				return;
			},
			show(events) {
				this.ifshow = true;
				this.site = 0;
				let _open = setTimeout(() => {
					this.translateValue = 0;
					_open = null;
				}, 100)
				let _toggle = setTimeout(() => {
					this.iftoggle = true;
					_toggle = null;
				}, 300);
			},
			close() {
				if (this.timer !== null || !this.iftoggle) {
					return;
				}
				this.translateValue = -100;
				this.timer = setTimeout(() => {
					this.ifshow = false;
					this.timer = null;
					this.iftoggle = false;
					this.$emit('closeCallBack', null);
					this.$emit('change', false)
				}, 300);
			},
			ableClose() {
				if (this.autoClose) {
					this.close();
				}
			},
			stopEvent(event) {},
			doSome() {}

		}
	}
</script>

<style lang="scss">
	.popup-layer {
		position: fixed;
		z-index: 999999;
		background: rgba(0, 0, 0, .3);
		height: 100%;
		width: 100%;
		top: 0px;
		left: 0px;
		overflow: hidden;
	}

	.popup-content {
		z-index: 1000000;
		background: #FFFFFF;
		transition: transform .3s ease;
		overflow-x: hidden;
		position: fixed;
		left: 0px;
	}
</style>
