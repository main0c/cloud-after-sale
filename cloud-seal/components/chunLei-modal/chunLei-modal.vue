<template>
	<view class="mask" @tap="tapMask" :style="{backgroundColor:value?`rgba(0,0,0,${opacity})`:'rgba(0,0,0,0)'}" :class="!value?'':'mask-show'" @touchmove.stop.prevent>
		<block v-if="type=='default'">
			<view class="default-view" @tap.stop>
				<view class="title">{{mData.title}}</view>
				<view class="content word-break">{{mData.content}}</view>
				<view class="btn">
					<view class="cancel" @tap="tapCancel" :style="{color:mData.cancelColor?mData.cancelColor:''}">{{mData.cancelText?mData.cancelText:'取消'}}</view>
					<view class="confirm" @tap="tapConfirm" :style="{color:mData.confirmColor?mData.confirmColor:''}">{{mData.confirmText?mData.confirmText:'确认'}}</view>
				</view>
			</view>
		</block>
		<block v-if="type=='select'">
			<view class="select-view" @tap.stop>
				<view v-for="(item,index) in mData" :key="index" class="select-box" @tap="tapConfirm(item)">
					<view><image class="image" :src="item.icon" v-if="item.icon"></image>{{item.title}}</view>
					<view class="select-content">{{item.content}}</view>
				</view>
			</view>
		</block>
		<block v-if="type=='multiSelect'">
			<view class="select-view" @tap.stop>
				<checkbox-group @change="checkboxChange">
					<view v-for="(item,index) in mData" :key="index" class="select-box">
						<view><image class="image" :src="item.icon" v-if="item.icon"></image>{{item.title}}</view>
						<view class="select-content">
							<checkbox :value="item.title" :color="item.radioColor?item.radioColor:'#001AFF'" :checked="item.flag"></checkbox>
						</view>
					</view>
				</checkbox-group>
			</view>
		</block>
		<block v-if="type=='advert'">
			<view class="advert-view">
				<image :src="mData.src" class="image confirm" @tap.stop="tapConfirm" :style="{width:mData.width?mData.width:'500rpx',height:mData.height?mData.height:'700rpx'}"></image>
				<image class="image cancel" @tap.stop="tapCancel" src="../../static/chunLei-modal/close.png"></image>
			</view>
		</block>
		<block v-if="type=='notify'">
			<view class="notify-view">
				<view class="title" v-if="mData.title">{{mData.title}}</view>
				<image class="image" :src="mData.src" v-if="mData.src"></image>
				<view class="content word-break">{{mData.content}}</view>
				<view class="cancel" @tap="tapCancel" :style="{color:mData.cancelColor?mData.cancelColor:''}">{{mData.cancelText?mData.cancelText:'我知道了'}}</view>
			</view>
		</block>
		<block v-if="type=='share'">
			<view class="share-view" @tap.stop>
				<view v-for="(item,index) in mData" :key="index" class="share-box" @tap="tapConfirm(item)">
					<image class="image" :src="item.icon" v-if="item.icon"></image>{{item.title}}
				</view>
			</view>
		</block>
		<block v-if="type=='input'&&value">
			<view class="input-view" @tap.stop>
				<view class="title">{{mData.title}}</view>
				<view class="content">
					<view v-for="(item,index) in mData.content" :key="index" class="input-box">
						<view class="view">{{item.title}}</view>
						<block v-if="item.type=='number'">
							<input class="input" v-model="item.content" type="number" :password="item.type=='password'" :placeholder="item.placeholder"/>
						</block>
						<block v-if="item.type=='password'">
							<input class="input" v-model="item.content" :password="item.type=='password'" :placeholder="item.placeholder"/>
						</block>
						<block v-if="item.type=='digit'">
							<input class="input" v-model="item.content" type="digit" :password="item.type=='password'" :placeholder="item.placeholder"/>
						</block>
						<block v-if="item.type=='idcard'">
							<input class="input" v-model="item.content" type="idcard" :password="item.type=='password'" :placeholder="item.placeholder"/>
						</block>
						<block v-if="!item.type||item.type=='text'">
							<input class="input" v-model="item.content" type="text" :password="item.type=='password'" :placeholder="item.placeholder"/>
						</block>
					</view>
				</view>
				<view class="btn">
					<view class="cancel" @tap="tapCancel" :style="{color:mData.cancelColor?mData.cancelColor:''}">{{mData.cancelText?mData.cancelText:'取消'}}</view>
					<view class="confirm" @tap="inputConfirm" :style="{color:mData.confirmColor?mData.confirmColor:''}">{{mData.confirmText?mData.confirmText:'确认'}}</view>
				</view>
				
			</view>
		</block>
		<block v-if="type=='custom'">
			<slot></slot>
		</block>
	</view>
</template>

<script>
	import TabMask from './tabMask.js'
	export default{
		props:{
			type:{
				type:String,
				default:'default'
			},
			value:{
				type:Boolean,
				default:false
			},
			maskEnable:{
				type:Boolean,
				default:true
			},
			mData:{
				type:[Object, Array],
				default:()=>{}
			},
			tabbarHeight:{
				type:Number,
				default:null 
			},
			navHeight:{
				type:Number,
				default:null
			},
			opacity:{
				type:Number,
				default:0.6
			},
		},
		data(){
			return{
				tabMask:null
			}
		},
		mounted() {

			//#ifdef APP-PLUS
			this.tabMask = new TabMask({
				tabbarHeight:this.tabbarHeight,
				navHeight:this.navHeight,
				opacity:this.opacity,
				fn: this.tapMask
			})
			//#endif
			
		},
		methods:{
			checkboxChange(e){
				var items = this.mData,
				values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
				    const item = items[i]
				    if(values.includes(item.title)){
				        this.$set(item,'flag',true)
				    }else{
                        this.$set(item,'flag',false)
                    }
				}
				
			},
			inputConfirm(){
				this.$emit('onConfirm',this.mData.content)
				this.$emit('input',false)
			},
			tapCancel(){
				this.$emit('cancel')
				this.$emit('input',false)
			},
			tapConfirm(item){
				this.$emit('onConfirm',item)
				this.$emit('input',false)
			},
			tapMask(){
				if(!this.maskEnable) return
				if(this.type == 'multiSelect'){
					this.$emit('onConfirm',this.mData)
				}else{
					this.$emit('cancel',this.mData)
				}
				
				this.$emit('input',false)

			}
		},
		watch:{
			value:{
				immediate:true,
				handler(newVal,oldVal){ 
					//#ifdef APP-PLUS
					if(newVal) {
						this.tabMask.show()
					}else{
						this.tabMask.hide()
					}
					//#endif
				}
			}
		}
	}
</script>

<style lang="scss">
	.mask{
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 9999;
		transition: background 0.3s linear;
		display: flex;
		align-items: center;
		opacity: 0;
		visibility: hidden;
		justify-content: center;
		&.mask-show{
			visibility:visible;
			opacity: 1;
		}
		
	}
	.hover{
		background: #f2f2f2;
	}
	.default-view{
		width: 600rpx;
		font-weight: 400;
		font-size: 18px;
		background-color: #fff;
		border-radius: 6rpx;
		.title{
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.content{
			padding: 40rpx 48rpx;
			min-height: 40px;
			font-size: 15px;
			line-height: 1.4;
			color: #999;
			text-align: center;
		}
		.btn{
			height: 100rpx;
			display: flex;
			flex-direction: row;
			border-top:1px solid #ccc;
			.cancel{
				display: flex;
				flex: 1;
				justify-content: center;
				align-items: center;
				border-right:1px solid #ccc;
			}
			.confirm{
				display: flex;
				flex: 1;
				justify-content: center;
				align-items: center;
				color: rgb(0, 122, 255);
			}
		}
	}
	.select-view{
		width: 600rpx;
		background-color: #fff;
		border-radius: 6rpx;
		.select-box{
			height: 100rpx;
			padding: 20rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			border-bottom: 0.5px solid #ddd;
			.select-content{
				color: #aaa;
				font-size: 12px;
			}
		}
		.image{
			display: inline-block;
			vertical-align: middle;
			width: 40rpx;
			height: 40rpx;
			margin-right: 20rpx;
		}
	}
	.select-view .select-box:last-child{
		border: none;
	}
	.notify-view{
		width: 600rpx;
		background-color: #fff;
		border-radius: 6rpx;
		.image{
			width: 600rpx;
			height: 150rpx;
		}
		.title{
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.content{
			padding: 40rpx 48rpx;
			min-height: 40px;
			font-size: 15px;
			line-height: 1.4;
			color: #999;
			text-align: center;
		}
		.cancel{
			height: 100rpx;
			display: flex;
			flex: 1;
			justify-content: center;
			align-items: center;
			border-top:1px solid #E7E7E7;
		}
	}
	.advert-view{
		overflow: hidden;
		
		display: flex;
		flex-direction: column;
		align-items: center;
		.confirm{
			width: 500rpx;
			height: 700rpx;
			border-radius: 6rpx;
		}
		.cancel{
			margin-top: 150rpx;
			width: 60rpx;
			height: 60rpx;
		}
	}
	.share-view{
		width: 600rpx;
		background-color: #fff;
		border-radius: 6rpx;
		padding: 20rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		font-size: 18px;
		.share-box{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 33.33%;
			padding: 40rpx 0;
		}
		.image{
			width: 80rpx;
			height: 80rpx;
			margin-bottom: 20rpx;
		}
	}
	.input-view{
		width: 600rpx;
		font-weight: 400;
		font-size: 18px;
		background-color: #fff;
		border-radius: 6rpx;
		.title{
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-bottom: 1px solid #ccc;
		}
		.content{
			padding: 40rpx 48rpx;
			min-height: 40px;
			font-size: 18px;
			
			text-align: left;
		}
		.input-box{
			display: flex;
			margin-bottom: 20rpx;
			.view{
				margin-right: 20rpx;
				min-width: 150rpx;
			}
			.input{
				
				font-size: 18px;
			}
		}
		.btn{
			height: 100rpx;
			display: flex;
			flex-direction: row;
			border-top:1px solid #ccc;
			.cancel{
				display: flex;
				flex: 1;
				justify-content: center;
				align-items: center;
				border-right:1px solid #ccc;
			}
			.confirm{
				display: flex;
				flex: 1;
				justify-content: center;
				align-items: center;
				color: rgb(0, 122, 255);
			}
		}
	}
	.word-break{
		word-wrap: break-word;
		word-break: break-all;
		white-space: pre-wrap;
	}
</style>
